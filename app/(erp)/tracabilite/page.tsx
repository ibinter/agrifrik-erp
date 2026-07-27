"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { CheckCircle, MapPin, FileText, Download, X } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type Lot = {
  lot: string;
  parcelle: string;
  recolte: string;
  ferment: string;
  sechage: string;
  grade: string;
  poids: string;
  client: string;
  export: string;
  score: string;
  ok: boolean;
  highlight?: boolean;
  pending?: boolean;
};

// ── Données lots ───────────────────────────────────────────────────────────────

const lotsInitiaux: Lot[] = [
  { lot: "LOT-2025-038", parcelle: "PAR-A1+A2", recolte: "05/01", ferment: "6j ✅", sechage: "7j ✅", grade: "AA", poids: "3 200 kg", client: "BC CI", export: "BL-001", score: "100/100", ok: true },
  { lot: "LOT-2025-039", parcelle: "PAR-A1",    recolte: "03/02", ferment: "6j ✅", sechage: "7j ✅", grade: "AA", poids: "3 400 kg", client: "BC CI", export: "BL-002", score: "99/100",  ok: true },
  { lot: "LOT-2025-040", parcelle: "PAR-A2",    recolte: "05/03", ferment: "6j ✅", sechage: "8j ✅", grade: "AA", poids: "3 200 kg", client: "BC CI", export: "BL-003", score: "100/100", ok: true },
  { lot: "LOT-2025-041", parcelle: "PAR-A1+A2", recolte: "08/04", ferment: "6j ✅", sechage: "7j ✅", grade: "AA", poids: "3 600 kg", client: "BC CI", export: "BL-004", score: "99/100",  ok: true },
  { lot: "LOT-2025-042", parcelle: "PAR-A1",    recolte: "05/05", ferment: "6j ✅", sechage: "7j ✅", grade: "AA", poids: "3 400 kg", client: "BC CI", export: "BL-005", score: "100/100", ok: true },
  { lot: "LOT-2025-043", parcelle: "PAR-A2",    recolte: "26/05", ferment: "6j ✅", sechage: "7j ✅", grade: "AA", poids: "964 kg",   client: "BC CI", export: "BL-006", score: "100/100", ok: true },
  { lot: "LOT-2025-044", parcelle: "PAR-A1",    recolte: "12/06", ferment: "6j ✅", sechage: "7j ✅", grade: "AA", poids: "845 kg",   client: "BC CI", export: "BL-007", score: "99/100",  ok: true },
  { lot: "LOT-2025-045", parcelle: "PAR-A2",    recolte: "18/06", ferment: "6j ✅", sechage: "7j ✅", grade: "AA", poids: "892 kg",   client: "BC CI", export: "BL-007", score: "99/100",  ok: true },
  { lot: "LOT-2025-046", parcelle: "PAR-A1+A2", recolte: "28/06", ferment: "6j ✅", sechage: "7j ✅", grade: "AA", poids: "3 400 kg", client: "BC CI", export: "BL-008", score: "100/100", ok: true, highlight: true },
  { lot: "LOT-2025-047", parcelle: "PAR-A1",    recolte: "05/07", ferment: "🔵 En cours", sechage: "⏳", grade: "—", poids: "~2 100 kg est.", client: "BC CI", export: "—", score: "—", ok: false, pending: true },
];

// ── SVG Pipeline ───────────────────────────────────────────────────────────────

const steps = [
  { label: "Parcelles", sub: "(6)", color: "#1B5E20" },
  { label: "Récolte", sub: "3,2t/mois", color: "#2E7D32" },
  { label: "Transformation", sub: "ferment.+séchage", color: "#388E3C" },
  { label: "Contrôle qualité", sub: "BV Soubré", color: "#43A047" },
  { label: "Conditionnement", sub: "9 lots", color: "#4CAF50" },
  { label: "Export", sub: "Barry Callebaut + Rotterdam", color: "#66BB6A" },
];

