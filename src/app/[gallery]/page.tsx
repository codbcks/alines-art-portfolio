'use client';

import MasonryGallery from '@/components/masonry-gallery';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getArtworksBySlug } from '@/services/client/artworkClientService';
import { Artwork } from '@/types/Artwork';

export default function GalleryPage() {
  const params = useParams();
  const gallerySlug = Array.isArray(params.gallery) ? params.gallery[0] : params.gallery;

  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Handle undefined slug case
    if (!gallerySlug) {
      setError('Invalid gallery identifier');
      setIsLoading(false);
      return;
    }

    const fetchArtworks = async () => {
      try {
        setIsLoading(true);
        const data = await getArtworksBySlug(gallerySlug);

        if (!data || data.length === 0) {
          setError('Gallery not found');
        } else {
          setArtworks(data);
        }
      } catch (err) {
        setError('Failed to load gallery');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworks();
  }, [gallerySlug]);

  if (isLoading) {
    return <div className="py-10 text-center">Loading gallery...</div>;
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-xl font-bold text-red-600">{error}</h2>
        <p className="mt-2 text-gray-600">Please try again later</p>
      </div>
    );
  }

  return artworks ? <MasonryGallery artworks={artworks} /> : null;
}
