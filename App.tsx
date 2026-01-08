
import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarShowcase from './components/CarShowcase';
import Features from './components/Features';
import ChatAssistant, { ChatAssistantHandle } from './components/ChatAssistant';
import TestDriveModal from './components/TestDriveModal';
import Footer from './components/Footer';
import About from './components/About';
import PromoGJAW from './components/PromoGJAW';
import SalesProfilePreview from './components/SalesProfilePreview';

type View = 'home' | 'about';
type Theme = 'dark' | 'light';

function App() {
  const [isTestDriveOpen, setTestDriveOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const chatRef = useRef<ChatAssistantHandle>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleTestDriveClick = () => {
    setTestDriveOpen(true);
  };

  const handleConsultClick = (prompt?: string) => {
    if (chatRef.current) {
      chatRef.current.openWithPrompt(prompt || "");
    }
  };

  const navigateTo = (view: View, sectionId?: string) => {
    setCurrentView(view);
    
    setTimeout(() => {
      if (sectionId) {
        if (sectionId === 'booking') {
             setTestDriveOpen(true);
        } else {
            const section = document.getElementById(sectionId);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar 
        onTestDriveClick={handleTestDriveClick} 
        onNavigate={navigateTo}
        currentView={currentView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      
      <main>
        {currentView === 'home' ? (
          <>
            <Hero onDiscoverClick={() => navigateTo('home', 'models')} />
            <CarShowcase onTestDriveClick={handleTestDriveClick} />
            <Features />
            
            <SalesProfilePreview onMoreInfoClick={() => navigateTo('about')} />

            <PromoGJAW onConsultClick={handleConsultClick} />

            <section className={`py-32 relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}`}>
               <div className="absolute inset-0 z-0">
                  <img src="https://geelyauto.id/sites/default/files/2025-10/%E5%9B%BD%E8%B4%B8%E8%B7%AF%E8%B7%91%20%281%29.jpg" className="w-full h-full object-cover opacity-20" alt="Driving" />
                  <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent' : 'bg-gradient-to-t from-slate-50 via-white/80 to-transparent'}`}></div>
               </div>

               <div className="container mx-auto px-6 relative z-10 text-center">
                  <h2 className={`text-4xl md:text-6xl font-bold mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Mulai Perjalanan Anda</h2>
                  <p className={`text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    Nikmati perpaduan sempurna antara kemewahan dan teknologi. Pesan sesi test drive eksklusif Anda bersama Geely sekarang.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={handleTestDriveClick}
                      className={`px-12 py-5 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-2xl hover:-translate-y-1 ${
                        theme === 'dark' ? 'bg-white text-slate-950 hover:bg-accent' : 'bg-slate-900 text-white hover:bg-accent hover:text-slate-950'
                      }`}
                    >
                      Pesan Sekarang
                    </button>
                    <button 
                      onClick={() => handleConsultClick("Halo Dayana, saya ingin bertanya tentang promo terbaru.")}
                      className={`px-12 py-5 bg-transparent border font-bold text-xs uppercase tracking-widest rounded-full backdrop-blur-sm transition-all duration-300 ${
                        theme === 'dark' ? 'border-white/30 text-white hover:bg-white/10' : 'border-slate-900/30 text-slate-900 hover:bg-slate-900/10'
                      }`}
                    >
                      Konsultasi Online
                    </button>
                  </div>
               </div>
            </section>
          </>
        ) : (
          <About onConsultClick={handleConsultClick} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
      
      <ChatAssistant ref={chatRef} />
      
      <TestDriveModal 
        isOpen={isTestDriveOpen} 
        onClose={() => setTestDriveOpen(false)} 
      />
    </div>
  );
}

export default App;
