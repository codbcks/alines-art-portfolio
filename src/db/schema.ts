import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';

export const artworks = pgTable('artworks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  medium: varchar('medium', { length: 255 }).notNull(),
  year: integer('year').notNull(),
  dimensions: varchar('dimensions', { length: 100 }),
  description: text('description'),
  imageUrl: varchar('image_url', { length: 500 }).notNull(),
});

export const galleries = pgTable('galleries', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
});

// export const galleriesRelations = relations(galleries, ({ many }) => ({
//   artworks: many(artworks),
// }));
