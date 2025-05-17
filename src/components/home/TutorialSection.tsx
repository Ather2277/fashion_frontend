import { forwardRef } from 'react';

export const TutorialSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} id="tutorial" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div
          className="max-w-3xl mx-auto text-center mb-12 appear-animate opacity-0"
          style={{ '--delay': '18' } as React.CSSProperties}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter">
            How to Use SUvastra
          </h2>
          <p className="text-xl text-gray-600">
            Watch our quick tutorial to get started
          </p>
        </div>

        {/* Video 1 */}
        <div
          className="max-w-4xl mx-auto mb-12 appear-animate opacity-0"
          style={{ '--delay': '20' } as React.CSSProperties}
        >
          <h3 className="text-2xl font-semibold mb-4">SignUp / SignIn</h3>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/PvHGNnNYRXo"
              title="SignUp / SignIn"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Video 2 */}
        <div
          className="max-w-4xl mx-auto mb-12 appear-animate opacity-0"
          style={{ '--delay': '21' } as React.CSSProperties}
        >
          <h3 className="text-2xl font-semibold mb-4">Design Generation</h3>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/39e660WIv_I?si=PiN4pYx_NMGgTdba"
              title="Design Generation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Video 3 */}
        <div
          className="max-w-4xl mx-auto appear-animate opacity-0"
          style={{ '--delay': '22' } as React.CSSProperties}
        >
          <h3 className="text-2xl font-semibold mb-4">Community Gallery</h3>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/MOUhOoj85Vw?si=xHBsnqr8ocb0aUGU"
              title="Community Gallery"
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

