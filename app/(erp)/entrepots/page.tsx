"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import {
  Warehouse,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Package,
  BarChart2,
} from "lucide-react";

const TABS = ["Vue d'ensemble", "Entrepôt A", "Entrepôt B"] as const;
type Tab = (typeof TABS)[number];

/* ─── KPI CARD ─── */
function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "#2E7D32",
  alert = false,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color?: string;
  alert?: boolean;
}) {
  return (
    <div className={`rounded-2xl border bg-white p-5 ${alert ? "border-amber-200" : "border-gray-100"}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>
          {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: color + "18" }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
    </div>
  );
}

/* ─── SVG PLAN SCHÉMATIQUE ─── */
function SvgPlanEntrepots() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Plan schématique — Vue d&apos;ensemble</h3>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 700 300" width="700" height="300" xmlns="http://www.w3.org/2000/svg">
          <rect width="700" height="300" fill="#F8FBF8" rx="12" />

          {/* ══ ENTREPÔT A — 600 m² (grand rectangle) ══ */}
          <rect x="30" y="30" width="430" height="200" rx="8" fill="white" stroke="#2E7D32" strokeWidth="2" />
          <text x="245" y="22" fontSize="12" fill="#1B5E20" fontWeight="bold" textAnchor="middle">Entrepôt A — 600 m²</text>

          {/* Zone A1 — 85% occupation → vert foncé */}
          <rect x="35" y="35" width="205" height="90" rx="5" fill="#388E3C" opacity="0.75" />
          <text x="138" y="75" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">Zone A1 — Cacao AA</text>
          <text x="138" y="90" fontSize="10" fill="#E8F5E9" textAnchor="middle">180 m² · 85% occupé</text>
          <text x="138" y="104" fontSize="10" fill="#E8F5E9" textAnchor="middle">5 170 kg · 41 palettes</text>

          {/* Zone A2 — 42% → vert clair */}
          <rect x="245" y="35" width="210" height="90" rx="5" fill="#A5D6A7" opacity="0.8" />
          <text x="350" y="75" fontSize="11" fill="#1B5E20" textAnchor="middle" fontWeight="bold">Zone A2 — Cacao A</text>
          <text x="350" y="90" fontSize="10" fill="#2E7D32" textAnchor="middle">120 m² · 42% occupé</text>
          <text x="350" y="104" fontSize="10" fill="#2E7D32" textAnchor="middle">3 010 kg</text>

          {/* Zone A3 — 58% → vert moyen */}
          <rect x="35" y="130" width="205" height="94" rx="5" fill="#66BB6A" opacity="0.7" />
          <text x="138" y="170" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">Zone A3 — Anacarde</text>
          <text x="138" y="185" fontSize="10" fill="#E8F5E9" textAnchor="middle">160 m² · 58% occupé</text>
          <text x="138" y="199" fontSize="10" fill="#E8F5E9" textAnchor="middle">2 398 kg</text>

          {/* Zone A4 — 74% → vert moyen foncé */}
          <rect x="245" y="130" width="210" height="94" rx="5" fill="#43A047" opacity="0.7" />
          <text x="350" y="170" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">Zone A4 — Intrants</text>
          <text x="350" y="185" fontSize="10" fill="#E8F5E9" textAnchor="middle">140 m² · 74% occupé</text>
          <text x="350" y="199" fontSize="10" fill="#E8F5E9" textAnchor="middle">NPK · KCl · Phyto · Gasoil</text>

          {/* Icône alerte zone A4 */}
          <circle cx="444" cy="138" r="9" fill="#F59E0B" />
          <text x="444" y="142" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">!</text>

          {/* ══ ENTREPÔT B — 200 m² ══ */}
          <rect x="490" y="30" width="185" height="200" rx="8" fill="white" stroke="#1565C0" strokeWidth="2" />
          <text x="583" y="22" fontSize="12" fill="#1565C0" fontWeight="bold" textAnchor="middle">Entrepôt B — 200 m²</text>

          {/* Zone B1 — 58% → bleu clair */}
          <rect x="495" y="35" width="175" height="90" rx="5" fill="#90CAF9" opacity="0.7" />
          <text x="583" y="72" fontSize="11" fill="#0D47A1" textAnchor="middle" fontWeight="bold">Zone B1</text>
          <text x="583" y="86" fontSize="10" fill="#0D47A1" textAnchor="middle">Semences &amp; Plants</text>
          <text x="583" y="100" fontSize="10" fill="#0D47A1" textAnchor="middle">120 m² · 58%</text>

          {/* Zone B2 — 45% → bleu très clair */}
          <rect x="495" y="130" width="175" height="94" rx="5" fill="#BBDEFB" opacity="0.8" />
          <text x="583" y="168" fontSize="11" fill="#1565C0" textAnchor="middle" fontWeight="bold">Zone B2</text>
          <text x="583" y="182" fontSize="10" fill="#1565C0" textAnchor="middle">Petit matériel</text>
          <text x="583" y="196" fontSize="10" fill="#1565C0" textAnchor="middle">80 m² · 45%</text>

          {/* LÉGENDE */}
          <rect x="30" y="244" width="640" height="45" rx="6" fill="white" stroke="#E0E0E0" strokeWidth="1" />
          <rect x="50" y="256" width="14" height="14" rx="3" fill="#A5D6A7" />
          <text x="70" y="267" fontSize="9.5" fill="#444">{"< 50%"}</text>
          <rect x="140" y="256" width="14" height="14" rx="3" fill="#66BB6A" />
          <text x="160" y="267" fontSize="9.5" fill="#444">50–80%</text>
          <rect x="230" y="256" width="14" height="14" rx="3" fill="#388E3C" />
          <text x="250" y="267" fontSize="9.5" fill="#444">{"> 80%"}</text>
          <circle cx="322" cy="263" r="7" fill="#F59E0B" />
          <text x="322" y="267" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">!</text>
          <text x="336" y="267" fontSize="9.5" fill="#444">Alerte active</text>
          <rect x="410" y="256" width="14" height="14" rx="3" fill="#90CAF9" />
          <text x="430" y="267" fontSize="9.5" fill="#444">Entrepôt B (chambres froides)</text>
        </svg>
      </div>
    </div>
  );
}

/* ─── VUE D'ENSEMBLE ─── */
function OngletVueEnsemble() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <KpiCard label="Entrepôts" value="2" sub="A : 600 m² | B : 200 m²" icon={Warehouse} />
        <KpiCard label="Capacité totale" value="800 m²" icon={BarChart2} />
        <KpiCard label="Taux d'occupation" value="68,4 %" icon={BarChart2} color="#1565C0" />
        <KpiCard label="Valeur marchandises" value="26,4 M XOF" icon={Package} color="#E65100" />
        <KpiCard label="Alertes stock" value="3" icon={AlertTriangle} color="#F59E0B" alert />
      </div>

      <SvgPlanEntrepots />

      {/* Tableau récap */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Récapitulatif entrepôts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Entrepôt", "Surface", "Zones", "Occupation", "Température moy.", "Hygrométrie", "Responsable"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">Entrepôt A</td>
                <td className="px-3 py-2 whitespace-nowrap">600 m²</td>
                <td className="px-3 py-2 whitespace-nowrap">4 zones</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="rounded-full px-2 py-0.5 bg-green-50 text-green-700 font-medium">72 %</span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">22 °C</td>
                <td className="px-3 py-2 whitespace-nowrap">64 %</td>
                <td className="px-3 py-2 whitespace-nowrap">Ibrahim Sawadogo</td>
              </tr>
              <tr className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">Entrepôt B</td>
                <td className="px-3 py-2 whitespace-nowrap">200 m²</td>
                <td className="px-3 py-2 whitespace-nowrap">2 zones</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="rounded-full px-2 py-0.5 bg-blue-50 text-blue-700 font-medium">58 %</span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">20 °C</td>
                <td className="px-3 py-2 whitespace-nowrap">58 %</td>
                <td className="px-3 py-2 whitespace-nowrap">Bamba Oumar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── ZONE CARD ─── */
function ZoneCard({
  titre,
  surface,
  occupation,
  occupationPct,
  details,
  conditions,
  conformite,
  alert,
}: {
  titre: string;
  surface: string;
  occupation: string;
  occupationPct: number;
  details: string[];
  conditions: string;
  conformite?: string[];
  alert?: string;
}) {
  const barColor = occupationPct > 80 ? "#2E7D32" : occupationPct > 50 ? "#66BB6A" : "#A5D6A7";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-sm font-bold text-gray-800">{titre}</h4>
          <p className="text-xs text-gray-400">{surface}</p>
        </div>
        <span className="text-sm font-bold" style={{ color: barColor }}>{occupationPct} %</span>
      </div>

      {/* Barre occupation */}
      <div className="mb-4 h-2 rounded-full bg-gray-100">
        <div className="h-2 rounded-full transition-all" style={{ width: `${occupationPct}%`, background: barColor }} />
      </div>
      <p className="text-xs text-gray-500 mb-3">{occupation}</p>

      {/* Contenu */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-600 mb-1">Contenu :</p>
        <ul className="space-y-0.5">
          {details.map((d, i) => (
            <li key={i} className="text-xs text-gray-600">• {d}</li>
          ))}
        </ul>
      </div>

      {/* Conditions */}
      <div className="rounded-lg bg-[#F8FBF8] px-3 py-2 mb-3">
        <p className="text-xs text-gray-600"><span className="font-semibold">Conditions :</span> {conditions}</p>
      </div>

      {/* Alerte */}
      {alert && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 mb-3">
          <AlertTriangle size={13} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700">{alert}</p>
        </div>
      )}

      {/* Conformité */}
      {conformite && (
        <div>
          <p className="text-xs font-semibold text-gray-600 mb-1">Conformité :</p>
          <ul className="space-y-0.5">
            {conformite.map((c, i) => (
              <li key={i} className="text-xs text-green-700 flex items-center gap-1">
                <CheckCircle size={11} /> {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── MOUVEMENTS ─── */
const mouvements = [
  { date: "10/07", type: "Sortie", article: "Cacao AA LOT-045", zone: "A1", qte: "2 490 kg", operateur: "Ibrahim S." },
  { date: "08/07", type: "Entrée", article: "NPK 50 kg sacs (6 sacs)", zone: "A4", qte: "300 kg", operateur: "Konan Y." },
  { date: "05/07", type: "Entrée", article: "Cacao AA LOT-048", zone: "A1", qte: "2 680 kg", operateur: "Ibrahim S." },
  { date: "02/07", type: "Sortie", article: "Gasoil fût", zone: "A4", qte: "200 L", operateur: "Moussa T." },
  { date: "28/06", type: "Entrée", article: "Anacarde WW240", zone: "A3", qte: "2 390 kg", operateur: "Ibrahim S." },
  { date: "25/06", type: "Sortie", article: "Anacarde SW340", zone: "A3", qte: "8 kg", operateur: "Bamba O." },
  { date: "20/06", type: "Entrée", article: "Sacs jute 200 unités", zone: "A4", qte: "200 u.", operateur: "Konan Y." },
  { date: "18/06", type: "Sortie", article: "Calixin EC (phyto)", zone: "A4", qte: "5 L", operateur: "Ibrahim S." },
  { date: "15/06", type: "Entrée", article: "KCl 50 kg sacs", zone: "A4", qte: "250 kg", operateur: "Moussa T." },
  { date: "10/06", type: "Sortie", article: "Cacao Grade A LOT-047", zone: "A2", qte: "1 200 kg", operateur: "Ibrahim S." },
];

function TableauMouvements() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">Entrées / Sorties — 10 derniers mouvements</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Date", "Type", "Article", "Zone", "Quantité", "Opérateur"].map((h) => (
                <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mouvements.map((m, i) => (
              <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-3 py-2 whitespace-nowrap text-gray-700">{m.date}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${m.type === "Entrée" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                    {m.type}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{m.article}</td>
                <td className="px-3 py-2 whitespace-nowrap font-mono font-medium text-gray-700">{m.zone}</td>
                <td className="px-3 py-2 whitespace-nowrap text-right">{m.qte}</td>
                <td className="px-3 py-2 whitespace-nowrap">{m.operateur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── ENTREPÔT A ─── */
function OngletEntrepotA() {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-gray-800">Entrepôt A — 600 m²</h2>
            <p className="text-xs text-gray-500 mt-1">Zone : Site Soubré Nord · Construit : 2015</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2">
              <Thermometer size={14} className="text-green-700" />
              <span className="text-xs font-medium text-green-700">22 °C ✅</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2">
              <span className="text-xs font-medium text-blue-700">Hygro. 64 % ✅</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-2">
              <span className="text-xs font-medium text-purple-700">Capteurs IoT : 4 actifs</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 zones */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ZoneCard
          titre="Zone A1 — Cacao Grade AA"
          surface="180 m²"
          occupation="153 / 180 m² occupés"
          occupationPct={85}
          details={[
            "LOT-2025-046 : 2 490 kg",
            "LOT-2025-048 : 2 680 kg",
            "Total : 5 170 kg — 41 palettes",
          ]}
          conditions="22 °C / 64 % HR — ✅ Dans les normes ICCO"
          conformite={["Prochaine rotation : LOT-2025-046 sortie prévue 15/08"]}
        />
        <ZoneCard
          titre="Zone A2 — Cacao Grade A"
          surface="120 m²"
          occupation="50 / 120 m² occupés"
          occupationPct={42}
          details={[
            "LOT-2025-047 : 1 810 kg",
            "LOT-2025-047 partiel : 1 200 kg",
            "Total : 3 010 kg",
          ]}
          conditions="22 °C / 63 % HR — ✅ Dans les normes"
        />
        <ZoneCard
          titre="Zone A3 — Anacarde"
          surface="160 m²"
          occupation="93 / 160 m² occupés"
          occupationPct={58}
          details={[
            "Anacarde WW240 : 2 390 kg",
            "Anacarde SW340 : 8 kg",
            "Total : 2 398 kg",
          ]}
          conditions="20 °C / 58 % HR — ✅ Humidité critique pour anacarde"
          conformite={["Hygrométrie conforme seuil max 60 % pour anacarde"]}
        />
        <ZoneCard
          titre="Zone A4 — Intrants & Consommables"
          surface="140 m²"
          occupation="104 / 140 m² occupés"
          occupationPct={74}
          details={[
            "NPK : 240 sacs (12 000 kg)",
            "KCl : 5 sacs (250 kg)",
            "Produits phyto : armoire sécurisée",
            "Gasoil : 2 fûts (400 L)",
            "Sacs jute : stock en cours",
          ]}
          conditions="22 °C / 64 % HR"
          alert="Armoire phyto : 1 produit expirant dans 30 jours (Calixin EC)"
          conformite={[
            "Séparé des denrées alimentaires",
            "Affiches EPI en place",
            "Kit urgence disponible",
          ]}
        />
      </div>

      <TableauMouvements />
    </div>
  );
}

/* ─── ENTREPÔT B ─── */
function OngletEntrepotB() {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-gray-800">Entrepôt B — 200 m²</h2>
            <p className="text-xs text-gray-500 mt-1">Zone : Site Soubré Nord — Bâtiment B · Responsable : Bamba Oumar</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2">
              <Thermometer size={14} className="text-blue-700" />
              <span className="text-xs font-medium text-blue-700">12 °C (Chambre froide B1)</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2">
              <span className="text-xs font-medium text-green-700">Hygro. 55 % ✅</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Zone B1 */}
        <ZoneCard
          titre="Zone B1 — Semences & Plants"
          surface="120 m²"
          occupation="70 / 120 m² occupés"
          occupationPct={58}
          details={[
            "Semences cacao hybrides F1 : 4 kg",
            "Clones CNRA (commande en cours) : 20 kg prévu",
            "Semences maraîchères : 3,2 kg",
            "Semences riz Nerica : 75 kg",
            "Plants maraîchers : 850 unités",
            "Semences niébé : 40 kg",
          ]}
          conditions="12 °C / 55 % HR — Chambre froide active"
          conformite={[
            "Température conforme normes CNRA",
            "Enregistrement daily des conditions IoT",
            "Rotation FIFO respectée",
          ]}
        />

        {/* Zone B2 */}
        <ZoneCard
          titre="Zone B2 — Petit matériel & Outillage"
          surface="80 m²"
          occupation="36 / 80 m² occupés"
          occupationPct={45}
          details={[
            "Balances électroniques : 8 unités",
            "Tablettes terrain durcies : 6 unités",
            "Pompes à dos 16 L : 4 unités",
            "Outillage atelier : pinces, clés, etc.",
            "Pièces détachées petits moteurs",
            "Atelier mécanique léger — Bamba O.",
          ]}
          conditions="20 °C / 58 % HR — Conditions ambiantes"
          conformite={[
            "Rangement conforme — inventaire à jour",
            "Matériel électronique en charge protégée",
          ]}
        />
      </div>

      {/* Info box */}
      <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle size={16} className="mt-0.5 text-green-600 shrink-0" />
          <div className="text-xs text-green-700">
            <p className="font-semibold mb-1">Bilan Entrepôt B</p>
            <ul className="space-y-1 list-disc ml-4">
              <li>Chambre froide B1 opérationnelle — capteur IoT actif, alertes SMS configurées</li>
              <li>Inventaire B2 mis à jour le 01/07/2025 — aucune anomalie détectée</li>
              <li>Entrée de semences CNRA (20 kg clones) prévue le 20/07/2025 — espace réservé</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function EntrepotsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Vue d'ensemble");

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        breadcrumb={["Logistique", "Entrepôts"]}
        title="Entrepôts"
      />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Gestion des entrepôts et espaces de stockage</h1>
          <p className="mt-1 text-sm text-gray-500">Suivi des zones de stockage, conditions climatiques et mouvements de marchandises</p>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 rounded-xl bg-white border border-gray-100 p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
                activeTab === tab ? "bg-[#2E7D32] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Vue d'ensemble" && <OngletVueEnsemble />}
        {activeTab === "Entrepôt A" && <OngletEntrepotA />}
        {activeTab === "Entrepôt B" && <OngletEntrepotB />}
      </div>
    </div>
  );
}
