import Topbar from "../../../components/Topbar";

export default async function RapportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Rapports", `Rapport ${id}`]} />

      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl text-white p-6" style={{ backgroundColor: "#1B5E20" }}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-xl font-bold">Rapport mensuel de production — Juillet 2025</h1>
              <div className="flex flex-wrap gap-4 text-sm text-green-100">
                <span>Code : <span className="text-white font-medium">RPT-2025-042</span></span>
                <span>|</span>
                <span>Type : <span className="text-white font-medium">Rapport mensuel automatique</span></span>
              </div>
              <div className="text-sm text-green-100">
                Période : <span className="text-white font-medium">01/07/2025 – 11/07/2025 (en cours)</span>
              </div>
              <div className="text-sm text-green-100">
                Destinataires : <span className="text-white font-medium">DG Koffi Amani</span> + <span className="text-white font-medium">CF Kofi Mensah</span> + <span className="text-white font-medium">Ibrahim Sawadogo</span>
              </div>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                En cours — génération automatique le 31/07
              </span>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Pages", value: "12 pages", sub: "estimé" },
            { label: "Sections", value: "6 sections", sub: "" },
            { label: "Indicateurs suivis", value: "28 KPIs", sub: "" },
            { label: "Dernière mise à jour", value: "11/07/2025", sub: "à 08h00" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
              {kpi.sub && <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Aperçu du rapport */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Aperçu du rapport</h2>
          <div className="rounded-xl p-4 text-sm text-green-900" style={{ backgroundColor: "#F1F8E9" }}>
            <svg className="inline-block mr-2 -mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Ce rapport est généré automatiquement le dernier jour de chaque mois. Vous consultez une prévisualisation partielle au <strong>11/07/2025</strong>. Le rapport définitif sera disponible le <strong>31/07/2025</strong>.
          </div>
        </div>

        {/* Production */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Production — Données à date (01–11/07/2025)</h2>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Transformation</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-100" style={{ backgroundColor: "#F8FBF8" }}>
                    <th className="text-left py-2 px-3 font-medium">Indicateur</th>
                    <th className="text-right py-2 px-3 font-medium">Valeur</th>
                    <th className="text-right py-2 px-3 font-medium">Vs N-1</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { ind: "Lots démarrés en juillet", val: "2 (LOT-047 + LOT-048)", vs: "=", vsColor: "text-gray-500" },
                    { ind: "Volume entrant (fèves fraîches)", val: "5 660 kg", vs: "+8,4%", vsColor: "text-green-600" },
                    { ind: "Volume sorti (fèves sèches estimé)", val: "1 876 kg (LOT-047 sorti)", vs: "+6,2%", vsColor: "text-green-600" },
                    { ind: "Score qualité moyen", val: "96,2/100", vs: "+1,8 pts", vsColor: "text-green-600" },
                    { ind: "Grade AA %", val: "94,5%", vs: "+2,3 pts", vsColor: "text-green-600" },
                  ].map((row) => (
                    <tr key={row.ind} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 text-gray-700">{row.ind}</td>
                      <td className="py-2.5 px-3 text-right font-medium text-gray-900">{row.val}</td>
                      <td className={`py-2.5 px-3 text-right font-medium ${row.vsColor}`}>{row.vs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Stocks */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Stocks — État au 11/07/2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100" style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left py-2 px-3 font-medium">Produit</th>
                  <th className="text-right py-2 px-3 font-medium">Quantité</th>
                  <th className="text-right py-2 px-3 font-medium">Valeur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 text-gray-700">Cacao Grade AA</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">18 448 kg</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">20 053 076 XOF</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 text-gray-700">Cacao Grade A</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">5 186 kg</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">5 014 862 XOF</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 text-gray-700">Intrants (valeur stock)</td>
                  <td className="py-2.5 px-3 text-right text-gray-400">—</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">1 847 000 XOF</td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="py-2.5 px-3 text-gray-900">Total stock</td>
                  <td className="py-2.5 px-3 text-right text-gray-400">—</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">26 914 938 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Ventes & Export */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Ventes & Export — Juillet (partiel)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100" style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left py-2 px-3 font-medium">N° BL</th>
                  <th className="text-left py-2 px-3 font-medium">Client</th>
                  <th className="text-right py-2 px-3 font-medium">Volume</th>
                  <th className="text-right py-2 px-3 font-medium">Montant</th>
                  <th className="text-left py-2 px-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-medium text-gray-900">BL-2025-008</td>
                  <td className="py-2.5 px-3 text-gray-700">Barry Callebaut CI</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">3 400 kg</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">3 695 800 XOF</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      BL émis — en transit
                    </span>
                  </td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="py-2.5 px-3 text-gray-900" colSpan={2}>Total juillet</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">3 400 kg</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">3 695 800 XOF</td>
                  <td className="py-2.5 px-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertes */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Alertes du mois</h2>
          <p className="text-xs text-gray-500">3 alertes actives au 11/07</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
              <div className="text-sm">
                <span className="font-medium text-red-800">Stock KCl : 2 sacs (seuil 5 sacs)</span>
                <span className="text-red-600"> — Commande urgente requise</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-yellow-50 border border-yellow-100">
              <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0"></span>
              <div className="text-sm">
                <span className="font-medium text-yellow-800">LOT-048 : Cut test J6 demain (12/07)</span>
                <span className="text-yellow-700"> — action requise</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
              <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
              <div className="text-sm">
                <span className="font-medium text-green-800">Budget phyto : 73,8% consommé à 54% de l&apos;année</span>
                <span className="text-green-700"> ✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Configuration du rapport</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100" style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left py-2 px-3 font-medium">Paramètre</th>
                  <th className="text-left py-2 px-3 font-medium">Valeur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { p: "Fréquence", v: "Mensuel (dernier jour du mois)" },
                  { p: "Génération", v: "Automatique à 06h00" },
                  { p: "Format", v: "PDF + envoi email" },
                  { p: "Destinataires", v: "3 personnes (modifiable)" },
                  { p: "Sections incluses", v: "Production + Stocks + Ventes + Finance + RH + Alertes" },
                  { p: "Comparaison", v: "Mois précédent + N-1 même mois" },
                ].map((row) => (
                  <tr key={row.p} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 text-gray-500">{row.p}</td>
                    <td className="py-2.5 px-3 font-medium text-gray-900">{row.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/rapports"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Retour aux rapports
            </a>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
              Générer maintenant
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
              </svg>
              Configurer le rapport
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
              Prévisualiser PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
