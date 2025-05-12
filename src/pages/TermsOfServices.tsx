import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, FileText, AlertCircle, Lock, RefreshCcw, Mail, Phone } from "lucide-react";

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800">
      <Navbar />

      <main className="flex-grow px-6 sm:px-10 lg:px-24 py-20 max-w-6xl mx-auto animate-fadeIn">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-black mb-6 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Welcome to <span className="font-semibold text-indigo-600">MindOrbit.ai</span> — by using our platform, you're agreeing to our terms below. Please read them carefully.
        </p>

        <div className="space-y-12">
          {/* Section Template */}
          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <ShieldCheck size={22} /> 1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By using our services, you agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <FileText size={22} /> 2. Services Overview
            </h2>
            <p className="text-gray-700">
              MindOrbit.ai empowers users to create AI-generated outfits, share designs, and personalize their fashion experience using token-based credits.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <AlertCircle size={22} /> 3. User Responsibilities
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-1">
              <li>Use the platform respectfully and ethically.</li>
              <li>Avoid posting harmful or illegal content.</li>
              <li>You are accountable for your account activity.</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <Lock size={22} /> 4. Token Usage & Payments
            </h2>
            <p className="text-gray-700">
              Tokens are non-refundable and used for generating designs. Prices may be updated without notice.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <FileText size={22} /> 5. Intellectual Property
            </h2>
            <p className="text-gray-700">
              Users own their generated content. MindOrbit.ai may feature anonymized content for marketing or system improvements.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <ShieldCheck size={22} /> 6. Termination
            </h2>
            <p className="text-gray-700">
              We reserve the right to suspend or delete accounts that violate our terms or harm user experience.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <AlertCircle size={22} /> 7. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              Our services are provided "as-is". MindOrbit.ai isn’t liable for any damages resulting from the use of our platform.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <RefreshCcw size={22} /> 8. Updates to Terms
            </h2>
            <p className="text-gray-700">
              We may update these terms occasionally. Continued usage implies acceptance of those changes.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 mb-2">
              <Mail size={22} /> 9. Contact Us
            </h2>
            <p className="text-gray-700 mb-1">If you have any questions about these Terms, feel free to reach out:</p>
            <ul className="text-gray-800">
              <li><strong>Email:</strong> aethertechwork@gmail.com</li>
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

export default TermsOfServicePage;
