import React, { useState } from 'react';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';
import { CARS, PROVINCES, CITIES } from '../constants';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'pre-book' | 'book-now' | 'test-drive';

const TestDriveModal: React.FC<TestDriveModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('test-drive');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    province: '',
    city: '',
    model: '',
    consent: false
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tab: activeTab,
          ...formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStatus('success');
      setFormData({
        name: '', email: '', phone: '', province: '', city: '', model: '', consent: false
      });
    } catch (error) {
      setStatus('error');
    }
  };

  // Dynamic content based on active tab
  const getTabContent = () => {
    const getCarImage = (name: string) =>
      CARS.find((car) => car.name === name)?.image ??
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1200";

    switch(activeTab) {
      case 'pre-book':
        return {
          title: "Pre-Book Now",
          desc: "Be the first to own the future. Secure your Geely X-Prototype now.",
          image: getCarImage("Geely EX2"),
          btnText: "Secure Pre-Order"
        };
      case 'book-now':
        return {
          title: "Order Your Geely",
          desc: "Secure your offer today. Choose your configuration and dealer.",
          image: getCarImage("Geely EX5"),
          btnText: "Request Quote"
        };
      case 'test-drive':
      default:
        return {
          title: "Test Drive",
          desc: "Experience tomorrow, today. Book your test drive and discover the thrill.",
          image: getCarImage("Geely Starray EM-i"),
          btnText: "Schedule Drive"
        };
    }
  };

  const content = getTabContent();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-slate-900 w-full max-w-6xl rounded-[2.5rem] border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-fade-in-up">
        
        {/* Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/30 hover:bg-white text-white hover:text-slate-900 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
        >
            <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar">
            
            {/* Header Section */}
            <div className="p-8 md:p-12 pb-0 md:pb-0 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
                    How might we <span className="text-accent">help you today?</span>
                </h2>
                <p className="text-slate-400 mt-2 text-lg">Let us assist you. Choose an option below.</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-col md:flex-row border-b border-slate-700 mt-8 mx-0 md:mx-12">
                {[
                    { id: 'pre-book', label: 'PRE-BOOK NOW', sub: 'Pre-book Geely Concept' },
                    { id: 'book-now', label: 'BOOK NOW', sub: 'Secure your offer today' },
                    { id: 'test-drive', label: 'TEST DRIVE', sub: 'Experience the thrill' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id as TabType)}
                        className={`flex-1 text-left py-4 px-6 transition-all duration-300 relative group ${
                            activeTab === tab.id ? 'bg-slate-800/50' : 'hover:bg-slate-800/30'
                        }`}
                    >
                        <span className={`block text-lg font-bold mb-1 uppercase tracking-wider ${
                            activeTab === tab.id ? 'text-accent' : 'text-slate-400 group-hover:text-white'
                        }`}>
                            {tab.label}
                        </span>
                        <span className="block text-xs text-slate-500 font-medium">
                            {tab.sub}
                        </span>
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-accent shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area (Image + Form) */}
            <div className="flex flex-col lg:flex-row bg-slate-950/50 min-h-[500px]">
                
                {/* Left: Image (Cleaned from flickering elements) */}
                <div className="w-full lg:w-1/2 relative overflow-hidden h-64 lg:h-auto order-1 lg:order-1">
                    <div className="absolute inset-0 bg-slate-900 z-0"></div>
                    <img 
                        src={content.image} 
                        alt={content.title} 
                        className="relative z-10 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="eager"
                        referrerPolicy="no-referrer"
                    />
                    {/* Fixed text container with backdrop blur instead of full image gradient */}
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                        <div className="bg-slate-950/25 md:bg-slate-950/60 md:backdrop-blur-md border border-white/5 p-6 rounded-3xl">
                            <h3 className="text-2xl font-bold text-white mb-1">{content.title}</h3>
                            <p className="text-slate-300/70 md:text-slate-300 text-sm leading-relaxed">{content.desc}</p>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 order-2 lg:order-2">
                    {status === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in-up py-12">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                                <CheckCircle2 size={40} className="text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
                                <p className="text-slate-400 max-w-sm mx-auto">
                                    Thank you, {formData.name || 'valued customer'}. Our team is reviewing your request for 
                                    <span className="text-accent font-bold"> {activeTab.replace('-', ' ')}</span> and will contact you shortly.
                                </p>
                            </div>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="px-8 py-3 bg-slate-800 text-white font-bold rounded-full hover:bg-slate-700 transition-colors"
                            >
                                Submit Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Full Name<span className="text-accent">*</span>
                                    </label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="Your Full Name Here"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-full px-6 py-3 text-white placeholder-slate-600 focus:border-accent focus:outline-none transition-colors"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Email Address<span className="text-accent">*</span>
                                    </label>
                                    <input 
                                        required
                                        type="email" 
                                        placeholder="name@email.com"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-full px-6 py-3 text-white placeholder-slate-600 focus:border-accent focus:outline-none transition-colors"
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Phone Number<span className="text-accent">*</span>
                                    </label>
                                    <div className="flex">
                                        <span className="flex items-center justify-center bg-slate-800 px-4 text-slate-300 text-sm border border-slate-700 rounded-l-full border-r-0">
                                            🇮🇩 +62
                                        </span>
                                        <input 
                                            required
                                            type="tel" 
                                            placeholder="812 3456 7890"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-r-full px-6 py-3 text-white placeholder-slate-600 focus:border-accent focus:outline-none transition-colors"
                                            value={formData.phone}
                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                            Province<span className="text-accent">*</span>
                                        </label>
                                        <select 
                                            required
                                            className="w-full bg-slate-900 border border-slate-700 rounded-full px-6 py-3 text-white focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
                                            value={formData.province}
                                            onChange={e => setFormData({...formData, province: e.target.value, city: ''})}
                                        >
                                            <option value="" className="bg-slate-900">Select Province</option>
                                            {PROVINCES.map(p => (
                                                <option key={p} value={p} className="bg-slate-900">{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                            City<span className="text-accent">*</span>
                                        </label>
                                        <select 
                                            required
                                            disabled={!formData.province}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-full px-6 py-3 text-white focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50"
                                            value={formData.city}
                                            onChange={e => setFormData({...formData, city: e.target.value})}
                                        >
                                            <option value="" className="bg-slate-900">Select City</option>
                                            {formData.province && CITIES[formData.province]?.map(c => (
                                                <option key={c} value={c} className="bg-slate-900">{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Preferred Model
                                    </label>
                                    <select 
                                        className="w-full bg-slate-900 border border-slate-700 rounded-full px-6 py-3 text-white focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
                                        value={formData.model}
                                        onChange={e => setFormData({...formData, model: e.target.value})}
                                    >
                                        <option value="" className="bg-slate-900">Please Select</option>
                                        {CARS.map(c => (
                                            <option key={c.id} value={c.name} className="bg-slate-900">{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex items-center pt-1">
                                        <input 
                                            required
                                            type="checkbox" 
                                            className="peer sr-only"
                                            checked={formData.consent}
                                            onChange={e => setFormData({...formData, consent: e.target.checked})}
                                        />
                                        <div className="w-4 h-4 border border-slate-500 rounded bg-transparent peer-checked:bg-accent peer-checked:border-accent transition-all"></div>
                                        <CheckCircle2 size={12} className="absolute text-slate-900 opacity-0 peer-checked:opacity-100 top-1.5 left-0.5 transition-opacity" />
                                    </div>
                                    <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                        I agree to receive email for the latest information and news according to Geely's Privacy Policy.
                                    </span>
                                </label>
                            </div>

                            <button 
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full py-4 bg-white text-slate-950 font-bold uppercase tracking-widest rounded-full hover:bg-accent transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                            >
                                {status === 'submitting' ? 'Processing...' : content.btnText}
                                {!status && <ChevronRight size={18} />}
                            </button>
                            {status === 'error' && (
                              <p className="text-xs text-red-400">
                                Gagal mengirim data. Coba lagi ya.
                              </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TestDriveModal;
