'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlineReload,
  AiOutlineSend,
  AiOutlineWhatsApp,
  AiOutlinePhone,
  AiOutlineMail
} from 'react-icons/ai';

interface Message {
  id: string;
  sender: 'rabbit' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  action?: {
    type: 'whatsapp' | 'call' | 'link';
    label: string;
    url: string;
  };
}

const INITIAL_SUGGESTIONS = [
  '🚀 What does an MVP cost?',
  '🛠 What services do you offer?',
  '⏱ What are your project timelines?',
  '🤝 Connect directly with the team'
];

const KNOWLEDGE_RESPONSES: {
  keywords: string[];
  reply: string;
  suggestions?: string[];
  action?: { type: 'whatsapp' | 'call' | 'link'; label: string; url: string };
}[] = [
  {
    keywords: ['cost', 'pricing', 'price', 'rate', 'quote', 'budget', 'expensive', 'fee'],
    reply: `At BITnWIT, we don't believe in hidden fees or bloated agency overhead. We tailor our pricing to your exact scope:
• **Starter / MVP Sprint:** Typically starts for rapid product validation (2–4 weeks).
• **Web & Landing Platforms:** Custom modern Next.js/Tailwind sites built for speed and conversion.
• **Full-Stack / Mobile Apps:** Modular milestone-based sprints for iOS, Android, and web.
• **Dedicated Retainer:** Ongoing engineering, AI integration, and growth sprints.

Every quote includes fixed deliverables, milestones, and direct access to our technical leadership.`,
    suggestions: ['⏱ What are your project timelines?', '🤝 Get an exact quote on WhatsApp'],
    action: {
      type: 'whatsapp',
      label: 'Get a custom quote on WhatsApp',
      url: 'https://wa.me/918949728810?text=Hi%20BITnWIT!%20I%20would%20like%20to%20discuss%20pricing%20and%20a%20quote%20for%20my%20project.'
    }
  },
  {
    keywords: ['timeline', 'how long', 'duration', 'time', 'delivery', 'deadline', 'turnaround', 'fast'],
    reply: `We work in lean, focused sprints with weekly deliverables you can test and review:
• **Design & Prototypes:** 3–7 days for clickable wireframes and user journeys.
• **MVP / Product Launch:** 2–4 weeks from kick-off to a functional product.
• **Full Website / Marketing Platform:** 2–3 weeks including SEO and CMS setup.
• **Custom Software & AI Systems:** 4–8 weeks depending on integration complexity.

You get direct async updates and a live staging preview to track progress in real time.`,
    suggestions: ['🚀 What does an MVP cost?', '🛠 What services do you offer?']
  },
  {
    keywords: ['service', 'services', 'what do you do', 'offer', 'skills', 'capabilities'],
    reply: `BITnWIT provides end-to-end digital engineering and growth across 8 core disciplines:
1. **Web Development:** Next.js, React, high-performance web applications.
2. **App Development:** Cross-platform mobile (Flutter / React Native) & progressive web apps.
3. **AI Integration:** Custom LLM workflows, conversational assistants, and automation.
4. **UI/UX Design:** User flows, interactive prototypes, and scalable design systems.
5. **SEO & Analytics:** Technical audits, organic search strategy, and conversion tracking.
6. **Custom Code:** Internal tooling, API integrations, and robust backend services.
7. **Branding & Strategy:** Visual identity, messaging, and market positioning.
8. **Digital Marketing:** Lead-generation campaigns and growth funnels.`,
    suggestions: ['🤖 How do you use AI?', '🚀 What does an MVP cost?', '🤝 Talk to White Rabbit on WhatsApp']
  },
  {
    keywords: ['ai', 'artificial intelligence', 'assistant', 'chatbot', 'llm', 'automation', 'claude', 'openai', 'gpt'],
    reply: `AI is baked into everything we build at BITnWIT! We help businesses implement practical AI that solves real problems:
• **Customer Support Assistants:** Like me! Intelligent, 24/7 guides trained on your business data.
• **Workflow Automation:** Replacing repetitive manual tasks with smart automations.
• **Intelligent Search & RAG:** Searching company knowledge bases, PDFs, and internal documents.
• **AI-Enhanced Products:** Building features with OpenAI, Anthropic Claude, and open-source models.`,
    suggestions: ['🛠 What services do you offer?', '🤝 Build an AI solution for my team'],
    action: {
      type: 'whatsapp',
      label: 'Discuss an AI Project',
      url: 'https://wa.me/918949728810?text=Hi%20BITnWIT!%20I%20am%20interested%20in%20building%20an%20AI%20solution%20for%20my%20business.'
    }
  },
  {
    keywords: ['team', 'founder', 'sandeep', 'prateek', 'who are you', 'about', 'leadership', 'contact'],
    reply: `BITnWIT is led by technical practitioners, not account managers:
• **Sandeep Kumar** (Founder) — Frontend engineering, mobile applications & product delivery (+91 89497 28810).
• **Prateek Makwana** (Technical Head) — Software architecture, backend systems & technical strategy (+91 96804 37434).

When you work with BITnWIT, you collaborate directly with the senior engineers building your project.`,
    suggestions: ['📞 Call Sandeep directly', '💬 Chat on WhatsApp', '🛠 What services do you offer?'],
    action: {
      type: 'whatsapp',
      label: 'Connect with Leadership',
      url: 'https://wa.me/918949728810?text=Hi%20Sandeep%20and%20Prateek!%20I%20would%20like%20to%20connect%20regarding%20a%20project.'
    }
  },
  {
    keywords: ['remote', 'location', 'where', 'india', 'office', 'worldwide', 'timezone', 'jaipur', 'delhi'],
    reply: `We are a remote-first technology studio based in India, operating Pan-India and internationally!
• **Pan-India Coverage:** Serving startups, businesses, and agencies across all states.
• **Worldwide Delivery:** Async-friendly documentation, daily updates, and dedicated overlap hours for international clients across Europe, the US, and Asia.`,
    suggestions: ['🚀 What does an MVP cost?', '🤝 Start a conversation']
  },
  {
    keywords: ['portfolio', 'work', 'projects', 'case study', 'examples', 'resumeiq'],
    reply: `Our recent work includes:
• **ResumeIQ (Live Product):** An intelligent AI resume workspace with ATS scoring, job description analysis, and live export (deployed at resume-iq-nine-ruby.vercel.app).
• **Enterprise Service Platforms:** Fast Next.js lead-generation portals.
• **Mobile MVP Prototypes:** Cross-platform mobile solutions built for rapid user validation.
• **AI Support Automations:** Self-hosted knowledge assistants and workflow pipelines.

You can inspect all case studies in our /work section!`,
    suggestions: ['🛠 What services do you offer?', '🤝 Discuss my project']
  }
];

