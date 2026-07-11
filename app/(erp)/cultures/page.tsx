"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Plus, Filter, Search, Sprout, MapPin, Calendar, TrendingUp } from "lucide-react";
import ModalRecolte from "../../components/modals/ModalRecolte";

const cultures = [
  { id: "C-2025-001", culture: "Cacao", variete: "Amelonado", parcelles: "A1-A8", surface: "48 ha", stade: "Récolte", rendement: "2.1 t/ha", debut: "15/01/2025", fin: "15/12/2025", statut: "En cours" },
  { id: "C-2025-002", culture: "Anacarde", variete: "CG7", parcelles: "C1-C5", surface: "25 ha", stade: "Floraison", rendement: "1.8 t/ha", debut: "01/12/2024", fin: "30/06/2025", statut: "En cours" },
  { id: "C-2025-003", culture: "Maïs", variete: "CMS 8704", parcelles: "D2-D6", surface: "30 ha", stade: "Semis", rendement: "3.5 t/ha", debut: "01/03/2025", fin: "30/07/2025", statut: "Démarrage" },
  { id: "C-2025-004", culture: "Hévéa", variete: "GT 1", parcelles: "E1-E3", surface: "18 ha", stade: "Saignée", rendement: "1.2 t/ha", debut: "01/01/2025", fin: "31/12/2025", statut: "En cours" },
  { id: "C-2024-012", culture: "Riz", variete: "WITA 9", parcelles: "B1-B4", surface: "22 ha", stade: "Récolte terminée", rendement: "4.2 t/ha", debut: "01/06/2024", fin: "15/11/2024", statut: "Terminé" },
];

const stadeColor: Record<string, { bg: string; text: string }> = {
  "Récolte": { bg: "#E8F5E9", text: "#2E7D32" },
  "Floraison": { bg: "#FCE4EC", text: "#C2185B" },
  "Semis": { bg: "#E3F2FD", text: "#1565C0" },
  "Saignée": { bg: "#FFF3E0", text: "#E65100" },
  "Récolte terminée": { bg: "#F5F5F5", text: "#616161" },
};

export default function CulturesPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Topbar title="Cultures & Campagnes" breadcrumb={["Production", "Cultures & Campagnes"]} />

      <div className="p-6 space-y-6">
        {/* Stats rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Campagnes actives", val: "4", icon: Sprout, color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Surface totale", val: "143 ha", icon: MapPin, color: "#1565C0", bg: "#E3F2FD" },
            { label: "Récolte en cours", val: "12,4 t", icon: TrendingUp, color: "#E65100", bg: "#FFF3E0" },
            { label: "Prochaine récolte", val: "J+18", icon: Calendar, color: "#6A1B9A", bg: "#F3E5F5" },
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

        {/* Tableau des campagnes */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Campagnes agricoles</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-400">
                <Search size={14} />
                <input className="bg-transparent outline-none text-xs w-32 placeholder-gray-400" placeholder="Rechercher…" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
                <Filter size={13} />
                Filtrer
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white"
                style={{ backgroundColor: "#2E7D32" }}>
                <Plus size={13} />
                Nouvelle campagne
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white"
                style={{ backgroundColor: "#2E7D32" }}>
                <Plus size={13} />
                Enregistrer une récolte
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F8FBF8" }}>
                  {["Réf.", "Culture", "Variété", "Parcelles", "Surface", "Stade", "Rendement prévu", "Début", "Fin", "Statut"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {cultures.map((c) => {
                  const sc = stadeColor[c.stade] || { bg: "#F5F5F5", text: "#616161" };
                  return (
                    <tr key={c.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-gray-500">{c.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{c.culture}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{c.variete}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{c.parcelles}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{c.surface}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: sc.bg, color: sc.text }}>
                          {c.stade}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{c.rendement}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{c.debut}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{c.fin}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.statut === "Terminé" ? "bg-gray-100 text-gray-500" : c.statut === "Démarrage" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-700"}`}>
                          {c.statut}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalRecolte isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
