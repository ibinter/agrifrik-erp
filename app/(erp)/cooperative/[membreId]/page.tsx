import Topbar from "../../../components/Topbar";
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Layers,
  TrendingUp,
  Calendar,
  Banknote,
} from "lucide-react";

const parcelles = [
  { code: "P-M001-A1", surface: "3,8 ha", culture: "Cacao", stade: "Récolte", rendement: "7,6 t" },
  { code: "P-M001-A2", surface: "2,4 ha", culture: "Cacao", stade: "Floraison", rendement: "4,8 t" },
];

const productions = [
  { annee: "2024", volume: "12,4 t", prix: "1 180 XOF/kg", revenu: "14 632 000 XOF" },
  { annee: "2023", volume: "11,8 t", prix: "1 050 XOF/kg", revenu: "12 390 000 XOF" },
  { annee: "2022", volume: "10,2 t", prix: "980 XOF/kg", revenu: "9 996 000 XOF" },
  { annee: "2021", volume: "9,6 t", prix: "920 XOF/kg", revenu: "8 832 000 XOF" },
];

const paiements = [
  { date: "15/03/2025", libelle: "Versement récolte principale campagne 2024", montant: "8 000 000 XOF" },
  { date: "10/11/2024", libelle: "Versement intermédiaire campagne 2024", montant: "4 200 000 XOF" },
  { date: "28/04/2024", libelle: "Prime qualité Fairtrade 2024", montant: "2 432 000 XOF" },
];

const stadeColor = (s: string) => {
  if (s === "Récolte") return "bg-green-100 text-green-800";
  if (s === "Floraison") return "bg-pink-100 text-pink-800";
  return "bg-blue-100 text-blue-800";
};

export default async function FicheMembrePage({
  params,
}: {
  params: Promise<{ membreId: string }>;
}) {
  const { membreId } = await params;
  const label = membreId.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Fiche Membre"
        breadcrumb={["Production", "Coopérative", `Membre ${label}`]}
      />

      <div className="p-6 space-y-6">
        {/* Card profil */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0"
                style={{ background: "#2E7D32" }}
              >
                KY
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Konan Yao</h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    {label}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                    <CheckCircle size={11} /> Membre actif
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                    Cotisation à jour
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center px-4 py-2 rounded-xl border-2 border-green-300 bg-green-50">
                <p className="text-xs text-gray-500 font-medium">Score IA</p>
                <p className="text-2xl font-bold" style={{ color: "#2E7D32" }}>87</p>
                <p className="text-xs text-green-700 font-semibold">/100 — Excellent</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Date d&apos;adhésion</p>
              <p className="text-sm font-medium text-gray-800 mt-0.5 flex items-center gap-1">
                <Calendar size={13} className="text-gray-400" /> 15/03/2012
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Ancienneté</p>
              <p className="text-sm font-medium text-gray-800 mt-0.5">13 ans</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Village</p>
              <p className="text-sm font-medium text-gray-800 mt-0.5 flex items-center gap-1">
                <MapPin size={13} className="text-gray-400" /> Soubré-centre
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Coordonnées GPS</p>
              <p className="text-sm font-mono text-gray-700 mt-0.5">5°47&apos;N 6°36&apos;W</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Téléphone</p>
              <p className="text-sm font-medium text-gray-800 mt-0.5 flex items-center gap-1">
                <Phone size={13} className="text-gray-400" /> +225 07 12 34 56
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
              <p className="text-sm font-medium text-gray-800 mt-0.5 flex items-center gap-1">
                <Mail size={13} className="text-gray-400" /> konan.yao@agrifrik.com
              </p>
            </div>
          </div>
        </div>

        {/* Parcelles */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Layers size={18} style={{ color: "#2E7D32" }} />
            <h3 className="text-base font-semibold text-gray-900">Parcelles du membre</h3>
            <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {parcelles.length} parcelles
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Code parcelle", "Surface", "Culture", "Stade actuel", "Rendement 2024"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-6 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parcelles.map((p, i) => (
                  <tr key={p.code} className={`border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                    <td className="py-3 pr-6 font-mono text-xs font-semibold text-gray-700">{p.code}</td>
                    <td className="py-3 pr-6 font-medium text-gray-800">{p.surface}</td>
                    <td className="py-3 pr-6">
                      <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ background: "#6D4C41" }}>
                        {p.culture}
                      </span>
                    </td>
                    <td className="py-3 pr-6">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stadeColor(p.stade)}`}>
                        {p.stade}
                      </span>
                    </td>
                    <td className="py-3 font-bold text-gray-800">{p.rendement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Historique productions */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} style={{ color: "#2E7D32" }} />
            <h3 className="text-base font-semibold text-gray-900">Historique des productions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Année", "Volume livré", "Prix moyen", "Revenu total"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-8 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productions.map((p, i) => (
                  <tr key={p.annee} className={`border-b border-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                    <td className="py-3 pr-8 font-semibold text-gray-700">{p.annee}</td>
                    <td className="py-3 pr-8 font-medium text-gray-800">{p.volume}</td>
                    <td className="py-3 pr-8 text-gray-600">{p.prix}</td>
                    <td className="py-3 font-bold" style={{ color: "#2E7D32" }}>
                      {p.revenu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paiements */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Banknote size={18} style={{ color: "#2E7D32" }} />
            <h3 className="text-base font-semibold text-gray-900">Paiements reçus</h3>
            <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              3 derniers versements
            </span>
          </div>
          <div className="space-y-3">
            {paiements.map((p) => (
              <div
                key={p.date}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="shrink-0 px-3 py-1.5 rounded-lg text-white text-xs font-semibold whitespace-nowrap"
                    style={{ background: "#2E7D32" }}
                  >
                    {p.date}
                  </div>
                  <p className="text-sm text-gray-700">{p.libelle}</p>
                </div>
                <p className="text-sm font-bold text-gray-900 whitespace-nowrap">{p.montant}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
