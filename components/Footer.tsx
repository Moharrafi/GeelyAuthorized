
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Geely_Auto_2023.svg/2560px-Geely_Auto_2023.svg.png"
              alt="Geely Auto"
              className="h-9 md:h-12 mb-6 object-contain invert-0 dark:invert"
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
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/500px-Instagram_icon.png"
                  alt="Instagram"
                  className="h-5 w-5 object-contain"
                  width="20"
                  height="20"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a 
                href="https://www.facebook.com/sales.geely.cibubur" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-colors hover:text-[#1877F2] hover:border-[#1877F2] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-[#1877F2] dark:hover:border-[#1877F2]"
                aria-label="Facebook"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/500px-Facebook_f_logo_%282019%29.svg.png"
                  alt="Facebook"
                  className="h-5 w-5 object-contain"
                  width="20"
                  height="20"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a 
                href="https://www.youtube.com/@GeelyAutoCibubur" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-colors hover:text-[#FF0000] hover:border-[#FF0000] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-[#FF0000] dark:hover:border-[#FF0000]"
                aria-label="YouTube"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
                  alt="YouTube"
                  className="h-5 w-5 object-contain"
                  width="20"
                  height="20"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a 
                href="https://www.tiktok.com/@geely_smcibubur" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-colors hover:text-[#FE2C55] hover:border-[#FE2C55] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-[#FE2C55] dark:hover:border-[#FE2C55]"
                aria-label="TikTok"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338432_960_720.png"
                  alt="TikTok"
                  className="h-5 w-5 object-contain"
                  width="20"
                  height="20"
                  loading="lazy"
                  decoding="async"
                />
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

          <div>
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
          <p>&copy; 2025 Geely Indonesia. Redefining Automotive Excellence.</p>
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
