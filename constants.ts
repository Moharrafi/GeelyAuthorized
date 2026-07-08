
import { Car } from './types';

export const CARS: Car[] = [
  {
    id: 'ex2',
    name: 'Geely EX2',
    tagline: 'Smart Electric City SUV',
    price: 'Rp 255.000.000',
    pricePro: 'Rp 255.000.000',
    priceMax: 'Rp 285.000.000',
    category: 'SUV',
    image: 'https://geely.com.uy/wp-content/uploads/2025/12/315%C2%B0-scaled.jpg',
    description: 'Geely EX2 adalah SUV listrik kompak yang dirancang untuk kehidupan urban modern. Ditenagai motor listrik 85 kW (114 HP) dengan baterai LFP 40.8 kWh, EX2 mampu menempuh hingga 395 km (NEDC) dalam sekali pengisian. Pengisian cepat DC 30%-80% hanya dalam 25 menit, serta dilengkapi fitur V2L untuk suplai daya eksternal.',
    features: [
      'Jangkauan 395 km (NEDC)',
      'DC Fast Charging 25 Menit',
      'FLYME AUTO 14.6" Touchscreen',
      'V2L — Vehicle to Load',
      'RWD — Rear-Wheel Drive',
      'Baterai LFP 40.8 kWh',
      'Frunk 70L + Bagasi 375–1320L',
      'ADAS Level 2 (Varian Max)',
    ],
    specs: {
      acceleration: '11.5s',
      power: '85 kW / 114 HP',
      range: '395 km',
      topSpeed: '130 km/h'
    }
  },
  {
    id: 'ex5',
    name: 'Geely EX5',
    tagline: 'Pure Electric Flagship SUV',
    price: 'Rp 475.000.000',
    pricePro: 'Rp 475.000.000',
    priceMax: 'Rp 515.000.000',
    category: 'SUV',
    image: 'https://i0.wp.com/geely.premiumgroup.co.id/wp-content/uploads/2025/05/produk1.jpg?ssl=1',
    description: 'Geely EX5 adalah SUV listrik premium berbasis platform GEA (Global Electric Architecture). Ditenagai motor 160 kW (214 HP) dengan torsi 320 Nm, EX5 mampu berlari 0–100 km/h dalam 6.9 detik and menempuh hingga 495 km (NEDC). Teknologi DC fast charging mengisi baterai 60.22 kWh dari 30% ke 80% hanya dalam 20 menit.',
    features: [
      'Jangkauan 495 km (NEDC)',
      'DC Fast Charging 20 Menit',
      'W-HUD 13.8" Windshield Display',
      '16-Speaker FLYME SOUND 1000W',
      'FWD — Platform GEA Geely',
      'Baterai LFP 60.22 kWh',
      'ADAS Level 2 — 13 Fungsi',
      'V2L & V2V Power Supply',
    ],
    specs: {
      acceleration: '6.9s',
      power: '160 kW / 214 HP',
      range: '495 km',
      topSpeed: '175 km/h'
    }
  },
  {
    id: 'starray',
    name: 'Geely Starray EM-i',
    tagline: 'Thor EM-i Super Hybrid SUV',
    price: 'Rp 499.800.000',
    category: 'PHEV',
    image: 'https://imgcdn.oto.com/large/gallery/exterior/13/3283/geely-starray-em-i-front-angle-low-view-414009.jpg',
    description: 'Geely Starray EM-i menghadirkan teknologi Thor EM-i Super Hybrid yang revolusioner — memadukan mesin 1.5L (73 kW) dengan motor listrik 160 kW untuk total sistem 233 HP. Jangkauan listrik murni 105 km (NEDC), total jangkauan 1.000+ km, dan konsumsi BBM hanya 4.3 L/100km. Pengisian DC 30%–80% dalam kurang dari 20 menit.',
    features: [
      'Jangkauan Listrik 105 km (NEDC)',
      'Total Jangkauan 1.000+ km',
      'DC Fast Charging < 20 Menit',
      '16-Speaker FLYME SOUND 1000W',
      'ADAS Level 2 — 14 Fungsi',
      'Panoramic Power Sunroof',
      '540° Panoramic Camera View',
      'V2L & V2V Power Supply',
    ],
    specs: {
      acceleration: '8.0s',
      power: '160 kW + 73 kW',
      range: '105 km (EV) / 1000+ km',
      topSpeed: '170 km/h'
    }
  }
];

export const NAV_LINKS = [
  { name: 'Models', href: '#models' },
  { name: 'Specifications', href: '#specifications' },
  { name: 'Technology', href: '#technology' },
  { name: 'Profile Sales', href: '#about' }, // Berubah dari About Us
  { name: 'News', href: '#news' },
  { name: 'Purchase', href: '#booking' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/power.webp',
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
    image: 'https://appliedleasing.co.uk/uploads/geely-starray_desert-1.jpg',
    title: 'Unbound Freedom',
    subtitle: 'Designed to take you further than ever before.',
    cta: 'Book Test Drive',
    ctaTarget: 'booking'
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
