"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Wallet,
  Building2,
  TrendingUp,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Star,
} from "lucide-react";

// ─── KPI ───────────────────────────────────────────────────────────────────
const kpis = [
  { label: "Trésorerie totale", value: "35 920 000 XOF", accent: "#2E7D32", bg: "#E8F5E9", icon: Wallet },
  { label: "BICICI c/c", value: "34 200 000 XOF", accent: "#1565C0", bg: "#E3F2FD", icon: Building2 },
  { label: "Caisse Soubré", value: "1 240 000 XOF", accent: "#E65100", bg: "#FFF3E0", icon: Wallet },
  { label: "Orange Money", value: "480 000 XOF", accent: "#F57C00", bg: "#FFF8E1", icon: Smartphone },
  { label: "Variation mois", value: "+4 200 000 XOF", accent: "#2E7D32", bg: "#E8F5E9", icon: TrendingUp, positive: true },
];

// ─── COMPTES ────────────────────────────────────────────────────────────────
const comptes = [
  {
    banque: "BICICI CI",
    type: "Compte courant",
    numero: "n°0012-01847-00204847421-01",
    iban: "CI93 01 23456 01234567890 12",
    solde: "34 200 000 XOF",
    detail1: "Dernière op. : 07/07/2025 — Encaissement Olam 18 240 000 XOF",
    detail2: "Découvert autorisé : 10 000 000 XOF",
    accent: "#1565C0",
    bg: "#E3F2FD",
    icon: Building2,
  },
  {
    banque: "BICICI CI",
    type: "Compte épargne",
    numero: "n°0012-01847-00912345678-01",
    iban: "",
    solde: "0 XOF",
    detail1: "Non utilisé — prévu comme réserve de tréso 2026",
    detail2: "",
    accent: "#6A1B9A",
    bg: "#F3E5F5",
    icon: Building2,
  },
  {
    banque: "Caisse Soubré",
    type: "Caisse physique",
    numero: "",
    iban: "",
    solde: "1 240 000 XOF",
    detail1: "Responsable : Adjoua Messou",
    detail2: "Dernière MAJ : 10/07/2025",
    accent: "#E65100",
    bg: "#FFF3E0",
    icon: Wallet,
  },
  {
    banque: "Orange Money CI",
    type: "Mobile Money",
    numero: "+225 07 00 00 00",
    iban: "",
    solde: "480 000 XOF",
    detail1: "Usage : paiements terrains & petits fournisseurs locaux",
    detail2: "",
    accent: "#F57C00",
    bg: "#FFF8E1",
    icon: Smartphone,
  },
];

// ─── FLUX DU MOIS ───────────────────────────────────────────────────────────
const fluxMois = [
  { label: "Encaissements reçus", montant: "+18 240 000 XOF", detail: "1 virement Olam", color: "#2E7D32" },
  { label: "Décaissements", montant: "-14 040 000 XOF", detail: "Salaires 3 840k + KCl 2 400k + fournisseurs 7 800k", color: "#D32F2F" },
  { label: "Flux net", montant: "+4 200 000 XOF", detail: "Juillet 2025 (au 11/07)", color: "#2E7D32", bold: true },
];

// ─── LINE CHART TRÉSO 12 MOIS ────────────────────────────────────────────────
const tresoData = [
  { mois: "Jan", val: 28.4, prev: false },
  { mois: "Fév", val: 22.8, prev: false },
  { mois: "Mar", val: 31.6, prev: false },
  { mois: "Avr", val: 48.2, prev: false },
  { mois: "Mai", val: 38.4, prev: false },
  { mois: "Jun", val: 31.7, prev: false },
  { mois: "Jul", val: 35.9, prev: false },
  { mois: "Aoû", val: 39.3, prev: true },
  { mois: "Sep", val: 35.5, prev: true },
  { mois: "Oct", val: 51.5, prev: true },
  { mois: "Nov", val: 65.7, prev: true },
  { mois: "Déc", val: 56.9, prev: true },
];

