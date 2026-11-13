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
    const publishedOnly = searchParams.get('published') === 'true';

    const services = await store.getServices({ publishedOnly });
    return NextResponse.json({ success: true, services });
  } catch (err) {
    console.error('Services GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve services.' }, { status: 500 });
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
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: 'Service title and URL slug are required.' },
        { status: 400 }
      );
    }

    const created = await store.createService({
      slug: body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      title: body.title.trim(),
      shortDescription: body.shortDescription || '',
      detailedDescription: body.detailedDescription || '',
      icon: body.icon || 'code',
      coverImageUrl: body.coverImageUrl || '/services/web-development.png',
      deliverables: Array.isArray(body.deliverables) ? body.deliverables : [],
      benefits: Array.isArray(body.benefits) ? body.benefits : [],
      ctaText: body.ctaText || 'Get Started',
      displayOrder: typeof body.displayOrder === 'number' ? body.displayOrder : 0,
      isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : true,
    });

    await store.logActivity(
      session.userId,
      session.name,
      'SERVICE_CREATE',
      'SERVICE',
      created.id,
      `Created service "${created.title}"`
    );

    return NextResponse.json({ success: true, service: created });
  } catch (err) {
    console.error('Service POST error:', err);
    return NextResponse.json({ error: 'Failed to create service.' }, { status: 500 });
  }
}
