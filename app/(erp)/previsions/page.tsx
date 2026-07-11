"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

type Tab = "recolte" | "finances" | "scenarios";

export default function PrevisionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("recolte");

  const tabs: { id: Tab; label: string }[] = [
    { id: "recolte", label: "Récolte & Production" },
    { id: "finances", label: "Finances" },
    { id: "scenarios", label: "Scénarios" },
  ];

  const kpis = [
    { label: "CA prévisionnel 2025", value: "48,6M XOF", trend: "+5,7% vs budget initial" },
    { label: "Production prévisionnelle", value: "16,2 t", trend: "Cacao + anacarde + pisciculture" },
    { label: "Marge nette prévisionnelle", value: "34,8%", trend: "vs 33,6% budget initial" },
    { label: "Indice confiance ARIA", value: "87%", trend: "Modèle mis à jour 10/07/2025" },
  ];

  // ── Récolte area chart ────────────────────────────────────────────────────
  const mois = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
  const realiseTons = [0.4, 0.3, 0.5, 0.8, 0.9, 1.2, 0.8];
  const prevuTons   = [null, null, null, null, null, null, 0.8, 1.4, 1.8, 2.8, 2.4, 1.1];

  const W = 640, H = 220, padL = 48, padB = 30, padT = 20, padR = 20;
  const innerW = W - padL - padR;
  const innerH = H - padB - padT;
  const maxVal = 3.2;
  const xOf = (i: number) => padL + (i / 11) * innerW;
  const yOf = (v: number) => padT + innerH - (v / maxVal) * innerH;

  const rPoints = realiseTons.map((v, i) => ({ x: xOf(i), y: yOf(v) }));
  const rLinePath = rPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const rAreaPath = `${rLinePath} L${rPoints[rPoints.length-1].x.toFixed(1)},${(padT+innerH).toFixed(1)} L${rPoints[0].x.toFixed(1)},${(padT+innerH).toFixed(1)} Z`;

  // jonction depuis Jul (index 6)
  const pRaw = prevuTons.map((v, i) => v !== null ? { x: xOf(i), y: yOf(v) } : null);
  const pPoints = pRaw.filter(Boolean) as { x: number; y: number }[];
  const pLinePath = pPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const pAreaPath = `${pLinePath} L${pPoints[pPoints.length-1].x.toFixed(1)},${(padT+innerH).toFixed(1)} L${pPoints[0].x.toFixed(1)},${(padT+innerH).toFixed(1)} Z`;

  // ── Trésorerie dual line chart ────────────────────────────────────────────
  const encaissements = [3.8, 4.2, 3.5, 5.2, 4.8, 6.2, 4.5, 5.8, 6.4, 7.2, 6.8, 4.6];
  const decaissements = [2.1, 1.8, 2.4, 2.8, 3.2, 2.6, 2.9, 3.1, 2.8, 3.4, 3.0, 2.5];
  const solde = encaissements.reduce((acc: number[], enc, i) => {
    acc.push((i === 0 ? 0 : acc[i-1]) + enc - decaissements[i]);
    return acc;
  }, []);

  const W2 = 640, H2 = 240, pL2 = 52, pB2 = 32, pT2 = 20, pR2 = 20;
  const iW2 = W2 - pL2 - pR2, iH2 = H2 - pB2 - pT2;
  const maxEnc = 8;
  const xT = (i: number) => pL2 + (i / 11) * iW2;
  const yT = (v: number) => pT2 + iH2 - (v / maxEnc) * iH2;
  const maxS = Math.max(...solde), minS = Math.min(...solde);
  const yS = (v: number) => pT2 + iH2 - ((v - minS) / (maxS - minS + 1)) * iH2;

  const encPath = encaissements.map((v, i) => `${i===0?"M":"L"}${xT(i).toFixed(1)},${yT(v).toFixed(1)}`).join(" ");
  const decPath = decaissements.map((v, i) => `${i===0?"M":"L"}${xT(i).toFixed(1)},${yT(v).toFixed(1)}`).join(" ");
  const soldePath = solde.map((v, i) => `${i===0?"M":"L"}${xT(i).toFixed(1)},${yS(v).toFixed(1)}`).join(" ");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Finance", "Prévisions"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* EN-TÊTE */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Prévisions & Planification</h1>
            <p className="text-sm text-gray-500 mt-0.5">Modèles prédictifs ARIA — Campagne 2025 et projections 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#E8F5E9] text-[#1B5E20] text-xs font-semibold">
              🤖 ARIA — Confiance 87%
            </span>
            <button className="px-3 py-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium">
              Exporter PDF
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-lg font-bold text-[#1B5E20]">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.trend}</p>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#2E7D32] text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══ ONGLET RÉCOLTE ══════════════════════════════════════════════════ */}
        {activeTab === "recolte" && (
          <div className="space-y-5">
            {/* Area chart récolte */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-800">Prévision de récolte cacao 2025 par mois</h2>
                <div className="flex items-center gap-5 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-6 h-0.5 bg-[#2E7D32] rounded" />
                    Réalisé
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5,3"/></svg>
                    Prévisionnel
                  </span>
                </div>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.22"/>
                    <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.02"/>
                  </linearGradient>
                  <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.16"/>
                    <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.02"/>
                  </linearGradient>
                </defs>
                {/* Grille horizontale */}
                {[0, 0.8, 1.6, 2.4, 3.2].map((v) => (
                  <g key={v}>
                    <line x1={padL} y1={yOf(v)} x2={W-padR} y2={yOf(v)} stroke="#F0F0F0" strokeWidth="1"/>
                    <text x={padL-6} y={yOf(v)+4} textAnchor="end" fontSize="9" fill="#9E9E9E">{v}t</text>
                  </g>
                ))}
                {/* Aires */}
                <path d={rAreaPath} fill="url(#gr)"/>
                <path d={pAreaPath} fill="url(#gp)"/>
                {/* Lignes */}
                <path d={rLinePath} fill="none" stroke="#2E7D32" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={pLinePath} fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="6,3" strokeLinecap="round" strokeLinejoin="round"/>
                {/* Points réalisés */}
                {rPoints.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={4} fill="#2E7D32" stroke="white" strokeWidth="1.5"/>
                ))}
                {/* Séparateur réalisé/prévu */}
                <line x1={xOf(6)} y1={padT} x2={xOf(6)} y2={padT+innerH} stroke="#E65100" strokeWidth="1" strokeDasharray="4,2"/>
                <text x={xOf(6)+4} y={padT+11} fontSize="8" fill="#E65100">Aujourd'hui</text>
                {/* Mois */}
                {mois.map((m, i) => (
                  <text key={m} x={xOf(i)} y={H-8} textAnchor="middle" fontSize="9" fill="#9E9E9E">{m}</text>
                ))}
              </svg>
              <div className="flex flex-wrap gap-6 mt-2 text-xs text-gray-600">
                <span>Réalisé YTD : <strong className="text-[#1B5E20]">4,9 t</strong></span>
                <span>Prévu H2 : <strong className="text-[#1B5E20]">11,5 t</strong></span>
                <span>Total 2025 : <strong className="text-[#1B5E20]">16,4 t</strong></span>
              </div>
            </div>

            {/* Tableau parcelles */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-bold text-gray-800 mb-4">Prévisions de production par parcelle</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Parcelle","Surface","Réalisé YTD","Prévu H2","Total 2025","vs 2024"].map((h) => (
                        <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs">
                    {[
                      ["PAR-A1","2,3 ha","2,1 t","3,8 t","5,9 t","+8,2%"],
                      ["PAR-A2","2,1 ha","1,9 t","3,4 t","5,3 t","+6,0%"],
                      ["PAR-B1","1,8 ha","0,4 t","0,8 t","1,2 t","+15,4% (croissance)"],
                      ["PAR-B2","1,4 ha","0,0 t","0,2 t","0,2 t","N/A (trop jeune)"],
                    ].map(([p,s,r,pr,tot,vs]) => (
                      <tr key={p} className="hover:bg-gray-50/50">
                        <td className="px-3 py-2.5 font-medium text-gray-700">{p}</td>
                        <td className="px-3 py-2.5 text-gray-600">{s}</td>
                        <td className="px-3 py-2.5 text-gray-600">{r}</td>
                        <td className="px-3 py-2.5 text-gray-600">{pr}</td>
                        <td className="px-3 py-2.5 font-semibold text-[#1B5E20]">{tot}</td>
                        <td className="px-3 py-2.5 text-green-600 font-medium">{vs}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#E8F5E9] font-bold">
                      {["TOTAL cacao","7,6 ha","4,4 t","8,2 t","12,6 t","+8%"].map((v, i) => (
                        <td key={i} className={`px-3 py-2.5 text-xs ${i >= 4 ? "text-[#1B5E20]" : "text-gray-700"}`}>{v}</td>
                      ))}
                    </tr>
                    {[
                      ["PAR-C1 anacarde","3,2 ha","0 t","2,0 t","2,0 t","+5,3%"],
                      ["PAR-D1 pisciculture","1,6 ha","1,2 t","1,2 t","2,4 t","+4,3% (constant)"],
                    ].map(([p,s,r,pr,tot,vs]) => (
                      <tr key={p} className="hover:bg-gray-50/50">
                        <td className="px-3 py-2.5 text-xs font-medium text-gray-700">{p}</td>
                        <td className="px-3 py-2.5 text-xs text-gray-600">{s}</td>
                        <td className="px-3 py-2.5 text-xs text-gray-600">{r}</td>
                        <td className="px-3 py-2.5 text-xs text-gray-600">{pr}</td>
                        <td className="px-3 py-2.5 text-xs font-semibold text-[#1B5E20]">{tot}</td>
                        <td className="px-3 py-2.5 text-xs text-green-600 font-medium">{vs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ ONGLET FINANCES ═════════════════════════════════════════════════ */}
        {activeTab === "finances" && (
          <div className="space-y-5">
            {/* Dual line chart trésorerie */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-800">Flux de trésorerie prévisionnels 2025</h2>
                <div className="flex items-center gap-5 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><span className="inline-block w-5 h-0.5 bg-[#2E7D32] rounded"/>Encaissements</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block w-5 h-0.5 bg-[#E65100] rounded"/>Décaissements</span>
                  <span className="flex items-center gap-1.5">
                    <svg width="20" height="4"><line x1="0" y1="2" x2="20" y2="2" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,2"/></svg>
                    Solde cumulé
                  </span>
                </div>
              </div>
              <svg viewBox={`0 0 ${W2} ${H2}`} className="w-full" xmlns="http://www.w3.org/2000/svg">
                {[0, 2, 4, 6, 8].map((v) => (
                  <g key={v}>
                    <line x1={pL2} y1={yT(v)} x2={W2-pR2} y2={yT(v)} stroke="#F0F0F0" strokeWidth="1"/>
                    <text x={pL2-6} y={yT(v)+4} textAnchor="end" fontSize="9" fill="#9E9E9E">{v}M</text>
                  </g>
                ))}
                <path d={encPath} fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
                <path d={decPath} fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round"/>
                <path d={soldePath} fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5,2" strokeLinecap="round"/>
                {/* Points (pleins=réalisé, creux=prévu) */}
                {encaissements.map((v, i) => (
                  <circle key={i} cx={xT(i)} cy={yT(v)} r={3}
                    fill={i <= 6 ? "#2E7D32" : "white"} stroke="#2E7D32" strokeWidth="1.5"/>
                ))}
                {decaissements.map((v, i) => (
                  <circle key={i} cx={xT(i)} cy={yT(v)} r={3}
                    fill={i <= 6 ? "#E65100" : "white"} stroke="#E65100" strokeWidth="1.5"/>
                ))}
                {/* Séparateur */}
                <line x1={xT(6)} y1={pT2} x2={xT(6)} y2={pT2+iH2} stroke="#E65100" strokeWidth="1" strokeDasharray="4,2"/>
                <text x={xT(6)+3} y={pT2+11} fontSize="8" fill="#E65100">Prévis.</text>
                {mois.map((m, i) => (
                  <text key={m} x={xT(i)} y={H2-8} textAnchor="middle" fontSize="9" fill="#9E9E9E">{m}</text>
                ))}
              </svg>
            </div>

            {/* P&L Table */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-bold text-gray-800 mb-4">Compte de résultat prévisionnel 2025</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Poste","H1 réalisé","H2 prévisionnel","Total 2025","Budget initial"].map((h) => (
                        <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs">
                    {[
                      { p:"CA cacao",       h1:"26,7M", h2:"21,9M", tot:"48,6M", bud:"46,0M (+5,7%)", neg:false, bold:false },
                      { p:"CA anacarde",    h1:"—",     h2:"2,4M",  tot:"2,4M",  bud:"2,2M",          neg:false, bold:false },
                      { p:"CA pisciculture",h1:"0,9M",  h2:"1,0M",  tot:"1,9M",  bud:"1,8M",          neg:false, bold:false },
                    ].map(({p,h1,h2,tot,bud}) => (
                      <tr key={p} className="hover:bg-gray-50/50">
                        <td className="px-3 py-2.5 text-gray-700">{p}</td>
                        <td className="px-3 py-2.5 text-gray-600">{h1}</td>
                        <td className="px-3 py-2.5 text-gray-600">{h2}</td>
                        <td className="px-3 py-2.5 font-semibold text-[#1B5E20]">{tot}</td>
                        <td className="px-3 py-2.5 text-gray-500">{bud}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#E8F5E9] font-bold text-xs">
                      {["CA TOTAL","27,6M","25,3M","52,9M","50,0M"].map((v,i) => (
                        <td key={i} className="px-3 py-2.5 text-[#1B5E20]">{v}</td>
                      ))}
                    </tr>
                    {[
                      { p:"Intrants phyto",   h1:"-3,1M", h2:"-2,8M", tot:"-5,9M", bud:"-5,6M" },
                      { p:"Main-d'œuvre",     h1:"-4,2M", h2:"-4,0M", tot:"-8,2M", bud:"-8,0M" },
                      { p:"Charges fixes",    h1:"-1,3M", h2:"-1,5M", tot:"-2,8M", bud:"-2,8M" },
                    ].map(({p,h1,h2,tot,bud}) => (
                      <tr key={p} className="hover:bg-gray-50/50">
                        <td className="px-3 py-2.5 text-gray-700">{p}</td>
                        <td className="px-3 py-2.5 text-red-600">{h1}</td>
                        <td className="px-3 py-2.5 text-red-600">{h2}</td>
                        <td className="px-3 py-2.5 font-semibold text-red-700">{tot}</td>
                        <td className="px-3 py-2.5 text-gray-500">{bud}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#E8F5E9] font-bold text-xs">
                      {["Résultat net","19,0M","17,0M","36,0M","33,6M"].map((v,i) => (
                        <td key={i} className="px-3 py-2.5 text-[#1B5E20]">{v}</td>
                      ))}
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="px-3 py-2.5 text-xs text-gray-700 font-medium">Taux de marge</td>
                      <td className="px-3 py-2.5 text-xs text-gray-600">68,8%</td>
                      <td className="px-3 py-2.5 text-xs text-gray-600">67,2%</td>
                      <td className="px-3 py-2.5 text-xs font-bold text-[#1B5E20]">68,1%</td>
                      <td className="px-3 py-2.5 text-xs text-gray-500">67,2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ ONGLET SCÉNARIOS ════════════════════════════════════════════════ */}
        {activeTab === "scenarios" && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-bold text-gray-800 mb-4">Scénarios de prix cacao — Impact sur CA 2025</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Scénario","Prix BCC","Volume","CA total","Écart base"].map((h) => (
                        <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs">
                    <tr className="bg-red-50/50">
                      <td className="px-3 py-3 font-semibold text-red-700">🐻 Pessimiste (cours -15%)</td>
                      <td className="px-3 py-3 text-gray-700">924 XOF/kg</td>
                      <td className="px-3 py-3 text-gray-600">12,6 t</td>
                      <td className="px-3 py-3 font-bold text-red-700">41,2M XOF</td>
                      <td className="px-3 py-3 text-red-600 font-medium">-7,4M (-15,2%)</td>
                    </tr>
                    <tr className="bg-[#E8F5E9]">
                      <td className="px-3 py-3 font-semibold text-[#1B5E20]">⚖️ Base (cours actuel)</td>
                      <td className="px-3 py-3 text-gray-700">1 087 XOF/kg</td>
                      <td className="px-3 py-3 text-gray-600">12,6 t</td>
                      <td className="px-3 py-3 font-bold text-[#1B5E20]">48,5M XOF</td>
                      <td className="px-3 py-3 text-gray-500 font-medium">— référence</td>
                    </tr>
                    <tr className="bg-green-50/40">
                      <td className="px-3 py-3 font-semibold text-green-700">🐂 Optimiste (cours +10%)</td>
                      <td className="px-3 py-3 text-gray-700">1 196 XOF/kg</td>
                      <td className="px-3 py-3 text-gray-600">12,6 t</td>
                      <td className="px-3 py-3 font-bold text-green-700">53,3M XOF</td>
                      <td className="px-3 py-3 text-green-600 font-medium">+4,8M (+9,9%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SVG 3 barres */}
              <h3 className="text-xs font-semibold text-gray-700 mb-3">Impact scénario sur résultat net</h3>
              <svg viewBox="0 0 420 260" className="w-full max-w-md" xmlns="http://www.w3.org/2000/svg">
                {[0, 10, 20, 30, 40].map((v) => {
                  const y = 220 - (v / 45) * 185;
                  return (
                    <g key={v}>
                      <line x1={50} y1={y} x2={400} y2={y} stroke="#F0F0F0" strokeWidth="1"/>
                      <text x={44} y={y+4} textAnchor="end" fontSize="9" fill="#9E9E9E">{v}M</text>
                    </g>
                  );
                })}
                <line x1={50} y1={220} x2={400} y2={220} stroke="#E0E0E0" strokeWidth="1"/>
                {[
                  { label:"Pessimiste", val:27, color:"#EF5350", x:110 },
                  { label:"Base",       val:36, color:"#2E7D32", x:210 },
                  { label:"Optimiste",  val:41, color:"#1B5E20", x:310 },
                ].map(({ label, val, color, x }) => {
                  const barH = (val / 45) * 185;
                  const y = 220 - barH;
                  return (
                    <g key={label}>
                      <rect x={x-35} y={y} width={70} height={barH} rx={6} fill={color}/>
                      <text x={x} y={y-7} textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{val}M</text>
                      <text x={x} y={238} textAnchor="middle" fontSize="9" fill="#555">{label}</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Note ARIA */}
            <div className="rounded-2xl p-4" style={{ background:"#E8F5E9", borderLeft:"4px solid #2E7D32" }}>
              <p className="text-xs font-semibold text-[#1B5E20] mb-1">Note ARIA — Analyse de probabilité</p>
              <p className="text-xs text-[#2E7D32] leading-relaxed">
                Le scénario de base est le plus probable (probabilité ARIA : <strong>65%</strong>).
                La tension sur les prix du cacao sur le marché mondial (LME) depuis Q2 2025 et la bonne pluviométrie Nawa
                soutiennent le scénario optimiste (probabilité <strong>25%</strong>).
                Scénario pessimiste : probabilité <strong>10%</strong> (risque géopolitique limité sur les corridors d'exportation).
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
