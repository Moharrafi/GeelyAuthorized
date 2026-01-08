import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

interface HeroProps {
  onDiscoverClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDiscoverClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Dipercepat dari 6000ms ke 4000ms
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 700); // Sesuai dengan durasi transisi
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-950">
      
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
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
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-slate-950/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          </div>

          {/* Text Content */}
          <div className="container mx-auto px-6 h-full flex items-center relative z-20">
            <div className={`max-w-3xl transition-all duration-700 transform ${
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
                <button className="px-10 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-colors duration-300 rounded-full">
                  Watch Film
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-6 md:right-20 z-30 flex items-center gap-6">
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
      <div className="absolute bottom-10 left-6 md:left-20 z-30 flex items-center gap-3">
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