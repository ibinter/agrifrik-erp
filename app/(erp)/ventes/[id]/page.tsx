import Topbar from "../../../components/Topbar";
import VenteActions from "./VenteActions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VenteDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Commerce", "Ventes", `Commande ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl font-bold">VTE-2025-048</span>
                <span className="inline-flex items-center gap-1.5 bg-[#4CAF50] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-white inline-block" />
                  Confirmée
                </span>
              </div>
              <p className="text-[#A5D6A7] text-sm font-medium">Contrat d&apos;achat FOB San-Pédro</p>
              <p className="text-white font-semibold text-lg">Barry Callebaut SA — Zurich, Suisse</p>
            </div>
            <div className="text-sm text-[#C8E6C9] space-y-1 text-right">
              <p><span className="text-[#A5D6A7]">Date contrat :</span> 02/06/2025</p>
              <p><span className="text-[#A5D6A7]">Livraison prévue :</span> 05/08/2025 (ETA Rotterdam)</p>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Quantité", value: "24 900 kg", sub: "Cacao Grade AA" },
            { label: "Prix unitaire", value: "1 100 XOF/kg", sub: "par kilogramme" },
            { label: "Montant total", value: "27 390 000 XOF", sub: "41 775 EUR" },
            { label: "Facture", value: "FAC-2025-048", sub: "✅ Émise" },
            { label: "Paiement", value: "LC ✅ Confirmé", sub: "BICICI / BNP Paribas" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-sm font-bold text-[#1B5E20] leading-tight">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Détail de la commande */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Détail de la commande</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Article", "Lot", "Grade", "Qté (kg)", "PU (XOF)", "Montant (XOF)"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="px-3 py-3 text-gray-700">Cacao naturel fermenté séché</td>
                  <td className="px-3 py-3 text-gray-600">LOT-2025-045</td>
                  <td className="px-3 py-3">
                    <span className="bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold px-2 py-0.5 rounded-full">AA</span>
                  </td>
                  <td className="px-3 py-3 text-gray-700">24 900</td>
                  <td className="px-3 py-3 text-gray-700">1 100</td>
                  <td className="px-3 py-3 font-semibold text-[#1B5E20]">27 390 000</td>
                </tr>
                <tr className="border-t border-gray-200 bg-[#F8FBF8]">
                  <td colSpan={3} className="px-3 py-2 font-bold text-gray-700 text-right">TOTAL</td>
                  <td className="px-3 py-2 font-bold text-gray-800">24 900 kg</td>
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2 font-bold text-[#1B5E20]">27 390 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
            <div className="space-y-1.5">
              <p><span className="font-semibold text-gray-700">Incoterm :</span> FOB San-Pédro, CI</p>
              <p><span className="font-semibold text-gray-700">Devise facturation :</span> XOF + EUR (655,96)</p>
              <p><span className="font-semibold text-gray-700">Conditions paiement :</span> LC irrévocable à vue — BNP Paribas Paris</p>
            </div>
            <div className="space-y-1.5">
              <p><span className="font-semibold text-gray-700">Certificat d&apos;origine :</span> Côte d&apos;Ivoire (RA + FCPR)</p>
              <p><span className="font-semibold text-gray-700">Tolérance poids :</span> ±0,5% sur poids net</p>
            </div>
          </div>
        </div>

        {/* Chronologie */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-6">Chronologie de la transaction</h2>
          <div className="relative pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
            {[
              { date: "02/06/2025", label: "Contrat signé (Barry Callebaut + AGRIFRIK)", status: "done" },
              { date: "05/06/2025", label: "Lettre de crédit ouverte (BNP Paribas Paris → BICICI Abidjan)", status: "done" },
              { date: "18/06/2025", label: "Récolte LOT-2025-045 démarrée (PAR-A1)", status: "done" },
              { date: "30/06/2025", label: "Classement Grade AA validé (96/100)", status: "done" },
              { date: "01/07/2025", label: "Conditionnement (415 sacs jute 60 kg)", status: "done" },
              { date: "07/07/2025", label: "Certificat phytosanitaire (MINADER)", status: "done" },
              { date: "08/07/2025", label: "DAE export (DGD Abidjan)", status: "done" },
              { date: "10/07/2025", label: "Chargement container CAIU 842156-4 (MSC Allegria)", status: "done" },
              { date: "En transit", label: "ETA Rotterdam 05/08/2025", status: "transit" },
              { date: "05/08/2025", label: "Livraison prévue Rotterdam", status: "pending" },
              { date: "08/08/2025", label: "Paiement LC attendu (BICICI → AGRIFRIK)", status: "pending" },
            ].map((item, i) => (
              <div key={i} className="relative mb-5 last:mb-0">
                <div className={`absolute -left-5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  item.status === "done"
                    ? "bg-[#4CAF50] border-[#2E7D32]"
                    : item.status === "transit"
                    ? "bg-[#1565C0] border-[#1565C0]"
                    : "bg-white border-gray-300"
                }`}>
                  {item.status === "done" && (
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {item.status === "transit" && <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />}
                </div>
                <div className="ml-3">
                  <span className={`text-xs font-semibold ${
                    item.status === "done" ? "text-[#2E7D32]" : item.status === "transit" ? "text-[#1565C0]" : "text-gray-400"
                  }`}>{item.date}</span>
                  <p className={`text-xs mt-0.5 ${item.status === "pending" ? "text-gray-400" : "text-gray-700"}`}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents liés */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Documents liés</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Document", "Type", "Date", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { doc: "Contrat VTE-2025-048", type: "Commercial", date: "02/06" },
                  { doc: "Facture FAC-2025-048 (27 390 000 XOF)", type: "Finance", date: "01/07" },
                  { doc: "Packing list", type: "Export", date: "01/07" },
                  { doc: "Bill of Lading MSC", type: "Transport", date: "10/07" },
                  { doc: "DAE export", type: "Douanes", date: "08/07" },
                  { doc: "Certificat phytosanitaire", type: "Réglementation", date: "07/07" },
                  { doc: "Certificat RA + FCPR", type: "Certification", date: "01/07" },
                  { doc: "Rapport qualité CQ-LOT-045", type: "Qualité", date: "30/06" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-2.5 text-gray-700 font-medium">{row.doc}</td>
                    <td className="px-3 py-2.5 text-gray-500">{row.type}</td>
                    <td className="px-3 py-2.5 text-gray-500">{row.date}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium px-2 py-0.5 rounded-full">
                        ✅ Disponible
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Correspondances client */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Correspondances client</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date", "De", "Objet", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "12/06", from: "Barry Callebaut Procurement", objet: "Confirmation LC — BNP Paris", statut: "Lu ✅" },
                  { date: "08/07", from: "BC Logistics", objet: "Confirmation numéro container", statut: "Lu ✅" },
                  { date: "10/07", from: "AGRIFRIK → BC", objet: "BL transmis + tracking MSC", statut: "Envoyé ✅" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-2.5 text-gray-500">{row.date}</td>
                    <td className="px-3 py-2.5 text-gray-700 font-medium">{row.from}</td>
                    <td className="px-3 py-2.5 text-gray-600">{row.objet}</td>
                    <td className="px-3 py-2.5 text-gray-500">{row.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/ventes"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux ventes
          </a>
          <a
            href="/factures/FAC-2025-048"
            className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Voir la facture
          </a>
          <VenteActions />
        </div>

      </main>
    </div>
  );
}
