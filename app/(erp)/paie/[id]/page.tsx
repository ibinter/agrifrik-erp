import Topbar from "../../../components/Topbar";
import { Printer, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function BulletinPaiePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .print-container { padding: 0; }
          .sidebar { display: none !important; }
        }
      `}</style>

      <div className="no-print">
        <Topbar
          title={`Bulletin ${id}`}
          breadcrumb={["RH & Social", "Paie", `Bulletin ${id}`]}
        />
      </div>

      <div className="p-6 print-container">
        {/* Actions */}
        <div className="flex items-center gap-3 mb-6 no-print">
          <Link
            href="/paie"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={13} />
            Retour à la liste
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Printer size={13} />
            Imprimer
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white" style={{ backgroundColor: "#2E7D32" }}>
            <Download size={13} />
            Télécharger PDF
          </button>
        </div>

        {/* Bulletin */}
        <div className="bg-white rounded-2xl border border-gray-100 max-w-4xl mx-auto overflow-hidden">
          {/* Bandeau en-tête */}
          <div className="px-8 py-4 text-center" style={{ backgroundColor: "#1B5E20" }}>
            <h1 className="text-white text-lg font-bold tracking-widest uppercase">
              Bulletin de Paie
            </h1>
            <p className="text-green-200 text-sm font-medium mt-0.5">Juin 2025</p>
          </div>

          {/* Infos employeur / salarié */}
          <div className="grid grid-cols-2 gap-8 px-8 py-6 border-b border-gray-100">
            {/* Employeur */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Employeur</p>
              <p className="font-bold text-gray-900 text-sm">AGRIFRIK SAS</p>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <p>RCCM : 2023-B-00124-CI</p>
                <p>Siège social : Soubré, Côte d'Ivoire</p>
                <p>Activité : Agriculture &amp; Export Produits Tropicaux</p>
                <p>N° CNPS Employeur : 02-14872-CI</p>
              </div>
            </div>
            {/* Salarié */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Salarié</p>
              <p className="font-bold text-gray-900 text-sm">Ibrahim Sawadogo</p>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <p>Matricule : <span className="font-mono font-medium">EMP-005</span></p>
                <p>Qualification : Chef d'équipe terrain</p>
                <p>CCN : Convention collective agricole de CI</p>
                <p>Date d'entrée : 01/03/2023 — Ancienneté : 2 ans 4 mois</p>
                <p>Période : 01/06/2025 → 30/06/2025</p>
                <p>N° SS/CNPS : <span className="font-mono">2-8421-06-2025-001</span></p>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">
            {/* Éléments de rémunération */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Éléments de rémunération
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["Libellé", "Base", "Taux", "Montant"].map((h) => (
                      <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { libelle: "Salaire de base", base: "26 jours", taux: "—", montant: "200 000" },
                    { libelle: "Prime d'ancienneté (2 ans = 4%)", base: "200 000", taux: "4%", montant: "8 000" },
                    { libelle: "Prime de responsabilité terrain", base: "forfait", taux: "—", montant: "30 000" },
                    { libelle: "Prime qualité S1 2025 (exceptionnel)", base: "forfait", taux: "—", montant: "15 000" },
                    { libelle: "Indemnité de transport", base: "forfait", taux: "—", montant: "10 000" },
                  ].map((row) => (
                    <tr key={row.libelle} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-700 text-xs">{row.libelle}</td>
                      <td className="px-3 py-2 text-gray-500 text-xs">{row.base}</td>
                      <td className="px-3 py-2 text-gray-500 text-xs">{row.taux}</td>
                      <td className="px-3 py-2 text-gray-900 text-xs font-medium text-right">{row.montant} XOF</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: "#E8F5E9" }}>
                    <td colSpan={3} className="px-3 py-2 text-xs font-bold" style={{ color: "#1B5E20" }}>Total Brut</td>
                    <td className="px-3 py-2 text-xs font-bold text-right" style={{ color: "#1B5E20" }}>263 000 XOF</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cotisations salariales */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Cotisations salariales
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["Libellé", "Assiette", "Taux", "Montant"].map((h) => (
                      <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { libelle: "CNPS retraite salarié", base: "263 000", taux: "3,2%", montant: "8 416" },
                    { libelle: "CNPS AT/MP salarié", base: "263 000", taux: "0%", montant: "0" },
                    { libelle: "IS (impôt sur salaire)", base: "base imposable 238 000", taux: "barème", montant: "12 400" },
                    { libelle: "Contribution nationale", base: "238 000", taux: "1,5%", montant: "3 570" },
                  ].map((row) => (
                    <tr key={row.libelle} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-700 text-xs">{row.libelle}</td>
                      <td className="px-3 py-2 text-gray-500 text-xs">{row.base}</td>
                      <td className="px-3 py-2 text-gray-500 text-xs">{row.taux}</td>
                      <td className="px-3 py-2 text-gray-900 text-xs font-medium text-right">{row.montant} XOF</td>
                    </tr>
                  ))}
                  <tr className="bg-red-50">
                    <td colSpan={3} className="px-3 py-2 text-xs font-bold text-red-700">Total retenues</td>
                    <td className="px-3 py-2 text-xs font-bold text-right text-red-700">24 386 XOF</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cotisations patronales */}
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Cotisations patronales (informatives)
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["Libellé", "Assiette", "Taux", "Montant"].map((h) => (
                      <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { libelle: "CNPS retraite patronal", base: "263 000", taux: "4,8%", montant: "12 624" },
                    { libelle: "CNPS AT/MP", base: "263 000", taux: "3%", montant: "7 890" },
                    { libelle: "CNPS PF (prestations familiales)", base: "263 000", taux: "5,75%", montant: "15 122" },
                    { libelle: "FPC (formation professionnelle continue)", base: "263 000", taux: "1,2%", montant: "3 156" },
                  ].map((row) => (
                    <tr key={row.libelle} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-700 text-xs">{row.libelle}</td>
                      <td className="px-3 py-2 text-gray-500 text-xs">{row.base}</td>
                      <td className="px-3 py-2 text-gray-500 text-xs">{row.taux}</td>
                      <td className="px-3 py-2 text-gray-900 text-xs font-medium text-right">{row.montant} XOF</td>
                    </tr>
                  ))}
                  <tr className="bg-orange-50">
                    <td colSpan={3} className="px-3 py-2 text-xs font-bold text-orange-700">Charges patronales totales</td>
                    <td className="px-3 py-2 text-xs font-bold text-right text-orange-700">38 792 XOF</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Net à payer */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#1B5E20" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-xs font-medium uppercase tracking-wider">Net à payer</p>
                  <p className="text-white text-3xl font-bold mt-1">238 614 XOF</p>
                  <p className="text-green-300 text-xs mt-2 italic">
                    Deux cent trente-huit mille six cent quatorze francs CFA
                  </p>
                </div>
                <div className="text-right text-xs text-green-300 space-y-1">
                  <p>Brut : 263 000 XOF</p>
                  <p>– Retenues : 24 386 XOF</p>
                  <div className="border-t border-green-600 pt-1 mt-1">
                    <p className="text-white font-bold">= 238 614 XOF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations complémentaires */}
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Paiement</p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Mode :</span>
                    <span className="font-medium text-gray-800">Virement bancaire BICICI CI</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date de paiement :</span>
                    <span className="font-medium text-gray-800">05/07/2025</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Congés</p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Solde acquis :</span>
                    <span className="font-medium text-gray-800">22 jours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pris ce mois :</span>
                    <span className="font-medium text-gray-800">0 jour</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-1.5 mt-1">
                    <span className="font-semibold">Restant :</span>
                    <span className="font-bold" style={{ color: "#2E7D32" }}>22 jours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pied de page légal */}
            <div className="border-t border-gray-100 pt-4 text-center">
              <p className="text-xs text-gray-400">
                Document généré par AGRIFRIK ERP — Confidentiel — À conserver par le salarié
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
