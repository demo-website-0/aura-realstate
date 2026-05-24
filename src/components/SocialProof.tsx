import { motion } from 'motion/react';
import { Star, MessageSquare } from 'lucide-react';

interface SocialProofProps {
  onOpenBooking: () => void;
}

export default function SocialProof({ onOpenBooking }: SocialProofProps) {
  const stats = [
    { number: '15+', label: 'Years of keeping promises' },
    { number: '55+', label: 'Stunning projects in Dhaka' },
    { number: '1,200+', label: 'Happy families, and counting' },
    { number: '0', label: 'Legal issues. Not one. Ever.' },
  ];

  const testimonials = [
    {
      id: 1,
      quote: "I've bought two flats from Aura. The first time I wasn't sure what to expect — but they handed over the keys three days early. Three days. I've already referred four of my friends.",
      name: 'Farhan R.',
      role: 'Gulshan Resident',
      stars: 5,
    },
    {
      id: 2,
      quote: "As a landowner, I was nervous. My land is everything. But the Aura team walked me through every single step and built something I'm genuinely proud to have my name on.",
      name: 'Nasrin K.',
      role: 'Land Partner — Banani',
      stars: 5,
    },
    {
      id: 3,
      quote: "The apartment is gorgeous — but what I didn't expect was how well they manage it after handover. My building looks brand new two years later. That says everything.",
      name: 'Imran T.',
      role: 'Dhanmondi Resident',
      stars: 5,
    },
  ];

  return (
    <section 
      id="proof" 
      className="relative bg-[#2E3543] py-24 md:py-32 text-white overflow-hidden"
    >
      {/* Testimonials Video Background with Loop & Fully Clear Contrast */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        <iframe
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 aspect-video object-cover scale-[1.35] opacity-100"
          src="https://www.youtube.com/embed/M-j_LvEK2ZA?autoplay=1&mute=1&loop=1&playlist=M-j_LvEK2ZA&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
          allow="autoplay; encrypted-media; picture-in-picture"
          title="Client Testimonials Background Video"
        />
      </div>

      {/* Decorative Radial glow centered at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#5AC2EB]/5 rounded-full blur-[120px] pointer-events-none z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Eyebrow */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase text-[#5AC2EB] tracking-[0.25em] block">
            THE PROOF IS IN THE HOMES WE'VE BUILT
          </span>
          <div className="w-12 h-[2px] bg-[#5AC2EB] mx-auto mt-3" />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-b border-white/10 pb-16 mb-20" id="stats-container">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`text-center md:text-left relative ${
                index < 3 ? 'lg:border-r lg:border-white/10 lg:pr-8' : ''
              }`}
            >
              {/* Massive count visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-7xl lg:text-8xl font-serif text-[#5AC2EB] font-bold leading-none tracking-tight"
              >
                {stat.number}
              </motion.div>
              <p className="text-xs sm:text-sm font-sans font-normal text-white/60 uppercase tracking-wider mt-4">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((test) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: test.id * 0.1, duration: 0.5 }}
              className="relative p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between overflow-hidden group"
              id={`testimonial-card-${test.id}`}
            >
              {/* Massive back-quote graphic element (Bigilla styling, scaled top-left position) */}
              <div className="absolute -top-6 -right-2 text-7xl sm:text-8xl font-serif text-[#5AC2EB]/15 select-none pointer-events-none transform translate-y-3 font-bold transition-all group-hover:text-[#5AC2EB]/25">
                “
              </div>

              <div className="relative z-10">
                {/* Custom stars set */}
                <div className="flex items-center gap-1 text-[#5AC2EB] mb-6">
                  {[...Array(test.stars)].map((_, i) => (
                    <Star key={i} size={15} className="fill-[#5AC2EB] stroke-none" />
                  ))}
                </div>

                <p className="text-sm sm:text-base font-sans italic text-white/85 leading-relaxed mb-8">
                  "{test.quote}"
                </p>
              </div>

              <div className="relative z-10 border-t border-white/5 pt-4">
                <h4 className="text-sm font-semibold tracking-wide text-[#5AC2EB]">
                  {test.name}
                </h4>
                <p className="text-[11px] uppercase tracking-wider text-white/40 mt-1">
                  {test.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Nudge */}
        <div className="text-center mt-20 max-w-xl mx-auto space-y-6">
          <p className="text-base sm:text-lg font-sans text-white/80 font-normal">
            Over 1,200 families chose Aura. Ready to be next?
          </p>
          <div className="inline-block">
            <button
              onClick={onOpenBooking}
              className="border border-[#5AC2EB] text-[#5AC2EB] bg-transparent hover:bg-[#5AC2EB]/10 font-sans font-semibold tracking-widest text-xs uppercase px-8 py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Book Your Private Visit
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
