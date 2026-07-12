"use client";
import Link from "next/link";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function FinalCTA() {
  const { lang } = useLang();
  const c = t.finalCta;
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #061209 0%, #0C2010 40%, #1B5E20 100%)" }}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-5" style={{ textWrap: "balance" }}>
          {c.title[lang]}
        </h2>
        <p className="text-green-200 text-lg mb-10 leading-relaxed">{c.sub[lang]}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: "white", color: "#1B5E20" }}>
            <ArrowRight size={18} />
            {c.start[lang]}
          </Link>
          <a href="#demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all hover:bg-white/10"
            style={{ border: "2px solid rgba(255,255,255,0.35)" }}>
            <Calendar size={16} />
            {c.demo[lang]}
          </a>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent("openSara"))}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105"
            style={{ backgroundColor: "#E65100", color: "white" }}>
            <MessageCircle size={16} />
            {c.sara[lang]}
          </button>
        </div>
      </div>
    </section>
  );
}
