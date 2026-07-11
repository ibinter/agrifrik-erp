import Topbar from "../../../components/Topbar";
import {
  FileText,
  CheckCircle,
  Lock,
  Download,
  Share2,
  Copy,
  ChevronRight,
  ArrowLeft,
  Eye,
  Link,
  Clock,
  User,
  Tag,
  Folder,
  Shield,
} from "lucide-react";

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const breadcrumb = ["Collaboration", "Documents", `Document ${id}`];

  const accessList = [
    { user: "Koffi Amani", role: "DG", access: "Propriétaire", date: "01/03/2025", ext: false },
    { user: "Adjoua Messou", role: "Chef projet", access: "Modifier", date: "01/03/2025", ext: false },
    { user: "Ibrahim Sawadogo", role: "Resp. Terrain", access: "Lire", date: "01/03/2025", ext: false },
    { user: "Ibrahim Koné", role: "Admin", access: "Lire", date: "15/03/2025", ext: false },
    {
      user: "Barry Callebaut CI",
      role: "Externe (acheteur)",
      access: "Lire (lien temporaire 30j)",
      date: "05/04/2025",
      ext: true,
    },
  ];

  const relatedDocs = [
    { name: "Rapport d'audit BV Mars 2025", type: "PDF", code: "DOC-2025-028" },
    { name: "Plan d'action corrective PAC-2025", type: "DOCX", code: "DOC-2025-029" },
    { name: "Certificat RA 2024 (expiré)", type: "PDF", code: "DOC-2024-019" },
    { name: "Référentiel RA 2020 v2.0", type: "PDF", code: "DOC-2024-001" },
  ];

  const timeline = [
    { date: "01/03/2025 09h14", actor: "Adjoua Messou", action: "Document déposé", icon: "upload" },
    { date: "01/03/2025 10h30", actor: "Koffi Amani", action: "Consulté + téléchargé (validation DG)", icon: "download" },
    { date: "05/03/2025", actor: "Ibrahim Sawadogo", action: "Consulté", icon: "eye" },
    { date: "05/04/2025", actor: "Adjoua Messou", action: "Lien de partage généré (Barry Callebaut)", icon: "link" },
    { date: "08/04/2025", actor: "Barry Callebaut CI", action: "Consulté via lien externe", icon: "eye" },
    { date: "…", actor: "", action: "14 autres consultations…", icon: "clock" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={breadcrumb} />

      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex items-start gap-5">
            <div className="bg-white/10 rounded-xl p-4">
              <FileText size={40} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold truncate">Certificat_RA-CI-2025-00847.pdf</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-green-100">
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded">DOC-2025-031</span>
                <span>Type : PDF</span>
                <span>Taille : 2,4 MB</span>
                <span>Catégorie : Certifications &amp; Audits</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 bg-green-400/20 border border-green-300/30 text-green-100 text-xs font-medium px-3 py-1 rounded-full">
                  <CheckCircle size={12} /> Validé
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                  <Lock size={12} /> Confidentiel (interne)
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-green-100">
                <span><User size={13} className="inline mr-1" />Propriétaire : <strong className="text-white">Adjoua Messou</strong></span>
                <span><Clock size={13} className="inline mr-1" />Déposé le : 01/03/2025 à 09h14</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Version actuelle", value: "v1.0", sub: "Document officiel" },
            { label: "Consultations", value: "24", sub: "vues depuis dépôt" },
            { label: "Téléchargements", value: "8", sub: "téléchargements" },
            { label: "Partagé avec", value: "5", sub: "utilisateurs" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <p className="text-2xl font-bold text-[#1B5E20] mt-1">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Aperçu du document */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Aperçu du document</h2>
          <div className="rounded-xl bg-gray-50 border border-gray-200 overflow-hidden">
            {/* Simulateur PDF */}
            <div className="bg-white mx-auto max-w-2xl shadow-md my-4 rounded border border-gray-200 p-8 font-serif">
              {/* En-tête RA */}
              <div className="text-center border-b-2 border-[#2E7D32] pb-4 mb-6">
                <p className="text-lg font-bold text-[#1B5E20] tracking-widest uppercase">Rainforest Alliance</p>
                <p className="text-xs text-gray-500 mt-0.5">Sustainable Agriculture Certification</p>
              </div>
              <div className="text-center space-y-1 mb-6">
                <p className="text-base font-bold uppercase tracking-wide text-gray-800">Certificat de Conformité</p>
                <p className="text-xs text-gray-500">Rainforest Alliance Sustainable Agriculture Standard 2020</p>
                <p className="text-sm font-semibold text-[#2E7D32] mt-2">Certificat N° : RA-CI-2025-00847</p>
              </div>
              <div className="text-center text-sm text-gray-700 mb-6 leading-relaxed">
                <p className="mb-2">Ceci certifie que :</p>
                <p className="font-bold text-gray-900">AGRIFRIK SAS</p>
                <p>Exploitation Soubré Nord, Région de la Nawa</p>
                <p>Côte d&apos;Ivoire</p>
                <p className="mt-3 text-gray-600">Est certifié conforme au standard Rainforest Alliance</p>
                <p className="text-gray-600">Sustainable Agriculture Standard 2020</p>
              </div>
              <div className="bg-gray-50 rounded p-3 text-xs text-gray-700 mb-4 space-y-1">
                <p><strong>Parcelles certifiées :</strong> PAR-A1 (6,2 ha) | PAR-A2 (4,8 ha) | PAR-A3 (4,8 ha)</p>
                <p><strong>Surface totale :</strong> 15,8 ha | <strong>Culture :</strong> Cacao (Theobroma cacao L.)</p>
                <p className="text-[#2E7D32] font-medium">Valable du : 01/03/2025 au : 28/02/2026</p>
              </div>
              <div className="flex justify-between text-xs text-gray-600 border-t border-gray-200 pt-4 mt-4">
                <div>
                  <p className="font-semibold">[Signature Bureau Veritas]</p>
                  <p>Jean-Pierre Assoumou</p>
                  <p>Auditeur Principal — Bureau Veritas CI</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">[Sceau Rainforest Alliance]</p>
                  <p>Certification N° RA-CI-00847</p>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 py-3">
              Aperçu simulé — cliquez &quot;Télécharger&quot; pour le document officiel
            </p>
          </div>
        </div>

        {/* Informations GED */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Informations GED</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Métadonnées */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Métadonnées</h3>
              <dl className="space-y-2 text-sm">
                {[
                  ["Format", "PDF/A (archivage long terme)"],
                  ["Taille", "2,4 MB"],
                  ["Créé le", "01/03/2025 09h14"],
                  ["Modifié le", "01/03/2025 09h14 (pas de modification — document officiel)"],
                  ["Chiffrement", "AES-256 ✅"],
                  ["Hash MD5", "a7f4c29e1b..."],
                  ["Stockage", "Serveur AGRIFRIK CI / Backup Supabase Storage EU"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <dt className="text-gray-400 w-28 shrink-0">{k}</dt>
                    <dd className="text-gray-700 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {/* Classification */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Classification</h3>
              <dl className="space-y-2 text-sm">
                {[
                  ["Catégorie GED", "📁 Certifications > RA > 2025"],
                  ["Langue", "Français"],
                  ["Pays émetteur", "Côte d'Ivoire"],
                  ["Confidentialité", "Interne (partageable avec acheteurs sur accord DG)"],
                  ["Conservation", "10 ans (traçabilité RA)"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <dt className="text-gray-400 w-28 shrink-0">{k}</dt>
                    <dd className="text-gray-700 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["rainforest-alliance", "certification", "cacao", "2025", "bureau-veritas"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-green-50 text-[#2E7D32] text-xs px-2 py-0.5 rounded-full border border-green-100">
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Accès et partage */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Accès et partage</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Utilisateur", "Rôle", "Accès", "Date d'ajout"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-2 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {accessList.map((row) => (
                  <tr key={row.user} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-gray-800 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] text-xs font-bold">
                        {row.user.charAt(0)}
                      </div>
                      {row.user}
                    </td>
                    <td className="px-4 py-2.5 text-gray-500">{row.role}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        row.access === "Propriétaire"
                          ? "bg-purple-50 text-purple-700"
                          : row.access === "Modifier"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {row.access}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Partage externe */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Partage externe</h3>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 text-sm mb-3">
              <Link size={14} className="text-gray-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-gray-500 text-xs">Lien partagé BC</p>
                <p className="font-mono text-gray-700 text-xs truncate">https://docs.agrifrik.com/share/RA2025_BC_...</p>
              </div>
              <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium shrink-0">Expiré 05/05/2025</span>
            </div>
            <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2">
              <Link size={13} /> Générer nouveau lien de partage (30 jours)
            </button>
          </div>
        </div>

        {/* Historique d'activité */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Historique d'activité</h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {/* Ligne verticale */}
                {i < timeline.length - 1 && (
                  <div className="absolute left-[17px] top-8 w-px h-full bg-gray-100" />
                )}
                <div className="w-9 h-9 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0 z-10">
                  {item.icon === "upload" && <Eye size={15} className="text-[#2E7D32]" />}
                  {item.icon === "download" && <Download size={15} className="text-[#2E7D32]" />}
                  {item.icon === "eye" && <Eye size={15} className="text-[#2E7D32]" />}
                  {item.icon === "link" && <Link size={15} className="text-[#2E7D32]" />}
                  {item.icon === "clock" && <Clock size={15} className="text-gray-400" />}
                </div>
                <div className="pb-5 flex-1">
                  <p className="text-xs text-gray-400">{item.date}</p>
                  {item.actor && <p className="text-sm font-medium text-gray-800">{item.actor}</p>}
                  <p className="text-sm text-gray-500">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents liés */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Documents liés</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Document", "Type", "Code", ""].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-2 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {relatedDocs.map((doc) => (
                  <tr key={doc.code} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-gray-800 flex items-center gap-2">
                      <FileText size={14} className="text-[#2E7D32] shrink-0" />
                      {doc.name}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">{doc.type}</span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-gray-500">{doc.code}</td>
                    <td className="px-4 py-2.5">
                      <button className="text-[#2E7D32] text-xs font-medium hover:underline flex items-center gap-1">
                        Voir <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions bas de page */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a href="/documents" className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-medium px-4 py-2 hover:bg-gray-50">
            <ArrowLeft size={13} /> Retour aux documents
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2">
            <Download size={13} /> Télécharger
          </button>
          <button className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-medium px-4 py-2">
            <Share2 size={13} /> Partager
          </button>
          <button className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-medium px-4 py-2">
            <Copy size={13} /> Copier le lien
          </button>
        </div>

      </div>
    </div>
  );
}
