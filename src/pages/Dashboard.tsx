
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Wand2 } from 'lucide-react';

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter animate-fade-in">
              Welcome, {user.name}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover-glow">
                <h2 className="text-xl font-semibold mb-3">Your Designs</h2>
                <p className="text-gray-600 mb-6">You have 0 saved designs.</p>
                <Button 
                  onClick={() => navigate('/ai-outfit-generator')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Create New Design
                </Button>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover-glow">
                <h2 className="text-xl font-semibold mb-3">Subscription</h2>
                <p className="text-gray-600 mb-6">You're on the Free plan. 5/10 generations left this month.</p>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/pricing')}
                  className="w-full"
                >
                  Upgrade Plan
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm animate-fade-in">
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity to show.</p>
                <p className="mt-2">Start creating designs to see your activity here.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
