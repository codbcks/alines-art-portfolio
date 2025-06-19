import { Gallery } from '@/types/Gallery';

export const createGallery = async (galleryData: Partial<Gallery>): Promise<Gallery> => {
  try {
    const response = await fetch('/api/galleries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(galleryData),
    });

    if (!response.ok) throw new Error('Failed to create gallery');
    return await response.json();
  } catch (error) {
    console.error('Create gallery error:', error);
    throw error;
  }
};
