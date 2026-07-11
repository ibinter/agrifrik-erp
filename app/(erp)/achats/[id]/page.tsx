import Topbar from "../../../components/Topbar";
import AchatActions from "./AchatActions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AchatDetailPage({ params }: Props) {
  const { id } = await params;

  const lignes = [
    { num: 1, ref: "JD R503311", designation: "Joint hydraulique JD 6120M — Relevage arrière droit", qte: 2, unite: "pcs", pu: 42000, total: 84000 },
    { num: 2, ref: "JD AT366488", designation: 'Flexible HP hydraulique 1/2" — 1 200mm', qte: 1, unite: "pcs", pu: 128000, total: 128000 },
    { num: 3, ref: "SHELL HYD68", designation: "Huile hydraulique Shell Tellus S2 V 68 — 20L", qte: 1, unite: "bidon", pu: 72000, total: 72000 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Logistique", "Achats", `Bon de commande ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl font-bold text-gray-900">ACH-2025-091</span>
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  En attente livraison
                </span>
              </div>
              <p className="text-gray-700 font-semibold text-base">Concessionnaire John Deere Abidjan</p>
            </div>
            <div className="text-sm text-gray-600 space-y-1 text-right">
              <p><span className="font-semibold text-gray-700">Date commande :</span> 09/07/2025</p>
              <p><span className="font-semibold text-gray-700">Livraison prévue :</span> 15/07/2025</p>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: "Montant HT", value: "284 000 XOF", sub: "hors taxes" },
            { label: "TVA (18%)", value: "51 120 XOF", sub: "taxe sur valeur ajoutée" },
            { label: "Montant TTC", value: "335 120 XOF", sub: "toutes taxes comprises" },
            { label: "Budget rattaché", value: "Maintenance", sub: "Matériels agricoles" },
            { label: "Paiement", value: "Virement BICICI", sub: "30 jours net" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-sm font-bold text-[#1B5E20] leading-tight">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Lignes de commande */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Lignes de commande</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["#", "Référence", "Désignation", "Qté", "PU HT (XOF)", "Total HT (XOF)"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lignes.map((l) => (
                  <tr key={l.num} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-3 text-gray-400">{l.num}</td>
                    <td className="px-3 py-3 font-mono text-gray-600">{l.ref}</td>
                    <td className="px-3 py-3 text-gray-700">{l.designation}</td>
                    <td className="px-3 py-3 text-gray-700">{l.qte} {l.unite}</td>
                    <td className="px-3 py-3 text-gray-700">{l.pu.toLocaleString("fr-FR")}</td>
                    <td className="px-3 py-3 font-semibold text-gray-800">{l.total.toLocaleString("fr-FR")}</td>
                  </tr>
                ))}
                <tr className="border-t border-gray-200 bg-[#F8FBF8]">
                  <td colSpan={5} className="px-3 py-2 text-right font-semibold text-gray-700">TOTAL HT</td>
                  <td className="px-3 py-2 font-bold text-gray-800">284 000</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td colSpan={5} className="px-3 py-2 text-right text-gray-500">TVA 18%</td>
                  <td className="px-3 py-2 text-gray-600">51 120</td>
                </tr>
                <tr className="border-t border-gray-200 bg-[#E8F5E9]">
                  <td colSpan={5} className="px-3 py-2.5 text-right font-bold text-[#1B5E20]">TOTAL TTC</td>
                  <td className="px-3 py-2.5 font-bold text-[#1B5E20]">335 120</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Informations fournisseur */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Informations fournisseur</h2>
            <div className="space-y-2 text-xs text-gray-600">
              <p className="font-bold text-gray-800 text-sm">Concessionnaire John Deere CI</p>
              <p>Zone industrielle de Yopougon, Abidjan</p>
              <p>Jean-Baptiste Assoumou (+225 27 21 24 58 00)</p>
              <p><span className="font-semibold text-gray-700">RCCM :</span> CI-ABJ-2005-B-4821</p>
              <p><span className="font-semibold text-gray-700">Compte :</span> SGBCI — IBAN CI87...</p>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-gray-600 mb-3">Historique commandes</p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    {["N° BC", "Date", "Montant", "Statut"].map((h) => (
                      <th key={h} className="text-left px-2 py-1.5 font-semibold text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { bc: "ACH-2025-062", date: "15/06/2025", montant: "189 000 XOF", statut: "✅ Livré" },
                    { bc: "ACH-2025-018", date: "10/01/2025", montant: "62 000 XOF", statut: "✅ Livré" },
                    { bc: "ACH-2024-084", date: "20/08/2024", montant: "271 000 XOF", statut: "✅ Livré" },
                    { bc: "ACH-2025-091", date: "09/07/2025", montant: "335 120 XOF", statut: "⚠️ En attente" },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="px-2 py-2 font-mono text-gray-600">{row.bc}</td>
                      <td className="px-2 py-2 text-gray-500">{row.date}</td>
                      <td className="px-2 py-2 text-gray-700">{row.montant}</td>
                      <td className="px-2 py-2 text-gray-600">{row.statut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-[#2E7D32] font-semibold mt-3 text-right">Total 2024-2025 : 857 120 XOF</p>
            </div>
          </div>

          {/* Livraison & réception */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Livraison &amp; réception</h2>
            <div className="space-y-2 text-xs text-gray-600 mb-5">
              <p><span className="font-semibold text-gray-700">Mode livraison :</span> DHLExpress → Concessionnaire JD Abidjan (groupage)</p>
              <p>
                <span className="font-semibold text-gray-700">Tracking DHL :</span>{" "}
                1234567890CI —{" "}
                <a href="#" className="text-[#2E7D32] underline hover:text-[#1B5E20]">Suivre le colis</a>
              </p>
              <p><span className="font-semibold text-gray-700">ETA pièces Abidjan :</span> 14/07/2025</p>
              <p><span className="font-semibold text-gray-700">ETA livraison sur site Soubré :</span> 15/07/2025</p>
            </div>

            <div className="border border-dashed border-gray-300 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-gray-600 mb-2">Bon de réception (à remplir à la livraison)</p>
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0">Réceptionné par :</span>
                  <div className="flex-1 border-b border-gray-300 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0">Date réception :</span>
                  <div className="flex-1 border-b border-gray-300 h-5" />
                </div>
                <div className="flex items-center gap-4">
                  <span>Quantités conformes :</span>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-3 h-3" readOnly /> Oui
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-3 h-3" readOnly /> Non
                  </label>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-32 shrink-0 mt-0.5">Observations :</span>
                  <div className="flex-1 space-y-1.5">
                    <div className="border-b border-gray-300 h-5" />
                    <div className="border-b border-gray-300 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approbations */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Approbations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Étape", "Responsable", "Date", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { etape: "Demande d'achat", resp: "Bamba Oumar (Mécanicien)", date: "09/07/2025", statut: "done" },
                  { etape: "Validation technique", resp: "Ibrahim Sawadogo (Resp. terrain)", date: "09/07/2025", statut: "done" },
                  { etape: "Validation budgétaire", resp: "Directeur Financier", date: "09/07/2025", statut: "done" },
                  { etape: "Émission BC", resp: "Service Achats", date: "09/07/2025", statut: "done" },
                  { etape: "Réception marchandises", resp: "Bamba Oumar", date: "—", statut: "pending" },
                  { etape: "Validation facture", resp: "Comptabilité", date: "—", statut: "pending" },
                  { etape: "Paiement fournisseur", resp: "Trésorerie", date: "08/08/2025", statut: "pending" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-2.5 text-gray-700 font-medium">{row.etape}</td>
                    <td className="px-3 py-2.5 text-gray-600">{row.resp}</td>
                    <td className="px-3 py-2.5 text-gray-500">{row.date}</td>
                    <td className="px-3 py-2.5">
                      {row.statut === "done" ? (
                        <span className="inline-flex items-center gap-1 bg-[#E8F5E9] text-[#2E7D32] text-xs font-medium px-2 py-0.5 rounded-full">✅ Validé</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-400 text-xs font-medium px-2 py-0.5 rounded-full">⏳ En attente</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/achats"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux achats
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimer le bon de commande
          </button>
          <AchatActions />
        </div>

      </main>
    </div>
  );
}
