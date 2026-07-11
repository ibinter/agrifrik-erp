"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// ─── DATA ────────────────────────────────────────────────────────────────────

const livraisonsEnTransit = [
  {
    num: "LIV-2025-148",
    chauffeur: "Bamba Oumar",
    type: "camion",
    depart: "Plantation Soubré",
    heureDepart: "07:30",
    destination: "Point collecte Abidjan (Terminal fruitier)",
    chargement: "18 sacs cacao Grade AA (LOT-043)",
    poids: "1 168 kg",
    vehicule: "Camion Renault T460 (AB-1234-CI)",
    distance: "342 km",
    statut: "en_route",
    statutLabel: "En route",
    eta: "15h30",
    progression: 35,
    detail: "Départ 08:00",
  },
  {
    num: "LIV-2025-147",
    chauffeur: "Traoré Mamadou",
    type: "camion",
    depart: "Soubré",
    heureDepart: "",
    destination: "Yamoussoukro — AGRIINTRANT CI",
    chargement: "Collecte 380 kg NPK 20-10-10 (commande BC-2025-084)",
    poids: "380 kg",
    vehicule: "Isuzu NQR (AB-5678-CI)",
    distance: "248 km",
    statut: "en_route",
    statutLabel: "En route",
    eta: "14h00",
    progression: 52,
    detail: "",
  },
  {
    num: "LIV-2025-146",
    chauffeur: "Koné Eric",
    type: "camion",
    depart: "Soubré",
    heureDepart: "",
    destination: "Abidjan Port (Terminal conteneurs)",
    chargement: "Conteneur EXP-2025-041 (18 420 kg cacao)",
    poids: "18 420 kg",
    vehicule: "Toyota Hilux (AB-9012-CI)",
    distance: "342 km",
    statut: "livre",
    statutLabel: "Livré — En attente navire",
    eta: "—",
    progression: 100,
    detail: "Livré port 09h15",
  },
  {
    num: "LIV-2025-145",
    chauffeur: "Coulibaly Roger",
    type: "moto",
    depart: "Bureau",
    heureDepart: "",
    destination: "MINADER Soubré (documents phyto)",
    chargement: "Documents administratifs",
    poids: "—",
    vehicule: "Moto Honda XR150 (AB-3456-CI)",
    distance: "< 5 km",
    statut: "livre",
    statutLabel: "Livré",
    eta: "—",
    progression: 100,
    detail: "Documents déposés 10h00",
  },
];

