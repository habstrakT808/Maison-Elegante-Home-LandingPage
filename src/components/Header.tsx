import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream/95 backdrop-blur-sm py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-serif font-bold tracking-tight">
            <span className="text-gold">Maison</span>
            <span className={`${isScrolled ? 'text-charcoal' : 'text-white'}`}>Élégante</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className={`font-medium hover:text-gold transition-colors ${
                      isScrolled ? 'text-charcoal' : 'text-white'
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-charcoal' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-charcoal' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute left-0 right-0 bg-cream shadow-lg transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col space-y-4 px-4">
            {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="block text-charcoal hover:text-gold transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;