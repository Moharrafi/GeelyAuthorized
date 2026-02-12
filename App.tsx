
import React, { useState, useRef, useEffect, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LazySection from './components/LazySection';
import type { ChatAssistantHandle } from './components/ChatAssistant';

const ChatAssistant = lazy(() => import('./components/ChatAssistant'));
const TestDriveModal = lazy(() => import('./components/TestDriveModal'));
const About = lazy(() => import('./components/About'));
const Specifications = lazy(() => import('./components/Specifications'));
const CarShowcase = lazy(() => import('./components/CarShowcase'));
const CarColorSelector = lazy(() => import('./components/CarColorSelector'));
const Features = lazy(() => import('./components/Features'));
const PromoGJAW = lazy(() => import('./components/PromoGJAW'));
const SalesProfilePreview = lazy(() => import('./components/SalesProfilePreview'));
const Footer = lazy(() => import('./components/Footer'));

type View = 'home' | 'about' | 'specifications';
type Theme = 'dark' | 'light';

function App() {
  const [isTestDriveOpen, setTestDriveOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isChatReady, setIsChatReady] = useState(false);
  const chatRef = useRef<ChatAssistantHandle>(null);
  const whatsappNumber = "6283197483984";
  const whatsappKonsultasiOnlineUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo Dayana, salam kenal. Saya ingin bertanya tentang promo terbaru. Terima kasih."
  )}`;

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

  useEffect(() => {
    let idleId: number | undefined;
    const defer = () => setIsChatReady(true);
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(defer, { timeout: 1500 });
    } else {
      idleId = window.setTimeout(defer, 800);
    }
    return () => {
      if (idleId) {
        if ('cancelIdleCallback' in window) {
          window.cancelIdleCallback(idleId);
        } else {
          window.clearTimeout(idleId);
        }
      }
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleTestDriveClick = useCallback(() => {
    setTestDriveOpen(true);
  }, []);

  const handleConsultClick = useCallback((prompt?: string) => {
    if (chatRef.current) {
      chatRef.current.openWithPrompt(prompt || "");
    }
  }, []);

  const navigateTo = useCallback((view: View, sectionId?: string) => {
    // If we are already on the correct view and just need to scroll
    if (currentView === view && sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    setCurrentView(view);

    // Short timeout to allow render cycle to complete if view changed
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
    }, 50); // Reduced from 100ms to 50ms for snappier feel
  }, [currentView]);

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
            <Suspense fallback={<div className="min-h-[520px]" />}>
              <LazySection id="models" placeholderClassName="min-h-[520px]">
                <CarShowcase onTestDriveClick={handleTestDriveClick} />
              </LazySection>
            </Suspense>
            <Suspense fallback={<div className="min-h-[760px]" />}>
              <LazySection placeholderClassName="min-h-[760px]">
                <CarColorSelector />
              </LazySection>
            </Suspense>
            <Suspense fallback={<div className="min-h-[520px]" />}>
              <LazySection id="technology" placeholderClassName="min-h-[520px]">
                <Features />
              </LazySection>
            </Suspense>

            <Suspense fallback={<div className="min-h-[420px]" />}>
              <LazySection placeholderClassName="min-h-[420px]">
                <SalesProfilePreview onMoreInfoClick={() => navigateTo('about')} />
              </LazySection>
            </Suspense>

            <Suspense fallback={<div className="min-h-[520px]" />}>
              <LazySection id="news" placeholderClassName="min-h-[520px]">
                <PromoGJAW onConsultClick={handleConsultClick} />
              </LazySection>
            </Suspense>

            <section className={`py-32 relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}`}>
              <div className="absolute inset-0 z-0">
                <img
                  src="https://geelyauto.id/sites/default/files/2025-10/%E5%9B%BD%E8%B4%B8%E8%B7%AF%E8%B7%91%20%281%29.jpg"
                  className="w-full h-full object-cover opacity-20"
                  alt="Driving"
                  loading="lazy"
                  decoding="async"
                />
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
                    className={`px-12 py-5 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-2xl hover:-translate-y-1 ${theme === 'dark' ? 'bg-white text-slate-950 hover:bg-accent' : 'bg-white text-slate-900 border border-slate-200 hover:bg-black hover:text-white'
                      }`}
                  >
                    Pesan Sekarang
                  </button>
                  <a
                    href={whatsappKonsultasiOnlineUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-12 py-5 bg-transparent border font-bold text-xs uppercase tracking-widest rounded-full backdrop-blur-sm transition-all duration-300 ${theme === 'dark' ? 'border-white/30 text-white hover:bg-white/10' : 'border-slate-900/30 text-slate-900 hover:bg-slate-900/10'
                      }`}
                  >
                    Konsultasi Online
                  </a>
                </div>
              </div>
            </section>
          </>
        ) : currentView === 'specifications' ? (
          <Suspense fallback={null}>
            <Specifications />
          </Suspense>
        ) : (
          <Suspense fallback={null}>
            <About onConsultClick={handleConsultClick} />
          </Suspense>
        )}
      </main>

      <Suspense fallback={<div className="min-h-[320px]" />}>
        <LazySection placeholderClassName="min-h-[320px]">
          <Footer onNavigate={navigateTo} />
        </LazySection>
      </Suspense>

      {isChatReady ? (
        <Suspense fallback={null}>
          <ChatAssistant ref={chatRef} />
        </Suspense>
      ) : null}

      {isTestDriveOpen ? (
        <Suspense fallback={null}>
          <TestDriveModal
            isOpen={isTestDriveOpen}
            onClose={() => setTestDriveOpen(false)}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

export default App;
