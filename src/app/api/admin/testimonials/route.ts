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

    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get('featured') === 'true';

    const testimonials = await store.getTestimonials({ featuredOnly });
    return NextResponse.json({ success: true, testimonials });
  } catch (err) {
    console.error('Testimonials GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve testimonials.' }, { status: 500 });
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

    const body = await req.json();
    if (!body.clientName || !body.reviewText) {
      return NextResponse.json(
        { error: 'Client name and testimonial review text are required.' },
        { status: 400 }
      );
    }

    const created = await store.createTestimonial({
      clientName: body.clientName.trim(),
      clientDesignation: body.clientDesignation || 'Client',
      companyName: body.companyName || '',
      clientPhotoUrl: body.clientPhotoUrl || '/bitty-mascot.png',
      reviewText: body.reviewText.trim(),
      rating: typeof body.rating === 'number' ? Math.max(1, Math.min(5, body.rating)) : 5,
      serviceProvided: body.serviceProvided || 'Web Development',
      isFeaturedOnHomepage: Boolean(body.isFeaturedOnHomepage),
      displayStatus: body.displayStatus || 'VISIBLE',
      displayOrder: typeof body.displayOrder === 'number' ? body.displayOrder : 0,
    });

    await store.logActivity(
      session.userId,
      session.name,
      'TESTIMONIAL_CREATE',
      'TESTIMONIAL',
      created.id,
      `Added testimonial from ${created.clientName}`
    );

    return NextResponse.json({ success: true, testimonial: created });
  } catch (err) {
    console.error('Testimonial POST error:', err);
    return NextResponse.json({ error: 'Failed to create testimonial.' }, { status: 500 });
  }
}
