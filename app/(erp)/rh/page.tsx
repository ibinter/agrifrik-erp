"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { Plus, Users, UserCheck, Calendar, DollarSign } from "lucide-react";
import ModalEmploye from "../../components/modals/ModalEmploye";

const employes = [
  { matricule: "EMP-001", nom: "Kouamé Adjoua", poste: "Technicienne Agronome", departement: "Production", contrat: "CDI", salaire: "450 000", statut: "Actif" },
  { matricule: "EMP-002", nom: "Bamba Oumar", poste: "Responsable Entrepôt", departement: "Logistique", contrat: "CDI", salaire: "380 000", statut: "Actif" },
  { matricule: "EMP-003", nom: "Traoré Fatoumata", poste: "Comptable", departement: "Finance", contrat: "CDI", salaire: "520 000", statut: "Actif" },
  { matricule: "SAI-001", nom: "Koné Dramane", poste: "Ouvrier récolte cacao", departement: "Production", contrat: "CDD Saisonnier", salaire: "185 000", statut: "Actif" },
  { matricule: "SAI-002", nom: "Diallo Mamadou", poste: "Ouvrier récolte cacao", departement: "Production", contrat: "CDD Saisonnier", salaire: "185 000", statut: "Actif" },
];

export default function RHPage() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Topbar title="Ressources Humaines & Paie" breadcrumb={["RH & Paie"]} />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Permanents", val: "240", icon: Users, color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Saisonniers", val: "47", icon: UserCheck, color: "#1565C0", bg: "#E3F2FD" },
            { label: "Masse salariale/mois", val: "48,2 M XOF", icon: DollarSign, color: "#E65100", bg: "#FFF3E0" },
            { label: "Congés en cours", val: "12", icon: Calendar, color: "#6A1B9A", bg: "#F3E5F5" },
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

        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Liste des employés</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
                Lancer la paie
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white" style={{ backgroundColor: "#2E7D32" }}>
                <Plus size={13} /> Nouvel employé
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr style={{ backgroundColor: "#F8FBF8" }}>
                {["Matricule", "Nom complet", "Poste", "Département", "Contrat", "Salaire brut (XOF)", "Statut"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-gray-50">
                {employes.map((e) => (
                  <tr key={e.matricule} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{e.matricule}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ backgroundColor: "#2E7D32" }}>
                          {e.nom.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="font-medium text-gray-900">{e.nom}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{e.poste}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{e.departement}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e.contrat === "CDI" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-600"}`}>
                        {e.contrat}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-900">{e.salaire}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">{e.statut}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalEmploye isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
