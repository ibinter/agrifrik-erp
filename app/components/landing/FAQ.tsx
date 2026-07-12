"use client";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function FAQ() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="aide" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#E65100" }}>FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#0C1F0F" }}>
            {t.faq.title[lang]}
          </h2>
        </div>
        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <div key={i} className="rounded-2xl border overflow-hidden transition-all"
              style={{ borderColor: open === i ? "#A5D6A7" : "#E5E7EB" }}>
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left"
                style={{ backgroundColor: open === i ? "#F1F8E9" : "white" }}
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-semibold text-gray-800 text-sm pr-4">{item.q[lang]}</span>
                <ChevronDown size={16} className="shrink-0 transition-transform" style={{ color: "#2E7D32", transform: open === i ? "rotate(180deg)" : "none" }} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t" style={{ borderColor: "#C8E6C9", backgroundColor: "#F9FFF9" }}>
                  <p className="pt-4">{item.a[lang]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500 mb-4">
            {lang === "fr" ? "Vous avez une autre question ?" : "Have another question?"}
          </p>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent("openSara"))}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#2E7D32" }}>
            <MessageCircle size={16} />
            {t.faq.askSara[lang]}
          </button>
        </div>
      </div>
    </section>
  );
}
