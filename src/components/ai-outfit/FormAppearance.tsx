
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormAppearanceProps {
  skinColor: string;
  setSkinColor: (skinColor: string) => void;
  season: string;
  setSeason: (season: string) => void;
}

export function FormAppearance({ 
  skinColor, 
  setSkinColor, 
  season, 
  setSeason 
}: FormAppearanceProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-base font-medium">Skin Color</Label>
        <Select value={skinColor} onValueChange={setSkinColor}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select skin color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-medium">Season</Label>
        <Select value={season} onValueChange={setSeason}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="summer">Summer</SelectItem>
            <SelectItem value="winter">Winter</SelectItem>
            <SelectItem value="spring">Spring</SelectItem>
            <SelectItem value="autumn">Autumn</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
