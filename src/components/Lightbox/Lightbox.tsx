import { useEffect, useCallback, useRef } from 'react';
import type { ImageItem } from '../../types';

interface LightboxProps {
  image: ImageItem | null;
  currentIndex: number;
  totalImages: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

const Lightbox = ({
  image,
  currentIndex,
  totalImages,
  onPrev,
  onNext,
  onClose,
}: LightboxProps) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!image) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [image, onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (!image) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, handleKeyDown]);

  if (!image) return null;

  return (
    <div
      id="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${image.title}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in p-3 sm:p-4"
    >
      {/* Prev / Next — outside inner card so they sit at viewport edges */}
      <button
        id="lightbox-prev"
        aria-label="Previous image"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg sm:text-xl flex items-center justify-center hover:bg-violet-600/60 hover:border-violet-400 hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        ‹
      </button>

      <button
        id="lightbox-next"
        aria-label="Next image"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg sm:text-xl flex items-center justify-center hover:bg-violet-600/60 hover:border-violet-400 hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        ›
      </button>

      {/* Inner card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center w-full max-w-5xl max-h-[90vh] animate-scale-up"
      >
        {/* Close button */}
        <button
          id="lightbox-close"
          ref={closeBtnRef}
          aria-label="Close lightbox"
          onClick={onClose}
          className="absolute -top-3 -right-1 sm:-top-4 sm:-right-2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base sm:text-xl font-bold flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        >
          ✕
        </button>

        {/* Counter */}
        <span
          aria-live="polite"
          aria-atomic="true"
          className="absolute -top-3 sm:-top-4 left-0 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-white/10 backdrop-blur-sm border border-white/20 text-white/70"
        >
          {currentIndex + 1} / {totalImages}
        </span>

        {/* Image */}
        <img
          src={image.src}
          alt={image.alt}
          className="w-full max-h-[55vh] sm:max-h-[70vh] object-contain rounded-xl shadow-2xl select-none"
          draggable={false}
        />

        {/* Meta */}
        <div className="mt-3 sm:mt-4 text-center px-2 sm:px-4">
          <h2 className="text-white font-bold text-base sm:text-xl mb-1">{image.title}</h2>
          {image.description && (
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl">{image.description}</p>
          )}
          <span className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-600/30 text-violet-300 border border-violet-500/30">
            {image.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
