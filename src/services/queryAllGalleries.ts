import { Gallery } from '@/types/Gallery';

export const fetchGalleriesClient = async (): Promise<Gallery[]> => {
  try {
    const response = await fetch('/api/galleries');
    if (!response.ok) throw new Error('Failed to fetch galleries');
    return await response.json();
  } catch (error) {
    console.error('Fetch galleries error:', error);
    return [];
  }
};
