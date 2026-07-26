"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import ModalRecolte from "../../components/modals/ModalRecolte";
import ExportButton from "../../components/ui/ExportButton";
import { Sprout, MapPin, TrendingUp, BarChart2, AlertTriangle } from "lucide-react";

type Tab = "overview" | "cacao" | "anacarde" | "vivrieres" | "phenologie";

const parcelles = [
  { id: "PAR-A1", nom: "Bloc A â€“ Zone Nord 1", surface: 6.2, culture: "Cacao AA", stade: "Production â€” Cabosses", cert: "RA", derniereOp: "Taille 08/07", prochainActe: "Traitement 20/07", score: 96, alerte: false },
  { id: "PAR-A2", nom: "Bloc A â€“ Zone Nord 2", surface: 5.8, culture: "Cacao AA", stade: "Production", cert: "RA", derniereOp: "Taille 08/07", prochainActe: "Taille 10/07", score: 94, alerte: false },
  { id: "PAR-A3", nom: "Bloc A â€“ Zone Nord 3", surface: 4.8, culture: "Cacao AA", stade: "Production", cert: "RA", derniereOp: "Taille 10/07", prochainActe: "Ã‰pandage K 20/07", score: 88, alerte: true },
  { id: "PAR-B1", nom: "Bloc B â€“ Centre 1", surface: 3.2, culture: "Cacao A", stade: "Production", cert: "RA", derniereOp: "Traitement Ridomil 11/07", prochainActe: "â€”", score: 82, alerte: true },
  { id: "PAR-B2", nom: "Bloc B â€“ Centre 2", surface: 3.4, culture: "Cacao A", stade: "Production", cert: "RA", derniereOp: "Entretien", prochainActe: "Entretien 14/07", score: 90, alerte: false },
  { id: "PAR-C1", nom: "Bloc C â€“ Anacarde 1", surface: 5.6, culture: "Anacarde", stade: "Post-rÃ©colte", cert: "Attente RA", derniereOp: "Sarclage", prochainActe: "Taille formation", score: 78, alerte: false },
  { id: "PAR-C2", nom: "Bloc C â€“ Anacarde 2", surface: 4.8, culture: "Anacarde", stade: "Post-rÃ©colte", cert: "Attente RA", derniereOp: "Sarclage", prochainActe: "â€”", score: 76, alerte: false },
  { id: "PAR-D1", nom: "Bloc D â€“ Vivrier 1", surface: 5.6, culture: "MaÃ¯s cycle 2", stade: "Semis juillet", cert: "â€”", derniereOp: "PrÃ©paration sol", prochainActe: "Semis 15/07", score: 72, alerte: false },
  { id: "PAR-D2", nom: "Bloc D â€“ Vivrier 2", surface: 2.4, culture: "Anacarde", stade: "Post-rÃ©colte", cert: "â€”", derniereOp: "â€”", prochainActe: "â€”", score: 65, alerte: false },
  { id: "PAR-E1", nom: "Bloc E â€“ Anacarde Grand", surface: 8.2, culture: "Anacarde", stade: "Production", cert: "â€”", derniereOp: "RÃ©colte Mars-Mai âœ“", prochainActe: "â€”", score: 80, alerte: false },
  { id: "PAR-E2", nom: "Bloc E â€“ Vivrier 2", surface: 5.8, culture: "MaÃ¯s", stade: "RÃ©colte", cert: "â€”", derniereOp: "RÃ©colte en cours", prochainActe: "Export", score: 75, alerte: false },
  { id: "PAR-F1", nom: "Bloc F â€“ Jeune plantation", surface: 6.0, culture: "Cacao jeune", stade: "Croissance an 2", cert: "AB prÃ©vu", derniereOp: "Entretien jeunes plants", prochainActe: "â€”", score: 85, alerte: false },
];

const exportData = parcelles.map((p) => ({
  parcelle: p.id,
  nom: p.nom,
  surface: p.surface,
  stade: p.stade,
  statut: p.cert,
  rendementPrevu: p.score,
}));

