import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cookie, EyeOff, Shield, Settings, Mail, Phone, RefreshCcw } from "lucide-react";

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800">
      <Navbar />

      <main className="flex-grow px-6 sm:px-10 lg:px-24 py-20 max-w-6xl mx-auto animate-fadeIn">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-black mb-6 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          This Cookie Policy explains how <span className="text-indigo-600 font-semibold">MindOrbit.ai</span> uses cookies and similar technologies to improve your browsing experience.
        </p>

        <div className="space-y-12">
          {/* Section */}
          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <Cookie size={22} /> 1. What Are Cookies?
            </h2>
            <p className="text-gray-700">
              Cookies are small text files stored on your device by your browser. They help us understand user behavior and enhance functionality.
            </p>
          </div>

          {/* Why We Use */}
          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <Settings size={22} /> 2. Why We Use Cookies
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>To remember user preferences and login sessions</li>
              <li>To improve site performance and functionality</li>
              <li>To analyze user behavior via tools like Google Analytics</li>
              <li>To personalize content and user experience</li>
            </ul>
          </div>

          {/* Types */}
          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <Shield size={22} /> 3. Types of Cookies We Use
            </h2>
            <p className="text-gray-700 mb-3">
              We use both **session cookies** (which expire when you close your browser) and **persistent cookies** (which stay on your device until deleted).
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li><strong>Essential Cookies:</strong> Required for core functionality (e.g., authentication).</li>
              <li><strong>Performance Cookies:</strong> Track site usage to help us improve.</li>
              <li><strong>Functionality Cookies:</strong> Remember user choices and preferences.</li>
              <li><strong>Analytics & Marketing Cookies:</strong> Help us understand behavior and tailor marketing efforts.</li>
            </ul>
          </div>

          {/* Control Cookies */}
          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <EyeOff size={22} /> 4. How to Control Cookies
            </h2>
            <p className="text-gray-700">
              You can control and delete cookies via your browser settings. You may also opt out of some tracking through services like Google Ads Settings.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Disabling cookies may limit some features of the website.
            </p>
          </div>

          {/* Updates */}
          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <RefreshCcw size={22} /> 5. Updates to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time. Changes will be posted on this page with a revised “last updated” date.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <Mail size={22} /> 6. Contact Us
            </h2>
            <p className="text-gray-700 mb-1">For questions about our use of cookies:</p>
            <ul className="text-gray-800">
              <li><strong>Email:</strong> modamorphtech@gmail.com</li>
              <li className="mt-1"><strong>Phone:</strong> +91-9934550016</li>
            </ul>
          </div>

          <p className="text-center text-xs text-gray-500 mt-10">
            Last updated: May 4, 2025
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
