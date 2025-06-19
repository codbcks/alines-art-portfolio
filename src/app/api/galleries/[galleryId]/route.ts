import { NextRequest, NextResponse } from 'next/server';
import { Gallery } from '@/types/Gallery';
import { deleteGallery, updateGallery } from '@/services/server/galleryService';

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

export async function PUT(request: NextRequest, { params }: { params: { galleryId: string } }) {
  try {
    const galleryId = parseInt(params.galleryId);
    if (isNaN(galleryId)) {
      return NextResponse.json({ error: 'Invalid gallery ID' }, { status: 400 });
    }

    const galleryData: Partial<Gallery> = await request.json();
    const updatedGallery = await updateGallery(galleryId, galleryData);
    return NextResponse.json(updatedGallery);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
