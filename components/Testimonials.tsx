import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  car: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Budi Santoso',
    car: 'Geely EX2',
    location: 'Cibubur, Bogor',
    rating: 5,
    text: 'Sangat puas dengan pelayanan Dayana! Proses kredit cepat dan transparan. Mobil EX2-nya juga luar biasa irit, biaya cas listrik sebulan cuma sekitar Rp 200 ribu untuk harian.',
    date: 'Maret 2026',
    avatar: 'BS',
  },
  {
    id: 2,
    name: 'Sari Dewi',
    car: 'Geely EX5',
    location: 'Bekasi, Jawa Barat',
    rating: 5,
    text: 'Awalnya ragu beli mobil listrik, tapi setelah test drive EX5 langsung jatuh cinta. Akselerasinya mantap, interiornya mewah, dan fitur ADAS-nya bikin nyaman di tol. Terima kasih Dayana!',
    date: 'April 2026',
    avatar: 'SD',
  },
  {
    id: 3,
    name: 'Hendra Wijaya',
    car: 'Geely Starray EM-i',
    location: 'Depok, Jawa Barat',
    rating: 5,
    text: 'Starray EM-i ini best of both worlds! Bisa full listrik buat harian, tapi kalau mudik jauh ada mesin bensin. Konsumsi BBM cuma 4 liter per 100km, gila sih. Dayana juga sangat responsif dan helpful.',
    date: 'April 2026',
    avatar: 'HW',
  },
  {
    id: 4,
    name: 'Rina Anggraeni',
    car: 'Geely EX2',
    location: 'Jakarta Timur',
    rating: 5,
    text: 'Cari mobil buat anak kuliahan dan ketemu EX2. Ukurannya pas, parkir gampang, dan yang paling penting AMAN karena fitur safety-nya lengkap. Makasih Mbak Dayana sudah bantu carikan promo terbaik!',
    date: 'Februari 2026',
    avatar: 'RA',
  },
  {
    id: 5,
    name: 'Agus Prasetyo',
    car: 'Geely EX5',
    location: 'Tangerang, Banten',
    rating: 5,
    text: 'Sudah 3 bulan pakai EX5, nol komplain. Charging di rumah overnight sudah cukup buat harian Tangerang-Jakarta PP. Sound system FLYME-nya juga juara, kayak di bioskop!',
    date: 'Maret 2026',
    avatar: 'AP',
  },
  {
    id: 6,
    name: 'Maya Kusuma',
    car: 'Geely Starray EM-i',
    location: 'Bogor, Jawa Barat',
    rating: 5,
    text: 'Baru kemarin ambil Starray EM-i dan langsung bawa mudik ke Semarang. Sekali isi bensin bisa 900+ km! Sunroof panoramic-nya bikin perjalanan makin asyik. Recommended banget Dayana, pelayanannya TOP.',
    date: 'Mei 2026',
    avatar: 'MK',
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goPrev = () => goTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => goTo((activeIndex + 1) % TESTIMONIALS.length);

  // Show 3 cards on desktop in a visible window
  const visibleTestimonials = [
    TESTIMONIALS[(activeIndex) % TESTIMONIALS.length],
    TESTIMONIALS[(activeIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(activeIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="py-10 md:py-16 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <MessageCircle size={14} />
            Testimoni Pelanggan
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            Apa Kata <span className="text-slate-400 dark:text-slate-600 italic">Mereka?</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Cerita nyata dari pemilik Geely yang telah merasakan langsung pengalaman berkendara dan pelayanan kami.
          </p>
        </div>

        {/* Testimonial Cards — Mobile: Single, Desktop: 3 Cards */}
        <div className="relative max-w-6xl mx-auto">
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="relative">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.id}
                  className={`transition-all duration-700 ease-out ${i === activeIndex ? 'opacity-100 relative translate-x-0' : 'opacity-0 absolute inset-0 pointer-events-none translate-x-4'}`}
                >
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((t, i) => (
              <div key={`${t.id}-${activeIndex}-${i}`} className="animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">50+</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Unit Terjual</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-amber-500 tracking-tighter flex items-center gap-1 justify-center">
              5.0 <Star size={20} fill="currentColor" />
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Rating Pelanggan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">100%</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Rekomendasi</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial: t }) => (
  <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 h-full flex flex-col relative group hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
    {/* Quote Icon */}
    <Quote size={32} className="text-accent/20 mb-4 flex-shrink-0" />

    {/* Rating */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: t.rating }).map((_, i) => (
        <Star key={i} size={14} className="text-amber-400" fill="currentColor" />
      ))}
    </div>

    {/* Text */}
    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1 mb-6">
      "{t.text}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
      <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-black">
        {t.avatar}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{t.name}</div>
        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider truncate">
          {t.car} • {t.location}
        </div>
      </div>
      <div className="text-[9px] text-slate-400 dark:text-slate-600 font-bold flex-shrink-0">{t.date}</div>
    </div>
  </div>
);

export default Testimonials;
