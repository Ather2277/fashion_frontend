
import { Button } from '@/components/ui/button';
import { Wand2, RefreshCw } from 'lucide-react';

interface RegenerateButtonProps {
  isGenerating: boolean;
  onGenerate: () => void;
}

export function RegenerateButton({ isGenerating, onGenerate }: RegenerateButtonProps) {
  return (
    <div className="flex justify-center mt-8">
      <Button
        onClick={onGenerate}
        className="bg-purple-600 hover:bg-purple-700 text-white"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate More Designs
          </>
        )}
      </Button>
    </div>
  );
}
