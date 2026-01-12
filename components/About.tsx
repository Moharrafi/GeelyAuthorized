import React from 'react';
import { Globe, Award, Users, Lightbulb, ArrowRight, Star, ShieldCheck, Trophy, Camera, Sparkles } from 'lucide-react';

interface AboutProps {
  onConsultClick: (prompt?: string) => void;
}

const GALLERY_IMAGES = [
  { id: 1, url: "/img/9.jpeg", size: "tall" },
  { id: 2, url: "/img/1.jpeg", size: "small" },
  { id: 3, url: "/img/7.jpeg", size: "medium" },
  { id: 4, url: "/img/5.jpeg", size: "small" },
  { id: 5, url: "/img/3.jpeg", size: "tall" },
  { id: 6, url: "/img/6.jpeg", size: "medium" },
  { id: 7, url: "/img/8.jpeg", size: "small" },
  { id: 8, url: "/img/4.jpeg", size: "medium" },
  { id: 9, url: "/img/10.jpeg", size: "small" },
];

const About: React.FC<AboutProps> = ({ onConsultClick }) => {
  const whatsappNumber = "6283197483984";
  const whatsappKonsultasiUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo Dayana, salam kenal. Saya ingin konsultasi pemilihan mobil yang cocok untuk saya. Terima kasih."
  )}`;
  const whatsappSimulasiUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo Dayana, salam kenal. Saya ingin minta simulasi kredit untuk Geely EX5. Terima kasih."
  )}`;
  const whatsappStokUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo Dayana, salam kenal. Apakah ada stok ready untuk Starray EM-i? Terima kasih."
  )}`;

  return (
    <div className="pt-24 md:pt-20 bg-slate-950 min-h-screen animate-fade-in text-slate-100">
      
      {/* About Hero */}
      <section className="relative h-[70vh] md:h-[60vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Geely Showroom" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 mt-12 md:mt-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full mb-6 border border-accent/20 animate-fade-in-up">
            <Trophy size={16} />
            <span className="text-[10px] font-black tracking-widest uppercase">Dealer Award 2025 Winner</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Konsultasi Eksklusif <br/>
            <span className="text-accent">Bersama Dayana</span>
          </h1>
          <p className="text-black dark:text-slate-200 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed mb-10">
            Menemukan kendaraan impian bukan sekadar transaksi, melainkan perjalanan. Biarkan Dayana membantu Anda menemukan Geely yang tepat untuk gaya hidup Anda.
          </p>
          <a 
            href={whatsappKonsultasiUrl}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-accent transition-all inline-flex items-center justify-center gap-3 mx-auto shadow-xl shadow-white/5 group uppercase tracking-widest text-xs"
          >
            Mulai Konsultasi Sekarang
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-current group-hover:scale-110 transition-transform"
            >
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.01 0C5.39 0 .02 5.37.02 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62a11.95 11.95 0 0 0 5.8 1.48h.01c6.62 0 12-5.37 12-11.99 0-3.2-1.25-6.2-3.49-8.39zM12.01 22.1h-.01a10.1 10.1 0 0 1-5.15-1.42l-.37-.22-3.68.96.98-3.59-.24-.37a10.1 10.1 0 0 1-1.55-5.46c0-5.6 4.56-10.16 10.17-10.16 2.71 0 5.25 1.06 7.17 2.98a10.09 10.09 0 0 1 2.97 7.18c0 5.6-4.56 10.16-10.16 10.16zm5.56-7.62c-.3-.15-1.76-.87-2.03-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.8.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.2 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35z" />
            </svg>
          </a>
        </div>
      </section>

      {/* Meet Dayana Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group isolate">
              <img 
                src="/img/10.jpeg"
                alt="Dayana - Lead Consultant" 
                className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              {/* Top Sales Badge Overlay */}
              <div className="absolute top-8 right-8 z-20 flex flex-col items-center">
                <div className="w-24 h-24 bg-accent rounded-full border-4 border-slate-950 shadow-2xl flex flex-col items-center justify-center text-slate-950 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                   <Star size={24} fill="currentColor" />
                   <span className="text-[10px] font-black uppercase tracking-tighter">TOP SALES</span>
                   <span className="text-sm font-black">2025</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-10 left-10">
                 <div className="bg-accent text-slate-950 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-2 inline-block">
                   Lead Sales Consultant
                 </div>
                 <h2 className="text-4xl font-bold text-white tracking-tight">Dayana</h2>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold rounded-full mb-6 uppercase tracking-widest border border-accent/20">
              Top Rated Consultant
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
              Pelayanan <span className="text-accent">Terbaik</span> dari Dealer Terpercaya
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6 text-lg font-light">
              Halo, saya Dayana. Sebagai peraih penghargaan <strong className="text-white">Top Sales Geely 2025</strong>, visi saya adalah menghadirkan standar baru dalam pelayanan otomotif di Indonesia.
            </p>
            <p className="text-slate-500 leading-relaxed mb-10 font-light">
              Geely baru saja dinobatkan sebagai <strong className="text-white">Dealer Award 2025</strong> berkat dedikasi kami pada inovasi teknologi dan kepuasan pelanggan yang tak tertandingi.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4 border-t border-slate-800 pt-10 mb-10">
              <div>
                <div className="text-4xl font-bold text-white mb-1 tracking-tighter">500+</div>
                <div className="text-[10px] text-accent uppercase tracking-[0.2em] font-black">Klien Terpuaskan</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1 flex items-center tracking-tighter">
                  99% <ShieldCheck className="text-green-500 ml-2" size={24} />
                </div>
                <div className="text-[10px] text-accent uppercase tracking-[0.2em] font-black">Rating Pelayanan</div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-white mb-1 flex items-center tracking-tighter">
                  No. 1 <Star className="text-accent ml-2" size={20} fill="currentColor" />
                </div>
                <div className="text-[10px] text-accent uppercase tracking-[0.2em] font-black">Top Sales 2025</div>
              </div>
            </div>

            <button 
              onClick={() => onConsultClick("Dayana, apa saja promo OTR terbaru untuk bulan ini?")}
              className="w-full py-5 bg-slate-900 text-white font-bold rounded-full border border-slate-800 shadow-sm hover:border-accent/50 transition-all flex items-center justify-center gap-3 group uppercase tracking-widest text-xs"
            >
              Tanya Tentang Promo OTR
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-accent" />
            </button>
          </div>
        </div>
      </section>

      {/* Accolades Banner */}
      <section className="bg-slate-900 py-16 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-3">
              <Award className="w-10 h-10 text-accent" />
              <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Dealer Excellence 2025</div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-10 h-10 text-accent" />
              <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Top Sales National 2025</div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-10 h-10 text-accent" />
              <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Certified Luxury Dealer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-[10px] font-black tracking-widest uppercase mb-3 block">Award-Winning Standard</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Mengapa Berkonsultasi?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">Layanan kami telah diakui secara nasional untuk kualitas dan transparansinya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Lightbulb, title: "Rekomendasi Cerdas", desc: "Pemilihan unit berdasarkan kebutuhan mobilitas harian Anda." },
              { icon: Globe, title: "Penawaran Terbaik", desc: "Akses eksklusif ke program promo, trade-in, dan bunga rendah." },
              { icon: Users, title: "After Sales Support", desc: "Pendampingan servis rutin dan klaim garansi tanpa ribet." },
              { icon: Award, title: "Proses Cepat", desc: "Pengurusan administrasi dan STNK yang efisien dan transparan." }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-10 bg-slate-900 rounded-3xl border border-slate-800 text-center group transition-all duration-500 ease-out hover:border-accent/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10"
              >
                <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-slate-800 transition-all duration-500 ease-out group-hover:bg-accent group-hover:text-slate-950 group-hover:shadow-lg group-hover:shadow-accent/30">
                  <item.icon className="w-8 h-8 text-accent transition-colors duration-500 ease-out group-hover:text-slate-950" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-light transition-colors duration-500 ease-out group-hover:text-slate-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Gallery */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4 text-accent">
               <Camera size={20} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
              Delivery <span className="text-accent">Gallery</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {GALLERY_IMAGES.map((item) => (
              <div 
                key={item.id} 
                className="relative group overflow-hidden rounded-[2.5rem] border border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-accent/10 transition-all duration-700 cursor-zoom-in"
              >
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-700 z-10"></div>
                
                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-12 h-12 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-accent shadow-xl border border-slate-700">
                      <Sparkles size={20} fill="currentColor" />
                   </div>
                </div>

                <img 
                  src={item.url} 
                  alt={`Delivery Success ${item.id}`} 
                  className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center">
             <div className="flex items-center gap-8 mb-10">
                <div className="text-center">
                    <div className="text-4xl font-bold text-white tracking-tighter">50+</div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Units Sold</div>
                </div>
                <div className="w-px h-10 bg-slate-800"></div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-white tracking-tighter">100%</div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Trust Rate</div>
                </div>
             </div>
             <p className="text-slate-500 text-sm font-light italic">"Setiap unit adalah bukti dedikasi kami."</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 container mx-auto px-6 text-center">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 relative overflow-hidden shadow-2xl isolate border border-slate-800">
          <div className="absolute inset-0 bg-accent mix-blend-overlay opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-white/20 to-accent pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Siap Memiliki <span className="text-accent">Geely</span> Anda?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-12 text-lg font-light leading-relaxed">
            Hubungi Dayana sekarang dan dapatkan simulasi kredit dengan bunga 0% untuk 12 bulan pertama dari Dealer Terbaik 2025.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={whatsappSimulasiUrl}
              target="_blank"
              rel="noreferrer"
              className="px-10 py-5 bg-accent text-slate-950 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all shadow-lg shadow-accent/20 text-center"
            >
              Minta Simulasi Kredit
            </a>
            <a 
              href={whatsappStokUrl}
              target="_blank"
              rel="noreferrer"
              className="px-10 py-5 bg-transparent text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-all border border-slate-700 text-center"
            >
              Cek Stok Ready
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
