"use client";

import { useState, useEffect } from "react";
import { FileText, CheckCircle, Clock, TrendingUp, Plus, Eye, FileDown, RefreshCw, X } from "lucide-react";
import Topbar from "../../components/Topbar";

const kpis = [
  { label: "Devis 2025", value: "4", unit: "", sub: "Campagne 2025", icon: FileText, iconColor: "#6A1B9A", iconBg: "#F3E5F5" },
  { label: "Convertis en contrat", value: "2", unit: "", sub: "CTR-2025-001 / 002", icon: CheckCircle, iconColor: "#2E7D32", iconBg: "#E8F5E9" },
  { label: "En cours", value: "8,76 M", unit: "XOF", sub: "Valeur devis actifs", icon: Clock, iconColor: "#1565C0", iconBg: "#E3F2FD" },
  { label: "Taux de conversion", value: "50", unit: "%", sub: "2 convertis / 4 émis", icon: TrendingUp, iconColor: "#E65100", iconBg: "#FFF3E0" },
];

type Filtre = "Tous" | "En attente" | "Acceptés" | "Refusés" | "Expirés";

interface Devis {
  numero: string;
  date: string;
  client: string;
  produit: string;
  volume: string;
  montant: number;
  validite: string;
  statut: "Converti" | "En attente" | "Expiration proche";
  ref?: string;
  info?: string;
}

const devisListInit: Devis[] = [
  { numero: "DEV-2025-001", date: "12/12/2024", client: "Barry Callebaut CI", produit: "Cacao Grade AA", volume: "48 000 kg", montant: 52176000, validite: "31/01/2025", statut: "Converti", ref: "CTR-2025-001" },
  { numero: "DEV-2025-002", date: "18/02/2025", client: "Cargill CI", produit: "Anacarde WW240", volume: "2 000 kg", montant: 3050000, validite: "31/03/2025", statut: "Converti", ref: "CTR-2025-002" },
  { numero: "DEV-2025-003", date: "10/07/2025", client: "OLAM Cocoa CI", produit: "Cacao Grade AA", volume: "8 000 kg", montant: 8760000, validite: "09/08/2025", statut: "En attente", info: "J+29" },
  { numero: "DEV-2025-004", date: "28/05/2025", client: "SIFCA (anacarde)", produit: "Anacarde WW320", volume: "3 000 kg", montant: 4620000, validite: "27/07/2025", statut: "Expiration proche", info: "16j" },
];

const FILTRES: Filtre[] = ["Tous", "En attente", "Acceptés", "Refusés", "Expirés"];
const PRODUITS = ["Cacao Grade AA", "Cacao Grade A", "Cacao Grade B", "Anacarde WW240", "Anacarde WW320", "Maïs", "Riz paddy"];
const CLIENTS = ["Barry Callebaut CI", "Cargill CI", "OLAM Cocoa CI", "SIFCA", "Touton SA", "Sucden", "Autre"];

function statutStyle(d: Devis) {
  if (d.statut === "Converti") return { bg: "#E8F5E9", color: "#2E7D32", label: `Converti (${d.ref})`, dot: "#2E7D32" };
  if (d.statut === "En attente") return { bg: "#E3F2FD", color: "#1565C0", label: `En attente (${d.info})`, dot: "#1565C0" };
  return { bg: "#FFF3E0", color: "#E65100", label: `Expiration dans ${d.info}`, dot: "#E65100" };
}

