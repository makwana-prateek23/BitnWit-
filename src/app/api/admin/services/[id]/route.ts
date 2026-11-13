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

    const service = await store.getService(params.id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, service });
  } catch (err) {
    console.error('Service GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve service.' }, { status: 500 });
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
    const updated = await store.updateService(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'SERVICE_UPDATE',
      'SERVICE',
      updated.id,
      `Updated service "${updated.title}"`
    );

    return NextResponse.json({ success: true, service: updated });
  } catch (err) {
    console.error('Service PUT error:', err);
    return NextResponse.json({ error: 'Failed to update service.' }, { status: 500 });
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

    const service = await store.getService(params.id);
    if (!service) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    const success = await store.deleteService(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Could not delete service.' }, { status: 500 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'SERVICE_DELETE',
      'SERVICE',
      params.id,
      `Deleted service "${service.title}"`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Service DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete service.' }, { status: 500 });
  }
}
