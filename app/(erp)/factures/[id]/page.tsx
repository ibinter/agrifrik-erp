import Topbar from "../../../components/Topbar";
import { ArrowLeft, Download, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function FactureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar
        breadcrumb={["Commerce", "Factures", `Facture ${id}`]}
      />

      <div className="p-6 space-y-6">
        {/* En-tête bandeau vert */}
        <div className="rounded-2xl p-6 text-white" style={{ background: "#1B5E20" }}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold">FAC-2025-008</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-400/20 text-green-200 border border-green-400/30">
                  <CheckCircle size={12} />
                  Réglée le 08/07/2025
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 text-sm text-green-100">
                <div>
                  <span className="text-green-300 font-medium">Émetteur :</span>{" "}
                  AGRIFRIK SAS — Soubré, Côte d&apos;Ivoire
                </div>
                <div>
                  <span className="text-green-300 font-medium">RCCM :</span>{" "}
                  CI-SOB-2008-B-1142
                </div>
                <div>
                  <span className="text-green-300 font-medium">Client :</span>{" "}
                  Barry Callebaut Manufacturing CI SAS
                </div>
                <div>
                  <span className="text-green-300 font-medium">Adresse :</span>{" "}
                  Zone Industrielle Yopougon
                </div>
                <div>
                  <span className="text-green-300 font-medium">Émission :</span>{" "}
                  22/06/2025
                </div>
                <div>
                  <span className="text-green-300 font-medium">Échéance :</span>{" "}
                  07/07/2025 (J+15)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Montant HT", value: "3 695 800 XOF", sub: "" },
            { label: "TVA", value: "0 XOF", sub: "Exonéré export" },
            { label: "Montant TTC", value: "3 695 800 XOF", sub: "" },
            { label: "Net encaissé", value: "3 677 800 XOF", sub: "Frais bancaires LC : −18 000 XOF" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 font-medium">{k.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{k.value}</p>
              {k.sub && <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>}
            </div>
          ))}
        </div>

        {/* Aperçu facture simulation PDF */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Aperçu facture (simulation PDF)</h2>
          </div>
          <div className="p-6 md:p-10">
            <div
              className="max-w-3xl mx-auto rounded-xl border border-gray-200 p-8 space-y-6"
              style={{ background: "#FDFCF8" }}
            >
              {/* En-tête document */}
              <div className="flex flex-col md:flex-row md:justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-xl font-bold" style={{ color: "#1B5E20" }}>AGRIFRIK SAS</p>
                  <p className="text-xs text-gray-600">Soubré, Côte d&apos;Ivoire</p>
                  <p className="text-xs text-gray-600">RCCM : CI-SOB-2008-B-1142</p>
                  <p className="text-xs text-gray-600">NIF : 1234567A</p>
                  <p className="text-xs text-gray-600">BIC : SGCICIAB</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-lg font-bold text-gray-800">FACTURE N° FAC-2025-008</p>
                  <p className="text-xs text-gray-600">Date d&apos;émission : 22/06/2025</p>
                  <p className="text-xs text-gray-600">Date d&apos;échéance : 07/07/2025</p>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    <CheckCircle size={10} />
                    RÉGLÉE
                  </span>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Facturé à */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Facturé à</p>
                <p className="text-sm font-semibold text-gray-900">Barry Callebaut Manufacturing CI SAS</p>
                <p className="text-xs text-gray-600">Zone Industrielle Yopougon — Abidjan, CI</p>
              </div>

              {/* Tableau lignes */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-gray-200" style={{ background: "#F8FBF8" }}>
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Désignation</th>
                      <th className="text-right py-2 px-3 font-semibold text-gray-700">Qté</th>
                      <th className="text-right py-2 px-3 font-semibold text-gray-700">PU (XOF)</th>
                      <th className="text-right py-2 px-3 font-semibold text-gray-700">Montant (XOF)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 px-3 text-gray-800">
                        <p className="font-medium">Cacao sec fermenté séché Grade AA</p>
                        <p className="text-gray-500 text-[10px]">LOT-2025-041/043/044/046</p>
                      </td>
                      <td className="py-3 px-3 text-right text-gray-700">3 400 kg</td>
                      <td className="py-3 px-3 text-right text-gray-700">1 087</td>
                      <td className="py-3 px-3 text-right font-semibold text-gray-900">3 695 800</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-500 italic text-[10px]">
                        Prime qualité Rainforest Alliance (incluse dans PU)
                      </td>
                      <td className="py-2 px-3 text-right text-gray-400">—</td>
                      <td className="py-2 px-3 text-right text-gray-400">Incluse</td>
                      <td className="py-2 px-3 text-right text-gray-400">—</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-500 italic text-[10px]">
                        Transport DAP San-Pédro
                      </td>
                      <td className="py-2 px-3 text-right text-gray-400">Forfait</td>
                      <td className="py-2 px-3 text-right text-gray-400">—</td>
                      <td className="py-2 px-3 text-right text-gray-400">Inclus</td>
                    </tr>
                    <tr className="bg-gray-50 font-semibold">
                      <td className="py-2 px-3 text-gray-800" colSpan={3}>SOUS-TOTAL HT</td>
                      <td className="py-2 px-3 text-right text-gray-900">3 695 800</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-600 text-[10px]" colSpan={3}>
                        TVA (0% — Exonération art. 344 CGI-CI — Exportation)
                      </td>
                      <td className="py-2 px-3 text-right text-gray-600">0</td>
                    </tr>
                    <tr className="border-t-2 border-gray-300 font-bold">
                      <td className="py-3 px-3 text-gray-900" colSpan={3}>TOTAL TTC</td>
                      <td className="py-3 px-3 text-right text-green-800 text-sm">3 695 800 XOF</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-gray-600">
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Conditions de règlement</p>
                  <p>LC irrévocable SGBCI — Délai 15 jours</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Coordonnées bancaires</p>
                  <p>SGBCI Soubré</p>
                  <p>IBAN : CI093000100794000000001</p>
                  <p>BIC : SGCICIAB</p>
                </div>
              </div>

              {/* Pied */}
              <div className="border-t border-gray-200 pt-4 text-[10px] text-gray-500 text-center">
                Marchandise conforme aux spécifications contractuelles CTR-2025-001. Certification RA : RA-CI-2025-EFA001. BL : MAEU-CI-0908.
              </div>
            </div>
          </div>
        </div>

        {/* Historique des règlements */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Historique des règlements</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#F8FBF8" }}>
                  {["Date", "Description", "Débit", "Crédit", "Solde"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-xs text-gray-500">22/06/2025</td>
                  <td className="px-6 py-3 text-xs text-gray-800">Émission FAC-2025-008</td>
                  <td className="px-6 py-3 text-xs text-gray-400">—</td>
                  <td className="px-6 py-3 text-xs text-gray-400">—</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-900">3 695 800 XOF</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-xs text-gray-500">08/07/2025</td>
                  <td className="px-6 py-3 text-xs text-gray-800">
                    Virement reçu — VIR-SGBCI-2025-07-0908
                  </td>
                  <td className="px-6 py-3 text-xs text-gray-400">—</td>
                  <td className="px-6 py-3 text-xs text-green-700 font-medium">3 695 800</td>
                  <td className="px-6 py-3 text-xs font-medium text-green-700 flex items-center gap-1">
                    0 XOF <CheckCircle size={12} />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-xs text-gray-500">08/07/2025</td>
                  <td className="px-6 py-3 text-xs text-gray-800">Frais bancaires LC déduits</td>
                  <td className="px-6 py-3 text-xs text-red-600 font-medium">18 000</td>
                  <td className="px-6 py-3 text-xs text-gray-400">—</td>
                  <td className="px-6 py-3 text-xs font-medium text-red-600">−18 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Récapitulatif Barry Callebaut 2025 */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">
              Factures Barry Callebaut 2025 — Récapitulatif
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#F8FBF8" }}>
                  {["N° Facture", "Date", "Volume", "Montant TTC", "Statut"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { num: "FAC-2025-001", date: "15/01", vol: "3 200 kg", ttc: "3 478 400", ok: true, current: false },
                  { num: "FAC-2025-002", date: "14/02", vol: "3 400 kg", ttc: "3 695 800", ok: true, current: false },
                  { num: "FAC-2025-003", date: "15/03", vol: "3 200 kg", ttc: "3 478 400", ok: true, current: false },
                  { num: "FAC-2025-004", date: "18/04", vol: "3 600 kg", ttc: "3 913 200", ok: true, current: false },
                  { num: "FAC-2025-005", date: "16/05", vol: "3 400 kg", ttc: "3 695 800", ok: true, current: false },
                  { num: "FAC-2025-006", date: "05/06", vol: "3 400 kg", ttc: "3 695 800", ok: true, current: false },
                  { num: "FAC-2025-007", date: "22/06", vol: "964 kg", ttc: "1 047 768", ok: true, current: false },
                  { num: "FAC-2025-008", date: "22/06", vol: "3 400 kg", ttc: "3 695 800", ok: true, current: true },
                ].map((row) => (
                  <tr
                    key={row.num}
                    className={row.current ? "bg-green-50" : "hover:bg-gray-50"}
                  >
                    <td className={`px-6 py-3 text-xs font-medium ${row.current ? "text-green-800" : "text-gray-800"}`}>
                      {row.num}
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-500">{row.date}</td>
                    <td className="px-6 py-3 text-xs text-gray-700">{row.vol}</td>
                    <td className="px-6 py-3 text-xs font-medium text-gray-900">{row.ttc} XOF</td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-800">
                        <CheckCircle size={9} /> Réglée
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-xs font-medium text-blue-700">FAC-2025-009 (partielle)</td>
                  <td className="px-6 py-3 text-xs text-gray-500">11/07</td>
                  <td className="px-6 py-3 text-xs text-gray-700">3 400 kg</td>
                  <td className="px-6 py-3 text-xs font-medium text-gray-900">3 695 800 XOF</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                      🔵 En cours
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold">
                  <td className="px-6 py-3 text-xs text-gray-800" colSpan={3}>Total facturé BC 2025</td>
                  <td className="px-6 py-3 text-xs font-bold text-gray-900">26 700 968 XOF</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-800">
                      <CheckCircle size={9} /> Total réglé
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/factures"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} />
            Retour aux factures
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white transition-colors" style={{ background: "#2E7D32" }}>
            <Download size={14} />
            Télécharger PDF
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Mail size={14} />
            Envoyer par email
          </button>
        </div>
      </div>
    </div>
  );
}
