import Link from "next/link";
import Topbar from "../../../components/Topbar";

/* ─── Radar SVG Compétences ─────────────────────────────────────────────── */

function RadarChart() {
  const axes = [
    { label: "Agronomie cacao", value: 95 },
    { label: "Leadership", value: 82 },
    { label: "Traçabilité\nnumérique", value: 68 },
    { label: "Phytosanitaire", value: 88 },
    { label: "Gestion RH", value: 75 },
    { label: "Reporting", value: 62 },
  ];

  const cx = 120;
  const cy = 120;
  const r = 85;
  const n = axes.length;

  function polar(angle: number, radius: number) {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + radius * Math.sin(rad), y: cy - radius * Math.cos(rad) };
  }

  const rings = [20, 40, 60, 80, 100];
  const angleStep = 360 / n;

  const points = axes.map((a, i) => polar(i * angleStep, (a.value / 100) * r));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[240px]" aria-label="Radar compétences Ibrahim Sawadogo">
      {/* Grid rings */}
      {rings.map((ring) =>
        axes.map((_, i) => {
          const p1 = polar(i * angleStep, (ring / 100) * r);
          const p2 = polar(((i + 1) % n) * angleStep, (ring / 100) * r);
          return <line key={`${ring}-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#E5E7EB" strokeWidth="0.8" />;
        })
      )}

      {/* Spokes */}
      {axes.map((_, i) => {
        const outer = polar(i * angleStep, r);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="#E5E7EB" strokeWidth="0.8" />;
      })}

      {/* Data polygon */}
      <polygon points={polyline} fill="#2E7D32" fillOpacity="0.18" stroke="#2E7D32" strokeWidth="1.5" />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#2E7D32" />
      ))}

      {/* Labels */}
      {axes.map((a, i) => {
        const lPos = polar(i * angleStep, r + 18);
        const lines = a.label.split("\n");
        return (
          <text key={i} x={lPos.x} y={lPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fill="#374151" fontWeight="500">
            {lines.map((line, li) => (
              <tspan key={li} x={lPos.x} dy={li === 0 ? 0 : 10}>{line}</tspan>
            ))}
          </text>
        );
      })}

      {/* Values */}
      {axes.map((a, i) => {
        const vPos = polar(i * angleStep, (a.value / 100) * r - 10);
        return (
          <text key={i} x={vPos.x} y={vPos.y} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="#1B5E20" fontWeight="700">
            {a.value}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default async function EmployeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Fiche Employé" breadcrumb={["RH", "Employés", `Fiche ${id}`]} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">

        {/* ── EN-TÊTE BANDEAU VERT ───────────────────────────────────────── */}
        <div className="rounded-2xl text-white p-6 sm:p-8" style={{ backgroundColor: "#1B5E20" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
              style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
              IS
            </div>

            {/* Info principale */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold">Ibrahim Sawadogo</h1>
                <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: "#4CAF50", color: "#fff" }}>
                  ✅ Actif
                </span>
              </div>
              <p className="text-base opacity-90 font-medium">Responsable Terrain</p>
              <div className="flex flex-wrap gap-4 text-sm opacity-80">
                <span>📅 Ancienneté : 6 ans (depuis Mars 2019)</span>
                <span>🏭 Département : Production</span>
                <span>📍 Site : Soubré Nord</span>
              </div>
            </div>

            {/* ID badge */}
            <div className="text-right opacity-70 text-sm">
              <p className="font-mono font-bold text-lg">EMP-005</p>
              <p className="text-xs">Matricule</p>
            </div>
          </div>
        </div>

        {/* ── 5 KPI CARDS ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {[
            { label: "Salaire net", value: "238 614 XOF", sub: "par mois", color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Congés restants", value: "21 jours", sub: "solde 2025", color: "#1565C0", bg: "#E3F2FD" },
            { label: "Score éval. 2024", value: "4,4 / 5 ⭐", sub: "très bien", color: "#E65100", bg: "#FFF3E0" },
            { label: "Formations 2025", value: "2 / 3", sub: "complétées", color: "#6A1B9A", bg: "#F3E5F5" },
            { label: "Parcelles superv.", value: "8 (42 ha)", sub: "Soubré Nord", color: "#00695C", bg: "#E0F2F1" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-500">{k.label}</p>
              <p className="text-lg font-bold mt-1" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* ── GRILLE PRINCIPALE ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Informations personnelles */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              👤 Informations personnelles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Matricule", "EMP-005"],
                ["Date de naissance", "12/03/1982 (43 ans)"],
                ["Nationalité", "Burkinabè"],
                ["N° CNI", "B00123456"],
                ["Téléphone", "+225 07 XX XX XX"],
                ["Email pro", "ibrahim.s@agrifrik.com"],
                ["Adresse", "Village Soubré Nord (logement fourni)"],
                ["Situation familiale", "Marié, 3 enfants"],
                ["Contact urgence", "Mariam Sawadogo (+225 07 XX XX XX)"],
                ["N° CNPS", "CI-CNPS-2019-00892341"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-medium text-gray-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Informations contractuelles */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              📋 Informations contractuelles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Type de contrat", "CDI (depuis 01/03/2019)"],
                ["Date d'embauche", "01/03/2019"],
                ["Période d'essai", "Validée (4 mois)"],
                ["Convention collective", "Agriculture — Côte d'Ivoire"],
                ["Catégorie prof.", "Cadre moyen — Coef. 400"],
                ["Temps de travail", "48h/semaine (agriculture)"],
                ["Clause non-concurrence", "Non"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-medium text-gray-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RÉMUNÉRATION ───────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            💰 Rémunération (SYSCOHADA — Côte d'Ivoire)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Élément</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">Montant (XOF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { label: "Salaire brut de base", value: "320 000", positive: true },
                  { label: "Prime de responsabilité (15%)", value: "48 000", positive: true },
                  { label: "Prime d'ancienneté (6 ans × 2%)", value: "38 400", positive: true },
                  { label: "Indemnité logement (logement fourni sur site)", value: "0", positive: true },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-700">{row.label}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-800">{row.value}</td>
                  </tr>
                ))}
                <tr className="bg-green-50">
                  <td className="px-4 py-3 font-bold text-green-800">Salaire brut total</td>
                  <td className="px-4 py-3 text-right font-bold text-green-800">406 400</td>
                </tr>
                {[
                  { label: "Cotisations CNPS employé (6,3%)", value: "− 25 603" },
                  { label: "Impôt sur Traitement et Salaire — ITS (barème CI)", value: "− 42 183" },
                  { label: "Assurance maladie MUGEFCI", value: "− 8 000" },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-red-600">{row.label}</td>
                    <td className="px-4 py-3 text-right font-medium text-red-600">{row.value}</td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: "#1B5E20" }}>
                  <td className="px-4 py-3 font-bold text-white">Salaire net</td>
                  <td className="px-4 py-3 text-right font-bold text-white text-base">238 614</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ÉVALUATIONS ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Tableau évaluations */}
          <div className="xl:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              ⭐ Historique des évaluations
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["Année", "Évaluateur", "Score", "Points forts", "Axes d'amélioration"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { annee: "2024", eval: "Koffi Amani (DG)", score: "4,4/5", forts: "Leadership terrain, Gestion mildiou", axes: "Reporting digital" },
                    { annee: "2023", eval: "Koffi Amani", score: "4,2/5", forts: "Rendements +8%, Formation équipe", axes: "Gestion des conflits" },
                    { annee: "2022", eval: "Koffi Amani", score: "3,9/5", forts: "Présence terrain, Résolution pbs", axes: "Planification à long terme" },
                  ].map((e) => (
                    <tr key={e.annee} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-bold text-gray-800">{e.annee}</td>
                      <td className="px-4 py-3 text-gray-600">{e.eval}</td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-green-700 text-sm">{e.score}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{e.forts}</td>
                      <td className="px-4 py-3 text-xs text-amber-600">{e.axes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Radar */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col items-center">
            <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100 w-full">
              🎯 Compétences
            </h2>
            <RadarChart />
            <p className="text-xs text-gray-400 mt-2 text-center">Ibrahim Sawadogo — 2024</p>
          </div>
        </div>

        {/* ── FORMATIONS ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            🎓 Formations
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F8FBF8" }}>
                  {["Formation", "Date", "Durée", "Organisme", "Résultat", "Certif."].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { titre: "Bonnes pratiques agricoles RA", date: "12/07/2025", duree: "16h", org: "ANADER", resultat: "En cours 🔵", certif: "RA BPA 2025" },
                  { titre: "Sécurité chimique & EPI", date: "05/07/2025", duree: "8h", org: "ANADER", resultat: "Réussi ✅", certif: "Oui" },
                  { titre: "Pilotage drone DJI Agras", date: "18/07/2025", duree: "8h", org: "DJI CI", resultat: "Planifiée 📅", certif: "En attente" },
                  { titre: "Gestion coopérative", date: "2024", duree: "16h", org: "MICROCOOP", resultat: "Réussi ✅", certif: "Oui" },
                  { titre: "Premiers secours SST", date: "2023", duree: "8h", org: "Croix-Rouge CI", resultat: "Réussi ✅", certif: "ATPS" },
                ].map((f) => (
                  <tr key={f.titre} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{f.titre}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{f.date}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{f.duree}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{f.org}</td>
                    <td className="px-4 py-3 text-xs">{f.resultat}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{f.certif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ABSENCES 2025 ──────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            📅 Historique des absences 2025
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F8FBF8" }}>
                  {["Période", "Type", "Durée", "Motif", "Statut"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { periode: "15-19/04/2025", type: "Congé annuel", duree: "5 jours", motif: "Vacances familiales", statut: "✅ Approuvé", statColor: "#2E7D32", statBg: "#E8F5E9" },
                  { periode: "28/03/2025", type: "Absence maladie", duree: "1 jour", motif: "Paludisme", statut: "✅ Justifié (AMM)", statColor: "#2E7D32", statBg: "#E8F5E9" },
                  { periode: "Oct 2025 (prévu)", type: "Congé annuel", duree: "10 jours", motif: "📅 Demandé", statut: "En attente DG", statColor: "#D97706", statBg: "#FFFBEB" },
                ].map((a) => (
                  <tr key={a.periode} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{a.periode}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{a.type}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{a.duree}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{a.motif}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ color: a.statColor, backgroundColor: a.statBg }}>
                        {a.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── ACTIONS ────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3">
          <Link href="/rh"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition shadow-sm">
            ← Retour à la liste RH
          </Link>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition shadow-sm"
            style={{ backgroundColor: "#2E7D32" }}>
            📄 Générer la fiche de paie
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition shadow-sm"
            style={{ backgroundColor: "#1565C0" }}>
            ⭐ Évaluation annuelle
          </button>
        </div>

      </div>
    </div>
  );
}
