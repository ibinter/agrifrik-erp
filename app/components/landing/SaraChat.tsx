"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, RefreshCw, User, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

type Msg = { role: "user" | "assistant"; content: string };

export default function SaraChat() {
  const { lang } = useLang();
  const s = t.sara;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setOpen(true);
    document.addEventListener("openSara", fn);
    return () => document.removeEventListener("openSara", fn);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: s.welcome[lang] }]);
    }
  }, [open, lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: msg }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/sara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.message || (lang === "fr" ? "Je n'ai pas pu répondre. Veuillez réessayer." : "I couldn't respond. Please try again.") }]);
    } catch {
      setMessages([...next, { role: "assistant", content: lang === "fr" ? "Une erreur est survenue. Veuillez réessayer." : "An error occurred. Please try again." }]);
    }
    setLoading(false);
  };

  const restart = () => {
    setMessages([{ role: "assistant", content: s.welcome[lang] }]);
    setInput("");
  };

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-2">
        {!open && (
          <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
            {s.tooltip[lang]}
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 relative"
          style={{ backgroundColor: "#1B5E20" }}
          aria-label="SARA AI Chat">
          {open ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: "#4CAF50" }} />
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-44 right-3 sm:right-5 z-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: "480px", border: "1px solid rgba(0,0,0,0.1)", width: "min(320px, calc(100vw - 24px))" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "linear-gradient(135deg, #0C1F0F, #1B5E20)" }}>
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
              <Image src="/logo.png" alt="SARA" width={32} height={32} className="rounded-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-sm">SARA</div>
              <div className="text-xs flex items-center gap-1" style={{ color: "#A5D6A7" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {s.online[lang]}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={restart} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all" title={s.restart[lang]}>
                <RotateCcw size={12} />
              </button>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: "#F9FAFB" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg overflow-hidden shrink-0 mt-0.5">
                    <Image src="/logo.png" alt="SARA" width={24} height={24} />
                  </div>
                )}
                <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                  ? "text-white rounded-br-sm"
                  : "text-gray-800 rounded-bl-sm"}`}
                  style={{ backgroundColor: m.role === "user" ? "#1B5E20" : "white", border: m.role === "assistant" ? "1px solid #E5E7EB" : "none" }}>
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "#E8F5E9" }}>
                    <User size={12} style={{ color: "#2E7D32" }} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-2">
                <div className="w-6 h-6 rounded-lg overflow-hidden shrink-0 mt-0.5">
                  <Image src="/logo.png" alt="SARA" width={24} height={24} />
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm text-sm text-gray-500 bg-white border border-gray-200">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 flex gap-2 overflow-x-auto" style={{ backgroundColor: "#F9FAFB" }}>
              {s.suggestions.map((q, i) => (
                <button key={i} onClick={() => send(q[lang])}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-green-400 hover:text-green-700 whitespace-nowrap"
                  style={{ borderColor: "#E5E7EB", color: "#6B7280" }}>
                  {q[lang]}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t" style={{ backgroundColor: "white", borderColor: "#E5E7EB" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder={s.placeholder[lang]}
              className="flex-1 text-sm px-3 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-green-200"
              style={{ borderColor: "#E5E7EB" }}
            />
            <button onClick={() => send()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40"
              style={{ backgroundColor: "#1B5E20" }}>
              <Send size={14} color="white" />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-2 text-center" style={{ backgroundColor: "#F9FAFB", borderTop: "1px solid #F0F0F0" }}>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>{s.disclaimer[lang]}</p>
          </div>
        </div>
      )}
    </>
  );
}
