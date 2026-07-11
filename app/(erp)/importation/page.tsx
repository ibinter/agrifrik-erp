import Topbar from "../../components/Topbar";
import {
  Package,
  Globe,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const kpis = [
  {
    label: "Commandes import en cours",
    value: "5",
    icon: Package,
    color: "#1565C0",
    bg: "#E3F2FD",
  },
  {
    label: "Valeur totale import YTD",
    value: "148 M XOF",
    icon: Globe,
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    label: "Fournisseurs internationaux",
    value: "8",
    icon: Truck,
    color: "#E65100",
    bg: "#FFF3E0",
  },
  {
    label: "Délai moyen dédouanement",
    value: "12 jours",
    icon: Clock,
    color: "#6A1B9A",
    bg: "#F3E5F5",
  },
];

const importations = [
  {
    ref: "IMP-2025-018",
    fournisseur: "YARA Nederland",
    pays: "Pays-Bas",
    contenu: "Engrais NPK 20t",
    valeurEUR: "12 400 EUR",
    valeurXOF: "8 122 400 XOF",
    incoterm: "CIF Abidjan",
    eta: "18/07/2025",
    statut: "En transit",
  },
  {
    ref: "IMP-2025-019",
    fournisseur: "SYNGENTA Basel",
    pays: "Suisse",
    contenu: "Fongicides + Insecticides",
    valeurEUR: "8 200 EUR",
    valeurXOF: "5 370 600 XOF",
    incoterm: "FOB",
    eta: "25/07/2025",
    statut: "Commande confirmée",
  },
  {
    ref: "IMP-2025-020",
    fournisseur: "SEED CO Zimbabwe",
    pays: "Zimbabwe",
    contenu: "Semences hybrides maïs",
    valeurEUR: "3 500 USD",
    valeurXOF: "2 128 000 XOF",
    incoterm: "CIF",
    eta: "20/07/2025",
    statut: "Expédié",
  },
  {
    ref: "IMP-2025-017",
    fournisseur: "DJI Singapour",
    pays: "Singapour",
    contenu: "Pièces drone Agras T40",
    valeurEUR: "1 800 USD",
    valeurXOF: "1 093 200 XOF",
    incoterm: "DDP",
    eta: "12/07/2025",
    statut: "Dédouanement",
  },
  {
    ref: "IMP-2025-016",
    fournisseur: "SATAKE Japan",
    pays: "Japon",
    contenu: "Kit maintenance R6",
    valeurEUR: "2 200 USD",
    valeurXOF: "1 336 400 XOF",
    incoterm: "DAP",
    eta: "10/07/2025",
    statut: "Livré",
  },
];

const statutStyle: Record<string, { bg: string; text: string }> = {
  "En transit": { bg: "#E3F2FD", text: "#1565C0" },
  "Commande confirmée": { bg: "#F3E5F5", text: "#6A1B9A" },
  "Expédié": { bg: "#FFF8E1", text: "#F57F17" },
  "Dédouanement": { bg: "#FFF3E0", text: "#E65100" },
  "Livré": { bg: "#E8F5E9", text: "#1B5E20" },
};

const tauxChange = [
  { devise: "EUR", taux: "655,957 XOF", note: "fixe FCFA" },
  { devise: "USD", taux: "607,43 XOF", note: "taux du 09/07/2025" },
  { devise: "GBP", taux: "770,20 XOF", note: "" },
  { devise: "CHF", taux: "672,80 XOF", note: "" },
];

const docsDouane = [
  { label: "Facture commerciale", ok: true },
  { label: "Connaissement", ok: true },
  { label: "Certificat origine", ok: true },
  { label: "Fiche technique douane", ok: false },
];

export default function ImportationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Importation" breadcrumb={["Commerce", "Importation"]} />

      <div className="p-6 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-4 shadow-sm"
              >
                <div
                  className="rounded-xl p-3 flex items-center justify-center"
                  style={{ background: kpi.bg }}
                >
                  <Icon size={22} style={{ color: kpi.color }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{kpi.label}</p>
                  <p className="text-xl font-bold text-gray-800 mt-0.5">{kpi.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tableau importations */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800">Importations en cours</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {[
                    "N° Import",
                    "Fournisseur",
                    "Pays",
                    "Contenu",
                    "Valeur (EUR/USD)",
                    "Valeur (XOF)",
                    "Incoterm",
                    "ETA",
                    "Statut Douane",
                  ].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {importations.map((imp, i) => {
                  const s = statutStyle[imp.statut] ?? { bg: "#F5F5F5", text: "#616161" };
                  return (
                    <tr
                      key={imp.ref}
                      className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-gray-700 whitespace-nowrap">{imp.ref}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{imp.fournisseur}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{imp.pays}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{imp.contenu}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{imp.valeurEUR}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{imp.valeurXOF}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{imp.incoterm}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{imp.eta}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {imp.statut === "Livré" ? "Livré ✅" : imp.statut}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Procédures douanières + Taux de change */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Procédures douanières */}
          <div className="xl:col-span-2 rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">Procédures douanières en cours</h2>
            </div>
            <div className="p-5 space-y-5">
              <div className="rounded-xl border border-orange-100 bg-orange-50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-orange-700">IMP-2025-017</span>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: "#FFF3E0", color: "#E65100" }}
                  >
                    Dédouanement
                  </span>
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    Dossier déposé DGDDI le 08/07
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    Inspection physique prévue 11/07
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 mt-0.5">•</span>
                    Droits de douane estimés :{" "}
                    <span className="font-semibold text-orange-700">218 640 XOF</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Documents requis</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {docsDouane.map((doc) => (
                    <div
                      key={doc.label}
                      className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
                      style={{
                        borderColor: doc.ok ? "#C8E6C9" : "#FFCCBC",
                        background: doc.ok ? "#F9FBE7" : "#FFF8F5",
                      }}
                    >
                      {doc.ok ? (
                        <CheckCircle size={15} className="shrink-0" style={{ color: "#2E7D32" }} />
                      ) : (
                        <AlertTriangle size={15} className="shrink-0" style={{ color: "#E65100" }} />
                      )}
                      <span className="text-sm text-gray-700">{doc.label}</span>
                      {!doc.ok && (
                        <span className="ml-auto text-xs font-medium text-orange-600">⚠️ manquante</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Taux de change */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">Taux de change du jour</h2>
              <p className="text-xs text-gray-400 mt-0.5">09/07/2025</p>
            </div>
            <div className="p-5 space-y-3">
              {tauxChange.map((t) => (
                <div
                  key={t.devise}
                  className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-700 w-8">{t.devise}</span>
                    {t.note && (
                      <span className="text-xs text-gray-400 italic">{t.note}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{t.taux}</span>
                </div>
              ))}
              <p className="text-xs text-gray-400 pt-1">
                Source : BCEAO · Taux indicatifs
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
