import Topbar from "../../../components/Topbar";

export default async function MembreCooperativePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        breadcrumb={["RH", "Coopérative", `Membre ${id}`]}
      />

      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            {/* Avatar */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#4CAF50] flex items-center justify-center text-2xl font-bold text-white">
              BK
            </div>

            {/* Infos principales */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">Bamba Koné</h1>
                <span className="text-sm bg-white/20 rounded-full px-3 py-0.5">N° COOP-0042</span>
                <span className="text-xs bg-green-400/30 border border-green-300/50 rounded-full px-3 py-0.5 font-medium">
                  ✅ Membre actif
                </span>
              </div>
              <p className="text-green-200 text-sm">Depuis 2018 · 7 ans de membership</p>
              <p className="text-green-300 text-sm mt-0.5">📍 Soubré Nord, Secteur 4</p>
            </div>
          </div>

          {/* 5 KPI */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-5 border-t border-white/20">
            {[
              { label: "Surface certifiée RA", value: "4,8 ha", sub: "2 parcelles" },
              { label: "Production 2024-2025", value: "5,48 t", sub: "cacao" },
              { label: "Revenus bruts 2024", value: "5 627 000", sub: "XOF" },
              { label: "Prime qualité RA", value: "284 000", sub: "XOF reçue" },
              { label: "Micro-crédit en cours", value: "800 000", sub: "XOF · intrants" },
            ].map((kpi) => (
              <div key={kpi.label} className="text-center">
                <p className="text-xl font-bold">{kpi.value}</p>
                <p className="text-xs text-green-200 mt-0.5">{kpi.sub}</p>
                <p className="text-xs text-green-300 mt-0.5">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations personnelles */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Informations personnelles</h2>
            <dl className="space-y-2.5 text-sm">
              {[
                { label: "N° CNPS", value: "CI-CNPS-2001-00341287" },
                { label: "Date de naissance", value: "18/06/1978 (47 ans)" },
                { label: "Téléphone", value: "+225 05 XX XX XX" },
                { label: "Situation familiale", value: "Marié, 5 enfants" },
                { label: "Niveau d'instruction", value: "Primaire (CEP 1991)" },
                { label: "Langue", value: "Dioula + Français basique" },
                { label: "Distance expl./habitation", value: "1,2 km" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-gray-500 shrink-0">{label}</dt>
                  <dd className="text-gray-800 font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Participation coopérative */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Participation à la vie coopérative</h2>
            <div className="space-y-3 text-sm">
              {[
                { event: "AGO 2025", status: "✅ Présent", detail: "Vote favorable extension micro-crédit" },
                { event: "AGO 2024", status: "✅ Présent", detail: "" },
                { event: "AGO 2023", status: "❌ Absent", detail: "Maladie" },
              ].map(({ event, status, detail }) => (
                <div key={event} className="flex items-start justify-between gap-2">
                  <span className="text-gray-500 font-medium w-20">{event}</span>
                  <span className="flex-1 text-gray-800">{status}{detail ? ` — ${detail}` : ""}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Comité</p>
              <p className="text-sm text-gray-800 font-medium mt-1">
                Membre du comité de contrôle qualité (depuis 2023)
              </p>
            </div>
          </div>
        </div>

        {/* Parcelles */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Parcelles</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Code", "Surface", "Culture", "Statut foncier", "Certif. RA", "Rendement 2024"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 px-3 py-2 first:rounded-l-lg last:rounded-r-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="px-3 py-3 font-mono text-xs text-gray-600">PAR-K1</td>
                  <td className="px-3 py-3">3,2 ha</td>
                  <td className="px-3 py-3">Cacao Forastero</td>
                  <td className="px-3 py-3 text-xs">Titre foncier TF-41028</td>
                  <td className="px-3 py-3"><span className="text-green-700 font-medium">✅ Certifiée</span></td>
                  <td className="px-3 py-3 font-medium">1,14 t/ha</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-mono text-xs text-gray-600">PAR-K2</td>
                  <td className="px-3 py-3">1,6 ha</td>
                  <td className="px-3 py-3">Anacarde CI-61</td>
                  <td className="px-3 py-3 text-xs">Fermage (propriétaire famille)</td>
                  <td className="px-3 py-3"><span className="text-orange-600 font-medium">❌ Non encore</span></td>
                  <td className="px-3 py-3 font-medium">1,22 t/ha</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Historique de production */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Historique de production</h2>

          {/* SVG Bar Chart */}
          <div className="mb-5">
            <p className="text-xs text-gray-500 mb-3">Production cacao 3 campagnes (tonnes)</p>
            <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
              {/* Axes */}
              <line x1="50" y1="10" x2="50" y2="140" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="50" y1="140" x2="390" y2="140" stroke="#e5e7eb" strokeWidth="1" />
              {/* Grid lines */}
              {[1, 2, 3, 4, 5, 6].map((v) => (
                <g key={v}>
                  <line x1="50" y1={140 - v * 20} x2="390" y2={140 - v * 20} stroke="#f3f4f6" strokeWidth="1" />
                  <text x="42" y={144 - v * 20} textAnchor="end" fontSize="9" fill="#9ca3af">{v}</text>
                </g>
              ))}
              {/* Bars */}
              {[
                { x: 90, height: 3.48 * 20, label: "2022-23", value: "3,48 t" },
                { x: 200, height: 4.62 * 20, label: "2023-24", value: "4,62 t" },
                { x: 310, height: 5.48 * 20, label: "2024-25", value: "5,48 t" },
              ].map(({ x, height, label, value }) => (
                <g key={label}>
                  <rect
                    x={x - 35}
                    y={140 - height}
                    width={70}
                    height={height}
                    rx="4"
                    fill="#2E7D32"
                    opacity={label === "2024-25" ? "1" : label === "2023-24" ? "0.8" : "0.6"}
                  />
                  <text x={x} y={140 - height - 5} textAnchor="middle" fontSize="10" fill="#1B5E20" fontWeight="600">
                    {value}
                  </text>
                  <text x={x} y="158" textAnchor="middle" fontSize="9" fill="#6b7280">{label}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Campagne", "Cacao (t)", "Anacarde (t)", "CA cacao (XOF)", "Grade AA%", "Prime RA"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 px-3 py-2 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { camp: "2022-2023", cacao: "3,48", anac: "1,96", ca: "3 758 400", grade: "42%", prime: "0 (pré-certif.)" },
                  { camp: "2023-2024", cacao: "4,62", anac: "1,92", ca: "4 990 800", grade: "58%", prime: "180 000 XOF" },
                  { camp: "2024-2025", cacao: "5,48", anac: "2,12", ca: "5 627 000", grade: "64%", prime: "284 000 XOF ✅" },
                ].map((row) => (
                  <tr key={row.camp}>
                    <td className="px-3 py-3 font-medium text-gray-700">{row.camp}</td>
                    <td className="px-3 py-3">{row.cacao} t</td>
                    <td className="px-3 py-3">{row.anac} t</td>
                    <td className="px-3 py-3">{row.ca}</td>
                    <td className="px-3 py-3">{row.grade}</td>
                    <td className="px-3 py-3 text-green-700 font-medium">{row.prime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Micro-crédits */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Micro-crédits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["N°", "Type", "Montant", "Taux", "Accordé", "Remboursement", "Statut"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 px-3 py-2 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="px-3 py-3 font-mono text-xs text-gray-600">MC-2025-018</td>
                  <td className="px-3 py-3 text-xs">Intrants (KCl + Ridomil)</td>
                  <td className="px-3 py-3 font-medium">800 000 XOF</td>
                  <td className="px-3 py-3 text-green-700 font-medium">0%</td>
                  <td className="px-3 py-3 text-xs text-gray-500">15/03/2025</td>
                  <td className="px-3 py-3 text-xs">12 × 66 667 XOF</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs rounded-full px-2 py-0.5 font-medium">
                      ✅ En cours (5/12)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-mono text-xs text-gray-600">MC-2024-007</td>
                  <td className="px-3 py-3 text-xs">Équipement (pulvérisateur)</td>
                  <td className="px-3 py-3 font-medium">350 000 XOF</td>
                  <td className="px-3 py-3 text-green-700 font-medium">0%</td>
                  <td className="px-3 py-3 text-xs text-gray-500">01/04/2024</td>
                  <td className="px-3 py-3 text-xs">Remboursé en 8 mois</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs rounded-full px-2 py-0.5 font-medium">
                      ✅ Soldé
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Formations */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Formations suivies</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Formation", "Date", "Durée", "Note", "Certificat"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-gray-500 px-3 py-2 first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: "BPA Rainforest Alliance", date: "Jan 2025", dur: "8h", note: "16/20", cert: "✅ RA BPA 2025" },
                  { name: "Taille et entretien cacao", date: "Sep 2024", dur: "4h", note: "—", cert: "Attestation" },
                  { name: "Sécurité produits phyto", date: "Jun 2024", dur: "4h", note: "—", cert: "Attestation" },
                  { name: "Gestion budget familial", date: "Mar 2023", dur: "4h", note: "—", cert: "Attestation" },
                ].map((f) => (
                  <tr key={f.name}>
                    <td className="px-3 py-3 font-medium text-gray-800">{f.name}</td>
                    <td className="px-3 py-3 text-gray-500">{f.date}</td>
                    <td className="px-3 py-3 text-gray-500">{f.dur}</td>
                    <td className="px-3 py-3">{f.note}</td>
                    <td className="px-3 py-3 text-green-700 text-xs font-medium">{f.cert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/cooperative"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Retour à la coopérative
          </a>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white px-4 py-2.5 text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            Émettre micro-crédit
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-[#2E7D32] text-[#2E7D32] px-4 py-2.5 text-xs font-medium hover:bg-green-50 transition-colors">
            Générer fiche membre PDF
          </button>
        </div>
      </div>
    </div>
  );
}
