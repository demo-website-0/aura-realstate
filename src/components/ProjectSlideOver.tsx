import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Shield, MapPin, Calendar, Compass, ArrowRight } from 'lucide-react';

interface ProjectSlideOverProps {
  projectName: string | null;
  onClose: () => void;
  onBookProject: () => void;
}

export default function ProjectSlideOver({ projectName, onClose, onBookProject }: ProjectSlideOverProps) {
  if (!projectName) return null;

  // Rich metadata depending on project
  const projectDetails: Record<string, {
    tag: string;
    location: string;
    tagline: string;
    year: string;
    floors: string;
    units: string;
    features: string[];
    blueprintSpecs: { label: string; value: string }[];
    architectNotes: string;
  }> = {
    'Aura Skyline One': {
      tag: 'RESIDENTIAL · GULSHAN',
      location: 'Road 84, Gulshan-2, Dhaka',
      tagline: 'Dhaka\'s pioneering light-filled skyscraper residence.',
      year: 'Completed Nov 2022',
      floors: '12 Storeys',
      units: '24 Ultra-Premium Apartments',
      features: [
        'Unobstructed panoramic city and lake vistas',
        'Double height central reception atrium floor',
        'Smart automatic climate sensors and energy optimization',
        'Triple layer acoustic insulation system',
        'Concierge managed residents-only rooftop lounge',
      ],
      blueprintSpecs: [
        { label: 'Standard Area', value: '4,250 SQ FT' },
        { label: 'Structural Factor', value: 'Zone 2 Seismic Safety' },
        { label: 'Wind Resistance', value: 'Up to 210 km/h' },
        { label: 'Parking Slots', value: '3 Per Residence' },
      ],
      architectNotes: 'Designed focusing on daylight refraction. The building features an advanced cantilevered sunshade system that minimizes heat absorption during peak midday sun while admitting soft ambient brightness.'
    },
    'Aura Commerce Hub': {
      tag: 'BOUTIQUE COMMERCIAL · BANANI',
      location: 'Kemal Ataturk Avenue, Banani, Dhaka',
      tagline: 'Bespoke retail & headquarters of Dhaka\'s vanguard.',
      year: 'Completed July 2023',
      floors: '6 Storeys',
      units: '18 Dedicated Corporate Spaces',
      features: [
        'Edge-to-edge structural heat reflective double glazing',
        'High-density high speed destination elevator dispatch',
        'Column-free internal structural spans for custom layouts',
        'Fiber optic redundant internet trunklines pre-integrated',
        'Secured basement visitor parking with private lobbies',
      ],
      blueprintSpecs: [
        { label: 'Floor Plates', value: '5,800 SQ FT' },
        { label: 'Grid Column Spacing', value: '30 FT Clearances' },
        { label: 'Backpower Capacity', value: '150% Redundancy' },
        { label: 'HVAC Standard', value: 'Variable Refrigerant Flow' },
      ],
      architectNotes: 'An exercises in modern civic geometry. The glass envelope uses low-emission coatings that cut down glare while providing stunning visibility of Banani’s commercial baseline.'
    },
    'Aura Garden Residences': {
      tag: 'RESIDENTIAL · DHANMONDI',
      location: 'Road 9/A, Dhanmondi, Dhaka',
      tagline: 'Breathe freely in a vertical botanical oasis.',
      year: 'Completed Dec 2023',
      floors: '8 Storeys',
      units: '16 Boutique Residential Sanctuaries',
      features: [
        'Spacious private gardens custom integrated on every floor',
        'Low carbon footprint materials & certified cement standards',
        'Deep lightwells cascading natural warmth down middle atrium',
        'High performance state water recycling and purification plants',
        'Professional landscape gardeners retained by building management',
      ],
      blueprintSpecs: [
        { label: 'Sanctuary Sizes', value: '3,800 – 4,400 SQ FT' },
        { label: 'Acoustic Barrier', value: 'STC-55 rating borders' },
        { label: 'Foliage Soil Depth', value: '1.2M Cantilever Planters' },
        { label: 'Security Protocols', value: 'Biometric Access Control' },
      ],
      architectNotes: 'This residential sanctuary was drafted as a living ecosystem. The vertical plant balconies are fed by an automatic subterranean drip-irrigation network utilizing greywater recycled on-site.'
    },
    'Aura Prestige Heights': {
      tag: 'RESIDENTIAL · GULSHAN',
      location: 'Road 45, Gulshan-1, Dhaka',
      tagline: 'Restrained, grand modernism overlooking parkways.',
      year: 'Completed Feb 2021',
      floors: '10 Storeys',
      units: '18 Units',
      features: [
        'Custom high-grade Turkish marble hallways',
        'Secure multi-tier biometric entrance locksets',
        'Enhanced acoustic isolation and partition barriers',
        'Panoramic residents fitness room on rooftop',
      ],
      blueprintSpecs: [
        { label: 'Total Area', value: '3,950 SQ FT' },
        { label: 'Seismic Safety', value: 'Zone 2 Compliant' },
        { label: 'Elevators', value: 'Dual High Speed' },
        { label: 'Parking Space', value: '2 Per Unit' },
      ],
      architectNotes: 'A classic exercise in solid masonry, utilizing soft off-white limestone and bespoke bronze framing details along the main street facade.'
    },
    'Aura Glass Residences': {
      tag: 'RESIDENTIAL · GULSHAN',
      location: 'Road 112, Gulshan-2, Dhaka',
      tagline: 'Panoramic minimalist views of stunning Gulshan lake.',
      year: 'Completed May 2023',
      floors: '14 Storeys',
      units: '30 Premium Apartments',
      features: [
        'Curated glass panes minimizing ultraviolet interference',
        'Spacious open balconies overlooking the tranquil lake',
        'Automated home dashboard connecting security & lighting',
        '25-meter temperature-controlled indoor pool',
      ],
      blueprintSpecs: [
        { label: 'Standard Area', value: '4,600 SQ FT' },
        { label: 'Glass Factor', value: 'Triple Glazed low-E' },
        { label: 'Backup System', value: 'Double Generator Grid' },
        { label: 'Guard Station', value: '24/7 Security HUD' },
      ],
      architectNotes: 'The building structure maximizes transparency. Floor-to-ceiling perimeter architectural steel minimizes central concrete supports to bring the landscape directly inside.'
    },
    'Aura Blanc': {
      tag: 'RESIDENTIAL · BANANI',
      location: 'Road 12, Banani, Dhaka',
      tagline: 'Pure white monolithic architecture.',
      year: 'Completed Nov 2022',
      floors: '9 Storeys',
      units: '16 Boutique Residencies',
      features: [
        'Solid marble architectural facade plates',
        'Internal multi-floor lighting atrium',
        'Pre-fitted designer sanitaryware and bespoke wardrobes',
        'Exclusive residents meeting boardroom',
      ],
      blueprintSpecs: [
        { label: 'Suite Size', value: '4,100 SQ FT' },
        { label: 'Thermal Shield', value: 'R-19 Exterior Insulation' },
        { label: 'Elevator Lift', value: 'Premium German Traction' },
        { label: 'Acoustic Rating', value: 'STC-52 sound dampening' },
      ],
      architectNotes: 'Our design prioritizes simplicity. The travertine limestone sheets are positioned perfectly sequentially to represent a uniform, single continuous surface across all nine floor lines.'
    },
    'Aura Terrace Living': {
      tag: 'RESIDENTIAL · BANANI',
      location: 'Road 7, Banani, Dhaka',
      tagline: 'Staggered elevated terraces with personal garden pools.',
      year: 'Estimated Sept 2025',
      floors: '11 Storeys',
      units: '20 Elite Apartments',
      features: [
        'Double-depth cantilever gardens with automated hydration',
        'Private splash pools embedded in corner sky-terraces',
        'Highly advanced centralized reverse-osmosis water supply',
        'Private security elevators bypassing normal common lobbies',
      ],
      blueprintSpecs: [
        { label: 'Terrace Sizes', value: '650 SQ FT Terraces' },
        { label: 'Construction State', value: '65% Structural Framework' },
        { label: 'Security Level', value: 'Vanguard Biometrics' },
        { label: 'Air Filtering', value: 'HEPA Dynamic Intake' },
      ],
      architectNotes: 'Every single unit is staggered outwards, creating custom private pockets of open sky. Advanced water retention systems are integrated underneath all planter soils to eliminate leaks.'
    },
    'Aura Park View': {
      tag: 'RESIDENTIAL · DHANMONDI',
      location: 'Road 5, Dhanmondi, Dhaka',
      tagline: 'Elegant low-density sanctuary facing historical parks.',
      year: 'Completed May 2020',
      floors: '7 Storeys',
      units: '12 Boutique Homes',
      features: [
        'Clay-tile custom exterior accents',
        'Stunning 270-degree viewing wrap-around verandahs',
        'Residents organic farming roof greenhouse',
        'Pre-installed high capacity solar charging array',
      ],
      blueprintSpecs: [
        { label: 'Unit Sizes', value: '3,600 SQ FT' },
        { label: 'Foundation Factor', value: 'Deep Cast-In-Situ Piles' },
        { label: 'Acoustics', value: 'STC-50 sound insulation' },
        { label: 'Parking Spaces', value: '2 Under-ground spots' },
      ],
      architectNotes: 'An tribute to classic modernism. Rich brickwork panels pay architectural respects to historical Dhanmondi structures while incorporating cutting edge moisture resistant coatings.'
    },
    'Aura Grand': {
      tag: 'RESIDENTIAL · BASHUNDHARA',
      location: 'Block I, Bashundhara, Dhaka',
      tagline: 'Imposing presence with absolute safety margin.',
      year: 'Completed Sept 2023',
      floors: '13 Storeys',
      units: '28 Premium Homes',
      features: [
        'Integrated multi-zone automatic smoke/sprinkler grid',
        'Grand double height reception lobby with water curtain',
        '24/7 dedicated surveillance room managing security portals',
        'Lush common tree park on the ground boundary',
      ],
      blueprintSpecs: [
        { label: 'Flat Footprint', value: '4,500 SQ FT' },
        { label: 'Seismic Safety', value: 'Zone 2 Over-Reinforced' },
        { label: 'Solar Output', value: '15 kW Peak Capacity' },
        { label: 'Traction Lift', value: 'Dual 10-person units' },
      ],
      architectNotes: 'Our design emphasizes security and strength. Structural column widths are built with an extra 20% thickness above normal code to offer completely reliable shelter.'
    },
    'Aura Serenity': {
      tag: 'RESIDENTIAL · BASHUNDHARA',
      location: 'Block D, Bashundhara, Dhaka',
      tagline: 'A quiet premium sanctuary with automated smart controls.',
      year: 'Estimated Feb 2026',
      floors: '10 Storeys',
      units: '22 Smart Homes',
      features: [
        'Universal voice and smart app command systems',
        'Triple pane high insulation sound barrier glass',
        'Central state water softener and heater system',
        'Rooftop astronomical telescope and viewing lounge',
      ],
      blueprintSpecs: [
        { label: 'Construct State', value: '40% Complete' },
        { label: 'Floor Plates', value: '4,200 SQ FT' },
        { label: 'Smart Bus', value: 'KNX Wired Backbone' },
        { label: 'Seismic Grade', value: 'Zone 2 compliant' },
      ],
      architectNotes: 'Focused on creating absolute quiet inside Dhaka’s urban noise. Acoustic buffers are embedded in all wet walls and vertical pipelines'
    },
    'Aura Business Centre': {
      tag: 'COMMERCIAL · BANANI',
      location: 'Road 11, Banani, Dhaka',
      tagline: 'Compact, ultra-premium headquarters for creators.',
      year: 'Completed Jan 2021',
      floors: '5 Storeys',
      units: '12 Corporate Headquarters',
      features: [
        'Column-free continuous spans for spacious layouts',
        'Pre-wired high band fiber optic network links',
        'Secure multi-lane visitor elevator screening',
        'Rooftop executive meeting and lounge garden',
      ],
      blueprintSpecs: [
        { label: 'Floor Plate', value: '5,200 SQ FT' },
        { label: 'HVAC System', value: 'Inverter VRF' },
        { label: 'Generators', value: '100% Dual Backup' },
        { label: 'Security HUD', value: 'Biometric Card Access' },
      ],
      architectNotes: 'A sleek business statement. High reflection solar plates bounce excess light back to prevent interior heating during peak noon hours'
    },
    'Aura Corporate One': {
      tag: 'COMMERCIAL · GULSHAN',
      location: 'Gulshan Avenue, Gulshan, Dhaka',
      tagline: 'High prestige landmark with dedicated security lobbies.',
      year: 'Completed Aug 2022',
      floors: '7 Storeys',
      units: '15 High-Density Corporates',
      features: [
        'Direct connection to Avenue parking and VIP lanes',
        'Extremely reinforced steel load-bearing facades',
        'Triple redundancy electricity lines directly connected',
        'Underground safe-zone storage facilities',
      ],
      blueprintSpecs: [
        { label: 'Grid Column Span', value: '28 Foot clearance' },
        { label: 'Floor Loading', value: '4.5 kN/Sq Meter' },
        { label: 'Air Circulation', value: '3-stage HEPA filters' },
        { label: 'Elevator Dispatch', value: 'Intelligent zoning' },
      ],
      architectNotes: 'Built as the corporate focal point. The dark metallic structure evokes prestige while presenting an enduring landmark for visitors.'
    },
  };

  const project = projectDetails[projectName] || projectDetails['Aura Skyline One'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#2E3543]/40 backdrop-blur-sm"
          id="slideover-backdrop"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="relative w-full max-w-lg bg-[#FDFCFC] h-full shadow-2xl border-l border-[#5AC2EB]/20 flex flex-col justify-between z-10 overflow-hidden"
          id="slideover-container"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5AC2EB]">
                PROJECT REVEAL
              </span>
              <h3 className="text-xl font-serif text-[#2E3543] font-semibold">Dossier Overview</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
              id="close-slideover-button"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto p-6 space-y-8" id="slideover-content">
            
            {/* Top specs */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold bg-[#5AC2EB]/10 text-[#5AC2EB] px-3 py-1 rounded-full uppercase tracking-wider block inline-block">
                {project.tag}
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#2E3543]">{projectName}</h2>
              <div className="flex items-center gap-1.5 text-xs text-[#2E3543]/60">
                <MapPin size={14} className="text-[#5AC2EB]" />
                {project.location}
              </div>
              <p className="text-sm italic text-[#2E3543]/80 pt-2 font-medium">
                "{project.tagline}"
              </p>
            </div>

            {/* General Specs Grid */}
            <div className="grid grid-cols-3 gap-3 text-center border-t border-b border-gray-100 py-4">
              <div>
                <span className="text-[10px] uppercase text-gray-400 block tracking-widest">TIMELINE</span>
                <span className="text-xs font-semibold text-[#2E3543]/90">{project.year}</span>
              </div>
              <div className="border-l border-r border-gray-100">
                <span className="text-[10px] uppercase text-gray-400 block tracking-widest">FLOORS</span>
                <span className="text-xs font-semibold text-[#2E3543]/90">{project.floors}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-gray-400 block tracking-widest">DENSITY</span>
                <span className="text-xs font-semibold text-[#2E3543]/90">{project.units}</span>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#2E3543] uppercase tracking-widest flex items-center gap-2">
                <Shield size={14} className="text-[#5AC2EB]" />
                Luxury Signatures Included
              </h4>
              <ul className="space-y-2.5">
                {project.features.map((feat) => (
                  <li key={feat} className="flex gap-2.5 items-start text-xs sm:text-sm text-[#2E3543]/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5AC2EB] mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blueprint specs */}
            <div className="bg-[#2E3543]/5 p-5 rounded-2xl border border-gray-100 space-y-4">
              <h4 className="text-xs font-bold text-[#2E3543] uppercase tracking-widest flex items-center gap-2">
                <Compass size={14} className="text-[#5AC2EB]" />
                Structural Credentials
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {project.blueprintSpecs.map((spec) => (
                  <div key={spec.label} className="bg-white p-3 rounded-xl border border-[#5AC2EB]/15">
                    <span className="text-[9px] uppercase text-gray-400 block tracking-wider">{spec.label}</span>
                    <span className="text-xs font-bold text-[#2E3543]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architect notes */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Architectural Notes</h4>
              <p className="text-xs text-[#2E3543]/70 font-mono leading-relaxed bg-[#FDFCFC] p-3.5 rounded-xl border border-dashed border-gray-200">
                {project.architectNotes}
              </p>
            </div>

          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-gray-100 bg-white flex flex-col gap-3">
            <button
              onClick={onBookProject}
              className="w-full bg-[#5AC2EB] hover:bg-[#5AC2EB]/95 text-[#2E3543] font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              Request Dossier & Visit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-gray-400">
              Private tours can be arranged Sat - Thu at your convenience.
            </p>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
