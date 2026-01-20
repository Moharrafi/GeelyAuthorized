
import React, { useState, useEffect, useRef } from 'react';
import { Check, ChevronRight, Zap, Shield, Target, Info, Sparkles } from 'lucide-react';

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
    id: 'starray',
    name: 'STARRAY',
    series: 'EM-i Super Hybrid',
    tagline: 'The Intelligence of Light',
    description: 'Sebuah mahakarya teknologi hybrid yang menggabungkan efisiensi tanpa batas dengan kenyamanan kelas utama.',
    colors: [
      { id: 'g1', name: 'Aurora', material: 'Satin Metallic Green', hex: '#2d4a3e', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1600' },
      { id: 'g2', name: 'Titan', material: 'Matte Gunmetal Grey', hex: '#475569', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1600' },
      { id: 'g3', name: 'Eclipse', material: 'Deep Obsidian Black', hex: '#0f172a', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1600' },
    ]
  },
  {
    id: 'electron',
    name: 'ELECTRON',
    series: 'Pure EV Platform',
    tagline: 'Silent Power Movement',
    description: 'Manifestasi masa depan otomotif dengan akselerasi instan dan nol emisi, dirancang untuk melampaui batas.',
    colors: [
      { id: 'e1', name: 'Nordic', material: 'Arctic Pearl White', hex: '#f8fafc', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600' },
      { id: 'e2', name: 'Caspian', material: 'Electric Azure Blue', hex: '#0ea5e9', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1600' },
      { id: 'e3', name: 'Carbon', material: 'Stealth Anthracite', hex: '#1e293b', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1600' },
    ]
  },
  {
    id: 'gts',
    name: 'GT-S',
    series: 'Performance Track',
    tagline: 'Sculpted by Speed',
    description: 'Ditempa di lintasan balap, disempurnakan untuk jalan raya. Performa murni yang dibalut dalam kemewahan radikal.',
    colors: [
      { id: 's1', name: 'Rosso', material: 'Vibrant Candy Red', hex: '#991b1b', image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=1600' },
      { id: 's2', name: 'Nardo', material: 'Technical Solid Grey', hex: '#64748b', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1600' },
      { id: 's3', name: 'Shadow', material: 'Midnight Jet Black', hex: '#020617', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1600' },
    ]
  }
];

const CarColorSelector: React.FC = () => {
  const [activeModel, setActiveModel] = useState(CAR_MODELS[0]);
  const [activeColor, setActiveColor] = useState(CAR_MODELS[0].colors[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldPreload, setShouldPreload] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setActiveColor(activeModel.colors[0]);
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

  const changeModel = (model: CarModel) => {
    if (model.id === activeModel.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveModel(model);
      setIsTransitioning(false);
    }, 500);
  };

  const changeColor = (color: any) => {
    if (color.id === activeColor.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveColor(color);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-center overflow-hidden py-32 px-6 transition-colors duration-1000 select-none"
    >
      
      {/* TRIPLE-LAYER ATMOSPHERIC LIGHTING */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.4] dark:opacity-[0.6] blur-[140px] transition-all duration-1000 scale-110"
          style={{ background: `radial-gradient(circle, ${activeColor.hex}, transparent 65%)` }}
        />
        <div 
          className="absolute -top-[15%] -left-[10%] w-full h-full opacity-[0.25] dark:opacity-[0.35] blur-[150px] transition-all duration-1000"
          style={{ background: `radial-gradient(circle at top left, ${activeColor.hex}, transparent 60%)` }}
        />
        <div 
          className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[150%] h-[40%] opacity-[0.5] dark:opacity-[0.7] blur-[110px] transition-all duration-1000"
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
            Personalize Your <br/> 
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
                      className={`relative w-full px-12 py-8 rounded-full text-left transition-all duration-500 overflow-hidden group border ${
                        activeModel.id === model.id 
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-[0_25px_60px_-12px_rgba(0,0,0,0.4)] scale-[1.03]' 
                          : 'bg-white/60 dark:bg-white/5 backdrop-blur-md border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/40 hover:bg-white dark:hover:bg-white/10'
                      }`}
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <div className={`text-[9px] font-black uppercase tracking-widest mb-1 ${activeModel.id === model.id ? 'opacity-60' : 'opacity-40'}`}>{model.series}</div>
                          <div className="text-2xl font-black tracking-tighter">{model.name}</div>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeModel.id === model.id ? 'bg-accent text-slate-950' : 'bg-slate-100 dark:bg-white/10'}`}>
                           <ChevronRight size={20} />
                        </div>
                      </div>
                    </button>
                  ))}
               </div>
            </div>

            {/* 2. FINISH SELECTION */}
            <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[4.5rem] p-12 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden group">
               <div 
                 className="absolute -top-10 -right-10 w-40 h-40 opacity-30 blur-3xl rounded-full transition-all duration-1000 group-hover:scale-110"
                 style={{ background: activeColor.hex }}
               />

               <div className="flex items-center gap-3 mb-10">
                  <span className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest">Exterior Finishing</span>
                  <div className="h-px flex-1 bg-slate-100 dark:bg-white/5" />
               </div>
               
               <div className="flex flex-wrap gap-6 mb-12">
                  {activeModel.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => changeColor(color)}
                      className={`relative w-16 h-16 rounded-full transition-all duration-500 transform ${
                        activeColor.id === color.id 
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

               <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                  <div className="text-slate-900 dark:text-white font-black text-3xl tracking-tighter mb-1 transition-all duration-500">{activeColor.name}</div>
                  <div className="text-[11px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest">{activeColor.material}</div>
               </div>
            </div>
          </div>

          {/* RIGHT: THE STAGE */}
          <div className="flex-1 relative w-full h-[400px] md:h-[700px] flex items-center justify-center">
            
            {/* Core Halo Glow */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] opacity-[0.5] dark:opacity-[0.7] blur-[160px] transition-all duration-1000 scale-90"
              style={{ background: `radial-gradient(circle, ${activeColor.hex}50 0%, transparent 75%)` }}
            />
            
            <div className={`relative w-full max-w-6xl transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isTransitioning ? 'opacity-0 scale-95 blur-2xl translate-y-12' : 'opacity-100 scale-100 blur-0 translate-y-0'}`}>
              
              <div className="relative group">
                {/* Image Frame - Modern High-Radius Rounded */}
                <div className="relative overflow-hidden rounded-[3rem] md:rounded-[4rem] border border-white/20 dark:border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.3)] dark:shadow-[0_60px_120px_rgba(0,0,0,0.8)]">
                  <img 
                    src={activeColor.image} 
                    alt={activeModel.name} 
                    className="w-full h-auto object-cover transition-transform duration-[4s] group-hover:scale-[1.05]"
                    loading={shouldPreload ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  {/* Internal Saturated Overlay to blend with atmospheric lighting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
                </div>

                {/* Floating Meta Stats */}
                <div className="absolute top-0 right-0 lg:-right-24 space-y-6 hidden md:block">
                   {[
                     { icon: Zap, label: 'DRIVE', value: '450KW' },
                     { icon: Shield, label: 'AEGIS', value: 'LVL 5' },
                     { icon: Target, label: 'RANGE', value: '820KM' }
                   ].map((stat, i) => (
                     <div key={i} className="flex items-center gap-6 bg-white/95 dark:bg-slate-900/90 backdrop-blur-3xl border border-white dark:border-white/10 p-6 rounded-full group/stat hover:bg-accent hover:border-accent transition-all duration-500 hover:-translate-x-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] cursor-help">
                        <div className="text-right pl-4">
                           <div className="text-[8px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.3em] mb-1 group-hover/stat:text-slate-900 transition-colors">{stat.label}</div>
                           <div className="text-sm font-black text-slate-900 dark:text-white tracking-tighter group-hover/stat:text-slate-950 transition-colors">{stat.value}</div>
                        </div>
                        <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-accent group-hover/stat:bg-white group-hover/stat:text-slate-950 transition-all">
                          <stat.icon size={22} strokeWidth={2.5} />
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              {/* Enhanced Saturated Floor Reflection */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4/5 h-20 opacity-50 dark:opacity-75 blur-[70px] rounded-full transition-all duration-1000" 
                   style={{ backgroundColor: activeColor.hex }} />
            </div>

            {/* Background Massive Branding Overlay - Penyesuaian opacity agar lebih tegas di light mode */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.1] dark:opacity-[0.05] transition-all duration-1000">
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
    </section>
  );
};

export default CarColorSelector;
