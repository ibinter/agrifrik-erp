"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

function fmt(n: number) {
  return n.toLocaleString("fr-FR") + " XOF";
}

const kpis = [
  { label: "Importations 2025", value: "8", sub: "commandes enregistrées" },
  { label: "Valeur totale", value: "28,4 M XOF", sub: "valeur CIF cumulée", color: "text-blue-600 dark:text-blue-400" },
  { label: "En transit", value: "1", sub: "en cours d'acheminement", color: "text-blue-500 dark:text-blue-400" },
  { label: "Dédouanées", value: "6", sub: "importations livrées", color: "text-emerald-600 dark:text-emerald-400" },
  { label: "Délai moyen livraison", value: "24 jours", sub: "commande → réception", color: "text-purple-600 dark:text-purple-400" },
];

const importations = [
  { ref: "IMP-2025-008", produit: "Drone DJI Agras T30", fournisseur: "DJI Technology", pays: "Chine", valeur: "12 400 000 XOF", incoterm: "CIF Abidjan", commande: "Jan 2024", arrivee: "20/02/2024", dedouan: "28/02/2024", statut: "Livré" },
  { ref: "IMP-2025-007", produit: "Engrais NPK 20-10-10 (20t)", fournisseur: "ICL Group", pays: "Israël", valeur: "4 800 000 XOF", incoterm: "CIF", commande: "Fév 2025", arrivee: "15/03/2025", dedouan: "20/03/2025", statut: "Livré" },
  { ref: "IMP-2025-006", produit: "KCl (chlorure potassium) 10t", fournisseur: "Mosaic Fertilizers", pays: "USA", valeur: "3 200 000 XOF", incoterm: "FOB Miami", commande: "Mar 2025", arrivee: "10/04/2025", dedouan: "18/04/2025", statut: "Livré" },
  { ref: "IMP-2025-005", produit: "Ridomil Gold 68 WG (500 kg)", fournisseur: "Syngenta AG", pays: "Suisse", valeur: "2 840 000 XOF", incoterm: "CIF", commande: "Mar 2025", arrivee: "05/04/2025", dedouan: "12/04/2025", statut: "Livré" },
  { ref: "IMP-2025-004", produit: "Fongicide Copper 50% (200 kg)", fournisseur: "Adama Agricultural", pays: "Israël", valeur: "680 000 XOF", incoterm: "CIF", commande: "Avr 2025", arrivee: "28/04/2025", dedouan: "02/05/2025", statut: "Livré" },
  { ref: "IMP-2025-003", produit: "Séchoir artificiel B (pièces)", fournisseur: "BioEnergy CI via import", pays: "Pays-Bas", valeur: "1 240 000 XOF", incoterm: "CIF", commande: "Mai 2025", arrivee: "15/06/2025", dedouan: "22/06/2025", statut: "Livré" },
  { ref: "IMP-2025-002", produit: "KCl 4t (commande urgente)", fournisseur: "SCPA Afrique", pays: "France", valeur: "1 120 000 XOF", incoterm: "DDP CI", commande: "Juin 2025", arrivee: "08/07/2025", dedouan: "En cours", statut: "En cours" },
  { ref: "IMP-2025-001", produit: "Pièces tracteur JD 6120M", fournisseur: "John Deere EAME", pays: "Allemagne", valeur: "1 840 000 XOF", incoterm: "CIF", commande: "Juil 2025", arrivee: "ETA 15/07", dedouan: "—", statut: "En transit" },
];

const docsDouane = [
  { label: "Facture commerciale (John Deere EAME)", ok: true },
  { label: "Packing list", ok: true },
  { label: "Bill of Lading HAPAG-2025-07-8421", ok: true },
  { label: "Certificat d'origine EUR.1 (UE-CI)", ok: true },
  { label: "Déclaration d'Importation (DI)", ok: false, note: "en cours DGD" },
  { label: "Attestation de vérification BIVAC", ok: false, note: "en attente" },
  { label: "DAU (Déclaration d'Acquittement Unique)", ok: false, note: "à faire dès arrivée" },
];

