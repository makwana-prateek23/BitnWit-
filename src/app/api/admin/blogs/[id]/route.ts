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

    const post = await store.getBlogPost(params.id);
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error('Blog GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve blog post.' }, { status: 500 });
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
    const updated = await store.updateBlogPost(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'BLOG_UPDATE',
      'BLOG_POST',
      updated.id,
      `Updated article "${updated.title}"`
    );

    return NextResponse.json({ success: true, post: updated });
  } catch (err) {
    console.error('Blog PUT error:', err);
    return NextResponse.json({ error: 'Failed to update blog post.' }, { status: 500 });
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

    const post = await store.getBlogPost(params.id);
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found.' }, { status: 404 });
    }

    const success = await store.deleteBlogPost(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Could not delete blog post.' }, { status: 500 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'BLOG_DELETE',
      'BLOG_POST',
      params.id,
      `Deleted article "${post.title}"`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Blog DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete blog post.' }, { status: 500 });
  }
}
