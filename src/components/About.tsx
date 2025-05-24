import React, { useEffect, useRef } from 'react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="relative reveal opacity-0">
              <img 
                src="https://images.pexels.com/photos/1668860/pexels-photo-1668860.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Interior Designer at Work" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold rounded-lg hidden md:block"></div>
            </div>
          </div>
          
          <div>
            <span className="text-gold text-sm font-medium tracking-widest uppercase reveal opacity-0">About Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2 mb-6 reveal opacity-0">
              Creating Exceptional <br/>Living Experiences
            </h2>
            <p className="text-charcoal/80 mb-6 reveal opacity-0">
              Founded in 2012, Maison Élégante has been transforming ordinary spaces into extraordinary experiences. Our passion for design excellence and attention to detail has made us a trusted name in luxury interior design.
            </p>
            <p className="text-charcoal/80 mb-8 reveal opacity-0">
              We believe that your home should be a reflection of your personality, lifestyle, and aspirations. Our team of expert designers works closely with you to understand your vision and bring it to life with creativity and precision.
            </p>
            
            <div className="grid grid-cols-2 gap-8 reveal opacity-0">
              <div>
                <div className="text-3xl font-serif font-bold text-gold">250+</div>
                <div className="text-sm text-charcoal/70 mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-gold">15+</div>
                <div className="text-sm text-charcoal/70 mt-1">Design Awards</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-gold">18</div>
                <div className="text-sm text-charcoal/70 mt-1">Expert Designers</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-gold">98%</div>
                <div className="text-sm text-charcoal/70 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;