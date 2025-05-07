import { useState } from 'react';
import { ImageDisplay } from '@/components/ai-outfit/ImageDisplay';
import { GeneratedTextOutput } from '@/components/ai-outfit/GeneratedTextOutput';
import { SocialShareButtons } from '@/components/ai-outfit/SocialShareButtons';
import { toast } from 'sonner';

interface OutputDisplayProps {
  output: string;
  imageUrl: string;
  onImageLoaded?: () => void;
  onImageError?: () => void;
  prompt: string;
}

export function OutputDisplay({ 
  output, 
  imageUrl, 
  onImageLoaded, 
  onImageError,
  prompt,
}: OutputDisplayProps) {
  const [isImageLoading, setIsImageLoading] = useState(!!imageUrl);
  const [imageError, setImageError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  if (!output && !imageUrl) {
    return null;
  }

  const handleImageLoad = () => {
    setIsImageLoading(false);
    if (onImageLoaded) onImageLoaded();
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageError(true);
    if (onImageError) onImageError();
    toast.error("Failed to load the generated image");
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    toast.success(liked ? "Removed from favorites" : "Added to favorites!");
  };

  const handleAddToGallery = () => {
    toast.success("Added to your gallery!");
  };

  return (
    <>
      {output && <GeneratedTextOutput output={output} />}

      {imageUrl && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Generated Image:</p>
          
          <ImageDisplay 
            imageUrl={imageUrl}
            isImageLoading={isImageLoading}
            imageError={imageError}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
            onRetry={() => {
              setImageError(false);
              setIsImageLoading(true);
              const refreshedUrl = `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}t=${Date.now()}`;
              const img = new Image();
              img.src = refreshedUrl;
              img.onload = () => {
                setIsImageLoading(false);
                document.querySelector('img[data-generated-image="true"]')?.setAttribute('src', refreshedUrl);
              };
              img.onerror = handleImageError;
            }}
          />

          <SocialShareButtons 
            designId={`design-${Date.now()}`}
            imageUrl={imageUrl}
            onAddToGallery={handleAddToGallery}
            liked={liked}
            onLike={handleLike}
            likesCount={likesCount}
            generatedText={output} // ✅ Now using output directly instead of prompt
          />
        </div>
      )}
    </>
  );
}
