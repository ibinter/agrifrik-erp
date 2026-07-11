import Topbar from "../../../components/Topbar";
import {
  Camera,
  CheckCircle,
  MapPin,
  AlertTriangle,
  Clock,
  User,
  Calendar,
  Navigation,
  FileText,
  ArrowLeft,
  Download,
  Plus,
} from "lucide-react";

export default async function RapportTerrainDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const kpis = [
    { label: "Parcelles visitées", value: "3/6", sub: "" },
    { label: "Surface couverte", value: "6,2 ha", sub: "" },
    { label: "Observations critiques", value: "2", sub: "mirides PAR-A1, floraison PAR-A2" },
    { label: "Photos prises", value: "14", sub: "" },
    { label: "Prochaine visite", value: "14/07/2025", sub: "" },
  ];

  const obsA1 = [
    { critere: "Taux infestation mirides", obs: "6% (12/200 feuilles examinées)", statut: "danger", action: "Traitement 15/07" },
    { critere: "Pourriture brune", obs: "Absence", statut: "ok", action: "—" },
    { critere: "État général des arbres", obs: "Bon — aucun arbre malade", statut: "ok", action: "—" },
    { critere: "Cabosses en développement", obs: "284 cabosses comptées (PAR-A1 ouest)", statut: "ok", action: "—" },
    { critere: "Enherbement", obs: "Faible — 3 semaines de repousse", statut: "ok", action: "Désherbage prévu août" },
  ];

  const obsA2 = [
    { critere: "Taux floraison", obs: "+23% vs juil. 2024 — exceptionnelle", statut: "ok", action: "Surveiller" },
    { critere: "Taux infestation mirides", obs: "2%", statut: "ok", action: "Préventif planifié" },
    { critere: "Cabosses en développement", obs: "312 cabosses (nord PAR-A2)", statut: "ok", action: "—" },
    { critere: "Qualité ombragiers", obs: "3 arbres d'ombrage secs à retirer", statut: "warning", action: "Planifier coupe août" },
  ];

  const obsB1 = [
    { critere: "Croissance", obs: "Hauteur moy. 3,2m (conforme pour 5 ans)", statut: "ok", action: "—" },
    { critere: "Premières cabosses", obs: "18 cabosses détectées (début de production)", statut: "ok", action: "—" },
    { critere: "Fertilisation", obs: "Besoin engrais KCl identifié", statut: "warning", action: "Commander KCl urgent" },
  ];

  const gpsPoints = [
    { id: "GPS-001", parcelle: "PAR-A1 (entrée)", lat: "5.7819°N", lon: "6.5921°W", obs: "Entrée parcelle — RAS" },
    { id: "GPS-002", parcelle: "PAR-A1 (centre)", lat: "5.7822°N", lon: "6.5923°W", obs: "Foyer mirides observé" },
    { id: "GPS-003", parcelle: "PAR-A2 (nord)", lat: "5.7824°N", lon: "6.5918°W", obs: "Floraison exceptionnelle" },
    { id: "GPS-004", parcelle: "PAR-B1", lat: "5.7815°N", lon: "6.5930°W", obs: "Premières cabosses détectées" },
    { id: "GPS-005", parcelle: "PAR-A1 (sud)", lat: "5.7818°N", lon: "6.5925°W", obs: "Zone saine — RAS" },
    { id: "GPS-006", parcelle: "PAR-A2 (centre)", lat: "5.7823°N", lon: "6.5919°W", obs: "Cabosses comptées" },
    { id: "GPS-007", parcelle: "PAR-A2 (sud)", lat: "5.7821°N", lon: "6.5920°W", obs: "Ombragiers secs repérés" },
    { id: "GPS-008", parcelle: "PAR-B1 (nord)", lat: "5.7816°N", lon: "6.5929°W", obs: "Croissance vérifiée" },
    { id: "GPS-009", parcelle: "PAR-B1 (centre)", lat: "5.7814°N", lon: "6.5931°W", obs: "Fertilité du sol — OK" },
    { id: "GPS-010", parcelle: "PAR-A1 (nord)", lat: "5.7820°N", lon: "6.5922°W", obs: "Début de floraison" },
    { id: "GPS-011", parcelle: "PAR-A2 (est)", lat: "5.7825°N", lon: "6.5917°W", obs: "RAS" },
    { id: "GPS-012", parcelle: "PAR-B1 (sud)", lat: "5.7813°N", lon: "6.5932°W", obs: "Jeunes plants sains" },
    { id: "GPS-013", parcelle: "PAR-A1 (ouest)", lat: "5.7817°N", lon: "6.5926°W", obs: "Point de traitement prévu" },
    { id: "GPS-014", parcelle: "PAR-A2 (ouest)", lat: "5.7822°N", lon: "6.5921°W", obs: "Délimitation vérifiée" },
  ];

  const photos = [
    { label: "PAR-A1 — Feuilles infestées mirides" },
    { label: "PAR-A1 — Cabosses en développement (ouest)" },
    { label: "PAR-A2 — Floraison exceptionnelle" },
    { label: "PAR-B1 — Premières cabosses" },
    { label: "PAR-A1 — Zone traitement prévu 15/07" },
    { label: "PAR-A2 — Ombragiers secs à retirer" },
    { label: "PAR-A1 — Vue générale parcelle" },
    { label: "PAR-A2 — Comptage cabosses nord" },
    { label: "PAR-B1 — Croissance des plants" },
    { label: "PAR-A1 — Foyer mirides (GPS-002)" },
    { label: "PAR-B1 — Sol — besoin KCl" },
    { label: "PAR-A2 — Qualité floraison" },
    { label: "PAR-A1 — Enherbement faible" },
    { label: "PAR-B1 — Vue d'ensemble (1,8 ha)" },
  ];

  const actions = [
    { action: "Commander Super Cupravit (1,3 kg manquants)", urgence: "danger", urgenceLabel: "Urgent", assigne: "Koffi Amani", delai: "11/07", statut: "ok", statutLabel: "Fait" },
    { action: "Traitement phyto PAR-A1", urgence: "warning", urgenceLabel: "Haute", assigne: "Ibrahim Sawadogo", delai: "15/07", statut: "warning", statutLabel: "Planifié (PCT-2025-034)" },
    { action: "Retirer 3 ombragiers secs PAR-A2", urgence: "ok", urgenceLabel: "Normale", assigne: "Ibrahim Sawadogo", delai: "Août", statut: "pending", statutLabel: "À planifier" },
    { action: "Commander KCl PAR-B1", urgence: "danger", urgenceLabel: "Urgent", assigne: "Koffi Amani", delai: "11/07", statut: "ok", statutLabel: "En commande" },
  ];

  function StatutBadge({ statut, label }: { statut: string; label: string }) {
    if (statut === "ok")
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
          ✅ {label}
        </span>
      );
    if (statut === "danger")
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
          🔴 {label}
        </span>
      );
    if (statut === "warning")
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
          🟡 {label}
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
        ⏳ {label}
      </span>
    );
  }

  function ObsStatut({ statut }: { statut: string }) {
    if (statut === "ok")
      return <span className="text-green-600 font-semibold">✅</span>;
    if (statut === "danger")
      return <span className="text-red-600 font-semibold">🔴 Seuil dépassé</span>;
    return <span className="text-orange-500 font-semibold">🟡</span>;
  }

  return (
    <div className="min-h-screen bg-[#F8FBF8]">
      <Topbar
        title={`Rapport Terrain ${id}`}
        breadcrumb={["Rapports", "Rapports Terrain", `Rapport ${id}`]}
      />

      <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">

        {/* Bandeau en-tête vert */}
        <div className="rounded-2xl bg-[#2E7D32] text-white p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-green-200" />
                <div>
                  <h1 className="text-xl font-bold">RT-2025-028 — Visite terrain hebdomadaire</h1>
                  <p className="text-green-200 text-sm mt-0.5">Rapport de visite terrain officiel</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-green-100">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-green-300" />
                  <span>Ibrahim Sawadogo (Technicien terrain EXP-001)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-300" />
                  <span>Date visite : 07/07/2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-300" />
                  <span>Parcelles : PAR-A1, PAR-A2, PAR-B1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-300" />
                  <span>Durée : 3h30 (07h00–10h30)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-green-300" />
                  <span>GPS enregistré : ✅</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 text-green-800 px-3 py-1 text-sm font-semibold">
                <CheckCircle className="h-4 w-4" /> Soumis et validé
              </span>
              <p className="text-green-200 text-xs">Validé par : Koffi Amani (08/07/2025)</p>
            </div>
          </div>
        </div>

        {/* 5 KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
              <p className="text-2xl font-bold text-[#2E7D32]">{k.value}</p>
              <p className="text-xs text-gray-500 mt-1">{k.label}</p>
              {k.sub && <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>}
            </div>
          ))}
        </div>

        {/* Résumé exécutif */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-bold text-gray-800 mb-3">Résumé exécutif</h2>
          <div className="rounded-xl bg-green-50 border border-green-100 p-4 text-sm text-gray-700 leading-relaxed">
            Visite de routine hebdomadaire. <strong>PAR-A1</strong> présente un taux d&apos;infestation
            mirides de <strong>6%</strong> (seuil d&apos;intervention dépassé — traitement planifié le
            15/07, PCT-2025-034). <strong>PAR-A2</strong> montre une floraison exceptionnelle{" "}
            <strong>(+23% vs juillet 2024)</strong> — très bon indicateur pour la grande récolte oct-nov
            2025. <strong>PAR-B1</strong> développement normal pour des plants de 5 ans. Pas de pourriture
            brune détectée sur aucune des 3 parcelles.
          </div>
        </div>

        {/* Observations par parcelle */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-6">
          <h2 className="text-base font-bold text-gray-800">Observations par parcelle</h2>

          {/* PAR-A1 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-3 w-3 rounded-full bg-red-400 inline-block" />
              <h3 className="text-sm font-bold text-gray-700">PAR-A1 — Cacao mature (2,3 ha)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Critère</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Observation</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Statut</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {obsA1.map((row, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-700">{row.critere}</td>
                      <td className="px-3 py-2 text-gray-600">{row.obs}</td>
                      <td className="px-3 py-2"><ObsStatut statut={row.statut} /></td>
                      <td className="px-3 py-2 text-gray-500">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAR-A2 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-3 w-3 rounded-full bg-green-400 inline-block" />
              <h3 className="text-sm font-bold text-gray-700">PAR-A2 — Cacao mature (2,1 ha)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Critère</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Observation</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Statut</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {obsA2.map((row, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-700">{row.critere}</td>
                      <td className="px-3 py-2 text-gray-600">{row.obs}</td>
                      <td className="px-3 py-2"><ObsStatut statut={row.statut} /></td>
                      <td className="px-3 py-2 text-gray-500">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAR-B1 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-3 w-3 rounded-full bg-blue-400 inline-block" />
              <h3 className="text-sm font-bold text-gray-700">PAR-B1 — Cacao jeune (1,8 ha — 5 ans)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Critère</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Observation</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Statut</th>
                    <th className="text-left px-3 py-2 text-gray-500 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {obsB1.map((row, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-700">{row.critere}</td>
                      <td className="px-3 py-2 text-gray-600">{row.obs}</td>
                      <td className="px-3 py-2"><ObsStatut statut={row.statut} /></td>
                      <td className="px-3 py-2 text-gray-500">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Coordonnées GPS */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-base font-bold text-gray-800">Coordonnées GPS des points d&apos;observation</h2>

          {/* Mini carte SVG */}
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-2xl">
              {/* Fond */}
              <rect width="500" height="300" fill="#e8f5e9" />
              {/* Grille légère */}
              <line x1="0" y1="100" x2="500" y2="100" stroke="#c8e6c9" strokeWidth="1" />
              <line x1="0" y1="200" x2="500" y2="200" stroke="#c8e6c9" strokeWidth="1" />
              <line x1="166" y1="0" x2="166" y2="300" stroke="#c8e6c9" strokeWidth="1" />
              <line x1="333" y1="0" x2="333" y2="300" stroke="#c8e6c9" strokeWidth="1" />
              {/* Parcelle PAR-A1 */}
              <rect x="30" y="30" width="160" height="120" rx="8" fill="#a5d6a7" stroke="#2E7D32" strokeWidth="2" opacity="0.7" />
              <text x="110" y="95" textAnchor="middle" fontSize="12" fill="#1B5E20" fontWeight="bold">PAR-A1</text>
              <text x="110" y="110" textAnchor="middle" fontSize="9" fill="#2E7D32">2,3 ha</text>
              {/* Parcelle PAR-A2 */}
              <rect x="200" y="30" width="150" height="110" rx="8" fill="#c8e6c9" stroke="#2E7D32" strokeWidth="2" opacity="0.7" />
              <text x="275" y="90" textAnchor="middle" fontSize="12" fill="#1B5E20" fontWeight="bold">PAR-A2</text>
              <text x="275" y="105" textAnchor="middle" fontSize="9" fill="#2E7D32">2,1 ha</text>
              {/* Parcelle PAR-B1 */}
              <rect x="50" y="165" width="180" height="110" rx="8" fill="#dcedc8" stroke="#558b2f" strokeWidth="2" opacity="0.7" />
              <text x="140" y="225" textAnchor="middle" fontSize="12" fill="#1B5E20" fontWeight="bold">PAR-B1</text>
              <text x="140" y="240" textAnchor="middle" fontSize="9" fill="#2E7D32">1,8 ha</text>
              {/* Points GPS */}
              {/* GPS-001 PAR-A1 entrée */}
              <circle cx="50" cy="140" r="7" fill="#EF5350" stroke="white" strokeWidth="2" />
              <text x="62" y="144" fontSize="8" fill="#1B5E20">GPS-001</text>
              {/* GPS-002 PAR-A1 centre foyer */}
              <circle cx="110" cy="90" r="7" fill="#EF5350" stroke="white" strokeWidth="2" />
              <text x="122" y="94" fontSize="8" fill="#1B5E20">GPS-002 ⚠</text>
              {/* GPS-003 PAR-A2 nord floraison */}
              <circle cx="275" cy="50" r="7" fill="#4CAF50" stroke="white" strokeWidth="2" />
              <text x="287" y="54" fontSize="8" fill="#1B5E20">GPS-003 ✓</text>
              {/* GPS-004 PAR-B1 cabosses */}
              <circle cx="140" cy="200" r="7" fill="#4CAF50" stroke="white" strokeWidth="2" />
              <text x="152" y="204" fontSize="8" fill="#1B5E20">GPS-004</text>
              {/* Légende */}
              <rect x="360" y="20" width="130" height="60" rx="6" fill="white" opacity="0.85" />
              <circle cx="378" cy="40" r="5" fill="#EF5350" />
              <text x="390" y="44" fontSize="9" fill="#333">Point critique</text>
              <circle cx="378" cy="60" r="5" fill="#4CAF50" />
              <text x="390" y="64" fontSize="9" fill="#333">Point normal</text>
              {/* Titre carte */}
              <text x="250" y="290" textAnchor="middle" fontSize="10" fill="#2E7D32">Carte schématique — EXP-001 | Visite 07/07/2025</text>
            </svg>
          </div>

          {/* Tableau GPS */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Point</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Parcelle</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Latitude</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Longitude</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Observation</th>
                </tr>
              </thead>
              <tbody>
                {gpsPoints.map((pt, i) => (
                  <tr key={i} className="border-t border-gray-50">
                    <td className="px-3 py-2 font-mono font-medium text-[#2E7D32]">{pt.id}</td>
                    <td className="px-3 py-2 text-gray-700">{pt.parcelle}</td>
                    <td className="px-3 py-2 text-gray-600 font-mono">{pt.lat}</td>
                    <td className="px-3 py-2 text-gray-600 font-mono">{pt.lon}</td>
                    <td className="px-3 py-2 text-gray-500">{pt.obs}</td>
                  </tr>
                ))}
                <tr className="border-t border-dashed border-gray-200">
                  <td colSpan={5} className="px-3 py-2 text-gray-400 italic text-center">
                    ... 10 autres points enregistrés
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Photos */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">Photos (14 prises)</h2>
            <span className="text-xs text-gray-400">07/07/2025 — Ibrahim Sawadogo</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3">
            {photos.map((p, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-2 p-2 text-center"
              >
                <Camera className="h-6 w-6 text-gray-400" />
                <span className="text-[10px] text-gray-500 leading-tight">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions déclenchées */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-bold text-gray-800 mb-3">Actions déclenchées</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Action</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Urgence</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Assigné à</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Délai</th>
                  <th className="text-left px-3 py-2 text-gray-500 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((a, i) => (
                  <tr key={i} className="border-t border-gray-50">
                    <td className="px-3 py-2 text-gray-700">{a.action}</td>
                    <td className="px-3 py-2">
                      <StatutBadge statut={a.urgence} label={a.urgenceLabel} />
                    </td>
                    <td className="px-3 py-2 text-gray-600">{a.assigne}</td>
                    <td className="px-3 py-2 text-gray-600 font-medium">{a.delai}</td>
                    <td className="px-3 py-2">
                      <StatutBadge statut={a.statut} label={a.statutLabel} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions bas de page */}
        <div className="flex flex-wrap items-center gap-3 pb-8">
          <a
            href="/rapports-terrain"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux rapports terrain
          </a>
          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="h-4 w-4" />
            Exporter PDF
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2 text-xs font-medium text-white hover:bg-[#1B5E20] transition-colors">
            <Plus className="h-4 w-4" />
            Créer nouveau rapport
          </button>
        </div>
      </div>
    </div>
  );
}
