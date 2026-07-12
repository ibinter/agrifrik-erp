"use client";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function Problems() {
  const { lang } = useLang();
  return (
    <section id="fonctionnalites" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#E65100" }}>Problèmes résolus</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0C1F0F", textWrap: "balance" }}>
            {t.problems.title[lang]}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.problems.sub[lang]}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.problems.items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 flex items-start gap-3" style={{ backgroundColor: "#FFF5F5" }}>
                <XCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#EF5350" }} />
                <p className="text-sm text-gray-600 leading-relaxed">{item.before[lang]}</p>
              </div>
              <div className="flex items-center justify-center py-2" style={{ backgroundColor: "#F0F4F0" }}>
                <ArrowRight size={14} style={{ color: "#2E7D32" }} />
              </div>
              <div className="p-5 flex items-start gap-3" style={{ backgroundColor: "#F1F8E9" }}>
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "#2E7D32" }} />
                <p className="text-sm font-medium leading-relaxed" style={{ color: "#1B5E20" }}>{item.after[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
