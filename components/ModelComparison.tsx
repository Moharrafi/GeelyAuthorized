import React, { useState } from 'react';
import { CARS } from '../constants';
import { Check, X, ArrowRight, Gauge, ChevronLeft, ChevronRight } from 'lucide-react';

interface SpecItem {
  label: string;
  key: string;
}

const KEY_SPECS: SpecItem[] = [
  { label: 'Tenaga', key: 'power' },
  { label: '0-100 km/h', key: 'acceleration' },
  { label: 'Jangkauan', key: 'range' },
  { label: 'Top Speed', key: 'topSpeed' },
];

const DETAIL_SPECS: SpecItem[] = [
  { label: 'Tipe Mesin', key: 'engineType' },
  { label: 'Fast Charging', key: 'fastCharge' },
  { label: 'Baterai', key: 'battery' },
  { label: 'ADAS', key: 'adas' },
  { label: 'Sound System', key: 'sound' },
  { label: 'Head-Up Display', key: 'hud' },
  { label: 'V2L', key: 'v2l' },
  { label: 'Panoramic Sunroof', key: 'sunroof' },
];

interface CarData { [key: string]: string | boolean; }

const DATA: Record<string, CarData> = {
  ex2: {
    price: 'Rp 255 Juta',
    engineType: 'Full Electric',
    power: '114 HP',
    powerSub: '85 kW',
    acceleration: '11.5s',
    range: '395 km',
    rangeSub: 'NEDC',
    topSpeed: '130',
    topSpeedUnit: 'km/h',
    fastCharge: '25 menit',
    battery: 'LFP 40.8 kWh',
    adas: 'Level 2',
    sound: 'Standard',
    hud: false,
    v2l: true,
    sunroof: false,
  },
  ex5: {
    price: 'Rp 475 Juta',
    engineType: 'Full Electric',
    power: '214 HP',
    powerSub: '160 kW',
    acceleration: '6.9s',
    range: '495 km',
    rangeSub: 'NEDC',
    topSpeed: '175',
    topSpeedUnit: 'km/h',
    fastCharge: '20 menit',
    battery: 'LFP 60.22 kWh',
    adas: 'Level 2 · 13 Fungsi',
    sound: 'FLYME 1000W · 16 Spk',
    hud: 'W-HUD 13.8"',
    v2l: true,
    sunroof: true,
  },
  starray: {
    price: 'Rp 499 Juta',
    engineType: 'Super Hybrid',
    power: '233 HP',
    powerSub: '160kW + 73kW',
    acceleration: '8.0s',
    range: '1.000+',
    rangeSub: 'km Total',
    topSpeed: '170',
    topSpeedUnit: 'km/h',
    fastCharge: '< 20 menit',
    battery: 'Ternary Lithium',
    adas: 'Level 2 · 14 Fungsi',
    sound: 'FLYME 1000W · 16 Spk',
    hud: 'W-HUD',
    v2l: true,
    sunroof: true,
  },
};

const BEST_IN: Record<string, string> = {
  power: 'starray',
  acceleration: 'ex5',
  range: 'starray',
  topSpeed: 'ex5',
  engineType: 'starray',
  fastCharge: 'starray',
  battery: 'ex5',
  adas: 'starray',
  sound: 'ex5',
  hud: 'ex5',
};

const ACCENT_UNIFIED = { color: '#94a3b8', gradient: 'from-slate-400/10 via-slate-400/5 to-transparent' };

