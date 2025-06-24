import { Artwork } from '@/types/Artwork';

export const getArtworksById = async (galleryId: number): Promise<Artwork[]> => {
  try {
    const response = await fetch(`/api/galleries/${galleryId}/artworks`);
    if (!response.ok) throw new Error('Failed to fetch artworks');
    return await response.json();
  } catch (error) {
    console.error('Fetch artworks error:', error);
    return [];
  }
};

export const getArtworksBySlug = async (gallerySlug: string): Promise<Artwork[]> => {
  try {
    const response = await fetch(`/api/galleries/slug/${gallerySlug}/artworks`);
    if (!response.ok) throw new Error('Failed to fetch artworks by slug');
    return await response.json();
  } catch (error) {
    console.error('Fetch artworks by slug error:', error);
    return [];
  }
};

export const reorderArtworks = async (galleryId: number, artworks: Artwork[]): Promise<boolean> => {
  try {
    const response = await fetch(`/api/galleries/${galleryId}/artworks`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artworks }),
    });

    if (!response.ok) throw new Error('Failed to reorder artworks');
    return true;
  } catch (error) {
    console.error('Reorder artworks error:', error);
    return false;
  }
};
