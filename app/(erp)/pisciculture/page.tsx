"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Fish,
  Waves,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Thermometer,
  Wind,
} from "lucide-react";

/* ─── TYPES ─── */
type TabId = "bassins" | "alimentation" | "qualite" | "productions";

/* ─── KPI ─── */
function Kpi({ label, value, icon: Icon, color, bg }: {
  label: string; value: string; icon: React.ElementType; color: string; bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: bg }}>
        <Icon size={18} color={color} strokeWidth={1.8} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

/* ─── DATA BASSINS ─── */
const bassins = [
  {
    id: "BAS-01", surface: "500 m²", espece: "Tilapia Oreochromis niloticus",
    effectif: 2800, stade: "Grossissement", poidsMoy: "180 g",
    dateEmpoiss: "10/02/2025", recolte: "20/08/2025", mortalite: "2,1%", mortOk: true,
  },
  {
    id: "BAS-02", surface: "500 m²", espece: "Tilapia",
    effectif: 3200, stade: "Grossissement", poidsMoy: "120 g",
    dateEmpoiss: "15/03/2025", recolte: "15/09/2025", mortalite: "1,8%", mortOk: true,
  },
  {
    id: "BAS-03", surface: "300 m²", espece: "Clarias (silure africain)",
    effectif: 1400, stade: "Pré-grossissement", poidsMoy: "60 g",
    dateEmpoiss: "01/05/2025", recolte: "Jan 2026", mortalite: "1,2%", mortOk: true,
  },
  {
    id: "BAS-04", surface: "200 m²", espece: "Clarias",
    effectif: 840, stade: "Alevins", poidsMoy: "8 g",
    dateEmpoiss: "15/06/2025", recolte: "Mar 2026", mortalite: "3,4%", mortOk: false,
  },
];

const eauParams = [
  { id: "BAS-01", temp: "28°C", o2: "6,2 mg/L", ph: "7,1", transp: "35 cm", verdict: "Optimal", verdictColor: "bg-green-50 text-green-700", alert: false },
  { id: "BAS-02", temp: "29°C", o2: "5,8 mg/L", ph: "7,3", transp: "32 cm", verdict: "Bon", verdictColor: "bg-green-50 text-green-700", alert: false },
  { id: "BAS-03", temp: "30°C", o2: "5,4 mg/L", ph: "7,0", transp: "28 cm", verdict: "O₂ limite — aérer", verdictColor: "bg-yellow-50 text-yellow-700", alert: true },
  { id: "BAS-04", temp: "31°C", o2: "4,8 mg/L", ph: "6,8", transp: "22 cm", verdict: "O₂ faible — aération urgente", verdictColor: "bg-red-50 text-red-700", alert: true },
];

