import Topbar from "../../../components/Topbar";
import { ArrowLeft, ShoppingCart, BarChart2, CheckCircle, Leaf, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function SemenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Production", "Semences", `Variété ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#1B5E20" }}>
          <div className="p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Leaf className="w-6 h-6 text-green-300" />
                  <h1 className="text-xl font-bold">Hybride F1 PH16</h1>
                  <span className="text-green-300 text-sm font-medium">— Theobroma cacao</span>
                </div>
                <p className="text-sm text-green-100 mt-2">
                  <span className="font-medium text-white">Origine :</span> CNRA CI (Centre National de Recherche Agronomique) — Station de Divo
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100 mt-1">
                  <span><span className="font-medium text-white">Code catalogue :</span> CNRA-CAC-VAR-PH16</span>
                  <span><span className="font-medium text-white">Homologué CI :</span> 2009</span>
                </div>
                <p className="text-sm text-green-100 mt-1">
                  <span className="font-medium text-white">Caractéristique principale :</span> Résistance Phytophthora palmivora — tolérant mirides
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <span className="inline-flex items-center gap-1.5 bg-green-700 text-green-100 text-xs font-medium px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-green-300" />
                  Variété recommandée RA 2020
                </span>
                <span className="inline-flex items-center gap-1.5 bg-green-700 text-green-100 text-xs font-medium px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-green-300" />
                  Utilisée sur EXP-001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Pieds sur EXP-001", value: "~9 200 pieds", sub: "PAR-A1 + A2 + B1" },
            { label: "Rendement potentiel", value: "1 500–2 000 kg/ha", sub: "Potentiel variétal" },
            { label: "Rendement EXP-001 obtenu", value: "1 368 kg/ha", sub: "PAR-A1 2024 ✅" },
            { label: "Âge optimal production", value: "4–25 ans", sub: "Durée économique" },
            { label: "Taux Grade AA obtenu", value: "85–90%", sub: "Qualité export ✅" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-base font-bold text-[#2E7D32]">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Fiche technique variétale */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#2E7D32]" />
            Fiche technique variétale
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-2.5 font-medium text-gray-600 rounded-l-lg">Paramètre</th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-600 rounded-r-lg">Valeur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Famille", "Trinitario × Forastero (hybride amélioration)"],
                  ["Cycle de production", "3-4 ans (première récolte), plein rendement à 6-7 ans"],
                  ["Durée de vie économique", "25-30 ans"],
                  ["Taille des cabosses", "400-550 g (cabosses allongées rougeâtres à maturité)"],
                  ["Nombre fèves/cabosse", "38-42 fèves (excellent pour grade AA)"],
                  ["Résistance Phytophthora", "+++ (tolérance à P. palmivora — PI <5%)"],
                  ["Tolérance mirides", "++ (moindre attractivité pour Sahlbergella singularis)"],
                  ["Sensibilité sécheresse", "Modérée (irrigation d'appoint recommandée zone Nawa)"],
                  ["Arbres d'ombre recommandés", "Gliricidia sepium (fixateur azote) + Erythrina sp."],
                ].map(([param, valeur]) => (
                  <tr key={param} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium text-gray-700">{param}</td>
                    <td className="px-4 py-2.5 text-gray-600">{valeur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performances comparatives SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
            Performances comparatives (EXP-001 — 2022-2024)
          </h2>
          <p className="text-xs text-gray-500 mb-4">Rendement kg/ha — PH16 vs Standard CI</p>

          <div className="overflow-x-auto">
            <svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-2xl">
              {/* Grid lines */}
              {([0, 500, 1000, 1500] as number[]).map((v) => {
                const y = 170 - (v / 1600) * 130;
                return (
                  <g key={v}>
                    <line x1="60" y1={y} x2="610" y2={y} stroke="#e5e7eb" strokeWidth="1" />
                    <text x="52" y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">{v}</text>
                  </g>
                );
              })}
              {/* Axes */}
              <line x1="60" y1="170" x2="610" y2="170" stroke="#d1d5db" strokeWidth="1.5" />
              <line x1="60" y1="40" x2="60" y2="170" stroke="#d1d5db" strokeWidth="1.5" />
              {/* Axis labels */}
              <text x="335" y="210" textAnchor="middle" fontSize="11" fill="#6b7280">Année</text>
              <text x="14" y="108" textAnchor="middle" fontSize="11" fill="#6b7280" transform="rotate(-90 14 108)">kg/ha</text>
              {/* Legend */}
              <rect x="340" y="16" width="12" height="12" fill="#2E7D32" rx="2" />
              <text x="356" y="26" fontSize="11" fill="#374151">PH16 EXP-001</text>
              <rect x="450" y="16" width="12" height="12" fill="#9ca3af" rx="2" />
              <text x="466" y="26" fontSize="11" fill="#374151">Standard CI</text>
              {/* Bars */}
              {(
                [
                  { year: "2022", ph16: 1105, std: 750, x: 150 },
                  { year: "2023", ph16: 1263, std: 750, x: 340 },
                  { year: "2024", ph16: 1368, std: 750, x: 530 },
                ] as { year: string; ph16: number; std: number; x: number }[]
              ).map(({ year, ph16, std, x }) => {
                const ph16H = (ph16 / 1600) * 130;
                const stdH = (std / 1600) * 130;
                return (
                  <g key={year}>
                    <rect x={x - 32} y={170 - ph16H} width="30" height={ph16H} fill="#2E7D32" rx="3" />
                    <text x={x - 17} y={170 - ph16H - 5} textAnchor="middle" fontSize="9" fill="#2E7D32" fontWeight="600">{ph16}</text>
                    <rect x={x + 2} y={170 - stdH} width="30" height={stdH} fill="#9ca3af" rx="3" />
                    <text x={x + 17} y={170 - stdH - 5} textAnchor="middle" fontSize="9" fill="#6b7280">{std}</text>
                    <text x={x} y="185" textAnchor="middle" fontSize="11" fill="#374151">{year}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-100">
            <p className="text-xs text-green-800">
              <span className="font-semibold">Note :</span> Le PH16 affiche +82% vs standard national grâce à la gestion BPA (ANADER) et la certification RA.
            </p>
          </div>
        </div>

        {/* Approvisionnement en plants */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-[#2E7D32]" />
            Approvisionnement en plants — Historique des plantations EXP-001
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Année", "Parcelle", "Pieds plantés", "Fournisseur", "Prix unitaire", "Coût total"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["2014", "PAR-A1", "3 990 pieds", "Pépinière CNRA Soubré", "650 XOF/plant", "2 593 500 XOF"],
                  ["2016", "PAR-A2", "4 410 pieds", "Pépinière CNRA Soubré", "650 XOF/plant", "2 866 500 XOF"],
                  ["2018", "PAR-B1 (zone)", "800 plants (densification)", "Pépinière CNRA Soubré", "750 XOF/plant", "600 000 XOF"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50">
                    {row.map((cell, i) => (
                      <td key={i} className={`px-4 py-2.5 ${i === 0 || i === 5 ? "font-medium text-gray-700" : "text-gray-600"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-xs text-amber-800">
              <span className="font-semibold">Note :</span> La prochaine replantation partielle est prévue 2026-2028 pour les plants de 2014 arrivant en fin de cycle optimal (12-14 ans). Budget estimé : ~5 000 plants × 900 XOF = 4 500 000 XOF.
            </p>
          </div>
        </div>

        {/* Autres variétés EXP-001 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#2E7D32]" />
            Autres variétés EXP-001
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Variété", "Espèce", "Superficie", "Particularité"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { variete: "PH16 (principale)", espece: "Theobroma cacao", superficie: "~13,5 ha", particularite: "Résistant Phytophthora ✅", highlight: true },
                  { variete: "Mercedes (locale résiduelle)", espece: "Theobroma cacao", superficie: "~1,0 ha (PAR-B1)", particularite: "Qualité arôme supérieure mais rendement moindre", highlight: false },
                  { variete: "Obatanpa amélioré", espece: "Zea mays (maïs)", superficie: "0,3 ha PAR-C1", particularite: "Culture intercalaire vivrière", highlight: false },
                  { variete: "Alloco (banane plantain)", espece: "Musa paradisiaca", superficie: "linéaire PAR-A1", particularite: "Ombrage transitoire jeunes plants", highlight: false },
                ].map((row) => (
                  <tr key={row.variete} className="hover:bg-gray-50">
                    <td className={`px-4 py-2.5 font-medium ${row.highlight ? "text-[#2E7D32]" : "text-gray-700"}`}>{row.variete}</td>
                    <td className="px-4 py-2.5 text-gray-600 italic">{row.espece}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.superficie}</td>
                    <td className="px-4 py-2.5 text-gray-600">{row.particularite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-4">
          <Link
            href="/semences"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Retour aux semences
          </Link>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            <ShoppingCart className="w-3.5 h-3.5" />
            Commander des plants CNRA
          </button>
          <button className="inline-flex items-center gap-2 border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-green-50 transition-colors">
            <BarChart2 className="w-3.5 h-3.5" />
            Voir les performances parcelles
          </button>
        </div>

      </main>
    </div>
  );
}
