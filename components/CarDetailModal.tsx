import React, { useEffect, useMemo, useState } from 'react';
import { X, Gauge, Zap, Wind, CheckCircle2, ChevronRight } from 'lucide-react';
import { Car } from '../types';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onTestDriveClick: () => void;
}

const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, isOpen, onClose, onTestDriveClick }) => {
  const [activeImage, setActiveImage] = useState(0);

  const images = useMemo(() => {
    if (!car?.image) return [];

    const galleryByName: Record<string, string[]> = {
      'Geely EX2': [
        car.image,
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior_color_ex2_02.jpg',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior_ex2_02.jpg',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior_ex2_04.jpg',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/lp_ex2_05.jpg',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/lp_ex2_08.jpg',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/lp_ex2_09_indo.jpg',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/lp_ex2_07.jpg'
      ],
      'Geely EX5': [
        car.image,
        // 'https://geelywonder.id/public/domain/g/geelywonder.id/images/exterior-03.webp',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/exterior-04.webp',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/exterior-05.webp',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior-01.webp',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior-02.webp',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior-03.webp',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior-04.webp',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior-05.webp',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/interior-06.webp'
      ],
      'Geely Starray EM-i': [
        car.image,
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/exterior_starray_01.jpg',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/exterior_starray_03.jpg',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/exterior_starray_04.jpg',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/starray/interior_starray_01.png',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/starray/interior_starray_02.png',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/starray/interior_starray_07.png',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/starray/interior_starray_03.png',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/starray/interior_starray_06.png',
        'https://geelywonder.id/public/domain/g/geelywonder.id/images/connect-srevice-starray.jpg'
      ]
    };

    return galleryByName[car.name] ?? [car.image, car.image, car.image];
  }, [car?.image, car?.name]);

  useEffect(() => {
    setActiveImage(0);
  }, [car?.image]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);
  if (!isOpen || !car) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-slate-900 w-full max-w-[95rem] rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[80vh] animate-fade-in-up">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 w-10 h-10 bg-black/30 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 relative h-[28rem] lg:h-auto overflow-hidden">
          {images.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt={`${car.name} ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === activeImage ? 'opacity-100' : 'opacity-0'
                }`}
              loading="lazy"
              decoding="async"
            />
          ))}
          {images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  onClick={() => setActiveImage(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === activeImage ? 'w-8 bg-white/90' : 'w-3 bg-white/30 hover:bg-white/50'
                    }`}
                  aria-label={`Show image ${idx + 1}`}
                />
              ))}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900"></div>
          <div className="absolute bottom-6 left-6">
            <span className="px-3 py-1 bg-accent text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full">
              {car.category}
            </span>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full lg:w-1/2 p-8 lg:p-10 overflow-y-auto custom-scrollbar">
          <h2
            className={`font-bold text-white mb-2 ${car.name === 'Geely Starray EM-i' ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'
              }`}
          >
            {car.name}
          </h2>
          <p className="text-xl text-accent font-medium mb-6">{car.tagline}</p>

          <div className="flex items-end gap-2 mb-8 border-b border-slate-800 pb-8">
            <span className="text-3xl font-bold text-white">{car.price}</span>
            <span className="text-slate-500 text-sm mb-1.5">Starting Price</span>
          </div>

          <p className="text-slate-300 leading-relaxed mb-8">
            {car.description}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 text-center">
              <Gauge className="text-accent w-6 h-6 mx-auto mb-2" />
              <div className="font-bold text-white">{car.specs.acceleration}</div>
              <div className="text-[10px] text-slate-500 uppercase">0-100 km/h</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 text-center">
              <Zap className="text-accent w-6 h-6 mx-auto mb-2" />
              <div className="font-bold text-white">{car.specs.power}</div>
              <div className="text-[10px] text-slate-500 uppercase">Power</div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 text-center">
              <Wind className="text-accent w-6 h-6 mx-auto mb-2" />
              <div className="font-bold text-white">{car.specs.topSpeed}</div>
              <div className="text-[10px] text-slate-500 uppercase">Top Speed</div>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-8">
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Key Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-400 text-sm">
                  <CheckCircle2 size={16} className="text-accent" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              onClose();
              onTestDriveClick();
            }}
            className="w-full py-4 bg-white text-slate-950 font-bold uppercase tracking-widest rounded-full hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            Book a Test Drive
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailModal;
