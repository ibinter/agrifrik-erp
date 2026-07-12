"use client";

import Topbar from "../../components/Topbar";
import { Shield, AlertTriangle, FileText, CheckCircle, Plus } from "lucide-react";

/* ─── SVG Donut — Répartition garanties NSIA MPR ────────────────────────────── */
function SvgDonutGaranties() {
  const cx = 130, cy = 130, r = 90, inner = 54;
  const tranches = [
    { pct: 44.5, color: "#1B5E20", label: "Bâtiments & constructions", montant: "28 000 000 XOF" },
    { pct: 29.4, color: "#2E7D32", label: "Matériels & équipements", montant: "18 500 000 XOF" },
    { pct: 19.6, color: "#E65100", label: "Récoltes sur pied", montant: "12 350 000 XOF" },
    { pct: 6.5, color: "#9E9E9E", label: "RC pro + véhicule", montant: "4 000 000 XOF" },
  ];

  let cumul = 0;
  const arcs = tranches.map((t) => {
    const start = cumul;
    cumul += t.pct;
    const startAngle = (start / 100) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (cumul / 100) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const xi1 = cx + inner * Math.cos(startAngle);
    const yi1 = cy + inner * Math.sin(startAngle);
    const xi2 = cx + inner * Math.cos(endAngle);
    const yi2 = cy + inner * Math.sin(endAngle);
    const large = t.pct > 50 ? 1 : 0;
    const d = `M ${xi1} ${yi1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${inner} ${inner} 0 ${large} 0 ${xi1} ${yi1} Z`;
    return { ...t, d };
  });

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Répartition des garanties — NSIA MPR</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <svg viewBox="0 0 260 260" width="260" height="260" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          {arcs.map((a, i) => (
            <path key={i} d={a.d} fill={a.color} />
          ))}
          <text x={cx} y={cy - 8} fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">62,85 M</text>
          <text x={cx} y={cy + 8} fontSize="9" fill="#888" textAnchor="middle">XOF assurés</text>
        </svg>
        <div className="space-y-2 text-xs">
          {tranches.map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 h-3 w-3 shrink-0 rounded-sm" style={{ background: t.color }} />
              <div>
                <p className="font-medium text-gray-700">{t.label}</p>
                <p className="text-gray-400">{t.pct}% — {t.montant}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function AssurancesPage() {
  const kpis = [
    { label: "Polices actives", value: "3", icon: Shield, color: "#2E7D32" },
    { label: "Valeur assurée", value: "62,85 M XOF", icon: FileText, color: "#1565C0" },
    { label: "Primes 2025", value: "546 000 XOF", icon: AlertTriangle, color: "#E65100" },
    { label: "Sinistres 2025", value: "0 ✅", icon: CheckCircle, color: "#4CAF50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Finance", "Assurances"]} title="Assurances" />

      <div className="p-6 space-y-6">
        {/* En-tête */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Assurances</h1>
            <p className="mt-0.5 text-sm text-gray-500">Polices en vigueur — Protection de l&apos;exploitation EXP-001</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2 text-xs font-medium text-white hover:bg-[#1B5E20] transition-colors">
            <Plus size={14} />
            Nouvelle police
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">{k.label}</p>
                  <p className="mt-1 text-xl font-bold text-gray-800">{k.value}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: k.color + "18" }}>
                  <k.icon size={20} style={{ color: k.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alerte */}
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-600" />
            <div className="text-xs text-red-700">
              <p className="font-semibold">Solde prime NSIA-MPR — 273 000 XOF — Échéance 15/07/2025 (dans 4 jours)</p>
              <p className="mt-1 text-red-600">Effectuer le virement SGBCI référence NSIA-MPR-2025-EXP001-S2.</p>
            </div>
            <button className="ml-auto shrink-0 rounded-xl bg-red-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition-colors">
              Payer
            </button>
          </div>
        </div>

        {/* Polices en vigueur */}
        <div>
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Polices en vigueur</h2>
          <div className="grid gap-4 lg:grid-cols-3">

            {/* Police 1 — NSIA Multirisque */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50/30 bg-white p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-600">NSIA-MPR-CI-2025-EXP001</span>
                  <h3 className="mt-1 text-sm font-bold text-gray-800">NSIA Multirisque Professionnelle</h3>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                  <CheckCircle size={10} /> Actif
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Couverture</span>
                  <span>Bâtiments (28M) + Matériels (18,5M) + Récoltes (12,35M) + RC + Véhicule</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Valeur assurée</span>
                  <span className="font-bold text-gray-800">62 850 000 XOF</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Prime annuelle</span>
                  <span className="font-bold text-[#2E7D32]">546 000 XOF/an</span>
                  <span className="text-gray-400">(0,87%)</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Validité</span>
                  <span>01/01 – 31/12/2025 ✅</span>
                </div>
              </div>
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 text-xs text-orange-700">
                ⚠️ Solde prime <strong>273 000 XOF</strong> dû le 15/07/2025
              </div>
            </div>

            {/* Police 2 — BICICI */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-600">BICICI-LC-CI-2025-EXP001</span>
                  <h3 className="mt-1 text-sm font-bold text-gray-800">BICICI Assurance Crédit Documentaire</h3>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                  <CheckCircle size={10} /> Actif
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Couverture</span>
                  <span>LC irrévocables Barry Callebaut (jusqu&apos;à 4M XOF/LC)</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Prime</span>
                  <span>Incluse dans frais bancaires LC (0,15%/LC)</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Validité</span>
                  <span>Permanente (liée au compte SGBCI) ✅</span>
                </div>
              </div>
            </div>

            {/* Police 3 — Mutuelle Agricole */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-600">MUTA-NAWA-EXP001-2025</span>
                  <h3 className="mt-1 text-sm font-bold text-gray-800">Mutuelle Agricole COOPAGRI-NAWA</h3>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                  <CheckCircle size={10} /> Actif
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Couverture</span>
                  <span>Cotisation accidents travail saisonniers (2 saisonniers × 15 000 XOF)</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Prime</span>
                  <span className="font-bold text-[#2E7D32]">30 000 XOF/an</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 shrink-0 font-medium text-gray-500">Validité</span>
                  <span>01/03 – 28/02/2026 ✅</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donut + Historique */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SvgDonutGaranties />

          {/* Historique sinistres */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="mb-4 flex items-center gap-2">
              <FileText size={16} className="text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-700">Historique sinistres</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["Année", "Police", "Sinistre", "Indemnisé", "Statut"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { annee: "2022", police: "NSIA MPR", sinistre: "Incendie câblage hangar", indemnise: "230 000 XOF", statut: "Réglé" },
                    { annee: "2023", police: "NSIA MPR", sinistre: "Aucun", indemnise: "—", statut: "Bonus" },
                    { annee: "2024", police: "NSIA MPR", sinistre: "Aucun", indemnise: "—", statut: "Bonus" },
                    { annee: "2025", police: "NSIA MPR", sinistre: "Aucun à ce jour", indemnise: "—", statut: "En cours" },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="whitespace-nowrap px-3 py-2 font-semibold text-gray-700">{row.annee}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-600">{row.police}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-600">{row.sinistre}</td>
                      <td className="whitespace-nowrap px-3 py-2 font-medium text-gray-700">{row.indemnise}</td>
                      <td className="whitespace-nowrap px-3 py-2">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          row.statut === "Réglé" || row.statut === "Bonus"
                            ? "bg-green-50 text-green-700"
                            : "bg-blue-50 text-blue-700"
                        }`}>
                          ✅ {row.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600">
              <span className="font-semibold">Coefficient bonus-malus actuel :</span>{" "}
              <span className="font-bold text-[#2E7D32]">0,90</span>{" "}
              <span className="text-gray-400">(10% de réduction sur prime 2025)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
