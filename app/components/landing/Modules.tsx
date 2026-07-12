"use client";
import { useState } from "react";
import { Wheat, Package, ShoppingCart, BarChart3, Users, Brain } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

const CAT_ICONS = [Wheat, Package, ShoppingCart, BarChart3, Users, Brain];

export default function Modules() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const cats = t.modules.categories;

  return (
    <section id="modules" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#E65100" }}>Modules</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0C1F0F" }}>
            {t.modules.title[lang]}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t.modules.sub[lang]}</p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {cats.map((c, i) => {
            const Icon = CAT_ICONS[i];
            return (
              <button key={i} onClick={() => setActive(i)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor: active === i ? c.color : "#F4F8F4",
                  color: active === i ? "white" : "#4B5563",
                  border: active === i ? `2px solid ${c.color}` : "2px solid transparent",
                }}>
                <Icon size={14} />
                {c.name[lang]}
              </button>
            );
          })}
        </div>

        {/* Module items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cats[active].items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: cats[active].color + "18" }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cats[active].color }} />
              </div>
              <p className="text-sm font-semibold text-gray-800">{item[lang]}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#2E7D32" }}>
            {lang === "fr" ? "Voir tous les modules" : "See all modules"}
          </a>
        </div>
      </div>
    </section>
  );
}
