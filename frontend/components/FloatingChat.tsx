'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Phone, Send, X } from 'lucide-react';
import { brand } from '@/lib/data';
import { getChatSessionId } from '@/lib/utils/chat-session';
import { useChatMutation } from '@/lib/queries/chat';
import WhatsAppIcon from './ui/WhatsAppIcon';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [sessionId] = useState(() => getChatSessionId());
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Namaste! Ask me about store timings, gold purity, orders, or exchanges.' },
  ]);
  const [input, setInput] = useState('');
  const chatMutation = useChatMutation();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !sessionId) return;

    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');

    chatMutation.mutate(
      { sessionId, message: text },
      {
        onSuccess: (res) => setMessages((prev) => [...prev, { from: 'bot', text: res.reply }]),
        onError: () =>
          setMessages((prev) => [...prev, { from: 'bot', text: "Sorry, I'm having trouble replying right now." }]),
      }
    );
  };

  return (
    <div className="fixed bottom-[74px] right-4 z-[60] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-neutral-200/70"
          >
            <div className="bg-maroon px-4 py-3">
              <p className="font-serif text-sm text-white">Namaste 🙏</p>
              <p className="mt-0.5 text-[11px] text-white/75">How can we help you today?</p>
            </div>

            <div ref={listRef} className="max-h-72 min-h-[160px] space-y-2 overflow-y-auto p-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                    m.from === 'user' ? 'ml-auto bg-maroon text-white' : 'bg-ivory text-neutral-700'
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {chatMutation.isPending && (
                <div className="max-w-[85%] rounded-2xl bg-ivory px-3 py-2 text-xs text-neutral-400">Typing…</div>
              )}
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-neutral-100 p-2.5">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="flex-1 rounded-full border border-neutral-200 px-3 py-2 text-xs outline-none focus:border-gold"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maroon text-white transition hover:bg-maroon-dark active:scale-90 disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

            <div className="space-y-2 border-t border-neutral-100 p-3">
              <a
                href={`https://wa.me/91${brand.phone.replace(/\D/g, '').slice(-10)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl bg-[#25D366]/10 px-3 py-2.5 text-xs font-medium text-[#128C4B] transition duration-200 hover:bg-[#25D366]/20 active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${brand.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 rounded-xl bg-maroon/5 px-3 py-2.5 text-xs font-medium text-maroon transition duration-200 hover:bg-maroon/10 active:scale-95"
              >
                <Phone className="h-4 w-4" />
                Call {brand.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        aria-label={open ? 'Close chat' : 'Chat with us'}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-maroon text-white shadow-xl transition duration-200 hover:bg-maroon-dark active:scale-95"
      >
        <span className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full bg-maroon/70" />
        <span className="relative">
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </span>
      </button>
    </div>
  );
}
