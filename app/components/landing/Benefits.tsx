"use client";
import { Clock, TrendingUp, Shield, Globe, Users, BarChart3, Zap, CheckCircle } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  Clock, TrendingUp, Shield, Globe, Users, BarChart3, Zap, CheckCircle,
};

export default function Benefits() {
  const { lang } = useLang();
  return (
    <section className="py-20" style={{ background: "linear-gradient(180deg, #F4F8F4 0%, white 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#E65100" }}>Bénéfices</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#0C1F0F", textWrap: "balance" }}>
            {t.benefits.title[lang]}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.benefits.items.map((b, i) => {
            const Icon = ICON_MAP[b.icon];
            return (
              <div key={i} className="rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#E8F5E9" }}>
                  <Icon size={22} color="#2E7D32" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{b.title[lang]}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{b.desc[lang]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
