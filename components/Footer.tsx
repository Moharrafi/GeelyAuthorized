
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'about', sectionId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {

  const handleLinkClick = (e: React.MouseEvent, view: 'home' | 'about', sectionId?: string) => {
    e.preventDefault();
    onNavigate(view, sectionId);
  };

  return (
    <footer id="contact" className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 text-slate-700 dark:text-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-12 mb-12">

          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="https://geelyauto.id/themes/custom/geely/images/logos/logo-geely.svg"
              alt="Geely Auto"
              className="h-4 md:h-4 mb-6 object-contain invert-0 dark:invert"
              loading="lazy"
            />
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Redefining the automotive industry with sustainable luxury and artificial intelligence. Join the revolution today.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/geely_smcibubur/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-colors hover:text-[#E4405F] hover:border-[#E4405F] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-[#E4405F] dark:hover:border-[#E4405F]"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/sales.geely.cibubur"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-colors hover:text-[#1877F2] hover:border-[#1877F2] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-[#1877F2] dark:hover:border-[#1877F2]"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/@GeelyAutoCibubur"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-colors hover:text-[#FF0000] hover:border-[#FF0000] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-[#FF0000] dark:hover:border-[#FF0000]"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@geely_smcibubur"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-colors hover:text-[#FE2C55] hover:border-[#FE2C55] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-[#FE2C55] dark:hover:border-[#FE2C55]"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Our Models</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#models" onClick={(e) => handleLinkClick(e, 'home', 'models')} className="hover:text-accent transition-colors">Geely EX-2</a></li>
              <li><a href="#models" onClick={(e) => handleLinkClick(e, 'home', 'models')} className="hover:text-accent transition-colors">Geely EX-5</a></li>
              <li><a href="#models" onClick={(e) => handleLinkClick(e, 'home', 'models')} className="hover:text-accent transition-colors">Geely Starray EM-i</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-accent transition-colors">Profile Sales (Dayana)</a></li>
              <li><a href="#technology" onClick={(e) => handleLinkClick(e, 'home', 'technology')} className="hover:text-accent transition-colors">Sustainability</a></li>
              <li><a href="mailto:careers@Geelyauto.id" className="hover:text-accent transition-colors">Career Opportunities</a></li>
              <li><a href="#news" onClick={(e) => handleLinkClick(e, 'home', 'news')} className="hover:text-accent transition-colors">News & Events</a></li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/FZWs2EdhpdjvJMkRA "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors leading-relaxed"
                >
                  Geely SM Group Cibubur, Jl. Alternatif Cibubur No.2 KM, Cileungsi, Bogor Regency, West Java 16820
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a href="tel:+6283197483984" className="hover:text-accent transition-colors">+62 831-9748-3984</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href="mailto:diananistii@gmail.com" className="hover:text-accent transition-colors">diananistii@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} Geely Indonesia. Redefining Automotive Excellence.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
