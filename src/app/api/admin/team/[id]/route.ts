import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken } from '@/lib/db/auth';
import { store } from '@/lib/db/store';

interface RouteContext {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const member = await store.getTeamMember(params.id);
    if (!member) {
      return NextResponse.json({ error: 'Team member not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, member });
  } catch (err) {
    console.error('Team GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve member.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role === 'EDITOR') {
      return NextResponse.json(
        { error: 'Insufficient permissions. Admin access required.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const updated = await store.updateTeamMember(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Team member not found.' }, { status: 404 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'TEAM_UPDATE',
      'TEAM_MEMBER',
      updated.id,
      `Updated member "${updated.fullName}"`
    );

    return NextResponse.json({ success: true, member: updated });
  } catch (err) {
    console.error('Team PUT error:', err);
    return NextResponse.json({ error: 'Failed to update member.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Only Super Admin can delete team records.' },
        { status: 403 }
      );
    }

    const member = await store.getTeamMember(params.id);
    if (!member) {
      return NextResponse.json({ error: 'Team member not found.' }, { status: 404 });
    }

    const success = await store.deleteTeamMember(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete member.' }, { status: 500 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'TEAM_DELETE',
      'TEAM_MEMBER',
      params.id,
      `Deleted team member "${member.fullName}"`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Team DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete member.' }, { status: 500 });
  }
}