function Pipeline() {
  const W = 700, H = 120;
  const boxW = 96, boxH = 52, gap = 20;
  const total = steps.length * boxW + (steps.length - 1) * gap;
  const startX = (W - total) / 2;
  const cy = H / 2;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="max-w-full">
      {steps.map((s, i) => {
        const x = startX + i * (boxW + gap);
        return (
          <g key={i}>
            {i > 0 && (
              <>
                <line x1={x - gap} y1={cy} x2={x} y2={cy} stroke="#4CAF50" strokeWidth={2} />
                <polygon points={`${x - 2},${cy - 5} ${x + 6},${cy} ${x - 2},${cy + 5}`} fill="#4CAF50" />
              </>
            )}
            <rect x={x} y={cy - boxH / 2} width={boxW} height={boxH} rx={8} fill={s.color} />
            <text x={x + boxW / 2} y={cy - 6} textAnchor="middle" fontSize={10} fontWeight="700" fill="white">{s.label}</text>
            <text x={x + boxW / 2} y={cy + 9} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,0.8)">{s.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── EUDR data ──────────────────────────────────────────────────────────────────

const eudrCriteres = [
  { critere: "Géolocalisation GPS parcelles", preuve: "Fichier GeoJSON PAR-A1 à PAR-D1", verification: "✅ GFW vérifié" },
  { critere: "0 déforestation depuis 2008", preuve: "Satellite Global Forest Watch", verification: "✅ Vérifié BV" },
  { critere: "Registre traitement phyto", preuve: "AGRIFRIK ERP — 12 entrées 2025", verification: "✅" },
  { critere: "Traçabilité lot individuel", preuve: "AGRIFRIK — lot par lot depuis parcelle", verification: "✅ 100%" },
  { critere: "Certification RA COC", preuve: "RA-CI-2025-EFA001", verification: "✅ Valide" },
];

// ── Modal Nouveau Lot ──────────────────────────────────────────────────────────

const PARCELLES = [
  "PAR-A1 Soubré",
  "PAR-A2 Soubré",
  "PAR-A3 Soubré",
  "PAR-C1 Korhogo",
  "PAR-C2 Korhogo",
];

const CERTIFICATIONS = ["Rainforest Alliance", "UTZ", "Bio", "Standard"];

function generateRef(existing: Lot[]): string {
  const nums = existing
    .map((l) => parseInt(l.lot.replace("LOT-2025-", ""), 10))
    .filter((n) => !isNaN(n));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 48;
  return `LOT-2025-${String(next).padStart(3, "0")}`;
}

type ModalProps = {
  lots: Lot[];
  onClose: () => void;
  onCreer: (lot: Lot) => void;
};

function NouveauLotModal({ lots, onClose, onCreer }: ModalProps) {
  const [ref, setRef] = useState(generateRef(lots));
  const [parcelle, setParcelle] = useState(PARCELLES[0]);
  const [dateRecolte, setDateRecolte] = useState("");
  const [volume, setVolume] = useState("");
  const [operateur, setOperateur] = useState("");
  const [certification, setCertification] = useState(CERTIFICATIONS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!ref.trim()) e.ref = "Champ requis";
    if (!dateRecolte) e.dateRecolte = "Champ requis";
    if (!volume || isNaN(Number(volume)) || Number(volume) <= 0) e.volume = "Volume invalide";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    // Formater la date DD/MM
    const d = new Date(dateRecolte);
    const formatted = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;

    const parcelleCode = parcelle.split(" ")[0]; // ex: PAR-A1

    const nouveau: Lot = {
      lot: ref.trim(),
      parcelle: parcelleCode,
      recolte: formatted,
      ferment: "⏳ À débuter",
      sechage: "⏳",
      grade: "—",
      poids: `${Number(volume).toLocaleString("fr-FR")} kg`,
      client: "—",
      export: "—",
      score: "—",
      ok: false,
      pending: true,
    };

    onCreer(nouveau);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl max-h-[90vh] overflow-hidden flex flex-col w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Nouveau lot</h2>
            <p className="text-xs text-gray-500 mt-0.5">Enregistrer un nouveau lot de traçabilité</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          {/* Référence lot */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Référence lot
            </label>
            <input
              type="text"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              placeholder="LOT-2025-050"
              className={`w-full border rounded-xl px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2E7D32] ${errors.ref ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.ref && <p className="text-xs text-red-500 mt-1">{errors.ref}</p>}
          </div>

          {/* Parcelle d'origine */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Parcelle d&apos;origine
            </label>
            <select
              value={parcelle}
              onChange={(e) => setParcelle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
            >
              {PARCELLES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Date récolte */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Date récolte <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={dateRecolte}
              onChange={(e) => setDateRecolte(e.target.value)}
              className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] ${errors.dateRecolte ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.dateRecolte && <p className="text-xs text-red-500 mt-1">{errors.dateRecolte}</p>}
          </div>

          {/* Volume initial */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Volume initial (kg) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="ex: 3200"
              min={1}
              className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] ${errors.volume ? "border-red-400" : "border-gray-200"}`}
            />
            {errors.volume && <p className="text-xs text-red-500 mt-1">{errors.volume}</p>}
          </div>

          {/* Opérateur */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Opérateur
            </label>
            <input
              type="text"
              value={operateur}
              onChange={(e) => setOperateur(e.target.value)}
              placeholder="Nom de l'opérateur"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            />
          </div>

          {/* Certification visée */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Certification visée
            </label>
            <select
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] bg-white"
            >
              {CERTIFICATIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => {
              const errs = validate();
              if (Object.keys(errs).length > 0) { setErrors(errs); return; }
              const d = new Date(dateRecolte);
              const formatted = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
              const parcelleCode = parcelle.split(" ")[0];
              const nouveau: Lot = {
                lot: ref.trim(),
                parcelle: parcelleCode,
                recolte: formatted,
                ferment: "⏳ À débuter",
                sechage: "⏳",
                grade: "—",
                poids: `${Number(volume).toLocaleString("fr-FR")} kg`,
                client: "—",
                export: "—",
                score: "—",
                ok: false,
                pending: true,
              };
              onCreer(nouveau);
            }}
            className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-5 py-2.5 hover:bg-[#1B5E20] transition-colors"
          >
            Créer le lot
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function TracabilitePage() {
  const [lots, setLots] = useState<Lot[]>(lotsInitiaux);
  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleCreer(lot: Lot) {
    setLots((prev) => [...prev, lot]);
    setShowModal(false);
    setToast("Lot créé avec succès");
    setTimeout(() => setToast(""), 4000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar />

      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* ── En-tête ── */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Traçabilité Cacao</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Chaîne de contrôle masse — Lot par lot — Certification RA COC
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="mt-2 sm:mt-0 self-start bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors"
          >
            + Nouveau lot
          </button>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <FileText size={18} className="text-[#2E7D32]" />, bg: "bg-green-50", label: "Lots tracés 2025", value: String(lots.length), sub: "registre complet" },
            { icon: <MapPin size={18} className="text-blue-600" />, bg: "bg-blue-50", label: "Traçabilité GPS", value: "100%", sub: "toutes parcelles" },
            { icon: <CheckCircle size={18} className="text-[#2E7D32]" />, bg: "bg-green-50", label: "Score moyen", value: "99,2/100", sub: "traçabilité lots" },
            { icon: <CheckCircle size={18} className="text-purple-600" />, bg: "bg-purple-50", label: "Ruptures chaîne", value: "0", sub: "aucune rupture 2025" },
          ].map((k, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 flex items-start gap-3">
              <div className={`${k.bg} rounded-xl p-2 shrink-0`}>{k.icon}</div>
              <div>
                <div className="text-xs text-gray-500">{k.label}</div>
                <div className="text-xl font-bold text-gray-900">{k.value}</div>
                <div className="text-xs text-gray-400">{k.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pipeline SVG ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Flux global traçabilité 2025</h2>
          <div className="overflow-x-auto">
            <Pipeline />
          </div>
          <p className="text-[11px] text-gray-400 mt-2">De la parcelle à l&apos;export — chaque lot suivi individuellement · 9 lots exportés vers Barry Callebaut CI + Rotterdam 2025</p>
        </div>

        {/* ── Tableau des lots ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Registre des lots 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Lot", "Parcelle", "Récolte", "Ferment.", "Séchage", "Grade", "Poids net", "Client", "Export", "Score"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lots.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-gray-50 ${
                      row.highlight ? "bg-green-50/40 font-medium" :
                      row.pending   ? "bg-blue-50/30" :
                      "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-3 py-2.5 font-mono text-gray-800 whitespace-nowrap">{row.lot}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{row.parcelle}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{row.recolte}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{row.ferment}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{row.sechage}</td>
                    <td className="px-3 py-2.5">
                      {row.ok ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-[10px] font-semibold">AA ✅</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row.poids}</td>
                    <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{row.client}</td>
                    <td className="px-3 py-2.5 font-mono text-gray-600 whitespace-nowrap">{row.export}</td>
                    <td className="px-3 py-2.5">
                      {row.score !== "—" ? (
                        <span className={`font-semibold ${row.score === "100/100" ? "text-[#2E7D32]" : "text-gray-700"}`}>{row.score}</span>
                      ) : (
                        <span className="text-gray-400 italic text-[11px]">En cours</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Conformité EUDR ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Conformité EUDR 2025</h2>

          {/* Badge conforme */}
          <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3 mb-4">
            <CheckCircle size={20} className="text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">✅ Conforme Règlement UE 2023/1115 (EUDR)</p>
              <p className="text-xs text-green-600 mt-0.5">Toutes les preuves requises sont disponibles et vérifiées — 5/5 critères validés</p>
            </div>
          </div>

          {/* Table des preuves */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Critère EUDR", "Preuve disponible", "Vérification"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {eudrCriteres.map((row, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2.5 font-medium text-gray-800">{row.critere}</td>
                    <td className="px-3 py-2.5 text-gray-600">{row.preuve}</td>
                    <td className="px-3 py-2.5">
                      <span className="text-green-700 font-semibold">{row.verification}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bouton rapport */}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors"
          >
            <Download size={14} />
            Générer rapport EUDR complet
          </button>
          <span className="ml-3 text-[11px] text-gray-400">(export PDF simulé — EUDR DDS prêt)</span>
        </div>

      </div>

      {/* ── Modal ── */}
      {showModal && (
        <NouveauLotModal
          lots={lots}
          onClose={() => setShowModal(false)}
          onCreer={handleCreer}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm rounded-xl px-5 py-3 shadow-lg animate-fade-in">
          {toast}
          <button onClick={() => setToast("")} className="ml-4 text-gray-400 hover:text-white font-bold">✕</button>
        </div>
      )}
    </div>
  );
}
