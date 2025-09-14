import { useState } from 'react';
import { SocialShareButtons } from '@/components/ai-outfit/SocialShareButtons';

interface GalleryItemProps {
  item: {
    id: string;
    imageUrl: string;
    prompt: string;
    userName: string;
    userLiked: boolean;
    likes: number;
  };
  layout: 'grid' | 'masonry';
  onLike: (itemId: string) => void;
  onAddToGallery: (itemId: string) => void;
}

export function GalleryItem({ item, layout, onLike, onAddToGallery }: GalleryItemProps) {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  const handleImageClick = () => {
    setIsImageEnlarged(true);
  };

  const handleClose = () => {
    setIsImageEnlarged(false);
  };

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${
        layout === 'masonry' ? 'mb-6 break-inside-avoid' : ''
      }`}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden cursor-pointer group"
        onClick={handleImageClick}
      >
        <img
          src={item.imageUrl}
          alt={item.prompt}
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>

      {/* Enlarged image modal */}
      {isImageEnlarged && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
          <div className="relative max-w-[90%] max-h-[90%]">
            <img
              src={item.imageUrl}
              alt={item.prompt}
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white rounded-full p-2 text-xl text-black shadow-md"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Text and actions */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium line-clamp-1">{item.prompt}</h3>
            <p className="text-sm text-gray-500">by {item.userName}</p>
          </div>
        </div>

        <SocialShareButtons
          designId={item.id}
          imageUrl={item.imageUrl}
          onAddToGallery={() => onAddToGallery(item.id)}
          liked={item.userLiked}
          onLike={() => onLike(item.id)}
          likesCount={item.likes}
          generatedText={`Check out this design: ${item.prompt}`}
        />
      </div>
    </div>
  );
}
