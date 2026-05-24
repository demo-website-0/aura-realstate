import { motion } from 'motion/react';
import { Clock, ShieldCheck, Sun, Handshake } from 'lucide-react';

export default function TrustValues() {
  const cards = [
    {
      id: 'on-time',
      icon: Clock,
      title: 'Your keys. Your date. Period.',
      body: "We hand over your home exactly when we promised. If we're ever late? We pay you a monthly penalty. We've never had to, but the guarantee stands.",
    },
    {
      id: 'legal-safe',
      icon: ShieldCheck,
      title: "Sleep easy. Everything's airtight.",
      body: 'Every project is fully RAJUK-compliant, structurally engineered to the highest standards, and 100% legally clear. Zero title disputes. Zero shortcuts. Ever.',
    },
    {
      id: 'modern-breathing',
      icon: Sun,
      title: 'Spaces that actually feel alive.',
      body: 'Massive windows. Natural light everywhere. Green terraces. Smart features that genuinely make daily life better — not just impressive on a brochure.',
    },
    {
      id: 'stick-around',
      icon: Handshake,
      title: "We gave you the keys. We're not going.",
      body: "We manage every property we build — long after handover. So your home stays looking and feeling brand new for years to come.",
    },
  ];

  return (
    <section 
      id="values" 
      className="relative py-24 md:py-32 bg-[#FDFCFC] overflow-hidden"
    >
      {/* Decorative Architectural grid pattern at 3% opacity */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{
          backgroundImage: `
            radial-gradient(circle, #2E3543 1px, transparent 1px),
            linear-gradient(to right, #2E3543 1px, transparent 1px),
            linear-gradient(to bottom, #2E3543 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Repeating 80px long header accent line */}
        <div className="w-20 h-1 bg-[#5AC2EB] mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Sticky layout containing the bold headline block */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <span className="text-xs font-semibold uppercase text-[#5AC2EB] tracking-[0.25em] block">
              OUR PROMISES TO YOU
            </span>

            {/* Content box framed by left accent line */}
            <div className="border-l-2 border-[#5AC2EB] pl-6 md:pl-8 py-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2E3543] leading-tight font-bold">
                We built our reputation <span className="font-normal italic">one kept promise</span> at a time.
              </h2>
              <p className="text-[#2E3543]/75 font-normal text-base md:text-lg mt-6 leading-relaxed">
                Fifteen years in this city has taught us one thing — people don't want surprises. They want someone who does exactly what they said they'd do. That's us.
              </p>
            </div>
          </div>

          {/* Right Column - Four glassmorphism value cards arranged in a beautiful 2x2 grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(90, 194, 235, 0.12)' }}
                  className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/40 shadow-[0_8px_32px_rgba(46,53,67,0.03)] hover:border-[#5AC2EB]/30 transition-all flex flex-col justify-between"
                  id={`value-card-${card.id}`}
                >
                  <div>
                    {/* Housed icon with thin line aesthetics */}
                    <div className="w-12 h-12 rounded-full bg-[#5AC2EB]/10 flex items-center justify-center text-[#5AC2EB] mb-6">
                      <IconComp size={24} className="stroke-[1.5]" />
                    </div>
                    
                    <h3 className="font-serif text-xl font-bold text-[#2E3543] leading-snug mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#2E3543]/70 font-normal leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
