'use client';

import React, { useEffect, useState } from 'react';
import { Artwork } from '@/types/Artwork';
import { Gallery } from '@/types/Gallery';
import { getGalleries } from '@/services/client/galleryClientService';
import { getArtworksById } from '@/services/client/artworkClientService';
import { addToHomepageGallery } from '@/services/client/homepageClientService';

const HOMEPAGE_GALLERY_TITLE = 'Home Page';

const AdminHomepagePage = () => {
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Set<number>>(new Set());
  const [homeGallery, setHomeGallery] = useState<Gallery | null>(null);
  const [homeArtworks, setHomeArtworks] = useState<Artwork[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const galleries = await getGalleries();
    const home = galleries.find((g) => g.title === HOMEPAGE_GALLERY_TITLE);
    if (!home) {
      console.error('Home Page gallery not found.');
      return;
    }
    setHomeGallery(home);

    const all: Artwork[] = [];
    for (const gallery of galleries) {
      const artworks = await getArtworksById(gallery.id);
      all.push(...artworks.map((a) => ({ ...a, galleryId: gallery.id })));
    }
    setAllArtworks(all);

    const homeArts = await getArtworksById(home.id);
    setHomeArtworks(homeArts);
    setSelectedArtworks(new Set(homeArts.map((a) => a.id)));
  };

  const toggleSelection = (artworkId: number) => {
    setSelectedArtworks((prev) => {
      const updated = new Set(prev);
      if (updated.has(artworkId)) updated.delete(artworkId);
      else updated.add(artworkId);
      return updated;
    });
  };

  const handleSave = async () => {
    if (!homeGallery) return;

    setSaving(true);
    try {
      // Get current homepage artwork IDs
      const currentIds = new Set(homeArtworks.map((a) => a.id));

      // Filter artworks that are newly selected and not already on homepage
      const newArtworks = allArtworks.filter(
        (art) => selectedArtworks.has(art.id) && !currentIds.has(art.id),
      );

      if (newArtworks.length === 0) {
        setSaving(false);
        return;
      }

      // Assign positions after existing ones
      const startingPosition = homeArtworks.length;
      const newHomeArtworks = newArtworks.map((art, i) => ({
        title: art.title,
        medium: art.medium,
        year: art.year,
        dimensions: art.dimensions || undefined,
        description: art.description || undefined,
        imageUrl: art.imageUrl,
        galleryId: homeGallery.id,
        position: startingPosition + i,
      }));

      await addToHomepageGallery(newHomeArtworks);

      // Refresh the homepage artworks and update state
      const updated = await getArtworksById(homeGallery.id);
      setHomeArtworks(updated);
    } catch (error) {
      console.error('Error adding artworks to homepage:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Admin Home Page</h1>
          <p className="text-gray-600">
            Select artworks from all galleries to display on the home page.
          </p>
        </div>

        {/* All artworks for selection */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Select Artworks</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {allArtworks.map((art) => (
              <div
                key={art.id}
                onClick={() => toggleSelection(art.id)}
                className={`cursor-pointer overflow-hidden rounded-lg border-2 transition ${
                  selectedArtworks.has(art.id)
                    ? 'border-blue-500 shadow-md'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={art.imageUrl} alt={art.title} className="h-32 w-full object-cover" />
                <div className="p-2 text-center text-sm">{art.title}</div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save to Home Page'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepagePage;
