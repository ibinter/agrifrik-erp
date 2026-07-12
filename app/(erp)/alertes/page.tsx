"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface Alerte {
  id: number;
  niveau: "CRITIQUE" | "IMPORTANTE" | "INFO";
  titre: string;
  detail: string;
  module: string;
  declencheLe: string;
  actions: { label: string; primary?: boolean }[];
}

// â”€â”€â”€ DonnÃ©es alertes actives â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ALERTES_INITIALES: Alerte[] = [
  {
    id: 1,
    niveau: "CRITIQUE",
    titre: "Stock KCl insuffisant",
    detail: "Stock KCl 60% : 2 sacs en stock (seuil : 5 sacs). Fertilisation PAR-B1 prÃ©vue 18/07 Ã  risque.",
    module: "Logistique",
    declencheLe: "11/07/2025 08h00",
    actions: [
      { label: "Commander maintenant â†’", primary: true },
      { label: "Ignorer" },
    ],
  },
  {
    id: 2,
    niveau: "CRITIQUE",
    titre: "Lot LOT-2025-047 : Cut test dÃ»",
    detail: "Le cut test du lot LOT-2025-047 (en sÃ©chage J7) doit Ãªtre effectuÃ© aujourd'hui 11/07.",
    module: "QualitÃ©",
    declencheLe: "11/07/2025 06h00",
    actions: [
      { label: "Effectuer le contrÃ´le â†’", primary: true },
      { label: "Reporter" },
    ],
  },
  {
    id: 3,
    niveau: "IMPORTANTE",
    titre: "RÃ©vision tracteur dans 19 jours",
    detail: "JD5055E (MAT-2021-004) : rÃ©vision 3 000h prÃ©vue ~30/07. Ã€ planifier avant la grande rÃ©colte.",
    module: "MatÃ©riels",
    declencheLe: "05/07/2025",
    actions: [
      { label: "Planifier rÃ©vision", primary: true },
    ],
  },
  {
    id: 4,
    niveau: "IMPORTANTE",
    titre: "Devis DEV-2025-003 expire dans 29 jours",
    detail: "Devis OLAM Cocoa CI (8t â€” 8,76M XOF) expire le 09/08/2025. Relancer le client.",
    module: "Commerce",
    declencheLe: "10/07/2025",
    actions: [
      { label: "Relancer le client", primary: true },
      { label: "Voir devis" },
    ],
  },
  {
    id: 5,
    niveau: "IMPORTANTE",
    titre: "Rapport bailleur FAO Q2 en attente validation",
    detail: "Rapport trimestriel Q2 soumis Ã  FAO le 15/07. En attente retour Bureau Veritas (dÃ©lai 30j).",
    module: "Rapports",
    declencheLe: "15/07/2025",
    actions: [
      { label: "Voir rapport" },
    ],
  },
  {
    id: 6,
    niveau: "IMPORTANTE",
    titre: "Certification RA expire dans 232 jours",
    detail: "RA-CI-2025-EFA001 valide jusqu'au 28/02/2026. Planifier l'audit de renouvellement (aoÃ»t 2025).",
    module: "Certifications",
    declencheLe: "RÃ©current mensuel",
    actions: [
      { label: "Planifier audit", primary: true },
    ],
  },
  {
    id: 7,
    niveau: "IMPORTANTE",
    titre: "Budget phyto Ã  73,8% Ã  54% de l'annÃ©e",
    detail: "Consommation phytosanitaire en avance. Surveiller les achats H2.",
    module: "Finance",
    declencheLe: "11/07/2025",
    actions: [
      { label: "Voir budget" },
    ],
  },
  {
    id: 8,
    niveau: "INFO",
    titre: "TrÃ©sorerie solide : 43,3M XOF",
    detail: "Solde bancaire total : 43,3M XOF. Ratio liquiditÃ© : 3,8x. Situation saine.",
    module: "Finance",
    declencheLe: "08/07/2025",
    actions: [],
  },
  {
    id: 9,
    niveau: "INFO",
    titre: "MÃ©tÃ©o favorable 13-14 juillet",
    detail: "2 jours sans pluie prÃ©vus. Conditions optimales pour sÃ©chage et traitements.",
    module: "MÃ©tÃ©o",
    declencheLe: "11/07/2025",
    actions: [],
  },
  {
    id: 10,
    niveau: "INFO",
    titre: "Floraison PAR-A2 exceptionnelle",
    detail: "+23% de floraison vs jul 2024. TrÃ¨s bons indicateurs pour la grande rÃ©colte oct-nov.",
    module: "Production",
    declencheLe: "07/07/2025",
    actions: [],
  },
];

