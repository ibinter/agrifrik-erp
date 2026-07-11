import Topbar from "../../../components/Topbar";
import Link from "next/link";

export default async function MaterielDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const kpis = [
    { label: "Valeur d'achat", value: "28 400 000", sub: "XOF" },
    { label: "VNC actuelle", value: "17 040 000", sub: "XOF" },
    { label: "Heures totales", value: "3 284h", sub: "" },
    { label: "Dernier entretien", value: "15/06/2025", sub: "" },
    { label: "Prochain entretien", value: "3 500h", sub: "→ 216h restantes" },
  ];

  const utilisationMensuelle = [
    { mois: "Jan", heures: "42h", carburant: "168 L", taches: "Taille + labour PAR-D1" },
    { mois: "Fév", heures: "38h", carburant: "152 L", taches: "Transport intrants" },
    { mois: "Mar", heures: "56h", carburant: "224 L", taches: "Labour PAR-D1 semis" },
    { mois: "Avr", heures: "48h", carburant: "192 L", taches: "Transport récolte anacarde" },
    { mois: "Mai", heures: "64h", carburant: "256 L", taches: "Fertilisation + labour" },
    { mois: "Jun", heures: "62h", carburant: "248 L", taches: "Révision + transport" },
  ];

  const historiqueMaintenance = [
    { date: "15/06/2025", type: "Révision 3 200h", compteur: "3 220h", intervenant: "Concess. JD", pieces: "124 000", mo: "65 000", total: "189 000" },
    { date: "10/01/2025", type: "Entretien courant", compteur: "3 000h", intervenant: "Bamba O.", pieces: "62 000", mo: "0", total: "62 000" },
    { date: "20/08/2024", type: "Révision 2 800h", compteur: "2 806h", intervenant: "Concess. JD", pieces: "186 000", mo: "85 000", total: "271 000" },
    { date: "15/02/2024", type: "Entretien courant", compteur: "2 600h", intervenant: "Bamba O.", pieces: "48 000", mo: "0", total: "48 000" },
    { date: "05/09/2023", type: "Révision 2 400h", compteur: "2 412h", intervenant: "Concess. JD", pieces: "210 000", mo: "95 000", total: "305 000" },
    { date: "12/01/2023", type: "Entretien courant", compteur: "2 200h", intervenant: "Bamba O.", pieces: "48 000", mo: "0", total: "48 000" },
  ];

  const documents = [
    { nom: "Manuel d'utilisation JD 6120M", type: "PDF", date: "2021", taille: "8,4 MB" },
    { nom: "Carnet d'entretien (numérique)", type: "PDF", date: "2025", taille: "1,2 MB" },
    { nom: "Facture d'achat", type: "PDF", date: "Jan 2021", taille: "0,4 MB" },
    { nom: "Contrat assurance SAHAM", type: "PDF", date: "2025", taille: "0,6 MB" },
    { nom: "Bon de commande pièces ACH-091", type: "PDF", date: "Jul 2025", taille: "0,2 MB" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Logistique", "Matériels", `Fiche ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* EN-TÊTE */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">MAT-001</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-medium">⚠️ En maintenance</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Tracteur agricole John Deere 6120M</h1>
              <p className="text-sm text-gray-500 mt-1">Catégorie : Tracteur</p>
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className="text-lg font-bold text-[#1B5E20] leading-tight">{k.value}</p>
              {k.sub && <p className="text-xs text-gray-400">{k.sub}</p>}
            </div>
          ))}
        </div>

        {/* INFORMATIONS TECHNIQUES */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Informations techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {[
              ["Marque / Modèle", "John Deere 6120M"],
              ["N° de série", "JD6120-2021-CI"],
              ["Puissance", "120 ch (89 kW)"],
              ["Boîte de vitesses", "AutoPowr IVT (CVT)"],
              ["Levage 3 points", "5 400 kg"],
              ["Prise de force", "540/1000 tr/min"],
              ["Date d'achat", "Janvier 2021"],
              ["Fournisseur", "Concessionnaire John Deere CI (Abidjan)"],
              ["Garantie", "Expirée (3 ans — Jan 2024)"],
              ["Assurance", "SAHAM — Police SAHAM-JD6120-2021"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COMPTEUR & UTILISATION */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Compteur &amp; Utilisation</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Heures totales", value: "3 284h" },
              { label: "Ce mois (juin)", value: "62h" },
              { label: "Cette année (2025)", value: "384h" },
              { label: "Moy. hebdo", value: "18h" },
              { label: "Carburant 2025", value: "1 440 L" },
            ].map((s) => (
              <div key={s.label} className="bg-[#F8FBF8] rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className="text-base font-bold text-[#1B5E20]">{s.value}</p>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-medium text-gray-700 mb-3">Utilisation mensuelle 2025</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                  <th className="text-left px-3 py-2 rounded-l-lg">Mois</th>
                  <th className="text-left px-3 py-2">Heures</th>
                  <th className="text-left px-3 py-2">Carburant (L)</th>
                  <th className="text-left px-3 py-2 rounded-r-lg">Tâches principales</th>
                </tr>
              </thead>
              <tbody>
                {utilisationMensuelle.map((u, i) => (
                  <tr key={u.mois} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2 font-medium text-gray-800">{u.mois}</td>
                    <td className="px-3 py-2 text-gray-700">{u.heures}</td>
                    <td className="px-3 py-2 text-gray-700">{u.carburant}</td>
                    <td className="px-3 py-2 text-gray-600">{u.taches}</td>
                  </tr>
                ))}
                <tr className="bg-[#F8FBF8] font-semibold text-[#1B5E20]">
                  <td className="px-3 py-2">YTD</td>
                  <td className="px-3 py-2">310h</td>
                  <td className="px-3 py-2">1 240 L</td>
                  <td className="px-3 py-2 text-gray-400">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* MAINTENANCE */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-6">
          <h2 className="text-base font-semibold text-gray-800">Maintenance</h2>

          {/* Maintenance en cours */}
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔧</span>
              <h3 className="font-semibold text-orange-800">Fuite circuit hydraulique — signalée 09/07/2025</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm">
              {[
                ["Description", "Fuite huile hydraulique côté relevage arrière droit. Pression système tombée à 180 bar (nominal 200 bar). Tracteur immobilisé."],
                ["Pièce commandée", "Joint hydraulique JD ref. R503311 + Flexible HP ref. AT366488"],
                ["Fournisseur", "DHL Express → Concessionnaire JD Abidjan"],
                ["Bon de commande", "ACH-2025-091 | Montant pièces : 284 000 XOF"],
                ["ETA pièces", "15/07/2025 | Durée réparation estimée : 1 journée"],
                ["Main d'œuvre", "Bamba Oumar (mécanicien interne)"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-orange-600 text-xs font-medium">{label}</span>
                  <span className="text-orange-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Historique des entretiens */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Historique des 6 derniers entretiens</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                    <th className="text-left px-3 py-2 rounded-l-lg">Date</th>
                    <th className="text-left px-3 py-2">Type</th>
                    <th className="text-left px-3 py-2">Compteur</th>
                    <th className="text-left px-3 py-2">Intervenant</th>
                    <th className="text-right px-3 py-2">Pièces (XOF)</th>
                    <th className="text-right px-3 py-2">M.O. (XOF)</th>
                    <th className="text-right px-3 py-2 rounded-r-lg">Total (XOF)</th>
                  </tr>
                </thead>
                <tbody>
                  {historiqueMaintenance.map((h, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{h.date}</td>
                      <td className="px-3 py-2 text-gray-700">{h.type}</td>
                      <td className="px-3 py-2 text-gray-500">{h.compteur}</td>
                      <td className="px-3 py-2 text-gray-700">{h.intervenant}</td>
                      <td className="px-3 py-2 text-right text-gray-700">{h.pieces}</td>
                      <td className="px-3 py-2 text-right text-gray-700">{h.mo}</td>
                      <td className="px-3 py-2 text-right font-medium text-gray-800">{h.total} ✅</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap gap-6 text-sm border-t border-gray-100 pt-4">
              <div>
                <span className="text-gray-500">Coût total maintenance (vie) :</span>
                <span className="ml-2 font-bold text-[#1B5E20]">923 000 XOF</span>
              </div>
              <div>
                <span className="text-gray-500">Coût moyen / 100h :</span>
                <span className="ml-2 font-bold text-[#1B5E20]">28 100 XOF</span>
              </div>
            </div>
          </div>
        </div>

        {/* DOCUMENTS */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Documents</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                  <th className="text-left px-3 py-2 rounded-l-lg">Document</th>
                  <th className="text-left px-3 py-2">Type</th>
                  <th className="text-left px-3 py-2">Date</th>
                  <th className="text-left px-3 py-2">Taille</th>
                  <th className="text-center px-3 py-2 rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((d, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2 font-medium text-gray-800">{d.nom}</td>
                    <td className="px-3 py-2">
                      <span className="inline-block bg-red-50 text-red-600 text-xs font-medium px-2 py-0.5 rounded">{d.type}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{d.date}</td>
                    <td className="px-3 py-2 text-gray-500">{d.taille}</td>
                    <td className="px-3 py-2 text-center">
                      <button className="inline-flex items-center gap-1 text-xs text-[#2E7D32] font-medium hover:underline">
                        📥 Télécharger
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RETOUR */}
        <div className="pb-4">
          <Link
            href="/materiels"
            className="inline-flex items-center gap-2 text-sm text-[#2E7D32] font-medium hover:underline"
          >
            ← Retour au parc matériels
          </Link>
        </div>

      </main>
    </div>
  );
}
