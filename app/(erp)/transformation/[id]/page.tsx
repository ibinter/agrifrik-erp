import Topbar from "../../../components/Topbar";

// Températures fermentation LOT-046 (J1-J7)
const TEMP_046 = [38, 44, 48, 49.2, 50, 47, 42];
const TEMP_DAYS = ["J1", "J2", "J3", "J4", "J5", "J6", "J7"];

const ETAPES_DETAIL = [
  { etape: "Récolte & transport", dates: "24-26/06", duree: "3j",   params: "2 820 kg cabosses",          resultat: "Effectué — Ibrahim S." },
  { etape: "Écabossage",          dates: "26/06",    duree: "1j",   params: "2 820 kg → 1 020 kg fèves", resultat: "Rendement écabossage 36,2%" },
  { etape: "Fermentation",        dates: "27/06-03/07", duree: "7j", params: "Pic T° J4 = 49,2°C ✅",   resultat: "Fermentation complète" },
  { etape: "Ressuyage",           dates: "03-04/07", duree: "24h",  params: "Évacuation excès eau",       resultat: "Effectué" },
  { etape: "Séchage solaire",     dates: "04-10/07", duree: "7j",   params: "Ensoleillement moyen 7h/j",  resultat: "Humidité 7,1%" },
  { etape: "Tri & calibrage",     dates: "10/07",    duree: "0,5j", params: "Cut test + taux humidité",   resultat: "Grade AA 94%" },
  { etape: "Ensachage",           dates: "10/07",    duree: "0,5j", params: "14 sacs × 65 kg + 54 kg",   resultat: "964 kg net" },
];

const CUT_TEST = [
  { param: "Humidité",              resultat: "7,1%",  norme: "<8%",   statut: "Conforme" },
  { param: "Fèves bien fermentées", resultat: "94%",   norme: ">75%",  statut: "Excellent" },
  { param: "Fèves ardoisées",       resultat: "3%",    norme: "<8%",   statut: "Conforme" },
  { param: "Fèves violettes",       resultat: "3%",    norme: "<8%",   statut: "Conforme" },
  { param: "Fèves moisies",         resultat: "0%",    norme: "<4%",   statut: "Excellent" },
  { param: "Fèves germées",         resultat: "0%",    norme: "<3%",   statut: "Excellent" },
];

