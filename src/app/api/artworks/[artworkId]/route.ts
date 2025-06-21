import { NextRequest, NextResponse } from 'next/server';
import { artworkUpdateSchema } from '@/db/validations/artwork';
import { updateArtwork } from '@/services/server/artworkServerService';
import { ZodError } from 'zod';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ artworkId: string }> },
) {
  try {
    const { artworkId } = await params;
    const id = parseInt(artworkId);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid artwork ID' }, { status: 400 });
    }

    const artworkData = await request.json();
    const validatedData = artworkUpdateSchema.parse(artworkData);

    const updatedArtwork = await updateArtwork(id, validatedData);

    return NextResponse.json(updatedArtwork);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }

    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
