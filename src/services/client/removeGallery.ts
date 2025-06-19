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
