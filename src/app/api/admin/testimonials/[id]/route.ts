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

    const testimonial = await store.getTestimonial(params.id);
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, testimonial });
  } catch (err) {
    console.error('Testimonial GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve testimonial.' }, { status: 500 });
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
    const updated = await store.updateTestimonial(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Testimonial not found.' }, { status: 404 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'TESTIMONIAL_UPDATE',
      'TESTIMONIAL',
      updated.id,
      `Updated review from ${updated.clientName}`
    );

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (err) {
    console.error('Testimonial PUT error:', err);
    return NextResponse.json({ error: 'Failed to update testimonial.' }, { status: 500 });
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

    const testimonial = await store.getTestimonial(params.id);
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found.' }, { status: 404 });
    }

    const success = await store.deleteTestimonial(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Could not delete testimonial.' }, { status: 500 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'TESTIMONIAL_DELETE',
      'TESTIMONIAL',
      params.id,
      `Deleted review from ${testimonial.clientName}`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Testimonial DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete testimonial.' }, { status: 500 });
  }
}
