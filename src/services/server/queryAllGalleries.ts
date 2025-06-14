import { db } from '@/db';
import { galleries } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type Gallery = InferSelectModel<typeof galleries>;

export const queryAllGalleries = async (): Promise<Gallery[]> => {
  return await db.select().from(galleries);
};
