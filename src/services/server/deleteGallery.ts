import { db } from '@/db';
import { galleries } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const deleteGallery = async (galleryId: number) => {
  await db.delete(galleries).where(eq(galleries.id, galleryId));
};
