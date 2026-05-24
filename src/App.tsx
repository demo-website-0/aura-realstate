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
import { projectsDetailList } from './data/projectsDetailData';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState<'buyer' | 'landowner' | 'general'>('general');
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null);

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
    const matchedProject = projectsDetailList.find(
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
      
      {currentPath.startsWith('/projects/') && currentPath !== '/projects' ? (
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
          {/* Scroll indicator bar at the absolute top of our main landing layout */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-[#5AC2EB]/30 z-50 pointer-events-none">
            <div className="h-full bg-[#5AC2EB] w-1/3 animate-[pulse_2s_infinite]" />
          </div>

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
