import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alexandra Reynolds",
    role: "Homeowner, New York",
    quote: "Working with Maison Élégante was a dream. They transformed our apartment into a sophisticated haven that perfectly reflects our style. Their attention to detail and ability to maximize our space exceeded our expectations.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO, Horizon Group",
    quote: "The team at Maison Élégante designed our corporate headquarters with exceptional skill. The space not only looks stunning but has significantly improved our team's productivity and client impressions.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Boutique Hotel Owner",
    quote: "Our hotel's renovation by Maison Élégante has received countless compliments from guests. They created a unique atmosphere that stands out in a competitive market while maintaining the highest standards of functionality.",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.reveal');
      elements.forEach((el) => observer.observe(el));
    }
    
    return () => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.reveal');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);
  
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeIndex]);
  
  const startAutoSlide = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      goToNext();
    }, 6000);
  };
  
  const goToPrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  return (
    <section id="testimonials" ref={sectionRef} className="py-20 md:py-32 bg-taupe/10 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-sm font-medium tracking-widest uppercase reveal opacity-0">Testimonials</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2 mb-6 reveal opacity-0">
            Client Experiences
          </h2>
          <p className="text-charcoal/80 reveal opacity-0">
            Hear what our clients have to say about their journey with Maison Élégante.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto reveal opacity-0">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Quote className="w-10 h-10 text-gold/30 mb-4" />
                        <p className="text-charcoal/90 italic mb-6">
                          "{testimonial.quote}"
                        </p>
                        <h4 className="font-medium text-lg">{testimonial.name}</h4>
                        <p className="text-charcoal/70">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <button 
              className="p-2 rounded-full bg-white shadow-md text-charcoal hover:bg-gold hover:text-white transition-colors"
              onClick={goToPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-gold' : 'bg-taupe/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className="p-2 rounded-full bg-white shadow-md text-charcoal hover:bg-gold hover:text-white transition-colors"
              onClick={goToNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-gold/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Testimonials;