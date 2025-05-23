import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { showRazorpayPayment } from '@/components/Payment/payment';

const tokenOptions = [
  { amount: 10, price: 150, perToken: '₹15.00' },
  { amount: 25, price: 350, perToken: '₹14.00' },
  { amount: 50, price: 650, perToken: '₹13.00' },
];

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBuyNow = async (price: number) => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }
    const success = await showRazorpayPayment({ amount: price });
    if (success) {
      navigate('/ai-outfit-generator');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      <main className="flex flex-col items-center py-20 px-4 mt-16">
        <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">
          Choose Your Token Plan
        </h1>
        <p className="text-gray-600 text-base mb-2 text-center">
          Each token lets you generate one unique AI outfit design.
        </p>
        <p className="text-black text-lg font-semibold mb-10 text-center">
          1 Token = ₹15
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl w-full animate-fade-in">
          {tokenOptions.map(({ amount, price, perToken }) => (
            <div
              key={amount}
              className="rounded-3xl shadow-xl bg-gradient-to-b from-[#b388ff] to-[#7c4dff] text-white p-10 text-center flex flex-col justify-between min-h-[440px]"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">{amount} Tokens</h2>
                <p className="text-7xl font-extrabold mb-2">₹ {price}</p>
                <p className="text-lg mb-6">Generate {amount} unique AI outfits</p>
                <ul className="text-center text-white/90 mb-6 space-y-1">
                  <li>High-quality designs</li>
                  <li>Instant delivery</li>
                </ul>
                <p className="text-white/80 text-base mb-8">1 Token = {perToken}</p>
              </div>
              <button
                onClick={() => handleBuyNow(price)}
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-gray-900 transition w-full mt-auto"
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