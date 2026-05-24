import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import TrustValues from './components/TrustValues';
import SocialProof from './components/SocialProof';
import FeaturedProjects from './components/FeaturedProjects';
import DualCTA from './components/DualCTA';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ProjectSlideOver from './components/ProjectSlideOver';
import ProjectsPage from './components/ProjectsPage';
import BuyersPage from './components/BuyersPage';
import LandownersPage from './components/LandownersPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import AdminPanel from './components/AdminPanel';
import { getDynamicProjects } from './utils/projectsHelper';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState<'buyer' | 'landowner' | 'general'>('general');
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Track dynamic scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentPercentage = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentPercentage);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Use ResizeObserver to keep the bar coordinates precise during client resizing/layouts
    const observer = new ResizeObserver(() => {
      handleScroll();
    });
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [currentPath]);

  // Soft high-fidelity routing trigger
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (audience: 'buyer' | 'landowner' | 'general') => {
    setSelectedAudience(audience);
    setIsBookingOpen(true);
  };

  const handleSelectProject = (projectName: string) => {
    // Attempt dynamic mapping directly to our premium ProjectDetailPage
    const projectsList = getDynamicProjects();
    const matchedProject = projectsList.find(
      p => p.name.toLowerCase() === projectName.toLowerCase() || p.id.toLowerCase() === projectName.toLowerCase()
    );
    if (matchedProject) {
      navigateTo(`/projects/${matchedProject.slug}`);
    } else {
      const slug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      navigateTo(`/projects/${slug}`);
    }
  };

  const handleCloseProjectSlideOver = () => {
    setSelectedProjectName(null);
  };

  const handleBookFromProject = () => {
    // Automatically trigger buyer inquiry when scheduling from a project details card
    setSelectedProjectName(null);
    setSelectedAudience('buyer');
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCFC]" id="app-root">
      {/* Scroll indicator bar at the absolute top of the viewport */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#5AC2EB]/10 z-[9999] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-[#5AC2EB]/60 to-[#8BACBA]/45 transition-all duration-75 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {currentPath === '/aura-water-bottle/admin' || currentPath === '/aura-water-bottle/admin/' ? (
        <AdminPanel
          onNavigateHome={() => navigateTo('/')}
          onSelectProjectOnSite={(slug) => navigateTo(`/projects/${slug}`)}
        />
      ) : currentPath === '/admin' || currentPath === '/login' || currentPath === '/dashboard' || currentPath === '/cms' ? (
        <div className="min-h-screen bg-[#FDFCFC] flex flex-col items-center justify-center p-6 text-center font-sans select-none">
          <div className="max-w-md space-y-4">
            <h1 className="text-6xl font-serif text-[#2E3543] font-bold">404</h1>
            <h2 className="text-xl font-serif text-[#2E3543] font-semibold">Page Not Found</h2>
            <p className="text-sm text-[#2E3543]/70 leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button
              onClick={() => navigateTo('/')}
              className="mt-6 inline-block bg-[#2E3543] text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full cursor-pointer hover:bg-[#2E3543]/90 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : currentPath.startsWith('/projects/') && currentPath !== '/projects' ? (
        <ProjectDetailPage
          projectSlug={currentPath.substring('/projects/'.length)}
          onOpenBooking={handleOpenBooking}
          onNavigateHome={() => navigateTo('/')}
          onNavigateProjects={() => navigateTo('/projects')}
          onNavigateBuyers={() => navigateTo('/for-buyers')}
          onNavigateLandowners={() => navigateTo('/for-landowners')}
          onNavigateAbout={() => navigateTo('/about')}
          onNavigateContact={() => navigateTo('/contact')}
        />
      ) : currentPath === '/projects' ? (
        <ProjectsPage 
          onOpenBooking={handleOpenBooking}
          onSelectProject={handleSelectProject}
          onNavigateHome={() => navigateTo('/')}
          onNavigateBuyers={() => navigateTo('/for-buyers')}
          onNavigateLandowners={() => navigateTo('/for-landowners')}
          onNavigateContact={() => navigateTo('/contact')}
          onNavigateAbout={() => navigateTo('/about')}
        />
      ) : currentPath === '/for-buyers' ? (
        <BuyersPage
          onOpenBooking={handleOpenBooking}
          onSelectProject={handleSelectProject}
          onNavigateHome={() => navigateTo('/')}
          onNavigateProjects={() => navigateTo('/projects')}
          onNavigateLandowners={() => navigateTo('/for-landowners')}
          onNavigateContact={() => navigateTo('/contact')}
          onNavigateAbout={() => navigateTo('/about')}
        />
      ) : currentPath === '/for-landowners' ? (
        <LandownersPage
          onOpenBooking={handleOpenBooking}
          onSelectProject={handleSelectProject}
          onNavigateHome={() => navigateTo('/')}
          onNavigateProjects={() => navigateTo('/projects')}
          onNavigateBuyers={() => navigateTo('/for-buyers')}
          onNavigateContact={() => navigateTo('/contact')}
          onNavigateAbout={() => navigateTo('/about')}
        />
      ) : currentPath === '/about' ? (
        <AboutPage
          onOpenBooking={handleOpenBooking}
          onNavigateHome={() => navigateTo('/')}
          onNavigateProjects={() => navigateTo('/projects')}
          onNavigateBuyers={() => navigateTo('/for-buyers')}
          onNavigateLandowners={() => navigateTo('/for-landowners')}
          onNavigateContact={() => navigateTo('/contact')}
        />
      ) : currentPath === '/contact' ? (
        <ContactPage
          onOpenBooking={handleOpenBooking}
          onNavigateHome={() => navigateTo('/')}
          onNavigateProjects={() => navigateTo('/projects')}
          onNavigateBuyers={() => navigateTo('/for-buyers')}
          onNavigateLandowners={() => navigateTo('/for-landowners')}
          onNavigateAbout={() => navigateTo('/about')}
        />
      ) : (
        <>
          {/* Section 1: Hero */}
          <Hero 
            onOpenBooking={handleOpenBooking} 
            onNavigateProjects={() => navigateTo('/projects')}
            onNavigateBuyers={() => navigateTo('/for-buyers')}
            onNavigateLandowners={() => navigateTo('/for-landowners')}
            onNavigateAbout={() => navigateTo('/about')}
            onNavigateContact={() => navigateTo('/contact')}
          />

          {/* Section 2: Trust & Values */}
          <TrustValues />

          {/* Section 3: Social Proof (The proof is in the numbers) */}
          <SocialProof onOpenBooking={() => handleOpenBooking('general')} />

          {/* Section 4: Featured Projects Showcase */}
          <FeaturedProjects 
            onOpenBooking={handleOpenBooking} 
            onSelectProject={handleSelectProject} 
            onNavigateProjects={() => navigateTo('/projects')}
          />

          {/* Section 5: Dual Audience CTA Panel */}
          <DualCTA 
            onOpenBooking={handleOpenBooking} 
            onNavigateBuyers={() => navigateTo('/for-buyers')}
            onNavigateLandowners={() => navigateTo('/for-landowners')}
          />

          {/* Section 6: Footer & Final Contact Consultation */}
          <Footer 
            onOpenBooking={handleOpenBooking} 
            onNavigateProjects={() => navigateTo('/projects')}
            onNavigateBuyers={() => navigateTo('/for-buyers')}
            onNavigateLandowners={() => navigateTo('/for-landowners')}
            onNavigateAbout={() => navigateTo('/about')}
            onNavigateContact={() => navigateTo('/contact')}
          />
        </>
      )}

      {/* Floating Concierge Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        audienceType={selectedAudience}
      />

      {/* Interactive Project Slideover dossier */}
      <ProjectSlideOver
        projectName={selectedProjectName}
        onClose={handleCloseProjectSlideOver}
        onBookProject={handleBookFromProject}
      />

    </div>
  );
}
