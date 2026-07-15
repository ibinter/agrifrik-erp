"use client";
import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function Pricing() {
  const { lang } = useLang();
  const [annual, setAnnual] = useState(false);
  const p = t.pricing;

  return (
    <section id="tarifs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#E65100" }}>Tarifs</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0C1F0F" }}>
            {p.title[lang]}
          </h2>
          <p className="text-gray-500 mb-8">{p.sub[lang]}</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ backgroundColor: "#F4F8F4", border: "1px solid #C8E6C9" }}>
            <button onClick={() => setAnnual(false)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ backgroundColor: !annual ? "white" : "transparent", color: !annual ? "#1B5E20" : "#6B7280", boxShadow: !annual ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
              {p.monthly[lang]}
            </button>
            <button onClick={() => setAnnual(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{ backgroundColor: annual ? "white" : "transparent", color: annual ? "#1B5E20" : "#6B7280", boxShadow: annual ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
              {p.annual[lang]}
              <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
                {p.save[lang]}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {p.plans.map((plan) => (
            <div key={plan.name}
              className={`rounded-2xl p-5 sm:p-6 flex flex-col transition-all ${plan.featured ? "shadow-2xl ring-2 ring-[#2E7D32]/30" : "border border-gray-100 hover:shadow-md"}`}
              style={plan.featured ? { background: "linear-gradient(155deg, #0C2010 0%, #1B5E20 50%, #2E7D32 100%)" } : { backgroundColor: "white" }}>
              {plan.featured && (
                <div className="text-xs font-bold px-3 py-1 rounded-full self-start mb-4"
                  style={{ backgroundColor: "#E65100", color: "white" }}>
                  ⭐ {p.popular[lang]}
                </div>
              )}
              <div className={`text-sm font-bold mb-1 ${plan.featured ? "text-green-300" : "text-gray-500"}`}>
                {plan.name}
              </div>
              <div className={`text-xs mb-4 ${plan.featured ? "text-green-400" : "text-gray-400"}`}>
                {typeof plan.target === "object" ? plan.target[lang] : plan.target}
              </div>
              <div className={`text-3xl font-extrabold mb-0.5 tabular-nums ${plan.featured ? "text-white" : "text-gray-900"}`}>
                {annual ? plan.price.annual : plan.price.monthly}
                <span className={`text-sm font-normal ml-1 ${plan.featured ? "text-green-300" : "text-gray-400"}`}>XOF/mois</span>
              </div>
              <div className={`text-xs px-2 py-1 rounded-lg mb-6 self-start font-semibold ${plan.featured ? "bg-white/15 text-green-200" : "bg-green-50 text-green-700"}`}>
                🎁 {p.trial[lang]}
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="shrink-0 mt-0.5" style={{ color: plan.featured ? "#86EFAC" : "#2E7D32" }} />
                    <span style={{ color: plan.featured ? "#D1FAE5" : "#4B5563" }}>{f[lang]}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login"
                className={`block text-center py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 ${plan.featured ? "bg-white text-green-900 hover:bg-green-50" : "border-2 hover:border-green-600 hover:text-green-700"}`}
                style={!plan.featured ? { borderColor: "#E5E7EB", color: "#374151" } : {}}>
                {p.cta[lang]}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          {lang === "fr"
            ? "Paiement par Mobile Money (Orange, MTN), virement BCEAO ou carte. Tarifs en XOF."
            : "Payment by Mobile Money (Orange, MTN), BCEAO transfer or card. Prices in XOF."}
        </p>
      </div>
    </section>
  );
}
