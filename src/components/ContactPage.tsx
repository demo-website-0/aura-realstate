import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Menu, Phone, Mail, Clock, MapPin, Car, Coffee, HelpCircle, 
  Check, Building2, MessageSquare, Landmark, Scale, ChevronDown, Sparkles
} from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: (audience: 'buyer' | 'landowner' | 'general') => void;
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
  onNavigateBuyers: () => void;
  onNavigateLandowners: () => void;
  onNavigateAbout: () => void;
}

type ContactPurpose = 'buyer' | 'landowner' | 'general';
type FaqCategory = 'buyer' | 'landowner';

export default function ContactPage({
  onOpenBooking,
  onNavigateHome,
  onNavigateProjects,
  onNavigateBuyers,
  onNavigateLandowners,
  onNavigateAbout
}: ContactPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<ContactPurpose>('buyer');
  
  // Contact Form States
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    neighborhood: 'Gulshan',
    readiness: 'Immediate',
    landLocation: '',
    landSize: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ States
  const [activeFaqCategory, setActiveFaqCategory] = useState<FaqCategory>('buyer');
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate real high-fidelity submission storing to state and resetting
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep state submitted so the user feels the success feedback.
    }, 400);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      neighborhood: 'Gulshan',
      readiness: 'Immediate',
      landLocation: '',
      landSize: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  const navLinks = [
    { name: 'Projects', onClick: onNavigateProjects },
    { name: 'For Buyers', onClick: onNavigateBuyers },
    { name: 'For Landowners', onClick: onNavigateLandowners },
    { name: 'About', onClick: onNavigateAbout },
    { name: 'Contact', isCurrent: true }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FAQs data
  const buyerFaqs = [
    {
      id: 1,
      q: 'Do you offer flexible payment plans?',
      a: 'Yes. We build payment plans around your timeline and budget. We will discuss this in detail during our first conversation.'
    },
    {
      id: 2,
      q: 'What areas do you build in?',
      a: 'We build exclusively in Dhaka\'s most premium neighbourhoods: Gulshan, Banani, Dhanmondi, and Bashundhara.'
    },
    {
      id: 3,
      q: 'What happens if you miss the handover date?',
      a: 'You receive a monthly penalty payment from us explicitly detailed in the contract. We have never had to pay it as we maintain a perfect on-time handover track record.'
    },
    {
      id:4,
      q: 'Are your buildings RAJUK approved?',
      a: 'Every single one. 100% RAJUK compliant, structurally sound, conforming strictly to the Bangladesh National Building Code.'
    },
    {
      id: 5,
      q: 'Do you manage the building after handover?',
      a: 'Yes. We handle post-handover property maintenance ourselves. Your building will retain its aesthetic value and prestige years from now.'
    },
    {
      id: 6,
      q: 'Can I visit an ongoing project?',
      a: 'Absolutely. Book a private visit with us and we\'ll gladly arrange a guided tour to one of our active building sites.'
    }
  ];

  const landownerFaqs = [
    {
      id: 11,
      q: 'How does the revenue sharing work?',
      a: 'We provide full financial transparency from day one. Revenue-sharing terms are transparently documented in the partnership agreement with absolutely no hidden deductions.'
    },
    {
      id: 12,
      q: 'How long does a typical project take?',
      a: 'It varies slightly depending on scale, but we provide a specific timeline before any agreement is signed — and we contractually stick to it.'
    },
    {
      id: 13,
      q: 'Will my title be fully clear?',
      a: 'Our legal team handles a complete title & compliance review before anything begins to ensure 100% legal clarity. Zero title disputes'
    },
    {
      id: 14,
      q: 'Can I bring my own engineer to inspect the construction?',
      a: 'We actually encourage it. Complete construction access, material test logsheets, and structural blueprints are available at any stage.'
    },
    {
      id: 15,
      q: 'What is the minimum land size you work with?',
      a: 'We assess each plot individually. Please reach out with your details and we\'ll check parameters in Gulshan, Banani, Dhanmondi, or Bashundhara.'
    },
    {
      id: 16,
      q: 'What happens to my land if the project is delayed?',
      a: 'The same penalty clause that applies to buyer handovers applies to land partnerships. Delay penalties are strictly documented and contractually guarded.'
    }
  ];

  const activeFaqs = activeFaqCategory === 'buyer' ? buyerFaqs : landownerFaqs;

  // Render contextual advice in form side
  const getContextualAdvice = () => {
    switch (selectedPurpose) {
      case 'buyer':
        return {
          icon: '🏠',
          title: 'Looking for an apartment?',
          text: 'We\'ll set up a private visit at your convenience and show you live luxury options matching your preferences.'
        };
      case 'landowner':
        return {
          icon: '🏗️',
          title: 'Considering a joint venture?',
          text: 'We\'ll put you in direct contact with a senior partner who specializes in premium Dhaka land partnerships.'
        };
      case 'general':
      default:
        return {
          icon: '💬',
          title: 'Have a general question?',
          text: 'We\'ll get back to you with all the required technical specifications or info within 2 business hours.'
        };
    }
  };

  const advice = getContextualAdvice();

  return (
    <div className="relative min-h-screen bg-[#FDFCFC]" id="contact-page-wrapper">
      
      {/* Soft header background indicator */}
      <header className="sticky top-0 z-40 w-full bg-[#2E3543]/95 backdrop-blur-xl border-b border-white/5 shadow-sm px-6 md:px-12 py-4" id="contact-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <button onClick={onNavigateHome} className="flex items-center gap-2 cursor-pointer text-left focus:outline-none">
            <span className="font-serif text-2xl font-bold text-white tracking-normal animate-fade-in">
              Aura <span className="font-light text-[#5AC2EB]">Developments</span>
            </span>
          </button>

          {/* Navigation link container */}
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
                    layoutId="activeNavIndicatorContact"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5AC2EB]" 
                  />
                </div>
              ) : (
                <button
                  key={link.name}
                  onClick={(e) => {
                    if (link.onClick) {
                      e.preventDefault();
                      link.onClick();
                    }
                  }}
                  className="text-sm font-medium text-white/70 hover:text-[#5AC2EB] tracking-wider transition-colors cursor-pointer focus:outline-none"
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Navigation Action Button */}
          <div className="hidden md:block">
            <button
              onClick={() => onOpenBooking('general')}
              className="bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/95 tracking-wider text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-[#5AC2EB]/10 cursor-pointer focus:outline-none"
              id="header-consult-btn-contact"
            >
              Schedule Consultation
            </button>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1.5 focus:outline-none"
            id="mobile-menu-contact-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation overlay */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-6 right-6 mt-2 p-6 bg-[#2E3543]/98 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/10 z-50 md:hidden"
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
                onOpenBooking('general');
              }}
              className="w-full bg-[#5AC2EB] text-[#2E3543] font-bold text-sm tracking-wider uppercase py-3 rounded-xl shadow-lg focus:outline-none"
            >
              Consult with dynamic partner
            </button>
          </motion.div>
        )}
      </header>

      {/* SECTION 1: Page Hero — "Let's Talk" */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-[#FDFCFC] py-16 px-6 md:px-12 overflow-hidden" id="contact-hero">
        
        {/* Subtle physical maps birds-eye pattern backdrop */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="text-[#5AC2EB]">
            <defs>
              <pattern id="city-pattern-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="40" cy="40" r="1.5" fill="currentColor" />
                <path d="M 0 40 L 80 40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
                <path d="M 40 0 L 40 80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#city-pattern-grid)" />
          </svg>
        </div>

        {/* Ambient background blur */}
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#5AC2EB]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          
          <span className="text-[11px] font-semibold text-[#5AC2EB] tracking-[0.35em] uppercase block">
            WE'D LOVE TO HEAR FROM YOU
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-[72px] font-serif font-bold text-[#2E3543] leading-[1.05] tracking-tight">
            Let's start a <br className="hidden sm:inline" /><span className="italic font-normal text-[#5AC2EB]">great conversation.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[18px] text-[#2E3543]/65 font-sans leading-[1.7] max-w-3xl mx-auto">
            Whether you're ready to buy, curious about a project, or thinking about what to do with your land — we're here. No scripts. No call centers. Just real people who actually want to help.
          </p>

          {/* Quick Contact Row in a elegant frosted glassmorphism horizontal strip */}
          <div className="max-w-2xl mx-auto pt-4" id="quick-contact-container">
            <div className="bg-white/80 backdrop-blur-md border border-[#5AC2EB]/25 rounded-2xl p-4 md:py-4 md:px-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100" id="contact-quick-strip">
              
              {/* Item 1: Phone */}
              <a 
                href="tel:+8801711555555" 
                className="w-full md:w-auto py-2 md:py-0 md:px-4 flex items-center justify-center gap-2.5 group cursor-pointer hover:opacity-80 transition-all text-[#2E3543]"
              >
                <div className="w-8 h-8 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Phone size={15} />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-[#2E3543]/45 uppercase font-sans tracking-wide">Call Directly</span>
                  <span className="font-sans font-semibold text-sm md:text-sm text-[#2E3543]">+880 1711-555555</span>
                </div>
              </a>

              {/* Item 2: Email */}
              <a 
                href="mailto:hello@auradevelopments.com" 
                className="w-full md:w-auto pt-3 md:pt-0 py-2 md:py-0 md:px-6 flex items-center justify-center gap-2.5 group cursor-pointer hover:opacity-80 transition-all text-[#2E3543]"
              >
                <div className="w-8 h-8 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Mail size={15} />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-[#2E3543]/45 uppercase font-sans tracking-wide">Email Us</span>
                  <span className="font-sans font-semibold text-sm md:text-sm text-[#5AC2EB]">hello@auradevelopments.com</span>
                </div>
              </a>

              {/* Item 3: Hours */}
              <div className="w-full md:w-auto pt-3 md:pt-0 py-2 md:py-0 md:px-4 flex items-center justify-center gap-2.5 text-[#2E3543]/50 cursor-default">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <Clock size={15} />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-[#2E3543]/45 uppercase font-sans tracking-wide">Working Hours</span>
                  <span className="font-sans font-medium text-xs md:text-xs text-[#2E3543]/70">Sat – Thu, 9am – 7pm</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Main Contact Form — "Tell Us What's On Your Mind" */}
      <section className="relative py-20 bg-[#FDFCFC]" id="contact-form-section">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contextual copy (45% Width) */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-[36px] font-serif font-bold text-[#2E3543] leading-tight">
                We're easier to reached <br />than you think.
              </h2>
              <p className="text-base text-[#2E3543]/70 font-sans leading-relaxed">
                Pick what brings you here and fill in the details. We'll get back to you personally — usually within 2 hours on business days with proper blueprints and solutions.
              </p>
            </div>

            {/* office details contact card */}
            <div className="bg-[#2E3543]/4 border border-[#2E3543]/10 rounded-2xl p-6 space-y-4" id="address-block">
              <div className="flex items-center gap-3 text-[#2E3543]">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/15 flex items-center justify-center text-[#5AC2EB]">
                  <Building2 size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2E3543]">Aura Developments HQ</h4>
                  <p className="text-xs text-[#2E3543]/50">Authorized real-estate registration no: DL-4089</p>
                </div>
              </div>

              <div className="h-[1px] bg-[#2E3543]/5" />

              <div className="space-y-3.5 text-sm font-sans text-[#2E3543]/70">
                <p className="flex items-start gap-2">
                  <MapPin size={16} className="text-[#5AC2EB] shrink-0 mt-0.5" />
                  <span>Nafi Tower, Level 11, Gulshan Circle 2, Dhaka 1212, Bangladesh</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} className="text-[#5AC2EB] shrink-0" />
                  <span>+880 1711-555555 (Front desk)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={16} className="text-[#5AC2EB] shrink-0" />
                  <span>concierge@auradevelopments.com</span>
                </p>
              </div>
            </div>

            {/* Selected feedback advice box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPurpose}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#5AC2EB]/5 border-l-4 border-[#5AC2EB] rounded-r-xl p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{advice.icon}</span>
                  <h5 className="font-serif font-bold text-[#2E3543] text-sm">{advice.title}</h5>
                </div>
                <p className="text-xs text-[#2E3543]/65 mt-2 leading-relaxed font-sans pl-8">
                  {advice.text}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Right Column: Contact Form Panel (55% Width) */}
          <div className="lg:col-span-7">
            
            <div className="bg-white border border-[#5AC2EB]/30 rounded-[28px] p-6 md:p-10 shadow-lg relative" id="contact-form-card">
              
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center space-y-6 flex flex-col items-center justify-center"
                    id="success-layout"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#5AC2EB]/25 flex items-center justify-center text-[#5AC2EB] animate-bounce">
                      <Check size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-[#2E3543]">Thank You, {formData.name || 'Friend'}!</h3>
                      <p className="text-sm font-sans text-[#2E3543]/70 max-w-md mx-auto leading-relaxed">
                        Your message regarding <span className="font-semibold text-[#5AC2EB]">{selectedPurpose === 'buyer' ? 'buying an apartment' : selectedPurpose === 'landowner' ? 'a joint venture partnership' : 'general inquiries'}</span> has been submitted successfully.
                      </p>
                    </div>
                    <div className="bg-[#2E3543]/4 p-4 rounded-xl text-xs text-left max-w-sm space-y-1 font-mono text-[#2E3543]/80 border border-gray-100">
                      <div className="font-bold text-[#5AC2EB]">SUBMISSION ID: #AURA-{Math.floor(Math.random() * 900000 + 100000)}</div>
                      <div>Response ETA: Within 2 hours directly from direct managers.</div>
                    </div>
                    <button
                      onClick={resetForm}
                      className="text-[#5AC2EB] underline hover:text-[#5AC2EB]/80 font-sans font-semibold text-sm cursor-pointer"
                    >
                      ← Send another message or change topic
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    
                    <div className="space-y-2">
                      <span className="text-[11px] font-semibold tracking-wider text-[#5AC2EB] uppercase font-sans">
                        WHAT CAN WE HELP YOU WITH?
                      </span>
                      
                      {/* Interactive Radio Pills Selector */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="purpose-selectors">
                        
                        <button
                          type="button"
                          onClick={() => setSelectedPurpose('buyer')}
                          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer focus:outline-none ${selectedPurpose === 'buyer' ? 'bg-[#5AC2EB] border-[#5AC2EB] text-[#2E3543] shadow-md shadow-[#5AC2EB]/15' : 'bg-[#FDFCFC] border-[#2E3543]/15 text-[#2E3543]/60 hover:border-[#5AC2EB]/40'}`}
                        >
                          <span>🏠</span>
                          <span>Looking to Buy</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedPurpose('landowner')}
                          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer focus:outline-none ${selectedPurpose === 'landowner' ? 'bg-[#5AC2EB] border-[#5AC2EB] text-[#2E3543] shadow-md shadow-[#5AC2EB]/15' : 'bg-[#FDFCFC] border-[#2E3543]/15 text-[#2E3543]/60 hover:border-[#5AC2EB]/40'}`}
                        >
                          <span>🏗️</span>
                          <span>Develop Land</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedPurpose('general')}
                          className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer focus:outline-none ${selectedPurpose === 'general' ? 'bg-[#5AC2EB] border-[#5AC2EB] text-[#2E3543] shadow-md shadow-[#5AC2EB]/15' : 'bg-[#FDFCFC] border-[#2E3543]/15 text-[#2E3543]/60 hover:border-[#5AC2EB]/40'}`}
                        >
                          <span>💬</span>
                          <span>General Query</span>
                        </button>

                      </div>
                    </div>

                    <div className="h-[1px] bg-gray-100" />

                    {/* Standard Fields */}
                    <div className="space-y-4">
                      
                      <div>
                        <label className="block text-xs font-semibold text-[#2E3543]/60 uppercase font-sans mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Kazi Aura"
                          className="w-full text-sm font-sans h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5AC2EB] transition-all bg-[#FDFCFC]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        <div>
                          <label className="block text-xs font-semibold text-[#2E3543]/60 uppercase font-sans mb-1.5">
                            Your Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+880 17"
                            className="w-full text-sm font-sans h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5AC2EB] transition-all bg-[#FDFCFC]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#2E3543]/60 uppercase font-sans mb-1.5">
                            Your Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="you@email.com"
                            className="w-full text-sm font-sans h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5AC2EB] transition-all bg-[#FDFCFC]"
                          />
                        </div>

                      </div>

                    </div>

                    {/* Conditional Fields layout */}
                    <div className="overflow-hidden">
                      <AnimatePresence mode="wait">
                        
                        {/* BUYER CONDITIONAL */}
                        {selectedPurpose === 'buyer' && (
                          <motion.div
                            key="buyer-cond"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 py-2"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-[#2E3543]/60 uppercase font-sans mb-1.5">
                                  Which Neighborhood?
                                </label>
                                <select
                                  name="neighborhood"
                                  value={formData.neighborhood}
                                  onChange={handleInputChange}
                                  className="w-full text-sm font-sans h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5AC2EB] transition-all bg-[#FDFCFC]"
                                >
                                  <option value="Gulshan">Gulshan</option>
                                  <option value="Banani">Banani</option>
                                  <option value="Dhanmondi">Dhanmondi</option>
                                  <option value="Bashundhara">Bashundhara R/A</option>
                                  <option value="Uttara">Uttara</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-[#2E3543]/60 uppercase font-sans mb-1.5">
                                  How soon are you looking?
                                </label>
                                <select
                                  name="readiness"
                                  value={formData.readiness}
                                  onChange={handleInputChange}
                                  className="w-full text-sm font-sans h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5AC2EB] transition-all bg-[#FDFCFC]"
                                >
                                  <option value="Immediate">Immediate (Within 3 months)</option>
                                  <option value="Mid-Term">Mid-term (6-12 months)</option>
                                  <option value="Long-Term">Long-term (Planning phase)</option>
                                </select>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* LANDOWNER CONDITIONAL */}
                        {selectedPurpose === 'landowner' && (
                          <motion.div
                            key="landowner-cond"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 py-2"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-[#2E3543]/60 uppercase font-sans mb-1.5">
                                  Land Location *
                                </label>
                                <input
                                  type="text"
                                  name="landLocation"
                                  required
                                  value={formData.landLocation}
                                  onChange={handleInputChange}
                                  placeholder="e.g. Gulshan 2, Road 79"
                                  className="w-full text-sm font-sans h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5AC2EB] transition-all bg-[#FDFCFC]"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-[#2E3543]/60 uppercase font-sans mb-1.5">
                                  Approximate Land Size *
                                </label>
                                <input
                                  type="text"
                                  name="landSize"
                                  required
                                  value={formData.landSize}
                                  onChange={handleInputChange}
                                  placeholder="e.g. 5.5 Katha"
                                  className="w-full text-sm font-sans h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5AC2EB] transition-all bg-[#FDFCFC]"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* GENERAL CONDITIONAL */}
                        {selectedPurpose === 'general' && (
                          <motion.div
                            key="general-cond"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 py-2"
                          >
                            <div>
                              <label className="block text-xs font-semibold text-[#2E3543]/60 uppercase font-sans mb-1.5">
                                What's on your mind? *
                              </label>
                              <textarea
                                name="message"
                                required
                                rows={3}
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell us how we can help..."
                                className="w-full text-sm font-sans p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#5AC2EB] transition-all bg-[#FDFCFC]"
                              />
                            </div>
                          </motion.div>
                        )}

                      </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#5AC2EB] hover:bg-[#5AC2EB]/95 text-[#2E3543] font-sans font-bold tracking-widest text-sm uppercase h-14 rounded-xl shadow-lg shadow-[#5AC2EB]/15 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      Send My Message →
                    </button>

                    {/* Privacy Note */}
                    <p className="text-center text-xs font-sans text-[#2E3543]/45 leading-relaxed">
                      We'll never share your details. Not with anyone. Not ever. <br />
                      Read our strictly compliant privacy policy guarantee.
                    </p>

                  </form>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: Office Map & Visit Info — "Know Where to Find Us" */}
      <section className="relative bg-[#2E3543] overflow-hidden" id="office-map-details">
        
        {/* Custom Visual Vector Map of Gulshan 2 - Dhaka */}
        <div className="w-full h-[400px] relative bg-[#2E3543] border-b border-white/5 overflow-hidden" id="neighborhood-vector-map">
          
          {/* Aesthetic grid overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="dark-map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5AC2EB" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dark-map-grid)" />
            </svg>
          </div>

          {/* Dhaka Gulshan 2 Architectural Map illustration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <svg viewBox="0 0 1000 400" className="w-full h-full text-[#5AC2EB]/15 max-w-7xl mx-auto px-6" fill="none">
              
              {/* Lake representation right and left */}
              <path d="M50 350 C 150 300, 200 200, 220 100 C 230 50, 190 20, 250 10" stroke="#5AC2EB" strokeWidth="4" strokeDasharray="3,3" opacity="0.3" id="gulshan-lake-vect" />
              <text x="80" y="240" fill="#5AC2EB" opacity="0.4" className="font-sans text-[10px] uppercase tracking-widest font-bold">GULSHAN LAKE</text>
              
              {/* Lake branch right */}
              <path d="M950 50 C 850 100, 800 220, 780 320" stroke="#5AC2EB" strokeWidth="3" opacity="0.2" />

              {/* Major avenues roads */}
              <line x1="300" y1="0" x2="300" y2="400" stroke="#5AC2EB" strokeWidth="4" opacity="0.4" id="gulshan-ave-line" />
              <text x="312" y="50" fill="#5AC2EB" opacity="0.5" className="font-sans text-[9px] uppercase tracking-wide font-bold">GULSHAN AVENUE</text>

              <line x1="0" y1="200" x2="1000" y2="200" stroke="#5AC2EB" strokeWidth="3" opacity="0.3" />
              <text x="600" y="190" fill="#5AC2EB" opacity="0.5" className="font-sans text-[9px] uppercase tracking-wide font-bold">MADANI AVENUE</text>

              <line x1="750" y1="0" x2="750" y2="400" stroke="#5AC2EB" strokeWidth="1.5" opacity="0.2" />
              <text x="760" y="280" fill="#5AC2EB" opacity="0.3" className="font-sans text-[8px] uppercase tracking-wide">PRAGATI SARANI</text>

              {/* Minor connect roads */}
              <line x1="100" y1="120" x2="500" y2="120" stroke="#5AC2EB" strokeWidth="1" strokeDasharray="4,4" opacity="0.2" />
              <text x="120" y="112" fill="#FDFCFC" opacity="0.25" className="font-sans text-[8px]">Road 79</text>

              <line x1="200" y1="280" x2="600" y2="280" stroke="#5AC2EB" strokeWidth="1" strokeDasharray="4,4" opacity="0.2" />
              <text x="220" y="272" fill="#FDFCFC" opacity="0.25" className="font-sans text-[8px]">Road 90</text>

              {/* Main Gulshan 2 roundabout node */}
              <circle cx="300" cy="200" r="30" stroke="#5AC2EB" strokeWidth="2" fill="#2E3543" opacity="0.8" />
              <circle cx="300" cy="200" r="12" fill="#5AC2EB" opacity="0.15" />
              <text x="300" y="203" fill="#5AC2EB" className="font-sans text-[8px] tracking-widest text-center" textAnchor="middle">CIRCLE 2</text>

              {/* Neighboring elements labels */}
              <text x="440" y="60" fill="#FDFCFC" opacity="0.2" className="font-sans text-[9px] uppercase tracking-widest">GULSHAN 2 RESIDENTIAL</text>
              <text x="210" y="370" fill="#FDFCFC" opacity="0.2" className="font-sans text-[9px] uppercase tracking-widest">GULSHAN 1</text>
              <text x="610" y="100" fill="#FDFCFC" opacity="0.15" className="font-sans text-[9px] uppercase tracking-widest">BARIDHARA DOHS</text>

            </svg>
          </div>

          {/* Interactive Absolute Pin point location info overlay */}
          <div className="absolute top-[35%] left-[55%] md:top-[38%] md:left-[45%] z-20 translate-x-[-50%] translate-y-[-50%]" id="location-ping-node">
            
            {/* Pulsating radar map waves */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#5AC2EB]/20 border border-[#5AC2EB] animate-ping opacity-60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#5AC2EB]/30 border border-[#5AC2EB]/40 animate-pulse" />

            <div className="bg-[#2E3543] border border-[#5AC2EB] rounded-2xl p-4 shadow-xl flex items-center gap-3 w-[260px] relative">
              <div className="w-10 h-10 rounded-xl bg-[#5AC2EB] flex items-center justify-center text-[#2E3543] shrink-0 font-bold shadow-md">
                A
              </div>
              <div className="text-left">
                <h5 className="font-serif text-sm font-bold text-[#FDFCFC]">AURA DEVELOPMENTS</h5>
                <p className="text-[10px] text-white/50 leading-relaxed font-sans mt-0.5">Nafi Tower, Level 11, Gulshan Circle 2</p>
                <div className="flex items-center gap-1 mt-1 text-[9px] text-[#5AC2EB] font-bold">
                  <span>GPS: 23.7925° N, 90.4154° E</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Guide Marker */}
          <div className="absolute bottom-4 left-6 z-20 bg-[#2E3543]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-[10px] text-white/60 font-sans tracking-wide cursor-default">
            📍 HIGH-FIDELITY VECTOR NEIGHBORHOOD MAP
          </div>

        </div>

        {/* 3 Column Info Strip Sits flush below the map */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-white divide-y md:divide-y-0 md:divide-x divide-white/10 grid grid-cols-1 md:grid-cols-3" id="map-strip-columns">
          
          {/* Column 1 */}
          <div className="py-8 md:py-4 md:px-10 text-center md:text-left flex flex-col items-center md:items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
              <MapPin size={20} strokeWidth={1.5} />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-lg font-bold text-[#FDFCFC]">Our Office</h4>
              <p className="text-sm text-[#FDFCFC]/65 font-sans leading-relaxed">
                Nafi Tower, Level 11, Block CES(A), <br />Gulshan Circle 2, Dhaka 1212
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="py-8 md:py-4 md:px-10 text-center md:text-left flex flex-col items-center md:items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
              <Car size={20} strokeWidth={1.5} />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-lg font-bold text-[#FDFCFC]">Parking</h4>
              <p className="text-sm text-[#FDFCFC]/65 font-sans leading-relaxed">
                Complimentary visitor parking available directly in our underground levels. Just prompt our guards at entry.
              </p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="py-8 md:py-4 md:px-10 text-center md:text-left flex flex-col items-center md:items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
              <Coffee size={20} strokeWidth={1.5} />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-lg font-bold text-[#FDFCFC]">When You Arrive</h4>
              <p className="text-sm text-[#FDFCFC]/65 font-sans leading-relaxed">
                No formal lobby, or rigid clipboard sign-ins. Just a fresh cup of specialty coffee and a partner genuinely happy to help.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 4: FAQ — "Quick Answers to Common Questions" */}
      <section className="relative py-24 bg-[#FDFCFC] border-b border-gray-100" id="contact-faqs">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Headline block */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] font-semibold text-[#5AC2EB] tracking-[0.3em] uppercase block">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-serif font-bold text-[#2E3543] leading-tight">
              You probably have questions. <br />We definitely have answers.
            </h2>
            <div className="w-10 h-[2px] bg-[#5AC2EB] mx-auto pt-1" />
          </div>

          {/* Category switcher styled after landowners concerns / listings tabs */}
          <div className="flex justify-center mb-12" id="faq-picker-wrapper">
            <div className="inline-flex bg-[#2E3543]/5 p-1.5 rounded-2xl border border-gray-200 shadow-inner">
              
              <button
                onClick={() => { setActiveFaqCategory('buyer'); setExpandedFaqId(null); }}
                className={`px-8 py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${activeFaqCategory === 'buyer' ? 'bg-[#2E3543] text-white shadow-md' : 'text-[#2E3543]/65 hover:text-[#2E3543]'}`}
              >
                For Buyers
              </button>

              <button
                onClick={() => { setActiveFaqCategory('landowner'); setExpandedFaqId(null); }}
                className={`px-8 py-3 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer focus:outline-none ${activeFaqCategory === 'landowner' ? 'bg-[#2E3543] text-white shadow-md' : 'text-[#2E3543]/65 hover:text-[#2E3543]'}`}
              >
                For Landowners
              </button>

            </div>
          </div>

          {/* 2-Column Accordion Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2" id="faqs-accordion-grid">
            
            {/* Left Column (items 1 - 3) */}
            <div className="space-y-4">
              {activeFaqs.slice(0, 3).map((faq) => {
                const isOpen = expandedFaqId === faq.id;
                return (
                  <div key={faq.id} className="border-b border-[#2E3543]/10 pb-4">
                    <button
                      onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                      className="w-full text-left py-4 flex items-center justify-between text-[#2E3543] hover:text-[#5AC2EB] transition-colors focus:outline-none cursor-pointer"
                    >
                      <span className="font-sans font-semibold text-sm sm:text-base leading-relaxed pr-4">
                        {faq.q}
                      </span>
                      <span className="shrink-0 text-lg font-bold text-[#5AC2EB]">
                        {isOpen ? '—' : '+'}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-[#2E3543]/65 font-sans leading-relaxed pb-4 pr-6">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right Column (items 4 - 6) */}
            <div className="space-y-4">
              {activeFaqs.slice(3, 6).map((faq) => {
                const isOpen = expandedFaqId === faq.id;
                return (
                  <div key={faq.id} className="border-b border-[#2E3543]/10 pb-4">
                    <button
                      onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                      className="w-full text-left py-4 flex items-center justify-between text-[#2E3543] hover:text-[#5AC2EB] transition-colors focus:outline-none cursor-pointer"
                    >
                      <span className="font-sans font-semibold text-sm sm:text-base leading-relaxed pr-4">
                        {faq.q}
                      </span>
                      <span className="shrink-0 text-lg font-bold text-[#5AC2EB]">
                        {isOpen ? '—' : '+'}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-[#2E3543]/65 font-sans leading-relaxed pb-4 pr-6">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER component matching design guidelines */}
      <footer className="relative bg-[#2E3543] text-white pt-20 overflow-hidden" id="contact-footer">
        
        {/* Top 2px color gradient accent rule */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#5AC2EB] to-transparent absolute top-0 left-0" />

        {/* Global navigation menu */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold tracking-tight">
                Aura <span className="font-light text-[#5AC2EB]">Developments</span>
              </h3>
              <p className="text-xs sm:text-sm font-sans italic text-white/65 leading-relaxed">
                "Beautiful spaces. On-time handovers. Zero headaches. We build spaces that deserve your life."
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.25em] text-[#FDFCFC] uppercase mb-6 flex flex-col gap-2">
                EXPLORE
                <div className="w-8 h-[2px] bg-[#5AC2EB]" />
              </h4>
              <nav className="flex flex-col gap-3 text-xs sm:text-sm text-white/65">
                <button onClick={onNavigateProjects} className="text-left hover:text-[#5AC2EB] transition-colors cursor-pointer focus:outline-none">
                  Our Projects
                </button>
                <button onClick={onNavigateBuyers} className="text-left hover:text-[#5AC2EB] transition-colors cursor-pointer focus:outline-none">
                  For Buyers
                </button>
                <button onClick={onNavigateLandowners} className="text-left hover:text-[#5AC2EB] transition-colors cursor-pointer focus:outline-none">
                  For Landowners
                </button>
                <button onClick={onNavigateAbout} className="text-left hover:text-[#5AC2EB] transition-colors cursor-pointer focus:outline-none">
                  About Aura
                </button>
              </nav>
            </div>

            {/* Column 3 */}
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

            {/* Column 4 */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.25em] text-[#FDFCFC] uppercase mb-6 flex flex-col gap-2">
                COUNT ON US
                <div className="w-8 h-[2px] bg-[#5AC2EB]" />
              </h4>
              <div className="space-y-4 text-xs font-sans text-white/70">
                <div className="flex items-center gap-2 bg-[#5AC2EB]/5 p-2 rounded-lg">
                  <Landmark size={15} className="text-[#5AC2EB]" />
                  <span>RAJUK Certified structural safety standards.</span>
                </div>
                <div className="flex items-center gap-2 bg-[#5AC2EB]/5 p-2 rounded-lg">
                  <Scale size={15} className="text-[#5AC2EB]" />
                  <span>Zero litigation or court delays.</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Aura Developments Ltd. All rights reserved.</p>
            <p className="font-mono text-[10px]">CRAFTED TO EXALT GULSHAN & BANANI HERITAGE</p>
          </div>
        </div>

      </footer>

    </div>
  );
}