function ContenuBassins() {
  return (
    <div className="space-y-6">
      {/* Tableau bassins */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">État des bassins</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Bassin", "Surface", "Espèce", "Effectif", "Stade", "Poids moy.", "Empoissonnement", "Récolte prévue", "Mortalité"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bassins.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-900">{b.id}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.surface}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{b.espece}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">{b.effectif.toLocaleString("fr-FR")}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{b.stade}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">{b.poidsMoy}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.dateEmpoiss}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{b.recolte}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className={`font-medium ${b.mortOk ? "text-green-700" : "text-yellow-700"}`}>
                      {b.mortalite} {b.mortOk ? "✅" : "🟡"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paramètres eau */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Paramètres eau — relevés du 09/07/2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Bassin", "T°C eau", "Oxygène dissous", "pH", "Transparence", "Verdict"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {eauParams.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-900">{e.id}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="flex items-center gap-1 text-gray-600"><Thermometer size={11} />{e.temp}</span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="flex items-center gap-1 text-gray-600"><Wind size={11} />{e.o2}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{e.ph}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{e.transp}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${e.verdictColor}`}>
                      {e.alert ? <AlertTriangle size={10} className="inline mr-1" /> : <CheckCircle size={10} className="inline mr-1" />}
                      {e.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alertes */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-800">BAS-04 — Oxygène dissous critique : 4,8 mg/L</p>
            <p className="text-xs text-red-700 mt-0.5">Aération urgente requise. Norme minimale : 5,0 mg/L. Risque de mortalité élevée sur alevins.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
          <AlertTriangle size={18} className="text-yellow-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">BAS-03 — Oxygène limite : 5,4 mg/L</p>
            <p className="text-xs text-yellow-700 mt-0.5">Prévoir aération complémentaire. Température à surveiller (30°C).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ONGLET ALIMENTATION ─── */
const aliments = [
  { bassin: "BAS-01", aliment: "Granulé flottant 3mm", proteines: "32%", ration: "2,5% masse — 12,6 kg/j", freq: "3×/j", coutMois: "283 500 XOF" },
  { bassin: "BAS-02", aliment: "Granulé flottant 3mm", proteines: "32%", ration: "2,8% masse — 10,8 kg/j", freq: "3×/j", coutMois: "243 000 XOF" },
  { bassin: "BAS-03", aliment: "Granulé 2mm",          proteines: "35%", ration: "3% masse — 2,5 kg/j",    freq: "4×/j", coutMois: "67 500 XOF" },
  { bassin: "BAS-04", aliment: "Starter alevins",      proteines: "45%", ration: "5% masse — 0,34 kg/j",  freq: "5×/j", coutMois: "9 180 XOF" },
];

function ContenuAlimentation() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Programme d&apos;alimentation</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Bassin", "Aliment", "Protéines", "Ration/j", "Fréquence", "Coût/mois"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {aliments.map((a) => (
                <tr key={a.bassin} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-900">{a.bassin}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{a.aliment}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">{a.proteines}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{a.ration}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{a.freq}</td>
                  <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>{a.coutMois}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
        <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">Fabrication partielle sur place</p>
          <p className="text-xs text-green-700 mt-0.5">
            Aliment fabriqué en partie sur site (coproduits : son de riz + farine d&apos;os).
            Réduction de coût estimée à <strong>35%</strong> vs. achat extérieur.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── ONGLET QUALITÉ EAU (résumé) ─── */
function ContenuQualite() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {eauParams.map((e) => (
          <div key={e.id} className={`rounded-2xl border p-5 ${e.alert ? "border-orange-200 bg-orange-50" : "border-gray-100 bg-white"}`}>
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-900 text-sm">{e.id}</p>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${e.verdictColor}`}>
                {e.verdict}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Température", val: e.temp, icon: Thermometer },
                { label: "O₂ dissous", val: e.o2, icon: Wind },
                { label: "pH", val: e.ph, icon: Waves },
                { label: "Transparence", val: e.transp, icon: Fish },
              ].map(({ label, val, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={13} className="text-gray-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400">{label}</p>
                    <p className="text-xs font-semibold text-gray-800">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ONGLET PRODUCTIONS ─── */
const previsions = [
  { bassin: "BAS-01", date: "20/08/2025", effectif: "2 741", poidsMoy: "350 g", prod: "959 kg",   prix: "1 500 XOF/kg", ca: "1,44 M XOF", total: false },
  { bassin: "BAS-02", date: "15/09/2025", effectif: "3 142", poidsMoy: "320 g", prod: "1 005 kg", prix: "1 500 XOF/kg", ca: "1,51 M XOF", total: false },
  { bassin: "BAS-03", date: "Jan 2026",   effectif: "1 383", poidsMoy: "800 g", prod: "1 106 kg", prix: "1 800 XOF/kg", ca: "1,99 M XOF", total: false },
  { bassin: "BAS-04", date: "Mar 2026",   effectif: "814",   poidsMoy: "700 g", prod: "570 kg",   prix: "1 800 XOF/kg", ca: "1,03 M XOF", total: false },
  { bassin: "TOTAL",  date: "",           effectif: "",       poidsMoy: "",      prod: "3 640 kg", prix: "",             ca: "5,97 M XOF", total: true },
];

const historiqueVentes = [
  { date: "09/04/2025", bassin: "BAS-01 (clôturé)", espece: "Tilapia",        masse: "875 kg",   prix: "1 500 XOF/kg", ca: "1 312 500 XOF" },
  { date: "02/03/2025", bassin: "BAS-02 (clôturé)", espece: "Tilapia",        masse: "960 kg",   prix: "1 500 XOF/kg", ca: "1 440 000 XOF" },
  { date: "18/01/2025", bassin: "BAS-03 (clôturé)", espece: "Clarias silure", masse: "1 120 kg", prix: "1 800 XOF/kg", ca: "2 016 000 XOF" },
  { date: "05/12/2024", bassin: "BAS-01 (clôturé)", espece: "Tilapia",        masse: "760 kg",   prix: "1 400 XOF/kg", ca: "1 064 000 XOF" },
  { date: "20/10/2024", bassin: "BAS-02 (clôturé)", espece: "Clarias silure", masse: "640 kg",   prix: "1 800 XOF/kg", ca: "1 152 000 XOF" },
];

function ContenuProductions() {
  return (
    <div className="space-y-6">
      {/* Prévisions */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Prévisions de récolte 2025–2026</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Bassin", "Date récolte", "Effectif prévu", "Poids moy. prévu", "Production prévue", "Prix/kg", "CA estimé"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {previsions.map((p, i) => (
                <tr key={i} className={`transition-colors ${p.total ? "bg-green-50 font-semibold" : "hover:bg-gray-50"}`}>
                  <td className={`px-4 py-3 text-xs ${p.total ? "font-bold text-gray-900" : "font-mono font-semibold text-gray-900"}`}>{p.bassin}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.date}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.effectif}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.poidsMoy}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-900">{p.prod}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.prix}</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: "#2E7D32" }}>{p.ca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historique ventes */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Historique des ventes 2024–2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Date", "Bassin", "Espèce", "Masse récoltée", "Prix/kg", "CA"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {historiqueVentes.map((v, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-500">{v.date}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.bassin}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.espece}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-900">{v.masse}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{v.prix}</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: "#2E7D32" }}>{v.ca}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── TABS CONFIG ─── */
const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "bassins",       label: "Bassins",       icon: Fish },
  { id: "alimentation",  label: "Alimentation",  icon: Waves },
  { id: "qualite",       label: "Qualité eau",   icon: Thermometer },
  { id: "productions",   label: "Productions",   icon: TrendingUp },
];

/* ─── PAGE ─── */
export default function PisciculturePage() {
  const [activeTab, setActiveTab] = useState<TabId>("bassins");

  return (
    <div>
      <Topbar title="Pisciculture" breadcrumb={["Production", "Pisciculture"]} />

      <div className="p-6 space-y-6">

        {/* KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Kpi label="Bassins actifs"     value="4"          icon={Fish}       color="#1565C0" bg="#E3F2FD" />
          <Kpi label="Poissons total"     value="8 240"      icon={Waves}      color="#0277BD" bg="#E1F5FE" />
          <Kpi label="Production prévue"  value="3,2 t"      icon={TrendingUp} color="#2E7D32" bg="#E8F5E9" />
          <Kpi label="CA estimé"          value="4,8 M XOF"  icon={DollarSign} color="#E65100" bg="#FFF3E0" />
        </div>

        {/* Onglets */}
        <div className="flex gap-1 border-b border-gray-100 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === t.id
                    ? "border-[#2E7D32] text-[#2E7D32]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Contenu */}
        {activeTab === "bassins"      && <ContenuBassins />}
        {activeTab === "alimentation" && <ContenuAlimentation />}
        {activeTab === "qualite"      && <ContenuQualite />}
        {activeTab === "productions"  && <ContenuProductions />}

      </div>
    </div>
  );
}
