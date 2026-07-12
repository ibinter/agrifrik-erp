"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

const SLIDES = t.hero.slides;
const INTERVAL = 5500;

export default function HeroSlider() {
  const { lang } = useLang();
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");

  const go = useCallback((idx: number, dir: "left" | "right" = "right") => {
    setAnimDir(dir);
    setCur((idx + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go((cur + 1) % SLIDES.length, "right"), INTERVAL);
    return () => clearInterval(id);
  }, [cur, paused, go]);

  const slide = SLIDES[cur];

  return (
    <section
      className="relative overflow-hidden select-none"
      style={{ minHeight: "92vh", background: "linear-gradient(145deg, #061209 0%, #0C2010 35%, #1B5E20 70%, #2E7D32 100%)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Radial glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #A5D6A7, transparent)", transform: "translate(30%, -30%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12 pt-20 pb-24" style={{ minHeight: "92vh" }}>
        {/* Left column */}
        <div className="flex-1 flex flex-col items-start text-left max-w-2xl">
          {/* Badge */}
          <div key={`badge-${cur}`}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 animate-fade-in"
            style={{ background: "rgba(255,255,255,0.12)", color: "#C8E6C9", border: "1px solid rgba(255,255,255,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
            {slide.badge[lang]}
          </div>

          {/* Title */}
          <h1 key={`title-${cur}`}
            className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white leading-[1.08] mb-6 animate-slide-up"
            style={{ textWrap: "balance" }}>
            {slide.title[lang]}
          </h1>

          {/* Sub */}
          <p key={`sub-${cur}`}
            className="text-base sm:text-lg text-green-100 leading-relaxed mb-10 max-w-xl animate-slide-up"
            style={{ animationDelay: "80ms" }}>
            {slide.sub[lang]}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/login"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: "white", color: "#1B5E20" }}>
              {slide.cta1[lang]}
              <ArrowRight size={18} />
            </Link>
            <a href="#demo"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base transition-all hover:bg-white/10"
              style={{ border: "2px solid rgba(255,255,255,0.4)", color: "white" }}>
              {slide.cta2[lang]}
            </a>
          </div>

          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            ✓ {lang === "fr" ? "Sans carte bancaire" : "No credit card"} &nbsp;·&nbsp;
            ✓ {lang === "fr" ? "30 jours gratuits" : "30 days free"} &nbsp;·&nbsp;
            ✓ {lang === "fr" ? "Support en français" : "French support"}
          </p>
        </div>

        {/* Right column — dashboard SVG mockup */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
              style={{ background: "linear-gradient(135deg, #4CAF50, #1B5E20)" }} />
            <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg"
              className="relative w-full rounded-2xl shadow-2xl">
              <rect width="560" height="400" rx="14" fill="#111827" />
              <rect width="560" height="40" rx="14" fill="#1F2937" />
              <rect y="26" width="560" height="14" fill="#1F2937" />
              <circle cx="20" cy="20" r="6" fill="#FF5F57" /><circle cx="38" cy="20" r="6" fill="#FFBD2E" /><circle cx="56" cy="20" r="6" fill="#28C840" />
              <rect x="74" y="11" width="340" height="18" rx="9" fill="#374151" />
              <text x="244" y="24" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace">agrifrik.ibigsoft.com/dashboard</text>
              {/* Sidebar */}
              <rect y="40" width="80" height="360" fill="#0F2416" />
              <rect x="14" y="56" width="52" height="18" rx="5" fill="#2E7D32" />
              <text x="40" y="69" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">AGRI</text>
              {[82,108,134,160,186,212,238,264,290,316,342,368].map((y,i)=>(
                <g key={i}>
                  <rect x="14" y={y} width="52" height="20" rx="5" fill={i===0?"#2E7D32":"rgba(255,255,255,0.06)"} />
                  <rect x="20" y={y+6} width="14" height="2.5" rx="1" fill={i===0?"white":"#4CAF50"} />
                  <rect x="20" y={y+11} width="9" height="2" rx="1" fill={i===0?"rgba(255,255,255,0.6)":"rgba(76,175,80,0.4)"} />
                </g>
              ))}
              {/* Main area */}
              <rect x="80" y="40" width="480" height="360" fill="#F8FBF8" />
              <text x="96" y="64" fill="#1B5E20" fontSize="15" fontWeight="bold">Tableau de Bord</text>
              <text x="96" y="78" fill="#6B7280" fontSize="8">Bienvenue · Campagne 2025-2026</text>
              <rect x="96" y="86" width="448" height="1" fill="#E5E7EB" />
              {/* KPIs */}
              {[
                {l:"Cultures actives",v:"143 ha",c:"#2E7D32",b:"#E8F5E9"},
                {l:"CA mensuel",v:"12,4 M XOF",c:"#1565C0",b:"#E3F2FD"},
                {l:"Employés",v:"287",c:"#E65100",b:"#FFF3E0"},
                {l:"Parcelles",v:"8",c:"#6A1B9A",b:"#F3E5F5"},
              ].map((k,i)=>(
                <g key={i}>
                  <rect x={96+i*116} y="96" width="108" height="56" rx="8" fill="white" />
                  <rect x={96+i*116} y="96" width="108" height="56" rx="8" fill={k.b} opacity="0.6" />
                  <text x={102+i*116} y="112" fill="#6B7280" fontSize="7">{k.l}</text>
                  <text x={102+i*116} y="131" fill={k.c} fontSize="14" fontWeight="bold">{k.v}</text>
                  <text x={102+i*116} y="143" fill="#9CA3AF" fontSize="6">↑ +8% ce mois</text>
                </g>
              ))}
              {/* Chart */}
              <rect x="96" y="162" width="280" height="110" rx="8" fill="white" />
              <text x="108" y="178" fill="#374151" fontSize="9" fontWeight="600">Rendement mensuel (t)</text>
              {[38,54,42,66,50,74,60].map((h,i)=>(
                <g key={i}>
                  <rect x={116+i*34} y={252-h} width="22" height={h} rx="3" fill={i===6?"#E65100":"#A5D6A7"} />
                  <text x={127+i*34} y="262" textAnchor="middle" fill="#9CA3AF" fontSize="6">{["J","F","M","A","M","J","J"][i]}</text>
                </g>
              ))}
              <polyline points="127,228 161,208 195,222 229,196 263,212 297,186 331,200" fill="none" stroke="#1B5E20" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
              {/* Table */}
              <rect x="386" y="162" width="158" height="110" rx="8" fill="white" />
              <text x="398" y="178" fill="#374151" fontSize="9" fontWeight="600">Alertes récentes</text>
              {[
                {t:"Stock bas - Engrais NPK",c:"#E65100"},
                {t:"LOT-2026-012 certifié",c:"#2E7D32"},
                {t:"Facture #0124 due",c:"#1565C0"},
                {t:"Météo: pluie prévue J+2",c:"#6A1B9A"},
              ].map((r,i)=>(
                <g key={i}>
                  <circle cx="398" cy={196+i*19} r="3" fill={r.c} />
                  <text x="406" y={200+i*19} fill="#374151" fontSize="7">{r.t}</text>
                </g>
              ))}
              {/* Bottom bar */}
              <rect x="96" y="282" width="448" height="1" fill="#E5E7EB" />
              <text x="96" y="298" fill="#6B7280" fontSize="8">🔔 3 nouvelles alertes · Synchronisé il y a 2 min</text>
              {/* Sparkline */}
              <polyline points="96,340 136,326 176,336 216,314 256,322 296,308 336,318 376,300 416,312 456,296 496,304 536,288" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
              <rect x="96" y="355" width="448" height="35" rx="6" fill="rgba(232,245,233,0.6)" />
              <text x="320" y="377" textAnchor="middle" fill="#2E7D32" fontSize="8" fontWeight="600">AGRIFRIK ERP — Toujours en avance sur votre campagne</text>
            </svg>
            {/* LIVE badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: "#2E7D32", boxShadow: "0 0 0 3px rgba(46,125,50,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />LIVE
            </div>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button onClick={() => go(cur - 1, "left")}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => go(i, i > cur ? "right" : "left")}
              className="transition-all rounded-full"
              style={{ width: i === cur ? 24 : 8, height: 8, backgroundColor: i === cur ? "#E65100" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
        <button onClick={() => go(cur + 1, "right")}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
          <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        .animate-fade-in { animation: fadeIn 0.4s ease both }
        .animate-slide-up { animation: slideUp 0.5s ease both }
      `}</style>
    </section>
  );
}
