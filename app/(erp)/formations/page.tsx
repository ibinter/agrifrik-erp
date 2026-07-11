"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const formations = [
  { id: "FORM-001", intitule: "Sécurité chimique & EPI", type: "Obligatoire", formateur: "ANADER", date: "05/07/2025", duree: "8h", participants: "15/15", cout: 240000, statut: "Terminée" },
  { id: "FORM-002", intitule: "Bonnes pratiques agricoles RA", type: "Certification", formateur: "ANADER", date: "12/07/2025", duree: "16h", participants: "14/15", cout: 480000, statut: "En cours" },
  { id: "FORM-003", intitule: "Pilotage drone DJI Agras T30", type: "Technique", formateur: "DJI CI", date: "18/07/2025", duree: "8h", participants: "4/4", cout: 360000, statut: "Planifiée" },
  { id: "FORM-004", intitule: "Gestion financière coopérative", type: "Gestion", formateur: "MICROCOOP", date: "25/07/2025", duree: "8h", participants: "8/8", cout: 320000, statut: "Planifiée" },
  { id: "FORM-005", intitule: "Traçabilité Hyperledger", type: "Digital", formateur: "AGRIFRIK IT", date: "01/08/2025", duree: "4h", participants: "6/6", cout: 120000, statut: "Planifiée" },
  { id: "FORM-006", intitule: "Premiers secours (SST)", type: "Obligatoire", formateur: "Croix-Rouge CI", date: "08/08/2025", duree: "8h", participants: "15/15", cout: 450000, statut: "Planifiée" },
  { id: "FORM-007", intitule: "Gestion des sols & fertilisation", type: "Agronomie", formateur: "CNRA", date: "15/08/2025", duree: "8h", participants: "8/8", cout: 280000, statut: "Planifiée" },
  { id: "FORM-008", intitule: "Leadership & management", type: "Management", formateur: "Consultant", date: "05/09/2025", duree: "16h", participants: "5/5", cout: 750000, statut: "Planifiée" },
  { id: "FORM-009", intitule: "Récolte & post-récolte cacao", type: "Technique", formateur: "CNRA", date: "01/10/2025", duree: "8h", participants: "12/15", cout: 240000, statut: "Planifiée" },
  { id: "FORM-010", intitule: "Anglais commercial (export)", type: "Langue", formateur: "Alliance Française", date: "01/10/2025", duree: "32h", participants: "3/5", cout: 480000, statut: "Planifiée" },
  { id: "FORM-011", intitule: "Réglementation phytosanitaire", type: "Régl.", formateur: "MINADER", date: "15/10/2025", duree: "8h", participants: "6/8", cout: 160000, statut: "Planifiée" },
  { id: "FORM-012", intitule: "Audit interne RA", type: "Certification", formateur: "Rainforest Alliance", date: "01/11/2025", duree: "8h", participants: "4/4", cout: 420000, statut: "Planifiée" },
];

const typeColors: Record<string, string> = {
  "Obligatoire": "bg-red-100 text-red-700",
  "Certification": "bg-purple-100 text-purple-700",
  "Technique": "bg-blue-100 text-blue-700",
  "Gestion": "bg-yellow-100 text-yellow-700",
  "Digital": "bg-cyan-100 text-cyan-700",
  "Agronomie": "bg-green-100 text-green-700",
  "Management": "bg-orange-100 text-orange-700",
  "Langue": "bg-pink-100 text-pink-700",
  "Régl.": "bg-gray-100 text-gray-700",
};

const statutIcon: Record<string, string> = {
  "Terminée": "✅",
  "En cours": "🔵",
  "Planifiée": "📅",
};

const statutColors: Record<string, string> = {
  "Terminée": "bg-green-100 text-green-700",
  "En cours": "bg-blue-100 text-blue-700",
  "Planifiée": "bg-gray-100 text-gray-600",
};

const calJuillet = [
  { jour: 5, label: "Sécurité chimique", type: "Obligatoire" },
  { jour: 12, label: "BPA RA J1", type: "Certification" },
  { jour: 13, label: "BPA RA J2", type: "Certification" },
  { jour: 18, label: "Drone DJI", type: "Technique" },
  { jour: 25, label: "Gestion financière", type: "Gestion" },
];

const calAout = [
  { jour: 1, label: "Traçabilité", type: "Digital" },
  { jour: 8, label: "Premiers secours", type: "Obligatoire" },
  { jour: 15, label: "Gestion sols", type: "Agronomie" },
];

