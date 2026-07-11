"use client";

import Topbar from "../../components/Topbar";
import {
  Wallet,
  Building2,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle2,
  Plus,
} from "lucide-react";

// ─── KPI ───────────────────────────────────────────────────────────────────
const kpis = [
  { label: "Solde total", value: "34 220 000 XOF", accent: "#2E7D32", bg: "#E8F5E9", icon: Wallet },
  { label: "Solde SGBCI", value: "28 450 000 XOF", accent: "#1565C0", bg: "#E3F2FD", icon: Building2 },
  { label: "Solde UBA CI", value: "5 770 000 XOF", accent: "#6A1B9A", bg: "#F3E5F5", icon: Building2 },
  { label: "Caisse", value: "320 000 XOF", accent: "#E65100", bg: "#FFF3E0", icon: Wallet },
];

// ─── COMPTES BANCAIRES ──────────────────────────────────────────────────────
const comptes = [
  {
    banque: "SGBCI",
    type: "Compte pro",
    numero: "#CI082SGBCI01234",
    solde: "28 450 000 XOF",
    info: "Plafond découvert : 10 M XOF",
    icon: Building2,
    accent: "#1565C0",
    bg: "#E3F2FD",
  },
  {
    banque: "UBA CI",
    type: "Compte épargne",
    numero: "#CI082UBA56789",
    solde: "5 770 000 XOF",
    info: "Taux : 3,5%/an",
    icon: Building2,
    accent: "#6A1B9A",
    bg: "#F3E5F5",
  },
  {
    banque: "Caisse centrale",
    type: "Espèces",
    numero: "",
    solde: "320 000 XOF",
    info: "Responsable : Adjoua Messou",
    icon: Wallet,
    accent: "#E65100",
    bg: "#FFF3E0",
  },
];

// ─── DONNÉES FLUX (SVG Line Chart) ─────────────────────────────────────────
const fluxData = [
  { mois: "Jan", enc: 38.4, dec: 32.1 },
  { mois: "Fév", enc: 24.8, dec: 22.4 },
  { mois: "Mar", enc: 19.6, dec: 28.4 },
  { mois: "Avr", enc: 22.4, dec: 18.2 },
  { mois: "Mai", enc: 26.4, dec: 21.8 },
  { mois: "Jun", enc: 43.8, dec: 24.2 },
];

// ─── MOUVEMENTS ────────────────────────────────────────────────────────────
const mouvements = [
  { date: "09/07", libelle: "Vente cacao CMD-2025-042", compte: "SGBCI", type: "Encaissement", montant: "+2 880 000", soldeApres: "28 450 000" },
  { date: "08/07", libelle: "Salaires juillet (287 emp.)", compte: "SGBCI", type: "Décaissement", montant: "-42 350 000", soldeApres: "25 570 000" },
  { date: "08/07", libelle: "Virement UBA → SGBCI", compte: "SGBCI", type: "Transfert", montant: "+15 000 000", soldeApres: "67 920 000" },
  { date: "07/07", libelle: "Facture YARA Nederland", compte: "SGBCI", type: "Décaissement", montant: "-8 122 400", soldeApres: "52 920 000" },
  { date: "07/07", libelle: "Vente anacarde CMD-2025-038", compte: "SGBCI", type: "Encaissement", montant: "+2 192 250", soldeApres: "61 042 400" },
  { date: "05/07", libelle: "Loyer Q2 fermage (5 baux)", compte: "SGBCI", type: "Décaissement", montant: "-1 986 250", soldeApres: "58 850 150" },
  { date: "03/07", libelle: "Remboursement emprunt SGBCI", compte: "SGBCI", type: "Décaissement", montant: "-4 800 000", soldeApres: "60 836 400" },
  { date: "01/07", libelle: "Cotisations coopérative Q2", compte: "SGBCI", type: "Encaissement", montant: "+3 500 000", soldeApres: "65 636 400" },
  { date: "30/06", libelle: "Achat semences campagne 2025", compte: "SGBCI", type: "Décaissement", montant: "-2 450 000", soldeApres: "62 136 400" },
  { date: "28/06", libelle: "Subvention MINADER-CI", compte: "SGBCI", type: "Encaissement", montant: "+5 000 000", soldeApres: "64 586 400" },
];

// ─── PRÉVISIONS ────────────────────────────────────────────────────────────
const previsions = [
  { semaine: "S28", periode: "07–13/07", enc: "+4,2 M", dec: "-2,8 M", solde: "35,6 M", alerte: false },
  { semaine: "S29", periode: "14–20/07", enc: "+6,8 M", dec: "-8,4 M", solde: "34,0 M", alerte: true, note: "Paiement fournisseur" },
  { semaine: "S30", periode: "21–27/07", enc: "+3,2 M", dec: "-2,1 M", solde: "35,1 M", alerte: false },
  { semaine: "S31", periode: "28/07–03/08", enc: "+12,4 M", dec: "-4,2 M", solde: "43,3 M", alerte: false, note: "Livraison Barry Callebaut" },
];

