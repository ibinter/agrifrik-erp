"use client";

import Topbar from "../../components/Topbar";
import {
  ShoppingBag,
  Users,
  TrendingDown,
  Clock,
  Plus,
  CheckCircle,
  AlertCircle,
  Star,
  Truck,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */

const kpis = [
  { label: "Commandes YTD", value: "84", sub: "bons de commande", icon: ShoppingBag, color: "#2E7D32", bg: "#E8F5E9" },
  { label: "Montant YTD", value: "68,4 M", sub: "XOF engagés", icon: TrendingDown, color: "#E65100", bg: "#FFF3E0" },
  { label: "Fournisseurs actifs", value: "12", sub: "partenaires homologués", icon: Users, color: "#1565C0", bg: "#E3F2FD" },
  { label: "Délai livraison moyen", value: "8,4 j", sub: "toutes catégories", icon: Clock, color: "#6A1B9A", bg: "#F3E5F5" },
];

const bonsDeCommande = [
  { numero: "BC-2025-0218", fournisseur: "AGRIINTRANT CI", articles: "Engrais NPK 20-10-10", montant: "600 000", dateCmd: "08/07/2025", dateLivraison: "11/07/2025", statut: "Reçu", facture: "O" },
  { numero: "BC-2025-0219", fournisseur: "SEMENCIER OUEST", articles: "Semences maïs certifiées", montant: "600 000", dateCmd: "07/07/2025", dateLivraison: "12/07/2025", statut: "En attente", facture: "N" },
  { numero: "BC-2025-0220", fournisseur: "AGRIMECA CI", articles: "Pièces tracteur JD 5075", montant: "450 000", dateCmd: "05/07/2025", dateLivraison: "12/07/2025", statut: "En cours", facture: "N" },
  { numero: "BC-2025-0221", fournisseur: "PHARMAVETO CI", articles: "Vaccins bovins (lot 50)", montant: "425 000", dateCmd: "04/07/2025", dateLivraison: "06/07/2025", statut: "Reçu", facture: "O" },
  { numero: "BC-2025-0222", fournisseur: "CARBURANTS CI", articles: "Gasoil 1 000 L", montant: "850 000", dateCmd: "02/07/2025", dateLivraison: "03/07/2025", statut: "Reçu", facture: "O" },
  { numero: "BC-2025-0210", fournisseur: "YARA Nederland", articles: "KCl engrais 500 kg", montant: "2 250 000", dateCmd: "25/06/2025", dateLivraison: "15/07/2025", statut: "En cours", facture: "N" },
  { numero: "BC-2025-0208", fournisseur: "SYNGENTA Basel", articles: "Fongicide Amistar 10 L", montant: "980 000", dateCmd: "20/06/2025", dateLivraison: "18/07/2025", statut: "En cours", facture: "N" },
  { numero: "BC-2025-0201", fournisseur: "AGRIINTRANT CI", articles: "Sacs PP 50 kg × 2 000 u", montant: "800 000", dateCmd: "15/06/2025", dateLivraison: "20/06/2025", statut: "Reçu", facture: "O" },
  { numero: "BC-2025-0198", fournisseur: "YARA Nederland", articles: "NPK 20-10-10 2 t", montant: "4 800 000", dateCmd: "10/06/2025", dateLivraison: "30/06/2025", statut: "Reçu", facture: "O" },
  { numero: "BC-2025-0192", fournisseur: "FMC CI", articles: "Furadan 5G 200 kg", montant: "960 000", dateCmd: "02/06/2025", dateLivraison: "10/06/2025", statut: "Reçu", facture: "O" },
];

const categories = [
  { label: "Intrants", pct: 45, color: "#10b981" },
  { label: "Matériels", pct: 28, color: "#6366f1" },
  { label: "Services", pct: 15, color: "#f59e0b" },
  { label: "Emballages", pct: 8, color: "#3b82f6" },
  { label: "Autres", pct: 4, color: "#e5e7eb" },
];

const top3 = [
  { nom: "YARA Nederland", montant: "18,2 M XOF", pct: 27 },
  { nom: "AGRIINTRANT CI", montant: "12,4 M XOF", pct: 18 },
  { nom: "SYNGENTA Basel", montant: "8,8 M XOF", pct: 13 },
];

const alertes = [
  { niveau: "rouge", texte: "KCl engrais : stock critique 45 kg — Commander 200 kg urgent (YARA)" },
  { niveau: "rouge", texte: "Furadan 5G : Rupture stock — Commander 200 kg (FMC CI)" },
  { niveau: "jaune", texte: "Cypermethrine : stock faible (18 L vs seuil 20 L)" },
  { niveau: "vert", texte: "NPK 20-10-10 : stock normal (380 kg ✅)" },
];

const perfFournisseurs = [
  { nom: "YARA Nederland", commandes: 12, tauxLivraison: "100%", delai: "18 j", qualite: 5, note: "4,8/5" },
  { nom: "AGRIINTRANT CI", commandes: 28, tauxLivraison: "96%", delai: "4 j", qualite: 4, note: "4,2/5" },
  { nom: "SYNGENTA Basel", commandes: 8, tauxLivraison: "100%", delai: "25 j", qualite: 5, note: "4,6/5" },
];

/* ─── Helpers ───────────────────────────────────────────── */

function StatutBadge({ statut }: { statut: string }) {
  if (statut === "Reçu")
    return <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800"><CheckCircle size={11} />Reçu</span>;
  if (statut === "En attente")
    return <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-800"><Clock size={11} />En attente</span>;
  return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800"><AlertCircle size={11} />En cours</span>;
}

function StarRating({ note }: { note: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className={i < note ? "fill-yellow-400 text-yellow-400" : "text-gray-200 dark:text-gray-700"} />
      ))}
    </span>
  );
}