const livraisonsMois = [
  { num: "LIV-2025-148", date: "11/07", depart: "Soubré", destination: "Abidjan Terminal", contenu: "Cacao Grade AA", poids: "1 168 kg", vehicule: "Renault T460", chauffeur: "Bamba Oumar", statut: "En transit", duree: "En cours" },
  { num: "LIV-2025-147", date: "11/07", depart: "Soubré", destination: "Yamoussoukro", contenu: "NPK 20-10-10", poids: "380 kg", vehicule: "Isuzu NQR", chauffeur: "Traoré Mamadou", statut: "En transit", duree: "En cours" },
  { num: "LIV-2025-146", date: "11/07", depart: "Soubré", destination: "Abidjan Port", contenu: "Cacao EXP-041", poids: "18 420 kg", vehicule: "Toyota Hilux", chauffeur: "Koné Eric", statut: "Livré", duree: "4h15" },
  { num: "LIV-2025-145", date: "11/07", depart: "Bureau", destination: "MINADER Soubré", contenu: "Documents phyto", poids: "—", vehicule: "Moto XR150", chauffeur: "Coulibaly Roger", statut: "Livré", duree: "0h45" },
  { num: "LIV-2025-144", date: "10/07", depart: "Soubré", destination: "San Pedro Port", contenu: "Cacao LOT-042", poids: "8 240 kg", vehicule: "Renault T460", chauffeur: "Bamba Oumar", statut: "Livré", duree: "3h10" },
  { num: "LIV-2025-143", date: "09/07", depart: "Gagnoa", destination: "Soubré entrepôt", contenu: "Semences maïs", poids: "620 kg", vehicule: "Isuzu NQR", chauffeur: "Traoré Mamadou", statut: "Livré", duree: "1h30" },
  { num: "LIV-2025-142", date: "08/07", depart: "Soubré", destination: "Abidjan Terminal", contenu: "Cacao LOT-041", poids: "16 800 kg", vehicule: "Renault T460", chauffeur: "Bamba Oumar", statut: "Livré", duree: "5h45" },
  { num: "LIV-2025-141", date: "07/07", depart: "Abidjan", destination: "Soubré", contenu: "Intrants divers", poids: "1 200 kg", vehicule: "Isuzu NQR", chauffeur: "Traoré Mamadou", statut: "Livré", duree: "5h20" },
  { num: "LIV-2025-140", date: "05/07", depart: "Soubré", destination: "Yamoussoukro", contenu: "Cacao Grade B", poids: "3 400 kg", vehicule: "Toyota Hilux", chauffeur: "Koné Eric", statut: "Livré", duree: "4h00" },
  { num: "LIV-2025-139", date: "04/07", depart: "Bureau", destination: "Banque BNI Soubré", contenu: "Documents financiers", poids: "—", vehicule: "Moto XR150", chauffeur: "Coulibaly Roger", statut: "Livré", duree: "0h30" },
];

const vehicules = [
  { nom: "Renault T460", immat: "AB-1234-CI", type: "Camion 10t", capacite: "10 000 kg", etat: "bon", km: "184 230 km", revision: "190 000 km (dans ~3 000 km)", chauffeur: "Bamba Oumar", statut: "mission" },
  { nom: "Isuzu NQR", immat: "AB-5678-CI", type: "Camion 3,5t", capacite: "3 500 kg", etat: "bon", km: "96 450 km", revision: "100 000 km", chauffeur: "Traoré Mamadou", statut: "mission" },
  { nom: "Toyota Hilux", immat: "AB-9012-CI", type: "Pick-up", capacite: "800 kg", etat: "bon", km: "72 180 km", revision: "80 000 km", chauffeur: "Koné Eric", statut: "mission" },
  { nom: "John Deere 6120M", immat: "—", type: "Tracteur", capacite: "—", etat: "alerte", km: "2 847 h", revision: "3 000 h", chauffeur: "Bamba Oumar", statut: "maintenance" },
  { nom: "Moto Honda XR150", immat: "AB-3456-CI", type: "Moto liaison", capacite: "50 kg", etat: "bon", km: "28 400 km", revision: "30 000 km", chauffeur: "Coulibaly Roger", statut: "disponible" },
];

const chauffeurs = [
  { nom: "Bamba Oumar", permis: "15/06/2024", categories: "B, C, D", missions: 42, km: "18 240 km", note: "4,8/5", statut: "mission" },
  { nom: "Traoré Mamadou", permis: "03/09/2022", categories: "B, C", missions: 38, km: "14 820 km", note: "4,6/5", statut: "mission" },
  { nom: "Koné Eric", permis: "18/01/2021", categories: "B", missions: 22, km: "8 640 km", note: "4,7/5", statut: "mission" },
  { nom: "Coulibaly Roger", permis: "05/03/2023", categories: "A (moto)", missions: 56, km: "12 380 km", note: "4,9/5", statut: "disponible" },
];