function FunnelChart() {
  const steps = [
    { label: "Devis émis", count: 4, pct: 100, w: 320 },
    { label: "Devis répondus", count: 3, pct: 75, w: 240 },
    { label: "Devis acceptés", count: 2, pct: 50, w: 180 },
    { label: "Contrats signés", count: 2, pct: 50, w: 180 },
  ];
  const barH = 44, gap = 12, svgH = steps.length * (barH + gap) + 20, cx = 200;
  return (
    <svg viewBox={`0 0 400 ${svgH}`} className="w-full" style={{ maxHeight: 280 }}>
      {steps.map((s, i) => {
        const y = 10 + i * (barH + gap), x = cx - s.w / 2, isLast = i === steps.length - 1;
        return (
          <g key={s.label}>
            <rect x={x} y={y} width={s.w} height={barH} rx={8} fill={isLast ? "#1B5E20" : "#2E7D32"} opacity={isLast ? 1 : 0.75 + i * 0.05} />
            <text x={cx} y={y + barH / 2 - 5} textAnchor="middle" fontSize={12} fontWeight={700} fill="#fff">{s.label}</text>
            <text x={cx} y={y + barH / 2 + 10} textAnchor="middle" fontSize={11} fill="#C8E6C9">{s.count} — {s.pct}%</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── MODAL NOUVEAU DEVIS ─── */
function ModalNouveauDevis({ onClose, onSave }: { onClose: () => void; onSave: (d: Devis) => void }) {
  const today = new Date().toISOString().split("T")[0];
  const [client, setClient] = useState("");
  const [produit, setProduit] = useState("");
  const [volumeKg, setVolumeKg] = useState("");
  const [prixUnit, setPrixUnit] = useState("");
  const [validite, setValidite] = useState("");

  const montant = volumeKg && prixUnit ? parseInt(volumeKg) * parseInt(prixUnit) : 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = devisListInit.length + 1;
    const num = `DEV-2025-00${n + 4}`;
    onSave({
      numero: num,
      date: today.split("-").reverse().join("/"),
      client,
      produit,
      volume: `${parseInt(volumeKg).toLocaleString("fr-FR")} kg`,
      montant,
      validite: validite.split("-").reverse().join("/"),
      statut: "En attente",
      info: "J+0",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col overflow-hidden" style={{ maxHeight: "90vh" }}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-semibold text-gray-900">Nouveau devis</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Client <span className="text-red-400">*</span></label>
              <select required value={client} onChange={e => setClient(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400">
                <option value="">Sélectionner un client</option>
                {CLIENTS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Produit <span className="text-red-400">*</span></label>
              <select required value={produit} onChange={e => setProduit(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full bg-white focus:outline-none focus:border-green-400">
                <option value="">Sélectionner un produit</option>
                {PRODUITS.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Volume (kg) <span className="text-red-400">*</span></label>
                <input required type="number" min="1" value={volumeKg} onChange={e => setVolumeKg(e.target.value)} placeholder="ex: 8000" className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Prix unitaire (XOF/kg) <span className="text-red-400">*</span></label>
                <input required type="number" min="1" value={prixUnit} onChange={e => setPrixUnit(e.target.value)} placeholder="ex: 1095" className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400" />
              </div>
            </div>
            {montant > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                <span className="text-xs text-green-700">Montant total : </span>
                <span className="text-sm font-bold text-green-900">{montant.toLocaleString("fr-FR")} XOF</span>
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Date de validité <span className="text-red-400">*</span></label>
              <input required type="date" value={validite} onChange={e => setValidite(e.target.value)} min={today} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm w-full focus:outline-none focus:border-green-400" />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={onClose} className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm hover:bg-gray-50">Annuler</button>
              <button type="submit" className="text-white px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "#2E7D32" }}>Créer le devis</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ─── MODAL VOIR DEVIS ─── */
function ModalVoirDevis({ devis, onClose }: { devis: Devis; onClose: () => void }) {
  const s = statutStyle(devis);
  function handlePDF() {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Devis ${devis.numero}</title>
    <style>body{font-family:Arial,sans-serif;margin:40px;color:#111}h1{color:#1B5E20;font-size:22px;margin-bottom:4px}.meta{color:#666;font-size:12px;margin-bottom:24px}table{width:100%;border-collapse:collapse;margin-bottom:24px}th{background:#1B5E20;color:#fff;padding:10px;text-align:left;font-size:12px}td{padding:10px;border-bottom:1px solid #eee;font-size:12px}.total{font-size:16px;font-weight:bold;color:#1B5E20;text-align:right;margin-top:16px}.footer{margin-top:40px;font-size:11px;color:#999;border-top:1px solid #eee;padding-top:12px}</style>
    </head><body>
    <h1>DEVIS — ${devis.numero}</h1>
    <div class="meta">AGRIFRIK ERP · Émis le ${devis.date} · Valable jusqu'au ${devis.validite}</div>
    <table><thead><tr><th>Client</th><th>Produit</th><th>Volume</th><th>Prix unit. (XOF/kg)</th><th>Montant total</th></tr></thead>
    <tbody><tr><td>${devis.client}</td><td>${devis.produit}</td><td>${devis.volume}</td><td>${Math.round(devis.montant / parseInt(devis.volume.replace(/\D/g, "") || "1")).toLocaleString("fr-FR")}</td><td><strong>${devis.montant.toLocaleString("fr-FR")} XOF</strong></td></tr></tbody></table>
    <div class="total">TOTAL : ${devis.montant.toLocaleString("fr-FR")} XOF</div>
    <div class="footer">Statut : ${s.label} · AGRIFRIK — Gestion Agricole Intelligente · agrifrik.ibigsoft.com</div>
    </body></html>`;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col overflow-hidden" style={{ maxHeight: "90vh" }}>
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900">{devis.numero}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Émis le {devis.date} · Valable jusqu'au {devis.validite}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: "Client", value: devis.client },
              { label: "Produit", value: devis.produit },
              { label: "Volume", value: devis.volume },
              { label: "Montant total", value: `${devis.montant.toLocaleString("fr-FR")} XOF` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Statut :</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: s.bg, color: s.color }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
              {s.label}
            </span>
          </div>
          {devis.ref && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-800">
              ✅ Converti en contrat : <strong>{devis.ref}</strong>
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 shrink-0">
          <button onClick={onClose} className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm hover:bg-gray-50">Fermer</button>
          <button onClick={handlePDF} className="flex items-center gap-1.5 text-white px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "#2E7D32" }}>
            <FileDown size={14} /> Télécharger PDF
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function DevisPage() {
  const [filtre, setFiltre] = useState<Filtre>("Tous");
  const [toast, setToast] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [voirDevis, setVoirDevis] = useState<Devis | null>(null);
  const [liste, setListe] = useState<Devis[]>(devisListInit);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function handleSave(d: Devis) {
    setListe(prev => [...prev, d]);
    setToast(`Devis ${d.numero} créé avec succès`);
  }

  function handlePDFRow(d: Devis) {
    setVoirDevis(d);
  }

  function handleRelancer(d: Devis) {
    setToast(`Email de relance envoyé à ${d.client}`);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Devis" breadcrumb={["Commerce", "Devis"]} />

      <main className="flex-1 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Devis</h1>
            <p className="text-xs text-gray-500 mt-0.5">Propositions commerciales — Campagne 2025</p>
          </div>
          <button
            className="flex items-center gap-1.5 text-white rounded-xl text-xs font-medium px-4 py-2"
            style={{ background: "#2E7D32" }}
            onClick={() => setShowNew(true)}
          >
            <Plus size={14} /> Nouveau devis
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{k.label}</span>
                  <span className="rounded-xl p-2" style={{ background: k.iconBg, color: k.iconColor }}><Icon size={16} /></span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-bold text-gray-900">{k.value}</span>
                  {k.unit && <span className="text-xs text-gray-400 mb-1">{k.unit}</span>}
                </div>
                <span className="text-xs text-gray-400">{k.sub}</span>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
            <div className="flex gap-1.5 flex-wrap">
              {FILTRES.map((f) => (
                <button key={f} onClick={() => setFiltre(f)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  style={filtre === f ? { background: "#2E7D32", color: "#fff" } : { background: "#F5F5F5", color: "#757575" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "#F8FBF8" }}>
                  {["N°", "Date", "Client", "Produit", "Volume", "Montant (XOF)", "Validité", "Statut", "Actions"].map(c => (
                    <th key={c} className="text-left text-gray-500 font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {liste.map((d) => {
                  const s = statutStyle(d);
                  return (
                    <tr key={d.numero} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-semibold whitespace-nowrap" style={{ color: "#6A1B9A" }}>{d.numero}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.date}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{d.client}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{d.produit}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap tabular-nums">{d.volume}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap tabular-nums text-right">{d.montant.toLocaleString("fr-FR")}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{d.validite}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: s.bg, color: s.color }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setVoirDevis(d)} className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2 py-1 hover:bg-gray-50 flex items-center gap-1">
                            <Eye size={11} /> Voir
                          </button>
                          {d.statut !== "Converti" && (
                            <button onClick={() => handlePDFRow(d)} className="border border-gray-200 text-gray-600 rounded-lg text-xs px-2 py-1 hover:bg-gray-50 flex items-center gap-1">
                              <FileDown size={11} /> PDF
                            </button>
                          )}
                          {d.statut === "En attente" && (
                            <button onClick={() => handleRelancer(d)} className="border border-orange-200 text-orange-600 rounded-lg text-xs px-2 py-1 hover:bg-orange-50 flex items-center gap-1">
                              <RefreshCw size={11} /> Relancer
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-gray-500">
            <span>Valeur cumulée : <strong className="text-gray-900">{liste.reduce((s, d) => s + d.montant, 0).toLocaleString("fr-FR")} XOF</strong></span>
            <span className="sm:ml-auto">2 convertis — <strong className="text-gray-900">55 226 000 XOF sécurisés</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Entonnoir de conversion 2025</h3>
            <FunnelChart />
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
              {[{ label: "Émis", v: 4, pct: "100%" }, { label: "Répondus", v: 3, pct: "75%" }, { label: "Acceptés", v: 2, pct: "50%" }, { label: "Signés", v: 2, pct: "50%" }].map(s => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-lg font-bold text-gray-900">{s.v}</span>
                  <span className="text-xs text-gray-400">{s.label}</span>
                  <span className="text-xs font-semibold" style={{ color: "#2E7D32" }}>{s.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-900">Alertes devis</h3>
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 flex items-start gap-3">
              <span className="text-xl mt-0.5 flex-shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-orange-800">DEV-2025-004 expire dans 16 jours</p>
                <p className="text-xs text-orange-700 mt-1">Échéance : 27/07/2025 — SIFCA (anacarde) — 4 620 000 XOF. Contacter SIFCA pour une décision avant expiration.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
              <span className="text-xl mt-0.5 flex-shrink-0">ℹ️</span>
              <div>
                <p className="text-sm font-semibold text-blue-800">DEV-2025-003 en cours chez OLAM Cocoa CI</p>
                <p className="text-xs text-blue-700 mt-1">8 760 000 XOF — Émis le 10/07/2025 (J+29 de validité). Relance recommandée au-delà de 10 jours sans réponse.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-800 mb-2">Contrats issus de devis — 2025</p>
              <div className="flex flex-col gap-1.5 text-xs text-green-700">
                <div className="flex justify-between"><span>DEV-2025-001 → CTR-2025-001 (Barry Callebaut)</span><span className="font-semibold tabular-nums">52 176 000 XOF</span></div>
                <div className="flex justify-between"><span>DEV-2025-002 → CTR-2025-002 (Cargill CI)</span><span className="font-semibold tabular-nums">3 050 000 XOF</span></div>
                <div className="flex justify-between border-t border-green-200 pt-1.5 font-bold text-green-900"><span>Total sécurisé</span><span className="tabular-nums">55 226 000 XOF</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showNew && <ModalNouveauDevis onClose={() => setShowNew(false)} onSave={handleSave} />}
      {voirDevis && <ModalVoirDevis devis={voirDevis} onClose={() => setVoirDevis(null)} />}

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white rounded-xl px-4 py-2 z-50 text-sm font-medium shadow-lg animate-pulse">
          {toast}
        </div>
      )}
    </div>
  );
}
