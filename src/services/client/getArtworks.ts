import { Artwork } from '@/types/Artwork';

export const getArtworks = async (galleryId: number): Promise<Artwork[]> => {
  try {
    const response = await fetch(`/api/galleries/${galleryId}/artworks`);
    if (!response.ok) throw new Error('Failed to fetch artworks');
    return await response.json();
  } catch (error) {
    console.error('Fetch artworks error:', error);
    return [];
  }
};
