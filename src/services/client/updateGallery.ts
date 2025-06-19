import { Gallery } from '@/types/Gallery';

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