// ─── LINE CHART SVG ─────────────────────────────────────────────────────────
function FluxChart() {
  const W = 560, H = 200, padL = 48, padR = 16, padT = 16, padB = 36;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const allVals = fluxData.flatMap((d) => [d.enc, d.dec]);
  const minV = Math.floor(Math.min(...allVals) / 5) * 5 - 5;
  const maxV = Math.ceil(Math.max(...allVals) / 5) * 5 + 5;
  const n = fluxData.length;

  const x = (i: number) => padL + (i / (n - 1)) * innerW;
  const y = (v: number) => padT + ((maxV - v) / (maxV - minV)) * innerH;

  const encPath = fluxData.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.enc)}`).join(" ");
  const decPath = fluxData.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.dec)}`).join(" ");

  const yTicks = [minV, Math.round((minV + maxV) / 2), maxV];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Flux de trésorerie 6 mois">
      {/* Grid lines */}
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 3" />
          <text x={padL - 4} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#9CA3AF">{v}M</text>
        </g>
      ))}
      {/* X labels */}
      {fluxData.map((d, i) => (
        <text key={d.mois} x={x(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#9CA3AF">{d.mois}</text>
      ))}
      {/* Lines */}
      <path d={encPath} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={decPath} fill="none" stroke="#E65100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {fluxData.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.enc)} r="4" fill="#2E7D32" />
          <circle cx={x(i)} cy={y(d.dec)} r="4" fill="#E65100" />
        </g>
      ))}
    </svg>
  );
}

// ─── TYPE BADGE ─────────────────────────────────────────────────────────────
function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Encaissement: { bg: "#E8F5E9", color: "#2E7D32" },
    Décaissement: { bg: "#FFEBEE", color: "#D32F2F" },
    Transfert: { bg: "#E3F2FD", color: "#1565C0" },
  };
  const s = styles[type] ?? { bg: "#F3F4F6", color: "#374151" };
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: s.bg, color: s.color }}>
      {type}
    </span>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function TresoreriePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Trésorerie" breadcrumb={["Finance", "Trésorerie"]} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trésorerie</h1>
            <p className="text-sm text-gray-500 mt-0.5">Suivi des flux financiers · Exercice 2025</p>
          </div>
          <button
            style={{ backgroundColor: "#2E7D32" }}
            className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow hover:opacity-90 transition"
          >
            <Plus size={16} />
            Nouveau mouvement
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{k.label}</span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.bg }}>
                    <Icon size={18} style={{ color: k.accent }} />
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900">{k.value}</p>
              </div>
            );
          })}
        </div>

        {/* Comptes bancaires */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Comptes bancaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comptes.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.banque} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: c.bg }}>
                      <Icon size={20} style={{ color: c.accent }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{c.banque}</p>
                      <p className="text-xs text-gray-500">{c.type}{c.numero ? ` · ${c.numero}` : ""}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{c.solde}</p>
                  <p className="text-xs text-gray-400">{c.info}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Flux SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">Flux de trésorerie — 6 mois</h2>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-4 h-1 rounded-full" style={{ backgroundColor: "#2E7D32" }} />
                Encaissements
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-4 h-1 rounded-full" style={{ backgroundColor: "#E65100" }} />
                Décaissements
              </span>
            </div>
          </div>
          <FluxChart />
        </div>

        {/* Mouvements récents */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Mouvements récents</h2>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    {["Date", "Libellé", "Compte", "Type", "Montant", "Solde après"].map((h) => (
                      <th key={h} className={`px-4 py-3 font-medium ${h === "Montant" || h === "Solde après" ? "text-right" : "text-left"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mouvements.map((m, i) => {
                    const isPos = m.montant.startsWith("+");
                    const isNeg = m.montant.startsWith("-");
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">{m.date}</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">{m.libelle}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{m.compte}</td>
                        <td className="px-4 py-3"><TypeBadge type={m.type} /></td>
                        <td className="px-4 py-3 text-right font-semibold whitespace-nowrap" style={{ color: isPos ? "#2E7D32" : isNeg ? "#D32F2F" : "#1565C0" }}>
                          {m.montant} XOF
                        </td>
                        <td className="px-4 py-3 text-right text-gray-600 whitespace-nowrap text-xs">{m.soldeApres} XOF</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Prévisions 30 jours */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Prévisions de trésorerie — 30 jours</h2>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    {["Semaine", "Période", "Encaissements prévus", "Décaissements prévus", "Solde prévu", "Note"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {previsions.map((p) => (
                    <tr key={p.semaine} className={`hover:bg-gray-50 transition ${p.alerte ? "bg-amber-50" : ""}`}>
                      <td className="px-4 py-3 font-semibold text-gray-800">{p.semaine}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{p.periode}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "#2E7D32" }}>{p.enc} XOF</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "#D32F2F" }}>{p.dec} XOF</td>
                      <td className="px-4 py-3 font-bold text-gray-900">{p.solde} XOF</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Alertes */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Alertes trésorerie</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" style={{ color: "#D97706" }} />
              <div>
                <p className="text-sm font-semibold text-amber-800">S29 · Décaissement prévu AGRIINTRANT</p>
                <p className="text-xs text-amber-700 mt-0.5">6 500 000 XOF attendus — Vérifier que le solde SGBCI est suffisant avant le 14/07.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: "#2E7D32" }} />
              <div>
                <p className="text-sm font-semibold text-green-800">S31 · Encaissement Barry Callebaut attendu</p>
                <p className="text-xs text-green-700 mt-0.5">+12 400 000 XOF prévu semaine du 28/07 — Livraison confirmée.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
