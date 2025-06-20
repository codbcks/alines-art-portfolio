import { useEffect, useState } from 'react';
import { Gallery } from '@/types/Gallery';
import { getGalleries } from '@/services/client/galleryClientService';

export function useGalleries() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGalleries().then((data) => {
      setGalleries(data);
      setLoading(false);
    });
  }, []);

  return { galleries, loading };
}
