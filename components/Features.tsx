
import React from 'react';
import { ShieldCheck, BatteryCharging, Cpu, Wifi, Smartphone, Globe, Speaker, Battery, Scan, Radar } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="technology" className="pt-12 pb-24 md:pt-16 md:pb-32 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">Innovation</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Driving</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Geely integrates cutting-edge technology to create a seamless ecosystem between you, your car, and the world around you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Main Large Feature */}
          <div className="md:col-span-2 md:row-span-2 relative group rounded-3xl overflow-hidden border border-slate-800">
            <video
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://geelyprod-static.oss-ap-southeast-5.aliyuncs.com/starray/video-asset/panoramic-view.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4 text-slate-950">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">540° PANORAMIC VIEW</h3>
              <p className="text-slate-300 max-w-md">
                Your intelligent co-pilot, integrating AI with real-time data to enhance every journey.
              </p>
            </div>
          </div>

          {/* Secondary Feature 1 */}
          <div className="md:col-span-1 md:row-span-1 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-center relative overflow-hidden group min-h-[220px]">
            <video
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://geelywonder.id/public/domain/g/geelywonder.id/images/video_features-aeb-ex2.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent md:from-slate-950/90 md:via-slate-950/40"></div>
            <div className="relative z-10 p-8 pb-10 h-full flex flex-col justify-end">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
              <Radar size={32} className="text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">TSI Traffic Sign Recognition</h3>
              <p className="text-slate-200 text-sm">
              Identify the speed limit sign on the road ahead and display a reminder through the LCD instrument
              </p>
            </div>
          </div>

          {/* Secondary Feature 2 */}
          <div className="md:col-span-1 md:row-span-1 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-center relative overflow-hidden group">
            <video
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://geelyprod-static.oss-ap-southeast-5.aliyuncs.com/starray/video-asset/adas-starray.mp4  "
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
            <div className="relative z-10 p-8 pb-10 h-full flex flex-col justify-end">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
              <ShieldCheck size={32} className="text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2"> Advanced Driver Assistance Systems (ADAS)</h3>
              <p className="text-slate-200 text-sm">
               Experience enhanced safety and convenience with 13 functions of Level 2 ADAS, including adaptive cruise control and lane-keeping assist.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Small Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-center relative overflow-hidden group min-h-[220px] sm:min-h-[240px] md:min-h-[288px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            <img
              src="https://geelyauto.id/themes/custom/geely/images/technology-section/airbag-system.jpg"
              alt="AIRBAG SYSTEM"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <ShieldCheck className="text-accent mb-3" />
              <h4 className="text-xl font-bold text-white mb-2">AIRBAG SYSTEM</h4>
              <p className="text-slate-200 text-sm">Comprehensive Protection with 6 Airbags</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-center relative overflow-hidden group min-h-[220px] sm:min-h-[240px] md:min-h-[288px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            <img
              src="https://geelyauto.id/themes/custom/geely/images/technology-section/image-1.png"
              alt="Battery"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <Battery className="text-green-400 mb-3" />
              <h4 className="text-xl font-bold text-white mb-2">Battery</h4>
              <p className="text-slate-200 text-sm">New Generation Short Blade Battery</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-center relative overflow-hidden group min-h-[220px] sm:min-h-[240px] md:min-h-[288px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://geelyambara.co.id/storage/2025/09/GEELY-EX5_4.mp4?&autoplay=1&mute=1&loop=1"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <Speaker className="text-blue-400 mb-3" />
              <h4 className="text-xl font-bold text-white mb-2">FLYME SOUND</h4>
              <p className="text-slate-200 text-sm">Premium Audio System</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
