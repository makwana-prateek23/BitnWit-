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

    const lead = await store.getLead(params.id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead });
  } catch (err) {
    console.error('Lead GET error:', err);
    return NextResponse.json({ error: 'Failed to get lead.' }, { status: 500 });
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
    const updated = await store.updateLead(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'LEAD_UPDATE',
      'LEAD',
      updated.id,
      `Updated lead ${updated.fullName} status to ${updated.status}`
    );

    return NextResponse.json({ success: true, lead: updated });
  } catch (err) {
    console.error('Lead PUT error:', err);
    return NextResponse.json({ error: 'Failed to update lead.' }, { status: 500 });
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

    const lead = await store.getLead(params.id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    const success = await store.deleteLead(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Could not delete lead.' }, { status: 500 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'LEAD_DELETE',
      'LEAD',
      params.id,
      `Deleted lead ${lead.fullName} (${lead.email})`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete lead.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const content = typeof body.content === 'string' ? body.content.trim() : '';
    if (!content) {
      return NextResponse.json({ error: 'Note content cannot be empty.' }, { status: 400 });
    }

    const note = await store.addLeadNote(
      params.id,
      session.userId,
      session.name,
      content
    );

    if (!note) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'LEAD_NOTE_ADD',
      'LEAD',
      params.id,
      `Added internal CRM note to lead`
    );

    return NextResponse.json({ success: true, note });
  } catch (err) {
    console.error('Lead Note POST error:', err);
    return NextResponse.json({ error: 'Failed to add note.' }, { status: 500 });
  }
}
