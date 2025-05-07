import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { TipsDialog } from '@/components/ai-outfit/TipsDialog';

// Import our tab content components
import { GenerateTabContent } from '@/components/ai-outfit/GenerateTabContent';
import { AllGenerationsTabContent } from '@/components/ai-outfit/AllGenerationsTabContent';

interface GeneratedDesign {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
  likes?: number;
  liked?: boolean;
}

const sampleImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

export default function AiOutfitGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [allGeneratedDesigns, setAllGeneratedDesigns] = useState<GeneratedDesign[]>([]);
  const [activeTab, setActiveTab] = useState('generate');
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const handleGeneratedDesignsUpdated = (newDesigns: GeneratedDesign[]) => {
    setAllGeneratedDesigns(prev => [...newDesigns, ...prev]);
  };

  const handleGenerate = async () => {
    // This function is now handled in the GenerateTabContent
    // We keep it as a passthrough for the AllGenerationsTabContent
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold mb-2 tracking-tighter">
                  AI Outfit Generator
                </h1>
                <p className="text-gray-600">Create stunning fashion designs with AI</p>
              </div>
              
              <TipsDialog />
            </div>
            
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full animate-fade-in"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="all-generations">All Generations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="generate" className="animate-fade-in">
                <GenerateTabContent 
                  sampleImages={sampleImages}
                  onGeneratedDesignsUpdated={handleGeneratedDesignsUpdated}
                />
              </TabsContent>
              
              <TabsContent value="all-generations" className="animate-fade-in">
                <AllGenerationsTabContent 
                  allGeneratedDesigns={allGeneratedDesigns}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  onGenerateClick={() => setActiveTab('generate')}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
