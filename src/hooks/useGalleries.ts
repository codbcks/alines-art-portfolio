import { useEffect, useState } from 'react';
import { getGalleries } from '@/services/client/getGalleries';
import { Gallery } from '@/types/Gallery';

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
