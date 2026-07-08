import React, { useState, useEffect, useRef } from 'react';
import { Radar, CheckCircle2, Star } from 'lucide-react';

/* ─── Per-model technology data ─────────────────────────────────── */
const MODEL_TECH = [
  {
    id: 'ex2',
    label: 'Geely EX2',
    series: 'Urban EV',
    accentColor: '#3b82f6',
    heroImage: 'https://geelypremiumgroup.co.id/wp-content/uploads/2026/01/202512417%E5%AE%8C%E7%A8%BF-scaled.jpg',
    heroAlt: 'Geely EX2 Technology',
    heroTitle: 'Smart Urban Electric',
    heroDesc: 'Platform listrik cerdas dengan FLYME AUTO — ekosistem digital yang menghubungkan Anda dengan dunia di setiap perjalanan.',
    gallery: [
      { src: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(biru).webp', caption: 'EX2 Exterior' },
      { src: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(pink).webp', caption: 'EX2 Rose Edition' },
      { src: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior_ex2_02.jpg', caption: 'EX2 Interior' },
    ],
    highlights: [
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2026/01/Rear-Trunk-4%E5%90%8E%E5%A4%87%E7%AE%B1_46%E6%94%BE%E5%80%92_00175-%E6%8B%B7%E8%B4%9D4-scaled.jpg', title: 'Double The Space', desc: 'Desain bagasi depan (Frunk) dan bagasi belakang serbaguna yang lapang, cerdas, dan fleksibel.' },
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2026/01/4.95m-nimble-turning-radius-scaled.png', title: 'Double the Driving Pleasure', desc: 'Lincah dan menyenangkan dengan radius putar minimum 4.95m untuk kenyamanan bermanuver di perkotaan.' },
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2026/01/LCA%E5%8F%98%E9%81%93%E8%BE%85%E5%8A%A9-scaled.jpg', title: 'Double The Safety & Ease', desc: 'Perlindungan aktif cerdas dengan sistem Lane Change Assist (LCA) dan DOW untuk keselamatan maksimal.' },
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2026/01/01-Whole-Interior-scaled.jpg', title: 'Double The Tech Joy', desc: 'Layar sentuh HD tengah 14.6 inci dan panel instrumen LCD 8.8 inci yang terintegrasi secara cerdas.' },
    ],
    adasTitle: 'ADAS Level 2 — 10 Fungsi (Varian Max)',
    adasItems: [
      'AEB — Automatic Emergency Braking',
      'ACC — Adaptive Cruise Control',
      'LKA — Lane Keeping Assist',
      'ELKA — Emergency Lane Keeping Assist',
      'BSD — Blind Spot Detection',
      'LCA — Lane Change Assist',
      'RCTA — Rear Cross Traffic Alert',
      'DOW — Door Open Warning',
      'TSI — Traffic Sign Information',
      'IHBC — Intelligent High Beam Control',
    ],
    adasVideo: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/adas-starray.mp4',
    safetyBadges: ['ABS + EBD + BA', 'ESC', 'TPMS', 'EPB + Auto Hold', 'Rear Camera', '540° View (Max)'],
    extraImage: 'https://geelypremiumgroup.co.id/wp-content/uploads/2026/01/Frunk-scaled.jpg',
    extraTitle: 'Frunk 70L + Bagasi 375–1.320L',
    extraDesc: 'Ruang penyimpanan ekstra di depan (frunk 70L) dan bagasi yang bisa dilipat hingga 1.320 liter.',
  },
  {
    id: 'ex5',
    label: 'Geely EX5',
    series: 'Pure EV',
    accentColor: '#22c55e',
    heroImage: '/img/inovation/Gambar3.png',
    heroAlt: 'Geely EX5 Technology',
    heroTitle: '540° Panoramic Intelligence',
    heroDesc: 'Platform GEA generasi baru — arsitektur listrik global yang menyatukan keselamatan, performa, dan kecerdasan dalam satu paket premium.',
    gallery: [
      { src: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_teal-3.webp', caption: 'EX5 Teal' },
      { src: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_white-3.webp', caption: 'EX5 White' },
      { src: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior-01.webp', caption: 'EX5 Interior' },
    ],
    highlights: [
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/05/img1.jpg', title: 'GEA — Electric Architecture', desc: 'Platform cerdas GEA generasi baru mengoptimalkan ruang, efisiensi energi, keamanan, kecerdasan buatan (AI), dan performa.' },
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/05/img2.jpg', title: 'Short Blade Battery', desc: 'Baterai LFP generasi terbaru yang mendukung pengisian daya cepat (fast charging) untuk meminimalkan waktu tunggu.' },
      { image: 'https://geely.premiumgroup.co.id/wp-content/uploads/2025/05/vid3.mp4', title: '11-in-1 Electric Drive', desc: 'Unit penggerak listrik terintegrasi 11-in-1 menghasilkan daya puncak 160 kW dengan efisiensi tinggi dan performa bertenaga.' },
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/flyme-sound-starray.png', title: 'FLYME SOUND Audio', desc: 'Sistem audio Dolby Atmos dengan amplifier independen 1000W dan 16 speaker untuk kualitas suara murni sekelas konser.' },
    ],
    adasTitle: 'ADAS Level 2 — 13 Fungsi',
    adasItems: [
      'AEB — Automatic Emergency Braking',
      'ACC + ICC — Intelligent Cruise Control',
      'LKA — Lane Keeping Assist',
      'ELKA — Emergency Lane Keeping Assist',
      'BSD — Blind Spot Detection',
      'LCA — Lane Change Assist',
      'CMSF & CMSR — Collision Mitigation (Front & Rear)',
      'RCTA & RCTB — Rear Cross Traffic Alert & Braking',
      'DOW — Door Open Warning',
      'TSI — Traffic Sign Information',
      'IHBC — Intelligent High Beam Control',
      '540° Panoramic Camera System',
      'Parking Sensors Front & Rear',
    ],
    adasVideo: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/adas-starray.mp4',
    safetyBadges: ['★★★★★ Euro NCAP', 'ABS + EBD', 'ESC', 'TPMS', 'EPB + Auto Hold', 'HAC + HDC'],
    extraImage: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/05/img4-scaled.jpg',
    extraTitle: 'Optimized Space for Ultimate Comfort',
    extraDesc: 'Dengan tingkat utilisasi ruang hingga 67.2%, GEELY EX5 memberikan efisiensi ruang kabin terbaik di kelasnya untuk perjalanan yang nyaman dan menyenangkan.',
  },
  {
    id: 'starray',
    label: 'Starray EM-i',
    series: 'Super Hybrid',
    accentColor: '#f59e0b',
    heroImage: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/02-Exterior-Geely-Starray-EM-i-Geely-Ambara-Group-2.webp',
    heroAlt: 'Geely Starray EM-i Technology',
    heroTitle: 'Thor EM-i Super Hybrid',
    heroDesc: 'Teknologi hybrid revolusioner — mesin 1.5L efisiensi termal 44.5% + motor listrik 160 kW. Total jangkauan 1.000+ km, EV murni 105 km.',
    gallery: [
      { src: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_glacier-blue3.webp', caption: 'Starray Glacier Blue' },
      { src: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_polar-black3.webp', caption: 'Starray Polar Black' },
      { src: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/starray/interior_starray_01.png', caption: 'Starray Interior' },
    ],
    highlights: [
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/GEELY-STARRAY-EM-I-Geely-Auto-Indonesia.mp4', title: 'EM-i Super Hybrid', desc: 'Teknologi hybrid canggih Geely menggabungkan efisiensi bahan bakar dan baterai untuk jangkauan lebih jauh.' },
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/interior-3-scaled.webp', title: '15.4" HD Central Screen', desc: 'Layar sentuh resolusi tinggi 15.4 inci yang terintegrasi secara cerdas untuk navigasi dan hiburan.' },
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/interior-2-scaled.webp', title: '256-Color Ambient Lights', desc: 'Pencahayaan kabin ambient 256 warna dinamis yang melengkapi kemewahan interior berkendara Anda.' },
      { image: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/flyme-sound-starray.png', title: 'FLYME SOUND Audio', desc: 'Nikmati kualitas audio sejernih kristal dari konfigurasi 16 speaker dengan amplifier bertenaga 1000W.' },
    ],
    adasTitle: 'ADAS Level 2 — 14 Fungsi',
    adasItems: [
      'AEB — Automatic Emergency Braking',
      'ACC + ICC — Intelligent Cruise Control',
      'LKA — Lane Keeping Assist',
      'ELKA — Emergency Lane Keeping Assist',
      'BSD — Blind Spot Detection',
      'LCA — Lane Change Assist',
      'CMSF & CMSR — Collision Mitigation (Front & Rear)',
      'RCTA & RCTB — Rear Cross Traffic Alert & Braking',
      'DOW — Door Open Warning',
      'TSI — Traffic Sign Information',
      'IHBC — Intelligent High Beam Control',
      '540° Panoramic Camera System',
      'Parking Sensors Front & Rear',
      'HAC + HDC — Hill Assist & Descent Control',
    ],
    adasVideo: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/adas-starray.mp4',
    safetyBadges: ['★★★★★ Euro NCAP', '★★★★★ ANCAP', 'ABS + EBD', 'ESC', 'EPB + Auto Hold', 'HAC + HDC'],
    extraImage: 'https://geelypremiumgroup.co.id/wp-content/uploads/2025/09/interior-7-scaled.webp',
    extraTitle: '528L Trunk Capacity',
    extraDesc: 'Bagasi luas dengan kapasitas 528 liter saat kursi dalam posisi tegak, siap menampung seluruh barang bawaan Anda.',
  },
];

const Features: React.FC = () => {
  const [activeId, setActiveId] = useState('ex2');
  const model = MODEL_TECH.find(m => m.id === activeId)!;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.log("Autoplay blocked or failed:", err);
      });
    }
  }, [activeId]);

  return (
    <section id="technology" className="pt-12 pb-10 md:pt-16 md:pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <span className="text-slate-600 dark:text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Innovation</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Driving</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Geely mengintegrasikan teknologi terdepan — pilih model untuk melihat fitur eksklusifnya.
          </p>
        </div>

        {/* ── Model Tab Switcher ── */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-slate-100 dark:bg-slate-900 rounded-full p-1.5 gap-1 border border-slate-200 dark:border-slate-800">
            {MODEL_TECH.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${activeId === m.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white'
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div key={activeId} className="animate-fade-in-up">

          {/* ── Top Row: Hero + Highlights ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

            {/* Hero Feature Card */}
            <div className="lg:col-span-3 relative group rounded-3xl overflow-hidden min-h-[340px] lg:min-h-[420px]">
              <img
                src={model.heroImage}
                alt={model.heroAlt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">{model.series}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">{model.heroTitle}</h3>
                <p className="text-slate-300 text-sm max-w-md leading-relaxed">{model.heroDesc}</p>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {model.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <div className="w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-805/50">
                    {h.image.endsWith('.mp4') ? (
                      <video
                        src={h.image}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={h.image}
                        alt={h.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1 group-hover:text-accent transition-colors">
                        {h.title}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs leading-relaxed line-clamp-3">
                        {h.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom Row: ADAS + Safety + Extra ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* ADAS List */}
            <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Radar size={20} className="text-accent" />
                </div>
                <div>
                  <div className="font-black text-slate-900 dark:text-white text-base">{model.adasTitle}</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Advanced Driver Assistance</div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: ADAS list */}
                <div className="lg:col-span-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {model.adasItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                        <span className="line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: ADAS Video */}
                {model.adasVideo && (
                  <div className="lg:col-span-6">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-video shadow-md group">
                      <video
                        ref={videoRef}
                        key={activeId}
                        src={model.adasVideo}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Safety Badges - spans full width below the list & video */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-3">Safety & Certification</div>
                <div className="flex flex-wrap gap-2">
                  {model.safetyBadges.map((badge, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Extra Feature Card */}
            <div className="relative group rounded-3xl overflow-hidden min-h-[260px]">
              <img
                src={model.extraImage}
                alt={model.extraTitle}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <Star size={18} className="text-accent mb-3" />
                <h4 className="text-white font-black text-base mb-1 leading-tight">{model.extraTitle}</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{model.extraDesc}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
