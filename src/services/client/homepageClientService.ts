import { Artwork } from '@/types/Artwork';

export const getHomepageArtworks = async (): Promise<Artwork[]> => {
  try {
    const response = await fetch('/api/homepage/artworks');
    if (!response.ok) throw new Error('Failed to fetch homepage artworks');
    return await response.json();
  } catch (error) {
    console.error('Get homepage artworks error:', error);
    return [];
  }
};

export const addToHomepageGallery = async (artworks: Partial<Artwork>[]): Promise<boolean> => {
  try {
    const response = await fetch('/api/homepage/artworks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artworks),
    });

    return response.ok;
  } catch (error) {
    console.error('Add to homepage gallery error:', error);
    return false;
  }
};
