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

    const project = await store.getProject(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (err) {
    console.error('Project GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve project.' }, { status: 500 });
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

    const body = await req.json();
    const updated = await store.updateProject(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'PROJECT_UPDATE',
      'PROJECT',
      updated.id,
      `Updated project "${updated.title}"`
    );

    return NextResponse.json({ success: true, project: updated });
  } catch (err) {
    console.error('Project PUT error:', err);
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
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

    const project = await store.getProject(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    const success = await store.deleteProject(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Could not delete project.' }, { status: 500 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'PROJECT_DELETE',
      'PROJECT',
      params.id,
      `Deleted project "${project.title}"`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Project DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete project.' }, { status: 500 });
  }
}
