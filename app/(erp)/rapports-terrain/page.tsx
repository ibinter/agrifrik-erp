"use client";

import { useState, useRef } from "react";
import Topbar from "../../components/Topbar";
import {
  Search, Filter, MapPin, Camera, CheckCircle, AlertTriangle,
  Clock, FileText, BarChart2, ChevronDown, Upload, Navigation,
} from "lucide-react";

const TABS = ["Rapports", "Formulaire", "Tableaux de bord"] as const;
type Tab = typeof TABS[number];

type CriticiteType = "haute" | "moyen" | "bas";
type StatutType = "en-cours" | "commande" | "planifie" | "resolu";

interface Rapport {
  ref: string;
  date: string;
  operateur: string;
  lieu: string;
  type: string;
  parcelle?: string;
  surface?: string;
  resume: string[];
  meteo?: string;
  epi?: boolean;
  coords?: string;
  photos?: number;
}

const RAPPORTS: Rapport[] = [
  {
    ref: "RT-2025-082",
    date: "11/07/2025",
    operateur: "Ibrahim Sawadogo",
    lieu: "Soubré Nord — PAR-B1",
    type: "Opération culturale + Traitement",
    parcelle: "PAR-B1",
    surface: "3,2 ha",
    resume: [
      "Traitement mildiou — Ridomil Gold 68 WG 2,5 g/L × 120 L",
      "Intervention 08h30-10h45 — 100% PAR-B1 traité",
      "3 cabosses supplémentaires infectées retirées",
      "Traitement préventif PAR-A3 recommandé si pluies >30 mm la semaine prochaine",
    ],
    meteo: "Ensoleillé, vent faible (<5 km/h) — conditions optimales",
    epi: true,
    coords: "5°47'12\"N 6°36'24\"W",
    photos: 3,
  },
  {
    ref: "RT-2025-081",
    date: "11/07/2025",
    operateur: "Adjoua Messou",
    lieu: "Entrepôt A",
    type: "Contrôle qualité lot",
    parcelle: "LOT-2025-048",
    resume: [
      "Cut test : 85 fèves — 89% brunes, 8% violettes, 3% ardoisées",
      "Indice fermentation : 89/100 — Progression normale (objectif J6 : ≥94%)",
      "Température bac : 48°C (cible J5 : 44-52°C) ✓",
      "Humidité entrepôt : 64% ✓ — Ne pas sécher avant J6. Retourner à 14h00.",
    ],
  },
  {
    ref: "RT-2025-080",
    date: "10/07/2025",
    operateur: "Konan Yao",
    lieu: "Parcelle PAR-A3",
    type: "Inspection phénologique",
    parcelle: "PAR-A3",
    surface: "—",
    resume: [
      "Stade fructification — 68% cabosses au stade vert mature",
      "2 840 cabosses estimées → projection 3,4 t fèves fraîches → ~1,07 t cacao sec",
      "Pathologies : 0 miride, 2 cabosses suintement (isolées) ✓",
      "Prochaine inspection : 18/07/2025",
    ],
  },
  {
    ref: "RT-2025-079",
    date: "09/07/2025",
    operateur: "Bamba Oumar",
    lieu: "Atelier maintenance",
    type: "Rapport de maintenance",
    resume: [
      "Équipement : MAT-001 (JD 6120M) — Fuite hydraulique confirmée",
      "Flexible HP AT366488 rompu côté raccord — Circuit isolé",
      "BC ACH-2025-091 émis — Pièces ETA 15/07/2025",
      "Perte exploitation estimée : 6 jours non-disponibilité (report labour PAR-D2)",
    ],
  },
  {
    ref: "RT-2025-078", date: "09/07/2025", operateur: "Ibrahim Sawadogo", lieu: "PAR-B1", type: "Inspection phyto",
    resume: ["Détection foyer mildiou — 12 cabosses infectées sur rang N-O", "Délimitation foyer — Traitement programmé 11/07"],
  },
  {
    ref: "RT-2025-077", date: "08/07/2025", operateur: "Aïcha Diabaté", lieu: "PAR-C2", type: "Opération culturale",
    resume: ["Désherbage mécanique 1,8 ha — Finalisé 100%", "Paillage complémentaire pied des jeunes plants"],
  },
  {
    ref: "RT-2025-076", date: "08/07/2025", operateur: "Adjoua Messou", lieu: "Entrepôt A", type: "Contrôle qualité",
    resume: ["LOT-2025-047 — Séchage J4 : humidité 7,8% (objectif ≤8%) ✓", "Mise en sac autorisée — Poids net 580 kg"],
  },
  {
    ref: "RT-2025-075", date: "07/07/2025", operateur: "Moussa Traoré", lieu: "Transport", type: "Rapport transport",
    resume: ["Livraison 580 kg cacao sec — Coopérative Soubré Nord", "Bon de livraison BL-2025-034 signé"],
  },
  {
    ref: "RT-2025-074", date: "07/07/2025", operateur: "Sékou Bamba", lieu: "PAR-A1", type: "Opération culturale",
    resume: ["Taille sanitaire 45 cacaoyers — Rejet de gourmands", "Débris végétaux évacués et compostés"],
  },
  {
    ref: "RT-2025-073", date: "06/07/2025", operateur: "Konan Yao", lieu: "PAR-A3", type: "Fertilisation",
    resume: ["Épandage KCl 45 kg/ha × 2,1 ha — Traitement déficit potassique", "Irrigation post-épandage 30 min"],
  },
  {
    ref: "RT-2025-072", date: "05/07/2025", operateur: "Ibrahim Sawadogo", lieu: "PAR-B1/B2", type: "Récolte",
    resume: ["Récolte mi-saison — 142 cabosses récoltées sur PAR-B1", "Cabosse fraîche : 840 kg — Écabossage programmé 06/07"],
  },
  {
    ref: "RT-2025-071", date: "04/07/2025", operateur: "Bamba Oumar", lieu: "Atelier", type: "Maintenance préventive",
    resume: ["Révision MAT-002 (JD 5075E) — 500h — Filtres + huile moteur", "Matériel restitué opérationnel"],
  },
];

