import Topbar from "../../../components/Topbar";

export default async function BulletinPaiePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["RH", "Paie", `Bulletin ${id}`]} />

      <main className="flex-1 p-6 space-y-6">
        {/* Bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold">BUL-2025-07-002 — Juillet 2025</h1>
                <span className="inline-flex items-center gap-1 bg-green-400/20 border border-green-400/40 text-green-200 text-xs font-medium px-2 py-0.5 rounded-full">
                  ✅ Validé
                </span>
              </div>
              <p className="text-green-200 text-sm">Ibrahim Sawadogo — Technicien terrain EXP-001</p>
              <div className="flex flex-wrap gap-4 text-xs text-green-300 mt-2">
                <span>Matricule : EMP-002</span>
                <span>Période : 01/07/2025 – 31/07/2025</span>
                <span>Convention collective : Agriculture CI — SYSCOHADA</span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-green-300 mt-1">
                <span>Validé par : Adjoua Messou (CF)</span>
                <span>Approuvé : Koffi Amani (DG)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Salaire brut</p>
            <p className="text-2xl font-bold text-gray-900">168 000</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Cotisations salariales</p>
            <p className="text-2xl font-bold text-red-600">−24 360</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Net à payer</p>
            <p className="text-2xl font-bold text-[#2E7D32]">143 640</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Virement</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">SGBCI Soubré</p>
            <p className="text-xs text-gray-400">31/07/2025</p>
          </div>
        </div>

        {/* Simulation bulletin imprimé */}
        <div className="rounded-2xl border border-gray-200 bg-[#FEFDF9] p-6 md:p-8 shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-5 uppercase tracking-wide">
            Bulletin de salaire (simulation)
          </h2>

          {/* En-tête doc */}
          <div className="grid grid-cols-2 gap-6 mb-6 pb-5 border-b border-gray-200">
            <div className="space-y-0.5 text-sm text-gray-700">
              <p className="font-bold text-[#1B5E20]">AGRIFRIK SAS</p>
              <p>Soubré, Région Nawa, CI</p>
              <p>RCCM CI-SOB-2008-B-1142</p>
              <p>NIF CI-2008-4721-B</p>
            </div>
            <div className="text-right space-y-0.5 text-sm text-gray-700">
              <p className="font-bold text-lg text-gray-900">BULLETIN DE PAIE</p>
              <p>Période : Juillet 2025</p>
              <p>N° : BUL-2025-07-002</p>
            </div>
          </div>

          {/* Identification */}
          <div className="mb-6 pb-5 border-b border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Identification de l&apos;employé
            </h3>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["Nom & Prénom", "SAWADOGO Ibrahim"],
                  ["Matricule", "EMP-002"],
                  ["Poste", "Technicien terrain — Agent de maîtrise"],
                  ["Catégorie", "Conv. coll. Agriculture CI — Catégorie C2"],
                  ["Date embauche", "15/03/2015  |  Ancienneté : 10 ans 4 mois"],
                  ["Mode de règlement", "Virement SGBCI — Compte 00013002"],
                ].map(([label, val]) => (
                  <tr key={label} className="border-b border-gray-100 last:border-0">
                    <td className="py-1.5 pr-4 text-gray-500 w-52">{label}</td>
                    <td className="py-1.5 font-medium text-gray-900">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rémunération brute */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-[#1B5E20] uppercase tracking-wider mb-2 bg-green-50 px-3 py-1.5 rounded">
              Rémunération brute
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden min-w-[500px]">
                <thead>
                  <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase">
                    <th className="text-left py-2 px-3">Rubrique</th>
                    <th className="text-left py-2 px-3">Base</th>
                    <th className="text-left py-2 px-3">Taux / Montant</th>
                    <th className="text-right py-2 px-3">Montant (XOF)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Salaire de base (Cat. C2)", "168h", "—", "135 000"],
                    ["Indemnité de transport", "Forfait mensuel", "—", "15 000"],
                    ["Prime d'ancienneté (10 ans = 10%)", "135 000 × 10%", "—", "13 500"],
                    ["Prime de technicité terrain", "Forfait", "—", "4 500"],
                  ].map(([r, b, t, m]) => (
                    <tr key={r} className="border-t border-gray-100">
                      <td className="py-2 px-3 text-gray-800">{r}</td>
                      <td className="py-2 px-3 text-gray-500">{b}</td>
                      <td className="py-2 px-3 text-gray-500">{t}</td>
                      <td className="py-2 px-3 text-right text-gray-900">{m}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-300 bg-green-50 font-bold">
                    <td className="py-2 px-3 text-[#1B5E20]" colSpan={3}>TOTAL BRUT</td>
                    <td className="py-2 px-3 text-right text-[#1B5E20]">168 000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cotisations salariales */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-2 bg-red-50 px-3 py-1.5 rounded">
              Cotisations salariales (déduites du brut)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden min-w-[560px]">
                <thead>
                  <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase">
                    <th className="text-left py-2 px-3">Cotisation</th>
                    <th className="text-left py-2 px-3">Organisme</th>
                    <th className="text-left py-2 px-3">Base</th>
                    <th className="text-left py-2 px-3">Taux</th>
                    <th className="text-right py-2 px-3">Montant (XOF)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["CNPS — Branche retraite", "CNPS CI", "168 000", "6,3%", "−10 584"],
                    ["CNPS — Branche prestations fam.", "CNPS CI", "168 000", "—", "inclus"],
                    ["ITS (Impôt sur Traitement et Salaires)", "DGI CI", "Rev. imposable 143 640", "Taux progressif", "−13 776"],
                  ].map(([c, o, b, t, m]) => (
                    <tr key={c} className="border-t border-gray-100">
                      <td className="py-2 px-3 text-gray-800">{c}</td>
                      <td className="py-2 px-3 text-gray-500">{o}</td>
                      <td className="py-2 px-3 text-gray-500">{b}</td>
                      <td className="py-2 px-3 text-gray-500">{t}</td>
                      <td className="py-2 px-3 text-right text-red-600">{m}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-300 bg-red-50 font-bold">
                    <td className="py-2 px-3 text-red-700" colSpan={4}>TOTAL COTISATIONS SALARIALES</td>
                    <td className="py-2 px-3 text-right text-red-700">−24 360</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cotisations patronales */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 bg-blue-50 px-3 py-1.5 rounded">
              Cotisations patronales (à la charge AGRIFRIK — informatif)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden min-w-[560px]">
                <thead>
                  <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase">
                    <th className="text-left py-2 px-3">Cotisation</th>
                    <th className="text-left py-2 px-3">Organisme</th>
                    <th className="text-left py-2 px-3">Base</th>
                    <th className="text-left py-2 px-3">Taux</th>
                    <th className="text-right py-2 px-3">Montant (XOF)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["CNPS — Prestations familiales", "CNPS CI", "168 000", "5,75%", "9 660"],
                    ["CNPS — Accidents du travail", "CNPS CI", "168 000", "2,00%", "3 360"],
                    ["FDFP (formation prof.)", "FDFP CI", "168 000", "1,20%", "2 016"],
                  ].map(([c, o, b, t, m]) => (
                    <tr key={c} className="border-t border-gray-100">
                      <td className="py-2 px-3 text-gray-800">{c}</td>
                      <td className="py-2 px-3 text-gray-500">{o}</td>
                      <td className="py-2 px-3 text-gray-500">{b}</td>
                      <td className="py-2 px-3 text-gray-500">{t}</td>
                      <td className="py-2 px-3 text-right text-blue-700">{m}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-300 bg-blue-50 font-bold">
                    <td className="py-2 px-3 text-blue-700" colSpan={4}>TOTAL CHARGES PATRONALES</td>
                    <td className="py-2 px-3 text-right text-blue-700">15 036</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Synthèse */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 bg-gray-100 px-3 py-1.5 rounded">
              Synthèse
            </h3>
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="py-2 px-3 text-gray-900">Salaire brut</td>
                  <td className="py-2 px-3 text-right text-gray-900">168 000 XOF</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-2 px-3 text-gray-700">Cotisations salariales</td>
                  <td className="py-2 px-3 text-right text-red-600">−24 360 XOF</td>
                </tr>
                <tr className="border-t-2 border-[#1B5E20] bg-green-50 font-bold">
                  <td className="py-3 px-3 text-[#1B5E20] text-base">NET À PAYER</td>
                  <td className="py-3 px-3 text-right text-[#1B5E20] text-base">143 640 XOF</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-2 px-3 text-xs text-gray-500">Coût total employeur</td>
                  <td className="py-2 px-3 text-right text-xs text-gray-500">183 036 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs text-gray-400 space-y-1 border-t border-gray-200 pt-4">
            <p>Règlement par virement bancaire — SGBCI Soubré — 31/07/2025 — Valeur date.</p>
            <p>Conserver ce bulletin pendant 5 ans (art. 73.7 Code du travail CI).</p>
          </div>
        </div>

        {/* Cumuls annuels */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Cumuls annuels 2025 (Jan-Jul)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase">
                  <th className="text-left py-2 px-3">Mois</th>
                  <th className="text-right py-2 px-3">Brut</th>
                  <th className="text-right py-2 px-3">Cotis. sal.</th>
                  <th className="text-right py-2 px-3">Net payé</th>
                  <th className="text-right py-2 px-3">Charges pat.</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Janv 2025", false],
                    ["Fév 2025", false],
                    ["Mar 2025", false],
                    ["Avr 2025", false],
                    ["Mai 2025", false],
                    ["Juin 2025", false],
                    ["Juil 2025", true],
                  ] as [string, boolean][]
                ).map(([mois, isCurrent]) => (
                  <tr
                    key={mois}
                    className={`border-t border-gray-100 ${isCurrent ? "bg-green-50 font-semibold" : ""}`}
                  >
                    <td className={`py-2 px-3 ${isCurrent ? "text-[#1B5E20]" : "text-gray-700"}`}>{mois}</td>
                    <td className="py-2 px-3 text-right text-gray-900">168 000</td>
                    <td className="py-2 px-3 text-right text-red-500">−24 360</td>
                    <td className="py-2 px-3 text-right text-[#2E7D32]">143 640</td>
                    <td className="py-2 px-3 text-right text-blue-600">15 036</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-300 bg-gray-50 font-bold text-sm">
                  <td className="py-2 px-3 text-gray-900">CUMUL</td>
                  <td className="py-2 px-3 text-right text-gray-900">1 176 000</td>
                  <td className="py-2 px-3 text-right text-red-600">−170 520</td>
                  <td className="py-2 px-3 text-right text-[#2E7D32]">1 005 480</td>
                  <td className="py-2 px-3 text-right text-blue-700">105 252</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SVG line chart net à payer */}
          <div className="mt-6">
            <p className="text-xs text-gray-500 mb-2 font-medium">
              Évolution net à payer Ibrahim S. — Jan-Jul 2025
            </p>
            <svg
              viewBox="0 0 640 140"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-2xl"
              aria-label="Évolution du net à payer Jan-Jul 2025"
            >
              {/* Horizontal grid */}
              {[20, 47, 74, 101].map((y) => (
                <line key={y} x1="60" y1={y} x2="615" y2={y} stroke="#E5E7EB" strokeWidth="1" />
              ))}
              {/* Y labels */}
              {(
                [
                  [20, "145 000"],
                  [47, "144 000"],
                  [74, "143 000"],
                  [101, "142 000"],
                ] as [number, string][]
              ).map(([y, label]) => (
                <text key={label} x="55" y={y + 4} textAnchor="end" fontSize="9" fill="#9CA3AF">
                  {label}
                </text>
              ))}
              {/* X labels */}
              {["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"].map((m, i) => (
                <text
                  key={m}
                  x={65 + i * ((610 - 65) / 6)}
                  y={125}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#9CA3AF"
                >
                  {m}
                </text>
              ))}
              {/* Line flat at 143 640 — mapped to y≈57 in range 142000-145000 → px 20-101 */}
              {(() => {
                const xs = Array.from({ length: 7 }, (_, i) => 65 + i * ((610 - 65) / 6));
                const yVal = 20 + ((145000 - 143640) / 3000) * 81; // ≈ 56.7
                const points = xs.map((x) => `${x},${yVal}`).join(" ");
                return (
                  <>
                    <polyline
                      points={points}
                      fill="none"
                      stroke="#2E7D32"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    {xs.map((x, i) => (
                      <circle key={i} cx={x} cy={yVal} r="4" fill="#2E7D32" />
                    ))}
                    <text x={xs[6] + 8} y={yVal + 4} fontSize="9" fill="#2E7D32" fontWeight="600">
                      143 640 XOF
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* Congés */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Congés et absences</h2>
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Congés acquis 2025", "14,58 jours (1,67j/mois × 8,75 mois de service)"],
                ["Congés pris", "0 jour (congé annuel prévu août 2025 — planifié avec Koffi Amani)"],
                ["Congés restants", "14,58 jours"],
                ["Absences juillet 2025", "0 jour ✅"],
              ].map(([label, val]) => (
                <tr key={label} className="border-t border-gray-100 first:border-0">
                  <td className="py-2 pr-4 text-gray-500 w-52">{label}</td>
                  <td className="py-2 font-medium text-gray-900">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-4">
          <a
            href="/paie"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            ← Retour à la paie
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
            Imprimer le bulletin
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-[#2E7D32] text-[#2E7D32] rounded-xl text-xs font-medium px-4 py-2 hover:bg-green-50 transition-colors">
            Envoyer par email
          </button>
        </div>
      </main>
    </div>
  );
}