// â”€â”€â”€ Historique â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const HISTORIQUE = [
  { date: "08/07", type: "CRITIQUE", description: "Super Cupravit insuffisant (1,3 kg manquants)", resolution: "Commande SCPA livrÃ©e", delai: "2 jours" },
  { date: "05/07", type: "IMPORTANTE", description: "Facture FAC-2025-008 Ã  encaisser", resolution: "RÃ¨glement reÃ§u SGBCI", delai: "3 jours" },
  { date: "01/07", type: "IMPORTANTE", description: "Cut test LOT-2025-046 Ã  effectuer", resolution: "CQ-2025-046 effectuÃ© âœ…", delai: "0 jour" },
  { date: "28/06", type: "CRITIQUE", description: "PAR-A1 : lot FER-2025-046 J6 fermentation", resolution: "Sorti en sÃ©chage", delai: "1 jour" },
  { date: "26/06", type: "IMPORTANTE", description: "Stock NPK insuffisant â€” campagne B2", resolution: "Livraison SCPA reÃ§ue", delai: "4 jours" },
  { date: "22/06", type: "IMPORTANTE", description: "RÃ©vision MAT-2021-003 dÃ©passÃ©e", resolution: "RÃ©vision effectuÃ©e atelier SoubrÃ©", delai: "2 jours" },
  { date: "18/06", type: "INFO", description: "Facture FAC-2025-005 Ã©mise", resolution: "Facture envoyÃ©e client", delai: "0 jour" },
  { date: "15/06", type: "CRITIQUE", description: "HumiditÃ© entrepÃ´t > 78% â€” lot 044", resolution: "Ventilation activÃ©e â€” taux normalisÃ©", delai: "6 heures" },
];

// â”€â”€â”€ Config alertes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CONFIG_ALERTES = [
  { categorie: "Stocks critiques", actives: 1, seuil: "Configurable", notification: "Email + App" },
  { categorie: "QualitÃ© lots", actives: 1, seuil: "Automatique", notification: "Email + App" },
  { categorie: "Finance", actives: 2, seuil: "Configurable", notification: "App uniquement" },
  { categorie: "Certifications", actives: 1, seuil: "6 mois avant expiry", notification: "Email + SMS" },
  { categorie: "MÃ©tÃ©o agricole", actives: 1, seuil: "Risque >5/10", notification: "App uniquement" },
  { categorie: "Maintenance matÃ©riels", actives: 1, seuil: "30 jours avant", notification: "Email + App" },
];

