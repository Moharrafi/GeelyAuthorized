import React, { useState, useEffect } from 'react';
import { X, Gauge, Zap, Wind, CheckCircle2, ChevronRight, Sparkles, Bot, Loader2 } from 'lucide-react';
import { Car } from '../types';
import { generateCarInsights } from '../services/geminiService';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onTestDriveClick: () => void;
}

const CarDetailModal: React.FC<CarDetailModalProps> = ({ car, isOpen, onClose, onTestDriveClick }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Reset insights when car changes
  useEffect(() => {
    setInsights(null);
    setIsAiLoading(false);
  }, [car]);

  const handleGenerateInsights = async () => {
    if (!car) return;
    setIsAiLoading(true);
    const result = await generateCarInsights(car);
    setInsights(result);
    setIsAiLoading(false);
  };

  if (!isOpen || !car) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-slate-900 w-full max-w-5xl rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 bg-black/30 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 relative h-64 md:h-auto">
          <img 
            src={car.image} 
            alt={car.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900"></div>
          <div className="absolute bottom-6 left-6">
             <span className="px-3 py-1 bg-accent text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full">
               {car.category}
             </span>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto custom-scrollbar">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{car.name}</h2>
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

          {/* AI Insights Section */}
          <div className="mb-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900 border border-slate-700 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-accent animate-pulse" />
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">Gemini Intelligence</h4>
              </div>
              {!insights && !isAiLoading && (
                <button 
                  onClick={handleGenerateInsights}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-full border border-slate-600 transition-colors flex items-center gap-1"
                >
                  <Bot size={12} />
                  Analyze Model
                </button>
              )}
            </div>

            {isAiLoading ? (
              <div className="flex flex-col items-center justify-center py-6 text-slate-400 gap-3">
                <Loader2 size={24} className="animate-spin text-accent" />
                <span className="text-xs animate-pulse">Analyzing vehicle telemetry...</span>
              </div>
            ) : insights ? (
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {/* Basic cleanup for bold markers if ReactMarkdown isn't used */}
                  {insights.split('**').map((part, i) => 
                    i % 2 === 1 ? <span key={i} className="text-white font-bold">{part}</span> : part
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Get an AI-powered analysis of the {car.name}'s performance and lifestyle fit.
              </p>
            )}
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