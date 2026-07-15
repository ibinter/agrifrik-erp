"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Bird,
  Beef,
  PiggyBank,
  ShieldCheck,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  TrendingDown,
  Egg,
  DollarSign,
} from "lucide-react";

/* ─── TYPES ─── */
type TabId = "volailles" | "bovins" | "porcs" | "sante" | "productions" | "valorisation";

/* ─── KPI ─── */
function Kpi({ label, value, sub, icon: Icon, color, bg }: {
  label: string; value: string; sub?: string;
  icon: React.ElementType; color: string; bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: bg }}>
        <Icon size={18} color={color} strokeWidth={1.8} />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
      {sub && <div className="text-xs mt-1 font-medium" style={{ color }}>{sub}</div>}
    </div>
  );
}

/* ─── ONGLET VOLAILLES ─── */
const poulaillers = [
  {
    nom: "Poulailler A", race: "Poulet de chair ISA 215", effectif: 120,
    age: "6 semaines", ponte: "—", txPonte: "—", alim: "18 kg/j",
    statut: "Abattage dans 2 semaines", statutColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    nom: "Poulailler B", race: "Pondeuse Lohmann Brown", effectif: 180,
    age: "8 mois", ponte: "162 œufs/j", txPonte: "90%", alim: "22 kg/j",
    statut: "Pleine production", statutColor: "bg-green-50 text-green-700 border-green-200",
  },
  {
    nom: "Poulailler C", race: "Pintades locales", effectif: 84,
    age: "4 mois", ponte: "18 œufs/j", txPonte: "21% (saisonnier)", alim: "8 kg/j",
    statut: "Normal", statutColor: "bg-green-50 text-green-700 border-green-200",
  },
];

const oeufsHebdo = [
  { j: "Lun", v: 168 }, { j: "Mar", v: 174 }, { j: "Mer", v: 162 },
  { j: "Jeu", v: 178 }, { j: "Ven", v: 180 }, { j: "Sam", v: 166 }, { j: "Dim", v: 170 },
];

const rations = [
  { stade: "Poussins 0–4 sem.", compo: "Démarrage protéique 22%", dosage: "35 g/sujet", freq: "2×/j", cout: "4 200 XOF/j" },
  { stade: "Croissance 4–8 sem.", compo: "Croissance 19%", dosage: "80 g/sujet", freq: "2×/j", cout: "9 600 XOF/j" },
  { stade: "Pondeuses", compo: "Ponte + Ca", dosage: "115 g/sujet", freq: "2×/j", cout: "11 700 XOF/j" },
];

function ContenuVolailles() {
  const maxV = Math.max(...oeufsHebdo.map((d) => d.v));
  const chartH = 80;

  return (
    <div className="space-y-6">
      {/* Tableau poulaillers */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Poulaillers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Bâtiment", "Race", "Effectif", "Âge moyen", "Ponte/j", "Taux ponte", "Alim./j", "Statut"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {poulaillers.map((p) => (
                <tr key={p.nom} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-semibold text-gray-900">{p.nom}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.race}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">{p.effectif} têtes</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.age}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.ponte}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.txPonte}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.alim}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${p.statutColor}`}>
                      {p.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mini bar chart production œufs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Production œufs — semaine en cours (moy. 171/j)</h3>
        <svg viewBox={`0 0 ${oeufsHebdo.length * 60} ${chartH + 30}`} className="w-full" style={{ maxHeight: 140 }}>
          {oeufsHebdo.map((d, i) => {
            const barH = (d.v / maxV) * chartH;
            const x = i * 60 + 10;
            const y = chartH - barH;
            return (
              <g key={d.j}>
                <rect x={x} y={y} width={40} height={barH} rx={5} fill="#4CAF50" opacity={0.85} />
                <text x={x + 20} y={y - 4} textAnchor="middle" fontSize={10} fill="#374151" fontWeight="600">{d.v}</text>
                <text x={x + 20} y={chartH + 16} textAnchor="middle" fontSize={10} fill="#9CA3AF">{d.j}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Programme alimentaire */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Programme alimentaire</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Ration", "Composition", "Dosage", "Fréquence", "Coût/jour"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rations.map((r) => (
                <tr key={r.stade} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">{r.stade}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{r.compo}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{r.dosage}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{r.freq}</td>
                  <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>{r.cout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── ONGLET BOVINS ─── */
const bovins = [
  { id: "BOV-01", race: "Zébu Azawak", sexe: "M (taureau repr.)", age: "4 ans", poids: "420 kg", statut: "Reproducteur", statutColor: "bg-green-50 text-green-700", destination: "—" },
  { id: "BOV-02", race: "Zébu Azawak", sexe: "F", age: "3 ans", poids: "310 kg", statut: "Gestante 7 mois", statutColor: "bg-blue-50 text-blue-700", destination: "Vêlage oct. 2025" },
  { id: "BOV-03", race: "Zébu Azawak", sexe: "F", age: "4 ans", poids: "340 kg", statut: "Allaitante", statutColor: "bg-green-50 text-green-700", destination: "Veau 3 mois" },
  { id: "BOV-04", race: "Zébu × Montbéliard", sexe: "M", age: "18 mois", poids: "280 kg", statut: "Engraissement", statutColor: "bg-sky-50 text-sky-700", destination: "Vente jan. 2026 (≥380 kg)" },
  { id: "BOV-05", race: "Zébu × Montbéliard", sexe: "M", age: "18 mois", poids: "265 kg", statut: "Engraissement", statutColor: "bg-sky-50 text-sky-700", destination: "Vente jan. 2026" },
  { id: "BOV-06", race: "Zébu Azawak", sexe: "F", age: "2 ans", poids: "260 kg", statut: "Cyclique", statutColor: "bg-green-50 text-green-700", destination: "Saillie prévue août 2025" },
  { id: "BOV-07", race: "Génisse", sexe: "F", age: "8 mois", poids: "140 kg", statut: "Croissance", statutColor: "bg-emerald-50 text-emerald-700", destination: "—" },
  { id: "BOV-08", race: "Veau", sexe: "M", age: "3 mois", poids: "68 kg", statut: "Allaitement", statutColor: "bg-emerald-50 text-emerald-700", destination: "—" },
];

function ContenuBovins() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Cheptel bovin — 8 têtes</h3>
          <span className="text-sm font-semibold" style={{ color: "#2E7D32" }}>Valeur estimée : 6,8 M XOF</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["N°", "Race", "Sexe", "Âge", "Poids", "Statut", "Destination"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bovins.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono font-medium text-gray-700">{b.id}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{b.race}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.sexe}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.age}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">{b.poids}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.statutColor}`}>{b.statut}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.destination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── ONGLET PORCS ─── */
