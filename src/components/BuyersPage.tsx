import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Menu, Star, Shield, ShieldCheck, MapPin, Clock, Calendar, Check, 
  Leaf, Cpu, Car, Phone, User, Key, Coins, Eye, Compass, Heart, 
  ChevronLeft, ChevronRight, FileText, Settings, Sparkles, Building2,
  Mail, Hammer, PenTool, CheckCircle2
} from 'lucide-react';

interface BuyersPageProps {
  onOpenBooking: (audience: 'buyer' | 'landowner' | 'general') => void;
  onSelectProject: (projectName: string) => void;
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
  onNavigateLandowners?: () => void;
  onNavigateContact?: () => void;
  onNavigateAbout?: () => void;
}

interface ApartmentListing {
  projectName: string;
  badge: 'AVAILABLE NOW' | 'LAST 2 UNITS';
  beds: number;
  baths: number;
  sizeSqFt: number;
  floorInfo: string;
  features: string[];
  priceRange: string;
}

export default function BuyersPage({ 
  onOpenBooking, 
  onSelectProject, 
  onNavigateHome, 
  onNavigateProjects,
  onNavigateLandowners,
  onNavigateContact,
  onNavigateAbout
}: BuyersPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Neighborhood tab selection: Gulshan, Banani, Dhanmondi, Bashundhara
  const [activeTab, setActiveTab ] = useState<'Gulshan' | 'Banani' | 'Dhanmondi' | 'Bashundhara'>('Gulshan');
  
  // Testimonial Carousel status
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Form states for Section 6 Inline CTA
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    neighbourhood: 'Gulshan',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Scroll position indicator
  const navLinks = [
    { name: 'Projects', onClick: onNavigateProjects, href: '#' },
    { name: 'For Buyers', isCurrent: true, href: '#' },
    { name: 'For Landowners', onClick: onNavigateLandowners, href: '#' },
    { name: 'About', onClick: onNavigateAbout, href: '#' },
    { name: 'Contact', onClick: onNavigateContact, href: '#' },
  ];

  // Specific high-fidelity Apartment Listings matching real projects
  const apartmentDatabase = useMemo<Record<'Gulshan' | 'Banani' | 'Dhanmondi' | 'Bashundhara', ApartmentListing[]>>(() => ({
    Gulshan: [
      {
        projectName: 'Aura Skyline One',
        badge: 'LAST 2 UNITS',
        beds: 3,
        baths: 4,
        sizeSqFt: 2850,
        floorInfo: 'Floor 9 of 12 · Corner Unit · Skyline Reservoir',
        features: ['🌿 Green Terrace', '💡 Smart Home', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 4.2 Cr',
      },
      {
        projectName: 'Aura Glass Residences',
        badge: 'AVAILABLE NOW',
        beds: 4,
        baths: 5,
        sizeSqFt: 4600,
        floorInfo: 'Floor 11 of 14 · Penthouse Unit · Panoramic Lake View',
        features: ['🏊 Temperature Pool', '💡 Smart Home', '🚗 3 Parking'],
        priceRange: 'Starting from BDT 6.8 Cr',
      },
      {
        projectName: 'Aura Prestige Heights',
        badge: 'AVAILABLE NOW',
        beds: 3,
        baths: 3.5,
        sizeSqFt: 3950,
        floorInfo: 'Floor 5 of 10 · Garden Overlook · Park Avenue View',
        features: ['🏛️ travertine limestone', '🛡️ Acoustic Isolation', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 5.2 Cr',
      },
      {
        projectName: 'Aura Skyline One',
        badge: 'LAST 2 UNITS',
        beds: 3,
        baths: 4,
        sizeSqFt: 2400,
        floorInfo: 'Floor 6 of 12 · Mid-rise Premium · Skyline Reservoir View',
        features: ['🌿 Green Terrace', '💡 Smart Home', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 3.6 Cr',
      },
    ],
    Banani: [
      {
        projectName: 'Aura Terrace Living',
        badge: 'LAST 2 UNITS',
        beds: 3,
        baths: 4,
        sizeSqFt: 3100,
        floorInfo: 'Floor 8 of 11 · Staggered Sky-Terrace · Personal Pool',
        features: ['🌿 Double Cantilever', '🏊 Splash Pool', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 4.8 Cr',
      },
      {
        projectName: 'Aura Blanc',
        badge: 'AVAILABLE NOW',
        beds: 4,
        baths: 4.5,
        sizeSqFt: 4100,
        floorInfo: 'Floor 7 of 9 · Monolithic Suite · Atrium Facing',
        features: ['🏛️ Signature Travertine', '🧥 Custom Suite Wardrobe', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 5.5 Cr',
      },
      {
        projectName: 'Aura Terrace Living',
        badge: 'AVAILABLE NOW',
        beds: 3,
        baths: 3.5,
        sizeSqFt: 2800,
        floorInfo: 'Floor 4 of 11 · Sky-Garden Pocket · Quiet Lane View',
        features: ['🌿 Pocket Gardens', '💡 Central Reverse-Osmosis', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 4.2 Cr',
      },
      {
        projectName: 'Aura Blanc',
        badge: 'LAST 2 UNITS',
        beds: 3,
        baths: 3.5,
        sizeSqFt: 3450,
        floorInfo: 'Floor 3 of 9 · Travertine Suite · Quiet Mews View',
        features: ['🏛️ Signature Travertine', '🔌 Centralized VRF Air', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 4.5 Cr',
      },
    ],
    Dhanmondi: [
      {
        projectName: 'Aura Garden Residences',
        badge: 'LAST 2 UNITS',
        beds: 3,
        baths: 4,
        sizeSqFt: 3200,
        floorInfo: 'Floor 6 of 8 · Botanical Terrace · South facing',
        features: ['🌿 Cantilever Planters', '💧 Bio Greywater Drips', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 3.8 Cr',
      },
      {
        projectName: 'Aura Park View',
        badge: 'AVAILABLE NOW',
        beds: 3,
        baths: 3,
        sizeSqFt: 3600,
        floorInfo: 'Floor 5 of 7 · Verandah Overlook · Lake & Park Vista',
        features: ['🌅 270-Degree Verandah', '☀️ Solar Rooftop Charging', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 4.2 Cr',
      },
      {
        projectName: 'Aura Garden Residences',
        badge: 'AVAILABLE NOW',
        beds: 3,
        baths: 3.5,
        sizeSqFt: 2650,
        floorInfo: 'Floor 4 of 8 · Living Vertical Oasis · Courtyard',
        features: ['🌿 Subterranean Hydration', '🛡️ Biometric Security', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 3.1 Cr',
      },
      {
        projectName: 'Aura Park View',
        badge: 'LAST 2 UNITS',
        beds: 3,
        baths: 3.5,
        sizeSqFt: 3100,
        floorInfo: 'Floor 2 of 7 · Cozy Low-rise Suite · Quiet Mews View',
        features: ['🏛️ Clay-Tile Accent', '🌿 Roof Organic Farm', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 3.5 Cr',
      },
    ],
    Bashundhara: [
      {
        projectName: 'Aura Serenity',
        badge: 'AVAILABLE NOW',
        beds: 3,
        baths: 4,
        sizeSqFt: 3420,
        floorInfo: 'Floor 6 of 10 · High Smart Suite · Silent block D',
        features: ['💡 KNX Wired Backbone', '🔇 Noise-Isolated Glass', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 2.6 Cr',
      },
      {
        projectName: 'Aura Grand',
        badge: 'AVAILABLE NOW',
        beds: 4,
        baths: 5,
        sizeSqFt: 4500,
        floorInfo: 'Floor 12 of 13 · Double Seismic Sky-Suite · Block I',
        features: ['🛡️ Heavy-Frame Concrete', '🔥 Automated Sprinkler', '🚗 3 Parking'],
        priceRange: 'Starting from BDT 3.9 Cr',
      },
      {
        projectName: 'Aura Serenity',
        badge: 'LAST 2 UNITS',
        beds: 3,
        baths: 2.98,
        sizeSqFt: 2980,
        floorInfo: 'Floor 3 of 10 · Soundproof Gardenflat · Low-traffic lane',
        features: ['💡 App-controlled Living', '🔇 Mudroom Entryway', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 2.2 Cr',
      },
      {
        projectName: 'Aura Grand',
        badge: 'LAST 2 UNITS',
        beds: 3,
        baths: 3.5,
        sizeSqFt: 3800,
        floorInfo: 'Floor 5 of 13 · Grand Lobby Overlook · Private Foyer',
        features: ['🏢 Double Height Entry', '🚨 24/7 Security HUD', '🚗 2 Parking'],
        priceRange: 'Starting from BDT 3.2 Cr',
      },
    ],
  }), []);

  // Professional real buyer reviews specifically addressing anxieties
  const testimonials = useMemo(() => [
    {
      quote: "I've been burned by a developer before. Late handover, legal issues, the works. With Aura it was the complete opposite. They handed over my apartment on the exact date written in the contract. My lawyer was genuinely impressed with the documentation.",
      author: "Rashid A.",
      unit: "3-Bed Apartment, Aura Skyline One, Gulshan",
    },
    {
      quote: "The apartment is stunning — but honestly, what got me was how much natural light comes in. I didn't expect that from a Dhaka apartment. And the smart features aren't gimmicky — they actually make mornings easier.",
      author: "Priya M.",
      unit: "2-Bed Apartment, Aura Blanc, Banani",
    },
    {
      quote: "Our family lived in a rented flat for 11 years waiting for the 'right time.' When we finally decided, a friend recommended Aura without hesitation. Best decision we ever made. Moved in exactly on schedule.",
      author: "The Chowdhury Family",
      unit: "4-Bed Apartment, Aura Garden Residences, Dhanmondi",
    },
    {
      quote: "I was skeptical about the post-handover management claim. Two years later, the building looks immaculate. The common areas are maintained like it's still day one. I've never seen that from a developer before.",
      author: "Tanvir H.",
      unit: "3-Bed Apartment, Aura Grand, Bashundhara",
    },
  ], []);

  // Form submission handler for Section 6 minimalist block
  const handleInlineFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormLoading(true);

    setTimeout(() => {
      const generatedId = `AURA-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);

      // Save to localStorage so it integrates with Aura general bookings engine
      const existingBookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
      const newBooking = {
        name: formData.name,
        email: `${formData.name.toLowerCase().replace(/\s+/g, '')}@prive.com`,
        phone: formData.phone,
        preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days dynamic
        preferredTime: '16:00',
        message: `Registered interest from inline buyers page for neighbourhood: ${formData.neighbourhood}`,
        audienceType: 'buyer',
        id: generatedId,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('aura_bookings', JSON.stringify([...existingBookings, newBooking]));

      setFormLoading(false);
      setFormSubmitted(true);
    }, 1000);
  };

  const currentTestimonial = testimonials[testimonialIndex];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCFC]" id="buyers-page-wrapper">
      
      {/* Fixed top scroll pulse indicator line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#5AC2EB]/30 z-50 pointer-events-none">
        <div className="h-full bg-[#5AC2EB] w-4/5 animate-[pulse_2s_infinite]" />
      </div>

      {/* Header element consistent with Projects page */}
      <header className="sticky top-0 z-40 w-full bg-[#FDFCFC]/95 backdrop-blur-xl border-b border-[#5AC2EB]/15 shadow-sm px-6 md:px-12 py-4" id="buyers-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo brand */}
          <button onClick={onNavigateHome} className="flex items-center gap-2 cursor-pointer text-left focus:outline-none">
            <span className="font-serif text-2xl font-bold text-[#2E3543] tracking-normal">
              Aura <span className="font-light text-[#5AC2EB]">Developments</span>
            </span>
          </button>

          {/* Navigation links with Active Underline state */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onNavigateHome}
              className="text-sm font-medium text-[#2E3543]/70 hover:text-[#5AC2EB] tracking-wider transition-colors cursor-pointer focus:outline-none"
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
                    layoutId="activeNavIndicatorBuyers"
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
                  className="text-sm font-medium text-[#2E3543]/70 hover:text-[#5AC2EB] tracking-wider transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Nav CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => onOpenBooking('buyer')}
              className="bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/90 tracking-wider text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-[#5AC2EB]/10 cursor-pointer focus:outline-none"
              id="header-prive-consult-trigger"
            >
              Book a Private Visit
            </button>
          </div>

          {/* Portable Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#2E3543] p-1.5 focus:outline-none"
            id="mobile-menu-buyers-toggle"
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
            className="absolute top-full left-6 right-6 mt-2 p-6 bg-[#FDFCFC]/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-100 z-50 md:hidden animate-fade-in"
          >
            <nav className="flex flex-col gap-4 mb-6">
              <button
                onClick={() => { setMobileMenuOpen(false); onNavigateHome(); }}
                className="text-left text-base font-medium text-[#2E3543] hover:text-[#5AC2EB] py-1 focus:outline-none"
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
                  className={`text-left text-base font-medium py-1 transition-colors focus:outline-none ${link.isCurrent ? 'text-[#5AC2EB]' : 'text-[#2E3543] hover:text-[#5AC2EB]'}`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('buyer');
              }}
              className="w-full bg-[#5AC2EB] text-[#2E3543] font-bold text-sm tracking-wider uppercase py-3 rounded-xl shadow-lg focus:outline-none"
            >
              Book a Private Visit
            </button>
          </motion.div>
        )}
      </header>

      {/* SECTION 1: Page Hero — "This One's For You" */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#FDFCFC] py-16 md:py-24 border-b border-gray-100/70" id="buyers-hero">
        
        {/* Soft top-right ambient sky blue radial glow */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#5AC2EB]/8 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column Text (Left 50%) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-left relative pl-6 sm:pl-8 border-l-2 border-[#5AC2EB]" id="hero-left-text-block">
            
            {/* Eyebrow tag */}
            <div className="fade-up inline-block text-left">
              <span className="text-[11px] font-semibold text-[#5AC2EB] tracking-[0.3em] uppercase block">
                FOR APARTMENT BUYERS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif font-bold text-[#2E3543] leading-[1.1] tracking-tight">
              Find a home that actually <span className="italic font-normal text-[#5AC2EB]">feels like one.</span>
            </h1>

            {/* Subheadline description */}
            <p className="mt-6 text-[#2E3543]/70 font-sans text-base sm:text-lg max-w-xl leading-[1.7]">
              Ultra-premium apartments in Gulshan, Banani, Dhanmondi, and Bashundhara. Designed for the way you actually live — with natural light, smart features, and a handover date we'll actually keep.
            </p>

            {/* CTA action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenBooking('buyer')}
                className="bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/95 font-sans font-semibold text-sm tracking-wider text-center py-4 px-8 rounded-xl transition-all shadow-md shadow-[#5AC2EB]/20 cursor-pointer focus:outline-none"
              >
                Come Take a Private Look →
              </button>
              <button
                onClick={onNavigateProjects}
                className="border-2 border-[#2E3543] text-[#2E3543] hover:bg-[#2E3543]/5 font-sans font-semibold text-sm tracking-wider text-center py-[14px] px-8 rounded-xl transition-all cursor-pointer focus:outline-none"
              >
                Explore Our Projects
              </button>
            </div>

            {/* Under CTA micro text */}
            <p className="mt-4 text-xs italic font-normal text-[#2E3543]/45">
              No pressure. Just you, us, and a great space to explore.
            </p>

            {/* Quick Trust validation strip */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[#2E3543]/70" id="trust-strip">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[#5AC2EB] font-bold">✓</span> On-time handover guaranteed
              </span>
              <span className="text-[#2E3543]/30 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[#5AC2EB] font-bold">✓</span> 100% RAJUK compliant
              </span>
              <span className="text-[#2E3543]/30 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-[#5AC2EB] font-bold">✓</span> Managed after handover
              </span>
            </div>

          </div>

          {/* Right Column Stacked Glassmorphic Card Collage (Right 50%) */}
          <div className="col-span-1 lg:col-span-6 flex justify-center items-center relative py-12 lg:py-0 overflow-visible" id="hero-right-collage-block">
            
            {/* Embedded atmospheric radial glow under the collage */}
            <div className="absolute inset-0 bg-[#5AC2EB]/4 rounded-full blur-[80px] pointer-events-none -z-10" />

            <div className="relative w-full max-w-[420px] h-[380px] flex items-center justify-center">

              {/* CARD 1: BACK (Aura Skyline One Lounge mockup -4 degrees angle) */}
              <motion.div
                initial={{ opacity: 0, rotate: -7, x: -15, y: -10 }}
                animate={{ opacity: 1, rotate: -4, x: -16, y: -20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute w-[320px] h-[220px] bg-white/75 backdrop-blur-md rounded-2xl border border-[#5AC2EB]/25 shadow-[0_12px_30px_rgba(46,53,67,0.04)] p-5 flex flex-col justify-between"
                style={{ transform: 'rotate(-4deg) translate(-16px, -20px)', zIndex: 10 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-[#5AC2EB] uppercase tracking-widest block">LIVING SPACE</span>
                    <h4 className="font-serif text-sm font-bold text-[#2E3543]/80">The Skyline Sanctuary</h4>
                  </div>
                  <span className="text-[9px] font-semibold text-[#2E3543]/40">Aura Skyline</span>
                </div>
                {/* SVG Line Illustration of Minimal Living Room */}
                <div className="w-full h-24 my-2 border-b border-[#5AC2EB]/15 flex items-end justify-between px-4 pb-2">
                  <svg className="w-full h-full text-[#5AC2EB]/30" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="0.8">
                    {/* Sofa */}
                    <path d="M10,35 L90,35 L90,25 L85,25 L80,18 L20,18 L15,25 L10,25 Z" />
                    <line x1="15" y1="25" x2="85" y2="25" />
                    <line x1="33" y1="18" x2="33" y2="35" />
                    <line x1="66" y1="18" x2="66" y2="35" />
                    {/* Floor to ceiling window grid */}
                    <line x1="5" y1="2" x2="5" y2="35" strokeDasharray="2 2" />
                    <line x1="95" y1="2" x2="95" y2="35" strokeDasharray="2 2" />
                    <line x1="50" y1="2" x2="50" y2="18" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div className="text-[10px] text-gray-400 font-sans flex items-center justify-between">
                  <span>Cantilevered Sunlight filter</span>
                  <span>12-ft Ceilings</span>
                </div>
              </motion.div>

              {/* CARD 2: MIDDLE (Aura Blanc Kitchen mockup 0 degrees angle) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="absolute w-[320px] h-[220px] bg-white/75 backdrop-blur-md rounded-2xl border border-[#5AC2EB]/25 shadow-[0_15px_35px_rgba(46,53,67,0.06)] p-5 flex flex-col justify-between"
                style={{ transform: 'rotate(0deg)', zIndex: 15 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-[#5AC2EB] uppercase tracking-widest block">CUISINE STUDIO</span>
                    <h4 className="font-serif text-sm font-bold text-[#2E3543]/80">Light-Filled Dining</h4>
                  </div>
                  <span className="text-[9px] font-semibold text-[#2E3543]/40">Aura Blanc</span>
                </div>
                {/* SVG Line Illustration of Kitchen/Dining and Light Rays */}
                <div className="w-full h-24 my-2 border-b border-[#5AC2EB]/15 flex items-center justify-center relative">
                  {/* Decorative diagonal sun rays */}
                  <div className="absolute right-0 top-0 w-24 h-16 bg-gradient-to-bl from-[#5AC2EB]/15 to-transparent pointer-events-none transform skew-x-12" />
                  <svg className="w-full h-full text-[#5AC2EB]/30" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="0.8">
                    {/* Dining Counter Table and high stools */}
                    <rect x="25" y="24" width="50" height="11" rx="1" />
                    <line x1="35" y1="35" x2="35" y2="40" />
                    <line x1="65" y1="35" x2="65" y2="40" />
                    {/* Hanging pendant lamps */}
                    <line x1="40" y1="0" x2="40" y2="10" />
                    <circle cx="40" cy="12" r="3" />
                    <line x1="60" y1="0" x2="60" y2="10" />
                    <circle cx="60" cy="12" r="3" />
                  </svg>
                </div>
                <div className="text-[10px] text-gray-400 font-sans flex items-center justify-between">
                  <span>Imported Travertine Island</span>
                  <span>Pure White Monolith</span>
                </div>
              </motion.div>

              {/* CARD 3: FRONT (Aura Terraces with plant silhouettes +3 degrees angle) */}
              <motion.div
                initial={{ opacity: 0, rotate: 5, x: 15, y: 10 }}
                animate={{ opacity: 1, rotate: 3, x: 16, y: 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute w-[320px] h-[220px] bg-white/80 backdrop-blur-md rounded-2xl border border-[#5AC2EB]/30 shadow-[0_20px_45px_rgba(90,194,235,0.08)] p-5 flex flex-col justify-between"
                style={{ transform: 'rotate(3deg) translate(16px, 20px)', zIndex: 20 }}
                id="hero-floating-card-front"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-[#5AC2EB] uppercase tracking-widest block">SKY TERRACE</span>
                    <h4 className="font-serif text-sm font-bold text-[#2E3543]">Double-Depth Oasis</h4>
                  </div>
                  <span className="text-[9px] font-semibold text-[#5AC2EB] flex items-center gap-1">✦ FEATURED</span>
                </div>
                {/* SVG Line Illustration of Garden Terrace Foliage */}
                <div className="w-full h-24 my-2 border-b border-[#5AC2EB]/15 flex items-end justify-between px-3 relative overflow-hidden">
                  <svg className="w-full h-full text-[#5AC2EB]/40" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="0.8">
                    {/* Balcony railing */}
                    <line x1="5" y1="28" x2="95" y2="28" strokeWidth="1.2" />
                    <line x1="10" y1="28" x2="10" y2="40" />
                    <line x1="25" y1="28" x2="25" y2="40" />
                    <line x1="40" y1="28" x2="40" y2="40" />
                    <line x1="55" y1="28" x2="55" y2="40" />
                    <line x1="70" y1="28" x2="70" y2="40" />
                    <line x1="85" y1="28" x2="85" y2="40" />
                    {/* Plant leaf silhouettes */}
                    <path d="M15,28 C5,15 -2,22 10,25 C15,26 12,28 15,28 Z" fill="#5AC2EB" className="opacity-30" />
                    <path d="M85,28 C95,12 104,18 90,24 C85,26 88,28 85,28 Z" fill="#5AC2EB" className="opacity-30" />
                    {/* Small plant container */}
                    <rect x="42" y="24" width="16" height="4" rx="1" fill="#2E3543" className="opacity-20" />
                  </svg>
                </div>
                <div className="text-[10px] text-gray-500 font-sans flex items-center justify-between">
                  <span>Biological Irrigation loops</span>
                  <span className="text-[#5AC2EB] font-bold">100% Realized</span>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: Why Buying With Aura is Different — "Here's What You Actually Get" */}
      <section className="relative py-24 bg-[#FDFCFC]" id="buyers-perks">
        
        {/* Subtle grid backdrop at 3% opacity */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#2E3543 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block">
              THE AURA BUYER EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[48px] font-serif font-bold text-[#2E3543] leading-tight">
              We thought about everything. <br />So you don't have to.
            </h2>
            <div className="w-16 h-[2.5px] bg-[#5AC2EB] mx-auto mt-4" />
          </div>

          {/* 6 Benefits Grid (2 Rows x 3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="buyers-perks-grid">
            
            {/* Benefit 1 — On-Time, Every Time */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(90, 194, 235, 0.05)' }}
              className="bg-white/60 backdrop-blur-sm rounded-[20px] p-8 border border-[#5AC2EB]/20 shadow-sm transition-all group duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Calendar size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E3543] group-hover:text-[#5AC2EB] transition-colors">
                  Your handover date is a promise, not a guess.
                </h3>
                <p className="text-sm text-[#2E3543]/70 font-sans leading-relaxed">
                  We give you a date. We keep that date. And if we ever miss it — which we haven't — we pay you a monthly penalty. It's that simple.
                </p>
              </div>
            </motion.div>

            {/* Benefit 2 — Legal Peace of Mind */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(90, 194, 235, 0.05)' }}
              className="bg-white/60 backdrop-blur-sm rounded-[20px] p-8 border border-[#5AC2EB]/20 shadow-sm transition-all group duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Shield size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E3543] group-hover:text-[#5AC2EB] transition-colors">
                  100% legally clean. No asterisks.
                </h3>
                <p className="text-sm text-[#2E3543]/70 font-sans leading-relaxed">
                  Every Aura property is fully RAJUK-approved, has zero title disputes, and comes with complete legal documentation. You'll sleep easy from day one.
                </p>
              </div>
            </motion.div>

            {/* Benefit 3 — Designed for Real Life */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(90, 194, 235, 0.05)' }}
              className="bg-white/60 backdrop-blur-sm rounded-[20px] p-8 border border-[#5AC2EB]/20 shadow-sm transition-all group duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Clock size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E3543] group-hover:text-[#5AC2EB] transition-colors">
                  Big windows. Fresh air. Actual smart features.
                </h3>
                <p className="text-sm text-[#2E3543]/70 font-sans leading-relaxed">
                  We design for how people actually live — maximizing natural light, incorporating green spaces, and adding tech that genuinely helps your daily routine.
                </p>
              </div>
            </motion.div>

            {/* Benefit 4 — Premium Locations */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(90, 194, 235, 0.05)' }}
              className="bg-white/60 backdrop-blur-sm rounded-[20px] p-8 border border-[#5AC2EB]/20 shadow-sm transition-all group duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <MapPin size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E3543] group-hover:text-[#5AC2EB] transition-colors">
                  Only Dhaka's finest addresses.
                </h3>
                <p className="text-sm text-[#2E3543]/70 font-sans leading-relaxed">
                  Gulshan, Banani, Dhanmondi, Bashundhara. We build exclusively in neighbourhoods where your investment grows and your lifestyle thrives.
                </p>
              </div>
            </motion.div>

            {/* Benefit 5 — Flexible Payment Plans */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(90, 194, 235, 0.05)' }}
              className="bg-white/60 backdrop-blur-sm rounded-[20px] p-8 border border-[#5AC2EB]/20 shadow-sm transition-all group duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Coins size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E3543] group-hover:text-[#5AC2EB] transition-colors">
                  A payment plan that works for your life.
                </h3>
                <p className="text-sm text-[#2E3543]/70 font-sans leading-relaxed">
                  We don't believe in one-size-fits-all financing. We'll sit down and build a payment structure that makes sense for your specific timeline and budget.
                </p>
              </div>
            </motion.div>

            {/* Benefit 6 — We Stay After Handover */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(90, 194, 235, 0.05)' }}
              className="bg-white/60 backdrop-blur-sm rounded-[20px] p-8 border border-[#5AC2EB]/20 shadow-sm transition-all group duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Settings size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E3543] group-hover:text-[#5AC2EB] transition-colors">
                  We gave you the keys. We're not disappearing.
                </h3>
                <p className="text-sm text-[#2E3543]/70 font-sans leading-relaxed">
                  Aura manages every building we deliver. So your home looks and feels brand new years after you've moved in — no deteriorating common areas, no maintenance chaos.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* SECTION 3: Available Apartments — "Here's What's Waiting For You" */}
      <section className="relative py-24 bg-[#FDFCFC]" id="available-suites">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Headers */}
          <div className="text-left max-w-3xl mb-12 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5AC2EB] block">
              CURRENT AVAILABILITY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2E3543] leading-tight">
              A few great homes are still looking for their people.
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
              These are our currently available units across Dhaka. Each one is everything we just promised — and more. Take a look.
            </p>
            <div className="w-16 h-[2.5px] bg-[#5AC2EB] block" />
          </div>

          {/* Neighbourhood Tabs Switcher */}
          <div className="flex justify-start mb-12 overflow-x-auto pb-2 scrollbar-none" id="neighbourhood-tab-switcher">
            <div className="bg-[#2E3543]/6 p-1.5 rounded-2xl flex items-center gap-1.5 whitespace-nowrap">
              {(['Gulshan', 'Banani', 'Dhanmondi', 'Bashundhara'] as const).map((tab) => {
                const isSelected = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-all cursor-pointer focus:outline-none ${
                      isSelected
                        ? 'bg-[#2E3543] text-[#FDFCFC] shadow-md'
                        : 'text-[#2E3543]/75 hover:text-[#5AC2EB] hover:bg-white/50'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Listings Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="available-apartments-grid">
            <AnimatePresence mode="wait">
              {apartmentDatabase[activeTab].map((apt, index) => {
                const isUrgency = apt.badge === 'LAST 2 UNITS';
                return (
                  <motion.div
                    key={`${activeTab}-${apt.projectName}-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-[20px] border border-[#5AC2EB]/25 overflow-hidden shadow-[0_8px_30px_rgba(46,53,67,0.02)] hover:border-[#5AC2EB]/55 hover:shadow-lg transition-all group flex flex-col justify-between"
                  >
                    {/* Visual Card Area - room mockup */}
                    <div className="relative h-[220px] bg-[#5AC2EB]/5 flex items-center justify-center p-6 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
                      
                      {/* Interactive vector sketch of interior spaces based on apt.sizeSqFt */}
                      <div className="absolute inset-0 flex items-center justify-center p-8 text-[#5AC2EB]/15 transform group-hover:scale-105 transition-transform duration-500">
                        <svg className="w-11/12 h-11/12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                          {/* Structural room blueprint lines */}
                          <line x1="10" y1="90" x2="90" y2="90" />
                          <line x1="10" y1="20" x2="10" y2="90" />
                          <line x1="90" y1="20" x2="90" y2="90" />
                          <line x1="10" y1="50" x2="35" y2="30" strokeDasharray="2 2" />
                          <line x1="90" y1="50" x2="65" y2="30" strokeDasharray="2 2" />
                          {/* Bed or balcony structure depending on details */}
                          <rect x="25" y="65" width="50" height="25" rx="1" />
                          <line x1="25" y1="75" x2="75" y2="75" />
                          {/* Light beam from angle */}
                          <path d="M0,10 L35,65 L55,65 L10,10" fill="currentColor" className="opacity-15" />
                        </svg>
                      </div>

                      {/* Badge Top Left */}
                      <span className={`absolute top-4 left-4 z-20 text-[9px] font-bold tracking-widest px-3.5 py-1.5 rounded-full ${
                        isUrgency 
                          ? 'bg-[#F4A261] text-[#FDFCFC] shadow-md shadow-[#F4A261]/25' 
                          : 'bg-[#5AC2EB]/25 text-[#2E3543] border border-[#5AC2EB]/40'
                      }`}>
                        {apt.badge}
                      </span>

                      {/* Info Overlay inside Room Visual */}
                      <span className="absolute bottom-4 left-4 z-20 text-xs font-serif italic text-white drop-shadow-sm font-semibold">
                        ✦ Aura Architect Elite Standard
                      </span>
                    </div>

                    {/* Listing Content */}
                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <div className="space-y-4">
                        
                        {/* Project Title and Selector */}
                        <div className="flex justify-between items-center">
                          <h3 className="font-serif text-2xl font-bold text-[#2E3543] group-hover:text-[#5AC2EB] transition-colors">
                            {apt.projectName}
                          </h3>
                          <span className="text-xs text-gray-400 uppercase font-mono tracking-widest">
                            DHAKA {activeTab.toUpperCase()}
                          </span>
                        </div>

                        {/* Config description */}
                        <div className="text-sm font-semibold text-[#2E3543]/85">
                          {apt.beds} Bed · {apt.baths} Bath · {apt.sizeSqFt.toLocaleString()} sq ft
                        </div>

                        {/* Location / Floor */}
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          {apt.floorInfo}
                        </p>

                        {/* Features chips row */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {apt.features.map((feat) => (
                            <span key={feat} className="text-[11px] font-semibold text-[#2E3543]/85 bg-gray-100 px-2.5 py-1 rounded-md">
                              {feat}
                            </span>
                          ))}
                        </div>

                      </div>

                      {/* Booking and Price actions bottom raw */}
                      <div className="mt-8 pt-5 border-t border-gray-100 space-y-4">
                        <div className="flex justify-between items-center text-left">
                          <div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest block">INVESTMENT</span>
                            <span className="text-lg font-bold text-[#2E3543]">{apt.priceRange}</span>
                          </div>
                          <span className="text-xs font-bold text-[#5AC2EB] uppercase tracking-wider group-hover:underline cursor-pointer" onClick={() => onSelectProject(apt.projectName)}>
                            Dossier →
                          </span>
                        </div>

                        <button
                          onClick={() => onOpenBooking('buyer')}
                          className="w-full bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/90 font-sans font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all shadow-md shadow-[#5AC2EB]/15 text-center cursor-pointer focus:outline-none"
                        >
                          Enquire About This Unit →
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Under grid call to action help note */}
          <div className="text-center mt-12 space-y-2">
            <p className="text-sm text-gray-500">
              Don't see exactly what you're looking for?
            </p>
            <button
              onClick={() => onOpenBooking('buyer')}
              className="text-[#5AC2EB] hover:underline text-sm font-bold tracking-wide uppercase inline-flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              Tell us what you need and we'll find it →
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 4: The Buying Journey — "Here's Exactly What Happens Next" */}
      <section className="relative py-24 bg-[#2E3543] text-white overflow-hidden" id="buyers-journey">
        
        {/* Soft edge radial accent border */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5AC2EB]/50 to-transparent" />
        
        {/* Deep atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#5AC2EB]/4 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block">
              YOUR JOURNEY WITH AURA
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[48px] font-serif font-bold text-[#FDFCFC] leading-tight">
              Six steps from 'interested' to 'home.'
            </h2>
            <p className="text-sm sm:text-base text-[#FDFCFC]/70 max-w-xl mx-auto leading-relaxed">
              We've made this process as simple and transparent as possible. Here's exactly what happens when you decide to buy with Aura.
            </p>
            <div className="w-16 h-[2.5px] bg-[#5AC2EB] mx-auto mt-4" />
          </div>

          {/* Numbered Step-by-Step Layout with alternating timeline paths */}
          <div className="relative" id="timeline-flow-block">
            
            {/* Center spine connector line (on desktop) */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 border-l-2 border-dashed border-[#5AC2EB]/30 z-0" />

            <div className="space-y-12">
              
              {/* STEP 1: Book a Private Visit */}
              <div className="flex flex-col md:flex-row items-stretch md:justify-between relative z-10">
                {/* Visual node anchor */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-[#5AC2EB] shadow-md shadow-[#5AC2EB]/40 z-20" />
                
                {/* Left floating card block */}
                <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 pr-0 md:pr-8 flex justify-start md:justify-end">
                  <span className="font-serif text-[64px] font-bold text-[#5AC2EB]/15 select-none leading-none h-14 md:block hidden">
                    01
                  </span>
                </div>
                
                {/* Right floating card block */}
                <div className="w-full md:w-[45%] pl-14 md:pl-8">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/6 backdrop-blur-md rounded-[20px] p-8 border border-white/12 shadow-[0_4px_30px_rgba(0,0,0,0.1)] relative overflow-hidden"
                  >
                    {/* Decorative ghost numeral background inside mobile card */}
                    <span className="absolute -right-2 bottom-0 font-serif text-[84px] font-bold text-[#5AC2EB]/10 select-none leading-none select-none md:hidden block">
                      01
                    </span>
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB]">
                        <Compass size={18} />
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFCFC]">
                        You reach out. We set up a private tour.
                      </h4>
                      <p className="text-sm text-[#FDFCFC]/75 leading-relaxed">
                        No open houses. No crowded showrooms. Just you and our team, walking through the space at your own pace.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* STEP 2: Choose Your Unit (Alternates to left side card) */}
              <div className="flex flex-col md:flex-row-reverse items-stretch md:justify-between relative z-10">
                {/* Node anchor */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-[#5AC2EB] shadow-md shadow-[#5AC2EB]/40 z-20" />

                {/* Left/Right swapped */}
                <div className="w-full md:w-[45%] pl-14 md:pl-0 pr-0 md:pr-8 flex justify-start">
                  <span className="font-serif text-[64px] font-bold text-[#5AC2EB]/15 select-none leading-none h-14 md:block hidden animate-pulse">
                    02
                  </span>
                </div>

                <div className="w-full md:w-[45%] pl-14 md:pr-8 md:pl-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/6 backdrop-blur-md rounded-[20px] p-8 border border-white/12 shadow-[0_4px_30px_rgba(0,0,0,0.1)] relative overflow-hidden"
                  >
                    <span className="absolute -right-2 bottom-0 font-serif text-[84px] font-bold text-[#5AC2EB]/10 select-none leading-none select-none md:hidden block">
                      02
                    </span>
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB]">
                        <Building2 size={18} />
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFCFC]">
                        Pick your floor, your view, your layout.
                      </h4>
                      <p className="text-sm text-[#FDFCFC]/75 leading-relaxed">
                        We'll walk you through every available unit, floor plan, and finish option until you find the one that feels right.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* STEP 3: Agree on a Payment Plan */}
              <div className="flex flex-col md:flex-row items-stretch md:justify-between relative z-10">
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-[#5AC2EB] shadow-md shadow-[#5AC2EB]/40 z-20" />

                <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 pr-0 md:pr-8 flex justify-start md:justify-end">
                  <span className="font-serif text-[64px] font-bold text-[#5AC2EB]/15 select-none leading-none h-14 md:block hidden">
                    03
                  </span>
                </div>

                <div className="w-full md:w-[45%] pl-14 md:pl-8">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/6 backdrop-blur-md rounded-[20px] p-8 border border-white/12 shadow-[0_4px_30px_rgba(0,0,0,0.1)] relative overflow-hidden"
                  >
                    <span className="absolute -right-2 bottom-0 font-serif text-[84px] font-bold text-[#5AC2EB]/10 select-none leading-none select-none md:hidden block">
                      03
                    </span>
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB]">
                        <Coins size={18} />
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFCFC]">
                        We build a plan that works for your life.
                      </h4>
                      <p className="text-sm text-[#FDFCFC]/75 leading-relaxed">
                        Flexible payment structures designed around your timeline. Full transparency — no hidden fees, no surprise charges.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* STEP 4: Sign & Secure (Left side) */}
              <div className="flex flex-col md:flex-row-reverse items-stretch md:justify-between relative z-10">
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-[#5AC2EB] shadow-md shadow-[#5AC2EB]/40 z-20" />

                <div className="w-full md:w-[45%] pl-14 md:pl-0 pr-0 md:pr-8 flex justify-start">
                  <span className="font-serif text-[64px] font-bold text-[#5AC2EB]/15 select-none leading-none h-14 md:block hidden">
                    04
                  </span>
                </div>

                <div className="w-full md:w-[45%] pl-14 md:pr-8 md:pl-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/6 backdrop-blur-md rounded-[20px] p-8 border border-white/12 shadow-[0_4px_30px_rgba(0,0,0,0.1)] relative overflow-hidden"
                  >
                    <span className="absolute -right-2 bottom-0 font-serif text-[84px] font-bold text-[#5AC2EB]/10 select-none leading-none select-none md:hidden block">
                      04
                    </span>
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB]">
                        <PenTool size={18} />
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFCFC]">
                        Legally airtight. Completely clear.
                      </h4>
                      <p className="text-sm text-[#FDFCFC]/75 leading-relaxed">
                        Our legal team handles everything. You'll receive full RAJUK-compliant documentation and title clarity before a single taka changes hands.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* STEP 5: Watch It Get Built */}
              <div className="flex flex-col md:flex-row items-stretch md:justify-between relative z-10">
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-[#5AC2EB] shadow-md shadow-[#5AC2EB]/40 z-20" />

                <div className="w-full md:w-[45%] md:text-right pl-14 md:pl-0 pr-0 md:pr-8 flex justify-start md:justify-end">
                  <span className="font-serif text-[64px] font-bold text-[#5AC2EB]/15 select-none leading-none h-14 md:block hidden">
                    05
                  </span>
                </div>

                <div className="w-full md:w-[45%] pl-14 md:pl-8">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/6 backdrop-blur-md rounded-[20px] p-8 border border-white/12 shadow-[0_4px_30px_rgba(0,0,0,0.1)] relative overflow-hidden"
                  >
                    <span className="absolute -right-2 bottom-0 font-serif text-[84px] font-bold text-[#5AC2EB]/10 select-none leading-none select-none md:hidden block">
                      05
                    </span>
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB]">
                        <Hammer size={18} />
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFCFC]">
                        We keep you in the loop, always.
                      </h4>
                      <p className="text-sm text-[#FDFCFC]/75 leading-relaxed">
                        Regular construction updates, site visit invitations, and a dedicated contact for any question you have along the way.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* STEP 6: Get Your Keys (Left side) */}
              <div className="flex flex-col md:flex-row-reverse items-stretch md:justify-between relative z-10">
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-8 w-4.5 h-4.5 rounded-full bg-[#5AC2EB] shadow-md shadow-[#5AC2EB]/60 z-20 animate-ping" />
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-8 w-4.5 h-4.5 rounded-full bg-[#5AC2EB] shadow-md shadow-[#5AC2EB]/60 z-20" />

                <div className="w-full md:w-[45%] pl-14 md:pl-0 pr-0 md:pr-8 flex justify-start">
                  <span className="font-serif text-[64px] font-bold text-[#5AC2EB]/15 select-none leading-none h-14 md:block hidden">
                    06
                  </span>
                </div>

                <div className="w-full md:w-[45%] pl-14 md:pr-8 md:pl-0">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/6 backdrop-blur-md rounded-[20px] p-8 border border-white/12 shadow-[0_4px_30px_rgba(0,0,0,0.1)] relative overflow-hidden"
                  >
                    <span className="absolute -right-2 bottom-0 font-serif text-[84px] font-bold text-[#5AC2EB]/10 select-none leading-none select-none md:hidden block">
                      06
                    </span>
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/12 flex items-center justify-center text-[#5AC2EB]">
                        <Key size={18} />
                      </div>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#FDFCFC]">
                        On the date we promised. Not a day late.
                      </h4>
                      <p className="text-sm text-[#FDFCFC]/75 leading-relaxed">
                        Handover day is the best day. We hand you the keys, walk you through the space, and then stick around to make sure everything is perfect.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: Buyer Testimonials — "Straight From the People Who Live Here" */}
      <section className="relative py-24 bg-[#FDFCFC] overflow-hidden" id="buyers-testimonials">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block">
              REAL BUYERS. REAL WORDS.
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-serif font-bold text-[#2E3543] leading-tight">
              They were exactly where you are. Here's what they have to say.
            </h2>
            <div className="w-16 h-[2.5px] bg-[#5AC2EB] mx-auto mt-4" />
          </div>

          {/* Testimonial Active Slider Carousel */}
          <div className="relative max-w-4xl mx-auto px-4 md:px-12" id="testimonials-active-carousel">
            
            {/* Sliding Container with framer motion animations */}
            <div className="min-h-[290px] md:min-h-[250px] flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35 }}
                  className="w-full bg-white rounded-[20px] border border-[#5AC2EB]/25 shadow-[0_12px_40px_rgba(46,53,67,0.03)] p-8 sm:p-10 relative overflow-hidden"
                >
                  {/* Backdrop Giant Quote Mark */}
                  <span className="absolute -top-4 left-6 font-serif text-[120px] font-semibold text-[#5AC2EB]/15 leading-none select-none pointer-events-none">
                    “
                  </span>

                  <div className="relative z-10 space-y-6">
                    
                    {/* Stars Rating Array */}
                    <div className="flex gap-1 text-[#5AC2EB]">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={16} fill="currentColor" />
                      ))}
                    </div>

                    {/* Testimonial Quote */}
                    <p className="font-sans italic text-base sm:text-lg text-[#2E3543]/85 leading-relaxed">
                      "{currentTestimonial.quote}"
                    </p>

                    {/* Author Metadata Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <h4 className="text-sm font-semibold text-[#2E3543]">
                          {currentTestimonial.author}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-sans uppercase tracking-wider mt-1">
                          AURA VERIFIED ACQUISITION
                        </p>
                      </div>
                      
                      {/* Pill Apartment Tag */}
                      <span className="self-start sm:self-center text-[10px] font-bold text-[#5AC2EB] bg-[#5AC2EB]/12 py-1.5 px-3 rounded-full uppercase tracking-wider">
                        {currentTestimonial.unit}
                      </span>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Arrows - positioned flanking the card desktop */}
            <div className="flex justify-between items-center mt-8 md:absolute md:top-1/2 md:left-0 md:right-0 md:-translate-y-1/2 md:mt-0 md:px-0 pointer-events-none">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-black/5 hover:bg-[#5AC2EB] text-[#2E3543] hover:text-white transition-all flex items-center justify-center p-0 cursor-pointer pointer-events-auto shadow-sm"
                id="testimonial-prev-arrow"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-black/5 hover:bg-[#5AC2EB] text-[#2E3543] hover:text-white transition-all flex items-center justify-center p-0 cursor-pointer pointer-events-auto shadow-sm"
                id="testimonial-next-arrow"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dot Indicator Row */}
            <div className="flex justify-center items-center gap-2.5 mt-8">
              {testimonials.map((_, idx) => {
                const isActive = idx === testimonialIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer focus:outline-none ${
                      isActive ? 'w-6 bg-[#5AC2EB]' : 'w-2.5 bg-[#2E3543]/20 hover:bg-[#2E3543]/40'
                    }`}
                  />
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: Final CTA — "Ready to See It For Yourself?" */}
      <section className="relative py-24 bg-[#FDFCFC]" id="buyers-cta-portal">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Main Floating Glassmorphic CTA Container Card spanning 80% */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full bg-[#FDFCFC]/85 backdrop-blur-md rounded-[32px] border border-[#5AC2EB]/30 shadow-[0_20px_50px_rgba(90,194,235,0.08)] p-8 sm:p-16 relative overflow-hidden"
          >
            {/* Soft inner radial gradient glow top-center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] bg-[#5AC2EB]/6 rounded-full blur-[60px] pointer-events-none" />

            {/* Subtle background blueprint matrix ornament */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 opacity-[0.02] pointer-events-none select-none">
              <svg className="w-full h-full text-[#5AC2EB]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="50" y1="0" x2="50" y2="100" />
                <circle cx="50" cy="50" r="30" strokeDasharray="3 3" />
              </svg>
            </div>

            <div className="relative z-10 max-w-[560px] mx-auto text-center space-y-6">
              
              {/* Eyebrow */}
              <span className="text-[11px] font-semibold text-[#5AC2EB] tracking-[0.25em] uppercase block">
                NO PRESSURE. JUST A CONVERSATION.
              </span>

              {/* Main CTA headline */}
              <h2 className="text-3xl sm:text-4xl md:text-[52px] font-serif font-bold text-[#2E3543] leading-tight">
                Come take a private look. <br />You might <span className="italic font-normal text-[#5AC2EB]">fall in love.</span>
              </h2>

              {/* Description body */}
              <p className="text-sm sm:text-base leading-relaxed text-[#2E3543]/70">
                Book a private visit to any of our available apartments or ongoing projects. It's just you, our team, and a beautiful space. We'll answer every question you have — over coffee, of course.
              </p>

              {/* Inline Minimal CTA Form */}
              {!formSubmitted ? (
                <form onSubmit={handleInlineFormSubmit} className="pt-4 text-left space-y-4" id="buyers-inline-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name input */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Your Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5AC2EB]">
                          <User size={15} />
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Farhan Rahman"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB] focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3.5 pl-10 pr-4 text-[#2E3543] text-sm transition-all outline-none h-[52px]"
                        />
                      </div>
                    </div>

                    {/* Phone input */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5AC2EB]">
                          <Phone size={15} />
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +880 1712-XXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB] focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3.5 pl-10 pr-4 text-[#2E3543] text-sm transition-all outline-none h-[52px]"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Dropdown sector choice */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                      Which neighbourhood interests you?
                    </label>
                    <select
                      value={formData.neighbourhood}
                      onChange={(e) => setFormData({ ...formData, neighbourhood: e.target.value })}
                      className="w-full bg-white border border-gray-200 focus:border-[#5AC2EB] focus:ring-1 focus:ring-[#5AC2EB]/30 rounded-xl py-3.5 px-4 text-[#2E3543] text-sm transition-all outline-none h-[52px] cursor-pointer"
                    >
                      <option value="Gulshan">Gulshan — Sky-high reservoirs & lakes</option>
                      <option value="Banani">Banani — Boutique headquarters & mews</option>
                      <option value="Dhanmondi">Dhanmondi — Botanical courts & heritage</option>
                      <option value="Bashundhara">Bashundhara — Smart spaces & ultimate silent towers</option>
                      <option value="Open to Suggestions">Open to Suggestions</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/95 font-sans font-semibold text-sm tracking-wider uppercase py-4 rounded-xl transition-all shadow-md shadow-[#5AC2EB]/10 flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
                    >
                      {formLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#2E3543] border-t-transparent rounded-full animate-spin" />
                          Securing Desk...
                        </>
                      ) : (
                        'Book My Private Visit →'
                      )}
                    </button>
                  </div>

                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-4"
                  id="inline-success-box"
                >
                  <div className="w-14 h-14 bg-[#5AC2EB]/15 text-[#5AC2EB] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#2E3543]">
                    Inquiry Received Successfully
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    Thank you <strong className="text-[#2E3543]">{formData.name}</strong>. Your luxury visit is scheduled for <strong>{formData.neighbourhood}</strong> neighborhood locations.
                  </p>
                  
                  {/* Small pass voucher ticket representation */}
                  <div className="border border-dashed border-[#5AC2EB]/35 rounded-xl p-4 bg-gray-50/50 text-left max-w-xs mx-auto text-xs space-y-1 relative overflow-hidden">
                    <div className="text-[10px] uppercase font-bold text-[#5AC2EB] tracking-widest">
                      AURA DIGITAL DESK VOUCHER
                    </div>
                    <div className="text-[#2E3543]/60">PASS: <strong className="font-mono text-xs text-[#2E3543]">{ticketId}</strong></div>
                    <div className="text-[#2E3543]/60">Handoff Principal connecting shortly.</div>
                  </div>
                </motion.div>
              )}

              {/* Under-form response notice */}
              <p className="text-xs text-gray-400 font-sans pt-2">
                We typically respond within 2 hours during business hours (Sat–Thu, 9am–7pm). We'll never spam you — ever.
              </p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER - Inherited exactly from main landing page footer structure */}
      <footer className="bg-[#2E3543] text-white py-12 px-6 md:px-12 border-t border-white/5 relative z-10" id="buyers-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <h3 className="font-serif text-xl font-bold tracking-tight">
              Aura <span className="font-light text-[#5AC2EB]">Developments</span>
            </h3>
            <p className="text-xs text-white/50">
              Beautiful spaces. On-time handovers. Zero headaches.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs text-white/60">
            <button onClick={onNavigateHome} className="hover:text-[#5AC2EB] focus:outline-none">Home</button>
            <button onClick={onNavigateProjects} className="hover:text-[#5AC2EB] focus:outline-none">Our Projects</button>
            <a href="/#values" onClick={onNavigateHome} className="hover:text-[#5AC2EB]">Our Values</a>
            <a href="/#proof" onClick={onNavigateHome} className="hover:text-[#5AC2EB]">Client Reviews</a>
            <a href="/#dual-audience" onClick={onNavigateHome} className="hover:text-[#5AC2EB]">Partnership</a>
          </div>

          <div className="text-center md:text-right text-[10px] text-white/40 font-sans">
            © 2026 Aura Developments. Crafted for pristine luxury in Dhaka, Bangladesh.
          </div>
        </div>
      </footer>

    </div>
  );
}
