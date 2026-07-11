"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "journaux" | "balance" | "grandlivre" | "plancomptable";
type JournalFilter = "Tous" | "VTE" | "ACH" | "BNQ" | "CAI" | "OD";
type ClasseFilter = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

// ─── Journaux ─────────────────────────────────────────────────────────────────
const journalEntries = [
  { date: "10/07", piece: "FAC-2025-048", journal: "VTE", compteD: "411000 Clients", libelle: "Vente cacao — Barry Callebaut LOT-045", debit: 27_390_000, compteC: "701000 Ventes cacao", credit: 27_390_000 },
  { date: "08/07", piece: "ACH-2025-088", journal: "ACH", compteD: "601000 Achats intrants", libelle: "Livraison KCl 4t — SCPA", debit: 2_400_000, compteC: "401000 Fournisseurs", credit: 2_400_000 },
  { date: "07/07", piece: "BNQ-2025-147", journal: "BNQ", compteD: "521000 BICICI", libelle: "Encaissement client Olam", debit: 18_240_000, compteC: "411000 Clients", credit: 18_240_000 },
  { date: "05/07", piece: "BNQ-2025-146", journal: "BNQ", compteD: "641000 Salaires", libelle: "Virement salaires Juin 2025", debit: 3_840_000, compteC: "521000 BICICI", credit: 3_840_000 },
  { date: "01/07", piece: "OD-2025-028", journal: "OD", compteD: "681000 Amortissements", libelle: "Dotation amort. Juin 2025", debit: 1_533_000, compteC: "281000 Amort. Immo", credit: 1_533_000 },
  { date: "30/06", piece: "FAC-2025-047", journal: "VTE", compteD: "411000 Clients", libelle: "Vente cacao — Nestlé LOT-046", debit: 32_818_000, compteC: "701000 Ventes", credit: 32_818_000 },
  { date: "28/06", piece: "BNQ-2025-145", journal: "BNQ", compteD: "521000 BICICI", libelle: "Paiement prime RA coop.", debit: 4_200_000, compteC: "411100 Coop.", credit: 4_200_000 },
  { date: "25/06", piece: "ACH-2025-085", journal: "ACH", compteD: "601000 Achats intrants", libelle: "Engrais YARA 2t", debit: 1_840_000, compteC: "401000 Fournisseurs", credit: 1_840_000 },
  { date: "20/06", piece: "CAI-2025-042", journal: "CAI", compteD: "531000 Caisse Soubré", libelle: "Frais déplacement terrain", debit: 240_000, compteC: "625000 Déplacements", credit: 240_000 },
  { date: "15/06", piece: "FAC-2025-044", journal: "VTE", compteD: "411000 Clients", libelle: "Vente anacarde — Olam LOT-038", debit: 18_400_000, compteC: "702000 Ventes anacarde", credit: 18_400_000 },
  { date: "10/06", piece: "BNQ-2025-140", journal: "BNQ", compteD: "521000 BICICI", libelle: "Remboursement emprunt BIC", debit: 2_000_000, compteC: "161000 Emprunts", credit: 2_000_000 },
  { date: "05/06", piece: "OD-2025-025", journal: "OD", compteD: "681000 Amortissements", libelle: "Dotation amort. Mai 2025", debit: 1_533_000, compteC: "281000 Amort. Immo", credit: 1_533_000 },
  { date: "02/06", piece: "ACH-2025-079", journal: "ACH", compteD: "601000 Achats intrants", libelle: "Semences certifiées ANADER", debit: 980_000, compteC: "401000 Fournisseurs", credit: 980_000 },
  { date: "28/05", piece: "BNQ-2025-136", journal: "BNQ", compteD: "741000 Subventions", libelle: "Réception subvention AFD Tranche 2", debit: 12_100_000, compteC: "521000 BICICI", credit: 12_100_000 },
  { date: "15/05", piece: "FAC-2025-038", journal: "VTE", compteD: "411000 Clients", libelle: "Vente cacao — Barry Callebaut LOT-040", debit: 24_600_000, compteC: "701000 Ventes cacao", credit: 24_600_000 },
];

