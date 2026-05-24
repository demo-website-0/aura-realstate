import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Building2, 
  Layers, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  Info, 
  DollarSign, 
  Bed, 
  Bath, 
  Maximize2,
  Calendar,
  Compass
} from 'lucide-react';
import { DetailedProject, projectsDetailList } from '../data/projectsDetailData';
import Footer from './Footer';

interface ProjectDetailPageProps {
  projectSlug: string;
  onOpenBooking: (audience: 'buyer' | 'landowner' | 'general') => void;
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
  onNavigateBuyers: () => void;
  onNavigateLandowners: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
}

export default function ProjectDetailPage({
  projectSlug,
  onOpenBooking,
  onNavigateHome,
  onNavigateProjects,
  onNavigateBuyers,
  onNavigateLandowners,
  onNavigateAbout,
  onNavigateContact
}: ProjectDetailPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);

  // Find project in dictionary; fallback to Skyline if not found to prevent broken pages
  const project: DetailedProject = projectsDetailList.find(p => p.slug === projectSlug) || projectsDetailList[0];

  // Dynamic values based on categories
  const categoryLabel = project.category === 'residential' ? 'Residential' : 'Commercial';

  // Toggle bottom sticky bar scroll listener
  useEffect(() => {
    const handleScroll = () => {
      // Show bottom sticky bar after scrolling past 500px
      if (window.scrollY > 500) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadBrochure = () => {
    setDownloadingBrochure(true);
    setTimeout(() => {
      setDownloadingBrochure(false);
      alert(`Thank you for your interest! The brochure for ${project.name} has been initiated for secure download.`);
    }, 1200);
  };

  const handleEnquireUnit = (unitName: string) => {
    onOpenBooking('buyer');
  };

  // Modern Architectural SVG Render Line-art Blueprint Templates
  const renderFallbackIllustration = (index: number) => {
    switch (index) {
      case 0:
        // Slot 1: Building exterior elevation line art
        return (
          <svg viewBox="0 0 800 450" className="w-full h-full bg-[#2E3543] select-none" id="svg-exterior">
            <line x1="150" y1="50" x2="150" y2="400" stroke="#5AC2EB" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
            <line x1="650" y1="50" x2="650" y2="400" stroke="#5AC2EB" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
            <line x1="400" y1="50" x2="400" y2="400" stroke="#5AC2EB" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
            <line x1="100" y1="400" x2="700" y2="400" stroke="#5AC2EB" strokeWidth="2" />
            <rect x="260" y="80" width="280" height="320" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            
            {/* Terraces */}
            <rect x="230" y="130" width="60" height="20" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            <rect x="510" y="180" width="60" height="20" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            <rect x="230" y="230" width="60" height="20" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            <rect x="510" y="280" width="60" height="20" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            <rect x="230" y="330" width="60" height="20" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            
            {/* Window Grid */}
            <line x1="330" y1="80" x2="330" y2="400" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.4" />
            <line x1="400" y1="80" x2="400" y2="400" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.4" />
            <line x1="470" y1="80" x2="470" y2="400" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.4" />
            <line x1="260" y1="130" x2="540" y2="130" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.4" />
            <line x1="260" y1="180" x2="540" y2="180" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.4" />
            <line x1="260" y1="230" x2="540" y2="230" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.4" />
            <line x1="260" y1="280" x2="540" y2="280" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.4" />
            <line x1="260" y1="330" x2="540" y2="330" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.4" />
            
            {/* Trees */}
            <path d="M 640,400 C 640,375 660,375 660,400" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M 650,400 C 650,365 675,365 675,400" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M 140,400 C 140,360 170,360 170,400" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.6" />
            
            <text x="50%" y="45" dominantBaseline="middle" textAnchor="middle" fill="#5AC2EB" fontSize="10" fontFamily="monospace" letterSpacing="3" fillOpacity="0.8">SLOT 01 · OUTSIDE FACADE BLUEPRINT</text>
          </svg>
        );
      case 1:
        // Slot 2: Interior living space floor plan illustration
        return (
          <svg viewBox="0 0 800 450" className="w-full h-full bg-[#2E3543] select-none" id="svg-floorplan">
            <rect x="180" y="70" width="440" height="310" stroke="#5AC2EB" strokeWidth="2" fill="none" />
            <line x1="380" y1="70" x2="380" y2="380" stroke="#5AC2EB" strokeWidth="1.5" />
            <line x1="380" y1="220" x2="620" y2="220" stroke="#5AC2EB" strokeWidth="1.5" />
            <line x1="180" y1="200" x2="380" y2="200" stroke="#5AC2EB" strokeWidth="1.5" />
            
            {/* Door swings */}
            <path d="M 380,250 A 30,30 0 0,1 410,280" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.8" />
            <line x1="380" y1="280" x2="380" y2="250" stroke="#5AC2EB" strokeWidth="1" opacity="0.8" />
            <path d="M 380,180 A 30,30 0 0,0 350,150" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.8" />
            <line x1="380" y1="150" x2="380" y2="180" stroke="#5AC2EB" strokeWidth="1" opacity="0.8" />
            
            {/* Furniture - Sofa & Table */}
            <rect x="440" y="110" width="100" height="30" rx="3" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.6" />
            <circle cx="490" cy="170" r="12" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.4" />
            
            {/* Master Bed */}
            <rect x="210" y="240" width="90" height="80" rx="4" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.6" />
            <rect x="220" y="245" width="30" height="15" stroke="#5AC2EB" strokeWidth="0.8" fill="none" opacity="0.5" />
            <rect x="260" y="245" width="30" height="15" stroke="#5AC2EB" strokeWidth="0.8" fill="none" opacity="0.5" />
            <line x1="210" y1="275" x2="300" y2="275" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.5" strokeDasharray="2 2" />
            
            {/* Room labels */}
            <text x="280" y="130" fill="#5AC2EB" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.8">BEDROOM 01</text>
            <text x="500" y="290" fill="#5AC2EB" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.8">LIVING AREA</text>
            <text x="280" y="300" fill="#5AC2EB" fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.8">MASTER SUITE</text>
            
            <text x="50%" y="45" dominantBaseline="middle" textAnchor="middle" fill="#5AC2EB" fontSize="10" fontFamily="monospace" letterSpacing="3" fillOpacity="0.8">SLOT 02 · INTERIOR LAYOUT BLUEPRINT</text>
          </svg>
        );
      case 2:
        // Slot 3: Rooftop terrace aerial illustration
        return (
          <svg viewBox="0 0 800 450" className="w-full h-full bg-[#2E3543] select-none" id="svg-rooftop">
            <rect x="150" y="60" width="500" height="330" rx="15" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            <rect x="180" y="100" width="200" height="130" rx="8" stroke="#5AC2EB" strokeWidth="2" fill="none" />
            
            {/* Waves */}
            <path d="M 200,120 Q 250,110 300,125 T 360,120" stroke="#5AC2EB" strokeWidth="0.5" fill="none" opacity="0.4" />
            <path d="M 200,165 Q 250,155 300,170 T 360,165" stroke="#5AC2EB" strokeWidth="0.5" fill="none" opacity="0.4" />
            
            {/* Sunbeds */}
            <rect x="200" y="260" width="25" height="45" rx="2" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.6" />
            <line x1="200" y1="275" x2="225" y2="275" stroke="#5AC2EB" strokeWidth="1" opacity="0.6" />
            <rect x="240" y="260" width="25" height="45" rx="2" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.6" />
            <line x1="240" y1="275" x2="265" y2="275" stroke="#5AC2EB" strokeWidth="1" opacity="0.6" />
            
            {/* Botanical Planters */}
            <circle cx="560" cy="140" r="25" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            <circle cx="560" cy="140" r="10" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="560" cy="280" r="30" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            <path d="M 560,250 Q 550,265 560,280 T 560,310" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.7" />
            
            {/* Outer lounge bar */}
            <rect x="420" y="150" width="70" height="110" rx="4" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.6" />
            <circle cx="400" cy="180" r="6" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="400" cy="210" r="6" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="500" cy="180" r="6" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="500" cy="210" r="6" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.5" />
            
            <text x="50%" y="45" dominantBaseline="middle" textAnchor="middle" fill="#5AC2EB" fontSize="10" fontFamily="monospace" letterSpacing="3" fillOpacity="0.8">SLOT 03 · SKY GARDEN &amp; INFINITY POOL DRAWING</text>
          </svg>
        );
      case 3:
        // Slot 4: Lobby/entrance architectural render line art
        return (
          <svg viewBox="0 0 800 450" className="w-full h-full bg-[#2E3543] select-none" id="svg-lobby">
            <rect x="120" y="60" width="560" height="330" stroke="#5AC2EB" strokeWidth="1.5" fill="none" />
            <line x1="120" y1="390" x2="300" y2="280" stroke="#5AC2EB" strokeWidth="1" opacity="0.4" />
            <line x1="680" y1="390" x2="500" y2="280" stroke="#5AC2EB" strokeWidth="1" opacity="0.4" />
            <line x1="120" y1="60" x2="300" y2="180" stroke="#5AC2EB" strokeWidth="1" opacity="0.4" />
            <line x1="680" y1="60" x2="500" y2="180" stroke="#5AC2EB" strokeWidth="1" opacity="0.4" />
            
            {/* Columns */}
            <line x1="220" y1="60" x2="220" y2="390" stroke="#5AC2EB" strokeWidth="2" opacity="0.8" />
            <line x1="580" y1="60" x2="580" y2="390" stroke="#5AC2EB" strokeWidth="2" opacity="0.8" />
            
            {/* Desk */}
            <path d="M 320,300 L 480,300 L 460,340 L 340,340 Z" stroke="#5AC2EB" strokeWidth="2" fill="none" />
            <line x1="320" y1="300" x2="320" y2="330" stroke="#5AC2EB" strokeWidth="1.5" />
            <line x1="480" y1="300" x2="480" y2="330" stroke="#5AC2EB" strokeWidth="1.5" />
            
            {/* Hanging modern lighting loops */}
            <path d="M 370,80 Q 400,140 380,180 T 420,230" stroke="#5AC2EB" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.7" />
            <path d="M 410,80 Q 430,150 410,190 T 440,230" stroke="#5AC2EB" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.7" />
            
            <text x="50%" y="45" dominantBaseline="middle" textAnchor="middle" fill="#5AC2EB" fontSize="10" fontFamily="monospace" letterSpacing="3" fillOpacity="0.8">SLOT 04 · HIGH-CEILING LOUNGE PERSPECTIVE</text>
          </svg>
        );
      case 4:
        // Slot 5: Bedroom interior minimalist illustration
        return (
          <svg viewBox="0 0 800 450" className="w-full h-full bg-[#2E3543] select-none" id="svg-bedroom">
            <rect x="120" y="60" width="560" height="330" stroke="#5AC2EB" strokeWidth="1.5" fill="none" opacity="0.6" />
            <rect x="290" y="210" width="220" height="140" rx="8" stroke="#5AC2EB" strokeWidth="2" fill="none" />
            
            {/* Pillows */}
            <rect x="315" y="220" width="75" height="35" rx="4" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.8" />
            <rect x="410" y="220" width="75" height="35" rx="4" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.8" />
            <line x1="290" y1="280" x2="510" y2="280" stroke="#5AC2EB" strokeWidth="1.5" />
            
            {/* Bed tables & floor lighting */}
            <rect x="225" y="250" width="45" height="50" rx="2" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.5" />
            <rect x="530" y="250" width="45" height="50" rx="2" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.5" />
            <line x1="247" y1="60" x2="247" y2="190" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.5" />
            <circle cx="247" cy="200" r="8" stroke="#5AC2EB" strokeWidth="1.2" fill="none" opacity="0.7" />
            <line x1="552" y1="60" x2="552" y2="190" stroke="#5AC2EB" strokeWidth="0.8" opacity="0.5" />
            <circle cx="552" cy="200" r="8" stroke="#5AC2EB" strokeWidth="1.2" fill="none" opacity="0.7" />
            
            <text x="50%" y="45" dominantBaseline="middle" textAnchor="middle" fill="#5AC2EB" fontSize="10" fontFamily="monospace" letterSpacing="3" fillOpacity="0.8">SLOT 05 · MINIMALIST MASTER SUITE BLUEPRINT</text>
          </svg>
        );
      case 5:
      default:
        // Slot 6: Building location aerial map illustration
        return (
          <svg viewBox="0 0 800 450" className="w-full h-full bg-[#2E3543] select-none" id="svg-roadmap">
            <line x1="100" y1="50" x2="100" y2="400" stroke="#5AC2EB" strokeWidth="2" opacity="0.3" />
            <line x1="280" y1="50" x2="280" y2="400" stroke="#5AC2EB" strokeWidth="3" opacity="0.4" />
            <line x1="450" y1="50" x2="450" y2="400" stroke="#5AC2EB" strokeWidth="2.5" opacity="0.3" strokeDasharray="4 4" />
            <line x1="650" y1="50" x2="650" y2="400" stroke="#5AC2EB" strokeWidth="4" opacity="0.2" />
            <line x1="50" y1="130" x2="750" y2="130" stroke="#5AC2EB" strokeWidth="4" opacity="0.4" />
            <line x1="50" y1="290" x2="750" y2="290" stroke="#5AC2EB" strokeWidth="2.5" opacity="0.3" />
            
            {/* Recreation lake curves */}
            <path d="M 450,50 Q 520,150 460,250 T 630,400" stroke="#5AC2EB" strokeWidth="1.5" strokeDasharray="2 3" fill="none" opacity="0.5" />
            
            {/* Target Circle site indicator */}
            <circle cx="280" cy="290" r="35" stroke="#5AC2EB" strokeWidth="0.8" strokeDasharray="4 4" fill="none" opacity="0.5" />
            <circle cx="280" cy="290" r="15" stroke="#5AC2EB" strokeWidth="1" fill="none" opacity="0.4" />
            
            {/* Solid Map pin */}
            <path d="M 280,290 C 272,274 270,268 270,260 C 270,251 274,246 280,246 C 286,246 290,251 290,260 C 290,268 288,274 280,290 Z" fill="#5AC2EB" opacity="0.9" />
            <circle cx="280" cy="260" r="3" fill="#2E3543" />
            
            <text x="50%" y="45" dominantBaseline="middle" textAnchor="middle" fill="#5AC2EB" fontSize="10" fontFamily="monospace" letterSpacing="3" fillOpacity="0.8">SLOT 06 · AREA SECTOR PLAN</text>
          </svg>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCFC] text-[#2E3543] font-sans overflow-x-hidden" id="project-detail-view-root">
      
      {/* SECTION 1: Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-[#FDFCFC]/85 backdrop-blur-[20px] border-b border-[#5AC2EB]/20 shadow-sm transition-all" id="detail-nav-bar">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
          
          {/* Logo brand */}
          <button 
            onClick={onNavigateHome} 
            className="font-serif text-2xl font-bold text-[#2E3543] hover:text-[#5AC2EB] transition-colors cursor-pointer text-left"
            id="aura-brand-logo"
          >
            Aura Developments
          </button>

          {/* Center navigation */}
          <nav className="hidden md:flex items-center gap-8 font-sans" id="desktop-detail-nav">
            <button 
              onClick={onNavigateProjects} 
              className="text-sm font-semibold tracking-wider text-[#2E3543]/80 hover:text-[#5AC2EB] transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button 
              onClick={onNavigateBuyers} 
              className="text-sm font-semibold tracking-wider text-[#2E3543]/80 hover:text-[#5AC2EB] transition-colors cursor-pointer"
            >
              For Buyers
            </button>
            <button 
              onClick={onNavigateLandowners} 
              className="text-sm font-semibold tracking-wider text-[#2E3543]/80 hover:text-[#5AC2EB] transition-colors cursor-pointer"
            >
              For Landowners
            </button>
            <button 
              onClick={onNavigateAbout} 
              className="text-sm font-semibold tracking-wider text-[#2E3543]/80 hover:text-[#5AC2EB] transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={onNavigateContact} 
              className="text-sm font-semibold tracking-wider text-[#2E3543]/80 hover:text-[#5AC2EB] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action CTA */}
          <button
            onClick={() => onOpenBooking('general')}
            className="bg-[#5AC2EB] hover:bg-[#5AC2EB]/90 text-[#2E3543] font-semibold text-xs py-3 px-5 sm:px-6 rounded-xl hover:shadow-lg transition-all uppercase tracking-wider cursor-pointer"
            id="nav-consultation-cta"
          >
            Book a Private Visit
          </button>
        </div>

        {/* Breadcrumb Trail Strip (8px spacing layout) */}
        <div className="w-full bg-[#FDFCFC] border-t border-[#2E3543]/5 py-2.5 px-6 md:px-12 flex items-center h-10" id="breadcrumb-bar">
          <div className="max-w-7xl mx-auto w-full text-xs font-semibold tracking-wide text-[#2E3543]/50 flex items-center gap-1.5 font-sans">
            <button 
              onClick={onNavigateHome} 
              className="hover:text-[#5AC2EB] transition-colors cursor-pointer"
            >
              Aura
            </button>
            <span className="text-[#5AC2EB]">›</span>
            <button 
              onClick={onNavigateProjects} 
              className="hover:text-[#5AC2EB] transition-colors cursor-pointer"
            >
              Projects
            </button>
            <span className="text-[#5AC2EB]">›</span>
            <span className="text-[#2E3543]/60">{categoryLabel}</span>
            <span className="text-[#5AC2EB]">›</span>
            <span className="text-[#2E3543] leading-none font-bold" id="current-project-breadcrumb">{project.name}</span>
          </div>
        </div>
      </header>

      {/* Main Container Core */}
      <main className="max-w-[1100px] mx-auto px-6 py-10 flex flex-col gap-[28px]" id="project-main-container">
        
        {/* Above the gallery — Project Title Block */}
        <div className="text-left w-full pt-4 pb-2 border-b border-[#2E3543]/5 flex flex-col md:flex-row md:items-end justify-between gap-4" id="project-title-block">
          <div>
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#5AC2EB] bg-[#5AC2EB]/15 px-3.5 py-1.5 rounded-full mb-3 font-sans">
              {project.category} · {project.location}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2E3543] leading-tight select-all">
              {project.name}
            </h1>
            <p className="text-sm md:text-base text-[#2E3543]/60 mt-1 font-serif italic text-left">
              “{project.tagline}”
            </p>
          </div>
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold font-sans ${
              project.status === 'Completed' 
                ? 'bg-[#5AC2EB]/10 text-[#5AC2EB]' 
                : 'bg-green-500/10 text-green-600'
            }`}>
              {project.status === 'Completed' ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5AC2EB]" />
                  Completed ✓
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Ongoing
                </>
              )}
            </span>
          </div>
        </div>

        {/* SECTION 2: Project Hero — Image Gallery */}
        <section className="flex flex-col gap-4 select-none" id="section-gallery">
          {/* Tier 1 — Hero Image Display */}
          <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#2E3543] shadow-md group" id="hero-display-parent">
            {/* SVG Content or Placeholder display */}
            <div className="w-full h-full transform transition-all duration-300">
              {renderFallbackIllustration(activeImageIndex)}
            </div>

            {/* Left and Right Arrow Controllers */}
            <button
              onClick={() => setActiveImageIndex(prev => (prev === 0 ? 5 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-2xl font-bold cursor-pointer hover:bg-white/35 hover:scale-105 active:scale-95 transition-all"
              aria-label="Previous Illustration"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveImageIndex(prev => (prev === 5 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-2xl font-bold cursor-pointer hover:bg-white/35 hover:scale-105 active:scale-95 transition-all"
              aria-label="Next Illustration"
            >
              ›
            </button>

            {/* Glassmorphic Badge Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-[10px] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#FDFCFC] shadow-sm font-sans tracking-widest border border-white/10">
              {activeImageIndex + 1} / 6
            </div>
          </div>

          {/* Tier 2 — Thumbnail Strip */}
          <div className="grid grid-cols-6 gap-2 sm:gap-3" id="thumbnail-strip">
            {[...Array(6)].map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`relative aspect-[88/72] w-full rounded-xl overflow-hidden cursor-pointer transition-all ${
                  activeImageIndex === i 
                    ? 'border-2 border-[#5AC2EB] ring-2 ring-[#5AC2EB]/20 brightness-100 scale-[0.98]' 
                    : 'brightness-75 hover:brightness-100 border border-transparent'
                }`}
                id={`thumbnail-trigger-${i}`}
              >
                {/* Micro SVG preview rendering inside thumbnails */}
                <div className="w-full h-full pointer-events-none scale-[1.05]">
                  {renderFallbackIllustration(i)}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Content Editorial Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[28px]" id="project-details-grid">
          
          {/* SECTION 3: Basic Details Card */}
          <section id="section-basic-details" className="h-full">
            <div className="relative bg-white/85 backdrop-blur-[16px] border border-[#5AC2EB]/20 rounded-[20px] shadow-[0_8px_32px_rgba(46,53,67,0.06)] p-8 md:p-10 h-full flex flex-col justify-between overflow-hidden group">
              
              {/* Left Grounding accent border line (brand signature detail) */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5AC2EB] to-[#5AC2EB]/10" />

              <div>
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#2E3543]">
                    Basic Details
                  </h3>
                  <div className="w-10 h-[2px] bg-[#5AC2EB] mt-1.5" />
                </div>

                <div className="space-y-4 font-sans text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-[#2E3543]/5 hover:bg-[#5AC2EB]/5 px-2 rounded-lg transition-colors">
                    <span className="text-[#2E3543]/50">Project Name</span>
                    <span className="font-semibold text-[#2E3543]">{project.name}</span>
                  </div>
                  <div className="flex justify-between items-start py-2 border-b border-[#2E3543]/5 hover:bg-[#5AC2EB]/5 px-2 rounded-lg transition-colors">
                    <span className="text-[#2E3543]/50">Address</span>
                    <span className="font-semibold text-[#2E3543] text-right max-w-[200px]">{project.address}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#2E3543]/5 hover:bg-[#5AC2EB]/5 px-2 rounded-lg transition-colors">
                    <span className="text-[#2E3543]/50">Type</span>
                    <span className="font-semibold text-[#2E3543]">{categoryLabel} Suite</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#2E3543]/5 hover:bg-[#5AC2EB]/5 px-2 rounded-lg transition-colors">
                    <span className="text-[#2E3543]/50">Status</span>
                    <span className="font-semibold text-[#2E3543] flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-[#5AC2EB]' : 'bg-green-500'}`} />
                      {project.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#2E3543]/5 hover:bg-[#5AC2EB]/5 px-2 rounded-lg transition-colors">
                    <span className="text-[#2E3543]/50">Location</span>
                    <span className="font-semibold text-[#2E3543]">{project.location}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#2E3543]/5 hover:bg-[#5AC2EB]/5 px-2 rounded-lg transition-colors">
                    <span className="text-[#2E3543]/50">Land Size</span>
                    <span className="font-semibold text-[#2E3543]">{project.landSize}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleDownloadBrochure}
                  disabled={downloadingBrochure}
                  className="w-full bg-[#5AC2EB] hover:bg-[#5AC2EB]/95 active:scale-[0.99] hover:shadow-md text-[#2E3543] font-semibold text-sm py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer disabled:opacity-75"
                >
                  <Download size={16} className={`transition-transform duration-300 ${downloadingBrochure ? 'animate-bounce' : 'group-hover:translate-y-1'}`} />
                  {downloadingBrochure ? 'Securing brochure file...' : '⬇ Download Project Brochure'}
                </button>
              </div>

            </div>
          </section>

          {/* SECTION 4: Project Progress Tracker */}
          <section id="section-progress-tracker" className="h-full">
            <div className="relative bg-white/85 backdrop-blur-[16px] border border-[#5AC2EB]/20 rounded-[20px] shadow-[0_8px_32px_rgba(46,53,67,0.06)] p-8 md:p-10 h-full flex flex-col justify-between overflow-hidden">
              
              {/* Grounding accent border line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5AC2EB] to-[#5AC2EB]/10" />

              <div>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#2E3543]">
                      Project Progress
                    </h3>
                    <div className="w-10 h-[2px] bg-[#5AC2EB] mt-1.5" />
                  </div>
                  <span className="text-3xl font-bold text-[#5AC2EB] font-sans">
                    {project.overallProgress}%
                  </span>
                </div>

                {/* Master Progress Bar */}
                <div className="w-full bg-[#2E3543]/10 h-2.5 rounded-full relative mb-8" id="master-progress-track">
                  <div 
                    className="h-full bg-gradient-to-r from-[#5AC2EB] to-[#42afd6] rounded-full relative transition-[width] duration-[1200ms] ease-out shadow-[0_0_12px_rgba(90,194,235,0.4)]"
                    style={{ width: `${project.overallProgress}%` }}
                  >
                    {/* Pulsing glow dot */}
                    <span className="absolute -right-1 -top-0.5 w-[14px] h-[14px] bg-[#5AC2EB] rounded-full ring-4 ring-[#5AC2EB]/40 animate-[pulse_1.5s_infinite]" />
                  </div>
                </div>

                {/* Phase Progress Grid (2 columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="phase-progress-grid">
                  {project.phases.map((phase, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between border-b border-[#2E3543]/5 hover:bg-[#5AC2EB]/5 p-2 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center gap-2">
                        {/* Phase status icon */}
                        <span className={`w-4 h-4 flex items-center justify-center rounded-full border ${
                          phase.progress === 100 
                            ? 'bg-[#5AC2EB] border-[#5AC2EB] text-[#2E3543]' 
                            : phase.progress > 0 
                            ? 'bg-[#5AC2EB]/20 border-[#5AC2EB] text-[#5AC2EB]' 
                            : 'border-[#2E3543]/20 text-[#2E3543]/20'
                        }`}>
                          {phase.progress === 100 ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : phase.progress > 0 ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5AC2EB]" />
                          ) : null}
                        </span>
                        <span className="font-sans font-medium text-xs text-[#2E3543]/85">{phase.name}</span>
                      </div>
                      <span className="font-sans font-bold text-xs text-[#2E3543]">{phase.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust disclaimer text in margins */}
              <div className="mt-8 pt-4 border-t border-[#2E3543]/5 flex items-center gap-2.5 text-[11px] text-[#2E3543]/50">
                <Info size={14} className="text-[#5AC2EB] flex-shrink-0" />
                <span>All progress statuses are audited onsite monthly by our secure engineering team.</span>
              </div>

            </div>
          </section>

        </div>

        {/* SECTION 5: At a Glance — Specs Overview */}
        <section id="section-at-a-glance">
          <div className="relative bg-white/85 backdrop-blur-[16px] border border-[#5AC2EB]/20 rounded-[20px] shadow-[0_8px_32px_rgba(46,53,67,0.06)] p-8 md:p-10 overflow-hidden">
            
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5AC2EB] to-[#5AC2EB]/10" />

            {/* Large background decorative ghost watermark */}
            <div className="absolute right-6 bottom-0 font-serif text-[180px] font-bold text-[#2E3543]/3 leading-none select-none pointer-events-none">
              {project.units}
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-2xl font-bold text-[#2E3543]">
                At a Glance
              </h3>
              <div className="w-10 h-[2px] bg-[#5AC2EB] mt-1.5" />
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 border-l border-t border-[#2E3543]/5 md:border-none" id="at-a-glance-specs-grid">
              
              {/* Land size */}
              <div className="flex items-center gap-4 hover:bg-[#5AC2EB]/5 p-3 rounded-xl transition-all group/cell">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Compass size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#2E3543]/50 block font-normal">Land Size</span>
                  <span className="font-sans font-bold text-lg text-[#2E3543]/90">{project.landSize}</span>
                </div>
              </div>

              {/* Apartment size */}
              <div className="flex items-center gap-4 hover:bg-[#5AC2EB]/5 p-3 rounded-xl transition-all group/cell">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Maximize2 size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#2E3543]/50 block font-normal">Avail. Size</span>
                  <span className="font-sans font-bold text-lg text-[#2E3543]/90">{project.apartmentSize}</span>
                </div>
              </div>

              {/* Units */}
              <div className="flex items-center gap-4 hover:bg-[#5AC2EB]/5 p-3 rounded-xl transition-all group/cell">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Building2 size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#2E3543]/50 block font-normal">Units</span>
                  <span className="font-sans font-bold text-lg text-[#2E3543]/90">{project.units} Keys</span>
                </div>
              </div>

              {/* Parking */}
              <div className="flex items-center gap-4 hover:bg-[#5AC2EB]/5 p-3 rounded-xl transition-all group/cell">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#2E3543]/50 block font-normal">Ample Parking</span>
                  <span className="font-sans font-bold text-lg text-[#2E3543]/90">{project.parking}</span>
                </div>
              </div>

              {/* Floors */}
              <div className="flex items-center gap-4 hover:bg-[#5AC2EB]/5 p-3 rounded-xl transition-all group/cell">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <Layers size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#2E3543]/50 block font-normal">Floors Height</span>
                  <span className="font-sans font-bold text-lg text-[#2E3543]/90">{project.floors}</span>
                </div>
              </div>

              {/* Front Road */}
              <div className="flex items-center gap-4 hover:bg-[#5AC2EB]/5 p-3 rounded-xl transition-all group/cell">
                <div className="w-10 h-10 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB]">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#2E3543]/50 block font-normal">Front Road</span>
                  <span className="font-sans font-bold text-lg text-[#2E3543]/90">{project.frontRoad}</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 6: Flat Types / Unit Configuration Cards */}
        <section id="section-flat-types" className="flex flex-col gap-5">
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase text-[#5AC2EB] tracking-[0.25em] block">SELECT YOUR PREFERRED SUITE</span>
            <h3 className="font-serif text-3xl font-bold text-[#2E3543] mt-1">
              Flat Configurations &amp; Floor Options
            </h3>
            <div className="w-16 h-[2px] bg-[#5AC2EB] mt-3" />
          </div>

          <div className="space-y-6" id="configurations-card-parent">
            {project.flatTypes.map((flat, idx) => {
              const isP = flat.isPenthouse;
              return (
                <div
                  key={idx}
                  className={`relative rounded-[20px] p-8 md:p-10 select-none shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border ${
                    isP 
                      ? 'bg-gradient-to-r from-amber-500/5 via-amber-600/10 to-transparent border-amber-500/30 ring-1 ring-amber-500/20' 
                      : 'bg-white/85 border-[#5AC2EB]/20 hover:border-[#5AC2EB]/40'
                  }`}
                  id={`flat-card-${idx}`}
                >
                  
                  {/* Accent gradient bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    isP ? 'bg-gradient-to-b from-amber-500 to-amber-300' : 'bg-gradient-to-b from-[#5AC2EB] to-[#5AC2EB]/40'
                  }`} />

                  {/* Left Side: Unit Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        isP 
                          ? 'bg-amber-500/15 text-amber-700 border border-amber-500/10' 
                          : 'bg-[#5AC2EB]/15 text-[#5AC2EB]'
                      }`}>
                        {isP ? '👑 THE PREMIUM PENTHOUSE' : 'AVAILABLE UNIT'}
                      </span>
                    </div>

                    <h4 className="font-serif text-2xl font-bold text-[#2E3543]">
                      {flat.name}
                    </h4>

                    {/* Specifications list horizontal */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#2E3543]/60 font-sans mt-2">
                      <span className="flex items-center gap-1.5">
                        <Bed size={15} className={isP ? 'text-amber-500' : 'text-[#5AC2EB]'} />
                        <strong>{flat.bedrooms}</strong> Bed
                      </span>
                      <span className="text-[#2E3543]/20">·</span>
                      <span className="flex items-center gap-1.5">
                        <Bath size={15} className={isP ? 'text-amber-500' : 'text-[#5AC2EB]'} />
                        <strong>{flat.bathrooms}</strong> Bath
                      </span>
                      <span className="text-[#2E3543]/20">·</span>
                      <span className="flex items-center gap-1.5">
                        <Maximize2 size={15} className={isP ? 'text-amber-500' : 'text-[#5AC2EB]'} />
                        <strong>{flat.size}</strong> Coverage
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Price + Conversion CTA */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-4 min-w-[200px] w-full md:w-auto self-stretch justify-between md:justify-center border-t md:border-none pt-4 md:pt-0 border-[#2E3543]/5">
                    <div className="text-left md:text-right">
                      <span className="text-[11px] uppercase tracking-wider text-[#2E3543]/50 block font-sans">Guaranteed Value</span>
                      <span className={`font-serif text-3xl font-bold ${isP ? 'text-amber-600' : 'text-[#5AC2EB]'}`}>
                        {flat.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleEnquireUnit(flat.name)}
                      className={`font-semibold text-xs py-3.5 px-6 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 uppercase tracking-wide w-full sm:w-auto text-center justify-center ${
                        isP 
                          ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md' 
                          : 'bg-[#2E3543] hover:bg-[#2E3543]/90 text-white'
                      }`}
                    >
                      Enquire About This Unit
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: Project Location */}
        <section id="section-project-location">
          <div className="relative bg-white/85 backdrop-blur-[16px] border border-[#5AC2EB]/20 rounded-[20px] shadow-[0_8px_32px_rgba(46,53,67,0.06)] overflow-hidden">
            
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#5AC2EB] to-[#5AC2EB]/10" />

            <div className="p-8 md:p-10 pb-6">
              <h3 className="font-serif text-2xl font-bold text-[#2E3543] flex items-center gap-2">
                Project Location
              </h3>
              <div className="w-10 h-[2px] bg-[#5AC2EB] mt-1.5 mb-4" />

              <div className="flex flex-wrap items-center gap-4 mb-2">
                <span className="text-sm font-sans font-semibold text-[#2E3543] flex items-center gap-1">
                  <MapPin size={15} className="text-[#5AC2EB]" />
                  {project.address}
                </span>
              </div>

              {/* Neighborhood Highlight Pills */}
              <div className="flex flex-wrap gap-2 mt-4" id="neighborhood-highlights-pills">
                {project.neighbourhoodHighlights.map((high, idx) => (
                  <span 
                    key={idx}
                    className="text-[11px] font-semibold text-[#5AC2EB] bg-[#5AC2EB]/10 border border-[#5AC2EB]/25 px-3 py-1 bg-opacity-15 rounded-full"
                  >
                    {high}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Part: Map Embed iframe */}
            <div className="relative w-full h-[380px] bg-slate-900 overflow-hidden group border-t border-[#5AC2EB]/10" id="google-maps-frame-view">
              {/* Fallback styling for Premium Google Iframe representing real Dhaka coords, keeping fallback illustration toggle inside */}
              <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(project.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(15%) contrast(100%) invert(2%) saturate(100%)' }}
                allowFullScreen={false} 
                loading="lazy"
                title={`${project.name} Google Map Location`}
              />
              
              {/* Left/Right Map Border Color Gradient Cover Overlay */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#5AC2EB]/8 to-transparent pointer-events-none" />
            </div>

          </div>
        </section>

      </main>

      {/* SECTION 8: Sticky Bottom CTA Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ translateY: 80, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 bg-[#2E3543] h-[76px] z-40 border-t border-[#5AC2EB]/40 flex items-center shadow-[0_-8px_32px_rgba(46,53,67,0.25)] select-none"
            id="sticky-bottom-detail-bar"
          >
            <div className="max-w-[1100px] mx-auto w-full px-6 flex items-center justify-between gap-6">
              
              {/* Left Column info */}
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-serif text-base font-bold text-white leading-tight">
                  {project.name}
                </span>
                <span className="text-[11px] font-sans text-white/50 tracking-wide">
                  {categoryLabel} Suite &amp; Luxury Residence
                </span>
              </div>

              {/* Center tag line text */}
              <div className="hidden lg:block text-center max-w-sm">
                <p className="text-xs text-white/70 italic line-clamp-1 font-serif">
                  Ready to secure your piece of the exclusive Dhaka skyline?
                </p>
              </div>

              {/* Right Action buttons */}
              <div className="flex items-center gap-2.5 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={handleDownloadBrochure}
                  className="border border-[#5AC2EB]/40 hover:border-[#5AC2EB] text-[#5AC2EB] hover:bg-[#5AC2EB]/10 font-sans font-semibold text-xs py-3 px-4 rounded-xl transition-all cursor-pointer transition-colors flex items-center gap-1.5 uppercase tracking-wide flex-1 sm:flex-initial"
                >
                  <Download size={13} />
                  Brochure
                </button>
                <button
                  onClick={() => onOpenBooking('buyer')}
                  className="bg-[#5AC2EB] hover:bg-[#5AC2EB]/95 text-[#2E3543] font-sans font-bold text-xs py-3 px-5 sm:px-6 rounded-xl hover:shadow-lg transition-all cursor-pointer uppercase tracking-wider flex-1 sm:flex-initial text-center"
                >
                  Book Private Visit
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* General Footer - exact same footer across pages */}
      <Footer 
        onOpenBooking={onOpenBooking}
        onNavigateProjects={onNavigateProjects}
        onNavigateBuyers={onNavigateBuyers}
        onNavigateLandowners={onNavigateLandowners}
        onNavigateAbout={onNavigateAbout}
        onNavigateContact={onNavigateContact}
      />

    </div>
  );
}
