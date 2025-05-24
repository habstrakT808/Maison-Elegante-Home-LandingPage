import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData(initialFormData);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-cream">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-sm font-medium tracking-widest uppercase reveal opacity-0">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2 mb-6 reveal opacity-0">
            Let's Create Together
          </h2>
          <p className="text-charcoal/80 reveal opacity-0">
            Ready to transform your space? Reach out to discuss your vision and how we can bring it to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-lg shadow-xl p-8 reveal opacity-0">
            <h3 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h3>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
                <h4 className="text-xl font-medium mb-2">Thank You!</h4>
                <p>Your message has been sent successfully. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal/70 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-taupe/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-taupe/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-charcoal/70 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-taupe/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-charcoal/70 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-taupe/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all appearance-none bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="Residential Design">Residential Design</option>
                      <option value="Commercial Design">Commercial Design</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal/70 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-taupe/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                    isSubmitting 
                      ? 'bg-gold/70 cursor-not-allowed' 
                      : 'bg-gold hover:bg-gold/90 transform hover:translate-y-[-2px]'
                  } text-charcoal`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-xl p-8 mb-8 reveal opacity-0">
              <h3 className="text-2xl font-serif font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-gold/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Our Location</h4>
                    <p className="text-charcoal/70">123 Design Avenue, Suite 500</p>
                    <p className="text-charcoal/70">New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-gold/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone Number</h4>
                    <p className="text-charcoal/70">+1 (212) 555-6789</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-gold/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Address</h4>
                    <p className="text-charcoal/70">info@maisonelegante.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-gold/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Office Hours</h4>
                    <p className="text-charcoal/70">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-charcoal/70">Saturday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl h-80 reveal opacity-0">
              {/* Embed Google Maps or a static map image here */}
              <img 
                src="https://images.pexels.com/photos/2157554/pexels-photo-2157554.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Map Location" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;