const typeCalColors: Record<string, string> = {
  "Obligatoire": "bg-red-50 text-red-700 border-red-200",
  "Certification": "bg-purple-50 text-purple-700 border-purple-200",
  "Technique": "bg-blue-50 text-blue-700 border-blue-200",
  "Gestion": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Digital": "bg-cyan-50 text-cyan-700 border-cyan-200",
  "Agronomie": "bg-green-50 text-green-700 border-green-200",
  "Management": "bg-orange-50 text-orange-700 border-orange-200",
  "Langue": "bg-pink-50 text-pink-700 border-pink-200",
};

function buildWeeks(year: number, month: number, events: { jour: number; label: string; type: string }[]) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7;
  type Cell = { day: number; events: typeof events } | null;
  const cells: Cell[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, events: events.filter(e => e.jour === d) });
  }
  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const employes = ["Ibrahim S.", "Konan Y.", "Adjoua M.", "Bamba O.", "Fanta K.", "Aïcha D.", "Sékou B.", "Moussa T."];
const competences = ["Agronomie cacao", "Certif RA", "Conduite tracteur", "Pilotage drone", "Traçabilité num.", "Phytosanitaire", "Premiers secours", "Anglais", "Comptabilité", "Management"];

const matrice: number[][] = [
  [3, 3, 2, 1, 2, 3, 2, 1, 1, 2],
  [3, 2, 3, 0, 1, 2, 2, 0, 0, 1],
  [2, 3, 0, 0, 3, 1, 2, 2, 3, 1],
  [2, 2, 3, 2, 1, 3, 1, 0, 0, 0],
  [2, 1, 2, 0, 2, 2, 2, 0, 2, 0],
  [1, 2, 0, 0, 3, 1, 3, 3, 2, 1],
  [3, 2, 3, 3, 1, 2, 1, 0, 0, 0],
  [2, 1, 2, 1, 2, 2, 2, 1, 1, 3],
];

const niveauLabel = ["❌", "⭐", "⭐⭐", "⭐⭐⭐"];
const niveauBg = [
  "bg-red-50 text-red-500",
  "bg-orange-50 text-orange-600",
  "bg-blue-50 text-blue-600",
  "bg-green-50 text-green-700",
];

const radarAxes = ["Agronomie", "Certif RA", "Drone", "Traçabilité", "Phyto", "Management"];
const radarValues = [1.0, 1.0, 0.33, 0.67, 1.0, 0.67];

