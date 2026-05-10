
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Volume2, VolumeX, MessageCircle, Lightbulb } from 'lucide-react';
import { ChatMessage } from '../types';
import { getAgriculturalAdvice, speakAdvice } from '../services/geminiService';

const SUGGESTED_PROMPTS = [
  "أفضل وقت لزراعة المانجو",
  "علاج اصفرار أوراق الطماطم",
  "كيفية استخدام الري بالتنقيط",
  "الوقاية من آفات النخيل"
];

export const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'مرحباً بك يا مزارعنا القدير! أنا مرشدك الذكي، اسألني عن أي شيء يخص زراعتك في تهامة وسأجيبك فوراً. يمكنك أيضاً الضغط على أيقونة السماعة لسماع الرد بصوتي.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (textToSend: string = input) => {
    if (!textToSend.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getAgriculturalAdvice(textToSend);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = async (msgId: string, text: string) => {
    setIsSpeaking(msgId);
    await speakAdvice(text);
    setTimeout(() => setIsSpeaking(null), 5000); // محاكاة لانتهاء الصوت
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-140px)] md:h-[calc(100vh-100px)]">
      <div className="bg-white rounded-[2rem] shadow-2xl h-full flex flex-col border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-l from-primary-800 to-primary-600 p-6 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Sparkles className="h-6 w-6 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-white font-black text-xl">المرشد الزراعي الذكي</h2>
              <p className="text-primary-100 text-xs flex items-center gap-1 mt-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                مدعوم بأحدث تقنيات Gemini
              </p>
            </div>
          </div>
          <div className="hidden md:block">
             <Bot className="h-10 w-10 text-white/20" />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-primary-600' : 'bg-white border border-gray-200'}`}>
                {msg.role === 'user' ? <User className="h-6 w-6 text-white" /> : <Bot className="h-6 w-6 text-primary-600" />}
              </div>
              
              <div className={`relative max-w-[80%] rounded-3xl px-6 py-4 shadow-sm ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white text-gray-800 border border-gray-100'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap font-bold">{msg.text}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-[10px] opacity-60 ${msg.role === 'user' ? 'text-white' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.role === 'model' && (
                    <button 
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      className={`p-1.5 rounded-full transition-all ${isSpeaking === msg.id ? 'bg-primary-100 text-primary-600 animate-pulse' : 'hover:bg-gray-100 text-gray-400'}`}
                    >
                      {isSpeaking === msg.id ? <Volume2 className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-4 animate-pulse">
               <div className="w-10 h-10 bg-white border border-gray-200 rounded-2xl flex items-center justify-center">
                  <Bot className="h-6 w-6 text-gray-300" />
               </div>
               <div className="bg-white border border-gray-100 px-6 py-3 rounded-full text-xs text-gray-500 font-bold shadow-sm flex items-center gap-2">
                 <Loader2 className="h-4 w-4 animate-spin" />
                 جاري تحليل التربة والمناخ...
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اكتب استفسارك هنا (مثلاً: كيف أعالج ذبول الموز؟)"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all pr-14"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <MessageCircle className="h-6 w-6" />
              </div>
            </div>
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-primary-700 text-white p-4 rounded-2xl hover:bg-primary-800 disabled:opacity-50 shadow-xl shadow-primary-200 transition-all flex items-center justify-center"
            >
              <Send className="h-6 w-6 rotate-180" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto mt-4 pb-2 scrollbar-hide">
            {SUGGESTED_PROMPTS.map((p, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(p)}
                className="bg-primary-50 text-primary-700 border border-primary-100 px-4 py-2 rounded-full text-xs font-bold hover:bg-primary-100 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <Lightbulb className="h-3 w-3" />
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
