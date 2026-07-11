"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Plus,
  FileText,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Camera,
  ChevronDown,
  Filter,
} from "lucide-react";

const kpis = [
  {
    label: "Rapports ce mois",
    value: "48",
    unit: "",
    sub: "+6 vs mois dernier",
    subUp: true,
    icon: FileText,
    iconColor: "#2E7D32",
    iconBg: "#E8F5E9",
  },
  {
    label: "Techniciens actifs",
    value: "8",
    unit: "",
    sub: "Sur 10 terrain",
    subUp: true,
    icon: Users,
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
  },
  {
    label: "Parcelles inspectées",
    value: "6",
    unit: "",
    sub: "Ce mois / 8 total",
    subUp: true,
    icon: MapPin,
    iconColor: "#6A1B9A",
    iconBg: "#F3E5F5",
  },
  {
    label: "Anomalies signalées",
    value: "3",
    unit: "",
    sub: "2 en cours de traitement",
    subUp: false,
    icon: AlertTriangle,
    iconColor: "#E65100",
    iconBg: "#FFF3E0",
  },
];

type Statut = "Validé" | "En attente validation" | "Brouillon";

interface Rapport {
  id: string;
  technicien: string;
  date: string;
  heure: string;
  parcelle: string;
  type: string;
  resume: string;
  observations?: string;
  actions?: string;
  recommandations?: string;
  photos: number;
  statut: Statut;
  anomalie?: string;
  compact?: boolean;
}

const rapports: Rapport[] = [
  {
    id: "RT-2025-048",
    technicien: "Ibrahim Sawadogo",
    date: "09/07/2025",
    heure: "09:15",
    parcelle: "PAR-A3",
    type: "Inspection régulière",
    resume: "Humidité sol 34%, dans les normes. Culture en bon état. Quelques cabosses immatures signalées zone nord (env. 5%). Irrigation planifiée pour demain matin.",
    observations: "Température 34°C | Vent faible | Sol sec en surface",
    actions: "Relevé pH (6,8 ✅) | Photo zone nord",
    recommandations: "Irrigation 15 000L demain 06h | Surveiller cabosses nord",
    photos: 3,
    statut: "Validé",
  },
  {
    id: "RT-2025-047",
    technicien: "Ibrahim Sawadogo",
    date: "08/07/2025",
    heure: "14:30",
    parcelle: "PAR-A1",
    type: "Post-récolte",
    resume: "Récolte cabosses terminée. 2 400 kg collectés, qualité Grade A. Pesée vérifiée (×3). Transport vers fermenteur A effectué 16h00.",
    observations: "Aucune anomalie | Météo : 31°C ☀️",
    photos: 5,
    statut: "Validé",
  },
  {
    id: "RT-2025-046",
    technicien: "Bamba Oumar",
    date: "08/07/2025",
    heure: "11:00",
    parcelle: "Zone D — Matériels",
    type: "Maintenance préventive",
    resume: "Révision tracteur JD 6120M : vidange + filtres remplacés. Pression pneus OK. Heure compteur : 2 847h. Prochaine révision : 3 000h.",
    anomalie: "⚠️ Fuite légère circuit hydraulique (joint usé) — Pièce commandée DHL-JD-20785.",
    photos: 4,
    statut: "En attente validation",
  },
  {
    id: "RT-2025-045",
    technicien: "Koné Seydou",
    date: "07/07/2025",
    heure: "08:45",
    parcelle: "PAR-B2",
    type: "Inspection régulière",
    resume: "Croissance caféiers normale. Taux de floraison estimé à 78%. Sol bien drainé après les pluies de jeudi.",
    photos: 2,
    statut: "Validé",
    compact: true,
  },
  {
    id: "RT-2025-044",
    technicien: "Ibrahim Sawadogo",
    date: "06/07/2025",
    heure: "10:00",
    parcelle: "PAR-A2",
    type: "Traitement phytosanitaire",
    resume: "Application fongicide Mancozeb 80 WP (dose 2,5 kg/ha). Zone couverte : 3,2 ha. EPI portés. Délai avant récolte : 14 jours.",
    photos: 1,
    statut: "Validé",
    compact: true,
  },
  {
    id: "RT-2025-043",
    technicien: "Bamba Oumar",
    date: "05/07/2025",
    heure: "13:15",
    parcelle: "PAR-D2",
    type: "Inspection régulière",
    resume: "Présence adventices importante — sarclage requis avant 14/07. Cultures saines par ailleurs.",
    anomalie: "Adventices > seuil tolérance",
    photos: 3,
    statut: "Validé",
    compact: true,
  },
  {
    id: "RT-2025-042",
    technicien: "Koné Seydou",
    date: "04/07/2025",
    heure: "09:30",
    parcelle: "PAR-C1",
    type: "Irrigation",
    resume: "Vérification réseau irrigation goutte-à-goutte. 2 goutteurs bouchés remplacés. Débit vérifié : 4,2 L/h/plant.",
    photos: 2,
    statut: "Validé",
    compact: true,
  },
  {
    id: "RT-2025-041",
    technicien: "Traoré Awa",
    date: "03/07/2025",
    heure: "07:50",
    parcelle: "PAR-A4",
    type: "Inspection régulière",
    resume: "État général satisfaisant. Début de formation des cabosses détecté sur 30% des plants. Humidité 38%.",
    photos: 4,
    statut: "Validé",
    compact: true,
  },
  {
    id: "RT-2025-040",
    technicien: "Ibrahim Sawadogo",
    date: "02/07/2025",
    heure: "11:20",
    parcelle: "PAR-B1",
    type: "Post-récolte",
    resume: "Collecte anacarde terminée. 1 800 kg stockés en entrepôt E2. Humidité grains : 9,5% — conforme export.",
    photos: 3,
    statut: "Validé",
    compact: true,
  },
  {
    id: "RT-2025-039",
    technicien: "Bamba Oumar",
    date: "01/07/2025",
    heure: "08:00",
    parcelle: "Zone D — Matériels",
    type: "Maintenance corrective",
    resume: "Remplacement courroie moteur motopompe P3. Durée intervention : 2h30. Pompe opérationnelle. Test débit OK.",
    photos: 2,
    statut: "Validé",
    compact: true,
  },
];

