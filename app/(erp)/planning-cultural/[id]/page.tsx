import Topbar from "../../../components/Topbar";

export default async function PlanningCulturalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tachesLiees = [
    { date: "12/07", code: "PCT-2025-032", parcelle: "PAR-B1", tache: "Débroussaillage pied des arbres", statut: "terminee" },
    { date: "14/07", code: "PCT-2025-033", parcelle: "PAR-A2", tache: "Relevé cabosses — comptage floraison", statut: "en-cours" },
    { date: "15/07", code: "PCT-2025-034", parcelle: "PAR-A1", tache: "Traitement phyto", statut: "planifie", current: true },
    { date: "16/07", code: "PCT-2025-035", parcelle: "PAR-A2", tache: "Traitement phyto (suite)", statut: "planifie" },
    { date: "18/07", code: "PCT-2025-036", parcelle: "PAR-B1", tache: "Fertilisation KCl", statut: "planifie-conditionnel" },
  ];

  const ressources = [
    { nom: "Super Cupravit OB 50 WP", besoin: "4,5 kg", disponible: "3,2 kg (STK-INT-001)", ok: false, note: "Commander" },
    { nom: "Confidor 350 SC", besoin: "1,5 L", disponible: "2,8 L", ok: true },
    { nom: "Tracteur JD5055E", besoin: "4h", disponible: "Disponible 15/07", ok: true },
    { nom: "Pulvérisateur attelé", besoin: "1", disponible: "1 disponible", ok: true },
    { nom: "Pulvérisateur dorsal", besoin: "2", disponible: "2 disponibles", ok: true },
    { nom: "EPI complets", besoin: "2 jeux", disponible: "2 jeux (ENT-001)", ok: true },
    { nom: "Main-d'œuvre", besoin: "Ibrahim + 1 saisonnier", disponible: "Disponibles", ok: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Production", "Planning Cultural", `Tâche ${id}`]} />

      <main className="flex-1 p-6 space-y-6">
        {/* BANDEAU EN-TÊTE */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#1B5E20" }}>
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white/70 text-xs font-mono">PCT-2025-034</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-400 text-yellow-900">🟡 Planifié</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white">🔴 Priorité Haute</span>
                </div>
                <h1 className="text-white text-xl font-bold">Traitement fongicide préventif (cuivre)</h1>
                <p className="text-white/70 text-sm mt-0.5">Pic mirides juillet — intervention urgente recommandée</p>
              </div>
              <div className="text-right text-white/80 text-sm space-y-1">
                <p><span className="font-semibold text-white">Opérateur :</span> Ibrahim Sawadogo</p>
                <p><span className="font-semibold text-white">Validé par :</span> Koffi Amani</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/60 text-xs mb-0.5">Parcelle</p>
                <p className="text-white font-semibold text-sm">PAR-A1 (2,3 ha)</p>
                <p className="text-white/60 text-xs">Cacao mature — 18 ans</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/60 text-xs mb-0.5">Planifié</p>
                <p className="text-white font-semibold text-sm">15/07/2025</p>
                <p className="text-white/60 text-xs">Dans 4 jours</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/60 text-xs mb-0.5">Durée estimée</p>
                <p className="text-white font-semibold text-sm">4 heures</p>
                <p className="text-white/60 text-xs">07h00 – 11h00</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/60 text-xs mb-0.5">DAR</p>
                <p className="text-white font-semibold text-sm">≥ 29/07/2025</p>
                <p className="text-white/60 text-xs">J+14 minimum</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Surface à traiter", value: "2,3 ha", sub: "Parcelle PAR-A1" },
            { label: "Produit principal", value: "Super Cupravit OB 50 WP", sub: "4,5 kg requis" },
            { label: "Coût estimé", value: "37 800 XOF", sub: "Intrants + main-d'œuvre" },
            { label: "DAR récolte", value: "≥ 29/07", sub: "J+14 après traitement" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-base font-bold text-[#1B5E20] leading-tight">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* DÉTAIL DE L'INTERVENTION */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Détail de l'intervention</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 w-1/3">Paramètre</th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Valeur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Type d'intervention", "Traitement fongicide préventif (Phytophthora) + insecticide mirides"],
                  ["Produits", "Super Cupravit OB 50 WP (fongicide) + Confidor 350 SC (insecticide)"],
                  ["Doses", "Cupravit : 150 g/25L/ha → 4,5 kg total | Confidor : 50 ml/25L/ha → 1,5 L total"],
                  ["Volume bouillon", "250 L (2 passages pulvérisateur dorsal 15L + tracteur)"],
                  ["Matériel", "Pulvérisateur attelé tracteur JD5055E + 2 pulvérisateurs dorsaux"],
                  ["EPI obligatoires", "Combinaison, gants nitrile, masque FFP2, lunettes"],
                  ["Météo requise", "Absence pluie 4h avant + 6h après (prévision météo confirmée)"],
                  ["Heure optimale", "07h00 – 11h00 (avant forte chaleur — efficacité optimale)"],
                ].map(([param, val]) => (
                  <tr key={param} className="hover:bg-gray-50/50">
                    <td className="px-3 py-2.5 text-xs font-medium text-gray-600">{param}</td>
                    <td className="px-3 py-2.5 text-xs text-gray-700">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* JUSTIFICATION AGRONOMIQUE */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Justification agronomique</h2>

          <div className="rounded-xl p-4 mb-5" style={{ background: "#E8F5E9", borderLeft: "4px solid #2E7D32" }}>
            <p className="text-xs text-[#1B5E20] leading-relaxed">
              Traitement recommandé par <span className="font-semibold">ARIA (assistant IA AGRIFRIK)</span> et confirmé par Ibrahim Sawadogo.
              Historique d'infestation mirides sur PAR-A1 en juillet 2024 (taux 8% — seuil d'intervention 5%).
              La saison des pluies actuelle (juillet) crée des conditions favorables à la pourriture brune (Phytophthora) et aux mirides.
              Traitement préventif systématique recommandé par CNRA CI tous les 21 jours en saison humide.
            </p>
          </div>

          <p className="text-xs font-semibold text-gray-700 mb-3">Niveau de risque actuel PAR-A1</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Ravageur / Maladie", "Risque", "Seuil d'intervention", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-2.5 text-xs font-medium text-gray-700">Mirides (Sahlbergella)</td>
                  <td className="px-3 py-2.5 text-xs text-yellow-700 font-medium">🟡 Moyen (6% d'infestation)</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600">5%</td>
                  <td className="px-3 py-2.5 text-xs text-orange-600 font-semibold">⚠️ Dépasse seuil — Traiter</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-2.5 text-xs font-medium text-gray-700">Pourriture brune (Phytophthora)</td>
                  <td className="px-3 py-2.5 text-xs text-yellow-700 font-medium">🟡 Moyen (humidité 82%)</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600">Préventif saison pluies</td>
                  <td className="px-3 py-2.5 text-xs text-blue-600 font-medium">Prévention</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-2.5 text-xs font-medium text-gray-700">Moniliose</td>
                  <td className="px-3 py-2.5 text-xs text-green-700 font-medium">🟢 Faible</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600">Pas de foyer détecté</td>
                  <td className="px-3 py-2.5 text-xs text-green-600 font-medium">✅ OK</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CALENDRIER SVG */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Calendrier des traitements PAR-A1 (2025)</h2>
          <svg viewBox="0 0 720 200" className="w-full" xmlns="http://www.w3.org/2000/svg">
            {/* Axe mois */}
            {["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"].map((m, i) => (
              <g key={m}>
                <line x1={40 + i * 55} y1={130} x2={40 + i * 55} y2={140} stroke="#E0E0E0" strokeWidth="1" />
                <text x={40 + i * 55} y={155} textAnchor="middle" fontSize="10" fill="#9E9E9E">{m}</text>
              </g>
            ))}
            {/* Ligne axe */}
            <line x1={40} y1={130} x2={700} y2={130} stroke="#E0E0E0" strokeWidth="1.5" />

            {/* Traitements passés */}
            {[
              { label: "22/04", x: 40 + 3 * 55 + 20, produit: "Cupravit" },
              { label: "18/05", x: 40 + 4 * 55 + 18, produit: "Ridomil" },
              { label: "02/06", x: 40 + 5 * 55 + 2, produit: "Cupravit" },
              { label: "02/07", x: 40 + 6 * 55 + 2, produit: "Cupravit+Conf" },
            ].map(({ label, x, produit }) => (
              <g key={label}>
                <circle cx={x} cy={130} r={8} fill="#1B5E20" />
                <text x={x} y={134} textAnchor="middle" fontSize="8" fill="white">✓</text>
                <text x={x} y={118} textAnchor="middle" fontSize="8" fill="#1B5E20" fontWeight="600">{label}</text>
                <text x={x} y={107} textAnchor="middle" fontSize="7" fill="#555">{produit}</text>
              </g>
            ))}

            {/* Planifié actuel — triangle orange */}
            <g>
              <polygon points={`${40 + 6 * 55 + 15},114 ${40 + 6 * 55 + 26},130 ${40 + 6 * 55 + 4},130`} fill="#E65100" />
              <text x={40 + 6 * 55 + 15} y={104} textAnchor="middle" fontSize="8" fill="#E65100" fontWeight="700">15/07</text>
              <text x={40 + 6 * 55 + 15} y={94} textAnchor="middle" fontSize="7" fill="#E65100">PCT-034</text>
            </g>

            {/* Prévus — pastilles grises pointillées */}
            {[
              { label: "05/08", x: 40 + 7 * 55 + 5 },
              { label: "26/08", x: 40 + 7 * 55 + 26 },
              { label: "16/09", x: 40 + 8 * 55 + 16 },
            ].map(({ label, x }) => (
              <g key={label}>
                <circle cx={x} cy={130} r={8} fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeDasharray="3,2" />
                <text x={x} y={118} textAnchor="middle" fontSize="8" fill="#9E9E9E">{label}</text>
              </g>
            ))}

            {/* Légende */}
            <g transform="translate(40, 170)">
              <circle cx={0} cy={0} r={5} fill="#1B5E20" />
              <text x={8} y={4} fontSize="9" fill="#555">Traitement réalisé</text>
              <polygon points="50,5 56,-5 44,-5" fill="#E65100" transform="translate(130,0)" />
              <text x={148} y={4} fontSize="9" fill="#555">Planifié (PCT-034)</text>
              <circle cx={280} cy={0} r={5} fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeDasharray="3,2" />
              <text x={288} y={4} fontSize="9" fill="#555">Prévu (à venir)</text>
            </g>

            {/* Intervalle 21j */}
            <text x={360} y={175} textAnchor="middle" fontSize="8" fill="#9E9E9E" fontStyle="italic">↔ Intervalle 21 jours entre traitements</text>
          </svg>
        </div>

        {/* RESSOURCES REQUISES */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Ressources requises</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Ressource", "Besoin", "Disponible", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ressources.map((r) => (
                  <tr key={r.nom} className={`hover:bg-gray-50/50 ${!r.ok ? "bg-red-50/40" : ""}`}>
                    <td className="px-3 py-2.5 text-xs font-medium text-gray-700">{r.nom}</td>
                    <td className="px-3 py-2.5 text-xs text-gray-600">{r.besoin}</td>
                    <td className="px-3 py-2.5 text-xs text-gray-600">{r.disponible}</td>
                    <td className="px-3 py-2.5 text-xs">
                      {r.ok ? (
                        <span className="text-green-600 font-medium">✅ Suffisant</span>
                      ) : (
                        <span className="text-red-600 font-medium">❌ Insuffisant (-1,3 kg) — {r.note}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl p-4" style={{ background: "#FFF3E0", borderLeft: "4px solid #E65100" }}>
            <p className="text-xs text-orange-800 font-medium">
              ⚠️ Stock Super Cupravit insuffisant. Commander 5 kg auprès de SCPA Afrique avant le 12/07 (délai livraison 2-3 jours).
            </p>
          </div>
        </div>

        {/* TÂCHES LIÉES */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Tâches liées (même semaine)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date", "Code", "Parcelle", "Tâche", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {tachesLiees.map((t) => (
                  <tr
                    key={t.code}
                    className={`hover:bg-gray-50/50 ${t.current ? "bg-[#E8F5E9]" : ""}`}
                  >
                    <td className="px-3 py-2.5 text-xs text-gray-600">{t.date}</td>
                    <td className={`px-3 py-2.5 text-xs font-mono ${t.current ? "font-bold text-[#1B5E20]" : "text-gray-500"}`}>{t.code}</td>
                    <td className={`px-3 py-2.5 text-xs ${t.current ? "font-bold text-[#1B5E20]" : "text-gray-600"}`}>{t.parcelle}</td>
                    <td className={`px-3 py-2.5 text-xs ${t.current ? "font-bold text-[#1B5E20]" : "text-gray-700"}`}>{t.tache}</td>
                    <td className="px-3 py-2.5 text-xs">
                      {t.statut === "terminee" && <span className="text-green-600 font-medium">✅ Terminée</span>}
                      {t.statut === "en-cours" && <span className="text-blue-600 font-medium">🔵 En cours</span>}
                      {t.statut === "planifie" && <span className="text-yellow-600 font-medium">🟡 Planifié</span>}
                      {t.statut === "planifie-conditionnel" && <span className="text-yellow-600 font-medium">🟡 Planifié (sous réserve stock KCl)</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOUTONS */}
        <div className="flex flex-wrap gap-3 pb-2">
          <a
            href="/planning-cultural"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium hover:bg-gray-50 transition-colors"
          >
            ← Retour au planning
          </a>
          <button className="px-4 py-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            ✅ Marquer comme terminée
          </button>
          <button className="px-4 py-2 bg-white border border-orange-300 text-orange-700 rounded-xl text-xs font-medium hover:bg-orange-50 transition-colors">
            📅 Reporter la tâche
          </button>
        </div>
      </main>
    </div>
  );
}
