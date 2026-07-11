import { Printer, Download, Mail, CheckCircle } from "lucide-react";
import Topbar from "../../../components/Topbar";

export default async function FactureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar
        title={`Facture ${id}`}
        breadcrumb={["Commerce", "Factures", id]}
      />

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-5">
        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            <Printer size={15} />
            Imprimer
          </button>
          <button className="flex items-center gap-2 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            <Download size={15} />
            Télécharger PDF
          </button>
          <button className="flex items-center gap-2 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            <Mail size={15} />
            Envoyer par email
          </button>
          <button
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition-colors"
            style={{ background: "#2E7D32" }}
          >
            <CheckCircle size={15} />
            Marquer payée
          </button>
        </div>

        {/* Status banner */}
        <div
          className="rounded-xl px-5 py-3 flex items-center gap-3"
          style={{ background: "#FFF3E0", borderLeft: "4px solid #E65100" }}
        >
          <span className="text-sm font-bold" style={{ color: "#E65100" }}>
            EN ATTENTE DE PAIEMENT
          </span>
          <span className="text-sm text-gray-600">— Échéance dans 30 jours</span>
        </div>

        {/* Document */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xl font-bold text-gray-900">AGROTEK CI</p>
              <p className="text-sm text-gray-500 mt-1">Abidjan, Cocody, CI</p>
              <p className="text-sm text-gray-500">Tél : +225 27 22 40 00 00</p>
              <p className="text-sm text-gray-500">RCCM : CI-ABJ-2018-B-12345</p>
            </div>
            <div className="text-right">
              <p
                className="text-2xl font-extrabold tracking-wide"
                style={{ color: "#2E7D32" }}
              >
                FACTURE
              </p>
              <p className="text-sm font-mono font-semibold text-gray-800 mt-1">N° FAC-2025-0341</p>
              <p className="text-sm text-gray-500 mt-1">Date : 09/07/2025</p>
              <p className="text-sm text-gray-500">Échéance : 09/08/2025</p>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Client */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Facturé à</p>
            <div
              className="rounded-xl p-4"
              style={{ background: "#F8FBF8" }}
            >
              <p className="font-bold text-gray-900">CACAO EXPORT SA</p>
              <p className="text-sm text-gray-500 mt-0.5">Zone Industrielle, Abidjan</p>
              <p className="text-sm text-gray-500">Tél : +225 21 35 00 00</p>
            </div>
          </div>

          {/* Prestations table */}
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#F8FBF8" }}>
                    {["Désignation", "Quantité", "Unité", "PU HT (XOF)", "Total HT (XOF)"].map((col) => (
                      <th
                        key={col}
                        className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap first:rounded-l-xl last:rounded-r-xl"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    {
                      designation: "Cacao Grade A certifié Rainforest Alliance",
                      quantite: 8,
                      unite: "Tonne",
                      pu: 3200000,
                      total: 25600000,
                    },
                    {
                      designation: "Cacao Grade A standard",
                      quantite: 4,
                      unite: "Tonne",
                      pu: 3050000,
                      total: 12200000,
                    },
                    {
                      designation: "Frais de transit FOB Abidjan",
                      quantite: 1,
                      unite: "Forfait",
                      pu: 850000,
                      total: 850000,
                    },
                    {
                      designation: "Certificat phytosanitaire",
                      quantite: 1,
                      unite: "Unité",
                      pu: 333051,
                      total: 333051,
                    },
                  ].map((line, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-800">{line.designation}</td>
                      <td className="px-4 py-3 text-gray-700 tabular-nums text-center">{line.quantite}</td>
                      <td className="px-4 py-3 text-gray-500">{line.unite}</td>
                      <td className="px-4 py-3 text-gray-700 tabular-nums text-right">
                        {line.pu.toLocaleString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900 tabular-nums text-right">
                        {line.total.toLocaleString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totaux */}
          <div className="flex justify-end">
            <div className="w-80 space-y-2">
              <div className="flex justify-between text-sm text-gray-600 py-2 border-b border-gray-100">
                <span>Sous-total HT</span>
                <span className="tabular-nums font-medium text-gray-900">38 983 051 XOF</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 py-2 border-b border-gray-100">
                <span>TVA 0% (exportation)</span>
                <span className="tabular-nums text-gray-900">0 XOF</span>
              </div>
              <div
                className="flex justify-between text-base font-bold py-3 px-4 rounded-xl"
                style={{ background: "#E8F5E9", color: "#2E7D32" }}
              >
                <span>TOTAL TTC</span>
                <span className="tabular-nums">38 983 051 XOF</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Conditions de paiement */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Conditions de paiement</p>
            <p className="text-sm text-gray-700">
              Virement bancaire à 30 jours. IBAN : CI93 CI00 4000 0000 0000 0000 000 · Banque : SGBCI Abidjan
            </p>
          </div>

          {/* Mention légale */}
          <div
            className="rounded-xl px-4 py-3 text-xs text-gray-500"
            style={{ background: "#F5F5F5" }}
          >
            Conformément à la loi OHADA, tout retard de paiement entraîne des pénalités de 1,5% par mois.
          </div>
        </div>
      </main>
    </div>
  );
}