const itineraires = [
  { route: "Soubré → Abidjan", distance: "342 km", duree: "5h30", cout: "185 000 XOF", freq: "8 fois/mois", usage: "Export cacao" },
  { route: "Soubré → San Pedro", distance: "148 km", duree: "2h45", cout: "82 000 XOF", freq: "3 fois/mois", usage: "Export port secondaire" },
  { route: "Soubré → Yamoussoukro", distance: "248 km", duree: "3h45", cout: "128 000 XOF", freq: "4 fois/mois", usage: "Intrants/fournisseurs" },
  { route: "Soubré → Gagnoa", distance: "68 km", duree: "1h15", cout: "38 000 XOF", freq: "6 fois/mois", usage: "Marché local" },
  { route: "Intra-plantation", distance: "< 5 km", duree: "—", cout: "—", freq: "Quotidien", usage: "Tracteur" },
];

const coutCategories = [
  { label: "Carburant", montant: "4 200 000 XOF", pct: 50, color: "#2E7D32" },
  { label: "Salaires chauffeurs", montant: "2 100 000 XOF", pct: 25, color: "#4CAF50" },
  { label: "Péages & taxes", montant: "840 000 XOF", pct: 10, color: "#E65100" },
  { label: "Maintenance véhicules", montant: "840 000 XOF", pct: 10, color: "#F57C00" },
  { label: "Assurances véhicules", montant: "420 000 XOF", pct: 5, color: "#FFA726" },
];

