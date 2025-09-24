
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="space-y-2">
    <Label className="text-base font-medium">Skin Color</Label>
    <Select value={skinColor} onValueChange={setSkinColor}>
      <SelectTrigger className="w-full min-w-[280px]">
        <SelectValue placeholder="Select skin color" />
      </SelectTrigger>
      <SelectContent className="min-w-[280px]">
        <SelectItem value="Any">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300 bg-gradient-to-r from-gray-200 to-gray-400"></div>
            Any
          </div>
        </SelectItem>

        <SelectItem value="Fair with cool undertones">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300 bg-[#fbe8e7]"></div>
            Fair with cool undertones
          </div>
        </SelectItem>

        <SelectItem value="Fair with warm undertones">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300 bg-[#fdf0d5]"></div>
            Fair with warm undertones
          </div>
        </SelectItem>

        <SelectItem value="Light-medium with neutral undertones">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300 bg-[#f1c27d]"></div>
            Light-medium with neutral undertones
          </div>
        </SelectItem>

        <SelectItem value="Olive with warm undertones">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300 bg-[#c68642]"></div>
            Olive with warm undertones
          </div>
        </SelectItem>

        <SelectItem value="Tan with golden undertones">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300 bg-[#b97a56]"></div>
            Tan with golden undertones
          </div>
        </SelectItem>

        <SelectItem value="Deep with cool undertones">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300 bg-[#7f4a2e]"></div>
            Deep with cool undertones
          </div>
        </SelectItem>

        <SelectItem value="Deep with warm undertones">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300 bg-[#5c3a21]"></div>
            Deep with warm undertones
          </div>
        </SelectItem>

        <SelectItem value="Ebony rich tone">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-gray-300 bg-[#3d1c0f]"></div>
            Ebony rich tone
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
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
