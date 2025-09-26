import { useState } from 'react';
import { Loader, ImageOff, X } from 'lucide-react';

interface ImageDisplayProps {
  imageUrl: string;
  isImageLoading: boolean;
  imageError: boolean;
  onImageLoad: () => void;
  onImageError: () => void;
  onRetry: () => void;
}

export function ImageDisplay({ 
  imageUrl, 
  isImageLoading, 
  imageError, 
  onImageLoad, 
  onImageError, 
  onRetry 
}: ImageDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (imageError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded aspect-square">
        <ImageOff className="h-12 w-12 text-gray-400 mb-2" />
        <p className="text-gray-500 text-center">Image could not be loaded</p>
        <button 
          className="mt-2 text-blue-500 text-sm hover:underline"
          onClick={onRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div 
        className="relative bg-white border-2 border-gray-200 rounded-[5%] shadow-md hover:shadow-xl transition-transform hover:scale-[1.03] cursor-pointer overflow-hidden"
        onClick={() => setIsModalOpen(true)}
      >
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-[5%] z-10">
            <div className="flex flex-col items-center justify-center p-8">
              <Loader className="h-8 w-8 text-blue-500 animate-spin mb-2" />
              <p className="text-gray-500 text-sm">Generating your design...</p>
            </div>
          </div>
        )}
        
        <img 
          data-generated-image="true"
          src={imageUrl} 
          alt="Generated Outfit" 
          className={`w-full object-contain max-h-[500px] transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`} 
          onLoad={onImageLoad}
          onError={onImageError}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[60] flex items-center justify-center p-4">
          <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center p-4">
            <button 
              className="absolute top-4 right-4 bg-white shadow-md hover:shadow-lg rounded-full p-2 text-gray-700 hover:text-red-500 transition-all z-10"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={imageUrl}
              alt="Enlarged Outfit"
              className="w-auto h-auto max-h-full max-w-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
