
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface FormBasicInputsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export function FormBasicInputs({ prompt, setPrompt }: FormBasicInputsProps) {
  const promptExamples = [
    "A flowy summer dress with floral patterns in pastel colors",
    "An elegant evening gown with beaded embellishments",
    "Streetwear-inspired oversized hoodie with distressed details",
    "Professional business attire with modern silhouette",
    "Activewear set with moisture-wicking fabric in bright colors"
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="prompt" className="text-base font-medium">Describe your outfit</Label>
      <Textarea
        id="prompt"
        placeholder="E.g., A casual summer dress with floral patterns, light fabric, suitable for beach vacation"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[120px] resize-none text-base p-4"
      />
      
      <div className="flex flex-wrap gap-2 mt-3">
        {promptExamples.map((example, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm" 
            className="text-xs bg-gray-50 border-gray-200"
            onClick={() => setPrompt(example)}
          >
            {example.substring(0, 15)}...
          </Button>
        ))}
      </div>
    </div>
  );
}
