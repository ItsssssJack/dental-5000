import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  CalendarCheck, 
  TrendingUp, 
  Activity,
  CheckCircle2,
  Menu,
  X,
  Zap,
  BarChart3,
  Users,
  Star,
  Quote,
  ArrowUpRight,
  Calculator,
  Mail,
  Smartphone,
  User,
  DollarSign,
  Send
} from 'lucide-react';

// --- Utility Components ---

// 1. Spotlight Card (Updated for Orange Theme)
const SpotlightCard: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl bg-zinc-900/40 border border-white/5 transition-transform duration-300 hover:-translate-y-1 ${className}`}
      style={{
        "--mouse-x": `${position.x}px`,
        "--mouse-y": `${position.y}px`,
      }}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{ 
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(249, 115, 22, 0.08), transparent 40%)` 
        }}
      />
      <div className="relative h-full">{children}</div>
      {/* Border Glow Effect using CSS mask defined in index.html */}
      <div className="spotlight-card absolute inset-0 rounded-xl pointer-events-none" />
    </div>
  );
};

// 2. Meteor Shower Animation
const MeteorShower = () => {
  const [meteors, setMeteors] = useState<Array<{ id: number; position: number }>>([]);
  const meteorIdRef = useRef(0);

  useEffect(() => {
    // Create initial batch of meteors for immediate visual impact
    const initialMeteors = Array.from({ length: 8 }).map(() => ({
      id: meteorIdRef.current++,
      position: Math.random(),
    }));
    setMeteors(initialMeteors);

    // Add new meteors continuously at faster rate
    const interval = setInterval(() => {
      setMeteors((prev) => {
        // Limit max meteors to prevent memory leak
        if (prev.length >= 20) {
          return [...prev.slice(1), { id: meteorIdRef.current++, position: Math.random() }];
        }
        return [...prev, { id: meteorIdRef.current++, position: Math.random() }];
      });

      // Cleanup old meteors after animation completes
      setTimeout(() => {
        setMeteors((prev) => prev.slice(1));
      }, 5000);
    }, 1000); // Faster generation: every 1 second instead of 2

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] animate-meteor"
          style={{
            top: 0,
            left: `${Math.floor(meteor.position * 100)}%`,
            animationDelay: `${Math.random() * 0.4}s`,
            animationDuration: `${(Math.random() * 2 + 3).toFixed(2)}s`,
          }}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-brand-500 to-transparent" />
        </span>
      ))}
    </div>
  );
};

// --- Main Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all overflow-hidden">
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
             D
          </div>
          <span className="font-semibold text-lg tracking-tight text-zinc-100 group-hover:text-white transition-colors">
            DentaScale
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-brand-400 transition-colors">Solution</a>
          <a href="#process" className="text-sm font-medium text-zinc-400 hover:text-brand-400 transition-colors">How it Works</a>
          <a href="#proof" className="text-sm font-medium text-zinc-400 hover:text-brand-400 transition-colors">Results</a>
          
          <button className="relative group px-4 py-2 text-sm font-medium bg-zinc-900 text-white border border-zinc-800 rounded-full hover:border-brand-500/50 transition-colors overflow-hidden">
            <span className="relative z-10">Book Audit</span>
            <div className="absolute inset-0 bg-brand-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        <button className="md:hidden text-zinc-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
          <a href="#features" className="text-zinc-400 hover:text-brand-500" onClick={() => setMobileMenuOpen(false)}>Solution</a>
          <a href="#proof" className="text-zinc-400 hover:text-brand-500" onClick={() => setMobileMenuOpen(false)}>Results</a>
           <button className="w-full py-3 text-sm font-medium bg-brand-600 text-white rounded-lg">
            Book Audit
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
      {/* Removed indigo gradient - keeping single brand-focused color scheme */}

      {/* Animation Layer */}
      <MeteorShower />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Hook / Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-brand-500/30 text-xs font-mono text-brand-400 mb-8 backdrop-blur-sm shadow-[0_0_15px_-3px_rgba(249,115,22,0.3)] cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          WHITE-LABEL AI FOR DENTAL AGENCIES
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-tight">
          Help Your Clients Book 20+ Patients Per Month—<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-300 to-brand-600 relative">
            Guaranteed Or They Pay $0
            {/* Subtle underline SVG */}
            <svg className="absolute w-full h-3 -bottom-2 left-0 text-brand-500 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="2" fill="transparent" />
            </svg>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          The white-label AI platform that delivers guaranteed results for your dental practice clients. Scale to 50+ clients without adding headcount. Turn one-time projects into predictable recurring revenue.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <button className="relative w-full sm:w-auto px-8 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-zinc-100 transition-colors overflow-hidden group shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)]">
            <span className="flex items-center justify-center gap-2 relative z-10">
              Book Agency Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-zinc-700 text-zinc-300 rounded-lg font-medium hover:bg-zinc-900 hover:text-white hover:border-zinc-600 transition-all flex items-center justify-center gap-2">
            View Agency Pricing <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Agency Trust Line */}
        <div className="mt-24 pt-8 border-t border-dashed border-zinc-800/50 w-full max-w-5xl flex flex-col items-center">
           <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mb-6">Trusted by dental marketing agencies nationwide</p>
           <div className="flex gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-500 items-center justify-center">
              {/* Placeholder for agency stats or logos */}
              <div className="text-center">
                <div className="text-3xl font-bold text-white">127+</div>
                <div className="text-xs text-zinc-500 uppercase mt-1">Agency Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2,400+</div>
                <div className="text-xs text-zinc-500 uppercase mt-1">Practice Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-xs text-zinc-500 uppercase mt-1">Client Retention</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// 3. Detailed Value Proposition (Grid)