function FermentationSVG() {
  const W = 640, H = 200;
  const padL = 52, padR = 24, padT = 28, padB = 40;
  const gW = W - padL - padR;
  const gH = H - padT - padB;
  const minY = 32, maxY = 56;
  const scaleY = (v: number) => padT + gH - ((v - minY) / (maxY - minY)) * gH;
  const scaleX = (i: number) => padL + (i / (TEMP_046.length - 1)) * gW;

  const zoneTop = scaleY(52);
  const zoneBot = scaleY(45);
  const pts = TEMP_046.map((v, i) => `${scaleX(i)},${scaleY(v)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: W }}>
      {/* Zone optimale */}
      <rect x={padL} y={zoneTop} width={gW} height={zoneBot - zoneTop} fill="#4CAF50" fillOpacity={0.13} />
      <text x={padL + 4} y={zoneTop - 3} fill="#2E7D32" fontSize={9}>Optimal 45-52°C</text>
      {/* Grid */}
      {[35, 40, 45, 50, 55].map((t) => (
        <line key={t} x1={padL} y1={scaleY(t)} x2={W - padR} y2={scaleY(t)} stroke="#e5e7eb" strokeWidth={1} />
      ))}
      {/* Courbe */}
      <polyline points={pts} fill="none" stroke="#ef4444" strokeWidth={2.5} />
      {/* Points */}
      {TEMP_046.map((v, i) => (
        <g key={i}>
          <circle cx={scaleX(i)} cy={scaleY(v)} r={5} fill="#ef4444" />
          <text x={scaleX(i)} y={scaleY(v) - 9} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight="bold">
            {v}°C
          </text>
        </g>
      ))}
      {/* Annotation J4 */}
      <line x1={scaleX(3)} y1={padT} x2={scaleX(3)} y2={H - padB} stroke="#f97316" strokeWidth={1} strokeDasharray="4,3" />
      <text x={scaleX(3) + 4} y={padT + 10} fill="#f97316" fontSize={8} fontWeight="bold">Alerte ARIA J4</text>
      {/* X labels */}
      {TEMP_DAYS.map((d, i) => (
        <text key={i} x={scaleX(i)} y={H - padB + 14} textAnchor="middle" fill="#374151" fontSize={10}>{d}</text>
      ))}
      {/* Y labels */}
      {[35, 40, 45, 50, 55].map((t) => (
        <text key={t} x={padL - 5} y={scaleY(t) + 4} textAnchor="end" fill="#6b7280" fontSize={9}>{t}°</text>
      ))}
      {/* Axis */}
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#d1d5db" strokeWidth={1} />
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#d1d5db" strokeWidth={1} />
    </svg>
  );
}

export default async function TransformationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar />
      <main className="flex-1 p-6 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <span>Commerce</span>
          <span className="text-gray-300">/</span>
          <a href="/transformation" className="hover:text-[#2E7D32] transition-colors">Transformation</a>
          <span className="text-gray-300">/</span>
          <span className="text-[#1B5E20] font-medium">Lot {id}</span>
        </nav>

        {/* Bandeau en-tête */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6 space-y-3">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold">LOT-2025-046 — Cacao fermenté et séché</h1>
              <p className="text-green-200 text-sm mt-0.5">Parcelles source : PAR-B1 (cacao) + PAR-C1 (anacarde — non inclus)</p>
            </div>
            <span className="bg-green-400 text-green-900 text-xs font-bold px-3 py-1.5 rounded-full">
              ✅ Terminé — En stock ENT-001
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100">
            <span>Récolte : 24-26/06/2025</span>
            <span>Fermentation : 27/06 – 03/07</span>
            <span>Séchage : 04/07 – 10/07</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
            Grade AA 94% — Record 2025 ⭐
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Entrée cacao brut",  value: "2 820 kg" },
            { label: "Sortie cacao sec",   value: "964 kg" },
            { label: "Rendement",          value: "34,2%" },
            { label: "Grade AA",           value: "94% ✅", highlight: true },
            { label: "Humidité finale",    value: "7,1% ✅" },
          ].map((k) => (
            <div
              key={k.label}
              className={`rounded-2xl border p-5 ${k.highlight ? "border-yellow-200 bg-yellow-50" : "border-gray-100 bg-white"}`}
            >
              <p className="text-xs text-gray-500">{k.label}</p>
              <p className={`text-lg font-bold mt-1 ${k.highlight ? "text-yellow-700" : "text-[#1B5E20]"}`}>{k.value}</p>
              {k.highlight && <p className="text-[10px] text-yellow-600 mt-0.5">Record EXP-001 2025</p>}
            </div>
          ))}
        </div>

        {/* Étapes de transformation */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-5 py-3 bg-[#F8FBF8] border-b border-gray-100">
            <h2 className="text-sm font-semibold text-[#1B5E20]">Étapes de transformation</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-500">
                  {["Étape", "Dates", "Durée", "Paramètres", "Résultat"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ETAPES_DETAIL.map((e) => (
                  <tr key={e.etape} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-gray-800">{e.etape}</td>
                    <td className="px-4 py-2.5 text-gray-500">{e.dates}</td>
                    <td className="px-4 py-2.5 text-gray-500">{e.duree}</td>
                    <td className="px-4 py-2.5 text-gray-600">{e.params}</td>
                    <td className="px-4 py-2.5">
                      <span className="text-green-700 font-medium">✅ {e.resultat}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Courbe fermentation */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-1">Courbe de fermentation LOT-046</h2>
          <p className="text-xs text-gray-400 mb-4">Température (°C) par jour — Fermentation 27/06 – 03/07/2025</p>
          <FermentationSVG />
          <div className="mt-3 bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5 text-xs text-orange-800">
            <span className="font-bold">J4 T°=49,2°C → Alerte ARIA →</span> Retournement supplémentaire le 30/06 à 14h → Grade AA 94% ✅
          </div>
        </div>

        {/* Résultat qualité */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-5 py-3 bg-[#F8FBF8] border-b border-gray-100">
            <h2 className="text-sm font-semibold text-[#1B5E20]">Résultat qualité — Cut test CNRA LOT-046</h2>
            <p className="text-xs text-gray-400 mt-0.5">Réalisé le 10/07/2025 par Ibrahim Sawadogo</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-500">
                  {["Paramètre", "Résultat", "Norme CNRA CI", "Statut"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CUT_TEST.map((r) => (
                  <tr key={r.param} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-gray-800">{r.param}</td>
                    <td className="px-4 py-2.5 font-semibold text-[#1B5E20]">{r.resultat}</td>
                    <td className="px-4 py-2.5 text-gray-500">{r.norme}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium ${
                          r.statut === "Excellent"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        ✅ {r.statut}
                      </span>
                    </td>
                  </tr>
                ))}
                {/* Grade row */}
                <tr className="border-t border-gray-100 bg-yellow-50">
                  <td className="px-4 py-3 font-bold text-gray-800">Grade attribué</td>
                  <td colSpan={2} />
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 font-bold text-xs">
                      ⭐ AA (94%) ✅
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mx-5 my-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-green-800">
            <span className="font-bold">LOT-046 obtient le meilleur grade AA de la saison 2025 (94%).</span> Stocké ENT-001 Zone A. Valorisation : 964 kg × 1 087 XOF = <span className="font-bold">1 047 868 XOF</span>.
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap pb-4">
          <a
            href="/transformation"
            className="inline-flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-medium px-4 py-2 hover:border-[#2E7D32] transition-colors"
          >
            ← Retour à la transformation
          </a>
          <a
            href="/stocks"
            className="inline-flex items-center gap-1.5 border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2 hover:bg-green-50 transition-colors"
          >
            Voir dans les stocks
          </a>
          <a
            href="/ventes"
            className="inline-flex items-center gap-1.5 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors"
          >
            Créer une vente
          </a>
        </div>
      </main>
    </div>
  );
}
