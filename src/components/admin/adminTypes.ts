import { DetailedProject } from '../../data/projectsDetailData';

export interface AuditLog {
  id: string;
  timestamp: string;
  type: 'success' | 'alert' | 'content' | 'deletion' | 'media';
  title: string;
  description: string;
  ip: string;
  location: string;
  browser: string;
}

export interface WebSectionContent {
  sectionId: string;
  sectionTitle: string;
  fields: {
    key: string;
    label: string;
    value: string;
    type: 'text' | 'textarea';
  }[];
}

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-05-24 · 05:32 AM',
    type: 'success',
    title: 'Login Successful',
    description: 'IP: 103.45.201.88 · Dhaka, Bangladesh · Chrome/Windows',
    ip: '103.45.201.88',
    location: 'Dhaka, Bangladesh',
    browser: 'Chrome / Windows'
  },
  {
    id: 'log-2',
    timestamp: '2026-05-23 · 11:47 PM',
    type: 'alert',
    title: 'Failed Login Attempt',
    description: 'IP: 185.190.140.22 · Unknown Location · Automated Bot',
    ip: '185.190.140.22',
    location: 'Unknown Location',
    browser: 'Python-requests'
  },
  {
    id: 'log-3',
    timestamp: '2026-05-23 · 03:15 PM',
    type: 'content',
    title: 'Project Updated',
    description: '"Aura Skyline One" — Gallery images refreshed',
    ip: '103.45.201.88',
    location: 'Dhaka, Bangladesh',
    browser: 'Chrome / Windows'
  },
  {
    id: 'log-4',
    timestamp: '2026-05-22 · 10:00 AM',
    type: 'deletion',
    title: 'Project Selected for Draft',
    description: '"Aura Grand" status set to Published on site',
    ip: '103.45.201.88',
    location: 'Dhaka, Bangladesh',
    browser: 'Chrome / Windows'
  },
  {
    id: 'log-5',
    timestamp: '2026-05-21 · 02:30 PM',
    type: 'media',
    title: 'Image Uploaded',
    description: '"flat-sale-dhaka.jpg" added to Media Library',
    ip: '103.45.201.88',
    location: 'Dhaka, Bangladesh',
    browser: 'Chrome / Windows'
  }
];

export const INITIAL_SECTIONS_CONTENT: WebSectionContent[] = [
  {
    sectionId: 'hero',
    sectionTitle: 'Hero Section',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow Text', value: 'ULTRA-PREMIUM DEVELOPERS IN DHAKA', type: 'text' },
      { key: 'headline1', label: 'Headline (Line 1)', value: 'Where state-of-the-art physics', type: 'text' },
      { key: 'headline2', label: 'Headline (Line 2)', value: 'meets pure architectural soul.', type: 'text' },
      { key: 'subheadline', label: 'Subheadline', value: 'We craft glassmorphic vertical sanctuaries in Gulshan, Banani, and Dhanmondi with unmatched safety margins and light-filled layouts.', type: 'textarea' },
      { key: 'primaryCta', label: 'Primary CTA Button text', value: 'Schedule Private Viewing', type: 'text' },
      { key: 'secondaryCta', label: 'Secondary CTA Button text', value: 'Explore Dossier', type: 'text' }
    ]
  },
  {
    sectionId: 'values',
    sectionTitle: 'Values & Trust Section',
    fields: [
      { key: 'title', label: 'Section Title', value: 'Built on uncompromising fundamentals.', type: 'text' },
      { key: 'description', label: 'Section Description', value: 'Every Aura structural layout is built to withstand seismic stress, maximize natural ventilation cycles, and stand beautifully for generations.', type: 'textarea' }
    ]
  },
  {
    sectionId: 'social',
    sectionTitle: 'Social Proof Section',
    fields: [
      { key: 'stat1_val', label: 'Stat 1 Value', value: '100%', type: 'text' },
      { key: 'stat1_lbl', label: 'Stat 1 Label', value: 'Structures Built are Standing Beautifully', type: 'text' },
      { key: 'stat2_val', label: 'Stat 2 Value', value: 'G+14', type: 'text' },
      { key: 'stat2_lbl', label: 'Stat 2 Label', value: 'Highest Project Elevation Completed', type: 'text' },
      { key: 'stat3_val', label: 'Stat 3 Value', value: 'BDT 45 Cr', type: 'text' },
      { key: 'stat3_lbl', label: 'Stat 3 Label', value: 'Maximum Single Unit Transaction Valuation', type: 'text' }
    ]
  },
  {
    sectionId: 'footer',
    sectionTitle: 'Footer Content',
    fields: [
      { key: 'tagline', label: 'Footer Tagline', value: 'Architectural benchmarks crafted with glass, travertine, and absolute safe margins in Dhaka, Bangladesh.', type: 'textarea' },
      { key: 'copyright', label: 'Copyright Notice', value: '© 2026 Aura Developments. All rights reserved. Built with structural integrity.', type: 'text' }
    ]
  }
];
