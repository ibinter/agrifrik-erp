"use client";
import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function PWABanner() {
  const { lang } = useLang();
  const p = t.pwa;
  const [show, setShow] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (localStorage.getItem("pwa_dismissed")) return;
    const ios = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    const standalone = (window.navigator as any).standalone;
    setIsIos(ios);
    if (ios && !standalone) { setTimeout(() => setShow(true), 3000); return; }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShow(true), 3000);
    };
    window.addEventListener("beforeinstallprompt", handler as any);
    return () => window.removeEventListener("beforeinstallprompt", handler as any);
  }, []);

  const install = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    setShow(false);
  };

  const dismiss = (permanent = false) => {
    if (permanent) localStorage.setItem("pwa_dismissed", "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-3 right-3 sm:left-4 sm:right-auto sm:w-80 z-50 rounded-2xl shadow-2xl p-4"
      style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: "#E8F5E9" }}>
          <Download size={18} style={{ color: "#2E7D32" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 mb-1">AGRIFRIK ERP</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {isIos ? p.iosInstructions[lang] : p.banner[lang]}
          </p>
        </div>
        <button onClick={() => dismiss(false)} className="text-gray-400 hover:text-gray-600 shrink-0">
          <X size={16} />
        </button>
      </div>
      {!isIos && (
        <div className="flex gap-2 mt-3">
          <button onClick={install}
            className="flex-1 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#1B5E20" }}>
            {p.install[lang]}
          </button>
          <button onClick={() => dismiss(false)}
            className="px-3 py-2 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-50 border"
            style={{ borderColor: "#E5E7EB" }}>
            {p.later[lang]}
          </button>
          <button onClick={() => dismiss(true)}
            className="px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
