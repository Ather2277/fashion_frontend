
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Wand2 } from 'lucide-react';

interface EmptyDesignsProps {
  onGenerateClick: () => void;
}

export function EmptyDesigns({ onGenerateClick }: EmptyDesignsProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm text-center">
      <div className="flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        <ImageIcon className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="mt-2 text-xl font-medium text-gray-900">No designs generated yet</h3>
      <p className="mt-2 text-gray-500 max-w-sm">
        Go to the Generate tab to create your first AI outfit design.
      </p>
      <Button
        onClick={onGenerateClick}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Wand2 className="mr-2 h-5 w-5" />
        Generate Designs
      </Button>
    </div>
  );
}
