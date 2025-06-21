import { z } from 'zod';

// Schema for creating artworks (excludes auto-generated id)
export const artworkCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  medium: z.string().min(1, 'Medium is required').max(255),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
  dimensions: z.string().max(100).optional(),
  description: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL').max(500),
  galleryId: z.number().int().positive('Gallery ID must be positive'),
  position: z.number().int().min(0, 'Position must be non-negative'),
});

// Schema for full artwork (includes id, for responses)
export const artworkSchema = artworkCreateSchema.extend({
  id: z.number().int(),
});

export type ArtworkCreateInput = z.infer<typeof artworkCreateSchema>;
export type ArtworkOutput = z.infer<typeof artworkSchema>;
