import React, { useState } from 'react';
import {
  ShieldCheck, BatteryCharging, Speaker, Radar,
  Zap, Eye, MonitorSmartphone,
  CheckCircle2, Star,
} from 'lucide-react';

/* ─── Per-model technology data ─────────────────────────────────── */
const MODEL_TECH = [
  {
    id: 'ex2',
    label: 'Geely EX2',
    series: 'Urban EV',
    accentColor: '#3b82f6',
    heroImage: '/img/inovation/Gambar1.png',
    heroAlt: 'Geely EX2 Technology',
    heroTitle: 'Smart Urban Electric',
    heroDesc: 'Platform listrik cerdas dengan FLYME AUTO — ekosistem digital yang menghubungkan Anda dengan dunia di setiap perjalanan.',
    gallery: [
      { src: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(biru).webp',   caption: 'EX2 Exterior' },
      { src: '/img/GEELY%20EX2%20_%20Geely%20Auto%20Indonesia/imgi_27_EX2.23(pink).webp',   caption: 'EX2 Rose Edition' },
      { src: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior_ex2_02.jpg', caption: 'EX2 Interior' },
    ],
    highlights: [
      { icon: MonitorSmartphone, color: 'text-blue-400',  title: 'FLYME AUTO 14.6"',      desc: 'Layar sentuh besar dengan sistem operasi cerdas terintegrasi penuh.' },
      { icon: BatteryCharging,   color: 'text-green-400', title: 'DC Fast Charge 25 min', desc: 'Pengisian cepat 30%→80% hanya 25 menit. Jangkauan hingga 395 km (NEDC).' },
      { icon: Zap,               color: 'text-yellow-400',title: 'V2L — Vehicle to Load',  desc: 'Suplai daya listrik ke perangkat eksternal hingga 3.3 kW langsung dari mobil.' },
      { icon: ShieldCheck,       color: 'text-purple-400',title: '6 Airbag System',        desc: 'Perlindungan menyeluruh dengan 6 kantung udara, termasuk airbag samping.' },
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
    safetyBadges: ['ABS + EBD + BA', 'ESC', 'TPMS', 'EPB + Auto Hold', 'Rear Camera', '540° View (Max)'],
    extraImage: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/lp_ex2_05.jpg',
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
      { src: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_teal-3.webp',   caption: 'EX5 Teal' },
      { src: '/img/EX5%20_%20Geely%20Auto%20Indonesia/imgi_6_white-3.webp',  caption: 'EX5 White' },
      { src: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior-01.webp', caption: 'EX5 Interior' },
    ],
    highlights: [
      { icon: Eye,               color: 'text-green-400',  title: 'W-HUD 13.8" Windshield', desc: 'Head-Up Display lebar di kaca depan — informasi penting selalu dalam pandangan.' },
      { icon: Speaker,           color: 'text-blue-400',   title: 'FLYME SOUND 1000W',       desc: '16 speaker Dolby Atmos premium — konser di dalam kabin Anda.' },
      { icon: BatteryCharging,   color: 'text-yellow-400', title: 'DC Fast Charge 20 min',   desc: 'Pengisian ultra-cepat 30%→80% dalam 20 menit. Jangkauan 495 km NEDC.' },
      { icon: Zap,               color: 'text-purple-400', title: 'V2L & V2V',               desc: 'Suplai daya ke perangkat luar (V2L) dan berbagi energi antar kendaraan (V2V).' },
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
    safetyBadges: ['★★★★★ Euro NCAP', 'ABS + EBD', 'ESC', 'TPMS', 'EPB + Auto Hold', 'HAC + HDC'],
    extraImage: 'https://geelyauto.id/themes/custom/geely/images/technology-section/image-1.png',
    extraTitle: 'New Generation Short Blade Battery',
    extraDesc: 'Baterai LFP 60.22 kWh generasi baru dengan densitas energi tinggi, tahan api, dan garansi 8 tahun / seumur hidup.',
  },
  {
    id: 'starray',
    label: 'Starray EM-i',
    series: 'Super Hybrid',
    accentColor: '#f59e0b',
    heroImage: '/img/inovation/Gambar2.png',
    heroAlt: 'Geely Starray EM-i Technology',
    heroTitle: 'Thor EM-i Super Hybrid',
    heroDesc: 'Teknologi hybrid revolusioner — mesin 1.5L efisiensi termal 44.5% + motor listrik 160 kW. Total jangkauan 1.000+ km, EV murni 105 km.',
    gallery: [
      { src: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_glacier-blue3.webp',   caption: 'Starray Glacier Blue' },
      { src: '/img/GEELY%20STARRAY%20EM-I%20_%20Geely%20Auto%20Indonesia/imgi_4_polar-black3.webp',    caption: 'Starray Polar Black' },
      { src: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/starray/interior_starray_01.png', caption: 'Starray Interior' },
    ],
    highlights: [
      { icon: Zap,               color: 'text-yellow-400', title: 'Eleven-in-One E-Drive',   desc: 'Sistem penggerak listrik terintegrasi — motor, inverter, gearbox dalam satu unit kompak.' },
      { icon: Speaker,           color: 'text-blue-400',   title: 'FLYME SOUND 1000W',        desc: '16 speaker premium — sistem audio terbaik di kelasnya.' },
      { icon: Eye,               color: 'text-green-400',  title: 'Dual 15.4" + 10.25" HUD', desc: 'Kokpit digital penuh: dual layar besar plus windshield HUD untuk navigasi.' },
      { icon: BatteryCharging,   color: 'text-purple-400', title: 'DC Fast Charge < 20 min', desc: 'Pengisian baterai PHEV 30%→80% dalam kurang dari 20 menit.' },
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
    safetyBadges: ['★★★★★ Euro NCAP', '★★★★★ ANCAP', 'ABS + EBD', 'ESC', 'EPB + Auto Hold', 'HAC + HDC'],
    extraImage: 'https://geelywonder.id/public/domain/g/geelywonder.id/images/exterior_starray_03.jpg',
    extraTitle: 'Panoramic Power Sunroof + 6 Airbags',
    extraDesc: 'Atap panoramik elektrik lebar disertai sistem 6 airbag — perlindungan total di setiap perjalanan.',
  },
];

const Features: React.FC = () => {
  const [activeId, setActiveId] = useState('ex5');
  const model = MODEL_TECH.find(m => m.id === activeId)!;

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
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  activeId === m.id
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
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {model.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <h.icon size={20} className={h.color} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{h.title}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{h.desc}</div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {model.adasItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 size={14} className="text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Safety Badges */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
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
