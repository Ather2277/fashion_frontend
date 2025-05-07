
import { useState, useEffect } from 'react';
import { NavbarLogo } from './navbar/NavbarLogo';
import { DesktopNavigation } from './navbar/DesktopNavigation';
import { MobileNavigation } from './navbar/MobileNavigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <NavbarLogo />
        <DesktopNavigation />
        <MobileNavigation />
      </div>
    </nav>
  );
}
