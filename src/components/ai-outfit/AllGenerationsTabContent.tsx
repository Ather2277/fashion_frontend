import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, Clock, Wand2 } from 'lucide-react';
import { GeneratedDesigns } from '@/components/ai-outfit/GeneratedDesigns';
import { EmptyDesigns } from '@/components/ai-outfit/EmptyDesigns';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import service from '@/services/config';
import { toast } from 'sonner';

interface GeneratedDesign {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
  likes?: number;
  liked?: boolean;
}

interface AllGenerationsTabContentProps {
  allGeneratedDesigns?: GeneratedDesign[];
  isGenerating: boolean;
  onGenerate: () => void;
  onGenerateClick: () => void;
}

export function AllGenerationsTabContent({
  allGeneratedDesigns = [],
  isGenerating,
  onGenerate,
  onGenerateClick
}: AllGenerationsTabContentProps) {
  const [designs, setDesigns] = useState<GeneratedDesign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    console.log('User object:', user);

    const loadUserDesigns = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await service.getUserPosts(user.id);
        console.log("user data:", response)
        if (response?.documents?.length) {
          const userDesigns = response.documents.map((doc: any) => ({
            id: doc.$id,
            imageUrl: doc.url,
            prompt: doc.prompt,
            createdAt: new Date(doc.$createdAt),
            likes: doc.likes || 0,
          }));
          setDesigns(userDesigns);
        } else {
          setDesigns([]);
        }
      } catch (error) {
        console.error('Failed to load user designs:', error);
        toast.error('Failed to load your designs');
        setDesigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserDesigns();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (designs.length === 0) {
    return <EmptyDesigns onGenerateClick={onGenerateClick} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm border-gray-200 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Your Generation History</h2>
            <p className="text-gray-600 mt-1">All your previously generated designs</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-1" />
              Recent
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        <GeneratedDesigns
          designs={designs}
          isGenerating={isGenerating}
          onGenerate={onGenerate}
          title=""
          showRegenerateButton={false}
        />
      </div>

      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={onGenerateClick}
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Generate New Designs
        </Button>
      </div>
    </div>
  );
}
