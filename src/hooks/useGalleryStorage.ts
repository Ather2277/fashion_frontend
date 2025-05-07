
import { toast } from 'sonner';

interface GeneratedDesign {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
  likes?: number;
  liked?: boolean;
}

export function useGalleryStorage() {
  const addToGallery = (design: GeneratedDesign) => {
    // Get existing gallery items or initialize empty array
    const existingItems = localStorage.getItem('galleryItems');
    const galleryItems = existingItems ? JSON.parse(existingItems) : [];
    
    // Check if design is already in gallery
    const isAlreadyInGallery = galleryItems.some((item: any) => item.id === design.id);
    
    if (!isAlreadyInGallery) {
      // Add design to gallery
      const newGalleryItem = {
        ...design,
        createdBy: 'current-user', // In a real app, this would be the user's ID
        userName: 'You',
        likes: 0,
        userLiked: false,
        isGenerated: true,  // Mark as generated
        isShared: false     // Initially not shared to community gallery
      };
      
      galleryItems.push(newGalleryItem);
      localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
      toast.success('Design added to your collection');
    } else {
      toast.info('This design is already in your collection');
    }
  };

  return { addToGallery };
}
