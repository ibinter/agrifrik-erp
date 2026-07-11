import Topbar from "../../../components/Topbar";
import { ArrowLeft, Edit, MapPin, Leaf, Layers, Compass, Award, CheckCircle, Clock, Circle, FileText, Image, File } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ParcelleDetailPage({ params }: Props) {
  const { id } = await params;

  const parcelle = {
    code: "PAR-A1",
    localite: "Soubré, Zone A",
    culture: "Cacao Grade A",
    surface: "6,2 ha",
    sol: "Argilo-limoneux",
    propriete: "En propriété",
    gps: "5°46'55\"N · 6°36'04\"W",
    altitude: "142 m",
    certifications: ["Rainforest Alliance", "GlobalG.A.P."],
    statut: "Active",
  };

  const kpis = [
    { label: "Rendement dernier cycle", value: "1,26 t/ha", color: "#2E7D32", bg: "#E8F5E9" },
    { label: "Production totale", value: "7,8 t", color: "#1565C0", bg: "#E3F2FD" },
    { label: "CA dernière récolte", value: "9,36 M XOF", color: "#E65100", bg: "#FFF3E0" },
    { label: "Coût/ha", value: "842 000 XOF", color: "#6A1B9A", bg: "#F3E5F5" },
  ];

  const historique = [
    { campagne: "2024-2025", culture: "Cacao Grade A", surface: "6,2 ha", rendement: "1,26 t/ha", production: "7,81 t", revenu: "9,37 M XOF", bilan: "✅ +12% vs prévu", ok: true },
    { campagne: "2023-2024", culture: "Cacao Grade A", surface: "6,2 ha", rendement: "1,12 t/ha", production: "6,94 t", revenu: "7,22 M XOF", bilan: "✅ Bonne campagne", ok: true },
    { campagne: "2022-2023", culture: "Cacao Grade A", surface: "6,2 ha", rendement: "0,98 t/ha", production: "6,08 t", revenu: "4,86 M XOF", bilan: "⚠️ Mildiou en août", ok: false },
  ];

  const operations = [
    { date: "Jan 2025", label: "Taille d'entretien", detail: "Ibrahim S.", statut: "done" },
    { date: "Fév 2025", label: "Épandage NPK", detail: "85 kg/ha", statut: "done" },
    { date: "Mar 2025", label: "Traitement préventif Mancozèbe", detail: "", statut: "done" },
    { date: "Mai 2025", label: "Fertilisation K", detail: "manque détecté", statut: "done" },
    { date: "Juin 2025", label: "Surveillance floraison", detail: "", statut: "done" },
    { date: "Juil 2025", label: "Taille d'entretien", detail: "planifié 10/07", statut: "planned" },
    { date: "Oct-Nov 2025", label: "Récolte principale", detail: "", statut: "pending" },
  ];

  const analyses = [
    {
      annee: "2024",
      ph: "6,8",
      n: "0,18%",
      p: "12 ppm",
      k: "0,24 cmol/kg",
      mo: "3,2%",
      reco: "Épandage K prioritaire",
    },
    {
      annee: "2022",
      ph: "6,5",
      n: "0,16%",
      p: "10 ppm",
      k: "—",
      mo: "—",
      reco: "Chaulage léger",
    },
  ];

  const documents = [
    { nom: "Titre foncier PAR-A1", type: "PDF", icon: "pdf" },
    { nom: "Certificat RA 2025", type: "PDF", icon: "pdf" },
    { nom: "Photos drone 08/07/2025", type: "Image", icon: "img" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title={`Parcelle ${id}`} breadcrumb={["Cartographie", id]} />

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-5">

        {/* Header fiche */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{parcelle.code}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  {parcelle.statut}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={14} className="text-gray-400 shrink-0" />
                  <span>{parcelle.localite}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Leaf size={14} className="text-green-600 shrink-0" />
                  <span>{parcelle.culture}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Layers size={14} className="text-gray-400 shrink-0" />
                  <span>{parcelle.surface} · {parcelle.sol}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Compass size={14} className="text-gray-400 shrink-0" />
                  <span>{parcelle.gps} · Alt. {parcelle.altitude}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {parcelle.certifications.map((c) => (
                  <span key={c} className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                    <Award size={11} />
                    {c}
                  </span>
                ))}
                <span className="text-xs text-gray-500">{parcelle.propriete}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link
                href="/cartographie"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={14} />
                Retour
              </Link>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors" style={{ backgroundColor: "#2E7D32" }}>
                <Edit size={14} />
                Modifier
              </button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="text-xl font-bold text-gray-900">{k.value}</div>
              <div className="text-xs text-gray-500 mt-1">{k.label}</div>
              <div className="mt-2 h-1 rounded-full" style={{ backgroundColor: k.bg }}>
                <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: k.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Historique des cultures */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Historique des cultures</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#F8FBF8" }}>
                <tr>
                  {["Campagne", "Culture", "Surface", "Rendement", "Production", "Revenu", "Bilan"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {historique.map((row) => (
                  <tr key={row.campagne} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.campagne}</td>
                    <td className="px-4 py-3 text-gray-900">{row.culture}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{row.surface}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.rendement}</td>
                    <td className="px-4 py-3 text-gray-700">{row.production}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.revenu}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className={`px-2 py-0.5 rounded-full ${row.ok ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                        {row.bilan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Opérations réalisées */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Opérations réalisées cette campagne</h2>
          <div className="relative space-y-0">
            {operations.map((op, i) => {
              const isLast = i === operations.length - 1;
              const isDone = op.statut === "done";
              const isPlanned = op.statut === "planned";
              return (
                <div key={i} className="flex gap-4">
                  {/* Timeline line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${isDone ? "bg-green-100" : isPlanned ? "bg-blue-100" : "bg-gray-100"}`}>
                      {isDone ? (
                        <CheckCircle size={14} className="text-green-600" />
                      ) : isPlanned ? (
                        <Clock size={14} className="text-blue-500" />
                      ) : (
                        <Circle size={14} className="text-gray-300" />
                      )}
                    </div>
                    {!isLast && <div className="w-0.5 h-8 bg-gray-100 my-1" />}
                  </div>
                  {/* Content */}
                  <div className={`pb-6 pt-0.5 ${isLast ? "pb-0" : ""}`}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{op.date}</span>
                    </div>
                    <p className={`text-sm font-medium mt-0.5 ${isDone ? "text-gray-900" : isPlanned ? "text-blue-700" : "text-gray-400"}`}>
                      {op.label}
                    </p>
                    {op.detail && <p className="text-xs text-gray-500 mt-0.5">{op.detail}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Analyses sol */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Analyses sol</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {analyses.map((a) => (
              <div key={a.annee} className="border border-gray-100 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800">Analyse {a.annee}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { l: "pH", v: a.ph },
                    { l: "N", v: a.n },
                    { l: "P", v: a.p },
                    { l: "K", v: a.k },
                    { l: "MO", v: a.mo },
                  ].map((item) => (
                    <div key={item.l} className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="font-semibold text-gray-900">{item.v}</div>
                      <div className="text-gray-400 mt-0.5">{item.l}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  <span className="text-amber-500 text-xs mt-0.5">→</span>
                  <p className="text-xs text-amber-800">{a.reco}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents liés */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Documents liés</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {documents.map((doc) => (
              <button
                key={doc.nom}
                className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors text-left w-full"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${doc.icon === "img" ? "bg-blue-50" : "bg-red-50"}`}>
                  {doc.icon === "img" ? (
                    <Image size={16} className="text-blue-500" />
                  ) : (
                    <FileText size={16} className="text-red-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.nom}</p>
                  <p className="text-xs text-gray-400">{doc.type}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