const anomalies = [
  {
    niveau: "rouge",
    titre: "Fuite hydraulique tracteur JD",
    technicien: "Bamba Oumar",
    date: "08/07",
    detail: "En attente pièce DHL-JD-20785",
  },
  {
    niveau: "jaune",
    titre: "Cabosses immatures PAR-A3 zone nord (5%)",
    technicien: "Ibrahim Sawadogo",
    date: "09/07",
    detail: "Surveillance active",
  },
  {
    niveau: "jaune",
    titre: "Présence adventices parcelle PAR-D2",
    technicien: "Ibrahim Sawadogo",
    date: "05/07",
    detail: "Sarclage planifié 14/07",
  },
];

const filtresPeriode = ["Tous", "Aujourd'hui", "Cette semaine", "Ce mois"];
const techniciens = ["Tous les techniciens", "Ibrahim Sawadogo", "Bamba Oumar", "Koné Seydou", "Traoré Awa"];
const parcelles = ["Toutes les parcelles", "PAR-A1", "PAR-A2", "PAR-A3", "PAR-A4", "PAR-B1", "PAR-B2", "PAR-C1", "PAR-D2", "Zone D — Matériels"];

function statutBadge(statut: Statut) {
  if (statut === "Validé") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        <CheckCircle size={11} />
        Validé
      </span>
    );
  }
  if (statut === "En attente validation") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
        <Clock size={11} />
        En attente validation
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
      Brouillon
    </span>
  );
}