function ContenuPorcs() {
  return (
    <div className="flex items-center justify-center h-48 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
      Données Porcs — à venir
    </div>
  );
}

/* ─── ONGLET SANTÉ ─── */
const vaccins = [
  { animal: "Poulailler A+B+C", vaccin: "Newcastle (ND)", prevue: "01/04/2025", realisee: "03/04/2025", rappel: "01/07/2025", statut: "En retard", statutColor: "bg-red-50 text-red-700" },
  { animal: "Poulailler A+B", vaccin: "Gumboro (IBD)", prevue: "15/03/2025", realisee: "16/03/2025", rappel: "15/06/2025", statut: "Fait", statutColor: "bg-green-50 text-green-700" },
  { animal: "Bovins", vaccin: "Fièvre aphteuse", prevue: "15/01/2025", realisee: "18/01/2025", rappel: "15/07/2025", statut: "Cette semaine", statutColor: "bg-red-50 text-red-700" },
  { animal: "Bovins", vaccin: "Charbonneux", prevue: "01/03/2025", realisee: "04/03/2025", rappel: "01/03/2026", statut: "OK", statutColor: "bg-green-50 text-green-700" },
  { animal: "Porcs", vaccin: "PPC (Pest. porc. class.)", prevue: "01/02/2025", realisee: "05/02/2025", rappel: "01/08/2025", statut: "Dans 21j", statutColor: "bg-yellow-50 text-yellow-700" },
];

