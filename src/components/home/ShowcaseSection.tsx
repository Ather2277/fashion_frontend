
interface DesignItem {
  id: number;
  imageUrl: string;
  description: string;
  collection: string;
}

export function ShowcaseSection() {
  // Design showcase examples using the uploaded images
  const showcaseDesigns: DesignItem[] = [
    {
      id: 1,
      imageUrl: "/lovable-uploads/9a3250c6-ce31-4418-80d0-bc97b7ab3e30.png",
      description: "Elegant Peach Embroidered Gown",
      collection: "Summer Collection 2024"
    },
    {
      id: 2,
      imageUrl: "/lovable-uploads/2dbf30af-5272-4c3f-9711-1aebcd7615fd.png",
      description: "Contemporary Peach Lehenga Set",
      collection: "Festive Collection 2024"
    },
    {
      id: 3,
      imageUrl: "/lovable-uploads/0832828e-2bb3-4e4c-a575-9d701da463f6.png",
      description: "Floral Summer Maxi Dress",
      collection: "Spring Collection 2024"
    },
    {
      id: 4,
      imageUrl: "/lovable-uploads/14e7ad26-7c9a-4f2a-ad1b-22b5f97a761b.png",
      description: "Classic Black Tuxedo",
      collection: "Formal Collection 2024"
    },
    {
      id: 5,
      imageUrl: "/lovable-uploads/f8581dbf-b0bb-4c71-a15c-a316e9b7e187.png",
      description: "Vibrant Floral Print Suit",
      collection: "Resort Collection 2024"
    },
    {
      id: 6,
      imageUrl: "/lovable-uploads/1968d2f7-660d-4b32-9695-8eee76650735.png",
      description: "Traditional Wedding Sherwani",
      collection: "Bridal Collection 2024"
    },
    {
      id: 7,
      imageUrl: "/lovable-uploads/7511b8d8-1f26-4e09-9b07-448d6166a6e4.png",
      description: "Avant-Garde Color Block Coat",
      collection: "Winter Collection 2024"
    },
    {
      id: 8,
      imageUrl: "/lovable-uploads/6a525cf3-b8df-48e0-af86-a0ee7e682f79.png",
      description: "Edgy Futuristic Evening Wear",
      collection: "Couture Collection 2024"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 appear-animate opacity-0" style={{ '--delay': '17' } as React.CSSProperties}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter">
            Designs Created With Our AI
          </h2>
          <p className="text-xl text-gray-600">
            From concept to stunning visuals in seconds
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 appear-animate opacity-0" style={{ '--delay': '18' } as React.CSSProperties}>
          {showcaseDesigns.map((design) => (
            <div key={design.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover-glow">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={design.imageUrl}
                  alt={`AI Fashion Design: ${design.description}`}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-900">{design.description}</h4>
                <p className="text-sm text-gray-500 mt-1">{design.collection}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
