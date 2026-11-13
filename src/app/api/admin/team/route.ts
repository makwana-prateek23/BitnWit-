import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken } from '@/lib/db/auth';
import { store } from '@/lib/db/store';
import { AdminRole } from '@/lib/db/types';

export async function GET(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const department = searchParams.get('department') || undefined;
    const activeOnly = searchParams.get('active') === 'true';

    const members = await store.getTeamMembers({ department, activeOnly });
    return NextResponse.json({ success: true, members });
  } catch (err) {
    console.error('Team GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve team members.' }, { status: 500 });
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

    // Role check: Only SUPER_ADMIN and ADMIN can add team members
    if (session.role === 'EDITOR') {
      return NextResponse.json(
        { error: 'Insufficient permissions. Admin access required.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    if (!body.fullName || !body.designation) {
      return NextResponse.json(
        { error: 'Full name and designation are required.' },
        { status: 400 }
      );
    }

    const created = await store.createTeamMember({
      fullName: body.fullName.trim(),
      designation: body.designation.trim(),
      department: body.department || 'Engineering',
      bio: body.bio || '',
      profileImageUrl: body.profileImageUrl || '/bitty-mascot.png',
      socialLinks: body.socialLinks || {},
      adminAccessRole: (body.adminAccessRole as AdminRole | 'NONE') || 'NONE',
      displayOrder: typeof body.displayOrder === 'number' ? body.displayOrder : 0,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      isVisibleOnWebsite: body.isVisibleOnWebsite !== undefined ? Boolean(body.isVisibleOnWebsite) : true,
    });

    await store.logActivity(
      session.userId,
      session.name,
      'TEAM_CREATE',
      'TEAM_MEMBER',
      created.id,
      `Added team member "${created.fullName}"`
    );

    return NextResponse.json({ success: true, member: created });
  } catch (err) {
    console.error('Team POST error:', err);
    return NextResponse.json({ error: 'Failed to create team member.' }, { status: 500 });
  }
}