const TYPE_COLORS: Record<string, string> = {
  "Opération culturale + Traitement": "bg-purple-100 text-purple-700",
  "Contrôle qualité lot": "bg-blue-100 text-blue-700",
  "Inspection phénologique": "bg-green-100 text-green-700",
  "Rapport de maintenance": "bg-orange-100 text-orange-700",
  "Opération culturale": "bg-teal-100 text-teal-700",
  "Contrôle qualité": "bg-blue-100 text-blue-700",
  "Rapport transport": "bg-gray-100 text-gray-700",
  "Fertilisation": "bg-lime-100 text-lime-700",
  "Récolte": "bg-yellow-100 text-yellow-700",
  "Maintenance préventive": "bg-orange-100 text-orange-700",
  "Inspection phyto": "bg-red-100 text-red-700",
};

const ANOMALIES = [
  { date: "09/07", rapporteur: "Ibrahim S.", anomalie: "Cabosses infectées mildiou PAR-B1", parcelle: "PAR-B1", criticite: "haute" as CriticiteType, statut: "en-cours" as StatutType },
  { date: "09/07", rapporteur: "Bamba O.", anomalie: "Fuite hydraulique MAT-001", parcelle: "—", criticite: "haute" as CriticiteType, statut: "commande" as StatutType },
  { date: "02/07", rapporteur: "Konan Y.", anomalie: "Déficit hydrique visible PAR-A3", parcelle: "PAR-A3", criticite: "moyen" as CriticiteType, statut: "planifie" as StatutType },
  { date: "28/06", rapporteur: "Adjoua M.", anomalie: "Humidité LOT-047 à 8,1% (seuil 8%)", parcelle: "Entrepôt A", criticite: "moyen" as CriticiteType, statut: "resolu" as StatutType },
];

const CRITICITE_BADGES: Record<CriticiteType, string> = {
  haute: "bg-red-100 text-red-700",
  moyen: "bg-yellow-100 text-yellow-700",
  bas: "bg-green-100 text-green-700",
};

const CRITICITE_LABELS: Record<CriticiteType, string> = {
  haute: "Haute",
  moyen: "Moyen",
  bas: "Bas",
};

const STATUT_LABELS: Record<StatutType, { label: string; cls: string }> = {
  "en-cours": { label: "Traitement en cours", cls: "bg-orange-100 text-orange-700" },
  "commande": { label: "Pièces commandées", cls: "bg-blue-100 text-blue-700" },
  "planifie": { label: "Fertilisation planifiée", cls: "bg-purple-100 text-purple-700" },
  "resolu": { label: "Résolu", cls: "bg-green-100 text-green-700" },
};

