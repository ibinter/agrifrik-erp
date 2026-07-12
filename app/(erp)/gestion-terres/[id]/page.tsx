import Topbar from "../../../components/Topbar";

export default async function GestionTerresTitrePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["RH", "Gestion des Terres", `Titre ${id}`]} />

      <div className="p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-bold">Fiche Titre Foncier — TF-0042-SOUBRÉ</h1>
              <p className="text-sm text-white/80">EXP-001 Parcelle principale</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 text-sm text-white/90 mt-3">
                <div><span className="text-white/60">Titre foncier :</span> TF-SOUBRÉ-0042-2019</div>
                <div><span className="text-white/60">Propriétaire :</span> AGRIFRIK SAS — RCCM CI-SOB-2008-B-1142</div>
                <div><span className="text-white/60">Désignation :</span> Exploitation agricole EXP-001 — Lots A + B + C</div>
                <div><span className="text-white/60">Localisation :</span> Soubré sous-préfecture, Région Nawa, Côte d'Ivoire</div>
                <div><span className="text-white/60">GPS centre :</span> 5°24'18"N 6°59'02"W</div>
                <div><span className="text-white/60">Superficie totale :</span> 18,3 ha</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1 bg-green-500/30 border border-green-400/40 text-white text-xs font-medium rounded-full px-3 py-1">
                ✅ Titre foncier définitif
              </span>
              <span className="inline-flex items-center gap-1 bg-green-500/30 border border-green-400/40 text-white text-xs font-medium rounded-full px-3 py-1">
                Enregistré : MCLU CI 2019
              </span>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Superficie cadastrée", value: "18,3 ha", sub: "" },
            { label: "Superficie en production", value: "15,2 ha", sub: "83% de la surface" },
            { label: "Valeur foncière estimée 2024", value: "27 450 000 XOF", sub: "1 500 000 XOF/ha" },
            { label: "Prochaine taxe foncière", value: "Décembre 2025", sub: "146 400 XOF" },
            { label: "Litiges en cours", value: "0 litige ✅", sub: "Situation nette" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-base font-bold text-[#1B5E20]">{kpi.value}</p>
              {kpi.sub && <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Description cadastrale */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Description cadastrale</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Lot</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Superficie</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Usage</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Parcelles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Lot A (Zone Nord-Ouest)", "8,0 ha", "Cacao certifié RA", "PAR-A1 (3,8 ha) + PAR-A2 (4,2 ha)"],
                  ["Lot B (Zone Centre)", "6,5 ha", "Cacao certifié RA + Anacarde", "PAR-B1 cacao (4,5 ha) + PAR-B2 anacarde (2,0 ha)"],
                  ["Lot C (Zone Sud)", "3,8 ha", "Diversification + Pisciculture", "PAR-C1 anacarde (1,8 ha) + PSC-001 (0,6 ha) + bâtiments (1,4 ha)"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-[#F8FBF8] font-semibold">
                  <td className="px-4 py-3 text-gray-800">TOTAL</td>
                  <td className="px-4 py-3 text-gray-800">18,3 ha</td>
                  <td className="px-4 py-3 text-gray-400">—</td>
                  <td className="px-4 py-3 text-gray-400">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SVG Plan masse */}
          <div className="overflow-x-auto">
            <svg viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl mx-auto rounded-xl">
              {/* Fond */}
              <rect width="700" height="380" fill="#F5F8F5" rx="12" />

              {/* Titre */}
              <text x="350" y="28" textAnchor="middle" fill="#1B5E20" fontSize="13" fontWeight="bold">
                Plan masse EXP-001 — Titre foncier TF-SOUBRÉ-0042
              </text>

              {/* Rivière Sassandra à l'est (sinueux bleu) */}
              <path d="M620,50 C630,80 610,110 625,140 C640,170 615,200 628,230 C642,260 618,290 630,320 C640,345 625,360 620,370"
                fill="none" stroke="#42A5F5" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
              <text x="645" y="210" textAnchor="middle" fill="#1976D2" fontSize="10" fontStyle="italic" transform="rotate(90,645,210)">Rivière Sassandra</text>

              {/* Route de Soubré au sud */}
              <rect x="50" y="355" width="555" height="14" fill="#BDBDBD" rx="3" />
              <text x="330" y="366" textAnchor="middle" fill="#616161" fontSize="10">Route de Soubré</text>

              {/* LOT A — Nord-Ouest — vert clair */}
              <polygon points="60,45 280,45 280,220 60,220" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="2" />
              <text x="170" y="120" textAnchor="middle" fill="#1B5E20" fontSize="14" fontWeight="bold">LOT A</text>
              <text x="170" y="138" textAnchor="middle" fill="#2E7D32" fontSize="11">(Nord-Ouest — 8,0 ha)</text>
              <text x="170" y="158" textAnchor="middle" fill="#388E3C" fontSize="10">Cacao certifié RA</text>
              {/* Séparation interne LOT A */}
              <line x1="170" y1="45" x2="170" y2="220" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,4" />
              <text x="105" y="200" textAnchor="middle" fill="#2E7D32" fontSize="9">PAR-A1</text>
              <text x="105" y="212" textAnchor="middle" fill="#2E7D32" fontSize="9">3,8 ha</text>
              <text x="228" y="200" textAnchor="middle" fill="#2E7D32" fontSize="9">PAR-A2</text>
              <text x="228" y="212" textAnchor="middle" fill="#2E7D32" fontSize="9">4,2 ha</text>

              {/* LOT B — Centre — vert moyen */}
              <polygon points="60,225 280,225 280,355 60,355" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="2" />
              <text x="170" y="295" textAnchor="middle" fill="#1B5E20" fontSize="14" fontWeight="bold">LOT B</text>
              <text x="170" y="313" textAnchor="middle" fill="#2E7D32" fontSize="11">(Centre — 6,5 ha)</text>
              <text x="170" y="333" textAnchor="middle" fill="#388E3C" fontSize="10">Cacao RA + Anacarde</text>
              {/* Séparation interne LOT B */}
              <line x1="185" y1="225" x2="185" y2="355" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,4" />
              <text x="118" y="345" textAnchor="middle" fill="#2E7D32" fontSize="9">PAR-B1 (4,5 ha)</text>
              <text x="240" y="345" textAnchor="middle" fill="#2E7D32" fontSize="9">PAR-B2 (2,0 ha)</text>

              {/* LOT C — Sud/Est — vert-gris */}
              <polygon points="285,45 605,45 605,355 285,355" fill="#B0BEC5" stroke="#546E7A" strokeWidth="2" />
              <text x="445" y="170" textAnchor="middle" fill="#263238" fontSize="14" fontWeight="bold">LOT C</text>
              <text x="445" y="188" textAnchor="middle" fill="#37474F" fontSize="11">(Zone Sud — 3,8 ha)</text>
              <text x="445" y="208" textAnchor="middle" fill="#37474F" fontSize="10">Diversification + Pisciculture</text>
              {/* Séparations internes LOT C */}
              <line x1="285" y1="180" x2="605" y2="180" stroke="#78909C" strokeWidth="1" strokeDasharray="5,4" />
              <line x1="450" y1="180" x2="450" y2="355" stroke="#78909C" strokeWidth="1" strokeDasharray="5,4" />
              <text x="370" y="100" textAnchor="middle" fill="#37474F" fontSize="10">PAR-C1 anacarde</text>
              <text x="370" y="113" textAnchor="middle" fill="#546E7A" fontSize="9">1,8 ha</text>
              <text x="535" y="100" textAnchor="middle" fill="#37474F" fontSize="10">Cacao / Forêt</text>
              {/* PSC-001 */}
              <rect x="295" y="195" width="140" height="80" rx="6" fill="#81D4FA" stroke="#0288D1" strokeWidth="1.5" />
              <text x="365" y="232" textAnchor="middle" fill="#01579B" fontSize="11" fontWeight="bold">PSC-001</text>
              <text x="365" y="248" textAnchor="middle" fill="#0277BD" fontSize="10">Pisciculture (0,6 ha)</text>
              {/* Bâtiments */}
              <rect x="460" y="195" width="135" height="80" rx="6" fill="#FFCC80" stroke="#E65100" strokeWidth="1.5" />
              <text x="527" y="232" textAnchor="middle" fill="#E65100" fontSize="11" fontWeight="bold">Bâtiments</text>
              <text x="527" y="248" textAnchor="middle" fill="#BF360C" fontSize="10">Zone logistique (1,4 ha)</text>

              {/* Séparation LOT A/C et LOT B/C */}
              <line x1="283" y1="45" x2="283" y2="353" stroke="#546E7A" strokeWidth="2.5" />

              {/* Flèche Nord */}
              <g transform="translate(670,55)">
                <polygon points="0,-20 7,10 0,5 -7,10" fill="#1B5E20" />
                <text x="0" y="25" textAnchor="middle" fill="#1B5E20" fontSize="13" fontWeight="bold">N</text>
              </g>

              {/* Légende */}
              <rect x="55" y="42" width="8" height="8" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="1" />
              <rect x="55" y="223" width="8" height="8" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1" />
              <rect x="283" y="42" width="8" height="8" fill="#B0BEC5" stroke="#546E7A" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Documents fonciers */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Documents fonciers</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Document</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Référence</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Titre foncier définitif", "TF-SOUBRÉ-0042-2019", "22/08/2019", "✅ Original — MCLU CI"],
                  ["Plan cadastral officiel", "CADASTRE-SOB-LOT-A-B-C-2019", "22/08/2019", "✅ Certifié géomètre"],
                  ["Attestation d'immatriculation", "MCLU-CI-IMM-2019-4721", "22/08/2019", "✅ Ministère MCLU"],
                  ["Bordereau de mise en valeur", "BMW-CI-2024-0042", "15/01/2024", "✅ Mise en valeur confirmée"],
                  ["Quittance taxe foncière 2024", "DGI-TF-2024-0042", "15/12/2024", "✅ Payée (142 650 XOF)"],
                ].map((row) => (
                  <tr key={row[1]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Taxe foncière */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Taxe foncière</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Année</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Base imposable</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Taux</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Montant</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Date paiement</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["2022", "18 300 000 XOF", "0,5%", "91 500 XOF", "15/12/2022", "✅ Payée"],
                  ["2023", "22 875 000 XOF", "0,5%", "114 375 XOF", "18/12/2023", "✅ Payée"],
                  ["2024", "27 450 000 XOF (revalorisation)", "0,52%", "142 650 XOF", "15/12/2024", "✅ Payée"],
                  ["2025", "27 450 000 XOF (stable)", "0,533%", "146 400 XOF", "À échoir 31/12/2025", "🔵 À payer"],
                ].map((row) => (
                  <tr key={row[0]} className={row[5].startsWith("🔵") ? "bg-blue-50" : "hover:bg-gray-50/60"}>
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Note : Taux de revalorisation annuel base cadastrale : +25% en 2024 (DGFIP CI — actualisation zone Nawa).
          </p>
        </div>

        {/* Historique foncier */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Historique foncier</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Année</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Événement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["2008", "Acquisition terrain 12 ha (acte notarié — Maître Koné, Soubré) — accord amiable famille Yapi"],
                  ["2012", "Extension 4,2 ha (Lot B Centre) — achat voisin M. Koné Béhi"],
                  ["2015", "Extension 2,1 ha (Lot C — zone pisciculture) — accord MCLU"],
                  ["2019", "Consolidation en titre foncier définitif unique TF-SOUBRÉ-0042 (18,3 ha) — MCLU CI"],
                  ["2022", "Bornage officiel OIPR — délimitation buffer zone Sassandra"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap font-medium">{row[0]}</td>
                    <td className="px-4 py-3 text-gray-700">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Note litige */}
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
            <span className="font-semibold">0 litige en cours.</span>{" "}
            Titre foncier définitif CI — aucune contestation enregistrée. Situation nette.
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-4">
          <a
            href="/gestion-terres"
            className="bg-gray-100 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-200 transition-colors"
          >
            ← Retour à la gestion des terres
          </a>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            Télécharger le titre
          </button>
          <button className="border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#F8FBF8] transition-colors">
            Contacter notaire
          </button>
        </div>

      </div>
    </div>
  );
}
