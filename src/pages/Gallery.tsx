
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGallery } from '@/hooks/useGallery';
import { GalleryHeader } from '@/components/gallery/GalleryHeader';
import { GalleryLoading } from '@/components/gallery/GalleryLoading';
import { GalleryEmptyState } from '@/components/gallery/GalleryEmptyState';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export default function Gallery() {
  const { 
    galleryItems, 
    isLoading, 
    layout, 
    setLayout, 
    handleLike, 
    handleAddToGallery 
  } = useGallery();
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <GalleryHeader layout={layout} setLayout={setLayout} />
            
            {isLoading ? (
              <GalleryLoading />
            ) : galleryItems.length === 0 ? (
              <GalleryEmptyState />
            ) : (
              <GalleryGrid 
                items={galleryItems}
                layout={layout}
                onLike={handleLike}
                onAddToGallery={handleAddToGallery}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
