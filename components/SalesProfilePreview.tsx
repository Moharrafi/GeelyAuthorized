
import React from 'react';
import { Star, ArrowRight, ShieldCheck, Trophy } from 'lucide-react';

interface SalesProfilePreviewProps {
  onMoreInfoClick: () => void;
}

const SalesProfilePreview: React.FC<SalesProfilePreviewProps> = ({ onMoreInfoClick }) => {
  return (
    <section className="py-24 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Visual Profile */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-700 shadow-2xl isolate">
              <img 
                src="https://dayana.geelyauthorized.com/dayana.jpg" 
                alt="Dayana - Lead Sales Consultant" 
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-8 left-8 bg-accent/20 backdrop-blur-md border border-accent/30 p-4 rounded-3xl flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-slate-950">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-accent uppercase tracking-widest">Featured</div>
                  <div className="text-white font-bold text-sm">Top Sales 2025</div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-bold text-white mb-1">Dayana</h3>
                <p className="text-accent text-xs font-bold uppercase tracking-widest">Lead Sales Consultant</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-white/60 rounded-full mb-6">
              <ShieldCheck size={14} className="text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Official Representative</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              Konsultasi Profesional <br/>
              <span className="text-accent">Tanpa Kompromi</span>
            </h2>
            
            <p className="text-slate-400 text-lg font-light leading-relaxed mb-8">
              Temukan pengalaman membeli mobil yang dipersonalisasi khusus untuk Anda. Sebagai pemenang <strong className="text-white">Dealer Award 2025</strong>, kami menjamin transparansi dan pelayanan kelas dunia di setiap langkah.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800">
                <Trophy className="text-accent mb-3" size={24} />
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Klien Terlayani</div>
              </div>
              <div className="p-6 bg-slate-950/50 rounded-3xl border border-slate-800">
                <Star className="text-accent mb-3" size={24} fill="currentColor" />
                <div className="text-2xl font-bold text-white">99%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Kepuasan Pelanggan</div>
              </div>
            </div>

            <button 
              onClick={onMoreInfoClick}
              className="px-10 py-5 bg-white text-slate-950 font-bold rounded-full hover:bg-accent transition-all flex items-center justify-center gap-3 shadow-xl shadow-white/5 group uppercase tracking-widest text-xs"
            >
              Info Selengkapnya
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SalesProfilePreview;
