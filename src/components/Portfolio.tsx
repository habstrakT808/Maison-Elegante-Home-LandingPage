import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  image: string;
  galleryImages: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Minimalist Apartment",
    category: "Residential",
    description: "A clean, modern apartment design that maximizes space and light. The focus was on creating a serene environment with a neutral palette and natural materials.",
    location: "New York, NY",
    image: "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1200",
    galleryImages: [
      "https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
  },
  {
    id: 2,
    title: "Luxury Villa Renovation",
    category: "Residential",
    description: "Complete transformation of a Mediterranean villa into a modern luxury home with smart home integration and custom furniture pieces.",
    location: "Miami, FL",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200",
    galleryImages: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
  },
  {
    id: 3,
    title: "Boutique Hotel Lobby",
    category: "Commercial",
    description: "A striking hotel lobby design that creates a memorable first impression with dramatic lighting, custom art installations, and bespoke furniture.",
    location: "Chicago, IL",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
    galleryImages: [
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/261107/pexels-photo-261107.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
  },
  {
    id: 4,
    title: "Executive Office Suite",
    category: "Commercial",
    description: "A sophisticated office design that balances professionalism with comfort, featuring ergonomic furniture and a thoughtful layout to enhance productivity.",
    location: "San Francisco, CA",
    image: "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=1200",
    galleryImages: [
      "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ]
  }
];

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const filters = ['All', 'Residential', 'Commercial'];
  
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
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  const openProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };
  
  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  
  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.galleryImages.length - 1 : prevIndex - 1
      );
    }
  };
  
  return (
    <section id="portfolio" ref={sectionRef} className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-sm font-medium tracking-widest uppercase reveal opacity-0">Our Portfolio</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2 mb-6 reveal opacity-0">
            Showcasing Excellence
          </h2>
          <p className="text-charcoal/80 reveal opacity-0">
            Explore our collection of thoughtfully designed spaces that reflect our commitment to beauty, functionality, and innovation.
          </p>
        </div>
        
        <div className="flex justify-center mb-12 reveal opacity-0">
          <div className="flex space-x-2 bg-taupe/10 p-1 rounded-full">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === activeFilter
                    ? 'bg-gold text-white shadow-md'
                    : 'hover:bg-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative overflow-hidden rounded-lg cursor-pointer reveal opacity-0"
              onClick={() => openProject(project)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-serif font-bold">{project.title}</h3>
                <p className="text-sm text-white/80">{project.category} • {project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4">
          <div className="relative bg-cream max-w-5xl w-full max-h-[90vh] overflow-auto rounded-lg shadow-2xl">
            <button 
              className="absolute top-4 right-4 z-10 bg-charcoal text-white p-2 rounded-full"
              onClick={closeProject}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-[4/3]">
                <img 
                  src={selectedProject.galleryImages[currentImageIndex]} 
                  alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {selectedProject.galleryImages.length > 1 && (
                  <>
                    <button 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full text-charcoal hover:bg-white transition-all"
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                      &lt;
                    </button>
                    <button 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full text-charcoal hover:bg-white transition-all"
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                      &gt;
                    </button>
                    
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {selectedProject.galleryImages.map((_, index) => (
                        <button 
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-gold' : 'bg-white/50'
                          }`}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="p-8">
                <span className="text-gold text-sm font-medium tracking-widest uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-serif font-bold mt-2 mb-4">{selectedProject.title}</h3>
                <p className="text-charcoal/80 mb-6">{selectedProject.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Location</h4>
                  <p className="text-charcoal/70">{selectedProject.location}</p>
                </div>
                
                <button className="px-6 py-3 bg-gold text-charcoal font-medium rounded hover:bg-gold/90 transition-all">
                  View Full Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;