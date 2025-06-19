import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const artworks = pgTable('artworks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  medium: varchar('medium', { length: 255 }).notNull(),
  year: integer('year').notNull(),
  dimensions: varchar('dimensions', { length: 100 }),
  description: text('description'),
  imageUrl: varchar('image_url', { length: 500 }).notNull(),
  galleryId: integer('gallery_id')
    .references(() => galleries.id)
    .notNull(),
  position: integer('position').notNull(),
});

export const galleries = pgTable('galleries', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
});

export const galleriesRelations = relations(galleries, ({ many }) => ({
  artworks: many(artworks),
}));

export const artworksRelations = relations(artworks, ({ one }) => ({
  gallery: one(galleries, {
    fields: [artworks.galleryId],
    references: [galleries.id],
  }),
}));
