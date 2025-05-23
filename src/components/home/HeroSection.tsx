
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight } from 'lucide-react';
import { HeroImageCarousel } from './HeroImageCarousel';

interface CompanyLogo {
  id: number;
  name: string;
  imageUrl: string;
}

export function HeroSection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleStartWithGoogle = async () => {
    if (isAuthenticated) {
      navigate('/ai-outfit-generator');
    } else {
      navigate('/signup');
    }
  };

  // Company logos
  const companyLogos: CompanyLogo[] = [
    {
      id: 1,
      name: "AJIO",
      imageUrl: "/lovable-uploads/966d7e37-cb05-4cec-a645-9fc142b9fa4a.png"
    },
    {
      id: 2,
      name: "Fashion",
      imageUrl: "/lovable-uploads/bcb03abe-fdb9-4519-8813-d7bfcce9c483.png"
    },
    {
      id: 3,
      name: "Myntra",
      imageUrl: "/lovable-uploads/788181dd-3120-4ddd-bf11-ef44d9dd8c92.png"
    }
  ];

  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 appear-animate opacity-0" style={{ '--delay': '0' } as React.CSSProperties}>
            <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm mb-4">
              <span className="px-1.5 py-0.5 text-xs font-semibold text-white bg-purple-600 rounded-full mr-2">New</span>
              <span className="font-medium">Introducing AI Outfit Generator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter">
              Revolutionize your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">fashion design</span> with AI
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl">
              Create stunning, unique fashion designs in seconds. Our AI-powered platform turns your ideas into beautiful, ready-to-wear clothing designs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleStartWithGoogle}
                className="bg-purple-600 hover:bg-purple-700 text-white text-lg h-12 px-6"
                size="lg"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                onClick={() => document.getElementById('tutorial')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline" 
                className="border-gray-300 text-lg h-12 px-6"
                size="lg"
              >
                Learn More
              </Button>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-4">Trusted by designers worldwide</p>
              <div className="flex flex-wrap gap-8 items-center">
                {companyLogos.map(logo => (
                  <div key={logo.id} className="h-12">
                    <img 
                      src={logo.imageUrl} 
                      alt={logo.name} 
                      className="h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="appear-animate opacity-0" style={{ '--delay': '2' } as React.CSSProperties}>
            <HeroImageCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
