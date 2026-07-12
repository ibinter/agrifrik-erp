"use client";
import { useEffect, useState } from "react";
import { Cookie, Settings, X } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

export default function CookieBanner() {
  const { lang } = useLang();
  const c = t.cookies;
  const [show, setShow] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [prefs, setPrefs] = useState({ necessary: true, preferences: false, stats: false, marketing: false });

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setTimeout(() => setShow(true), 1500);
  }, []);

  const accept = () => { localStorage.setItem("cookie_consent", "all"); setShow(false); };
  const reject = () => { localStorage.setItem("cookie_consent", "necessary"); setShow(false); };
  const save = () => { localStorage.setItem("cookie_consent", JSON.stringify(prefs)); setShow(false); };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 100%)", pointerEvents: "none" }}>
      <div className="max-w-2xl mx-auto rounded-2xl shadow-2xl p-6"
        style={{ backgroundColor: "white", border: "1px solid #E5E7EB", pointerEvents: "auto" }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#E8F5E9" }}>
            <Cookie size={18} style={{ color: "#2E7D32" }} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">{c.title[lang]}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{c.text[lang]}</p>
          </div>
        </div>

        {customize && (
          <div className="mb-4 space-y-2 rounded-xl p-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            {([
              { key: "necessary", label: c.necessary, disabled: true },
              { key: "preferences", label: c.preferences },
              { key: "stats", label: c.stats },
              { key: "marketing", label: c.marketing },
            ] as const).map(item => (
              <label key={item.key} className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-sm text-gray-700">{item.label[lang]}</span>
                <div className="relative">
                  <input type="checkbox"
                    checked={prefs[item.key]}
                    disabled={"disabled" in item && item.disabled}
                    onChange={e => setPrefs(p => ({ ...p, [item.key]: e.target.checked }))}
                    className="sr-only" />
                  <div
                    onClick={() => !("disabled" in item && item.disabled) && setPrefs(p => ({ ...p, [item.key]: !p[item.key] }))}
                    className="w-10 h-5 rounded-full transition-colors cursor-pointer"
                    style={{ backgroundColor: prefs[item.key] ? "#2E7D32" : "#D1D5DB" }}>
                    <div className="w-4 h-4 rounded-full bg-white shadow-sm transition-transform mt-0.5"
                      style={{ marginLeft: prefs[item.key] ? "22px" : "2px" }} />
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button onClick={accept}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
            style={{ backgroundColor: "#1B5E20" }}>
            {c.accept[lang]}
          </button>
          <button onClick={reject}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 border transition-all"
            style={{ borderColor: "#E5E7EB" }}>
            {c.reject[lang]}
          </button>
          {!customize ? (
            <button onClick={() => setCustomize(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-700 transition-all">
              <Settings size={14} />{c.settings[lang]}
            </button>
          ) : (
            <button onClick={save}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: "#E65100" }}>
              {c.save[lang]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
