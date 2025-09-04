import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, Twitter, Instagram, MapPin } from "lucide-react";

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
            <span className="text-base">modamorphtech@gmail.com</span>
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
              href="https://x.com/SU_vastra?t=-_tUfYmbowLsFJ1lc9wubg&s=08"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              @SU_vastra
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Instagram className="h-6 w-6 text-black" />
            <a
              href="https://www.instagram.com/su_vastra?igsh=MWpqejJ3OWE2d2xiNQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              @su_vastra
            </a>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="h-6 w-6 text-black" />
            <span className="text-base">821308- Katar , Dehri on Sone , Rohtas, Bihar , India.</span>
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
