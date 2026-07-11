"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── SVG : Radar 5 axes ───────────────────────────────────────────────────────

function RadarKPIs() {
  const axes = [
    { label: "Production", angle: -90, v2023: 85, v2024: 91 },
    { label: "CA", angle: -18, v2023: 90, v2024: 94 },
    { label: "Qualité AA", angle: 54, v2023: 86, v2024: 89 },
    { label: "Score RA", angle: 126, v2023: 91, v2024: 92 },
    { label: "Bien-être", angle: 198, v2023: 72, v2024: 76 },
  ];
  const cx = 160, cy = 160, R = 110;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const pt = (angle: number, r: number) => ({
    x: cx + r * Math.cos(toRad(angle)),
    y: cy + r * Math.sin(toRad(angle)),
  });

  const poly2023 = axes.map((a) => { const p = pt(a.angle, (a.v2023 / 100) * R); return `${p.x},${p.y}`; }).join(" ");
  const poly2024 = axes.map((a) => { const p = pt(a.angle, (a.v2024 / 100) * R); return `${p.x},${p.y}`; }).join(" ");

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-xs mx-auto" aria-label="Synthèse KPIs 2024 vs 2023">
      {[25, 50, 75, 100].map((lvl) => {
        const pts = axes.map((a) => { const p = pt(a.angle, (lvl / 100) * R); return `${p.x},${p.y}`; }).join(" ");
        return <polygon key={lvl} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
      })}
      {axes.map((a) => { const outer = pt(a.angle, R); return <line key={a.label} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="#e5e7eb" strokeWidth="1" />; })}
      <polygon points={poly2023} fill="#9ca3af" fillOpacity="0.15" stroke="#9ca3af" strokeWidth="1.5" />
      <polygon points={poly2024} fill="#2E7D32" fillOpacity="0.2" stroke="#2E7D32" strokeWidth="2" />
      {axes.map((a, i) => {
        const lp = pt(a.angle, R + 24);
        return (
          <g key={i}>
            <text x={lp.x} y={lp.y} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">{a.label}</text>
            <text x={lp.x} y={lp.y + 11} textAnchor="middle" fontSize="8" fill="#6b7280">{a.v2024}</text>
          </g>
        );
      })}
      {/* Legend */}
      <rect x="10" y="296" width="10" height="10" rx="2" fill="#9ca3af" opacity="0.5" />
      <text x="24" y="305" fontSize="9" fill="#6b7280">2023</text>
      <rect x="60" y="296" width="10" height="10" rx="2" fill="#2E7D32" opacity="0.5" />
      <text x="74" y="305" fontSize="9" fill="#374151" fontWeight="600">2024</text>
    </svg>
  );
}

// ─── SVG : Barres mensuelles + ligne objectif ─────────────────────────────────