const cacaoDetails = [
  { parcelle: "PAR-A1", surface: 6.2, variete: "F3 hybrid", age: "17 ans", cabosses: 24, poidsMoy: "420g", rendement: "1,28 t/ha", alerte: "" },
  { parcelle: "PAR-A2", surface: 5.8, variete: "F3 hybrid", age: "17 ans", cabosses: 22, poidsMoy: "418g", rendement: "1,24 t/ha", alerte: "" },
  { parcelle: "PAR-A3", surface: 4.8, variete: "F1 hybrid", age: "10 ans", cabosses: 20, poidsMoy: "405g", rendement: "1,22 t/ha", alerte: "Besoin KCl" },
  { parcelle: "PAR-B1", surface: 3.2, variete: "F1", age: "8 ans", cabosses: 18, poidsMoy: "388g", rendement: "1,15 t/ha", alerte: "Mildiou suspectÃ©" },
  { parcelle: "PAR-B2", surface: 3.4, variete: "F1", age: "8 ans", cabosses: 19, poidsMoy: "395g", rendement: "1,18 t/ha", alerte: "" },
  { parcelle: "PAR-F1", surface: 6.0, variete: "F3 hybrid", age: "2 ans", cabosses: null, poidsMoy: "N/A", rendement: "â€”", alerte: "1Ã¨re rÃ©colte Oct 2026" },
];

const anacardeBilan = [
  { parcelle: "PAR-C1", surface: 5.6, rendement: "1,28 t/ha", production: "7,2 t", qualite: "WW240", venduA: "NestlÃ© CI + Olam" },
  { parcelle: "PAR-C2", surface: 4.8, rendement: "1,26 t/ha", production: "6,0 t", qualite: "WW240", venduA: "NestlÃ© CI" },
  { parcelle: "PAR-D2", surface: 2.4, rendement: "0,82 t/ha", production: "2,0 t", qualite: "RW180", venduA: "SIPEF Trading" },
  { parcelle: "PAR-E1", surface: 8.2, rendement: "1,38 t/ha", production: "11,3 t", qualite: "WW240 + RW180", venduA: "Olam + SIPEF" },
  { parcelle: "PAR-E2", surface: 5.8, rendement: "N/A (MaÃ¯s)", production: "â€”", qualite: "â€”", venduA: "â€”" },
];

const vivrierBilan = [
  { culture: "MaÃ¯s cycle 1", parcelle: "PAR-D1", surface: "5,6 ha", cycle: "90j", semis: "Mar", recolte: "Jun âœ“", production: "3,4 t", ca: "612 000" },
  { culture: "MaÃ¯s cycle 1", parcelle: "PAR-E2", surface: "5,8 ha", cycle: "90j", semis: "Mar", recolte: "Jun-Jul âœ“", production: "3,5 t", ca: "630 000" },
  { culture: "Riz paddy", parcelle: "PAR-D1", surface: "2,0 ha", cycle: "110j", semis: "Avr", recolte: "AoÃ» (prÃ©vu)", production: "1,8 t (prÃ©vu)", ca: "396 000" },
  { culture: "MaÃ¯s cycle 2", parcelle: "PAR-D1", surface: "5,6 ha", cycle: "90j", semis: "Jul (prÃ©vu)", recolte: "Oct", production: "3,4 t (prÃ©vu)", ca: "612 000" },
  { culture: "MaÃ¯s cycle 2", parcelle: "PAR-E2", surface: "5,8 ha", cycle: "90j", semis: "Jul (prÃ©vu)", recolte: "Oct", production: "3,5 t (prÃ©vu)", ca: "630 000" },
];

function ScoreBar({ score }: { score: number }) {
  const color = score >= 90 ? "#2E7D32" : score >= 75 ? "#F9A825" : "#E53935";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-semibold tabular-nums" style={{ color }}>{score}</span>
    </div>
  );
}

function CertBadge({ cert }: { cert: string }) {
  if (cert === "RA") return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">RA âœ“</span>;
  if (cert === "AB prÃ©vu") return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">AB prÃ©vu</span>;
  if (cert.startsWith("Attente")) return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">En cours</span>;
  return <span className="text-gray-300 text-xs">â€”</span>;
}

const TABS: { key: Tab; label: string }[] = [
  { key: "overview", label: "Vue d'ensemble" },
  { key: "cacao", label: "Cacao" },
  { key: "anacarde", label: "Anacarde" },
  { key: "vivrieres", label: "VivriÃ¨res" },
  { key: "phenologie", label: "Stades phÃ©nologiques" },
];

