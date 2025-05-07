
import { Button } from '@/components/ui/button';
import { Grid, LayoutGrid, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GalleryHeaderProps {
  layout: 'grid' | 'masonry';
  setLayout: (layout: 'grid' | 'masonry') => void;
}

export function GalleryHeader({ layout, setLayout }: GalleryHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 tracking-tighter">
          Community Gallery
        </h1>
        <p className="text-gray-600">Explore user-generated designs shared to our gallery</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex">
          <Button 
            variant={layout === 'grid' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setLayout('grid')}
            className="h-8"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant={layout === 'masonry' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setLayout('masonry')}
            className="h-8"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          onClick={() => navigate('/ai-outfit-generator')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Create Design
        </Button>
      </div>
    </div>
  );
}
