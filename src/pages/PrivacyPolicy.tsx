import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50 to-white text-gray-800">
      <Navbar />

      <main className="flex flex-col items-center py-20 px-6 sm:px-10 lg:px-24 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center text-black">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl">
          Your trust is our priority. Here’s how <strong>MindOrbit.ai</strong> handles your data securely and respectfully.
        </p>

        <div className="w-full space-y-10">
          {/* Section 1 */}
          <section className="bg-white shadow-md rounded-2xl p-6 sm:p-10 border border-gray-100">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">1. Information We Collect</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Account info: name, email, and profile image (used for login & personalization).</li>
              <li>User-generated prompts and output images from AI model.</li>
              <li>Device metadata: browser type, operating system, and IP address for analytics and security.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white shadow-md rounded-2xl p-6 sm:p-10 border border-gray-100">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Enhance and personalize the AI generation experience.</li>
              <li>Enable sharing, gallery submissions, and social features.</li>
              <li>Improve app performance and recommend relevant content.</li>
              <li>Notify you about critical updates or promotions (you can opt out anytime).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white shadow-md rounded-2xl p-6 sm:p-10 border border-gray-100">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">3. Data Sharing</h2>
            <p className="text-gray-700 mb-2">We do <strong>not sell</strong> your data. Limited data may be shared only:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>With secure third-party services for hosting, storage, or analytics.</li>
              <li>To comply with legal requests or regulatory authorities.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white shadow-md rounded-2xl p-6 sm:p-10 border border-gray-100">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">4. Data Retention & Security</h2>
            <p className="text-gray-700">
              Your data is stored securely with encryption and regular audits. We retain it only as long as needed to serve you or meet legal requirements.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white shadow-md rounded-2xl p-6 sm:p-10 border border-gray-100">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-2">
              You have full control over your data. You may:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access, edit, or delete your account data.</li>
              <li>Request data export or account removal.</li>
              <li>Opt out of marketing or newsletters anytime.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="bg-white shadow-md rounded-2xl p-6 sm:p-10 border border-gray-100">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">6. Contact Us</h2>
            <p className="text-gray-700">
              Questions or requests? We’re here to help.
            </p>
            <ul className="text-gray-700 mt-2">
              <li><strong>Email:</strong> aethertechwork@gmail.com</li>
              <li><strong>Phone:</strong> +91-9934550016</li>
            </ul>
          </section>

          <p className="text-xs text-center text-gray-400 mt-8">
            Last updated: May 4, 2025
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
