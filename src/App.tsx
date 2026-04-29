import { getCloudinaryUrl } from './lib/cloudinary';
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import emailjs from '@emailjs/browser';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ArrowLeft,
  ArrowDown, 
  ArrowUp,
  Linkedin, 
  Instagram, 
  Twitter, 
  Dribbble, 
  Github, 
  ExternalLink,
  Users,
  Briefcase,
  Monitor,
  Layout,
  PenTool,
  Search,
  Zap,
  Layers,
  FileText,
  Play,
  Smartphone,
  Globe,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Send,
  Clapperboard,
  Clock,
  Video,
  MessageCircle,
  MessageSquare,
  Cpu,
  Settings,
  ShieldCheck,
  Package
} from 'lucide-react';

// --- Global Components ---

const CustomCursor = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    // Check if the device supports touch, if so, skip cursor functionality
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const follower = followerRef.current;
    if (!follower) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const lerpFactor = 0.2; // Faster lerp for more reactivity
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * lerpFactor;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * lerpFactor;

      // GPU-accelerated transform
      follower.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div 
      id="cursor-follower" 
      ref={followerRef} 
      className="fixed w-5 h-5 bg-black/10 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform' }}
    ></div>
  );
};

const Navbar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const dropdownData: Record<string, any> = {
    Services: {
      main: [
        { icon: <Smartphone size={18} />, title: "Telecom Services", desc: "Comprehensive telecom infrastructure solutions", link: "/services" },
        { icon: <Monitor size={18} />, title: "ICT Solutions", desc: "Enterprise ICT and networking systems", link: "/services" },
        { icon: <Zap size={18} />, title: "Power & Electrical Services", desc: "Industrial and commercial power solutions", link: "/services" },
        { icon: <Globe size={18} />, title: "Environmental Solutions", desc: "Sustainable engineering for the environment", link: "/services" },
        { icon: <Briefcase size={18} />, title: "Biomedical Equipment Services", desc: "Specialized medical equipment maintenance", link: "/services" },
      ]
    }
  };

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-[var(--primary-blue)]/10"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <Link to="/" className="flex items-center gap-2">
        <img 
          src={getCloudinaryUrl('logo-main')} 
          alt="EES Ltd Icon" 
          className="hidden md:block h-8 w-auto object-contain" 
          referrerPolicy="no-referrer"
        />
        <img 
          src={getCloudinaryUrl('logo-footer2')} 
          alt="EES Ltd Icon" 
          className="md:hidden h-8 w-auto object-contain" 
          referrerPolicy="no-referrer"
        />
        <span className="hidden md:block font-semibold text-lg tracking-tighter text-[var(--primary-blue)] uppercase">ECO-ENGINEERING SOLUTIONS LTD</span>
      </Link>
      
      <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-gray-600">
        <Link to="/" className={`hover:text-black transition-colors ${location.pathname === '/' ? 'text-black' : ''}`}>Home</Link>
        <Link to="/about" className={`hover:text-black transition-colors ${location.pathname === '/about' ? 'text-black' : ''}`}>About</Link>
        
        <div 
          className="relative group py-2"
          onMouseEnter={() => setActiveDropdown('Services')}
        >
          <Link 
            to="/services" 
            className={`hover:text-black transition-colors flex items-center gap-1 ${location.pathname === '/services' ? 'text-black' : ''}`}
          >
            Services <ChevronDown size={12} className={activeDropdown === 'Services' ? "rotate-180 transition-transform" : "transition-transform"} />
          </Link>
        </div>

        <Link to="/projects" className={`hover:text-black transition-colors ${location.pathname === '/projects' ? 'text-black' : ''}`}>Projects</Link>
        <Link to="/contacts" className={`hover:text-black transition-colors ${location.pathname === '/contacts' ? 'text-black' : ''}`}>Contact</Link>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMenu}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Menu size={20} />
        </button>
        <Link to="/contacts" className="hidden md:flex bg-[var(--primary-orange)] text-white px-5 py-2 rounded-full text-[13px] font-medium hover:bg-[var(--primary-orange)]/90 transition-all items-center gap-2">
          Request a Quote
        </Link>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] bg-[#f4f7f9] rounded-[2rem] p-8 shadow-xl border border-white/50 overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-8">
              <div>
                <div className="bg-[#e6f4f9] rounded-2xl p-4 flex items-center justify-between mb-6">
                  <span className="font-semibold text-[#1a1a1a]">Our Engineering Services</span>
                  <ArrowRight size={18} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                  {dropdownData.Services.main.map((s: any, i: number) => (
                    <Link key={i} to={s.link} className="flex gap-4 group cursor-pointer">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {s.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-[15px] text-[#1a1a1a]">{s.title}</h4>
                        <p className="text-[12px] text-gray-400 leading-tight">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MenuOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-[60] bg-white p-6 flex flex-col md:flex-row overflow-y-auto"
        >
          <Link to="/" onClick={onClose} className="absolute top-6 left-6 flex items-center gap-2">
            <img 
              src={getCloudinaryUrl('logo-main.png')} 
              alt="EES Ltd Icon" 
              className="h-8 w-auto object-contain" 
              referrerPolicy="no-referrer"
            />
            <span className="font-semibold text-lg tracking-tighter text-[var(--primary-blue)] uppercase">ECO-ENGINEERING SOLUTIONS LTD</span>
          </Link>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex-1 flex flex-col justify-center items-center md:items-start md:pl-20">
            {/* Removed image as requested */}
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-20 md:pt-0">
            <div>
              <h3 className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6">Menu</h3>
              <ul className="space-y-3 md:space-y-4 text-xl md:text-2xl font-medium">
                <li><Link to="/" onClick={onClose} className="hover:text-gray-500 transition-colors">Home</Link></li>
                <li><Link to="/about" onClick={onClose} className="hover:text-gray-500 transition-colors">About</Link></li>
                <li><Link to="/services" onClick={onClose} className="hover:text-gray-500 transition-colors">Services</Link></li>
                <li><Link to="/projects" onClick={onClose} className="hover:text-gray-500 transition-colors">Projects</Link></li>
                <li><Link to="/contacts" onClick={onClose} className="hover:text-gray-500 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6">Services</h3>
              <ul className="space-y-3 md:space-y-4 text-sm">
                <li><Link to="/services" onClick={onClose} className="hover:text-gray-500 transition-colors">Telecom Services</Link></li>
                <li><Link to="/services" onClick={onClose} className="hover:text-gray-500 transition-colors">ICT Solutions</Link></li>
                <li><Link to="/services" onClick={onClose} className="hover:text-gray-500 transition-colors">Power & Electrical Services</Link></li>
                <li><Link to="/services" onClick={onClose} className="hover:text-gray-500 transition-colors">Environmental Solutions</Link></li>
                <li><Link to="/services" onClick={onClose} className="hover:text-gray-500 transition-colors">Biomedical Equipment Services</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-6">Industries</h3>
              <ul className="space-y-4 text-sm">
                <li><Link to="/projects" onClick={onClose} className="hover:text-gray-500 transition-colors">Telecommunications</Link></li>
                <li><Link to="/projects" onClick={onClose} className="hover:text-gray-500 transition-colors">Energy & Power</Link></li>
                <li><Link to="/projects" onClick={onClose} className="hover:text-gray-500 transition-colors">Healthcare & Biomedical</Link></li>
                <li><Link to="/projects" onClick={onClose} className="hover:text-gray-500 transition-colors">Information Technology</Link></li>
                <li><Link to="/projects" onClick={onClose} className="hover:text-gray-500 transition-colors">Environmental & Sustainability</Link></li>
                <li><Link to="/projects" onClick={onClose} className="hover:text-gray-500 transition-colors">Government Infrastructure</Link></li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MainFooter = () => {
  return (
    <footer className="bg-[var(--primary-blue)] pt-24 pb-10 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div>
            <h4 className="font-medium text-sm mb-8 text-white">Company:</h4>
            <ul className="space-y-3 text-[13px] font-normal text-white/60">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Why Choose Us</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">Request a Quote</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-8 text-white">Services:</h4>
            <ul className="space-y-3 text-[13px] font-normal text-white/60">
              <li>Telecom Services</li>
              <li>ICT Solutions</li>
              <li>Power & Electrical Services</li>
              <li>Environmental Solutions</li>
              <li>Biomedical Equipment Services</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-8 text-white">Contact:</h4>
            <ul className="space-y-3 text-[13px] font-normal text-white/60">
              <li>+255746336541</li>
              <li>+255622702707</li>
              <li>info@eesltd.co.tz</li>
              <li>www.eesltd.co.tz</li>
              <li className="mt-4">Mbezi Beach B, AFRIKANA,<br />Dar es Salaam, Tanzania</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-8 text-white">Follow us on:</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Linkedin, url: "#" },
                { Icon: Instagram, url: "#" },
                { Icon: Twitter, url: "#" },
                { Icon: MessageCircle, url: "https://wa.me/255746336541" }
              ].map(({ Icon, url }, i) => (
                <a 
                  key={i} 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[var(--primary-blue)] transition-all cursor-pointer"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img 
              src={getCloudinaryUrl('logo-footer.png')} 
              alt="EES Ltd Icon" 
              className="h-8 w-auto object-contain brightness-0 invert" 
            />
            <span className="font-bold text-lg tracking-tighter text-white uppercase">ECO-ENGINEERING SOLUTIONS LTD</span>
          </div>
          <div className="flex items-center gap-8 text-[11px] text-white/40">
            <span>© 2025 Eco-Engineering Solutions Ltd. All rights reserved.</span>
            <Link to="/contacts" className="hover:text-white transition-colors flex items-center gap-2">
              <div className="w-1 h-1 bg-white rounded-full"></div> Privacy Policy
            </Link>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 bg-white text-[var(--primary-blue)] rounded-full flex items-center justify-center hover:bg-white/90 transition-all"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

// --- Shared Components ---

const HeroBackground = ({ src, alt }: { src: string, alt: string }) => {
  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[var(--primary-blue)]/90"></div>
    </>
  );
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  
  const projectData: Record<string, any> = {
        "01": { title: "Fibre Works", desc: "On-site fibre cable inspection and pulling operations, carefully handling and routing fibre reels to ensure signal integrity during installation.", client: "[Client Name]", date: "2024", cat: "Telecom Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Kanisani Road, Dar es Salaam", images: [getCloudinaryUrl('v1777413775/fu11.png'), getCloudinaryUrl('fu2.png')] },
    "02": { title: "Solar Energy Storage Installation", desc: "Installation of Freedom Won Lite LiFePO4 battery banks paired with Victron inverters and charge controllers, delivering a complete off-grid solar energy storage solution.", client: "[Client Name]", date: "2024", cat: "Power & Electrical Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Dar es Salaam", images: [getCloudinaryUrl('v1777413780/fu13.webp'), getCloudinaryUrl('v1777413780/fu13.webp')] },
    "03": { title: "Overhead Pole Cable Intallation", desc: "Skilled technician climbing a utility pole to perform overhead cable installation, extending network connectivity to new areas of the city.", client: "[Client Name]", date: "2024", cat: "Telecom Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Dar es Salaam", images: [getCloudinaryUrl('v1777413784/fu1.png'), getCloudinaryUrl('fu3.png')] },
    "04": { title: "CT-Scan Repair", desc: "Diagnosis and full repair of a CT-Scan unit, restoring critical imaging capability at a regional hospital.", client: "Regional Hospital", date: "2024", cat: "Biomedical Equipment Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Dodoma", images: [getCloudinaryUrl('v1777413783/fu12.jpg'), getCloudinaryUrl('lab5.jpg')] },
    "05": { title: "Telecom Tower Deployment", desc: "Installation and commissioning of telecom towers to extend mobile and data network coverage across Tanzania.", client: "[Client Name]", date: "2024", cat: "Telecom Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Tanzania", images: [getCloudinaryUrl('v1777413784/fu15.jpg'), getCloudinaryUrl('v1777413784/fu15.jpg')] },
    "06": { title: "Telecom Equipment Room Setup", desc: "Full rack installation and structured cabling of a telecom equipment room, integrating switches, routers, and patch panels for reliable network operation.", client: "[Client Name]", date: "2024", cat: "ICT Solutions", assoc: "Eco-Engineering Solutions Ltd", loc: "Tanzania", images: [getCloudinaryUrl('v1777413783/fu14.webp'), getCloudinaryUrl('v1777413783/fu14.webp')] },
    "07": { title: "Power Supply Unit Repair", desc: "Component-level diagnosis and repair of a power supply board, replacing faulty inductors and capacitors to restore full functionality.", client: "[Client Name]", date: "2024", cat: "Power & Electrical Services", assoc: "Eco-Engineering Solutions Ltd", loc: "Dar es Salaam", images: [getCloudinaryUrl('v1777413689/BACKUP1.jpg'), getCloudinaryUrl('v1777413689/BACKUP1.jpg')] },
    "08": { title: "E-waste Management", desc: "Responsible collection and processing of end-of-life electronic components and circuit boards, reducing environmental hazards through proper e-waste disposal and recycling.", client: "[Client Name]", date: "2024", cat: "Environmental Solutions", assoc: "Eco-Engineering Solutions Ltd", loc: "Tanzania", images: [getCloudinaryUrl('v1777413690/e1.jpg'), getCloudinaryUrl('v1777413690/e1.jpg')] }
  };
  
  const project = projectData[id as string] || projectData["01"];

  return (
    <div className="pb-16 bg-white text-[var(--primary-blue)]">
      {/* Project Hero */}
      <section className="px-6 md:px-12 mb-20 bg-[var(--primary-blue)] text-white pt-32 pb-20" data-aos="fade-up">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-medium leading-tight mb-8">{project.title}</h1>
          <p className="text-white/70 mb-4">{project.loc}</p>
          <div className="flex gap-4">
            <span className="px-4 py-2 border rounded-full text-sm">{project.cat}</span>
          </div>
        </div>
      </section>

      {/* Project Information & Image Section */}
      <section className="px-6 md:px-12 mb-24" data-aos="fade-up" data-aos-delay="200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-8">Project Information</h2>
            <p className="text-gray-600 mb-12 leading-relaxed">
              {project.desc}
            </p>

            <div className="space-y-6">
              {[
                { label: "Client", value: project.client },
                { label: "Date", value: project.date },
                { label: "Categories", value: project.cat },
                { label: "Associate", value: project.assoc }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100" data-aos="fade-up" data-aos-delay={300 + (i * 100)}>
                  <div>
                    <div className="font-bold">{item.label}</div>
                    <div className="text-gray-600">{item.value}</div>
                  </div>
                  <div className="text-[var(--primary-orange)]"><div className="w-6 h-6 bg-[var(--primary-orange)] rounded flex items-center justify-center text-white font-bold">✓</div></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative" data-aos="fade-left" data-aos-delay="400">
            <div className="grid grid-cols-1 gap-6">
                <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden"><img src={project.images[0]} className="w-full h-full object-cover" loading="lazy" /></div>
                <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden"><img src={project.images[1]} className="w-full h-full object-cover" loading="lazy" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Client voices & Gallery placeholder for consistency */}
      {/* (Other sections remain unchanged for now) */}
    </div>
  );
};


// --- Home Page Components ---

const HomeHero = () => {
  return (
    <section className="pt-32 md:pt-52 pb-16 md:pb-24 px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('t1')} alt="Home background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-8 md:mb-12">
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-[84px] font-medium tracking-tight mb-6 leading-[1.1] text-white"
        >
          Your Trusted Engineering Partner
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-10 font-normal"
        >
          ECO-ENGINEERING SOLUTIONS LTD delivers comprehensive Telecom, Power, ICT and Environmental engineering solutions across Tanzania.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 mx-auto w-fit">
            Request a Quote
          </Link>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="w-10 h-10 rounded-full bg-white text-[var(--primary-blue)] flex items-center justify-center">
            <ArrowDown size={16} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Ticker = () => {
  return (
    <div className="ticker-wrap w-full overflow-hidden bg-[var(--primary-blue)] py-6 border-y border-white/10" data-aos="fade-up">
      <div className="ticker flex whitespace-nowrap animate-[ticker_40s_linear_infinite]">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="flex">
            <div className="px-12 text-lg font-medium uppercase tracking-wider text-white">/ TELECOM SERVICES / ICT SOLUTIONS / POWER & ELECTRICAL / ENVIRONMENTAL SOLUTIONS / BIOMEDICAL EQUIPMENT / BUILT FOR THE FUTURE / DAR ES SALAAM, TANZANIA /</div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <section className="who-we-are-section" data-aos="fade-up">
      <div className="max-w-7xl mx-auto who-we-are-card" data-aos="fade-up" data-aos-delay="100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="who-we-are-label">
              <div className="w-1.5 h-1.5 bg-[var(--primary-orange)] rounded-full"></div>
              <span className="text-white/80">Who we are</span>
            </div>
            <div className="relative rounded-[1.5rem] overflow-hidden aspect-video bg-gray-800 group cursor-pointer">
              {/* Ambient Blur Background for vertical videos */}
              <video 
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110" 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="metadata"
              >
                <source src={getCloudinaryUrl('0411.mp4', true)} type="video/mp4" />
              </video>
              {/* Main Video */}
              <video 
                className="relative z-10 w-full h-full object-contain" 
                autoPlay 
                loop 
                muted 
                playsInline
                preload="metadata"
              >
                <source src={getCloudinaryUrl('0411.mp4', true)} type="video/mp4" />
              </video>
              <div className="absolute inset-0 z-20 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute bottom-4 left-6 z-20 text-white text-sm font-medium">
                Eco-Engineering Solutions Ltd
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mb-6 md:mb-8 text-white max-w-xl">We are Tanzania's trusted engineering partner</h2>
            <p className="text-white/70 text-[15px] leading-relaxed mb-6 font-normal">
              ECO-ENGINEERING SOLUTIONS LTD is a dynamic firm specializing in providing comprehensive Environmental, Electrical, Telecom and Information Communication Technology (ICT) solutions.
            </p>
            <p className="text-white/70 text-[15px] leading-relaxed mb-10 font-normal">
              We have rapidly grown into a trusted partner for a diverse range of clients, offering innovative services tailored to meet their specific needs.
            </p>
            <Link to="/about" className="bg-[var(--primary-orange)] text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 w-fit">
              About Us <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
      <style>{`
        .who-we-are-section {
          background: #ffffff;
          padding: 64px 16px;
        }
        @media (min-width: 768px) {
          .who-we-are-section {
            padding: 96px 24px;
          }
        }
        .who-we-are-card {
          background: var(--primary-blue);
          border-radius: 1.5rem;
          padding: 32px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        @media (min-width: 768px) {
          .who-we-are-card {
            border-radius: 2.5rem;
            padding: 64px;
          }
        }
        .who-we-are-label {
          font-size: 13px;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .who-we-are-heading {
          font-size: 28px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 32px;
        }
      `}</style>
    </section>
  );
};

const FeaturedWorks = () => {
  const projects = [
    {
      id: "01",
      title: "Fiber Works",
      location: "Tanzania",
      desc: "On-site fibre cable inspection and pulling operations, carefully handling and routing fibre reels to ensure signal integrity during installation.",
      tags: ["Telecom", "Fiber Optic"],
      image: getCloudinaryUrl('fu11.png'),
      reverse: false
    },
    {
      id: "02",
      title: "Solar Energy Storage Installation",
      location: "Tanzania",
      desc: "Installation of Freedom Won Lite LiFePO4 battery banks paired with Victron inverters and charge controllers, delivering a complete off-grid solar energy storage solution.",
      tags: ["Power", "Renewable"],
      image: getCloudinaryUrl('fu13.webp'),
      reverse: true
    },
    {
      id: "03",
      title: "Overhead Pole Cable Installation",
      location: "Tanzania",
      desc: "Skilled technician climbing a utility pole to perform overhead cable installation, extending network connectivity to new areas of the city.",
      tags: ["Telecom", "Infra"],
      image: getCloudinaryUrl('fu1.png'),
      reverse: false
    },
    {
      id: "04",
      title: "CT-Scan Repair & Maintenance",
      location: "Tanzania",
      desc: "Diagnosis and full repair of a CT-Scan unit, restoring critical imaging capability at a regional hospital.",
      tags: ["Biomedical", "Repair"],
      image: getCloudinaryUrl('fu12.jpg'),
      reverse: true
    }
  ];

  return (
    <section className="featured-section" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="featured-header" data-aos="fade-up">
          <div className="featured-label">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <span>Featured Works</span>
          </div>
          <h2 className="text-[20px] md:text-3xl lg:text-[36px] font-medium leading-[1.2] text-white">
            We engineer solutions but most importantly we solve problems.
          </h2>
        </div>

        <div className="featured-card">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className={`project-row ${project.reverse ? 'reverse' : ''}`}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="project-text-content">
                <div className="project-category">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                  <span>{project.location}</span>
                </div>
                <h3 className="project-title">
                  {project.title}
                </h3>
                <p className="project-desc">
                  {project.desc}
                </p>
                <div className="project-footer-row">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                  <div className="project-number">{project.id}</div>
                </div>
              </div>
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
            </div>
          ))}
          <div className="all-projects-wrap">
            <Link to="/projects" className="all-projects-btn">All Projects</Link>
          </div>
        </div>
      </div>
      <style>{`
        .featured-section {
          background: var(--primary-blue);
          padding: 48px 16px;
        }
        @media (min-width: 768px) {
          .featured-section {
            padding: 80px 5%;
          }
        }
        .featured-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        @media (min-width: 768px) {
          .featured-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
        }
        .featured-label {
          font-size: 12px;
          color: var(--primary-orange);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        @media (min-width: 768px) {
          .featured-label {
            font-size: 13px;
          }
        }
        .featured-heading {
          font-size: 24px;
          font-weight: 700;
          max-width: 600px;
          line-height: 1.2;
          color: #ffffff;
        }
        @media (min-width: 768px) {
          .featured-heading {
            font-size: 36px;
          }
        }
        .featured-card {
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.06);
          padding: 0 24px;
          padding-bottom: 48px;
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .featured-card {
            padding: 0 48px;
            padding-bottom: 80px;
          }
        }
        .project-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: center;
          padding: 32px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        @media (min-width: 768px) {
          .project-row {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            padding: 48px 0;
          }
        }
        .project-row:last-child {
          border-bottom: none;
        }
        .project-row.reverse .project-image {
          order: 0;
        }
        @media (min-width: 768px) {
          .project-row.reverse .project-image {
            order: -1;
          }
        }
        .project-category {
          font-size: 12px;
          color: #555;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        @media (min-width: 768px) {
          .project-category {
            font-size: 13px;
            margin-bottom: 14px;
          }
        }
        .project-title {
          font-size: 24px;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 5px;
          margin-bottom: 16px;
          color: var(--primary-blue);
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .project-title {
            font-size: 32px;
            margin-bottom: 18px;
          }
        }
        .project-desc {
          font-size: 14px;
          line-height: 1.6;
          color: #555;
          margin-bottom: 24px;
        }
        @media (min-width: 768px) {
          .project-desc {
            font-size: 15px;
            line-height: 1.65;
            margin-bottom: 32px;
          }
        }
        .project-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .project-tag {
          border: 1px solid var(--primary-orange);
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 11px;
          color: var(--primary-orange);
          background: transparent;
        }
        @media (min-width: 768px) {
          .project-tag {
            padding: 6px 16px;
            font-size: 13px;
          }
        }
        .project-number {
          margin-left: auto;
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
        @media (min-width: 768px) {
          .project-number {
            font-size: 16px;
          }
        }
        .project-image {
          background: #f5f5f7;
          border-radius: 24px;
          padding: 20px;
          overflow: hidden;
          aspect-ratio: 16/10;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1), 0 10px 20px -5px rgba(0,0,0,0.05);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0);
        }
        @media (min-width: 768px) {
          .project-image {
            padding: 32px;
            border-radius: 32px;
          }
        }
        .project-row:hover .project-image {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.15), 0 18px 36px -18px rgba(0,0,0,0.1);
          background: #ffffff;
        }
        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-row:hover .project-image img {
          transform: scale(1.02);
        }
        .all-projects-wrap {
          text-align: center;
          margin-top: 32px;
        }
        .all-projects-btn {
          display: inline-block;
          background: var(--primary-orange);
          color: #fff;
          border-radius: 100px;
          padding: 14px 36px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

const HomeServices = () => {
  const services = [
    { id: "01", title: "Telecom Services" },
    { id: "02", title: "ICT Solutions" },
    { id: "03", title: "Power & Electrical" },
    { id: "04", title: "Environmental Solutions" },
    { id: "05", title: "Biomedical Equipment" },
  ];

  return (
    <section className="services-section" data-aos="fade-up">
      <div className="max-w-7xl mx-auto services-card" data-aos="fade-up" data-aos-delay="100">
        <div className="services-header" data-aos="fade-up">
          <div className="services-label">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <span>Our services</span>
          </div>
          <h2 className="text-[20px] md:text-3xl lg:text-[36px] font-medium leading-[1.2] text-[var(--primary-blue)]">We engineer solutions but most importantly we solve problems.</h2>
        </div>
        
        <div className="services-list">
          <div className="space-y-1">
            {services.map((s, i) => (
              <div 
                key={i} 
                className="flex items-center justify-between group py-6 border-b border-gray-100 cursor-pointer transition-all hover:bg-[#f4f7f9] hover:px-4 hover:rounded-2xl"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <div className="flex items-center gap-6">
                  <span className="font-medium text-sm text-[var(--primary-orange)]/50 group-hover:text-[var(--primary-orange)] transition-colors">{s.id}</span>
                  <h3 className="text-xl font-medium text-[var(--primary-blue)]">{s.title}</h3>
                </div>
                <ArrowRight size={20} className="text-[var(--primary-orange)]/50 group-hover:text-[var(--primary-orange)] transition-colors" />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="inline-block bg-[var(--primary-orange)] text-white px-7 py-2.5 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all">All Services</Link>
          </div>
        </div>
      </div>
      <style>{`
        .services-section {
          background: #ffffff;
          padding: 64px 16px;
        }
        @media (min-width: 768px) {
          .services-section {
            padding: 96px 24px;
          }
        }
        .services-card {
          background: #ffffff;
          border-radius: 1.5rem;
          padding: 32px;
        }
        @media (min-width: 768px) {
          .services-card {
            border-radius: 2.5rem;
            padding: 64px;
          }
        }
        .services-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        @media (min-width: 768px) {
          .services-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
            padding-bottom: 20px;
          }
        }
        .services-label {
          font-size: 12px;
          color: var(--primary-orange);
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @media (min-width: 768px) {
          .services-label {
            font-size: 13px;
          }
        }
        .services-heading {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.3;
          max-width: 520px;
          color: var(--primary-blue);
          margin: 0;
        }
        @media (min-width: 768px) {
          .services-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </section>
  );
};

const HowWeBuildSolutions = () => {
  const steps = [
    {
      title: "We listen and understand your challenge",
      desc: "Consultation shapes what comes next.",
      icon: <Package size={24} />,
      image: getCloudinaryUrl('li1.jpg'),
      linkText: "Next"
    },
    {
      title: "We engineer solutions built for you",
      desc: "Design accounts for your terrain and requirements.",
      icon: <Package size={24} />,
      image: getCloudinaryUrl('v1777413792/li2.jpg'),
      linkText: "Next"
    },
    {
      title: "We install with precision and care",
      desc: "Implementation happens on schedule and on budget.",
      icon: <Package size={24} />,
      image: getCloudinaryUrl('li3.jpg'),
      linkText: "Next"
    },
    {
      title: "We stand behind what we build",
      desc: "Support continues long after the work is done.",
      icon: <Package size={24} />,
      image: getCloudinaryUrl('li5.jpg'),
      linkText: "Done"
    }
  ];

  return (
    <section className="py-24 px-6 bg-[var(--primary-blue)] overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 bg-[var(--primary-orange)] rounded-full"></div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">Process</span>
          </div>
          <h2 className="text-[20px] sm:text-4xl md:text-[56px] font-medium tracking-tight mb-6 leading-tight text-white">How we build solutions</h2>
          <p className="text-white/70 text-lg font-normal">From first conversation to final handoff</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-900 group"
            >
              <img 
                src={step.image} 
                alt={step.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20">
                  {step.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-6">
                    {step.desc}
                  </p>
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    {step.linkText} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      text: "ECO-ENGINEERING SOLUTIONS LTD transformed our telecom infrastructure. Their team was proactive, detail-oriented, and genuinely invested in our network's stability. A top-tier engineering firm we'd happily recommend.",
      name: "Eng. Joseph M.",
      role: "Technical Director",
      image: "https://i.pravatar.cc/100?u=joseph"
    },
    {
      text: "They delivered a robust power solution for our factory that exceeded expectations. They communicated clearly, stayed flexible, and delivered on time. Our operations are now more efficient than ever.",
      name: "Tayler S.",
      role: "Operations Manager",
      image: "https://i.pravatar.cc/100?u=tayler"
    },
    {
      text: "An incredibly talented engineering team, thoughtful, collaborative, and laser-focused on creating excellent technical solutions.",
      name: "Rei C.",
      role: "Project Lead",
      image: "https://i.pravatar.cc/100?u=rei"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-[var(--primary-blue)]/5" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8 md:mb-12" data-aos="fade-up">
          <div className="w-1.5 h-1.5 bg-[var(--primary-orange)] rounded-full"></div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--primary-blue)]/60">Testimonials</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm" data-aos="fade-up" data-aos-delay={i * 100}>
              <p className="text-[var(--primary-blue)]/70 text-sm md:text-[15px] leading-relaxed mb-6 md:mb-8 font-normal">
                {t.text}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary-blue)]/10 overflow-hidden"><img src={t.image} className="w-full h-full object-cover" /></div>
                  <div>
                    <h4 className="font-medium text-sm text-[var(--primary-blue)]">{t.name}</h4>
                    <p className="text-[11px] text-[var(--primary-blue)]/50">{t.role}</p>
                  </div>
                </div>
                <Linkedin size={16} className="text-[var(--primary-blue)]/20" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="flex-1 h-1 bg-[var(--primary-blue)]/10 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-[var(--primary-blue)]"></div>
          </div>
          <div className="flex gap-3 md:gap-4">
            <button className="w-10 h-10 rounded-full border border-[var(--primary-blue)]/10 flex items-center justify-center hover:bg-[var(--primary-blue)] hover:text-white transition-all text-[var(--primary-blue)]"><ChevronLeft size={16} /></button>
            <button className="w-10 h-10 rounded-full border border-[var(--primary-blue)]/10 flex items-center justify-center hover:bg-[var(--primary-blue)] hover:text-white transition-all text-[var(--primary-blue)]"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};


const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (!form.current) return;
    setStatus('sending');

    emailjs
      .sendForm(
        (import.meta as any).env.VITE_EMAILJS_SERVICE_ID,
        (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus('success');
          form.current?.reset();
        },
        (error) => {
          console.error(error);
          setStatus('error');
        }
      );
  };

  return (
    <section className="py-16 md:py-24 px-6 bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto bg-[var(--primary-blue)] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-16 text-white" data-aos="fade-up" data-aos-delay="100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* ... (left side remains unchanged) ... */}
          
          <div>
            <div className="mb-8 md:mb-10">
              <h3 className="text-xl md:text-2xl font-medium mb-2 text-white">Ready to take next step with us?</h3>
            </div>
            <form ref={form} onSubmit={sendEmail} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div><label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Name</label><input type="text" name="user_name" placeholder="Evan" className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-white transition-all bg-transparent text-white placeholder:text-white/20" required /></div>
                <div><label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Company</label><input type="text" name="user_company" placeholder="Microsoft" className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-white transition-all bg-transparent text-white placeholder:text-white/20" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div><label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Your Email</label><input type="email" name="user_email" placeholder="evan@microsoft.com" className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-white transition-all bg-transparent text-white placeholder:text-white/20" required /></div>
                <div><label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Your Phone</label><input type="text" name="user_phone" placeholder="Your number phone" className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-white transition-all bg-transparent text-white placeholder:text-white/20" /></div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 md:mb-5 block">What services are you interested in?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {["Telecom Services", "ICT Solutions", "Power & Electrical", "Environmental Solutions", "Biomedical Equipment"].map((tag, i) => (
                    <label key={i} className="cursor-pointer">
                      <input type="checkbox" name="services" value={tag} className="sr-only peer" />
                      <span className="block text-center px-4 md:px-5 py-2 rounded-full border border-white/20 text-[10px] md:text-[11px] font-medium transition-all peer-checked:bg-[var(--primary-orange)] peer-checked:text-white hover:bg-[var(--primary-orange)] hover:text-white bg-transparent text-white">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 md:mb-5 block">Project Timeline</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                  {["1-3 Months", "3-6 Months", "6-12 Months", "12+ Months"].map((time, i) => (
                      <label key={i} className="flex-1 cursor-pointer">
                        <input type="radio" name="timeline" value={time} className="sr-only peer" />
                        <div className="text-center py-2 px-1 rounded-full border border-white/20 text-[10px] md:text-[11px] font-medium transition-all peer-checked:bg-[var(--primary-orange)] peer-checked:text-white hover:bg-[var(--primary-orange)] hover:text-white bg-transparent text-white">{time}</div>
                      </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3 block">Tell us about your project.</label>
                <textarea name="message" placeholder="Write something concise..." rows={4} className="w-full border-b border-white/20 py-3 text-sm outline-none focus:border-white transition-all bg-transparent text-white placeholder:text-white/20" required></textarea>
              </div>

              <button type="submit" disabled={status === 'sending'} className="bg-[var(--primary-orange)] text-white w-full py-3 rounded-full font-medium text-base hover:bg-[var(--primary-orange)]/90 transition-all disabled:opacity-50">
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Submit Request'}
              </button>
              {status === 'error' && <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Services Page Components ---

const ServicesHero = () => {
  return (
    <section className="pt-40 md:pt-60 pb-24 md:pb-40 px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('ugu.webp')} alt="Services background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8 md:mb-12"
        >
          <div className="w-1.5 h-1.5 bg-[var(--primary-orange)] rounded-full"></div>
          <span className="text-[12px] md:text-[13px] font-medium text-white uppercase tracking-widest">Services</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-[100px] font-medium tracking-tight mb-8 md:mb-12 leading-[1.1] md:leading-[0.95] text-white"
        >
          Explore Our Services
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-white/70 text-base md:text-xl max-w-xl mx-auto mb-12 md:mb-16 font-normal"
        >
          Five engineering domains. One trusted partner.
        </motion.p>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <div className="w-12 h-12 bg-[var(--primary-orange)] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
            <ArrowDown size={20} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CoreOfferings = () => {
  const offerings = [
    { 
      id: "01", 
      title: "Telecom Services", 
      desc: "Installation and maintenance of microwave, fiber optic and GSM/WCDMA networks." 
    },
    { 
      id: "02", 
      title: "ICT Solutions", 
      desc: "CCTV, access control, structured cabling and enterprise wireless." 
    },
    { 
      id: "03", 
      title: "Power & Electrical", 
      desc: "Generators, solar systems, LV/MV lines and electrical design." 
    },
    { 
      id: "04", 
      title: "Environmental Solutions", 
      desc: "E-waste collection, electronic recycling and battery disposal programs." 
    },
    { 
      id: "05", 
      title: "Biomedical Equipment", 
      desc: "Medical equipment installation, maintenance and repair for healthcare facilities." 
    },
    { 
      id: "06", 
      title: "Software Development", 
      desc: "Custom web, mobile, and enterprise software built to automate and scale your business operations." 
    },
    { 
      id: "07", 
      title: "Electronics", 
      desc: "Circuit design, embedded systems, and electronic component integration, plus repair services and responsible e-waste management for industrial and commercial use." 
    },
  ];

  return (
    <section className="py-16 md:py-24 px-6 bg-[#f4f5f9] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-sm" data-aos="fade-up" data-aos-delay="100">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16">
          <div className="text-[12px] md:text-[13px] text-[#333] font-normal uppercase tracking-widest mb-4 md:mb-0">
            • Our Services
          </div>
          <h2 className="text-[20px] md:text-[28px] font-bold leading-[1.3] max-w-[520px] text-black">Our Core Engineering Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {offerings.map((item, i) => (
            <div key={item.id} className="card-container h-[220px] md:h-[240px]" data-aos="fade-up" data-aos-delay={i * 50}>
              <div className="card h-full w-full">
                {/* Front Side */}
                <div className="front bg-[var(--primary-blue)]/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-sm">
                  <span className="text-xs md:text-sm font-medium text-[var(--primary-blue)]/40">{item.id}</span>
                  <h3 className="text-lg md:text-xl font-bold text-[var(--primary-blue)]">{item.title}</h3>
                </div>
                {/* Back Side */}
                <div className="back bg-[var(--primary-blue)] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-between text-white shadow-xl">
                  <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                  <div className="flex flex-col items-start gap-3 md:gap-4">
                    <p className="text-[11px] md:text-[12px] text-white/70 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .card-container {
          perspective: 1000px;
        }
        .card {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          height: 100%;
        }
        .card-container:hover .card {
          transform: rotateY(180deg);
        }
        .front, .back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          width: 100%;
          height: 100%;
        }
        .back {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

const LogoTicker = () => {
  const images = [getCloudinaryUrl('1.png'), getCloudinaryUrl('2.png'), getCloudinaryUrl('3.png'), getCloudinaryUrl('4.png'), getCloudinaryUrl('5.png'), getCloudinaryUrl('6.png'), getCloudinaryUrl('7.png'), getCloudinaryUrl('8.png')];

  return (
    <section className="py-20 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-xl md:text-2xl font-medium text-[var(--primary-blue)] text-center">Trusted By Our Partners & Clients</h2>
      </div>
      <div className="flex overflow-hidden">
        <motion.div 
          className="flex gap-16 min-w-full"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...images, ...images].map((img, i) => (
            <div key={i} className="flex-none flex items-center justify-center">
              <img src={img} alt="Partner Logo" className="h-12 md:h-16 w-auto opacity-70 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedProjectsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const projects = [
    {
      id: "01",
      title: "Fiber Works",
      year: "2024",
      tags: ["Telecom", "Infra"],
      image: getCloudinaryUrl('fu11.png')
    },
    {
      id: "02",
      title: "Solar Energy Storage Installation",
      year: "2024",
      tags: ["Power", "Renewable"],
      image: getCloudinaryUrl('fu13.webp')
    },
    {
      id: "03",
      title: "Overhead Pole Cable Installation",
      year: "2024",
      tags: ["Telecom", "Splicing"],
      image: getCloudinaryUrl('fu1.png')
    },
    {
      id: "04",
      title: "CT-Scan Repair & Maintenance",
      year: "2023",
      tags: ["Biomedical", "Repair"],
      image: getCloudinaryUrl('fu12.jpg')
    },
    {
      id: "05",
      title: "Telecom Tower Deployment",
      year: "2024",
      tags: ["Telecom", "Infrastructure"],
      image: getCloudinaryUrl('fu15.jpg')
    },
    {
      id: "06",
      title: "Telecom Equipment Room Setup",
      year: "2024",
      tags: ["Telecom", "ICT"],
      image: getCloudinaryUrl('fu14.webp')
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 px-6 bg-[var(--primary-blue)] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16" data-aos="fade-up">
          <div className="text-[12px] md:text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest mb-4 md:mb-0">
            • Our Works
          </div>
          <h2 className="text-[20px] md:text-[54px] font-medium leading-[1.1] max-w-2xl md:text-right text-white">Check Our Featured Projects</h2>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory"
        >
          {projects.map((project, i) => (
            <div key={i} className="min-w-[85vw] md:min-w-[800px] snap-start" data-aos="fade-up" data-aos-delay={i * 100}>
            <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[16/10] bg-[#f5f5f5] p-6 md:p-12 mb-6 md:mb-8 group cursor-pointer shadow-xl border border-gray-200/50">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-2xl md:rounded-[2rem] group-hover:scale-105 transition-transform duration-700 shadow-2xl" loading="lazy" />
              </div>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 px-2">
                <h3 className="text-2xl md:text-[36px] font-medium text-white">
                  {project.title} <span className="text-[var(--primary-blue)]/30">- {project.year}</span>
                </h3>
                <div className="flex flex-wrap gap-2 md:justify-end max-w-full md:max-w-[320px]">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg border border-[var(--primary-blue)]/10 bg-white text-[11px] md:text-[13px] font-medium text-[var(--primary-blue)]/70 shadow-sm">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Scrollbar and Navigation */}
        <div className="flex items-center justify-between gap-12 mt-16">
          <div className="flex-1 h-[4px] bg-[var(--primary-blue)]/20 relative rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[var(--primary-orange)] transition-all duration-300 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="w-16 h-16 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center hover:bg-[var(--primary-orange)] hover:text-white transition-all text-white">
              <ArrowLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="w-16 h-16 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center hover:bg-[var(--primary-orange)] hover:text-white transition-all text-white">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-24">
          <Link to="/projects" className="bg-[var(--primary-orange)] text-white px-12 py-4 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all shadow-lg">
            All projects
          </Link>
        </div>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  const items = [
    "✔ Quality Workmanship",
    "✔ End-to-End Project Delivery",
    "✔ Certified Engineers",
    "✔ On-Time Completion"
  ];

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-white overflow-hidden border-t border-[var(--primary-blue)]/10" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="ticker-wrap w-full overflow-hidden">
          <div className="ticker flex whitespace-nowrap animate-[ticker_30s_linear_infinite]">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center">
                {items.map((item, j) => (
                  <div key={j} className="px-8 md:px-12 text-lg md:text-xl font-medium text-[var(--primary-blue)]/60 flex items-center gap-2">
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExpertiseSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)]/5 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-sm relative" data-aos="fade-up" data-aos-delay="100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--primary-orange)] font-medium uppercase tracking-widest mb-8 md:mb-12">
              <span className="text-[var(--primary-orange)]">•</span> Experise
            </div>
            <h2 className="text-[20px] sm:text-4xl md:text-[52px] font-medium leading-[1.1] mb-8 md:mb-10 text-[var(--primary-blue)] max-w-xl">We solve real engineering problems</h2>
            <p className="text-[var(--primary-blue)]/60 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-lg font-normal">
              From fiber optic networks to biomedical equipment — we deliver complete engineering solutions across Tanzania.
            </p>
            <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 w-fit">
              Contact Us
            </Link>
          </div>
          <div className="relative">
            <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-video bg-[var(--primary-blue)]/5 shadow-2xl">
              <img src={getCloudinaryUrl('f14.png')} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-[280px] text-center">
                  <h4 className="text-lg font-medium mb-2 text-[var(--primary-blue)]">Project Excellence</h4>
                  <div className="w-full h-1 bg-[var(--primary-blue)]/10 rounded-full overflow-hidden mt-4">
                    <div className="w-full h-full bg-[var(--primary-orange)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { id: "01", value: "5", label: "Engineering Service Domains" },
    { id: "02", value: "24/7", label: "Technical Support Available" },
    { id: "03", value: "100%", label: "Commitment To Quality" },
    { id: "04", value: "3+", label: "Service Locations Tanzania" },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20" data-aos="fade-up">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--primary-orange)] font-medium uppercase tracking-widest mb-8 md:mb-12">
              <span className="text-[var(--primary-orange)]">•</span> What makes us different?
            </div>
            <h2 className="text-[20px] sm:text-4xl md:text-[64px] font-medium leading-[1] mb-8 md:mb-10 text-white">EES Ltd At A Glance</h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-md font-normal">
              Engineering is more than just technical specs—it's about delivering reliable solutions that power progress.
            </p>
            <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 w-fit">
              Contact Us
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[2rem] p-8 md:p-10 flex flex-col justify-between h-auto min-h-[220px] md:h-[240px] shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-medium text-[var(--primary-orange)] self-end">{stat.id}</span>
                <div>
                  <div className="text-4xl md:text-[48px] font-medium leading-none mb-4 tracking-tight text-[var(--primary-blue)]">{stat.value}</div>
                  <div className="text-[var(--primary-blue)]/60 font-medium text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What services does EES Ltd provide?", a: "We provide Telecom Services, ICT Solutions, Power & Electrical Services, Environmental Solutions and Biomedical Equipment Services." },
    { q: "Where is EES Ltd located?", a: "We are located at Mbezi Beach B, AFRIKANA, Dar es Salaam, Tanzania." },
    { q: "How do I request a quote?", a: "Contact us via phone +255746336541, email info@eesltd.co.tz or through our Request a Quote page." },
    { q: "How quickly do you respond?", a: "We acknowledge all enquiries within 24-48 business hours." },
    { q: "What telecom systems do you install?", a: "We install microwave transmission links, fiber optic networks, GSM, WCDMA, CDMA and WIMAX systems." },
    { q: "Do you support Ericsson and Huawei?", a: "Yes — we handle RF drive tests and optimization for both Ericsson and Huawei network equipment." },
    { q: "What generator sizes do you handle?", a: "We handle generators of all capacities and integrate them with existing power systems." },
    { q: "Do you install solar energy systems?", a: "Yes — we supply and install solar systems, UPS, battery banks and hybrid backup solutions." },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)]/5 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[13px] text-[var(--primary-orange)] font-medium uppercase tracking-widest mb-8 md:mb-12">
          <span className="text-[var(--primary-orange)]">•</span> FAQ
        </div>
        <h2 className="text-[20px] sm:text-4xl md:text-[54px] font-medium leading-[1.1] mb-12 md:mb-20 text-[var(--primary-blue)]">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 lg:gap-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-[var(--primary-blue)]/10 py-8" data-aos="fade-up" data-aos-delay={i * 50}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left group"
              >
                <span className="text-[18px] font-medium group-hover:text-[var(--primary-blue)]/80 transition-colors text-[var(--primary-blue)]">{faq.q}</span>
                <div className="w-10 h-10 rounded-full border border-[var(--primary-blue)]/10 flex items-center justify-center group-hover:bg-[var(--primary-orange)] group-hover:text-white transition-all text-[var(--primary-blue)]">
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[var(--primary-blue)]/60 text-[15px] leading-relaxed mt-6 font-normal max-w-md">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)]/5 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-sm" data-aos="fade-up" data-aos-delay="100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--primary-orange)] font-medium uppercase tracking-widest mb-8 md:mb-12">
              <span className="text-[var(--primary-orange)]">•</span> Interested?
            </div>
            <h2 className="text-[20px] sm:text-4xl md:text-[64px] font-medium leading-[1] mb-8 md:mb-10 text-[var(--primary-blue)]">Let's build the future together!</h2>
          </div>
          <div>
            <p className="text-[var(--primary-blue)]/60 text-lg md:text-xl leading-relaxed mb-8 md:mb-12 font-normal">
              Contact us today and our engineers will assess your requirements and deliver the right solution for your project.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2">
                Request a Quote
              </Link>
              <Link to="/contacts" className="bg-white text-[var(--primary-blue)] border border-[var(--primary-blue)]/10 px-6 md:px-8 py-3 md:py-3.5 rounded-full font-medium text-sm hover:bg-[var(--primary-blue)]/5 transition-all flex items-center gap-2">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Projects Page Components ---

// --- About Page Components ---

const AboutHero = () => {
  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-24 px-4 md:px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('Ubuntu-Towers-jpg-webp.webp')} alt="About background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-[64px] font-medium leading-[1.1] mb-8 md:mb-12 text-white"
          >
            We are Tanzania's trusted engineering partner
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--primary-orange)] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
              <ArrowDown size={20} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhoWeAreAbout = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 gap-8 md:gap-12" data-aos="fade-up">
          <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest">
            • Who we are
          </div>
          <h2 className="text-lg sm:text-xl md:text-[22px] font-medium leading-relaxed max-w-3xl text-[var(--primary-blue)]">
            ECO-ENGINEERING SOLUTIONS LTD is a dynamic firm specializing in providing comprehensive Environmental, Electrical, Telecom and ICT solutions. We have rapidly grown into a trusted partner for a diverse range of clients.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* CEO & Founder Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[var(--primary-blue)]/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm group"
            data-aos="fade-up"
          >
            <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-[4/5] mb-6 md:mb-8 bg-gray-100">
              <img src={getCloudinaryUrl('Public/ceo.png')} alt="CEO & Founder" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm md:text-2xl font-medium text-[var(--primary-blue)] mb-1">Eng. Kalebo Nashon Mashinga</h3>
                <p className="text-[var(--primary-blue)]/50 text-sm">CEO & Founder</p>
              </div>
              <a href="#" className="hidden md:flex w-10 h-10 rounded-full bg-[var(--primary-blue)] items-center justify-center text-white hover:scale-110 transition-transform">
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* CEO Message Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[var(--primary-blue)]/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest mb-8">
              • CEO Message
            </div>
            <p className="text-xl md:text-[26px] font-medium leading-relaxed text-[var(--primary-blue)] italic">
              "ECO-ENGINEERING SOLUTIONS LTD is a dynamic firm specializing in providing comprehensive Environmental, Electrical, Telecom and ICT solutions. We have rapidly grown into a trusted partner for a diverse range of clients."
            </p>
            <div className="mt-12 pt-8 border-t border-[var(--primary-blue)]/10">
              <p className="text-[var(--primary-blue)] font-bold text-lg">CEO & Founder</p>
              <p className="text-[var(--primary-blue)]/50 text-sm">ECO-ENGINEERING SOLUTIONS LTD</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutStudio = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[var(--primary-blue)]/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center" data-aos="fade-up" data-aos-delay="100">
          <div>
            <h2 className="text-xl sm:text-4xl md:text-[42px] font-medium leading-[1.2] mb-8 md:mb-10 text-[var(--primary-blue)] max-w-xl" data-aos="fade-up" data-aos-delay="50">We are Tanzania's premier engineering solutions firm</h2>
            <p className="text-[var(--primary-blue)]/60 text-base md:text-lg leading-relaxed mb-8 md:mb-12 font-normal">
              ECO-ENGINEERING SOLUTIONS LTD is a dynamic firm specializing in providing comprehensive Environmental, Electrical, Telecom and ICT solutions. Our commitment to excellence, reliability, and technological expertise ensures cutting-edge solutions that empower businesses and communities alike.
            </p>
            <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 w-fit">
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-video bg-[var(--primary-blue)] relative group">
            <video 
              src={getCloudinaryUrl('0411.mp4', true)} 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const OurApproach = () => {
  const steps = [
    { id: "01", title: "Site Assessment & Survey", desc: "In-depth evaluation of the site, infrastructure needs and technical requirements." },
    { id: "02", title: "Engineering Design & Planning", desc: "Detailed engineering design, equipment specification and project planning." },
    { id: "03", title: "Installation & Integration", desc: "Professional installation and integration of all systems and equipment." },
    { id: "04", title: "Testing & Commissioning", desc: "Rigorous testing and commissioning to ensure full system performance." },
    { id: "05", title: "Maintenance & Support", desc: "Ongoing preventive and corrective maintenance to ensure reliability." }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 gap-8 md:gap-12" data-aos="fade-up">
          <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest">
            • Our Approach
          </div>
          <h2 className="text-xl sm:text-2xl md:text-[32px] font-medium leading-tight max-w-xl text-white">
            First step to solving a problem is understanding it completely.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-[2rem] p-8 flex flex-col justify-between h-auto min-h-[280px] md:h-[300px] shadow-sm"
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >
              <h3 className="text-lg font-bold text-[var(--primary-blue)] mb-4">{step.title}</h3>
              <div>
                <div className="w-full h-px bg-[var(--primary-blue)]/10 mb-6"></div>
                <div className="flex justify-between items-end">
                  <p className="text-[12px] text-[var(--primary-blue)]/60 leading-relaxed max-w-[140px]">{step.desc}</p>
                  <span className="text-sm font-medium text-[var(--primary-orange)]">{step.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OurExpertise = () => {
  const stats = [
    { value: "2023", label: "Year Founded", image: "/f11.jpeg" },
    { value: "15+", label: "Projects Delivered", image: "/lab2.jpeg" },
    { value: "30+", label: "Happy Clients", image: "/AC-1.jpeg" },
    { value: "3+", label: "Years Experience", image: "/f12.jpeg" }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest mb-12 md:mb-20" data-aos="fade-up">
          • Our Story
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col h-[400px] md:h-[500px] relative overflow-hidden group"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="relative z-10">
                <div className="text-4xl md:text-[48px] font-medium leading-none mb-4 tracking-tight text-[var(--primary-blue)]">{stat.value}</div>
                <div className="text-[var(--primary-blue)]/60 font-medium text-sm max-w-[200px]">{stat.label}</div>
              </div>
              <div className="absolute bottom-0 right-0 w-full h-2/3 overflow-hidden rounded-t-[2.5rem]">
                <img src={stat.image} alt={stat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OurMission = () => {
  const values = [
    { id: "01", title: "Expertise", desc: "Our team of skilled Artisans, Technicians and Engineers brings extensive experience in electrical engineering, Telecoms and ICT solutions." },
    { id: "02", title: "Quality Assurance", desc: "We adhere to industry standards and best practices, ensuring high-quality service delivery." },
    { id: "03", title: "Customer Satisfaction", desc: "Our commitment to customer satisfaction drives us to exceed expectations and build long-term relationships." },
    { id: "04", title: "Innovation", desc: "We stay updated with the latest technological advancements to provide cutting-edge solutions." }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-32 gap-8 md:gap-12" data-aos="fade-up">
          <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest">
            • Our Mission
          </div>
          <h2 className="text-[20px] sm:text-3xl md:text-4xl font-medium leading-tight max-w-2xl text-left md:text-right text-[var(--primary-blue)]">
            To deliver engineering solutions that enhance connectivity, efficiency and safety.
          </h2>
        </div>

        <div className="bg-[var(--primary-blue)]/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-[20px] sm:text-3xl md:text-[54px] font-medium leading-[1.1] mb-8 md:mb-10 text-[var(--primary-blue)]">Our values and commitments</h2>
            </div>
            <div className="space-y-12 md:space-y-16">
              {values.map((value, i) => (
                <div key={i} className="flex gap-8" data-aos="fade-up" data-aos-delay={i * 100}>
                  <span className="text-sm font-medium text-[var(--primary-orange)] mt-1">{value.id}</span>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--primary-blue)] mb-4">{value.title}</h3>
                    <p className="text-[var(--primary-blue)]/60 text-[15px] leading-relaxed font-normal">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CreativeTeamGrid = () => {
  const teamPhotos = [
    "/f1.png",
    "/f2.png",
    "/f3.png",
    "/f4.png",
    "/lab4.jpeg",
    "/lab5.jpg",
    "/lab6.jpg",
    "/lab7.jpg"
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)] overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center relative" data-aos="fade-up" data-aos-delay="100">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {teamPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="absolute w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                zIndex: 0
              }}
            >
              <img src={photo} alt="Team" className="w-full h-full object-cover grayscale" />
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10">
          <h2 className="text-[20px] sm:text-4xl md:text-[64px] font-medium leading-[1.1] mb-6 md:mb-8 text-[var(--primary-blue)]">Our Engineering Team</h2>
          <p className="text-[var(--primary-blue)]/60 text-base md:text-lg max-w-xl mx-auto mb-8 md:mb-12 font-normal">
            Skilled Artisans, Technicians and Engineers united by a commitment to excellence.
          </p>
          <Link to="/about" className="bg-[var(--primary-orange)] text-white px-10 py-4 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 mx-auto w-fit">
            Meet The Team <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const JoinOurTeam = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[var(--primary-blue)]/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center" data-aos="fade-up" data-aos-delay="100">
          <div>
            <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest mb-8 md:mb-12">
              • Careers
            </div>
            <h2 className="text-[20px] sm:text-4xl md:text-[64px] font-medium leading-[1.1] mb-6 md:mb-8 text-[var(--primary-blue)]">Join Our Team</h2>
            <p className="text-[var(--primary-blue)]/60 text-base md:text-lg leading-relaxed mb-8 md:mb-12 font-normal">
              We are always looking for skilled engineers and technicians to join our growing team in Dar es Salaam, Tanzania.
            </p>
            <Link to="/contacts" className="bg-[var(--primary-orange)] text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all flex items-center gap-2 w-fit">
              See Job Openings <ArrowRight size={18} />
            </Link>
          </div>
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden aspect-square bg-[var(--primary-blue)] relative group shadow-2xl">
            <img src={getCloudinaryUrl('f13.jpeg')} alt="Careers" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full h-full border border-white/20 rounded-[2rem] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[var(--primary-blue)] mx-auto mb-6 shadow-xl">
                    <Briefcase size={32} />
                  </div>
                  <span className="text-white font-medium tracking-widest uppercase text-xs">Join eloqwnt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsHero = () => {
  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-24 px-4 md:px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('proje.jpg')} alt="Projects background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-[54px] font-medium leading-[1.1] mb-8 md:mb-12 text-white max-w-4xl mx-auto"
          >
            Good engineering looks simple, <br className="hidden md:block" />but great engineering solves real problems.
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-white/70 text-sm font-normal">See the projects we delivered</p>
            <div className="w-12 h-12 rounded-full bg-[var(--primary-orange)] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
              <ArrowDown size={20} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const filters = ["All", "Telecom", "ICT", "Power", "Environmental", "Biomedical"];
  
  const projects = [
    { id: "01", title: "Fiber Works", location: "Tanzania", tags: ["Telecom"], image: getCloudinaryUrl('v1777413775/fu11.png'), category: "Telecom" },
    { id: "02", title: "Solar Energy Storage Installation", location: "Tanzania", tags: ["Power"], image: getCloudinaryUrl('v1777413780/fu13.webp'), category: "Power" },
    { id: "03", title: "Overhead Pole Cable Installation", location: "Tanzania", tags: ["Telecom"], image: getCloudinaryUrl('v1777413784/fu1.png'), category: "Telecom" },
    { id: "04", title: "CT-Scan Repair & Maintenance", location: "Tanzania", tags: ["Biomedical"], image: getCloudinaryUrl('v1777413783/fu12.jpg'), category: "Biomedical" },
    { id: "05", title: "Telecom Tower Deployment", location: "Tanzania", tags: ["Telecom"], image: getCloudinaryUrl('v1777413784/fu15.jpg'), category: "Telecom" },
    { id: "06", title: "Telecom Equipment Room Setup", location: "Tanzania", tags: ["Telecom"], image: getCloudinaryUrl('v1777413783/fu14.webp'), category: "Telecom" },
    { id: "07", title: "Power Supply Unit Repair", location: "Tanzania", tags: ["Power"], image: getCloudinaryUrl('v1777413689/BACKUP1.jpg'), category: "Power" },
    { id: "08", title: "E-waste Management", location: "Tanzania", tags: ["Environmental"], image: getCloudinaryUrl('v1777413690/e1.jpg'), category: "Environmental" }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.tags.includes(activeFilter) || p.category === activeFilter);
  
  const displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6 md:gap-8" data-aos="fade-up">
          <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest">
            • Our projects
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2.5 md:p-3 rounded-lg bg-[var(--primary-blue)] text-white">
              <Layout size={18} />
            </button>
            <button className="p-2.5 md:p-3 rounded-lg border border-[var(--primary-blue)]/10 text-[var(--primary-blue)]/40 hover:bg-[var(--primary-blue)]/5">
              <Menu size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 mb-12 md:mb-20">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); setShowAll(false); }}
              className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? "bg-[var(--primary-blue)] text-white" 
                  : "text-[var(--primary-blue)]/50 hover:text-[var(--primary-blue)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-20">
          {displayProjects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/projects/${project.id}`} className="block rounded-[2rem] overflow-hidden bg-[#f5f5f5] p-5 md:p-8 mb-6 cursor-pointer relative shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="rounded-2xl overflow-hidden aspect-[16/10] shadow-md">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Link to={`/projects/${project.id}`} className="text-xl font-medium text-[var(--primary-blue)] hover:text-[var(--primary-orange)] transition-colors">
                    {project.title}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[12px] font-medium text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length > 6 && !showAll && (
          <div className="flex justify-center mt-24">
            <button 
              onClick={() => setShowAll(true)}
              className="bg-[var(--primary-orange)] text-white px-12 py-4 rounded-full font-medium text-sm hover:bg-[var(--primary-orange)]/90 transition-all shadow-lg"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Pages ---

// --- Contacts Page Components ---

const ContactsHero = () => {
  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-24 px-4 md:px-6 text-center relative overflow-hidden" data-aos="fade-up">
      <HeroBackground src={getCloudinaryUrl('f18.png')} alt="Contacts background" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-[64px] font-medium leading-[1.1] mb-8 md:mb-12 text-white"
          >
            We communicate to right people
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-[var(--primary-orange)] text-sm font-normal uppercase tracking-widest">• Contact us</p>
            <div className="w-12 h-12 rounded-full bg-[var(--primary-orange)] flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
              <ArrowDown size={20} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ScheduleCall = () => {
  const [selectedDate, setSelectedDate] = useState(23);
  const [selectedTime, setSelectedTime] = useState("11:30am");

  const times = ["11:30am", "12:00pm", "12:30pm", "6:00am", "6:30am", "7:00am", "7:30am", "4:00pm"];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-[var(--primary-blue)]/5 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-[14px] text-[var(--primary-orange)] font-normal uppercase tracking-widest mb-12 md:mb-20" data-aos="fade-up">
          • Schedule a call
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[64px] font-medium leading-[1.1] mb-8 flex items-center flex-wrap gap-x-4 text-[var(--primary-blue)]">
              Want to <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--primary-blue)]/20 overflow-hidden"><img src={getCloudinaryUrl('ceo.png')} alt="Person" className="w-full h-full object-cover" /></span> discuss the project?
            </h2>
          </div>

          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-sm border border-[var(--primary-blue)]/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--primary-blue)] flex items-center justify-center text-white font-bold text-lg md:text-xl">E</div>
              <div>
                <h3 className="font-bold text-base md:text-lg text-[var(--primary-blue)]">Eco-engineering Solution Team</h3>
                <p className="text-[var(--primary-blue)]/50 text-xs md:text-sm">30 mins w/ EES Ltd</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-xs md:text-sm text-[var(--primary-blue)]/60 mb-8 pb-8 border-b border-[var(--primary-blue)]/10">
              <div className="flex items-center gap-2"><Clock size={16} /> 30 min appointments</div>
              <div className="flex items-center gap-2"><Video size={16} /> Google Meet video</div>
            </div>

            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
                <h4 className="font-bold text-sm md:text-base text-[var(--primary-blue)]">Select an appointment time</h4>
                <span className="text-[10px] md:text-xs text-[var(--primary-blue)]/40">(GMT+00:00) UTC</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-sm text-[var(--primary-blue)]">March 2026</span>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-[var(--primary-blue)]/5 rounded-full text-[var(--primary-blue)]"><ChevronLeft size={16} /></button>
                      <button className="p-1 hover:bg-[var(--primary-blue)]/5 rounded-full text-[var(--primary-blue)]"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[var(--primary-blue)]/30 mb-2">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <button 
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                          selectedDate === day 
                            ? "bg-[var(--primary-blue)] text-white font-bold" 
                            : "hover:bg-[var(--primary-blue)]/5 text-[var(--primary-blue)]"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-sm uppercase tracking-widest text-gray-400">Tue 24</span>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft size={16} /></button>
                      <button className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {times.map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full py-3 rounded-xl border text-sm font-medium transition-all ${
                          selectedTime === time 
                            ? "bg-[#0055ff] border-[#0055ff] text-white" 
                            : "border-gray-200 hover:border-black text-gray-700"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-all">
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => (
  <>
    <HomeHero />
    <Ticker />
    <WhoWeAre />
    <FeaturedWorks />
    <HomeServices />
    <LogoTicker />
    <HowWeBuildSolutions />
    <FAQSection />
    <ContactForm />
  </>
);

const ServicesPage = () => (
  <>
    <ServicesHero />
    <CoreOfferings />
    <FeaturedProjectsCarousel />
    <LogoTicker />
    <TrustStrip />
    <ExpertiseSection />
    <StatsSection />
    <Testimonials />
    <FAQSection />
    <CTASection />
    <ContactForm />
  </>
);

const AboutPage = () => (
  <>
    <AboutHero />
    <WhoWeAreAbout />
    <AboutStudio />
    <OurApproach />
    <OurExpertise />
    <OurMission />
    <CreativeTeamGrid />
    <JoinOurTeam />
    <ContactForm />
  </>
);

const ContactsPage = () => (
  <>
    <ContactsHero />
    <ScheduleCall />
    <ContactForm />
  </>
);

const ProjectsPage = () => (
  <>
    <ProjectsHero />
    <TrustStrip />
    <ProjectsGrid />
    <ContactForm />
  </>
);

// --- Scroll To Top ---

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top immediately for standard scroll
    window.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    
    // If Lenis is initialized globally, use it to scroll to top immediately
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
    
    // Refresh AOS more robustly
    setTimeout(() => {
      AOS.refresh();
      AOS.refreshHard();
    }, 500);
  }, [pathname]);

  return null;
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Store lenis globally so ScrollToTop can access it
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50, // Reduced offset for better mobile experience
      delay: 0,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });

    // Force a refresh after a short delay
    const timeout = setTimeout(() => {
      AOS.refresh();
    }, 500);

    // Handle scroll progress
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white selection:bg-black selection:text-white font-sans">
        <div 
          className="fixed top-0 left-0 h-[3px] bg-black z-[1000] transition-all duration-100" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
        <CustomCursor />
        <Navbar toggleMenu={() => setIsMenuOpen(true)} />
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </main>

        <MainFooter />
      </div>
    </Router>
  );
}
