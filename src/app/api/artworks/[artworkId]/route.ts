import { NextRequest, NextResponse } from 'next/server';
import { artworkSchema } from '@/db/validations/artwork';
import { Artwork } from '@/types/Artwork';
import { updateArtwork } from '@/services/server/artworkService';

export async function PUT(request: NextRequest, { params }: { params: { artworkId: string } }) {
  try {
    const artworkId = parseInt(params.artworkId);
    if (isNaN(artworkId)) {
      return NextResponse.json({ error: 'Invalid artwork ID' }, { status: 400 });
    }

    const artworkData: Partial<Artwork> = await request.json();

    const validatedData = artworkSchema.parse(artworkData);

    const updatedArtwork = updateArtwork(artworkId, validatedData);

    return NextResponse.json(updatedArtwork);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