export default function RapportsTerrainPage() {
  const [filtrePeriode, setFiltrePeriode] = useState("Tous");
  const [technicien, setTechnicien] = useState("Tous les techniciens");
  const [parcelle, setParcelle] = useState("Toutes les parcelles");
  const [expanded, setExpanded] = useState<string | null>("RT-2025-048");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar
        title="Rapports de Terrain"
        breadcrumb={["Rapports & BI", "Rapports Terrain"]}
      />

      <main className="flex-1 p-6 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{kpi.label}</span>
                  <span
                    style={{ background: kpi.iconBg, color: kpi.iconColor }}
                    className="rounded-xl p-2 flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                  {kpi.unit && <span className="text-xs text-gray-400 mb-1">{kpi.unit}</span>}
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: kpi.subUp ? "#2E7D32" : "#E65100" }}
                >
                  {kpi.sub}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bouton + filtres */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            className="text-white rounded-xl text-sm font-semibold px-5 py-2.5 flex items-center gap-2 w-fit shadow-sm"
            style={{ background: "#2E7D32" }}
          >
            <Plus size={16} />
            Nouveau rapport
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filtres période */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
              {filtresPeriode.map((f) => (
                <button
                  key={f}
                  onClick={() => setFiltrePeriode(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={
                    filtrePeriode === f
                      ? { background: "#2E7D32", color: "#fff" }
                      : { color: "#9E9E9E" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Sélect technicien */}
            <div className="relative">
              <select
                value={technicien}
                onChange={(e) => setTechnicien(e.target.value)}
                className="appearance-none border border-gray-200 bg-white rounded-xl text-xs text-gray-600 px-3 py-2 pr-7 outline-none cursor-pointer"
              >
                {techniciens.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Sélect parcelle */}
            <div className="relative">
              <select
                value={parcelle}
                onChange={(e) => setParcelle(e.target.value)}
                className="appearance-none border border-gray-200 bg-white rounded-xl text-xs text-gray-600 px-3 py-2 pr-7 outline-none cursor-pointer"
              >
                {parcelles.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 rounded-xl text-xs px-3 py-2 hover:bg-gray-50">
              <Filter size={12} />
              Plus de filtres
            </button>
          </div>
        </div>

        {/* Liste des rapports */}
        <div className="space-y-3">
          {rapports.map((r) => {
            if (r.compact) {
              return (
                <div
                  key={r.id}
                  className="rounded-2xl border border-gray-100 bg-white px-5 py-3 flex flex-wrap items-center gap-4"
                >
                  <span className="font-mono text-xs font-semibold text-[#2E7D32] w-28">{r.id}</span>
                  <span className="text-xs text-gray-700 font-medium w-36">{r.technicien}</span>
                  <span className="text-xs text-gray-500 w-28">{r.date} {r.heure}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin size={11} className="text-gray-400" />
                    {r.parcelle}
                  </span>
                  <span className="text-xs text-gray-400 italic">{r.type}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                    <Camera size={11} />
                    {r.photos}
                  </span>
                  <div>{statutBadge(r.statut)}</div>
                  {r.anomalie && (
                    <span className="text-xs text-orange-600 font-medium">⚠️ Anomalie</span>
                  )}
                </div>
              );
            }

            const isOpen = expanded === r.id;
            return (
              <div
                key={r.id}
                className="rounded-2xl border border-gray-100 bg-white overflow-hidden"
              >
                {/* Header */}
                <button
                  className="w-full flex flex-wrap items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : r.id)}
                >
                  <span className="font-mono text-sm font-bold text-[#2E7D32] w-32">{r.id}</span>
                  <span className="text-sm font-semibold text-gray-800 w-40">{r.technicien}</span>
                  <span className="text-xs text-gray-500 w-32">{r.date} {r.heure}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin size={12} className="text-[#2E7D32]" />
                    {r.parcelle}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{r.type}</span>
                  <div className="ml-auto flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Camera size={12} />
                      {r.photos} photo{r.photos > 1 ? "s" : ""}
                    </span>
                    {statutBadge(r.statut)}
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {/* Body */}
                {isOpen && (
                  <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Résumé</p>
                      <p className="text-sm text-gray-700">{r.resume}</p>
                    </div>
                    {r.anomalie && (
                      <div className="rounded-xl bg-orange-50 border border-orange-100 px-4 py-3">
                        <p className="text-xs font-semibold text-orange-700 mb-0.5">Anomalie détectée</p>
                        <p className="text-sm text-orange-800">{r.anomalie}</p>
                      </div>
                    )}
                    {r.observations && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Observations</p>
                        <p className="text-sm text-gray-600">{r.observations}</p>
                      </div>
                    )}
                    {r.actions && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Actions prises</p>
                        <p className="text-sm text-gray-600">{r.actions}</p>
                      </div>
                    )}
                    {r.recommandations && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Recommandations</p>
                        <p className="text-sm text-gray-600">{r.recommandations}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                      <button className="text-xs border border-gray-200 text-gray-600 rounded-lg px-3 py-1.5 hover:bg-gray-50">
                        Voir les photos ({r.photos})
                      </button>
                      {r.statut === "En attente validation" && (
                        <button
                          className="text-xs text-white rounded-lg px-3 py-1.5 font-medium"
                          style={{ background: "#2E7D32" }}
                        >
                          Valider le rapport
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Anomalies ouvertes */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Anomalies ouvertes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {anomalies.map((a, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-4 flex flex-col gap-2"
                style={{
                  borderColor: a.niveau === "rouge" ? "#FFCDD2" : "#FFE0B2",
                }}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    size={16}
                    style={{ color: a.niveau === "rouge" ? "#C62828" : "#E65100", flexShrink: 0, marginTop: 2 }}
                  />
                  <p className="text-sm font-semibold text-gray-800">{a.titre}</p>
                </div>
                <p className="text-xs text-gray-500">{a.technicien} — {a.date}</p>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full w-fit"
                  style={
                    a.niveau === "rouge"
                      ? { background: "#FFEBEE", color: "#C62828" }
                      : { background: "#FFF3E0", color: "#E65100" }
                  }
                >
                  {a.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistiques terrain */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Statistiques terrain</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Fréquence d'inspection</p>
              <p className="text-2xl font-bold text-gray-900">2,3</p>
              <p className="text-xs text-gray-400">visites/parcelle/mois</p>
              <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                <CheckCircle size={10} />
                Objectif 2/mois atteint
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Taux de validation rapports</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
              <p className="text-xs text-gray-400">validés en moins de 48h</p>
              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-green-500" style={{ width: "94%" }} />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Anomalies détectées vs corrigées</p>
              <p className="text-2xl font-bold text-gray-900">
                18 <span className="text-sm font-normal text-gray-400">détectées</span>
              </p>
              <p className="text-xs text-gray-400">15 corrigées (83%)</p>
              <div className="mt-2 h-2 rounded-full bg-gray-100">
                <div className="h-2 rounded-full bg-orange-400" style={{ width: "83%" }} />
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
