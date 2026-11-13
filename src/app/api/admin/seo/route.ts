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
    const pageRoute = searchParams.get('route');

    if (pageRoute) {
      const seo = await store.getSeo(pageRoute);
      return NextResponse.json({ success: true, seo });
    }

    const seoList = await store.getAllSeo();
    return NextResponse.json({ success: true, seoList });
  } catch (err) {
    console.error('SEO GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve SEO data.' }, { status: 500 });
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
    if (!body.pageRoute || !body.pageTitle) {
      return NextResponse.json(
        { error: 'Page route and page title are required.' },
        { status: 400 }
      );
    }

    const updated = await store.upsertSeo({
      pageRoute: body.pageRoute,
      pageTitle: body.pageTitle,
      metaDescription: body.metaDescription || '',
      focusKeywords: Array.isArray(body.focusKeywords) ? body.focusKeywords : [],
      canonicalUrl: body.canonicalUrl || `https://www.bitnwit.com${body.pageRoute}`,
      ogTitle: body.ogTitle || body.pageTitle,
      ogDescription: body.ogDescription || body.metaDescription || '',
      ogImageUrl: body.ogImageUrl || '/bitnwit-brand-asset-board.png',
      noIndex: Boolean(body.noIndex),
    });

    await store.logActivity(
      session.userId,
      session.name,
      'SEO_UPDATE',
      'SEO_METADATA',
      updated.id,
      `Updated SEO metadata for ${updated.pageRoute}`
    );

    return NextResponse.json({ success: true, seo: updated });
  } catch (err) {
    console.error('SEO PUT error:', err);
    return NextResponse.json({ error: 'Failed to update SEO.' }, { status: 500 });
  }
}
