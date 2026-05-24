import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Menu, Star, Shield, ShieldCheck, MapPin, Clock, Calendar, Check, 
  Leaf, Cpu, Car, Phone, User, Key, Coins, Eye, Compass, Heart, 
  ChevronLeft, ChevronRight, FileText, Settings, Sparkles, Building2,
  Mail, Hammer, PenTool, CheckCircle2, MessageSquare, Plus, Minus, Info, ArrowRight, ArrowUp, Linkedin, Facebook, Instagram, Landmark, Scale
} from 'lucide-react';

interface LandownersPageProps {
  onOpenBooking: (audience: 'buyer' | 'landowner' | 'general') => void;
  onSelectProject: (projectName: string) => void;
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
  onNavigateBuyers: () => void;
  onNavigateContact?: () => void;
  onNavigateAbout?: () => void;
}

export default function LandownersPage({
  onOpenBooking,
  onSelectProject,
  onNavigateHome,
  onNavigateProjects,
  onNavigateBuyers,
  onNavigateContact,
  onNavigateAbout
}: LandownersPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Form states for Section 5 Inline CTA
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    size: '',
    notes: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Scroll position indicator
  const navLinks = [
    { name: 'Projects', onClick: onNavigateProjects, href: '#' },
    { name: 'For Buyers', onClick: onNavigateBuyers, href: '#' },
    { name: 'For Landowners', isCurrent: true, href: '#' },
    { name: 'About', onClick: onNavigateAbout, href: '#' },
    { name: 'Contact', onClick: onNavigateContact, href: '#' },
  ];

  // Accordion concerns & answers
  const concerns = [
    {
      id: 1,
      concern: "How do I know you won't shortchange me on revenue?",
      answer: "Every taka is accounted for. We provide full financial transparency — documented revenue sharing agreements, regular updates, and no hidden deductions. Our land partners can verify everything."
    },
    {
      id: 2,
      concern: "What if construction quality is poor?",
      answer: "Every building we construct is RAJUK-compliant and engineered to the highest structural standards. You're welcome to bring your own engineer to inspect at any stage. We welcome it."
    },
    {
      id: 3,
      concern: "What if you take too long to finish?",
      answer: "We have a 15-year track record of on-time delivery. Our contracts include penalty clauses for delays — the same ones we offer our apartment buyers. We've never triggered one."
    },
    {
      id: 4,
      concern: "Will my land title be completely clear?",
      answer: "Our legal team handles everything. Every partnership begins with a thorough title review, full legal documentation, and RAJUK registration. Zero title disputes in 15 years — ever."
    },
    {
      id: 5,
      concern: "What happens after the building is done?",
      answer: "We manage the property ourselves, long-term. So your building — and your name — stays prestigious, well-maintained, and valuable for decades."
    }
  ];

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormLoading(true);

    setTimeout(() => {
      const generatedId = `LAND-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);

      // Save to localStorage for integration with Aura's general booking records
      const existingBookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
      const newBooking = {
        name: formData.name,
        email: `${formData.name.toLowerCase().replace(/\s+/g, '')}@prive.com`,
        phone: formData.phone,
        preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        preferredTime: '11:00',
        message: `Landowner Partnership enquiry. Location: ${formData.location}, Size: ${formData.size}. Message notes: ${formData.notes}`,
        audienceType: 'landowner',
        id: generatedId,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('aura_bookings', JSON.stringify([...existingBookings, newBooking]));

      setFormLoading(false);
      setFormSubmitted(true);
    }, 1000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCFC]" id="landowners-page-wrapper">
      
      {/* Fixed top scroll pulse indicator line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#5AC2EB]/30 z-50 pointer-events-none">
        <div className="h-full bg-[#5AC2EB] w-5/6 animate-[pulse_2s_infinite]" />
      </div>

      {/* Header component */}
      <header className="sticky top-0 z-40 w-full bg-[#2E3543]/95 backdrop-blur-xl border-b border-white/5 shadow-sm px-6 md:px-12 py-4" id="landowners-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo brand */}
          <button onClick={onNavigateHome} className="flex items-center gap-2 cursor-pointer text-left focus:outline-none">
            <span className="font-serif text-2xl font-bold text-white tracking-normal">
              Aura <span className="font-light text-[#5AC2EB]">Developments</span>
            </span>
          </button>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onNavigateHome}
              className="text-sm font-medium text-white/70 hover:text-[#5AC2EB] tracking-wider transition-colors cursor-pointer focus:outline-none"
            >
              Home
            </button>
            {navLinks.map((link) => {
              if (link.name === 'Home') return null;
              return link.isCurrent ? (
                <div key={link.name} className="relative py-1">
                  <span className="text-sm font-semibold text-[#5AC2EB] tracking-wider cursor-default">
                    {link.name}
                  </span>
                  <motion.div 
                    layoutId="activeNavIndicatorLandowners"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5AC2EB]" 
                  />
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href || '#'}
                  onClick={(e) => {
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                  }}
                  className="text-sm font-medium text-white/70 hover:text-[#5AC2EB] tracking-wider transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Nav CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => onOpenBooking('landowner')}
              className="bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/90 tracking-wider text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-[#5AC2EB]/10 cursor-pointer focus:outline-none"
              id="header-prive-consult-trigger-landowner"
            >
              Partner With Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1.5 focus:outline-none"
            id="mobile-menu-landowners-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav overlay */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-6 right-6 mt-2 p-6 bg-[#2E3543]/98 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/10 z-50 md:hidden animate-fade-in"
          >
            <nav className="flex flex-col gap-4 mb-6">
              <button
                onClick={() => { setMobileMenuOpen(false); onNavigateHome(); }}
                className="text-left text-base font-medium text-white hover:text-[#5AC2EB] py-1 focus:outline-none"
              >
                Home Page
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (link.onClick) {
                      link.onClick();
                    }
                  }}
                  className={`text-left text-base font-medium py-1 transition-colors focus:outline-none ${link.isCurrent ? 'text-[#5AC2EB]' : 'text-white hover:text-[#5AC2EB]'}`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('landowner');
              }}
              className="w-full bg-[#5AC2EB] text-[#2E3543] font-bold text-sm tracking-wider uppercase py-3 rounded-xl shadow-lg focus:outline-none"
            >
              Partner With Us
            </button>
          </motion.div>
        )}
      </header>

      {/* SECTION 1: Page Hero — "Your Land Deserves the Best" */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#2E3543] py-16 md:py-24 border-b border-white/5" id="landowners-hero">
        
        {/* Soft top-left ambient blue glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#5AC2EB]/8 rounded-full blur-[140px] pointer-events-none z-0" />
        
        {/* Right-side large architectural blueprint elevation ghost illustration */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[55vw] h-full max-h-[750px] opacity-[0.09] pointer-events-none z-10 hidden lg:block overflow-hidden mr-[-50px]">
          <svg className="w-full h-full text-[#5AC2EB]" viewBox="0 0 500 500" fill="none" stroke="currentColor" strokeWidth="1">
            {/* Elevation facade grids and levels */}
            <line x1="50" y1="20" x2="50" y2="480" strokeWidth="0.5" />
            <line x1="120" y1="20" x2="120" y2="480" strokeWidth="0.5" />
            <line x1="190" y1="20" x2="190" y2="480" strokeWidth="0.5" />
            <line x1="260" y1="20" x2="260" y2="480" strokeWidth="0.5" />
            <line x1="330" y1="20" x2="330" y2="480" strokeWidth="0.5" />
            <line x1="400" y1="20" x2="400" y2="480" strokeWidth="0.5" />
            <line x1="470" y1="20" x2="470" y2="480" strokeWidth="0.5" />
            
            {/* Floor Levels boundaries */}
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i}>
                <line x1="20" y1={40 + i * 44} x2="480" y2={40 + i * 44} strokeWidth="1" strokeDasharray={i % 2 === 0 ? "none" : "3 3"} />
                <text x="25" y={35 + i * 44} fill="#5AC2EB" fontSize="8" className="font-mono">LVL 0{10 - i}</text>
              </g>
            ))}

            {/* Geometric structural elements */}
            <rect x="120" y="84" width="70" height="44" rx="2" strokeWidth="1.5" />
            <rect x="260" y="84" width="70" height="44" rx="2" strokeWidth="1.5" />
            <rect x="190" y="172" width="70" height="44" rx="2" strokeWidth="1.5" />
            <rect x="330" y="172" width="70" height="44" rx="2" strokeWidth="1.5" />
            <rect x="120" y="260" width="70" height="44" rx="2" strokeWidth="1.5" />
            <rect x="260" y="260" width="70" height="44" rx="2" strokeWidth="1.5" />

            {/* Diagonal cross brace lines resembling engineered layout */}
            <line x1="50" y1="480" x2="470" y2="84" strokeWidth="0.5" strokeDasharray="1 5" />
            <line x1="470" y1="480" x2="50" y2="84" strokeWidth="0.5" strokeDasharray="1 5" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-4xl text-center md:text-left">
            
            {/* Eyebrow */}
            <span className="text-[11px] font-semibold text-[#5AC2EB] tracking-[0.35em] uppercase block mb-4">
              FOR LANDOWNERS
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-serif font-bold text-[#FDFCFC] leading-[1.1] tracking-tight">
              Your land built your future. <br />Let's build something <span className="italic font-normal text-[#5AC2EB]">worthy of it.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-[#FDFCFC]/75 font-sans text-base sm:text-lg md:text-[19px] max-w-2xl leading-[1.7]">
              We've been trusted with over 55 plots across Dhaka's finest neighbourhoods. Every single one was treated like it was our own. Transparent revenue sharing, full legal clarity, and a building you'll be proud to have your name next to.
            </p>

            {/* Dual Actions CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-4">
              <button
                onClick={() => onOpenBooking('landowner')}
                className="bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/95 font-sans font-semibold text-sm tracking-wider text-center py-4 px-8 rounded-xl transition-all shadow-md shadow-[#5AC2EB]/20 cursor-pointer focus:outline-none"
              >
                Let's Start a Conversation →
              </button>
              <button
                onClick={onNavigateProjects}
                className="border-2 border-white/50 text-white hover:bg-white/10 font-sans font-semibold text-sm tracking-wider text-center py-[14px] px-8 rounded-xl transition-all cursor-pointer focus:outline-none"
              >
                See Our Completed Projects
              </button>
            </div>

            {/* Under CTA micro text */}
            <p className="mt-4 text-xs italic font-normal text-[#FDFCFC]/45">
              No obligation. Just an honest conversation about what your land could become.
            </p>

            {/* Technical grid horizontal ground connector rule */}
            <div className="w-full h-[1px] bg-[#5AC2EB]/30 mt-12 mb-6" />

            {/* Quick Trust validation strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-xs font-semibold text-[#FDFCFC]/65" id="land-trust-strip">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[#5AC2EB] font-bold">✓</span> 55+ Land Partnerships Completed
              </span>
              <span className="text-white/15 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[#5AC2EB] font-bold">✓</span> 100% RAJUK Compliant, Always
              </span>
              <span className="text-white/15 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[#5AC2EB] font-bold">✓</span> 0 Disputes with Land Partners, Ever
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: Understanding Your Concerns — "We Know What You're Thinking" */}
      <section className="relative py-24 bg-[#FDFCFC]" id="landowner-empathy">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Width 45%) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block">
              WE'VE HEARD EVERY CONCERN
            </span>
            
            {/* Visual thin-line left border on editorial container */}
            <div className="border-l-2 border-[#5AC2EB] pl-6 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-serif font-bold text-[#2E3543] leading-tight">
                Handing over your land takes trust. <br className="hidden sm:inline" />Here's how we've earned it.
              </h2>
              <p className="text-sm sm:text-base text-[#2E3543]/70 font-sans leading-relaxed">
                We've sat across from dozens of landowners over the past 15 years. We know the questions running through your mind — because we've answered every single one of them. Honestly.
              </p>
            </div>

            {/* Minimalist line art handshake mockup */}
            <div className="pt-8 block">
              <svg className="w-48 h-32 text-[#5AC2EB]/20" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="0.8">
                {/* Outlines of two greeting hands locking */}
                <path d="M10,35 Q20,20 40,30" />
                <path d="M90,25 Q80,40 60,30" strokeWidth="1" />
                {/* Hand contact center ring */}
                <circle cx="50" cy="30" r="14" strokeDasharray="3 3" />
                <circle cx="50" cy="30" r="4" fill="currentColor" fillOpacity="0.1" />
                {/* Subtle alignment markers */}
                <line x1="50" y1="5" x2="50" y2="55" strokeDasharray="1 8" />
                <line x1="10" y1="30" x2="90" y2="30" strokeDasharray="1 8" />
              </svg>
            </div>
          </div>

          {/* Right Column Concern Accordion (Width 55%) */}
          <div className="lg:col-span-7 space-y-4" id="land-accordion-block">
            {concerns.map((item, index) => {
              const isOpen = activeAccordion === index;
              return (
                <div 
                  key={item.id} 
                  className="border-b border-[#2E3543]/10 pb-4"
                  id={`accordion-item-${item.id}`}
                >
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : index)}
                    className="w-full flex justify-between items-center py-4 text-left cursor-pointer focus:outline-none group"
                  >
                    <span className="font-serif text-lg sm:text-xl italic font-bold text-[#2E3543] group-hover:text-[#5AC2EB] transition-colors pr-4">
                      {item.concern}
                    </span>
                    <span className="text-[#5AC2EB] p-1 rounded-full bg-[#5AC2EB]/5 shrink-0 transition-transform duration-300">
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm sm:text-base text-gray-500 font-normal leading-relaxed pb-4 pr-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 3: The Partnership Model — "How This Actually Works" */}
      <section className="relative py-24 bg-[#2E3543] text-white overflow-hidden" id="partnership-model">
        
        {/* Soft edge ambient blur */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#5AC2EB]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Headline block */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block">
              THE PARTNERSHIP MODEL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[48px] font-serif font-bold text-white leading-tight">
              Simple. Transparent. <br />Built on mutual respect.
            </h2>
            <p className="text-sm sm:text-base text-[#FDFCFC]/70 max-w-xl mx-auto leading-relaxed">
              Here's how a land partnership with Aura works — from the first call to the final handover and beyond.
            </p>
            <div className="w-16 h-[2.5px] bg-[#5AC2EB] mx-auto mt-4" />
          </div>

          {/* Process flow list horizontally (scrolls vertically on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 items-stretch relative" id="partnership-steps-flow">
            
            {/* Step 1 */}
            <div className="bg-white/6 backdrop-blur-md rounded-2xl border border-white/12 p-6 flex flex-col justify-between group hover:border-[#5AC2EB]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB] font-serif text-sm font-bold">
                  01
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Initial Meeting</h4>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  We meet. We listen. No obligations. Just talking about your aspirations.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/6 backdrop-blur-md rounded-2xl border border-white/12 p-6 flex flex-col justify-between group hover:border-[#5AC2EB]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB] font-serif text-sm font-bold">
                  02
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Site Blueprint</h4>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  We review your land, title, and development potential. Full compliance.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/6 backdrop-blur-md rounded-2xl border border-white/12 p-6 flex flex-col justify-between group hover:border-[#5AC2EB]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB] font-serif text-sm font-bold">
                  03
                </div>
                <h4 className="font-serif text-lg font-bold text-white">The Contract</h4>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Legally airtight agreement. Clear revenue sharing. No surprise charges.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/6 backdrop-blur-md rounded-2xl border border-white/12 p-6 flex flex-col justify-between group hover:border-[#5AC2EB]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB] font-serif text-sm font-bold">
                  04
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Design & Build</h4>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  We design and construct. You stay updated at every key phase.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white/6 backdrop-blur-md rounded-2xl border border-white/12 p-6 flex flex-col justify-between group hover:border-[#5AC2EB]/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB] font-serif text-sm font-bold">
                  05
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Keys & Beyond</h4>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  We hand over — and then we stay. Managing the building to keep it pristine.
                </p>
              </div>
            </div>

          </div>

          {/* Partnership Comparison Split (2 Column) */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8" id="partnership-comparison-split">
            
            {/* Left Box: What Landowner Brings */}
            <div className="bg-white/5 rounded-[22px] p-8 md:p-10 border-2 border-[#5AC2EB]/35 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-[#5AC2EB]/40 uppercase">
                CONTRIBUTION
              </div>
              <h4 className="font-serif text-2xl font-bold text-white mb-6">
                What You Bring
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#5AC2EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/80 leading-relaxed font-medium">Your land in a premium Dhaka neighbourhood (Gulshan, Banani, Dhanmondi, Bashundhara).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#5AC2EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/80 leading-relaxed font-medium">Your vision for what your family estate and heritage could eventually become.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#5AC2EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/80 leading-relaxed font-medium">Your trust — we understand the weight of this decision and never take it lightly.</span>
                </li>
              </ul>
            </div>

            {/* Right Box: What Aura Brings */}
            <div className="bg-white/5 rounded-[22px] p-8 md:p-10 border-2 border-white/10 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-white/30 uppercase">
                CAPABILITY
              </div>
              <h4 className="font-serif text-2xl font-bold text-white mb-6">
                What Aura Brings
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#5AC2EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/85 leading-relaxed font-medium">15+ years of premium residential construction and real estate development expertise.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#5AC2EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/85 leading-relaxed font-medium">Full, robust project financing with premium, high-grade architectural and engineering teams.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#5AC2EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/85 leading-relaxed font-medium">Clear legal oversight, fast-tracked RAJUK approvals, and zero-headache operations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#5AC2EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-white/85 leading-relaxed font-medium">A pristine portfolio record of 55+ successful premium joint venture completions.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: Land Partner Stories — "From the People Who've Done It" */}
      <section className="relative py-24 bg-[#FDFCFC]" id="landowner-stories">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Headers */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block">
              LAND PARTNERS STORIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-serif font-bold text-[#2E3543] leading-tight">
              Fifteen years of partnerships. <br />Zero regrets.
            </h2>
            <div className="w-16 h-[2.5px] bg-[#5AC2EB] mx-auto mt-4" />
          </div>

          {/* Testimonials narrative cards side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Story 1 */}
            <div className="bg-white rounded-[24px] border border-[#5AC2EB]/30 p-8 md:p-10 shadow-sm relative overflow-hidden group hover:border-[#5AC2EB]/60 hover:shadow-md transition-all duration-300">
              {/* Massive ambient decorative quote in background */}
              <span className="absolute -top-4 -left-2 font-serif text-[120px] leading-none text-[#5AC2EB]/10 pointer-events-none select-none">
                “
              </span>
              <div className="relative z-10 space-y-6">
                {/* 5 stars */}
                <div className="flex gap-1 text-[#5AC2EB]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" stroke="none" />)}
                </div>
                <p className="font-sans text-sm sm:text-base italic text-[#2E3543]/80 leading-[1.85]">
                  "I had three developers approach me for my Gulshan plot. Two made grand promises with nothing to back them up. Aura came in with documentation, a clear revenue plan, and a delivery schedule with penalty clauses. That level of transparency made my decision easy. The building they delivered exceeded everything I imagined."
                </p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-sans text-sm font-bold text-[#2E3543]">Ahmed K.</h5>
                    <p className="text-xs text-gray-400">Land Partner, Gulshan — 2021</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#5AC2EB] uppercase tracking-widest bg-[#5AC2EB]/10 px-3 py-1.5 rounded-full">
                    Aura Skyline One
                  </span>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white rounded-[24px] border border-[#5AC2EB]/30 p-8 md:p-10 shadow-sm relative overflow-hidden group hover:border-[#5AC2EB]/60 hover:shadow-md transition-all duration-300">
              {/* Massive ambient decorative quote in background */}
              <span className="absolute -top-4 -left-2 font-serif text-[120px] leading-none text-[#5AC2EB]/10 pointer-events-none select-none">
                “
              </span>
              <div className="relative z-10 space-y-6">
                {/* 5 stars */}
                <div className="flex gap-1 text-[#5AC2EB]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" stroke="none" />)}
                </div>
                <p className="font-sans text-sm sm:text-base italic text-[#2E3543]/80 leading-[1.85]">
                  "My biggest worry was the legal side. My father spent 30 years accumulating that land. Aura's legal team was meticulous — every document reviewed, every registration handled. I never had a single moment of doubt. Two years later, the building is a landmark in the neighbourhood."
                </p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-sans text-sm font-bold text-[#2E3543]">Sultana R.</h5>
                    <p className="text-xs text-gray-400">Land Partner, Banani — 2022</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#5AC2EB] uppercase tracking-widest bg-[#5AC2EB]/10 px-3 py-1.5 rounded-full">
                    Aura Glass Residences
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Core Landowner Partnership Stats below cards row */}
          <div className="mt-16 bg-[#2E3543]/5 p-8 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center" id="land-stats-bar">
            <div>
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#5AC2EB] block">55+</span>
              <span className="text-xs sm:text-sm text-[#2E3543]/60 font-sans mt-1 block">Successful land partnerships</span>
            </div>
            <div className="border-t sm:border-t-0 sm:border-x border-gray-200/50 py-4 sm:py-0">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#5AC2EB] block">100%</span>
              <span className="text-xs sm:text-sm text-[#2E3543]/60 font-sans mt-1 block">On-time project delivery</span>
            </div>
            <div>
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#5AC2EB] block">0</span>
              <span className="text-xs sm:text-sm text-[#2E3543]/60 font-sans mt-1 block">Revenue disputes with partners</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: Final CTA — "Let's Talk About Your Land" */}
      <section className="relative py-24 bg-[#2E3543] text-white" id="land-joint-form">
        
        {/* Absolute ambient layout glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5AC2EB]/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          
          <div className="max-w-2xl text-center space-y-4 mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block">
              LET'S HAVE AN HONEST CONVERSATION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[52px] font-serif font-bold text-white leading-tight">
              Tell us about your land. <br />We'll tell you what it could become.
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
              Every great building starts with a single conversation. There's no obligation, no pressure, and no corporate jargon. Just two parties figuring out if this could be a great partnership.
            </p>
          </div>

          <div className="w-full max-w-[680px]" id="landowner-form-box">
            <div className="bg-white/5 backdrop-blur-md rounded-[28px] border border-[#5AC2EB]/20 p-8 md:p-12 text-left relative overflow-hidden">
              
              {/* Technical drawing corner registration marks */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#5AC2EB]/30 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#5AC2EB]/30 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#5AC2EB]/30 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#5AC2EB]/30 pointer-events-none" />

              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-16 h-16 bg-[#5AC2EB]/15 rounded-full flex items-center justify-center text-[#5AC2EB] mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Project Draft Initiated</h3>
                  <p className="text-sm text-white/75 max-w-md mx-auto">
                    Thank you, <span className="font-bold text-white">{formData.name}</span>. We have generated private case dossier <span className="font-mono text-[#5AC2EB] font-bold">{ticketId}</span> for your land at <span className="italic">{formData.location}</span>.
                  </p>
                  <p className="text-xs text-white/50">
                    A senior partner from our legal and engineering commission will reach out to you within 24 business hours at <span className="font-mono text-[#5AC2EB]">{formData.phone}</span>.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">Your Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ahmed Chowdhury"
                          className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#5AC2EB] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">Phone Number</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+880 171X-XXXXXX"
                          className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#5AC2EB] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Location */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">Land Location</label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Plot in Gulshan 2, Near Park"
                        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#5AC2EB] transition-colors"
                      />
                    </div>

                    {/* Size */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">Land Size</label>
                      <input
                        type="text"
                        required
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        placeholder="e.g. 5.5 Katha"
                        className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#5AC2EB] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Notes / Hopes */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/60 uppercase tracking-wider block">Your Vision & Hope</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Tell us a bit about your family estate land goal..."
                      className="w-full bg-white/8 border border-white/15 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#5AC2EB] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/90 font-sans font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-[#5AC2EB]/20 text-center cursor-pointer disabled:opacity-50"
                  >
                    {formLoading ? 'Analyzing blueprint metrics...' : 'Start the Conversation →'}
                  </button>

                  <p className="text-center text-xs text-white/40 mt-4">
                    We'll respond personally within 24 hours. No call-centers. No automated replies.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER component consistent with main landing */}
      <footer className="relative bg-[#2E3543] text-white pt-20 overflow-hidden" id="land-partner-footer">
        {/* Decorative Atmosphere Gradient Center Bleed */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#5AC2EB]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Transition Accent: Full-width 2px gradient line */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#5AC2EB] to-transparent absolute top-0 left-0" />

        {/* Upper Footer — Final CTA Block */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pb-20 border-b border-white/10">
          
          <span className="text-xs font-semibold uppercase text-[#5AC2EB] tracking-[0.25em] block">
            READY WHEN YOU ARE
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#FDFCFC] leading-none mt-4 max-w-4xl mx-auto">
            Your next chapter starts <br className="hidden sm:inline" />with{' '}
            <span className="font-normal italic text-[#5AC2EB]">one conversation.</span>
          </h2>

          <p className="text-sm md:text-base text-white/75 font-normal mt-6 leading-relaxed max-w-2xl mx-auto">
            Whether you're looking for the perfect home or the perfect partner for your land — we'd love to talk. Let's figure this out together.
          </p>

          {/* Dual CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button
              onClick={() => onOpenBooking('landowner')}
              className="w-full sm:w-auto bg-[#5AC2EB] hover:bg-[#5AC2EB]/95 text-[#2E3543] font-sans font-bold tracking-widest text-xs uppercase px-8 py-4 rounded-xl shadow-lg shadow-[#5AC2EB]/15 transition-all cursor-pointer"
            >
              Partner With Aura
            </button>
            
            <button
              onClick={() => onOpenBooking('general')}
              className="w-full sm:w-auto border border-white hover:bg-white/10 text-[#FDFCFC] font-sans font-semibold tracking-widest text-xs uppercase px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              Talk to Our Team
            </button>
          </div>

          {/* Contact information */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-6 text-[#FDFCFC]/50 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 hover:text-[#5AC2EB] transition-colors">
              <Phone size={14} className="text-[#5AC2EB]" />
              +880 1711-555555
            </span>
            <span className="hidden sm:inline text-white/10">•</span>
            <span className="flex items-center gap-1.5 hover:text-[#5AC2EB] transition-colors">
              <Mail size={14} className="text-[#5AC2EB]" />
              hello@auradevelopments.com
            </span>
            <span className="hidden sm:inline text-white/10">•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#5AC2EB]" />
              Sat – Thu, 9am – 7pm
            </span>
          </div>

        </div>

        {/* Lower Footer — 4 Column Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Column 1 - Brand Column */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold tracking-tight">
                Aura <span className="font-light text-[#5AC2EB]">Developments</span>
              </h3>
              <p className="text-xs sm:text-sm font-sans italic text-white/65 leading-relaxed">
                "Beautiful spaces. On-time handovers. Zero headaches. We build spaces that deserve your life."
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] hover:bg-[#5AC2EB]/20 transition-all">
                  <Linkedin size={16} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] hover:bg-[#5AC2EB]/20 transition-all">
                  <Facebook size={16} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] hover:bg-[#5AC2EB]/20 transition-all">
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Column 2 - Navigate Column */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.25em] text-[#FDFCFC] uppercase mb-6 flex flex-col gap-2">
                EXPLORE
                <div className="w-8 h-[2px] bg-[#5AC2EB]" />
              </h4>
              <nav className="flex flex-col gap-3 text-xs sm:text-sm text-white/65">
                <a href="#hero" onClick={(e) => { e.preventDefault(); onNavigateProjects(); }} className="hover:text-[#5AC2EB] transition-colors">
                  Our Projects
                </a>
                <a href="#for-buyers" onClick={(e) => { e.preventDefault(); onNavigateBuyers(); }} className="hover:text-[#5AC2EB] transition-colors">
                  For Buyers
                </a>
                <a href="#for-landowners" onClick={(e) => { e.preventDefault(); handleScrollToTop(); }} className="hover:text-[#5AC2EB] transition-colors text-[#5AC2EB]">
                  For Landowners
                </a>
                <a href="#values" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-[#5AC2EB] transition-colors">
                  Our Values
                </a>
                <a href="#proof" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-[#5AC2EB] transition-colors">
                  Client Testimonials
                </a>
              </nav>
            </div>

            {/* Column 3 - Where We Build */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.25em] text-[#FDFCFC] uppercase mb-6 flex flex-col gap-2">
                LOCATIONS
                <div className="w-8 h-[2px] bg-[#5AC2EB]" />
              </h4>
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-white/65">
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#5AC2EB]" />
                  Gulshan, Dhaka
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#5AC2EB]" />
                  Banani, Dhaka
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#5AC2EB]" />
                  Dhanmondi, Dhaka
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#5AC2EB]" />
                  Bashundhara R/A, Dhaka
                </span>
              </div>
            </div>

            {/* Column 4 - Trust Badges Column */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.25em] text-[#FDFCFC] uppercase mb-6 flex flex-col gap-2">
                COUNT ON US
                <div className="w-8 h-[2px] bg-[#5AC2EB]" />
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-[#5AC2EB]/5 p-2 rounded-xl border border-white/5">
                  <Landmark size={18} className="text-[#5AC2EB] shrink-0" />
                  <div>
                    <h5 className="text-[11px] font-bold text-[#FDFCFC] tracking-normal uppercase">RAJUK Verified</h5>
                    <p className="text-[10px] text-white/50 font-sans">100% legal compliance always</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-[#5AC2EB]/5 p-2 rounded-xl border border-white/5">
                  <Scale size={18} className="text-[#5AC2EB] shrink-0" />
                  <div>
                    <h5 className="text-[11px] font-bold text-[#FDFCFC] tracking-normal uppercase">Zero Court Issues</h5>
                    <p className="text-[10px] text-white/50 font-sans">15 Years without litigation</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#5AC2EB]/5 p-2 rounded-xl border border-white/5">
                  <Hammer size={18} className="text-[#5AC2EB] shrink-0" />
                  <div>
                    <h5 className="text-[11px] font-bold text-[#FDFCFC] tracking-normal uppercase">55+ Landmarks</h5>
                    <p className="text-[10px] text-white/50 font-sans">Built with flawless delivery</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Back to top banner */}
        <div className="w-full flex justify-center pb-6">
          <button 
            onClick={handleScrollToTop}
            className="bg-white/5 hover:bg-[#5AC2EB]/20 text-[#5AC2EB] p-2.5 rounded-full border border-white/10 shadow-lg transition-all active:scale-95 flex items-center gap-1 text-xs uppercase font-semibold tracking-wider block cursor-pointer"
          >
            <ArrowUp size={14} /> Back to top
          </button>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="bg-black/25 text-[#FDFCFC]/40 text-xs py-5 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <span>
              © 2026 Aura Developments. Crafted with care in Dhaka, Bangladesh.
            </span>
            <div className="flex gap-4 font-normal">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span>·</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Use</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
