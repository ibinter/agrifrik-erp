import Topbar from "../../../components/Topbar";
import { ArrowLeft, ShoppingCart, FileText, Package, Leaf, Award } from "lucide-react";
import Link from "next/link";

export default async function SemenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar
        breadcrumb={["Production", "Semences", `Variété ${id}`]}
      />

      <main className="flex-1 p-6 space-y-6">
        {/* En-tête bandeau vert */}
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#1B5E20] text-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono bg-white/20 px-2 py-0.5 rounded">SEM-CAC-001</span>
                  <span className="text-xs bg-green-400/30 border border-green-400/50 px-2 py-0.5 rounded flex items-center gap-1">
                    ✅ Certifiée CNRA
                  </span>
                  <span className="text-xs bg-emerald-400/30 border border-emerald-400/50 px-2 py-0.5 rounded flex items-center gap-1">
                    🌱 Recommandée RA
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-1">Cacao Forastero hybride T-60/887</h1>
                <div className="text-green-200 text-sm space-y-0.5">
                  <p><span className="text-green-400 font-medium">Obtenteur :</span> CNRA Côte d&apos;Ivoire (Centre National de Recherche Agronomique)</p>
                  <p><span className="text-green-400 font-medium">Famille :</span> Forastero &nbsp;|&nbsp; <span className="text-green-400 font-medium">Sous-famille :</span> Amelonado amélioré</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="text-green-300" size={40} />
              </div>
            </div>
          </div>

          {/* 5 KPI */}
          <div className="grid grid-cols-2 md:grid-cols-5 bg-white border-t border-gray-100">
            <div className="p-4 border-r border-gray-100 last:border-r-0">
              <p className="text-xs text-gray-500 mb-1">Rendement potentiel</p>
              <p className="text-lg font-bold text-[#1B5E20]">2,2–2,8 t/ha</p>
              <p className="text-xs text-gray-400">conditions optimales</p>
            </div>
            <div className="p-4 border-r border-gray-100 last:border-r-0">
              <p className="text-xs text-gray-500 mb-1">Rendement moy. AGRIFRIK</p>
              <p className="text-lg font-bold text-[#2E7D32]">1,28 t/ha</p>
              <p className="text-xs text-gray-400">parcelles matures</p>
            </div>
            <div className="p-4 border-r border-gray-100 last:border-r-0">
              <p className="text-xs text-gray-500 mb-1">Stock disponible</p>
              <p className="text-lg font-bold text-orange-600">4,2 kg</p>
              <p className="text-xs text-orange-500">⚠️ stock bas — seuil 5 kg</p>
            </div>
            <div className="p-4 border-r border-gray-100 last:border-r-0">
              <p className="text-xs text-gray-500 mb-1">Taux de germination</p>
              <p className="text-lg font-bold text-[#2E7D32]">94%</p>
              <p className="text-xs text-gray-400">test 05/2025</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">Durée conservation</p>
              <p className="text-lg font-bold text-gray-700">6 mois max</p>
              <p className="text-xs text-gray-400">&lt;15°C, 50% HR</p>
            </div>
          </div>
        </div>

        {/* Caractéristiques agronomiques */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-[#1B5E20] mb-4 flex items-center gap-2">
            <Award size={16} />
            Caractéristiques agronomiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Physiologie */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100">Physiologie</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["Cycle végétatif", "Pérenne (20-30 ans d'exploitation)"],
                    ["Première fructification", "3 ans (conditions optimales)"],
                    ["Pleine production", "à partir de 5 ans"],
                    ["Type cabosses", "Angoleta (côtes prononcées, 35-45 fèves/cabosse)"],
                    ["Couleur cabosse mûre", "Jaune-orangé"],
                    ["Teneur en beurre de cacao", "52-56%"],
                    ["Teneur en protéines", "11-13%"],
                    ["Classification ICCO", "Bulk (Forastero standard)"],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-1.5 pr-3 text-gray-500 font-medium w-1/2">{label}</td>
                      <td className="py-1.5 text-gray-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Exigences culturales */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100">Exigences culturales</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["Altitude optimale", "100-400 m"],
                    ["Pluviométrie", "1 500-2 000 mm/an (2 saisons)"],
                    ["Température optimale", "24-28°C (nocturne min. 18°C)"],
                    ["Sol idéal", "Limon argileux, pH 5,5-6,5"],
                    ["Ombrage requis", "25-40% (ombrage temporaire puis permanent)"],
                    ["Espacement conseillé", "3m × 3m (1 111 plants/ha)"],
                    ["Résistance mirides", "Moyenne (traitement préventif requis)"],
                    ["Résistance Phytophthora", "Bonne (variété tolérante)"],
                    ["Résistance swollen shoot", "Sensible ⚠️"],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-1.5 pr-3 text-gray-500 font-medium w-1/2">{label}</td>
                      <td className="py-1.5 text-gray-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Calendrier cultural SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-[#1B5E20] mb-4">Phénologie T-60/887 — Calendrier mensuel Côte d&apos;Ivoire</h2>
          <div className="overflow-x-auto">
            <svg viewBox="0 0 700 240" width="700" height="240" xmlns="http://www.w3.org/2000/svg" className="min-w-[700px]">
              {/* Background */}
              <rect width="700" height="240" fill="#F8FBF8" rx="8" />

              {/* Column headers — months */}
              {["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"].map((m, i) => (
                <g key={m}>
                  <rect x={80 + i * 51} y={0} width={51} height={22} fill={i % 2 === 0 ? "#E8F5E9" : "#F1F8F1"} />
                  <text x={80 + i * 51 + 25.5} y={15} textAnchor="middle" fontSize={10} fill="#2E7D32" fontWeight="600">{m}</text>
                  <line x1={80 + i * 51} y1={0} x2={80 + i * 51} y2={240} stroke="#D0E8D0" strokeWidth={0.5} />
                </g>
              ))}
              <line x1={80} y1={0} x2={700} y2={0} stroke="#D0E8D0" strokeWidth={0.5} />

              {/* Row labels */}
              {[
                "Floraison princ.",
                "Floraison second.",
                "Nouaison",
                "Croissance cab.",
                "Récolte",
                "Traitements / Ferti",
              ].map((label, i) => (
                <g key={label}>
                  <rect x={0} y={22 + i * 36} width={80} height={36} fill={i % 2 === 0 ? "#F9FFF9" : "#F2FAF2"} />
                  <text x={4} y={22 + i * 36 + 22} fontSize={8.5} fill="#444" fontWeight="500">{label}</text>
                  <line x1={0} y1={22 + i * 36} x2={700} y2={22 + i * 36} stroke="#E0EEE0" strokeWidth={0.5} />
                </g>
              ))}
              <line x1={80} y1={22} x2={80} y2={240} stroke="#B0D8B0" strokeWidth={1} />

              {/* Helper: col x center = 80 + col*51 + 25.5, row y center = 22 + row*36 + 18 */}
              {/* Row 0 — Floraison principale: Fév(1), Mar(2), Sep(8), Oct(9) */}
              {[1,2,8,9].map(c => (
                <circle key={c} cx={80 + c*51 + 25.5} cy={22 + 0*36 + 18} r={10} fill="#2E7D32" opacity={0.85} />
              ))}

              {/* Row 1 — Floraison secondaire: all months (small) */}
              {[0,1,2,3,4,5,6,7,8,9,10,11].map(c => (
                <circle key={c} cx={80 + c*51 + 25.5} cy={22 + 1*36 + 18} r={5} fill="#81C784" opacity={0.7} />
              ))}

              {/* Row 2 — Nouaison: Mar(2), Avr(3), Oct(9), Nov(10) */}
              {[2,3,9,10].map(c => (
                <circle key={c} cx={80 + c*51 + 25.5} cy={22 + 2*36 + 18} r={9} fill="#4CAF50" opacity={0.75} />
              ))}

              {/* Row 3 — Croissance cabosses: Avr-Jul(3-6) + Nov-Fév(10-11,0,1) — blue bars */}
              {[3,4,5,6].map(c => (
                <rect key={c} x={80 + c*51 + 4} y={22 + 3*36 + 8} width={43} height={20} fill="#1976D2" rx={4} opacity={0.7} />
              ))}
              {[10,11].map(c => (
                <rect key={c} x={80 + c*51 + 4} y={22 + 3*36 + 8} width={43} height={20} fill="#1976D2" rx={4} opacity={0.7} />
              ))}
              {[0,1].map(c => (
                <rect key={c} x={80 + c*51 + 4} y={22 + 3*36 + 8} width={43} height={20} fill="#1976D2" rx={4} opacity={0.5} />
              ))}

              {/* Row 4 — Récolte principale: Oct-Déc(9-11) orange, intermédiaire: Mai-Jun(4-5) orange clair */}
              {[9,10,11].map(c => (
                <rect key={c} x={80 + c*51 + 4} y={22 + 4*36 + 8} width={43} height={20} fill="#E65100" rx={4} opacity={0.85} />
              ))}
              {[4,5].map(c => (
                <rect key={c} x={80 + c*51 + 4} y={22 + 4*36 + 8} width={43} height={20} fill="#FF8F00" rx={4} opacity={0.6} />
              ))}

              {/* Row 5 — Traitements (Jan=0, Mar=2, Jun=5, Sep=8) triangles rouges / Fertilisation (Mar=2, Jun=5, Oct=9) étoiles vertes */}
              {[0,2,5,8].map(c => {
                const cx = 80 + c*51 + 25.5;
                const cy = 22 + 5*36 + 18;
                return <polygon key={`t${c}`} points={`${cx},${cy-10} ${cx-9},${cy+8} ${cx+9},${cy+8}`} fill="#D32F2F" opacity={0.85} />;
              })}
              {[2,5,9].map(c => {
                const cx = 80 + c*51 + 25.5;
                const cy = 22 + 5*36 + 18;
                const pts = Array.from({length:5}, (_,i) => {
                  const a = (i*72 - 90) * Math.PI/180;
                  const b = ((i*72+36) - 90) * Math.PI/180;
                  return `${cx+10*Math.cos(a)},${cy+10*Math.sin(a)} ${cx+5*Math.cos(b)},${cy+5*Math.sin(b)}`;
                }).join(' ');
                return <polygon key={`s${c}`} points={pts} fill="#1B5E20" opacity={0.9} />;
              })}

              {/* Legend */}
              <rect x={82} y={220} width={10} height={10} fill="#2E7D32" rx={5} />
              <text x={96} y={230} fontSize={8} fill="#444">Floraison princ.</text>
              <rect x={180} y={220} width={10} height={10} fill="#1976D2" rx={2} />
              <text x={194} y={230} fontSize={8} fill="#444">Croissance</text>
              <rect x={260} y={220} width={10} height={10} fill="#E65100" rx={2} />
              <text x={274} y={230} fontSize={8} fill="#444">Récolte princ.</text>
              <rect x={345} y={220} width={10} height={10} fill="#FF8F00" rx={2} />
              <text x={359} y={230} fontSize={8} fill="#444">Récolte interm.</text>
              <polygon points="450,220 441,232 459,232" fill="#D32F2F" />
              <text x={463} y={230} fontSize={8} fill="#444">Traitement phyto</text>
              <polygon points="545,225 541,232 543,228 537,228 542,225 540,220 545,224 550,220 548,225 553,228 547,228 549,232" fill="#1B5E20" />
              <text x={558} y={230} fontSize={8} fill="#444">Fertilisation</text>
            </svg>
          </div>
        </div>

        {/* Historique d'utilisation AGRIFRIK */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-[#1B5E20] mb-4">Historique d&apos;utilisation AGRIFRIK</h2>

          <h3 className="text-sm font-semibold text-gray-600 mb-2">Plantations</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Parcelle","Date plantation","Nbre plants","Surface","Stade actuel","Rendement dernière campagne"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["PAR-A1","15/03/2008","1 050 (3×3m)","3,2 ha","Pleine production (17 ans)","1,28 t/ha"],
                  ["PAR-A3","10/04/2010","1 600 (3×3m)","4,8 ha","Pleine production (15 ans)","1,24 t/ha"],
                  ["PAR-B2","08/04/2019","1 110 (3×3m)","3,3 ha","Jeune plantation (6 ans) — 1ère récolte 2022","0,82 t/ha"],
                  ["PAR-B4","15/03/2023","1 550 (3×3m)","4,6 ha","Croissance (2 ans) — pas encore en production","0 t/ha (en attente)"],
                ].map(row => (
                  <tr key={row[0]} className="hover:bg-gray-50/50">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-3 py-2 text-gray-700 ${j===0 ? "font-medium text-[#2E7D32]" : ""}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-semibold text-gray-600 mb-2">Stock et approvisionnement</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Lot","Origine","Date réception","Qté initiale","Qté restante","Taux germination","DLU","Stockage"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-2 font-medium text-[#2E7D32]">LOT-SEM-2025-01</td>
                  <td className="px-3 py-2 text-gray-700">CNRA Soubré</td>
                  <td className="px-3 py-2 text-gray-700">15/02/2025</td>
                  <td className="px-3 py-2 text-gray-700">8 kg</td>
                  <td className="px-3 py-2">
                    <span className="text-orange-600 font-semibold">4,2 kg</span>
                  </td>
                  <td className="px-3 py-2 text-[#2E7D32] font-medium">94%</td>
                  <td className="px-3 py-2">
                    <span className="text-orange-600 font-medium">15/08/2025 ⚠️</span>
                  </td>
                  <td className="px-3 py-2 text-gray-700">Chambre froide 12°C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparaison variétés */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-[#1B5E20] mb-4">Comparaison variétés de cacao</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Variété","Rendement moy.","Résist. Phyto","Résist. mirides","Teneur beurre","Prix semences","Recommandation"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["T-60/887 (utilisée)","1,28 t/ha","✅ Bonne","⚠️ Moyenne","54%","18 500 XOF/kg","✅ Recommandée", true],
                  ["ICS-1","1,15 t/ha","✅ Bonne","✅ Bonne","52%","16 000 XOF/kg","Pour terrains humides", false],
                  ["PA-150","1,45 t/ha","⚠️ Moyenne","⚠️ Moyenne","48%","22 000 XOF/kg","Potentiel élevé, risque", false],
                  ["Forastero pur","0,9 t/ha","✅ Très bonne","✅ Bonne","56%","8 000 XOF/kg","Non recommandée (rendement bas)", false],
                  ["Trinitario local","0,8 t/ha","❌ Faible","❌ Faible","58%","12 000 XOF/kg","Fine flavour uniquement", false],
                ].map(row => (
                  <tr key={row[0] as string} className={`hover:bg-gray-50/50 ${row[7] ? "bg-green-50/60" : ""}`}>
                    <td className={`px-3 py-2 font-medium ${row[7] ? "text-[#1B5E20]" : "text-gray-700"}`}>{row[0] as string}</td>
                    {(row as string[]).slice(1,7).map((cell, j) => (
                      <td key={j} className="px-3 py-2 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/semences"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} />
            Retour aux semences
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-sm font-medium hover:bg-[#1B5E20] transition-colors">
            <ShoppingCart size={14} />
            Commander cette variété
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FileText size={14} />
            Fiche technique PDF
          </button>
        </div>
      </main>
    </div>
  );
}
