import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <a href="#" className="text-2xl font-serif font-bold tracking-tight text-white mb-6 inline-block">
              <span className="text-gold">Maison</span>
              <span>Élégante</span>
            </a>
            <p className="mb-6">
              Transforming spaces into extraordinary experiences with exceptional design and meticulous attention to detail.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-charcoal-light p-2 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-charcoal-light p-2 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-charcoal-light p-2 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-charcoal-light p-2 rounded-full hover:bg-gold hover:text-charcoal transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="hover:text-gold transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                'Residential Design',
                'Commercial Spaces',
                'Furniture Selection',
                'Color Consultation',
                'Lighting Design',
                'Custom Furniture'
              ].map((item) => (
                <li key={item}>
                  <a href="#services" className="hover:text-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Subscribe</h3>
            <p className="mb-4">
              Stay updated with our latest projects and design inspiration.
            </p>
            <form className="mb-6">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 bg-charcoal-light rounded-l-lg focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <button 
                  type="submit" 
                  className="bg-gold text-charcoal px-4 py-2 rounded-r-lg hover:bg-gold/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="text-sm text-white/60">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
        
        <hr className="border-white/10 my-12" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Maison Élégante. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-white/60 hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-white/60 hover:text-gold transition-colors">
              Terms of Service
            </a>
            <button 
              onClick={scrollToTop}
              className="bg-charcoal-light p-2 rounded-full hover:bg-gold hover:text-charcoal transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;