// Modular high-fidelity static data for Aura Projects Detail Page
export interface DetailedProject {
  id: string;
  name: string;
  slug: string;
  category: 'residential' | 'commercial';
  location: 'Gulshan' | 'Banani' | 'Dhanmondi' | 'Bashundhara';
  status: 'Ongoing' | 'Completed';
  address: string;
  landSize: string;
  apartmentSize: string;
  units: number;
  parking: string;
  floors: string;
  frontRoad: string;
  year: string;
  tagline: string;
  description: string;
  overallProgress: number;
  phases: { name: string; progress: number }[];
  flatTypes: {
    name: string;
    bedrooms: number;
    bathrooms: number;
    size: string;
    price: string;
    isPenthouse?: boolean;
    tier?: string;
  }[];
  neighbourhoodHighlights: string[];
}

export const projectsDetailList: DetailedProject[] = [
  {
    id: 'skyline',
    name: 'Aura Skyline One',
    slug: 'aura-skyline-one',
    category: 'residential',
    location: 'Gulshan',
    status: 'Completed',
    address: 'Plot 12, Road 55, Gulshan-2, Dhaka',
    landSize: '8 Katha',
    apartmentSize: '2,200 sft',
    units: 24,
    parking: '24 Cars',
    floors: 'G+12',
    frontRoad: '40 ft',
    year: '2022',
    tagline: "Dhaka's premier light-filled sky sanctuary.",
    description: 'A masterpiece of double-height layouts, featuring cantilevered light panels and direct views over the Gulshan skyline reservoir.',
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Type A — 3 Bed', bedrooms: 3, bathrooms: 3, size: '2,200 sft', price: 'BDT 2.5 Cr' },
      { name: 'Type B — 4 Bed', bedrooms: 4, bathrooms: 4, size: '2,800 sft', price: 'BDT 3.2 Cr' },
      { name: 'Penthouse', bedrooms: 4, bathrooms: 5, size: '3,600 sft', price: 'BDT 5.0 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Near Gulshan Circle-2', '40ft Front Road', 'Prime Corner Plot']
  },
  {
    id: 'commerce',
    name: 'Aura Commerce Hub',
    slug: 'aura-commerce-hub',
    category: 'commercial',
    location: 'Banani',
    status: 'Completed',
    address: 'Ataturk Avenue, Banani, Dhaka',
    landSize: '10 Katha',
    apartmentSize: '4,500 sft',
    units: 18,
    parking: '36 Cars',
    floors: 'G+6',
    frontRoad: '60 ft',
    year: '2023',
    tagline: 'Bespoke corporate base with low-glare envelope.',
    description: 'Sleek geometric lines, integrated VRF climatology and edge-to-edge heat reflective double glazed facades on Ataturk Avenue.',
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Executive Suite A', bedrooms: 1, bathrooms: 2, size: '2,100 sft', price: 'BDT 12.0 Cr' },
      { name: 'Corporate Suite B', bedrooms: 2, bathrooms: 3, size: '4,500 sft', price: 'BDT 24.0 Cr' },
      { name: 'Elite Pent Suite', bedrooms: 3, bathrooms: 4, size: '6,200 sft', price: 'BDT 45.0 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Main Ataturk Avenue', 'VRF Air Conditioning', 'Double Glazed Glass Facade']
  },
  {
    id: 'garden',
    name: 'Aura Garden Residences',
    slug: 'aura-garden-residences',
    category: 'residential',
    location: 'Dhanmondi',
    status: 'Completed',
    address: 'Road 9A, Dhanmondi, Dhaka',
    landSize: '7.5 Katha',
    apartmentSize: '2,400 sft',
    units: 16,
    parking: '16 Cars',
    floors: 'G+8',
    frontRoad: '30 ft',
    year: '2023',
    tagline: 'Vertical botanical haven with biological dripping loops.',
    description: 'Integrated multi-layered cantilever planters fed by an on-site organic greywater recycling and filtration array.',
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Type A — 3 Bed', bedrooms: 3, bathrooms: 3, size: '2,400 sft', price: 'BDT 2.8 Cr' },
      { name: 'Type B — 4 Bed', bedrooms: 4, bathrooms: 4, size: '2,900 sft', price: 'BDT 3.6 Cr' },
      { name: 'Botanical Penthouse', bedrooms: 4, bathrooms: 5, size: '3,800 sft', price: 'BDT 6.0 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Botanical Plantations', 'Near Dhanmondi Lake', 'Greywater Recycling']
  },
  {
    id: 'prestige',
    name: 'Aura Prestige Heights',
    slug: 'aura-prestige-heights',
    category: 'residential',
    location: 'Gulshan',
    status: 'Completed',
    address: 'Road 73, Gulshan-2, Dhaka',
    landSize: '9 Katha',
    apartmentSize: '3,100 sft',
    units: 18,
    parking: '20 Cars',
    floors: 'G+10',
    frontRoad: '50 ft',
    year: '2021',
    tagline: 'Restrained, grand modernism overlooking parkways.',
    description: 'Custom marble corridors, smart biometric locksets and soundproof STC-55 boundary thresholds for maximum isolation.',
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Premium Suite A', bedrooms: 3, bathrooms: 3, size: '3,100 sft', price: 'BDT 3.4 Cr' },
      { name: 'Premium Suite B', bedrooms: 4, bathrooms: 4, size: '3,600 sft', price: 'BDT 4.2 Cr' },
      { name: 'Grand Royal Penthouse', bedrooms: 4, bathrooms: 5, size: '4,800 sft', price: 'BDT 7.5 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Soundproof STC-55 Walls', 'Custom Italian Marble', 'Lake-Facing Terraces']
  },
  {
    id: 'glass',
    name: 'Aura Glass Residences',
    slug: 'aura-glass-residences',
    category: 'residential',
    location: 'Gulshan',
    status: 'Completed',
    address: 'Lake Boulevard, Gulshan-1, Dhaka',
    landSize: '12 Katha',
    apartmentSize: '3,500 sft',
    units: 30,
    parking: '45 Cars',
    floors: 'G+14',
    frontRoad: '40 ft',
    year: '2023',
    tagline: 'Panoramic minimalist views of stunning Gulshan lake.',
    description: "Generous perimeter glazing, hidden climate vents and premium fittings representing Dhaka's highest tier residential construction.",
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Crystal Suite', bedrooms: 3, bathrooms: 3, size: '3,500 sft', price: 'BDT 4.1 Cr' },
      { name: 'Horizon Suite', bedrooms: 4, bathrooms: 4, size: '4,100 sft', price: 'BDT 5.3 Cr' },
      { name: 'Lake Front Penthouse', bedrooms: 5, bathrooms: 5, size: '5,500 sft', price: 'BDT 9.5 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Panoramic Lake Views', 'Triple Glazed Windows', 'Smart Home Control Hub']
  },
  {
    id: 'blanc',
    name: 'Aura Blanc',
    slug: 'aura-blanc',
    category: 'residential',
    location: 'Banani',
    status: 'Completed',
    address: 'Road 11, Banani, Dhaka',
    landSize: '8 Katha',
    apartmentSize: '2,600 sft',
    units: 16,
    parking: '16 Cars',
    floors: 'G+9',
    frontRoad: '45 ft',
    year: '2022',
    tagline: 'Pure white monolithic architecture.',
    description: 'Utilizing premium imported Turkish travertine facade and hand-carved lightwells reflecting modern architectural restraint.',
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Travertine Type A', bedrooms: 3, bathrooms: 3, size: '2,600 sft', price: 'BDT 3.2 Cr' },
      { name: 'Travertine Type B', bedrooms: 4, bathrooms: 4, size: '3,100 sft', price: 'BDT 4.1 Cr' },
      { name: 'Monolithic Penthouse', bedrooms: 4, bathrooms: 5, size: '4,200 sft', price: 'BDT 7.0 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Imported Turkish Travertine', 'Central Hand-Carved Lightwell', 'Zero Open Electricals']
  },
  {
    id: 'terrace',
    name: 'Aura Terrace Living',
    slug: 'aura-terrace-living',
    category: 'residential',
    location: 'Banani',
    status: 'Ongoing',
    address: 'Block G, Banani, Dhaka',
    landSize: '10 Katha',
    apartmentSize: '2,800 sft',
    units: 20,
    parking: '24 Cars',
    floors: 'G+11',
    frontRoad: '35 ft',
    year: 'Ongoing',
    tagline: 'Staggered elevated terraces with personal garden pools.',
    description: 'Premium staggered cantilever layouts with extensive personal balconies. 70% of units are already reserved for elite buyers.',
    overallProgress: 56,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 90 },
      { name: 'Brickwork', progress: 75 },
      { name: 'Plastering', progress: 50 },
      { name: 'Finishing', progress: 20 },
      { name: 'Handover', progress: 0 }
    ],
    flatTypes: [
      { name: 'Type A — 3 Bed', bedrooms: 3, bathrooms: 3, size: '2,800 sft', price: 'BDT 3.5 Cr' },
      { name: 'Type B — 4 Bed', bedrooms: 4, bathrooms: 4, size: '3,400 sft', price: 'BDT 4.5 Cr' },
      { name: 'Terrace Sky Villa', bedrooms: 4, bathrooms: 5, size: '4,500 sft', price: 'BDT 8.0 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Staggered Balconies', 'Personal Splash Pools', '70% Presold Already']
  },
  {
    id: 'parkview',
    name: 'Aura Park View',
    slug: 'aura-park-view',
    category: 'residential',
    location: 'Dhanmondi',
    status: 'Completed',
    address: 'Satmasjid Road, Dhanmondi, Dhaka',
    landSize: '6 Katha',
    apartmentSize: '2,100 sft',
    units: 12,
    parking: '12 Cars',
    floors: 'G+7',
    frontRoad: '40 ft',
    year: '2020',
    tagline: 'Elegant low-density sanctuary facing historical parks.',
    description: 'Featuring bespoke clay-tile accents, spacious wrap-around verandahs, and intimate common roof recreational gardens.',
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Standard Type A', bedrooms: 3, bathrooms: 3, size: '2,100 sft', price: 'BDT 2.2 Cr' },
      { name: 'Deluxe Type B', bedrooms: 3, bathrooms: 4, size: '2,400 sft', price: 'BDT 2.6 Cr' },
      { name: 'Parkview Suite', bedrooms: 4, bathrooms: 4, size: '3,200 sft', price: 'BDT 4.2 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Faces Historic Park', 'Bespoke Clay-Tile Accents', 'Rooftop Recreation Deck']
  },
  {
    id: 'grand',
    name: 'Aura Grand',
    slug: 'aura-grand',
    category: 'residential',
    location: 'Bashundhara',
    status: 'Completed',
    address: 'Block I, Bashundhara R/A, Dhaka',
    landSize: '11 Katha',
    apartmentSize: '2,500 sft',
    units: 28,
    parking: '32 Cars',
    floors: 'G+13',
    frontRoad: '50 ft',
    year: '2023',
    tagline: 'Imposing presence with absolute safety margin.',
    description: 'Double-seismic zone reinforcement, comprehensive sprinkler grids, and deep columned lobbies welcoming families home.',
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Plaza Suite Type I', bedrooms: 3, bathrooms: 3, size: '2,500 sft', price: 'BDT 2.4 Cr' },
      { name: 'Plaza Suite Type II', bedrooms: 4, bathrooms: 4, size: '3,000 sft', price: 'BDT 3.1 Cr' },
      { name: 'Grand Palace Suite', bedrooms: 4, bathrooms: 5, size: '4,100 sft', price: 'BDT 5.8 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Double-Seismic Zone Build', 'Grand 25ft Ceiling Lobby', 'Pre-Installed Fire Sprinklers']
  },
  {
    id: 'serenity',
    name: 'Aura Serenity',
    slug: 'aura-serenity',
    category: 'residential',
    location: 'Bashundhara',
    status: 'Ongoing',
    address: 'Block D, Bashundhara R/A, Dhaka',
    landSize: '8.5 Katha',
    apartmentSize: '2,300 sft',
    units: 22,
    parking: '22 Cars',
    floors: 'G+10',
    frontRoad: '40 ft',
    year: 'Ongoing',
    tagline: 'A quiet premium sanctuary with automated smart controls.',
    description: 'Nestled in Bashundhara, providing state-of-the-art security, biometric entry points and zero noise-leak designs.',
    overallProgress: 78,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 95 },
      { name: 'Plastering', progress: 80 },
      { name: 'Finishing', progress: 40 },
      { name: 'Handover', progress: 5 }
    ],
    flatTypes: [
      { name: 'Type A — Comfort', bedrooms: 3, bathrooms: 3, size: '2,300 sft', price: 'BDT 2.1 Cr' },
      { name: 'Type B — Elite', bedrooms: 4, bathrooms: 4, size: '2,750 sft', price: 'BDT 2.8 Cr' },
      { name: 'Serenity Penthouse', bedrooms: 4, bathrooms: 5, size: '3,800 sft', price: 'BDT 4.8 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Ultra Quiet Soundproof Glass', 'Biometric Touchscreens', 'Ambient Floor Lighting']
  },
  {
    id: 'business',
    name: 'Aura Business Centre',
    slug: 'aura-business-centre',
    category: 'commercial',
    location: 'Banani',
    status: 'Completed',
    address: 'Kemal Ataturk Avenue, Banani, Dhaka',
    landSize: '8 Katha',
    apartmentSize: '3,800 sft',
    units: 12,
    parking: '24 Cars',
    floors: 'G+5',
    frontRoad: '80 ft',
    year: '2021',
    tagline: 'Compact, ultra-premium headquarters for creators.',
    description: 'Boutique premium offices, high-density fiber connections and panoramic boardrooms built for progressive businesses.',
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Executive Suite X1', bedrooms: 1, bathrooms: 2, size: '1,800 sft', price: 'BDT 9.5 Cr' },
      { name: 'Corporate Suite Y1', bedrooms: 2, bathrooms: 2, size: '3,800 sft', price: 'BDT 14.2 Cr' },
      { name: 'Roof Club Lounge', bedrooms: 2, bathrooms: 3, size: '5,000 sft', price: 'BDT 26.0 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Creator Studio Hubs', 'High Density Fiber Backbones', 'Executive Boardroom Facilities']
  },
  {
    id: 'corporate',
    name: 'Aura Corporate One',
    slug: 'aura-corporate-one',
    category: 'commercial',
    location: 'Gulshan',
    status: 'Completed',
    address: 'Madani Avenue, Gulshan, Dhaka',
    landSize: '15 Katha',
    apartmentSize: '5,200 sft',
    units: 15,
    parking: '40 Cars',
    floors: 'G+7',
    frontRoad: '100 ft',
    year: '2022',
    tagline: 'High prestige landmark with dedicated security lobbies.',
    description: 'Multi-layer security checkpoints, custom structural spans, and prestigious executive facilities on Gulshan Avenue.',
    overallProgress: 100,
    phases: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 100 },
      { name: 'Brickwork', progress: 100 },
      { name: 'Plastering', progress: 100 },
      { name: 'Finishing', progress: 100 },
      { name: 'Handover', progress: 100 }
    ],
    flatTypes: [
      { name: 'Prestige Flat C1', bedrooms: 1, bathrooms: 2, size: '2,600 sft', price: 'BDT 15.5 Cr' },
      { name: 'Prestige Suite C2', bedrooms: 2, bathrooms: 3, size: '5,200 sft', price: 'BDT 22.0 Cr' },
      { name: 'Imperial Corporate Pent', bedrooms: 3, bathrooms: 4, size: '7,400 sft', price: 'BDT 38.5 Cr', isPenthouse: true }
    ],
    neighbourhoodHighlights: ['Madani Avenue Prominence', 'Prestige Concierge Entry', 'Multi-Floor Expansion Ready']
  }
];