function RapportsTab() {
  const [search, setSearch] = useState("");
  const filtered = RAPPORTS.filter(r =>
    r.operateur.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase()) ||
    r.ref.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Stats + Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un rapport..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Tous", "Par parcelle", "Par opérateur", "Par type"].map(f => (
            <button key={f} className="text-xs px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:border-[#2E7D32] hover:text-[#2E7D32] transition-colors flex items-center gap-1">
              <Filter size={11} />{f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 ml-auto text-xs text-gray-500">
          <span><span className="font-semibold text-gray-800">82</span> rapports YTD</span>
          <span><span className="font-semibold text-gray-800">4,2</span> / semaine</span>
          <span className="flex items-center gap-1"><MapPin size={11} className="text-green-500" /><span className="font-semibold text-gray-800">100%</span> géolocalisés</span>
        </div>
      </div>

      {/* Liste rapports */}
      <div className="space-y-3">
        {filtered.map((r, i) => {
          const typeColor = TYPE_COLORS[r.type] ?? "bg-gray-100 text-gray-700";
          return (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 hover:border-gray-200 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-sm text-[#2E7D32]">{r.ref}</span>
                  <span className="text-xs text-gray-400">{r.date}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColor}`}>{r.type}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-xs text-gray-500">
                  {r.photos && (
                    <span className="flex items-center gap-1"><Camera size={11} />{r.photos} photos</span>
                  )}
                  {r.coords && (
                    <span className="flex items-center gap-1"><MapPin size={11} className="text-green-500" />{r.coords}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs text-gray-600">
                <span><span className="text-gray-400">Opérateur :</span> <span className="font-medium">{r.operateur}</span></span>
                <span><span className="text-gray-400">Lieu :</span> {r.lieu}</span>
                {r.parcelle && <span><span className="text-gray-400">Parcelle/Lot :</span> {r.parcelle}</span>}
                {r.surface && <span><span className="text-gray-400">Surface :</span> {r.surface}</span>}
                {r.meteo && <span><span className="text-gray-400">Météo :</span> {r.meteo}</span>}
                {r.epi !== undefined && (
                  <span className="flex items-center gap-1">
                    <span className="text-gray-400">EPI :</span>
                    {r.epi ? <CheckCircle size={11} className="text-green-500" /> : <AlertTriangle size={11} className="text-red-500" />}
                    <span className={r.epi ? "text-green-600" : "text-red-600"}>{r.epi ? "Conformes" : "Non conformes"}</span>
                  </span>
                )}
              </div>

              <ul className="space-y-1">
                {r.resume.map((line, li) => (
                  <li key={li} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#4CAF50] shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FormulaireTab() {
  const [typeRapport, setTypeRapport] = useState("");
  const [meteo, setMeteo] = useState("");
  const [epi, setEpi] = useState<Record<string, boolean>>({});
  const [coords, setCoords] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [signed, setSigned] = useState(false);

  const toggleEpi = (item: string) => setEpi(prev => ({ ...prev, [item]: !prev[item] }));

  const captureGPS = () => {
    setCoords("5°47'09\"N 6°36'31\"W — Précision : ±3 m");
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    const rect = canvasRef.current!.getBoundingClientRect();
    if (!ctx) return;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#1B5E20";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    setSigned(true);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setSigned(false);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 max-w-3xl space-y-6">
      <h2 className="font-semibold text-gray-800">Nouveau rapport terrain</h2>

      {/* Type + Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Type de rapport *</label>
          <div className="relative">
            <select
              value={typeRapport}
              onChange={e => setTypeRapport(e.target.value)}
              className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32]"
            >
              <option value="">Sélectionner…</option>
              {["Opération culturale", "Contrôle qualité", "Maintenance", "Incident", "Récolte", "Inspection phyto"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Date et heure *</label>
          <input
            type="datetime-local"
            defaultValue="2025-07-11T08:00"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32]"
          />
        </div>
      </div>

      {/* Parcelles + Opérateur */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-600 mb-2 block">Parcelle(s) concernée(s)</label>
          <div className="grid grid-cols-2 gap-2">
            {["PAR-A1", "PAR-A3", "PAR-B1", "PAR-B2", "PAR-C2", "PAR-D2", "Entrepôt A", "Atelier"].map(p => (
              <label key={p} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#2E7D32]" />
                <span className="text-xs text-gray-700">{p}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Opérateur *</label>
          <div className="relative">
            <select className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32]">
              <option value="">Sélectionner…</option>
              {["Ibrahim Sawadogo", "Konan Yao", "Adjoua Messou", "Bamba Oumar", "Aïcha Diabaté", "Sékou Bamba", "Moussa Traoré"].map(e => (
                <option key={e}>{e}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <label className="text-xs font-medium text-gray-600 mt-4 mb-2 block">Conditions météo</label>
          <div className="flex flex-wrap gap-2">
            {["Ensoleillé", "Nuageux", "Pluvieux", "Vent fort"].map(m => (
              <label key={m} className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="meteo" value={m} checked={meteo === m} onChange={() => setMeteo(m)} className="accent-[#2E7D32]" />
                <span className="text-xs text-gray-700">{m}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Description + Résultats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Description de l&apos;opération *</label>
          <textarea
            rows={4}
            placeholder="Décrire l'opération réalisée, les produits utilisés, les quantités…"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32]"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Résultats / Observations</label>
          <textarea
            rows={4}
            placeholder="Résultats obtenus, anomalies constatées, recommandations…"
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32]"
          />
        </div>
      </div>

      {/* EPI */}
      <div>
        <label className="text-xs font-medium text-gray-600 mb-2 block">EPI portés lors de l&apos;intervention</label>
        <div className="flex flex-wrap gap-3">
          {["Masque FFP2", "Gants nitrile", "Lunettes protection", "Combinaison", "Bottes"].map(item => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!epi[item]} onChange={() => toggleEpi(item)} className="accent-[#2E7D32]" />
              <span className="text-xs text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Photos upload */}
      <div>
        <label className="text-xs font-medium text-gray-600 mb-2 block">Photos de l&apos;intervention</label>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map(n => (
            <div
              key={n}
              onDragOver={e => { e.preventDefault(); setDragOver(n); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={e => { e.preventDefault(); setDragOver(null); }}
              className={`border-2 border-dashed rounded-xl h-24 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                dragOver === n ? "border-[#2E7D32] bg-green-50" : "border-gray-200 hover:border-gray-300 bg-gray-50"
              }`}
            >
              <Upload size={18} className="text-gray-400" />
              <span className="text-[10px] text-gray-400">Photo {n}</span>
              <span className="text-[9px] text-gray-300">Glisser ou cliquer</span>
            </div>
          ))}
        </div>
      </div>

      {/* GPS */}
      <div>
        <label className="text-xs font-medium text-gray-600 mb-2 block">Géolocalisation</label>
        <div className="flex items-center gap-3">
          <button
            onClick={captureGPS}
            className="flex items-center gap-2 text-xs bg-[#2E7D32] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#1B5E20] transition-colors"
          >
            <Navigation size={13} /> Capturer GPS
          </button>
          {coords && (
            <span className="text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <MapPin size={12} /> {coords}
            </span>
          )}
        </div>
      </div>

      {/* Signature */}
      <div>
        <label className="text-xs font-medium text-gray-600 mb-2 block">Signature de l&apos;opérateur</label>
        <div className="border border-gray-200 rounded-xl overflow-hidden w-full max-w-sm bg-gray-50">
          <canvas
            ref={canvasRef}
            width={380}
            height={100}
            className="w-full cursor-crosshair"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={() => setDrawing(false)}
            onMouseLeave={() => setDrawing(false)}
          />
        </div>
        {signed && (
          <button onClick={clearCanvas} className="mt-1 text-[10px] text-gray-400 hover:text-gray-600 underline">Effacer la signature</button>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-5 py-2.5 hover:bg-[#1B5E20] transition-colors">
          Enregistrer le rapport
        </button>
        <button className="bg-gray-100 text-gray-600 rounded-xl text-xs font-medium px-5 py-2.5 hover:bg-gray-200 transition-colors">
          Enregistrer brouillon
        </button>
      </div>
    </div>
  );
}

function TableauxDeBordTab() {
  // Bar chart data
  const barData = [
    { label: "Ibrahim S.", value: 28 },
    { label: "Konan Y.", value: 22 },
    { label: "Adjoua M.", value: 18 },
    { label: "Bamba O.", value: 14 },
    { label: "Autres", value: 10 },
  ];
  const barMax = 28;

  // Donut data
  const donutData = [
    { label: "Op. culturale", pct: 42, color: "#2E7D32" },
    { label: "Ctrl qualité", pct: 28, color: "#3b82f6" },
    { label: "Maintenance", pct: 14, color: "#f97316" },
    { label: "Récolte", pct: 10, color: "#eab308" },
    { label: "Incident", pct: 6, color: "#ef4444" },
  ];

  // Donut path builder
  const cx = 90, cy = 90, r = 60, ir = 36;
  let startAngle = -Math.PI / 2;
  const donutPaths = donutData.map(seg => {
    const angle = (seg.pct / 100) * 2 * Math.PI;
    const x1o = cx + r * Math.cos(startAngle);
    const y1o = cy + r * Math.sin(startAngle);
    const x1i = cx + ir * Math.cos(startAngle);
    const y1i = cy + ir * Math.sin(startAngle);
    startAngle += angle;
    const x2o = cx + r * Math.cos(startAngle);
    const y2o = cy + r * Math.sin(startAngle);
    const x2i = cx + ir * Math.cos(startAngle);
    const y2i = cy + ir * Math.sin(startAngle);
    const large = angle > Math.PI ? 1 : 0;
    const d = `M ${x1i} ${y1i} L ${x1o} ${y1o} A ${r} ${r} 0 ${large} 1 ${x2o} ${y2o} L ${x2i} ${y2i} A ${ir} ${ir} 0 ${large} 0 ${x1i} ${y1i} Z`;
    return { ...seg, d };
  });

  return (
    <div className="space-y-6">
      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart2 size={16} className="text-[#2E7D32]" /> Rapports par opérateur — YTD 2025
          </h2>
          <svg viewBox="0 0 300 180" className="w-full" aria-label="Rapports par opérateur">
            {barData.map((item, i) => {
              const barW = (item.value / barMax) * 200;
              const y = i * 33 + 10;
              return (
                <g key={i}>
                  <text x={0} y={y + 14} fontSize={9.5} fill="#374151">{item.label}</text>
                  <rect x={82} y={y + 2} width={barW} height={20} fill="#2E7D32" rx={4} opacity={0.85} />
                  <text x={82 + barW + 4} y={y + 15} fontSize={10} fill="#374151" fontWeight="600">{item.value}</text>
                </g>
              );
            })}
            <text x={82} y={175} fontSize={9} fill="#9ca3af">0</text>
            <text x={165} y={175} fontSize={9} fill="#9ca3af">14</text>
            <text x={278} y={175} fontSize={9} fill="#9ca3af">28</text>
          </svg>
        </div>

        {/* Donut chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Répartition par type de rapport</h2>
          <div className="flex items-center gap-6">
            <svg viewBox="0 0 180 180" className="w-40 h-40 shrink-0" aria-label="Répartition types rapports">
              {donutPaths.map((seg, i) => (
                <path key={i} d={seg.d} fill={seg.color} opacity={0.9} />
              ))}
              <text x={cx} y={cy - 4} textAnchor="middle" fontSize={11} fill="#374151" fontWeight="700">82</text>
              <text x={cx} y={cy + 10} textAnchor="middle" fontSize={8} fill="#9ca3af">rapports</text>
            </svg>
            <div className="space-y-2">
              {donutData.map((seg, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
                  <span className="text-xs text-gray-700">{seg.label}</span>
                  <span className="text-xs font-semibold text-gray-800 ml-auto">{seg.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table anomalies */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
        <h2 className="font-semibold text-gray-800 mb-4">Anomalies signalées — 30 derniers jours</h2>
        <table className="w-full text-xs min-w-[600px]">
          <thead>
            <tr className="bg-[#F8FBF8]">
              {["Date", "Rapporteur", "Anomalie", "Parcelle", "Criticité", "Statut"].map(h => (
                <th key={h} className="text-left py-2 px-3 font-medium text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {ANOMALIES.map((a, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="py-2.5 px-3 text-gray-600">{a.date}</td>
                <td className="py-2.5 px-3 text-gray-700 font-medium">{a.rapporteur}</td>
                <td className="py-2.5 px-3 text-gray-700 max-w-xs">{a.anomalie}</td>
                <td className="py-2.5 px-3 text-gray-500">{a.parcelle}</td>
                <td className="py-2.5 px-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${CRITICITE_BADGES[a.criticite]}`}>
                    {CRITICITE_LABELS[a.criticite]}
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${STATUT_LABELS[a.statut].cls}`}>
                    {STATUT_LABELS[a.statut].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function RapportsTerrainPage() {
  const [tab, setTab] = useState<Tab>("Rapports");

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Rapports Terrain"]} />
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Rapports Terrain</h1>
            <p className="text-xs text-gray-500 mt-0.5">Rapports quotidiens des équipes terrain — Semaine 29</p>
          </div>
          <button className="flex items-center gap-2 text-xs bg-[#2E7D32] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#1B5E20] transition-colors">
            <FileText size={13} /> Nouveau rapport
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 w-fit">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                tab === t
                  ? "bg-[#2E7D32] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Rapports" && <RapportsTab />}
        {tab === "Formulaire" && <FormulaireTab />}
        {tab === "Tableaux de bord" && <TableauxDeBordTab />}
      </main>
    </div>
  );
}
