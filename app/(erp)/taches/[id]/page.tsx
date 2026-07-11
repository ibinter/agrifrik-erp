import Topbar from "../../../components/Topbar";

export default async function TacheDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sousTaches = [
    { num: 1, titre: "Vérification SGA (Système de gestion) — structure + procédures", resp: "Adjoua M.", statut: "done", statutLabel: "Terminé (02/07)", duree: "4h", bloqueur: "—" },
    { num: 2, titre: "Contrôle registres de traçabilité (variétés, traitements)", resp: "Konan Y.", statut: "done", statutLabel: "Terminé (05/07)", duree: "3h", bloqueur: "—" },
    { num: 3, titre: "Audit sécurité chimique — stockage produits phyto", resp: "Ibrahim S.", statut: "done", statutLabel: "Terminé (08/07)", duree: "2h", bloqueur: "—" },
    { num: 4, titre: "Analyse sol — résultats attendus CNRA", resp: "Adjoua M.", statut: "blocked", statutLabel: "Bloqué — rapport CNRA non reçu (commandé 01/06)", duree: "2h", bloqueur: "Rapport CNRA" },
    { num: 5, titre: "Vérification condition de travail ouvriers agricoles", resp: "Adjoua M.", statut: "inprogress", statutLabel: "En cours (30%)", duree: "4h", bloqueur: "—" },
    { num: 6, titre: "Audit biodiversité — arbres d'ombrage, zones tampons", resp: "Ibrahim S.", statut: "planned", statutLabel: "Planifié (15/07)", duree: "3h", bloqueur: "—" },
    { num: 7, titre: "Vérification formation BPA ouvriers", resp: "Konan Y.", statut: "planned", statutLabel: "Planifié (20/07)", duree: "2h", bloqueur: "—" },
    { num: 8, titre: "Contrôle gestion déchets (emballages phyto, eaux usées)", resp: "Ibrahim S.", statut: "planned", statutLabel: "Planifié (22/07)", duree: "2h", bloqueur: "—" },
    { num: 9, titre: "Préparation rapport d'audit interne", resp: "Adjoua M.", statut: "planned", statutLabel: "Planifié (28/07)", duree: "8h", bloqueur: "Sous-tâches 4-8" },
    { num: 10, titre: "Plan d'action corrective (PAC) sur écarts trouvés", resp: "Adjoua M.", statut: "planned", statutLabel: "Planifié (01/08)", duree: "4h", bloqueur: "ST #9" },
    { num: 11, titre: "Revue DG — validation avant soumission RA", resp: "Koffi Amani", statut: "planned", statutLabel: "Planifié (10/08)", duree: "2h", bloqueur: "ST #10" },
  ];

  const journal = [
    { date: "11/07/2025", auteur: "Ibrahim S.", message: 'Audit sécurité chimique terminé. 1 écart mineur : étiquetage incomplet sur 2 fûts de Ridomil Gold. Corrigé immédiatement.' },
    { date: "08/07/2025", auteur: "Adjoua M.", message: "SGA validé en structure. Procédure N°7 (gestion nuisibles) à mettre à jour — version actuelle de 2022." },
    { date: "05/07/2025", auteur: "Konan Y.", message: "Registres traçabilité OK pour 2023-2025. Lacune : Fiches de pesée 2022 non retrouvées. Reconstitution possible via carnet bacs." },
    { date: "15/06/2025", auteur: "Koffi Amani", message: "Tâche créée. Objectif : zéro écart majeur avant la venue de l'auditeur RA en novembre." },
  ];

  const fichiers = [
    { nom: "Check-list RA 2020 (v2.0).pdf", uploadeur: "Adjoua M.", date: "15/06", taille: "2,4 MB" },
    { nom: "Résultats SGA-Audit-S1.docx", uploadeur: "Adjoua M.", date: "02/07", taille: "184 KB" },
    { nom: "Photos-stockage-phyto-08jul.zip", uploadeur: "Ibrahim S.", date: "08/07", taille: "12,8 MB" },
    { nom: "Registre-tracabilite-2023-2025.xlsx", uploadeur: "Konan Y.", date: "05/07", taille: "428 KB" },
  ];

  const statusStyle = (s: string) => {
    switch (s) {
      case "done": return "bg-green-100 text-green-700";
      case "blocked": return "bg-red-100 text-red-700";
      case "inprogress": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const statusIcon = (s: string) => {
    switch (s) {
      case "done": return "✅";
      case "blocked": return "⛔";
      case "inprogress": return "🔵";
      default: return "📅";
    }
  };

  const initials = (name: string) => {
    const parts = name.split(" ");
    return parts.map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  };

  const avatarColor = (name: string) => {
    const colors = ["bg-[#1B5E20]", "bg-[#E65100]", "bg-blue-700", "bg-purple-700"];
    const i = name.charCodeAt(0) % colors.length;
    return colors[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />

      {/* Breadcrumb */}
      <div className="px-6 pt-4 pb-2">
        <nav className="text-xs text-gray-500 flex items-center gap-1">
          <span>Collaboration</span>
          <span>/</span>
          <span>Tâches</span>
          <span>/</span>
          <span className="text-[#2E7D32] font-medium">Tâche {id}</span>
        </nav>
      </div>

      {/* Header — rouge priorité haute */}
      <div className="mx-6 mt-2 rounded-2xl overflow-hidden">
        <div className="bg-red-700 text-white px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold leading-snug">
                Audit interne pré-certification Rainforest Alliance — Anacarde
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-red-200">
                <span>N° : <strong className="text-white">TCH-2025-087</strong></span>
                <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  🔴 Priorité HAUTE
                </span>
                <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  🔵 En cours
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-red-200">
                <span>Assignée à : <strong className="text-white">Adjoua Messou (Chef de projet)</strong> + <strong className="text-white">Ibrahim Sawadogo (Terrain)</strong></span>
              </div>
              <div className="mt-1 flex flex-wrap gap-4 text-xs text-red-200">
                <span>Créée par : <strong className="text-white">Koffi Amani (DG)</strong></span>
                <span>Le : <strong className="text-white">15/06/2025</strong></span>
              </div>
              <div className="mt-1 text-xs text-red-200">
                Projet lié : <strong className="text-white">PRJ-2025-001 — Extension Certification RA Anacarde</strong>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="text-xs text-red-200">Deadline</p>
                <p className="text-lg font-bold">15/08/2025</p>
                <p className="text-xs text-red-300">⚠️ 35 jours restants</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="mx-6 mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Avancement", value: "28%", sub: "3/11 sous-tâches" },
          { label: "Jours restants", value: "35 jours", sub: "Deadline 15/08/2025" },
          { label: "Temps estimé / passé", value: "40h / 11h", sub: "27,5% du temps utilisé" },
          { label: "Sous-tâches bloquées", value: "1", sub: "Rapport sol CNRA non reçu" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500">{kpi.label}</p>
            <p className="mt-1 text-base font-bold text-[#1B5E20]">{kpi.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mx-6 mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Description</h2>
        <p className="text-xs text-gray-700 leading-relaxed mb-3">
          Avant de soumettre la demande officielle de certification Rainforest Alliance pour les parcelles anacarde PAR-C1 et PAR-C2 (10,4 ha), un audit interne doit être réalisé selon la check-list RA 2020. L'objectif est d'identifier les écarts résiduels et de les corriger avant la venue de l'auditeur externe (prévu novembre 2025).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">Périmètre</p>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Parcelles : <strong>PAR-C1 (6,2 ha)</strong> et <strong>PAR-C2 (4,2 ha)</strong></li>
              <li>• Référentiel : <strong>Rainforest Alliance Sustainable Agriculture Standard 2020 (v2.0)</strong></li>
            </ul>
          </div>
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">Sections auditées</p>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• S1 : Gestion</li>
              <li>• S2 : Pratiques agricoles</li>
              <li>• S3 : Social</li>
              <li>• S4 : Environnement</li>
              <li>• S5 : Sécurité chimique</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sous-tâches */}
      <div className="mx-6 mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Sous-tâches</h2>
          <span className="text-xs text-gray-500">3 / 11 terminées</span>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Avancement global</span>
            <span className="font-bold text-[#2E7D32]">28%</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#2E7D32] rounded-full" style={{ width: "28%" }} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                <th className="text-center px-2 py-2 text-gray-600 font-semibold w-8">#</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Sous-tâche</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Responsable</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Statut</th>
                <th className="text-center px-3 py-2 text-gray-600 font-semibold">Durée est.</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Bloqueur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sousTaches.map((st) => (
                <tr key={st.num} className={`hover:bg-gray-50 ${st.statut === "blocked" ? "bg-red-50" : ""}`}>
                  <td className="px-2 py-2.5 text-center text-gray-500 font-mono">{st.num}</td>
                  <td className="px-3 py-2.5 text-gray-800">{st.titre}</td>
                  <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{st.resp}</td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle(st.statut)}`}>
                      {statusIcon(st.statut)} {st.statutLabel}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center text-gray-600">{st.duree}</td>
                  <td className="px-3 py-2.5 text-gray-500">{st.bloqueur !== "—" ? <span className="text-red-600 font-medium">{st.bloqueur}</span> : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commentaires */}
      <div className="mx-6 mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Commentaires et journal</h2>

        <div className="space-y-4 mb-5">
          {journal.map((entry, i) => (
            <div key={i} className="flex gap-3">
              <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold ${avatarColor(entry.auteur)}`}>
                {initials(entry.auteur)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-800">{entry.auteur}</span>
                  <span className="text-xs text-gray-400">{entry.date}</span>
                </div>
                <p className="text-xs text-gray-700 bg-gray-50 rounded-xl px-3 py-2 leading-relaxed">
                  {entry.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Zone commentaire factice */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Ajouter un commentaire..."
            className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2E7D32]"
            readOnly
          />
          <button className="px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20]">
            Ajouter
          </button>
        </div>
      </div>

      {/* Fichiers joints */}
      <div className="mx-6 mt-6 rounded-2xl border border-gray-100 bg-white p-5">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Fichiers joints</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Fichier</th>
                <th className="text-left px-3 py-2 text-gray-600 font-semibold">Uploadé par</th>
                <th className="text-center px-3 py-2 text-gray-600 font-semibold">Date</th>
                <th className="text-right px-3 py-2 text-gray-600 font-semibold">Taille</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fichiers.map((f, i) => {
                const ext = f.nom.split(".").pop()?.toLowerCase();
                const extColor: Record<string, string> = {
                  pdf: "bg-red-100 text-red-700",
                  docx: "bg-blue-100 text-blue-700",
                  xlsx: "bg-green-100 text-green-700",
                  zip: "bg-yellow-100 text-yellow-700",
                };
                return (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5 text-gray-800 flex items-center gap-2">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-bold uppercase ${extColor[ext ?? ""] ?? "bg-gray-100 text-gray-600"}`}>
                        {ext}
                      </span>
                      {f.nom}
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{f.uploadeur}</td>
                    <td className="px-3 py-2.5 text-center text-gray-600">{f.date}</td>
                    <td className="px-3 py-2.5 text-right text-gray-500">{f.taille}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="mx-6 mt-6 mb-8 flex flex-wrap gap-3">
        <a
          href="/taches"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          ← Retour aux tâches
        </a>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20]">
          Modifier la tâche
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2E7D32] text-[#2E7D32] bg-white text-xs font-medium hover:bg-green-50">
          Marquer sous-tâche complète
        </button>
      </div>
    </div>
  );
}
