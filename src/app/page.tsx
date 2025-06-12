import Navigation from '../components/navigation';
import MasonryGallery from '../components/masonry-gallery';

const PortfolioDemo = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <section>
          <MasonryGallery showTitle={true} />
        </section>
      </main>
    </div>
  );
};

export default PortfolioDemo;
