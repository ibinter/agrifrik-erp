"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { BookOpen, TrendingUp, BarChart2, FileText, Plus, ExternalLink } from "lucide-react";

// ─── KPI ────────────────────────────────────────────────────────────────────
const kpis = [
  { label: "Exercice", value: "2025", accent: "#374151", bg: "#F3F4F6", icon: BookOpen },
  { label: "Écritures S1", value: "2 847", accent: "#1565C0", bg: "#E3F2FD", icon: BarChart2 },
  { label: "CA comptabilisé", value: "145,2 M XOF", accent: "#2E7D32", bg: "#E8F5E9", icon: TrendingUp },
  { label: "Résultat provisoire", value: "+37,2 M XOF", accent: "#6A1B9A", bg: "#F3E5F5", icon: FileText },
];

// ─── JOURNAL ─────────────────────────────────────────────────────────────────
const journalEntries = [
  { num: "J-2025-0847", date: "09/07", compteD: "411 Clients", compteC: "701 Ventes", libelle: "Vente cacao Barry Callebaut", montant: "2 880 000", piece: "FAC-341" },
  { num: "J-2025-0846", date: "09/07", compteD: "512 Banque", compteC: "411 Clients", libelle: "Règlement CMD-2025-038", montant: "2 192 250", piece: "VIR-482" },
  { num: "J-2025-0845", date: "08/07", compteD: "641 Charges personnel", compteC: "421 Dettes personnel", libelle: "Salaires juillet 2025", montant: "42 350 000", piece: "PAI-287" },
  { num: "J-2025-0844", date: "08/07", compteD: "401 Fournisseurs", compteC: "512 Banque", libelle: "Règlement YARA Nederland", montant: "8 122 400", piece: "VIR-481" },
  { num: "J-2025-0843", date: "07/07", compteD: "601 Achats marchandises", compteC: "401 Fournisseurs", libelle: "Achat engrais YARA", montant: "8 122 400", piece: "BC-042" },
  { num: "J-2025-0842", date: "07/07", compteD: "411 Clients", compteC: "701 Ventes", libelle: "Vente anacarde CMD-2025-038", montant: "2 192 250", piece: "FAC-340" },
  { num: "J-2025-0841", date: "05/07", compteD: "622 Locations", compteC: "512 Banque", libelle: "Loyer fermage Q2 (5 baux)", montant: "1 986 250", piece: "BK-227" },
  { num: "J-2025-0840", date: "03/07", compteD: "164 Emprunts", compteC: "512 Banque", libelle: "Remboursement emprunt SGBCI", montant: "4 800 000", piece: "VIR-480" },
  { num: "J-2025-0839", date: "01/07", compteD: "512 Banque", compteC: "756 Produits divers", libelle: "Cotisations coopérative Q2", montant: "3 500 000", piece: "VIR-479" },
  { num: "J-2025-0838", date: "30/06", compteD: "601 Achats marchandises", compteC: "401 Fournisseurs", libelle: "Achat semences campagne 2025", montant: "2 450 000", piece: "BC-041" },
];

// ─── BALANCE ─────────────────────────────────────────────────────────────────
const balanceClasses = [
  { classe: "Classe 1", libelle: "Capitaux propres", debit: "0", credit: "486 200 000", solde: "486 200 000 Cr" },
  { classe: "Classe 2", libelle: "Actifs immobilisés", debit: "312 400 000", credit: "48 600 000", solde: "263 800 000 Dt" },
  { classe: "Classe 3", libelle: "Stocks", debit: "182 300 000", credit: "0", solde: "182 300 000 Dt" },
  { classe: "Classe 4", libelle: "Tiers (Clients / Fournisseurs)", debit: "94 200 000", credit: "68 100 000", solde: "26 100 000 Dt" },
  { classe: "Classe 5", libelle: "Trésorerie", debit: "34 220 000", credit: "0", solde: "34 220 000 Dt" },
  { classe: "Classe 6", libelle: "Charges exploitation", debit: "108 000 000", credit: "0", solde: "108 000 000 Dt" },
  { classe: "Classe 7", libelle: "Produits", debit: "0", credit: "145 200 000", solde: "145 200 000 Cr" },
];

const totalDebit = "731 120 000";
const totalCredit = "748 100 000";

// ─── ÉTATS FINANCIERS ────────────────────────────────────────────────────────
const etats = [
  {
    titre: "Bilan",
    desc: "Actif / Passif au 09/07/2025",
    items: ["Actif total : 1,24 Mds XOF", "Capitaux propres : 486,2 M XOF", "Dettes financières : 312,4 M XOF"],
    href: "/bilan",
    accent: "#1565C0",
    bg: "#E3F2FD",
  },
  {
    titre: "Compte de résultat",
    desc: "Produits / Charges S1 2025",
    items: ["CA : 145,2 M XOF", "Charges exploitation : 108,0 M XOF", "Résultat provisoire : +37,2 M XOF"],
    href: "/compte-resultat",
    accent: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    titre: "Tableau flux trésorerie",
    desc: "Flux de trésorerie",
    items: ["Trésorerie début : 168 M XOF", "Flux exploitation : +82 M XOF", "Trésorerie fin : 34,2 M XOF"],
    href: "/flux-tresorerie",
    accent: "#E65100",
    bg: "#FFF3E0",
  },
  {
    titre: "Rapport annuel",
    desc: "Exercice 2024 — Archivé",
    items: ["CA 2024 : 862 M XOF", "Résultat net : 94,5 M XOF", "Charges : 748 M XOF"],
    href: "/rapport-annuel",
    accent: "#6A1B9A",
    bg: "#F3E5F5",
  },
];

