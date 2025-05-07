
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface FormStyleSelectionProps {
  style: string;
  setStyle: (style: string) => void;
}

export function FormStyleSelection({ style, setStyle }: FormStyleSelectionProps) {
  const styleOptions = [
    'casual', 'formal', 'streetwear', 'athleisure', 
    'bohemian', 'vintage', 'minimalist', 'avant-garde'
  ];

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Style</Label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {styleOptions.slice(0, 4).map((styleOption) => (
          <Button
            key={styleOption}
            type="button"
            variant={style === styleOption ? 'default' : 'outline'}
            onClick={() => setStyle(styleOption)}
            className="capitalize"
          >
            {styleOption}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {styleOptions.slice(4).map((styleOption) => (
          <Button
            key={styleOption}
            type="button"
            variant={style === styleOption ? 'default' : 'outline'}
            onClick={() => setStyle(styleOption)}
            className="capitalize"
          >
            {styleOption}
          </Button>
        ))}
      </div>
    </div>
  );
}
