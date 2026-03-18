import { useState } from 'react';
import type { Category } from './types';
import { IMAGES } from './data/images';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import GalleryGrid from './components/GalleryGrid/GalleryGrid';
import Lightbox from './components/Lightbox/Lightbox';

const App = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === 'all'
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeCategory);

  const lightboxImage = lightboxIndex !== null ? filteredImages[lightboxIndex] ?? null : null;

  const handleCategoryChange = (category: Category) => {
    setLightboxIndex(null);
    setActiveCategory(category);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length
    );
  };

  const handleNext = () => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredImages.length
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white">
      <header className="relative overflow-hidden border-b border-white/5 pb-6">
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-75
                     rounded-full bg-violet-600/20 blur-[120px] pointer-events-none"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
          <p className="text-violet-400 text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Photo Collection
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight
                         bg-linear-to-br from-white via-white to-violet-300 bg-clip-text text-transparent">
            Image Gallery
          </h1>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Explore a curated selection of stunning photographs spanning nature,
            architecture, abstract art, and world travel.
          </p>
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          <p className="text-gray-500 text-xs mt-1 tracking-wide" aria-live="polite">
            Showing <span className="text-violet-400 font-semibold">{filteredImages.length}</span>{' '}
            image{filteredImages.length !== 1 ? 's' : ''}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <GalleryGrid images={filteredImages} onImageClick={(i) => setLightboxIndex(i)} />
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-gray-600 text-sm">
        <p>
          Built with <span className="text-violet-400 font-semibold">React + TypeScript</span>
          {' · '}
          <span className="text-violet-400 font-semibold">Tailwind CSS</span>
        </p>
      </footer>

      <Lightbox
        image={lightboxImage}
        currentIndex={lightboxIndex ?? 0}
        totalImages={filteredImages.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
};

export default App;