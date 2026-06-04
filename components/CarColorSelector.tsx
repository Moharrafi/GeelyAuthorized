import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Gauge, Zap, Wind, Info } from 'lucide-react';
import { CARS } from '../constants';

interface ColorEntry {
  id: string;
  name: string;
  material: string;
  hex: string;
  image: string;
}

interface CarModel {
  id: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  colors: ColorEntry[];
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
    ],
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
      { id: 'ex5-03', name: 'Silver', material: 'Silver', hex: '#9ca3af', image: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_ash-3.webp' },
      { id: 'ex5-04', name: 'Black', material: 'Black', hex: '#0b0b0f', image: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_black-3.webp' },
      { id: 'ex5-05', name: 'White', material: 'White', hex: '#f8fafc', image: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_white-3.webp' },
    ],
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
    ],
  },
];

const CarColorSelector: React.FC = () => {
  const [activeModel, setActiveModel] = useState(CAR_MODELS[0]);
  const [activeColor, setActiveColor] = useState(CAR_MODELS[0].colors[0]);
  const [prevColorHex, setPrevColorHex] = useState<string>(CAR_MODELS[0].colors[0].hex);
  const [glowVisible, setGlowVisible] = useState(false);
  const [isModelTransitioning, setIsModelTransitioning] = useState(false);
  const [isColorTransitioning, setIsColorTransitioning] = useState(false);
  const [prevColor, setPrevColor] = useState<ColorEntry | null>(null);
  const [shouldPreload, setShouldPreload] = useState(false);
  const [prevModelId, setPrevModelId] = useState<string | null>(null);
  const [prevActiveColorId, setPrevActiveColorId] = useState<string | null>(null);

  const modelTransRef = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const legacyCar = CARS.find((car) => car.name === activeModel.name);
  const legacyStats = [
    { icon: Gauge, label: 'ACCEL', value: legacyCar?.specs.acceleration ?? '—' },
    { icon: Zap, label: 'POWER', value: legacyCar?.specs.power ?? '—' },
    { icon: Wind, label: 'SPEED', value: legacyCar?.specs.topSpeed ?? '—' },
  ];

  // Eagerly preload ALL images for all models once section is near viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) { setShouldPreload(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShouldPreload(true); observer.disconnect(); }
    }, { rootMargin: '300px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Preload colors for the ACTIVE model only to save bandwidth
  useEffect(() => {
    if (!shouldPreload || typeof Image === 'undefined') return;
    const preload = () => {
      activeModel.colors.forEach((c) => {
        const img = new Image();
        img.src = c.image;
      });
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preload, { timeout: 800 });
      return () => window.cancelIdleCallback(id);
    } else {
      const id = globalThis.setTimeout(preload, 300) as unknown as number;
      return () => globalThis.clearTimeout(id);
    }
  }, [shouldPreload, activeModel.id]);

  // Preload a model's colors when hovering its button
  const preloadModelOnHover = (model: CarModel) => {
    if (model.id === activeModel.id || typeof Image === 'undefined') return;
    model.colors.forEach((c) => {
      const img = new Image();
      img.src = c.image;
    });
  };

  const changeModel = (model: CarModel) => {
    if (model.id === activeModel.id || modelTransRef.current) return;

    const newColor = model.colors[0];

    const execute = () => {
      modelTransRef.current = true;
      setPrevColorHex(activeColor.hex);
      setGlowVisible(true);
      setPrevModelId(activeModel.id);
      setPrevActiveColorId(activeColor.id);
      setActiveModel(model);
      setActiveColor(newColor);
      setPrevColor(null);
      setIsColorTransitioning(false);
      setIsModelTransitioning(true);
      setTimeout(() => {
        setIsModelTransitioning(false);
        setPrevModelId(null);
        setPrevActiveColorId(null);
        setPrevColorHex(newColor.hex);
        setGlowVisible(false);
        modelTransRef.current = false;
      }, 760);
    };

    execute();
  };

  const changeColor = (color: ColorEntry) => {
    if (color.id === activeColor.id || modelTransRef.current) return;

    const execute = () => {
      setPrevColorHex(activeColor.hex);
      setGlowVisible(true);
      setPrevColor(activeColor);
      setActiveColor(color);
      setIsColorTransitioning(true);
      setTimeout(() => {
        setIsColorTransitioning(false);
        setPrevColor(null);
        setPrevColorHex(color.hex);
        setGlowVisible(false);
      }, 300);
    };

    if (typeof Image === 'undefined') { execute(); return; }
    const img = new Image();
    img.src = color.image;
    if (img.complete && img.naturalWidth > 0) { execute(); return; }
    let fired = false;
    const t = setTimeout(() => { if (!fired) { fired = true; execute(); } }, 120);
    img.onload = () => { if (!fired) { fired = true; clearTimeout(t); execute(); } };
    img.onerror = () => { if (!fired) { fired = true; clearTimeout(t); execute(); } };
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-center overflow-hidden py-16 md:py-32 px-6 select-none"
    >
      {/*
        ATMOSPHERIC LIGHTING — opacity crossfade between old/new color layers.
        prevColorHex fades out, activeColor.hex fades in during transition.
        Using opacity transitions (GPU-composited) instead of transition-colors (re-rasterize).
      */}
      {/* PREMIUM ATMOSPHERIC DUAL-TONE AURORA GLOW */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Primary Glow Blob (Centered behind the car) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[1200ms] ease-out opacity-25 dark:opacity-35 will-change-[background-color]"
          style={{
            width: '60vw',
            height: '60vw',
            backgroundColor: activeColor.hex,
            filter: 'blur(130px)',
          }}
        />
        {/* Secondary Offset Accent Blob (Shifts hue dynamically to create a gorgeous mesh effect) */}
        <div
          className="absolute top-[35%] left-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[1600ms] ease-out opacity-15 dark:opacity-25 will-change-[background-color]"
          style={{
            width: '40vw',
            height: '40vw',
            backgroundColor: activeColor.hex,
            filter: 'hue-rotate(30deg) saturate(1.2) blur(100px)',
          }}
        />
      </div>
      {/* Stable dark vignette — never changes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.15)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.5)_100%)]" />


      <div className="container mx-auto relative z-10">

        {/* Header */}
        <div className="mb-10 md:mb-20">
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="h-px w-16 bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Studio Configurator</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] transition-colors">
            Personalize Your{' '}
            <span className="text-slate-500 dark:text-slate-400 italic transition-colors duration-500">Signature Model.</span>
          </h2>
        </div>

        <div className="flex flex-col xl:flex-row items-start gap-8 md:gap-12 xl:gap-24">

          {/* ── LEFT: CONTROL PANEL ── */}
          <div className="w-full xl:w-[400px] space-y-8 md:space-y-12">

            {/* Model Navigator */}
            <div className="space-y-6">
              <div className="text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] px-6">Model Navigator</div>
              <div className="grid grid-cols-3 xl:grid-cols-1 gap-3">
                {CAR_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => changeModel(model)}
                    onMouseEnter={() => preloadModelOnHover(model)}
                    className={`relative w-full px-4 py-4 md:px-8 md:py-6 xl:px-10 xl:py-6 rounded-2xl xl:rounded-full text-left transition-[background-color,border-color,box-shadow,color,opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden group border will-change-transform ${activeModel.id === model.id
                        ? 'bg-black/85 text-white border-slate-300 shadow-[0_25px_60px_-12px_rgba(15,23,42,0.18)] dark:bg-white dark:text-black dark:border-white dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)]'
                        : 'bg-slate-100 dark:bg-slate-900 md:dark:bg-white/5 md:backdrop-blur-md border-slate-300 dark:border-white/5 text-slate-400 dark:text-white/40 hover:bg-white hover:border-slate-300 hover:text-slate-700 hover:shadow-[0_12px_30px_-16px_rgba(15,23,42,0.35)] dark:hover:bg-slate-800 dark:md:hover:bg-white/10 dark:hover:text-white/70'
                      }`}
                  >
                    <span
                      className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeModel.id === model.id ? 'opacity-100' : 'group-hover:opacity-60'
                        }`}
                      style={{
                        background: activeModel.id === model.id
                          ? `radial-gradient(circle at 85% 50%, ${activeColor.hex}30 0%, transparent 42%)`
                          : 'radial-gradient(circle at 85% 50%, rgba(255,255,255,0.12) 0%, transparent 46%)',
                      }}
                    />
                    <div className="relative z-10 flex items-center justify-between gap-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                      <div className="min-w-0 flex-1">
                        <div className={`text-[8px] md:text-[9px] xl:text-[10px] font-black uppercase tracking-widest mb-0.5 truncate ${activeModel.id === model.id ? 'text-white/90 dark:text-black/60' : 'text-slate-400 dark:text-white/40'}`}>{model.series}</div>
                        <div className={`text-[11px] md:text-base xl:text-xl font-black tracking-tighter truncate ${activeModel.id === model.id ? 'text-white/85 dark:text-black' : 'text-slate-700 dark:text-white/90'}`}>{model.name}</div>
                      </div>
                      {/* Smaller arrow for mobile without background to save space */}
                      <div className={`flex xl:w-9 xl:h-9 rounded-full items-center justify-center flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeModel.id === model.id ? 'xl:bg-accent text-accent xl:text-slate-950' : 'text-slate-500 xl:bg-slate-100 dark:xl:bg-white/10'}`}>
                        <ChevronRight size={16} className="xl:hidden" />
                        <ChevronRight size={20} className={`hidden xl:block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeModel.id === model.id ? 'translate-x-0.5' : ''}`} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Selection */}
            <div className="bg-white/95 dark:bg-slate-900/95 md:bg-white/80 md:dark:bg-slate-900/40 md:backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[3rem] p-6 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden group">
              <div
                className="absolute -top-10 -right-10 w-40 h-40 opacity-30 blur-2xl md:blur-3xl rounded-full transition-colors duration-1000 group-hover:scale-110 hidden md:block"
                style={{ backgroundColor: activeColor.hex }}
              />

              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest">Exterior Finishing</span>
                <div className="h-px flex-1 bg-slate-400 dark:bg-white/6" />
              </div>

              {/* Swatches — keyed to model so they slide in on model change */}
              <div key={activeModel.id} className="flex flex-wrap gap-4 mb-8 swatches-enter">
                {activeModel.colors.map((color) => {
                  const isActive = activeColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => changeColor(color)}
                      title={color.name}
                      aria-label={`Select ${color.name}`}
                      className={`relative w-10 h-10 rounded-full transition-all duration-300 transform ${isActive
                          ? 'ring-2 ring-slate-900 dark:ring-white ring-offset-4 ring-offset-white dark:ring-offset-slate-950 scale-110 z-10'
                          : 'opacity-40 hover:opacity-100 hover:scale-105'
                        }`}
                      style={isActive ? { boxShadow: `0 0 0 4px ${color.hex}40` } : undefined}
                    >
                      <div
                        className="w-full h-full rounded-full border border-slate-200 dark:border-white/10"
                        style={{ backgroundColor: color.hex }}
                      />
                      {isActive && (
                        <span className="absolute inset-0 rounded-full swatch-pulse-ring" style={{ borderColor: color.hex }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Color name — key triggers remount + slide-up on every change */}
              <div key={activeColor.id} className="color-info-enter pt-6 border-t border-slate-400 dark:border-white/6">
                <div className="text-slate-900 dark:text-white font-black text-2xl tracking-tighter mb-1">{activeColor.name}</div>
                <div className="text-[11px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest">{activeColor.material}</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: THE STAGE ── */}
          <div className="flex-1 relative w-full h-[320px] sm:h-[480px] md:h-[580px] xl:h-[760px] flex items-center justify-center order-first xl:order-none">

            {/* Core halo glow — neutral studio lighting (Zero blur for performance) */}
            <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-50" aria-hidden>
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(50% 50% at 50% 50%, #94a3b8 0%, transparent 100%)`,
                }}
                className="dark:hidden"
              />
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(50% 50% at 50% 50%, #334155 0%, transparent 100%)`,
                }}
                className="hidden dark:block"
              />
            </div>

            <div className="relative w-full max-w-6xl scale-[1.06] sm:scale-100">

              <div className="relative group">

                {/* ── Car Image Frame ── */}
                <div
                  className="car-frame relative overflow-hidden rounded-[2rem] md:rounded-[4rem] border shadow-2xl transition-colors duration-500"
                  style={{
                    borderColor: `${activeColor.hex}30`,
                    backgroundColor: 'rgba(15, 23, 42, 0.05)'
                  }}
                >
                  {/* Internal Rim Light — Hidden on mobile for performance */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10 opacity-20 hidden md:block"
                    style={{
                      boxShadow: `inset 0 0 60px 0 ${activeColor.hex}20`,
                    }}
                  />
                  {/* Fixed aspect ratio container */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>

                    {/* Pre-mount all models and their colors for 100% hardware-accelerated animations */}
                    {CAR_MODELS.map((model) => {
                      const isCurrentModel = activeModel.id === model.id;
                      const wasCurrentModel = prevModelId === model.id;
                      const isVisible = isCurrentModel || (isModelTransitioning && wasCurrentModel);

                      if (!isVisible) return null;

                      // Transition class for slide animations
                      let transitionClass = '';
                      if (isModelTransitioning) {
                        if (isCurrentModel) {
                          transitionClass = 'model-enter';
                        } else if (wasCurrentModel) {
                          transitionClass = 'model-exit';
                        }
                      }

                      // Opacity, Z-Index and pointer events
                      const opacity = isCurrentModel ? 1 : (wasCurrentModel && isModelTransitioning ? 1 : 0);
                      const zIndex = isCurrentModel ? 3 : (wasCurrentModel && isModelTransitioning ? 2 : 1);
                      const pointerEvents = isCurrentModel ? 'auto' : 'none';

                      const activeColorIdInModel = model.id === activeModel.id
                        ? activeColor.id
                        : prevActiveColorId;

                      return (
                        <div
                          key={model.id}
                          className={`absolute inset-0 w-full h-full ${transitionClass}`}
                          style={{
                            opacity,
                            zIndex,
                            pointerEvents,
                            willChange: 'transform, opacity',
                          }}
                        >
                          {model.colors.map((color) => {
                            const isActiveColor = activeColorIdInModel === color.id;
                            return (
                              <div
                                key={color.id}
                                className="car-layer transition-opacity duration-300 ease-in-out"
                                style={{
                                  opacity: isActiveColor ? 1 : 0,
                                  zIndex: isActiveColor ? 3 : 1,
                                  pointerEvents: isActiveColor ? 'auto' : 'none',
                                }}
                              >
                                <img
                                  src={color.image}
                                  alt={`${model.name} ${color.name}`}
                                  className="car-image"
                                  loading="eager"
                                  decoding="async"
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none z-[5]" />
                  </div>
                </div>

                {/* Stats — keyed to model: slide in from right when model changes */}
                <div key={activeModel.id} className="absolute top-4 right-4 lg:top-0 lg:-right-24 space-y-3 lg:space-y-6 hidden md:block stats-enter">
                  {legacyStats.map((stat, i) => (
                    <div key={i} className="flex items-center justify-between min-w-[140px] lg:min-w-[240px] bg-white/95 dark:bg-slate-900/90 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-3 lg:p-6 rounded-full group/stat hover:bg-accent hover:border-accent dark:hover:bg-white dark:hover:border-white/80 transition-all duration-500 hover:-translate-x-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] cursor-help">
                      <div className="text-right pl-2 lg:pl-4">
                        <div className="text-[7px] lg:text-[8px] font-black text-accent/70 uppercase tracking-[0.4em] mb-0.5 lg:mb-1 group-hover/stat:text-slate-900 dark:group-hover/stat:text-slate-900 transition-colors">{stat.label}</div>
                        <div className="text-xs lg:text-sm font-black text-slate-900 dark:text-white tracking-tighter group-hover/stat:text-slate-950 dark:group-hover/stat:text-slate-950 transition-colors">{stat.value}</div>
                      </div>
                      <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white/60 group-hover/stat:bg-white group-hover/stat:text-slate-950 dark:group-hover/stat:bg-white dark:group-hover/stat:text-slate-950 transition-all">
                        <stat.icon size={18} className="lg:hidden" strokeWidth={2.5} />
                        <stat.icon size={22} className="hidden lg:block" strokeWidth={2.5} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimized Floor Reflection */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-24 pointer-events-none z-0" aria-hidden>
                {/* Core Shadow */}
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60 blur-xl md:blur-2xl rounded-full scale-y-25" />
                {/* Colored Reflection */}
                <div
                  className="absolute inset-0 blur-xl md:blur-[40px] rounded-full scale-y-50 transition-opacity duration-500"
                  style={{
                    backgroundColor: activeColor.hex,
                    opacity: 0.15
                  }}
                />
              </div>
            </div>

            {/* Background branding overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] dark:opacity-[0.03]">
              <h3 className="text-[26vw] font-black text-slate-950 dark:text-white tracking-tighter leading-none uppercase italic">{activeModel.name}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar info */}
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
        /* ── Frame ── */
        .car-frame { perspective: 1400px; }

        /* ALL layers are always absolutely positioned — no layout shifts */
        .car-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          transform: translateZ(0);
          z-index: 1;
        }

        .car-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* GPU layer promotion only during active animations */
        .car-layer.is-enter,
        .car-layer.is-exit,
        .car-layer.model-enter,
        .car-layer.model-exit {
          will-change: opacity, transform;
        }

        /* COLOR TRANSITION — smooth crossfade */
        .car-layer.is-enter {
          z-index: 3;
          animation: img-reveal 350ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .car-layer.is-exit {
          z-index: 2;
          animation: img-dismiss 350ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        @keyframes img-reveal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes img-dismiss {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        /* MODEL TRANSITION — Fluid dynamic slide */
        .car-layer.model-enter {
          z-index: 3;
          animation: slide-in-right 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .car-layer.model-exit {
          z-index: 2;
          animation: slide-out-left 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translate3d(88px, 0, 0) scale(0.985); }
          to   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes slide-out-left {
          from { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
          to   { opacity: 0; transform: translate3d(-88px, 0, 0) scale(0.985); }
        }

        /* Color name slide-up */
        .color-info-enter {
          animation: slide-up-in 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes slide-up-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Swatches fade-up on model change */
        .swatches-enter {
          animation: ccs-fade-in-up 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes ccs-fade-in-up {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Stats sidebar — Disabled on mobile for performance */
        @media (min-width: 768px) {
          .stats-enter {
            animation: stats-slide-in 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
            animation-delay: 60ms;
          }
        }
        @keyframes stats-slide-in {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Active swatch pulse ring */
        .swatch-pulse-ring {
          border: 2px solid;
          animation: swatch-ring-pulse 2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes swatch-ring-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.5; }
          50%      { transform: scale(1.5); opacity: 0;   }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .car-layer.is-enter, .car-layer.is-exit,
          .car-layer.model-enter, .car-layer.model-exit,
          .color-info-enter, .swatches-enter, .stats-enter,
          .swatch-pulse-ring {
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CarColorSelector;
