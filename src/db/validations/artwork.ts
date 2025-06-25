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

// Schema for updating artworks (all fields optional except those that shouldn't change)
export const artworkUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  medium: z.string().min(1, 'Medium is required').max(255).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  dimensions: z.string().max(100).nullable().optional(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().url('Must be a valid URL').max(500).optional(),
  galleryId: z.number().int().positive('Gallery ID must be positive').optional(),
  position: z.number().int().min(0, 'Position must be non-negative').optional(),
});

export type ArtworkCreateInput = z.infer<typeof artworkCreateSchema>;
export type ArtworkUpdateInput = z.infer<typeof artworkUpdateSchema>;
export type ArtworkOutput = z.infer<typeof artworkSchema>;
