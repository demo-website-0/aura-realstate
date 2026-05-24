import { motion } from 'motion/react';
import { Menu, X, ArrowRight, Award, FolderHeart, Milestone, Scale } from 'lucide-react';
import { useState } from 'react';

interface HeroProps {
  onOpenBooking: (audience: 'buyer' | 'landowner' | 'general') => void;
  onNavigateProjects?: () => void;
  onNavigateBuyers?: () => void;
  onNavigateLandowners?: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
}

export default function Hero({ onOpenBooking, onNavigateProjects, onNavigateBuyers, onNavigateLandowners, onNavigateAbout, onNavigateContact }: HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Logo, Links and stats in specs
  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'For Buyers', href: '#for-buyers' },
    { name: 'For Landowners', href: '#landowners' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#2E3543]"
    >
      {/* Immersive background image with edge-to-edge full-bleed */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.ibb.co.com/Y7S6mkj1/herorealstate.png"
          alt="Aura Luxury Real Estate Architecture"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Soft radial and linear gradient veil overlay to darken bottom-left, preserving light airy top-right */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2E3543]/85 via-[#2E3543]/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E3543]/90 via-transparent to-transparent z-10" />
      </div>

      {/* Floating Glassmorphism Navigation Bar */}
      <header className="relative z-30 w-full px-6 md:px-12 py-5 max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl md:rounded-3xl shadow-xl px-6 py-4 flex items-center justify-between transition-all">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-2xl font-bold text-[#FDFCFC] tracking-normal">
              Aura <span className="font-light text-[#5AC2EB]">Developments</span>
            </span>
          </a>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.name === 'For Buyers' && onNavigateBuyers) {
                    e.preventDefault();
                    onNavigateBuyers();
                  } else if (link.name === 'For Landowners' && onNavigateLandowners) {
                    e.preventDefault();
                    onNavigateLandowners();
                  } else if (link.name === 'Projects' && onNavigateProjects) {
                    e.preventDefault();
                    onNavigateProjects();
                  } else if (link.name === 'About' && onNavigateAbout) {
                    e.preventDefault();
                    onNavigateAbout();
                  } else if (link.name === 'Contact' && onNavigateContact) {
                    e.preventDefault();
                    onNavigateContact();
                  }
                }}
                className="text-sm font-medium text-[#FDFCFC]/90 hover:text-[#5AC2EB] tracking-wider transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Nav CTA (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => onOpenBooking('general')}
              className="border border-[#5AC2EB] text-[#FDFCFC] hover:bg-[#5AC2EB]/20 tracking-wider text-xs font-semibold px-6 py-2.5 rounded-xl transition-all"
            >
              Book a Private Visit
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#FDFCFC] p-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-6 right-6 mt-2 p-6 bg-[#2E3543]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-40 md:hidden"
          >
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.name === 'For Buyers' && onNavigateBuyers) {
                      e.preventDefault();
                      onNavigateBuyers();
                    } else if (link.name === 'For Landowners' && onNavigateLandowners) {
                      e.preventDefault();
                      onNavigateLandowners();
                    } else if (link.name === 'Projects' && onNavigateProjects) {
                      e.preventDefault();
                      onNavigateProjects();
                    } else if (link.name === 'About' && onNavigateAbout) {
                      e.preventDefault();
                      onNavigateAbout();
                    } else if (link.name === 'Contact' && onNavigateContact) {
                      e.preventDefault();
                      onNavigateContact();
                    }
                  }}
                  className="text-base font-medium text-[#FDFCFC] hover:text-[#5AC2EB] tracking-wide transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('general');
              }}
              className="w-full bg-[#5AC2EB] text-[#2E3543] font-bold text-sm tracking-wider uppercase py-3 rounded-xl transition-all"
            >
              Book a Private Visit
            </button>
          </motion.div>
        )}
      </header>

      {/* Main Content Area (Z-pattern reading flow, bottom left quadrant) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex items-center pt-10 pb-20">
        <div className="max-w-2xl text-left">
          
          {/* Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-[10px] md:text-xs font-semibold uppercase text-[#5AC2EB] tracking-[0.25em] block">
              DHAKA'S MOST TRUSTED DEVELOPER
            </span>
            {/* Razor-thin brand colored accent line immediately below eyebrow */}
            <div className="w-16 h-[2px] bg-[#5AC2EB] mt-2 block" />
          </motion.div>

          {/* Main Headline (Luxurious Bigilla serif representation) */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#FDFCFC] leading-[1.1] mt-5 tracking-tight"
          >
            Your dream home <br />
            <span className="italic font-normal text-[#5AC2EB]">isn't a dream</span> anymore.
          </motion.h1>

          {/* Subheadline describing locations and trustworthy reputation */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-sm sm:text-base md:text-lg text-[#FDFCFC]/85 font-normal mt-6 leading-relaxed max-w-xl"
          >
            We build ultra-premium apartments and boutique commercial spaces in Gulshan, Banani, Dhanmondi, and Bashundhara — handed over on time, every time. No jargon. No drama. Just beautiful spaces done right.
          </motion.p>

          {/* Dual CTA Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10"
          >
            <button
              onClick={() => onOpenBooking('buyer')}
              className="bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/95 font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-xl shadow-lg shadow-[#5AC2EB]/20 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              Come Take a Private Look
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onOpenBooking('landowner')}
              className="backdrop-blur-md bg-white/10 hover:bg-white/15 border border-white/20 text-[#FDFCFC] font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-xl active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              Let's Build Together
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Social Proof Stats Frosted Ticker Bar at bottom */}
      <div className="relative z-20 w-full border-t border-white/5 bg-white/5 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#5AC2EB]/90">
            Aura developments statistics:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 md:gap-x-12 text-[#FDFCFC]">
            
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
              <span className="text-[#5AC2EB]">15+</span> Years
              <span className="text-white/20 hidden md:inline">|</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
              <span className="text-[#5AC2EB]">55+</span> Projects Completed
              <span className="text-white/20 hidden md:inline">|</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
              <span className="text-[#5AC2EB]">1,200+</span> Happy Families
              <span className="text-white/20 hidden md:inline">|</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
              <span className="text-[#5AC2EB]">0</span> Legal Issues — Ever
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