const etapesDedouanement = [
  { label: "Commande émise", date: "02/07/2025", done: true, inProgress: false },
  { label: "Facture proforma reçue", date: "03/07/2025", done: true, inProgress: false },
  { label: "Licence d'importation (SI) déposée", date: "04/07/2025", done: true, inProgress: false },
  { label: "Expédition Hambourg — Bill of Lading : HAPAG-2025-07-8421", date: "08/07/2025", done: true, inProgress: false },
  { label: "ETA Abidjan", date: "15/07/2025", done: false, inProgress: true },
  { label: "Dépôt DAU à la douane", date: "à faire dès arrivée", done: false, inProgress: false },
  { label: "Paiement droits & taxes (estimé : 276 000 XOF DDI + TVA 18%)", date: "à faire", done: false, inProgress: false },
  { label: "Main levée", date: "2-3 jours après paiement", done: false, inProgress: false },
  { label: "Livraison Soubré", date: "ETA 18-20/07/2025", done: false, inProgress: false },
];

const fournisseurs = [
  { nom: "DJI Technology", pays: "Chine", categorie: "Matériels", ca: 12400000, commandes: 1, delai: "45 j", note: "5/5" },
  { nom: "ICL Group", pays: "Israël", categorie: "Engrais", ca: 4800000, commandes: 1, delai: "32 j", note: "4/5" },
  { nom: "Mosaic Fertilizers", pays: "USA", categorie: "Engrais", ca: 3200000, commandes: 1, delai: "38 j", note: "4/5" },
  { nom: "Syngenta AG", pays: "Suisse", categorie: "Phytos", ca: 2840000, commandes: 1, delai: "30 j", note: "5/5" },
  { nom: "John Deere EAME", pays: "Allemagne", categorie: "Pièces", ca: 1840000, commandes: 1, delai: "22 j (express)", note: "5/5" },
  { nom: "SCPA Afrique", pays: "France", categorie: "Engrais", ca: 1120000, commandes: 1, delai: "14 j (DDP)", note: "4/5" },
];

const coutsTaxes = [
  { rubrique: "Valeur CIF produits", montant: 28120000 },
  { rubrique: "Droits de douane DDI (moy. 12%)", montant: 3374400 },
  { rubrique: "TVA importation 18%", montant: 5062800 },
  { rubrique: "FDFP 0,5%", montant: 140600 },
  { rubrique: "Frais transit (commissionnaire)", montant: 840000 },
  { rubrique: "Transport local Abidjan → Soubré", montant: 620000 },
];

const tabs = ["Importations", "Documents douaniers", "Fournisseurs extérieurs", "Coûts & Taxes"];

function StatutBadge({ statut }: { statut: string }) {
  if (statut === "Livré") return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">✅ Livré</span>;
  if (statut === "En cours") return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">🟡 En cours</span>;
  if (statut === "En transit") return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">🔵 En transit</span>;
  return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{statut}</span>;
}

