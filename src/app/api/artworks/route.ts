import { NextRequest, NextResponse } from 'next/server';
import { artworkCreateSchema } from '@/db/validations/artwork';
import { db } from '@/db';
import { artworks } from '@/db/schema';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = artworkCreateSchema.parse(body);

    // Insert artwork using validated data
    const [newArtwork] = await db.insert(artworks).values(validatedData).returning();

    return NextResponse.json(newArtwork, { status: 201 });
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
