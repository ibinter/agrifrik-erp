import Topbar from "../../components/Topbar";
import {
  MapPin,
  Home,
  FileText,
  AlertTriangle,
  Calendar,
  CreditCard,
  TrendingUp,
} from "lucide-react";

// ─── Données fermage ──────────────────────────────────────────────────────────

const parcellesFermage = [
  {
    parcelle: "PAR-F1",
    surface: "12 ha",
    proprietaire: "Kobenan Aya",
    localite: "Soubré, Zone F",
    dureeBail: "5 ans",
    debut: "01/01/2023",
    fin: "31/12/2027",
    loyerHa: "85 000 XOF",
    loyerTotal: "1 020 000 XOF",
    statut: "Actif",
  },
  {
    parcelle: "PAR-F2",
    surface: "8,5 ha",
    proprietaire: "Brou Kouamé",
    localite: "Soubré, Zone F",
    dureeBail: "3 ans",
    debut: "01/07/2023",
    fin: "30/06/2026",
    loyerHa: "90 000 XOF",
    loyerTotal: "765 000 XOF",
    statut: "Actif",
  },
  {
    parcelle: "PAR-G1",
    surface: "15 ha",
    proprietaire: "Ouattara Drissa",
    localite: "Korhogo, Zone G",
    dureeBail: "7 ans",
    debut: "01/01/2021",
    fin: "31/12/2027",
    loyerHa: "60 000 XOF",
    loyerTotal: "900 000 XOF",
    statut: "Actif",
  },
  {
    parcelle: "PAR-G2",
    surface: "10 ha",
    proprietaire: "Coulibaly Ibrahim",
    localite: "Korhogo, Zone G",
    dureeBail: "5 ans",
    debut: "01/06/2022",
    fin: "31/05/2027",
    loyerHa: "65 000 XOF",
    loyerTotal: "650 000 XOF",
    statut: "Actif",
  },
  {
    parcelle: "PAR-H1",
    surface: "8,5 ha",
    proprietaire: "Soro Yéo",
    localite: "Bouaké, Zone H",
    dureeBail: "3 ans",
    debut: "01/01/2023",
    fin: "31/12/2025",
    loyerHa: "75 000 XOF",
    loyerTotal: "637 500 XOF",
    statut: "Renouvellement",
  },
];

const paiements = [
  {
    date: "01/07/2025",
    beneficiaire: "Kobenan Aya",
    parcelle: "PAR-F1",
    periode: "S2 2025",
    montant: "510 000 XOF",
    mode: "Virement",
    justificatif: "REÇ-2025-08",
  },
  {
    date: "01/07/2025",
    beneficiaire: "Brou Kouamé",
    parcelle: "PAR-F2",
    periode: "S2 2025",
    montant: "382 500 XOF",
    mode: "Virement",
    justificatif: "REÇ-2025-09",
  },
  {
    date: "01/07/2025",
    beneficiaire: "Ouattara Drissa",
    parcelle: "PAR-G1",
    periode: "S2 2025",
    montant: "450 000 XOF",
    mode: "Virement",
    justificatif: "REÇ-2025-10",
  },
  {
    date: "01/07/2025",
    beneficiaire: "Coulibaly Ibrahim",
    parcelle: "PAR-G2",
    periode: "S2 2025",
    montant: "325 000 XOF",
    mode: "Virement",
    justificatif: "REÇ-2025-11",
  },
  {
    date: "01/01/2025",
    beneficiaire: "Kobenan Aya",
    parcelle: "PAR-F1",
    periode: "S1 2025",
    montant: "510 000 XOF",
    mode: "Virement",
    justificatif: "REÇ-2025-01",
  },
  {
    date: "01/01/2025",
    beneficiaire: "Soro Yéo",
    parcelle: "PAR-H1",
    periode: "S1 2025",
    montant: "318 750 XOF",
    mode: "Espèces",
    justificatif: "REÇ-2025-02",
  },
];

// ─── Helper badge ─────────────────────────────────────────────────────────────

