import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Info, Sparkles } from 'lucide-react';
import { CARS } from '../constants';

const TENORS = [12, 24, 36, 48, 60, 72, 84];

const CreditSimulator: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState(CARS[0]);
  const [selectedVariant, setSelectedVariant] = useState<'pro' | 'max'>('pro');
  const [dpPercent, setDpPercent] = useState(30);
  const [tenor, setTenor] = useState(60);

  const carPrice = useMemo(() => {
    if (selectedCar.id === 'starray') return 499800000;
    const p = selectedVariant === 'pro' ? selectedCar.price : (selectedCar.priceMax || selectedCar.price);
    return parseInt(p.replace(/[^\d]/g, ''));
  }, [selectedCar, selectedVariant]);

  const calculation = useMemo(() => {
    const dp = Math.round(carPrice * dpPercent / 100);
    const loanAmount = carPrice - dp;
    // Bunga 0% — cicilan = pokok / tenor
    const monthlyPayment = Math.round(loanAmount / tenor);
    const totalPayment = monthlyPayment * tenor;

    return {
      dp,
      loanAmount,
      monthlyPayment,
      totalPayment,
    };
  }, [carPrice, dpPercent, tenor]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

  const whatsappUrl = `https://wa.me/6283197483984?text=${encodeURIComponent(
    `Halo Dayana, saya tertarik dengan ${selectedCar.name}${selectedCar.priceMax ? ` varian ${selectedVariant.toUpperCase()}` : ''}.\n\nSimulasi kredit saya:\n• Harga: ${formatCurrency(carPrice)}\n• DP ${dpPercent}%: ${formatCurrency(calculation.dp)}\n• Cicilan ${tenor} bulan: ${formatCurrency(calculation.monthlyPayment)}/bulan\n• Bunga: 0%\n\nMohon info promo dan penawaran terbaik. Terima kasih!`
  )}`;

  return (
    <section className="py-10 md:py-16 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <Calculator size={14} />
            Simulasi Kredit
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            Hitung Cicilan <span className="text-slate-400 dark:text-slate-600 italic">Anda.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base font-light">
            Simulasi cicilan transparan untuk membantu Anda merencanakan pembelian mobil Geely impian.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* ── LEFT: CONTROLS ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Model Selector */}
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6">
              <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest block mb-4">Pilih Model</label>
              <div className="grid grid-cols-3 gap-3">
                {CARS.filter(c => !c.id.startsWith('//')).map(car => (
                  <button
                    key={car.id}
                    onClick={() => { setSelectedCar(car); setSelectedVariant('pro'); }}
                    className={`relative px-3 py-4 rounded-2xl text-left transition-all duration-300 border ${
                      selectedCar.id === car.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg scale-[1.02]'
                        : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-white/30'
                    }`}
                  >
                    <div className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-0.5 truncate">{car.category}</div>
                    <div className="text-xs font-black tracking-tight truncate">{car.name}</div>
                  </button>
                ))}
              </div>

              {/* Variant */}
              {selectedCar.priceMax && (
                <div className="mt-4 flex gap-3">
                  {(['pro', 'max'] as const).map(v => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                        selectedVariant === v
                          ? 'bg-accent text-slate-950 border-accent'
                          : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-accent/50'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DP Slider */}
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest">Uang Muka (DP)</label>
                <span className="text-lg font-black text-slate-900 dark:text-white">{dpPercent}%</span>
              </div>
              <input
                type="range"
                min={30} max={50} step={5}
                value={dpPercent}
                onChange={e => setDpPercent(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-600 mt-2">
                <span>30%</span><span>50%</span>
              </div>
              <div className="mt-3 text-sm font-bold text-accent">{formatCurrency(calculation.dp)}</div>
            </div>

            {/* Tenor */}
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6">
              <label className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-widest block mb-4">Tenor (Bulan)</label>
              <div className="flex flex-wrap gap-2">
                {TENORS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTenor(t)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border ${
                      tenor === t
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                        : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: RESULT CARD ── */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800/80 dark:to-slate-900/80 border border-slate-700/50 rounded-3xl p-8 text-white sticky top-24">

              <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">{selectedCar.name}{selectedCar.priceMax ? ` • ${selectedVariant.toUpperCase()}` : ''}</div>
              <div className="text-sm text-slate-400 mb-4">Harga: {formatCurrency(carPrice)}</div>

              {/* 0% Interest Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <Sparkles size={12} className="text-green-400" />
                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Bunga 0%</span>
              </div>

              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Cicilan / Bulan</div>
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-1">
                {formatCurrency(calculation.monthlyPayment)}
              </div>
              <div className="text-xs text-slate-500 mb-8">Selama {tenor} bulan ({(tenor / 12).toFixed(1)} tahun)</div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Uang Muka ({dpPercent}%)</span>
                  <span className="font-bold">{formatCurrency(calculation.dp)}</span>
                </div>
                <div className="h-px bg-slate-700" />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Pokok Pinjaman</span>
                  <span className="font-bold">{formatCurrency(calculation.loanAmount)}</span>
                </div>
                <div className="h-px bg-slate-700" />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Bunga</span>
                  <span className="font-bold text-green-400">0%</span>
                </div>
                <div className="h-px bg-slate-700" />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Pembayaran</span>
                  <span className="font-bold">{formatCurrency(calculation.totalPayment)}</span>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent hover:bg-accent/90 text-slate-950 font-black text-xs uppercase tracking-widest rounded-full transition-all hover:-translate-y-0.5 shadow-lg shadow-accent/20"
              >
                Konsultasi Kredit
                <ArrowRight size={16} />
              </a>

              <div className="mt-4 flex items-start gap-2 text-[10px] text-slate-600">
                <Info size={12} className="flex-shrink-0 mt-0.5" />
                <span>Simulasi ini bersifat estimasi. Hubungi Dayana untuk perhitungan dan penawaran resmi.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditSimulator;
