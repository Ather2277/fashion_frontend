
import { useState, useEffect } from 'react';

interface GeneratedDesign {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
  likes?: number;
  liked?: boolean;
}

export function useDesignLikes(designs: GeneratedDesign[]) {
  const [designsWithLikes, setDesignsWithLikes] = useState<(GeneratedDesign & { likes: number, liked: boolean })[]>([]);
  
  useEffect(() => {
    // Initialize likes data for designs
    setDesignsWithLikes(designs.map(design => ({
      ...design,
      likes: design.likes || 0,
      liked: design.liked || false
    })));
  }, [designs]);
  
  const handleLike = (designId: string) => {
    setDesignsWithLikes(prevDesigns => 
      prevDesigns.map(design => {
        if (design.id === designId) {
          const newLiked = !design.liked;
          return {
            ...design,
            liked: newLiked,
            likes: newLiked ? design.likes + 1 : design.likes - 1
          };
        }
        return design;
      })
    );
  };

  return { designsWithLikes, handleLike };
}
