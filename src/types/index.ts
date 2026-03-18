export type Category = 'all' | 'nature' | 'architecture' | 'abstract' | 'travel';

export interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  description?: string;
  category: Exclude<Category, 'all'>;
  span?: 'tall' | 'wide';
}
