import { z } from 'zod';

export const artworkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  medium: z.string().max(100),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
  dimensions: z.string().max(100).optional(),
  description: z.string().optional(),
});

export type ArtworkInput = z.infer<typeof artworkSchema>;
