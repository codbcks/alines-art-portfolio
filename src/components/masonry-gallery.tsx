'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Masonry from 'react-masonry-css';
import { CldImage } from 'next-cloudinary';
import { Artwork } from '@/types/Artwork';

const MasonryGallery: React.FC<{ artworks?: Artwork[] }> = ({ artworks = [] }) => {
  const sortedArtworks = useMemo(() => {
    return [...artworks].sort((a, b) => a.position - b.position);
  }, [artworks]);

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = useCallback((artworkId: number) => {
    setImageErrors((prev) => ({ ...prev, [artworkId]: true }));
  }, []);

  const handleImageClick = useCallback(
    (artwork: Artwork) => {
      if (!imageErrors[artwork.id]) {
        setSelectedArtwork(artwork);
      }
    },
    [imageErrors],
  );

  useEffect(() => {
    if (!selectedArtwork) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArtwork(null);
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedArtwork]);

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <>
      <div className="w-full px-4 py-10 sm:px-6 md:px-40">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-6"
          columnClassName="space-y-6"
        >
          {sortedArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group cursor-pointer"
              onClick={() => handleImageClick(artwork)}
            >
              {!imageErrors[artwork.id] ? (
                <CldImage
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  width={400}
                  height={600}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.02] hover:opacity-90"
                  onError={() => handleImageError(artwork.id)}
                />
              ) : (
                <div className="flex aspect-[3/4] w-full items-center justify-center bg-gray-100">
                  <div className="text-center text-gray-500">
                    <div className="mb-2 text-2xl">🖼️</div>
                    <p className="text-sm">Image unavailable</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Masonry>
      </div>

      {selectedArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="relative flex max-h-full max-w-5xl flex-col">
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute -top-12 right-0 z-10 text-lg font-light text-white transition-colors hover:text-gray-300"
            >
              ✕ Close
            </button>
            <div className="relative">
              <CldImage
                src={selectedArtwork.imageUrl}
                alt={selectedArtwork.title}
                width={800}
                height={600}
                className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="mb-1 text-xl font-light md:text-2xl">{selectedArtwork.title}</h3>
                <p className="text-sm opacity-90 md:text-base">
                  {selectedArtwork.medium}, {selectedArtwork.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(MasonryGallery);