export default function CulturesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [modalRecolteOpen, setModalRecolteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div>
      <Topbar title="Cultures & Plantations" breadcrumb={["Production", "Cultures"]} />

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white rounded-xl px-4 py-2 z-50 text-sm font-medium shadow-lg">
          {toast}
        </div>
      )}

      <ModalRecolte
        isOpen={modalRecolteOpen}
        onClose={() => setModalRecolteOpen(false)}
        onSubmit={() => {
          setModalRecolteOpen(false);
          setToast("RÃ©colte enregistrÃ©e");
          setTimeout(() => setToast(null), 3000);
        }}
      />

      <div className="p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "Parcelles en culture", val: "12", icon: MapPin, color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Superficie totale", val: "62 ha", icon: MapPin, color: "#1565C0", bg: "#E3F2FD" },
            { label: "Production cacao 2025 YTD", val: "34,2 t", icon: Sprout, color: "#6A1B9A", bg: "#F3E5F5" },
            { label: "PrÃ©vision rÃ©colte cacao", val: "94 t", icon: TrendingUp, color: "#E65100", bg: "#FFF3E0" },
            { label: "Rendement moyen", val: "1,18 t/ha", icon: BarChart2, color: "#00838F", bg: "#E0F7FA" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: s.bg }}>
                  <Icon size={18} color={s.color} strokeWidth={1.8} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{s.val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 pr-4">
            <div className="flex overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className="px-5 py-3.5 text-xs font-medium whitespace-nowrap transition-colors"
                  style={{
                    color: activeTab === t.key ? "#2E7D32" : "#6B7280",
                    borderBottom: activeTab === t.key ? "2px solid #2E7D32" : "2px solid transparent",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <ExportButton data={exportData} filename="cultures-parcelles" label="Exporter" />
              <button
                onClick={() => setModalRecolteOpen(true)}
                className="bg-[#2E7D32] text-white rounded-xl px-3 py-1.5 text-xs font-medium"
              >
                Saisir une rÃ©colte
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Grille des 12 parcelles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {parcelles.map((p) => (
                    <div key={p.id} className="rounded-2xl border border-gray-100 p-4 hover:border-green-200 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-xs font-mono font-bold text-gray-400">{p.id}</span>
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight mt-0.5">{p.nom}</h3>
                        </div>
                        <span className="text-xs font-bold text-gray-500 tabular-nums">{p.surface} ha</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">{p.culture}</span>
                        <span className="text-xs text-gray-400">{p.stade}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <CertBadge cert={p.cert} />
                        {p.alerte && (
                          <span className="flex items-center gap-1 text-xs text-amber-600">
                            <AlertTriangle size={11} />
                            Alerte
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-xs text-gray-500 mb-3">
                        <div className="flex justify-between">
                          <span>DerniÃ¨re op.</span>
                          <span className="text-gray-700 font-medium">{p.derniereOp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prochain acte</span>
                          <span className="text-gray-700 font-medium">{p.prochainActe}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Score santÃ©</span>
                        </div>
                        <ScoreBar score={p.score} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "cacao" && (
              <div className="space-y-6">
                <div className="rounded-2xl p-5" style={{ backgroundColor: "#F8FBF8" }}>
                  <h2 className="font-semibold text-gray-900 mb-1">FiliÃ¨re cacao AGRIFRIK</h2>
                  <p className="text-xs text-gray-500">6 parcelles Â· Total : 23,6 ha Â· VariÃ©tÃ© : Forastero hybride (F1, F3)</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Calendrier phÃ©nologique cacao â€” Mois en cours : Juillet
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {[
                      { periode: "Jan-FÃ©v", label: "Floraison principale", done: true, current: false },
                      { periode: "Mar-Avr", label: "Petites cabosses (5-6 mois)", done: true, current: false },
                      { periode: "Mai-Jun", label: "Grossissement cabosses", done: true, current: false },
                      { periode: "Juil-Sep", label: "Croissance cabosses â€” Entretien intensif", done: false, current: true },
                      { periode: "Oct-Nov", label: "RÃ‰COLTE PRINCIPALE", done: false, current: false },
                      { periode: "DÃ©c-Jan", label: "Post-rÃ©colte Â· Taille", done: false, current: false },
                    ].map((m) => (
                      <div
                        key={m.periode}
                        className="rounded-xl p-3 text-center"
                        style={{
                          backgroundColor: m.current ? "#1B5E20" : m.done ? "#E8F5E9" : "#F8FBF8",
                          border: m.current ? "2px solid #2E7D32" : "1px solid transparent",
                        }}
                      >
                        <p className="text-xs font-bold" style={{ color: m.current ? "#fff" : m.done ? "#2E7D32" : "#9CA3AF" }}>{m.periode}</p>
                        <p className="text-xs mt-1 leading-tight" style={{ color: m.current ? "#BBF7D0" : m.done ? "#4B7A52" : "#9CA3AF" }}>{m.label}</p>
                        {m.current && <p className="text-xs text-yellow-300 mt-1 font-bold">â† ACTUEL</p>}
                        {m.done && !m.current && <p className="text-xs mt-1" style={{ color: "#2E7D32" }}>âœ“</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Suivi par parcelle
                  </h3>
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: "#F8FBF8" }}>
                          {["Parcelle", "Surface", "VariÃ©tÃ©", "Ã‚ge plant.", "Cabosses/arbre", "Poids moy.", "Rendement prÃ©vu", "Alertes"].map((h) => (
                            <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {cacaoDetails.map((row) => (
                          <tr key={row.parcelle} className="hover:bg-gray-50">
                            <td className="px-3 py-2.5 font-mono text-xs font-semibold text-gray-700">{row.parcelle}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.surface} ha</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.variete}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.age}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-900 font-medium">{row.cabosses ?? "N/A"}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.poidsMoy}</td>
                            <td className="px-3 py-2.5 text-xs font-semibold" style={{ color: "#2E7D32" }}>{row.rendement}</td>
                            <td className="px-3 py-2.5">
                              {row.alerte ? (
                                <span className="flex items-center gap-1 text-xs text-amber-600">
                                  <AlertTriangle size={11} />
                                  {row.alerte}
                                </span>
                              ) : <span className="text-gray-300 text-xs">â€”</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Traitements en cours</h3>
                  <div className="space-y-2">
                    {[
                      { dot: "#F9A825", text: "Ridomil Gold 68 WG â€” PAR-B1 â€” 11/07/2025 â€” PrÃ©vention mildiou (Phytophthora palmivora)" },
                      { dot: "#F9A825", text: "Ã‰pandage KCl 4 t â€” PAR-A3 â€” PrÃ©vu 20/07/2025 (si livraison SCPA reÃ§ue)" },
                    ].map((t) => (
                      <div key={t.text} className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
                        <span className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: t.dot }} />
                        <p className="text-xs text-amber-800">{t.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "anacarde" && (
              <div className="space-y-6">
                <div className="rounded-2xl p-5" style={{ backgroundColor: "#F8FBF8" }}>
                  <h2 className="font-semibold text-gray-900 mb-1">FiliÃ¨re anacarde AGRIFRIK</h2>
                  <p className="text-xs text-gray-500">4 parcelles anacarde Â· Total : 21,2 ha Â· PÃ©riode rÃ©colte : Mars-Mai (TERMINÃ‰E 2025)</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Bilan rÃ©colte anacarde 2025</h3>
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: "#F8FBF8" }}>
                          {["Parcelle", "Surface", "Rendement", "Production", "QualitÃ©", "Vendu Ã "].map((h) => (
                            <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {anacardeBilan.map((row) => (
                          <tr key={row.parcelle} className="hover:bg-gray-50">
                            <td className="px-3 py-2.5 font-mono text-xs font-semibold text-gray-700">{row.parcelle}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.surface} ha</td>
                            <td className="px-3 py-2.5 text-xs font-medium" style={{ color: "#2E7D32" }}>{row.rendement}</td>
                            <td className="px-3 py-2.5 text-xs font-semibold text-gray-900">{row.production}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.qualite}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.venduA}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <span>Total 2025 : <strong className="text-gray-900">26,5 t</strong></span>
                    <span>CA total : <strong style={{ color: "#2E7D32" }}>18,9 M XOF</strong></span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Post-rÃ©colte en cours</h3>
                  <div className="space-y-2">
                    {[
                      "Sarclage PAR-C1, C2, D2 â€” Juillet-AoÃ»t",
                      "Taille de formation PAR-C1 (jeunes arbres) â€” PrÃ©vu Septembre",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
                        <span className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0 bg-blue-400" />
                        <p className="text-xs text-blue-800">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vivrieres" && (
              <div className="space-y-6">
                <div className="rounded-2xl p-5" style={{ backgroundColor: "#F8FBF8" }}>
                  <h2 className="font-semibold text-gray-900 mb-1">Cultures vivriÃ¨res intercalaires</h2>
                  <p className="text-xs text-gray-500">PAR-D1 (5,6 ha) : MaÃ¯s cycle 2 en prÃ©paration + Riz (semis Avrâ†’rÃ©colte AoÃ» en cours) Â· PAR-E2 (5,8 ha) : MaÃ¯s cycle 1 en rÃ©colte</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Bilan vivrier 2025</h3>
                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: "#F8FBF8" }}>
                          {["Culture", "Parcelle", "Surface", "Cycle", "Semis", "RÃ©colte", "Production", "CA estimÃ© (XOF)"].map((h) => (
                            <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {vivrierBilan.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-3 py-2.5 text-xs font-medium text-gray-900">{row.culture}</td>
                            <td className="px-3 py-2.5 font-mono text-xs text-gray-600">{row.parcelle}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.surface}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.cycle}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.semis}</td>
                            <td className="px-3 py-2.5 text-xs text-gray-600">{row.recolte}</td>
                            <td className="px-3 py-2.5 text-xs font-semibold text-gray-900">{row.production}</td>
                            <td className="px-3 py-2.5 text-xs font-semibold" style={{ color: "#2E7D32" }}>{row.ca}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "phenologie" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900 mb-1">Stades phÃ©nologiques cacao â€” Parcelles actives</h2>
                  <p className="text-xs text-gray-500 mb-4">Progression cumulative par stade (juillet 2025)</p>

                  <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ backgroundColor: "#F8FBF8" }}>
                          <th className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500">Parcelle</th>
                          {["Floraison", "Nouaison", "Grossissement", "Maturation", "RÃ©colte"].map((h) => (
                            <th key={h} className="text-left px-3 py-2.5 text-xs font-semibold text-gray-500">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { parcelle: "PAR-A1", stages: [100, 100, 80, 20, 0] },
                          { parcelle: "PAR-A2", stages: [100, 100, 75, 18, 0] },
                          { parcelle: "PAR-A3", stages: [100, 98, 72, 15, 0] },
                          { parcelle: "PAR-B1", stages: [100, 95, 68, 10, 0] },
                          { parcelle: "PAR-B2", stages: [100, 96, 70, 12, 0] },
                          { parcelle: "PAR-F1", stages: [20, 0, 0, 0, 0] },
                        ].map((row) => (
                          <tr key={row.parcelle} className="hover:bg-gray-50">
                            <td className="px-3 py-3 font-mono text-xs font-semibold text-gray-700">{row.parcelle}</td>
                            {row.stages.map((pct, idx) => {
                              const colors = ["#9C27B0", "#1976D2", "#2E7D32", "#E65100", "#F9A825"];
                              return (
                                <td key={idx} className="px-3 py-3">
                                  <div className="flex items-center gap-2">
                                    <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                                      <div
                                        className="h-full rounded-full"
                                        style={{ width: `${pct}%`, backgroundColor: pct > 0 ? colors[idx] : "transparent" }}
                                      />
                                    </div>
                                    <span className="text-xs tabular-nums text-gray-500">{pct}%</span>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-2xl border border-green-100 p-5" style={{ backgroundColor: "#F1F8F1" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#2E7D32" }}>
                    Note agronomique â€” Juillet 2025
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    En juillet, les cacaoyers sont en phase de grossissement des cabosses issues de la floraison de mars-avril.
                    Cette pÃ©riode est critique pour la prÃ©vention des maladies (Moniliasis, Phytophthora). Le premier traitement
                    prÃ©ventif de la saison des pluies vient d'Ãªtre appliquÃ© sur PAR-B1.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
