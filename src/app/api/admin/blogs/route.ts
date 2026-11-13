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
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const { items: posts, totalCount } = await store.getBlogPosts({
      status: status as 'PUBLISHED' | 'DRAFT' | 'SCHEDULED' | undefined,
      search,
    });

    return NextResponse.json({ success: true, posts, totalCount });
  } catch (err) {
    console.error('Blog GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve blogs.' }, { status: 500 });
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
        { error: 'Post title and slug are required.' },
        { status: 400 }
      );
    }

    const created = await store.createBlogPost({
      slug: body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      title: body.title.trim(),
      excerpt: body.excerpt || '',
      content: body.content || '',
      coverImageUrl: body.coverImageUrl || '/bitnwit-brand-asset-board.png',
      category: body.category || 'Technology',
      tags: Array.isArray(body.tags) ? body.tags : ['Engineering'],
      authorName: body.authorName || session.name,
      authorAvatarUrl: body.authorAvatarUrl || '/bitty-mascot.png',
      publishedAt: body.publishedAt || new Date().toISOString(),
      readingTime: body.readingTime || '5 min read',
      status: body.status || 'PUBLISHED',
      metaTitle: body.metaTitle || body.title,
      metaDescription: body.metaDescription || body.excerpt,
    });

    await store.logActivity(
      session.userId,
      session.name,
      'BLOG_CREATE',
      'BLOG_POST',
      created.id,
      `Published article "${created.title}"`
    );

    return NextResponse.json({ success: true, post: created });
  } catch (err) {
    console.error('Blog POST error:', err);
    return NextResponse.json({ error: 'Failed to create blog post.' }, { status: 500 });
  }
}
