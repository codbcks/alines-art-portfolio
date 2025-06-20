import { NextRequest, NextResponse } from 'next/server';
import { Artwork } from '@/types/Artwork';
import {
  queryArtworksByGalleryId,
  updateArtworksOrder,
} from '@/services/server/artworkServerService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ galleryId: string }> },
) {
  try {
    const { galleryId } = await params;
    const id = parseInt(galleryId);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid gallery ID' }, { status: 400 });
    }

    const artworks = await queryArtworksByGalleryId(id);
    return NextResponse.json(artworks);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ galleryId: string }> },
) {
  try {
    const { galleryId } = await params;
    const id = parseInt(galleryId);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid gallery ID' }, { status: 400 });
    }

    const body = await request.json();
    const artworks: Artwork[] = body.artworks;

    // Validate all artworks belong to this gallery
    if (artworks.some((a) => a.galleryId !== id)) {
      return NextResponse.json(
        { error: 'Artworks do not belong to this gallery' },
        { status: 400 },
      );
    }

    await updateArtworksOrder(id, artworks);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
