
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onTestDriveClick: () => void;
  onNavigate: (view: 'home' | 'about' | 'specifications', sectionId?: string) => void;
  currentView: 'home' | 'about' | 'specifications';
  theme: 'dark' | 'light';
}

const Navbar: React.FC<NavbarProps> = ({ onTestDriveClick, onNavigate, currentView, theme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ticking = useRef(false);
  const lastScrolled = useRef(false);

  const updateScroll = useCallback(() => {
    const scrolled = window.scrollY > 20;
    if (scrolled !== lastScrolled.current) {
      lastScrolled.current = scrolled;
      setIsScrolled(scrolled);
    }
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateScroll);
      }
    };
    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScroll]);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === '#about') {
      onNavigate('about');
    } else if (href === '#specifications') {
      onNavigate('specifications');
    } else if (href.startsWith('#')) {
      const sectionId = href.replace('#', '');
      onNavigate('home', sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  const isLightHero = theme === 'light' && !isScrolled && !isMobileMenuOpen && currentView === 'home';

  const navBgClass = isScrolled || isMobileMenuOpen || currentView === 'about' || currentView === 'specifications'
    ? (theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200')
    : 'bg-transparent border-transparent';

  const textClass = theme === 'dark'
    ? 'text-slate-300 hover:text-white'
    : (isLightHero
      ? 'nav-link-hero drop-shadow-[0_1px_2px_rgba(15,23,42,0.6)]'
      : (isScrolled || isMobileMenuOpen || currentView === 'about' || currentView === 'specifications'
        ? 'text-slate-700 hover:text-slate-950'
        : 'text-slate-700/90 hover:text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.35)]'));

  const logoClass = theme === 'dark'
    ? 'invert'
    : (isLightHero ? 'invert' : 'invert-0');

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b backdrop-blur-xl ${navBgClass} ${isScrolled ? 'py-3' : 'py-6'} ${isLightHero ? 'light-hero-nav' : ''}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" onClick={(e) => handleLinkClick(e, '#hero')} className="flex items-center gap-2 group">
          <img
            src="/img/logo-secondary.svg"
            alt="Geely Auto"
            width={120}
            height={11}
            className={`h-3 md:h-4 w-auto object-contain ${logoClass}`}
            loading="eager"
            fetchPriority="high"
          />
        </a>
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`nav-link text-xs font-semibold transition-colors uppercase tracking-[0.15em] relative group py-2 ${(currentView === 'about' && link.href === '#about') || (currentView === 'specifications' && link.href === '#specifications')
                ? 'text-accent'
                : textClass
                }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent transition-all duration-300 ${(currentView === 'about' && link.href === '#about') || (currentView === 'specifications' && link.href === '#specifications')
                ? 'w-full'
                : 'w-0 group-hover:w-full'
                }`}></span>
            </a>
          ))}

          <div className="flex items-center gap-4 ml-4">
            <button
              onClick={onTestDriveClick}
              className={`flex items-center gap-2 px-6 py-2.5 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${theme === 'dark'
                ? 'bg-white text-slate-950 hover:bg-accent hover:text-slate-950 hover:shadow-accent/10'
                : 'nav-cta text-white border border-slate-900/10 shadow-slate-900/10'
                }`}
            >
              Test Drive
            </button>
          </div>
        </div>

        {/* Mobile Toggle & Mobile Theme Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            aria-label="Toggle menu"
            className={`transition-colors p-2 ${theme === 'dark' ? 'text-white hover:text-accent' : 'text-slate-900 hover:text-accent'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full transition-all duration-500 overflow-hidden border-b ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        } ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col w-full max-w-sm mx-auto p-8 gap-4">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              className={`group w-full flex items-center justify-between py-3.5 text-xs font-bold uppercase tracking-[0.2em] border-b transition-all duration-300 ${
                theme === 'dark'
                  ? 'border-slate-800/40 text-slate-300 hover:text-white'
                  : 'border-slate-100 text-slate-600 hover:text-slate-950'
              } ${(currentView === 'about' && link.href === '#about') || (currentView === 'specifications' && link.href === '#specifications')
                ? 'text-accent border-accent/20'
                : ''
              }`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              <span className="flex items-center gap-3">
                <span className="text-[9px] text-accent font-mono opacity-80">0{idx + 1}</span>
                {link.name}
              </span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent" />
            </a>
          ))}
          <button
            onClick={() => {
              onTestDriveClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-3.5 bg-accent hover:bg-accent/90 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 mt-6 shadow-lg shadow-accent/15 active:scale-98"
          >
            Book Test Drive
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
