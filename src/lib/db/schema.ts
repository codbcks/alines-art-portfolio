import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

// TODO: Fix Rewrite database how i want it to be
export const artworks = pgTable('artworks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  medium: varchar('medium', { length: 100 }),
  dimensions: varchar('dimensions', { length: 100 }),
  year: integer('year'),
  imageUrl: varchar('image_url', { length: 500 }).notNull(),
  imagePublicId: varchar('image_public_id', { length: 255 }),
  category: varchar('category', { length: 100 }),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const exhibitions = pgTable('exhibitions', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  venue: varchar('venue', { length: 255 }),
  location: varchar('location', { length: 255 }),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  description: text('description'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
