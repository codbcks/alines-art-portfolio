import MasonryGallery from '@/components/masonry-gallery';
import { queryGalleryBySlug } from '@/services/server/galleryServerService';

const LandingPage = async () => {
  try {
    // Query the homepage gallery with artworks relation
    const gallery = await queryGalleryBySlug('home-page');

    // Check if gallery exists before accessing its properties
    if (!gallery) {
      return (
        <section className="py-10 text-center">
          <h2 className="text-xl font-bold text-red-600">Homepage gallery not found</h2>
          <p className="mt-2 text-gray-600">Please check back later</p>
        </section>
      );
    }

    if (!gallery.artworks || gallery.artworks.length === 0) {
      return (
        <section className="py-10 text-center">
          <h2 className="text-xl font-bold text-red-600">No artworks found for homepage</h2>
          <p className="mt-2 text-gray-600">Please check back later</p>
        </section>
      );
    }

    return (
      <section>
        <MasonryGallery artworks={gallery.artworks} />
      </section>
    );
  } catch (error) {
    console.error('Failed to load homepage gallery:', error);

    return (
      <section className="py-10 text-center">
        <h2 className="text-xl font-bold text-red-600">Failed to load homepage gallery</h2>
        <p className="mt-2 text-gray-600">Please try again later</p>
      </section>
    );
  }
};

export default LandingPage;
