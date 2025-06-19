import { NextRequest, NextResponse } from 'next/server';
import { deleteGallery } from '@/services/server/deleteGallery';

export async function DELETE(request: NextRequest, { params }: { params: { galleryId: string } }) {
  try {
    const galleryId = parseInt(params.galleryId);
    if (isNaN(galleryId)) {
      return NextResponse.json({ error: 'Invalid gallery ID' }, { status: 400 });
    }

    await deleteGallery(galleryId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
