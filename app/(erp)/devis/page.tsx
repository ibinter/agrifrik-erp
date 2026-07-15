"use client";

import { useState } from "react";
import { FileText, CheckCircle, Clock, TrendingUp, Plus, Eye, FileDown, RefreshCw } from "lucide-react";
import Topbar from "../../components/Topbar";

/* ─── KPIs ─────────────────────────────────────────────── */
const kpis = [
  { label: "Devis 2025", value: "4", unit: "", sub: "Campagne 2025", icon: FileText, iconColor: "#6A1B9A", iconBg: "#F3E5F5" },
  { label: "Convertis en contrat", value: "2", unit: "", sub: "CTR-2025-001 / 002", icon: CheckCircle, iconColor: "#2E7D32", iconBg: "#E8F5E9" },
  { label: "En cours", value: "8,76 M", unit: "XOF", sub: "Valeur devis actifs", icon: Clock, iconColor: "#1565C0", iconBg: "#E3F2FD" },
  { label: "Taux de conversion", value: "50", unit: "%", sub: "2 convertis / 4 émis", icon: TrendingUp, iconColor: "#E65100", iconBg: "#FFF3E0" },
];

/* ─── DONNÉES ───────────────────────────────────────────── */
type Filtre = "Tous" | "En attente" | "Acceptés" | "Refusés" | "Expirés";

interface Devis {
  numero: string;
  date: string;
  client: string;
  produit: string;
  volume: string;
  montant: number;
  validite: string;
  statut: "Converti" | "En attente" | "Expiration proche";
  ref?: string;
  info?: string;
}

const devisList: Devis[] = [
  {
    numero: "DEV-2025-001",
    date: "12/12/2024",
    client: "Barry Callebaut CI",
    produit: "Cacao Grade AA",
    volume: "48 000 kg",
    montant: 52176000,
    validite: "31/01/2025",
    statut: "Converti",
    ref: "CTR-2025-001",
  },
  {
    numero: "DEV-2025-002",
    date: "18/02/2025",
    client: "Cargill CI",
    produit: "Anacarde WW240",
    volume: "2 000 kg",
    montant: 3050000,
    validite: "31/03/2025",
    statut: "Converti",
    ref: "CTR-2025-002",
  },
  {
    numero: "DEV-2025-003",
    date: "10/07/2025",
    client: "OLAM Cocoa CI",
    produit: "Cacao Grade AA",
    volume: "8 000 kg",
    montant: 8760000,
    validite: "09/08/2025",
    statut: "En attente",
    info: "J+29",
  },
  {
    numero: "DEV-2025-004",
    date: "28/05/2025",
    client: "SIFCA (anacarde)",
    produit: "Anacarde WW320",
    volume: "3 000 kg",
    montant: 4620000,
    validite: "27/07/2025",
    statut: "Expiration proche",
    info: "16j",
  },
];

const FILTRES: Filtre[] = ["Tous", "En attente", "Acceptés", "Refusés", "Expirés"];

function statutStyle(d: Devis) {
  if (d.statut === "Converti")
    return { bg: "#E8F5E9", color: "#2E7D32", label: `Converti (${d.ref})`, dot: "#2E7D32" };
  if (d.statut === "En attente")
    return { bg: "#E3F2FD", color: "#1565C0", label: `En attente (${d.info})`, dot: "#1565C0" };
  return { bg: "#FFF3E0", color: "#E65100", label: `Expiration dans ${d.info}`, dot: "#E65100" };
}

