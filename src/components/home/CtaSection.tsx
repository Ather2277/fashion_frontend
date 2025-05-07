
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function CtaSection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleStartWithGoogle = async () => {
    if (isAuthenticated) {
      navigate('/ai-outfit-generator');
    } else {
      navigate('/signup');
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl appear-animate opacity-0" style={{ '--delay': '23' } as React.CSSProperties}>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your fashion designs?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of designers who are already using our AI to create stunning fashion collections.
            </p>
            <Button 
              onClick={handleStartWithGoogle}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg h-12 px-8"
              size="lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
