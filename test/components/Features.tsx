
import React from 'react';
import { ShieldCheck, BatteryCharging, Cpu, Wifi, Smartphone, Globe } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="technology" className="pt-12 pb-24 md:pt-16 md:pb-32 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Innovation</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">
            Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Driving</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg transition-colors">
            Lumina integrates cutting-edge technology to create a seamless ecosystem between you, your car, and the world around you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Main Large Feature */}
          <div className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200" 
              alt="Cockpit" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-slate-950 via-transparent to-transparent transition-colors"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4 text-slate-950">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Gemini AI Pilot</h3>
              <p className="text-slate-200 dark:text-slate-300 max-w-md transition-colors">
                Our proprietary AI learns your preferences, routes, and driving style to optimize energy consumption and safety in real-time.
              </p>
            </div>
          </div>

          {/* Secondary Feature 1 */}
          <div className="md:col-span-1 md:row-span-1 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:border-accent dark:hover:border-slate-700 transition-all flex flex-col justify-center relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            <BatteryCharging size={32} className="text-accent mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Super Charge V4</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors">
              300km range in just 15 minutes. Our new battery architecture minimizes heat and maximizes efficiency.
            </p>
          </div>

          {/* Secondary Feature 2 */}
          <div className="md:col-span-1 md:row-span-1 bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:border-purple-400/50 dark:hover:border-slate-700 transition-all flex flex-col justify-center relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
            <ShieldCheck size={32} className="text-purple-600 dark:text-purple-400 mb-4 transition-colors" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Guardian Safety</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors">
              360° lidar and radar array provides a protective shield around the vehicle, anticipating hazards before you see them.
            </p>
          </div>
        </div>

        {/* Bottom Small Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm">
            <Wifi className="text-slate-400 dark:text-slate-400" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white transition-colors">5G Connectivity</h4>
              <p className="text-xs text-slate-500">Always online, always updated</p>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm">
            <Smartphone className="text-slate-400 dark:text-slate-400" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white transition-colors">Mobile Key</h4>
              <p className="text-xs text-slate-500">Control via Lumina App</p>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex items-center gap-4 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm">
            <Globe className="text-slate-400 dark:text-slate-400" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white transition-colors">Sustainable Tech</h4>
              <p className="text-xs text-slate-500">Recycled interior materials</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
