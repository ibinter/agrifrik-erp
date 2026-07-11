import Topbar from "../../../components/Topbar";

export default async function BudgetLignePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ── Données statiques de la ligne BDG-2025-PRD-001 ──────────────────────────
  const ligne = {
    code: "BDG-2025-PRD-001",
    intitule: "Intrants phytosanitaires — Campagne 2025",
    centreCout: "Production (PRD)",
    responsable: "Ibrahim Sawadogo",
    statut: "En cours",
    exercice: "2025",
    categorie: "Charges d'exploitation",
    budgetInitial: 4_800_000,
    engage: 420_000,
    consomme: 3_124_000,
    disponible: 1_256_000,
    tauxAvancement: 73.8,
  };

  const sousCategories = [
    { nom: "Fongicides (cuivre + systémiques)", budget: 1_800_000, consomme: 1_284_000, engage: 420_000, disponible: 96_000, taux: 71.3 },
    { nom: "Insecticides (mirides)", budget: 1_200_000, consomme: 842_000, engage: 0, disponible: 358_000, taux: 70.2 },
    { nom: "Herbicides (désherbage mécanique prioritaire)", budget: 600_000, consomme: 284_000, engage: 0, disponible: 316_000, taux: 47.3 },
    { nom: "Fertilisants (KCl, NPK, urée)", budget: 1_200_000, consomme: 714_000, engage: 0, disponible: 486_000, taux: 59.5 },
  ];

  const depenses = [
    { date: "05/07", num: "ACH-2025-022", fournisseur: "SCPA Afrique", produit: "Super Cupravit 12 kg", montant: 100_800, cat: "Fongicides" },
    { date: "28/06", num: "ACH-2025-021", fournisseur: "SCPA Afrique", produit: "Ridomil Gold 8 × 100g", montant: 102_400, cat: "Fongicides" },
    { date: "01/07", num: "ACH-2025-020", fournisseur: "KCl Distribution", produit: "KCl 60% 6 sacs", montant: 480_000, cat: "Fertilisants" },
    { date: "28/05", num: "ACH-2025-016", fournisseur: "AgroChim CI", produit: "NPK 20-10-10 15 sacs", montant: 228_000, cat: "Fertilisants" },
    { date: "15/05", num: "ACH-2025-014", fournisseur: "SCPA Afrique", produit: "Ridomil Gold (lot)", montant: 384_000, cat: "Fongicides" },
    { date: "02/05", num: "ACH-2025-013", fournisseur: "SCPA Afrique", produit: "Super Cupravit 24 kg", montant: 201_600, cat: "Fongicides" },
    { date: "18/04", num: "ACH-2025-011", fournisseur: "SCPA Afrique", produit: "Confidor 350 SC", montant: 186_000, cat: "Insecticides" },
    { date: "05/04", num: "ACH-2025-010", fournisseur: "AgroChim CI", produit: "Urée 46% 10 sacs", montant: 148_000, cat: "Fertilisants" },
    { date: "22/03", num: "ACH-2025-008", fournisseur: "AgroChim CI", produit: "NPK 20-10-10 20 sacs", montant: 304_000, cat: "Fertilisants" },
    { date: "10/03", num: "ACH-2025-007", fournisseur: "SCPA Afrique", produit: "Ridomil Gold 12 × 100g", montant: 153_600, cat: "Fongicides" },
  ];

  const revisions = [
    { version: "V1 (initial)", date: "15/12/2024", budget: 4_200_000, motif: "Budget initial 2025", valide: "CF + DG" },
    { version: "V2 (révision)", date: "15/03/2025", budget: 4_800_000, motif: "+600k — Hausse prix phyto (+12%) + extension parcelle PAR-B4", valide: "CF + DG ✅" },
  ];

  // ── Dimensions SVG stacked bar ───────────────────────────────────────────────
  const svgW = 640;
  const barH = 40;
  const totalBudget = ligne.budgetInitial;
  const wCons = (ligne.consomme / totalBudget) * svgW;
  const wEng = (ligne.engage / totalBudget) * svgW;
  const wDispo = (ligne.disponible / totalBudget) * svgW;

  // ── Données line chart consommation mensuelle ────────────────────────────────
  const mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul"];
  const mensuel = [284_000, 0, 428_000, 842_000, 962_000, 324_000, 284_000];
  const cumul: number[] = [];
  mensuel.reduce((acc, v, i) => { cumul[i] = acc + v; return acc + v; }, 0);
  const budgetMensuelLineaire = ligne.budgetInitial / 12;
  const prevuCumul = mois.map((_, i) => budgetMensuelLineaire * (i + 1));
  const lcW = 640;
  const lcH = 200;
  const lcPad = { t: 20, r: 20, b: 40, l: 80 };
  const lcInnerW = lcW - lcPad.l - lcPad.r;
  const lcInnerH = lcH - lcPad.t - lcPad.b;
  const maxVal = Math.max(...cumul, ...prevuCumul);
  const xStep = lcInnerW / (mois.length - 1);
  const yScale = (v: number) => lcInnerH - (v / maxVal) * lcInnerH;
  const pointsCumul = cumul.map((v, i) => `${lcPad.l + i * xStep},${lcPad.t + yScale(v)}`).join(" ");
  const pointsPrevu = prevuCumul.map((v, i) => `${lcPad.l + i * xStep},${lcPad.t + yScale(v)}`).join(" ");

  const fmt = (n: number) => n.toLocaleString("fr-FR") + " XOF";

  return (
    <div className="min-h-screen bg-[#F4F6F4]">
      <Topbar
        title={`Ligne ${id}`}
        breadcrumb={["Finance", "Budget", `Ligne ${id}`]}
      />

      <div className="p-6 space-y-6 max-w-5xl mx-auto">

        {/* ── En-tête bandeau vert ─────────────────────────────────────────── */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-green-300 text-xs font-medium uppercase tracking-wider mb-1">Ligne budgétaire</p>
              <h1 className="text-2xl font-bold">{ligne.code}</h1>
              <p className="mt-1 text-green-100 text-sm">{ligne.intitule}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-green-200">
                <span>Centre de coût : <span className="text-white font-medium">{ligne.centreCout}</span></span>
                <span>Responsable : <span className="text-white font-medium">{ligne.responsable}</span></span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-600 border border-green-400 px-3 py-1 text-xs font-semibold">
                ✅ {ligne.statut}
              </span>
              <span className="text-xs text-green-300">Exercice : {ligne.exercice}</span>
              <span className="text-xs text-green-300">Catégorie : {ligne.categorie}</span>
            </div>
          </div>
        </div>

        {/* ── KPI ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Budget initial", value: fmt(ligne.budgetInitial), sub: null, color: "text-gray-900" },
            { label: "Engagé", value: fmt(ligne.engage), sub: "Commandes en cours", color: "text-orange-600" },
            { label: "Consommé", value: fmt(ligne.consomme), sub: "Réalisé", color: "text-[#1B5E20]" },
            { label: "Disponible", value: fmt(ligne.disponible), sub: "26,2% du budget", color: "text-blue-700" },
            { label: "Taux d'avancement", value: `${ligne.tauxAvancement}%`, sub: "Jul 2025 — 54,2% de l'année ✅", color: "text-[#2E7D32]" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className={`text-lg font-bold ${k.color}`}>{k.value}</p>
              {k.sub && <p className="text-xs text-gray-400 mt-1">{k.sub}</p>}
            </div>
          ))}
        </div>

        {/* ── Répartition du budget SVG stacked bar ───────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Utilisation du budget {ligne.code}</h2>
          <div className="overflow-x-auto">
            <svg width={svgW} height={80} viewBox={`0 0 ${svgW} 80`} className="max-w-full">
              {/* Consommé */}
              <rect x={0} y={10} width={wCons} height={barH} fill="#2E7D32" rx={4} />
              {/* Engagé */}
              <rect x={wCons} y={10} width={wEng} height={barH} fill="#E65100" />
              {/* Disponible */}
              <rect x={wCons + wEng} y={10} width={wDispo} height={barH} fill="#D1D5DB" rx={4} />
              {/* Labels internes */}
              {wCons > 60 && (
                <text x={wCons / 2} y={35} textAnchor="middle" fill="white" fontSize={11} fontWeight="600">65,1%</text>
              )}
              {wEng > 40 && (
                <text x={wCons + wEng / 2} y={35} textAnchor="middle" fill="white" fontSize={10}>8,7%</text>
              )}
              {wDispo > 40 && (
                <text x={wCons + wEng + wDispo / 2} y={35} textAnchor="middle" fill="#4B5563" fontSize={11}>26,2%</text>
              )}
            </svg>
          </div>
          {/* Légende */}
          <div className="flex flex-wrap gap-6 mt-2 text-xs text-gray-600">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block bg-[#2E7D32]" /> Consommé : {fmt(ligne.consomme)} (65,1%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block bg-[#E65100]" /> Engagé : {fmt(ligne.engage)} (8,7%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block bg-gray-300" /> Disponible : {fmt(ligne.disponible)} (26,2%)</span>
          </div>
        </div>

        {/* ── Tableau sous-catégories ──────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Ventilation par type de produit</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-600 text-left">
                  <th className="px-3 py-2 font-medium rounded-tl-lg">Sous-catégorie</th>
                  <th className="px-3 py-2 font-medium text-right">Budget</th>
                  <th className="px-3 py-2 font-medium text-right">Consommé</th>
                  <th className="px-3 py-2 font-medium text-right">Engagé</th>
                  <th className="px-3 py-2 font-medium text-right">Disponible</th>
                  <th className="px-3 py-2 font-medium text-right rounded-tr-lg">% Cons.</th>
                </tr>
              </thead>
              <tbody>
                {sousCategories.map((sc, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-700">{sc.nom}</td>
                    <td className="px-3 py-2 text-right text-gray-900">{sc.budget.toLocaleString("fr-FR")}</td>
                    <td className="px-3 py-2 text-right text-[#2E7D32] font-medium">{sc.consomme.toLocaleString("fr-FR")}</td>
                    <td className="px-3 py-2 text-right text-orange-600">{sc.engage > 0 ? sc.engage.toLocaleString("fr-FR") : "—"}</td>
                    <td className="px-3 py-2 text-right text-blue-700">{sc.disponible.toLocaleString("fr-FR")}</td>
                    <td className="px-3 py-2 text-right">
                      <span className={`font-semibold ${sc.taux > 70 ? "text-orange-600" : "text-[#2E7D32]"}`}>{sc.taux}%</span>
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-200 bg-[#F8FBF8] font-semibold">
                  <td className="px-3 py-2 text-gray-900">TOTAL</td>
                  <td className="px-3 py-2 text-right text-gray-900">4 800 000</td>
                  <td className="px-3 py-2 text-right text-[#2E7D32]">3 124 000</td>
                  <td className="px-3 py-2 text-right text-orange-600">420 000</td>
                  <td className="px-3 py-2 text-right text-blue-700">1 256 000</td>
                  <td className="px-3 py-2 text-right text-orange-600">73,8%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Line chart consommation mensuelle ────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Consommation mensuelle vs rythme prévu</h2>
          <div className="overflow-x-auto">
            <svg width={lcW} height={lcH} viewBox={`0 0 ${lcW} ${lcH}`} className="max-w-full">
              {/* Grille horizontale */}
              {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                const y = lcPad.t + lcInnerH * (1 - f);
                const val = Math.round(maxVal * f / 1000);
                return (
                  <g key={f}>
                    <line x1={lcPad.l} y1={y} x2={lcW - lcPad.r} y2={y} stroke="#E5E7EB" strokeWidth={1} />
                    <text x={lcPad.l - 6} y={y + 4} textAnchor="end" fill="#9CA3AF" fontSize={10}>{val}k</text>
                  </g>
                );
              })}
              {/* Axe X labels */}
              {mois.map((m, i) => (
                <text key={m} x={lcPad.l + i * xStep} y={lcH - 8} textAnchor="middle" fill="#6B7280" fontSize={10}>{m}</text>
              ))}
              {/* Ligne prévu (pointillée verte) */}
              <polyline
                points={pointsPrevu}
                fill="none"
                stroke="#4CAF50"
                strokeWidth={2}
                strokeDasharray="6 3"
              />
              {/* Ligne réelle cumulée (verte pleine) */}
              <polyline
                points={pointsCumul}
                fill="none"
                stroke="#1B5E20"
                strokeWidth={2.5}
              />
              {/* Points réels */}
              {cumul.map((v, i) => (
                <circle
                  key={i}
                  cx={lcPad.l + i * xStep}
                  cy={lcPad.t + yScale(v)}
                  r={4}
                  fill="#1B5E20"
                  stroke="white"
                  strokeWidth={1.5}
                />
              ))}
            </svg>
          </div>
          <div className="flex gap-6 mt-2 text-xs text-gray-600">
            <span className="flex items-center gap-2">
              <svg width={24} height={10}><line x1={0} y1={5} x2={24} y2={5} stroke="#1B5E20" strokeWidth={2.5} /></svg>
              Consommation cumulée réelle
            </span>
            <span className="flex items-center gap-2">
              <svg width={24} height={10}><line x1={0} y1={5} x2={24} y2={5} stroke="#4CAF50" strokeWidth={2} strokeDasharray="6 3" /></svg>
              Rythme prévu linéaire (400k/mois)
            </span>
          </div>
        </div>

        {/* ── Tableau dépenses ─────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Toutes les dépenses imputées</h2>
            <span className="text-xs text-gray-400">18 dépenses — 10 affichées</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-600 text-left">
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">N° Achat</th>
                  <th className="px-3 py-2 font-medium">Fournisseur</th>
                  <th className="px-3 py-2 font-medium">Produit</th>
                  <th className="px-3 py-2 font-medium text-right">Montant</th>
                  <th className="px-3 py-2 font-medium">Sous-catégorie</th>
                </tr>
              </thead>
              <tbody>
                {depenses.map((d, i) => (
                  <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-500">{d.date}</td>
                    <td className="px-3 py-2 font-mono text-[#2E7D32]">{d.num}</td>
                    <td className="px-3 py-2 text-gray-700">{d.fournisseur}</td>
                    <td className="px-3 py-2 text-gray-700">{d.produit}</td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900">{d.montant.toLocaleString("fr-FR")} XOF</td>
                    <td className="px-3 py-2">
                      <span className="inline-block rounded-full bg-green-50 text-[#2E7D32] px-2 py-0.5 text-xs">{d.cat}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-3 text-xs text-[#2E7D32] font-medium hover:underline">
            Voir les 8 dépenses suivantes →
          </button>
        </div>

        {/* ── Alertes et projections ───────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm text-green-800 font-semibold mb-1">✅ Budget sous contrôle</p>
            <p className="text-sm text-green-700">
              Au rythme actuel, la consommation annuelle est estimée à <strong>4 580 000 XOF</strong> (95,4% du budget).
              Il reste <strong>1 256 000 XOF</strong> disponibles pour août–décembre, soit suffisant pour les traitements
              phyto de la grande récolte (estimation : 820 000 XOF).
            </p>
          </div>
          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <p className="text-sm text-orange-800 font-semibold mb-1">⚠️ Point de vigilance — Grande récolte oct-déc</p>
            <p className="text-sm text-orange-700">
              Aucun dépassement prévu, mais la grande récolte (oct-déc) génère un pic de dépenses phyto estimé
              à <strong>600 000 XOF</strong>. Surveiller les commandes de fongicides dès septembre.
            </p>
          </div>
        </div>

        {/* ── Révisions budgétaires ────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Révisions budgétaires</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8] text-gray-600 text-left">
                  <th className="px-3 py-2 font-medium">Version</th>
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium text-right">Budget</th>
                  <th className="px-3 py-2 font-medium">Motif de révision</th>
                  <th className="px-3 py-2 font-medium">Validé par</th>
                </tr>
              </thead>
              <tbody>
                {revisions.map((r, i) => (
                  <tr key={i} className="border-t border-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{r.version}</td>
                    <td className="px-3 py-2 text-gray-500">{r.date}</td>
                    <td className="px-3 py-2 text-right font-semibold text-[#2E7D32]">{r.budget.toLocaleString("fr-FR")} XOF</td>
                    <td className="px-3 py-2 text-gray-700">{r.motif}</td>
                    <td className="px-3 py-2 text-gray-600">{r.valide}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/budget"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Retour au budget
          </a>
          <button className="inline-flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-2 text-xs font-medium text-orange-700 hover:bg-orange-100">
            Demander une révision
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white px-4 py-2 text-xs font-medium hover:bg-[#1B5E20]">
            Exporter les dépenses Excel
          </button>
        </div>

      </div>
    </div>
  );
}
