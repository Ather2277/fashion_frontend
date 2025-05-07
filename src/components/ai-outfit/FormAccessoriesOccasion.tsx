
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormAccessoriesOccasionProps {
  accessories: string;
  setAccessories: (accessories: string) => void;
  occasion: string;
  setOccasion: (occasion: string) => void;
}

export function FormAccessoriesOccasion({ 
  accessories, 
  setAccessories, 
  occasion, 
  setOccasion 
}: FormAccessoriesOccasionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-base font-medium">Accessories</Label>
        <Select value={accessories} onValueChange={setAccessories}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select accessories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="hats">Hats</SelectItem>
            <SelectItem value="scarves">Scarves</SelectItem>
            <SelectItem value="glasses">Glasses</SelectItem>
            <SelectItem value="watches">Watches</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-medium">Occasion</Label>
        <Select value={occasion} onValueChange={setOccasion}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select occasion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="party">Party</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
