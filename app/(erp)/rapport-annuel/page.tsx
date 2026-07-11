"use client";

import { useRef } from "react";
import Topbar from "../../components/Topbar";
import { Printer, FileDown, Share2 } from "lucide-react";

/* ══════════════════════════════════════════════════════════
   RAPPORT ANNUEL 2024 — AGRIFRIK
══════════════════════════════════════════════════════════ */

export default function RapportAnnuelPage() {
  const rapportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => window.print();

  const SECTIONS = [
    { id: "s1", num: "1", label: "Mot du Directeur Général" },
    { id: "s2", num: "2", label: "Chiffres clés 2024" },
    { id: "s3", num: "3", label: "Activité de production" },
    { id: "s4", num: "4", label: "Résultats financiers" },
    { id: "s5", num: "5", label: "Ressources humaines" },
    { id: "s6", num: "6", label: "Responsabilité sociétale" },
    { id: "s7", num: "7", label: "Perspectives 2025-2026" },
    { id: "s8", num: "8", label: "États financiers résumés" },
  ];

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .sidebar, nav, header, aside { display: none !important; }
          body { background: white !important; }
          .rapport-root { background: white !important; padding: 0 !important; }
          .rapport-page { box-shadow: none !important; max-width: 100% !important; border-radius: 0 !important; }
          .page-break { page-break-before: always; }
          @page { margin: 20mm; size: A4; }
        }
      `}</style>

      {/* ── Topbar ──────────────────────────────────────────────────────────── */}
      <div className="no-print">
        <Topbar
          title="Rapport Annuel 2024"
          breadcrumb={["Rapports & BI", "Rapport Annuel"]}
        />
      </div>

      {/* ── Action bar ──────────────────────────────────────────────────────── */}
      <div className="no-print flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
        <p className="text-xs text-gray-400 italic">Exercice clos au 31 décembre 2024 — Édition juillet 2025</p>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Printer size={14} /> Imprimer
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">
            <FileDown size={14} /> Exporter PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2E7D32] text-white rounded-lg text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            <Share2 size={14} /> Partager
          </button>
        </div>
      </div>

      {/* ── Rapport ─────────────────────────────────────────────────────────── */}
      <div className="rapport-root bg-gray-100 min-h-screen py-8 px-4">
        <div ref={rapportRef} className="rapport-page max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">

          {/* ────────────────────────────────────────────────────────────────
              EN-TÊTE DU RAPPORT (bandeau vert foncé)
          ──────────────────────────────────────────────────────────────── */}
          <div className="bg-[#1B5E20] px-10 py-8 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-inner">
                <span className="text-3xl font-black text-[#1B5E20] leading-none">A</span>
              </div>
              <div>
                <p className="text-xl font-black text-white tracking-widest">AGRIFRIK</p>
                <p className="text-xs text-green-300 tracking-[0.2em] uppercase">AGROTEK CI SARL</p>
              </div>
            </div>

            {/* Titre central */}
            <div className="text-center">
              <h1 className="text-2xl font-black text-white tracking-tight">RAPPORT ANNUEL 2024</h1>
              <p className="text-green-300 text-xs mt-1">Exercice : 1er janvier au 31 décembre 2024</p>
              <p className="text-green-300 text-xs">Édition : Juillet 2025</p>
            </div>

            {/* Certification */}
            <div className="text-right">
              <div className="inline-block border border-green-400 rounded-lg px-3 py-2 text-right">
                <p className="text-[10px] text-green-300 uppercase tracking-wide">Certifié conforme</p>
                <p className="text-[10px] text-white font-semibold">SYSCOHADA révisé</p>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────────
              TABLE DES MATIÈRES
          ──────────────────────────────────────────────────────────────── */}
          <div className="no-print px-10 py-6 bg-[#F8FBF8] border-b border-gray-200">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Table des matières</h2>
            <div className="grid grid-cols-2 gap-2">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-center gap-2 text-xs text-gray-700 hover:text-[#2E7D32] transition-colors group"
                >
                  <span className="w-5 h-5 rounded-full bg-[#2E7D32] text-white text-[10px] font-bold flex items-center justify-center shrink-0 group-hover:bg-[#1B5E20] transition-colors">
                    {s.num}
                  </span>
                  <span className="flex-1 border-b border-dotted border-gray-300 pb-0.5">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────────
              CONTENU
          ──────────────────────────────────────────────────────────────── */}
          <div className="px-10 py-10 space-y-14">

            {/* ── SECTION 1 : MOT DU DG ──────────────────────────────────── */}
            <section id="s1" className="page-break">
              <SectionTitle number="1" title="Mot du Directeur Général" />
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed text-justify">
                <p>
                  L'année 2024 a été marquée par une croissance soutenue de notre activité cacaoyère, portée par la hausse
                  historique des cours mondiaux et l'excellence de notre démarche qualité certifiée Rainforest Alliance. Notre
                  coopérative agricole a franchi le cap des 140 membres actifs, renforçant notre ancrage territorial dans la
                  région de Soubré. Le chiffre d'affaires consolidé atteint <strong>224,8 millions de XOF</strong>, en
                  progression de <strong>+28,2% par rapport à 2023</strong>, porté par la fermeté des cours du cacao et
                  l'extension de nos filières certifiées vers les marchés européens.
                </p>
                <p>
                  Cet exercice a également été celui de la maîtrise opérationnelle : maîtrise des coûts de production grâce
                  à l'optimisation de nos intrants biologiques, maîtrise de la qualité grâce au déploiement de notre plan de
                  contrôle SYSCOHADA révisé, et maîtrise sociale grâce à la formation de <strong>195 producteurs
                  partenaires</strong> aux bonnes pratiques agricoles. Le résultat net dégagé — <strong>18,4 millions de
                  XOF</strong> — a été affecté à hauteur de 60% aux réserves de développement, témoignant de notre volonté
                  de financement endogène de la croissance. L'EBITDA franchit pour la première fois le seuil des 59 M XOF,
                  avec une marge de 26,5%, en hausse de 6,6 points par rapport à 2023.
                </p>
                <p>
                  Pour l'exercice 2025-2026, nous nous fixons des objectifs ambitieux : étendre nos surfaces certifiées
                  de 10 hectares supplémentaires, amorcer la diversification vers l'hévéa et le café, et engager la
                  labellisation biologique de deux parcelles pilotes. Je remercie l'ensemble de nos équipes, de nos
                  partenaires financiers et de nos coopérateurs pour leur confiance et leur engagement quotidien au service
                  d'une agriculture africaine moderne, durable et rentable.
                </p>
                <div className="mt-6 text-right border-t border-gray-100 pt-4">
                  <p className="text-sm font-bold text-gray-900">Jean-Baptiste KOFFI</p>
                  <p className="text-xs text-gray-500">Directeur Général, AGROTEK CI SARL</p>
                  <p className="text-xs text-gray-400">Soubré, juillet 2025</p>
                </div>
              </div>
            </section>

            <Divider />

            {/* ── SECTION 2 : CHIFFRES CLÉS ──────────────────────────────── */}
            <section id="s2" className="page-break">
              <SectionTitle number="2" title="Chiffres clés 2024" />
              <div className="grid grid-cols-3 gap-4">
                <MetricCard
                  label="Chiffre d'affaires 2024"
                  value="224,8 M"
                  unit="XOF"
                  trend="+28% vs 2023"
                  up
                />
                <MetricCard
                  label="Production totale"
                  value="142,6 t"
                  unit="toutes cultures"
                  trend="+18%"
                  up
                />
                <MetricCard
                  label="Effectif"
                  value="275"
                  unit="personnes"
                  trend="+22 vs 2023"
                  up
                />
                <MetricCard
                  label="Surfaces certifiées RA"
                  value="62 ha"
                  unit="Rainforest Alliance"
                  trend="100% certifié"
                  up
                />
                <MetricCard
                  label="Membres coopérative"
                  value="142"
                  unit="membres actifs"
                  trend="+24 nouveaux"
                  up
                />
                <MetricCard
                  label="Résultat net"
                  value="18,4 M"
                  unit="XOF"
                  trend="+42% vs 2023"
                  up
                  highlight
                />
              </div>
            </section>

            <Divider />

            {/* ── SECTION 3 : ACTIVITÉ DE PRODUCTION ────────────────────── */}
            <section id="s3" className="page-break">
              <SectionTitle number="3" title="Activité de production" />

              {/* Tableau cultures */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#2E7D32] text-white">
                      <th className="text-left px-3 py-2.5 font-semibold">Culture</th>
                      <th className="text-right px-3 py-2.5 font-semibold">Surface</th>
                      <th className="text-right px-3 py-2.5 font-semibold">Production</th>
                      <th className="text-right px-3 py-2.5 font-semibold">Rendement</th>
                      <th className="text-right px-3 py-2.5 font-semibold">Prix moyen</th>
                      <th className="text-right px-3 py-2.5 font-semibold">CA (M XOF)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { culture: "Cacao Grade AA", surface: "8,4 ha", prod: "48,2 t", rdt: "5,74 t/ha", prix: "980 XOF/kg", ca: "47,2", alt: false },
                      { culture: "Cacao Grade A/B", surface: "12,6 ha", prod: "68,4 t", rdt: "5,43 t/ha", prix: "940 XOF/kg", ca: "64,3", alt: true },
                      { culture: "Anacarde WW240", surface: "14,8 ha", prod: "18,6 t", rdt: "1,26 t/ha", prix: "620 XOF/kg", ca: "11,5", alt: false },
                      { culture: "Maïs (2 cycles)", surface: "8,2 ha", prod: "4,1 t × 2", rdt: "0,50 t/ha", prix: "205 XOF/kg", ca: "1,7", alt: true },
                      { culture: "Riz", surface: "4,0 ha", prod: "2,8 t", rdt: "0,70 t/ha", prix: "370 XOF/kg", ca: "1,0", alt: false },
                      { culture: "Élevage + Pisciculture", surface: "—", prod: "—", rdt: "—", prix: "—", ca: "10,8", alt: true },
                    ].map((row) => (
                      <tr key={row.culture} className={row.alt ? "bg-[#F8FBF8]" : "bg-white"}>
                        <td className="px-3 py-2 font-medium text-gray-800 border-b border-gray-100">{row.culture}</td>
                        <td className="px-3 py-2 text-right text-gray-600 border-b border-gray-100">{row.surface}</td>
                        <td className="px-3 py-2 text-right text-gray-600 border-b border-gray-100">{row.prod}</td>
                        <td className="px-3 py-2 text-right text-gray-600 border-b border-gray-100">{row.rdt}</td>
                        <td className="px-3 py-2 text-right text-gray-600 border-b border-gray-100">{row.prix}</td>
                        <td className="px-3 py-2 text-right font-bold text-gray-900 border-b border-gray-100">{row.ca}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#1B5E20] text-white font-bold">
                      <td className="px-3 py-2.5" colSpan={5}>TOTAL PRODUCTION 2024</td>
                      <td className="px-3 py-2.5 text-right">136,5</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* SVG Bar chart production cacao 12 mois */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Production cacao mensuelle 2024 (tonnes)
                </p>
                <CacaoBarChart />
              </div>
            </section>

            <Divider />

            {/* ── SECTION 4 : RÉSULTATS FINANCIERS ──────────────────────── */}
            <section id="s4" className="page-break">
              <SectionTitle number="4" title="Résultats financiers" />

              {/* Compte de résultat */}
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">
                Compte de résultat résumé
              </h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F8FBF8] border-b-2 border-[#2E7D32]">
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700">Libellé</th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700">2024 (M XOF)</th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700">2023 (M XOF)</th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700">Variation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Chiffre d'affaires", v24: "224,8", v23: "175,4", var: "+28,2% ↑", bold: false, alt: false, positive: true },
                      { label: "Achats & charges variables", v24: "(98,4)", v23: "(82,6)", var: "+19,1%", bold: false, alt: true, positive: false },
                      { label: "Marge brute — 56,2%", v24: "126,4", v23: "92,8", var: "+3,3 pts ↑", bold: true, alt: false, positive: true },
                      { label: "Charges de personnel", v24: "(42,1)", v23: "(36,4)", var: "+15,7%", bold: false, alt: true, positive: false },
                      { label: "Charges externes", v24: "(24,8)", v23: "(21,2)", var: "+17,0%", bold: false, alt: false, positive: false },
                      { label: "Dotations amortissements", v24: "(18,4)", v23: "(16,2)", var: "+13,6%", bold: false, alt: true, positive: false },
                      { label: "EBITDA — 26,5%", v24: "59,5", v23: "35,0", var: "+6,6 pts ↑", bold: true, alt: false, positive: true },
                      { label: "Charges financières nettes", v24: "(4,2)", v23: "(3,8)", var: "+10,5%", bold: false, alt: true, positive: false },
                      { label: "Résultat avant impôt", v24: "22,7", v23: "15,0", var: "+51,3% ↑", bold: true, alt: false, positive: true },
                      { label: "Impôt BIC CI (25%)", v24: "(4,3)", v23: "(2,8)", var: "+53,6%", bold: false, alt: true, positive: false },
                      { label: "Résultat net", v24: "18,4", v23: "12,2", var: "+50,8% ✅", bold: true, alt: false, positive: true },
                    ].map((row) => (
                      <tr
                        key={row.label}
                        className={
                          row.bold
                            ? "bg-green-50 font-bold border-y border-green-200"
                            : row.alt
                            ? "bg-[#F8FBF8]"
                            : "bg-white"
                        }
                      >
                        <td className={`px-3 py-2 ${row.bold ? "text-gray-900" : "text-gray-700"}`}>{row.label}</td>
                        <td className={`px-3 py-2 text-right font-mono tabular-nums ${row.bold ? "text-gray-900" : row.positive ? "text-gray-800" : "text-gray-600"}`}>
                          {row.v24}
                        </td>
                        <td className="px-3 py-2 text-right font-mono tabular-nums text-gray-500">{row.v23}</td>
                        <td className={`px-3 py-2 text-right font-semibold ${row.positive ? "text-green-700" : "text-gray-500"}`}>
                          {row.var}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bilan résumé */}
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Bilan résumé</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="bg-[#1B5E20] text-white text-xs font-bold px-4 py-2 rounded-t-lg tracking-wider">
                    ACTIF
                  </div>
                  <table className="w-full text-xs border border-gray-200 rounded-b-lg overflow-hidden">
                    <tbody>
                      {[
                        { label: "Actifs non courants", value: "148,5 M" },
                        { label: "Actifs courants", value: "82,6 M", alt: true },
                        { label: "Trésorerie", value: "28,4 M" },
                        { label: "TOTAL ACTIF", value: "259,5 M", total: true },
                      ].map((r) => (
                        <tr key={r.label} className={r.total ? "bg-gray-800 text-white font-bold" : r.alt ? "bg-[#F8FBF8]" : "bg-white"}>
                          <td className="px-3 py-2 text-gray-700" style={r.total ? { color: "white" } : {}}>{r.label}</td>
                          <td className="px-3 py-2 text-right font-mono tabular-nums" style={r.total ? { color: "white" } : { color: "#1a1a1a" }}>{r.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <div className="bg-[#1B5E20] text-white text-xs font-bold px-4 py-2 rounded-t-lg tracking-wider">
                    PASSIF
                  </div>
                  <table className="w-full text-xs border border-gray-200 rounded-b-lg overflow-hidden">
                    <tbody>
                      {[
                        { label: "Capitaux propres", value: "124,2 M" },
                        { label: "Dettes long terme", value: "62,8 M", alt: true },
                        { label: "Dettes court terme", value: "72,5 M" },
                        { label: "TOTAL PASSIF", value: "259,5 M", total: true },
                      ].map((r) => (
                        <tr key={r.label} className={r.total ? "bg-gray-800 text-white font-bold" : r.alt ? "bg-[#F8FBF8]" : "bg-white"}>
                          <td className="px-3 py-2 text-gray-700" style={r.total ? { color: "white" } : {}}>{r.label}</td>
                          <td className="px-3 py-2 text-right font-mono tabular-nums" style={r.total ? { color: "white" } : { color: "#1a1a1a" }}>{r.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <Divider />

            {/* ── SECTION 5 : RESSOURCES HUMAINES ───────────────────────── */}
            <section id="s5" className="page-break">
              <SectionTitle number="5" title="Ressources humaines" />
              <div className="grid grid-cols-4 gap-4">
                <RhCard label="Effectif total" value="275" sub="personnes" />
                <RhCard label="Masse salariale" value="38,4 M" sub="XOF / an" />
                <RhCard label="Formations dispensées" value="12" sub="sessions 2024" />
                <RhCard label="Fidélisation CDI" value="94%" sub="taux de rétention" highlight />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                <div className="bg-[#F8FBF8] rounded-xl p-4 border border-gray-100">
                  <p className="font-bold text-gray-800 mb-1">Répartition par genre</p>
                  <p className="text-gray-600">Femmes : <strong>44%</strong> — Hommes : <strong>56%</strong></p>
                </div>
                <div className="bg-[#F8FBF8] rounded-xl p-4 border border-gray-100">
                  <p className="font-bold text-gray-800 mb-1">Contrats</p>
                  <p className="text-gray-600">CDI : <strong>68%</strong> — CDD / Saisonnier : <strong>32%</strong></p>
                </div>
                <div className="bg-[#F8FBF8] rounded-xl p-4 border border-gray-100">
                  <p className="font-bold text-gray-800 mb-1">Taux d'accident</p>
                  <p className="text-gray-600"><strong>0,8%</strong> — objectif 2025 : &lt; 0,5%</p>
                </div>
              </div>
            </section>

            <Divider />

            {/* ── SECTION 6 : RSE ────────────────────────────────────────── */}
            <section id="s6" className="page-break">
              <SectionTitle number="6" title="Responsabilité sociétale" />
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9" fill="none"
                      stroke="#2E7D32" strokeWidth="3"
                      strokeDasharray={`${78} ${100 - 78}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-black text-[#2E7D32]">78</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Score RSE 2024 : 78 / 100</p>
                  <p className="text-xs text-gray-500">Objectif 2025 : 82 / 100 (+4 pts)</p>
                  <p className="text-xs text-gray-400 mt-1">Référentiel GRI Standards 2021</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 text-xs">
                {[
                  { pilier: "Environnement", score: "81/100", icon: "🌱", detail: "22 ha protégés — −38% pesticides — 94% compostage" },
                  { pilier: "Social", score: "76/100", icon: "👥", detail: "44% femmes — 195 producteurs formés — 2 écoles" },
                  { pilier: "Gouvernance", score: "80/100", icon: "🏛", detail: "7 membres CA — Audit externe réalisé — Code éthique 100%" },
                  { pilier: "Économique", score: "75/100", icon: "📊", detail: "+28% CA — Résultat net en hausse de 51%" },
                ].map((p) => (
                  <div key={p.pilier} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-800 text-white px-3 py-2 flex items-center gap-1.5">
                      <span>{p.icon}</span>
                      <span className="font-bold text-[10px] uppercase tracking-wide">{p.pilier}</span>
                    </div>
                    <div className="p-3">
                      <p className="text-lg font-black text-[#2E7D32]">{p.score}</p>
                      <p className="text-[10px] text-gray-500 leading-relaxed mt-1">{p.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── SECTION 7 : PERSPECTIVES ───────────────────────────────── */}
            <section id="s7" className="page-break">
              <SectionTitle number="7" title="Perspectives 2025-2026" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    num: "01",
                    titre: "Extension des surfaces",
                    points: [
                      "+10 ha de cacaoyers certifiés",
                      "Irrigation goutte-à-goutte sur 30 ha",
                      "Objectif 300 M XOF de CA en 2025",
                      "Rendement cible : 6,0 t/ha cacao",
                    ],
                  },
                  {
                    num: "02",
                    titre: "Diversification des cultures",
                    points: [
                      "Introduction de l'hévéa sur 5 ha pilotes",
                      "Lancement d'une parcelle café arabica 3 ha",
                      "Unité de transformation anacarde (huile de cajou)",
                      "Exportation vers le marché japonais",
                    ],
                  },
                  {
                    num: "03",
                    titre: "Labellisation bio",
                    points: [
                      "2 parcelles pilotes en conversion bio",
                      "Certification Fairtrade avant déc. 2025",
                      "−50% engrais chimiques d'ici fin 2025",
                      "Score RSE cible : 82/100",
                    ],
                  },
                ].map((ax) => (
                  <div key={ax.num} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-[#2E7D32] text-white px-4 py-3">
                      <p className="text-xs font-black opacity-50 tracking-widest">{ax.num}</p>
                      <p className="text-sm font-bold leading-tight mt-0.5">{ax.titre}</p>
                    </div>
                    <ul className="px-4 py-3 space-y-2">
                      {ax.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs text-gray-700">
                          <span className="text-[#2E7D32] font-bold mt-0.5 shrink-0">›</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <Divider />

            {/* ── SECTION 8 : ÉTATS FINANCIERS ──────────────────────────── */}
            <section id="s8" className="page-break">
              <SectionTitle number="8" title="États financiers résumés" />
              <div className="bg-[#F8FBF8] border border-gray-200 rounded-xl p-6 text-sm text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900 mb-2">Disponibilité des états financiers complets</p>
                <p>
                  Les états financiers complets — Bilan détaillé, Compte de résultat (CPC), Tableau des flux de
                  trésorerie, Tableau de variation des capitaux propres et Annexes aux états financiers — sont
                  établis conformément au <strong>Système Comptable OHADA révisé (SYSCOHADA)</strong> et sont
                  disponibles auprès du <strong>Directeur Administratif et Financier (DAF)</strong> d'AGROTEK CI
                  SARL sur demande motivée.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                    <p className="font-bold text-gray-800">Bilan</p>
                    <p className="text-gray-500 mt-0.5">Total : 259,5 M XOF</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                    <p className="font-bold text-gray-800">CPC</p>
                    <p className="text-gray-500 mt-0.5">RN : 18,4 M XOF</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                    <p className="font-bold text-gray-800">Flux trésorerie</p>
                    <p className="text-gray-500 mt-0.5">Tréso nette : 28,4 M</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-400 italic">
                  Les états financiers ont été arrêtés par le Conseil d'Administration le 15 juin 2025 et
                  soumis à l'audit externe annuel. Référence : Rapport d'audit DAF-2024-AE-007.
                </p>
              </div>
            </section>

          </div>{/* /contenu */}

          {/* ── Pied de page ─────────────────────────────────────────────────── */}
          <div className="border-t-2 border-[#2E7D32] px-10 py-6 flex items-center justify-between text-xs text-gray-400 bg-[#F8FBF8]">
            <div>
              <p className="font-bold text-gray-700">AGROTEK CI SARL</p>
              <p>Soubré, Région de la Nawa, Côte d'Ivoire</p>
              <p>contact@agrotek.ci · +225 07 00 00 00</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-[#2E7D32] opacity-20">AGRIFRIK</p>
              <p className="text-[10px] mt-1">Rapport Annuel 2024</p>
            </div>
            <div className="text-right">
              <p>Exercice clos au 31 décembre 2024</p>
              <p>Approuvé par le Conseil d'Administration</p>
              <p className="font-semibold text-gray-600">Juillet 2025</p>
            </div>
          </div>

        </div>{/* /rapport-page */}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   SOUS-COMPOSANTS
══════════════════════════════════════════════════════════ */

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-4xl font-black text-[#2E7D32] opacity-20 leading-none select-none">{number}</span>
      <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide border-b-2 border-[#2E7D32] pb-1 flex-1">
        {title}
      </h2>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />;
}

function MetricCard({
  label, value, unit, trend, up, highlight,
}: {
  label: string; value: string; unit: string; trend?: string; up?: boolean; highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${highlight ? "border-[#2E7D32] bg-green-50" : "border-gray-100 bg-white"}`}>
      <p className="text-xs text-gray-500 font-medium mb-2 leading-tight">{label}</p>
      <p className={`text-3xl font-black leading-none ${highlight ? "text-[#1B5E20]" : "text-gray-900"}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{unit}</p>
      {trend && (
        <p className={`text-xs font-semibold mt-2 ${up ? "text-green-600" : "text-red-500"}`}>
          {up ? "▲" : "▼"} {trend}
        </p>
      )}
    </div>
  );
}

function RhCard({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 text-center ${highlight ? "border-[#2E7D32] bg-green-50" : "border-gray-100 bg-[#F8FBF8]"}`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-black ${highlight ? "text-[#1B5E20]" : "text-gray-900"}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function CacaoBarChart() {
  const data = [
    { mois: "Jan", t: 7.2 },
    { mois: "Fév", t: 5.8 },
    { mois: "Mar", t: 6.4 },
    { mois: "Avr", t: 9.1 },
    { mois: "Mai", t: 14.8 },
    { mois: "Jun", t: 18.2 },
    { mois: "Jul", t: 16.5 },
    { mois: "Aoû", t: 12.3 },
    { mois: "Sep", t: 10.6 },
    { mois: "Oct", t: 7.9 },
    { mois: "Nov", t: 6.4 },
    { mois: "Déc", t: 5.4 },
  ];
  const max = Math.max(...data.map((d) => d.t));
  const W = 680;
  const H = 140;
  const padL = 36;
  const padR = 12;
  const padT = 16;
  const padB = 28;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const barW = (chartW / data.length) * 0.55;
  const gap = chartW / data.length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full border border-gray-100 rounded-xl bg-[#F8FBF8]"
    >
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
        const y = padT + chartH * (1 - pct);
        return (
          <g key={pct}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e5e7eb" strokeWidth={0.5} />
            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={8} fill="#9ca3af">
              {(max * pct).toFixed(0)}
            </text>
          </g>
        );
      })}
      {/* Bars */}
      {data.map((d, i) => {
        const bh = (d.t / max) * chartH;
        const x = padL + i * gap + gap / 2 - barW / 2;
        const y = padT + chartH - bh;
        return (
          <g key={d.mois}>
            <rect x={x} y={y} width={barW} height={bh} fill="#2E7D32" rx={2} />
            <text x={x + barW / 2} y={H - padB + 12} textAnchor="middle" fontSize={8} fill="#6b7280">
              {d.mois}
            </text>
            {d.t === max && (
              <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize={7} fill="#2E7D32" fontWeight="bold">
                {d.t}t
              </text>
            )}
          </g>
        );
      })}
      {/* Axis */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#d1d5db" strokeWidth={1} />
      <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#d1d5db" strokeWidth={1} />
      {/* Label */}
      <text x={padL} y={padT - 4} fontSize={8} fill="#6b7280">tonnes</text>
    </svg>
  );
}
