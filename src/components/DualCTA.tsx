import { motion } from 'motion/react';
import { Check, Compass, Home } from 'lucide-react';

interface DualCTAProps {
  onOpenBooking: (audience: 'buyer' | 'landowner') => void;
  onNavigateLandowners?: () => void;
  onNavigateBuyers?: () => void;
}

export default function DualCTA({ onOpenBooking, onNavigateLandowners, onNavigateBuyers }: DualCTAProps) {
  const buyerFeatures = [
    'Premium locations across Dhaka\'s finest neighbourhoods',
    'Flexible payment plans tailored to your timeline',
    'Full transparency from first view to final keys',
  ];

  const landownerFeatures = [
    'Transparent revenue sharing with zero hidden surprises',
    'Full RAJUK compliance and structural integrity from Day 1',
    'End-to-end development and permanent post-handover management',
  ];

  return (
    <section 
      id="dual-audience" 
      className="py-24 bg-[#FDFCFC] border-t border-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Centered Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase text-[#5AC2EB] tracking-[0.25em] block">
            FIND YOUR FIT
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2E3543] font-bold leading-tight">
            Tell us which one sounds like you.
          </h2>
          <div className="w-12 h-[2.5px] bg-[#5AC2EB] mx-auto mt-4" />
        </div>

        {/* Responsive Dual panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative items-stretch" id="dual-panels-grid">
          
          {/* Subtle center vertical gradient divider on desktop */}
          <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#5AC2EB]/20 to-transparent hidden lg:block -translate-x-1/2 z-10 pointer-events-none" />

          {/* Left Panel: For Apartment Buyers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#FDFCFC] rounded-[32px] border border-[#5AC2EB]/15 p-8 sm:p-12 overflow-hidden flex flex-col justify-between shadow-[0_8px_32px_rgba(46,53,67,0.02)] hover:shadow-xl hover:border-[#5AC2EB]/35 transition-all"
            id="buyer-cta-panel"
            whileHover={{ y: -6 }}
          >
            {/* Background Image with subtle zoom overlaying a rich blur effect for text safety */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
              <img 
                src="https://jcxbd.com/wp-content/uploads/2024/08/Flat-Sale-in-Dhaka.jpg" 
                alt="Flat Sale in Dhaka"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md group-hover:bg-white/75 transition-all duration-300" />
            </div>

            {/* Soft Radial Ambient sky glow & silhouette */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#5AC2EB]/8 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute right-6 top-6 opacity-5 pointer-events-none text-[#5AC2EB]">
              <Home size={110} />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Badge */}
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#FDFCFC] bg-[#5AC2EB] px-4 py-1.5 rounded-full shadow-md shadow-[#5AC2EB]/10">
                I'M LOOKING FOR A HOME
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#2E3543] leading-snug font-bold">
                Find a space you'll genuinely <span className="italic font-normal text-[#5AC2EB]">love coming home</span> to.
              </h3>

              <p className="text-sm sm:text-base text-[#2E3543]/70 leading-relaxed font-normal">
                Ultra-premium apartments in Gulshan, Banani, Dhanmondi, and Bashundhara. Minimalist design. Natural light. Smart structural layout. Handed over ready on-time — and that's an airtight promise.
              </p>

              {/* Bullet features */}
              <ul className="space-y-3.5 pt-4">
                {buyerFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] shrink-0 mt-0.5">
                      <Check size={12} className="stroke-[3]" />
                    </span>
                    <span className="text-sm text-[#2E3543]/80 leading-snug font-normal">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom button with soft microcopy under-lacing */}
            <div className="relative z-10 mt-10 pt-6">
              <button
                onClick={() => onOpenBooking('buyer')}
                className="w-full bg-[#5AC2EB] text-[#2E3543] font-bold tracking-widest text-xs uppercase py-4 rounded-xl shadow-lg shadow-[#5AC2EB]/25 hover:bg-[#5AC2EB]/95 transition-all text-center cursor-pointer"
              >
                Come Take a Private Look →
              </button>
              <p className="text-center text-[11px] font-sans italic text-[#2E3543]/50 mt-3">
                No pressure. Just a conversation over coffee.
              </p>
              {onNavigateBuyers && (
                <button
                  onClick={onNavigateBuyers}
                  className="w-full text-center text-xs font-semibold text-[#5AC2EB] hover:underline mt-4 transition-all block cursor-pointer"
                >
                  Explore Buyer Guide & Live Listings →
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Panel: For Landowners */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-[#FDFCFC] rounded-[32px] border border-[#2E3543]/10 p-8 sm:p-12 overflow-hidden flex flex-col justify-between shadow-[0_8px_32px_rgba(46,53,67,0.02)] hover:shadow-xl hover:border-[#2E3543]/25 transition-all"
            id="landowner-cta-panel"
            whileHover={{ y: -6 }}
            transition={{ delay: 0.1 }}
          >
            {/* Background Image with subtle zoom overlaying a rich blur effect for text safety */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
              <img 
                src="https://www.swadeshproperties.com/images/3-to-5-katha-plot.jpg" 
                alt="3 to 5 katha plots"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md group-hover:bg-white/75 transition-all duration-300" />
            </div>

            {/* Grounding soft organic graphite radial bleed & blueprint details */}
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#2E3543]/5 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute right-6 top-6 opacity-5 pointer-events-none text-[#2E3543]">
              <Compass size={110} />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Badge */}
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-white bg-[#2E3543] px-4 py-1.5 rounded-full shadow-md shadow-[#2E3543]/15">
                I HAVE LAND TO DEVELOP
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#2E3543] leading-snug font-bold">
                Your land deserves a partner who <span className="italic font-normal">treats it like their own</span>.
              </h3>

              <p className="text-sm sm:text-base text-[#2E3543]/70 leading-relaxed font-normal">
                You've worked hard for that plot. We'll build something on it that you are genuinely proud of — structurally authenticated, legally clear, and maintained beautifully long after handing over.
              </p>

              {/* Bullet features */}
              <ul className="space-y-3.5 pt-4">
                {landownerFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#5AC2EB]/15 flex items-center justify-center text-[#5AC2EB] shrink-0 mt-0.5">
                      <Check size={12} className="stroke-[3]" />
                    </span>
                    <span className="text-sm text-[#2E3543]/80 leading-snug font-normal">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom button and microcopy */}
            <div className="relative z-10 mt-10 pt-6">
              <button
                onClick={() => onOpenBooking('landowner')}
                className="w-full bg-[#2E3543] hover:bg-[#2E3543]/90 text-white font-bold tracking-widest text-[#FDFCFC] text-xs uppercase py-4 rounded-xl shadow-lg transition-all text-center cursor-pointer"
              >
                Let's Build Something Great Together →
              </button>
              <p className="text-center text-[11px] font-sans italic text-[#2E3543]/50 mt-3">
                15 years of trusted land partnerships across Dhaka.
              </p>
              {onNavigateLandowners && (
                <button
                  onClick={onNavigateLandowners}
                  className="w-full text-center text-xs font-semibold text-[#2E3543] hover:underline mt-4 transition-all block cursor-pointer"
                >
                  Explore our Joint Venture Partnership Model →
                </button>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
