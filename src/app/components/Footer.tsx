import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#0D0D0D] border-t border-transparent mt-0 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B9B8E] to-[#4A7C6F] flex items-center justify-center">
                <span 
                  className="text-white font-semibold text-lg"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  V
                </span>
              </div>
              <span 
                className="text-xl text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                VitalPath
              </span>
            </div>
            <p 
              className="text-gray-500 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Wellness, mastered through science and personalization.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 
              className="text-white font-medium mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {['1-on-1 Coaching', 'Nutrition Plans', 'VitalPath AI', 'Community'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 
              className="text-white font-medium mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Company
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Our Experts', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 
              className="text-white font-medium mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Support
            </h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-white transition-colors text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2D2640]/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p 
            className="text-gray-500 text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            © 2026 VitalPath Wellness. All rights reserved.
          </p>
          <div 
            className="flex items-center gap-2 text-gray-500 text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Powered by{' '}
            <span className="flex items-center gap-1 text-white">
              <Heart className="w-4 h-4 text-[#6B9B8E] fill-[#6B9B8E]" />
              <span className="font-medium">wrdesigns</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}