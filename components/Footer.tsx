
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
    <footer id="contact" className="bg-slate-950 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-800 pt-16 pb-8 text-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <img
              src="https://geelysmgroup.com/wp-content/uploads/2025/01/Geely-white-1.png"
              alt="Geely"
              className="h-9 md:h-12 mb-6 object-contain"
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
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/sales.geely.cibubur" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.youtube.com/@GeelyAutoCibubur" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
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
                  href="https://maps.google.com/?q=SCBD+Lot+28,+Jendral+Sudirman+Kav+52-53,+Jakarta+Selatan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors leading-relaxed"
                >
                  No 2 KM 8, Jl. Alternatif Cibubur, Cileungsi, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a href="tel:+62215550192" className="hover:text-accent transition-colors">+62 831-9748-3984</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href="mailto:sales@Geelyauto.id" className="hover:text-accent transition-colors">diananistii@gmail.com</a>
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
