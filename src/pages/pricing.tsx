import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';

const tokenOptions = [
  { amount: 10, price: 150, gradient: 'from-[#43e97b] to-[#38f9d7]', perToken: '₹15.00' },
  { amount: 25, price: 350, gradient: 'from-[#ff5858] to-[#f09819]', perToken: '₹14.00' },
  { amount: 50, price: 650, gradient: 'from-[#b388ff] to-[#7c4dff]', perToken: '₹13.00' },
];

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selected, setSelected] = useState(2); // Default to 50 tokens

  const handleBuyNow = () => {
    if (isAuthenticated) {
      navigate('/ai-outfit-generator');
    } else {
      navigate('/signup');
    }
  };

  const { amount, price, gradient, perToken } = tokenOptions[selected];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      <main className="flex flex-col items-center py-20 px-4 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center animate-fade-in">
          TOKEN PLANS
        </h1>
        <p className="text-gray-700 text-base mb-8 text-center max-w-xl">
          Each token lets you generate one unique AI outfit design.
        </p>
        <div className="flex justify-center gap-8 mb-8">
          {tokenOptions.map((opt, idx) => (
            <button
              key={opt.amount}
              className={`text-lg md:text-xl px-4 py-1 rounded transition font-semibold focus:outline-none ${selected === idx ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}
              onClick={() => setSelected(idx)}
            >
              {opt.amount}
            </button>
          ))}
        </div>
        <Card className={`w-full max-w-md min-h-[480px] rounded-3xl shadow-xl bg-gradient-to-b ${gradient} text-white relative`}>
          <CardContent className="flex flex-col items-center py-16 px-6">
            <div className="text-2xl font-semibold mb-2">{amount} Tokens</div>
            <div className="text-6xl font-bold mb-2">₹ {price}</div>
            <div className="text-base mb-6">Generate {amount} unique AI outfits</div>
            <ul className="text-center text-white/90 mb-6 space-y-1">
              <li>High-quality designs</li>
              <li>Instant delivery</li>
            </ul>
            <div className="text-white/80 text-sm mb-8">1 Token = {perToken}</div>
            <button
              onClick={handleBuyNow}
              className="bg-black text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-gray-900 transition w-full max-w-xs"
            >
              BUY NOW
            </button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
