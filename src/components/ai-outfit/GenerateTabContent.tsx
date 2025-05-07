
import { useState } from 'react';
import { toast } from 'sonner';

import { GenerationForm } from '@/components/ai-outfit/GenerationForm';
import { AdvancedSettings } from '@/components/ai-outfit/AdvancedSettings';
import { GeneratedDesigns } from '@/components/ai-outfit/GeneratedDesigns';
import { TokenDisplay } from '@/components/ai-outfit/TokenDisplay';
import { useTokens } from '@/contexts/TokenContext';

interface GeneratedDesign {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
  likes?: number;
  liked?: boolean;
}

interface GenerateTabContentProps {
  sampleImages: string[];
  onGeneratedDesignsUpdated: (designs: GeneratedDesign[]) => void;
}

export function GenerateTabContent({ 
  sampleImages, 
  onGeneratedDesignsUpdated 
}: GenerateTabContentProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('casual');
  const [creativity, setCreativity] = useState([50]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneratedDesigns, setCurrentGeneratedDesigns] = useState<GeneratedDesign[]>([]);
  const [gender, setGender] = useState("female");
  const [enableModels, setEnableModels] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("outfit");
  const { useToken } = useTokens();

  // This function is now just a placeholder as the actual generation
  // is handled in the GenerationForm component
  const handleGenerate = async () => {
    // Just a pass-through function
  };

  return (
    <>
      <TokenDisplay />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GenerationForm
            prompt={prompt}
            setPrompt={setPrompt}
            style={style}
            setStyle={setStyle}
            creativity={creativity}
            setCreativity={setCreativity}
            gender={gender}
            setGender={setGender}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
          />
        </div>
        
        <div className="lg:col-span-1">
          <AdvancedSettings
            enableModels={enableModels}
            setEnableModels={setEnableModels}
          />
        </div>
      </div>
      
      {/* Display current generation results only if there are any */}
      {currentGeneratedDesigns.length > 0 && (
        <div className="mt-10">
          <GeneratedDesigns
            designs={currentGeneratedDesigns}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
            title="Current Generated Designs"
          />
        </div>
      )}
    </>
  );
}
