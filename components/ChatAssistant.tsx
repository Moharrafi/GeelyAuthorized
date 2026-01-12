import React, { forwardRef, useEffect, useState } from 'react';

export interface ChatAssistantHandle {
  openWithPrompt: (prompt: string) => void;
}

const ChatAssistant = forwardRef<ChatAssistantHandle>(() => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const whatsappMessage =
    "Halo Dayana, saya ingin konsultasi mengenai pembelian Geely. Mohon info promo terbaru dan ketersediaan unit.";
  const whatsappNumber = "6283197483984";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-[88px] right-6 z-40 w-12 h-12 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700 shadow-lg transition-all duration-300 flex items-center justify-center ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        ↑
      </button>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat via WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-white text-white hover:text-[#25D366] shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:scale-110 flex items-center justify-center wa-fab"
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="fill-current"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.01 0C5.39 0 .02 5.37.02 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62a11.95 11.95 0 0 0 5.8 1.48h.01c6.62 0 12-5.37 12-11.99 0-3.2-1.25-6.2-3.49-8.39zM12.01 22.1h-.01a10.1 10.1 0 0 1-5.15-1.42l-.37-.22-3.68.96.98-3.59-.24-.37a10.1 10.1 0 0 1-1.55-5.46c0-5.6 4.56-10.16 10.17-10.16 2.71 0 5.25 1.06 7.17 2.98a10.09 10.09 0 0 1 2.97 7.18c0 5.6-4.56 10.16-10.16 10.16zm5.56-7.62c-.3-.15-1.76-.87-2.03-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.8.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.2 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35z" />
        </svg>
      </a>
    </>
  );
});

export default ChatAssistant;
