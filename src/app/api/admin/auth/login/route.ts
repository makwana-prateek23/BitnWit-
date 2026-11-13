import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';
import {
  verifyPassword,
  generateSessionToken,
  setSessionCookieHeader,
  checkRateLimit,
  recordRateLimitAttempt,
} from '@/lib/db/auth';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // 1. Rate limiting check
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    const minutesLeft = Math.ceil(rateLimit.resetInMs / 60000);
    return NextResponse.json(
      {
        error: `Too many failed login attempts. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const rememberMe = Boolean(body.rememberMe);

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 2. Lookup admin user
    const user = await store.findAdminByEmail(email);
    if (!user || !user.isActive) {
      recordRateLimitAttempt(ip, false);
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. Verify password hash using PBKDF2
    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      recordRateLimitAttempt(ip, false);
      await store.logActivity(
        user.id,
        user.name || user.fullName || 'Admin',
        'AUTH_LOGIN_FAILED',
        'ADMIN_USER',
        user.id,
        `Failed password attempt from ${ip}`,
        ip
      );
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 4. Successful login
    recordRateLimitAttempt(ip, true);
    await store.updateAdminUser(user.id, { lastLoginAt: new Date().toISOString() });

    const maxAgeSeconds = rememberMe ? 30 * 24 * 3600 : 8 * 3600; // 30 days or 8 hours
    const token = generateSessionToken(user, maxAgeSeconds);
    const cookieHeader = setSessionCookieHeader(token, maxAgeSeconds);

    await store.logActivity(
      user.id,
      user.name || user.fullName || 'Admin',
      'AUTH_LOGIN',
      'ADMIN_USER',
      user.id,
      `User logged into admin panel from ${ip}`,
      ip
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });

    response.headers.append('Set-Cookie', cookieHeader);
    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login. Please try again.' },
      { status: 500 }
    );
  }
}