// ─── Balance ──────────────────────────────────────────────────────────────────
const balanceData = [
  // Classe 1
  { compte: "101000", intitule: "Capital social", classe: "1", debit: 0, credit: 50_000_000, soldeDt: 0, soldeCr: 50_000_000 },
  { compte: "111000", intitule: "Réserves légales", classe: "1", debit: 0, credit: 4_200_000, soldeDt: 0, soldeCr: 4_200_000 },
  { compte: "121000", intitule: "Report à nouveau", classe: "1", debit: 0, credit: 18_200_000, soldeDt: 0, soldeCr: 18_200_000 },
  { compte: "161000", intitule: "Emprunts BIC", classe: "1", debit: 0, credit: 24_000_000, soldeDt: 0, soldeCr: 24_000_000 },
  // Classe 2
  { compte: "221000", intitule: "Terres et terrains", classe: "2", debit: 42_000_000, credit: 0, soldeDt: 42_000_000, soldeCr: 0 },
  { compte: "231000", intitule: "Bâtiments", classe: "2", debit: 18_400_000, credit: 0, soldeDt: 18_400_000, soldeCr: 0 },
  { compte: "241000", intitule: "Matériels & outillage", classe: "2", debit: 68_200_000, credit: 0, soldeDt: 68_200_000, soldeCr: 0 },
  { compte: "281000", intitule: "Amortissements", classe: "2", debit: 0, credit: 28_400_000, soldeDt: 0, soldeCr: 28_400_000 },
  // Classe 3
  { compte: "311000", intitule: "Cacao en stock", classe: "3", debit: 18_420_000, credit: 0, soldeDt: 18_420_000, soldeCr: 0 },
  { compte: "321000", intitule: "Intrants en stock", classe: "3", debit: 6_840_000, credit: 0, soldeDt: 6_840_000, soldeCr: 0 },
  // Classe 4
  { compte: "401000", intitule: "Fournisseurs", classe: "4", debit: 0, credit: 8_240_000, soldeDt: 0, soldeCr: 8_240_000 },
  { compte: "411000", intitule: "Clients", classe: "4", debit: 24_600_000, credit: 0, soldeDt: 24_600_000, soldeCr: 0 },
  { compte: "421000", intitule: "Personnel", classe: "4", debit: 0, credit: 3_840_000, soldeDt: 0, soldeCr: 3_840_000 },
  { compte: "431000", intitule: "CNPS", classe: "4", debit: 0, credit: 1_240_000, soldeDt: 0, soldeCr: 1_240_000 },
  { compte: "441000", intitule: "État — impôts", classe: "4", debit: 0, credit: 2_840_000, soldeDt: 0, soldeCr: 2_840_000 },
  // Classe 5
  { compte: "521000", intitule: "BICICI c/c", classe: "5", debit: 34_200_000, credit: 0, soldeDt: 34_200_000, soldeCr: 0 },
  { compte: "531000", intitule: "Caisse Soubré", classe: "5", debit: 1_240_000, credit: 0, soldeDt: 1_240_000, soldeCr: 0 },
  { compte: "532000", intitule: "Orange Money CI", classe: "5", debit: 480_000, credit: 0, soldeDt: 480_000, soldeCr: 0 },
  // Classe 6
  { compte: "601000", intitule: "Achats intrants", classe: "6", debit: 29_400_000, credit: 0, soldeDt: 29_400_000, soldeCr: 0 },
  { compte: "641000", intitule: "Salaires", classe: "6", debit: 21_200_000, credit: 0, soldeDt: 21_200_000, soldeCr: 0 },
  { compte: "681000", intitule: "Dotations amort.", classe: "6", debit: 9_200_000, credit: 0, soldeDt: 9_200_000, soldeCr: 0 },
  // Classe 7
  { compte: "701000", intitule: "Ventes cacao", classe: "7", debit: 0, credit: 101_200_000, soldeDt: 0, soldeCr: 101_200_000 },
  { compte: "702000", intitule: "Ventes anacarde", classe: "7", debit: 0, credit: 31_400_000, soldeDt: 0, soldeCr: 31_400_000 },
  { compte: "703000", intitule: "Subventions", classe: "7", debit: 0, credit: 24_200_000, soldeDt: 0, soldeCr: 24_200_000 },
];

