import Topbar from "../../../components/Topbar";
import { CheckCircle, Clock, FileText, Printer, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function FactureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Commerce", "Factures", `Facture ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-5xl mx-auto w-full">
        {/* Bandeau vert en-tête */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-5 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <p className="text-xs text-green-300 uppercase tracking-wide">N° Facture</p>
              <p className="text-xl font-bold">FAC-2025-048</p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-green-700 border border-green-400 text-green-100 text-xs font-semibold px-3 py-1.5 rounded-full">
              <CheckCircle size={13} /> Payée
            </span>
            <div>
              <p className="text-xs text-green-300 uppercase tracking-wide">Client</p>
              <p className="text-sm font-medium">Cargill International SA Rotterdam</p>
            </div>
            <div>
              <p className="text-xs text-green-300 uppercase tracking-wide">Date</p>
              <p className="text-sm font-medium">01/07/2025</p>
            </div>
            <div>
              <p className="text-xs text-green-300 uppercase tracking-wide">Échéance</p>
              <p className="text-sm font-medium">08/08/2025</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-white/20 transition">
              <Printer size={13} /> Imprimer
            </button>
            <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-xl border border-white/20 transition">
              <Download size={13} /> Exporter PDF
            </button>
          </div>
        </div>

        {/* 5 KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Montant HT", value: "27 390 000 XOF", sub: null },
            { label: "TVA 18%", value: "0 XOF", sub: "Exonéré export" },
            { label: "Montant TTC", value: "27 390 000 XOF", sub: "41 755 EUR" },
            { label: "LC Confirmée", value: "✅ BICICI", sub: "05/06/2025" },
            { label: "DSO", value: "38 jours", sub: null },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-sm font-bold text-gray-900">{kpi.value}</p>
              {kpi.sub && <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Aperçu facture format papier */}
        <div className="rounded-2xl bg-white shadow-lg border border-gray-200 p-8 space-y-6">
          {/* En-tête document */}
          <div className="flex flex-wrap justify-between gap-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-lg font-bold text-[#1B5E20]">AGRIFRIK SAS</p>
              <p className="text-xs text-gray-500">Zone Soubré Nord, Côte d&apos;Ivoire</p>
              <p className="text-xs text-gray-500">RCCM CI-SOB-2008-B-1142</p>
              <p className="text-xs text-gray-500">Compte BICICI CI87 0000 0000 0000 0000 0000 000</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">FACTURE</p>
              <p className="text-sm font-semibold text-[#2E7D32]">N° FAC-2025-048</p>
              <p className="text-xs text-gray-500">Date : 01/07/2025</p>
              <p className="text-xs text-gray-500">Réf. Commande : VTE-2025-048</p>
            </div>
          </div>

          {/* Facturé à */}
          <div className="bg-[#F8FBF8] rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Facturé à</p>
            <p className="text-sm font-bold text-gray-900">Cargill International SA</p>
            <p className="text-xs text-gray-600">Weena 505, 3013 AL Rotterdam, Pays-Bas</p>
          </div>

          {/* Tableau lignes */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left p-3 font-semibold text-gray-700">#</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Désignation</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Qté (kg)</th>
                  <th className="text-right p-3 font-semibold text-gray-700">PU (XOF/kg)</th>
                  <th className="text-right p-3 font-semibold text-gray-700">Total (XOF)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="p-3 text-gray-500">1</td>
                  <td className="p-3 text-gray-900">
                    <p className="font-semibold">Cacao naturel fermenté séché Grade AA</p>
                    <p className="text-gray-500 mt-0.5">
                      N° lot LOT-2025-045 — Certifié RA &amp; FCPR — Humidité 7,4% — FOB San-Pédro
                    </p>
                  </td>
                  <td className="p-3 text-right font-mono">24 900</td>
                  <td className="p-3 text-right font-mono">1 100</td>
                  <td className="p-3 text-right font-mono font-semibold">27 390 000</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200">
                  <td colSpan={4} className="p-3 text-right text-xs text-gray-600">Total HT</td>
                  <td className="p-3 text-right font-mono font-semibold">27 390 000</td>
                </tr>
                <tr>
                  <td colSpan={4} className="px-3 pb-1 text-right text-xs text-gray-400">
                    TVA 18% (exonérée export CI art. 344 CGI)
                  </td>
                  <td className="px-3 pb-1 text-right font-mono text-gray-400">0</td>
                </tr>
                <tr className="bg-[#1B5E20] text-white">
                  <td colSpan={4} className="p-3 text-right text-sm font-bold rounded-bl-xl">NET À PAYER</td>
                  <td className="p-3 text-right font-mono font-bold rounded-br-xl">
                    27 390 000 XOF
                    <br />
                    <span className="text-green-300 text-xs">= 41 752 EUR (655,96)</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Conditions paiement */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800">
            <p className="font-semibold mb-1">Conditions de paiement</p>
            <p>
              LC irrévocable SWIFT L/C N° BNP-2025-1847 | BNP Paribas Rotterdam → BICICI Abidjan | À vue
              (présentation documents)
            </p>
          </div>
        </div>

        {/* Statut paiement + SYSCOHADA */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Timeline */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Statut de paiement</h2>
            <ol className="relative border-l-2 border-gray-200 space-y-4 ml-2">
              {[
                { date: "05/06/2025", label: "LC ouverte (BNP Rotterdam → BICICI Abidjan)", done: true },
                { date: "10/07/2025", label: "Jeu de documents présenté à BICICI", done: true },
                { date: "10/07/2025", label: "Documents vérifiés conformes (BICICI Trade Finance)", done: true },
                { date: "05/08/2025", label: "ETA livraison Rotterdam", done: false },
                { date: "08/08/2025", label: "Paiement LC prévu", done: false },
              ].map((step, i) => (
                <li key={i} className="pl-6 relative">
                  <span
                    className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                      step.done ? "bg-[#2E7D32]" : "bg-gray-200"
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle size={10} className="text-white" />
                    ) : (
                      <Clock size={10} className="text-gray-400" />
                    )}
                  </span>
                  <p className="text-xs text-gray-400">{step.date}</p>
                  <p className="text-xs font-medium text-gray-800">{step.label}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* SYSCOHADA */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">Comptabilisation SYSCOHADA</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F8FBF8]">
                    <th className="text-left p-2 font-semibold text-gray-600">Compte</th>
                    <th className="text-left p-2 font-semibold text-gray-600">Libellé</th>
                    <th className="text-right p-2 font-semibold text-gray-600">Débit</th>
                    <th className="text-right p-2 font-semibold text-gray-600">Crédit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-2 font-mono text-gray-700">4111</td>
                    <td className="p-2 text-gray-700">
                      <p className="font-medium">Cargill International</p>
                      <p className="text-gray-400">FAC-2025-048</p>
                    </td>
                    <td className="p-2 text-right font-mono font-semibold text-[#1B5E20]">27 390 000</td>
                    <td className="p-2 text-right text-gray-300">—</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-2 font-mono text-gray-700">7011</td>
                    <td className="p-2 text-gray-700">
                      <p className="font-medium">Ventes marchandises</p>
                      <p className="text-gray-400">Cacao LOT-2025-045</p>
                    </td>
                    <td className="p-2 text-right text-gray-300">—</td>
                    <td className="p-2 text-right font-mono font-semibold text-[#1B5E20]">27 390 000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Documents liés */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Documents liés</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Contrat VTE-048",
              "BL MSC",
              "DAE",
              "Certificat phytosanitaire",
              "Certificat Rainforest Alliance",
              "Certificat d'origine CI (BCC)",
            ].map((doc) => (
              <div
                key={doc}
                className="flex items-center gap-2 bg-[#F8FBF8] rounded-xl px-3 py-2.5 text-xs text-gray-700 font-medium hover:bg-green-50 cursor-pointer border border-transparent hover:border-green-100 transition"
              >
                <FileText size={14} className="text-[#2E7D32] shrink-0" />
                {doc}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/factures"
            className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium px-4 py-2 rounded-xl hover:bg-gray-50 transition"
          >
            <ArrowLeft size={13} /> Retour aux factures
          </Link>
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium px-4 py-2 rounded-xl hover:bg-gray-50 transition">
            <Printer size={13} /> Imprimer
          </button>
          <button className="flex items-center gap-1.5 bg-[#2E7D32] text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-[#1B5E20] transition">
            <Download size={13} /> Exporter PDF
          </button>
        </div>
      </main>
    </div>
  );
}
