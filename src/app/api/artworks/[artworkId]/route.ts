import { NextRequest, NextResponse } from 'next/server';
import { artworkSchema } from '@/db/validations/artwork';
import { db } from '@/db';
import { artworks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid artwork ID' }, { status: 400 });
    }

    const body = await request.json();

    const validatedData = artworkSchema.parse({
      body,
    });

    const [updatedArtwork] = await db
      .update(artworks)
      .set(validatedData)
      .where(eq(artworks.id, id))
      .returning();

    if (!updatedArtwork) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }

    return NextResponse.json(updatedArtwork);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
