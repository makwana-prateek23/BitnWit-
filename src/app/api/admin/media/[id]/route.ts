import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken } from '@/lib/db/auth';
import { store } from '@/lib/db/store';
import path from 'path';
import fs from 'fs/promises';

interface RouteContext {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const cookieName = getSessionCookieName();
    const token = req.cookies.get(cookieName)?.value;
    const session = token ? verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const file = await store.getMediaFile(params.id);
    if (!file) {
      return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    }

    // If file is in /uploads/, delete physical file
    const fileUrl = file.url || file.fileUrl || '';
    if (fileUrl.startsWith('/uploads/')) {
      const fileName = path.basename(fileUrl);
      const physicalPath = path.join(process.cwd(), 'public', 'uploads', fileName);
      try {
        await fs.unlink(physicalPath);
      } catch {
        // Continue even if file was already missing
      }
    }

    const success = await store.deleteMediaFile(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete record.' }, { status: 500 });
    }

    await store.logActivity(
      session.userId,
      session.name,
      'MEDIA_DELETE',
      'MEDIA_FILE',
      params.id,
      `Deleted file "${file.name}"`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Media DELETE error:', err);
    return NextResponse.json({ error: 'Failed to delete file.' }, { status: 500 });
  }
}
