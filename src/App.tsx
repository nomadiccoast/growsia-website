/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Megaphone, 
  Camera, 
  Share2, 
  ArrowRight, 
  CheckCircle2, 
  Globe,
  Zap,
  X,
  MessageSquare,
  Phone,
  User,
  Briefcase
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

export default function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-bg selection:bg-accent selection:text-black">
      <AnimatePresence>
        {showForm && (
          <InquiryForm onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>

      {/* Section 1 — Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold tracking-tight flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-black" />
            </div>
            Webvo
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowForm(true)}
            className="bg-accent text-black px-6 py-2.5 font-bold text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      <main className="bg-grid">
        {/* Section 2 — Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 px-4 py-1 border border-accent/20 rounded-full bg-accent/5 text-accent text-xs font-bold tracking-widest uppercase"
          >
            Making You Come Online
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold font-display max-w-6xl leading-[0.9] tracking-tighter mb-8"
          >
            WE BUILD WEBSITES THAT <span className="text-accent text-glow italic">WORK</span> AS HARD AS YOU DO.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-grey text-lg md:text-2xl max-w-2xl mb-12 font-light leading-relaxed"
          >
            Web development, digital marketing, and content creation for local businesses that want real results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={() => setShowForm(true)}
              className="bg-accent text-black px-10 py-5 text-lg font-bold hover:bg-white transition-colors duration-300 flex items-center gap-2 group"
            >
              Start Your Project <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-border text-white px-10 py-5 text-lg font-bold hover:bg-white/5 transition-colors duration-300">
              View Our Work
            </button>
          </motion.div>
        </section>

        {/* Section 3 — Services */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">Our Expertise</h2>
            <div className="w-20 h-1 bg-accent" />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <ServiceCard 
              icon={<Globe size={32} />}
              title="Website Development"
              description="Fast, functional websites built specifically for your business. Not templates — high-performance systems designed to convert."
              tags={["React", "Next.js", "E-commerce"]}
            />
            <ServiceCard 
              icon={<Megaphone size={32} />}
              title="Digital Marketing"
              description="Google, Instagram, and local SEO that brings real customers to your door. We manage your growth while you manage your business."
              tags={["SEO", "PPC", "Local Ads"]}
            />
            <ServiceCard 
              icon={<Camera size={32} />}
              title="Business Photography"
              description="Professional photo clicking of your business. High-end visuals that make your brand look as good as it actually is."
              tags={["Product", "Interior", "Portrait"]}
            />
            <ServiceCard 
              icon={<Share2 size={32} />}
              title="Social Media Management"
              description="Complete management of your social presence. We handle the content, the posting, and the engagement."
              tags={["Instagram", "FB", "Content Strategy"]}
            />
          </motion.div>
        </section>

        {/* Section 4 — Process */}
        <section className="py-32 px-6 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">How We Work</h2>
              <p className="text-grey text-lg max-w-xl mx-auto">A streamlined process to get your business online and growing.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <ProcessStep 
                number="01"
                title="Strategy"
                description="We analyze your business, competitors, and goals to create a custom digital roadmap."
              />
              <ProcessStep 
                number="02"
                title="Creation"
                description="Our team builds your site, shoots your content, and sets up your marketing campaigns."
              />
              <ProcessStep 
                number="03"
                title="Launch & Scale"
                description="We go live and continuously optimize for performance, ensuring consistent growth."
              />
            </div>
          </div>
        </section>

        {/* Section — After-Sale Support */}
        <section className="py-32 px-6 border-b border-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-bold font-display mb-8">Unmatched <span className="text-accent italic">Support</span></h2>
                <p className="text-grey text-xl mb-8 leading-relaxed">
                  We don't just deliver a project and disappear. We build long-term partnerships. Our team is available for deep strategy sessions and immediate technical fixes.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-full text-accent">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Long Strategy Sessions</h4>
                      <p className="text-grey">We talk for as long as needed to align your digital growth with your business goals.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-full text-accent">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Instant Issue Resolution</h4>
                      <p className="text-grey">Found a bug? Want a quick change? We fix it instantly, ensuring zero downtime for your business.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-surface p-12 border border-border relative"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl" />
                <h3 className="text-3xl font-display font-bold text-white mb-6">"Webvo isn't just a vendor; they're our digital department."</h3>
                <p className="text-grey italic">— Local Business Owner</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 5 — Why Choose Us */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div {...fadeInUp}>
                <h2 className="text-4xl md:text-6xl font-bold font-display mb-8">Why Webvo?</h2>
                <div className="space-y-8">
                  <WhyItem 
                    title="Built for Local Businesses"
                    description="We understand the specific needs of gyms, restaurants, and coaching institutes."
                  />
                  <WhyItem 
                    title="AI Powered Efficiency"
                    description="Every website we build includes smart features that save you time and effort."
                  />
                  <WhyItem 
                    title="End to End Support"
                    description="From design to launch to ongoing support, we handle everything."
                  />
                  <WhyItem 
                    title="Results Focused"
                    description="We measure success by your growth, not just how the website looks."
                  />
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square bg-accent/10 border border-accent/20 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-grid opacity-20" />
                <Zap size={120} className="text-accent animate-pulse" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/80 backdrop-blur-md border border-border">
                  <p className="text-white font-bold text-xl mb-2">100% Online Presence</p>
                  <p className="text-grey text-sm">We don't just build sites; we build digital identities that thrive.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 6 — Contact */}
        <section className="py-32 px-6 text-center border-t border-border relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <motion.div 
            {...fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-bold font-display mb-8 tracking-tighter">
              READY TO <span className="text-accent italic">GROW</span>?
            </h2>
            <p className="text-grey text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto">
              Let's talk about what you need. No lengthy forms, just a conversation that moves your business forward.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={() => setShowForm(true)}
                className="group relative bg-accent text-black px-12 py-6 text-xl font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.3)]"
              >
                Get Started Now
                <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 translate-y-1" />
              </button>
              <div className="flex flex-col items-center gap-4">
                <p className="text-grey text-lg">
                  email us at <a href="mailto:contact@webvo.in" className="text-white hover:text-accent transition-colors underline underline-offset-8">contact@webvo.in</a>
                </p>
                <p className="text-grey text-lg">
                  or WhatsApp us at <a href="https://wa.me/919336922971" target="_blank" rel="noreferrer" className="text-white hover:text-accent transition-colors underline underline-offset-8 font-bold">+91 9336922971</a>
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Section 7 — Footer */}
      <footer className="border-t border-border py-12 px-6 bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-xl font-display font-bold">
            <div className="w-6 h-6 bg-accent rounded-sm" />
            Webvo
          </div>
          <div className="flex gap-8 text-grey text-sm font-medium">
            <a href="#" className="hover:text-accent transition-colors">Services</a>
            <a href="#" className="hover:text-accent transition-colors">Process</a>
            <a href="#" className="hover:text-accent transition-colors">Contact</a>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-grey text-xs tracking-widest uppercase">
              © 2025 Webvo Agency
            </p>
            <p className="text-accent text-xs tracking-widest uppercase font-bold">
              Made for local businesses
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function InquiryForm({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    mobile: '',
    services: [] as string[],
    details: '',
    callTime: ''
  });

  const servicesOptions = [
    'Website Development',
    'Digital Marketing',
    'Business Photography',
    'Social Media Management'
  ];

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      alert("Please select at least one service.");
      return;
    }
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => onClose(), 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error:", errorData);
        alert(errorData.message || "Failed to send inquiry. Please try again.");
        setStatus('idle');
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection.");
      setStatus('idle');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bg flex items-center justify-center p-6 overflow-y-auto"
    >
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-grey hover:text-accent transition-colors p-2"
      >
        <X size={32} />
      </button>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-2xl w-full py-20"
      >
        {status === 'success' ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} className="text-accent" />
            </div>
            <h2 className="text-4xl font-display font-bold mb-4">Inquiry Sent!</h2>
            <p className="text-grey text-xl italic mb-8">We'll be in touch instantly.</p>
            <a 
              href={`https://wa.me/919336922971?text=Hi Webvo, I just submitted an inquiry for ${formData.services.join(", ")}. My business is ${formData.businessName}.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 font-bold rounded-sm hover:scale-105 transition-transform"
            >
              Chat on WhatsApp <ArrowRight size={18} />
            </a>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-bold font-display mb-4">Start Your <span className="text-accent italic">Project</span></h2>
              <p className="text-grey text-lg">Tell us what you need, and we'll handle the rest.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-grey flex items-center gap-2">
                    <User size={14} /> Your Name
                  </label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-surface border-b border-border p-4 text-white focus:border-accent outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-grey flex items-center gap-2">
                    <Briefcase size={14} /> Business Name
                  </label>
                  <input 
                    required
                    type="text"
                    value={formData.businessName}
                    onChange={e => setFormData({...formData, businessName: e.target.value})}
                    className="w-full bg-surface border-b border-border p-4 text-white focus:border-accent outline-none transition-colors"
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-grey flex items-center gap-2">
                    <Phone size={14} /> Mobile Number
                  </label>
                  <input 
                    required
                    type="tel"
                    value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                    className="w-full bg-surface border-b border-border p-4 text-white focus:border-accent outline-none transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-grey flex items-center gap-2">
                    <Zap size={14} /> Preferred Call Time (Optional)
                  </label>
                  <input 
                    type="datetime-local"
                    value={formData.callTime}
                    onChange={e => setFormData({...formData, callTime: e.target.value})}
                    className="w-full bg-surface border-b border-border p-4 text-white focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold tracking-widest uppercase text-grey flex items-center gap-2">
                  <Zap size={14} /> Services Wanted (Select Multiple)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicesOptions.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`p-4 text-left border transition-all duration-300 ${
                        formData.services.includes(service)
                          ? 'bg-accent text-black border-accent'
                          : 'bg-surface text-grey border-border hover:border-accent/50'
                      }`}
                    >
                      <span className="text-sm font-bold">{service}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-grey flex items-center gap-2">
                  <MessageSquare size={14} /> Other Details
                </label>
                <textarea 
                  rows={4}
                  value={formData.details}
                  onChange={e => setFormData({...formData, details: e.target.value})}
                  className="w-full bg-surface border-b border-border p-4 text-white focus:border-accent outline-none transition-colors resize-none"
                  placeholder="Tell us more about your goals..."
                />
              </div>

              <button 
                disabled={status === 'submitting'}
                type="submit"
                className="w-full bg-accent text-black py-6 text-xl font-bold hover:bg-white transition-all duration-300 disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function ServiceCard({ icon, title, description, tags }: { icon: ReactNode, title: string, description: string, tags: string[] }) {
  return (
    <motion.div 
      variants={fadeInUp}
      className="p-10 border border-border bg-surface group hover:border-accent transition-all duration-500 flex flex-col items-start text-left relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="text-accent -rotate-45" />
      </div>
      <div className="text-accent mb-8 p-4 bg-accent/5 rounded-lg border border-accent/10 group-hover:bg-accent group-hover:text-black transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-3xl font-display font-bold mb-4 text-white group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-grey leading-relaxed mb-8 text-lg">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 border border-border text-grey group-hover:border-accent/30 group-hover:text-accent/70 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ProcessStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div 
      variants={fadeInUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="relative p-8 border-l border-border hover:border-accent transition-colors group"
    >
      <span className="absolute -left-[1px] top-0 w-px h-0 bg-accent group-hover:h-full transition-all duration-700" />
      <span className="text-accent font-display text-5xl font-bold opacity-20 mb-6 block">{number}</span>
      <h3 className="text-2xl font-display font-bold text-white mb-4">{title}</h3>
      <p className="text-grey leading-relaxed">{description}</p>
    </motion.div>
  );
}

function WhyItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <CheckCircle2 size={20} className="text-accent" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
        <p className="text-grey">{description}</p>
      </div>
    </div>
  );
}
