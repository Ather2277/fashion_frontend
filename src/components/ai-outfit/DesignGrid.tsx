
import { DesignCard } from './DesignCard';

interface GeneratedDesign {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
  likes: number;
  liked: boolean;
}

interface DesignGridProps {
  designs: GeneratedDesign[];
  onLike: (designId: string) => void;
  onAddToGallery: (design: GeneratedDesign) => void;
}

export function DesignGrid({ designs, onLike, onAddToGallery }: DesignGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {designs.map((design) => (
        <DesignCard 
          key={design.id}
          design={design}
          onLike={onLike}
          onAddToGallery={onAddToGallery}
        />
      ))}
    </div>
  );
}
