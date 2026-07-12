"use client";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function HowItWorks() {
  const { lang } = useLang();
  const steps = t.howItWorks.steps;
  return (
    <section className="py-20" style={{ backgroundColor: "#F4F8F4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#E65100" }}>
            {lang === "fr" ? "Démarrage" : "Getting started"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0C1F0F" }}>
            {t.howItWorks.title[lang]}
          </h2>
          <p className="text-gray-500">{t.howItWorks.sub[lang]}</p>
        </div>
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5"
            style={{ backgroundColor: "#C8E6C9", zIndex: 0 }} />
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 font-extrabold text-xl text-white shadow-lg"
                  style={{ backgroundColor: "#2E7D32", border: "4px solid #F4F8F4" }}>
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm">{step.title[lang]}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <a href="/login"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#E65100" }}>
            {lang === "fr" ? "Créer mon compte gratuit" : "Create my free account"}
          </a>
        </div>
      </div>
    </section>
  );
}