// ─── TABS ────────────────────────────────────────────────────────────────────
const TABS = ["Journal", "Grand Livre", "Balance", "États financiers"] as const;
type Tab = typeof TABS[number];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function ComptabilitePage() {
  const [tab, setTab] = useState<Tab>("Journal");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Comptabilité" breadcrumb={["Finance", "Comptabilité"]} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Comptabilité SYSCOHADA Révisé</h1>
            <p className="text-sm text-gray-500 mt-0.5">Plan Comptable OHADA · AUDCIF 2017 · Exercice 2025</p>
          </div>
          <button
            style={{ backgroundColor: "#2E7D32" }}
            className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow hover:opacity-90 transition"
          >
            <Plus size={16} />
            Nouvelle écriture
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{k.label}</span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: k.bg }}>
                    <Icon size={18} style={{ color: k.accent }} />
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900">{k.value}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs nav */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── TAB: JOURNAL ─────────────────────────────────────────────── */}
        {tab === "Journal" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Journal général</h2>
              <p className="text-xs text-gray-400 mt-0.5">10 dernières écritures — Conforme SYSCOHADA Révisé</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    {["N°", "Date", "Compte débit", "Compte crédit", "Libellé", "Montant (XOF)", "Pièce"].map((h) => (
                      <th key={h} className={`px-4 py-3 font-medium ${h === "Montant (XOF)" ? "text-right" : "text-left"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {journalEntries.map((e) => (
                    <tr key={e.num} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{e.num}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{e.date}</td>
                      <td className="px-4 py-3 text-xs text-blue-700 whitespace-nowrap">{e.compteD}</td>
                      <td className="px-4 py-3 text-xs text-green-700 whitespace-nowrap">{e.compteC}</td>
                      <td className="px-4 py-3 text-xs text-gray-800">{e.libelle}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-right text-gray-900 whitespace-nowrap">{e.montant}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-400 whitespace-nowrap">{e.piece}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: GRAND LIVRE ─────────────────────────────────────────── */}
        {tab === "Grand Livre" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Grand Livre</h2>
            <p className="text-xs text-gray-400 mb-6">Détail des mouvements par compte · Au 09/07/2025</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { compte: "411 – Clients", debit: "10 264 500", credit: "2 192 250", solde: "8 072 250 Dt", color: "#1565C0" },
                { compte: "512 – Banque SGBCI", debit: "20 500 000", credit: "56 272 400", solde: "28 450 000 Cr*", color: "#2E7D32" },
                { compte: "601 – Achats marchandises", debit: "10 572 400", credit: "0", solde: "10 572 400 Dt", color: "#D32F2F" },
                { compte: "641 – Charges de personnel", debit: "42 350 000", credit: "0", solde: "42 350 000 Dt", color: "#D32F2F" },
                { compte: "701 – Ventes", debit: "0", credit: "5 072 250", solde: "5 072 250 Cr", color: "#2E7D32" },
                { compte: "401 – Fournisseurs", debit: "8 122 400", credit: "10 572 400", solde: "2 450 000 Cr", color: "#6A1B9A" },
              ].map((c) => (
                <div key={c.compte} className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-3">{c.compte}</p>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Débit</span><span className="font-mono">{c.debit} XOF</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Crédit</span><span className="font-mono">{c.credit} XOF</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between text-xs font-bold">
                    <span>Solde</span>
                    <span style={{ color: c.color }}>{c.solde}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: BALANCE ─────────────────────────────────────────────── */}
        {tab === "Balance" && (
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Balance des comptes</h2>
              <p className="text-xs text-gray-400 mt-0.5">Au 09/07/2025 · Classement SYSCOHADA par classe</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    {["Classe", "Intitulé", "Total débit (XOF)", "Total crédit (XOF)", "Solde"].map((h) => (
                      <th key={h} className={`px-4 py-3 font-medium ${h.includes("débit") || h.includes("crédit") || h === "Solde" ? "text-right" : "text-left"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {balanceClasses.map((b) => (
                    <tr key={b.classe} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-semibold text-gray-700 text-xs">{b.classe}</td>
                      <td className="px-4 py-3 text-gray-800 text-xs">{b.libelle}</td>
                      <td className="px-4 py-3 text-right text-xs font-mono text-blue-700">{b.debit === "0" ? "—" : b.debit}</td>
                      <td className="px-4 py-3 text-right text-xs font-mono text-green-700">{b.credit === "0" ? "—" : b.credit}</td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-gray-800">{b.solde}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-bold text-xs border-t-2 border-gray-200">
                    <td className="px-4 py-3 text-gray-700" colSpan={2}>Totaux</td>
                    <td className="px-4 py-3 text-right text-blue-700">{totalDebit}</td>
                    <td className="px-4 py-3 text-right text-green-700">{totalCredit}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>
                        Écart : 16 980 000
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: ÉTATS FINANCIERS ────────────────────────────────────── */}
        {tab === "États financiers" && (
          <div>
            <h2 className="text-base font-semibold text-gray-800 mb-4">États financiers · Exercice 2025</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {etats.map((e) => (
                <div key={e.titre} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{e.titre}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{e.desc}</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: e.bg }}>
                      <FileText size={16} style={{ color: e.accent }} />
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {e.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: e.accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={e.href}
                    className="mt-auto flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: e.accent }}
                  >
                    Voir complet
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
