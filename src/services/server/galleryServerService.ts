import { db } from '@/db';
import { galleries } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Gallery } from '@/types/Gallery';

export const insertGallery = async (galleryData: Gallery): Promise<Gallery> => {
  const result = await db.insert(galleries).values(galleryData).returning();
  return result[0];
};

export const updateGallery = async (
  galleryId: number,
  galleryData: Partial<Gallery>,
): Promise<Gallery> => {
  const result = await db
    .update(galleries)
    .set(galleryData)
    .where(eq(galleries.id, galleryId))
    .returning();

  return result[0];
};

export const deleteGallery = async (galleryId: number) => {
  await db.delete(galleries).where(eq(galleries.id, galleryId));
};

export const queryAllGalleries = async (): Promise<Gallery[]> => {
  return db.select().from(galleries);
};

export const queryGalleryBySlug = async (slug: string) => {
  return db.query.galleries.findFirst({
    where: (galleries, { eq }) => eq(galleries.slug, slug),
  });
};

export const queryGalleryByTitle = async (title: string) => {
  return db.query.galleries.findFirst({
    where: (galleries, { eq }) => eq(galleries.title, title),
  });
};
