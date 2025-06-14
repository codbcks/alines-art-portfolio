import { z } from 'zod';

export const gallerySchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
});

export type galleryInput = z.infer<typeof gallerySchema>;
