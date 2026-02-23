import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import vitalPathLogo from 'figma:asset/755a8d1f2da0a645866fa4c774c9a911a6c15934.png';

interface HeaderProps {
  onGetStarted?: () => void;
  onLogoClick?: () => void;
  onNavigate?: () => void;
}

export function Header({ onGetStarted, onLogoClick, onNavigate }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    
    // Hide results view if callback provided
    if (onNavigate) {
      onNavigate();
    }
    
    const element = document.querySelector(target);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-[#2D2640]/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={onLogoClick}
            className="flex items-center hover:opacity-80 transition-opacity mr-6"
          >
            {/* Logo Frame - Desktop */}
            <div className="hidden sm:flex items-center justify-center">
              <img 
                src={vitalPathLogo} 
                alt="VitalPath Logo" 
                style={{ filter: 'brightness(0) invert(1)', height: '40px' }}
                className="w-auto object-contain"
              />
            </div>
            {/* Logo Frame - Mobile */}
            <div className="flex sm:hidden items-center justify-center">
              <img 
                src={vitalPathLogo} 
                alt="VitalPath Logo" 
                style={{ filter: 'brightness(0) invert(1)', height: '32px' }}
                className="w-auto object-contain"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a 
              href="#services" 
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={(e) => handleNavClick(e, '#services')}
            >
              Services
            </a>
            <a 
              href="#experts" 
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={(e) => handleNavClick(e, '#experts')}
            >
              Our Experts
            </a>
            <div className="relative group">
              <button 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Resources
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1A1A] border border-[#2D2640] rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl">
                <a href="#blog" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-[#252525] rounded-lg transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>Blog</a>
                <a href="#guides" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-[#252525] rounded-lg transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>Wellness Guides</a>
                <a href="#research" className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-[#252525] rounded-lg transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>Research</a>
              </div>
            </div>
            <a 
              href="#pricing" 
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={(e) => handleNavClick(e, '#pricing')}
            >
              Pricing
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              className="text-gray-400 hover:text-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sign In
            </button>
            <button 
              className="bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-[#6B9B8E]/30 transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onClick={onGetStarted}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#2D2640] pt-4">
            <nav className="flex flex-col gap-4">
              <a 
                href="#services" 
                className="text-gray-400 hover:text-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={(e) => handleNavClick(e, '#services')}
              >
                Services
              </a>
              <a 
                href="#experts" 
                className="text-gray-400 hover:text-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={(e) => handleNavClick(e, '#experts')}
              >
                Our Experts
              </a>
              <a 
                href="#blog" 
                className="text-gray-400 hover:text-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={(e) => handleNavClick(e, '#blog')}
              >
                Resources
              </a>
              <a 
                href="#pricing" 
                className="text-gray-400 hover:text-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={(e) => handleNavClick(e, '#pricing')}
              >
                Pricing
              </a>
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  className="text-gray-400 hover:text-white transition-colors text-left"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Sign In
                </button>
                <button 
                  className="bg-gradient-to-r from-[#6B9B8E] to-[#4A7C6F] text-white px-6 py-3 rounded-full font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  onClick={onGetStarted}
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}