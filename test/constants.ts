
import { Car } from './types';

export const CARS: Car[] = [
  {
    id: '1',
    name: 'Lumina X-7',
    tagline: 'The Ultimate Family SUV',
    price: 'Rp 450.000.000',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1200',
    description: 'The Lumina X-7 combines rugged capability with sophisticated luxury. Designed for the modern family, it offers spacious seating for seven, advanced safety features, and a smooth ride that conquers both city streets and off-road trails.',
    features: ['Panoramic Sunroof', 'All-Wheel Drive', '7-Seater Configuration', 'Adaptive Cruise Control'],
    specs: {
      acceleration: '6.5s',
      power: '250 HP',
      topSpeed: '210 km/h'
    }
  },
  {
    id: '2',
    name: 'Lumina Electron',
    tagline: 'Pure Electric Elegance',
    price: 'Rp 680.000.000',
    category: 'EV',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200',
    description: 'Experience the silence of power with the Lumina Electron. Our flagship EV delivers instant torque, zero emissions, and a range that eliminates anxiety. The minimalist interior is crafted from sustainable materials.',
    features: ['Zero Emissions', 'Regenerative Braking', '15-inch Touchscreen', 'Autonomous Parking'],
    specs: {
      acceleration: '3.8s',
      power: '400 HP',
      range: '520 km',
      topSpeed: '240 km/h'
    }
  },
  {
    id: '3',
    name: 'Lumina GT-S',
    tagline: 'Born for the Track',
    price: 'Rp 850.000.000',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1200',
    description: 'The GT-S is precision engineering at its finest. Aerodynamically sculpted and tuned for responsiveness, every curve and line is designed for speed. It is not just a car; it is an adrenaline rush.',
    features: ['Carbon Fiber Body', 'Sport Tuned Suspension', 'Launch Control', 'Active Aerodynamics'],
    specs: {
      acceleration: '3.2s',
      power: '550 HP',
      topSpeed: '290 km/h'
    }
  },
  {
    id: '4',
    name: 'Lumina Prime',
    tagline: 'Executive Sedan',
    price: 'Rp 520.000.000',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
    description: 'Lumina Prime sets the standard for executive travel. With a focus on rear-seat comfort, noise isolation, and seamless connectivity, it is your personal sanctuary on wheels.',
    features: ['Massage Seats', 'Privacy Glass', 'Premium Sound System', 'Heads-Up Display'],
    specs: {
      acceleration: '5.9s',
      power: '300 HP',
      topSpeed: '230 km/h'
    }
  }
];

export const NAV_LINKS = [
  { name: 'Models', href: '#models' },
  { name: 'Purchase', href: '#booking' },
  { name: 'Technology', href: '#technology' },
  { name: 'Profile Sales', href: '#about' }, // Berubah dari About Us
  { name: 'News', href: '#news' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920',
    title: 'Future Driven',
    subtitle: 'Experience the next generation of automotive excellence.',
    cta: 'Discover Models'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1493238792015-1a772bd6ca6d?auto=format&fit=crop&q=80&w=1920',
    title: 'Zero Emissions',
    subtitle: 'Sustainable luxury without compromising performance.',
    cta: 'View Electric'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1471479917193-f00955256257?auto=format&fit=crop&q=80&w=1920',
    title: 'Unbound Freedom',
    subtitle: 'Designed to take you further than ever before.',
    cta: 'Book Test Drive'
  }
];

export const PROVINCES = [
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Banten", "Bali", "Sumatera Utara", "Sulawesi Selatan"
];

export const CITIES: Record<string, string[]> = {
  "DKI Jakarta": ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat", "Jakarta Utara", "Jakarta Timur"],
  "Jawa Barat": ["Bandung", "Bekasi", "Depok", "Bogor", "Cikarang"],
  "Jawa Tengah": ["Semarang", "Solo", "Magelang"],
  "Jawa Timur": ["Surabaya", "Malang", "Sidoarjo"],
  "Banten": ["Tangerang", "Tangerang Selatan", "Serang"],
  "Bali": ["Denpasar", "Badung", "Gianyar"],
  "Sumatera Utara": ["Medan", "Deli Serdang"],
  "Sulawesi Selatan": ["Makassar", "Gowa"]
};
