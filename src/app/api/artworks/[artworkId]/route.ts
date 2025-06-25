import { NextRequest, NextResponse } from 'next/server';
import { artworkCreateSchema, artworkUpdateSchema } from '@/db/validations/artwork';
import {
  createArtworks,
  deleteArtwork,
  updateArtwork,
} from '@/services/server/artworkServerService';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const artworkData = await request.json();
    const validatedData = artworkCreateSchema.parse(artworkData);

    const created = await createArtworks(validatedData);
    return NextResponse.json(created[0]);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ artworkId: string }> },
) {
  try {
    const { artworkId } = await params;
    const id = parseInt(artworkId);
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

    const artworkData = await request.json();
    if (artworkData.dimensions === '') artworkData.dimensions = null;
    if (artworkData.description === '') artworkData.description = null;
    const validated = artworkUpdateSchema.parse(artworkData);
    const updated = await updateArtwork(id, validated);
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 },
      );
    }
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ artworkId: string }> },
) {
  const { artworkId } = await params;
  const id = parseInt(artworkId);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

  try {
    await deleteArtwork(id);
    return NextResponse.json({ message: 'Artwork deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
