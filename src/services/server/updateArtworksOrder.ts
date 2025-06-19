import { db } from '@/db';
import { artworks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { InferSelectModel } from 'drizzle-orm';

export type Artwork = InferSelectModel<typeof artworks>;

export const updateArtworksOrder = async (galleryId: number, artworksData: Artwork[]) => {
  // Using transaction for atomic updates
  await db.transaction(async (tx) => {
    for (const artwork of artworksData) {
      await tx
        .update(artworks)
        .set({ position: artwork.position })
        .where(eq(artworks.id, artwork.id));
    }
  });
};