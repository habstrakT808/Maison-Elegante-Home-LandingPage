import React, { useState, useEffect, useRef } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Residential Design",
    description: "Transform your home into a sanctuary that reflects your personal style and enhances your quality of life. From single rooms to complete homes.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 2,
    title: "Commercial Spaces",
    description: "Create inspiring workplaces that boost productivity and impress clients. We design offices, retail spaces, restaurants, and hotels.",
    image: "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 3,
    title: "Furniture Selection",
    description: "Find the perfect pieces that combine aesthetics with functionality. We help you select furniture that complements your space.",
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: 4,
    title: "Color Consultation",
    description: "Discover the power of color to transform your space. Our experts help you create the perfect palette for your interior.",
    image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<number>(1);
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
  
  const handleServiceChange = (id: number) => {
    setActiveService(id);
  };
  
  const activeServiceData = services.find(service => service.id === activeService);
  
  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-32 bg-taupe/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-sm font-medium tracking-widest uppercase reveal opacity-0">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2 mb-6 reveal opacity-0">
            Elevate Your Space
          </h2>
          <p className="text-charcoal/80 reveal opacity-0">
            Our comprehensive design services cater to every aspect of interior transformation, from concept to completion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal opacity-0">
            <div className="relative overflow-hidden rounded-lg aspect-[4/3] shadow-xl">
              <img 
                src={activeServiceData?.image} 
                alt={activeServiceData?.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          
          <div>
            <div className="mb-8 reveal opacity-0">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">{activeServiceData?.title}</h3>
              <p className="text-charcoal/80">{activeServiceData?.description}</p>
              <button className="mt-6 px-6 py-2 border-b-2 border-gold text-charcoal font-medium hover:text-gold transition-colors">
                Learn More
              </button>
            </div>
            
            <div className="space-y-4 reveal opacity-0">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceChange(service.id)}
                  className={`w-full text-left p-4 rounded transition-all ${
                    service.id === activeService
                      ? 'bg-gold/10 border-l-4 border-gold'
                      : 'bg-white/50 hover:bg-white'
                  }`}
                >
                  <h4 className="font-medium">{service.title}</h4>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;