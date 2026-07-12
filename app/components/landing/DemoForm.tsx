"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { t } from "./translations";

const COUNTRIES = ["Côte d'Ivoire","Ghana","Sénégal","Mali","Burkina Faso","Cameroun","Nigeria","Guinée","Togo","Bénin","Kenya","Autre"];
const SECTORS = { fr: ["Cacao","Anacarde","Hévéa","Palmier à huile","Maraîchage","Élevage","Pisciculture","Coopérative","Export","Autre"], en: ["Cocoa","Cashew","Rubber","Palm oil","Horticulture","Livestock","Fish farming","Cooperative","Export","Other"] };

export default function DemoForm() {
  const { lang } = useLang();
  const d = t.demo;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", country: "", sector: "", users: "", message: "", consent: false });

  const set = (k: string, v: string | boolean) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const input = "w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-2 focus:ring-green-200";
  const style = { borderColor: "#E5E7EB", fontSize: "0.875rem" };

  return (
    <section id="demo" className="py-20" style={{ backgroundColor: "#F4F8F4" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#E65100" }}>Démonstration</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0C1F0F" }}>
              {d.title[lang]}
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">{d.sub[lang]}</p>
            <div className="space-y-4">
              {[
                { fr: "Présentation personnalisée selon votre exploitation", en: "Personalized presentation for your operation" },
                { fr: "Questions/réponses avec un expert AGRIFRIK", en: "Q&A with an AGRIFRIK expert" },
                { fr: "Démonstration des modules qui vous concernent", en: "Demo of the modules relevant to you" },
                { fr: "Accompagnement pour l'essai gratuit", en: "Guidance for your free trial" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#E8F5E9" }}>
                    <CheckCircle2 size={14} style={{ color: "#2E7D32" }} />
                  </div>
                  <span className="text-sm text-gray-600">{item[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {sent ? (
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#E8F5E9" }}>
                  <CheckCircle2 size={32} style={{ color: "#2E7D32" }} />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {lang === "fr" ? "Demande envoyée !" : "Request sent!"}
                </h3>
                <p className="text-gray-500 text-sm">{d.success[lang]}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input className={input} style={style} placeholder={d.name[lang]} value={form.name} onChange={e => set("name", e.target.value)} required />
                  <input className={input} style={style} placeholder={d.company[lang]} value={form.company} onChange={e => set("company", e.target.value)} required />
                </div>
                <input type="email" className={input} style={style} placeholder={d.email[lang]} value={form.email} onChange={e => set("email", e.target.value)} required />
                <input type="tel" className={input} style={style} placeholder={d.phone[lang]} value={form.phone} onChange={e => set("phone", e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                  <select className={input} style={style} value={form.country} onChange={e => set("country", e.target.value)}>
                    <option value="">{d.country[lang]}</option>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <select className={input} style={style} value={form.sector} onChange={e => set("sector", e.target.value)}>
                    <option value="">{d.sector[lang]}</option>
                    {SECTORS[lang].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <select className={input} style={style} value={form.users} onChange={e => set("users", e.target.value)}>
                  <option value="">{d.users[lang]}</option>
                  {["1-2","3-10","11-30","31-100","100+"].map(u => <option key={u}>{u}</option>)}
                </select>
                <textarea className={input} style={{ ...style, resize: "none" }} rows={3}
                  placeholder={d.message[lang]} value={form.message} onChange={e => set("message", e.target.value)} />
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.consent} onChange={e => set("consent", e.target.checked)}
                    className="mt-0.5 rounded accent-green-700 cursor-pointer" required />
                  <span className="text-xs text-gray-500">{d.consent[lang]}</span>
                </label>
                <button type="submit" disabled={loading || !form.consent}
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-[1.01] disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#1B5E20" }}>
                  {loading ? (lang === "fr" ? "Envoi..." : "Sending...") : (
                    <><Send size={16} />{d.submit[lang]}</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