function matchResponse(query: string) {
  const normalized = query.toLowerCase().trim();

  for (const item of KNOWLEDGE_RESPONSES) {
    if (item.keywords.some((k) => normalized.includes(k))) {
      return item;
    }
  }

  // Friendly fallback with lead capture
  return {
    reply: `That sounds like an exciting opportunity! While I'm sharing the essentials here, Sandeep and Prateek can give you exact technical recommendations and an actionable delivery plan.

Would you like to send your project brief directly to WhatsApp or have a quick 15-minute discovery call?`,
    suggestions: ['💬 Chat on WhatsApp', '🚀 What does an MVP cost?', '🛠 What services do you offer?'],
    action: {
      type: 'whatsapp' as const,
      label: 'Continue on WhatsApp with Sandeep',
      url: `https://wa.me/918949728810?text=${encodeURIComponent(`Hi BITnWIT! I was asking White Rabbit about: "${query}". Can we discuss this?`)}`
    }
  };
}

export default function WhiteRabbitChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'rabbit',
      text: "Hi! I'm White Rabbit 🐇, your AI guide at BITnWIT Technologies.\n\nAsk me anything about our services, pricing models, project timelines, or share your idea and I'll help you plan the next steps!",
      timestamp: 'Just now',
      suggestions: INITIAL_SUGGESTIONS
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Listen for global custom event to open the chat from any "Talk to White Rabbit" button
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };

    window.addEventListener('open-white-rabbit-chat', handleOpen);
    return () => window.removeEventListener('open-white-rabbit-chat', handleOpen);
  }, []);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const match = matchResponse(text);
      const rabbitMessage: Message = {
        id: `rabbit-${Date.now()}`,
        sender: 'rabbit',
        text: match.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: match.suggestions,
        action: match.action
      };

      setMessages((prev) => [...prev, rabbitMessage]);
      setIsTyping(false);
    }, 600);
  };

  const resetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'rabbit',
        text: "Conversation refreshed! 🐇 How can I assist you with your project today?",
        timestamp: 'Just now',
        suggestions: INITIAL_SUGGESTIONS
      }
    ]);
  };

  return (
    <>
      {/* ------------------------------------------------------------- FLOATING TRIGGER */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex items-center"
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open White Rabbit AI Assistant"
            className="group relative flex items-center gap-3 rounded-full border border-purple-300/60 bg-gradient-to-r from-ink via-[#4b1473] to-rabbit py-2.5 pl-3 pr-5 text-white shadow-2xl shadow-purple-900/40 transition-all duration-300 hover:scale-105 hover:shadow-purple-900/60 focus:outline-none focus:ring-4 focus:ring-rabbit/30"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/60 bg-white shadow-md">
              <Image
                src="/icon.png"
                alt="White Rabbit mascot"
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </span>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight tracking-wide text-white">White Rabbit AI</p>
              <p className="text-[10px] font-medium text-purple-200">Online • Ask anything</p>
            </div>
            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-signal" />
            </span>
          </button>
        </motion.div>
      )}

      {/* ------------------------------------------------------------- CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed z-50 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-ink/20 transition-all duration-300 ${
              isMinimized
                ? 'bottom-6 right-6 h-16 w-80'
                : 'bottom-4 right-4 h-[590px] max-h-[92vh] w-[92vw] sm:bottom-6 sm:right-6 sm:h-[620px] sm:w-[410px]'
            }`}
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-100 bg-gradient-to-r from-ink via-[#380e57] to-rabbit px-4 text-white">
              <div
                className="flex cursor-pointer items-center gap-3"
                onClick={() => isMinimized && setIsMinimized(false)}
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white shadow-inner">
                  <Image
                    src="/icon.png"
                    alt="White Rabbit mascot"
                    width={36}
                    height={36}
                    className="h-8 w-8 object-contain"
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-white bg-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                    White Rabbit AI
                    <span className="rounded-full bg-rabbit/40 px-2 py-0.5 text-[9px] font-semibold text-purple-200 uppercase tracking-wider">
                      Guide
                    </span>
                  </h3>
                  <p className="text-[11px] text-purple-200">BITnWIT Interactive Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-purple-200 transition hover:bg-white/10 hover:text-white"
                >
                  <AiOutlineReload size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized((v) => !v)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-purple-200 transition hover:bg-white/10 hover:text-white"
                >
                  <AiOutlineMinus size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-purple-200 transition hover:bg-white/10 hover:text-white"
                >
                  <AiOutlineClose size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            {!isMinimized && (
              <div className="flex h-[calc(100%-4rem)] flex-col bg-slate-50/50">
                {/* Messages stream */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm scroll-smooth">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'rounded-tr-xs bg-rabbit text-white'
                            : 'rounded-tl-xs border border-slate-200/80 bg-white text-ink'
                        }`}
                      >
                        <p className="whitespace-pre-line text-[13.5px]">{msg.text}</p>

                        {/* Action link if available */}
                        {msg.action && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100">
                            <a
                              href={msg.action.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#20ba59]"
                            >
                              <AiOutlineWhatsApp size={16} />
                              {msg.action.label}
                            </a>
                          </div>
                        )}
                      </div>

                      <span className="mt-1 px-1 text-[10px] text-slate-400">{msg.timestamp}</span>

                      {/* Suggestion Chips */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                          {msg.suggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => handleSend(suggestion)}
                              className="rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-semibold text-rabbit shadow-xs transition hover:border-rabbit hover:bg-purple-50 active:scale-95 text-left"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs border border-slate-200 bg-white px-4 py-3 shadow-sm w-fit">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-rabbit [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-rabbit [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-rabbit" />
                      <span className="ml-1 text-xs text-slate-400">White Rabbit is typing…</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Handoff Banner */}
                <div className="flex items-center justify-between border-t border-slate-200/80 bg-white px-3.5 py-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-600">Need immediate help?</span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/918949728810"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      <AiOutlineWhatsApp size={13} /> WhatsApp
                    </a>
                    <a
                      href="tel:+918949728810"
                      className="flex items-center gap-1 font-semibold text-rabbit hover:underline"
                    >
                      <AiOutlinePhone size={13} /> Call
                    </a>
                  </div>
                </div>

                {/* Input Area */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="border-t border-slate-200 bg-white p-2.5 sm:p-3"
                >
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask White Rabbit about services, timelines, pricing…"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-11 text-xs sm:text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-rabbit focus:bg-white focus:ring-2 focus:ring-rabbit/20"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      aria-label="Send message"
                      className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-xl bg-rabbit text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <AiOutlineSend size={14} />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
