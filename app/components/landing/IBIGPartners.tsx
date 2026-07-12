"use client";
import { Check, ExternalLink } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function IBIGPartners() {
  const { lang } = useLang();
  const p = t.partners;
  return (
    <section className="py-20" style={{ background: "linear-gradient(135deg, #0C1F0F 0%, #1B5E20 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{ background: "rgba(230,81,0,0.25)", color: "#FF8A65", border: "1px solid rgba(230,81,0,0.3)" }}>
              IBIG PARTNERS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ textWrap: "balance" }}>
              {p.title[lang]}
            </h2>
            <p className="text-green-200 leading-relaxed mb-8">{p.sub[lang]}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://ibigpartners.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ backgroundColor: "#E65100", color: "white" }}>
                {p.cta[lang]}
                <ExternalLink size={14} />
              </a>
              <a href="https://ibigpartners.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.3)" }}>
                {p.link[lang]}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {p.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(76,175,80,0.25)" }}>
                  <Check size={14} style={{ color: "#81C784" }} />
                </div>
                <span className="text-sm text-green-100">{item[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
