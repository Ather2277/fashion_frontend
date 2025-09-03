
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormDemographicsProps {
  ethnicity: string;
  setEthnicity: (ethnicity: string) => void;
  age: string;
  setAge: (age: string) => void;
}

export function FormDemographics({ 
  ethnicity, 
  setEthnicity, 
  age, 
  setAge 
}: FormDemographicsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-base font-medium">Ethnicity</Label>
        <Select value={ethnicity} onValueChange={setEthnicity}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select ethnicity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="asian">East Asian</SelectItem>
            <SelectItem value="south-asian">Asian</SelectItem>
            <SelectItem value="african">African / African Descent</SelectItem>
            <SelectItem value="european">European Descent</SelectItem>
            <SelectItem value="american">American Descent</SelectItem>
            <SelectItem value="latino">Latino </SelectItem>
            <SelectItem value="hispanic">Hispanic</SelectItem>
            <SelectItem value="middle-eastern">Middle Eastern / North African</SelectItem>
            <SelectItem value="indian">Indian / Native</SelectItem>
            <SelectItem value="other">Other / Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-base font-medium">Age Group</Label>
        <Select value={age} onValueChange={setAge}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="teen">Teen</SelectItem>
            <SelectItem value="adult">Adult</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
