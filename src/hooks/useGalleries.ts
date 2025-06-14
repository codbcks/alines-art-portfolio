import { useEffect, useState } from 'react';
import { fetchGalleriesClient } from '@/services/queryAllGalleries';
import { Gallery } from '@/types/Gallery';

export function useGalleries() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleriesClient().then((data) => {
      setGalleries(data);
      setLoading(false);
    });
  }, []);

  return { galleries, loading };
}
