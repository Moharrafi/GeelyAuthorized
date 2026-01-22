
import { Car } from './types';

export const CARS: Car[] = [
  {
    id: 'ex5',
    name: 'GEELY EX5',
    tagline: 'Leading the Pure Electric SUV Era',
    price: 'Rp 450.000.000',
    category: 'EV',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1200',
    description: 'The Geely EX5 is a pure electric SUV that combines advanced technology, superior safety, and exceptional performance. With its Aegis Short Blade Battery and 11-in-1 Intelligent Electric Drive, it sets a new benchmark for family EVs.',
    features: ['Aegis Short Blade Battery', '11-in-1 Electric Drive', 'Flyme Auto System', 'Level 2 ADAS'],
    specs: {
      acceleration: '6.9s',
      power: '160 kW',
      torque: '320 N.m',
      range: '495 km',
      topSpeed: '175 km/h',
      weight: '1.950 kg',
      dimensions: {
        length: '4615 mm',
        width: '1901 mm',
        height: '1670 mm',
        wheelbase: '2750 mm'
      }
    }
  },
  {
    id: 'ex2',
    name: 'GEELY EX2',
    tagline: 'Compact Smart Electric Explorer',
    price: 'Rp 320.000.000',
    category: 'EV',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200',
    description: 'Geely EX2 is designed for the modern urban explorer. Compact yet spacious, it offers agile handling and smart connectivity features that make city driving effortless and enjoyable.',
    features: ['Quick Charging', 'Smart Parking Assist', 'Sustainable Interior', 'Compact Agility'],
    specs: {
      acceleration: '7.5s',
      power: '120 kW',
      torque: '250 N.m',
      range: '400 km',
      topSpeed: '150 km/h',
      weight: '1.600 kg',
      dimensions: {
        length: '4120 mm',
        width: '1800 mm',
        height: '1570 mm',
        wheelbase: '2500 mm'
      }
    }
  },
  {
    id: 'starray',
    name: 'GEELY STARRAY EM-I',
    tagline: 'The New Generation Super Hybrid',
    price: 'Rp 550.000.000',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1200',
    description: 'Starray EM-i represents the pinnacle of hybrid engineering. Featuring the EM-i Super Hybrid system, it delivers ultra-long range and exceptional fuel efficiency without sacrificing power.',
    features: ['EM-i Super Hybrid System', '1000km+ Combined Range', 'World Class Interior', 'Advanced Chassis'],
    specs: {
      acceleration: '6.2s',
      power: '220 kW (Combined)',
      torque: '450 N.m',
      topSpeed: '210 km/h',
      weight: '1.850 kg',
      dimensions: {
        length: '4670 mm',
        width: '1900 mm',
        height: '1705 mm',
        wheelbase: '2777 mm'
      }
    }
  }
];

export const NAV_LINKS = [
  { name: 'Models', href: '#models' },
  { name: 'Specifications', href: '#specifications' },
  { name: 'Technology', href: '#technology' },
  { name: 'Profile Sales', href: '#about' },
  { name: 'News', href: '#news' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920',
    title: 'Geely EX5',
    subtitle: 'The intelligent pure electric SUV for the modern family.',
    cta: 'Discover EX5'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1493238792015-1a772bd6ca6d?auto=format&fit=crop&q=80&w=1920',
    title: 'Starray EM-i',
    subtitle: 'Efficiency redefined with Super Hybrid technology.',
    cta: 'Explore Starray'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1471479917193-f00955256257?auto=format&fit=crop&q=80&w=1920',
    title: 'Future Mobility',
    subtitle: 'Smart vehicles designed for a sustainable tomorrow.',
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
