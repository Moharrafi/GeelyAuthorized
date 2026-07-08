
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { CARS } from '../constants';
import { Car } from '../types';
import { Gauge, Zap, ArrowRight, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Wind } from 'lucide-react';
import CarDetailModal from './CarDetailModal';

interface CarShowcaseProps {
  onTestDriveClick: () => void;
}

const CarShowcase: React.FC<CarShowcaseProps> = ({ onTestDriveClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isChanging, setIsChanging] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const categories = ['SUV', 'PHEV'];

  const handleCategoryChange = (category: string | null) => {
    if (selectedCategory === category) return;

    setIsChanging(true);
    setTimeout(() => {
      setSelectedCategory(category);
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
      }
      setTimeout(() => setIsChanging(false), 50);
    }, 300);
  };

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const filteredAndSortedCars = useMemo(() => {
    let result = [...CARS];
    if (selectedCategory) {
      result = result.filter(car => car.category === selectedCategory);
    }

    const getPrice = (p: string) => parseInt(p.replace(/[^0-9]/g, ''));
    const getAccel = (a: string) => parseFloat(a.replace('s', ''));
    const getSpeed = (s: string) => parseInt(s.replace(/[^0-9]/g, ''));

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return getPrice(a.price) - getPrice(b.price);
        case 'price_desc': return getPrice(b.price) - getPrice(a.price);
        case 'acceleration': return getAccel(a.specs.acceleration) - getAccel(b.specs.acceleration);
        case 'speed': return getSpeed(b.specs.topSpeed) - getSpeed(a.specs.topSpeed);
        default: return 0;
      }
    });

    return result;
  }, [selectedCategory, sortBy]);

  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        setScrollProgress(progress || 0);
      }
      rafRef.current = null;
    });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const { clientWidth, scrollLeft, scrollWidth } = scrollRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;
    const edgeThreshold = 5;

    if (direction === 'right') {
      if (scrollLeft >= maxScrollLeft - edgeThreshold) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
      return;
    }

    if (scrollLeft <= edgeThreshold) {
      scrollRef.current.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      return;
    }
    scrollRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        el.removeEventListener('scroll', handleScroll);
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [filteredAndSortedCars, handleScroll]);

  return (
    <section id="models" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-slate-950 premium-light-surface light-seam-overlap relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-20 md:top-40 left-0 text-[10rem] md:text-[15rem] font-black text-white/[0.02] light-wordmark select-none pointer-events-none whitespace-nowrap leading-none uppercase">
        Masterpiece • {new Date().getFullYear()}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-xl">
            <span className="text-accent text-[10px] md:text-sm font-bold tracking-[0.4em] uppercase mb-2 md:mb-4 block">Our Legacy</span>
            <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-none">
              Explore The <span className="text-slate-500">New Collection</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full lg:w-auto items-start sm:items-center">
            {/* Category Filters */}
            <div className="w-full sm:w-auto overflow-visible relative">
              <div className="overflow-x-auto no-scrollbar py-2">
                <div className="inline-flex items-center bg-slate-900/60 p-1.5 md:p-2 rounded-full backdrop-blur-md shadow-[0_12px_30px_-12px_rgba(15,23,42,0.28),0_2px_8px_-2px_rgba(15,23,42,0.18)] min-w-max">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`px-5 py-3 md:px-6 md:py-2.5 rounded-full text-[11px] md:text-[10px] font-black tracking-widest transition-all duration-500 ease-out whitespace-nowrap min-h-[44px] md:min-h-0 ${selectedCategory === null
                      ? 'bg-white text-slate-950 shadow-[0_10px_20px_-10px_rgba(15,23,42,0.30),0_2px_6px_-2px_rgba(15,23,42,0.18)] scale-[1.02]'
                      : 'text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    ALL MODELS
                  </button>
                  <div className="w-px h-4 bg-slate-800 mx-2 md:mx-3 shrink-0"></div>
                  <div className="flex items-center gap-1 pr-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-5 py-3 md:px-6 md:py-2.5 rounded-full text-[11px] md:text-[10px] font-black tracking-widest transition-all duration-500 ease-out whitespace-nowrap min-h-[44px] md:min-h-0 ${selectedCategory === cat
                          ? 'bg-accent text-slate-950 shadow-[0_10px_20px_-10px_rgba(15,23,42,0.30),0_2px_6px_-2px_rgba(15,23,42,0.18)] scale-[1.02]'
                          : 'text-slate-400 hover:text-slate-200'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative group w-full sm:min-w-[200px]">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-accent">
                <ArrowUpDown size={14} />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort models by"
                className="w-full appearance-none bg-slate-900/60 border border-slate-800 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-full pl-12 pr-12 py-4 outline-none focus:border-accent transition-all cursor-pointer hover:bg-slate-800 shadow-xl"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="acceleration">Fastest Accel</option>
                <option value="speed">Top Speed</option>
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-500">
                <SlidersHorizontal size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Focused Carousel Container */}
        <div className="relative group/carousel">

          {/* Track Controls — hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 px-6 md:px-0 -ml-20 -mr-20 items-center justify-between pointer-events-none z-30">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll to previous model"
              className="w-16 h-16 rounded-full border border-slate-800 flex items-center justify-center text-white hover:bg-accent hover:text-slate-950 transition-all active:scale-90 bg-slate-950/50 backdrop-blur-xl pointer-events-auto"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll to next model"
              className="w-16 h-16 rounded-full border border-slate-800 flex items-center justify-center text-white hover:bg-accent hover:text-slate-950 transition-all active:scale-90 bg-slate-950/50 backdrop-blur-xl pointer-events-auto"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Single Item Track */}
          <div
            ref={scrollRef}
            className={`flex overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 md:px-0 scroll-px-6 transition-all duration-500 ease-in-out ${isChanging ? 'opacity-0 translate-y-4 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'
              }`}
          >
            {filteredAndSortedCars.length > 0 ? (
              filteredAndSortedCars.map((car) => (
                <div
                  key={car.id}
                  className="flex-shrink-0 w-full snap-center px-4 md:px-4"
                >
                  {/* <div className="w-full p-2 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_24px_70px_rgba(15,23,42,0.08),0_8px_20px_rgba(15,23,42,0.04)] dark:shadow-2xl"> */}
                  <div
                    onClick={() => setSelectedCar(car)}
                    className="relative w-full bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-slate-800/80 hover:border-slate-700/80 transition-all duration-500 group/card cursor-pointer flex flex-col lg:flex-row contain-content shadow-2xl shadow-black/40"
                  >
                    {/* Image Area */}
                    <div className="w-full lg:w-[60%] relative overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[600px] bg-slate-800">
                      <div className={`absolute inset-0 bg-slate-800 transition-opacity duration-700 z-10 ${loadedImages[car.id] ? 'opacity-0' : 'opacity-100'}`} />
                      <img
                        src={car.image}
                        alt={car.name}
                        width={1200}
                        height={750}
                        sizes="(max-width: 768px) 100vw, 60vw"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        onLoad={() => handleImageLoad(car.id)}
                        className="block w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover/card:scale-110"
                      />
                      {/* Unified blending gradient separator */}
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/90 via-slate-900/20 to-transparent lg:from-transparent lg:via-slate-900/10 lg:to-slate-900 z-20"></div>

                      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-25">
                        <span className="px-3.5 py-1.5 bg-accent text-slate-950 text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em] rounded-full shadow-xl">
                          {car.category} Collection
                        </span>
                      </div>
                    </div>

                    {/* Details Area */}
                    <div className="w-full lg:w-[40%] p-6 md:p-10 lg:p-14 flex flex-col justify-center bg-slate-950/20 lg:bg-slate-950/10 relative z-30">
                      {/* Tagline Pill */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-accent/10 border border-accent/25 text-accent text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] rounded-full">
                          {car.tagline}
                        </span>
                      </div>
                      
                      {/* Car Name */}
                      <h3 className="font-bold text-white mb-6 md:mb-8 tracking-tighter leading-none text-2xl md:text-[2.75rem] group-hover/card:text-accent transition-colors duration-300">
                        {car.name}
                      </h3>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
                        <div className="flex flex-col items-center p-3 bg-slate-950/60 border border-slate-800/60 rounded-2xl hover:bg-slate-950/90 hover:border-slate-700/60 transition-all duration-300 shadow-md">
                          <div className="w-8 h-8 rounded-xl bg-slate-900/80 border border-slate-800/60 flex items-center justify-center text-accent mb-2">
                            <Gauge size={16} />
                          </div>
                          <span className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Accel</span>
                          <span className="text-xs md:text-sm font-bold text-white">{car.specs.acceleration}</span>
                        </div>

                        <div className="flex flex-col items-center p-3 bg-slate-950/60 border border-slate-800/60 rounded-2xl hover:bg-slate-950/90 hover:border-slate-700/60 transition-all duration-300 shadow-md">
                          <div className="w-8 h-8 rounded-xl bg-slate-900/80 border border-slate-800/60 flex items-center justify-center text-accent mb-2">
                            <Zap size={16} />
                          </div>
                          <span className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Power</span>
                          <span className="text-xs md:text-sm font-bold text-white truncate max-w-full">{car.specs.power.split('/')[0]}</span>
                        </div>

                        <div className="flex flex-col items-center p-3 bg-slate-950/60 border border-slate-800/60 rounded-2xl hover:bg-slate-950/90 hover:border-slate-700/60 transition-all duration-300 shadow-md">
                          <div className="w-8 h-8 rounded-xl bg-slate-900/80 border border-slate-800/60 flex items-center justify-center text-accent mb-2">
                            <Wind size={16} />
                          </div>
                          <span className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Speed</span>
                          <span className="text-xs md:text-sm font-bold text-white">{car.specs.topSpeed}</span>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="relative flex items-center justify-between border-t border-slate-800/85 pt-6 md:pt-8">
                        <div className="flex flex-col gap-1">
                          <div className="text-[8px] md:text-[9px] text-slate-500 font-bold uppercase tracking-widest">Harga OTR Jakarta</div>
                          <div className="flex flex-wrap items-center gap-3 mt-1.5">
                            {car.pricePro && car.priceMax ? (
                              <>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[7.5px] font-black text-slate-400 bg-slate-800/80 border border-slate-700/40 px-1.5 py-0.5 rounded uppercase tracking-wider">Pro</span>
                                  <span className="text-sm md:text-lg lg:text-xl font-bold text-white tracking-tight">{car.pricePro}</span>
                                </div>
                                <div className="w-px h-3.5 bg-slate-800" />
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[7.5px] font-black text-accent bg-accent/15 border border-accent/25 px-1.5 py-0.5 rounded uppercase tracking-wider">Max</span>
                                  <span className="text-sm md:text-lg lg:text-xl font-bold text-white tracking-tight">{car.priceMax}</span>
                                </div>
                              </>
                            ) : (
                              <span className="text-base md:text-xl lg:text-2xl font-bold text-white tracking-tighter">{car.price}</span>
                            )}
                          </div>
                        </div>

                        <button 
                          aria-label="View car details" 
                          className="w-10 h-10 md:w-12 md:h-12 bg-white text-slate-950 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95 group/btn ml-4 shrink-0"
                        >
                          <ArrowRight size={18} className="md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              ))
            ) : (
              <div className="w-full py-40 md:py-60 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
                  <SlidersHorizontal size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">No Matching Models</h3>
                <p className="text-slate-500 text-sm">Please refine your search criteria or reset filters.</p>
                <button
                  onClick={() => handleCategoryChange(null)}
                  className="mt-6 text-accent font-black text-[9px] md:text-[10px] uppercase tracking-widest border-b border-accent/30 pb-1"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Premium Navigation Dots & Progress — visible on all devices */}
          {filteredAndSortedCars.length > 1 && (
            <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 max-w-4xl mx-auto px-4 md:px-0">
              {/* Dots Navigation */}
              <div className="flex items-center gap-3">
                {filteredAndSortedCars.map((_, idx) => {
                  const activeIndex = Math.round((scrollProgress / 100) * (filteredAndSortedCars.length - 1));
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={idx}
                      aria-label={`Go to model ${idx + 1}`}
                      onClick={() => {
                        if (scrollRef.current) {
                          scrollRef.current.scrollTo({
                            left: idx * (scrollRef.current.scrollWidth / filteredAndSortedCars.length),
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className={`h-1.5 transition-all duration-500 rounded-full ${isActive ? 'w-12 bg-accent shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'w-4 bg-slate-800 hover:bg-slate-700'
                        }`}
                    />
                  );
                })}
              </div>

              {/* Progress Bar & Counter */}
              <div className="flex items-center gap-4 md:gap-6 flex-1 w-full md:w-auto">
                <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Discovery Mode</span>
                <div className="flex-1 h-px bg-slate-900 relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-accent transition-all duration-300 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                    style={{ width: `${scrollProgress}%`, height: '2px', top: '-0.5px' }}
                  />
                </div>
                <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Model {Math.min(filteredAndSortedCars.length, Math.max(1, Math.round((scrollProgress / 100) * (filteredAndSortedCars.length - 1)) + 1))} of {filteredAndSortedCars.length}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <CarDetailModal
        car={selectedCar}
        isOpen={!!selectedCar}
        onClose={() => setSelectedCar(null)}
        onTestDriveClick={onTestDriveClick}
      />
    </section>
  );
};

export default CarShowcase;

