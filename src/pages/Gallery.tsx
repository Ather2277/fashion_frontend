import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GalleryHeader } from '@/components/gallery/GalleryHeader';
import { GalleryLoading } from '@/components/gallery/GalleryLoading';
import { GalleryEmptyState } from '@/components/gallery/GalleryEmptyState';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { getGalleryDocuments } from '@/lib/appwrite';

export default function Gallery() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'masonry'>('grid');

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  // 🔥 Fetch more than 25 docs and map to GalleryGrid format
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getGalleryDocuments(100);

        // Map Appwrite docs to match GalleryGrid expected props
        const mappedItems = response.documents.map((doc: any) => ({
          id: doc.$id,
          imageUrl: doc.url,                // ✅ fix: use `url` from Appwrite
          prompt: doc.prompt || "Untitled",
          userName: doc.User_Email || "Anonymous",
          userLiked: false,                 // placeholder (can enhance later)
          likes: doc.likes || 0,
        }));

        setItems(mappedItems);
      } catch (err) {
        console.error("Failed to fetch gallery items:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <GalleryHeader layout={layout} setLayout={setLayout} />

            {isLoading ? (
              <GalleryLoading />
            ) : items.length === 0 ? (
              <GalleryEmptyState />
            ) : (
              <GalleryGrid 
                items={items}
                layout={layout}
                onLike={() => {}}           // 🔧 can be wired to Appwrite later
                onAddToGallery={() => {}}   // 🔧 can be wired to Appwrite later
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