function TresoChart() {
  const W = 680, H = 220, padL = 52, padR = 20, padT = 20, padB = 40;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const vals = tresoData.map((d) => d.val);
  const minV = 15, maxV = 75;
  const n = tresoData.length;

  const x = (i: number) => padL + (i / (n - 1)) * innerW;
  const y = (v: number) => padT + ((maxV - v) / (maxV - minV)) * innerH;

  const solidPoints = tresoData.filter((d) => !d.prev);
  const allPoints = tresoData;
  const solidPath = solidPoints.map((d, i) => {
    const idx = tresoData.indexOf(d);
    return `${i === 0 ? "M" : "L"}${x(idx)},${y(d.val)}`;
  }).join(" ");

  // dashed from last solid to all prev
  const splitIdx = tresoData.findIndex((d) => d.prev) - 1;
  const dashPath = tresoData
    .slice(splitIdx)
    .map((d, i) => {
      const idx = splitIdx + i;
      return `${i === 0 ? "M" : "L"}${x(idx)},${y(d.val)}`;
    })
    .join(" ");

  const yTicks = [20, 30, 40, 50, 60, 70];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Évolution trésorerie 12 mois">
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3" />
          <text x={padL - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#9CA3AF">{v}M</text>
        </g>
      ))}
      {tresoData.map((d, i) => (
        <text key={d.mois} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill={d.prev ? "#93C5FD" : "#9CA3AF"}>{d.mois}</text>
      ))}
      {/* Annotations */}
      <text x={x(3)} y={y(48.2) - 10} textAnchor="middle" fontSize="9" fill="#2E7D32">↑ Récolte anacarde</text>
      <text x={x(1)} y={y(22.8) + 16} textAnchor="middle" fontSize="9" fill="#E65100">↓ Intrants</text>
      {/* Solid line */}
      <path d={solidPath} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dashed preview */}
      <path d={dashPath} fill="none" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" />
      {/* Dots */}
      {allPoints.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.val)} r="4" fill={d.prev ? "#93C5FD" : "#2E7D32"} />
      ))}
    </svg>
  );
}

// ─── MOUVEMENTS ─────────────────────────────────────────────────────────────
const mouvements = [
  { date: "07/07", compte: "BICICI c/c", type: "Entrée", libelle: "Virement Olam CI — FAC-044 partiel", ref: "V-OLA-202507", montant: "+18 240 000", solde: "34 200 000" },
  { date: "05/07", compte: "BICICI c/c", type: "Entrée", libelle: "Virement Nestlé — FAC-040", ref: "V-NES-202507", montant: "+5 440 000", solde: "15 960 000" },
  { date: "05/07", compte: "BICICI c/c", type: "Sortie", libelle: "Virement salaires Juin 2025 — 18 employés", ref: "SAL-JUN-2025", montant: "-3 840 000", solde: "10 520 000" },
  { date: "04/07", compte: "BICICI c/c", type: "Sortie", libelle: "Fournisseur SCPA Afrique — KCl 4t", ref: "ACH-2025-088", montant: "-2 400 000", solde: "14 360 000" },
  { date: "03/07", compte: "Orange Money", type: "Sortie", libelle: "Paiement manœuvres terrain Jul S1", ref: "OM-2025-07-01", montant: "-320 000", solde: "480 000" },
  { date: "01/07", compte: "Caisse", type: "Sortie", libelle: "Carburant semaine 27", ref: "CAI-2025-027", montant: "-185 000", solde: "1 240 000" },
  { date: "30/06", compte: "BICICI c/c", type: "Sortie", libelle: "Prime qualité coopérative 2024", ref: "COOP-PRIME-2024", montant: "-4 200 000", solde: "16 760 000" },
  { date: "28/06", compte: "BICICI c/c", type: "Entrée", libelle: "Subvention WB tranche Q2", ref: "WB-2025-Q2", montant: "+9 000 000", solde: "20 960 000" },
  { date: "25/06", compte: "BICICI c/c", type: "Sortie", libelle: "Assurances NSIA + SAHAM — S2 2025", ref: "ASS-S2-2025", montant: "-940 000", solde: "11 960 000" },
  { date: "20/06", compte: "BICICI c/c", type: "Entrée", libelle: "Virement Barry Callebaut — FAC-043", ref: "V-BC-202506", montant: "+18 720 000", solde: "12 900 000" },
  { date: "18/06", compte: "BICICI c/c", type: "Sortie", libelle: "Achat engrais NPK — Yara CI", ref: "ACH-2025-081", montant: "-3 200 000", solde: "4 180 000" },
  { date: "15/06", compte: "Orange Money", type: "Sortie", libelle: "Paiement manœuvres terrain Jun S2", ref: "OM-2025-06-02", montant: "-310 000", solde: "800 000" },
  { date: "12/06", compte: "Caisse", type: "Entrée", libelle: "Remboursement avance Konan Y.", ref: "CAI-2025-022", montant: "+45 000", solde: "1 425 000" },
  { date: "10/06", compte: "BICICI c/c", type: "Sortie", libelle: "Acompte fret maritime — Sopromer CI", ref: "ACH-2025-078", montant: "-1 840 000", solde: "7 380 000" },
  { date: "05/06", compte: "BICICI c/c", type: "Entrée", libelle: "Virement Olam CI — FAC-041", ref: "V-OLA-202506", montant: "+12 600 000", solde: "9 220 000" },
  { date: "02/06", compte: "BICICI c/c", type: "Sortie", libelle: "Charges sociales CNPS Mai 2025", ref: "CNPS-MAI-2025", montant: "-680 000", solde: "3 380 000" },
  { date: "30/05", compte: "BICICI c/c", type: "Entrée", libelle: "Virement Cargill — FAC-039", ref: "V-CAR-202505", montant: "+14 400 000", solde: "4 060 000" },
  { date: "28/05", compte: "Caisse", type: "Sortie", libelle: "Petites fournitures bureau mai", ref: "CAI-2025-019", montant: "-82 000", solde: "1 380 000" },
  { date: "25/05", compte: "BICICI c/c", type: "Sortie", libelle: "Réparation tracteur MF390 — Bamba O.", ref: "MAT-2025-047", montant: "-740 000", solde: "4 740 000" },
  { date: "20/05", compte: "BICICI c/c", type: "Entrée", libelle: "Subvention FIRCA campagne 2025", ref: "FIRCA-2025-Q1", montant: "+6 000 000", solde: "5 480 000" },
];

