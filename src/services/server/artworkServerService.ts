import { db } from '@/db';
import { artworks } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { Artwork } from '@/types/Artwork';
import { ArtworkCreateInput, ArtworkUpdateInput } from '@/db/validations/artwork';

export const createArtworks = async (artworkData: ArtworkCreateInput) => {
  return db.insert(artworks).values(artworkData).returning();
};

export const updateArtworksOrder = async (galleryId: number, artworksData: Artwork[]) => {
  if (artworksData.length === 0) return;

  const values = artworksData.map((a) => sql`(${a.id}:: int, ${a.position}:: int)`);

  await db.execute(sql`
      UPDATE ${artworks} AS a
      SET position = t.position::int
      FROM (VALUES ${sql.join(values, sql.raw(', '))}) AS t(id, position)
      WHERE a.id = t.id:: int
  `);
};

export const queryArtworksByGalleryId = async (galleryId: number): Promise<Artwork[]> => {
  return await db
    .select()
    .from(artworks)
    .where(eq(artworks.galleryId, galleryId))
    .orderBy(artworks.position);
};

export const updateArtwork = async (artworkId: number, artworkData: ArtworkUpdateInput) => {
  const result = await db
    .update(artworks)
    .set(artworkData)
    .where(eq(artworks.id, artworkId))
    .returning();

  return result[0];
};
