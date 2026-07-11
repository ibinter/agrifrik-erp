import Topbar from "../../../components/Topbar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VenteDetailPage({ params }: Props) {
  const { id } = await params;

  /* ── données statiques VNT-2025-008 ── */
  const lots = [
    { lot: "LOT-2025-046", date: "01/07/2025", vol: 964, grade: "AA", hum: "7,2%", cut: "97%" },
    { lot: "LOT-2025-044", date: "22/06/2025", vol: 845, grade: "AA", hum: "7,4%", cut: "95%" },
    { lot: "LOT-2025-043", date: "18/06/2025", vol: 892, grade: "AA", hum: "7,1%", cut: "96%" },
    { lot: "LOT-2025-041", date: "10/06/2025", vol: 699, grade: "AA", hum: "7,3%", cut: "97%" },
  ];

  const docs = [
    { doc: "Bon de livraison", num: "BL-2025-008 (interne)", date: "22/06/2025", statut: "✅ Émis" },
    { doc: "Connaissement maritime", num: "MAEU-CI-0908", date: "23/06/2025", statut: "✅ Émis" },
    { doc: "Certificat Rainforest Alliance", num: "RA-CI-2025-00908", date: "01/03/2025", statut: "✅ Valide" },
    { doc: "Certificat phytosanitaire", num: "PHYTO-MINADER-2025-0567", date: "23/06/2025", statut: "✅ Émis" },
    { doc: "Déclaration export DGD", num: "DGD-2025-NW-0234", date: "22/06/2025", statut: "✅ Validée douanes" },
    { doc: "Facture commerciale", num: "FAC-2025-008", date: "22/06/2025", statut: "✅ Réglée" },
  ];

  const reglements = [
    { etape: "Remise documents LC", date: "23/06/2025", montant: "—", mode: "Lettre de crédit SGBCI", ref: "LC-SGBCI-2025-BC-008" },
    { etape: "Présentation documents banque", date: "24/06/2025", montant: "—", mode: "—", ref: "—" },
    { etape: "Règlement banque à banque", date: "08/07/2025", montant: "3 695 800 XOF", mode: "Virement SWIFT", ref: "VIR-SGBCI-2025-07-0908" },
    { etape: "Frais bancaires LC", date: "08/07/2025", montant: "-18 000 XOF", mode: "Débit SGBCI", ref: "—" },
  ];

  /* ── area chart — CA mensuel cumulé ── */
  const mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul"];
  const realise = [4.4, 4.4, 4.5, 4.4, 4.5, 8.9, 3.7];
  const objectifMensuel = 4.35;
  const W = 640, H = 200, PL = 40, PR = 20, PT = 16, PB = 30;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;
  const maxVal = 10;
  const xStep = innerW / (mois.length - 1);
  const yScale = (v: number) => PT + innerH - (v / maxVal) * innerH;
  const pts = realise.map((v, i) => ({ x: PL + i * xStep, y: yScale(v) }));
  const areaPath = `M ${pts[0].x} ${yScale(0)} L ${pts.map(p => `${p.x} ${p.y}`).join(" L ")} L ${pts[pts.length - 1].x} ${yScale(0)} Z`;
  const linePath = `M ${pts.map(p => `${p.x} ${p.y}`).join(" L ")}`;
  const objY = yScale(objectifMensuel);
  const objLinePath = `M ${PL} ${objY} L ${PL + innerW} ${objY}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Commerce", "Ventes", `Vente ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* ── EN-TÊTE VERT ── */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl font-bold">VNT-2025-008</span>
                <span className="inline-flex items-center gap-1.5 bg-[#4CAF50] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  ✅ Livrée &amp; réglée
                </span>
              </div>
              <p className="text-[#A5D6A7] text-sm font-semibold">Cacao Grade AA — Barry Callebaut CI</p>
              <p className="text-[#C8E6C9] text-xs">
                Contrat : <span className="text-white font-medium">CTR-2025-001</span> (Barry Callebaut — lot contractuel #7/12)
              </p>
            </div>
            <div className="text-sm text-[#C8E6C9] space-y-1 text-right">
              <p><span className="text-[#A5D6A7]">Date :</span> <span className="text-white font-medium">22/06/2025</span></p>
              <p><span className="text-[#A5D6A7]">Livraison :</span> <span className="text-white font-medium">23/06/2025</span></p>
              <p><span className="text-[#A5D6A7]">Incoterm :</span> <span className="text-white font-medium">DAP San-Pédro</span></p>
            </div>
          </div>
        </div>

        {/* ── 4 KPI ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Quantité", value: "3 400 kg", sub: "Grade AA — 97% fèves brunes" },
            { label: "Prix unitaire", value: "1 087 XOF/kg", sub: "Contractuel CTR-2025-001" },
            { label: "Montant HT", value: "3 695 800 XOF", sub: "" },
            { label: "Règlement", value: "✅ Reçu le 08/07/2025", sub: "J+15" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className="text-sm font-bold text-[#1B5E20] leading-tight">{k.value}</p>
              {k.sub && <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>}
            </div>
          ))}
        </div>

        {/* ── DÉTAIL DE LA VENTE ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Détail de la vente — Composition de la livraison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Lot", "Date transformation", "Volume (kg)", "Grade", "Humidité %", "Cut test %"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lots.map((r) => (
                  <tr key={r.lot} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-2.5 font-medium text-gray-800">{r.lot}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.date}</td>
                    <td className="px-3 py-2.5 text-gray-700">{r.vol} kg</td>
                    <td className="px-3 py-2.5">
                      <span className="bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold px-2 py-0.5 rounded-full">{r.grade}</span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-700">{r.hum} ✅</td>
                    <td className="px-3 py-2.5 text-gray-700">{r.cut} ✅</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-[#2E7D32] bg-[#F1F8F1]">
                  <td className="px-3 py-2.5 font-bold text-gray-800">TOTAL</td>
                  <td className="px-3 py-2.5" />
                  <td className="px-3 py-2.5 font-bold text-[#1B5E20]">3 400 kg</td>
                  <td className="px-3 py-2.5 font-bold text-[#1B5E20]">Grade AA</td>
                  <td className="px-3 py-2.5 font-bold text-gray-700">moy 7,25%</td>
                  <td className="px-3 py-2.5 font-bold text-gray-700">moy 96,2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── CONDITIONS COMMERCIALES ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Conditions commerciales</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-3 py-2 font-semibold text-gray-600 w-1/3">Paramètre</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Détail</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Contrat de base", "CTR-2025-001 — 48t/an Grade AA — Barry Callebaut CI"],
                  ["N° livraison contractuelle", "7/12 (7ème livraison sur 12 prévues 2025)"],
                  ["Prix de base contractuel", "1 000 XOF/kg"],
                  ["Prime qualité Grade AA (+3% fèves)", "+62 XOF/kg"],
                  ["Prime Rainforest Alliance", "+25 XOF/kg"],
                  ["Prix total", "1 087 XOF/kg ✅"],
                  ["Tolérance humidité", "≤8% — OK (7,25% mesuré)"],
                  ["Tolérance moisissures", "≤3% — OK (0,8% mesuré)"],
                  ["Tare emballage", "52 kg (sacs jute) — déduits du poids brut 3 452 kg"],
                  ["Poids net payé", "3 400 kg ✅"],
                ].map(([param, detail], i) => (
                  <tr key={i} className="border-t border-gray-50">
                    <td className={`px-3 py-2.5 font-medium ${param === "Prix total" || param === "Poids net payé" ? "text-[#1B5E20] font-bold" : "text-gray-700"}`}>{param}</td>
                    <td className={`px-3 py-2.5 ${param === "Prix total" || param === "Poids net payé" ? "text-[#1B5E20] font-bold" : "text-gray-600"}`}>{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── LOGISTIQUE & DOCUMENTS ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Logistique &amp; Documents</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Document", "N°", "Date", "Statut"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {docs.map((r, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-2.5 font-medium text-gray-800">{r.doc}</td>
                    <td className="px-3 py-2.5 text-gray-600 font-mono">{r.num}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.date}</td>
                    <td className="px-3 py-2.5 text-gray-700">{r.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── RÈGLEMENT ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1B5E20] mb-4">Règlement</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Étape", "Date", "Montant", "Mode", "Référence"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reglements.map((r, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors">
                    <td className="px-3 py-2.5 font-medium text-gray-800">{r.etape}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.date}</td>
                    <td className={`px-3 py-2.5 ${r.montant.startsWith("-") ? "text-red-600 font-medium" : "text-gray-700"}`}>{r.montant}</td>
                    <td className="px-3 py-2.5 text-gray-600">{r.mode}</td>
                    <td className="px-3 py-2.5 text-gray-500 font-mono">{r.ref}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-[#2E7D32] bg-[#F1F8F1]">
                  <td className="px-3 py-2.5 font-bold text-[#1B5E20]">Net encaissé</td>
                  <td className="px-3 py-2.5" />
                  <td className="px-3 py-2.5 font-bold text-[#1B5E20]">3 677 800 XOF</td>
                  <td className="px-3 py-2.5" />
                  <td className="px-3 py-2.5" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── HISTORIQUE BARRY CALLEBAUT 2025 — area chart SVG ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-[#1B5E20]">Historique des ventes — Barry Callebaut 2025</h2>
              <p className="text-xs text-gray-500 mt-0.5">CA mensuel cumulé vs objectif contractuel</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-6 h-0.5 bg-[#4CAF50]" />
                Réalisé
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-6 border-t-2 border-dashed border-[#E65100]" />
                Objectif 4,35M/mois
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 320, maxWidth: 700 }}>
              <defs>
                <linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.03" />
                </linearGradient>
              </defs>

              {/* grille horizontale */}
              {[0, 2.5, 5, 7.5, 10].map((v) => {
                const y = yScale(v);
                return (
                  <g key={v}>
                    <line x1={PL} y1={y} x2={PL + innerW} y2={y} stroke="#E5E7EB" strokeWidth="1" />
                    <text x={PL - 4} y={y + 3.5} textAnchor="end" fontSize="8" fill="#9CA3AF">{v}M</text>
                  </g>
                );
              })}

              {/* objectif pointillé orange */}
              <path d={objLinePath} fill="none" stroke="#E65100" strokeWidth="1.5" strokeDasharray="5,4" />

              {/* aire réalisé */}
              <path d={areaPath} fill="url(#greenArea)" />

              {/* courbe réalisé */}
              <path d={linePath} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinejoin="round" />

              {/* points */}
              {pts.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="4" fill="#2E7D32" />
                  <circle cx={p.x} cy={p.y} r="2" fill="white" />
                  <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="8" fill="#2E7D32" fontWeight="600">
                    {realise[i]}M
                  </text>
                </g>
              ))}

              {/* étiquettes mois */}
              {mois.map((m, i) => (
                <text key={m} x={PL + i * xStep} y={H - 6} textAnchor="middle" fontSize="9" fill="#6B7280">{m}</text>
              ))}
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
            <div className="rounded-xl bg-[#E8F5E9] px-4 py-2">
              <span className="text-gray-500">Cumul 2025 :</span>{" "}
              <span className="font-bold text-[#1B5E20]">34,8M XOF</span>
            </div>
            <div className="rounded-xl bg-[#FFF3E0] px-4 py-2">
              <span className="text-gray-500">Objectif annuel :</span>{" "}
              <span className="font-bold text-[#E65100]">52,2M XOF</span>
            </div>
            <div className="rounded-xl bg-[#F8FBF8] px-4 py-2">
              <span className="text-gray-500">Progression :</span>{" "}
              <span className="font-bold text-[#1B5E20]">66,7% — bon rythme</span>
            </div>
          </div>
        </div>

        {/* ── BOUTONS ── */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/ventes"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux ventes
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1B5E20] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17H7a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2zm-5-9V4" />
            </svg>
            Imprimer la facture
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Télécharger les documents
          </button>
        </div>

      </main>
    </div>
  );
}
