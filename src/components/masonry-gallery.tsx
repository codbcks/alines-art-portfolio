'use client';

import React, { useState } from 'react';

interface Artwork {
  id: number;
  title: string;
  image: string;
  year: string;
  medium: string;
}

interface MasonryGalleryProps {
  artworks?: Artwork[];
  showTitle?: boolean;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ artworks = [], showTitle = false }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const sampleArtworks: Artwork[] =
    artworks.length > 0
      ? artworks
      : [
          {
            id: 1,
            title: 'Abstract Composition I',
            image:
              'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop&auto=format&q=80',
            year: '2024',
            medium: 'Oil on Canvas',
          },
          {
            id: 2,
            title: 'Urban Landscape',
            image:
              'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?w=800&h=400&fit=crop&auto=format&q=80',
            year: '2023',
            medium: 'Acrylic',
          },
          {
            id: 3,
            title: 'Portrait Study',
            image:
              'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=600&h=900&fit=crop&auto=format&q=80',
            year: '2024',
            medium: 'Charcoal',
          },
          {
            id: 4,
            title: "Nature's Rhythm",
            image:
              'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&h=500&fit=crop&auto=format&q=80',
            year: '2023',
            medium: 'Watercolor',
          },
          {
            id: 5,
            title: 'Geometric Forms',
            image:
              'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=900&h=600&fit=crop&auto=format&q=80',
            year: '2024',
            medium: 'Mixed Media',
          },
          {
            id: 6,
            title: 'Color Study',
            image:
              'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=500&h=800&fit=crop&auto=format&q=80',
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
      <div className="w-full py-10 px-4 sm:px-6 md:px-40">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 lg:gap-12 space-y-6 md:space-y-8 lg:space-y-12">
          {sampleArtworks.map((artwork) => (
            <div key={artwork.id} className="break-inside-avoid group">
              <div
                className="overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => handleImageClick(artwork)}
              >
                {!imageErrors.has(artwork.id) ? (
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                    loading="lazy"
                    onError={() => handleImageError(artwork.id)}
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-2xl mb-2">🖼️</div>
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
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="relative max-w-5xl max-h-full flex flex-col">
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-lg font-light transition-colors z-10"
            >
              ✕ Close
            </button>
            <div className="relative">
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
                <h3 className="text-xl md:text-2xl font-light mb-1">{selectedArtwork.title}</h3>
                <p className="text-sm md:text-base opacity-90">
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