const ValueProp = () => {
  const features = [
    {
      title: "White-Label Platform",
      desc: "Your brand, your clients, our technology. Fully customizable dashboard, client portal, and reporting. No DentaScale branding—just pure agency value.",
      icon: <Sparkles className="text-brand-500" size={24} />,
      stat: "100% Branded"
    },
    {
      title: "Predictable Client Results",
      desc: "Stop overpromising and underdelivering. Our guarantee gives your clients 20+ new patients or they pay nothing. Higher retention, better testimonials, easier upsells.",
      icon: <CalendarCheck className="text-brand-500" size={24} />,
      stat: "20+ Patients"
    },
    {
      title: "Scale Without Headcount",
      desc: "Serve 50+ dental practice clients without hiring coordinators, SDRs, or customer success staff. Our AI handles calls, bookings, and follow-ups 24/7.",
      icon: <Users className="text-brand-500" size={24} />,
      stat: "50+ Clients"
    },
    {
      title: "Transparent ROI Dashboard",
      desc: "Show clients exactly what they're paying for. Real-time appointment tracking, revenue attribution, and call analytics. Build trust and justify your monthly retainer.",
      icon: <BarChart3 className="text-brand-500" size={24} />,
      stat: "Live Analytics"
    }
  ];

  return (
    <section id="features" className="py-32 bg-black relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The Agency Growth Platform Built for <span className="text-brand-500">Scale</span>
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-lg">
            Turn your agency into a recurring revenue machine. White-label our AI, deliver guaranteed results, and scale to 6-7 figures without operational chaos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <SpotlightCard key={i} className="group p-8 bg-zinc-900/20 hover:bg-zinc-900/40 border-zinc-800/50">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-500/50 transition-all duration-300 shadow-lg shadow-black/50">
                    {f.icon}
                 </div>
                 <span className="text-xs font-mono text-zinc-400 border border-zinc-700 px-2 py-1 rounded bg-black/50">{f.stat}</span>
               </div>

               <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-brand-400 transition-colors">{f.title}</h3>
               <p className="text-zinc-400 leading-relaxed text-base group-hover:text-zinc-300 transition-colors">{f.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Process Section (How it Works)
const Process = () => {
    return (
        <section id="process" className="py-32 bg-zinc-950 relative overflow-hidden border-y border-zinc-900/50">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

             <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                     <div className="inline-block px-3 py-1 mb-4 text-xs font-mono text-brand-500 border border-brand-500/20 rounded bg-brand-500/5">
                        PARTNER WORKFLOW
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Launch in 48 Hours. Scale Forever.</h2>
                    <p className="text-zinc-300 max-w-2xl mx-auto text-lg">
                        We handle the technology. You handle the client relationships. Together, we build recurring revenue.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line - More visible */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-brand-700/50 to-transparent border-t border-dashed border-zinc-700" />

                    {[
                        { title: "Agency Onboarding", desc: "We set up your white-label platform with custom branding, domain, and client portal in under 24 hours.", step: "01" },
                        { title: "Client Deployment", desc: "Send us your dental practice clients. We deploy AI reception, database reactivation, and analytics within 48 hours per client.", step: "02" },
                        { title: "Recurring Revenue", desc: "Clients get guaranteed results. You get retention, referrals, and recurring income. We handle support and updates.", step: "03" }
                    ].map((item, i) => (
                        <div key={i} className="relative flex flex-col items-center text-center group">
                            {/* Circle */}
                            <div className="w-24 h-24 rounded-full bg-black border-4 border-zinc-800 flex items-center justify-center mb-8 relative z-10 group-hover:border-brand-600 group-hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] transition-all duration-500 shadow-2xl">
                                <span className="text-2xl font-mono font-bold text-zinc-600 group-hover:text-brand-500 transition-colors">{item.step}</span>
                                {/* Orbital ring */}
                                <div className="absolute -inset-1 rounded-full border border-dashed border-zinc-700 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">{item.title}</h3>
                            <p className="text-zinc-400 max-w-xs text-base leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
             </div>
        </section>
    )
}

// 5. Proof Section - Redesigned (Bento Grid)
const Proof = () => {
  return (
    <section id="proof" className="py-32 relative overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-zinc-900 to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Agency Success Stories</h2>
            <p className="text-zinc-300 max-w-2xl mx-auto text-lg">Real results from dental marketing agencies using DentaScale to scale their business and retain more clients.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Box 1: Agency Revenue Impact (Large) */}
          <div className="md:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden group">
             <div className="flex justify-between items-start mb-8 relative z-10">
                 <div>
                    <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-1">Combined Agency MRR Added</h3>
                    <div className="text-5xl font-bold text-white">$840,000+</div>
                    <p className="text-zinc-400 text-sm mt-2">Across 127 agency partners</p>
                 </div>
                 <div className="bg-brand-500/10 text-brand-400 border border-brand-500/20 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <TrendingUp size={16} /> +156%
                 </div>
             </div>

             {/* Abstract Graph */}
             <div className="absolute bottom-0 left-0 right-0 h-64 opacity-50 group-hover:opacity-80 transition-opacity duration-700">
                <svg viewBox="0 0 100 40" className="w-full h-full fill-none stroke-brand-500 stroke-[1]" preserveAspectRatio="none">
                    <path d="M0 35 C 20 35, 20 20, 40 20 C 60 20, 60 5, 100 5" vectorEffect="non-scaling-stroke" />
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d="M0 35 C 20 35, 20 20, 40 20 C 60 20, 60 5, 100 5 V 40 H 0 Z" fill="url(#areaGradient)" stroke="none" />
                </svg>
             </div>

             {/* Hover Grid Lines */}
             <div className="absolute inset-0 bg-grid-pattern-small opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Box 2: Client Retention Stat */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-brand-500">
                <Users size={40} />
             </div>
             <div className="text-3xl font-bold text-white mb-2">95%</div>
             <div className="text-zinc-400 text-sm">Avg. Client Retention</div>
          </div>

          {/* Box 3: Appointments Stat */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-brand-500">
                <CalendarCheck size={40} />
             </div>
             <div className="text-3xl font-bold text-white mb-2">48k+</div>
             <div className="text-zinc-400 text-sm">Appointments Delivered</div>
          </div>

          {/* Box 4: Agency Partners */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-brand-500">
                <Sparkles size={40} />
             </div>
             <div className="text-3xl font-bold text-white mb-2">127+</div>
             <div className="text-zinc-400 text-sm">Agency Partners</div>
          </div>

          {/* Box 5: Time to Launch */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-brand-500">
                <Zap size={40} />
             </div>
             <div className="text-3xl font-bold text-white mb-2">&lt;48hrs</div>
             <div className="text-zinc-400 text-sm">Avg. Client Onboarding</div>
          </div>

          {/* Box 6: Featured Testimonial (Wide) */}
           <div className="md:col-span-3 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center relative group">
              <div className="bg-brand-500/10 p-3 rounded-full text-brand-500 flex-shrink-0">
                  <Quote size={24} />
              </div>
              <div className="flex-1">
                  <p className="text-lg md:text-xl text-zinc-300 italic mb-4">"DentaScale transformed our agency. We went from promising results to guaranteeing them. <span className="text-white font-semibold">Our client retention jumped from 62% to 94% in 6 months.</span> The white-label platform makes us look like we built it ourselves. Best partner decision we ever made."</p>
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-white">SM</div>
                      <div>
                          <div className="font-bold text-white">Sarah Mitchell</div>
                          <div className="text-xs text-zinc-400">Founder, Dental Growth Partners</div>
                      </div>
                  </div>
              </div>
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
           </div>

        </div>
      </div>
    </section>
  );
};

// 7. Agency Revenue Calculator (Form)
const LostRevenueCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentClients: '',
    avgClientMRR: '',
    retentionRate: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate potential additional MRR
  const calculatePotential = () => {
    const clients = parseInt(formData.currentClients) || 0;
    const mrr = parseInt(formData.avgClientMRR) || 0;
    const retention = parseInt(formData.retentionRate) || 0;

    // If they could add 10 more clients at their avg MRR
    const potentialNewClients = 10;
    const additionalMRR = potentialNewClients * mrr;

    // If retention improves to 95%
    const improvedRetention = Math.max(95 - retention, 0);
    const savedMRR = (clients * mrr * improvedRetention) / 100;

    return {
      additionalMRR,
      savedMRR,
      total: additionalMRR + savedMRR
    };
  };

  const potential = calculatePotential();

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

       <div className="max-w-3xl mx-auto px-6 relative z-10">
         <div className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)] relative overflow-hidden">
            {/* Top Highlight Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-3 bg-brand-500/10 rounded-full mb-4">
                <Calculator className="text-brand-600" size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Calculate Your Agency <span className="text-brand-600">Revenue Potential</span></h2>
              <p className="text-zinc-600 max-w-lg mx-auto">
                See how much additional MRR you could generate by adding 10 clients with DentaScale's white-label platform.
              </p>
            </div>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="text-brand-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Your Agency Growth Plan is Ready</h3>
                <p className="text-zinc-600 max-w-md">
                  We've sent your personalized revenue projections and agency partnership details to <span className="text-zinc-900 font-medium">{formData.email}</span>.
                </p>
                {potential.total > 0 && (
                  <div className="mt-8 p-6 bg-brand-50 rounded-xl border-2 border-brand-200">
                    <div className="text-sm text-brand-700 font-medium mb-2">Potential Additional MRR</div>
                    <div className="text-4xl font-bold text-brand-600">${potential.total.toLocaleString()}/mo</div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                 {/* Agency Name */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Agency Name</label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-brand-600 transition-colors" size={18} />
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Dental Growth Partners"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-zinc-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-zinc-400"
                      />
                    </div>
                 </div>

                 {/* Email */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-brand-600 transition-colors" size={18} />
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="founder@agency.com"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-zinc-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-zinc-400"
                      />
                    </div>
                 </div>

                 {/* Phone */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Phone Number <span className="opacity-50 lowercase font-normal">(optional)</span></label>
                    <div className="relative group">
                      <Smartphone className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-brand-600 transition-colors" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-zinc-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-zinc-400"
                      />
                    </div>
                 </div>

                 {/* Current Clients */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Number of Current Clients</label>
                    <div className="relative group">
                      <Users className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-brand-600 transition-colors" size={18} />
                      <input
                        required
                        type="number"
                        name="currentClients"
                        value={formData.currentClients}
                        onChange={handleChange}
                        placeholder="25"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-zinc-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-zinc-400"
                      />
                    </div>
                 </div>

                 {/* Avg Client MRR */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Avg. Client Monthly Revenue ($)</label>
                    <div className="relative group">
                      <DollarSign className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-brand-600 transition-colors" size={18} />
                      <input
                        required
                        type="number"
                        name="avgClientMRR"
                        value={formData.avgClientMRR}
                        onChange={handleChange}
                        placeholder="2000"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-zinc-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-zinc-400"
                      />
                    </div>
                 </div>

                 {/* Retention Rate */}
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Current Client Retention Rate (%)</label>
                    <div className="relative group">
                      <BarChart3 className="absolute left-3 top-3 text-zinc-400 group-focus-within:text-brand-600 transition-colors" size={18} />
                      <input
                        required
                        type="number"
                        name="retentionRate"
                        value={formData.retentionRate}
                        onChange={handleChange}
                        placeholder="70"
                        min="0"
                        max="100"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-zinc-900 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-zinc-400"
                      />
                    </div>
                 </div>

                 {/* Submit Button */}
                 <div className="pt-4">
                   <button
                     disabled={status === 'loading'}
                     className="relative w-full py-4 bg-zinc-900 text-white rounded-lg font-bold text-lg hover:bg-black transition-all overflow-hidden group shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                     <span className="relative z-10 flex items-center justify-center gap-2">
                       {status === 'loading' ? (
                         <>
                            <div className="w-5 h-5 border-2 border-zinc-400 border-t-white rounded-full animate-spin" />
                            Calculating...
                         </>
                       ) : (
                         <>Calculate Agency Potential <ArrowRight size={18} /></>
                       )}
                     </span>
                   </button>
                   {status === 'error' && <p className="text-brand-600 text-sm mt-3 text-center">Something went wrong. Please check your connection and try again.</p>}
                 </div>
              </form>
            )}
         </div>
       </div>
    </section>
  );
};

// 6. CTA Section
const CTA = () => {
  return (
    <section className="py-40 relative overflow-hidden bg-zinc-950 flex flex-col items-center justify-center text-center">
       {/* Background Beam Animation */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-900/20 via-black to-black opacity-50 pointer-events-none" />
       <div className="absolute inset-0 bg-grid-pattern-small opacity-10 pointer-events-none" />

       <div className="max-w-4xl mx-auto px-6 relative z-10">
         <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
           Ready To Scale Your Agency?
         </h2>
         <p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto">
           Join 127+ dental marketing agencies using DentaScale to deliver guaranteed results, boost retention, and build predictable recurring revenue.
         </p>

         <div className="flex flex-col sm:flex-row justify-center gap-6">
           <button className="group relative px-10 py-5 bg-white text-black rounded-lg font-bold text-lg hover:scale-105 transition-transform overflow-hidden shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]">
             <span className="relative z-10 flex items-center gap-2">Book Agency Demo <ArrowRight size={18} /></span>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
           </button>
           <button className="px-10 py-5 bg-transparent border border-zinc-700 text-zinc-300 rounded-lg font-bold text-lg hover:bg-zinc-900 hover:text-white hover:border-zinc-600 transition-all">
             View Partnership Tiers
           </button>
         </div>

         <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-zinc-400 text-sm font-mono">
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-500" /> WHITE-LABEL PLATFORM</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-500" /> 48-HOUR ONBOARDING</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-500" /> DEDICATED SUPPORT</span>
         </div>
       </div>

       {/* Bottom Gradient Line */}
       <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-600 to-transparent opacity-50" />
    </section>
  );
};

// 7. Footer
const Footer = () => {
  return (
    <footer className="py-12 bg-black text-sm border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-brand-900/50">D</div>
           <span className="text-zinc-300 font-semibold tracking-wide">DentaScale AI</span>
        </div>
        <div className="text-zinc-500 font-mono">
          © 2024 DentaScale Inc. All rights reserved.
        </div>
        <div className="flex gap-8 text-zinc-400">
          <a href="#" className="hover:text-brand-500 transition-colors hover:underline">Agency Login</a>
          <a href="#" className="hover:text-brand-500 transition-colors hover:underline">Privacy</a>
          <a href="#" className="hover:text-brand-500 transition-colors hover:underline">Terms</a>
          <a href="#" className="hover:text-brand-500 transition-colors hover:underline">X</a>
        </div>
      </div>
    </footer>
  )
}

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-500/30">
      <Navbar />
      <Hero />
      <ValueProp />
      <Process />
      <Proof />
      <LostRevenueCalculator />
      <CTA />
      <Footer />
      <elevenlabs-convai agent-id={import.meta.env.VITE_ELEVENLABS_AGENT_ID}></elevenlabs-convai>
    </div>
  );
};

export default App;