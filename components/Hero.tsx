import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

interface HeroProps {
  onDiscoverClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDiscoverClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const isAnimatingRef = useRef(false);

  const triggerSlideChange = useCallback((direction: 'next' | 'prev') => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setCurrentSlide((prev) => (
      direction === 'next'
        ? (prev + 1) % HERO_SLIDES.length
        : (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    ));
    setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 700); // Sesuai dengan durasi transisi
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      triggerSlideChange('next');
    }, 4500);
    return () => clearInterval(interval);
  }, [triggerSlideChange]);

  const handleNext = () => {
    triggerSlideChange('next');
  };

  const handlePrev = () => {
    triggerSlideChange('prev');
  };

  const handleOpenFilm = () => setIsFilmOpen(true);
  const handleCloseFilm = () => setIsFilmOpen(false);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-950 light-hero-blend light-hero-dark">
      
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-slate-950 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'low'}
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-slate-950/40 light-hero-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent light-hero-gradient"></div>
          </div>

          {/* Text Content */}
          <div className="container mx-auto px-6 h-full flex items-center relative z-30">
            <div className={`max-w-3xl -mt-6 sm:-mt-4 md:mt-0 transition-all duration-700 transform ${
              index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
              <div className="inline-block px-4 py-1.5 mb-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-md">
                <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">
                  Geely
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-white tracking-tight">
                {slide.title}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-xl font-light">
                {slide.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onDiscoverClick}
                  className="px-10 py-4 bg-white text-slate-950 font-bold text-sm uppercase tracking-widest hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2 group rounded-full"
                >
                  {slide.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={handleOpenFilm}
                  className="px-10 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-colors duration-300 rounded-full text-center"
                >
                  Watch Film
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-slate-950 light-hero-dark z-25" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent light-hero-gradient z-20" />

      {isFilmOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <button
            type="button"
            onClick={handleCloseFilm}
            className="absolute inset-0 cursor-default"
            aria-label="Close film modal"
          />
          <div className="relative z-10 w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] bg-black">
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={handleCloseFilm}
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="relative w-full pb-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/Vsp4Ir6FTQo?autoplay=1&playsinline=1"
                title="Geely Watch Film"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* Navigation Controls */}
      <div className="absolute bottom-14 md:bottom-10 right-6 md:right-20 z-30 hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2">
           <button 
             onClick={handlePrev}
             className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all active:scale-95"
           >
             <ChevronLeft size={20} />
           </button>
           <button 
             onClick={handleNext}
             className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all active:scale-95"
           >
             <ChevronRight size={20} />
           </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-14 md:bottom-10 left-6 md:left-20 z-30 flex items-center gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              idx === currentSlide ? 'w-12 bg-accent' : 'w-6 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
