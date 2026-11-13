import crypto from 'crypto';
import { cookies } from 'next/headers';
import { AdminRole, AdminUser } from './types';

export const SESSION_COOKIE_NAME = 'bitnwit_admin_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Secure JWT secret fallback to stable machine secret if not provided in env
const JWT_SECRET =
  process.env.ADMIN_JWT_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  'bitnwit_super_secret_admin_key_2026_innovate_build_solve';

export interface SessionPayload {
  id: string;
  userId: string;
  email: string;
  name: string;
  fullName: string;
  role: AdminRole;
  avatarUrl?: string;
  exp: number; // timestamp in seconds
}

/**
 * Hash a password using PBKDF2 with SHA-512 and a unique cryptographic salt.
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
}

/**
 * Verify a plaintext password against a stored PBKDF2 hash and salt using timingSafeEqual.
 */
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  try {
    const hash = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('hex');
    const hashBuffer = Buffer.from(hash, 'hex');
    const storedBuffer = Buffer.from(storedHash, 'hex');
    if (hashBuffer.length !== storedBuffer.length) return false;
    return crypto.timingSafeEqual(hashBuffer, storedBuffer);
  } catch {
    return false;
  }
}

/**
 * Create a signed JWT token string.
 */
export function signToken(payload: Omit<SessionPayload, 'exp'>, expiresInDays = 7): string {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * expiresInDays;
  const fullPayload: SessionPayload = { ...payload, exp };

  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

export const generateSessionToken = (user: AdminUser, maxAgeSeconds = SESSION_MAX_AGE_SECONDS) => {
  return signToken(
    {
      id: user.id,
      userId: user.id,
      email: user.email,
      name: user.name || user.fullName,
      fullName: user.fullName || user.name || '',
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
    Math.ceil(maxAgeSeconds / (24 * 3600))
  );
};

/**
 * Verify and decode a signed JWT token string.
 */
export function verifyToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;

    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');

    const sigA = Buffer.from(signature);
    const sigB = Buffer.from(expectedSignature);
    if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) {
      return null;
    }

    const rawPayload: any = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!rawPayload.exp || rawPayload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    const payload: SessionPayload = {
      ...rawPayload,
      id: rawPayload.id || rawPayload.userId,
      userId: rawPayload.userId || rawPayload.id,
      name: rawPayload.name || rawPayload.fullName,
      fullName: rawPayload.fullName || rawPayload.name,
    };

    return payload;
  } catch {
    return null;
  }
}

export const verifySessionToken = verifyToken;
export const getSessionCookieName = () => SESSION_COOKIE_NAME;

export function setSessionCookieHeader(token: string, maxAgeSeconds = SESSION_MAX_AGE_SECONDS): string {
  const isProd = process.env.NODE_ENV === 'production';
  return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${
    isProd ? '; Secure' : ''
  }`;
}

export function clearSessionCookieHeader(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/**
 * Set HTTP-Only secure session cookie in Next.js Server Components / Route Handlers.
 */
export function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: '/',
  });
}

/**
 * Read and verify session from cookies.
 */
export function getSessionFromCookies(): SessionPayload | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Clear the session cookie on logout.
 */
export function clearSessionCookie() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {}
}

// ------------------------------------------------------------------
// In-Memory Rate Limiter for Login Protection
// ------------------------------------------------------------------
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  ip: string,
  maxAttempts = 5,
  windowMinutes = 15
): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || record.resetAt < now) {
    return { allowed: true, remaining: maxAttempts, resetInMs: windowMinutes * 60 * 1000 };
  }

  if (record.count >= maxAttempts) {
    const resetInMs = Math.max(0, record.resetAt - now);
    return { allowed: false, remaining: 0, resetInMs };
  }

  const remaining = maxAttempts - record.count;
  const resetInMs = Math.max(0, record.resetAt - now);
  return { allowed: true, remaining, resetInMs };
}

export function recordRateLimitAttempt(ip: string, success: boolean) {
  if (success) {
    loginAttempts.delete(ip);
    return;
  }
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const record = loginAttempts.get(ip);
  if (!record || record.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + windowMs });
  } else {
    record.count += 1;
  }
}

export function resetRateLimit(ip: string) {
  loginAttempts.delete(ip);
}