const ModelComparison: React.FC = () => {
  const activeCars = CARS.filter(c => !c.id.startsWith('//'));
  const [mobileIndex, setMobileIndex] = useState(0);

  const mobileNext = () => setMobileIndex(prev => (prev + 1) % activeCars.length);
  const mobilePrev = () => setMobileIndex(prev => (prev - 1 + activeCars.length) % activeCars.length);

  const whatsapp = (name: string) => `https://wa.me/6283197483984?text=${encodeURIComponent(
    `Halo Dayana, saya tertarik dengan ${name}. Mohon info harga promo dan jadwal test drive. Terima kasih!`
  )}`;

  return (
    <section id="comparison" className="py-10 md:py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <Gauge size={14} />
            Perbandingan Model
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            Temukan yang <span className="text-slate-400 dark:text-slate-500 italic">Tepat.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm md:text-base font-light">
            Tiga pilihan luar biasa. Satu keputusan sempurna untuk Anda.
          </p>
        </div>

        {/* ═══════════════════════════════════════ */}
        {/* MOBILE: Swipeable Premium Cards         */}
        {/* ═══════════════════════════════════════ */}
        <div className="md:hidden relative">
          <button onClick={mobilePrev} aria-label="Previous car model" className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-1 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-xl text-slate-500"><ChevronLeft size={16} /></button>
          <button onClick={mobileNext} aria-label="Next car model" className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-1 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-xl text-slate-500"><ChevronRight size={16} /></button>

          {activeCars.map((car, i) => {
            if (i !== mobileIndex) return null;
            return <CarCard key={car.id} car={car} whatsapp={whatsapp} />;
          })}

          <div className="flex justify-center gap-2 mt-6">
            {activeCars.map((_, i) => (
              <button key={i} onClick={() => setMobileIndex(i)} aria-label={`Go to car ${i + 1}`} className={`h-2 rounded-full transition-all duration-300 ${i === mobileIndex ? 'w-8 bg-accent' : 'w-2 bg-slate-300 dark:bg-slate-700'}`} />
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════ */}
        {/* DESKTOP: Premium Column Cards           */}
        {/* ═══════════════════════════════════════ */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {activeCars.map(car => (
            <CarCard key={car.id} car={car} whatsapp={whatsapp} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────── */
/* Premium Car Comparison Card                      */
/* ─────────────────────────────────────────────── */
const CarCard: React.FC<{ car: typeof CARS[0]; whatsapp: (name: string) => string }> = ({ car, whatsapp }) => {
  const data = DATA[car.id];

  return (
    <div
      className="group relative rounded-[2rem] overflow-hidden bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-white/[0.06] transition-all duration-500 hover:border-slate-300 dark:hover:border-white/10 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/30"
    >

      {/* Top Glow */}
      <div className={`absolute top-0 left-0 right-0 h-60 bg-gradient-to-b ${ACCENT_UNIFIED.gradient} pointer-events-none`} />

      {/* Content */}
      <div className="relative">

        {/* ── Car Image + Name ── */}
        <div className="px-5 pt-6 pb-4 text-center">
          <div className="relative w-full aspect-[16/9] mb-5 rounded-2xl overflow-hidden">
            <img
              src={car.image}
              alt={car.name}
              width={800}
              height={450}
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
              loading="lazy"
              decoding="async"
            />
            {/* Bottom fade only */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-[#111827] to-transparent" />
          </div>
          <div className="text-[9px] font-black uppercase tracking-[0.25em] mb-1 text-accent">{car.category}</div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{car.name}</h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 font-medium mt-1">{car.tagline}</p>
        </div>

        {/* ── Price ── */}
        <div className="text-center pb-6">
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Mulai Dari</div>
          <div className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {data.price as string}
          </div>
        </div>

        {/* ── Key Specs Grid (2x2) ── */}
        <div className="mx-6 mb-6 grid grid-cols-2 gap-px rounded-2xl overflow-hidden border border-slate-100 dark:border-white/[0.06]">
          {[
            { value: data.power as string, sub: data.powerSub as string, label: 'Tenaga', bestKey: 'power' },
            { value: data.acceleration as string, sub: '', label: '0-100 km/h', bestKey: 'acceleration' },
            { value: data.range as string, sub: data.rangeSub as string, label: 'Jangkauan', bestKey: 'range' },
            { value: `${data.topSpeed}`, sub: data.topSpeedUnit as string, label: 'Top Speed', bestKey: 'topSpeed' },
          ].map((spec, i) => {
            const isBest = BEST_IN[spec.bestKey] === car.id;
            return (
              <div
                key={i}
                className="bg-slate-50/80 dark:bg-white/[0.02] p-4 text-center"
              >
                <div className={`text-xl font-black tracking-tight leading-none ${isBest ? 'text-accent' : 'text-slate-900 dark:text-white'}`}>
                  {spec.value}
                </div>
                {spec.sub && <div className="text-[9px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">{spec.sub}</div>}
                <div className="text-[9px] text-slate-400 dark:text-slate-400 font-bold uppercase tracking-widest mt-2">{spec.label}</div>
              </div>
            );
          })}
        </div>

        {/* ── Divider ── */}
        <div className="mx-6 h-px bg-slate-100 dark:bg-white/5" />

        {/* ── Detail Features ── */}
        <div className="px-6 py-5 space-y-0">
          {DETAIL_SPECS.map((spec) => {
            const val = data[spec.key];
            const isBest = BEST_IN[spec.key] === car.id;
            return (
              <div key={spec.key} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-white/[0.03] last:border-0">
                <span className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">{spec.label}</span>
                {typeof val === 'boolean' ? (
                  val ? (
                    <span className="w-5 h-5 rounded-full flex items-center justify-center bg-accent/10">
                      <Check size={12} className="text-accent" />
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                      <X size={12} className="text-slate-300 dark:text-slate-700" />
                    </span>
                  )
                ) : (
                  <span className={`text-[12px] font-bold text-right max-w-[55%] ${isBest ? 'text-accent' : 'text-slate-800 dark:text-slate-200'}`}>{val || '—'}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="px-6 pb-8 pt-2">
          <a
            href={whatsapp(car.name)}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 bg-white text-slate-900 border border-slate-200 dark:border-white/20 hover:bg-accent hover:text-slate-950 hover:border-accent shadow-lg shadow-black/5 hover:shadow-accent/20"
          >
            Tanya Harga
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModelComparison;
