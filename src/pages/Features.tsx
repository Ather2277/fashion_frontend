import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sparkles, Shirt, Paintbrush2, Zap } from "lucide-react"; // You can replace or add more icons

const features = [
  {
    title: "AI-Powered Outfit Generation",
    description: "Generate stunning clothing designs using state-of-the-art AI trained on thousands of fashion datasets.",
    icon: <Zap className="h-8 w-8 text-black" />
  },
  {
    title: "Customizable Styles",
    description: "Choose your preferences—colors, patterns, textures, and more—to generate truly personalized designs.",
    icon: <Paintbrush2 className="h-8 w-8 text-black" />
  },
  {
    title: "Realistic Visual Output",
    description: "Visualize your ideas as if they’re already manufactured. Our model outputs hyper-realistic clothing visuals.",
    icon: <Shirt className="h-8 w-8 text-black" />
  },
  {
    title: "Instant Results",
    description: "Generate a unique outfit in seconds—no wait time, no complexity. Just prompt and go.",
    icon: <Sparkles className="h-8 w-8 text-black" />
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      
      {/* Added margin-top to create more space between Navbar and content */}
      <main className="flex flex-col items-center py-20 px-4 mt-16">
        <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">
          What Makes Us Stand Out?
        </h1>
        <p className="text-gray-600 text-sm mb-12 text-center max-w-2xl">
          Explore the powerful features that make our AI Outfit Generator one-of-a-kind for designers, retailers, and creatives.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-5xl w-full animate-fade-in">
          {features.map(({ title, description, icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 shadow-md p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
                <h3 className="text-xl font-semibold">{title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;
