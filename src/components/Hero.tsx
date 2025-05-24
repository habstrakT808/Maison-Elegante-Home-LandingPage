import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const opacity = 1 - Math.min(scrollY / 500, 1);
        const translateY = scrollY * 0.5;
        
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920)', 
          backgroundPosition: 'center 30%' 
        }}>
        <div className="absolute inset-0 bg-charcoal/50"></div>
      </div>
      
      {/* Content */}
      <div 
        ref={heroRef}
        className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6 opacity-0 animate-fade-in-up">
            Transform Your Space Into <span className="text-gold">Art</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-300">
            Exceptional interior design that marries luxury with functionality, creating spaces that inspire and elevate everyday living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animation-delay-600">
            <button className="px-8 py-3 bg-gold text-charcoal font-medium rounded hover:bg-gold/90 transition-all transform hover:scale-105">
              Explore Our Work
            </button>
            <button className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded hover:bg-white/10 transition-all">
              Book a Consultation
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce cursor-pointer"
          onClick={scrollToAbout}
        >
          <ChevronDown className="w-8 h-8" />
        </div>
      </div>
    </section>
  );
};

export default Hero;