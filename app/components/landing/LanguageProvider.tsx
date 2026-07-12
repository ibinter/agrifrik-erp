"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Lang } from "./translations";

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "fr", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  useEffect(() => {
    const stored = localStorage.getItem("agrifrik_lang") as Lang | null;
    if (stored === "fr" || stored === "en") setLang(stored);
  }, []);
  const set = (l: Lang) => { setLang(l); localStorage.setItem("agrifrik_lang", l); };
  return <LangCtx.Provider value={{ lang, setLang: set }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
