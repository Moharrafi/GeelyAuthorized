
import React from 'react';
import { Globe, Award, Users, Lightbulb, ArrowRight, MessageCircle, Star, ShieldCheck, Trophy, BadgeCheck, Camera, Sparkles } from 'lucide-react';

interface AboutProps {
  onConsultClick: (prompt?: string) => void;
}

// Data gambar pengiriman
const GALLERY_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800", size: "tall" },
  { id: 2, url: "https://images.unsplash.com/photo-1542362567-b05500281754?auto=format&fit=crop&q=80&w=800", size: "small" },
  { id: 3, url: "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800", size: "small" },
  { id: 4, url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800", size: "small" },
  { id: 5, url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800", size: "tall" },
  { id: 6, url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800", size: "medium" },
  { id: 7, url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800", size: "small" },
  { id: 8, url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800", size: "medium" },
];

const About: React.FC<AboutProps> = ({ onConsultClick }) => {
  return (
    <div className="pt-24 md:pt-20 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[50vh] flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Lumina Showroom" 
            className="w-full h-full object-cover opacity-10 dark:opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-950 via-white/40 dark:via-slate-950/40 to-white dark:to-slate-950"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full mb-6 border border-accent/20">
            <Trophy size={16} />
            <span className="text-[10px] font-black tracking-widest uppercase">Senior Lead Consultant</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tighter transition-colors">
            Dayana <span className="text-accent">Sastro</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg font-light leading-relaxed mb-10 transition-colors">
            Menghadirkan kebahagiaan di setiap garasi. Konsultasi otomotif dengan standar profesionalisme tertinggi.
          </p>
          <button 
            onClick={() => onConsultClick("Halo Dayana, saya ingin konsultasi mengenai unit ready stock.")}
            className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-full hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-slate-950 transition-all flex items-center justify-center gap-3 mx-auto shadow-2xl group uppercase tracking-widest text-[10px]"
          >
            Hubungi Dayana
            <MessageCircle size={18} />
          </button>
        </div>
      </section>

      {/* Pure Visual Gallery Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4 text-accent">
               <Camera size={20} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter mb-4 transition-colors">
              Delivery <span className="text-accent">Gallery</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          {/* Masonry-style Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {GALLERY_IMAGES.map((item) => (
              <div 
                key={item.id} 
                className="relative group overflow-hidden rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-accent/10 transition-all duration-700 cursor-zoom-in"
              >
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-700 z-10"></div>
                
                {/* Visual Accent on Hover */}
                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-12 h-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-accent shadow-xl border border-white/50 dark:border-white/10">
                      <Sparkles size={20} fill="currentColor" />
                   </div>
                </div>

                <img 
                  src={item.url} 
                  alt={`Delivery Success ${item.id}`} 
                  className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                
                {/* Subtle bottom gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center">
             <div className="flex items-center gap-8 mb-10">
                <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter transition-colors">480+</div>
                    <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Units Sold</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900 dark:text-white tracking-tighter transition-colors">100%</div>
                    <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Trust Rate</div>
                </div>
             </div>
             <p className="text-slate-400 dark:text-slate-500 text-sm font-light italic transition-colors">"Setiap unit adalah bukti dedikasi kami."</p>
          </div>
        </div>
      </section>

      {/* Expertise & Profile Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2">
               <div className="relative rounded-[3rem] overflow-hidden border border-white dark:border-slate-800 shadow-2xl aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" 
                    alt="Dayana Sastro" 
                    className="w-full h-full object-cover transition-transform duration-[5s] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
               </div>
            </div>
            <div className="w-full lg:w-1/2">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-full mb-8 transition-colors shadow-sm">
                  <BadgeCheck size={16} className="text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Sales Lead</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 tracking-tighter transition-colors">
                  Pengalaman Membeli <br/> <span className="text-accent">Tanpa Kompromi</span>
               </h2>
               <p className="text-slate-600 dark:text-slate-400 text-lg font-light leading-relaxed mb-10 transition-colors">
                  Saya percaya bahwa kendaraan adalah investasi masa depan. Sebagai konsultan Anda, tugas saya adalah memastikan setiap proses berjalan transparan, cepat, dan sesuai dengan ekspektasi Anda.
               </p>
               <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Lightbulb, title: "Customized", desc: "Pilihan unit sesuai profil Anda." },
                    { icon: ShieldCheck, title: "Secure", desc: "Transaksi aman & terjamin." },
                  ].map((item, idx) => (
                    <div key={idx} className="p-8 bg-white dark:bg-slate-950/50 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-accent/20 dark:hover:border-accent/20 transition-all group shadow-sm">
                       <item.icon className="text-accent mb-4 group-hover:scale-110 transition-transform" size={28} />
                       <h4 className="font-bold text-slate-900 dark:text-white mb-1 transition-colors">{item.title}</h4>
                       <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