// ─── Grand Livre (compte 411000) ──────────────────────────────────────────────
const grandLivreEntries = [
  { date: "01/01", piece: "OD-2025-001", libelle: "À-nouveau 2024", debit: 8_400_000, credit: 0, solde: 8_400_000 },
  { date: "15/01", piece: "FAC-2025-001", libelle: "Vente LOT-2024-042 Barry Callebaut", debit: 12_840_000, credit: 0, solde: 21_240_000 },
  { date: "20/01", piece: "BNQ-2025-002", libelle: "Encaissement Barry Callebaut", debit: 0, credit: 12_840_000, solde: 8_400_000 },
  { date: "10/02", piece: "FAC-2025-008", libelle: "Vente cacao LOT-028 Nestlé", debit: 24_200_000, credit: 0, solde: 32_600_000 },
  { date: "25/02", piece: "BNQ-2025-015", libelle: "Encaissement Nestlé", debit: 0, credit: 24_200_000, solde: 8_400_000 },
  { date: "15/03", piece: "FAC-2025-018", libelle: "Vente anacarde Olam LOT-012", debit: 18_400_000, credit: 0, solde: 26_800_000 },
  { date: "28/03", piece: "BNQ-2025-025", libelle: "Encaissement Olam", debit: 0, credit: 18_400_000, solde: 8_400_000 },
  { date: "12/04", piece: "FAC-2025-028", libelle: "Vente cacao LOT-033 Barry Callebaut", debit: 27_390_000, credit: 0, solde: 35_790_000 },
  { date: "30/04", piece: "BNQ-2025-038", libelle: "Encaissement Barry Callebaut partiel", debit: 0, credit: 18_000_000, solde: 17_790_000 },
  { date: "15/05", piece: "FAC-2025-038", libelle: "Vente cacao LOT-040", debit: 24_600_000, credit: 0, solde: 42_390_000 },
  { date: "20/05", piece: "BNQ-2025-060", libelle: "Encaissement LOT-033 solde", debit: 0, credit: 9_390_000, solde: 33_000_000 },
  { date: "10/06", piece: "FAC-2025-044", libelle: "Vente anacarde Olam LOT-038", debit: 18_400_000, credit: 0, solde: 51_400_000 },
  { date: "20/06", piece: "BNQ-2025-120", libelle: "Encaissement LOT-040 + LOT-038", debit: 0, credit: 43_000_000, solde: 8_400_000 },
  { date: "07/07", piece: "BNQ-2025-147", libelle: "Encaissement Olam (partiel)", debit: 0, credit: 18_240_000, solde: -9_840_000 },
  { date: "30/06", piece: "FAC-2025-047", libelle: "Vente LOT-046 Nestlé", debit: 32_818_000, credit: 0, solde: 24_600_000 },
];

