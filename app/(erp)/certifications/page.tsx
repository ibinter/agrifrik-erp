import Topbar from "../../components/Topbar";
import {
  Award,
  CheckCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  FileText,
  Calendar,
  ChevronRight,
} from "lucide-react";

const certifications = [
  {
    nom: "Rainforest Alliance",
    statut: "Certifié",
    numero: "RA-CI-2023-00456",
    portee: "Cacao (toutes parcelles), Anacarde zone C",
    surface: "89 ha",
    emetteur: "Rainforest Alliance Inc.",
    dateObtention: "15/03/2023",
    dateExpiration: "14/03/2026",
    expirationNote: "dans 977 jours",
    auditSuivant: "mars 2026",
    impact: "+15% prime sur prix marché",
    urgence: false,
  },
  {
    nom: "Fairtrade International",
    statut: "Certifié",
    numero: "FLO-CI-2022-COOP-0892",
    portee: "Coopérative COOPAGRI SOUBRÉ (350 membres)",
    emetteur: "Fairtrade International",
    dateObtention: "01/07/2022",
    dateExpiration: "30/06/2025",
    expirationNote: "⚠️ RENOUVELLEMENT URGENT — dans 21 jours",
    impact: "Prime Fairtrade reçue en 2024 : 4 200 000 XOF",
    urgence: true,
  },
  {
    nom: "ISO 22000:2018 — Sécurité alimentaire",
    statut: "Certifié",
    numero: "ISO-22000-CI-2024-0123",
    portee: "Unité de transformation, entrepôts",
    emetteur: "Bureau Veritas CI",
    dateObtention: "20/01/2024",
    dateExpiration: "19/01/2027",
    auditSuivant: "janvier 2026",
    urgence: false,
  },
  {
    nom: "GlobalG.A.P.",
    statut: "En cours",
    portee: "Parcelles hévéa et palmier",
    emetteur: "SGS Côte d'Ivoire",
    auditSuivant: "Audit pré-certification prévu 01/09/2025",
    impact: "Coût estimé : 1 800 000 XOF",
    urgence: false,
  },
  {
    nom: "Bio Afrique (Agriculture Biologique)",
    statut: "Renouvellement",
    numero: "BIO-AFR-2022-CI-0045",
    portee: "Parcelle D2 — Maïs (6 ha)",
    emetteur: "Ecocert Afrique",
    dateExpiration: "31/08/2025",
    expirationNote: "dans 53 jours",
    auditSuivant: "Dossier renouvellement soumis le 01/07/2025",
    urgence: false,
  },
  {
    nom: "HACCP — Analyse des risques",
    statut: "Certifié",
    numero: "HACCP-CI-2023-0089",
    portee: "Unité décorticage anacarde",
    emetteur: "QHSE Consulting CI",
    dateObtention: "05/05/2023",
    dateExpiration: "04/05/2026",
    urgence: false,
  },
];

const echeances = [
  {
    date: "30/06/2025",
    label: "Fairtrade International EXPIRE",
    note: "dans 21 jours → Action requise",
    icon: "⚠️",
    urgence: true,
  },
  {
    date: "31/08/2025",
    label: "Bio Afrique renouvellement",
    note: "dossier soumis",
    icon: "🔄",
    urgence: false,
  },
  {
    date: "01/09/2025",
    label: "Audit GlobalG.A.P. pré-certification",
    note: "",
    icon: "📋",
    urgence: false,
  },
  {
    date: "01/01/2026",
    label: "Audit de surveillance ISO 22000",
    note: "",
    icon: "📅",
    urgence: false,
  },
  {
    date: "01/03/2026",
    label: "Audit de surveillance Rainforest Alliance",
    note: "",
    icon: "📅",
    urgence: false,
  },
];

const documents = [
  { certification: "Fairtrade International", document: "Registre des membres à jour", statut: "Disponible" },
  { certification: "Fairtrade International", document: "Comptes de la prime Fairtrade 2024", statut: "Disponible" },
  { certification: "Fairtrade International", document: "Plan d'utilisation de la prime 2025", statut: "À préparer" },
  { certification: "Rainforest Alliance", document: "Cartographie des parcelles certifiées", statut: "Disponible" },
  { certification: "Rainforest Alliance", document: "Cahier d'enregistrement des pratiques agricoles", statut: "En cours" },
  { certification: "GlobalG.A.P.", document: "Registre des intrants (engrais, pesticides)", statut: "Disponible" },
  { certification: "GlobalG.A.P.", document: "Formation des agriculteurs BPA", statut: "À préparer" },
  { certification: "ISO 22000", document: "Procédures HACCP unité transformation", statut: "Disponible" },
];

function StatutBadge({ statut }: { statut: string }) {
  if (statut === "Certifié") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        <CheckCircle size={11} /> Certifié
      </span>
    );
  }
  if (statut === "En cours") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
        <Clock size={11} /> En cours
      </span>
    );
  }
  if (statut === "Renouvellement") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
        <RefreshCw size={11} /> En renouvellement
      </span>
    );
  }
  return null;
}