/* ─── SVG FUNNEL ────────────────────────────────────────── */
function FunnelChart() {
  const steps = [
    { label: "Devis émis", count: 4, pct: 100, w: 320 },
    { label: "Devis répondus", count: 3, pct: 75, w: 240 },
    { label: "Devis acceptés", count: 2, pct: 50, w: 180 },
    { label: "Contrats signés", count: 2, pct: 50, w: 180 },
  ];
  const barH = 44;
  const gap = 12;
  const svgH = steps.length * (barH + gap) + 20;
  const cx = 200;

  return (
    <svg viewBox={`0 0 400 ${svgH}`} className="w-full" style={{ maxHeight: 280 }}>
      {steps.map((s, i) => {
        const y = 10 + i * (barH + gap);
        const x = cx - s.w / 2;
        const isLast = i === steps.length - 1;
        return (
          <g key={s.label}>
            <rect
              x={x} y={y} width={s.w} height={barH} rx={8}
              fill={isLast ? "#1B5E20" : "#2E7D32"}
              opacity={isLast ? 1 : 0.75 + i * 0.05}
            />
            <text x={cx} y={y + barH / 2 - 5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">
              {s.label}
            </text>
            <text x={cx} y={y + barH / 2 + 10} textAnchor="middle" fontSize={11} fill="#C8E6C9">
              {s.count} — {s.pct}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function DevisPage() {
  const [filtre, setFiltre] = useState<Filtre>("Tous");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Devis" breadcrumb={["Commerce", "Devis"]} />

      <main className="flex-1 p-6 space-y-6">

        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Devis</h1>
            <p className="text-xs text-gray-500 mt-0.5">Propositions commerciales — Campagne 2025</p>
          </div>
          <button
            className="flex items-center gap-1.5 text-white rounded-xl text-xs font-medium px-4 py-2"
            style={{ background: "#2E7D32" }}
          >
            <Plus size={14} /> Nouveau devis
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{k.label}</span>
                  <span className="rounded-xl p-2" style={{ background: k.iconBg, color: k.iconColor }}>
                    <Icon size={16} />
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-gray-900">{k.value}</span>
                  {k.unit && <span className="text-xs text-gray-400 mb-1">{k.unit}</span>}
                </div>
                <span className="text-xs text-gray-400">{k.sub}</span>
              </div>
            );
          })}
        </div>

        {/* Tableau des devis */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          {/* Filtres + bouton */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
            <div className="flex gap-1.5 flex-wrap">
              {FILTRES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFiltre(f)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  style={filtre === f
                    ? { background: "#2E7D32", color: "#fff" }
                    : { background: "#F5F5F5", color: "#757575" }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "#F8FBF8" }}>
                  {["N°", "Date", "Client", "Produit", "Volume", "Montant (XOF)", "Validité", "Statut", "Actions"].map((c) => (
                    <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {devisList.map((d) => {
                  const s = statutStyle(d);
                  return (
                    <tr key={d.numero} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold whitespace-nowrap" style={{ color: "#6A1B9A" }}>
                        {d.numero}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.date}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{d.client}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{d.produit} {d.volume.replace(" kg", "").replace(" 000", "t").slice(0, 3)}t</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap tabular-nums">{d.volume}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap tabular-nums text-right">
                        {d.montant.toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.validite}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: s.bg, color: s.color }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2 py-1 hover:bg-gray-50 flex items-center gap-1">
                            <Eye size={11} /> Voir
                          </button>
                          {d.statut !== "Converti" && (
                            <button className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2 py-1 hover:bg-gray-50 flex items-center gap-1">
                              <FileDown size={11} /> PDF
                            </button>
                          )}
                          {d.statut === "En attente" && (
                            <button className="border border-orange-200 text-orange-600 rounded-lg text-xs px-2 py-1 hover:bg-orange-50 flex items-center gap-1">
                              <RefreshCw size={11} /> Relancer
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totaux */}
          <div className="px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-gray-500">
            <span>
              Valeur cumulée :{" "}
              <strong className="text-gray-900">
                {(52176000 + 3050000 + 8760000 + 4620000).toLocaleString("fr-FR")} XOF
              </strong>{" "}
              (68,6 M XOF)
            </span>
            <span className="sm:ml-auto">
              2 convertis en contrat —{" "}
              <strong className="text-gray-900">55 226 000 XOF sécurisés</strong>
            </span>
          </div>
        </div>

        {/* Performance commerciale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Funnel */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Entonnoir de conversion 2025
            </h3>
            <FunnelChart />
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
              {[
                { label: "Émis", v: 4, pct: "100%" },
                { label: "Répondus", v: 3, pct: "75%" },
                { label: "Acceptés", v: 2, pct: "50%" },
                { label: "Signés", v: 2, pct: "50%" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-lg font-bold text-gray-900">{s.v}</span>
                  <span className="text-xs text-gray-400">{s.label}</span>
                  <span className="text-xs font-semibold" style={{ color: "#2E7D32" }}>{s.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alertes */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-900">Alertes devis</h3>

            {/* Orange */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 flex items-start gap-3">
              <span className="text-xl mt-0.5 flex-shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-orange-800">DEV-2025-004 expire dans 16 jours</p>
                <p className="text-xs text-orange-700 mt-1">
                  Échéance : 27/07/2025 — SIFCA (anacarde) — 4 620 000 XOF.
                  Contacter SIFCA pour une décision avant expiration.
                </p>
              </div>
            </div>

            {/* Bleue */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
              <span className="text-xl mt-0.5 flex-shrink-0">ℹ️</span>
              <div>
                <p className="text-sm font-semibold text-blue-800">DEV-2025-003 en cours chez OLAM Cocoa CI</p>
                <p className="text-xs text-blue-700 mt-1">
                  8 760 000 XOF — Émis le 10/07/2025 (J+29 de validité).
                  Relance recommandée au-delà de 10 jours sans réponse.
                </p>
              </div>
            </div>

            {/* Récap convertis */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-800 mb-2">Contrats issus de devis — 2025</p>
              <div className="flex flex-col gap-1.5 text-xs text-green-700">
                <div className="flex justify-between">
                  <span>DEV-2025-001 → CTR-2025-001 (Barry Callebaut)</span>
                  <span className="font-semibold tabular-nums">52 176 000 XOF</span>
                </div>
                <div className="flex justify-between">
                  <span>DEV-2025-002 → CTR-2025-002 (Cargill CI)</span>
                  <span className="font-semibold tabular-nums">3 050 000 XOF</span>
                </div>
                <div className="flex justify-between border-t border-green-200 pt-1.5 font-bold text-green-900">
                  <span>Total sécurisé</span>
                  <span className="tabular-nums">55 226 000 XOF</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
