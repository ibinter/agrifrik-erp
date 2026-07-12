import Topbar from "../../../components/Topbar";

export default async function MembreCooperativePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#F8FBF8]">
      <Topbar breadcrumb={["RH", "Coopérative", `Membre ${id}`]} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1B5E20" }}>
          <div className="p-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs bg-white/20 text-white px-2 py-0.5 rounded">
                  MBR-047
                </span>
                <span className="bg-green-400/30 text-green-100 text-xs font-medium px-3 py-0.5 rounded-full border border-green-300/40">
                  ✅ Membre actif
                </span>
                <span className="bg-blue-400/30 text-blue-100 text-xs font-medium px-3 py-0.5 rounded-full border border-blue-300/40">
                  ✅ Certifié RA 2020
                </span>
              </div>
              <h1 className="text-xl font-bold text-white">Yao Kouamé — Producteur cacao</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-green-200">
                <div>
                  <span className="text-white font-semibold">Coopérative :</span>{" "}
                  COOPAGRI-NAWA (Coop. Agriculteurs Région Nawa)
                </div>
                <div>
                  <span className="text-white font-semibold">Village :</span>{" "}
                  Méagui sous-préfecture
                </div>
                <div>
                  <span className="text-white font-semibold">Exploitation :</span>{" "}
                  4,2 ha cacao
                </div>
                <div>
                  <span className="text-white font-semibold">Membre depuis :</span>{" "}
                  12/03/2018 (7 ans)
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 bg-green-900/50 rounded-xl px-5 py-4 text-center">
              <div className="text-lg font-bold text-white">3,8 t</div>
              <div className="text-xs text-green-200 mt-1">Quota livraison 2025</div>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Productions certifiées 2024", value: "3,2 t", sub: "Grade AA ✅", green: true },
            { label: "Ristournes 2024 versées", value: "160 000 XOF", sub: "Versement effectué" },
            { label: "Encours micro-crédit", value: "85 000 XOF", sub: "sur 200 000 XOF" },
            { label: "Formations ANADER suivies", value: "3", sub: "✅ À jour", green: true },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
              <div className={`text-xl font-bold ${kpi.green ? "text-[#2E7D32]" : "text-gray-800"}`}>
                {kpi.value}
              </div>
              <div className="text-xs text-gray-400 mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Profil exploitation */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Profil exploitation</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-sm">
            {[
              { label: "Superficie totale", value: "4,2 ha (3,8 ha cacao + 0,4 ha cultures vivrières)" },
              { label: "Variété dominante", value: "Hybride F1 PH16 résistante + quelques plants locaux Forastero" },
              { label: "Age moyen verger", value: "12 ans (plantation 2013)" },
              { label: "Arbres d'ombre", value: "Gliricidia sepium (28%) + quelques caféiers" },
              { label: "Certification RA", value: "N° RA-CI-2025-MBR047 — Score 86/100" },
              { label: "Sous-traitance", value: "2 saisonniers pendant la grande récolte (famille)" },
              { label: "GPS parcelle", value: "5°25'12\"N 6°58'44\"W" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="text-xs text-gray-400">{label}</dt>
                <dd className="text-gray-700 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Livraisons 2025 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Livraisons à la coopérative 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date", "Lot", "Qté brute", "Qté nette", "Grade", "PU", "Montant"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs font-medium text-gray-500 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">15/02/2025</td>
                  <td className="px-3 py-3 font-mono text-xs text-gray-500">LOT-MBR047-H1-01</td>
                  <td className="px-3 py-3">824 kg</td>
                  <td className="px-3 py-3">798 kg</td>
                  <td className="px-3 py-3 text-[#2E7D32] font-medium">AA (82%)</td>
                  <td className="px-3 py-3">1 082 XOF</td>
                  <td className="px-3 py-3 font-medium">863 436 XOF</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">28/03/2025</td>
                  <td className="px-3 py-3 font-mono text-xs text-gray-500">LOT-MBR047-H1-02</td>
                  <td className="px-3 py-3">612 kg</td>
                  <td className="px-3 py-3">590 kg</td>
                  <td className="px-3 py-3 text-[#2E7D32] font-medium">AA (86%)</td>
                  <td className="px-3 py-3">1 085 XOF</td>
                  <td className="px-3 py-3 font-medium">640 150 XOF</td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="px-3 py-3 text-gray-700 rounded-l-lg">TOTAL H1 2025</td>
                  <td className="px-3 py-3"></td>
                  <td className="px-3 py-3">1 436 kg</td>
                  <td className="px-3 py-3">1 388 kg</td>
                  <td className="px-3 py-3 text-[#2E7D32]">84% AA</td>
                  <td className="px-3 py-3"></td>
                  <td className="px-3 py-3 text-[#2E7D32] rounded-r-lg">1 503 586 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Projection H2 2025 :{" "}
            <span className="font-medium text-gray-700">2 412 kg</span>{" "}
            (selon floraison mesurée juin 2025)
          </p>
        </div>

        {/* Micro-crédit coopératif */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Micro-crédit coopératif</h2>

          {/* Prêt en cours */}
          <div className="overflow-x-auto mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Prêt", "Date", "Montant initial", "Remboursé", "Solde", "Taux", "Échéance"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs font-medium text-gray-500 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-3 font-mono text-xs text-gray-500">MCR-2024-MBR047-01</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">15/09/2024</td>
                  <td className="px-3 py-3 font-medium">200 000 XOF</td>
                  <td className="px-3 py-3 text-[#2E7D32] font-medium">115 000 XOF</td>
                  <td className="px-3 py-3 font-bold text-orange-600">85 000 XOF</td>
                  <td className="px-3 py-3 text-gray-600">4,5%/an (CI OHADA)</td>
                  <td className="px-3 py-3 text-gray-600 whitespace-nowrap">15/09/2025</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Plan de remboursement restant */}
          <h3 className="text-xs font-semibold text-gray-600 mb-3">Plan de remboursement restant</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Mois", "Mensualité", "Capital", "Intérêts"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs font-medium text-gray-500 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-3 text-gray-700">Août 2025</td>
                  <td className="px-3 py-3 font-medium">21 500 XOF</td>
                  <td className="px-3 py-3">21 108 XOF</td>
                  <td className="px-3 py-3 text-gray-500">392 XOF</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-3 text-gray-700">Septembre 2025</td>
                  <td className="px-3 py-3 font-medium">63 892 XOF <span className="text-xs font-normal text-gray-400">(solde)</span></td>
                  <td className="px-3 py-3">63 500 XOF</td>
                  <td className="px-3 py-3 text-gray-500">392 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
            Remboursement aligné sur la grande récolte (oct 2025). Dossier clôturé septembre 2025.
          </p>
        </div>

        {/* Assemblées et participation */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Assemblées et participation</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Assemblée", "Date", "Présence", "Vote", "Décision clé"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs font-medium text-gray-500 first:rounded-l-lg last:rounded-r-lg"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    assemblee: "AG extraordinaire COOPAGRI-NAWA",
                    date: "15/11/2024",
                    presence: "✅ Présent",
                    vote: "OUI",
                    decision: "Renouvellement certification RA 2025",
                  },
                  {
                    assemblee: "AG ordinaire 2025",
                    date: "28/02/2025",
                    presence: "✅ Présent",
                    vote: "OUI",
                    decision: "Ristournes 2024 + tarif collecte 2025",
                  },
                  {
                    assemblee: "Comité technique BPA",
                    date: "14/04/2025",
                    presence: "✅ Présent",
                    vote: "—",
                    decision: "Formation ANADER programmée juin 2025",
                  },
                ].map((row) => (
                  <tr key={row.assemblee} className="hover:bg-gray-50/50">
                    <td className="px-3 py-3 font-medium text-gray-800">{row.assemblee}</td>
                    <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{row.date}</td>
                    <td className="px-3 py-3 text-green-700">{row.presence}</td>
                    <td className="px-3 py-3 text-gray-700">{row.vote}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{row.decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-[#2E7D32] font-semibold">
            Score participation : 100% (3/3 assemblées) ✅
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-2">
          <a
            href="/cooperative"
            className="bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            ← Retour à la coopérative
          </a>
          <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
            Enregistrer une livraison
          </button>
          <button className="bg-[#E65100] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-orange-800 transition-colors">
            Micro-crédit
          </button>
        </div>

      </div>
    </div>
  );
}
