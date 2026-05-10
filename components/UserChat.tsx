import React, { useState, useEffect } from 'react';
import { UserConversation } from '../types';
import { Send, User, Search, Phone, MessageSquare } from 'lucide-react';

interface UserChatProps {
  initialContact?: string;
}

export const UserChat: React.FC<UserChatProps> = ({ initialContact }) => {
  const [conversations, setConversations] = useState<UserConversation[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  // Initialize chat if initialContact provided
  useEffect(() => {
    if (initialContact) {
      // Check if conversation already exists
      const existing = conversations.find(c => c.contactName === initialContact);
      if (existing) {
        setActiveChat(existing.id);
      } else {
        // Create new temporary conversation
        const newConv: UserConversation = {
          id: Date.now().toString(),
          contactName: initialContact,
          lastMessage: 'بدء المحادثة...',
          timestamp: 'الآن',
          unread: 0,
          avatar: initialContact.charAt(0).toUpperCase()
        };
        setConversations(prev => [newConv, ...prev]);
        setActiveChat(newConv.id);
        setChatHistory([]); // Start empty history
      }
    }
  }, [initialContact]);

  const activeContact = conversations.find(c => c.id === activeChat);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    
    // Add message to history
    setChatHistory([...chatHistory, { 
      id: Date.now(), 
      text: messageInput, 
      sender: 'me', 
      time: new Date().toLocaleTimeString('ar-YE', {hour:'2-digit', minute:'2-digit'}) 
    }]);

    // Update conversation list last message
    if (activeChat) {
      setConversations(prev => prev.map(c => 
        c.id === activeChat 
          ? { ...c, lastMessage: messageInput, timestamp: 'الآن' } 
          : c
      ));
    }

    setMessageInput('');
  };

  return (
    <div className="h-[calc(100vh-80px)] max-w-7xl mx-auto p-4 flex gap-4">
      {/* Sidebar List */}
      <div className={`w-full md:w-1/3 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">الرسائل</h2>
          <div className="relative">
             <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
             <input type="text" placeholder="بحث في المحادثات..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-9 pl-4 text-sm focus:outline-none focus:border-primary-500" />
          </div>
        </div>
        
        {conversations.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
             <MessageSquare className="h-12 w-12 mb-3 opacity-20" />
             <p className="text-sm">لا توجد رسائل حالياً.</p>
             <p className="text-xs mt-1">ابدأ التواصل مع التجار والمزارعين من خلال صفحة السوق.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {conversations.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat.id)}
                className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 ${activeChat === chat.id ? 'bg-primary-50' : ''}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900 truncate">{chat.contactName}</h3>
                    <span className="text-xs text-gray-400">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className={`w-full md:w-2/3 bg-white rounded-2xl shadow-md border border-gray-200 flex-col ${activeChat ? 'flex' : 'hidden md:flex'}`}>
        {activeChat ? (
          <>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveChat(null)} className="md:hidden text-gray-500">
                   ←
                </button>
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                  {activeContact?.avatar}
                </div>
                <div>
                   <h3 className="font-bold text-gray-900">{activeContact?.contactName}</h3>
                   <span className="text-xs text-green-600 flex items-center gap-1">● متصل الآن</span>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-white text-gray-600">
                 <Phone className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 ? (
                 <div className="text-center text-gray-400 text-sm mt-10">
                    ابدأ المحادثة مع {activeContact?.contactName}...
                 </div>
              ) : (
                chatHistory.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                      msg.sender === 'me' 
                        ? 'bg-primary-600 text-white rounded-tl-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tr-none'
                    }`}>
                      <p>{msg.text}</p>
                      <span className={`text-[10px] block mt-1 text-left ${msg.sender === 'me' ? 'text-primary-200' : 'text-gray-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-100">
               <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={messageInput}
                   onChange={(e) => setMessageInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="اكتب رسالتك هنا..."
                   className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                 />
                 <button 
                   onClick={handleSend}
                   className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700"
                 >
                   <Send className="h-5 w-5 rotate-180" />
                 </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
             <MessageSquare className="h-16 w-16 mb-4 opacity-20" />
             <p>اختر محادثة للبدء في التواصل</p>
          </div>
        )}
      </div>
    </div>
  );
};