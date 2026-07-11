"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Users,
  Wallet,
  PiggyBank,
  CreditCard,
  Gift,
  Calendar,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Bell,
} from "lucide-react";

// ─── KPIs ─────────────────────────────────────────────────────────────────────

const kpis = [
  {
    label: "Membres actifs",
    value: "287",
    sub: "agriculteurs",
    color: "#2E7D32",
    icon: <Users size={20} />,
  },
  {
    label: "Cotisations 2025",
    value: "14,35 M XOF",
    sub: "collectées",
    color: "#1565C0",
    icon: <Wallet size={20} />,
  },
  {
    label: "Fonds commun",
    value: "48,2 M XOF",
    sub: "trésorerie coopérative",
    color: "#E65100",
    icon: <PiggyBank size={20} />,
  },
  {
    label: "Micro-crédits actifs",
    value: "18",
    sub: "encours : 12,4 M XOF",
    color: "#6A1B9A",
    icon: <CreditCard size={20} />,
  },
  {
    label: "Dividendes distribués",
    value: "8,4 M XOF",
    sub: "campagne 2024-2025",
    color: "#00695C",
    icon: <Gift size={20} />,
  },
];

// ─── Membres ──────────────────────────────────────────────────────────────────

interface Membre {
  nom: string;
  zone: string;
  surface: string;
  cotisation: number;
  paiement: "paye" | "impaye";
  credit: string | null;
  dividende: string | null;
  statut: "actif" | "attente";
}

const membres: Membre[] = [
  { nom: "Konan Yao", zone: "Soubré A", surface: "10 ha", cotisation: 500000, paiement: "paye", credit: null, dividende: "420 000 XOF", statut: "actif" },
  { nom: "Adjoua Koffi", zone: "Soubré A", surface: "6,5 ha", cotisation: 325000, paiement: "paye", credit: "850 000 XOF actif", dividende: "273 000 XOF", statut: "actif" },
  { nom: "Ibrahim Sawadogo", zone: "Soubré B", surface: "8,2 ha", cotisation: 410000, paiement: "paye", credit: null, dividende: "344 400 XOF", statut: "actif" },
  { nom: "Brou Aminata", zone: "Korhogo C", surface: "12 ha", cotisation: 600000, paiement: "paye", credit: null, dividende: "504 000 XOF", statut: "actif" },
  { nom: "Soro Adama", zone: "Korhogo C", surface: "4,5 ha", cotisation: 225000, paiement: "impaye", credit: null, dividende: null, statut: "attente" },
  { nom: "Coulibaly Fatoumata", zone: "Soubré B", surface: "7,0 ha", cotisation: 350000, paiement: "paye", credit: "620 000 XOF actif", dividende: "294 000 XOF", statut: "actif" },
  { nom: "Traoré Mamadou", zone: "Soubré A", surface: "9,5 ha", cotisation: 475000, paiement: "paye", credit: null, dividende: "399 000 XOF", statut: "actif" },
  { nom: "N'Guessan Koffi", zone: "Korhogo C", surface: "5,5 ha", cotisation: 275000, paiement: "paye", credit: null, dividende: "231 000 XOF", statut: "actif" },
  { nom: "Diabaté Ibrahim", zone: "Soubré B", surface: "11 ha", cotisation: 550000, paiement: "impaye", credit: null, dividende: null, statut: "attente" },
  { nom: "Bamba Oumar", zone: "Korhogo C", surface: "6,0 ha", cotisation: 300000, paiement: "paye", credit: "480 000 XOF actif", dividende: "252 000 XOF", statut: "actif" },
];

// ─── Micro-crédits ────────────────────────────────────────────────────────────

const credits = [
  { beneficiaire: "Adjoua Koffi", montant: "850 000 XOF", taux: "6%/an", mensualite: "72 500 XOF", resteDu: "578 000 XOF", echeance: "Déc 2025" },
  { beneficiaire: "Coulibaly Fatoumata", montant: "620 000 XOF", taux: "6%/an", mensualite: "53 000 XOF", resteDu: "424 000 XOF", echeance: "Nov 2025" },
  { beneficiaire: "Bamba Oumar", montant: "480 000 XOF", taux: "6%/an", mensualite: "41 000 XOF", resteDu: "287 000 XOF", echeance: "Oct 2025" },
  { beneficiaire: "Soro Fatima", montant: "750 000 XOF", taux: "6%/an", mensualite: "64 000 XOF", resteDu: "563 000 XOF", echeance: "Jan 2026" },
  { beneficiaire: "Koné Seydou", montant: "920 000 XOF", taux: "6%/an", mensualite: "79 000 XOF", resteDu: "691 000 XOF", echeance: "Fév 2026" },
];

// ─── Fonds ────────────────────────────────────────────────────────────────────

