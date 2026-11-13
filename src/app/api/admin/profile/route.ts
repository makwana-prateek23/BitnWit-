import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken, verifyPassword, hashPassword } from '@/lib/db/auth';
import { store } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await store.getAdminUser(session.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (err) {
    console.error('Profile GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve profile.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await store.getAdminUser(session.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const body = await req.json();
    const updates: Record<string, unknown> = {};

    // 1. Update Name
    if (body.name && typeof body.name === 'string') {
      updates.name = body.name.trim();
    }

    // 2. Change Password workflow
    if (body.newPassword) {
      if (!body.currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required to change your password.' },
          { status: 400 }
        );
      }

      const isCurrentValid = verifyPassword(body.currentPassword, user.passwordHash, user.salt);
      if (!isCurrentValid) {
        return NextResponse.json(
          { error: 'The current password entered is incorrect.' },
          { status: 400 }
        );
      }

      if (typeof body.newPassword !== 'string' || body.newPassword.length < 8) {
        return NextResponse.json(
          { error: 'New password must be at least 8 characters long.' },
          { status: 400 }
        );
      }

      const { hash, salt } = hashPassword(body.newPassword);
      updates.passwordHash = hash;
      updates.salt = salt;

      await store.logActivity(
        user.id,
        user.name || user.fullName || 'Admin',
        'AUTH_PASSWORD_CHANGE',
        'ADMIN_USER',
        user.id,
        'Admin changed account password'
      );
    }

    const updatedUser = await store.updateAdminUser(user.id, updates);
    if (!updatedUser) {
      return NextResponse.json({ error: 'Failed to update user.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        avatarUrl: updatedUser.avatarUrl,
        createdAt: updatedUser.createdAt,
        lastLoginAt: updatedUser.lastLoginAt,
      },
    });
  } catch (err) {
    console.error('Profile PUT error:', err);
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
}
