import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, Menu, Star, Shield, ShieldCheck, MapPin, Clock, Calendar, Check, 
  Phone, User, Key, Eye, Heart, HelpCircle, Users, Award, Landmark, Scale, ChevronRight, Mail, Compass, Sparkles, BookOpen
} from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: (audience: 'buyer' | 'landowner' | 'general') => void;
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
  onNavigateBuyers: () => void;
  onNavigateLandowners: () => void;
  onNavigateContact: () => void;
}

export default function AboutPage({
  onOpenBooking,
  onNavigateHome,
  onNavigateProjects,
  onNavigateBuyers,
  onNavigateLandowners,
  onNavigateContact
}: AboutPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', onClick: onNavigateProjects, href: '#' },
    { name: 'For Buyers', onClick: onNavigateBuyers, href: '#' },
    { name: 'For Landowners', onClick: onNavigateLandowners, href: '#' },
    { name: 'About', isCurrent: true, href: '#' },
    { name: 'Contact', onClick: onNavigateContact, href: '#' },
  ];

  // Timeline events for Section 1
  const timelineEvents = [
    { year: '2009', desc: 'Founded in Dhaka with a vision of transparency.' },
    { year: '2012', desc: 'First 10 luxury residential projects completed.' },
    { year: '2015', desc: '500+ premium families successfully housed.' },
    { year: '2018', desc: 'Expanded to signature commercial landmarks.' },
    { year: '2021', desc: 'Celebrated the 1,000 families milestone.' },
    { year: '2024', desc: '55+ projects, 1,200+ families. Still going strong.' }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCFC]" id="about-page-wrapper">
      
      {/* Scroll timeline indicator top of page */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#5AC2EB]/30 z-50 pointer-events-none">
        <div className="h-full bg-[#5AC2EB] w-4/5 animate-[pulse_2.5s_infinite]" />
      </div>

      {/* Header component matching general style guide */}
      <header className="sticky top-0 z-40 w-full bg-[#2E3543]/95 backdrop-blur-xl border-b border-white/5 shadow-sm px-6 md:px-12 py-4" id="about-header">
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
                    layoutId="activeNavIndicatorAbout"
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

          {/* Header Action Button */}
          <div className="hidden md:block">
            <button
              onClick={() => onOpenBooking('general')}
              className="bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/90 tracking-wider text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-[#5AC2EB]/10 cursor-pointer focus:outline-none"
              id="header-prive-consult-about"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1.5 focus:outline-none"
            id="mobile-menu-about-toggle"
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
                onOpenBooking('general');
              }}
              className="w-full bg-[#5AC2EB] text-[#2E3543] font-bold text-sm tracking-wider uppercase py-3 rounded-xl shadow-lg focus:outline-none"
            >
              Meet Our Team
            </button>
          </motion.div>
        )}
      </header>

      {/* SECTION 1: Page Hero — "The Story Behind the Spaces" */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#FDFCFC] py-16 md:py-24" id="about-hero">
        
        {/* Subtle radial ambient blue glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5AC2EB]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Editorial Story Column (Width 55%) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-[#5AC2EB] tracking-[0.35em] uppercase block">
                OUR STORY
              </span>
              <div className="w-12 h-[1px] bg-[#5AC2EB]/50" />
            </div>

            {/* Title with left side visual border rule */}
            <div className="border-l-2 border-[#5AC2EB] pl-6 md:pl-8 space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-[68px] font-serif font-bold text-[#2E3543] leading-[1.1] tracking-tight">
                We started with <br />one promise. <span className="italic font-normal text-[#5AC2EB]">Fifteen years</span> later, we've kept every single one.
              </h1>
            </div>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg md:text-[18px] text-[#2E3543]/70 font-sans leading-[1.75] max-w-2xl">
              Aura Developments was built on a simple belief — that people deserve developers they can actually trust. No delays. No legal nightmares. No buildings that fall apart two years later. Just beautiful spaces, handed over on time, and cared for long after.
            </p>

            {/* Founding year badge */}
            <div className="pt-4 flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-[#5AC2EB]/40 flex flex-col items-center justify-center bg-[#5AC2EB]/5 relative" id="badge-est">
                <span className="text-[10px] font-sans font-semibold tracking-wider text-[#2E3543]/60 uppercase">EST.</span>
                <span className="font-serif text-lg font-bold text-[#5AC2EB]">2009</span>
                <div className="absolute inset-0.5 rounded-full border border-dashed border-[#5AC2EB]/30" />
              </div>
              <div className="text-xs text-[#2E3543]/60 max-w-xs font-sans italic">
                Over a decade and a half of crafting landmark addresses across Gulshan, Banani, and Dhanmondi.
              </div>
            </div>

          </div>

          {/* Right Side: Vertical Timeline Illustration Column (Width 45%) */}
          <div className="lg:col-span-5 relative" id="about-timeline-box">
            
            <div className="relative border-l border-[#5AC2EB]/30 pl-8 space-y-8 py-2">
              
              {/* Vertical line glow accent */}
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-[#5AC2EB] via-[#5AC2EB]/70 to-[#5AC2EB]/10" />

              {timelineEvents.map((evt, idx) => (
                <motion.div 
                  key={evt.year}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  {/* Timeline Node circular marker */}
                  <div className="absolute -left-[38px] top-1.5 w-[14px] h-[14px] rounded-full bg-[#5AC2EB] border-4 border-[#FDFCFC] group-hover:scale-130 group-hover:bg-[#2E3543] transition-all" />
                  
                  {/* Year marker */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#5AC2EB] tracking-wider font-sans">
                      {evt.year}
                    </span>
                    <div className="h-[1px] w-4 bg-[#5AC2EB]/20" />
                  </div>

                  <p className="text-xs sm:text-sm text-[#2E3543]/70 font-sans mt-1 leading-relaxed">
                    {evt.desc}
                  </p>
                </motion.div>
              ))}

            </div>

            {/* Horizontal Timeline Strip overlay for screens under md/sm */}
            <div className="block lg:hidden mt-12 bg-gray-50 rounded-2xl p-6 overflow-x-auto whitespace-nowrap scrollbar-thin border border-gray-100">
              <h5 className="text-[10px] uppercase tracking-widest text-[#5AC2EB] font-bold mb-4 font-sans">Milestone Progress Track</h5>
              <div className="flex gap-8">
                {timelineEvents.map((evt) => (
                  <div key={evt.year} className="inline-block min-w-[150px] whitespace-normal">
                    <span className="text-sm font-bold text-[#5AC2EB] font-mono">{evt.year}</span>
                    <p className="text-xs text-[#2E3543]/70 mt-1 leading-snug">{evt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: Our Beliefs — "What We Stand For" */}
      <section className="relative py-24 bg-[#2E3543] text-white overflow-hidden" id="our-beliefs">
        
        {/* Atmosphere central circular glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5AC2EB]/4 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-4xl mx-auto mb-16 relative">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block mb-6">
              OUR BELIEFS
            </span>
            
            {/* Ghost quotation marks in background of pullquote */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 font-serif text-[150px] text-[#5AC2EB]/10 leading-none select-none pointer-events-none">
              “
            </span>

            {/* Editorial pullquote statement */}
            <h2 className="text-2xl sm:text-4xl md:text-[52px] font-serif italic text-white font-normal leading-[1.3] relative z-10">
              "A building is only as good as the people who build it — <br className="hidden md:inline" />and only as valuable as the trust behind it."
            </h2>
            <p className="text-xs sm:text-sm font-sans tracking-widest uppercase text-white/50 mt-6">
              — Aura Developments, Founded 2009
            </p>

            {/* Central spacing rule */}
            <div className="w-20 h-[1.5px] bg-[#5AC2EB]/30 mx-auto mt-10" />
          </div>

          {/* Three Belief Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12" id="beliefs-pillars-grid">
            
            {/* Pillar 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 group hover:border-[#5AC2EB]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] mb-6">
                <User size={22} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                Buildings are for people. Full stop.
              </h4>
              <p className="text-sm text-white/70 font-sans leading-relaxed">
                Every design decision we make starts with one question: does this make the person living here happier? If the answer isn't a clear yes, we go back to the drawing board.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 group hover:border-[#5AC2EB]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] mb-6">
                <ShieldCheck size={22} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                Trust is Built, Not Claimed
              </h4>
              <p className="text-sm text-white/70 font-sans leading-relaxed">
                15 years, 55 projects, 1,200 families, and zero legal disputes. That's not a marketing line — it's a track record. And we protect it like it's the most valuable thing we own.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 group hover:border-[#5AC2EB]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] mb-6">
                <Compass size={22} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                Long-Term Thinking
              </h4>
              <p className="text-sm text-white/70 font-sans leading-relaxed">
                Every material we use, every structural decision we make — it's designed to stand beautifully for generations. Because a building with our name on it reflects us, forever.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: The Team — "The People Behind the Promise" */}
      <section className="relative py-24 bg-[#FDFCFC]" id="our-team">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Headers */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block">
              THE PEOPLE WHO KEEP THE PROMISES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-serif font-bold text-[#2E3543] leading-tight">
              Great buildings start with great people.
            </h2>
            <p className="text-sm sm:text-base text-[#2E3543]/70 font-sans leading-relaxed">
              Behind every on-time handover and every legally clear title is a team of people who genuinely care about getting it right.
            </p>
            <div className="w-12 h-[2px] bg-[#5AC2EB] mx-auto mt-4" />
          </div>

          {/* 4 Card Team Grid (2 columns x 2 rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="team-members-intro">
            
            {/* Card 1: Founder & CEO */}
            <div className="bg-white rounded-[20px] border border-[#5AC2EB]/20 p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 group hover:border-[#5AC2EB]/50 transition-all duration-300">
              <div className="shrink-0 w-24 h-24 rounded-full bg-[#5AC2EB]/10 border-2 border-[#5AC2EB]/30 flex items-center justify-center p-1 relative overflow-hidden">
                <div className="w-full h-full rounded-full bg-[#2E3543]/80 flex items-center justify-center text-white text-3xl font-serif">
                  KA
                </div>
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-serif text-2xl font-bold text-[#2E3543]">Kazi Aura Ahmed</h4>
                  <span className="text-[10px] font-sans font-bold text-[#5AC2EB] bg-[#5AC2EB]/10 px-3 py-1 rounded-full uppercase tracking-wider self-center sm:self-start">
                    Founder & CEO
                  </span>
                </div>
                <p className="text-sm font-sans italic text-[#2E3543]/65 leading-relaxed relative pt-2">
                  <span className="text-[#5AC2EB] font-serif text-2xl absolute -top-1.5 -left-1">“</span>
                  I started Aura because I bought a flat from a developer who lied to me. I decided to build the company I wished existed, and to speak with deep respect.
                </p>
              </div>
            </div>

            {/* Card 2: Head of Development */}
            <div className="bg-white rounded-[20px] border border-[#5AC2EB]/20 p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 group hover:border-[#5AC2EB]/50 transition-all duration-300">
              <div className="shrink-0 w-24 h-24 rounded-full bg-[#5AC2EB]/10 border-2 border-[#5AC2EB]/30 flex items-center justify-center p-1 relative overflow-hidden">
                <div className="w-full h-full rounded-full bg-[#2E3543]/80 flex items-center justify-center text-white text-3xl font-serif">
                  TR
                </div>
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-serif text-2xl font-bold text-[#2E3543]">Engr. Tanveer Rahman</h4>
                  <span className="text-[10px] font-sans font-bold text-[#5AC2EB] bg-[#5AC2EB]/10 px-3 py-1 rounded-full uppercase tracking-wider self-center sm:self-start">
                    Head of Development
                  </span>
                </div>
                <p className="text-sm font-sans italic text-[#2E3543]/65 leading-relaxed relative pt-2">
                  <span className="text-[#5AC2EB] font-serif text-2xl absolute -top-1.5 -left-1">“</span>
                  I've never missed a handover date in 12 years. I'm not planning to start now. We build with steel-framed integrity and strict RAJUK conformity.
                </p>
              </div>
            </div>

            {/* Card 3: Legal & Compliance Director */}
            <div className="bg-white rounded-[20px] border border-[#5AC2EB]/20 p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 group hover:border-[#5AC2EB]/50 transition-all duration-300">
              <div className="shrink-0 w-24 h-24 rounded-full bg-[#5AC2EB]/10 border-2 border-[#5AC2EB]/30 flex items-center justify-center p-1 relative overflow-hidden">
                <div className="w-full h-full rounded-full bg-[#2E3543]/80 flex items-center justify-center text-white text-3xl font-serif">
                  SC
                </div>
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-serif text-2xl font-bold text-[#2E3543]">Barrister S. Chowdhury</h4>
                  <span className="text-[10px] font-sans font-bold text-[#5AC2EB] bg-[#5AC2EB]/10 px-3 py-1 rounded-full uppercase tracking-wider self-center sm:self-start">
                    Legal Director
                  </span>
                </div>
                <p className="text-sm font-sans italic text-[#2E3543]/65 leading-relaxed relative pt-2">
                  <span className="text-[#5AC2EB] font-serif text-2xl absolute -top-1.5 -left-1">“</span>
                  My job is to make sure every document is so clean it makes lawyers in other firms uncomfortable. Zero litigation in 15 years is our biggest trophy.
                </p>
              </div>
            </div>

            {/* Card 4: Head of Property Management */}
            <div className="bg-white rounded-[20px] border border-[#5AC2EB]/20 p-8 md:p-10 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 group hover:border-[#5AC2EB]/50 transition-all duration-300">
              <div className="shrink-0 w-24 h-24 rounded-full bg-[#5AC2EB]/10 border-2 border-[#5AC2EB]/30 flex items-center justify-center p-1 relative overflow-hidden">
                <div className="w-full h-full rounded-full bg-[#2E3543]/80 flex items-center justify-center text-white text-3xl font-serif">
                  ZA
                </div>
              </div>
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-serif text-2xl font-bold text-[#2E3543]">Zubair Al-Sami</h4>
                  <span className="text-[10px] font-sans font-bold text-[#5AC2EB] bg-[#5AC2EB]/10 px-3 py-1 rounded-full uppercase tracking-wider self-center sm:self-start">
                    Property Management
                  </span>
                </div>
                <p className="text-sm font-sans italic text-[#2E3543]/65 leading-relaxed relative pt-2">
                  <span className="text-[#5AC2EB] font-serif text-2xl absolute -top-1.5 -left-1">“</span>
                  The building doesn't end at handover for me. That's actually when my job really begins. We keep our completed premises pristine and highly prestigious.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: Awards, Certifications & Press — "The Industry Agrees" */}
      <section className="relative h-auto md:h-[200px] bg-[#2E3543] text-white flex items-center py-12 md:py-0 border-y border-white/5" id="awards-band">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          
          {/* Eyebrow and brief text with border indicator */}
          <div className="flex items-center gap-6 md:w-1/3 text-center md:text-left">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#5AC2EB]">
              RECOGNIZED FOR EXCELLENCE
            </span>
            <div className="hidden md:block w-[1px] h-10 bg-[#5AC2EB]/30" />
          </div>

          {/* Hard credentials placeholders / text items row (Width 60% opacity) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 md:flex items-center justify-end gap-6 md:gap-12 w-full md:w-2/3">
            
            <div className="opacity-60 hover:opacity-100 transition-all text-center md:text-right cursor-default">
              <span className="block font-serif text-[13px] font-bold text-[#FDFCFC]">RAJUK</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">Certified Builder</span>
            </div>

            <div className="opacity-60 hover:opacity-100 transition-all text-center md:text-right cursor-default">
              <span className="block font-serif text-[13px] font-bold text-[#FDFCFC]">REHAB</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">Active Member</span>
            </div>

            <div className="opacity-60 hover:opacity-100 transition-all text-center md:text-right cursor-default">
              <span className="block font-serif text-[13px] font-bold text-[#FDFCFC]">ISO 9001</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">Quality Standards</span>
            </div>

            <div className="opacity-60 hover:opacity-100 transition-all text-center md:text-right cursor-default">
              <span className="block font-serif text-[13px] font-bold text-[#9be3ff]">THE DAILY STAR</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">Featured Press</span>
            </div>

            <div className="opacity-60 hover:opacity-100 transition-all text-center md:text-right cursor-default col-span-2 sm:col-span-1">
              <span className="block font-serif text-[13px] font-bold text-[#FDFCFC]">PROTHOM ALO</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">Media Coverage</span>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: Final CTA — "Now You Know Us. Let's Talk." */}
      <section className="relative py-24 bg-[#FDFCFC]" id="about-final-cta">
        
        {/* Soft centered blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#5AC2EB]/6 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          
          {/* Glassmorphism Box */}
          <div className="bg-white/80 backdrop-blur-md rounded-[32px] border border-[#5AC2EB]/25 p-8 md:p-16 max-w-5xl text-center relative overflow-hidden" id="manifesto-card">
            
            {/* Technical drawing corner registration marks */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#5AC2EB]/40 pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#5AC2EB]/40 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#5AC2EB]/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#5AC2EB]/40 pointer-events-none" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5AC2EB] block mb-4">
              WE'D LOVE TO MEET YOU
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-[52px] font-serif font-bold text-[#2E3543] leading-tight">
              Fifteen years of promises kept. <br />What can we do for you?
            </h2>

            <p className="mt-6 text-sm sm:text-base md:text-[17px] text-[#2E3543]/70 font-sans leading-relaxed max-w-2xl mx-auto">
              Whether you're looking for your next home, considering what to do with your land, or just curious about what we're building next — pull up a chair. We love a good conversation.
            </p>

            {/* Dual Actions CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenBooking('buyer')}
                className="w-full sm:w-auto bg-[#5AC2EB] hover:bg-[#5AC2EB]/95 text-[#2E3543] font-sans font-semibold text-sm tracking-widest uppercase px-8 py-4 rounded-xl shadow-lg shadow-[#5AC2EB]/15 transition-all cursor-pointer"
              >
                Come Take a Private Look →
              </button>
              
              <button
                onClick={onNavigateLandowners}
                className="w-full sm:w-auto bg-[#2E3543] hover:bg-[#2E3543]/90 text-white font-sans font-semibold tracking-widest text-sm uppercase px-8 py-4 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Let's Talk About Your Land →
              </button>
            </div>

            {/* Direct contact details underneath */}
            <p className="mt-8 text-xs sm:text-sm text-[#2E3543]/50 font-sans" id="micro-contact">
              Or reach us directly at:{' '}
              <span className="text-[#2E3543] font-semibold underline hover:text-[#5AC2EB] transition-colors">
                hello@auradevelopments.com
              </span>{' '}
              · <span className="text-[#2E3543] font-semibold">+880 1711-555555</span>
            </p>

          </div>

        </div>
      </section>

      {/* FOOTER component consistent with spec */}
      <footer className="relative bg-[#2E3543] text-white pt-20 overflow-hidden" id="about-footer">
        {/* Atmosphere central glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#5AC2EB]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Highlight 2px gradient border line */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#5AC2EB] to-transparent absolute top-0 left-0" />

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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button
              onClick={() => onOpenBooking('buyer')}
              className="w-full sm:w-auto bg-[#5AC2EB] hover:bg-[#5AC2EB]/95 text-[#2E3543] font-sans font-bold tracking-widest text-xs uppercase px-8 py-4 rounded-xl shadow-lg shadow-[#5AC2EB]/15 transition-all cursor-pointer"
            >
              Inquire About Homes
            </button>
            <button
              onClick={onNavigateLandowners}
              className="w-full sm:w-auto border border-white hover:bg-white/10 text-[#FDFCFC] font-sans font-semibold tracking-widest text-xs uppercase px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              Partner With Aura
            </button>
          </div>

          {/* Quick contact list */}
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

        {/* Grid navigation and legal declarations */}
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

            {/* Column 2 - Explore links */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.25em] text-[#FDFCFC] uppercase mb-6 flex flex-col gap-2">
                EXPLORE
                <div className="w-8 h-[2px] bg-[#5AC2EB]" />
              </h4>
              <nav className="flex flex-col gap-3 text-xs sm:text-sm text-white/65">
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateProjects(); }} className="hover:text-[#5AC2EB] transition-colors">
                  Our Projects
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateBuyers(); }} className="hover:text-[#5AC2EB] transition-colors">
                  For Buyers
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateLandowners(); }} className="hover:text-[#5AC2EB] transition-colors">
                  For Landowners
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); handleScrollToTop(); }} className="text-[#5AC2EB] font-bold transition-colors">
                  About Aura (Current Page)
                </a>
              </nav>
            </div>

            {/* Column 3 - Dhaka locations serviced */}
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

            {/* Column 4 - Dynamic Certifications */}
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.25em] text-[#FDFCFC] uppercase mb-6 flex flex-col gap-2">
                COUNT ON US
                <div className="w-8 h-[2px] bg-[#5AC2EB]" />
              </h4>
              <div className="space-y-4 text-xs font-sans text-white/70">
                <div className="flex items-center gap-2 bg-[#5AC2EB]/5 p-2 rounded-lg">
                  <Landmark size={15} className="text-[#5AC2EB]" />
                  <span>RAJUK Verified structural safety standards.</span>
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
