import { z } from 'zod';

export const exhibitionSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  venue: z.string().max(255).optional(),
  location: z.string().max(255).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
});

export type ExhibitionInput = z.infer<typeof exhibitionSchema>;
