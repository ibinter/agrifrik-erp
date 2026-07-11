import Topbar from "../../../components/Topbar";

export default async function AuditDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <Topbar
        title={`Fiche Audit — ${id}`}
        breadcrumb={["Commerce", "Audit", `Audit ${id}`]}
      />

      <div className="p-6 space-y-6">

        {/* ── Bandeau en-tête bordeaux ─────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 text-white"
          style={{ background: "linear-gradient(135deg,#4A0072 0%,#6A1B9A 100%)" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-purple-200 uppercase tracking-widest">Référence audit</p>
              <h1 className="text-2xl font-bold">AUD-2025-001 — Audit de renouvellement Rainforest Alliance</h1>
              <p className="text-sm text-purple-100">
                Exploitation : <span className="font-semibold text-white">EXP-001</span> — Koffi Amani — Soubré, Nawa, CI
              </p>
              <p className="text-sm text-purple-100">
                Auditeur : <span className="font-semibold text-white">Bureau Veritas CI</span> — Pierre N&apos;Guetta (N° cert. BV-CI-0234)
              </p>
              <p className="text-sm text-purple-100">
                Dates : <span className="font-semibold text-white">18-19 février 2025</span> (2 jours sur site)
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-sm font-semibold">
                ✅ Certifié — Score 94/100
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-sm font-semibold">
                Prochain audit : août 2025
              </span>
            </div>
          </div>
        </div>

        {/* ── 5 KPI ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Score global",                value: "94/100 ✅",              color: "#6A1B9A", bg: "#F3E5F5" },
            { label: "Non-conformités critiques",   value: "0",                      color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Non-conformités majeures",    value: "0",                      color: "#2E7D32", bg: "#E8F5E9" },
            { label: "Non-conformités mineures",    value: "3 (toutes closes)",      color: "#E65100", bg: "#FFF3E0" },
            { label: "Statut certification",        value: "✅ Maintenue (RA-CI-2025-EFA001)", color: "#00695C", bg: "#E0F2F1" },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 dark:bg-gray-900 dark:border-gray-800 flex flex-col gap-1"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: k.bg }}
              >
                <span style={{ color: k.color, fontSize: 14 }}>●</span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{k.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
            </div>
          ))}
        </div>

        {/* ── Résultats par chapitre — Radar SVG + tableau ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Radar SVG */}
          <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5 flex flex-col items-center">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm mb-4 self-start">
              Radar performance RA 2020 — 5 chapitres
            </h2>
            <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ maxWidth: 260 }}>
              {/* Pentagon grid */}
              {[25, 50, 75, 100].map((pct) => {
                const r = (pct / 100) * 110;
                const angles = [270, 342, 54, 126, 198].map((a) => (a * Math.PI) / 180);
                const pts = angles.map((a) => [150 + r * Math.cos(a), 150 + r * Math.sin(a)]);
                return (
                  <polygon
                    key={pct}
                    points={pts.map((p) => p.join(",")).join(" ")}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axis lines */}
              {[270, 342, 54, 126, 198].map((deg) => {
                const a = (deg * Math.PI) / 180;
                return (
                  <line
                    key={deg}
                    x1={150} y1={150}
                    x2={150 + 110 * Math.cos(a)}
                    y2={150 + 110 * Math.sin(a)}
                    stroke="#D1D5DB"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data polygon: S1=96, S2=91, S3=88, S4=93, S5=97 */}
              {(() => {
                const scores = [96, 91, 88, 93, 97];
                const degs = [270, 342, 54, 126, 198];
                const pts = scores.map((s, i) => {
                  const a = (degs[i] * Math.PI) / 180;
                  const r = (s / 100) * 110;
                  return [150 + r * Math.cos(a), 150 + r * Math.sin(a)];
                });
                return (
                  <>
                    <polygon
                      points={pts.map((p) => p.join(",")).join(" ")}
                      fill="#4CAF50"
                      fillOpacity="0.25"
                      stroke="#2E7D32"
                      strokeWidth="2"
                    />
                    {pts.map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r={5} fill="#2E7D32" />
                    ))}
                  </>
                );
              })()}

              {/* Labels */}
              {[
                { deg: 270, label: "S1 — Gestion", score: "96/100", dx: 0,   dy: -14 },
                { deg: 342, label: "S2 — Environ.", score: "91/100", dx: 14,  dy: 0 },
                { deg: 54,  label: "S3 — Communauté", score: "88/100", dx: 14,  dy: 8 },
                { deg: 126, label: "S4 — Ouvriers", score: "93/100", dx: -14, dy: 8 },
                { deg: 198, label: "S5 — Pratiques", score: "97/100", dx: -14, dy: 0 },
              ].map(({ deg, label, score, dx, dy }) => {
                const a = (deg * Math.PI) / 180;
                const r = 128;
                const x = 150 + r * Math.cos(a) + dx;
                const y = 150 + r * Math.sin(a) + dy;
                const anchor = dx > 0 ? "start" : dx < 0 ? "end" : "middle";
                return (
                  <g key={deg}>
                    <text x={x} y={y} textAnchor={anchor} fontSize="9.5" fill="#374151" fontWeight="700">{label}</text>
                    <text x={x} y={y + 11} textAnchor={anchor} fontSize="9" fill="#6A1B9A">{score}</text>
                  </g>
                );
              })}

              {/* Centre score */}
              <circle cx={150} cy={150} r={22} fill="white" stroke="#E5E7EB" strokeWidth="1" />
              <text x={150} y={147} textAnchor="middle" fontSize="11" fill="#6A1B9A" fontWeight="800">94/100</text>
              <text x={150} y={159} textAnchor="middle" fontSize="8" fill="#9CA3AF">Score global</text>
            </svg>
          </div>

          {/* Résumé chapitres */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="font-bold text-gray-900 dark:text-white text-sm">Scores par chapitre RA 2020</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { code: "S1", label: "Système de gestion", score: 96, color: "#6A1B9A" },
                { code: "S2", label: "Environnement",       score: 91, color: "#1565C0" },
                { code: "S3", label: "Bien-être communauté", score: 88, color: "#00695C" },
                { code: "S4", label: "Bien-être ouvriers",  score: 93, color: "#E65100" },
                { code: "S5", label: "Pratiques agricoles", score: 97, color: "#2E7D32" },
              ].map((c) => (
                <div key={c.code}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      <span className="font-mono text-gray-400 mr-1">{c.code}</span>{c.label}
                    </span>
                    <span className="font-bold" style={{ color: c.color }}>{c.score}/100</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-2 rounded-full" style={{ width: `${c.score}%`, backgroundColor: c.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tableau détaillé par chapitre ────────────────────────────────── */}
        {[
          {
            code: "S1",
            titre: "Système de gestion (96/100)",
            rows: [
              { critere: "1.1 Politique durabilité documentée", score: "100%", obs: "Politique révisée jan 2025 ✅" },
              { critere: "1.2 Plan de gestion annuel",           score: "95%",  obs: "Plan 2025 validé avec ANADER ✅" },
              { critere: "1.3 Registres et documentation",       score: "100%", obs: "AGRIFRIK ERP — traçabilité complète ✅" },
              { critere: "1.4 Formation du personnel",           score: "88%",  obs: "NC mineure : 1 ouvrier saisonnier non formé → Corrigé" },
            ],
          },
          {
            code: "S2",
            titre: "Environnement (91/100)",
            rows: [
              { critere: "2.1 Conservation zones protégées",        score: "100%", obs: "Zones tampon 50m rivière respectées ✅" },
              { critere: "2.2 Ombragiers et biodiversité",          score: "95%",  obs: "180 arbres d'ombrage CNRA ✅" },
              { critere: "2.3 Gestion des déchets agrochimiques",   score: "85%",  obs: "NC mineure : 3 bidons vides mal stockés → Corrigé" },
              { critere: "2.4 Aucune déforestation depuis 2014",    score: "100%", obs: "Vérifiée satellite Global Forest Watch ✅" },
            ],
          },
          {
            code: "S5",
            titre: "Pratiques agricoles (97/100)",
            rows: [
              { critere: "5.1 Intrants homologués RA uniquement",   score: "100%", obs: "Liste positive AGRIFRIK ✅" },
              { critere: "5.2 DAR respectés (délais avant récolte)", score: "100%", obs: "Enregistrements AGRIFRIK vérifiés ✅" },
              { critere: "5.3 Équipements de protection",           score: "92%",  obs: "NC mineure : 1 paire de gants manquante → Corrigé" },
              { critere: "5.4 Rendement et productivité",           score: "100%", obs: "0,96 t/ha PAR-A1 — au-delà objectif ✅" },
            ],
          },
        ].map((chap) => (
          <div key={chap.code} className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-purple-50 dark:bg-purple-900/10">
              <h3 className="font-bold text-sm text-purple-900 dark:text-purple-300">
                Chapitre {chap.code} — {chap.titre}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                    <th className="px-4 py-3 font-medium">Critère</th>
                    <th className="px-4 py-3 font-medium whitespace-nowrap">Score</th>
                    <th className="px-4 py-3 font-medium">Observation</th>
                  </tr>
                </thead>
                <tbody>
                  {chap.rows.map((r, i) => (
                    <tr key={i} className="border-t border-gray-50 dark:border-gray-800">
                      <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{r.critere}</td>
                      <td className="px-4 py-3 text-xs font-bold text-[#6A1B9A] dark:text-purple-400 whitespace-nowrap">{r.score}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.obs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* ── Non-conformités ──────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Non-conformités détectées</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                  {["Code NC", "Chapitre", "Description", "Gravité", "Délai correction", "Statut"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    code: "NC-001", chap: "S1.4",
                    desc: "Ouvrier saisonnier Coulibaly non formé BPA 2025",
                    grav: "Mineure", delai: "30 jours", statut: "✅ Corrigée (25/02)",
                  },
                  {
                    code: "NC-002", chap: "S2.3",
                    desc: "3 bidons vides Super Cupravit stockés hors zone déchets",
                    grav: "Mineure", delai: "15 jours", statut: "✅ Corrigée (05/03)",
                  },
                  {
                    code: "NC-003", chap: "S5.3",
                    desc: "Paire de gants nitrile manquante au séchoir",
                    grav: "Mineure", delai: "7 jours", statut: "✅ Corrigée (26/02)",
                  },
                ].map((r) => (
                  <tr key={r.code} className="border-t border-gray-50 dark:border-gray-800">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#6A1B9A] dark:text-purple-400">{r.code}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.chap}</td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{r.desc}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                        {r.grav}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.delai}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-green-700 dark:text-green-400">{r.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-green-50 dark:bg-green-900/20 border-t border-green-100 dark:border-green-800">
            <p className="text-xs text-green-700 dark:text-green-300 font-medium">
              Aucune NC critique ou majeure — certification maintenue sans condition.
            </p>
          </div>
        </div>

        {/* ── Historique des audits RA ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Historique des audits RA</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                  {["Année", "Auditeur", "Score", "NC crit.", "NC maj.", "NC min.", "Résultat"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { an: "2021", aud: "SGS CI",         score: 82, crit: 0, maj: 2, min: 5, res: "✅ Certifié (avec conditions)" },
                  { an: "2022", aud: "SGS CI",         score: 87, crit: 0, maj: 1, min: 4, res: "✅ Certifié (avec conditions)" },
                  { an: "2023", aud: "Bureau Veritas", score: 91, crit: 0, maj: 0, min: 4, res: "✅ Certifié" },
                  { an: "2024", aud: "Bureau Veritas", score: 92, crit: 0, maj: 0, min: 3, res: "✅ Certifié" },
                  { an: "2025", aud: "Bureau Veritas", score: 94, crit: 0, maj: 0, min: "3 (closes)", res: "✅ Certifié" },
                ].map((r, i) => (
                  <tr
                    key={r.an}
                    className={`border-t border-gray-50 dark:border-gray-800 ${i === 4 ? "bg-purple-50 dark:bg-purple-900/10 font-semibold" : ""}`}
                  >
                    <td className="px-4 py-3 text-xs font-bold text-[#6A1B9A] dark:text-purple-400">{r.an}</td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{r.aud}</td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-900 dark:text-white">{r.score}/100</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.crit}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.maj}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.min}</td>
                    <td className="px-4 py-3 text-xs text-green-700 dark:text-green-400 font-medium">{r.res}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SVG line chart — évolution score RA 2021-2025 */}
          <div className="px-5 pb-5 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Évolution score RA 2021–2025
            </p>
            <svg viewBox="0 0 660 180" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ maxHeight: 180 }}>
              {/* Grid */}
              {[60, 70, 80, 90, 100].map((v) => {
                const y = 20 + ((100 - v) / 40) * 130;
                return (
                  <g key={v}>
                    <line x1={44} y1={y} x2={620} y2={y} stroke="#F3F4F6" strokeWidth="1" />
                    <text x={38} y={y + 4} textAnchor="end" fontSize="9" fill="#9CA3AF">{v}</text>
                  </g>
                );
              })}

              {/* Minimum threshold 75 — below range, just show label */}
              <line x1={44} y1={20 + ((100 - 75) / 40) * 130} x2={620} y2={20 + ((100 - 75) / 40) * 130}
                stroke="#DC2626" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />
              <text x={624} y={20 + ((100 - 75) / 40) * 130 + 3} fontSize="8" fill="#DC2626">seuil 75</text>

              {/* Data: 82,87,91,92,94 */}
              {(() => {
                const scores = [82, 87, 91, 92, 94];
                const labels = ["2021", "2022", "2023", "2024", "2025"];
                const xStep = 576 / (scores.length - 1);
                const pts = scores.map((s, i) => ({
                  x: 44 + i * xStep,
                  y: 20 + ((100 - s) / 40) * 130,
                  s, label: labels[i], i,
                }));
                const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
                return (
                  <>
                    <polyline points={polyline} fill="none" stroke="#6A1B9A" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* Area fill */}
                    <polygon
                      points={`44,${20 + 130} ${polyline} ${44 + 4 * xStep},${20 + 130}`}
                      fill="#6A1B9A"
                      fillOpacity="0.08"
                    />
                    {pts.map((p) => (
                      <g key={p.i}>
                        <circle cx={p.x} cy={p.y} r={5} fill="#6A1B9A" stroke="white" strokeWidth="1.5" />
                        <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9" fill="#6A1B9A" fontWeight="800">
                          {p.s}
                        </text>
                      </g>
                    ))}
                    {/* X labels */}
                    {pts.map((p) => (
                      <text key={p.i} x={p.x} y={166} textAnchor="middle" fontSize="9" fill="#9CA3AF">{p.label}</text>
                    ))}
                  </>
                );
              })()}

              {/* Legend */}
              <line x1={44} y1={176} x2={64} y2={176} stroke="#6A1B9A" strokeWidth="2.5" />
              <text x={68} y={179} fontSize="8.5" fill="#6B7280">Score audit RA</text>
              <line x1={175} y1={176} x2={195} y2={176} stroke="#DC2626" strokeWidth="1.5" strokeDasharray="5,3" />
              <text x={199} y={179} fontSize="8.5" fill="#6B7280">Seuil minimal 75/100</text>
            </svg>
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/audit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            ← Retour aux audits
          </a>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6A1B9A] text-white text-sm font-medium hover:bg-[#4A0072] transition-colors">
            Télécharger rapport BV
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#6A1B9A] text-[#6A1B9A] dark:text-purple-400 dark:border-purple-600 text-sm font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            Planifier audit prochain
          </button>
        </div>

      </div>
    </div>
  );
}
