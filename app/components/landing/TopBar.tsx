"use client";
import { X, Phone, Globe } from "lucide-react";
import { useState } from "react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function TopBar() {
  const { lang, setLang } = useLang();
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="relative flex items-center justify-center gap-6 px-4 py-2 text-xs font-medium text-white"
      style={{ backgroundColor: "#0C1F0F" }}>
      <span className="hidden sm:inline">{t.topbar[lang]}</span>
      <span className="sm:hidden">Essai gratuit 30 jours · IBIG Soft</span>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
        <button
          onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          className="flex items-center gap-1 px-2 py-0.5 rounded border border-white/20 hover:border-white/50 transition-colors"
        >
          <Globe size={10} />
          <span>{lang === "fr" ? "EN" : "FR"}</span>
        </button>
        <button onClick={() => setVisible(false)} className="opacity-60 hover:opacity-100 transition-opacity">
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
