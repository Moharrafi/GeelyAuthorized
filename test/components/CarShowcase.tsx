
import React, { useState, useMemo, useRef, useEffect } from 'react';
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

  const categories = ['SUV', 'Sedan', 'EV', 'Sport'];

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

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress || 0);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -clientWidth : clientWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [filteredAndSortedCars]);

  return (
    <section id="models" className="pt-20 pb-12 md:pt-32 md:pb-16 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-20 md:top-40 left-0 text-[10rem] md:text-[15rem] font-black text-slate-100 dark:text-white/[0.02] select-none pointer-events-none whitespace-nowrap leading-none uppercase transition-colors">
        Masterpiece • 2025
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-accent text-[10px] md:text-sm font-bold tracking-[0.4em] uppercase mb-2 md:mb-4 block">Our Legacy</span>
            <h2 className="text-3xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter leading-none transition-colors">
              Explore The <br/> <span className="text-slate-300 dark:text-slate-500">New Collection</span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full lg:w-auto items-start sm:items-center">
            {/* Category Filters */}
            <div className="w-full sm:w-auto overflow-visible relative">
              <div className="overflow-x-auto no-scrollbar py-2">
                <div className="inline-flex items-center bg-slate-100 dark:bg-slate-900/60 p-1.5 md:p-2 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-lg transition-colors min-w-max">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest transition-all duration-500 ease-out whitespace-nowrap ${
                      selectedCategory === null
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xl scale-[1.02]'
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                    }`}
                  >
                    ALL MODELS
                  </button>
                  <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-3 shrink-0"></div>
                  <div className="flex items-center gap-1 pr-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest transition-all duration-500 ease-out whitespace-nowrap ${
                          selectedCategory === cat
                            ? 'bg-accent text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.5)] scale-[1.02]'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
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
                className="w-full appearance-none bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-full pl-12 pr-12 py-4 outline-none focus:border-accent transition-all cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 shadow-lg"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="acceleration">Fastest Accel</option>
                <option value="speed">Top Speed</option>
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400">
                 <SlidersHorizontal size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Focused Carousel Container */}
        <div className="relative group/carousel">
          
          {/* Track Controls */}
          <div className="hidden lg:flex absolute inset-y-0 -left-20 -right-20 items-center justify-between pointer-events-none z-30">
             <button 
               onClick={() => scroll('left')}
               className={`w-16 h-16 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-accent hover:text-slate-950 transition-all active:scale-90 bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl pointer-events-auto shadow-xl ${scrollProgress <= 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
               disabled={scrollProgress <= 1}
             >
               <ChevronLeft size={32} />
             </button>
             <button 
               onClick={() => scroll('right')}
               className={`w-16 h-16 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-accent hover:text-slate-950 transition-all active:scale-90 bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl pointer-events-auto shadow-xl ${scrollProgress >= 99 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
               disabled={scrollProgress >= 99}
             >
               <ChevronRight size={32} />
             </button>
          </div>

          {/* Single Item Track */}
          <div 
            ref={scrollRef}
            className={`flex overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-6 px-6 md:px-0 scroll-pl-10 scroll-pr-10 transition-all duration-500 ease-in-out ${
              isChanging ? 'opacity-0 translate-y-4 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {filteredAndSortedCars.length > 0 ? (
              filteredAndSortedCars.map((car) => (
                <div 
                  key={car.id} 
                  className="flex-shrink-0 w-[85vw] md:w-full snap-center px-3 md:px-4"
                >
                  <div 
                    onClick={() => setSelectedCar(car)}
                    className="relative w-full bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 group/card cursor-pointer flex flex-col lg:flex-row shadow-2xl transition-colors"
                  >
                    {/* Image Area - Clean Edges */}
                    <div className="w-full lg:w-[60%] relative overflow-hidden h-[320px] sm:h-[400px] lg:h-[600px] bg-slate-200 dark:bg-slate-800">
                        <div className={`absolute inset-0 bg-slate-200 dark:bg-slate-800 transition-opacity duration-700 z-10 ${loadedImages[car.id] ? 'opacity-0' : 'opacity-100'}`} />
                        <img
                          src={car.image}
                          alt={car.name}
                          loading="lazy"
                          onLoad={() => handleImageLoad(car.id)}
                          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white/90 dark:from-slate-950/80 via-transparent to-transparent transition-colors"></div>
                        
                        <div className="absolute top-6 left-6 md:top-10 md:left-10">
                            <span className="px-4 md:px-6 py-2 bg-accent text-slate-950 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-xl">
                              {car.category} Collection
                            </span>
                        </div>
                    </div>

                    {/* Details Area */}
                    <div className="w-full lg:w-[40%] p-10 md:p-16 flex flex-col justify-center">
                        <div className="mb-2">
                           <span className="text-accent text-[9px] md:text-[10px] font-black uppercase tracking-widest">{car.tagline}</span>
                        </div>
                        <h3 className="text-3xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 md:mb-6 tracking-tighter leading-none transition-colors">{car.name}</h3>
                        
                        <div className="grid grid-cols-3 lg:flex lg:flex-col gap-6 md:gap-8 mb-10 md:mb-12">
                            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-3 lg:gap-6 text-center lg:text-left">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-accent shadow-inner border border-slate-100 dark:border-slate-700">
                                    <Gauge size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] md:text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-0.5">Accel</span>
                                    <span className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white transition-colors">{car.specs.acceleration}</span>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-3 lg:gap-6 text-center lg:text-left">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-accent shadow-inner border border-slate-100 dark:border-slate-700">
                                    <Zap size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] md:text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-0.5">Power</span>
                                    <span className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white transition-colors">{car.specs.power}</span>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-3 lg:gap-6 text-center lg:text-left">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-accent shadow-inner border border-slate-100 dark:border-slate-700">
                                    <Wind size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] md:text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-0.5">Speed</span>
                                    <span className="text-sm md:text-2xl font-bold text-slate-900 dark:text-white transition-colors">{car.specs.topSpeed}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-8 transition-colors">
                            <div>
                                <div className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Starting Price</div>
                                <div className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tighter transition-colors">{car.price}</div>
                            </div>
                            <button className="w-12 h-12 md:w-16 md:h-16 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-slate-950 shadow-2xl hover:bg-accent transition-all duration-300 group/btn">
                              <ArrowRight size={22} className="md:w-7 md:h-7 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full py-40 md:py-60 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                    <SlidersHorizontal size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">No Matching Models</h3>
                <p className="text-slate-400 dark:text-slate-500 text-sm">Please refine your search criteria or reset filters.</p>
                <button 
                  onClick={() => handleCategoryChange(null)}
                  className="mt-6 text-accent font-black text-[9px] md:text-[10px] uppercase tracking-widest border-b border-accent/30 pb-1"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Premium Navigation Dots & Progress */}
          {filteredAndSortedCars.length > 1 && (
            <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
                {/* Dots Navigation */}
                <div className="flex items-center gap-3">
                    {filteredAndSortedCars.map((_, idx) => {
                        const activeIndex = Math.round((scrollProgress / 100) * (filteredAndSortedCars.length - 1));
                        const isActive = activeIndex === idx;
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (scrollRef.current) {
                                        scrollRef.current.scrollTo({
                                            left: idx * (scrollRef.current.scrollWidth / filteredAndSortedCars.length),
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                className={`h-1.5 transition-all duration-500 rounded-full ${
                                    isActive ? 'w-12 bg-accent shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'w-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
                                }`}
                            />
                        );
                    })}
                </div>

                {/* Progress Bar & Counter */}
                <div className="flex items-center gap-6 flex-1 w-full md:w-auto">
                    <span className="text-[9px] md:text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest whitespace-nowrap transition-colors">Discovery Mode</span>
                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-900 relative transition-colors">
                        <div 
                            className="absolute inset-y-0 left-0 bg-accent transition-all duration-300 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                            style={{ width: `${scrollProgress}%`, height: '2px', top: '-0.5px' }}
                        />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest whitespace-nowrap transition-colors">Model {Math.min(filteredAndSortedCars.length, Math.max(1, Math.round((scrollProgress / 100) * (filteredAndSortedCars.length - 1)) + 1))} of {filteredAndSortedCars.length}</span>
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
