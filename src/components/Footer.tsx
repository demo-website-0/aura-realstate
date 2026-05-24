import { motion } from 'motion/react';
import { Mail, Phone, Clock, Linkedin, Facebook, Instagram, MapPin, Landmark, Scale, Hammer, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: (audience: 'buyer' | 'landowner' | 'general') => void;
  onNavigateProjects?: () => void;
  onNavigateBuyers?: () => void;
  onNavigateLandowners?: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  onNavigateAdmin?: () => void;
}

export default function Footer({ onOpenBooking, onNavigateProjects, onNavigateBuyers, onNavigateLandowners, onNavigateAbout, onNavigateContact, onNavigateAdmin }: FooterProps) {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative text-white pt-20 overflow-hidden bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('https://i.ibb.co.com/HfF1749t/Chat-GPT-Image-May-24-2026-02-26-00-AM.png')" }}
      id="contact"
    >
      {/* Dark overlay to ensure superior text contrast and beautiful visual blending */}
      <div className="absolute inset-0 bg-[#1D212A]/92 z-0 pointer-events-none" />

      {/* Decorative Atmosphere Gradient Center Bleed */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#5AC2EB]/5 rounded-full blur-[100px] pointer-events-none z-0" />

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
          Whether you're looking for the perfect home or the perfect partner for your land — we'd love to talk. Pull up a chair. Let's figure this out together.
        </p>

        {/* Dual CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <button
            onClick={() => onOpenBooking('buyer')}
            className="w-full sm:w-auto bg-[#5AC2EB] hover:bg-[#5AC2EB]/95 text-[#2E3543] font-sans font-bold tracking-widest text-xs uppercase px-8 py-4 rounded-xl shadow-lg shadow-[#5AC2EB]/15 transition-all cursor-pointer"
          >
            Book a Private Visit
          </button>
          
          <button
            onClick={() => onOpenBooking('general')}
            className="w-full sm:w-auto border border-white hover:bg-white/10 text-[#FDFCFC] font-sans font-semibold tracking-widest text-xs uppercase px-8 py-4 rounded-xl transition-all cursor-pointer"
          >
            Talk to Our Team
          </button>
        </div>

        {/* Contact information metadata */}
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

      {/* Lower Footer — 4 Column Information Grid */}
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
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] hover:bg-[#5AC2EB]/20 transition-all transform hover:scale-105"
              >
                <Linkedin size={16} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] hover:bg-[#5AC2EB]/20 transition-all transform hover:scale-105"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] hover:bg-[#5AC2EB]/20 transition-all transform hover:scale-105"
              >
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
              <a 
                href="#hero" 
                onClick={(e) => {
                  if (onNavigateProjects) {
                    e.preventDefault();
                    onNavigateProjects();
                  }
                }}
                className="hover:text-[#5AC2EB] transition-colors"
              >
                Our Projects
              </a>
              <a 
                href="#for-buyers" 
                onClick={(e) => {
                  if (onNavigateBuyers) {
                    e.preventDefault();
                    onNavigateBuyers();
                  }
                }}
                className="hover:text-[#5AC2EB] transition-colors"
              >
                For Buyers
              </a>
              <a 
                href="#proof" 
                className="hover:text-[#5AC2EB] transition-colors"
              >
                Client Testimonials
              </a>
              <a 
                href="#for-landowners" 
                onClick={(e) => {
                  if (onNavigateLandowners) {
                    e.preventDefault();
                    onNavigateLandowners();
                  }
                }}
                className="hover:text-[#5AC2EB] transition-colors"
              >
                For Landowners
              </a>
              <a 
                href="#about" 
                onClick={(e) => {
                  if (onNavigateAbout) {
                    e.preventDefault();
                    onNavigateAbout();
                  }
                }}
                className="hover:text-[#5AC2EB] transition-colors"
              >
                About Aura
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                  if (onNavigateContact) {
                    e.preventDefault();
                    onNavigateContact();
                  }
                }}
                className="hover:text-[#5AC2EB] transition-colors"
              >
                Contact Aura
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

      {/* Centered Scroll to top utility bar before copyright */}
      <div className="relative z-10 w-full flex justify-center pb-6">
        <button 
          onClick={handleScrollToTop}
          className="bg-white/5 hover:bg-[#5AC2EB]/20 text-[#5AC2EB] p-2.5 rounded-full border border-white/10 shadow-lg transition-all active:scale-95 flex items-center gap-1 text-xs uppercase font-semibold tracking-wider block cursor-pointer"
        >
          <ArrowUp size={14} /> Back to top
        </button>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 bg-black/25 text-[#FDFCFC]/40 text-xs py-5 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <span>
            © 2026 Aura Developments. Crafted with care in Dhaka, Bangladesh.
          </span>
          <div className="flex gap-4 font-normal">
            {onNavigateAdmin && (
              <>
                <span 
                  onClick={onNavigateAdmin}
                  className="hover:text-[#5AC2EB] text-[#5AC2EB]/70 transition-colors cursor-pointer font-semibold"
                >
                  Console Portal
                </span>
                <span>·</span>
              </>
            )}
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