function DocumentStatut({ statut }: { statut: string }) {
  const styles: Record<string, string> = {
    Disponible: "bg-green-100 text-green-700",
    "À préparer": "bg-red-100 text-red-600",
    "En cours": "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[statut] ?? "bg-gray-100 text-gray-500"}`}>
      {statut}
    </span>
  );
}

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Certifications & Conformité" breadcrumb={["Administration", "Certifications"]} />

      <div className="p-6 max-w-7xl mx-auto">

        {/* Bandeau résumé */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl bg-white border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">6</p>
              <p className="text-sm text-gray-500">Certifications actives</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <RefreshCw size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">2</p>
              <p className="text-sm text-gray-500">En renouvellement</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">0</p>
              <p className="text-sm text-gray-500">Expirées</p>
            </div>
          </div>
        </div>

        {/* Grille certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-white border p-5 flex flex-col gap-3 ${cert.urgence ? "border-red-300" : "border-gray-100"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Award size={16} className="text-[#2E7D32]" />
                  </div>
                  <span className="font-bold text-gray-800 text-sm leading-tight">{cert.nom}</span>
                </div>
                <StatutBadge statut={cert.statut} />
              </div>

              {cert.urgence && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} />
                  RENOUVELLEMENT URGENT — dans 21 jours
                </div>
              )}

              <div className="space-y-1.5 text-xs text-gray-600">
                {cert.numero && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-20 flex-shrink-0">N°</span>
                    <span className="font-mono text-gray-700">{cert.numero}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="text-gray-400 w-20 flex-shrink-0">Portée</span>
                  <span>{cert.portee}</span>
                </div>
                {cert.surface && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-20 flex-shrink-0">Surface</span>
                    <span>{cert.surface}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="text-gray-400 w-20 flex-shrink-0">Organisme</span>
                  <span>{cert.emetteur}</span>
                </div>
                {cert.dateObtention && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-20 flex-shrink-0">Obtenu</span>
                    <span>{cert.dateObtention}</span>
                  </div>
                )}
                {cert.dateExpiration && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-20 flex-shrink-0">Expiration</span>
                    <span className={cert.urgence ? "text-red-600 font-semibold" : ""}>
                      {cert.dateExpiration}
                      {cert.expirationNote && !cert.urgence && (
                        <span className="text-gray-400"> ({cert.expirationNote})</span>
                      )}
                    </span>
                  </div>
                )}
                {cert.auditSuivant && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-20 flex-shrink-0">Audit</span>
                    <span>{cert.auditSuivant}</span>
                  </div>
                )}
                {cert.impact && (
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-20 flex-shrink-0">Impact</span>
                    <span className="text-green-700 font-medium">{cert.impact}</span>
                  </div>
                )}
              </div>

              <button className="mt-auto self-start flex items-center gap-1 text-xs text-[#2E7D32] font-medium hover:underline">
                Voir le checklist d&apos;audit <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Timeline échéances */}
        <div className="rounded-2xl bg-white border border-gray-100 p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-[#2E7D32]" />
            <span className="font-bold text-gray-800 text-base">Prochaines échéances</span>
          </div>
          <div className="border-t border-gray-100 mb-4" />
          <div className="space-y-3">
            {echeances.map((e, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-xl px-4 py-3 ${e.urgence ? "bg-red-50 border border-red-200" : "bg-gray-50"}`}
              >
                <span className="text-base mt-0.5">{e.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-semibold text-gray-700">{e.date}</span>
                    <span className={`text-sm ${e.urgence ? "font-bold text-red-700" : "text-gray-700"}`}>
                      — {e.label}
                    </span>
                    {e.note && (
                      <span className={`text-xs ${e.urgence ? "text-red-600 font-semibold" : "text-gray-500"}`}>
                        {e.note}
                      </span>
                    )}
                  </div>
                </div>
                {e.urgence && (
                  <button
                    className="flex-shrink-0 text-xs text-white px-3 py-1.5 rounded-lg font-medium"
                    style={{ backgroundColor: "#2E7D32" }}
                  >
                    Renouveler
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Documents requis pour audits */}
        <div className="rounded-2xl bg-white border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-[#2E7D32]" />
            <span className="font-bold text-gray-800 text-base">Documents requis pour audits</span>
          </div>
          <div className="border-t border-gray-100 mb-4" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 pr-4 font-medium">Certification</th>
                  <th className="pb-3 pr-4 font-medium">Document requis</th>
                  <th className="pb-3 pr-4 font-medium">Statut</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 text-gray-600 text-xs font-medium">{doc.certification}</td>
                    <td className="py-3 pr-4 text-gray-700 text-xs">{doc.document}</td>
                    <td className="py-3 pr-4">
                      <DocumentStatut statut={doc.statut} />
                    </td>
                    <td className="py-3">
                      <button className="flex items-center gap-1 text-xs text-[#2E7D32] font-medium hover:underline">
                        Voir checklist <ChevronRight size={11} />
                      </button>
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
