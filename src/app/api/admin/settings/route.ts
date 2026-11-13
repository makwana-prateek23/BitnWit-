import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken } from '@/lib/db/auth';
import { store } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await store.getAllSettings();
    return NextResponse.json({ success: true, settings });
  } catch (err) {
    console.error('Settings GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve settings.' }, { status: 500 });
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

    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid settings payload.' }, { status: 400 });
    }

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        await store.setSetting(key, value);
      }
    }

    await store.logActivity(
      session.userId,
      session.name,
      'SETTINGS_UPDATE',
      'SETTING',
      'GLOBAL',
      `Updated website operational settings`
    );

    const updated = await store.getAllSettings();
    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    console.error('Settings PUT error:', err);
    return NextResponse.json({ error: 'Failed to update settings.' }, { status: 500 });
  }
}