// â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function niveauStyle(niveau: string) {
  if (niveau === "CRITIQUE") return { card: "border-red-200 bg-red-50", badge: "bg-red-100 text-red-700", dot: "ðŸ”´" };
  if (niveau === "IMPORTANTE") return { card: "border-amber-200 bg-amber-50", badge: "bg-amber-100 text-amber-700", dot: "ðŸŸ¡" };
  return { card: "border-green-200 bg-green-50", badge: "bg-green-100 text-green-700", dot: "ðŸŸ¢" };
}

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function AlertesPage() {
  const [alertes, setAlertes] = useState<Alerte[]>(ALERTES_INITIALES);
  const [lues, setLues] = useState<Set<number>>(new Set());

  const marquerLue = (id: number) => setLues((prev) => new Set([...prev, id]));
  const toutMarquerLu = () => setLues(new Set(alertes.map((a) => a.id)));

  const alertesActives = alertes.filter((a) => !lues.has(a.id));
  const critiques = alertesActives.filter((a) => a.niveau === "CRITIQUE").length;
  const importantes = alertesActives.filter((a) => a.niveau === "IMPORTANTE").length;
  const infos = alertesActives.filter((a) => a.niveau === "INFO").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Admin", "Centre d'Alertes"]} />

      <div className="p-6 max-w-6xl mx-auto space-y-5">
        {/* En-tÃªte */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Centre d&apos;Alertes</h1>
              <p className="text-sm text-gray-500 mt-0.5">Surveillance en temps rÃ©el â€” Stocks, Production, Finance, QualitÃ©</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={toutMarquerLu}
                className="border border-gray-200 text-gray-600 rounded-xl text-xs font-medium px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                Tout marquer comme lu
              </button>
              <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
                Configurer les alertes
              </button>
            </div>
          </div>

          {/* KPI */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-red-600">{critiques}</p>
              <p className="text-[11px] text-red-500 font-medium mt-0.5">Critiques</p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-amber-600">{importantes}</p>
              <p className="text-[11px] text-amber-500 font-medium mt-0.5">Importantes</p>
            </div>
            <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-green-600">{infos}</p>
              <p className="text-[11px] text-green-500 font-medium mt-0.5">Informations</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-center">
              <p className="text-2xl font-bold text-gray-700">12</p>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">RÃ©solues ce mois</p>
            </div>
          </div>
        </div>

        {/* Bandeau critique */}
        {critiques > 0 && (
          <div className="rounded-2xl border border-red-300 bg-red-50 p-4 flex items-center gap-3">
            <span className="text-xl">ðŸ”´</span>
            <p className="text-sm font-semibold text-red-800">
              {critiques} alerte{critiques > 1 ? "s" : ""} critique{critiques > 1 ? "s" : ""} nÃ©cessite{critiques > 1 ? "nt" : ""} votre attention immÃ©diate
            </p>
          </div>
        )}

        {/* Alertes actives */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Alertes actives ({alertesActives.length})
          </h2>
          <div className="space-y-3">
            {alertesActives.length === 0 && (
              <div className="rounded-2xl border border-green-100 bg-green-50 p-8 text-center">
                <p className="text-2xl mb-2">âœ…</p>
                <p className="text-sm font-semibold text-green-800">Toutes les alertes ont Ã©tÃ© traitÃ©es</p>
                <p className="text-xs text-green-600 mt-1">Aucune alerte active pour le moment</p>
              </div>
            )}
            {alertesActives.map((alerte) => {
              const style = niveauStyle(alerte.niveau);
              return (
                <div key={alerte.id} className={`rounded-2xl border p-5 ${style.card}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-lg mt-0.5 flex-shrink-0">{style.dot}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${style.badge}`}>
                            {alerte.niveau}
                          </span>
                          <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-100">
                            {alerte.module}
                          </span>
                          <span className="text-[10px] text-gray-400">DÃ©clenchÃ© : {alerte.declencheLe}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">{alerte.titre}</p>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{alerte.detail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {alerte.actions.map((action, j) => (
                        <button
                          key={j}
                          className={`text-[11px] font-medium px-3 py-1.5 rounded-xl transition-opacity hover:opacity-80 ${
                            action.primary
                              ? "bg-[#2E7D32] text-white"
                              : "border border-gray-200 text-gray-600 bg-white"
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                      <button
                        onClick={() => marquerLue(alerte.id)}
                        className="text-[11px] text-gray-400 hover:text-gray-600 px-2 py-1.5 rounded-xl hover:bg-white/60 transition-colors"
                        title="Marquer comme lu"
                      >
                        âœ“
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Historique rÃ©solues */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">
            Historique des alertes rÃ©solues â€” 30 derniers jours
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date", "Type", "Description", "RÃ©solution", "DÃ©lai rÃ©solution"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left text-[11px] font-semibold text-gray-600 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HISTORIQUE.map((row, i) => {
                  const s = niveauStyle(row.type);
                  return (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap font-medium">{row.date}</td>
                      <td className="px-3 py-2.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${s.badge}`}>
                          {s.dot} {row.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-800">{row.description}</td>
                      <td className="px-3 py-2.5 text-gray-600">{row.resolution}</td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                          âœ… {row.delai}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Configuration des alertes */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Configuration des alertes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["CatÃ©gorie", "Alertes actives", "Seuil", "Notification"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-left text-[11px] font-semibold text-gray-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONFIG_ALERTES.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2.5 font-medium text-gray-800">{row.categorie}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                        {row.actives} active{row.actives > 1 ? "s" : ""}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-600">{row.seuil}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        âœ… {row.notification}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

