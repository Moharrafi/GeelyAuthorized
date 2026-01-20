import React from 'react';
import { CheckCircle2, Star, ShieldCheck, Zap, ArrowRight, Quote } from 'lucide-react';

interface PromoGJAWProps {
  onConsultClick: (prompt?: string) => void;
}

const WHATSAPP_GJAW_URL =
  'https://wa.me/6283197483984?text=Halo%2C%20saya%20ingin%20ambil%20promo%20GJAW%202026.%20Mohon%20info%20detailnya%20ya.';

const PromoGJAW: React.FC<PromoGJAWProps> = ({ onConsultClick }) => {
  return (
    <section id="news" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full mb-4 border border-accent/20">
            <Star size={14} fill="currentColor" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Special Event: GJAW 2025</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Eksklusif <span className="text-accent">GJAW 2026</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-light text-lg">
            Penawaran terbatas dalam rangka Gaikindo Jakarta Auto Week. Wujudkan impian memiliki Geely dengan kemudahan finansial terbaik.
          </p>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl relative isolate">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left Content: The Offer */}
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight leading-none uppercase italic">
                PENAWARAN <br/>
                <span className="text-accent">TERBATAS!</span>
              </h3>

              <div className="space-y-6 mb-12">
                {[
                  { text: "Bunga 0% Tenor s/d 2 Tahun", icon: <Zap className="text-accent" size={20} /> },
                  { text: "Free Wallbox Charger & Instalasi", icon: <CheckCircle2 className="text-accent" size={20} /> },
                  { text: "Garansi Baterai 8 Tahun / Seumur Hidup*", icon: <ShieldCheck className="text-accent" size={20} /> },
                  { text: "Trade-In Semua Merk Harga Terbaik", icon: <Star className="text-accent" size={20} /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 group-hover:border-accent/50 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-accent transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>

              <a 
                href={WHATSAPP_GJAW_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => onConsultClick("Saya ingin mengambil promo GJAW 2026.")}
                className="px-10 py-5 bg-white text-slate-950 font-black rounded-full hover:bg-accent transition-all flex items-center justify-center gap-3 w-fit shadow-xl shadow-white/5 uppercase tracking-widest text-xs"
              >
                Ambil Promo Sekarang
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Right Content: The Visual */}
            <div className="flex-1 relative min-h-[500px] lg:min-h-auto">
              <img 
                src="https://geelyauto.id/sites/default/files/styles/drimage_improved_focal_900_0/public/2025-07/times-asia-pacific-best.png.webp" 
                alt="Car Delivery Geely" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent lg:bg-gradient-to-r lg:from-slate-900/90 lg:to-transparent"></div>
              
              {/* Dayana Quote Overlay */}
              <div className="absolute bottom-10 left-10 right-10">
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-slate-200/70 dark:border-white/20 p-8 rounded-3xl shadow-2xl max-w-md ml-auto">
                  <Quote className="text-accent mb-4" size={32} fill="currentColor" />
                  <p className="text-slate-800 dark:text-white text-lg font-medium leading-relaxed mb-6 italic">
                    "Saya siap membantu proses dari awal sampai mobil tiba di garasi Anda dengan pelayanan terbaik."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent">
                       <img src="/img/2.png" alt="Dayana" />
                    </div>
                    <div>
                       <div className="text-slate-900 dark:text-white font-bold text-sm">Dayana</div>
                       <div className="text-accent text-[10px] font-black uppercase tracking-widest">Lead Sales Consultant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoGJAW;
