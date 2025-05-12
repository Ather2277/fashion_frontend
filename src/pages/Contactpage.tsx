import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, Twitter, Instagram } from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />

      {/* Spacing below Navbar */}
      <main className="flex flex-col items-center py-20 px-4 mt-16">
        <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">
          Contact Us
        </h1>
        <p className="text-gray-600 text-sm mb-12 text-center max-w-xl">
          We're here to help! Reach out through any of the channels below.
        </p>

        <div className="space-y-6 max-w-md w-full animate-fade-in">
          <div className="flex items-center gap-4">
            <Mail className="h-6 w-6 text-black" />
            <span className="text-base">aethertechwork@gmail.com</span>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="h-6 w-6 text-black" />
            <span className="text-base">+91 9934550016</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="h-6 w-6 text-black" />
            <span className="text-base">+91 9304088627</span>
          </div>

          <div className="flex items-center gap-4">
            <Twitter className="h-6 w-6 text-black" />
            <a
              href="https://twitter.com/aioutfitlab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @aioutfitlab
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Instagram className="h-6 w-6 text-black" />
            <a
              href="https://instagram.com/aioutfitlab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              @aioutfitlab
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
