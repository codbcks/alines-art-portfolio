'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Artwork {
  id: number;
  title: string;
  image: string;
  year: string;
  medium: string;
}

const MasonryGallery: React.FC<{ artworks?: Artwork[] }> = ({ artworks = [] }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const sampleArtworks: Artwork[] =
    artworks.length > 0
      ? artworks
      : [
          {
            id: 1,
            title: 'Abstract Composition I',
            image: '/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop&auto=format&q=80',
            year: '2024',
            medium: 'Oil on Canvas',
          },
          {
            id: 2,
            title: 'Urban Landscape',
            image: '/photo-1506260408121-e353d10b87c7?w=800&h=400&fit=crop&auto=format&q=80',
            year: '2023',
            medium: 'Acrylic',
          },
          {
            id: 3,
            title: 'Portrait Study',
            image: '/photo-1575936123452-b67c3203c357?w=600&h=900&fit=crop&auto=format&q=80',
            year: '2024',
            medium: 'Charcoal',
          },
          {
            id: 4,
            title: "Nature's Rhythm",
            image: '/photo-1441974231531-c6227db76b6e?w=700&h=500&fit=crop&auto=format&q=80',
            year: '2023',
            medium: 'Watercolor',
          },
          {
            id: 5,
            title: 'Geometric Forms',
            image: '/photo-1476820865390-c52aeebb9891?w=900&h=600&fit=crop&auto=format&q=80',
            year: '2024',
            medium: 'Mixed Media',
          },
          {
            id: 6,
            title: 'Color Study',
            image: '/photo-1515405295579-ba7b45403062?w=500&h=800&fit=crop&auto=format&q=80',
            year: '2023',
            medium: 'Oil Pastel',
          },
        ];

  const handleImageError = (artworkId: number) => {
    setImageErrors((prev) => new Set(prev).add(artworkId));
  };

  const handleImageClick = (artwork: Artwork) => {
    if (!imageErrors.has(artwork.id)) {
      setSelectedArtwork(artwork);
    }
  };

  // Close modal on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArtwork(null);
      }
    };

    if (selectedArtwork) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedArtwork]);

  return (
    <>
      <div className="w-full px-4 py-10 sm:px-6 md:px-40">
        <div className="columns-1 gap-6 space-y-6 sm:columns-2 md:gap-8 md:space-y-8 lg:columns-3 lg:gap-12 lg:space-y-12">
          {sampleArtworks.map((artwork) => (
            <div key={artwork.id} className="group break-inside-avoid">
              <div
                className="cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => handleImageClick(artwork)}
              >
                {!imageErrors.has(artwork.id) ? (
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    width={400}
                    height={600}
                    className="h-auto w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                    loading="lazy"
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
            </div>
          ))}
        </div>
      </div>

      {/* Modal for enlarged view */}
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
              <Image
                src={selectedArtwork.image}
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

export default MasonryGallery;
