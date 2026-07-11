import Topbar from "../../../components/Topbar";
import AchatActions from "./AchatActions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AchatDetailPage({ params }: Props) {
  const { id } = await params;

  const lignes = [
    { ref: "INT-001", designation: "Engrais NPK 20-10-10", qte: 500, unite: "Kg", pu: 850, total: 425000 },
    { ref: "INT-002", designation: "Fongicide Mancozèbe 80WP", qte: 20, unite: "Kg", pu: 12500, total: 250000 },
    { ref: "INT-003", designation: "Herbicide Glyphosate", qte: 50, unite: "L", pu: 3200, total: 160000 },
    { ref: "INT-004", designation: "Semences maïs hybride", qte: 25, unite: "Kg", pu: 4800, total: 120000 },
  ];

  function fmt(n: number) {
    return n.toLocaleString("fr-FR") + " XOF";
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar
        title={`Bon de commande #${id}`}
        breadcrumb={["Logistique", "Achats", id]}
      />

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-5">
        {/* Bandeau statut */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
          <span className="text-sm font-medium text-blue-700">En cours de traitement</span>
        </div>

        {/* Document */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden print:shadow-none">
          {/* En-tête du document */}
          <div className="flex items-start justify-between p-8 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AF</span>
                </div>
                <span className="font-bold text-lg text-[#1A2E1A]">AGRIFRIK</span>
              </div>
              <p className="text-xs text-gray-400">ERP Agricole Intelligent</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-xl font-bold text-gray-900">BON DE COMMANDE</p>
              <div className="text-sm text-gray-600 space-y-0.5">
                <p><span className="font-medium">N° BC :</span> BC-2025-042</p>
                <p><span className="font-medium">Date :</span> 09/07/2025</p>
                <p>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    En cours
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Fournisseur */}
          <div className="p-8 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Fournisseur</p>
            <p className="font-semibold text-gray-900">AGRIINTRANT CI</p>
            <p className="text-sm text-gray-600">Abidjan, Plateau</p>
            <p className="text-sm text-gray-600">Tél : +225 20 21 22 23</p>
            <p className="text-sm text-gray-600">agriintrant@ci.com</p>
          </div>

          {/* Tableau des lignes */}
          <div className="p-8 border-b border-gray-100 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left pb-3 font-semibold text-gray-600 pr-4">Réf</th>
                  <th className="text-left pb-3 font-semibold text-gray-600 pr-4">Désignation</th>
                  <th className="text-right pb-3 font-semibold text-gray-600 pr-4">Qté</th>
                  <th className="text-left pb-3 font-semibold text-gray-600 pr-4">Unité</th>
                  <th className="text-right pb-3 font-semibold text-gray-600 pr-4">PU HT</th>
                  <th className="text-right pb-3 font-semibold text-gray-600">Total HT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lignes.map((l) => (
                  <tr key={l.ref} className="hover:bg-gray-50/50">
                    <td className="py-3 pr-4 font-mono text-xs text-gray-500">{l.ref}</td>
                    <td className="py-3 pr-4 text-gray-900">{l.designation}</td>
                    <td className="py-3 pr-4 text-right text-gray-700">{l.qte}</td>
                    <td className="py-3 pr-4 text-gray-500">{l.unite}</td>
                    <td className="py-3 pr-4 text-right text-gray-700">{l.pu.toLocaleString("fr-FR")}</td>
                    <td className="py-3 text-right font-medium text-gray-900">{l.total.toLocaleString("fr-FR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totaux */}
          <div className="p-8 border-b border-gray-100">
            <div className="ml-auto w-full max-w-xs space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total HT</span>
                <span>{fmt(955000)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>TVA 18%</span>
                <span>{fmt(171900)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-2 mt-2">
                <span>Total TTC</span>
                <span>{fmt(1126900)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="p-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Notes</p>
            <p className="text-sm text-gray-600">
              Livraison souhaitée avant le 15/07/2025. Paiement à 30 jours.
            </p>
          </div>
        </div>

        <AchatActions />
      </main>
    </div>
  );
}