// ─── PRÉVISIONS S2 2025 ──────────────────────────────────────────────────────
const previsions = [
  { mois: "Juil", enc: "22 400 000", dec: "18 200 000", flux: "+4 200 000", debut: "31 720 000", fin: "35 920 000", alerte: "" },
  { mois: "Aoû",  enc: "18 200 000", dec: "14 800 000", flux: "+3 400 000", debut: "35 920 000", fin: "39 320 000", alerte: "" },
  { mois: "Sep",  enc: "24 600 000", dec: "28 400 000", flux: "-3 800 000", debut: "39 320 000", fin: "35 520 000", alerte: "⚠️" },
  { mois: "Oct",  enc: "38 400 000", dec: "22 400 000", flux: "+16 000 000", debut: "35 520 000", fin: "51 520 000", alerte: "🌟" },
  { mois: "Nov",  enc: "32 800 000", dec: "18 600 000", flux: "+14 200 000", debut: "51 520 000", fin: "65 720 000", alerte: "🌟" },
  { mois: "Déc",  enc: "16 000 000", dec: "24 800 000", flux: "-8 800 000", debut: "65 720 000", fin: "56 920 000", alerte: "" },
];

const prevData = [35.9, 39.3, 35.5, 51.5, 65.7, 56.9];
const prevLabels = ["Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];

function PrevChart() {
  const W = 560, H = 180, padL = 52, padR = 20, padT = 20, padB = 36;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const minV = 30, maxV = 70;
  const n = prevData.length;
  const x = (i: number) => padL + (i / (n - 1)) * innerW;
  const y = (v: number) => padT + ((maxV - v) / (maxV - minV)) * innerH;
  const path = prevData.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
  const area = `${path} L${x(n - 1)},${H - padB} L${x(0)},${H - padB} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Prévisions trésorerie S2 2025">
      {[35, 45, 55, 65].map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3" />
          <text x={padL - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#9CA3AF">{v}M</text>
        </g>
      ))}
      {prevLabels.map((l, i) => (
        <text key={l} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#9CA3AF">{l}</text>
      ))}
      <path d={area} fill="#E8F5E9" opacity="0.6" />
      <path d={path} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {prevData.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="4" fill="#2E7D32" />
      ))}
      <text x={x(2)} y={y(35.5) + 16} textAnchor="middle" fontSize="9" fill="#E65100">Creux Sep</text>
      <text x={x(4)} y={y(65.7) - 10} textAnchor="middle" fontSize="9" fill="#2E7D32">Pic Nov</text>
    </svg>
  );
}

const TABS = ["Vue d'ensemble", "Mouvements", "Rapprochement", "Prévisions"];

export default function TresoreriePage() {
  const [tab, setTab] = useState(0);
  const [filtreCompte, setFiltreCompte] = useState("Tous");
  const [filtreType, setFiltreType] = useState("Tous");

  const mouvFiltres = mouvements.filter((m) => {
    const okC = filtreCompte === "Tous" || m.compte.includes(filtreCompte);
    const okT = filtreType === "Tous" || m.type === filtreType;
    return okC && okT;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Trésorerie & Banques" breadcrumb={["Finance", "Trésorerie"]} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">

        {/* KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{k.label}</span>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.bg }}>
                    <Icon size={16} style={{ color: k.accent }} />
                  </div>
                </div>
                <p className="text-lg font-bold" style={{ color: (k as { positive?: boolean }).positive ? "#2E7D32" : "#111827" }}>{k.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 shadow-sm w-fit">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition"
              style={tab === i ? { backgroundColor: "#2E7D32", color: "#fff" } : { color: "#6B7280" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Vue d'ensemble ─────────────────────────────────────────────────── */}
        {tab === 0 && (
          <div className="space-y-6">
            {/* Comptes */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-3">Mes comptes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {comptes.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.banque + c.type} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: c.bg }}>
                          <Icon size={20} style={{ color: c.accent }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{c.banque}</p>
                          <p className="text-xs text-gray-500">{c.type}</p>
                        </div>
                      </div>
                      {c.numero && <p className="text-xs font-mono text-gray-400">{c.numero}</p>}
                      <p className="text-2xl font-bold text-gray-900">{c.solde}</p>
                      {c.detail1 && <p className="text-xs text-gray-500">{c.detail1}</p>}
                      {c.detail2 && <p className="text-xs text-gray-400">{c.detail2}</p>}
                      {c.iban && <p className="text-xs font-mono text-gray-400 break-all">IBAN : {c.iban}</p>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Flux du mois */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Flux du mois — Juillet 2025 (au 11/07)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {fluxMois.map((f) => (
                  <div key={f.label} className="rounded-xl bg-gray-50 p-4 flex flex-col gap-1">
                    <span className="text-xs text-gray-500">{f.label}</span>
                    <span className="text-xl font-bold" style={{ color: f.color }}>{f.montant}</span>
                    <span className="text-xs text-gray-400">{f.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG tréso 12 mois */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-800">Évolution trésorerie 12 mois</h2>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-5 h-0.5 rounded-full bg-[#2E7D32]" /> Réel
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-5 border-t-2 border-dashed border-blue-300" /> Prévision
                  </span>
                </div>
              </div>
              <TresoChart />
            </div>
          </div>
        )}

        {/* ── Mouvements ────────────────────────────────────────────────────── */}
        {tab === 1 && (
          <div className="space-y-4">
            {/* Filtres */}
            <div className="flex flex-wrap gap-3">
              <div>
                <label className="text-xs text-gray-500 mr-1">Compte</label>
                <select
                  value={filtreCompte}
                  onChange={(e) => setFiltreCompte(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white"
                >
                  {["Tous", "BICICI", "Orange Money", "Caisse"].map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mr-1">Type</label>
                <select
                  value={filtreType}
                  onChange={(e) => setFiltreType(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-700 bg-white"
                >
                  {["Tous", "Entrée", "Sortie"].map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Date", "Compte", "Type", "Libellé", "Réf.", "Montant", "Solde après"].map((h) => (
                        <th key={h} className={`px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap ${h === "Montant" || h === "Solde après" ? "text-right" : "text-left"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mouvFiltres.map((m, i) => {
                      const isPos = m.montant.startsWith("+");
                      return (
                        <tr key={i} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{m.date}</td>
                          <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{m.compte}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={isPos
                                ? { backgroundColor: "#E8F5E9", color: "#2E7D32" }
                                : { backgroundColor: "#FFEBEE", color: "#D32F2F" }}>
                              {isPos ? "➕ Entrée" : "➖ Sortie"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-800 text-sm">{m.libelle}</td>
                          <td className="px-4 py-3 text-xs font-mono text-gray-400 whitespace-nowrap">{m.ref}</td>
                          <td className="px-4 py-3 text-right font-semibold whitespace-nowrap text-sm"
                            style={{ color: isPos ? "#2E7D32" : "#D32F2F" }}>
                            {m.montant} XOF
                          </td>
                          <td className="px-4 py-3 text-right text-xs text-gray-500 whitespace-nowrap">{m.solde} XOF</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Rapprochement ─────────────────────────────────────────────────── */}
        {tab === 2 && (
          <div className="space-y-6">
            {/* Rapprochement Juin 2025 */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-800">Rapprochement BICICI — Juin 2025</h2>
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                  <CheckCircle2 size={13} /> Rapproché — Validé le 05/07/2025 par Jean-Baptiste Kouassi
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Solde relevé bancaire BICICI au 30/06", val: "31 720 000 XOF" },
                  { label: "Solde comptabilité AGRIFRIK (cpte 521)", val: "31 720 000 XOF" },
                  { label: "Écart", val: "0 XOF ✅" },
                  { label: "Opérations en attente débit", val: "0" },
                  { label: "Opérations en attente crédit", val: "0" },
                ].map((r) => (
                  <div key={r.label} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">{r.label}</p>
                    <p className="text-base font-bold text-gray-900">{r.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Historique */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-3">Historique des rapprochements</h2>
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#F8FBF8" }}>
                      {["Mois", "Banque", "Solde banque", "Solde compta", "Écart", "Statut"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { mois: "Juin 2025", banque: "BICICI", sb: "31 720 000", sc: "31 720 000", ecart: "0", ok: true },
                      { mois: "Mai 2025", banque: "BICICI", sb: "27 500 000", sc: "27 500 000", ecart: "0", ok: true },
                      { mois: "Avr 2025", banque: "BICICI", sb: "46 840 000", sc: "46 840 000", ecart: "0", ok: true },
                      { mois: "Mar 2025", banque: "BICICI", sb: "29 680 000", sc: "29 680 000", ecart: "0", ok: true },
                    ].map((r) => (
                      <tr key={r.mois} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{r.mois}</td>
                        <td className="px-4 py-3 text-gray-600">{r.banque}</td>
                        <td className="px-4 py-3 text-gray-700">{r.sb} XOF</td>
                        <td className="px-4 py-3 text-gray-700">{r.sc} XOF</td>
                        <td className="px-4 py-3 text-gray-700">{r.ecart} XOF</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">✅ OK</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Juillet en cours */}
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Rapprochement Juillet 2025 — En cours</p>
                <p className="text-xs text-amber-700 mt-0.5">Relevé bancaire non encore reçu. Disponible le 15/07/2025.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Prévisions ────────────────────────────────────────────────────── */}
        {tab === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-3">Tableau prévisionnel S2 2025</h2>
              <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: "#F8FBF8" }}>
                        {["Mois", "Enc. prévus", "Dec. prévus", "Flux net", "Tréso début", "Tréso fin", ""].map((h) => (
                          <th key={h} className={`px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap ${h === "Flux net" || h === "Tréso début" || h === "Tréso fin" ? "text-right" : "text-left"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {previsions.map((p) => {
                        const neg = p.flux.startsWith("-");
                        return (
                          <tr key={p.mois} className={`hover:bg-gray-50 ${p.alerte === "⚠️" ? "bg-amber-50" : ""}`}>
                            <td className="px-4 py-3 font-semibold text-gray-900">{p.mois}</td>
                            <td className="px-4 py-3 text-green-700 font-medium">{p.enc} XOF</td>
                            <td className="px-4 py-3 text-red-600 font-medium">{p.dec} XOF</td>
                            <td className="px-4 py-3 text-right font-bold" style={{ color: neg ? "#D32F2F" : "#2E7D32" }}>{p.flux} XOF</td>
                            <td className="px-4 py-3 text-right text-gray-600 text-xs">{p.debut} XOF</td>
                            <td className="px-4 py-3 text-right font-bold text-gray-900">{p.fin} XOF</td>
                            <td className="px-4 py-3 text-center text-base">{p.alerte}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Prévisions chart */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-3">Évolution prévisionnelle trésorerie S2 2025</h2>
              <PrevChart />
            </div>

            {/* Alertes */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-gray-800">Alertes de trésorerie anticipées</h2>
              <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
                <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">🟡 Septembre 2025 — Flux négatif prévu</p>
                  <p className="text-xs text-amber-700 mt-0.5">Flux négatif prévu (-3,8 M) lié aux achats pré-récolte. Tréso reste à 35,5 M — pas d&apos;action requise.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4">
                <Star size={18} className="mt-0.5 shrink-0 text-green-700" />
                <div>
                  <p className="text-sm font-semibold text-green-800">🟢 Octobre-Novembre — Rentrée récolte cacao</p>
                  <p className="text-xs text-green-700 mt-0.5">Rentrée massive récolte cacao. Trésorerie atteint 65,7 M XOF en novembre.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
