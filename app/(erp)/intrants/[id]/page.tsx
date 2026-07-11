import Topbar from "../../../components/Topbar";
import { ArrowLeft, ShoppingCart, ClipboardList, Package, Shield, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default async function IntrantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Logistique", "Intrants", `Fiche ${id}`]} />

      <main className="flex-1 p-6 space-y-6">
        {/* En-tête bandeau vert */}
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#1B5E20] text-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono bg-white/20 px-2 py-0.5 rounded">INT-PHY-003</span>
                  <span className="text-xs bg-green-400/30 border border-green-400/50 px-2 py-0.5 rounded">✅ Homologué CI (N°CI-MADER-FNG-2021-0847)</span>
                  <span className="text-xs bg-emerald-400/30 border border-emerald-400/50 px-2 py-0.5 rounded">✅ Autorisé RA</span>
                  <span className="text-xs bg-orange-400/30 border border-orange-300/50 px-2 py-0.5 rounded">⚠️ Usage restreint (cuivre)</span>
                </div>
                <h1 className="text-2xl font-bold mb-1">Super Cupravit OB 50 WP</h1>
                <div className="text-green-200 text-sm space-y-0.5">
                  <p>
                    <span className="text-green-400 font-medium">Matière active :</span> Oxychlorure de cuivre 50%
                    &nbsp;|&nbsp;
                    <span className="text-green-400 font-medium">Classe :</span> Fongicide de contact
                  </p>
                  <p>
                    <span className="text-green-400 font-medium">Fabricant :</span> Bayer CropScience
                    &nbsp;|&nbsp;
                    <span className="text-green-400 font-medium">Distributeur CI :</span> SCPA Afrique
                  </p>
                </div>
              </div>
              <Shield className="text-green-300" size={40} />
            </div>
          </div>

          {/* 5 KPI */}
          <div className="grid grid-cols-2 md:grid-cols-5 bg-white border-t border-gray-100">
            <div className="p-4 border-r border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Stock actuel</p>
              <p className="text-lg font-bold text-[#2E7D32]">12 kg</p>
              <p className="text-xs text-green-600">✅ au-dessus seuil 5 kg</p>
            </div>
            <div className="p-4 border-r border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Consommation YTD</p>
              <p className="text-lg font-bold text-gray-800">24 kg</p>
              <p className="text-xs text-gray-400">8 traitements × 3 kg/ha moy.</p>
            </div>
            <div className="p-4 border-r border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Coût unitaire</p>
              <p className="text-lg font-bold text-gray-800">8 400 XOF/kg</p>
              <p className="text-xs text-gray-400">&nbsp;</p>
            </div>
            <div className="p-4 border-r border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Délai ré-entrée (DRE)</p>
              <p className="text-lg font-bold text-orange-600">17 jours</p>
              <p className="text-xs text-gray-400">&nbsp;</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">Délai avant récolte (DAR)</p>
              <p className="text-lg font-bold text-orange-600">21 jours</p>
              <p className="text-xs text-gray-400">&nbsp;</p>
            </div>
          </div>
        </div>

        {/* Informations réglementaires */}
        <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5">
          <h2 className="text-base font-semibold text-orange-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={16} />
            Informations réglementaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-orange-700 font-medium">N° homologation CI : </span>
                <span className="text-gray-800">CI-MADER-FNG-2021-0847 (valide jusqu&apos;au 31/12/2026)</span>
              </div>
              <div>
                <span className="text-orange-700 font-medium">Classification OMS : </span>
                <span className="text-gray-800">Classe III (peu dangereux) — Formulation en poudre mouillable</span>
              </div>
              <div>
                <span className="text-orange-700 font-medium">Autorisé Rainforest Alliance : </span>
                <span className="text-[#2E7D32] font-medium">✅ Oui (cuivre &lt;6 kg/ha/an — norme RA 2020)</span>
              </div>
              <div>
                <span className="text-orange-700 font-medium">Cuivre utilisé 2025 YTD : </span>
                <span className="text-gray-800">4,8 kg MA/ha (sur 12 ha traités) — </span>
                <span className="text-[#2E7D32] font-semibold">sous la limite RA ✅</span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-orange-700 font-medium">Pictogrammes : </span>
                <span className="text-gray-800">⚠️ Corrosif &nbsp;|&nbsp; 🐟 Dangereux pour l&apos;environnement aquatique</span>
              </div>
              <div>
                <span className="text-orange-700 font-medium">EPI requis : </span>
                <span className="text-gray-800">Combinaison étanche + gants nitrile + lunettes + masque FFP2 + bottes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Utilisation agronomique */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-[#1B5E20] mb-4">Utilisation agronomique</h2>

          <div className="overflow-x-auto mb-5">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Utilisation","Dose","Volume bouillie","Nb traitements max/an"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Traitement préventif Phytophthora (mildiou)","3-4 g/L","500 L/ha","4 (limite cuivre RA)"],
                  ["Traitement curatif précoce Phytophthora","4-5 g/L","600 L/ha","2 max"],
                  ["Traitement chancre du tronc","Pur (badigeonnage)","—","2 max"],
                  ["Traitement Anthracnose anacarde","3 g/L","400 L/ha","3 max"],
                ].map(row => (
                  <tr key={row[0]} className="hover:bg-gray-50/50">
                    <td className="px-3 py-2 font-medium text-gray-800">{row[0]}</td>
                    {row.slice(1).map((cell,j) => (
                      <td key={j} className="px-3 py-2 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-semibold text-gray-600 mb-2">Conditions d&apos;application</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ["Température","Hors chaleur extrême (&lt;32°C)"],
              ["Vent","&lt; 3 m/s (pas de dérive)"],
              ["Pluie","Ne pas appliquer si pluie &lt;4h"],
              ["Meilleure période","06h-09h ou 16h-18h"],
            ].map(([label, val]) => (
              <div key={label} className="bg-[#F8FBF8] rounded-xl p-3">
                <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
                <p className="text-sm text-gray-800" dangerouslySetInnerHTML={{__html: val}} />
              </div>
            ))}
          </div>
        </div>

        {/* Historique des applications 2025 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-[#1B5E20] mb-4">Historique des applications 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Date","Parcelle","Surface","Dose","Qté utilisée","Opérateur","Condition météo","Résultat"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["05/07","PAR-A1","3,2 ha","4 g/L","3,2 kg","Ibrahim S.","☀️ 29°C, vent nul","Prévention - ✅ OK"],
                  ["24/06","PAR-A2","4,8 ha","4 g/L","4,8 kg","Ibrahim S.","⛅ 27°C","Prévention - ✅ OK"],
                  ["10/06","PAR-B1","2,1 ha","5 g/L","2,1 kg","Konan Y.","☀️ 31°C","Curatif précoce - ✅ Éradication"],
                  ["28/05","PAR-A3","1,5 ha","4 g/L","1,5 kg","Ibrahim S.","☀️ 30°C","Prévention - ✅ OK"],
                  ["15/05","PAR-A1","3,2 ha","3,5 g/L","2,8 kg","Konan Y.","⛅ 28°C","Prévention - ✅ OK"],
                  ["02/05","PAR-B2","3,3 ha","4 g/L","3,3 kg","Ibrahim S.","☀️ 32°C","Prévention - ✅ OK"],
                  ["18/04","PAR-A2","2,0 ha","5 g/L","2,5 kg","Ibrahim S.","⛅ 27°C","Curatif - ✅ OK"],
                  ["05/04","PAR-A3","4,8 ha","3 g/L","3,8 kg","Konan Y.","☀️ 29°C","Prévention - ✅ OK"],
                ].map(row => (
                  <tr key={`${row[0]}-${row[1]}`} className="hover:bg-gray-50/50">
                    <td className="px-3 py-2 font-medium text-[#2E7D32]">{row[0]}</td>
                    {row.slice(1).map((cell,j) => (
                      <td key={j} className="px-3 py-2 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-green-50/60">
                  <td colSpan={8} className="px-3 py-2 text-sm">
                    <span className="text-gray-600">Total cuivre métal appliqué : </span>
                    <span className="font-semibold text-gray-800">4,8 kg MA/ha</span>
                    <span className="text-gray-600"> (sur 12 ha — norme RA : &lt;6 kg) </span>
                    <span className="text-[#2E7D32] font-semibold">✅</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Stockage et sécurité */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-[#1B5E20] mb-4 flex items-center gap-2">
            <Package size={16} />
            Stockage et sécurité
          </h2>

          <h3 className="text-sm font-semibold text-gray-600 mb-2">Lot en stock</h3>
          <div className="overflow-x-auto mb-5">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Lot","Réception","Qté","DLU","Localisation","Temp. stockage"].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50/50">
                  <td className="px-3 py-2 font-medium text-[#2E7D32]">LOT-PHY-2025-08</td>
                  <td className="px-3 py-2 text-gray-700">01/07/2025</td>
                  <td className="px-3 py-2 font-semibold text-gray-800">12 kg</td>
                  <td className="px-3 py-2 text-gray-700">01/07/2027</td>
                  <td className="px-3 py-2 text-gray-700">Entrepôt Soubré — Zone produits phyto (C2)</td>
                  <td className="px-3 py-2 text-[#2E7D32] font-medium">18-25°C ✅</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-semibold text-gray-600 mb-3">Consignes de sécurité</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {[
              ["Stockage","Local ventilé, à l'écart des aliments et semences"],
              ["Incompatibilité","Ne pas mélanger avec produits alcalins (pH > 8)"],
              ["Traitement déchets","Récupération emballages ADAMA-CI (programme collect. phyto)"],
              ["En cas d'ingestion","Centre antipoison d'Abidjan : +225 20 21 98 46"],
            ].map(([label, val]) => (
              <div key={label} className="bg-red-50/50 border border-red-100 rounded-xl p-3">
                <p className="text-xs font-semibold text-red-700 mb-1">{label}</p>
                <p className="text-sm text-gray-800">{val}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 bg-[#F8FBF8] rounded-xl border border-gray-100">
            <ClipboardList size={14} className="text-gray-500 shrink-0" />
            <span className="text-sm text-gray-600">
              <span className="font-medium">Fiche de données sécurité (FDS) :</span>{" "}
              FDS-Super-Cupravit-OB-FR.pdf
            </span>
            <button className="ml-auto text-xs text-[#2E7D32] font-medium hover:underline">↓ Télécharger</button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/intrants"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} />
            Retour aux intrants
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-sm font-medium hover:bg-[#1B5E20] transition-colors">
            <ShoppingCart size={14} />
            Commander ce produit (FRN-001 SCPA)
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <ClipboardList size={14} />
            Créer un bon d&apos;application
          </button>
        </div>
      </main>
    </div>
  );
}
