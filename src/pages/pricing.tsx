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
              className="rounded-3xl shadow-xl bg-gradient-to-b from-[#b388ff] to-[#7c4dff] text-white p-8 text-center hover:scale-105 transition-transform min-h-[320px] flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2">{amount} Tokens</h2>
                <p className="text-6xl font-bold mb-2">₹ {price}</p>
                <p className="text-base mb-6">Generate {amount} unique AI outfits</p>
                <ul className="text-center text-white/90 mb-6 space-y-1">
                  <li>High-quality designs</li>
                  <li>Instant delivery</li>
                </ul>
                <p className="text-white/80 text-sm mb-8">1 Token = ₹13.00</p>
              </div>
              <button
                onClick={handleStartWithGoogle}
                className="bg-black text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-900 transition w-full mt-auto"
              >
                BUY NOW
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
