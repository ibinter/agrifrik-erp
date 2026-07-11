import Topbar from "../../../components/Topbar";
import { ArrowLeft, Sprout, MapPin, Calendar, TrendingUp, AlertTriangle, CheckCircle, Info, Package, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CultureDetailPage({ params }: Props) {
  const { id } = await params;

  const culture = {
    ref: id,
    nom: "Cacao Grade A",
    variete: "Amelonado",
    parcelles: "A1–A8",
    surface: "48 ha",
    debut: "15/01/2025",
    fin: "15/12/2025",
    stade: "Récolte",
    avancement: 62,
    statut: "En cours",
  };

  const kpis = [
    { label: "Stade actuel", value: "Récolte", sub: "Phase 5/6", color: "#2E7D32", bg: "#E8F5E9" },
    { label: "Jours restants", value: "157 j", sub: "Fin prévue 15/12", color: "#1565C0", bg: "#E3F2FD" },
    { label: "Rendement prévu", value: "2,1 t/ha", sub: "100,8 t total", color: "#E65100", bg: "#FFF3E0" },
    { label: "Valeur estimée", value: "120,9 M XOF", sub: "Prix marché: 1 200 XOF/kg", color: "#6A1B9A", bg: "#F3E5F5" },
  ];

  const releves = [
    { date: "09/07/2025", obs: "Konan A.", observations: "Floraison 80% — bonne densité", meteo: "☀️ 31°C", actions: "Surveillance continue" },
    { date: "08/07/2025", obs: "Konan A.", observations: "Traces de pourriture brune sur 3 pods", meteo: "🌧️ 27°C", actions: "Traitement Cu programmé" },
    { date: "07/07/2025", obs: "Ibrahim S.", observations: "RAS — développement normal", meteo: "⛅ 29°C", actions: "—" },
    { date: "06/07/2025", obs: "Ibrahim S.", observations: "Humidité du sol : 68% — OK", meteo: "☀️ 32°C", actions: "—" },
    { date: "05/07/2025", obs: "Konan A.", observations: "Apparition de mirides sur 2 pieds", meteo: "☀️ 33°C", actions: "Traitement insecticide préventif" },
    { date: "04/07/2025", obs: "Diallo M.", observations: "Prélèvement échantillon sol (lab)", meteo: "🌧️ 25°C", actions: "Envoi laboratoire" },
    { date: "03/07/2025", obs: "Diallo M.", observations: "Élagage de 12 pieds malades", meteo: "⛅ 28°C", actions: "Élimination résidus" },
  ];

  const alertes = [
    { niveau: "warning", titre: "Risque pourriture brune", message: "Humidité élevée + temp. >30°C — traitement préventif recommandé sous 48h", action: "Appliquer fongicide à base de cuivre" },
    { niveau: "warning", titre: "Pression mirides détectée", message: "2 foyers identifiés le 05/07. Surveillance renforcée requise.", action: "Traitement insecticide zones A3-A4" },
    { niveau: "info", titre: "Optimisation azote", message: "IA prédit un gain de rendement +8% avec apport N complémentaire de 20 kg/ha", action: "Planifier épandage avant 20/07" },
    { niveau: "success", titre: "Floraison excellente", message: "Taux de floraison à 80% — supérieur à la moyenne historique (68%)", action: null },
  ];

  const lots = [
    { ref: "LOT-2025-0041", date: "02/07/2025", qte: "820 kg", grade: "Grade A", statut: "En stock", dest: "COCOBOD Export" },
    { ref: "LOT-2025-0038", date: "28/06/2025", qte: "1 140 kg", grade: "Grade A", statut: "Vendu", dest: "Choco-CI Abidjan" },
    { ref: "LOT-2025-0032", date: "20/06/2025", qte: "960 kg", grade: "Grade B", statut: "Vendu", dest: "Marché local Soubré" },
  ];

  const alertColor: Record<string, { bg: string; border: string; icon: React.ReactNode; label: string }> = {
    warning: { bg: "bg-amber-50", border: "border-amber-200", icon: <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />, label: "ATTENTION" },
    info: { bg: "bg-blue-50", border: "border-blue-200", icon: <Info size={15} className="text-blue-500 shrink-0 mt-0.5" />, label: "CONSEIL IA" },
    success: { bg: "bg-green-50", border: "border-green-200", icon: <CheckCircle size={15} className="text-green-500 shrink-0 mt-0.5" />, label: "OK" },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title={`Culture — ${culture.nom}`} breadcrumb={["Cultures", "Détail"]} />

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-5">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{culture.ref}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  {culture.statut}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
                  {culture.stade}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xl font-bold text-gray-900">
                <Sprout size={20} className="text-green-600" />
                {culture.nom}
                <span className="text-sm font-normal text-gray-400 ml-1">({culture.variete})</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-gray-400" />
                  Parcelles {culture.parcelles} · {culture.surface}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-gray-400" />
                  {culture.debut} → {culture.fin}
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={13} className="text-gray-400" />
                  Avancement {culture.avancement}%
                </div>
              </div>

              {/* Barre d'avancement */}
              <div className="space-y-1">
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${culture.avancement}%`, backgroundColor: "#2E7D32" }}
                  />
                </div>
                <p className="text-xs text-gray-400">{culture.avancement}% de la campagne écoulée</p>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <Link
                href="/cultures"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={14} />
                Retour
              </Link>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ backgroundColor: "#2E7D32" }}>
                <Plus size={14} />
                Enregistrer un relevé
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: k.bg }}>
                <Sprout size={15} style={{ color: k.color }} />
              </div>
              <div className="text-xl font-bold text-gray-900">{k.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{k.sub}</div>
              <div className="text-xs text-gray-500 mt-1">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Suivi quotidien */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Suivi quotidien — 7 derniers relevés</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#F8FBF8" }}>
                <tr>
                  {["Date", "Observateur", "Observations", "Météo", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {releves.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{r.obs}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 max-w-xs">{r.observations}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{r.meteo}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{r.actions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertes & Recommandations IA */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Alertes &amp; Recommandations IA</h2>
          <div className="space-y-3">
            {alertes.map((a, i) => {
              const style = alertColor[a.niveau];
              return (
                <div key={i} className={`flex gap-3 p-4 rounded-xl border ${style.bg} ${style.border}`}>
                  {style.icon}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{style.label}</span>
                      <span className="text-sm font-semibold text-gray-900">{a.titre}</span>
                    </div>
                    <p className="text-xs text-gray-600">{a.message}</p>
                    {a.action && (
                      <p className="text-xs font-medium text-gray-800 mt-1.5">→ {a.action}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lots associés */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-gray-400" />
              <h2 className="font-semibold text-gray-900">Lots de production associés</h2>
            </div>
            <span className="text-xs text-gray-400">{lots.length} lots</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#F8FBF8" }}>
                <tr>
                  {["Référence", "Date", "Quantité", "Grade", "Statut", "Destination"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lots.map((l) => (
                  <tr key={l.ref} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{l.ref}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{l.date}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{l.qte}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className={`px-2 py-0.5 rounded-full ${l.grade === "Grade A" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {l.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className={`px-2 py-0.5 rounded-full ${l.statut === "En stock" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                        {l.statut}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{l.dest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
