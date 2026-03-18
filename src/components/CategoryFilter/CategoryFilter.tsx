import type { Category } from '../../types';

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All',             value: 'all'          },
  { label: '🌿 Nature',      value: 'nature'       },
  { label: '🏛 Architecture', value: 'architecture' },
  { label: '🎨 Abstract',    value: 'abstract'     },
  { label: '✈️ Travel',      value: 'travel'       },
];

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <nav
      aria-label="Image category filter"
      className="flex flex-wrap justify-center gap-2 sm:gap-3 py-4 sm:py-6 px-2"
    >
      {FILTERS.map(({ label, value }) => {
        const isActive = activeCategory === value;
        return (
          <button
            key={value}
            id={`filter-${value}`}
            aria-pressed={isActive}
            onClick={() => onCategoryChange(value)}
            className={[
              'relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide',
              'transition-all duration-300 ease-out cursor-pointer',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d14]',
              isActive
                ? 'bg-linear-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-500/40 scale-105'
                : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-violet-400/50 hover:shadow-md hover:shadow-violet-500/20 hover:scale-105',
            ].join(' ')}
          >
            {isActive && (
              <span
                className="absolute inset-0 rounded-full bg-linear-to-r from-violet-600/50 to-fuchsia-500/50 blur-md -z-10"
                aria-hidden="true"
              />
            )}
            {label}
          </button>
        );
      })}
    </nav>
  );
};

export default CategoryFilter;
