
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function GalleryEmptyState() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-16">
      <div className="mb-4">
        <Wand2 className="h-12 w-12 mx-auto text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No shared designs yet</h3>
      <p className="text-gray-500 mb-6">Be the first to create and share a design to our gallery</p>
      <Button 
        onClick={() => navigate('/ai-outfit-generator')}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Wand2 className="mr-2 h-4 w-4" />
        Create Your First Design
      </Button>
    </div>
  );
}
