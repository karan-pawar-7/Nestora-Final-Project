import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  MapPin
} from 'lucide-react';

const QUICK_PROMPTS = [
  'Rooms in San Francisco under $2,500',
  'How does Nestora Escrow work?',
  'How do I list my property as an Owner?',
  'Top rated lofts with High-Speed WiFi',
];

export const AiHelperWidget = ({
  rooms,
  onSelectRoom,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Hello! I'm Nestora AI, your personal room finding assistant. Ask me anything about available listings, lease policies, or hosting your property!",
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const processUserQuery = (query) => {
    const lower = query.toLowerCase();
    let replyText = '';
    let matched = undefined;
    let navAction = undefined;

    if (lower.includes('san francisco') || lower.includes('sf')) {
      matched = rooms.filter((r) => r.city === 'San Francisco');
      if (lower.includes('2500') || lower.includes('under') || lower.includes('cheap')) {
        matched = matched.filter((r) => r.rentPerMonth <= 2500);
      }
      replyText = `I found ${matched.length} verified listings in San Francisco that match your criteria. Here are top recommendations:`;
      navAction = { label: 'Explore SF Listings', page: 'browse' };
    } else if (lower.includes('new york') || lower.includes('nyc')) {
      matched = rooms.filter((r) => r.city === 'New York');
      replyText = `Here are ${matched.length} luxury suites available in New York City:`;
      navAction = { label: 'Browse New York Rooms', page: 'browse' };
    } else if (lower.includes('escrow') || lower.includes('deposit') || lower.includes('security') || lower.includes('payment')) {
      replyText =
        'Nestora Escrow holds your 1st month rent and security deposit safely until move-in day. The host is paid only after you inspect the property and verify key handover.';
      navAction = { label: 'Learn About Security', page: 'about' };
    } else if (lower.includes('owner') || lower.includes('host') || lower.includes('list') || lower.includes('rent my')) {
      replyText =
        'To list your room as an owner: Sign in -> Select Property Owner role -> Click "Add New Room" on your Owner Dashboard. You can set rent, deposit, house rules, and accept tenant applications directly!';
      navAction = { label: 'Open Owner Portal', page: 'dashboard' };
    } else if (lower.includes('wifi') || lower.includes('internet') || lower.includes('tech') || lower.includes('work')) {
      matched = rooms.filter((r) =>
        r.amenities.some((a) => a.toLowerCase().includes('wifi') || a.toLowerCase().includes('fiber'))
      );
      replyText = `Found ${matched.length} homes equipped with high-speed fiber internet and dedicated workstations:`;
      navAction = { label: 'View All Remote Work Spaces', page: 'browse' };
    } else if (lower.includes('studio') || lower.includes('loft') || lower.includes('penthouse')) {
      matched = rooms.filter((r) =>
        r.type.toLowerCase().includes('studio') || r.type.toLowerCase().includes('loft')
      );
      replyText = `Here are available architectural studios and lofts on Nestora:`;
      navAction = { label: 'Browse Architectural Lofts', page: 'browse' };
    } else {
      replyText =
        `Nestora features verified luxury lofts and studios across San Francisco, New York, Austin, London, Tokyo, and Berlin. All bookings feature 100% Escrow Protection and verified property owners.`;
      matched = rooms.slice(0, 2);
      navAction = { label: 'Browse All Rooms', page: 'browse' };
    }

    return { replyText, matched, navAction };
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() }),
      });
      const data = await res.json();

      if (data && data.success) {
        const aiMsg = {
          id: 'msg-ai-' + Date.now(),
          sender: 'ai',
          text: data.replyText,
          matchedRooms: data.matchedRooms || [],
          actionLink: data.actionLink || { label: 'Explore Rooms', page: 'browse' },
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      console.log('Backend AI call fallback:', err);
    }

    // Client-side processing fallback
    setTimeout(() => {
      const { replyText, matched, navAction } = processUserQuery(query);
      const aiMsg = {
        id: 'msg-ai-' + Date.now(),
        sender: 'ai',
        text: replyText,
        matchedRooms: matched,
        actionLink: navAction,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Popover Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[380px] h-[520px] bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white">Nestora AI Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-slate-400">Powered by Gemini Smart Concierge</p>
              </div>
            </div>

            <button
              id="close-ai-widget-btn"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Scroll Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 text-xs">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isAi ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      isAi ? 'bg-blue-600 text-white shadow-2xs' : 'bg-slate-900 text-white'
                    }`}
                  >
                    {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`space-y-2 max-w-[82%] ${isAi ? '' : 'text-right'}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        isAi
                          ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs'
                          : 'bg-blue-600 text-white rounded-tr-none shadow-2xs'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                    </div>

                    {/* Render Matched Rooms Cards if any */}
                    {m.matchedRooms && m.matchedRooms.length > 0 && (
                      <div className="space-y-2 pt-1">
                        {m.matchedRooms.slice(0, 2).map((room) => (
                          <div
                            key={room.id}
                            onClick={() => {
                              onSelectRoom(room.id);
                              setIsOpen(false);
                            }}
                            className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-blue-500 cursor-pointer transition-all flex items-center gap-3 text-left group"
                          >
                            <img
                              src={room.images[0]}
                              alt={room.title}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-slate-900 text-xs truncate group-hover:text-blue-600 transition-colors">
                                {room.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                                <MapPin className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                                <span>{room.neighborhood}, {room.city}</span>
                              </p>
                              <p className="text-[11px] font-bold text-slate-900 mt-0.5">
                                ${room.rentPerMonth.toLocaleString()}/mo
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Navigation Button Link */}
                    {m.actionLink && (
                      <button
                        onClick={() => {
                          onNavigate(m.actionLink.page);
                          setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold rounded-xl border border-blue-200 transition-colors mt-1"
                      >
                        <span>{m.actionLink.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pt-1">
                <Bot className="w-4 h-4 text-blue-600 animate-pulse" />
                <span className="animate-pulse">Nestora AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 text-[10px] font-semibold rounded-lg shrink-0 transition-colors border border-slate-200/60"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about lofts, rent, escrow..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Launcher Button Floating Right Bottom */}
      <button
        id="toggle-ai-helper-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative px-4 py-3 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 border border-slate-800"
      >
        <div className="w-6 h-6 rounded-lg bg-blue-600 group-hover:bg-white text-white group-hover:text-blue-600 flex items-center justify-center transition-colors">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-bold tracking-tight">AI Assistant</span>
        
        {/* Unread Indicator Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};
