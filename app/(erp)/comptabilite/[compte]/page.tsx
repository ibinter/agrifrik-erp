import Topbar from "../../../components/Topbar";

interface Props {
  params: Promise<{ compte: string }>;
}

const ecritures = [
  { date: "01/07/2025", piece: "FAC-2025-081", libelle: "Vente cacao Grade A — CHOCOVOIRE", debit: 0, credit: 38400000 },
  { date: "02/07/2025", piece: "FAC-2025-082", libelle: "Vente cacao Grade B — CHOCOVOIRE", debit: 0, credit: 14000000 },
  { date: "03/07/2025", piece: "FAC-2025-083", libelle: "Vente palmiste — PALME CI", debit: 0, credit: 7200000 },
  { date: "04/07/2025", piece: "AV-2025-012", libelle: "Avoir retour marchandise — CHOCOVOIRE", debit: 1200000, credit: 0 },
  { date: "05/07/2025", piece: "FAC-2025-084", libelle: "Vente maïs local — COOP BOUAKÉ", debit: 0, credit: 3150000 },
  { date: "05/07/2025", piece: "FAC-2025-085", libelle: "Vente riz paddy — RIZERIE DALOA", debit: 0, credit: 4800000 },
  { date: "06/07/2025", piece: "AV-2025-013", libelle: "Remise commerciale accordée", debit: 420000, credit: 0 },
  { date: "07/07/2025", piece: "FAC-2025-086", libelle: "Vente anacarde — EXPORT TRADE CI", debit: 0, credit: 18600000 },
  { date: "08/07/2025", piece: "FAC-2025-087", libelle: "Vente manioc transformé — MARCHÉ ABIDJAN", debit: 0, credit: 960000 },
  { date: "09/07/2025", piece: "FAC-2025-088", libelle: "Vente hévéa brut — SIFCA GROUP", debit: 0, credit: 22500000 },
];

export default async function GrandLivrePage({ params }: Props) {
  const { compte } = await params;

  let solde = 0;
  const ecrituresAvecSolde = ecritures.map((e) => {
    solde += e.credit - e.debit;
    return { ...e, solde };
  });

  const totalDebit = ecritures.reduce((s, e) => s + e.debit, 0);
  const totalCredit = ecritures.reduce((s, e) => s + e.credit, 0);
  const soldeFinal = totalCredit - totalDebit;

  function fmt(n: number) {
    if (n === 0) return "—";
    return n.toLocaleString("fr-FR");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar
        title={`Grand livre — Compte ${compte}`}
        breadcrumb={["Finance", "Comptabilité", compte]}
      />

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full space-y-5">
        {/* Info compte */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2E7D32]/10 flex items-center justify-center">
            <span className="text-[#2E7D32] font-bold text-sm">{compte}</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Compte {compte} — Ventes de produits agricoles</p>
            <p className="text-xs text-gray-400 mt-0.5">Plan comptable SYSCOHADA · Classe 7 — Comptes de produits</p>
          </div>
        </div>

        {/* Tableau grand livre */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">Écritures — Juillet 2025</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">N° Pièce</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Libellé</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Débit</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Crédit</th>
                  <th className="text-right px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Solde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ecrituresAvecSolde.map((e, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">{e.date}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">{e.piece}</td>
                    <td className="px-4 py-3 text-gray-800">{e.libelle}</td>
                    <td className="px-4 py-3 text-right text-red-600 whitespace-nowrap">
                      {e.debit > 0 ? e.debit.toLocaleString("fr-FR") : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-green-700 whitespace-nowrap">
                      {e.credit > 0 ? e.credit.toLocaleString("fr-FR") : "—"}
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-gray-900 whitespace-nowrap">
                      {e.solde.toLocaleString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Totaux */}
              <tfoot>
                <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold">
                  <td colSpan={3} className="px-5 py-4 text-sm text-gray-700">TOTAUX</td>
                  <td className="px-4 py-4 text-right text-red-600 text-sm whitespace-nowrap">
                    {totalDebit.toLocaleString("fr-FR")} XOF
                  </td>
                  <td className="px-4 py-4 text-right text-green-700 text-sm whitespace-nowrap">
                    {totalCredit.toLocaleString("fr-FR")} XOF
                  </td>
                  <td className="px-5 py-4 text-right text-sm whitespace-nowrap">
                    <span className={soldeFinal >= 0 ? "text-green-700" : "text-red-600"}>
                      {Math.abs(soldeFinal).toLocaleString("fr-FR")} XOF
                    </span>
                    <span className="text-xs font-normal text-gray-400 ml-1">
                      {soldeFinal >= 0 ? "Cr." : "Dr."}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Résumé */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Débit</p>
            <p className="text-lg font-bold text-red-600">{totalDebit.toLocaleString("fr-FR")}</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Crédit</p>
            <p className="text-lg font-bold text-green-700">{totalCredit.toLocaleString("fr-FR")}</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Solde {soldeFinal >= 0 ? "Créditeur" : "Débiteur"}
            </p>
            <p className={`text-lg font-bold ${soldeFinal >= 0 ? "text-green-700" : "text-red-600"}`}>
              {Math.abs(soldeFinal).toLocaleString("fr-FR")}
            </p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
        </div>
      </main>
    </div>
  );
}
