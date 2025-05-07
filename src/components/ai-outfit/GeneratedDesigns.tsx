
import { Card, CardContent } from "@/components/ui/card";
import { DesignGrid } from './DesignGrid';
import { DesignsHeader } from './DesignsHeader';
import { RegenerateButton } from './RegenerateButton';
import { useDesignLikes } from '@/hooks/useDesignLikes';
import { useGalleryStorage } from '@/hooks/useGalleryStorage';

interface GeneratedDesign {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
  likes?: number;
  liked?: boolean;
}

interface GeneratedDesignsProps {
  designs: GeneratedDesign[];
  isGenerating: boolean;
  onGenerate: () => void;
  title: string;
  showRegenerateButton?: boolean;
}

export function GeneratedDesigns({ 
  designs, 
  isGenerating, 
  onGenerate, 
  title,
  showRegenerateButton = true
}: GeneratedDesignsProps) {
  const { designsWithLikes, handleLike } = useDesignLikes(designs);
  const { addToGallery } = useGalleryStorage();
  
  if (designs.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardContent className="p-6">
        <DesignsHeader 
          title={title} 
          // prompt={designs.length > 0 ? designs[0]?.prompt : undefined} 
        />
        
        <DesignGrid 
          designs={designsWithLikes}
          onLike={handleLike}
          onAddToGallery={addToGallery}
        />
        
        {showRegenerateButton && (
          <RegenerateButton 
            isGenerating={isGenerating} 
            onGenerate={onGenerate} 
          />
        )}
      </CardContent>
    </Card>
  );
}
