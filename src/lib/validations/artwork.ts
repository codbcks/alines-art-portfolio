import { z } from 'zod';

export const artworkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  medium: z.string().max(100).optional(),
  dimensions: z.string().max(100).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  category: z.string().max(100).optional(),
  featured: z.boolean().default(false),
});

export type ArtworkInput = z.infer<typeof artworkSchema>;
