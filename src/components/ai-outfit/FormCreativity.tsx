
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface FormCreativityProps {
  creativity: number[];
  setCreativity: (creativity: number[]) => void;
}

export function FormCreativity({ creativity, setCreativity }: FormCreativityProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="creativity" className="text-base font-medium">Creativity</Label>
        <span className="text-sm text-gray-500">{creativity[0]}%</span>
      </div>
      <Slider
        id="creativity"
        min={0}
        max={100}
        step={1}
        value={creativity}
        onValueChange={setCreativity}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>Conservative</span>
        <span>Experimental</span>
      </div>
    </div>
  );
}
