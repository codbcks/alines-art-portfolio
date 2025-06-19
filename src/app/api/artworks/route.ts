import { NextRequest, NextResponse } from 'next/server';
import { artworkSchema } from '@/db/validations/artwork';
import { db } from '@/db';
import { artworks } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = artworkSchema.parse({
      body,
    });

    // Insert artwork using validated data
    const [newArtwork] = await db.insert(artworks).values(validatedData).returning();

    return NextResponse.json(newArtwork, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
