import Topbar from "../../../components/Topbar";

export default async function BailleurDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Rapports", "Bailleurs de fonds", `Projet ${id}`]} />

      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* En-tête bandeau bleu FAO/ONU */}
        <div className="rounded-2xl text-white p-6" style={{ backgroundColor: "#1565C0" }}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-xl font-bold">Modernisation Exploitation Familiale Durable — Filière Cacao CI</h1>
              <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                <span>Code AGRIFRIK : <span className="text-white font-medium">BAI-2025-001</span></span>
              </div>
              <div className="text-sm text-blue-100">
                Bailleur : <span className="text-white font-medium">FAO (Food and Agriculture Organization of the United Nations)</span>
              </div>
              <div className="text-sm text-blue-100">
                Partenaire CI : <span className="text-white font-medium">ANADER (Agence Nationale d&apos;Appui au Développement Rural)</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                ✅ Actif
              </span>
              <span className="text-xs text-blue-100">Durée : 24 mois (01/01/2025 → 31/12/2026)</span>
            </div>
          </div>
        </div>

        {/* 5 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Budget total projet", value: "48 000 000 XOF", sub: "73 242 USD" },
            { label: "Décaissé", value: "18 400 000 XOF", sub: "38,3%", subColor: "text-blue-600" },
            { label: "Dépensé", value: "14 284 000 XOF", sub: "29,8%", subColor: "text-green-600" },
            { label: "ODD ciblés", value: "5 ODD", sub: "ODD 1, 2, 8, 12, 13" },
            { label: "Rapport dû", value: "31/07/2025", sub: "dans 20 jours", subColor: "text-orange-500" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
              <p className="text-base font-bold text-gray-900 leading-tight">{kpi.value}</p>
              {kpi.sub && (
                <p className={`text-xs mt-0.5 ${kpi.subColor || "text-gray-400"}`}>{kpi.sub}</p>
              )}
            </div>
          ))}
        </div>

        {/* Objectifs et indicateurs */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Objectifs et indicateurs</h2>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-900">
            <span className="font-semibold">Objectif général :</span> Améliorer la productivité et la durabilité de <strong>150 exploitations familiales cacaoyères</strong> de la région de la Nawa (CI) sur 24 mois.
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100" style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left py-2 px-3 font-medium">Indicateur</th>
                  <th className="text-right py-2 px-3 font-medium">Baseline</th>
                  <th className="text-right py-2 px-3 font-medium">Cible 24 mois</th>
                  <th className="text-right py-2 px-3 font-medium">Réalisé (J+6 mois)</th>
                  <th className="text-left py-2 px-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    ind: "Rendement moyen exploitations",
                    baseline: "0,92 t/ha",
                    cible: "1,20 t/ha (+30%)",
                    realise: "1,05 t/ha (+14%)",
                    statut: "En bonne voie",
                    color: "bg-blue-100 text-blue-700",
                  },
                  {
                    ind: "Exploitations certifiées RA",
                    baseline: "42/150 (28%)",
                    cible: "120/150 (80%)",
                    realise: "58/150 (39%)",
                    statut: "En bonne voie",
                    color: "bg-blue-100 text-blue-700",
                  },
                  {
                    ind: "Femmes cheffes d'exploitation formées",
                    baseline: "12/150 (8%)",
                    cible: "45/150 (30%)",
                    realise: "18/150 (12%)",
                    statut: "À accélérer",
                    color: "bg-yellow-100 text-yellow-700",
                  },
                  {
                    ind: "Accès micro-crédit intrant",
                    baseline: "65/150 (43%)",
                    cible: "140/150 (93%)",
                    realise: "89/150 (59%)",
                    statut: "Avance",
                    color: "bg-green-100 text-green-700",
                  },
                  {
                    ind: "Score bien-être ouvriers agricoles",
                    baseline: "2,8/5",
                    cible: "4,0/5 (+43%)",
                    realise: "3,2/5 (+14%)",
                    statut: "En bonne voie",
                    color: "bg-blue-100 text-blue-700",
                  },
                ].map((row) => (
                  <tr key={row.ind} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 text-gray-700">{row.ind}</td>
                    <td className="py-2.5 px-3 text-right text-gray-500">{row.baseline}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-gray-900">{row.cible}</td>
                    <td className="py-2.5 px-3 text-right font-medium text-gray-900">{row.realise}</td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${row.color}`}>
                        {row.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget par composante */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Budget par composante</h2>
          <p className="text-xs text-gray-500">Répartition budget FAO/ANADER</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100" style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left py-2 px-3 font-medium">Composante</th>
                  <th className="text-right py-2 px-3 font-medium">Budget (XOF)</th>
                  <th className="text-right py-2 px-3 font-medium">Décaissé</th>
                  <th className="text-right py-2 px-3 font-medium">Dépensé</th>
                  <th className="text-right py-2 px-3 font-medium">% Dépensé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { comp: "C1 — Formation BPA (150 exploitants × 2 sessions)", budget: "12 000 000", decaisse: "6 000 000", depense: "4 284 000", pct: "35,7%" },
                  { comp: "C2 — Matériel agricole (kits intrants 150 exploitations)", budget: "18 000 000", decaisse: "6 000 000", depense: "5 400 000", pct: "30,0%" },
                  { comp: "C3 — Appui certification RA (consultants BV, frais audit)", budget: "8 400 000", decaisse: "3 600 000", depense: "2 800 000", pct: "33,3%" },
                  { comp: "C4 — Micro-crédit intrants (fonds rotatif)", budget: "6 000 000", decaisse: "2 400 000", depense: "1 800 000", pct: "30,0%" },
                  { comp: "C5 — Coordination & Monitoring (ANADER)", budget: "3 600 000", decaisse: "400 000", depense: "—", pct: "0% (semestriel)" },
                ].map((row) => (
                  <tr key={row.comp} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 text-gray-700">{row.comp}</td>
                    <td className="py-2.5 px-3 text-right text-gray-900">{row.budget}</td>
                    <td className="py-2.5 px-3 text-right text-blue-700 font-medium">{row.decaisse}</td>
                    <td className="py-2.5 px-3 text-right text-green-700 font-medium">{row.depense}</td>
                    <td className="py-2.5 px-3 text-right text-gray-600">{row.pct}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold border-t-2 border-gray-200">
                  <td className="py-2.5 px-3 text-gray-900">TOTAL</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">48 000 000</td>
                  <td className="py-2.5 px-3 text-right text-blue-700">18 400 000</td>
                  <td className="py-2.5 px-3 text-right text-green-700">14 284 000</td>
                  <td className="py-2.5 px-3 text-right text-gray-900">29,8%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SVG Grouped Bar Chart */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Budget vs Décaissements vs Dépenses (en millions XOF)</p>
            <div className="overflow-x-auto">
              <svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-2xl">
                {/* Grid lines */}
                {[0, 5, 10, 15, 18].map((v) => {
                  const y = 200 - (v / 18) * 160;
                  return (
                    <g key={v}>
                      <line x1="60" y1={y} x2="700" y2={y} stroke="#E5E7EB" strokeWidth="1" />
                      <text x="52" y={y + 4} textAnchor="end" fontSize="9" fill="#9CA3AF">{v}M</text>
                    </g>
                  );
                })}

                {/* Bars — 5 groups, 3 bars each */}
                {[
                  { label: "C1", budget: 12, decaisse: 6, depense: 4.284 },
                  { label: "C2", budget: 18, decaisse: 6, depense: 5.4 },
                  { label: "C3", budget: 8.4, decaisse: 3.6, depense: 2.8 },
                  { label: "C4", budget: 6, decaisse: 2.4, depense: 1.8 },
                  { label: "C5", budget: 3.6, decaisse: 0.4, depense: 0 },
                ].map((d, i) => {
                  const groupX = 70 + i * 128;
                  const maxVal = 18;
                  const scale = 160 / maxVal;
                  const barW = 24;
                  const bH = d.budget * scale;
                  const dH = d.decaisse * scale;
                  const depH = d.depense * scale;
                  return (
                    <g key={d.label}>
                      {/* Budget (gris) */}
                      <rect x={groupX} y={200 - bH} width={barW} height={bH} fill="#D1D5DB" rx="2" />
                      {/* Décaissé (bleu) */}
                      <rect x={groupX + barW + 2} y={200 - dH} width={barW} height={dH} fill="#1565C0" rx="2" />
                      {/* Dépensé (vert) */}
                      <rect x={groupX + barW * 2 + 4} y={200 - depH} width={barW} height={depH > 0 ? depH : 0} fill="#2E7D32" rx="2" />
                      {/* Label */}
                      <text x={groupX + barW + 2} y={218} textAnchor="middle" fontSize="10" fill="#6B7280">{d.label}</text>
                    </g>
                  );
                })}

                {/* Légende */}
                <rect x="70" y="228" width="12" height="8" fill="#D1D5DB" rx="2" />
                <text x="86" y="236" fontSize="9" fill="#6B7280">Budget</text>
                <rect x="140" y="228" width="12" height="8" fill="#1565C0" rx="2" />
                <text x="156" y="236" fontSize="9" fill="#6B7280">Décaissé</text>
                <rect x="220" y="228" width="12" height="8" fill="#2E7D32" rx="2" />
                <text x="236" y="236" fontSize="9" fill="#6B7280">Dépensé</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Alignement ODD */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Alignement ODD</h2>
          <p className="text-xs text-gray-500">Contribution aux Objectifs de Développement Durable</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100" style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left py-2 px-3 font-medium">ODD</th>
                  <th className="text-left py-2 px-3 font-medium">Intitulé</th>
                  <th className="text-right py-2 px-3 font-medium">Score actuel</th>
                  <th className="text-right py-2 px-3 font-medium">Score cible</th>
                  <th className="text-left py-2 px-3 font-medium">Indicateurs clés</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { odd: "ODD 1", title: "Pas de pauvreté", current: 62, target: 80, ind: "+14% revenus exploitants (vs baseline)" },
                  { odd: "ODD 2", title: "Faim zéro", current: 71, target: 85, ind: "+14% rendement, 0 insécurité alimentaire auto-déclarée" },
                  { odd: "ODD 8", title: "Travail décent", current: 54, target: 75, ind: "18/45 femmes formées (retard)" },
                  { odd: "ODD 12", title: "Conso. responsable", current: 68, target: 85, ind: "39% exploitations certifiées RA (cible 80%)" },
                  { odd: "ODD 13", title: "Action climatique", current: 74, target: 80, ind: "-646 tCO₂e/an grâce aux ombragiers (CNRA)" },
                ].map((row) => {
                  const pct = Math.round((row.current / row.target) * 100);
                  return (
                    <tr key={row.odd} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 font-semibold text-blue-800">{row.odd}</td>
                      <td className="py-2.5 px-3 text-gray-700">{row.title}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-medium text-gray-900">{row.current}/100</span>
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${row.current}%`, backgroundColor: "#2E7D32" }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-gray-500">{row.target}/100</td>
                      <td className="py-2.5 px-3 text-gray-600 text-xs">{row.ind}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rapports soumis */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Rapports soumis</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100" style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left py-2 px-3 font-medium">Rapport</th>
                  <th className="text-left py-2 px-3 font-medium">Période</th>
                  <th className="text-left py-2 px-3 font-medium">Soumis</th>
                  <th className="text-left py-2 px-3 font-medium">Feedback bailleur</th>
                  <th className="text-left py-2 px-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  {
                    rapport: "Rapport de démarrage",
                    periode: "Jan 2025",
                    soumis: "28/01/2025",
                    feedback: "Approuvé (18/02/2025)",
                    statut: "✅",
                    statusBg: "bg-green-100 text-green-700",
                  },
                  {
                    rapport: "Rapport trimestriel Q1",
                    periode: "Jan-Mar 2025",
                    soumis: "15/04/2025",
                    feedback: "Approuvé avec commentaires mineurs",
                    statut: "✅",
                    statusBg: "bg-green-100 text-green-700",
                  },
                  {
                    rapport: "Rapport trimestriel Q2",
                    periode: "Avr-Jun 2025",
                    soumis: "15/07/2025",
                    feedback: "En attente FAO (soumis hier)",
                    statut: "🔵 En attente",
                    statusBg: "bg-blue-100 text-blue-700",
                  },
                  {
                    rapport: "Rapport trimestriel Q3",
                    periode: "Jul-Sep 2025",
                    soumis: "Dû 15/10/2025",
                    feedback: "—",
                    statut: "⏳ À préparer",
                    statusBg: "bg-gray-100 text-gray-500",
                  },
                ].map((row) => (
                  <tr key={row.rapport} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-medium text-gray-900">{row.rapport}</td>
                    <td className="py-2.5 px-3 text-gray-600">{row.periode}</td>
                    <td className="py-2.5 px-3 text-gray-600">{row.soumis}</td>
                    <td className="py-2.5 px-3 text-gray-600">{row.feedback}</td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${row.statusBg}`}>
                        {row.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-800">
            <span className="font-semibold">Prochain rapport (Q2) :</span> Soumis le 15/07/2025 — En attente validation FAO (délai : 30 jours)
          </div>
        </div>

        {/* Contacts bailleur */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Contacts bailleur</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100" style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left py-2 px-3 font-medium">Rôle</th>
                  <th className="text-left py-2 px-3 font-medium">Nom</th>
                  <th className="text-left py-2 px-3 font-medium">Email</th>
                  <th className="text-left py-2 px-3 font-medium">Institution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { role: "Chargé de projet FAO", nom: "Carlos Mendez", email: "c.mendez@fao.org", institution: "FAO Rome + Bureau CI" },
                  { role: "Représentante FAO CI", nom: "Dr. Nathalie Kouassi", email: "n.kouassi@fao-ci.org", institution: "FAO Abidjan" },
                  { role: "Coordinateur ANADER", nom: "Yao N'Goran", email: "y.ngoran@anader.ci", institution: "ANADER Soubré" },
                  { role: "Point focal AGRIFRIK", nom: "Adjoua Messou", email: "adjoua.m@agrifrik.com", institution: "AGRIFRIK SAS" },
                ].map((row) => (
                  <tr key={row.email} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 text-gray-700">{row.role}</td>
                    <td className="py-2.5 px-3 font-medium text-gray-900">{row.nom}</td>
                    <td className="py-2.5 px-3 text-blue-600 text-xs">{row.email}</td>
                    <td className="py-2.5 px-3 text-gray-500">{row.institution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/bailleur"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Retour aux bailleurs
            </a>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Préparer le rapport Q3
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-blue-200 text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contacter FAO
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
