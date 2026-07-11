import {
  ArrowLeft,
  FileText,
  Clock,
  Package,
  Truck,
  Tag,
  Brain,
  Send,
  XCircle,
  CheckCircle,
  Mail,
  Paperclip,
  Users,
} from "lucide-react";
import Topbar from "../../../components/Topbar";

export default async function DevisDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar
        title={`Devis ${id}`}
        breadcrumb={["Commerce", "Devis", `Devis ${id}`]}
      />

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-5">

        {/* ── Boutons d'action ── */}
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href="/devis"
            className="flex items-center gap-2 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={15} />
            Retour aux devis
          </a>
          <button className="flex items-center gap-2 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            <CheckCircle size={15} />
            Convertir en facture
          </button>
          <button className="flex items-center gap-2 border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
            <Send size={15} />
            Envoyer relance
          </button>
          <button className="flex items-center gap-2 border border-red-200 text-red-600 rounded-xl px-4 py-2 text-sm hover:bg-red-50 transition-colors">
            <XCircle size={15} />
            Marquer refusé
          </button>
        </div>

        {/* ── Bandeau en-tête ── */}
        <div
          className="rounded-2xl px-6 py-5 text-white space-y-3"
          style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest opacity-70">Devis</p>
              <p className="text-2xl font-extrabold tracking-tight">DEV-2025-012</p>
              <p className="text-sm opacity-80 mt-0.5">Client : Ferrero Trading SA</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "#1565C0", color: "#fff" }}
              >
                🔵 Envoyé — En attente réponse
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm opacity-90">
            <span>
              <span className="opacity-60 mr-1">Date émission :</span>
              <span className="font-semibold">28/06/2025</span>
            </span>
            <span>
              <span className="opacity-60 mr-1">Validité :</span>
              <span className="font-semibold">28/07/2025</span>
            </span>
            <span
              className="font-semibold"
              style={{ color: "#FFD54F" }}
            >
              ⏱ 17 jours restants
            </span>
          </div>
        </div>

        {/* ── 5 KPI ── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            {
              label: "Montant total",
              value: "54 780 000",
              unit: "XOF",
              sub: "≈ 83 534 EUR",
              icon: FileText,
              iconColor: "#1565C0",
              iconBg: "#E3F2FD",
            },
            {
              label: "Produits",
              value: "3",
              unit: "réf.",
              sub: "Cacao · Anacarde · Docs",
              icon: Package,
              iconColor: "#6A1B9A",
              iconBg: "#F3E5F5",
            },
            {
              label: "Délai livraison",
              value: "45",
              unit: "jours",
              sub: "Après acceptation",
              icon: Truck,
              iconColor: "#E65100",
              iconBg: "#FFF3E0",
            },
            {
              label: "Remise accordée",
              value: "2",
              unit: "%",
              sub: "Volume > 40 t",
              icon: Tag,
              iconColor: "#2E7D32",
              iconBg: "#E8F5E9",
            },
            {
              label: "Proba. conversion",
              value: "78",
              unit: "%",
              sub: "Estimation IA",
              icon: Brain,
              iconColor: "#00796B",
              iconBg: "#E0F2F1",
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-2"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: kpi.iconBg }}
              >
                <kpi.icon size={16} style={{ color: kpi.iconColor }} />
              </div>
              <div>
                <p className="text-xs text-gray-400">{kpi.label}</p>
                <p className="text-lg font-bold text-gray-900 leading-tight">
                  {kpi.value}{" "}
                  <span className="text-sm font-semibold text-gray-500">{kpi.unit}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{kpi.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Aperçu document (papier simulé) ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-7">
          {/* En-tête document */}
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <p className="text-xl font-extrabold text-gray-900">AGRIFRIK SAS</p>
              <p className="text-sm text-gray-500 mt-1">Zone Soubré Nord, Région de la Nawa</p>
              <p className="text-sm text-gray-500">Côte d'Ivoire</p>
              <p className="text-sm text-gray-500">RCCM : CI-SOB-2008-B-1142</p>
            </div>
            <div className="text-right">
              <p
                className="text-2xl font-extrabold tracking-wide"
                style={{ color: "#2E7D32" }}
              >
                DEVIS
              </p>
              <p className="text-sm font-mono font-semibold text-gray-800 mt-1">
                N° DEV-2025-012
              </p>
              <p className="text-sm text-gray-500 mt-1">Date : 28/06/2025</p>
              <p className="text-sm text-gray-500">Validité : 28/07/2025</p>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Destinataire */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Destinataire
            </p>
            <div className="rounded-xl p-4" style={{ background: "#F8FBF8" }}>
              <p className="font-bold text-gray-900">Ferrero Trading SA</p>
              <p className="text-sm text-gray-500 mt-0.5">Via Pietro Ferrero 1</p>
              <p className="text-sm text-gray-500">12051 Alba (CN), Italie</p>
              <p className="text-sm text-gray-500 mt-1">
                Réf. client :{" "}
                <span className="font-mono text-gray-700">FT-CI-2025-AGRI</span>
              </p>
            </div>
          </div>

          {/* Tableau lignes devis */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#F8FBF8" }}>
                  {["#", "Désignation", "Qté", "Unité", "PU (XOF)", "Remise", "Total HT (XOF)"].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left text-gray-500 font-semibold px-3 py-3 whitespace-nowrap first:rounded-l-xl last:rounded-r-xl"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    num: 1,
                    designation:
                      "Cacao naturel fermenté séché Grade AA — ICCO 1801.00 — Certifié RA & FCPR — Incoterm FOB San-Pédro",
                    qte: "44 000",
                    unite: "kg",
                    pu: "1 100",
                    remise: "2%",
                    total: "47 432 000",
                  },
                  {
                    num: 2,
                    designation:
                      "Anacarde WW240 (noix de cajou) — Récolte 2025 — Incoterm FOB San-Pédro",
                    qte: "7 200",
                    unite: "kg",
                    pu: "950",
                    remise: "2%",
                    total: "6 703 200",
                  },
                  {
                    num: 3,
                    designation:
                      "Frais documentation export (certificats, DAE, BL, consularisation)",
                    qte: "1",
                    unite: "forfait",
                    pu: "700 000",
                    remise: "0%",
                    total: "700 000",
                  },
                ].map((line) => (
                  <tr key={line.num} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 text-gray-400 font-medium">{line.num}</td>
                    <td className="px-3 py-3 text-gray-800 leading-snug max-w-xs">{line.designation}</td>
                    <td className="px-3 py-3 text-gray-700 tabular-nums text-right">{line.qte}</td>
                    <td className="px-3 py-3 text-gray-500">{line.unite}</td>
                    <td className="px-3 py-3 text-gray-700 tabular-nums text-right">{line.pu}</td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
                        style={{ background: line.remise === "0%" ? "#F5F5F5" : "#E8F5E9", color: line.remise === "0%" ? "#9E9E9E" : "#2E7D32" }}
                      >
                        {line.remise}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-semibold text-gray-900 tabular-nums text-right">
                      {line.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totaux */}
          <div className="flex justify-end">
            <div className="w-96 space-y-1">
              {[
                { label: "SOUS-TOTAL HT", value: "54 835 200 XOF", bold: false },
                { label: "Remise volume (2% sur lignes 1+2)", value: "−1 082 700 XOF", bold: false, accent: true },
                { label: "TOTAL NET HT", value: "53 752 500 XOF", bold: true },
                { label: "TVA 18% (exonéré export)", value: "0 XOF", bold: false },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`flex justify-between text-sm py-2 border-b border-gray-100 ${row.bold ? "font-bold text-gray-900" : "text-gray-600"}`}
                >
                  <span>{row.label}</span>
                  <span className={`tabular-nums ${row.accent ? "text-red-600" : ""}`}>{row.value}</span>
                </div>
              ))}
              <div
                className="flex justify-between text-base font-bold py-3 px-4 rounded-xl mt-2"
                style={{ background: "#E8F5E9", color: "#2E7D32" }}
              >
                <span>TOTAL TTC</span>
                <span className="tabular-nums">53 752 500 XOF</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 px-4 pt-1">
                <span>Équivalent EUR (655,96 XOF/EUR)</span>
                <span className="tabular-nums font-semibold text-gray-700">81 969 EUR</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Conditions */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Conditions commerciales
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {[
                ["Incoterm", "FOB San-Pédro, Côte d'Ivoire"],
                ["Paiement", "Lettre de crédit irrévocable SWIFT, BNP Paribas Italie"],
                ["Port d'embarquement", "San-Pédro, CI"],
                ["Port de destination", "Livourne (Livorno), Italie"],
                ["Humidité garantie", "≤ 7,5%"],
                ["Grade garanti", "AA (≥ 94% fèves brunes au cut test)"],
                [
                  "Certificats inclus",
                  "Origine CI (BCC), Phytosanitaire (MINADER), RA, FCPR",
                ],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-2 text-sm">
                  <span className="text-gray-400 min-w-[140px] flex-shrink-0">{key} :</span>
                  <span className="text-gray-800 font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Suivi commercial ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Timeline */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
            <p className="font-semibold text-gray-800 flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              Timeline commerciale
            </p>
            <ol className="relative border-l border-gray-200 pl-5 space-y-4">
              {[
                {
                  date: "20/06",
                  title: "Réunion Ferrero Procurement (visioconférence)",
                  desc: "Présentation catalogue AGRIFRIK 2025",
                  done: true,
                },
                {
                  date: "25/06",
                  title: "Demande de devis formelle reçue",
                  desc: "Email Matteo Rossi, Ferrero Trading",
                  done: true,
                },
                {
                  date: "28/06",
                  title: "Devis DEV-2025-012 envoyé",
                  desc: "PDF + email",
                  done: true,
                },
                {
                  date: "05/07",
                  title: "Relance automatique envoyée",
                  desc: "",
                  done: true,
                },
                {
                  date: "11/07",
                  title: "Statut : En attente",
                  desc: "Ferrero en période de révision budgétaire",
                  done: false,
                },
              ].map((step, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white"
                    style={{ background: step.done ? "#2E7D32" : "#BDBDBD" }}
                  />
                  <div className="flex items-start gap-2">
                    <span
                      className="text-xs font-mono font-bold mt-0.5 min-w-[38px]"
                      style={{ color: "#2E7D32" }}
                    >
                      {step.date}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{step.title}</p>
                      {step.desc && (
                        <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-5">
            {/* Correspondances */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                Correspondances
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#F8FBF8" }}>
                      {["Date", "De / À", "Objet", "P.J."].map((col) => (
                        <th
                          key={col}
                          className="text-left text-gray-400 font-semibold px-3 py-2 text-xs first:rounded-l-lg last:rounded-r-lg"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      {
                        date: "20/06",
                        de: "Ferrero → AGRIFRIK",
                        objet: "Interesse per cacao CI Grade AA — Campagna 2025",
                        pj: "—",
                      },
                      {
                        date: "28/06",
                        de: "AGRIFRIK → Ferrero",
                        objet: "Devis DEV-2025-012 + Catalogue + Certificats",
                        pj: "3 PDF",
                      },
                      {
                        date: "05/07",
                        de: "AGRIFRIK → Ferrero",
                        objet: "Relance devis",
                        pj: "—",
                      },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-2.5 text-gray-400 font-mono text-xs">{row.date}</td>
                        <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.de}</td>
                        <td className="px-3 py-2.5 text-gray-600 text-xs leading-snug">{row.objet}</td>
                        <td className="px-3 py-2.5">
                          {row.pj !== "—" ? (
                            <span className="flex items-center gap-1 text-xs text-blue-600">
                              <Paperclip size={11} />
                              {row.pj}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Concurrence */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                Analyse concurrentielle
              </p>
              <div
                className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "#FFF3E0", borderLeft: "3px solid #E65100" }}
              >
                <p className="font-medium text-gray-800">
                  2 autres fournisseurs CI sollicités par Ferrero
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Source : Ferrero Procurement (information communiquée en réunion du 20/06)
                </p>
              </div>
              <div
                className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "#E8F5E9", borderLeft: "3px solid #2E7D32" }}
              >
                <p className="font-medium text-gray-800">
                  Avantage compétitif AGRIFRIK
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Certifications RA + FCPR · Traçabilité Hyperledger (Ferrero Cocoa Charter) · Grade AA garanti
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
