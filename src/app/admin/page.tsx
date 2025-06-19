'use client';

import React, { useEffect, useState } from 'react';
import { Edit, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { Gallery } from '@/types/Gallery';
import { Artwork } from '@/types/Artwork';
import GalleryForm from '@/components/form/gallery-form';
import ArtworkForm from '@/components/form/artwork-form';
import ArtworkList from '@/components/artwork-list';

const AdminDashboard = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [showArtworkForm, setShowArtworkForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedGallery) {
      fetchArtworks(selectedGallery.id);
    }
  }, [selectedGallery]);

  const fetchGalleries = async () => {
    try {
      const response = await fetch('/api/galleries');
      const data = await response.json();
      setGalleries(data);
      if (data.length > 0 && !selectedGallery) {
        setSelectedGallery(data[0]);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtworks = async (galleryId: number) => {
    try {
      const response = await fetch(`/api/galleries/${galleryId}/artworks`);
      const data = await response.json();
      setArtworks(data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  const handleGallerySubmit = async (galleryData: Partial<Gallery>) => {
    try {
      const url = editingGallery ? `/api/galleries/${editingGallery.id}` : '/api/galleries';
      const method = editingGallery ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryData),
      });

      if (response.ok) {
        await fetchGalleries();

        // Update selected gallery if it was edited
        if (editingGallery && selectedGallery?.id === editingGallery.id) {
          const updateResponse = await fetch(`/api/galleries/${editingGallery.id}`);
          if (updateResponse.ok) {
            const updated = await updateResponse.json();
            setSelectedGallery(updated);
          }
        }

        setShowGalleryForm(false);
        setEditingGallery(null);
      }
    } catch (error) {
      console.error('Error saving gallery:', error);
    }
  };

  const handleArtworkSubmit = async (artworkData: Partial<Artwork>) => {
    try {
      if (!editingArtwork) {
        artworkData.position = artworks.length;
      }
      
      const url = editingArtwork ? `/api/artworks/${editingArtwork.id}` : '/api/artworks';
      const method = editingArtwork ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...artworkData, galleryId: selectedGallery?.id }),
      });

      if (response.ok) {
        await fetchArtworks(selectedGallery!.id);
        setShowArtworkForm(false);
        setEditingArtwork(null);
      }
    } catch (error) {
      console.error('Error saving artwork:', error);
    }
  };

  const handleDeleteGallery = async (gallery: Gallery) => {
    if (confirm(`Are you sure you want to delete "${gallery.title}"?`)) {
      try {
        const response = await fetch(`/api/galleries/${gallery.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchGalleries();
          if (selectedGallery?.id === gallery.id) {
            setSelectedGallery(galleries[0] || null);
          }
        }
      } catch (error) {
        console.error('Error deleting gallery:', error);
      }
    }
  };

  const handleDeleteArtwork = async (artwork: Artwork) => {
    if (confirm(`Are you sure you want to delete "${artwork.title}"?`)) {
      try {
        const response = await fetch(`/api/artworks/${artwork.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchArtworks(selectedGallery!.id);
        }
      } catch (error) {
        console.error('Error deleting artwork:', error);
      }
    }
  };

  const handleArtworkReorder = async (reorderedArtworks: Artwork[]) => {
    try {
      const response = await fetch(`/api/galleries/${selectedGallery?.id}/artworks/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artworks: reorderedArtworks }),
      });

      if (response.ok) {
        setArtworks(reorderedArtworks);
      }
    } catch (error) {
      console.error('Error reordering artworks:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your galleries and artworks</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Galleries Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Galleries</h2>
                <button
                  onClick={() => setShowGalleryForm(true)}
                  className="rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="space-y-2">
                {galleries.map((gallery) => (
                  <div
                    key={gallery.id}
                    className={`cursor-pointer rounded-lg p-3 transition-colors ${
                      selectedGallery?.id === gallery.id
                        ? 'border-2 border-blue-300 bg-blue-100'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedGallery(gallery)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{gallery.title}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingGallery(gallery);
                            setShowGalleryForm(true);
                          }}
                          className="p-1 text-gray-500 hover:text-blue-600"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteGallery(gallery);
                          }}
                          className="p-1 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">{artworks.length} artworks</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedGallery ? (
              <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedGallery.title}</h2>
                    <p className="text-gray-600">Manage artworks in this gallery</p>
                  </div>
                  <button
                    onClick={() => setShowArtworkForm(true)}
                    className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
                  >
                    <ImageIcon size={16} />
                    <span>Add Artwork</span>
                  </button>
                </div>

                <ArtworkList
                  artworks={artworks}
                  onEdit={(artwork) => {
                    setEditingArtwork(artwork);
                    setShowArtworkForm(true);
                  }}
                  onDelete={handleDeleteArtwork}
                  onReorder={handleArtworkReorder}
                />
              </div>
            ) : (
              <div className="rounded-lg bg-white p-12 text-center shadow">
                <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">No Gallery Selected</h3>
                <p className="text-gray-600">
                  Create a gallery or select one from the sidebar to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        {showGalleryForm && (
          <GalleryForm
            gallery={editingGallery}
            onSubmit={handleGallerySubmit}
            onClose={() => {
              setShowGalleryForm(false);
              setEditingGallery(null);
            }}
          />
        )}

        {showArtworkForm && (
          <ArtworkForm
            artwork={editingArtwork}
            onSubmit={handleArtworkSubmit}
            onClose={() => {
              setShowArtworkForm(false);
              setEditingArtwork(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