function StatutBadge({ statut }: { statut: string }) {
  if (statut === "Actif") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
        ✅ Actif
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
      ⚠️ Renouvellement
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GestionTerresPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Gestion des Terres" breadcrumb={["Production", "Terres & Fermage"]} />

      <div className="p-6 max-w-7xl mx-auto">

        {/* KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: <MapPin size={20} className="text-[#2E7D32]" />,
              bg: "bg-green-100 dark:bg-green-900/30",
              label: "Surface totale",
              value: "143 ha",
            },
            {
              icon: <Home size={20} className="text-blue-600" />,
              bg: "bg-blue-100 dark:bg-blue-900/30",
              label: "En propriété",
              value: "89 ha (62%)",
            },
            {
              icon: <FileText size={20} className="text-purple-600" />,
              bg: "bg-purple-100 dark:bg-purple-900/30",
              label: "En fermage",
              value: "54 ha (38%)",
            },
            {
              icon: <CreditCard size={20} className="text-orange-500" />,
              bg: "bg-orange-100 dark:bg-orange-900/30",
              label: "Baux actifs",
              value: "7",
            },
          ].map((k, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${k.bg}`}>
                {k.icon}
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{k.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Alertes fermage */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-orange-500" />
            <span className="font-bold text-gray-800 dark:text-gray-100">Alertes fermage</span>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 px-4 py-3">
              <span className="text-base mt-0.5">⚠️</span>
              <p className="text-sm text-orange-800 dark:text-orange-300">
                <span className="font-semibold">Bail PAR-H1 expire le 31/12/2025</span> — Contacter Soro Yéo avant le 01/10/2025 pour négociation renouvellement.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 px-4 py-3">
              <span className="text-base mt-0.5">📅</span>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <span className="font-semibold">Loyer Q3 à payer avant le 01/10/2025</span> — Total : <span className="font-semibold">993 125 XOF</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tableau parcelles en fermage */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-[#2E7D32]" />
            <span className="font-bold text-gray-800 dark:text-gray-100">Parcelles en fermage</span>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  {[
                    "Parcelle", "Surface", "Propriétaire", "Localité",
                    "Durée bail", "Début", "Fin", "Loyer/ha/an", "Loyer total/an", "Statut",
                  ].map((h) => (
                    <th key={h} className="pb-3 pr-4 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parcellesFermage.map((p, i) => (
                  <tr
                    key={i}
                    className={`border-b dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                      p.statut === "Renouvellement"
                        ? "bg-orange-50/50 dark:bg-orange-900/10 border-orange-50 dark:border-orange-900/20"
                        : "border-gray-50"
                    }`}
                  >
                    <td className="py-3 pr-4 font-mono text-xs font-semibold text-gray-700 dark:text-gray-300">{p.parcelle}</td>
                    <td className="py-3 pr-4 text-xs text-gray-700 dark:text-gray-300">{p.surface}</td>
                    <td className="py-3 pr-4 text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">{p.proprietaire}</td>
                    <td className="py-3 pr-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{p.localite}</td>
                    <td className="py-3 pr-4 text-xs text-gray-500 dark:text-gray-400">{p.dureeBail}</td>
                    <td className="py-3 pr-4 text-xs font-mono text-gray-500 dark:text-gray-400">{p.debut}</td>
                    <td className="py-3 pr-4 text-xs font-mono text-gray-500 dark:text-gray-400">{p.fin}</td>
                    <td className="py-3 pr-4 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{p.loyerHa}</td>
                    <td className="py-3 pr-4 text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{p.loyerTotal}</td>
                    <td className="py-3">
                      <StatutBadge statut={p.statut} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200 dark:border-gray-700">
                  <td colSpan={8} className="pt-3 pr-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Total fermage annuel
                  </td>
                  <td className="pt-3 pr-4 text-sm font-bold text-[#2E7D32]">
                    3 972 500 XOF
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Parcelles en propriété */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Home size={18} className="text-blue-600" />
              <span className="font-bold text-gray-800 dark:text-gray-100">Parcelles en propriété</span>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">Surface totale</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">89 ha</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">Nombre de titres fonciers</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">8 titres</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Valeur foncière estimée</span>
                <span className="text-sm font-bold text-[#2E7D32]">267 M XOF</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Valorisation moyenne : 3 M XOF/ha</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-[#2E7D32]" />
              <span className="font-bold text-gray-800 dark:text-gray-100">Répartition du foncier</span>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
            {/* Barre de répartition */}
            <div className="mb-4">
              <div className="h-5 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500" style={{ width: "62%" }} />
                <div className="h-full bg-purple-400" style={{ width: "38%" }} />
              </div>
              <div className="flex gap-6 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-blue-500 flex-shrink-0" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Propriété 62% (89 ha)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-purple-400 flex-shrink-0" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Fermage 38% (54 ha)</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Coût fermage annuel</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">3 972 500 XOF</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Coût moyen / ha fermé</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">73 565 XOF/ha/an</span>
              </div>
            </div>
          </div>
        </div>

        {/* Historique des paiements */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={18} className="text-[#2E7D32]" />
            <span className="font-bold text-gray-800 dark:text-gray-100">Historique des paiements fermage</span>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-800 mb-4" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  {["Date", "Bénéficiaire", "Parcelle", "Période", "Montant", "Mode", "Justificatif"].map((h) => (
                    <th key={h} className="pb-3 pr-4 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paiements.map((p, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 pr-4 font-mono text-xs text-gray-600 dark:text-gray-400">{p.date}</td>
                    <td className="py-3 pr-4 text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">{p.beneficiaire}</td>
                    <td className="py-3 pr-4 font-mono text-xs font-semibold text-gray-700 dark:text-gray-300">{p.parcelle}</td>
                    <td className="py-3 pr-4 text-xs text-gray-500 dark:text-gray-400">{p.periode}</td>
                    <td className="py-3 pr-4 text-xs font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{p.montant}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        p.mode === "Virement"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
                        {p.mode}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-1 text-xs text-[#2E7D32] font-mono cursor-pointer hover:underline">
                        <FileText size={12} />
                        {p.justificatif}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
