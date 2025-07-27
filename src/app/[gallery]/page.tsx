import MasonryGallery from '@/components/masonry-gallery';
import { queryGalleryBySlug } from '@/services/server/galleryServerService';
import { notFound } from 'next/navigation';

interface GalleryPageProps {
  params: Promise<{
    gallery: string;
  }>;
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { gallery: gallerySlug } = await params;

  // Handle undefined slug case
  if (!gallerySlug) {
    notFound();
  }

  try {
    const galleryData = await queryGalleryBySlug(gallerySlug);

    // Only call notFound if the gallery itself doesn't exist
    if (!galleryData) {
      notFound();
    }

    // If gallery exists but has no artworks, show empty gallery
    const artworks = galleryData.artworks || [];

    return <MasonryGallery artworks={artworks} />;
  } catch (error) {
    console.error('Failed to load gallery:', error);
    notFound();
  }
}
