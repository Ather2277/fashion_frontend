
import { Button } from '@/components/ui/button';
import { Wand2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenerateButtonProps {
  isGenerating: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function GenerateButton({ isGenerating, disabled, onClick }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isGenerating || disabled}
      className={cn(
        "w-full h-12 mt-4 transition-all duration-300",
        isGenerating ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700",
        "text-white"
      )}
    >
      {isGenerating ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          {isGenerating ? "Generating your design..." : "Generate Designs"}
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-5 w-5" />
          Generate Designs
        </>
      )}
    </Button>
  );
}
