
import { forwardRef } from 'react';

export const TutorialSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="tutorial" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 appear-animate opacity-0" style={{ '--delay': '18' } as React.CSSProperties}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter">
            How to Use StyleAI
          </h2>
          <p className="text-xl text-gray-600">
            Watch our quick tutorial to get started
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto appear-animate opacity-0" style={{ '--delay': '20' } as React.CSSProperties}>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/tcgSbgaUz9o" 
              title="StyleAI Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
});

TutorialSection.displayName = 'TutorialSection';
