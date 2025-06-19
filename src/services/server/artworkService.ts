import { db } from '@/db';
import { artworks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Artwork } from '@/types/Artwork';

export const updateArtworksOrder = async (galleryId: number, artworksData: Artwork[]) => {
  await db.transaction(async (tx) => {
    for (const artwork of artworksData) {
      await tx
        .update(artworks)
        .set({ position: artwork.position })
        .where(eq(artworks.id, artwork.id));
    }
  });
};

export const queryArtworksByGalleryId = async (galleryId: number): Promise<Artwork[]> => {
  return await db
    .select()
    .from(artworks)
    .where(eq(artworks.galleryId, galleryId))
    .orderBy(artworks.position);
};

export const updateArtwork = async (artworkId: number, artworkData: Artwork): Promise<Artwork> => {
  const result = await db
    .update(artworks)
    .set(artworkData)
    .where(eq(artworks.id, artworkId))
    .returning();

  return result[0];
};