/* Donut SVG */
function DonutChart() {
  const r = 50;
  const cx = 70;
  const cy = 70;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const slices = categories.map((c) => {
    const dash = (c.pct / 100) * circ;
    const slice = { ...c, dash, offset };
    offset += dash;
    return slice;
  });
  return (
    <svg viewBox="0 0 140 140" className="w-32 h-32">
      {slices.map((s) => (
        <circle
          key={s.label}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={22}
          strokeDasharray={`${s.dash} ${circ - s.dash}`}
          strokeDashoffset={-s.offset + circ * 0.25}
          style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      <text x={cx} y={cy - 5} textAnchor="middle" className="fill-gray-900 dark:fill-white" fontSize="13" fontWeight="700">68,4 M</text>
      <text x={cx} y={cy + 10} textAnchor="middle" className="fill-gray-500" fontSize="8">XOF YTD</text>
    </svg>
  );
}

/* ─── Page ─────────────────────────────────────────────── */

export default function AchatsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Achats & Approvisionnements" breadcrumb={["Logistique", "Achats"]} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: kpi.bg }}>
                  <Icon size={20} style={{ color: kpi.color }} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{kpi.label}</p>
                  <p className="mt-0.5 text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{kpi.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tableau de bord achats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donut + légende */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Répartition par catégorie</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Achats YTD 2025</p>
            <div className="flex items-center gap-6">
              <DonutChart />
              <div className="space-y-2">
                {categories.map((c) => (
                  <div key={c.label} className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <span className="text-xs text-gray-700 dark:text-gray-300">{c.label}</span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white ml-auto pl-2">{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top 3 fournisseurs */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Top 3 fournisseurs</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Par montant cumulé YTD</p>
            <div className="space-y-4">
              {top3.map((f, idx) => (
                <div key={f.nom}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-4">#{idx + 1}</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{f.nom}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{f.montant}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full bg-green-600" style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertes approvisionnement */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Alertes approvisionnement</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Stocks à surveiller</p>
            <div className="space-y-3">
              {alertes.map((a, i) => {
                const dot = a.niveau === "rouge" ? "bg-red-500" : a.niveau === "jaune" ? "bg-amber-400" : "bg-emerald-500";
                const bg = a.niveau === "rouge" ? "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30" : a.niveau === "jaune" ? "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30" : "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30";
                const text = a.niveau === "rouge" ? "text-red-800 dark:text-red-300" : a.niveau === "jaune" ? "text-amber-800 dark:text-amber-300" : "text-emerald-800 dark:text-emerald-300";
                return (
                  <div key={i} className={`flex items-start gap-2.5 rounded-lg border p-3 ${bg}`}>
                    <span className={`mt-1 inline-block w-2 h-2 rounded-full shrink-0 ${dot}`} />
                    <p className={`text-xs leading-relaxed ${text}`}>{a.texte}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tableau des commandes d'achat */}
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Commandes d'achat</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">10 derniers bons de commande — YTD 2025</p>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-800 transition-colors">
              <Plus size={15} />
              Nouveau BC
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  {["N° BC", "Fournisseur", "Articles", "Montant XOF", "Date commande", "Livraison prévue", "Statut", "Facture"].map((col) => (
                    <th key={col} className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {bonsDeCommande.map((bc) => (
                  <tr key={bc.numero} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs font-medium text-gray-700 dark:text-gray-300">{bc.numero}</td>
                    <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-800 dark:text-gray-200">{bc.fournisseur}</td>
                    <td className="px-3 py-3 text-gray-600 dark:text-gray-400 max-w-[180px]">{bc.articles}</td>
                    <td className="whitespace-nowrap px-3 py-3 font-semibold text-gray-900 dark:text-white tabular-nums">{bc.montant}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-gray-500 dark:text-gray-400">{bc.dateCmd}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-gray-500 dark:text-gray-400">{bc.dateLivraison}</td>
                    <td className="whitespace-nowrap px-3 py-3"><StatutBadge statut={bc.statut} /></td>
                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      <span className={`inline-block font-semibold text-xs px-2 py-0.5 rounded-full ${bc.facture === "O" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
                        {bc.facture === "O" ? "Oui" : "Non"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance fournisseurs */}
        <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Performance fournisseurs</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Évaluation YTD 2025</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  {["Fournisseur", "Commandes", "Taux livraison", "Délai moyen", "Qualité", "Note globale"].map((col) => (
                    <th key={col} className="whitespace-nowrap px-3 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {perfFournisseurs.map((f) => (
                  <tr key={f.nom} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-800 dark:text-gray-200">
                      <span className="flex items-center gap-1.5"><Truck size={13} className="text-gray-400" />{f.nom}</span>
                    </td>
                    <td className="px-3 py-3 text-center tabular-nums text-gray-600 dark:text-gray-400">{f.commandes}</td>
                    <td className="px-3 py-3 text-center">
                      <span className={`text-xs font-semibold ${f.tauxLivraison === "100%" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>{f.tauxLivraison}</span>
                    </td>
                    <td className="px-3 py-3 text-center text-gray-600 dark:text-gray-400">{f.delai}</td>
                    <td className="px-3 py-3"><StarRating note={f.qualite} /></td>
                    <td className="px-3 py-3">
                      <span className="inline-block bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold rounded-full px-2.5 py-0.5">{f.note}</span>
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