const coutLivraisons = [
  { num: "LIV-2025-146", route: "Soubré → Abidjan Port", distance: "342 km", carburant: "92 000", peage: "18 500", salaire: "45 000", total: "155 500", coutT: "8 440 XOF/t" },
  { num: "LIV-2025-145", route: "Bureau → MINADER", distance: "< 5 km", carburant: "1 200", peage: "0", salaire: "3 500", total: "4 700", coutT: "—" },
  { num: "LIV-2025-144", route: "Soubré → San Pedro", distance: "148 km", carburant: "42 000", peage: "7 500", salaire: "25 000", total: "74 500", coutT: "9 040 XOF/t" },
  { num: "LIV-2025-143", route: "Gagnoa → Soubré", distance: "68 km", carburant: "18 500", peage: "3 200", salaire: "14 000", total: "35 700", coutT: "57 580 XOF/t" },
  { num: "LIV-2025-142", route: "Soubré → Abidjan", distance: "342 km", carburant: "88 000", peage: "18 500", salaire: "45 000", total: "151 500", coutT: "9 018 XOF/t" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function StatutBadge({ statut, label }: { statut: string; label?: string }) {
  const cfg: Record<string, { cls: string; dot: string }> = {
    En_transit: { cls: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
    "En transit": { cls: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
    Livré: { cls: "bg-green-50 text-green-700", dot: "bg-green-500" },
    mission: { cls: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
    disponible: { cls: "bg-green-50 text-green-700", dot: "bg-green-500" },
    maintenance: { cls: "bg-orange-50 text-orange-700", dot: "bg-orange-400" },
  };
  const key = statut;
  const c = cfg[key] ?? { cls: "bg-gray-100 text-gray-600", dot: "bg-gray-400" };
  const text = label ?? statut;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${c.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {text}
    </span>
  );
}

// ─── SVG DONUT ───────────────────────────────────────────────────────────────

function DonutChart() {
  const total = 100;
  const r = 54;
  const cx = 70;
  const cy = 70;
  const circ = 2 * Math.PI * r;
  let cumul = 0;
  return (
    <svg viewBox="0 0 140 140" width={140} height={140}>
      {coutCategories.map((c) => {
        const dash = (c.pct / total) * circ;
        const gap = circ - dash;
        const offset = circ - (cumul / total) * circ;
        cumul += c.pct;
        return (
          <circle
            key={c.label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={c.color}
            strokeWidth={18}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={11} fill="#374151" fontWeight="600">8,40 M</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize={9} fill="#6B7280">XOF YTD</text>
    </svg>
  );
}

// ─── SVG MAP ─────────────────────────────────────────────────────────────────

function CarteCI() {
  const villes = [
    { id: "soubre", label: "Soubré", x: 175, y: 275, base: true },
    { id: "abidjan", label: "Abidjan", x: 310, y: 340, port: true },
    { id: "sanpedro", label: "San Pedro", x: 175, y: 360, port2: true },
    { id: "yamoussoukro", label: "Yamoussoukro", x: 270, y: 215 },
    { id: "man", label: "Man", x: 100, y: 190 },
    { id: "bouake", label: "Bouaké", x: 310, y: 175 },
    { id: "korhogo", label: "Korhogo", x: 295, y: 90 },
  ];

  const routes = [
    { from: { x: 175, y: 275 }, to: { x: 310, y: 340 }, color: "#2E7D32", label: "342 km", active: true },
    { from: { x: 175, y: 275 }, to: { x: 175, y: 360 }, color: "#E65100", label: "148 km", active: true },
    { from: { x: 175, y: 275 }, to: { x: 270, y: 215 }, color: "#1565C0", label: "248 km", active: true },
    { from: { x: 175, y: 275 }, to: { x: 212, y: 282 }, color: "#6A1B9A", label: "68 km", active: false },
  ];

  return (
    <svg viewBox="0 0 500 420" className="w-full max-w-lg mx-auto">
      {/* fond */}
      <rect width={500} height={420} fill="#F0F7F0" rx={12} />

      {/* contour simplifié Côte d'Ivoire */}
      <path
        d="M 80 80 Q 120 50 200 55 Q 310 50 380 90 Q 440 130 430 200 Q 420 270 390 330 Q 360 380 310 400 Q 260 415 210 400 Q 160 385 120 355 Q 75 315 65 260 Q 50 200 65 140 Z"
        fill="#DCF0DC" stroke="#A5D6A7" strokeWidth={1.5}
      />

      {/* routes */}
      {routes.map((r, i) => (
        <line
          key={i}
          x1={r.from.x} y1={r.from.y}
          x2={r.to.x} y2={r.to.y}
          stroke={r.color}
          strokeWidth={r.active ? 2.5 : 1.5}
          strokeDasharray={r.active ? "0" : "4 3"}
          opacity={r.active ? 0.85 : 0.5}
        />
      ))}

      {/* libellés distances sur route Abidjan */}
      <text x={255} y={322} fontSize={9} fill="#2E7D32" fontWeight="500">342 km</text>
      <text x={148} y={322} fontSize={9} fill="#E65100" fontWeight="500">148 km</text>
      <text x={198} y={230} fontSize={9} fill="#1565C0" fontWeight="500">248 km</text>

      {/* villes */}
      {villes.map((v) => (
        <g key={v.id}>
          {v.base ? (
            <>
              <circle cx={v.x} cy={v.y} r={10} fill="#1B5E20" opacity={0.9} />
              <text x={v.x} y={v.y + 4} textAnchor="middle" fontSize={9} fill="white" fontWeight="700">A</text>
              <text x={v.x + 14} y={v.y - 8} fontSize={10} fill="#1B5E20" fontWeight="700">{v.label}</text>
              <text x={v.x + 14} y={v.y + 4} fontSize={8} fill="#2E7D32">Base AGRIFRIK</text>
            </>
          ) : v.port || v.port2 ? (
            <>
              <rect x={v.x - 7} y={v.y - 7} width={14} height={14} rx={3} fill="#1565C0" opacity={0.85} />
              <text x={v.x} y={v.y + 4} textAnchor="middle" fontSize={9} fill="white" fontWeight="700">★</text>
              <text x={v.x + (v.port2 ? -60 : 12)} y={v.y + 4} fontSize={10} fill="#1565C0" fontWeight="600">{v.label}</text>
              <text x={v.x + (v.port2 ? -60 : 12)} y={v.y + 15} fontSize={8} fill="#1565C0">Port export</text>
            </>
          ) : (
            <>
              <circle cx={v.x} cy={v.y} r={5} fill="#78909C" opacity={0.7} />
              <text x={v.x + 8} y={v.y + 4} fontSize={9} fill="#37474F">{v.label}</text>
            </>
          )}
        </g>
      ))}

      {/* légende */}
      <rect x={10} y={358} width={150} height={54} rx={6} fill="white" opacity={0.9} />
      <circle cx={24} cy={373} r={6} fill="#1B5E20" />
      <text x={34} y={377} fontSize={9} fill="#374151">● Base AGRIFRIK</text>
      <rect x={18} y={384} width={10} height={10} rx={2} fill="#1565C0" />
      <text x={34} y={393} fontSize={9} fill="#374151">★ Port export</text>
      <circle cx={24} cy={403} r={4} fill="#78909C" />
      <text x={34} y={407} fontSize={9} fill="#374151">○ Partenaires</text>
    </svg>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const TABS = ["Livraisons", "Véhicules & Chauffeurs", "Itinéraires", "Coûts"] as const;
type Tab = (typeof TABS)[number];

export default function LogistiquePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Livraisons");

  const kpis = [
    { label: "Livraisons ce mois", val: "28", color: "#1565C0", sub: "dont 2 en transit" },
    { label: "En transit", val: "4", color: "#E65100", sub: "3 camions + 1 moto" },
    { label: "Véhicules actifs", val: "3/5", color: "#2E7D32", sub: "1 en maintenance" },
    { label: "Coût transport YTD", val: "8,4 M XOF", color: "#6A1B9A", sub: "Budget : 10,0 M" },
    { label: "Taux livraison à temps", val: "96,4%", color: "#00695C", sub: "Objectif : 95%" },
  ];

  return (
    <div>
      <Topbar title="Logistique & Transport" breadcrumb={["Logistique", "Logistique"]} />
      <div className="p-6 space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</div>
              <div className="text-xs text-gray-700 font-medium mt-1">{k.label}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="flex gap-1 border-b border-gray-200">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-lg ${
                activeTab === t
                  ? "text-[#2E7D32] border-b-2 border-[#2E7D32] bg-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── TAB : LIVRAISONS ── */}
        {activeTab === "Livraisons" && (
          <div className="space-y-6">
            {/* En transit maintenant */}
            <div>
              <h2 className="font-semibold text-gray-900 mb-3">En transit maintenant</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {livraisonsEnTransit.map((l) => (
                  <div key={l.num} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{l.type === "moto" ? "🏍️" : "🚛"}</span>
                        <div>
                          <span className="font-mono text-sm font-bold text-gray-800">{l.num}</span>
                          <span className="mx-2 text-gray-300">·</span>
                          <span className="text-sm text-gray-600">{l.chauffeur}</span>
                        </div>
                      </div>
                      <StatutBadge statut={l.statut === "en_route" ? "En transit" : "Livré"} label={l.statutLabel} />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="bg-gray-100 rounded-lg px-2 py-1">
                        {l.depart}{l.heureDepart ? ` · ${l.heureDepart}` : ""}
                      </span>
                      <span className="text-gray-300">→</span>
                      <span className="bg-gray-100 rounded-lg px-2 py-1">{l.destination}</span>
                    </div>

                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div><span className="text-gray-400">Chargement : </span>{l.chargement}</div>
                      <div className="flex gap-4">
                        <span><span className="text-gray-400">Poids : </span>{l.poids}</span>
                        <span><span className="text-gray-400">Distance : </span>{l.distance}</span>
                        {l.eta !== "—" && <span><span className="text-gray-400">ETA : </span><span className="font-medium text-gray-800">{l.eta}</span></span>}
                      </div>
                      {l.detail && <div className="text-gray-500 italic">{l.detail}</div>}
                    </div>

                    {l.progression < 100 && (
                      <div>
                        <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                          <span>Progression estimée</span>
                          <span className="font-medium">{l.progression}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] transition-all"
                            style={{ width: `${l.progression}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tableau livraisons du mois */}
            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Livraisons du mois — Juillet 2025</h2>
                <span className="text-xs text-gray-500">28 livraisons</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500">
                      {["N°", "Date", "Départ", "Destination", "Contenu", "Poids", "Véhicule", "Chauffeur", "Statut", "Durée"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {livraisonsMois.map((l) => (
                      <tr key={l.num} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-medium text-gray-700 whitespace-nowrap">{l.num}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{l.date}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.depart}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.destination}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.contenu}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{l.poids}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{l.vehicule}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.chauffeur}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatutBadge statut={l.statut} />
                        </td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{l.duree}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB : VÉHICULES & CHAUFFEURS ── */}
        {activeTab === "Véhicules & Chauffeurs" && (
          <div className="space-y-6">
            {/* Parc véhicules */}
            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Parc véhicules</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500">
                      {["Véhicule", "Immat.", "Type", "Capacité", "État", "Compteur", "Prochaine révision", "Chauffeur attitré", "Statut"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vehicules.map((v) => (
                      <tr key={v.nom} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{v.nom}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">{v.immat}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{v.type}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{v.capacite}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {v.etat === "bon" ? (
                            <span className="text-xs text-green-600 font-medium">✅ Bon</span>
                          ) : (
                            <span className="text-xs text-orange-600 font-medium">⚠️ Fuite hydraulique</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{v.km}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{v.revision}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{v.chauffeur}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatutBadge statut={v.statut} label={v.statut === "mission" ? "En mission" : v.statut === "maintenance" ? "Maintenance" : "Disponible"} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chauffeurs */}
            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Chauffeurs</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500">
                      {["Chauffeur", "Permis (valid.)", "Catégories", "Missions YTD", "Km YTD", "Note clients", "Statut"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {chauffeurs.map((c) => (
                      <tr key={c.nom} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{c.nom}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">{c.permis}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-lg font-medium">{c.categories}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap font-medium">{c.missions}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.km}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-[#2E7D32] font-bold text-sm">{c.note}</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <StatutBadge statut={c.statut} label={c.statut === "mission" ? "En mission" : "Disponible"} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB : ITINÉRAIRES ── */}
        {activeTab === "Itinéraires" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Carte schématique — Côte d'Ivoire</h2>
              <CarteCI />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Itinéraires fréquents</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500">
                      {["Route", "Distance", "Durée moy.", "Coût moyen", "Fréquence/mois", "Usage"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {itineraires.map((it) => (
                      <tr key={it.route} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{it.route}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{it.distance}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{it.duree}</td>
                        <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">{it.cout}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{it.freq}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">{it.usage}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB : COÛTS ── */}
        {activeTab === "Coûts" && (
          <div className="space-y-6">
            {/* Coûts YTD */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Coûts transport YTD</h2>
                <span className="text-sm font-bold text-gray-800">Total : 8 400 000 XOF</span>
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Donut */}
                <div className="flex-shrink-0">
                  <DonutChart />
                </div>
                {/* Barres */}
                <div className="flex-1 space-y-4 w-full">
                  {coutCategories.map((c) => (
                    <div key={c.label}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                          <span className="text-sm text-gray-700">{c.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">{c.montant}</span>
                          <span className="text-xs font-bold text-gray-700 w-8 text-right">{c.pct}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Coût par livraison */}
            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Coût par livraison — 5 dernières</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FBF8] text-xs text-gray-500">
                      {["Livraison", "Route", "Distance", "Carburant", "Péage", "Salaire", "Total", "Coût/t"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {coutLivraisons.map((l) => (
                      <tr key={l.num} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-medium text-gray-700 whitespace-nowrap">{l.num}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.route}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{l.distance}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.carburant} XOF</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.peage} XOF</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{l.salaire} XOF</td>
                        <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">{l.total} XOF</td>
                        <td className="px-4 py-3 text-[#2E7D32] font-medium whitespace-nowrap text-xs">{l.coutT}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
