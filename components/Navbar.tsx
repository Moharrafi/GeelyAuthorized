
import React, { useState, useEffect } from 'react';
import { Menu, X, CarFront, Sun, Moon } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onTestDriveClick: () => void;
  onNavigate: (view: 'home' | 'about', sectionId?: string) => void;
  currentView: 'home' | 'about';
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onTestDriveClick, onNavigate, currentView, theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === '#about') {
      onNavigate('about');
    } else if (href.startsWith('#')) {
      const sectionId = href.replace('#', '');
      onNavigate('home', sectionId);
    }
    setIsMobileMenuOpen(false);
  };

  const navBgClass = isScrolled || isMobileMenuOpen || currentView === 'about'
    ? (theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200')
    : 'bg-transparent border-transparent';

  const textClass = theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b backdrop-blur-xl ${navBgClass} ${isScrolled ? 'py-3' : 'py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" onClick={(e) => handleLinkClick(e, '#hero')} className="flex items-center gap-2 group">
            <img
              src="https://geelysmgroup.com/wp-content/uploads/2025/01/Geely-white-1.png"
              alt="Logo"
              className="h-9 md:h-12 w-auto object-contain"
            />
          {/* <span className={`text-2xl font-bold tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            GEELY
          </span> */}
        </a>
        {/* <span className="text-accent">AUTO</span> */}
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-xs font-bold transition-colors uppercase tracking-[0.15em] relative group py-2 ${currentView === 'about' && link.href === '#about'
                  ? 'text-accent'
                  : textClass
                }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent transition-all duration-300 ${currentView === 'about' && link.href === '#about' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </a>
          ))}

          <div className="flex items-center gap-4 ml-4">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 border ${theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-accent hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200'
                }`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={onTestDriveClick}
              className={`flex items-center gap-2 px-6 py-2.5 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-lg ${theme === 'dark'
                  ? 'bg-white text-slate-950 hover:bg-accent'
                  : 'bg-slate-900 text-white hover:bg-accent hover:text-slate-950 shadow-slate-900/10'
                }`}
            >
              Test Drive
            </button>
          </div>
        </div>

        {/* Mobile Toggle & Mobile Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full border ${theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-accent'
                : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className={`transition-colors p-2 ${theme === 'dark' ? 'text-white hover:text-accent' : 'text-slate-900 hover:text-accent'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 overflow-hidden border-b ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          } ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col p-8 gap-6 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-lg font-medium hover:text-accent transition-colors ${currentView === 'about' && link.href === '#about'
                  ? 'text-accent'
                  : (theme === 'dark' ? 'text-slate-300' : 'text-slate-600')
                }`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              onTestDriveClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-4 bg-accent text-slate-950 font-bold uppercase tracking-wide rounded-full mt-4"
          >
            Book Test Drive
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