// ─── Plan comptable ───────────────────────────────────────────────────────────
const planComptable: Record<string, { num: string; intitule: string; utilise: boolean; solde: string }[]> = {
  "1": [
    { num: "101000", intitule: "Capital social", utilise: true, solde: "50 000 000 Cr" },
    { num: "111000", intitule: "Réserves légales", utilise: true, solde: "4 200 000 Cr" },
    { num: "121000", intitule: "Report à nouveau", utilise: true, solde: "18 200 000 Cr" },
    { num: "131000", intitule: "Résultat de l'exercice", utilise: false, solde: "—" },
    { num: "141000", intitule: "Subventions d'équipement", utilise: false, solde: "—" },
    { num: "151000", intitule: "Provisions réglementées", utilise: false, solde: "—" },
    { num: "161000", intitule: "Emprunts à LT", utilise: true, solde: "24 000 000 Cr" },
    { num: "162000", intitule: "Crédits de campagne", utilise: false, solde: "—" },
    { num: "181000", intitule: "Comptes de liaison", utilise: false, solde: "—" },
  ],
  "2": [
    { num: "211000", intitule: "Frais d'établissement", utilise: false, solde: "—" },
    { num: "221000", intitule: "Terres et terrains", utilise: true, solde: "42 000 000 Dt" },
    { num: "231000", intitule: "Bâtiments sur sol propre", utilise: true, solde: "18 400 000 Dt" },
    { num: "241000", intitule: "Matériels & outillage", utilise: true, solde: "68 200 000 Dt" },
    { num: "244000", intitule: "Matériels de transport", utilise: false, solde: "—" },
    { num: "248000", intitule: "Autres immobilisations corp.", utilise: false, solde: "—" },
    { num: "281000", intitule: "Amort. frais d'établ.", utilise: true, solde: "28 400 000 Cr" },
  ],
  "3": [
    { num: "311000", intitule: "Marchandises (cacao)", utilise: true, solde: "18 420 000 Dt" },
    { num: "312000", intitule: "Marchandises (anacarde)", utilise: false, solde: "—" },
    { num: "321000", intitule: "Matières premières (intrants)", utilise: true, solde: "6 840 000 Dt" },
    { num: "331000", intitule: "Produits en cours", utilise: false, solde: "—" },
    { num: "381000", intitule: "Marchandises en transit", utilise: false, solde: "—" },
  ],
  "4": [
    { num: "401000", intitule: "Fournisseurs, dettes en compte", utilise: true, solde: "8 240 000 Cr" },
    { num: "411000", intitule: "Clients, créances en compte", utilise: true, solde: "24 600 000 Dt" },
    { num: "421000", intitule: "Personnel, avances et acomptes", utilise: true, solde: "3 840 000 Cr" },
    { num: "431000", intitule: "Organismes sociaux (CNPS)", utilise: true, solde: "1 240 000 Cr" },
    { num: "441000", intitule: "État, impôts et taxes", utilise: true, solde: "2 840 000 Cr" },
    { num: "471000", intitule: "Débiteurs divers", utilise: false, solde: "—" },
  ],
  "5": [
    { num: "521000", intitule: "Banque BICICI c/c", utilise: true, solde: "34 200 000 Dt" },
    { num: "522000", intitule: "Banque SGBCI c/c", utilise: false, solde: "—" },
    { num: "531000", intitule: "Caisse Soubré", utilise: true, solde: "1 240 000 Dt" },
    { num: "532000", intitule: "Orange Money CI", utilise: true, solde: "480 000 Dt" },
  ],
  "6": [
    { num: "601000", intitule: "Achats marchandises (intrants)", utilise: true, solde: "29 400 000 Dt" },
    { num: "602000", intitule: "Achats matières premières", utilise: false, solde: "—" },
    { num: "621000", intitule: "Sous-traitance générale", utilise: false, solde: "—" },
    { num: "641000", intitule: "Rémunérations du personnel", utilise: true, solde: "21 200 000 Dt" },
    { num: "661000", intitule: "Charges d'intérêts", utilise: false, solde: "—" },
    { num: "681000", intitule: "Dotations amortissements", utilise: true, solde: "9 200 000 Dt" },
  ],
  "7": [
    { num: "701000", intitule: "Ventes cacao", utilise: true, solde: "101 200 000 Cr" },
    { num: "702000", intitule: "Ventes anacarde", utilise: true, solde: "31 400 000 Cr" },
    { num: "703000", intitule: "Subventions d'exploitation", utilise: true, solde: "24 200 000 Cr" },
    { num: "704000", intitule: "Ventes vivrières", utilise: false, solde: "—" },
    { num: "756000", intitule: "Produits divers", utilise: false, solde: "—" },
  ],
  "8": [
    { num: "801000", intitule: "Résultat d'exploitation", utilise: false, solde: "—" },
    { num: "802000", intitule: "Résultat hors activités ordinaires", utilise: false, solde: "—" },
    { num: "891000", intitule: "Impôt sur le bénéfice (BIC)", utilise: false, solde: "—" },
  ],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtXOF(n: number) {
  if (n === 0) return "—";
  return n.toLocaleString("fr-FR");
}

const journalBadge: Record<string, string> = {
  VTE: "bg-emerald-100 text-emerald-700",
  ACH: "bg-orange-100 text-orange-700",
  BNQ: "bg-blue-100 text-blue-700",
  CAI: "bg-yellow-100 text-yellow-700",
  OD:  "bg-purple-100 text-purple-700",
};

const classeLabels: Record<string, string> = {
  "1": "Classe 1 — Ressources durables",
  "2": "Classe 2 — Actif immobilisé",
  "3": "Classe 3 — Stocks",
  "4": "Classe 4 — Tiers",
  "5": "Classe 5 — Trésorerie",
  "6": "Classe 6 — Charges",
  "7": "Classe 7 — Produits",
  "8": "Classe 8 — Résultats",
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ComptabilitePage() {
  const [tab, setTab] = useState<Tab>("journaux");
  const [journalFilter, setJournalFilter] = useState<JournalFilter>("Tous");
  const [classeFilter, setClasseFilter] = useState<ClasseFilter>("1");
  const [glSearch, setGlSearch] = useState("411000 Clients");

  const tabs: { id: Tab; label: string }[] = [
    { id: "journaux", label: "Journaux" },
    { id: "balance", label: "Balance" },
    { id: "grandlivre", label: "Grand Livre" },
    { id: "plancomptable", label: "Plan comptable" },
  ];

  const journalFilters: JournalFilter[] = ["Tous", "VTE", "ACH", "BNQ", "CAI", "OD"];

  const filteredEntries =
    journalFilter === "Tous"
      ? journalEntries
      : journalEntries.filter((e) => e.journal === journalFilter);

  const totalDebit = balanceData.reduce((a, r) => a + r.debit, 0);
  const totalCredit = balanceData.reduce((a, r) => a + r.credit, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Comptabilité SYSCOHADA" breadcrumb={["Finance", "Comptabilité"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Exercice", val: "2025", color: "text-gray-800 dark:text-white" },
            { label: "Dernière clôture", val: "30/06/2025", color: "text-blue-600 dark:text-blue-400" },
            { label: "Écritures saisies", val: "1 247", color: "text-[#2E7D32]" },
            { label: "Balance vérifiée", val: "✅ Équilibrée", color: "text-emerald-600" },
          ].map((k) => (
            <div key={k.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{k.label}</p>
              <p className={`mt-1 text-xl font-bold ${k.color}`}>{k.val}</p>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                tab === t.id
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── JOURNAUX ── */}
        {tab === "journaux" && (
          <div className="space-y-4">
            {/* Filtre journal */}
            <div className="flex flex-wrap gap-2">
              {journalFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setJournalFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    journalFilter === f
                      ? "bg-[#2E7D32] text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#2E7D32] hover:text-[#2E7D32]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Journal général — 15 dernières écritures</h2>
                <p className="text-xs text-gray-400 mt-0.5">Conforme SYSCOHADA Révisé · AUDCIF 2017</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[900px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">N° pièce</th>
                      <th className="px-4 py-3 text-left">Jnl</th>
                      <th className="px-4 py-3 text-left">Compte débit</th>
                      <th className="px-4 py-3 text-left">Libellé</th>
                      <th className="px-4 py-3 text-right">Débit (XOF)</th>
                      <th className="px-4 py-3 text-left">Compte crédit</th>
                      <th className="px-4 py-3 text-right">Crédit (XOF)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {filteredEntries.map((e, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">{e.date}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-600 dark:text-gray-400 whitespace-nowrap">{e.piece}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full font-semibold text-xs ${journalBadge[e.journal] ?? "bg-gray-100 text-gray-600"}`}>
                            {e.journal}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-blue-700 dark:text-blue-400 whitespace-nowrap font-mono text-xs">{e.compteD}</td>
                        <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 max-w-[200px] truncate">{e.libelle}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-gray-900 dark:text-white whitespace-nowrap">{fmtXOF(e.debit)}</td>
                        <td className="px-4 py-2.5 text-emerald-700 dark:text-emerald-400 whitespace-nowrap font-mono text-xs">{e.compteC}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-gray-900 dark:text-white whitespace-nowrap">{fmtXOF(e.credit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── BALANCE ── */}
        {tab === "balance" && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Balance générale au 30/06/2025</h2>
              <p className="text-xs text-gray-400 mt-0.5">Comptes principaux SYSCOHADA · AGRIFRIK</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[750px]">
                <thead>
                  <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
                    <th className="px-4 py-3 text-left">Compte</th>
                    <th className="px-4 py-3 text-left">Intitulé</th>
                    <th className="px-4 py-3 text-right">Débit cumul</th>
                    <th className="px-4 py-3 text-right">Crédit cumul</th>
                    <th className="px-4 py-3 text-right">Solde débiteur</th>
                    <th className="px-4 py-3 text-right">Solde créditeur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {["1","2","3","4","5","6","7"].map((cls) => {
                    const rows = balanceData.filter((r) => r.classe === cls);
                    return (
                      <>
                        <tr key={`header-${cls}`} className="bg-gray-50 dark:bg-gray-800/50">
                          <td colSpan={6} className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                            {classeLabels[cls]}
                          </td>
                        </tr>
                        {rows.map((r) => (
                          <tr key={r.compte} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                            <td className="px-4 py-2.5 font-mono text-gray-600 dark:text-gray-400">{r.compte}</td>
                            <td className="px-4 py-2.5 text-gray-800 dark:text-gray-200">{r.intitule}</td>
                            <td className="px-4 py-2.5 text-right text-blue-700 dark:text-blue-400">{r.debit ? fmtXOF(r.debit) : "—"}</td>
                            <td className="px-4 py-2.5 text-right text-emerald-700 dark:text-emerald-400">{r.credit ? fmtXOF(r.credit) : "—"}</td>
                            <td className="px-4 py-2.5 text-right font-semibold text-gray-800 dark:text-gray-200">{r.soldeDt ? fmtXOF(r.soldeDt) : "—"}</td>
                            <td className="px-4 py-2.5 text-right font-semibold text-gray-800 dark:text-gray-200">{r.soldeCr ? fmtXOF(r.soldeCr) : "—"}</td>
                          </tr>
                        ))}
                      </>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-[#1B5E20] text-white font-bold text-xs border-t-2 border-[#1B5E20]">
                    <td className="px-4 py-3" colSpan={2}>Total général</td>
                    <td className="px-4 py-3 text-right">{fmtXOF(totalDebit)}</td>
                    <td className="px-4 py-3 text-right">{fmtXOF(totalCredit)}</td>
                    <td className="px-4 py-3 text-right" colSpan={2}>
                      <span className="bg-green-700 px-3 py-1 rounded-full text-white text-xs">
                        {totalDebit === totalCredit ? "✅ Balance équilibrée" : "⚠️ Écart"}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* ── GRAND LIVRE ── */}
        {tab === "grandlivre" && (
          <div className="space-y-4">
            {/* Sélecteur compte */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Compte</label>
              <input
                type="text"
                value={glSearch}
                onChange={(e) => setGlSearch(e.target.value)}
                className="w-full sm:w-72 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                placeholder="Ex: 411000 Clients"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {["411000 Clients", "521000 BICICI", "701000 Ventes cacao", "641000 Salaires"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setGlSearch(s)}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#2E7D32] hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Fiche de compte : {glSearch}</h2>
                <p className="text-xs text-gray-400 mt-0.5">Mouvements du 01/01/2025 au 30/06/2025</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[700px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">N° pièce</th>
                      <th className="px-4 py-3 text-left">Libellé</th>
                      <th className="px-4 py-3 text-right">Débit</th>
                      <th className="px-4 py-3 text-right">Crédit</th>
                      <th className="px-4 py-3 text-right">Solde</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {grandLivreEntries.map((e, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">{e.date}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-600 dark:text-gray-400 whitespace-nowrap">{e.piece}</td>
                        <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 max-w-[260px] truncate">{e.libelle}</td>
                        <td className="px-4 py-2.5 text-right text-blue-700 dark:text-blue-400 font-semibold">{e.debit ? fmtXOF(e.debit) : "—"}</td>
                        <td className="px-4 py-2.5 text-right text-emerald-700 dark:text-emerald-400 font-semibold">{e.credit ? fmtXOF(e.credit) : "—"}</td>
                        <td className={`px-4 py-2.5 text-right font-bold ${e.solde >= 0 ? "text-gray-900 dark:text-white" : "text-red-600"}`}>
                          {fmtXOF(Math.abs(e.solde))}{e.solde < 0 ? " Cr" : " Dt"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#1B5E20] text-white font-bold text-xs">
                      <td className="px-4 py-3" colSpan={5}>Solde au 30/06/2025</td>
                      <td className="px-4 py-3 text-right text-lg">24 600 000 XOF Débiteur</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── PLAN COMPTABLE ── */}
        {tab === "plancomptable" && (
          <div className="space-y-4">
            {/* Chips classes */}
            <div className="flex flex-wrap gap-2">
              {(["1","2","3","4","5","6","7","8"] as ClasseFilter[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setClasseFilter(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    classeFilter === c
                      ? "bg-[#2E7D32] text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#2E7D32] hover:text-[#2E7D32]"
                  }`}
                >
                  Classe {c}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  {classeLabels[classeFilter]} — Plan comptable SYSCOHADA révisé
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Comptes AGRIFRIK · AUDCIF 2017</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      <th className="px-4 py-3 text-left">Numéro</th>
                      <th className="px-4 py-3 text-left">Intitulé SYSCOHADA</th>
                      <th className="px-4 py-3 text-center">Utilisé</th>
                      <th className="px-4 py-3 text-right">Solde actuel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {(planComptable[classeFilter] ?? []).map((r) => (
                      <tr key={r.num} className={`hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${!r.utilise ? "opacity-50" : ""}`}>
                        <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-400 text-xs">{r.num}</td>
                        <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">{r.intitule}</td>
                        <td className="px-4 py-3 text-center">
                          {r.utilise
                            ? <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold">✓</span>
                            : <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-full text-xs">—</span>
                          }
                        </td>
                        <td className={`px-4 py-3 text-right font-semibold text-sm ${r.utilise ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>
                          {r.solde}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
