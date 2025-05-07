
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormCategoryGenderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  gender: string;
  setGender: (gender: string) => void;
}

export function FormCategoryGender({ 
  selectedCategory, 
  setSelectedCategory, 
  gender, 
  setGender 
}: FormCategoryGenderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2 space-y-2">
        <Label className="text-base font-medium">Category</Label>
        <Select 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outfit">Complete Outfit</SelectItem>
            <SelectItem value="top">Top/Shirt</SelectItem>
            <SelectItem value="bottom">Bottom/Pants</SelectItem>
            <SelectItem value="dress">Dress</SelectItem>
            <SelectItem value="coat">Coat/Jacket</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-1/2 space-y-2">
        <Label className="text-base font-medium">Gender</Label>
        <Select 
          value={gender} 
          onValueChange={setGender}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="unisex">Unisex</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
