import { FileText, TrendingUp, RefreshCw, Plus, Eye, CheckCircle, ArrowRight, Copy } from "lucide-react";
import Topbar from "../../components/Topbar";

const kpis = [
  {
    label: "Devis en cours",
    value: "5",
    unit: "",
    sub: "Juillet 2025",
    icon: FileText,
    iconColor: "#6A1B9A",
    iconBg: "#F3E5F5",
  },
  {
    label: "Taux de conversion",
    value: "68",
    unit: "%",
    sub: "Moyenne 12 mois",
    icon: TrendingUp,
    iconColor: "#2E7D32",
    iconBg: "#E8F5E9",
  },
  {
    label: "Valeur pipeline",
    value: "42,8 M",
    unit: "XOF",
    sub: "Portefeuille actif",
    icon: RefreshCw,
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
  },
];

type StatutDevis = "Envoyé" | "Accepté" | "En négociation" | "Expiré" | "Refusé";

const devis: {
  numero: string;
  client: string;
  produit: string;
  montant: number;
  date: string;
  validite: string;
  statut: StatutDevis;
}[] = [
  {
    numero: "DEV-2025-045",
    client: "SUCDEN France",
    produit: "Café robusta 25t",
    montant: 36000000,
    date: "04/07",
    validite: "04/08",
    statut: "Envoyé",
  },
  {
    numero: "DEV-2025-044",
    client: "CEMOI Cameroun",
    produit: "Cacao Grade A 50t",
    montant: 160000000,
    date: "01/07",
    validite: "01/08",
    statut: "En négociation",
  },
  {
    numero: "DEV-2025-043",
    client: "AGRO SAHEL",
    produit: "Maïs 100t",
    montant: 12000000,
    date: "28/06",
    validite: "28/07",
    statut: "Accepté",
  },
  {
    numero: "DEV-2025-042",
    client: "COOPEXPORT",
    produit: "Anacarde WW320 20t",
    montant: 37000000,
    date: "25/06",
    validite: "25/07",
    statut: "Expiré",
  },
  {
    numero: "DEV-2025-041",
    client: "BIOCOOP France",
    produit: "Café arabica BIO 10t",
    montant: 28500000,
    date: "20/06",
    validite: "20/07",
    statut: "Refusé",
  },
];

const statutConfig: Record<StatutDevis, { bg: string; text: string }> = {
  Envoyé:          { bg: "#E3F2FD", text: "#1565C0" },
  "En négociation": { bg: "#FFF3E0", text: "#E65100" },
  Accepté:         { bg: "#E8F5E9", text: "#2E7D32" },
  Expiré:          { bg: "#F5F5F5", text: "#757575" },
  Refusé:          { bg: "#FFEBEE", text: "#B71C1C" },
};

const templates = [
  {
    titre: "Export Cacao",
    desc: "Devis pour exportation de cacao (Grade A/B), incoterms FOB ou CIF, certificats inclus.",
    icon: "🍫",
    color: "#4E342E",
    bg: "#EFEBE9",
  },
  {
    titre: "Vente Locale",
    desc: "Devis pour vente domestique en XOF, livraison entrepôt, TVA applicable.",
    icon: "🏪",
    color: "#1B5E20",
    bg: "#E8F5E9",
  },
  {
    titre: "Export Anacarde",
    desc: "Devis pour anacarde (WW240/WW320), emballage jute, certification SGS.",
    icon: "🥜",
    color: "#E65100",
    bg: "#FFF3E0",
  },
];

export default function DevisPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Devis" breadcrumb={["Commerce", "Devis"]} />

      <main className="flex-1 p-6 space-y-6">

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{kpi.label}</span>
                  <span
                    className="rounded-xl p-2 flex items-center justify-center"
                    style={{ background: kpi.iconBg, color: kpi.iconColor }}
                  >
                    <Icon size={18} />
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                  {kpi.unit && <span className="text-xs text-gray-400 mb-1">{kpi.unit}</span>}
                </div>
                <span className="text-xs text-gray-400">{kpi.sub}</span>
              </div>
            );
          })}
        </div>

        {/* ── Tableau des devis ── */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Liste des devis</h2>
              <p className="text-xs text-gray-400 mt-0.5">{devis.length} devis au total</p>
            </div>
            <button
              className="flex items-center gap-2 rounded-xl text-sm font-medium px-4 py-2 text-white self-start sm:self-auto"
              style={{ background: "#2E7D32" }}
            >
              <Plus size={15} />
              Créer un devis
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "#F8FBF8" }}>
                  {["N°", "Client", "Produit", "Montant (XOF)", "Date", "Validité", "Statut", "Actions"].map((col) => (
                    <th
                      key={col}
                      className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {devis.map((d) => {
                  const s = statutConfig[d.statut];
                  return (
                    <tr key={d.numero} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold whitespace-nowrap" style={{ color: "#6A1B9A" }}>
                        {d.numero}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{d.client}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{d.produit}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap tabular-nums text-right">
                        {d.montant.toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.date}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.validite}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {d.statut === "Accepté" && <CheckCircle size={11} />}
                          {d.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <button className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2.5 py-1 hover:bg-gray-50 flex items-center gap-1">
                            <Eye size={11} />
                            Voir
                          </button>
                          {d.statut === "Accepté" && (
                            <button
                              className="text-white rounded-lg text-xs px-2.5 py-1 flex items-center gap-1"
                              style={{ background: "#2E7D32" }}
                            >
                              <ArrowRight size={11} />
                              Convertir en commande
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Modèles de devis ── */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <Copy size={16} className="text-gray-400" />
            <h2 className="text-base font-semibold text-gray-900">Modèles de devis</h2>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {templates.map((t) => (
              <div
                key={t.titre}
                className="rounded-xl border border-gray-100 p-4 flex flex-col gap-3 hover:border-gray-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="text-2xl w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: t.bg }}
                  >
                    {t.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800">{t.titre}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                <button
                  className="mt-auto flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg self-start"
                  style={{ background: t.bg, color: t.color }}
                >
                  <Plus size={12} />
                  Utiliser ce modèle
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