function ContenuSante() {
  return (
    <div className="space-y-6">
      {/* Alertes sanitaires */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-800">Bovins — Vaccin fièvre aphteuse rappel DÛ cette semaine (15/07)</p>
            <p className="text-xs text-red-700 mt-0.5">Contacter immédiatement le Dr Vétérinaire Coulibaly</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
          <AlertTriangle size={18} className="text-yellow-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">Poulailler — Newcastle ND rappel en retard de 10 jours</p>
            <p className="text-xs text-yellow-700 mt-0.5">Rappel prévu le 01/07/2025 — Contacter Dr Vétérinaire Coulibaly</p>
          </div>
        </div>
      </div>

      {/* Protocole vaccinal */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Protocole vaccinal 2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Animal", "Vaccin", "Date prévue", "Date réalisée", "Prochain rappel", "Statut"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vaccins.map((v, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">{v.animal}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.vaccin}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{v.prevue}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle size={11} className="text-green-600" />
                      {v.realisee}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.rappel}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v.statutColor}`}>{v.statut}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── ONGLET PRODUCTIONS ─── */
const ventes = [
  { date: "08/07", produit: "Œufs frais calibre A", qte: "12 plateaux (360 œufs)", pu: "2 500 XOF/plateau", montant: "30 000 XOF", client: "Marché Soubré", statut: "Vendu", statutColor: "bg-green-50 text-green-700" },
  { date: "05/07", produit: "Pintades vives", qte: "6 sujets", pu: "4 500 XOF/sujet", montant: "27 000 XOF", client: "Particulier", statut: "Vendu", statutColor: "bg-green-50 text-green-700" },
  { date: "01/07", produit: "Poulets de chair", qte: "22 sujets (1,8 kg moy.)", pu: "3 800 XOF/sujet", montant: "83 600 XOF", client: "Restaurant Soubré", statut: "Vendu", statutColor: "bg-green-50 text-green-700" },
];

function ContenuProductions() {
  const total = 30000 + 27000 + 83600;
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Ventes élevage — juillet 2025</h3>
          <span className="text-sm font-bold" style={{ color: "#2E7D32" }}>Total : {total.toLocaleString("fr-FR")} XOF</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Date", "Produit", "Quantité", "Prix unitaire", "Montant", "Client", "Statut"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ventes.map((v, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-500">{v.date}</td>
                  <td className="px-4 py-3 text-xs font-medium text-gray-900">{v.produit}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.qte}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{v.pu}</td>
                  <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>{v.montant}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.client}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v.statutColor}`}>
                      <CheckCircle size={10} className="inline mr-1" />{v.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── ONGLET VALORISATION & VENTES ─── */
function ContenuValorisation() {
  const charges = [
    { poste: "Aliment volailles", montant: 1240000 },
    { poste: "Aliment bovins (compléments)", montant: 680000 },
    { poste: "Vétérinaire + vaccins", montant: 420000 },
    { poste: "Électricité poulaillers", montant: 180000 },
  ];
  const totalCharges = 2520000;
  const ca = 11497000;
  const marge = ca - totalCharges;
  const txMarge = ((marge / ca) * 100).toFixed(1);

  const fmt = (n: number) => n.toLocaleString("fr-FR") + " XOF";

  const expansion = [
    {
      label: "Poulailler C (2 000 poulets)",
      periode: "Construction Aoû–Sep 2025",
      budget: "2 400 000 XOF",
      statut: "Planifié",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      label: "Porcins — porcherie 20 truies",
      periode: "Étude de faisabilité en cours",
      budget: "—",
      statut: "Étude",
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    {
      label: "Laiterie artisanale (fromage frais, yaourt)",
      periode: "Pilote Jan 2026",
      budget: "À définir",
      statut: "Pilote",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Résumé CA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs text-gray-500 mb-1">CA élevage YTD 2025</div>
          <div className="text-2xl font-bold" style={{ color: "#2E7D32" }}>{fmt(ca)}</div>
          <div className="text-xs text-gray-400 mt-0.5">Jan – Jul 11, 2025</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs text-gray-500 mb-1">Charges directes</div>
          <div className="text-2xl font-bold text-red-600">{fmt(totalCharges)}</div>
          <div className="text-xs text-gray-400 mt-0.5">4 postes de charges</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs text-gray-500 mb-1">Marge brute</div>
          <div className="text-2xl font-bold" style={{ color: "#1B5E20" }}>{fmt(marge)}</div>
          <div className="text-xs font-semibold mt-0.5" style={{ color: "#2E7D32" }}>Taux : {txMarge}%</div>
        </div>
      </div>

      {/* Volailles */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Valorisation Volailles — Jan–Jul 2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Produit", "Volume", "Prix moyen", "CA"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xs font-medium text-gray-900">Œufs frais (Jan–Jun, 6 mois)</td>
                <td className="px-4 py-3 text-xs text-gray-600">18 400 unités</td>
                <td className="px-4 py-3 text-xs text-gray-600">185 XOF/unité</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>3 404 000 XOF</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xs font-medium text-gray-900">Poulets de chair vendus</td>
                <td className="px-4 py-3 text-xs text-gray-600">140 têtes</td>
                <td className="px-4 py-3 text-xs text-gray-600">3 200 XOF/kg vif</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>4 480 000 XOF</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xs text-gray-500 italic">Poussins vendus</td>
                <td className="px-4 py-3 text-xs text-gray-400">0 (autoconsommation)</td>
                <td className="px-4 py-3 text-xs text-gray-400">—</td>
                <td className="px-4 py-3 text-xs text-gray-400">—</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200 bg-green-50">
                <td className="px-4 py-2.5 text-xs font-bold text-gray-900" colSpan={3}>Sous-total Volailles</td>
                <td className="px-4 py-2.5 text-xs font-bold" style={{ color: "#1B5E20" }}>7 884 000 XOF</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Bovins */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Valorisation Bovins — Jan–Jul 2025</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Produit", "Volume", "Prix moyen", "CA"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xs font-medium text-gray-900">Lait collecté (5 vaches laitières)</td>
                <td className="px-4 py-3 text-xs text-gray-600">8 400 L</td>
                <td className="px-4 py-3 text-xs text-gray-600">420 XOF/L</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>3 528 000 XOF</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xs font-medium text-gray-900">Veaux nés (3 veaux — 1 vendu)</td>
                <td className="px-4 py-3 text-xs text-gray-600">1 veau vendu (2 gardés)</td>
                <td className="px-4 py-3 text-xs text-gray-600">85 000 XOF/veau</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>85 000 XOF</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xs text-gray-500 italic">Bœufs de travail (3)</td>
                <td className="px-4 py-3 text-xs text-gray-400">Non vendus</td>
                <td className="px-4 py-3 text-xs text-gray-400">—</td>
                <td className="px-4 py-3 text-xs text-gray-400">—</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200 bg-green-50">
                <td className="px-4 py-2.5 text-xs font-bold text-gray-900" colSpan={3}>Sous-total Bovins</td>
                <td className="px-4 py-2.5 text-xs font-bold" style={{ color: "#1B5E20" }}>3 613 000 XOF</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Charges */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Charges directes élevage</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F8FBF8" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Poste de charge</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Montant</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">% du CA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {charges.map((c) => (
                <tr key={c.poste} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-700">{c.poste}</td>
                  <td className="px-4 py-3 text-xs text-right font-medium text-red-600">{fmt(c.montant)}</td>
                  <td className="px-4 py-3 text-xs text-right text-gray-500">{((c.montant / ca) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-300 bg-red-50">
                <td className="px-4 py-2.5 text-xs font-bold text-gray-900">Total charges</td>
                <td className="px-4 py-2.5 text-xs text-right font-bold text-red-700">{fmt(totalCharges)}</td>
                <td className="px-4 py-2.5 text-xs text-right font-semibold text-red-600">{((totalCharges / ca) * 100).toFixed(1)}%</td>
              </tr>
              <tr className="border-t border-gray-200 bg-green-50">
                <td className="px-4 py-2.5 text-xs font-bold text-gray-900">Marge brute</td>
                <td className="px-4 py-2.5 text-xs text-right font-bold" style={{ color: "#1B5E20" }}>{fmt(marge)}</td>
                <td className="px-4 py-2.5 text-xs text-right font-bold" style={{ color: "#2E7D32" }}>{txMarge}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Programme d'expansion */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Programme d&apos;expansion 2025–2026</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {expansion.map((e) => (
            <div key={e.label} className="px-5 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900">{e.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{e.periode}</div>
              </div>
              <div className="text-xs font-semibold text-gray-700 shrink-0">{e.budget}</div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${e.color} shrink-0`}>{e.statut}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TABS CONFIG ─── */
const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "volailles", label: "Volailles", icon: Bird },
  { id: "bovins",   label: "Bovins",    icon: Beef },
  { id: "porcs",    label: "Porcs",     icon: PiggyBank },
  { id: "sante",    label: "Santé & Vétérinaire", icon: ShieldCheck },
  { id: "productions", label: "Productions", icon: ShoppingCart },
  { id: "valorisation", label: "Valorisation & Ventes", icon: DollarSign },
];

/* ─── PAGE ─── */
export default function ElevagePage() {
  const [activeTab, setActiveTab] = useState<TabId>("volailles");

  return (
    <div>
      <Topbar title="Élevage" breadcrumb={["Production", "Élevage"]} />

      <div className="p-4 sm:p-6 space-y-6">

        {/* KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Kpi label="Animaux total"    value="384"         icon={Beef}         color="#2E7D32" bg="#E8F5E9" />
          <Kpi label="Valeur cheptel"   value="28,4 M XOF"  icon={DollarSign}   color="#1565C0" bg="#E3F2FD" />
          <Kpi label="Production œufs/j" value="280"        icon={Egg}          color="#E65100" bg="#FFF3E0" />
          <Kpi label="Ventes YTD"       value="12,8 M XOF"  icon={ShoppingCart} color="#2E7D32" bg="#E8F5E9" />
          <Kpi label="Mortalité"        value="1,2%"        sub="Normal" icon={TrendingDown} color="#0277BD" bg="#E1F5FE" />
        </div>

        {/* Onglets */}
        <div className="flex gap-1 border-b border-gray-100 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === t.id
                    ? "border-[#2E7D32] text-[#2E7D32]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Contenu */}
        {activeTab === "volailles"     && <ContenuVolailles />}
        {activeTab === "bovins"        && <ContenuBovins />}
        {activeTab === "porcs"         && <ContenuPorcs />}
        {activeTab === "sante"         && <ContenuSante />}
        {activeTab === "productions"   && <ContenuProductions />}
        {activeTab === "valorisation"  && <ContenuValorisation />}

      </div>
    </div>
  );
}
