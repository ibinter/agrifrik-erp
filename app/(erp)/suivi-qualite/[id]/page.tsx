import Topbar from "../../../components/Topbar";
import { ArrowLeft, Download, CheckCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function SuiviQualiteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar
        breadcrumb={["Commerce", "Suivi Qualité", `Contrôle ${id}`]}
      />

      <div className="p-6 space-y-6">
        {/* En-tête bandeau vert */}
        <div className="rounded-2xl p-6 text-white" style={{ background: "#1B5E20" }}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">CQ-2025-046</h1>
                <span className="text-sm text-green-300 font-medium">— Lot LOT-2025-046</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-400/20 text-green-200 border border-green-400/30">
                  <CheckCircle size={12} />
                  Grade AA validé — Lot approuvé pour export
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 text-sm text-green-100">
                <div>
                  <span className="text-green-300 font-medium">Type :</span>{" "}
                  Cut test + analyse humidité post-séchage
                </div>
                <div>
                  <span className="text-green-300 font-medium">Date :</span>{" "}
                  01/07/2025
                </div>
                <div>
                  <span className="text-green-300 font-medium">Lieu :</span>{" "}
                  Séchoir solaire EXP-001 — Soubré
                </div>
                <div>
                  <span className="text-green-300 font-medium">Opérateur :</span>{" "}
                  Ibrahim Sawadogo
                </div>
                <div>
                  <span className="text-green-300 font-medium">Contre-expertise :</span>{" "}
                  Bureau Veritas Soubré
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Score global", value: "96/100", badge: "✅" },
            { label: "Grade attribué", value: "AA", sub: "≥95% fèves brunes" },
            { label: "Humidité", value: "7,2%", badge: "✅", sub: "norme ≤8%" },
            { label: "Cut test brunes", value: "97%", badge: "✅", sub: "norme ≥95%" },
            { label: "Poids net contrôlé", value: "964 kg", badge: "✅" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 font-medium">{k.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {k.badge && <span className="mr-1">{k.badge}</span>}
                {k.value}
              </p>
              {k.sub && <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>}
            </div>
          ))}
        </div>

        {/* Cut test résultats */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Cut test — Résultats détaillés</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Méthodologie : Prélèvement aléatoire de 2 × 50 fèves (100 fèves au total) + contrôle BV 50 fèves
            </p>
          </div>
          <div className="p-6 flex flex-col lg:flex-row gap-8 items-start">
            {/* Tableau */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#F8FBF8" }}>
                    {["Critère", "Norme RA/Grade AA", "Résultat AGRIFRIK", "Résultat BV", "Conformité"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { critere: "% fèves brunes (fermentées)", norme: "≥95%", agrifrik: "97%", bv: "96%", ok: true },
                    { critere: "% fèves violettes (sous-fermentées)", norme: "≤5%", agrifrik: "2%", bv: "3%", ok: true },
                    { critere: "% fèves plates/ardoisées", norme: "≤2%", agrifrik: "0%", bv: "0%", ok: true, excellent: true },
                    { critere: "% moisissures", norme: "≤3%", agrifrik: "0,8%", bv: "1,0%", ok: true },
                    { critere: "% insectes/débris", norme: "≤0%", agrifrik: "0%", bv: "0%", ok: true, excellent: true },
                  ].map((row) => (
                    <tr key={row.critere} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-800">{row.critere}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{row.norme}</td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-900">{row.agrifrik}</td>
                      <td className="px-4 py-3 text-xs text-gray-700">{row.bv}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${row.excellent ? "bg-green-200 text-green-900" : "bg-green-100 text-green-800"}`}>
                          <CheckCircle size={9} /> {row.excellent ? "Excellent" : "Conforme"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-200 font-bold bg-green-50">
                    <td className="px-4 py-3 text-xs text-green-900">Score global</td>
                    <td className="px-4 py-3 text-xs text-gray-500"></td>
                    <td className="px-4 py-3 text-xs text-green-900 font-bold">97,4/100</td>
                    <td className="px-4 py-3 text-xs text-green-800 font-bold">96,8/100</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-700 text-white">
                        <CheckCircle size={9} /> GRADE AA
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Donut SVG */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <p className="text-xs font-semibold text-gray-700 text-center">Visualisation cut test</p>
              <svg viewBox="0 0 280 280" width="220" height="220" xmlns="http://www.w3.org/2000/svg">
                {/* Donut : Brunes 97%, Violettes 2%, Moisissures 0.8%, Autres 0.2% */}
                {/* Circumference at r=90: 2π×90 ≈ 565.49 */}
                {/* Brunes: 97% = 548.5 / gap = 565.49 - 548.5 = 16.99 */}
                <circle cx="140" cy="140" r="90" fill="none" stroke="#1B5E20" strokeWidth="36"
                  strokeDasharray="548.5 16.99"
                  strokeDashoffset="141.37"
                  strokeLinecap="butt"
                />
                {/* Violettes: 2% = 11.31, offset = 141.37 - 548.5 = -407.13 → 565.49 - 407.13 = 158.36 */}
                <circle cx="140" cy="140" r="90" fill="none" stroke="#E65100" strokeWidth="36"
                  strokeDasharray="11.31 554.18"
                  strokeDashoffset="141.37"
                  strokeLinecap="butt"
                />
                {/* Moisissures: 0.8% = 4.52 */}
                <circle cx="140" cy="140" r="90" fill="none" stroke="#c62828" strokeWidth="36"
                  strokeDasharray="4.52 560.97"
                  strokeDashoffset="129.58"
                  strokeLinecap="butt"
                />
                {/* Autres 0.2% = 1.13 */}
                <circle cx="140" cy="140" r="90" fill="none" stroke="#9e9e9e" strokeWidth="36"
                  strokeDasharray="1.13 564.36"
                  strokeDashoffset="125.06"
                  strokeLinecap="butt"
                />
                {/* Centre */}
                <text x="140" y="134" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1B5E20">97%</text>
                <text x="140" y="154" textAnchor="middle" fontSize="11" fill="#555">Brunes</text>
              </svg>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                {[
                  { color: "#1B5E20", label: "Brunes", pct: "97%" },
                  { color: "#E65100", label: "Violettes", pct: "2%" },
                  { color: "#c62828", label: "Moisissures", pct: "0,8%" },
                  { color: "#9e9e9e", label: "Autres", pct: "0,2%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-semibold text-gray-800">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Analyse physico-chimique */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Analyse physico-chimique</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#F8FBF8" }}>
                  {["Paramètre", "Valeur mesurée", "Norme", "Méthode", "Conformité"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { param: "Teneur en eau (humidité)", val: "7,2%", norme: "≤8%", methode: "Humidimètre PFEUFFER" },
                  { param: "pH après fermentation", val: "5,2", norme: "4,8-5,8", methode: "pH-mètre" },
                  { param: "Teneur en graisses (beurre)", val: "52,4%", norme: "≥50%", methode: "Extraction Soxhlet" },
                  { param: "Teneur en caféine", val: "1,8%", norme: "<2,5%", methode: "HPLC" },
                  { param: "Charge microbienne totale", val: "82 UFC/g", norme: "<1000 UFC/g", methode: "Gélose Plate Count" },
                  { param: "Résidus pesticides", val: "<LD", norme: "Conforme RA/EFSA", methode: "LC-MS/MS BV Lab" },
                ].map((row) => (
                  <tr key={row.param} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-xs text-gray-800 font-medium">{row.param}</td>
                    <td className="px-6 py-3 text-xs font-bold text-gray-900">{row.val}</td>
                    <td className="px-6 py-3 text-xs text-gray-600">{row.norme}</td>
                    <td className="px-6 py-3 text-xs text-gray-500">{row.methode}</td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-800">
                        <CheckCircle size={9} /> Conforme
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-50 bg-amber-50 rounded-b-2xl">
            <p className="text-xs text-amber-800">
              <span className="font-semibold">Note CNRA :</span>{" "}
              &quot;Profil aromatique : notes fruitées prononcées, faible amertume — caractéristique des cacaos de la Nawa,
              très appréciés par Barry Callebaut pour les chocolats noirs premium.&quot;
            </p>
          </div>
        </div>

        {/* Traçabilité du lot — timeline */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Traçabilité du lot LOT-2025-046</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="relative pl-6 space-y-0">
              {[
                {
                  date: "28/06/2025",
                  label: "Récolte cabosses PAR-A1",
                  detail: "Ibrahim Sawadogo + 2 saisonniers",
                  highlight: false,
                },
                {
                  date: "28/06/2025",
                  label: "Écabossage + mise en fermentation (Bac F3)",
                  detail: "",
                  highlight: false,
                },
                {
                  date: "28/06 → 04/07",
                  label: "Fermentation 6 jours",
                  detail: "T° mesurée J2:48°C / J3:52°C / J4:50°C / J5:46°C",
                  highlight: false,
                },
                {
                  date: "04/07/2025",
                  label: "Rinçage + mise sur claies de séchage",
                  detail: "",
                  highlight: false,
                },
                {
                  date: "04/07 → 01/07",
                  label: "Séchage solaire 7 jours",
                  detail: "Humidité initiale 55% → 7,2%",
                  highlight: false,
                },
                {
                  date: "01/07/2025",
                  label: "Cut test interne : 97% brunes ✅",
                  detail: "",
                  highlight: true,
                },
                {
                  date: "01/07/2025",
                  label: "Contre-expertise Bureau Veritas : 96% brunes ✅",
                  detail: "",
                  highlight: true,
                },
                {
                  date: "01/07/2025",
                  label: "Mise en sacs jute (14,83 sacs × 65 kg)",
                  detail: "",
                  highlight: false,
                },
                {
                  date: "22/06/2025",
                  label: "Expédition vers San-Pédro",
                  detail: "BL : MAEU-CI-0908",
                  highlight: false,
                },
              ].map((item, i, arr) => (
                <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Ligne verticale */}
                  {i < arr.length - 1 && (
                    <div className="absolute left-0 top-5 bottom-0 w-px bg-gray-200" style={{ left: "-1.25rem" }} />
                  )}
                  {/* Dot */}
                  <div
                    className="absolute w-3 h-3 rounded-full border-2 shrink-0 mt-1"
                    style={{
                      left: "-1.625rem",
                      background: item.highlight ? "#2E7D32" : "#fff",
                      borderColor: item.highlight ? "#2E7D32" : "#9ca3af",
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-[10px] font-mono text-gray-400">{item.date}</span>
                      <span className={`text-xs font-medium ${item.highlight ? "text-green-800" : "text-gray-800"}`}>
                        {item.label}
                      </span>
                    </div>
                    {item.detail && (
                      <p className="text-[10px] text-gray-500 mt-0.5">{item.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-800">
                <span className="font-semibold">Note :</span>{" "}
                La fermentation de ce lot a bénéficié des conditions climatiques optimales (T° nocturne 24°C, humidité relative 78%)
                caractéristiques de la saison des pluies dans la Nawa.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/suivi-qualite"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} />
            Retour au suivi qualité
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white transition-colors" style={{ background: "#2E7D32" }}>
            <Download size={14} />
            Télécharger le rapport BV
          </button>
          <Link
            href="/stocks"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={14} />
            Voir le lot LOT-2025-046
          </Link>
        </div>
      </div>
    </div>
  );
}
