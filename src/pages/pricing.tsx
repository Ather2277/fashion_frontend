import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from '@/contexts/AuthContext';

const tokenOptions = [
  { amount: 10, price: 150 },
  { amount: 25, price: 350 },
  { amount: 50, price: 650 },
];

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartWithGoogle = () => {
    if (isAuthenticated) {
      navigate('/ai-outfit-generator');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      
      {/* Added margin-top to increase distance between Navbar and content */}
      <main className="flex flex-col items-center py-20 px-4 mt-16">
        <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">
          Choose Your Token Plan
        </h1>
        <p className="text-gray-600 text-sm mb-10 text-center">
          Each token lets you generate one unique AI outfit design. <br />
          <strong>1 Token = ₹15</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full animate-fade-in">
          {tokenOptions.map(({ amount, price }) => (
            <div
              key={amount}
              className="rounded-2xl border border-gray-200 shadow-md p-6 text-center hover:scale-105 transition-transform min-h-[240px] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2">{amount} Tokens</h2>
                <p className="text-xl text-gray-700 mb-6">₹{price}</p>
              </div>
              <button
                onClick={handleStartWithGoogle}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 w-full mt-auto"
              >
                <span role="img" aria-label="card">💳</span> Buy Now
              </button>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
