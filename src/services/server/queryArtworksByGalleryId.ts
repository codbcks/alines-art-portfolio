import { db } from '@/db';
import { artworks } from '@/db/schema';
import { eq, InferSelectModel } from 'drizzle-orm';

export type Artwork = InferSelectModel<typeof artworks>;

export const queryArtworksByGalleryId = async (galleryId: number): Promise<Artwork[]> => {
  return await db
    .select()
    .from(artworks)
    .where(eq(artworks.galleryId, galleryId))
    .orderBy(artworks.position);
};