function polarPoint(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function radarPolygon(cx: number, cy: number, maxR: number, values: number[]) {
  return values.map((v, i) => {
    const pt = polarPoint(cx, cy, v * maxR, (360 / values.length) * i);
    return `${pt.x},${pt.y}`;
  }).join(" ");
}

export default function FormationsPage() {
  const [tab, setTab] = useState<"formations" | "calendrier" | "competences">("formations");

  const weeksJuillet = buildWeeks(2025, 6, calJuillet);
  const weeksAout = buildWeeks(2025, 7, calAout);

  const cx = 120, cy = 120, maxR = 88;
  const n = radarAxes.length;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <div className="flex-1 p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>RH</span>
          <span>/</span>
          <span className="text-[#2E7D32] font-medium">Formations</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Formations</h1>
            <p className="text-sm text-gray-500 mt-0.5">Plan de formation 2025 — Suivi, calendrier et compétences</p>
          </div>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2">
            + Nouvelle formation
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 w-fit">
          {(["formations", "calendrier", "competences"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t ? "bg-[#2E7D32] text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "formations" ? "Formations" : t === "calendrier" ? "Calendrier" : "Compétences"}
            </button>
          ))}
        </div>

        {/* ======== ONGLET FORMATIONS ======== */}
        {tab === "formations" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-xs text-gray-500 font-medium">Formations planifiées 2025</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                <p className="text-xs text-gray-400 mt-1">1 terminée · 1 en cours · 10 planifiées</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-xs text-gray-500 font-medium">Heures dispensées YTD</p>
                <p className="text-3xl font-bold text-[#2E7D32] mt-2">62h</p>
                <p className="text-xs text-gray-400 mt-1">sur 136h prévues (45,6%)</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-xs text-gray-500 font-medium">Taux de complétion</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">87%</p>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
                  <div className="h-1.5 bg-[#4CAF50] rounded-full" style={{ width: "87%" }} />
                </div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <p className="text-xs text-gray-500 font-medium">Budget formation</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">4,8 M</p>
                <p className="text-xs text-gray-400 mt-1">Utilisé : 2,1 M XOF (44%)</p>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full">
                  <div className="h-1.5 bg-[#E65100] rounded-full" style={{ width: "44%" }} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Formations 2025</h2>
                <span className="text-xs text-gray-400">12 formations · 136h · 4 300 000 XOF</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                      <th className="text-left p-3 font-medium">#</th>
                      <th className="text-left p-3 font-medium">Intitulé</th>
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Formateur</th>
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Durée</th>
                      <th className="text-left p-3 font-medium">Participants</th>
                      <th className="text-right p-3 font-medium">Coût (XOF)</th>
                      <th className="text-left p-3 font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {formations.map(f => (
                      <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 text-xs text-gray-400 font-mono">{f.id}</td>
                        <td className="p-3 font-medium text-gray-900">{f.intitule}</td>
                        <td className="p-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[f.type] || "bg-gray-100 text-gray-600"}`}>
                            {f.type}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600 text-xs">{f.formateur}</td>
                        <td className="p-3 text-gray-600 text-xs whitespace-nowrap">{f.date}</td>
                        <td className="p-3 text-gray-700 font-medium text-xs">{f.duree}</td>
                        <td className="p-3 text-gray-700 text-xs">{f.participants}</td>
                        <td className="p-3 text-right text-gray-900 font-medium text-xs">{f.cout.toLocaleString("fr-FR")}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statutColors[f.statut]}`}>
                            {statutIcon[f.statut]} {f.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#F8FBF8] font-semibold text-sm">
                      <td colSpan={5} className="p-3 text-gray-700">TOTAL 2025</td>
                      <td className="p-3 text-[#2E7D32]">136h</td>
                      <td className="p-3" />
                      <td className="p-3 text-right text-gray-900">4 300 000</td>
                      <td className="p-3" />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======== ONGLET CALENDRIER ======== */}
        {tab === "calendrier" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Juillet */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h3 className="font-semibold text-gray-800 mb-4">Juillet 2025</h3>
                  <div className="grid grid-cols-7 gap-1 text-xs text-center mb-1">
                    {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(d => (
                      <div key={d} className="text-gray-400 font-medium py-1">{d}</div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {weeksJuillet.map((week, wi) => (
                      <div key={wi} className="grid grid-cols-7 gap-1">
                        {week.map((cell, ci) => (
                          <div key={ci} className={`min-h-[56px] rounded-lg p-1 text-xs ${cell ? "bg-gray-50" : ""}`}>
                            {cell && (
                              <>
                                <span className={`block text-right font-medium ${cell.events.length > 0 ? "text-[#2E7D32]" : "text-gray-400"}`}>
                                  {cell.day}
                                </span>
                                {cell.events.map((ev, ei) => (
                                  <div key={ei} className={`mt-0.5 px-1 py-0.5 rounded text-[10px] font-medium border truncate ${typeCalColors[ev.type] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                    {ev.label}
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Août */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h3 className="font-semibold text-gray-800 mb-4">Août 2025</h3>
                  <div className="grid grid-cols-7 gap-1 text-xs text-center mb-1">
                    {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(d => (
                      <div key={d} className="text-gray-400 font-medium py-1">{d}</div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {weeksAout.map((week, wi) => (
                      <div key={wi} className="grid grid-cols-7 gap-1">
                        {week.map((cell, ci) => (
                          <div key={ci} className={`min-h-[56px] rounded-lg p-1 text-xs ${cell ? "bg-gray-50" : ""}`}>
                            {cell && (
                              <>
                                <span className={`block text-right font-medium ${cell.events.length > 0 ? "text-[#2E7D32]" : "text-gray-400"}`}>
                                  {cell.day}
                                </span>
                                {cell.events.map((ev, ei) => (
                                  <div key={ei} className={`mt-0.5 px-1 py-0.5 rounded text-[10px] font-medium border truncate ${typeCalColors[ev.type] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                                    {ev.label}
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Légende */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-wrap gap-2">
                  {Object.entries(typeCalColors).map(([type, cls]) => (
                    <span key={type} className={`px-2 py-1 rounded-lg text-xs font-medium border ${cls}`}>{type}</span>
                  ))}
                </div>
              </div>

              {/* Prochaine formation */}
              <div>
                <div className="rounded-2xl border-2 border-[#2E7D32] bg-white p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-white bg-[#2E7D32] px-2 py-0.5 rounded-lg">FORM-002</span>
                    <span className="text-xs text-gray-500">Prochaine formation</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base leading-snug">Bonnes pratiques agricoles RA</h3>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <span>📅</span>
                      <span>12/07/2025 → 13/07/2025</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>⏱</span>
                      <span>16h de formation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>👥</span>
                      <span>14 participants confirmés</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                    <p><span className="font-semibold text-gray-800">Formateur :</span> ANADER — Konan Arsène, technicien sénior</p>
                    <p><span className="font-semibold text-gray-800">Lieu :</span> Salle de formation — Site Soubré Nord</p>
                    <p><span className="font-semibold text-gray-800">Support :</span> Manuel BPA RA v4.2</p>
                    <p><span className="font-semibold text-gray-800">Certificats :</span> RA BPA 2025</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                    <p className="text-xs text-green-600 font-semibold">✅ 14/15 participants confirmés</p>
                    <p className="text-xs text-orange-600">⚠ 1 absence : Bamba O. (maintenance MAT-001)</p>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Taux de remplissage</span>
                      <span>93%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-[#4CAF50] rounded-full" style={{ width: "93%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======== ONGLET COMPÉTENCES ======== */}
        {tab === "competences" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Matrice */}
              <div className="xl:col-span-2 rounded-2xl border border-gray-100 bg-white overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Matrice de compétences</h2>
                  <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2">
                    Exporter matrice
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="text-xs">
                    <thead>
                      <tr className="bg-[#F8FBF8]">
                        <th className="text-left p-3 font-medium text-gray-500 min-w-[110px] sticky left-0 bg-[#F8FBF8]">Employé</th>
                        {competences.map(c => (
                          <th key={c} className="p-2 font-medium text-gray-500 text-center min-w-[90px] whitespace-nowrap">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {employes.map((emp, ei) => (
                        <tr key={emp} className="hover:bg-gray-50">
                          <td className="p-3 font-semibold text-gray-800 sticky left-0 bg-white">{emp}</td>
                          {matrice[ei].map((niveau, ci) => (
                            <td key={ci} className="p-2 text-center">
                              <span className={`inline-block px-1.5 py-0.5 rounded-lg text-xs font-medium ${niveauBg[niveau]}`}>
                                {niveauLabel[niveau]}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Légende */}
                <div className="p-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                  <span className="text-xs text-gray-500 font-medium">Légende :</span>
                  <span className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-lg">❌ Non formé</span>
                  <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-lg">⭐ Débutant</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">⭐⭐ Compétent</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-lg">⭐⭐⭐ Expert</span>
                </div>
              </div>

              {/* Radar Ibrahim */}
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-0.5">Radar des compétences</h3>
                <p className="text-xs text-gray-400 mb-4">Ibrahim Sawadogo</p>

                <div className="flex justify-center">
                  <svg width="240" height="240" viewBox="0 0 240 240">
                    {/* Grilles */}
                    {[0.25, 0.5, 0.75, 1.0].map((scale, si) => (
                      <polygon
                        key={si}
                        points={radarPolygon(cx, cy, maxR * scale, Array(n).fill(1))}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth={si === 3 ? 1.5 : 0.8}
                      />
                    ))}
                    {/* Axes */}
                    {radarAxes.map((_, i) => {
                      const pt = polarPoint(cx, cy, maxR, (360 / n) * i);
                      return <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="#e5e7eb" strokeWidth={0.8} />;
                    })}
                    {/* Polygone données */}
                    <polygon
                      points={radarPolygon(cx, cy, maxR, radarValues)}
                      fill="#2E7D32"
                      fillOpacity={0.18}
                      stroke="#2E7D32"
                      strokeWidth={2}
                    />
                    {/* Points */}
                    {radarValues.map((v, i) => {
                      const pt = polarPoint(cx, cy, v * maxR, (360 / n) * i);
                      return <circle key={i} cx={pt.x} cy={pt.y} r={4} fill="#2E7D32" />;
                    })}
                    {/* Labels axes */}
                    {radarAxes.map((label, i) => {
                      const pt = polarPoint(cx, cy, maxR + 18, (360 / n) * i);
                      return (
                        <text key={i} x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="middle" fontSize={9} fill="#6b7280" fontWeight={500}>
                          {label}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                <div className="mt-3 space-y-2">
                  {radarAxes.map((ax, i) => (
                    <div key={ax} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{ax}</span>
                      <div className="flex gap-0.5">
                        {[0.33, 0.67, 1.0].map((threshold, l) => (
                          <div key={l} className={`w-5 h-1.5 rounded-full ${radarValues[i] >= threshold ? "bg-[#2E7D32]" : "bg-gray-200"}`} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
