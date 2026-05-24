export interface ValueCard {
  id: string;
  iconName: 'Clock' | 'Shield' | 'Compass' | 'Handshake';
  title: string;
  body: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  stars: number;
}

export interface Project {
  id: string;
  tag: string;
  name: string;
  description: string;
  specs: { label: string; value: string }[];
  accentColor?: string;
}

export interface BookingFormInput {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  audienceType: 'buyer' | 'landowner' | 'general';
}
