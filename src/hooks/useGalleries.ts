import { Gallery } from '@/types/Gallery';
import { useEffect, useState } from 'react';
import { getGalleries } from '@/services/client/galleryClientService';

export function useGalleries() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getGalleries()
      .then((data) => {
        if (isMounted) {
          setGalleries(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { galleries, loading, error };
}
