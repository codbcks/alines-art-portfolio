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

export const getGalleries = async (): Promise<Gallery[]> => {
  try {
    const response = await fetch('/api/galleries');
    if (!response.ok) throw new Error('Failed to fetch galleries');
    return await response.json();
  } catch (error) {
    console.error('Fetch galleries error:', error);
    return [];
  }
};

export const updateGallery = async (
  galleryId: number,
  galleryData: Partial<Gallery>,
): Promise<Gallery> => {
  try {
    const response = await fetch(`/api/galleries/${galleryId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(galleryData),
    });

    if (!response.ok) throw new Error('Failed to update gallery');
    return await response.json();
  } catch (error) {
    console.error('Update gallery error:', error);
    throw error;
  }
};

export const removeGallery = async (galleryId: number): Promise<boolean> => {
  try {
    const response = await fetch(`/api/galleries/${galleryId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete gallery');
    return true;
  } catch (error) {
    console.error('Delete gallery error:', error);
    return false;
  }
};
