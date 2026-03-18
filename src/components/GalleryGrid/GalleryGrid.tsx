import type { ImageItem } from '../../types';

interface GalleryGridProps {
  images: ImageItem[];
  onImageClick: (index: number) => void;
}

interface ThumbProps {
  image: ImageItem;
  index: number;
  onClick: (index: number) => void;
}

const GalleryThumbnail = ({ image, index, onClick }: ThumbProps) => {
  const spanClass =
    image.span === 'tall' ? 'row-span-2' : image.span === 'wide' ? 'col-span-2' : '';

  return (
    <button
      id={`gallery-item-${image.id}`}
      aria-label={`Open lightbox for: ${image.title}`}
      onClick={() => onClick(index)}
      className={[
        'group relative overflow-hidden rounded-2xl cursor-pointer w-full h-full',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400',
        'transition-transform duration-300 ease-out hover:z-10',
        spanClass,
      ].join(' ')}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
      />

      <span
        aria-hidden="true"
        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-md text-white/80 border border-white/10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out"
      >
        {image.category}
      </span>

      <div className="absolute bottom-0 left-0 right-0 px-4 py-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <h3 className="text-white font-bold text-sm leading-snug drop-shadow-lg">
          {image.title}
        </h3>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
      >
        <span className="text-2xl bg-white/10 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center border border-white/20 scale-75 group-hover:scale-100 transition-transform duration-300 ease-out">
          🔍
        </span>
      </div>
    </button>
  );
};

const GalleryGrid = ({ images, onImageClick }: GalleryGridProps) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-500 gap-4">
        <span className="text-6xl">🖼️</span>
        <p className="text-lg font-medium">No images in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[240px]">
      {images.map((image, index) => (
        <GalleryThumbnail key={image.id} image={image} index={index} onClick={onImageClick} />
      ))}
    </div>
  );
};

export default GalleryGrid;