function ProductionMensuelleChart() {
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const realise = [0.45, 0.48, 0.52, 0.55, 0.78, 0.82, 0.60, 0.65, 0.72, 1.85, 1.90, 1.28];
  const objectif = [0.50, 0.50, 0.55, 0.60, 0.75, 0.80, 0.60, 0.65, 0.70, 1.80, 1.85, 1.20];
  const maxV = 2.0;
  const W = 640, H = 260, padL = 44, padB = 36, padT = 20, padR = 20;
  const cW = W - padL - padR, cH = H - padB - padT;
  const barW = 32, gap = (cW - months.length * barW) / (months.length + 1);

  // Line path for objectif
  const linePts = objectif.map((v, i) => {
    const x = padL + gap + i * (barW + gap) + barW / 2;
    const y = padT + cH - (v / maxV) * cH;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Production mensuelle 2024 vs objectif">
      <line x1={padL} y1={padT} x2={padL} y2={padT + cH} stroke="#e5e7eb" strokeWidth="1" />
      <line x1={padL} y1={padT + cH} x2={padL + cW} y2={padT + cH} stroke="#e5e7eb" strokeWidth="1" />
      {[0, 0.5, 1.0, 1.5, 2.0].map((v) => {
        const y = padT + cH - (v / maxV) * cH;
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={padL + cW} y2={y} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4,3" />
            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}t</text>
          </g>
        );
      })}
      {realise.map((v, i) => {
        const x = padL + gap + i * (barW + gap);
        const bH = (v / maxV) * cH;
        const y = padT + cH - bH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bH} rx="3" fill="#4CAF50" opacity="0.85" />
            <text x={x + barW / 2} y={padT + cH + 14} textAnchor="middle" fontSize="9" fill="#6b7280">{months[i]}</text>
          </g>
        );
      })}
      <polyline points={linePts} fill="none" stroke="#E65100" strokeWidth="2" strokeDasharray="5,3" strokeLinecap="round" />
      {objectif.map((v, i) => {
        const x = padL + gap + i * (barW + gap) + barW / 2;
        const y = padT + cH - (v / maxV) * cH;
        return <circle key={i} cx={x} cy={y} r="3" fill="#E65100" />;
      })}
      {/* Legend */}
      <rect x={padL + 8} y={padT + 4} width="10" height="10" rx="2" fill="#4CAF50" opacity="0.85" />
      <text x={padL + 22} y={padT + 13} fontSize="9" fill="#374151">Réalisé (10,1t total)</text>
      <line x1={padL + 110} y1={padT + 9} x2={padL + 122} y2={padT + 9} stroke="#E65100" strokeWidth="2" strokeDasharray="4,2" />
      <circle cx={padL + 116} cy={padT + 9} r="2.5" fill="#E65100" />
      <text x={padL + 126} y={padT + 13} fontSize="9" fill="#374151">Objectif (9,5t)</text>
    </svg>
  );
}

// ─── SVG : Line chart CA + Résultat 2019-2024 ────────────────────────────────

