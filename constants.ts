
import { Car } from './types';

export const CARS: Car[] = [
  {
    id: '1',
    name: 'Geely EX2',
    tagline: 'The Ultimate Family SUV',
    price: 'Rp 233.000.000',
    category: 'SUV',
    image: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/exterior_color_ex2_06.jpg',
    description: 'The Geely EX2 blends compact agility with smart electric sophistication. Built for modern urban life, it delivers a comfortable cabin, intelligent safety technology, and an efficient electric drive that glides effortlessly through city streets while staying ready for everyday adventures.',
    features: ['double the space', 'All-Wheel Drive', 'double the driving pleasure', 'THE SAFETY AND EASE'],
    specs: {
      acceleration: '11.5s',
      power: '114 HP',
      topSpeed: '130 km/h'
    }
  },
  {
    id: '2',
    name: 'Geely EX5',
    tagline: 'Pure Electric Elegance',
    price: 'Rp 515.000.000',
    category: 'SUV',
    image: 'https://geelyauto.id/sites/default/files/2025-10/E245_CamFront45_03_CloudCity-leo.jpg',
    description: 'Geely EX5 merupakan SUV listrik canggih yang menggabungkan performa superior, efisiensi energi, dan inovasi teknologi. Ditenagai motor listrik berkekuatan 160 kW (214 hp) dengan torsi 320 Nm, kendaraan ini mampu menempuh jarak hingga 495 km (NEDC) dalam sekali pengisian. Teknologi pengisian cepat memungkinkan daya terisi dari 30% hingga 80% hanya dalam 20 menit.',
    features: ['Zero Emissions', 'New Generation Short Blade Battery', 'Advanced Driver Assistance Systems (ADAS)', 'Premium Audio System'],
    specs: {
      acceleration: '6.9s',
      power: '160 kW',
      range: '495 km',
      topSpeed: '175 km/h'
    }
  },
  {
    id: '3',
    name: 'Geely Starray EM-i',
    tagline: 'Born for the Track',
    price: 'Rp 499.000.000',
    category: 'PHEV',
    image: 'https://imgcdn.oto.com/large/gallery/exterior/13/3283/geely-starray-em-i-front-angle-low-view-414009.jpg',
    description: 'At the heart of the STARRAY EM-i is our advanced EM-i Super Hybrid technology engineered for maximum efficiency. EM-i or E-Motive intelligence is Geely is advanced hybrid technology, combining the benefits of fuel and battery for greater efficiency, capability, and lower emissions.',
    features: ['Carbon Fiber Body', 'Sport Tuned Suspension', 'Launch Control', 'Active Aerodynamics'],
    specs: {
      acceleration: '3.2s',
      power: '550 HP',
      topSpeed: '290 km/h'
    }
  },
  // {
  //   id: '4',
  //   name: 'Geely Prime',
  //   tagline: 'Executive Sedan',
  //   price: 'Rp 520.000.000',
  //   category: 'Sedan',
  //   image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
  //   description: 'Geely Prime sets the standard for executive travel. With a focus on rear-seat comfort, noise isolation, and seamless connectivity, it is your personal sanctuary on wheels.',
  //   features: ['Massage Seats', 'Privacy Glass', 'Premium Sound System', 'Heads-Up Display'],
  //   specs: {
  //     acceleration: '5.9s',
  //     power: '300 HP',
  //     topSpeed: '230 km/h'
  //   }
  // }
];

export const NAV_LINKS = [
  { name: 'Models', href: '#models' },
  { name: 'Technology', href: '#technology' },
  { name: 'Profile Sales', href: '#about' }, // Berubah dari About Us
  { name: 'News', href: '#news' },
   { name: 'Purchase', href: '#booking' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://geelyprod-static.oss-ap-southeast-5.aliyuncs.com/experience-geely/experience-test-drive.png',
    title: 'Future Driven',
    subtitle: 'Experience the next generation of automotive excellence.',
    cta: 'Discover Models'
  },
  {
    id: 2,
    image: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/banner_lp.jpg',
    title: 'Zero Emissions',
    subtitle: 'Sustainable luxury without compromising performance.',
    cta: 'View Electric'
  },
  {
    id: 3,
    image: 'https://geelyauto.id/sites/default/files/2025-09/%E9%BB%84%E6%98%8F2-12.jpg',
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
