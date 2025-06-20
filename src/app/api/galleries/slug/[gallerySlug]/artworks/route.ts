import { NextRequest, NextResponse } from 'next/server';
import { queryGalleryBySlug } from '@/services/server/galleryServerService';
import { queryArtworksByGalleryId } from '@/services/server/artworkServerService';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ gallerySlug: string }> },
) {
  try {
    const { gallerySlug } = await params;

    if (!gallerySlug) {
      return NextResponse.json({ error: 'Gallery slug is required' }, { status: 400 });
    }

    // Get gallery by slug
    const gallery = await queryGalleryBySlug(gallerySlug);

    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    // Get artworks for this gallery
    const artworks = await queryArtworksByGalleryId(gallery.id);

    return NextResponse.json(artworks);
  } catch (error) {
    console.error('GET artworks error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
