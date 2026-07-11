import Topbar from "../../../components/Topbar";

export default async function EcritureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar
        breadcrumb={["Finance", "Comptabilité", `Écriture ${id}`]}
      />

      <main className="flex-1 p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-green-200 font-medium uppercase tracking-widest mb-1">Écriture comptable</p>
              <h1 className="text-2xl font-bold tracking-tight">JNL-2025-0847</h1>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-1.5 text-sm font-semibold">
              ✅ Validée
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-green-100">
            <div><span className="text-green-300">Journal :</span> Journal des Ventes (JV)</div>
            <div><span className="text-green-300">Date :</span> 23/06/2025</div>
            <div className="sm:col-span-2">
              <span className="text-green-300">Libellé :</span> Vente cacao Grade AA — LOT-2025-046 — Barry Callebaut CI
            </div>
            <div><span className="text-green-300">Saisie par :</span> Adjoua Messou</div>
            <div><span className="text-green-300">Validée par :</span> Koffi Amani (DG)</div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Montant total débit</p>
            <p className="text-xl font-bold text-gray-800">4 460 000</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Montant total crédit</p>
            <p className="text-xl font-bold text-gray-800">4 460 000</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Solde</p>
            <p className="text-xl font-bold text-[#2E7D32]">0 XOF ✅</p>
            <p className="text-xs text-green-600">Écriture équilibrée</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Pièce justificative</p>
            <p className="text-base font-bold text-gray-800">FAC-2025-046</p>
            <p className="text-xs text-gray-400">Barry Callebaut</p>
          </div>
        </div>

        {/* Détail de l'écriture */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Détail de l&apos;écriture — Plan Comptable SYSCOHADA Révisé</h2>
          <p className="text-xs text-gray-400 mb-4">Journal des Ventes · JNL-2025-0847 · 23/06/2025</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium rounded-l-xl">N° Compte</th>
                  <th className="text-left px-4 py-3 font-medium">Intitulé du compte</th>
                  <th className="text-right px-4 py-3 font-medium">Débit (XOF)</th>
                  <th className="text-right px-4 py-3 font-medium rounded-r-xl">Crédit (XOF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-semibold text-[#1B5E20]">411</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">Clients</p>
                    <p className="text-xs text-gray-500">Barry Callebaut Manufacturing CI SAS</p>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">4 460 000</td>
                  <td className="px-4 py-3 text-right text-gray-300">—</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-semibold text-[#1B5E20]">701</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">Ventes de marchandises</p>
                    <p className="text-xs text-gray-500">Cacao Grade AA (964 kg × 1 087 XOF) — prix hors TVA exonéré export</p>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">—</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">4 460 000</td>
                </tr>
                <tr className="bg-[#F8FBF8] font-bold">
                  <td className="px-4 py-3 rounded-l-xl" colSpan={2}>
                    <span className="text-gray-700">TOTAUX</span>
                  </td>
                  <td className="px-4 py-3 text-right text-[#2E7D32]">4 460 000</td>
                  <td className="px-4 py-3 text-right text-[#2E7D32] rounded-r-xl">4 460 000 ✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-xs text-blue-700">
            <span className="font-semibold">Note TVA :</span> Exonération TVA art. 344 CGI-CI — Exportation de cacao brut (produit agricole primaire)
          </div>
        </div>

        {/* Écriture de règlement */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Écriture de règlement (J+15)</h2>
          <p className="text-xs text-gray-400 mb-4">Réception du paiement LC — 08/07/2025</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium rounded-l-xl">N° Compte</th>
                  <th className="text-left px-4 py-3 font-medium">Intitulé</th>
                  <th className="text-right px-4 py-3 font-medium">Débit</th>
                  <th className="text-right px-4 py-3 font-medium rounded-r-xl">Crédit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-semibold text-[#1B5E20]">521</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">Banque SGBCI</p>
                    <p className="text-xs text-gray-500">Règlement virement reçu LC</p>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">4 460 000</td>
                  <td className="px-4 py-3 text-right text-gray-300">—</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-semibold text-[#1B5E20]">411</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">Clients</p>
                    <p className="text-xs text-gray-500">Barry Callebaut CI — solde compte client</p>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-300">—</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">4 460 000</td>
                </tr>
                <tr className="bg-[#F8FBF8] font-bold">
                  <td className="px-4 py-3 rounded-l-xl" colSpan={2}>
                    <span className="text-gray-700">TOTAUX</span>
                  </td>
                  <td className="px-4 py-3 text-right text-[#2E7D32]">4 460 000</td>
                  <td className="px-4 py-3 text-right text-[#2E7D32] rounded-r-xl">4 460 000 ✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
            <span><span className="font-medium text-gray-700">Référence règlement :</span> VIR-SGBCI-2025-07-0847</span>
            <span><span className="font-medium text-gray-700">Date valeur :</span> 08/07/2025</span>
          </div>
        </div>

        {/* Contexte de la vente */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Contexte de la vente</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium rounded-l-xl w-48">Élément</th>
                  <th className="text-left px-4 py-3 font-medium rounded-r-xl">Détail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {[
                  ["Lot cacao", "LOT-2025-046 — Grade AA (97% fèves brunes)"],
                  ["Poids net", "964 kg (sacs jute 65 kg × 14,83 sacs)"],
                  ["Prix unitaire", "1 087 XOF/kg (prix contractuel CTR-2025-001 fixe 2025)"],
                  ["Incoterm", "DAP San-Pédro — Livraison effectuée 22/06/2025"],
                  ["Certification", "Rainforest Alliance RA-CI-2025-00847 ✅"],
                  ["BL associé", "BL-2025-007 — Maersk CI"],
                  ["Contrat", "CTR-2025-001 (Barry Callebaut — 48t/an 2025)"],
                ].map(([label, value]) => (
                  <tr key={label} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-600">{label}</td>
                    <td className="px-4 py-3 text-gray-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grand Livre client */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Comptes auxiliaires — Grand Livre client</h2>
          <p className="text-xs text-gray-400 mb-4">Extrait du grand livre client Barry Callebaut CI (compte 411-BC)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium rounded-l-xl">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Réf. écriture</th>
                  <th className="text-left px-4 py-3 font-medium">Libellé</th>
                  <th className="text-right px-4 py-3 font-medium">Débit</th>
                  <th className="text-right px-4 py-3 font-medium">Crédit</th>
                  <th className="text-right px-4 py-3 font-medium rounded-r-xl">Solde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                <tr className="hover:bg-gray-50 text-gray-500 italic">
                  <td className="px-4 py-2">01/01/2025</td>
                  <td className="px-4 py-2">—</td>
                  <td className="px-4 py-2">Report à nouveau</td>
                  <td className="px-4 py-2 text-right">—</td>
                  <td className="px-4 py-2 text-right">—</td>
                  <td className="px-4 py-2 text-right">0</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">15/01/2025</td>
                  <td className="px-4 py-2 font-mono text-[#1B5E20]">JNL-2025-0012</td>
                  <td className="px-4 py-2">Vente BL-001 (4t)</td>
                  <td className="px-4 py-2 text-right">4 460 000</td>
                  <td className="px-4 py-2 text-right text-gray-300">—</td>
                  <td className="px-4 py-2 text-right">4 460 000</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">30/01/2025</td>
                  <td className="px-4 py-2 font-mono text-[#1B5E20]">JNL-2025-0089</td>
                  <td className="px-4 py-2">Règlement BL-001</td>
                  <td className="px-4 py-2 text-right text-gray-300">—</td>
                  <td className="px-4 py-2 text-right">4 460 000</td>
                  <td className="px-4 py-2 text-right font-medium text-[#2E7D32]">0</td>
                </tr>
                <tr className="hover:bg-gray-50 text-gray-400 italic text-center">
                  <td className="px-4 py-2" colSpan={6}>[ ... 6 cycles identiques ... ]</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50 font-semibold">
                  <td className="px-4 py-2">23/06/2025</td>
                  <td className="px-4 py-2 font-mono text-[#1B5E20]">JNL-2025-0847</td>
                  <td className="px-4 py-2">Vente BL-007 (964 kg)</td>
                  <td className="px-4 py-2 text-right">4 460 000</td>
                  <td className="px-4 py-2 text-right text-gray-300">—</td>
                  <td className="px-4 py-2 text-right text-orange-600">4 460 000</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">08/07/2025</td>
                  <td className="px-4 py-2 font-mono text-[#1B5E20]">JNL-2025-0921</td>
                  <td className="px-4 py-2">Règlement BL-007</td>
                  <td className="px-4 py-2 text-right text-gray-300">—</td>
                  <td className="px-4 py-2 text-right">4 460 000</td>
                  <td className="px-4 py-2 text-right font-bold text-[#2E7D32]">0 ✅</td>
                </tr>
                <tr className="bg-[#F8FBF8] font-bold text-gray-700">
                  <td className="px-4 py-3 rounded-l-xl" colSpan={2}>Balance</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-right text-[#2E7D32]">31,22M</td>
                  <td className="px-4 py-3 text-right text-[#2E7D32]">31,22M</td>
                  <td className="px-4 py-3 text-right text-[#2E7D32] rounded-r-xl">0 ✅</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-xs text-amber-700">
            <span className="font-semibold">Solde client BC au 11/07/2025 :</span> 3 791 000 XOF (BL-2025-008 partiel — en cours de règlement)
          </div>
        </div>

        {/* Pièces justificatives */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Pièces justificatives</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium rounded-l-xl">Pièce</th>
                  <th className="text-left px-4 py-3 font-medium">N°</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-right px-4 py-3 font-medium">Montant</th>
                  <th className="text-center px-4 py-3 font-medium rounded-r-xl">Lien</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Facture vente", "FAC-2025-046", "22/06/2025", "4 460 000 XOF", "DOC-2025-046"],
                  ["Connaissement maritime", "BL-2025-007 / MAEU-CI-0846", "23/06/2025", "—", "DOC-2025-047"],
                  ["Certificat Rainforest Alliance", "RA-CI-2025-00847", "01/03/2025", "—", "DOC-2025-031"],
                  ["Avis de virement reçu", "VIR-SGBCI-2025-07-0847", "08/07/2025", "4 460 000 XOF", "DOC-2025-089"],
                ].map(([piece, numero, date, montant, doc]) => (
                  <tr key={doc} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{piece}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{numero}</td>
                    <td className="px-4 py-3 text-gray-600">{date}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{montant}</td>
                    <td className="px-4 py-3 text-center">
                      <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-1.5 hover:bg-[#1B5E20] transition-colors">
                        Voir →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-4">
          <a
            href="/comptabilite"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Retour à la comptabilité
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
            Imprimer le journal
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Exporter OFX
          </button>
        </div>

      </main>
    </div>
  );
}
