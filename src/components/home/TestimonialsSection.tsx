
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      quote: "This platform revolutionized our design process. We've cut our concept-to-prototype time by 80%.",
      author: "Sarah Johnson",
      role: "Design Director, Fashion Forward"
    },
    {
      quote: "The AI-generated designs are incredibly creative, often suggesting details I wouldn't have thought of myself.",
      author: "Michael Chen",
      role: "Independent Fashion Designer"
    },
    {
      quote: "As a small boutique, we can now offer custom designs without expanding our design team.",
      author: "Emma Rodriguez",
      role: "Owner, Stylish Threads"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 appear-animate opacity-0" style={{ '--delay': '19' } as React.CSSProperties}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter">
            What Fashion Designers Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied designers using our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm appear-animate opacity-0"
              style={{ '--delay': `${20 + index}` } as React.CSSProperties}
            >
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
