import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';

import { FormBasicInputs } from '@/components/ai-outfit/FormBasicInputs';
import { FormCategoryGender } from '@/components/ai-outfit/FormCategoryGender';
import { FormDemographics } from '@/components/ai-outfit/FormDemographics';
import { FormAppearance } from '@/components/ai-outfit/FormAppearance';
import { FormAccessoriesOccasion } from '@/components/ai-outfit/FormAccessoriesOccasion';
import { FormStyleSelection } from '@/components/ai-outfit/FormStyleSelection';
import { FormCreativity } from '@/components/ai-outfit/FormCreativity';
import { GenerateButton } from '@/components/ai-outfit/GenerateButton';
import { OutputDisplay } from '@/components/ai-outfit/OutputDisplay';
import { generateOutfit } from '@/services/OutfitApiService';
import { useTokens } from '@/contexts/TokenContext';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TokenDisplay } from "@/components/ai-outfit/TokenDisplay";

interface GenerationFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  style: string;
  setStyle: (style: string) => void;
  creativity: number[];
  setCreativity: (creativity: number[]) => void;
  gender: string;
  setGender: (gender: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

export function GenerationForm({
  prompt,
  setPrompt,
  style,
  setStyle,
  creativity,
  setCreativity,
  gender,
  setGender,
  selectedCategory,
  setSelectedCategory,
  isGenerating,
  onGenerate: parentOnGenerate
}: GenerationFormProps) {
  const [ethnicity, setEthnicity] = useState("any");
  const [age, setAge] = useState("any");
  const [skinColor, setSkinColor] = useState("any");
  const [season, setSeason] = useState("any");
  const [accessories, setAccessories] = useState("none");
  const [occasion, setOccasion] = useState("casual");

  const [output, setOutput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const { tokens, useToken } = useTokens();
  const [showAddTokenDialog, setShowAddTokenDialog] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a style idea!");
      return;
    }

    if (tokens <= 0) {
      toast.error("You don't have any tokens!");
      setShowAddTokenDialog(true);
      return;
    }

    const hasToken = await useToken();
    if (!hasToken) {
      return;
    }

    parentOnGenerate();
    setOutput("");
    setImageUrl("");
    setIsImageLoading(true);
    setGenerating(true);

    try {
      const response = await generateOutfit({
        style_idea: prompt,
        gender,
        ethnicity,
        age,
        skin_color: skinColor,
        season,
        accessories,
        occasion,
        style,
        creativity: creativity[0],
        category: selectedCategory
      });

      setOutput(response.outfit_description);
      setImageUrl(response.image_url);
      toast.success("Outfit generated successfully!");
    } catch (error) {
      console.error("Error generating outfit:", error);
      toast.error("Error generating outfit. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleImageLoaded = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  return (
    <>
      <Card className="bg-white shadow-sm border-gray-200">
        <CardContent className="p-6 space-y-6">
          <FormBasicInputs prompt={prompt} setPrompt={setPrompt} />

          <FormCategoryGender
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            gender={gender}
            setGender={setGender}
          />

          <FormDemographics
            ethnicity={ethnicity}
            setEthnicity={setEthnicity}
            age={age}
            setAge={setAge}
          />

          <FormAppearance
            skinColor={skinColor}
            setSkinColor={setSkinColor}
            season={season}
            setSeason={setSeason}
          />

          <FormAccessoriesOccasion
            accessories={accessories}
            setAccessories={setAccessories}
            occasion={occasion}
            setOccasion={setOccasion}
          />

          <FormStyleSelection style={style} setStyle={setStyle} />

          <FormCreativity creativity={creativity} setCreativity={setCreativity} />

          <GenerateButton
            isGenerating={generating || isImageLoading}
            disabled={!prompt}
            onClick={handleGenerate}
          />

          <OutputDisplay
            output={output}
            imageUrl={imageUrl}
            onImageLoaded={handleImageLoaded}
            onImageError={handleImageError}
            prompt={prompt} // ✅ required prop added
          />
        </CardContent>
      </Card>

      <Dialog open={showAddTokenDialog} onOpenChange={setShowAddTokenDialog}>
        <DialogContent>
          <TokenDisplay />
        </DialogContent>
      </Dialog>
    </>
  );
}
