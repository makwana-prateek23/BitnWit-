import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken, hashPassword } from '@/lib/db/auth';
import { store, getDb, saveDb } from '@/lib/db/store';
import { AdminRole, AdminUser } from '@/lib/db/types';

export async function GET(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDb();
    const users = db.adminUsers.map(({ passwordHash, salt, ...safe }) => safe);
    return NextResponse.json({ success: true, users });
  } catch (err) {
    console.error('Users GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve admin users.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Only Super Administrators can create or provision admin credentials.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const role = (body.role as AdminRole) || 'ADMIN';

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    const db = getDb();
    const existing = db.adminUsers.find((u) => u.email.toLowerCase() === email);
    if (existing) {
      return NextResponse.json({ error: 'An admin account with this email already exists.' }, { status: 400 });
    }

    const { hash, salt } = hashPassword(password);
    const newUser: AdminUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      email,
      fullName: fullName || email.split('@')[0],
      name: fullName || email.split('@')[0],
      passwordHash: hash,
      salt,
      role,
      avatarUrl: '/bitty-mascot.png',
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    db.adminUsers.push(newUser);
    saveDb(db);

    await store.logActivity(
      session.userId,
      session.name,
      'ADMIN_USER_CREATE',
      'ADMIN_USER',
      newUser.id,
      `Super Admin created new ${role} account for ${email}`
    );

    const { passwordHash: _, salt: __, ...safeUser } = newUser;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (err) {
    console.error('Users POST error:', err);
    return NextResponse.json({ error: 'Failed to create admin user.' }, { status: 500 });
  }
}
