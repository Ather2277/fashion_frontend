
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Heart, Share, Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { SocialShareButtons } from './SocialShareButtons';
import { GeneratedTextOutput } from './GeneratedTextOutput';

interface DesignCardProps {
  design: {
    id: string;
    imageUrl: string;
    prompt: string;
    createdAt: Date;
    likes: number;
    liked: boolean;
  };
  onLike: (designId: string) => void;
  onAddToGallery: (design: any) => void;
}

export function DesignCard({ design, onLike, onAddToGallery }: DesignCardProps) {
  const handleSaveDesign = () => {
    toast.success('Design saved to your collections');
  };
  
  const handleDownload = () => {
    toast.success('Download started');
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(`https://styleai.com/shared-design/${design.id}`);
    toast.success('Link copied to clipboard');
  };

  return (
    <div 
      key={design.id} 
      className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden group"
    >
      <div className="relative aspect-[3/4]">
        <img 
          src={design.imageUrl} 
          alt={`Generated design based on: ${design.prompt}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-blue-500 text-white hover:bg-blue-600 border-transparent"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={`${design.liked ? 'bg-pink-500' : 'bg-pink-400'} text-white hover:bg-pink-600 border-transparent`}
              onClick={() => onLike(design.id)}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-purple-500 text-white hover:bg-purple-600 border-transparent"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-3 border-t border-gray-200">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {new Date(design.createdAt).toLocaleDateString()}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSaveDesign}
              className="h-8 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              <Bookmark className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
          
          <SocialShareButtons 
            designId={design.id}
            imageUrl={design.imageUrl}
            onAddToGallery={() => onAddToGallery(design)}
            liked={design.liked}
            onLike={() => onLike(design.id)}
            likesCount={design.likes}
            generatedText={design.prompt}
          />
        </div>
      </div>
    </div>
  );
}
