import Topbar from "../../../components/Topbar";
import Link from "next/link";

export default async function MaterielDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const kpis = [
    { label: "Heures moteur", value: "2 847 h", sub: "" },
    { label: "Prochaine révision", value: "3 000 h", sub: "→ ~153 h (~19 jours)" },
    { label: "Valeur nette comptable", value: "11 200 000", sub: "XOF" },
    { label: "Coût total possession (2025)", value: "3 420 000", sub: "XOF" },
    { label: "Disponibilité", value: "94,2%", sub: "✅ Bonne" },
  ];

  const ficheTechnique = [
    ["Marque / Modèle", "John Deere 5055E"],
    ["Puissance", "55 CV (41 kW)"],
    ["Moteur", "John Deere PowerTech 3 cylindres 2,9L Diesel"],
    ["Transmission", "Synchronisée 12AV/4AR"],
    ["Relevage", "Cat. II — 2 200 kg"],
    ["PTO", "540/1000 tr/min"],
    ["Année fabrication", "2020 (acheté neuf 2021)"],
    ["Date mise en service", "15/03/2021"],
    ["Prix d'achat", "22 500 000 XOF (neuf, dealer JD Abidjan)"],
    ["Financement", "Crédit BIAO CI — 60 mois — soldé jan 2025"],
  ];

  // Bar chart data — heures mensuelles 2025
  const heuresMois = [
    { mois: "Jan", h: 124 },
    { mois: "Fév", h: 86 },
    { mois: "Mar", h: 142 },
    { mois: "Avr", h: 168 },
    { mois: "Mai", h: 138 },
    { mois: "Jun", h: 122 },
    { mois: "Jul", h: 47 },
  ];
  const maxH = 180;
  const barW = 60;
  const chartW = 640;
  const chartH = 200;
  const chartPadL = 40;
  const chartPadB = 30;
  const chartInnerW = chartW - chartPadL - 20;
  const chartInnerH = chartH - chartPadB - 10;
  const barSpacing = chartInnerW / heuresMois.length;

  const usages = [
    { usage: "Labour et préparation sols", heures: "312 h", pct: "38%" },
    { usage: "Transport récolte (chargeur)", heures: "218 h", pct: "26%" },
    { usage: "Pulvérisation (pulvé attelé)", heures: "164 h", pct: "20%" },
    { usage: "Transport intrants et matériels", heures: "133 h", pct: "16%" },
  ];

  const maintenancePreventive = [
    {
      type: "Vidange huile + filtre",
      intervalle: "250 h",
      derniereDate: "14/06/2025",
      dernieresH: "2 700 h",
      prochaineDate: "~28/07/2025",
      prochainSeuil: "2 950 h",
      statut: "✅ OK",
      statutColor: "text-green-700",
    },
    {
      type: "Filtre à air",
      intervalle: "500 h",
      derniereDate: "18/04/2025",
      dernieresH: "2 500 h",
      prochaineDate: "~10/08/2025",
      prochainSeuil: "3 000 h",
      statut: "🟡 Bientôt",
      statutColor: "text-yellow-700",
    },
    {
      type: "Filtre carburant",
      intervalle: "500 h",
      derniereDate: "18/04/2025",
      dernieresH: "2 500 h",
      prochaineDate: "~10/08/2025",
      prochainSeuil: "3 000 h",
      statut: "🟡 Bientôt",
      statutColor: "text-yellow-700",
    },
    {
      type: "Révision générale (courroies, injecteurs, embrayage)",
      intervalle: "1 000 h",
      derniereDate: "15/01/2025",
      dernieresH: "2 000 h",
      prochaineDate: "~10/08/2025",
      prochainSeuil: "3 000 h",
      statut: "🟡 Programmée J+19",
      statutColor: "text-yellow-700",
      bold: true,
    },
    {
      type: "Pneus avant",
      intervalle: "Contrôle annuel",
      derniereDate: "01/01/2025",
      dernieresH: "—",
      prochaineDate: "01/01/2026",
      prochainSeuil: "—",
      statut: "✅ OK (75% usure)",
      statutColor: "text-green-700",
    },
  ];

  const historiqueInterventions = [
    { date: "14/06/2025", type: "Préventive", desc: "Vidange 15W40 + filtre à huile JD", cout: "48 000 XOF", prestataire: "JD Dealer Soubré" },
    { date: "18/04/2025", type: "Préventive", desc: "Révision 2 500h : filtres air+gasoil, courroie alternateur", cout: "184 000 XOF", prestataire: "JD Dealer Soubré" },
    { date: "22/02/2025", type: "Corrective", desc: "Remplacement capteur T° moteur (panne) — 0,5j immobilisation", cout: "62 000 XOF", prestataire: "JD Dealer Soubré" },
    { date: "15/01/2025", type: "Préventive", desc: "Grande révision 2 000h — injecteurs vérifiés, embrayage OK", cout: "420 000 XOF", prestataire: "JD Dealer Soubré" },
  ];

  // TCO stacked bar data (Jan–Jun 2025)
  const tcoMois = [
    { mois: "Jan", carb: 160, maint: 48, ass: 26, div: 8 },
    { mois: "Fév", carb: 112, maint: 0, ass: 26, div: 5 },
    { mois: "Mar", carb: 184, maint: 184, ass: 26, div: 6 },
    { mois: "Avr", carb: 218, maint: 0, ass: 26, div: 8 },
    { mois: "Mai", carb: 179, maint: 62, ass: 26, div: 6 },
    { mois: "Jun", carb: 158, maint: 0, ass: 26, div: 5 },
  ];
  const tcoMax = 450;

  const tcoPostes = [
    { poste: "Carburant (gazole — 18L/h moy.)", ytd: "1 248 000 XOF", annuel: "2 142 000 XOF" },
    { poste: "Maintenance préventive", ytd: "714 000 XOF", annuel: "920 000 XOF" },
    { poste: "Réparation corrective", ytd: "62 000 XOF", annuel: "62 000 XOF" },
    { poste: "Assurance NSIA (tous risques)", ytd: "186 000 XOF", annuel: "318 000 XOF" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Logistique", "Matériels", `Matériel ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* EN-TÊTE BANDEAU VERT */}
        <div className="rounded-2xl bg-[#1B5E20] p-6 text-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-xl font-bold">Tracteur agricole John Deere 5055E — 55 CV</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100">
                <span>Code AGRIFRIK : <span className="font-mono font-semibold text-white">MAT-2021-004</span></span>
                <span>N° série : <span className="font-mono font-semibold text-white">1PY5055EALB123456</span></span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100">
                <span>Immatriculé : <span className="text-white">CI-2021-NW-0047</span></span>
                <span>Catégorie : <span className="text-white">Véhicules agricoles</span></span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-green-100">
                <span>Affecté à : <span className="text-white">Exploitation EXP-001 — Soubré</span></span>
                <span>Responsable : <span className="text-white">Ibrahim Sawadogo</span></span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 text-yellow-900 px-4 py-1.5 text-sm font-semibold whitespace-nowrap">
              🟡 Maintenance programmée (dans 12 jours)
            </span>
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

        {/* FICHE TECHNIQUE */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Fiche technique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {ficheTechnique.map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800 text-right max-w-[60%]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COMPTEUR ET UTILISATION */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Compteur et utilisation</h2>

          {/* SVG bar chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Heures d&apos;utilisation mensuelles 2025</h3>
            <div className="overflow-x-auto">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} width={chartW} height={chartH} className="block max-w-full">
                {/* Grid lines */}
                {[0, 50, 100, 150].map((v) => {
                  const y = chartH - chartPadB - (v / maxH) * chartInnerH;
                  return (
                    <g key={v}>
                      <line x1={chartPadL} y1={y} x2={chartW - 20} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                      <text x={chartPadL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}</text>
                    </g>
                  );
                })}
                {/* Threshold line at 3000h total — représente ici 160h/mois symboliquement */}
                <line
                  x1={chartPadL}
                  y1={chartH - chartPadB - (155 / maxH) * chartInnerH}
                  x2={chartW - 20}
                  y2={chartH - chartPadB - (155 / maxH) * chartInnerH}
                  stroke="#E65100"
                  strokeWidth="1.5"
                  strokeDasharray="6,3"
                />
                <text
                  x={chartW - 22}
                  y={chartH - chartPadB - (155 / maxH) * chartInnerH - 4}
                  textAnchor="end"
                  fontSize="9"
                  fill="#E65100"
                >
                  Seuil rév. 3 000h
                </text>
                {/* Bars */}
                {heuresMois.map((d, i) => {
                  const bH = (d.h / maxH) * chartInnerH;
                  const x = chartPadL + i * barSpacing + barSpacing / 2 - barW / 3;
                  const y = chartH - chartPadB - bH;
                  const isLast = i === heuresMois.length - 1;
                  return (
                    <g key={d.mois}>
                      <rect
                        x={x}
                        y={y}
                        width={barW * 0.67}
                        height={bH}
                        fill={isLast ? "#A5D6A7" : "#2E7D32"}
                        rx="3"
                      />
                      <text x={x + (barW * 0.67) / 2} y={y - 4} textAnchor="middle" fontSize="9" fill="#374151">
                        {d.h}h
                      </text>
                      <text
                        x={x + (barW * 0.67) / 2}
                        y={chartH - chartPadB + 14}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#6b7280"
                      >
                        {d.mois}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="text-xs text-gray-400 mt-1">Juillet 2025 en cours (47h au 11/07). Ligne pointillée : seuil de la révision 3 000h.</p>
          </div>

          {/* Répartition usages */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Répartition des usages 2025</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                    <th className="text-left px-3 py-2 rounded-l-lg">Usage</th>
                    <th className="text-right px-3 py-2">Heures 2025</th>
                    <th className="text-right px-3 py-2 rounded-r-lg">%</th>
                  </tr>
                </thead>
                <tbody>
                  {usages.map((u, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-3 py-2 text-gray-700">{u.usage}</td>
                      <td className="px-3 py-2 text-right text-gray-700">{u.heures}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{u.pct}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#F8FBF8] font-semibold text-[#1B5E20]">
                    <td className="px-3 py-2">TOTAL 2025</td>
                    <td className="px-3 py-2 text-right">827 h</td>
                    <td className="px-3 py-2 text-right">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MAINTENANCE */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-6">
          <h2 className="text-base font-semibold text-gray-800">Maintenance</h2>

          {/* Calendrier préventif */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Calendrier de maintenance préventive</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                    <th className="text-left px-3 py-2 rounded-l-lg">Type révision</th>
                    <th className="text-left px-3 py-2">Intervalle</th>
                    <th className="text-left px-3 py-2">Dernière date</th>
                    <th className="text-left px-3 py-2">Dern. heures</th>
                    <th className="text-left px-3 py-2">Prochaine date</th>
                    <th className="text-left px-3 py-2">Prochain seuil</th>
                    <th className="text-left px-3 py-2 rounded-r-lg">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenancePreventive.map((m, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className={`px-3 py-2 text-gray-800 ${m.bold ? "font-semibold" : ""}`}>{m.type}</td>
                      <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{m.intervalle}</td>
                      <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{m.derniereDate}</td>
                      <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{m.dernieresH}</td>
                      <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{m.prochaineDate}</td>
                      <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{m.prochainSeuil}</td>
                      <td className={`px-3 py-2 whitespace-nowrap text-xs font-medium ${m.statutColor}`}>{m.statut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Historique interventions */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Historique des interventions 2025</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                    <th className="text-left px-3 py-2 rounded-l-lg">Date</th>
                    <th className="text-left px-3 py-2">Type</th>
                    <th className="text-left px-3 py-2">Description</th>
                    <th className="text-right px-3 py-2">Coût</th>
                    <th className="text-left px-3 py-2 rounded-r-lg">Prestataire</th>
                  </tr>
                </thead>
                <tbody>
                  {historiqueInterventions.map((h, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{h.date}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${h.type === "Corrective" ? "bg-orange-50 text-orange-700" : "bg-green-50 text-green-700"}`}>
                          {h.type}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-700">{h.desc}</td>
                      <td className="px-3 py-2 text-right font-medium text-gray-800 whitespace-nowrap">{h.cout}</td>
                      <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{h.prestataire}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COÛT DE POSSESSION */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-5">
          <h2 className="text-base font-semibold text-gray-800">Coût de possession 2025 (TCO)</h2>

          {/* SVG stacked bar */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Coût mensuel TCO 2025 — Jan à Jun</h3>
            <div className="overflow-x-auto">
              <svg viewBox="0 0 640 200" width="640" height="200" className="block max-w-full">
                {/* Legend */}
                <rect x="40" y="5" width="10" height="10" fill="#2E7D32" rx="2" />
                <text x="54" y="14" fontSize="9" fill="#374151">Carburant</text>
                <rect x="120" y="5" width="10" height="10" fill="#E65100" rx="2" />
                <text x="134" y="14" fontSize="9" fill="#374151">Maintenance</text>
                <rect x="220" y="5" width="10" height="10" fill="#0288D1" rx="2" />
                <text x="234" y="14" fontSize="9" fill="#374151">Assurance</text>
                <rect x="310" y="5" width="10" height="10" fill="#9ca3af" rx="2" />
                <text x="324" y="14" fontSize="9" fill="#374151">Divers</text>

                {/* Grid */}
                {[0, 100, 200, 300, 400].map((v) => {
                  const y = 185 - (v / tcoMax) * 155;
                  return (
                    <g key={v}>
                      <line x1="40" y1={y} x2="620" y2={y} stroke="#e5e7eb" strokeWidth="1" />
                      <text x="36" y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v}</text>
                    </g>
                  );
                })}

                {tcoMois.map((d, i) => {
                  const bw = 52;
                  const spacing = 96;
                  const x = 52 + i * spacing;
                  const toY = (v: number) => (v / tcoMax) * 155;
                  const y0 = 185;
                  const hCarb = toY(d.carb);
                  const hMaint = toY(d.maint);
                  const hAss = toY(d.ass);
                  const hDiv = toY(d.div);
                  return (
                    <g key={d.mois}>
                      <rect x={x} y={y0 - hCarb} width={bw} height={hCarb} fill="#2E7D32" />
                      <rect x={x} y={y0 - hCarb - hMaint} width={bw} height={hMaint} fill="#E65100" />
                      <rect x={x} y={y0 - hCarb - hMaint - hAss} width={bw} height={hAss} fill="#0288D1" />
                      <rect x={x} y={y0 - hCarb - hMaint - hAss - hDiv} width={bw} height={hDiv} fill="#9ca3af" />
                      <text x={x + bw / 2} y={195} textAnchor="middle" fontSize="10" fill="#6b7280">{d.mois}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="text-xs text-gray-400 mt-1">Valeurs en milliers XOF / mois.</p>
          </div>

          {/* Tableau TCO */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-500 text-xs">
                  <th className="text-left px-3 py-2 rounded-l-lg">Poste</th>
                  <th className="text-right px-3 py-2">2025 YTD (Jan–Jul)</th>
                  <th className="text-right px-3 py-2 rounded-r-lg">Estimé annuel</th>
                </tr>
              </thead>
              <tbody>
                {tcoPostes.map((t, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2 text-gray-700">{t.poste}</td>
                    <td className="px-3 py-2 text-right text-gray-700">{t.ytd}</td>
                    <td className="px-3 py-2 text-right text-gray-700">{t.annuel}</td>
                  </tr>
                ))}
                <tr className="bg-[#F8FBF8] font-semibold text-[#1B5E20]">
                  <td className="px-3 py-2">TOTAL TCO 2025</td>
                  <td className="px-3 py-2 text-right">2 210 000 XOF</td>
                  <td className="px-3 py-2 text-right">3 442 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-sm text-gray-600 bg-[#F8FBF8] rounded-xl px-4 py-3">
            Coût par heure moteur 2025 : 2 210 000 XOF / 827h =&nbsp;
            <span className="font-bold text-[#1B5E20]">2 672 XOF/h</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-3 pb-6">
          <Link
            href="/materiels"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            ← Retour aux matériels
          </Link>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] px-4 py-2 text-xs font-medium text-white hover:bg-[#1B5E20] transition">
            Planifier maintenance
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
            Exporter historique
          </button>
        </div>

      </main>
    </div>
  );
}