function CAResultatChart() {
  const years = ["2019", "2020", "2021", "2022", "2023", "2024"];
  const ca = [5.6, 6.2, 7.9, 8.8, 10.0, 13.1];
  const res = [0.2, 0.4, 0.8, 1.1, 1.9, 3.2];
  const W = 640, H = 220, padL = 48, padB = 36, padT = 20, padR = 20;
  const cW = W - padL - padR, cH = H - padB - padT;
  const maxCA = 14, maxRes = 4;
  const n = years.length;
  const xOf = (i: number) => padL + (i / (n - 1)) * cW;

  const caPath = ca.map((v, i) => `${i === 0 ? "M" : "L"}${xOf(i)},${padT + cH - (v / maxCA) * cH}`).join(" ");
  const resPath = res.map((v, i) => `${i === 0 ? "M" : "L"}${xOf(i)},${padT + cH - (v / maxRes) * cH}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Évolution CA et résultat 2019-2024">
      <line x1={padL} y1={padT} x2={padL} y2={padT + cH} stroke="#e5e7eb" />
      <line x1={padL} y1={padT + cH} x2={padL + cW} y2={padT + cH} stroke="#e5e7eb" />
      {[0, 3.5, 7, 10.5, 14].map((v) => {
        const y = padT + cH - (v / maxCA) * cH;
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={padL + cW} y2={y} stroke="#f3f4f6" strokeDasharray="4,3" />
            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}M</text>
          </g>
        );
      })}
      <path d={caPath} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={resPath} fill="none" stroke="#E65100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5,3" />
      {ca.map((v, i) => <circle key={i} cx={xOf(i)} cy={padT + cH - (v / maxCA) * cH} r="4" fill="#2E7D32" />)}
      {res.map((v, i) => <circle key={i} cx={xOf(i)} cy={padT + cH - (v / maxRes) * cH} r="3.5" fill="#E65100" />)}
      {years.map((y, i) => <text key={y} x={xOf(i)} y={padT + cH + 14} textAnchor="middle" fontSize="9" fill="#6b7280">{y}</text>)}
      {/* Annotation 2024 */}
      <text x={xOf(5) + 6} y={padT + cH - (13.1 / maxCA) * cH - 6} fontSize="9" fontWeight="700" fill="#1B5E20">13,1M</text>
      <text x={xOf(5) + 6} y={padT + cH - (3.2 / maxRes) * cH - 6} fontSize="9" fontWeight="700" fill="#E65100">3,2M</text>
      {/* Legend */}
      <line x1={padL + 4} y1={padT + 6} x2={padL + 18} y2={padT + 6} stroke="#2E7D32" strokeWidth="2.5" />
      <text x={padL + 22} y={padT + 10} fontSize="9" fill="#374151">CA (XOF)</text>
      <line x1={padL + 80} y1={padT + 6} x2={padL + 94} y2={padT + 6} stroke="#E65100" strokeWidth="2" strokeDasharray="4,2" />
      <text x={padL + 98} y={padT + 10} fontSize="9" fill="#374151">Résultat net</text>
    </svg>
  );
}

// ─── Onglet Vue d'ensemble ────────────────────────────────────────────────────

function VueEnsembleTab() {
  const faits = [
    { icon: "🏆", titre: "Record production", desc: "10,1t — meilleure récolte depuis 10 ans" },
    { icon: "✅", titre: "Renouvellement RA", desc: "Score 92/100 (+1 pt vs 2023)" },
    { icon: "💰", titre: "CA en hausse +12,4%", desc: "12,2M XOF vs 10,9M en 2023" },
    { icon: "🤝", titre: "Partenariat FAO", desc: "Projet BAI-2025-001 signé (48M XOF)" },
    { icon: "🌱", titre: "Impact carbone", desc: "-612 tCO₂e — exploitation carbone-négative" },
    { icon: "👥", titre: "Formation BPA", desc: "4 agents formés (ANADER)" },
  ];

  return (
    <div className="space-y-6">
      {/* Faits marquants */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Faits marquants 2024</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {faits.map((f) => (
            <div key={f.titre} className="flex items-start gap-3 bg-[#F8FBF8] rounded-xl p-4">
              <span className="text-2xl flex-shrink-0">{f.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{f.titre}</p>
                <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-1">Synthèse KPIs 2024 vs 2023</h3>
        <p className="text-xs text-gray-400 mb-4">Radar 5 axes — score /100</p>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-full sm:w-72 flex-shrink-0">
            <RadarKPIs />
          </div>
          <div className="flex-1 space-y-3 w-full">
            {[
              { label: "Production", v2023: 85, v2024: 91 },
              { label: "Chiffre d'affaires", v2023: 90, v2024: 94 },
              { label: "Qualité Grade AA", v2023: 86, v2024: 89 },
              { label: "Score RA", v2023: 91, v2024: 92 },
              { label: "Bien-être social", v2023: 72, v2024: 76 },
            ].map((a) => (
              <div key={a.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{a.label}</span>
                  <span className="font-bold text-[#2E7D32]">{a.v2024}/100 <span className="text-gray-400 font-normal">(2023 : {a.v2023})</span></span>
                </div>
                <div className="relative w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 rounded-full bg-gray-300" style={{ width: `${a.v2023}%` }} />
                  <div className="absolute top-0 h-2 rounded-full bg-[#2E7D32]" style={{ width: `${a.v2024}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Onglet Production ────────────────────────────────────────────────────────

function ProductionTab() {
  const parcelles = [
    { id: "PAR-A1", surface: "2,3 ha", prod: "2,28t", rdt: "0,99 t/ha", vs: "+8,3%", grade: "94%" },
    { id: "PAR-A2", surface: "2,1 ha", prod: "2,02t", rdt: "0,96 t/ha", vs: "+7,9%", grade: "92%" },
    { id: "PAR-B1", surface: "1,8 ha", prod: "0,92t", rdt: "0,51 t/ha", vs: "+18,0%", grade: "88%" },
    { id: "PAR-B2", surface: "1,4 ha", prod: "—", rdt: "—", vs: "Plantation 2022", grade: "—" },
    { id: "PAR-C1 anacarde", surface: "3,2 ha", prod: "1,92t", rdt: "0,60 t/ha", vs: "+4,3%", grade: "—" },
  ];

  const incidents = [
    { date: "Avr 2024", incident: "Pic mirides PAR-A1 (taux 12%)", impact: "-80 kg estimé", mesure: "Traitement Confidor d'urgence" },
    { date: "Juin 2024", incident: "Pourriture brune (Phytophthora) PAR-B1", impact: "-45 kg", mesure: "Rinçage cuprique + élimination cabosses" },
  ];

  return (
    <div className="space-y-6">
      {/* Chart mensuel */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-1">Production mensuelle 2024 vs objectif</h3>
        <p className="text-xs text-gray-400 mb-4">Total réalisé : 10,1t vs objectif 9,5t (+6,3%)</p>
        <ProductionMensuelleChart />
      </div>

      {/* Tableau parcelles */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Production par parcelle</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Parcelle", "Surface", "Production", "Rendement", "vs 2023", "Grade AA%"].map((h) => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {parcelles.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-[#2E7D32]">{p.id}</td>
                  <td className="px-3 py-2 text-gray-700">{p.surface}</td>
                  <td className="px-3 py-2 font-medium">{p.prod}</td>
                  <td className="px-3 py-2 text-gray-600">{p.rdt}</td>
                  <td className="px-3 py-2">
                    {p.vs.startsWith("+") ? (
                      <span className="text-green-600 font-semibold text-xs">{p.vs}</span>
                    ) : <span className="text-gray-400 text-xs">{p.vs}</span>}
                  </td>
                  <td className="px-3 py-2">
                    {p.grade !== "—" ? (
                      <span className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">{p.grade}</span>
                    ) : <span className="text-gray-400">—</span>}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#F8FBF8] font-bold text-[#1B5E20]">
                <td className="px-3 py-2">TOTAL</td>
                <td className="px-3 py-2"></td>
                <td className="px-3 py-2">7,14t cacao</td>
                <td className="px-3 py-2">0,88 t/ha</td>
                <td className="px-3 py-2 text-green-600">+8,4%</td>
                <td className="px-3 py-2">93,2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Incidents */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Incidents et arrêts de production 2024</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Date", "Incident", "Impact", "Mesure prise"].map((h) => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {incidents.map((inc, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{inc.date}</td>
                  <td className="px-3 py-2 text-gray-800">{inc.incident}</td>
                  <td className="px-3 py-2">
                    <span className="text-red-600 font-semibold text-xs">{inc.impact}</span>
                  </td>
                  <td className="px-3 py-2 text-gray-600">{inc.mesure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Onglet Finance ───────────────────────────────────────────────────────────

function FinanceTab() {
  const cr = [
    { poste: "Ventes cacao", compte: "701", v2024: "10 978 700", v2023: "9 763 800", ecart: "+12,5%", type: "rev" },
    { poste: "Ventes anacarde", compte: "701", v2024: "1 228 800", v2023: "1 176 000", ecart: "+4,5%", type: "rev" },
    { poste: "Ventes poisson", compte: "701", v2024: "860 000", v2023: "820 000", ecart: "+4,9%", type: "rev" },
    { poste: "CHIFFRE D'AFFAIRES", compte: "", v2024: "13 067 500", v2023: "11 759 800", ecart: "+11,1%", type: "subtotal" },
    { poste: "Intrants phytosanitaires", compte: "602", v2024: "-4 284 000", v2023: "-3 980 000", ecart: "+7,6%", type: "charge" },
    { poste: "Main-d'œuvre saisonniers", compte: "641", v2024: "-3 200 000", v2023: "-3 100 000", ecart: "+3,2%", type: "charge" },
    { poste: "Amortissements", compte: "681", v2024: "-2 250 000", v2023: "-2 250 000", ecart: "0%", type: "charge" },
    { poste: "Charges financières", compte: "661", v2024: "-124 000", v2023: "-480 000", ecart: "-74,2%", type: "charge" },
    { poste: "RÉSULTAT NET", compte: "", v2024: "3 209 500", v2023: "1 949 800", ecart: "+64,6%", type: "result" },
  ];

  return (
    <div className="space-y-6">
      {/* Compte de résultat */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-1">Compte de résultat simplifié SYSCOHADA 2024</h3>
        <p className="text-xs text-gray-400 mb-4">Montants en XOF</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Poste", "Compte", "2024 (XOF)", "2023 (XOF)", "Écart"].map((h) => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cr.map((row, i) => {
                const isSubtotal = row.type === "subtotal";
                const isResult = row.type === "result";
                const isCharge = row.type === "charge";
                return (
                  <tr key={i} className={isSubtotal || isResult ? "bg-[#F8FBF8]" : "hover:bg-gray-50"}>
                    <td className={`px-3 py-2 ${isSubtotal || isResult ? "font-bold text-[#1B5E20]" : "text-gray-700"}`}>{row.poste}</td>
                    <td className="px-3 py-2 text-gray-400 font-mono text-xs">{row.compte}</td>
                    <td className={`px-3 py-2 font-medium ${isResult ? "text-[#1B5E20] font-bold" : isCharge ? "text-red-600" : "text-gray-900"}`}>{row.v2024}</td>
                    <td className="px-3 py-2 text-gray-500">{row.v2023}</td>
                    <td className="px-3 py-2">
                      <span className={`text-xs font-semibold ${row.ecart.startsWith("+") ? "text-green-600" : row.ecart.startsWith("-") && isCharge ? "text-green-600" : "text-gray-500"}`}>{row.ecart}</span>
                      {(isResult) && <span className="ml-1 text-xs text-gray-400">(crédit soldé)</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-gray-400 italic">* Charges financières : crédit BIAO soldé en nov. 2024</div>
      </div>

      {/* Line chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-1">Évolution du CA et résultat 2019–2024</h3>
        <p className="text-xs text-gray-400 mb-4">En millions XOF — axe gauche CA (vert), axe droit résultat (orange)</p>
        <CAResultatChart />
      </div>

      {/* Bilan */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Bilan simplifié au 31/12/2024 (XOF)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 border-b pb-1">ACTIF</p>
            {[
              ["Immobilisations nettes", "18 800 000"],
              ["Stocks", "11 200 000"],
              ["Créances clients", "2 400 000"],
              ["Trésorerie", "9 200 000"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 border-b border-gray-50 text-sm">
                <span className="text-gray-700">{k}</span>
                <span className="font-medium text-gray-900">{v}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 mt-1 text-sm font-bold text-[#1B5E20] border-t border-gray-200">
              <span>TOTAL ACTIF</span>
              <span>41 600 000</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 border-b pb-1">PASSIF</p>
            {[
              ["Capital", "15 000 000"],
              ["Résultat 2024", "3 200 000"],
              ["Dettes LT (Crédit BIAO soldé)", "0"],
              ["Dettes CT", "23 400 000"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 border-b border-gray-50 text-sm">
                <span className="text-gray-700">{k}</span>
                <span className={`font-medium ${v === "0" ? "text-green-500" : "text-gray-900"}`}>{v}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 mt-1 text-sm font-bold text-[#1B5E20] border-t border-gray-200">
              <span>TOTAL PASSIF</span>
              <span>41 600 000 ✅</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Onglet RSE & Certifications ──────────────────────────────────────────────

function RSETab() {
  const odds = [
    { num: "ODD 1", label: "Pas de pauvreté", score: 68, color: "#E53935" },
    { num: "ODD 2", label: "Faim zéro", score: 74, color: "#FF9800" },
    { num: "ODD 8", label: "Travail décent", score: 59, color: "#9C27B0" },
    { num: "ODD 12", label: "Conso. responsable", score: 72, color: "#795548" },
    { num: "ODD 13", label: "Action climatique", score: 81, color: "#607D8B" },
  ];

  const timeline = [
    { year: "2021", score: 82, note: "Première certification" },
    { year: "2022", score: 87, note: "Extension à 2 nouvelles parcelles" },
    { year: "2023", score: 91, note: "Élargissement BPA — 100% surfaces" },
    { year: "2024", score: 92, note: "Renouvellement — score record" },
  ];

  const emplois = [
    ["Permanents", "6", "6 150 000 XOF/an"],
    ["Saisonniers 2024", "18", "3 200 000 XOF/saison"],
    ["Femmes (% main-d'œuvre)", "34%", "—"],
    ["Agents formés BPA", "4", "Prise en charge ANADER"],
  ];

  return (
    <div className="space-y-6">
      {/* Scorecard ODD */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Scorecard RSE 2024 — Objectifs de Développement Durable</h3>
        <div className="space-y-4">
          {odds.map((o) => (
            <div key={o.num}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: o.color }}>{o.num}</span>
                  <span className="text-sm text-gray-700">{o.label}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: o.color }}>{o.score}/100</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="h-3 rounded-full transition-all" style={{ width: `${o.score}%`, backgroundColor: o.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline RA */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Historique certifications Rainforest Alliance 2021–2024</h3>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex items-center gap-4 relative">
                <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center text-white font-bold flex-shrink-0 z-10 shadow ${i === timeline.length - 1 ? "bg-[#1B5E20]" : "bg-[#4CAF50]"}`}>
                  <span className="text-lg">{t.score}</span>
                  <span className="text-xs opacity-80">/100</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.year}</p>
                  <p className="text-xs text-gray-500">{t.note}</p>
                </div>
                {i === timeline.length - 1 && (
                  <span className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Actif</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rapport social */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Rapport social 2024</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Catégorie", "Effectif / Valeur", "Rémunération / Détail"].map((h) => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {emplois.map(([cat, val, rem], i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-700">{cat}</td>
                  <td className="px-3 py-2 font-semibold text-[#1B5E20]">{val}</td>
                  <td className="px-3 py-2 text-gray-500">{rem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Bilan carbone", val: "-612 tCO₂e", sub: "Carbone-négatif" },
            { label: "0 ha déforestation", val: "✅", sub: "Engagement tenu 2024" },
            { label: "Score global RSE", val: "70/100", sub: "Moyenne 5 ODD" },
          ].map((k) => (
            <div key={k.label} className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-sm font-bold text-[#1B5E20]">{k.val}</div>
              <div className="text-xs font-medium text-gray-700 mt-0.5">{k.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = ["Vue d'ensemble", "Production", "Finance", "RSE & Certifications"] as const;
type Tab = typeof TABS[number];

export default function RapportAnnuelPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Vue d'ensemble");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Rapport Annuel"]} />

      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {/* En-tête bandeau vert */}
        <div className="rounded-2xl p-6 mb-6 text-white" style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)" }}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-green-300 uppercase tracking-widest mb-1">AGRIFRIK EXP-001</p>
              <h1 className="text-2xl font-bold mb-1">Rapport Annuel 2024 — Exploitation Familiale Amani</h1>
              <p className="text-sm text-green-200">Bilan complet de l&apos;exercice 2024 — SYSCOHADA — Certifié RA</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-green-100">✅ Exercice 2024 clos</span>
                <span className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs text-green-100">Approuvé par : Koffi Amani DG — 28/01/2025</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl px-4 py-2 text-sm font-medium transition-all"
              >
                🖨️ Imprimer
              </button>
              <button
                onClick={() => alert("Export PDF à connecter au backend")}
                className="flex items-center gap-1.5 bg-white text-[#1B5E20] hover:bg-green-50 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
              >
                📥 Télécharger PDF
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl border border-gray-100 p-1 mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Vue d'ensemble" && <VueEnsembleTab />}
        {activeTab === "Production" && <ProductionTab />}
        {activeTab === "Finance" && <FinanceTab />}
        {activeTab === "RSE & Certifications" && <RSETab />}
      </div>
    </div>
  );
}
