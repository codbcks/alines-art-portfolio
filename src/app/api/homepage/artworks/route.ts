import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import { artworkCreateSchema } from '@/db/validations/artwork';
import {
  createArtworks,
  deleteArtwork,
  queryArtworksByGalleryId,
} from '@/services/server/artworkServerService';
import { queryGalleryByTitle } from '@/services/server/galleryServerService';

const HOMEPAGE_TITLE = 'Home Page';

const ArtworkOverwriteSchema = z.array(artworkCreateSchema);

export async function GET() {
  try {
    const homepageGallery = await queryGalleryByTitle(HOMEPAGE_TITLE);
    if (!homepageGallery)
      return NextResponse.json({ error: 'Home Page gallery not found' }, { status: 404 });

    const artworks = await queryArtworksByGalleryId(homepageGallery.id);
    return NextResponse.json(artworks);
  } catch (error) {
    console.error('GET homepage artworks error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate incoming array of artwork-like objects
    const validated = ArtworkOverwriteSchema.parse(body);

    const homepageGallery = await queryGalleryByTitle(HOMEPAGE_TITLE);
    if (!homepageGallery) {
      return NextResponse.json({ error: 'Home Page gallery not found' }, { status: 404 });
    }

    // Delete current artworks in Home Page gallery
    const existing = await queryArtworksByGalleryId(homepageGallery.id);
    await Promise.all(existing.map((art) => deleteArtwork(art.id)));

    // Insert validated artworks with fixed galleryId and position
    const toInsert = validated.map((art, index) => ({
      ...art,
      galleryId: homepageGallery.id,
      position: index,
    }));

    const inserted = await Promise.all(toInsert.map((art) => createArtworks(art)));

    return NextResponse.json(inserted.map((a) => a[0]));
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }

    console.error('POST homepage artworks error:', error);
    return NextResponse.json({ error: 'Failed to update homepage artworks' }, { status: 500 });
  }
}
