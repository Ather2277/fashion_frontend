import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Wand2,
  Share2,
  ImageDown,
  GalleryVerticalEnd,
  SendHorizontal,
  Eye,
} from "lucide-react";

const blogFeatures = [
  {
    title: "Instant Outfit Generation",
    description:
      "Just fill a simple form with your preferences—colors, patterns, styles—and let our AI do the magic. In just seconds, you'll get a professional-grade outfit design. All this for only ₹15 per generation!",
    icon: <Wand2 className="h-16 w-16 text-indigo-600" />,
    reverse: false,
  },
  {
    title: "Seamless Sharing Across Socials",
    description:
      "Proud of your AI-generated design? Share it directly to Instagram, Twitter, or WhatsApp from the app. You can also download the design and showcase it your way!",
    icon: <Share2 className="h-16 w-16 text-pink-500" />,
    reverse: true,
  },
  {
    title: "In-App Gallery Posting",
    description:
      "Love what you’ve created? Post it to our in-app gallery for the community to see. Your work can inspire thousands of other creators and designers!",
    icon: <SendHorizontal className="h-16 w-16 text-green-600" />,
    reverse: false,
  },
  {
    title: "Browse & Appreciate Other Designs",
    description:
      "Discover amazing outfits designed by other users in the community gallery. Get inspired, leave likes, and explore trending fashion created by AI!",
    icon: <Eye className="h-16 w-16 text-blue-600" />,
    reverse: true,
  },
  {
    title: "High-Resolution Downloads",
    description:
      "All outfit images are rendered in high resolution so you can download, print, or use them in presentations or portfolios.",
    icon: <ImageDown className="h-16 w-16 text-gray-700" />,
    reverse: false,
  },
  {
    title: "Smart Personalization Engine",
    description:
      "Our backend AI models learn your taste over time. The more you generate, the better the results get—custom-tailored for your unique preferences.",
    icon: <GalleryVerticalEnd className="h-16 w-16 text-orange-500" />,
    reverse: true,
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />

      <main className="py-20 px-6 sm:px-10 lg:px-20 flex flex-col gap-16 mt-16">
        <h1 className="text-4xl font-bold text-center mb-12">Discover What You Can Do</h1>

        {blogFeatures.map(({ title, description, icon, reverse }, index) => (
          <section
            key={index}
            className={`flex flex-col md:flex-row ${
              reverse ? "md:flex-row-reverse" : ""
            } items-center gap-10 max-w-6xl mx-auto`}
          >
            <div className="flex-shrink-0">{icon}</div>
            <div className="text-center md:text-left md:max-w-lg">
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-600 text-md">{description}</p>
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
