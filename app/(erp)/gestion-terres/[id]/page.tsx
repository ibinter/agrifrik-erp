import Topbar from "../../../components/Topbar";

export default async function GestionTerresFichePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["RH", "Gestion des Terres", `Parcelle ${id}`]} />

      <div className="p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold">Fiche Foncière — PAR-A1</h1>
                <span className="text-sm bg-white/20 rounded-lg px-3 py-1 font-medium">Titre Foncier TF-23847</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 text-sm text-white/90 mt-2">
                <div><span className="text-white/60">Parcelle :</span> PAR-A1</div>
                <div><span className="text-white/60">Lieu-dit :</span> Secteur 1, Zone Soubré Nord</div>
                <div><span className="text-white/60">Surface :</span> 6,2 ha</div>
                <div><span className="text-white/60">Coordonnées GPS :</span> 5°47&apos;12&quot;N 6°36&apos;24&quot;W</div>
                <div><span className="text-white/60">Statut foncier :</span> Titre Foncier</div>
                <div><span className="text-white/60">N° TF :</span> 23847 — Conservation foncière de Soubré</div>
                <div><span className="text-white/60">Propriétaire :</span> AGRIFRIK SAS</div>
                <div><span className="text-white/60">Depuis :</span> 2008</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1 bg-green-500/30 border border-green-400/40 text-white text-xs font-medium rounded-full px-3 py-1">
                ✅ Sécurisé
              </span>
              <span className="inline-flex items-center gap-1 bg-green-500/30 border border-green-400/40 text-white text-xs font-medium rounded-full px-3 py-1">
                ✅ Certifié RA
              </span>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Valeur vénale estimée 2025", value: "31 000 000 XOF", sub: "~5 000 000 XOF/ha" },
            { label: "Valeur cadastrale", value: "18 600 000 XOF", sub: "Enregistrement 2008" },
            { label: "Loyer implicite (fermage)", value: "155 000 XOF/ha/an", sub: "" },
            { label: "Taxe foncière 2025", value: "186 000 XOF/an", sub: "Payée 15/01/2025 ✅" },
            { label: "Prochaine obligation légale", value: "2028", sub: "Renouvellement carte foncière" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-base font-bold text-[#1B5E20]">{kpi.value}</p>
              {kpi.sub && <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Informations foncières */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Informations foncières</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Col 1 */}
            <div>
              <h3 className="text-sm font-semibold text-[#2E7D32] mb-3">Titre de propriété</h3>
              <dl className="space-y-2 text-sm">
                {[
                  ["Acte d'acquisition", "Notaire Me. Kouadio Yao, Soubré — Acte N° 847/2008"],
                  ["Date d'acquisition", "22/02/2008"],
                  ["Prix d'acquisition", "7 440 000 XOF (1 200 000 XOF/ha en 2008)"],
                  ["Vendeur initial", "Famille Konaté (Héritiers de feu Konaté Sié)"],
                  ["Mode d'acquisition", "Achat direct avec titre foncier"],
                  ["Enregistrement", "Conservation foncière Soubré — 15/03/2008"],
                  ["N° cadastral", "185-C-472-A1"],
                  ["Commune", "Soubré"],
                  ["Département", "Soubré"],
                  ["Région", "Nawa"],
                ].map(([dt, dd]) => (
                  <div key={dt} className="flex gap-2">
                    <dt className="w-44 flex-shrink-0 text-gray-500">{dt} :</dt>
                    <dd className="text-gray-800 font-medium">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* Col 2 */}
            <div>
              <h3 className="text-sm font-semibold text-[#2E7D32] mb-3">Caractéristiques physiques</h3>
              <dl className="space-y-2 text-sm">
                {[
                  ["Forme parcelle", "Quadrilatère irrégulier"],
                  ["Longueur nord-sud", "~420 m"],
                  ["Longueur est-ouest", "~148 m"],
                  ["Topographie", "Légèrement vallonnée (pente 3-5%)"],
                  ["Hydrologie", "Cours d'eau saisonnier (côté ouest) — zone tampon 30 m RA"],
                  ["Sol dominant", "Limon argilo-sableux (ferrallitique)"],
                  ["Profondeur utile", "80-120 cm"],
                  ["Nappe phréatique", ">3 m (pas d'inondation)"],
                  ["Nord", "Forêt classée"],
                  ["Sud", "PAR-A2 (AGRIFRIK)"],
                  ["Est", "Route piste"],
                  ["Ouest", "Rivière Soubré"],
                ].map(([dt, dd]) => (
                  <div key={dt} className="flex gap-2">
                    <dt className="w-44 flex-shrink-0 text-gray-500">{dt} :</dt>
                    <dd className="text-gray-800 font-medium">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Carte foncière SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Carte foncière — PAR-A1</h2>
          <div className="overflow-x-auto">
            <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-2xl mx-auto rounded-xl">
              {/* Fond */}
              <rect width="640" height="360" fill="#F0F4F0" rx="12" />

              {/* Zones adjacentes en gris */}
              {/* PAR-A2 au sud */}
              <polygon points="140,270 460,270 490,340 110,340" fill="#D8D8D8" stroke="#aaa" strokeWidth="1" strokeDasharray="5,4" />
              <text x="300" y="310" textAnchor="middle" fill="#888" fontSize="11" fontStyle="italic">PAR-A2 (AGRIFRIK)</text>

              {/* Forêt classée au nord */}
              <rect x="80" y="20" width="480" height="55" fill="#C8DCC8" stroke="#aaa" strokeWidth="1" strokeDasharray="5,4" rx="4" />
              <text x="320" y="52" textAnchor="middle" fill="#4a7a4a" fontSize="11" fontStyle="italic">Forêt classée</text>

              {/* Route piste à l'est */}
              <rect x="490" y="75" width="30" height="195" fill="#E8E0D0" stroke="#bbb" strokeWidth="1" />
              <text x="505" y="170" textAnchor="middle" fill="#888" fontSize="10" fontStyle="italic" transform="rotate(90,505,170)">Route piste</text>

              {/* Cours d'eau à l'ouest — trait bleu ondulé */}
              <path d="M110,75 C100,95 120,115 105,135 C90,155 115,175 100,195 C85,215 110,235 100,255 C90,270 105,270 110,270"
                fill="none" stroke="#4FC3F7" strokeWidth="6" strokeLinecap="round" />
              <text x="68" y="175" textAnchor="middle" fill="#2196F3" fontSize="10" fontStyle="italic" transform="rotate(-80,68,175)">Rivière Soubré</text>

              {/* Zone tampon RA 30m côté rivière */}
              <polygon points="110,75 145,75 145,270 110,270" fill="#388E3C" opacity="0.3" />
              <text x="127" y="195" textAnchor="middle" fill="#1B5E20" fontSize="9" fontWeight="bold" transform="rotate(-90,127,195)">Zone tampon RA 30m</text>

              {/* Parcelle PAR-A1 principale */}
              <polygon points="145,75 490,80 485,270 145,270" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="2.5" />

              {/* Annotations GPS 4 coins */}
              <text x="148" y="73" fill="#1B5E20" fontSize="9" fontWeight="bold">5°47&apos;28&quot;N 6°36&apos;38&quot;W</text>
              <text x="430" y="73" fill="#1B5E20" fontSize="9" fontWeight="bold">5°47&apos;28&quot;N 6°36&apos;10&quot;W</text>
              <text x="148" y="285" fill="#1B5E20" fontSize="9" fontWeight="bold">5°47&apos;00&quot;N 6°36&apos;38&quot;W</text>
              <text x="420" y="285" fill="#1B5E20" fontSize="9" fontWeight="bold">5°47&apos;00&quot;N 6°36&apos;10&quot;W</text>

              {/* Centroïde label */}
              <circle cx="317" cy="172" r="5" fill="#2E7D32" />
              <rect x="240" y="155" width="154" height="32" rx="6" fill="white" opacity="0.88" />
              <text x="317" y="167" textAnchor="middle" fill="#1B5E20" fontSize="12" fontWeight="bold">PAR-A1</text>
              <text x="317" y="181" textAnchor="middle" fill="#2E7D32" fontSize="11">6,2 ha</text>

              {/* Flèche Nord */}
              <g transform="translate(600,40)">
                <polygon points="0,-18 6,8 0,4 -6,8" fill="#1B5E20" />
                <text x="0" y="22" textAnchor="middle" fill="#1B5E20" fontSize="12" fontWeight="bold">N</text>
              </g>

              {/* Légende */}
              <rect x="10" y="295" width="220" height="56" rx="8" fill="white" opacity="0.92" stroke="#ddd" />
              <rect x="20" y="305" width="14" height="10" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="1.5" />
              <text x="40" y="314" fill="#333" fontSize="10">Parcelle PAR-A1</text>
              <rect x="20" y="320" width="14" height="10" fill="#388E3C" opacity="0.4" />
              <text x="40" y="329" fill="#333" fontSize="10">Zone tampon RA</text>
              <line x1="20" y1="338" x2="34" y2="338" stroke="#4FC3F7" strokeWidth="4" strokeLinecap="round" />
              <text x="40" y="342" fill="#333" fontSize="10">Cours d&apos;eau</text>
              <line x1="20" y1="349" x2="34" y2="349" stroke="#aaa" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x="40" y="352" fill="#333" fontSize="10">Limite RA / Voisinage</text>
            </svg>
          </div>
        </div>

        {/* Historique foncier */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Historique foncier</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Événement</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Document</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["22/02/2008", "Acquisition AGRIFRIK", "Acte notarié N°847/2008", "Prix 7,44 M XOF"],
                  ["15/03/2008", "Immatriculation TF-23847", "TF Conservation foncière Soubré", "TF obtenu en 23j ✅"],
                  ["01/04/2008", "Mise en valeur démarrée", "—", "Plantation cacao démarrage"],
                  ["15/03/2023", "Renouvellement TF", "TF-23847 Renouvellement", "15 ans → validité 2028"],
                  ["28/02/2025", "Inclusion périmètre RA", "Certificat RA-CI-2025-00847", "Parcelle certifiée RA"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Litiges et servitudes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Type</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Description</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Servitude eau", "Accès à la rivière pour irrigation (usage tiers — famille Konaté)", "✅ Reconnu dans l'acte — Pas de conflit"],
                  ["Tentative d'empiètement", "Empiètement piste agricole côté est (2019)", "✅ Résolu par bornage contradictoire (10/2019)"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Obligations légales */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Obligations légales</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tl-xl">Obligation</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Fréquence</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Dernière date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Prochaine</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Taxe foncière CI", "Annuelle", "15/01/2025 (186 000 XOF)", "15/01/2026", "✅"],
                  ["Mise en valeur minimum (50% surface)", "Continue", "Contrôle 2023 ✅", "Contrôle 2028", "✅ (100% valorisé)"],
                  ["Renouvellement TF", "15 ans", "15/03/2023", "15/03/2038", "✅"],
                  ["Déclaration modification (construction)", "Si changement", "—", "—", "N/A"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">N°</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium rounded-tr-xl">Archivage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Titre Foncier TF-23847 (original)", "15/03/2008", "TF-23847", "🏦 Coffre-fort SGBCI Soubré"],
                  ["Acte notarié d'acquisition", "22/02/2008", "847/2008", "📁 GED DOC-2008-001"],
                  ["Plan cadastral N°185-C-472-A1", "15/03/2008", "—", "📁 GED DOC-2008-002"],
                  ["Reçu taxe foncière 2025", "15/01/2025", "FCON-2025-0847", "📁 GED DOC-2025-003"],
                  ["Procès-verbal bornage 2019", "18/10/2019", "PV-BORN-2019-12", "📁 GED DOC-2019-008"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-gray-50/60">
                    {row.map((cell, i) => (
                      <td key={i} className="px-4 py-3 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
            Télécharger le TF
          </button>
          <button className="border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#F8FBF8] transition-colors">
            Déclarer une modification
          </button>
        </div>

      </div>
    </div>
  );
}
