import { Artwork } from '@/types/Artwork';

export const reorderArtworks = async (galleryId: number, artworks: Artwork[]): Promise<boolean> => {
  try {
    const response = await fetch(`/api/galleries/${galleryId}/artworks/reorder`, {
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
