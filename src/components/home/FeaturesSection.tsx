
import { Check, Zap, User, Star, RotateCcw } from 'lucide-react';
import { forwardRef } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const FeaturesSection = forwardRef<HTMLElement>((_, ref) => {
  const features: Feature[] = [
    { 
      title: "AI-Powered Design", 
      description: "Generate unique fashion designs using our advanced AI algorithms",
      icon: <Zap />
    },
    { 
      title: "Personalized Collections", 
      description: "Create outfits tailored to your personal style and preferences",
      icon: <User />
    },
    { 
      title: "Professional Quality", 
      description: "Production-ready designs with attention to detail and fabric simulation",
      icon: <Star />
    },
    { 
      title: "Rapid Prototyping", 
      description: "From concept to visualization in seconds, not days or weeks",
      icon: <RotateCcw />
    },
  ];

  return (
    <section ref={ref} id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 appear-animate opacity-0" style={{ '--delay': '4' } as React.CSSProperties}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter">
            Reimagine Fashion Design With AI
          </h2>
          <p className="text-xl text-gray-600">
            Our AI-powered platform provides all the tools you need to bring your fashion ideas to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover-glow appear-animate opacity-0"
              style={{ '--delay': `${6 + index}` } as React.CSSProperties}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-blue-600/10 text-blue-600 mb-4">
                {feature.icon || <Check className="h-6 w-6" />}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';