export default function ImportationPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar title="Importations & Achats Extérieurs" breadcrumb={["Commerce", "Importation"]} />

      <main className="flex-1 p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{kpi.label}</p>
              <p className={`mt-2 text-xl font-bold ${kpi.color ?? "text-gray-900 dark:text-white"}`}>{kpi.value}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="px-6 pt-4 border-b border-gray-200 dark:border-gray-800 flex gap-1 overflow-x-auto">
            {tabs.map((t, i) => (
              <button
                key={t}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors border-b-2 -mb-px ${
                  activeTab === i
                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Onglet 1 : Importations */}
          {activeTab === 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    {["Réf.", "Produit", "Fournisseur", "Pays", "Valeur CIF", "Incoterm", "Commande", "Arrivée", "Dédouanement", "Statut"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {importations.map((imp) => (
                    <tr key={imp.ref} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">{imp.ref}</td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white max-w-[200px]">{imp.produit}</td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{imp.fournisseur}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{imp.pays}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white whitespace-nowrap">{imp.valeur}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{imp.incoterm}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{imp.commande}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{imp.arrivee}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{imp.dedouan}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><StatutBadge statut={imp.statut} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Onglet 2 : Documents douaniers */}
          {activeTab === 1 && (
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">Dossier douanier IMP-2025-001 (en cours)</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Étapes DGD — Direction Générale des Douanes CI</p>
                <div className="space-y-2">
                  {etapesDedouanement.map((etape, i) => (
                    <div key={i} className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${
                      etape.done
                        ? "border-emerald-100 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-900"
                        : etape.inProgress
                        ? "border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-900"
                        : "border-gray-100 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700"
                    }`}>
                      <div className="shrink-0 mt-0.5">
                        {etape.done ? (
                          <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                        ) : etape.inProgress ? (
                          <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${etape.done ? "text-emerald-800 dark:text-emerald-300" : etape.inProgress ? "text-blue-800 dark:text-blue-300" : "text-gray-500 dark:text-gray-400"}`}>
                          <span className="text-xs text-gray-400 dark:text-gray-500 mr-2">{i + 1}.</span>
                          {etape.label}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{etape.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Documents checklist</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {docsDouane.map((doc) => (
                    <div key={doc.label} className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 ${
                      doc.ok
                        ? "border-emerald-100 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-900"
                        : "border-orange-100 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-900"
                    }`}>
                      {doc.ok ? (
                        <CheckCircle size={15} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Clock size={15} className="shrink-0 text-orange-500 dark:text-orange-400" />
                      )}
                      <span className={`text-sm ${doc.ok ? "text-emerald-800 dark:text-emerald-300" : "text-orange-800 dark:text-orange-300"}`}>{doc.label}</span>
                      {!doc.ok && doc.note && (
                        <span className="ml-auto text-xs text-orange-500 dark:text-orange-400 whitespace-nowrap">{doc.note}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Onglet 3 : Fournisseurs extérieurs */}
          {activeTab === 2 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    {["Fournisseur", "Pays", "Catégorie", "CA 2025", "Commandes", "Délai moyen", "Note"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {fournisseurs.map((f) => (
                    <tr key={f.nom} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{f.nom}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{f.pays}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">{f.categorie}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white whitespace-nowrap">{fmt(f.ca)}</td>
                      <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{f.commandes}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{f.delai}</td>
                      <td className="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">✅ {f.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Onglet 4 : Coûts & Taxes */}
          {activeTab === 3 && (
            <div className="p-4 sm:p-6 space-y-6">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Synthèse des coûts d&apos;importation 2025</h3>
              <div className="max-w-xl">
                <div className="rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F8FBF8] dark:bg-gray-800">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Rubrique</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Montant</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {coutsTaxes.map((row) => (
                        <tr key={row.rubrique} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.rubrique}</td>
                          <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white whitespace-nowrap">{fmt(row.montant)}</td>
                        </tr>
                      ))}
                      <tr className="bg-emerald-50 dark:bg-emerald-900/20 font-semibold">
                        <td className="px-4 py-3 text-emerald-800 dark:text-emerald-300">Coût total rendu Soubré</td>
                        <td className="px-4 py-3 text-right text-emerald-700 dark:text-emerald-400 whitespace-nowrap">38 157 800 XOF</td>
                      </tr>
                      <tr className="bg-orange-50 dark:bg-orange-900/20 font-semibold">
                        <td className="px-4 py-3 text-orange-800 dark:text-orange-300">Surcoût importation vs achat local</td>
                        <td className="px-4 py-3 text-right text-orange-700 dark:text-orange-400">+35,7%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="max-w-xl rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/10 px-4 py-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={15} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Le recours aux importations est justifié pour les produits non disponibles localement (équipements spécialisés, phytosanitaires homologués, engrais à formulation précise).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
