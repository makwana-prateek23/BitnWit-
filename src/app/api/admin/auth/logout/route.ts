import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookieHeader, verifySessionToken, getSessionCookieName } from '@/lib/db/auth';
import { store } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;

    if (token) {
      const payload = verifySessionToken(token);
      if (payload) {
        await store.logActivity(
          payload.userId,
          payload.name,
          'AUTH_LOGOUT',
          'ADMIN_USER',
          payload.userId,
          'User logged out from admin panel'
        );
      }
    }

    const response = NextResponse.json({ success: true });
    response.headers.append('Set-Cookie', clearSessionCookieHeader());
    return response;
  } catch (err) {
    console.error('Logout error:', err);
    const response = NextResponse.json({ success: true });
    response.headers.append('Set-Cookie', clearSessionCookieHeader());
    return response;
  }
}
