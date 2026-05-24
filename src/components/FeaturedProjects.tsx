import { motion } from 'motion/react';
import { Sparkles, Building2, Layers, Landmark } from 'lucide-react';

interface FeaturedProjectsProps {
  onOpenBooking: (audience: 'buyer' | 'landowner' | 'general') => void;
  onSelectProject: (projectName: string) => void;
  onNavigateProjects?: () => void;
}

export default function FeaturedProjects({ onOpenBooking, onSelectProject, onNavigateProjects }: FeaturedProjectsProps) {
  return (
    <section 
      id="projects" 
      className="py-24 md:py-32 bg-[#FDFCFC] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase text-[#5AC2EB] tracking-[0.25em] block">
            WHAT WE'VE BUILT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2E3543] font-bold leading-tight">
            Projects that speak louder than promises.
          </h2>
          <p className="text-sm md:text-base text-[#2E3543]/70 font-normal leading-relaxed">
            Every building we've ever built is still standing beautifully — and that's not a coincidence.
          </p>
          <div className="w-12 h-[2px] bg-[#5AC2EB] mx-auto mt-4" />
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Large Left Column Card [Spanning full height] */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative bg-[#1D212A] rounded-3xl border border-[#5AC2EB]/20 shadow-[0_12px_48px_rgba(46,53,67,0.06)] hover:border-[#5AC2EB]/40 p-8 sm:p-10 md:p-12 overflow-hidden flex flex-col justify-between group transition-all min-h-[520px]"
            id="featured-project-skyline"
          >
            {/* Background Image with zoom effect */}
            <img 
              src="https://cms.shantaholdings.com/media/images/Pinnacle_Completed_Temp_7.2e16d0ba.fill-2560x1440-c0.jpg" 
              alt="Aura Skyline One"
              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Dark premium gradient overlay for high text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1D212A]/95 via-[#1D212A]/80 to-[#1D212A]/40 z-0 transition-opacity duration-300 group-hover:opacity-95" />

            {/* Left grounding accent border line */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#5AC2EB] to-transparent z-10" />

            <div className="relative z-10">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#5AC2EB] bg-[#5AC2EB]/20 px-3.5 py-1.5 rounded-full mb-8 backdrop-blur-md border border-[#5AC2EB]/20">
                RESIDENTIAL · GULSHAN
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 drop-shadow-sm">
                Aura Skyline One
              </h3>
              <p className="text-sm md:text-base text-white/85 font-normal leading-relaxed max-w-md drop-shadow-sm">
                12 floors. 24 ultra-premium apartments. Rooftop terrace with breathtaking panoramic city views. Handed over 11 days ahead of schedule.
              </p>
            </div>

            <div className="relative z-10 mt-12 pt-6 border-t border-white/10">
              {/* Specification chips row */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/5 pb-1.5 pt-1.5">
                  <Building2 size={13} className="text-[#5AC2EB]" />
                  24 Units
                </span>
                <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/5 pb-1.5 pt-1.5">
                  <Layers size={13} className="text-[#5AC2EB]" />
                  12 Floors
                </span>
                <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/5 pb-1.5 pt-1.5">
                  <Sparkles size={13} className="text-[#5AC2EB]" />
                  Completed 2022
                </span>
              </div>

              {/* View detail links trigger click */}
              <button
                onClick={() => onSelectProject('Aura Skyline One')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#5AC2EB] uppercase tracking-widest relative hover:text-white transition-colors cursor-pointer"
              >
                View Project Details
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column [Stacked 2 Cards] */}
          <div className="lg:col-span-6 flex flex-col gap-8 justify-between">
            
            {/* Card 2: Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-[#1D212A] rounded-3xl border border-[#5AC2EB]/20 shadow-[0_12px_48px_rgba(46,53,67,0.06)] hover:border-[#5AC2EB]/40 p-8 sm:p-10 overflow-hidden flex flex-col justify-between group transition-all min-h-[245px]"
              id="featured-project-commerce"
            >
              {/* Background Image with zoom effect */}
              <img 
                src="https://vaazinterior.com/wp-content/uploads/2025/06/Commercial-05.jpg" 
                alt="Aura Commerce Hub"
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Dark premium gradient overlay for high text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D212A]/95 via-[#1D212A]/80 to-[#1D212A]/40 z-0 transition-opacity duration-300 group-hover:opacity-95" />

              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#5AC2EB] to-transparent z-10" />

              <div className="relative z-10">
                <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#5AC2EB] bg-[#5AC2EB]/20 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-md border border-[#5AC2EB]/20">
                  BOUTIQUE COMMERCIAL · BANANI
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mb-3 drop-shadow-sm">
                  Aura Commerce Hub
                </h3>
                <p className="text-sm text-white/85 font-normal leading-relaxed max-w-md drop-shadow-sm">
                  A boutique 6-floor commercial center. Modern facade, floor-to-ceiling glass, smart climate management, with zero tenant vacancy since inauguration.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2.5 mb-6">
                  <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/5">
                    <Building2 size={12} className="text-[#5AC2EB]" />
                    18 Units
                  </span>
                  <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/5">
                    <Layers size={12} className="text-[#5AC2EB]" />
                    6 Floors
                  </span>
                  <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/5">
                    <Landmark size={12} className="text-[#5AC2EB]" />
                    Completed 2023
                  </span>
                </div>

                <button
                  onClick={() => onSelectProject('Aura Commerce Hub')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#5AC2EB] uppercase tracking-widest relative hover:text-white transition-colors cursor-pointer"
                >
                  View Project Details
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>

            {/* Card 3: Bottom Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-[#1D212A] rounded-3xl border border-[#5AC2EB]/20 shadow-[0_12px_48px_rgba(46,53,67,0.06)] hover:border-[#5AC2EB]/40 p-8 sm:p-10 overflow-hidden flex flex-col justify-between group transition-all min-h-[245px]"
              id="featured-project-garden"
            >
              {/* Background Image with zoom effect */}
              <img 
                src="https://probashirealty.com/wp-content/uploads/2023/02/Duplex-Town3.jpg" 
                alt="Aura Garden Residences"
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Dark premium gradient overlay for high text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D212A]/95 via-[#1D212A]/80 to-[#1D212A]/40 z-0 transition-opacity duration-300 group-hover:opacity-95" />

              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#5AC2EB] to-transparent z-10" />

              <div className="relative z-10">
                <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#5AC2EB] bg-[#5AC2EB]/20 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-md border border-[#5AC2EB]/20">
                  RESIDENTIAL · DHANMONDI
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mb-3 drop-shadow-sm">
                  Aura Garden Residences
                </h3>
                <p className="text-sm text-white/85 font-normal leading-relaxed max-w-md drop-shadow-sm">
                  Our iconic botanical luxury concept. Green terrace balconies on every floor, fully integrated smart living triggers, handovers fulfilled seamlessly.
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2.5 mb-6">
                  <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/5">
                    <Building2 size={12} className="text-[#5AC2EB]" />
                    16 Units
                  </span>
                  <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/5">
                    <Layers size={12} className="text-[#5AC2EB]" />
                    8 Floors
                  </span>
                  <span className="text-xs font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-lg flex items-center gap-1.5 backdrop-blur-sm border border-white/5">
                    <Sparkles size={12} className="text-[#5AC2EB]" />
                    Completed 2023
                  </span>
                </div>

                <button
                  onClick={() => onSelectProject('Aura Garden Residences')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#5AC2EB] uppercase tracking-widest relative hover:text-white transition-colors cursor-pointer"
                >
                  View Project Details
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Bottom Campaign Ribbon CTA strip */}
        <div className="mt-16 md:mt-24 rounded-2xl bg-gradient-to-r from-[#5AC2EB]/15 via-[#5AC2EB]/5 to-transparent p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#5AC2EB]/10">
          <p className="text-sm sm:text-base font-sans text-[#2E3543]/80 font-medium text-center md:text-left">
            Curious about a specific neighbourhood or project type?
          </p>
          <button
            onClick={() => {
              if (onNavigateProjects) {
                onNavigateProjects();
              } else {
                onOpenBooking('general');
              }
            }}
            className="bg-[#2E3543] hover:bg-[#2E3543]/90 text-white font-sans text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            Explore All 55+ Projects →
          </button>
        </div>

      </div>
    </section>
  );
}
