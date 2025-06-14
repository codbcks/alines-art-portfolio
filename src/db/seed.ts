import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { artworks, galleries } from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

function generateArtworkData(galleryIds: number[]) {
  const titles = [
    'Starry Night',
    'Water Lilies',
    'The Persistence of Memory',
    'Girl with a Pearl Earring',
    'The Scream',
    'Guernica',
    'Sunflowers',
    'The Night Watch',
    'The Birth of Venus',
    'American Gothic',
    'Mona Lisa',
    'The Kiss',
  ];

  const adjectives = [
    'Mystical',
    'Vibrant',
    'Serene',
    'Chaotic',
    'Epic',
    'Minimalist',
    'Abstract',
    'Surreal',
  ];
  const nouns = [
    'Landscape',
    'Portrait',
    'Dream',
    'Journey',
    'Revolution',
    'Harmony',
    'Conflict',
    'Essence',
  ];

  const mediums = [
    'Oil on Canvas',
    'Bronze Sculpture',
    'Watercolor',
    'Digital Print',
    'Charcoal Drawing',
    'Mixed Media',
  ];
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

  const randomTitle = () => {
    if (Math.random() > 0.5) return titles[Math.floor(Math.random() * titles.length)];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
  };

  return {
    title: randomTitle(),
    medium: mediums[Math.floor(Math.random() * mediums.length)],
    year: years[Math.floor(Math.random() * years.length)],
    dimensions: `${Math.floor(Math.random() * 150 + 30)}x${Math.floor(Math.random() * 150 + 30)} cm`,
    description: 'A captivating artwork that explores themes of light and space',
    imageUrl: `https://picsum.photos/seed/${Math.random()}/600/800`,
    galleryId: galleryIds[Math.floor(Math.random() * galleryIds.length)],
  };
}

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await db.delete(artworks);
  await db.delete(galleries);
  console.log('Cleared existing data');

  // Create galleries
  const galleryData = [
    { title: 'Modern Masters', slug: 'modern-masters' },
    { title: 'Renaissance Collection', slug: 'renaissance-collection' },
    { title: 'Contemporary Visions', slug: 'contemporary-visions' },
  ];

  const insertedGalleries = await db.insert(galleries).values(galleryData).returning();
  console.log(`Created ${insertedGalleries.length} galleries`);

  const galleryIds = insertedGalleries.map((g) => g.id);

  // Create artworks
  const artworkData = [];
  const artworkCount = 20;

  for (let i = 0; i < artworkCount; i++) {
    artworkData.push(generateArtworkData(galleryIds));
  }

  const insertedArtworks = await db.insert(artworks).values(artworkData).returning();
  console.log(`Created ${insertedArtworks.length} artworks`);

  // Verify data
  const galleryArtworkCounts: Record<string, number> = {};

  for (const gallery of insertedGalleries) {
    const count = insertedArtworks.filter((a) => a.galleryId === gallery.id).length;
    galleryArtworkCounts[gallery.title] = count;
  }

  console.log('\nGallery Artwork Counts:');
  for (const [gallery, count] of Object.entries(galleryArtworkCounts)) {
    console.log(`- ${gallery}: ${count} artworks`);
  }

  console.log('\nSeeding completed!');
}

main().catch((err) => {
  console.error('Seeding error:');
  console.error(err);
  process.exit(1);
});
