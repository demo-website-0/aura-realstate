import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Building2, Layers, Sparkles, Landmark, Star, Menu, X, ArrowLeft, ArrowRight, CircleDot } from 'lucide-react';

interface ProjectsPageProps {
  onOpenBooking: (audience: 'buyer' | 'landowner' | 'general') => void;
  onSelectProject: (projectName: string) => void;
  onNavigateHome: () => void;
  onNavigateBuyers?: () => void;
  onNavigateLandowners?: () => void;
  onNavigateContact?: () => void;
  onNavigateAbout?: () => void;
}

interface ProjectData {
  id: string;
  name: string;
  category: 'residential' | 'commercial';
  location: 'Gulshan' | 'Banani' | 'Dhanmondi' | 'Bashundhara';
  status: 'Completed' | 'Ongoing';
  units: number;
  floors: number;
  year: string;
  tagline: string;
  description: string;
  isFeatured?: boolean;
}

export default function ProjectsPage({ onOpenBooking, onSelectProject, onNavigateHome, onNavigateBuyers, onNavigateLandowners, onNavigateContact, onNavigateAbout }: ProjectsPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // Nav scroll indicator state or standard shadow layout
  const navLinks = [
    { name: 'Projects', isCurrent: true },
    { name: 'For Buyers', href: '#buyer' },
    { name: 'For Landowners', href: '#landowners' },
    { name: 'About', href: '#about' },
    { name: 'Contact', onClick: onNavigateContact },
  ];

  // Raw dataset based precisely on spec
  const projectsData: ProjectData[] = useMemo(() => [
    {
      id: 'skyline',
      name: 'Aura Skyline One',
      category: 'residential',
      location: 'Gulshan',
      status: 'Completed',
      units: 24,
      floors: 12,
      year: '2022',
      tagline: 'Dhaka\'s premier light-filled sky sanctuary.',
      description: 'A masterpiece of double-height layouts, featuring cantilevered light panels and direct views over the Gulshan skyline reservoir.',
      isFeatured: true,
    },
    {
      id: 'commerce',
      name: 'Aura Commerce Hub',
      category: 'commercial',
      location: 'Banani',
      status: 'Completed',
      units: 18,
      floors: 6,
      year: '2023',
      tagline: 'Bespoke corporate base with low-glare envelope.',
      description: 'Sleek geometric lines, integrated VRF climatology and edge-to-edge heat reflective double glazed facades on Ataturk Avenue.',
      isFeatured: true,
    },
    {
      id: 'garden',
      name: 'Aura Garden Residences',
      category: 'residential',
      location: 'Dhanmondi',
      status: 'Completed',
      units: 16,
      floors: 8,
      year: '2023',
      tagline: 'Vertical botanical haven with biological dripping loops.',
      description: 'Integrated multi-layered cantilever planters fed by an on-site organic greywater recycling and filtration array.',
      isFeatured: true,
    },
    {
      id: 'prestige',
      name: 'Aura Prestige Heights',
      category: 'residential',
      location: 'Gulshan',
      status: 'Completed',
      units: 18,
      floors: 10,
      year: '2021',
      tagline: 'Restrained, grand modernism overlooking parkways.',
      description: 'Custom marble corridors, smart biometric locksets and soundproof STC-55 boundary thresholds for maximum isolation.',
    },
    {
      id: 'glass',
      name: 'Aura Glass Residences',
      category: 'residential',
      location: 'Gulshan',
      status: 'Completed',
      units: 30,
      floors: 14,
      year: '2023',
      tagline: 'Panoramic minimalist views of stunning Gulshan lake.',
      description: 'Generous perimeter glazing, hidden climate vents and premium fittings representing Dhaka\'s highest tier residential construction.',
    },
    {
      id: 'blanc',
      name: 'Aura Blanc',
      category: 'residential',
      location: 'Banani',
      status: 'Completed',
      units: 16,
      floors: 9,
      year: '2022',
      tagline: 'Pure white monolithic architecture.',
      description: 'Utilizing premium imported Turkish travertine facade and hand-carved lightwells reflecting modern architectural restraint.',
    },
    {
      id: 'terrace',
      name: 'Aura Terrace Living',
      category: 'residential',
      location: 'Banani',
      status: 'Ongoing',
      units: 20,
      floors: 11,
      year: 'Ongoing',
      tagline: 'Staggered elevated terraces with personal garden pools.',
      description: 'Premium staggered cantilever layouts with extensive personal balconies. 70% of units are already reserved for elite buyers.',
    },
    {
      id: 'parkview',
      name: 'Aura Park View',
      category: 'residential',
      location: 'Dhanmondi',
      status: 'Completed',
      units: 12,
      floors: 7,
      year: '2020',
      tagline: 'Elegant low-density sanctuary facing historical parks.',
      description: 'Featuring bespoke clay-tile accents, spacious wrap-around verandahs, and intimate common roof recreational gardens.',
    },
    {
      id: 'grand',
      name: 'Aura Grand',
      category: 'residential',
      location: 'Bashundhara',
      status: 'Completed',
      units: 28,
      floors: 13,
      year: '2023',
      tagline: 'Imposing presence with absolute safety margin.',
      description: 'Double-seismic zone reinforcement, comprehensive sprinkler grids, and deep columned lobbies welcoming families home.',
    },
    {
      id: 'serenity',
      name: 'Aura Serenity',
      category: 'residential',
      location: 'Bashundhara',
      status: 'Ongoing',
      units: 22,
      floors: 10,
      year: 'Ongoing',
      tagline: 'A quiet premium sanctuary with automated smart controls.',
      description: 'Nestled in Bashundhara, providing state-of-the-art security, biometric entry points and zero noise-leak designs.',
    },
    {
      id: 'business',
      name: 'Aura Business Centre',
      category: 'commercial',
      location: 'Banani',
      status: 'Completed',
      units: 12,
      floors: 5,
      year: '2021',
      tagline: 'Compact, ultra-premium headquarters for creators.',
      description: 'Boutique premium offices, high-density fiber connections and panoramic boardrooms built for progressive businesses.',
    },
    {
      id: 'corporate',
      name: 'Aura Corporate One',
      category: 'commercial',
      location: 'Gulshan',
      status: 'Completed',
      units: 15,
      floors: 7,
      year: '2022',
      tagline: 'High prestige landmark with dedicated security lobbies.',
      description: 'Multi-layer security checkpoints, custom structural spans, and prestigious executive facilities on Gulshan Avenue.',
    }
  ], []);

  // Filter Categories setup
  const filtersPool = [
    { label: 'All Projects', value: 'All' },
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Gulshan', value: 'Gulshan' },
    { label: 'Banani', value: 'Banani' },
    { label: 'Dhanmondi', value: 'Dhanmondi' },
    { label: 'Bashundhara', value: 'Bashundhara' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Ongoing', value: 'Ongoing' }
  ];

  // Client-side filtering logic
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData;
    
    return projectsData.filter((project) => {
      // Check status, location, or category
      return (
        project.category === activeFilter.toLowerCase() ||
        project.location === activeFilter ||
        project.status === activeFilter
      );
    });
  }, [activeFilter, projectsData]);

  // Paginated/Shown Projects based on Load More limit
  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const ongoingProjectsList = useMemo(() => {
    return projectsData.filter(p => p.status === 'Ongoing');
  }, [projectsData]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredProjects.length));
  };

  const handleFilterClick = (filterValue: string) => {
    setActiveFilter(filterValue);
    setVisibleCount(9); // Reset pagination on filter change
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCFC]">
      {/* Scroll indicator bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#5AC2EB]/30 z-50 pointer-events-none">
        <div className="h-full bg-[#5AC2EB] w-2/3 animate-[pulse_2s_infinite]" />
      </div>

      {/* Page Header - Back transition of navbar */}
      <header className="sticky top-0 z-40 w-full bg-[#FDFCFC]/95 backdrop-blur-xl border-b border-[#5AC2EB]/15 shadow-sm px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo brand */}
          <button onClick={onNavigateHome} className="flex items-center gap-2 cursor-pointer text-left">
            <span className="font-serif text-2xl font-bold text-[#2E3543] tracking-normal">
              Aura <span className="font-light text-[#5AC2EB]">Developments</span>
            </span>
          </button>

          {/* Navigation links with Active Underline state */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onNavigateHome}
              className="text-sm font-medium text-[#2E3543]/70 hover:text-[#5AC2EB] tracking-wider transition-colors cursor-pointer"
            >
              Home
            </button>
            {navLinks.map((link) => {
              if (link.name === 'Home') return null;
              return link.isCurrent ? (
                <div key={link.name} className="relative py-1">
                  <span className="text-sm font-semibold text-[#5AC2EB] tracking-wider">
                    {link.name}
                  </span>
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5AC2EB]" 
                  />
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.name === 'Projects' ? '#hero' : `/#${link.name.toLowerCase().replace(' ', '')}`}
                  onClick={(e) => {
                    if (link.name === 'Projects') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      e.preventDefault();
                    } else if (link.name === 'For Buyers' && onNavigateBuyers) {
                      e.preventDefault();
                      onNavigateBuyers();
                    } else if (link.name === 'For Landowners' && onNavigateLandowners) {
                      e.preventDefault();
                      onNavigateLandowners();
                    } else if (link.name === 'About' && onNavigateAbout) {
                      e.preventDefault();
                      onNavigateAbout();
                    } else if (link.name === 'Contact' && onNavigateContact) {
                      e.preventDefault();
                      onNavigateContact();
                    } else {
                      // Let them go home and focus the hash anchor
                      onNavigateHome();
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
              onClick={() => onOpenBooking('general')}
              className="bg-[#5AC2EB] text-[#2E3543] hover:bg-[#5AC2EB]/90 tracking-wider text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-[#5AC2EB]/10 cursor-pointer"
            >
              Book a Private Visit
            </button>
          </div>

          {/* Portable Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#2E3543] p-1.5 focus:outline-none"
            id="mobile-menu-projects-toggle"
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
            className="absolute top-full left-6 right-6 mt-2 p-6 bg-[#FDFCFC]/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-100 z-50 md:hidden"
          >
            <nav className="flex flex-col gap-4 mb-6">
              <button
                onClick={() => { setMobileMenuOpen(false); onNavigateHome(); }}
                className="text-left text-base font-medium text-[#2E3543] hover:text-[#5AC2EB] py-1"
              >
                Home Page
              </button>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.name === 'Projects' ? '#hero' : `/#${link.name.toLowerCase().replace(' ', '')}`}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.name === 'Projects') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      e.preventDefault();
                    } else if (link.name === 'For Buyers' && onNavigateBuyers) {
                      e.preventDefault();
                      onNavigateBuyers();
                    } else if (link.name === 'For Landowners' && onNavigateLandowners) {
                      e.preventDefault();
                      onNavigateLandowners();
                    } else if (link.name === 'About' && onNavigateAbout) {
                      e.preventDefault();
                      onNavigateAbout();
                    } else if (link.name === 'Contact' && onNavigateContact) {
                      e.preventDefault();
                      onNavigateContact();
                    } else {
                      onNavigateHome();
                    }
                  }}
                  className={`text-base font-medium py-1 transition-colors ${link.isCurrent ? 'text-[#5AC2EB]' : 'text-[#2E3543] hover:text-[#5AC2EB]'}`}
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
              className="w-full bg-[#5AC2EB] text-[#2E3543] font-bold text-sm tracking-wider uppercase py-3 rounded-xl shadow-lg"
            >
              Book a Private Visit
            </button>
          </motion.div>
        )}
      </header>

      {/* Section 1: Page Hero — "The Work Speaks for Itself" */}
      <section className="relative min-h-[60vh] flex flex-col justify-between overflow-hidden bg-[#FDFCFC] pt-16 border-b border-gray-100">
        
        {/* Architectural blueprints scatter spread layout in background - staggered overlapping */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Blueprint 1: Angled left */}
          <div className="absolute left-[5%] top-[10%] w-[350px] h-[350px] text-[#5AC2EB] opacity-[0.06] transform -rotate-3 transition-transform duration-1000">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.4" className="w-full h-full">
              <rect x="10" y="10" width="80" height="80" />
              <line x1="10" y1="30" x2="90" y2="30" />
              <line x1="10" y1="50" x2="90" y2="50" />
              <line x1="10" y1="70" x2="90" y2="70" />
              <circle cx="50" cy="50" r="20" />
            </svg>
          </div>

          {/* Blueprint 2: Flat middle */}
          <div className="absolute left-[38%] top-[20%] w-[400px] h-[400px] text-[#5AC2EB] opacity-[0.04] transform rotate-0">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.4" className="w-full h-full">
              <path d="M10,90 Q40,10 90,90" />
              <line x1="20" y1="80" x2="80" y2="80" />
              <line x1="30" y1="70" x2="70" y2="70" />
              <line x1="40" y1="60" x2="60" y2="60" />
            </svg>
          </div>

          {/* Blueprint 3: Angled right */}
          <div className="absolute right-[5%] top-[8%] w-[320px] h-[320px] text-[#5AC2EB] opacity-[0.05] transform rotate-2">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.4" className="w-full h-full">
              <polygon points="50,15 90,85 10,85" />
              <line x1="20" y1="70" x2="80" y2="70" />
              <line x1="30" y1="50" x2="70" y2="50" />
            </svg>
          </div>
        </div>

        {/* Hero content centered */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 md:px-12 space-y-6 flex-grow flex flex-col justify-center">
          
          {/* Eyebrow Tag */}
          <div className="fade-up inline-block">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#5AC2EB] block">
              55+ PROJECTS ACROSS DHAKA
            </span>
            <div className="w-16 h-[2px] bg-[#5AC2EB] mx-auto mt-2" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#2E3543] leading-[1.1] tracking-tight">
            Every project. <br />Every promise. <span className="italic font-normal text-[#5AC2EB]">Kept.</span>
          </h1>

          {/* Subheadline and details */}
          <p className="text-[#2E3543]/70 font-sans text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From boutique commercial spaces in Banani to ultra-premium residences in Gulshan — here's everything we've built, handed over on time, and stood behind.
          </p>
        </div>

        {/* Filter bar: anchored at the bottom, blending into the projects grid */}
        <div className="relative z-20 w-full mt-12">
          {/* Glassmorphism row strip background */}
          <div className="w-full bg-[#FDFCFC]/85 backdrop-blur-md border-t border-b border-[#5AC2EB]/20 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center gap-4">
              
              {/* Filter Label */}
              <span className="text-[11px] font-bold text-[#2E3543]/50 uppercase tracking-[0.2em] whitespace-nowrap">
                FILTER BY:
              </span>

              {/* Scrollable Filter Pills Container */}
              <div 
                className="w-full flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none snap-x"
                style={{ scrollbarWidth: 'none' }}
              >
                {filtersPool.map((pill) => {
                  const isActive = activeFilter === pill.value;
                  return (
                    <button
                      key={pill.value}
                      onClick={() => handleFilterClick(pill.value)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer whitespace-nowrap snap-start ${
                        isActive
                          ? 'bg-[#5AC2EB] text-[#2E3543] shadow-md shadow-[#5AC2EB]/20'
                          : 'bg-white border border-[#2E3543]/15 text-[#2E3543]/70 hover:border-[#5AC2EB] hover:text-[#5AC2EB]'
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* Section 2: Projects Grid — "The Full Portfolio" */}
      <section className="relative py-16 bg-[#FDFCFC]" id="portfolio-grid-anchor">
        
        {/* Graph paper aesthetic subtle background vector dot grid at 2% opacity */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(#2E3543 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Filter Stats HUD */}
          <div className="flex justify-between items-center mb-10 text-xs sm:text-sm font-sans text-gray-500">
            <div>
              <span>Showing <strong>{filteredProjects.length}</strong> luxurious residences & offices</span>
            </div>
            <div className="text-[#5AC2EB] font-serif italic">
              * Aura Premium Signature Standard
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" id="projects-masonry-grid">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, idx) => {
                const isOngoing = project.status === 'Ongoing';

                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(90, 194, 235, 0.08)' }}
                    className="relative bg-white rounded-3xl border border-[#5AC2EB]/20 shadow-[0_8px_30px_rgba(46,53,67,0.03)] hover:border-[#5AC2EB]/40 flex flex-col justify-between overflow-hidden group transition-all"
                  >
                    {/* Visual Card Top Header */}
                    <div className="relative h-[220px] bg-[#5AC2EB]/5 w-full flex items-center justify-center overflow-hidden">
                      {/* Gradient ambient background overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

                      {/* Custom Dynamic Vector Architectural elevation drawings specific to type */}
                      <div className="absolute inset-0 flex items-center justify-center p-6 text-[#5AC2EB]/20 transform group-hover:scale-105 transition-transform duration-500">
                        {project.category === 'commercial' ? (
                          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" className="w-4/5 h-4/5">
                            <rect x="25" y="15" width="50" height="75" />
                            <line x1="25" y1="35" x2="75" y2="35" />
                            <line x1="25" y1="55" x2="75" y2="55" />
                            <line x1="25" y1="75" x2="75" y2="75" />
                            <line x1="50" y1="15" x2="50" y2="90" />
                          </svg>
                        ) : project.id === 'garden' ? (
                          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" className="w-11/12 h-11/12">
                            <rect x="30" y="20" width="40" height="70" />
                            {/* Balcony leaves design */}
                            <path d="M20,35 Q35,32 30,38 Z" fill="#5AC2EB" className="opacity-40" />
                            <path d="M70,55 Q85,52 70,58 Z" fill="#5AC2EB" className="opacity-40" />
                            <line x1="30" y1="45" x2="70" y2="45" />
                            <line x1="30" y1="65" x2="70" y2="65" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6" className="w-4/5 h-4/5">
                            <rect x="35" y="10" width="30" height="80" />
                            <line x1="35" y1="25" x2="65" y2="25" />
                            <line x1="35" y1="40" x2="65" y2="40" />
                            <line x1="35" y1="55" x2="65" y2="55" />
                            <line x1="35" y1="70" x2="65" y2="70" />
                          </svg>
                        )}
                      </div>

                      {/* Pill status Badge Top Right */}
                      <span className={`absolute top-4 right-4 z-20 text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full ${
                        isOngoing
                          ? 'bg-[#5AC2EB]/25 text-[#2E3543] border border-[#5AC2EB]/50'
                          : 'bg-[#5AC2EB] text-[#2E3543] shadow-md shadow-[#5AC2EB]/20'
                      }`}>
                        {project.status.toUpperCase()}
                      </span>

                      {/* Pill Type Badge Top Left */}
                      <span className="absolute top-4 left-4 z-20 text-[9px] font-bold tracking-widest bg-[#2E3543] text-[#FDFCFC] px-3.5 py-1.5 rounded-full">
                        {project.category.toUpperCase()}
                      </span>

                      {/* Floating tag inside image visual overlay */}
                      {project.isFeatured && (
                        <span className="absolute bottom-4 left-4 z-20 text-xs text-[#5AC2EB] font-serif italic tracking-wide drop-shadow-sm font-semibold">
                          ✦ FEATURED SIGNATURE
                        </span>
                      )}
                    </div>

                    {/* Card Content Area */}
                    <div className="p-8 flex-grow flex flex-col justify-between">
                      <div className="space-y-4">
                        
                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                          <MapPin size={14} className="text-[#5AC2EB]" />
                          {project.location}, Dhaka
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-2xl font-bold text-[#2E3543] group-hover:text-[#5AC2EB] transition-colors leading-snug">
                          {project.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Specs Row */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2.5 mb-6">
                          <span className="text-xs font-semibold text-[#2E3543]/80 bg-[#2E3543]/5 px-3 py-1.5 rounded-lg flex items-center gap-1">
                            <Building2 size={12} className="text-[#5AC2EB]" />
                            {project.units} Units
                          </span>
                          <span className="text-xs font-semibold text-[#2E3543]/80 bg-[#2E3543]/5 px-3 py-1.5 rounded-lg flex items-center gap-1">
                            <Layers size={12} className="text-[#5AC2EB]" />
                            {project.floors} Floors
                          </span>
                          <span className="text-xs font-semibold text-[#2E3543]/80 bg-[#2E3543]/5 px-3 py-1.5 rounded-lg flex items-center gap-1">
                            <Sparkles size={12} className="text-[#5AC2EB]" />
                            {project.year === 'Ongoing' ? 'Est.' : ''} {project.year}
                          </span>
                        </div>

                        {/* Interactive trigger */}
                        <button
                          onClick={() => onSelectProject(project.name)}
                          className="w-full text-left inline-flex items-center gap-2 text-xs font-bold text-[#5AC2EB] uppercase tracking-widest group-hover:underline cursor-pointer"
                        >
                          View Full Project Dossier
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State when zero results are found */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center max-w-sm mx-auto flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-[#5AC2EB]/10 text-[#5AC2EB] rounded-full flex items-center justify-center mb-4">
                <Building2 size={28} />
              </div>
              <h4 className="text-xl font-serif font-bold text-[#2E3543] mb-2">Nothing here yet</h4>
              <p className="text-xs sm:text-sm text-gray-500">
                But we are always building. Please try another filter option.
              </p>
              <button
                onClick={() => handleFilterClick('All')}
                className="mt-4 text-xs font-bold text-[#5AC2EB] uppercase tracking-wider underline cursor-pointer"
              >
                Reset Filter
              </button>
            </motion.div>
          )}

          {/* Load More Pagination */}
          {filteredProjects.length > visibleCount && (
            <div className="text-center mt-16 flex flex-col items-center gap-3">
              <button
                onClick={handleLoadMore}
                className="border border-[#2E3543] text-[#2E3543] hover:bg-[#2E3543] hover:text-white hover:border-[#2E3543] font-sans font-bold tracking-widest text-xs uppercase px-8 py-4 rounded-xl transition-all cursor-pointer"
                id="load-more-btn"
              >
                Load More Projects
              </button>
              <span className="text-xs text-gray-400 font-sans mt-1">
                Showing {visibleCount} of {filteredProjects.length} matching developments
              </span>
            </div>
          )}

        </div>
      </section>

      {/* Section 3: Stats Reinforcement Bar — "The Numbers Never Lie" */}
      <section className="relative bg-[#2E3543] h-auto lg:h-[160px] py-10 lg:py-0 flex items-center overflow-hidden">
        {/* Soft atmospheric bleed background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5AC2EB]/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 text-center lg:text-left">
            
            <div className="lg:border-r border-white/10 lg:pr-6">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#5AC2EB] block leading-none">
                15+
              </span>
              <span className="text-[11px] sm:text-xs font-sans text-[#FDFCFC]/70 uppercase tracking-widest block mt-2">
                Years delivering on our word
              </span>
            </div>

            <div className="lg:border-r border-white/10 lg:pr-6">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#5AC2EB] block leading-none">
                55+
              </span>
              <span className="text-[11px] sm:text-xs font-sans text-[#FDFCFC]/70 uppercase tracking-widest block mt-2">
                Projects completed in Dhaka
              </span>
            </div>

            <div className="lg:border-r border-white/10 lg:pr-6">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#5AC2EB] block leading-none">
                1,200+
              </span>
              <span className="text-[11px] sm:text-xs font-sans text-[#FDFCFC]/70 uppercase tracking-widest block mt-2">
                Families living in Aura spaces
              </span>
            </div>

            <div>
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#5AC2EB] block leading-none">
                0
              </span>
              <span className="text-[11px] sm:text-xs font-sans text-[#FDFCFC]/70 uppercase tracking-widest block mt-2">
                Legal disputes. Not one. Ever.
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Ongoing Projects Spotlight — "What We're Building Right Now" */}
      <section className="py-24 md:py-32 bg-[#FDFCFC]" id="ongoing-projects-spotlight">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="max-w-2xl text-left mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase text-[#5AC2EB] tracking-[0.25em] block">
              IN PROGRESS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2E3543] font-bold leading-tight">
              Want to get in before everyone else does?
            </h2>
            <p className="text-sm md:text-base text-gray-500 font-normal leading-relaxed">
              These projects are currently under construction. Early buyers get first pick of units, floors, and views — plus our best payment plans.
            </p>
            <div className="w-16 h-[2.5px] bg-[#5AC2EB] block" />
          </div>

          {/* Cinematic Row/Film strip */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="ongoing-cinematic-row">
            
            {/* Card 1 — Aura Terrace Living */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-[#5AC2EB]/20 p-8 sm:p-10 shadow-[0_12px_40px_rgba(46,53,67,0.04)] hover:shadow-xl hover:border-[#5AC2EB]/40 flex flex-col justify-between overflow-hidden relative group transition-all"
            >
              {/* Pulsing indicator tag top corner */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 bg-[#5AC2EB]/15 px-3.5 py-1.5 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-[ping_1.5s_infinite]" />
                  <span className="text-[10px] font-bold text-[#2E3543] uppercase tracking-wide">
                    🟢 NOW BUILDING
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#5AC2EB]">
                  RESIDENTIAL · BANANI
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E3543] mb-4">
                  Aura Terrace Living
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-6">
                  11 floors of premium living featuring double-depth green terraces on every alternate floor. Nestled adjacent to peaceful Banani lanes. 70% of units are already reserved. Estimated handover: Q3 2025.
                </p>

                {/* Specs inline chip */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                    20 Units
                  </span>
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                    11 Floors
                  </span>
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                    Est. Handover Q3 2025
                  </span>
                </div>

                {/* Progress bar fill with glow */}
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-gray-500">Construction Timeline</span>
                    <span className="text-[#5AC2EB]">65% Complete</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#5AC2EB] to-[#5AC2EB] rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectProject('Aura Terrace Living')}
                className="w-full bg-[#5AC2EB] text-[#2E3543] font-bold tracking-widest text-xs uppercase py-4 rounded-xl shadow-md shadow-[#5AC2EB]/15 hover:bg-[#5AC2EB]/95 transition-all text-center cursor-pointer"
              >
                Register Your Interest →
              </button>
            </motion.div>

            {/* Card 2 — Aura Serenity */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-[#5AC2EB]/20 p-8 sm:p-10 shadow-[0_12px_40px_rgba(46,53,67,0.04)] hover:shadow-xl hover:border-[#5AC2EB]/40 flex flex-col justify-between overflow-hidden relative group transition-all"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 bg-[#5AC2EB]/15 px-3.5 py-1.5 rounded-full">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-[ping_1.5s_infinite]" />
                  <span className="text-[10px] font-bold text-[#2E3543] uppercase tracking-wide">
                    🟢 NOW BUILDING
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#5AC2EB]">
                  RESIDENTIAL · BASHUNDHARA
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2E3543] mb-4">
                  Aura Serenity
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-6">
                  A quiet, premium gated tower in Bashundhara with automated smart control panels embedded in every flat. High-security protocol, fully isolated windows. Limited selection remains. Handover: Q1 2026.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                    22 Units
                  </span>
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                    10 Floors
                  </span>
                  <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                    Est. Handover Q1 2026
                  </span>
                </div>

                <div className="space-y-2 mb-8">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-gray-500">Construction Timeline</span>
                    <span className="text-[#5AC2EB]">40% Complete</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#5AC2EB] to-[#5AC2EB] rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectProject('Aura Serenity')}
                className="w-full bg-[#5AC2EB] text-[#2E3543] font-bold tracking-widest text-xs uppercase py-4 rounded-xl shadow-md shadow-[#5AC2EB]/15 hover:bg-[#5AC2EB]/95 transition-all text-center cursor-pointer"
              >
                Register Your Interest →
              </button>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Section 5: Final CTA — "Seen Enough? Let's Talk." */}
      <section className="relative bg-[#2E3543] py-24 text-white overflow-hidden">
        {/* Border accent */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#5AC2EB] to-transparent absolute top-0 left-0" />
        
        {/* Soft Radial Ambient sky glow inside graphite background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#5AC2EB]/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6">
          <span className="text-xs font-semibold uppercase text-[#5AC2EB] tracking-[0.25em] block">
            YOUR TURN
          </span>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FDFCFC]">
            Found something you love? <br />Let's make it yours.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#FDFCFC]/75 leading-relaxed max-w-2xl mx-auto">
            Whether it's one of our completed landmarks or something we're building right now — we'd love to show you around. Bring your questions. We'll bring the coffee.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => onOpenBooking('buyer')}
              className="w-full sm:w-auto bg-[#5AC2EB] hover:bg-[#5AC2EB]/95 text-[#2E3543] font-bold tracking-widest text-xs uppercase px-8 py-4 rounded-xl shadow-lg shadow-[#5AC2EB]/15 cursor-pointer"
            >
              Book a Private Visit →
            </button>
            <button
              onClick={() => onOpenBooking('general')}
              className="w-full sm:w-auto border border-white hover:bg-white/10 text-white font-semibold tracking-widest text-xs uppercase px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              Talk to Our Team →
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-[#FDFCFC]/50 italic pt-2">
            No sales pressure. No jargon. Just an honest conversation about your options.
          </p>
        </div>
      </section>

      {/* Sticky footer component */}
      <footer className="bg-[#2E3543] text-white py-12 px-6 md:px-12 border-t border-white/5 relative z-10">
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
            <button onClick={onNavigateHome} className="hover:text-[#5AC2EB]">Home</button>
            <a href="/#values" className="hover:text-[#5AC2EB]">Our Values</a>
            <a href="/#proof" className="hover:text-[#5AC2EB]">Client Reviews</a>
            <a href="/#dual-audience" className="hover:text-[#5AC2EB]">Partnership</a>
            <a href="/#contact" className="hover:text-[#5AC2EB]">Contact Us</a>
          </div>

          <div className="text-center md:text-right text-[10px] text-white/40 font-sans">
            © 2026 Aura Developments. Crafted for pristine luxury in Dhaka, Bangladesh.
          </div>
        </div>
      </footer>

    </div>
  );
}
