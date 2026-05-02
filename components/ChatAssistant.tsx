import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

export interface ChatAssistantHandle {
  openWithPrompt: (prompt: string) => void;
}

const whatsappNumber = "6283197483984";
const defaultMessage = "Halo Dayana, saya ingin konsultasi mengenai pembelian Geely. Mohon info promo terbaru dan ketersediaan unit.";

const buildWhatsappUrl = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message || defaultMessage)}`;

const ChatAssistant = forwardRef<ChatAssistantHandle>((_props, ref) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const whatsappUrl = buildWhatsappUrl(defaultMessage);

  useImperativeHandle(ref, () => ({
    openWithPrompt: (prompt: string) => {
      window.open(buildWhatsappUrl(prompt), '_blank', 'noreferrer');
    },
  }));

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-5 md:bottom-6 right-5 md:right-6 z-50 flex flex-col items-end gap-3">
      {/* Back to top Button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-800 border border-white/10 shadow-xl transition-all duration-500 flex items-center justify-center ${
          showBackToTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <span className="text-lg">↑</span>
      </button>

      {/* WhatsApp Container with Tooltip */}
      <div className="relative group">
        {/* Tooltip/Label */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
          Chat with us
        </div>
        
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat via WhatsApp"
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 flex items-center justify-center overflow-hidden"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
          
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="fill-current relative z-10 md:w-8 md:h-8"
          >
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.01 0C5.39 0 .02 5.37.02 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62a11.95 11.95 0 0 0 5.8 1.48h.01c6.62 0 12-5.37 12-11.99 0-3.2-1.25-6.2-3.49-8.39zM12.01 22.1h-.01a10.1 10.1 0 0 1-5.15-1.42l-.37-.22-3.68.96.98-3.59-.24-.37a10.1 10.1 0 0 1-1.55-5.46c0-5.6 4.56-10.16 10.17-10.16 2.71 0 5.25 1.06 7.17 2.98a10.09 10.09 0 0 1 2.97 7.18c0 5.6-4.56 10.16-10.16 10.16zm5.56-7.62c-.3-.15-1.76-.87-2.03-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.8.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.2 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35z" />
          </svg>
        </a>
      </div>
    </div>
  );
});

export default ChatAssistant;
