import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken } from '@/lib/db/auth';
import { store } from '@/lib/db/store';
import { MediaFolder } from '@/lib/db/types';
import path from 'path';
import fs from 'fs/promises';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function GET(req: NextRequest) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const folder = (searchParams.get('folder') as MediaFolder) || undefined;
    const search = searchParams.get('search') || undefined;

    const files = await store.getMediaFiles({ folder, search });
    return NextResponse.json({ success: true, files });
  } catch (err) {
    console.error('Media GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve media files.' }, { status: 500 });
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

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as MediaFolder) || 'BRAND';

    if (!file) {
      return NextResponse.json({ error: 'No file provided in form upload.' }, { status: 400 });
    }

    // 10MB size limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds maximum 10MB limit.' }, { status: 400 });
    }

    // Ensure uploads directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Generate sanitized unique filename
    const ext = path.extname(file.name) || '.png';
    const baseName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9]/g, '-');
    const uniqueName = `${baseName}-${Date.now()}${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;

    const mediaFile = await store.registerMediaFile({
      name: file.name,
      url: publicUrl,
      folder,
      mimeType: file.type || 'application/octet-stream',
      sizeBytes: file.size,
      uploadedBy: session.name,
    });

    await store.logActivity(
      session.userId,
      session.name,
      'MEDIA_UPLOAD',
      'MEDIA_FILE',
      mediaFile.id,
      `Uploaded asset "${file.name}" to folder ${folder}`
    );

    return NextResponse.json({ success: true, file: mediaFile });
  } catch (err) {
    console.error('Media upload error:', err);
    return NextResponse.json({ error: 'Failed to upload media asset.' }, { status: 500 });
  }
}
