import Topbar from "../../../components/Topbar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AssuranceDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Finance", "Assurances", `Police ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs bg-white/20 font-mono font-semibold px-3 py-1 rounded-full">
                  NSIA-MPR-CI-2025-EXP001
                </span>
                <span className="text-xs bg-green-400/30 border border-green-300/40 font-semibold px-3 py-1 rounded-full">
                  ✅ En vigueur
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Multirisque Professionnelle Agricole</h1>
                <p className="text-green-200 text-sm mt-0.5">Police NSIA-MPR-CI-2025-EXP001</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1.5 text-sm text-green-100">
                <div>
                  <span className="text-green-400 text-xs block">Assureur</span>
                  NSIA Assurances Côte d&apos;Ivoire (Groupe NSIA)
                </div>
                <div>
                  <span className="text-green-400 text-xs block">Souscripteur</span>
                  AGRIFRIK SAS — RCCM CI-SOB-2008-B-1142
                </div>
                <div>
                  <span className="text-green-400 text-xs block">Courtier</span>
                  Cabinet ASSUR&apos;AGRI CI — Abidjan Plateau
                </div>
                <div>
                  <span className="text-green-400 text-xs block">Validité</span>
                  01/01/2025 – 31/12/2025 | Renouvellement automatique
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-green-300 text-xs font-medium uppercase tracking-wide">Prime annuelle</div>
              <div className="text-3xl font-bold mt-1">546 000 XOF</div>
              <div className="text-green-200 text-xs mt-1">TTC — 0,87% valeur assurée</div>
            </div>
          </div>
        </div>

        {/* 4 KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Valeur totale assurée", value: "62 850 000 XOF", sub: "Biens + récoltes + RC" },
            { label: "Prime annuelle", value: "546 000 XOF", sub: "0,87% de la valeur assurée" },
            { label: "Franchise générale", value: "150 000 XOF", sub: "Par sinistre déclaré" },
            { label: "Sinistres 2025", value: "0 sinistre", sub: "✅ Aucun incident déclaré", green: true },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className={`text-xl font-bold ${kpi.green ? "text-[#2E7D32]" : "text-gray-900"}`}>
                {kpi.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Garanties souscrites */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Garanties souscrites</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Garantie", "Objet couvert", "Valeur assurée", "Taux prime", "Prime annuelle"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 first:rounded-l-lg last:rounded-r-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    garantie: "Bâtiments & constructions",
                    objet: "ENT-001 (480m²) + Hangar matériels + Bureau",
                    valeur: "28 000 000 XOF",
                    taux: "0,40%",
                    prime: "112 000 XOF",
                    highlight: false,
                  },
                  {
                    garantie: "Matériels & équipements",
                    objet: "JD5055E + groupe élec. + pompes + matériels divers",
                    valeur: "18 500 000 XOF",
                    taux: "0,55%",
                    prime: "101 750 XOF",
                    highlight: false,
                  },
                  {
                    garantie: "Récoltes sur pied",
                    objet: "Cacao sur PAR-A1/A2/B1 (période oct-nov)",
                    valeur: "12 350 000 XOF",
                    taux: "1,50%",
                    prime: "185 250 XOF",
                    highlight: true,
                  },
                  {
                    garantie: "Responsabilité civile prof.",
                    objet: "Dommages tiers, employés, visiteurs",
                    valeur: "—",
                    taux: "Forfait",
                    prime: "96 000 XOF",
                    highlight: false,
                  },
                  {
                    garantie: "Véhicule utilitaire",
                    objet: "Toyota HiLux CI-2021-NW-0847",
                    valeur: "4 000 000 XOF",
                    taux: "1,25%",
                    prime: "50 000 XOF (proratisé)",
                    highlight: false,
                  },
                ].map((row) => (
                  <tr
                    key={row.garantie}
                    className={`border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors ${row.highlight ? "bg-orange-50/50" : ""}`}
                  >
                    <td className="px-3 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{row.garantie}</td>
                    <td className="px-3 py-2.5 text-gray-600">{row.objet}</td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap font-mono">{row.valeur}</td>
                    <td className="px-3 py-2.5 text-gray-600">{row.taux}</td>
                    <td className="px-3 py-2.5 font-semibold text-gray-800 whitespace-nowrap">{row.prime}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-200 bg-[#F8FBF8] font-bold text-xs">
                  <td className="px-3 py-2.5 text-gray-800 rounded-l-lg" colSpan={2}>TOTAL</td>
                  <td className="px-3 py-2.5 text-[#1B5E20] font-mono">62 850 000 XOF</td>
                  <td className="px-3 py-2.5"></td>
                  <td className="px-3 py-2.5 text-[#1B5E20] rounded-r-lg">545 000 XOF HT + taxes = 546 000 XOF TTC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Détail garantie Récoltes sur pied */}
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <h2 className="text-sm font-semibold text-orange-900 mb-4">
            Détail garantie — Récoltes sur pied
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">Parcelles & période</div>
                <p className="text-sm text-orange-900">
                  PAR-A1 / PAR-A2 / PAR-B1 — Grande récolte cacao<br />
                  Période de couverture : 1er octobre – 30 novembre 2025
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">Risques couverts</div>
                <p className="text-sm text-orange-900">
                  Incendie, tempête, grêle, inondation, sécheresse extrême (déficit pluviométrique &gt;60% sur 30 jours)
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">Risques EXCLUS</div>
                <p className="text-sm text-red-800">
                  Maladies cryptogamiques (Phytophthora), attaques de mirides, vol de production
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">Franchise spéciale récoltes</div>
                <p className="text-sm text-orange-900">250 000 XOF ou 10% de l&apos;indemnité (le plus élevé retenu)</p>
              </div>
              <div>
                <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">Seuil de déclenchement</div>
                <p className="text-sm text-orange-900">Perte supérieure à 25% de la récolte estimée</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            <span className="font-semibold">Note importante :</span> Déclaration préalable de récolte à transmettre à NSIA avant le 30 septembre 2025 (formulaire NSIA-AGR-DECL-RECOLT). Récolte 2025 estimée : 16,4t × 1 087 XOF = 17,8M XOF → valeur assurée 12,35M XOF représente ~69% de la valeur estimée.
          </div>
        </div>

        {/* Historique des sinistres */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Historique des sinistres</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Année", "Sinistre", "Montant déclaré", "Indemnisé", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 first:rounded-l-lg last:rounded-r-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                  <td className="px-3 py-2.5 font-semibold text-gray-700">2022</td>
                  <td className="px-3 py-2.5 text-gray-700">Incendie hangar (câblage défectueux)</td>
                  <td className="px-3 py-2.5 text-gray-700 font-mono">380 000 XOF</td>
                  <td className="px-3 py-2.5 text-gray-700 font-mono">230 000 XOF</td>
                  <td className="px-3 py-2.5">
                    <span className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">
                      ✅ Réglé (franchise déduite)
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                  <td className="px-3 py-2.5 font-semibold text-gray-700">2023</td>
                  <td className="px-3 py-2.5 text-gray-500 italic">Aucun sinistre</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5">
                    <span className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">
                      ✅ Bonus 5%
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                  <td className="px-3 py-2.5 font-semibold text-gray-700">2024</td>
                  <td className="px-3 py-2.5 text-gray-500 italic">Aucun sinistre</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5">
                    <span className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">
                      ✅ Bonus 5%
                    </span>
                  </td>
                </tr>
                <tr className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                  <td className="px-3 py-2.5 font-semibold text-gray-700">2025</td>
                  <td className="px-3 py-2.5 text-gray-500 italic">Aucun sinistre à ce jour</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5 text-gray-400">—</td>
                  <td className="px-3 py-2.5">
                    <span className="bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full">
                      🔵 En cours
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-[#E8F5E9] border border-[#A5D6A7]">
            <p className="text-xs text-[#2E7D32] font-semibold">
              Coefficient bonus-malus : 0,90 — 10% de réduction sur la prime 2025 grâce aux 2 années consécutives sans sinistre (2023 et 2024).
            </p>
          </div>
        </div>

        {/* Échéancier de paiement */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Échéancier de paiement</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Versement", "Montant", "Date", "Mode", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 first:rounded-l-lg last:rounded-r-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                  <td className="px-3 py-2.5 font-medium text-gray-800">Acompte 50%</td>
                  <td className="px-3 py-2.5 font-semibold text-gray-900 font-mono">273 000 XOF</td>
                  <td className="px-3 py-2.5 text-gray-600">15/01/2025</td>
                  <td className="px-3 py-2.5 text-gray-600">Virement SGBCI</td>
                  <td className="px-3 py-2.5">
                    <span className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">✅ Payé</span>
                  </td>
                </tr>
                <tr className="border-t border-gray-50 bg-orange-50/40 hover:bg-orange-50 transition-colors">
                  <td className="px-3 py-2.5 font-medium text-gray-800">Solde 50%</td>
                  <td className="px-3 py-2.5 font-semibold text-orange-700 font-mono">273 000 XOF</td>
                  <td className="px-3 py-2.5 font-semibold text-orange-700">15/07/2025</td>
                  <td className="px-3 py-2.5 text-gray-600">Virement SGBCI</td>
                  <td className="px-3 py-2.5">
                    <span className="bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full">🔵 À payer dans 4 jours</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-xl bg-orange-50 border border-orange-200 p-4 text-sm text-orange-800">
            <span className="font-bold">⚠️ Action requise :</span> Solde prime{" "}
            <span className="font-semibold">273 000 XOF</span> à verser avant le{" "}
            <span className="font-semibold">15/07/2025 (dans 4 jours)</span>. Virement SGBCI → NSIA CI.
            Référence :{" "}
            <span className="font-mono text-xs bg-orange-100 border border-orange-200 px-1.5 py-0.5 rounded">
              NSIA-MPR-2025-EXP001-S2
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/assurances"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux assurances
          </a>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#C62828] text-white px-4 py-2.5 text-xs font-medium hover:bg-[#B71C1C] transition-colors">
            Déclarer un sinistre
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white px-4 py-2.5 text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            Renouveler
          </button>
        </div>

      </main>
    </div>
  );
}
