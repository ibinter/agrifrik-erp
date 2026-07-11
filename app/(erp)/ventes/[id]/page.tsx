import Topbar from "../../../components/Topbar";
import VenteActions from "./VenteActions";

interface Props {
  params: Promise<{ id: string }>;
}

const timeline = [
  { label: "Commande reçue", date: "02/07/2025", done: true, current: false },
  { label: "Confirmée", date: "03/07/2025", done: true, current: false },
  { label: "En préparation", date: "05/07/2025", done: true, current: false },
  { label: "En livraison", date: "08/07/2025", done: false, current: true },
  { label: "Livrée", date: "En attente", done: false, current: false },
];

export default async function VenteDetailPage({ params }: Props) {
  const { id } = await params;

  const lignes = [
    { produit: "Cacao Grade A", qte: 12, unite: "Tonne", pu: 3200000, incoterm: "FOB", total: 38400000 },
    { produit: "Cacao Grade B", qte: 5, unite: "Tonne", pu: 2800000, incoterm: "FOB", total: 14000000 },
    { produit: "Transport & manutention", qte: 1, unite: "Forfait", pu: 850000, incoterm: "—", total: 850000 },
  ];

  function fmt(n: number) {
    return n.toLocaleString("fr-FR") + " XOF";
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar
        title={`Commande #${id}`}
        breadcrumb={["Commerce", "Ventes", id]}
      />

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Document principal */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden print:shadow-none">
              {/* En-tête */}
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
                  <p className="text-xl font-bold text-gray-900">COMMANDE CLIENT</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">N° :</span> CMD-2025-{id}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Date :</span> 02/07/2025</p>
                </div>
              </div>

              {/* Client */}
              <div className="p-8 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Client</p>
                <p className="font-semibold text-gray-900">CHOCOVOIRE CI</p>
                <p className="text-sm text-gray-600">Abidjan</p>
                <p className="text-sm text-gray-600">contact@chocovoire.ci</p>
              </div>

              {/* Tableau */}
              <div className="p-8 border-b border-gray-100 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left pb-3 font-semibold text-gray-600 pr-4">Produit</th>
                      <th className="text-right pb-3 font-semibold text-gray-600 pr-4">Qté</th>
                      <th className="text-left pb-3 font-semibold text-gray-600 pr-4">Unité</th>
                      <th className="text-right pb-3 font-semibold text-gray-600 pr-4">PU</th>
                      <th className="text-center pb-3 font-semibold text-gray-600 pr-4">Incoterm</th>
                      <th className="text-right pb-3 font-semibold text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {lignes.map((l, i) => (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="py-3 pr-4 text-gray-900">{l.produit}</td>
                        <td className="py-3 pr-4 text-right text-gray-700">{l.qte}</td>
                        <td className="py-3 pr-4 text-gray-500">{l.unite}</td>
                        <td className="py-3 pr-4 text-right text-gray-700">{l.pu.toLocaleString("fr-FR")}</td>
                        <td className="py-3 pr-4 text-center text-gray-500 text-xs">{l.incoterm}</td>
                        <td className="py-3 text-right font-medium text-gray-900">{l.total.toLocaleString("fr-FR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totaux */}
              <div className="p-8">
                <div className="ml-auto w-full max-w-xs space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Total HT</span>
                    <span>{fmt(53250000)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>TVA 0% (export)</span>
                    <span>{fmt(0)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-2 mt-2">
                    <span>Total</span>
                    <span>{fmt(53250000)}</span>
                  </div>
                </div>
              </div>
            </div>

            <VenteActions />
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
            <p className="text-sm font-semibold text-gray-900 mb-5">Suivi commande</p>
            <ol className="relative border-l border-gray-200 space-y-6 pl-5">
              {timeline.map((step, i) => (
                <li key={i} className="relative">
                  <span
                    className={`absolute -left-[22px] flex items-center justify-center w-5 h-5 rounded-full border-2 text-xs
                      ${step.done
                        ? "bg-[#2E7D32] border-[#2E7D32] text-white"
                        : step.current
                        ? "bg-white border-blue-500 text-blue-500"
                        : "bg-white border-gray-300 text-gray-300"
                      }`}
                  >
                    {step.done ? "✓" : step.current ? "↻" : "○"}
                  </span>
                  <div className={`ml-1 ${step.current ? "text-blue-700" : step.done ? "text-gray-900" : "text-gray-400"}`}>
                    <p className="text-sm font-medium leading-none">{step.label}</p>
                    <p className="text-xs mt-1">{step.date}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
