
import { Lightbulb, Code, Eye } from 'lucide-react';
import { forwardRef } from 'react';

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const HowItWorksSection = forwardRef<HTMLElement>((_, ref) => {
  const howItWorksSteps: Step[] = [
    {
      title: "Describe Your Vision",
      description: "Use natural language to describe the fashion design you want to create.",
      icon: <Lightbulb className="h-10 w-10 text-blue-500" />
    },
    {
      title: "AI Generation",
      description: "Our advanced AI models transform your description into stunning visual designs.",
      icon: <Code className="h-10 w-10 text-blue-500" />
    },
    {
      title: "Refine & Perfect",
      description: "Fine-tune your designs with easy-to-use tools until they match your vision perfectly.",
      icon: <Eye className="h-10 w-10 text-blue-500" />
    }
  ];

  return (
    <section ref={ref} id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 appear-animate opacity-0" style={{ '--delay': '10' } as React.CSSProperties}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Creating beautiful fashion designs has never been easier
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorksSteps.map((step, index) => (
            <div 
              key={index}
              className="text-center appear-animate opacity-0"
              style={{ '--delay': `${14 + index}` } as React.CSSProperties}
            >
              <div className="flex justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

HowItWorksSection.displayName = 'HowItWorksSection';
