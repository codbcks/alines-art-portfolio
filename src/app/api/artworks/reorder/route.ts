import { db } from '@/db';
import { artworks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const { artworks: reorderedArtworks } = await request.json();

    // Validate input
    if (!Array.isArray(reorderedArtworks)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Update artwork positions in a transaction
    await db.transaction(async (tx) => {
      for (const artwork of reorderedArtworks) {
        await tx
          .update(artworks)
          .set({ position: artwork.position })
          .where(eq(artworks.id, artwork.id));
      }
    });

    return NextResponse.json({ message: 'Artworks reordered successfully' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
