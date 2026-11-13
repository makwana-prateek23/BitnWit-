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
    const category = searchParams.get('category') || undefined;
    const featuredOnly = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const { items: projects, totalCount } = await store.getProjects({
      category,
      featuredOnly,
      limit,
    });

    return NextResponse.json({ success: true, projects, totalCount });
  } catch (err) {
    console.error('Projects GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve projects.' }, { status: 500 });
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
        { error: 'Project title and slug are required.' },
        { status: 400 }
      );
    }

    const created = await store.createProject({
      slug: body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      title: body.title.trim(),
      clientName: body.clientName || 'Proprietary Solution',
      category: body.category || 'Web Application',
      shortDescription: body.shortDescription || '',
      detailedDescription: body.detailedDescription || '',
      coverImageUrl: body.coverImageUrl || '/work-resume-iq.png',
      galleryImageUrls: Array.isArray(body.galleryImageUrls) ? body.galleryImageUrls : [],
      technologiesUsed: Array.isArray(body.technologiesUsed) ? body.technologiesUsed : ['Next.js', 'TypeScript', 'Tailwind CSS'],
      projectUrl: body.projectUrl || '',
      completionDate: body.completionDate || new Date().toISOString().slice(0, 10),
      isFeatured: Boolean(body.isFeatured),
      publicationStatus: body.publicationStatus || 'PUBLISHED',
      displayOrder: typeof body.displayOrder === 'number' ? body.displayOrder : 0,
    });

    await store.logActivity(
      session.userId,
      session.name,
      'PROJECT_CREATE',
      'PROJECT',
      created.id,
      `Created project "${created.title}"`
    );

    return NextResponse.json({ success: true, project: created });
  } catch (err) {
    console.error('Project POST error:', err);
    return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
  }
}
