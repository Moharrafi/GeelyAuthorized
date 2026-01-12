import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { ChatMessage } from '../types';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

export interface ChatAssistantHandle {
  openWithPrompt: (prompt: string) => void;
}

const ChatAssistant = forwardRef<ChatAssistantHandle>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Halo! Saya Dayana, konsultan pribadi Anda di Lumina Auto. Ada yang bisa saya bantu mengenai pemilihan unit atau konsultasi promo hari ini?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useImperativeHandle(ref, () => ({
    openWithPrompt: (prompt: string) => {
      setIsOpen(true);
      if (prompt) {
        setInput(prompt);
      }
    }
  }));

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || !chatSessionRef.current) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: botMessageId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      const result = await sendMessageStream(chatSessionRef.current, userMessage.text);
      let fullText = '';
      
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const chunkText = c.text || '';
        fullText += chunkText;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: fullText } : msg
        ));
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'Maaf, koneksi saya sedang terganggu. Silakan coba lagi sebentar lagi.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-white text-white hover:text-blue-600 p-4 rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare size={28} fill="currentColor" />
      </button>

      <div className={`fixed bottom-6 right-6 z-50 w-full max-w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-sm">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Dayana" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Dayana (Sales Lead)</h3>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Active Now
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-slate-200">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               {msg.role === 'model' && (
                 <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                   <Bot size={14} className="text-blue-600" />
                 </div>
               )}
               <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${
                 msg.role === 'user' 
                   ? 'bg-blue-600 text-white rounded-tr-none shadow-sm' 
                   : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
               }`}>
                 {msg.text}
               </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mt-1">
                <Bot size={14} className="text-blue-600" />
              </div>
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none border border-slate-200">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-5 bg-slate-50 border-t border-slate-100 rounded-b-3xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tanya Dayana tentang promo..."
              className="w-full bg-white text-slate-900 pl-4 pr-12 py-3.5 rounded-full border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-400 text-sm shadow-inner"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default ChatAssistant;