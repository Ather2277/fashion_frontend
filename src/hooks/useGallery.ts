import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import service from '@/services/config';

interface GalleryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
  userId: string;
  userName: string;
  likes: number;
  userLiked: boolean;
}

const APPWRITE_BUCKET_ID = '67f002eb0021be72cc3b';
const APPWRITE_PROJECT_ID = '67f001a80013dfc3ff5a';

export function useGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'masonry'>('grid');
  const { user } = useAuth();
  
  useEffect(() => {
    const loadGallery = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await service.getAllPosts();

        if (response && response.documents) {
          const items = response.documents.map((doc: any) => {
            // Construct the image URL
            const imageUrl = doc.url 
              ? doc.url 
              : `https://cloud.appwrite.io/v1/storage/buckets/${APPWRITE_BUCKET_ID}/files/${doc.fileId}/view?project=${APPWRITE_PROJECT_ID}`;
            
              const nam = doc.User_Email;
              const username = nam.split('@')[0].replace(/[0-9]/g, '');;
            return {
              id: doc.$id,
              imageUrl,
              prompt: doc.prompt,
              createdAt: doc.$createdAt,
              userId: doc.User_Id,
              userName: username || 'User',
              likes: doc.likes || 0,
              userLiked: false
            };
          });

          setGalleryItems(items);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load gallery items:', error);
        toast.error('Failed to load gallery items');
        setIsLoading(false);
      }
    };

    loadGallery();
  }, [user]);

  const handleLike = async (itemId: string) => {
    if (!user) {
      toast.error('Please log in to like designs');
      return;
    }

    try {
      await service.likePost(itemId);

      setGalleryItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId
            ? { ...item, likes: item.likes + 1, userLiked: true }
            : item
        )
      );

      toast.success('Design liked!');
    } catch (error) {
      console.error('Failed to like post:', error);
      toast.error('Failed to like design');
    }
  };

  const handleAddToGallery = async (design: any) => {
    if (!user) {
      toast.error('Please log in to save designs');
      return;
    }

    try {
      await service.createPost({
        title: design.title || 'My Design',
        prompt: design.prompt,
        imageUrl: design.imageUrl, // This assumes imageUrl is the full URL or saved in backend logic
        userId: user.id
      });

      toast.success('Design added to your collection');
    } catch (error) {
      console.error('Failed to add design to collection:', error);
      toast.error('Failed to save design');
    }
  };

  return {
    galleryItems,
    isLoading,
    layout,
    setLayout,
    handleLike,
    handleAddToGallery
  };
}
