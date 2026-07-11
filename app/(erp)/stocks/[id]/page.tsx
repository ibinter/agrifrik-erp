import Topbar from "../../../components/Topbar";
import Link from "next/link";

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const kpis = [
    { label: "Quantité en stock", value: "3,2 kg", sub: "" },
    { label: "Stock de sécurité", value: "5 kg", sub: "seuil alerte" },
    { label: "Valeur stock", value: "26 880 XOF", sub: "8 400 XOF/kg" },
    { label: "Prochain traitement", value: "15/07/2025", sub: "dans 4 jours" },
    { label: "Besoin estimé 15/07", value: "4,5 kg", sub: "❌ insuffisant" },
  ];

  const detailProduit = [
    ["Substance active", "Cuivre (hydroxyde de cuivre) 50%"],
    ["Formulation", "Poudre mouillable (WP)"],
    ["Homologation CI", "N° MIN-AGRI-CI-2019-0847 (valide 2026)"],
    ["Liste RA", "✅ Autorisé liste positive Rainforest Alliance"],
    ["DAR (délai avant récolte)", "14 jours"],
    ["Zone cible", "Mildiou, Pourriture brune des cabosses (Phytophthora)"],
    ["Dose", "150 g/25L d'eau/ha"],
    ["Conditionnement", "Sachets 1 kg (UCV : 8 400 XOF/kg)"],
  ];

  // Line chart data — évolution stock Jan–Jul 2025
  // Points: [mois_x, stock_y_kg]
  // Simulation: Jan 12 → traitements → mar achat → ... → jul 3.2
  const stockPoints = [
    { label: "01/01", kg: 12.0, type: "start" },
    { label: "15/01", kg: 10.5, type: "sortie" },
    { label: "01/02", kg: 9.0, type: "sortie" },
    { label: "15/02", kg: 7.5, type: "sortie" },
    { label: "28/02", kg: 6.0, type: "sortie" },
    { label: "28/03", kg: 14.0, type: "achat" },  // achat +8kg
    { label: "10/04", kg: 12.5, type: "sortie" },
    { label: "15/05", kg: 11.0, type: "sortie" },
    { label: "28/05", kg: 9.5, type: "sortie" },
    { label: "14/06", kg: 13.5, type: "achat" },  // achat +4kg
    { label: "02/07", kg: 11.7, type: "sortie" },
    { label: "02/07b", kg: 3.2, type: "sortie" },
    { label: "11/07", kg: 3.2, type: "current" },
  ];

  const chartW = 640;
  const chartH = 180;
  const padL = 45;
  const padB = 25;
  const padR = 20;
  const padT = 15;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padB - padT;
  const maxKg = 16;
  const secKg = 5;

  const toX = (i: number) => padL + (i / (stockPoints.length - 1)) * innerW;
  const toY = (kg: number) => padT + innerH - (kg / maxKg) * innerH;

  const polyline = stockPoints
    .map((p, i) => `${toX(i)},${toY(p.kg)}`)
    .join(" ");

  const seuilY = toY(secKg);

  const mouvements = [
    { date: "11/07", type: "—", qte: "—", motif: "État actuel", lot: "—", apres: "3,2 kg" },
    { date: "02/07", type: "Sortie", qte: "-1,5 kg", motif: "Traitement PAR-A1+A2 lot LOT-2025-046", lot: "—", apres: "3,2 kg" },
    { date: "02/07", type: "Sortie", qte: "-0,3 kg", motif: "Traitement PAR-B1 préventif", lot: "—", apres: "4,7 kg" },
    { date: "14/06", type: "Entrée", qte: "+4 kg", motif: "Achat SCPA ACH-2025-022", lot: "ACH-022", apres: "5,0 kg" },
    { date: "28/05", type: "Sortie", qte: "-1,5 kg", motif: "Traitement PAR-A1 anti-mirides", lot: "—", apres: "1,0 kg" },
    { date: "15/05", type: "Sortie", qte: "-1,5 kg", motif: "Traitement PAR-A2 préventif", lot: "—", apres: "2,5 kg" },
    { date: "28/03", type: "Entrée", qte: "+8 kg", motif: "Achat SCPA ACH-2025-010", lot: "ACH-010", apres: "4,0 kg" },
    { date: "10/03", type: "Sortie", qte: "-1,5 kg", motif: "Traitement PAR-A1 préventif", lot: "—", apres: "8,0 kg" },
    { date: "15/02", type: "Sortie", qte: "-1,5 kg", motif: "Traitement PAR-B1+B2", lot: "—", apres: "9,5 kg" },
    { date: "01/02", type: "Sortie", qte: "-1,5 kg", motif: "Traitement PAR-A2 préventif", lot: "—", apres: "11,0 kg" },
    { date: "15/01", type: "Sortie", qte: "-1,5 kg", motif: "Traitement PAR-A1 départ saison", lot: "—", apres: "12,5 kg" },
    { date: "01/01", type: "Stock init.", qte: "+12 kg", motif: "Report stock 31/12/2024", lot: "REP-2024", apres: "12,0 kg" },
  ];

  const conformite = [
    { critere: "Homologation CI valide", statut: "✅ Valide jusqu'au 31/12/2026" },
    { critere: "Liste positive RA", statut: "✅ Autorisé" },
    { critere: "Stockage séparé des semences", statut: "✅ Zone C isolée" },
    { critere: "Registre d'utilisation", statut: "✅ Tenu dans AGRIFRIK (12 entrées 2025)" },
    { critere: "Équipements de protection disponibles", statut: "✅ Masque + gants nitrile + lunettes (stock ENT-001)" },
    { critere: "Formation opérateurs", statut: "✅ Ibrahim Sawadogo (certifié ANADER jan 2025)" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Logistique", "Stocks", `Article ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* EN-TÊTE BANDEAU VERT */}
        <div className="rounded-2xl bg-[#1B5E20] p-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-bold">Super Cupravit OB 50 WP — Fongicide cuivrique</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100">
                <span>Code stock : <span className="font-mono font-semibold text-white">STK-INT-001</span></span>
                <span>Catégorie : <span className="text-white">Intrants phytosanitaires</span></span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100">
                <span>Localisation : <span className="text-white">ENT-001 — Zone C (produits phyto, verrou réglementaire)</span></span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100">
                <span>Fournisseur principal : <span className="text-white">SCPA Afrique (agrément CI-MAE-0234)</span></span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 text-yellow-900 px-4 py-1.5 text-sm font-semibold whitespace-nowrap">
              🟡 Stock bas — Commande suggérée
            </span>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {kpis.map((k, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${i === 4 ? "border-red-200 bg-red-50" : "border-gray-100 bg-white"}`}>
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className={`text-lg font-bold leading-tight ${i === 4 ? "text-red-700" : "text-[#1B5E20]"}`}>{k.value}</p>
              {k.sub && <p className={`text-xs ${i === 4 ? "text-red-500" : "text-gray-400"}`}>{k.sub}</p>}
            </div>
          ))}
        </div>

        {/* DÉTAIL PRODUIT */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Détail du produit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {detailProduit.map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800 text-right max-w-[60%]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SITUATION DES STOCKS */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Situation des stocks</h2>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Évolution du stock Super Cupravit — Jan–Jul 2025</h3>
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} width={chartW} height={chartH} className="block max-w-full">
              {/* Zone d'alerte sous seuil */}
              <defs>
                <pattern id="alertPattern" patternUnits="userSpaceOnUse" width="6" height="6">
                  <line x1="0" y1="6" x2="6" y2="0" stroke="#fca5a5" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x={padL} y={seuilY} width={innerW} height={chartH - padB - seuilY} fill="url(#alertPattern)" opacity="0.6" />

              {/* Grid lines */}
              {[0, 4, 8, 12, 16].map((v) => {
                const y = toY(v);
                return (
                  <g key={v}>
                    <line x1={padL} y1={y} x2={chartW - padR} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                    <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v} kg</text>
                  </g>
                );
              })}

              {/* Ligne seuil de sécurité */}
              <line x1={padL} y1={seuilY} x2={chartW - padR} y2={seuilY} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,3" />
              <text x={chartW - padR - 2} y={seuilY - 4} textAnchor="end" fontSize="9" fill="#ef4444">Seuil sécurité 5 kg</text>

              {/* Polyline stock */}
              <polyline points={polyline} fill="none" stroke="#2E7D32" strokeWidth="2" />

              {/* Points */}
              {stockPoints.map((p, i) => {
                const cx = toX(i);
                const cy = toY(p.kg);
                if (p.type === "achat") {
                  return <circle key={i} cx={cx} cy={cy} r="5" fill="#2E7D32" stroke="white" strokeWidth="1.5" />;
                } else if (p.type === "sortie") {
                  return <circle key={i} cx={cx} cy={cy} r="4" fill="#ef4444" stroke="white" strokeWidth="1.5" />;
                } else if (p.type === "current") {
                  return <circle key={i} cx={cx} cy={cy} r="5" fill="#E65100" stroke="white" strokeWidth="1.5" />;
                }
                return <circle key={i} cx={cx} cy={cy} r="3" fill="#6b7280" />;
              })}

              {/* Axes labels */}
              {[0, 3, 6, 9, 12].map((i) => {
                if (i >= stockPoints.length) return null;
                return (
                  <text key={i} x={toX(i)} y={chartH - padB + 14} textAnchor="middle" fontSize="8" fill="#9ca3af">
                    {stockPoints[i].label}
                  </text>
                );
              })}
            </svg>
          </div>
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-[#2E7D32]"></span> Achat (entrée)</span>
            <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-red-400"></span> Consommation (sortie)</span>
            <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-full bg-[#E65100]"></span> Stock actuel</span>
            <span className="flex items-center gap-1"><span className="inline-block w-4 border-t-2 border-dashed border-red-400"></span> Seuil de sécurité</span>
          </div>
        </div>

        {/* HISTORIQUE DES MOUVEMENTS */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Historique des mouvements</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                  <th className="text-left px-3 py-2 rounded-l-lg">Date</th>
                  <th className="text-left px-3 py-2">Type</th>
                  <th className="text-right px-3 py-2">Qté (kg)</th>
                  <th className="text-left px-3 py-2">Motif</th>
                  <th className="text-left px-3 py-2">Lot achat</th>
                  <th className="text-right px-3 py-2 rounded-r-lg">Stock après</th>
                </tr>
              </thead>
              <tbody>
                {mouvements.map((m, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{m.date}</td>
                    <td className="px-3 py-2">
                      {m.type === "Entrée" ? (
                        <span className="inline-block bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded">{m.type}</span>
                      ) : m.type === "Sortie" ? (
                        <span className="inline-block bg-red-50 text-red-600 text-xs font-medium px-2 py-0.5 rounded">{m.type}</span>
                      ) : (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded">{m.type}</span>
                      )}
                    </td>
                    <td className={`px-3 py-2 text-right font-medium whitespace-nowrap ${m.qte.startsWith("+") ? "text-green-700" : m.qte.startsWith("-") ? "text-red-600" : "text-gray-500"}`}>
                      {m.qte}
                    </td>
                    <td className="px-3 py-2 text-gray-700">{m.motif}</td>
                    <td className="px-3 py-2 text-gray-500 whitespace-nowrap">
                      {m.lot !== "—" ? (
                        <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{m.lot}</span>
                      ) : "—"}
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-gray-800 whitespace-nowrap">{m.apres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ALERTE ET SUGGESTIONS */}
        <div className="rounded-2xl border border-orange-300 bg-orange-50 p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">🚨</span>
            <div className="flex-1 space-y-3">
              <h2 className="text-base font-bold text-orange-900">Stock insuffisant pour le prochain traitement</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex justify-between border-b border-orange-200 pb-1">
                  <span className="text-orange-700">Besoin 15/07</span>
                  <span className="font-semibold text-orange-900">4,5 kg (PAR-A1+A2 + PAR-B1)</span>
                </div>
                <div className="flex justify-between border-b border-orange-200 pb-1">
                  <span className="text-orange-700">Stock actuel</span>
                  <span className="font-semibold text-red-700">3,2 kg</span>
                </div>
                <div className="flex justify-between border-b border-orange-200 pb-1">
                  <span className="text-orange-700">Déficit</span>
                  <span className="font-bold text-red-700">1,3 kg</span>
                </div>
                <div className="flex justify-between border-b border-orange-200 pb-1">
                  <span className="text-orange-700">Délai livraison SCPA</span>
                  <span className="font-semibold text-orange-900">2–3 jours ouvrés</span>
                </div>
              </div>
              <p className="text-sm text-orange-800 bg-orange-100 rounded-xl px-4 py-3 border border-orange-200">
                <span className="font-semibold">Recommandation :</span> Commander <span className="font-bold">5 kg minimum</span> dès aujourd&apos;hui pour couvrir le traitement du 15/07 et maintenir le stock de sécurité.
              </p>
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1B5E20] transition">
                Créer un bon de commande SCPA →
              </button>
            </div>
          </div>
        </div>

        {/* CONFORMITÉ RÉGLEMENTAIRE */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Conformité réglementaire</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                  <th className="text-left px-3 py-2 rounded-l-lg">Critère</th>
                  <th className="text-left px-3 py-2 rounded-r-lg">Statut</th>
                </tr>
              </thead>
              <tbody>
                {conformite.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2 text-gray-700">{c.critere}</td>
                    <td className="px-3 py-2 text-green-700 font-medium">{c.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-3 pb-6">
          <Link
            href="/stocks"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            ← Retour aux stocks
          </Link>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2 text-xs font-medium text-white hover:bg-[#1B5E20] transition">
            Commander SCPA
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
            Voir le registre phyto
          </button>
        </div>

      </main>
    </div>
  );
}
