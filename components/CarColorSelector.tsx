import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Gauge, Zap, Wind, Info } from 'lucide-react';
import { CARS } from '../constants';

interface CarModel {
  id: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  colors: {
    id: string;
    name: string;
    material: string;
    hex: string;
    image: string;
  }[];
}

const CAR_MODELS: CarModel[] = [
  {
    id: 'ex2',
    name: 'Geely EX2',
    series: 'Urban EV',
    tagline: 'The Ultimate Family SUV',
    description: 'The Geely EX2 blends compact agility with smart electric sophistication.',
    colors: [
      { id: 'ex2-01', name: 'Rose', material: 'Rose', hex: '#d8b4b7', image: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(pink).webp' },
      { id: 'ex2-02', name: 'Sky', material: 'Sky', hex: '#8fb4e8', image: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(biru).webp' },
      { id: 'ex2-03', name: 'Lemon', material: 'Lemon', hex: '#fef3c7', image: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(kuning).webp' },
      { id: 'ex2-04', name: 'Cloud', material: 'Cloud', hex: '#f8fafc', image: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(putih).webp' },
      { id: 'ex2-05', name: 'Steel', material: 'Steel', hex: '#6b7280', image: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(abu).webp' },
      { id: 'ex2-06', name: 'Graphite', material: 'Graphite', hex: '#27272a', image: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(abu2).webp' },
    ]
  },
  {
    id: 'ex5',
    name: 'Geely EX5',
    series: 'Pure EV',
    tagline: 'Pure Electric Elegance',
    description: 'Geely EX5 merupakan SUV listrik canggih yang menggabungkan performa superior, efisiensi energi, dan inovasi teknologi.',
    colors: [
      { id: 'ex5-01', name: 'Teal', material: 'Teal', hex: '#7aa4ad', image: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_teal-3.webp' },
      { id: 'ex5-02', name: 'Ash', material: 'Ash', hex: '#cbd5e1', image: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_silver-3.webp' },
      { id: 'ex5-03', name: 'Silver', material: 'Silver', hex: '#9ca3af', image: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_ash-3.webp ' },
      { id: 'ex5-04', name: 'Black', material: 'Black', hex: '#0b0b0f', image: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_black-3.webp' },
      { id: 'ex5-05', name: 'White', material: 'White', hex: '#f8fafc', image: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_white-3.webp' },
    ]
  },
  {
    id: 'starray-emi',
    name: 'Geely Starray EM-i',
    series: 'Super Hybrid',
    tagline: 'Born for the Track',
    description: 'At the heart of the STARRAY EM-i is our advanced EM-i Super Hybrid technology engineered for maximum efficiency.',
    colors: [
      { id: 'st-01', name: 'Glacier Blue', material: 'Glacier Blue', hex: '#5b6f8e', image: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_glacier-blue3.webp' },
      { id: 'st-02', name: 'Alpine White', material: 'Alpine White', hex: '#f8fafc', image: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_alphine-white3.webp' },
      { id: 'st-03', name: 'Cloudveil Silver', material: 'Cloudveil Silver', hex: '#cbd5e1', image: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_cloundveil-silver3.webp' },
      { id: 'st-04', name: 'Jungle Green', material: 'Jungle Green', hex: '#1f3a2b', image: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_jungle-green3.webp' },
      { id: 'st-05', name: 'Volcanic Grey', material: 'Volcanic Grey', hex: '#6b7280', image: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_volcanic-grey3.webp' },
      { id: 'st-06', name: 'Polar Black', material: 'Polar Black', hex: '#0b0b0f', image: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_polar-black3.webp' },
    ]
  }
];

const CarColorSelector: React.FC = () => {
  const [activeModel, setActiveModel] = useState(CAR_MODELS[0]);
  const [activeColor, setActiveColor] = useState(CAR_MODELS[0].colors[0]);
  const [isModelTransitioning, setIsModelTransitioning] = useState(false);
  const [isColorTransitioning, setIsColorTransitioning] = useState(false);
  const [prevColor, setPrevColor] = useState<CarModel['colors'][number] | null>(null);
  const [shouldPreload, setShouldPreload] = useState(false);
  const colorRequestRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const legacyCar = CARS.find((car) => car.name === activeModel.name);
  const legacyStats = [
    { icon: Gauge, label: 'ACCEL', value: legacyCar?.specs.acceleration ?? '—' },
    { icon: Zap, label: 'POWER', value: legacyCar?.specs.power ?? '—' },
    { icon: Wind, label: 'SPEED', value: legacyCar?.specs.topSpeed ?? '—' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      setShouldPreload(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldPreload(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setActiveColor(activeModel.colors[0]);
    setPrevColor(null);
    setIsColorTransitioning(false);
    if (!shouldPreload || typeof Image === 'undefined') return;
    const firstImage = new Image();
    firstImage.src = activeModel.colors[0].image;
    let idleId: number | undefined;
    const preload = () => {
      activeModel.colors.forEach((color) => {
        const img = new Image();
        img.src = color.image;
      });
    };
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(preload, { timeout: 1500 });
    } else {
      idleId = window.setTimeout(preload, 500);
    }
    return () => {
      if (idleId) {
        if ('cancelIdleCallback' in window) {
          window.cancelIdleCallback(idleId);
        } else {
          window.clearTimeout(idleId);
        }
      }
    };
  }, [activeModel, shouldPreload]);

  const changeModel = (model: CarModel) => {
    if (model.id === activeModel.id) return;
    setIsModelTransitioning(true);
    setTimeout(() => {
      setActiveModel(model);
      setIsModelTransitioning(false);
    }, 500);
  };

  const changeColor = (color: any) => {
    if (color.id === activeColor.id) return;
    const requestId = colorRequestRef.current + 1;
    colorRequestRef.current = requestId;
    const preload = typeof Image !== 'undefined' ? new Image() : null;
    if (!preload) {
      setPrevColor(activeColor);
      setActiveColor(color);
      setIsColorTransitioning(true);
      setTimeout(() => {
        setIsColorTransitioning(false);
        setPrevColor(null);
      }, 600);
      return;
    }
    preload.src = color.image;
    preload.onload = () => {
      if (colorRequestRef.current !== requestId) return;
      setPrevColor(activeColor);
      setActiveColor(color);
      setIsColorTransitioning(true);
      setTimeout(() => {
        setIsColorTransitioning(false);
        setPrevColor(null);
      }, 600);
    };
    preload.onerror = () => {
      if (colorRequestRef.current !== requestId) return;
      setPrevColor(activeColor);
      setActiveColor(color);
      setIsColorTransitioning(true);
      setTimeout(() => {
        setIsColorTransitioning(false);
        setPrevColor(null);
      }, 600);
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-center overflow-hidden py-24 md:py-32 px-6 transition-colors duration-700 select-none"
    >

      {/* TRIPLE-LAYER ATMOSPHERIC LIGHTING - OPTIMIZED FOR MOBILE */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.4] md:opacity-[0.55] dark:opacity-[0.6] dark:md:opacity-[0.75] blur-[80px] md:blur-[140px] transition-all duration-700 scale-110"
          style={{ background: `radial-gradient(circle, ${activeColor.hex}, transparent 65%)` }}
        />
        <div
          className="absolute -top-[15%] -left-[10%] w-full h-full opacity-[0.25] md:opacity-[0.35] dark:opacity-[0.4] dark:md:opacity-[0.5] blur-[100px] md:blur-[150px] transition-all duration-1000"
          style={{ background: `radial-gradient(circle at top left, ${activeColor.hex}, transparent 60%)` }}
        />
        <div
          className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[150%] h-[40%] opacity-[0.4] md:opacity-[0.65] dark:opacity-[0.6] dark:md:opacity-[0.85] blur-[80px] md:blur-[110px] transition-all duration-1000"
          style={{ background: `radial-gradient(ellipse at center, ${activeColor.hex} 0%, transparent 80%)` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.12)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      <div className="container mx-auto relative z-10">

        {/* Header Branding */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent animate-pulse">Studio Configurator</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] transition-colors">
            Personalize Your <br />
            {/* PENYESUAIAN WARNA DISINI: Mengubah slate-300 ke slate-500 agar terbaca di light mode */}
            <span className="text-slate-500 dark:text-slate-600 italic">Signature Model.</span>
          </h2>
        </div>

        <div className="flex flex-col xl:flex-row items-start gap-12 xl:gap-24">

          {/* LEFT: MASTER CONTROL PANEL */}
          <div className="w-full xl:w-[400px] space-y-12">

            {/* 1. MODEL NAVIGATION */}
            <div className="space-y-6">
              <div className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] px-6">Model Navigator</div>
              <div className="grid grid-cols-1 gap-4">
                {CAR_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => changeModel(model)}
                    className={`relative w-full px-10 py-6 rounded-full text-left transition-all duration-500 overflow-hidden group border ${activeModel.id === model.id
                        ? 'bg-black/85 text-white border-slate-300 shadow-[0_25px_60px_-12px_rgba(15,23,42,0.18)] scale-[1.02] dark:bg-white dark:text-black dark:border-white dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)]'
                        : 'bg-slate-100 dark:bg-white/5 backdrop-blur-md border-slate-300 dark:border-white/5 text-slate-400 dark:text-white/40 hover:bg-white hover:border-slate-300 hover:text-slate-700 hover:shadow-[0_12px_30px_-16px_rgba(15,23,42,0.35)] dark:hover:bg-white/10 dark:hover:text-white/70'
                      }`}
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <div>
                        <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${activeModel.id === model.id ? 'text-white/90 dark:text-black/60' : 'text-slate-400 dark:text-white/40'}`}>{model.series}</div>
                        <div className={`text-xl font-black tracking-tighter ${activeModel.id === model.id ? 'text-white/85 dark:text-black' : 'text-slate-700 dark:text-white/90'}`}>{model.name}</div>
                      </div>
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${activeModel.id === model.id ? 'bg-accent text-slate-950' : 'bg-slate-100 dark:bg-white/10'}`}>
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. FINISH SELECTION */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3rem] p-6 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden group">
              <div
                className="absolute -top-10 -right-10 w-40 h-40 opacity-30 blur-3xl rounded-full transition-all duration-1000 group-hover:scale-110"
                style={{ background: activeColor.hex }}
              />

              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest">Exterior Finishing</span>
                <div className="h-px flex-1 bg-slate-400 dark:bg-white/6" />
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                {activeModel.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => changeColor(color)}
                    className={`relative w-10 h-10 rounded-full transition-all duration-500 transform ${activeColor.id === color.id
                        ? 'ring-2 ring-slate-900 dark:ring-white ring-offset-4 ring-offset-white dark:ring-offset-slate-950 scale-110 shadow-2xl z-10'
                        : 'opacity-40 hover:opacity-100 hover:scale-105'
                      }`}
                  >
                    <div
                      className="w-full h-full rounded-full border border-slate-200 dark:border-white/10 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-400 dark:border-white/6">
                <div className="text-slate-900 dark:text-white font-black text-2xl tracking-tighter mb-1 transition-all duration-500">{activeColor.name}</div>
                <div className="text-[11px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest">{activeColor.material}</div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE STAGE */}
          <div className="flex-1 relative w-full h-[760px] sm:h-[640px] md:h-[700px] flex items-center justify-center">

            {/* Core Halo Glow - OPTIMIZED */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] opacity-[0.35] md:opacity-[0.5] dark:opacity-[0.5] dark:md:opacity-[0.7] blur-[100px] md:blur-[160px] transition-all duration-1000 scale-90"
              style={{ background: `radial-gradient(circle, ${activeColor.hex}50 0%, transparent 75%)` }}
            />

            <div className={`relative w-full max-w-6xl scale-[1.06] sm:scale-100 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isModelTransitioning ? 'opacity-0 scale-95 blur-2xl translate-y-12' : 'opacity-100 scale-100 blur-0 translate-y-0'}`}>

              <div className="relative group">
                {/* Image Frame - Optimized Shadow/Corner for Mobile */}
                <div className="car-frame relative overflow-hidden rounded-[2rem] md:rounded-[4rem] border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] md:shadow-[0_40px_100px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.6)] md:dark:shadow-[0_60px_120px_rgba(0,0,0,0.8)]">
                  {prevColor ? (
                    <div key={`prev-${activeModel.id}-${prevColor.id}`} className="car-layer is-exit">
                      <img
                        src={prevColor.image}
                        alt={activeModel.name}
                        className="car-image w-full h-auto object-cover transition-transform duration-[4s] group-hover:scale-[1.05]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : null}
                  <div
                    key={`next-${activeModel.id}-${activeColor.id}`}
                    className={`car-layer ${isColorTransitioning ? 'is-enter' : ''}`}
                  >
                    <img
                      src={activeColor.image}
                      alt={activeModel.name}
                      className="car-image w-full h-auto object-cover transition-transform duration-[4s] group-hover:scale-[1.05]"
                      loading={shouldPreload ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  {/* Internal Saturated Overlay to blend with atmospheric lighting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                </div>

                {/* Floating Meta Stats */}
                <div className="absolute top-0 right-0 lg:-right-24 space-y-6 hidden md:block">
                  {legacyStats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-6 bg-white/95 dark:bg-slate-900/90 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-6 rounded-full group/stat hover:bg-accent hover:border-accent dark:hover:bg-white dark:hover:border-white/80 transition-all duration-500 hover:-translate-x-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] cursor-help">
                      <div className="text-right pl-4">
                        <div className="text-[8px] font-black text-accent/70 uppercase tracking-[0.4em] mb-1 group-hover/stat:text-slate-900 dark:group-hover/stat:text-slate-900 transition-colors">{stat.label}</div>
                        <div className="text-sm font-black text-slate-900 dark:text-white tracking-tighter group-hover/stat:text-slate-950 dark:group-hover/stat:text-slate-950 transition-colors">{stat.value}</div>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white/60 group-hover/stat:bg-white group-hover/stat:text-slate-950 dark:group-hover/stat:bg-white dark:group-hover/stat:text-slate-950 transition-all">
                        <stat.icon size={22} strokeWidth={2.5} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Saturated Floor Reflection - OPTIMIZED BLUR */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-20 opacity-40 md:opacity-50 dark:opacity-60 dark:md:opacity-75 blur-[50px] md:blur-[70px] rounded-full transition-all duration-1000"
                style={{ backgroundColor: activeColor.hex }} />
            </div>

            {/* Background Massive Branding Overlay - Penyesuaian opacity agar lebih tegas di light mode */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] dark:opacity-[0.03] transition-all duration-1000">
              <h3 className="text-[26vw] font-black text-slate-950 dark:text-white tracking-tighter leading-none uppercase italic">{activeModel.name}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Sidebar Info */}
      <div className="absolute bottom-16 right-16 hidden xl:flex items-center gap-6">
        <div className="text-right">
          <div className="text-[9px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.5em] mb-2">Technical Highlight</div>
          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-4 justify-end transition-colors group cursor-help">
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">Advanced Chassis Dynamics</span>
            <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center">
              <Info size={16} className="text-slate-400 dark:text-white/40" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .car-frame {
          perspective: 1400px;
        }

        .car-layer {
          position: relative;
          width: 100%;
          transform-style: preserve-3d;
          transform-origin: center;
          backface-visibility: hidden;
          will-change: transform, opacity, filter;
        }

        .car-image {
          opacity: 1;
          filter: contrast(1.08) brightness(1.04);
          mix-blend-mode: normal;
        }

        .car-layer.is-enter {
          z-index: 2;
          animation: car-luxe-fade 600ms cubic-bezier(0.1, 0.99, 0.16, 1);
        }

        .car-layer.is-exit {
          position: absolute;
          inset: 0;
          z-index: 1;
          animation: car-luxe-fade-out 600ms cubic-bezier(0.1, 0.99, 0.16, 1);
        }

        @keyframes car-luxe-fade {
          0% {
            transform: translateZ(20px) scale(1.01);
            opacity: 0;
            filter: blur(0.1px);
          }
          70% {
            transform: translateZ(4px) scale(1.002);
            opacity: 0.98;
            filter: blur(0.1px);
          }
          100% {
            transform: translateZ(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes car-luxe-fade-out {
          0% {
            transform: translateZ(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
          65% {
            transform: translateZ(4px) scale(0.998);
            opacity: 0.82;
            filter: blur(0.15px);
          }
          100% {
            transform: translateZ(12px) scale(0.99);
            opacity: 0;
            filter: blur(0.4px);
          }
        }
      `}</style>
    </section>
  );
};

export default CarColorSelector;
