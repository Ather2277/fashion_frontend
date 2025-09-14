import { GalleryItem } from './GalleryItem';

interface GalleryGridProps {
  items: Array<{
    id: string;
    imageUrl: string;
    prompt: string;
    userName: string;
    userLiked: boolean;
    likes: number;
  }>;
  layout: 'grid' | 'masonry';
  onLike: (itemId: string) => void;
  onAddToGallery: (itemId: string) => void;
}

export function GalleryGrid({ items, layout, onLike, onAddToGallery }: GalleryGridProps) {
  // Show newest items first
  const sortedItems = [...items].sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());

  return (
    <div 
      className={layout === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        : "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
      }
    >
      {sortedItems.map((item) => (
        <GalleryItem 
          key={item.id}
          item={item}
          layout={layout}
          onLike={onLike}
          onAddToGallery={onAddToGallery}
        />
      ))}
    </div>
  );
}
