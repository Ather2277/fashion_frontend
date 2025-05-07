
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TokenProvider } from "@/contexts/TokenContext";
import HomePage from "./pages/HomePage";
import Features from "./pages/Features";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AiOutfitGenerator from "./pages/AiOutfitGenerator";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/pricing";
import ContactPage from "./pages/Contactpage";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import BlogPage from "./pages/Blog";
import TermsOfServicePage from "./pages/TermsOfServices";
import AboutPage from "./pages/AboutUs";
import Cookies from "./pages/CookiePolicyPage";
import Gallery from "./pages/Gallery";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TokenProvider>
          <Toaster />
          <Sonner position="top-right" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/ai-outfit-generator" element={<AiOutfitGenerator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TokenProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