const fonds = [
  { label: "Réserve légale", montant: "8,4 M XOF", detail: "20% du résultat net", color: "#2E7D32", pct: 17 },
  { label: "Fonds d'investissement", montant: "28,6 M XOF", detail: "Financement projet irrigation", color: "#1565C0", pct: 59 },
  { label: "Fonds de solidarité", montant: "4,2 M XOF", detail: "Aide aux membres en difficulté", color: "#E65100", pct: 9 },
  { label: "Compte courant", montant: "7,0 M XOF", detail: "Trésorerie disponible", color: "#6A1B9A", pct: 15 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function PaiementBadge({ statut }: { statut: "paye" | "impaye" }) {
  if (statut === "paye")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
        <CheckCircle size={11} /> Payé
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-800">
      <AlertCircle size={11} /> Non payé
    </span>
  );
}

function StatutBadge({ statut }: { statut: "actif" | "attente" }) {
  if (statut === "actif")
    return (
      <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
        Actif
      </span>
    );
  return (
    <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
      En attente
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CooperativePage() {
  const [agRappelSent, setAgRappelSent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Coopérative" breadcrumb={["RH", "Coopérative"]} />

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500 leading-tight">{k.label}</p>
                <span style={{ color: k.color }}>{k.icon}</span>
              </div>
              <p className="text-xl font-bold" style={{ color: k.color }}>
                {k.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Assemblée Générale 2025 */}
        <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-700 flex items-center justify-center shrink-0">
                <Calendar size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Assemblée Générale 2025</p>
                <h3 className="text-base font-bold text-gray-900">15 septembre 2025 à 09h00</h3>
                <p className="text-sm text-gray-600">Salle de réunion AGROTEK CI</p>
              </div>
            </div>
            <button
              onClick={() => setAgRappelSent(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                agRappelSent
                  ? "bg-green-100 text-green-800 cursor-default"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              <Bell size={14} />
              {agRappelSent ? "Rappel envoyé ✓" : "Envoyer rappel AG"}
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Ordre du jour */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">Ordre du jour</p>
              <ul className="space-y-1.5">
                {[
                  "Bilan campagne 2024-2025",
                  "Approbation des comptes",
                  "Élection du bureau",
                  "Plan stratégique 2025-2026",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Quorum & confirmations */}
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Quorum requis</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">
                  50%+1 des membres — <span className="font-bold">144 membres</span>
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Convocations envoyées</span>
                  <span className="font-bold text-green-700">245 / 287 ✅</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-600" style={{ width: "85%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Confirmations reçues</span>
                  <span className="font-bold text-blue-700">182 membres (63%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: "63%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau membres */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-green-700" />
            <h3 className="text-base font-semibold text-gray-900">Membres &amp; Cotisations</h3>
            <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              287 membres
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Membre", "Zone", "Surface", "Cotisation 2025", "Paiement", "Micro-crédit", "Dividende", "Statut"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-4 whitespace-nowrap"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {membres.map((m, i) => (
                  <tr key={m.nom} className={`border-b border-gray-50 ${i % 2 !== 0 ? "bg-gray-50/40" : ""}`}>
                    <td className="py-3 pr-4 font-semibold text-gray-800 whitespace-nowrap">{m.nom}</td>
                    <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{m.zone}</td>
                    <td className="py-3 pr-4 text-gray-700">{m.surface}</td>
                    <td className="py-3 pr-4 font-medium text-gray-800 whitespace-nowrap">
                      {m.cotisation.toLocaleString("fr-FR")} XOF
                    </td>
                    <td className="py-3 pr-4">
                      <PaiementBadge statut={m.paiement} />
                    </td>
                    <td className="py-3 pr-4 text-xs text-gray-600 whitespace-nowrap">
                      {m.credit ? (
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-medium">
                          {m.credit}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {m.dividende ?? <span className="text-gray-400">—</span>}
                    </td>
                    <td className="py-3">
                      <StatutBadge statut={m.statut} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>Affichage de 1 à 10 sur 287 membres</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">‹</button>
              <button className="px-2.5 py-1 rounded bg-green-600 text-white font-semibold">1</button>
              <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">2</button>
              <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">3</button>
              <span className="px-1">…</span>
              <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">29</button>
              <button className="px-2 py-1 rounded border border-gray-200 hover:bg-gray-50">›</button>
            </div>
          </div>
        </div>

        {/* Section Micro-crédit */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={18} className="text-purple-700" />
            <h3 className="text-base font-semibold text-gray-900">Micro-crédit</h3>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="rounded-xl bg-purple-50 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Encours total</p>
              <p className="text-xl font-bold text-purple-800 mt-1">12,4 M XOF</p>
            </div>
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Taux de remboursement</p>
              <p className="text-xl font-bold text-green-800 mt-1">96%</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Taux d'intérêt</p>
              <p className="text-xl font-bold text-blue-800 mt-1">6% / an</p>
            </div>
          </div>

          {/* Tableau crédits */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Bénéficiaire", "Montant", "Taux", "Mensualité", "Reste dû", "Échéance"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pb-3 pr-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {credits.map((c, i) => (
                  <tr key={c.beneficiaire} className={`border-b border-gray-50 ${i % 2 !== 0 ? "bg-gray-50/40" : ""}`}>
                    <td className="py-3 pr-4 font-semibold text-gray-800 whitespace-nowrap">{c.beneficiaire}</td>
                    <td className="py-3 pr-4 font-medium text-purple-700 whitespace-nowrap">{c.montant}</td>
                    <td className="py-3 pr-4 text-gray-600">{c.taux}</td>
                    <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">{c.mensualite}</td>
                    <td className="py-3 pr-4 font-semibold text-orange-700 whitespace-nowrap">{c.resteDu}</td>
                    <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{c.echeance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section Fonds & Investissements */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-blue-700" />
            <h3 className="text-base font-semibold text-gray-900">Fonds &amp; Investissements communs</h3>
            <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              Total : 48,2 M XOF
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fonds.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border p-4 flex items-start gap-4"
                style={{ borderColor: f.color + "33" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm"
                  style={{ background: f.color }}
                >
                  {f.pct}%
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{f.label}</p>
                  <p className="text-lg font-bold mt-0.5" style={{ color: f.color }}>
                    {f.montant}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{f.detail}</p>
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${f.pct}%`, background: f.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
