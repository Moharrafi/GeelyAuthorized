import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

interface HeroProps {
  onDiscoverClick: () => void;
  onBookingClick: () => void;
}

const FADE_MS = 1500; // crossfade duration
const INTERVAL = 5800; // auto-advance interval

const Hero: React.FC<HeroProps> = ({ onDiscoverClick, onBookingClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  // activationKeys[i] increments each time slide i becomes active → forces animation restart
  const [activationKeys, setActivationKeys] = useState<number[]>(
    HERO_SLIDES.map((_, i) => (i === 0 ? 1 : 0))
  );
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerSlideChange = useCallback((target: 'next' | 'prev' | number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    setCurrentSlide((prev) => {
      const next =
        typeof target === 'number'
          ? target
          : target === 'next'
            ? (prev + 1) % HERO_SLIDES.length
            : (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;

      setPrevSlide(prev);
      setActivationKeys((keys) => {
        const k = [...keys];
        k[next] += 1;
        return k;
      });
      return next;
    });

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPrevSlide(null);
      isAnimatingRef.current = false;
    }, FADE_MS + 100);
  }, []);

  useEffect(() => {
    const id = setInterval(() => triggerSlideChange('next'), INTERVAL);
    return () => clearInterval(id);
  }, [triggerSlideChange]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-950 light-hero-blend light-hero-dark"
    >
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        const isExiting = index === prevSlide;
        const actKey = activationKeys[index]; // changes → restarts animations
        const shouldRender = isActive || isExiting;

        // Determine animation for the slide container
        let slideAnim: string;
        if (isActive) slideAnim = `hero-fade-in  ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1) both`;
        else if (isExiting) slideAnim = `hero-fade-out ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1) both`;
        else slideAnim = 'none';

        return (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              zIndex: isActive ? 20 : isExiting ? 10 : 0,
              opacity: (!isActive && !isExiting) ? 0 : undefined,
              animation: slideAnim,
            }}
          >
            {/* ── Ken Burns image ── */}
            {/*
              Key = actKey forces the div to remount when this slide activates,
              which restarts the ken-burns animation cleanly every time.
              Only render img for active/exiting slides to save bandwidth.
            */}
            <div
              key={actKey}
              className="absolute inset-0"
              style={{
                animation:
                  actKey > 0
                    ? `hero-ken-burns 7000ms cubic-bezier(0.25,0.46,0.45,0.94) forwards`
                    : 'none',
              }}
            >
              {shouldRender && (
                <img
                  src={slide.image}
                  alt={slide.title}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding={index === 0 ? 'sync' : 'async'}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                />
              )}
            </div>

            {/* Dark overlays */}
            <div className="absolute inset-0 bg-slate-950/40 light-hero-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent light-hero-gradient" />

            {/* ── Text content — staggered rise ── */}
            <div className="container mx-auto px-6 h-full flex items-center relative z-30">
              <div className="max-w-3xl -mt-4 sm:-mt-4 md:mt-0 px-0">

                {/* Badge */}
                  {/* Badge removed as per user request */}

                {/* Heading */}
                <h1
                  key={`h1-${actKey}`}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 md:mb-6 text-white tracking-tight"
                  style={{
                    opacity: 0,
                    animation: isActive
                      ? `hero-text-rise 700ms 260ms cubic-bezier(0.4,0,0.2,1) forwards`
                      : 'none',
                  }}
                >
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p
                  key={`sub-${actKey}`}
                  className="text-base md:text-xl text-slate-200 mb-8 md:mb-10 leading-relaxed max-w-xl font-light"
                  style={{
                    opacity: 0,
                    animation: isActive
                      ? `hero-text-rise 700ms 400ms cubic-bezier(0.4,0,0.2,1) forwards`
                      : 'none',
                  }}
                >
                  {slide.subtitle}
                </p>

                {/* Buttons */}
                <div
                  key={`btns-${actKey}`}
                  className="flex flex-col sm:flex-row gap-4"
                  style={{
                    opacity: 0,
                    animation: isActive
                      ? `hero-text-rise 700ms 530ms cubic-bezier(0.4,0,0.2,1) forwards`
                      : 'none',
                  }}
                >
                  <button
                    onClick={slide.ctaTarget === 'booking' ? onBookingClick : onDiscoverClick}
                    className="px-10 py-4 bg-white text-slate-950 font-bold text-sm uppercase tracking-widest hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2 group rounded-full"
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFilmOpen(true)}
                    className="px-10 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-colors duration-300 rounded-full text-center"
                  >
                    Watch Film
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom fade bands */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-slate-950 light-hero-dark z-25" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent light-hero-gradient z-20" />

      {/* Film Modal */}
      {isFilmOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <button
            type="button"
            onClick={() => setIsFilmOpen(false)}
            className="absolute inset-0 cursor-default"
            aria-label="Close film modal"
          />
          <div className="relative z-10 w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] bg-black">
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={() => setIsFilmOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close"
              >✕</button>
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
      )}

      {/* Navigation arrows — hidden as per user request */}
      <div className="absolute bottom-14 md:bottom-10 right-6 md:right-20 z-30 hidden items-center gap-2">
        <button
          onClick={() => triggerSlideChange('prev')}
          aria-label="Previous slide"
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all duration-300 active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => triggerSlideChange('next')}
          aria-label="Next slide"
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all duration-300 active:scale-95"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot indicators — centered and dimmed further */}
      <div className="absolute bottom-14 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 opacity-40">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => triggerSlideChange(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ease-out ${idx === currentSlide
                ? 'w-10 bg-accent'
                : 'w-4 bg-white/40 hover:bg-white/60'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
