import Topbar from "../../../components/Topbar";

export default async function MouvementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /* Données SVG — évolution solde SGBCI sur 30 jours */
  const soldePoints = [
    { jour: "08/06", valeur: 8.4 },
    { jour: "12/06", valeur: 9.1 },
    { jour: "15/06", valeur: 7.8 },
    { jour: "18/06", valeur: 10.2 },
    { jour: "21/06", valeur: 9.6 },
    { jour: "24/06", valeur: 11.4 },
    { jour: "27/06", valeur: 8.9 },
    { jour: "30/06", valeur: 7.5 },
    { jour: "03/07", valeur: 8.1 },
    { jour: "06/07", valeur: 6.2 },
    { jour: "07/07", valeur: 14.1 },
    { jour: "08/07", valeur: 17.3 },
  ];

  const W = 640;
  const H = 200;
  const padL = 48;
  const padR = 20;
  const padT = 16;
  const padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const minV = 0;
  const maxV = 20;

  const toX = (i: number) => padL + (i / (soldePoints.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - ((v - minV) / (maxV - minV)) * chartH;

  const pathD = soldePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(p.valeur).toFixed(1)}`)
    .join(" ");

  const areaD =
    pathD +
    ` L ${toX(soldePoints.length - 1).toFixed(1)} ${(padT + chartH).toFixed(1)}` +
    ` L ${toX(0).toFixed(1)} ${(padT + chartH).toFixed(1)} Z`;

  /* Point final (08/07 — encaissement BC) */
  const lastIdx = soldePoints.length - 1;
  const lastX = toX(lastIdx);
  const lastY = toY(soldePoints[lastIdx].valeur);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar
        breadcrumb={["Finance", "Trésorerie", `Mouvement ${id}`]}
      />

      <main className="flex-1 p-6 space-y-6">

        {/* En-tête bandeau vert */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-green-200 font-medium uppercase tracking-widest mb-1">Mouvement de trésorerie</p>
              <h1 className="text-2xl font-bold tracking-tight">MVT-2025-0921</h1>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-green-600 px-4 py-1.5 text-sm font-semibold">
                ✅ Rapproché
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#2E7D32] border border-green-500 px-4 py-1.5 text-sm font-semibold">
                Banque : SGBCI CI
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-green-100">
            <div><span className="text-green-300">Type :</span> Encaissement client</div>
            <div><span className="text-green-300">Date :</span> 08/07/2025 à 14h23</div>
            <div className="sm:col-span-2">
              <span className="text-green-300">Libellé :</span> Règlement virement Barry Callebaut — FAC-2025-008 partiel
            </div>
            <div className="sm:col-span-2">
              <span className="text-green-300">Compte bancaire :</span> SGBCI Soubré — Compte courant 00013001
            </div>
          </div>
        </div>

        {/* 4 KPI */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Montant</p>
            <p className="text-xl font-bold text-[#2E7D32]">+4 460 000</p>
            <p className="text-xs text-green-600 font-medium">XOF ↑</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Solde avant</p>
            <p className="text-xl font-bold text-gray-800">12 847 000</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Solde après</p>
            <p className="text-xl font-bold text-gray-800">17 307 000</p>
            <p className="text-xs text-gray-400">XOF</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-xs text-gray-500 mb-1">Rapprochement</p>
            <p className="text-base font-bold text-[#2E7D32]">✅ Identifié</p>
            <p className="text-xs text-gray-400">BL-2025-007</p>
          </div>
        </div>

        {/* Détail du mouvement */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Détail du mouvement</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium rounded-l-xl w-56">Champ</th>
                  <th className="text-left px-4 py-3 font-medium rounded-r-xl">Valeur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Référence interne", "MVT-2025-0921"],
                  ["Date comptable", "08/07/2025"],
                  ["Date valeur banque", "08/07/2025 (J=J — virement SWIFT intrajournalier)"],
                  ["Compte bancaire", "SGBCI Soubré — N° 00013001 — BIC SGCICIAB"],
                  ["Type", "Crédit (encaissement)"],
                  ["Nature", "Règlement client — Vente export cacao"],
                  ["Origine", "Barry Callebaut Manufacturing CI SAS — IBAN FR76 3000 1007 9400 0000 0001 234"],
                  ["Référence banque", "SGBCI-VIR-2025-07-847-BC"],
                  ["Motif banque", "« REGLEMENT FAC CACAO GRADE AA JUILLET 2025 AGRIFRIK »"],
                  ["Écriture comptable liée", "JNL-2025-0921 (compte 521 débit / compte 411-BC crédit)"],
                ].map(([label, value]) => (
                  <tr key={label} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-600 text-sm">{label}</td>
                    <td className="px-4 py-3 text-gray-800 text-sm">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rapprochement bancaire */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Rapprochement bancaire</h2>
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2 font-semibold text-[#1B5E20] text-base mb-3">
              ✅ État du rapprochement MVT-2025-0921
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Statut</p>
                <p className="font-medium text-[#2E7D32]">✅ Rapproché automatiquement le 08/07/2025 à 15h02</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Méthode</p>
                <p className="text-gray-700">Correspondance montant exact (4 460 000 XOF) + référence &quot;FAC CACAO&quot;</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Facture rapprochée</p>
                <p className="font-medium text-gray-800">FAC-2025-007 (BL-2025-007 — Barry Callebaut 964 kg)</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Écart</p>
                <p className="font-bold text-[#2E7D32]">0 XOF ✅</p>
              </div>
            </div>
          </div>
        </div>

        {/* SVG Évolution solde SGBCI + tableau soldes */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Soldes des comptes bancaires au 08/07/2025</h2>
          <p className="text-xs text-gray-400 mb-4">Évolution solde SGBCI — 30 derniers jours</p>

          {/* SVG line chart */}
          <div className="overflow-x-auto mb-6">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              width={W}
              height={H}
              className="max-w-full"
              aria-label="Évolution du solde SGBCI sur 30 jours"
            >
              {/* Grille horizontale */}
              {[0, 5, 10, 15, 20].map((v) => (
                <g key={v}>
                  <line
                    x1={padL}
                    y1={toY(v)}
                    x2={W - padR}
                    y2={toY(v)}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                  <text
                    x={padL - 6}
                    y={toY(v) + 4}
                    textAnchor="end"
                    fontSize="9"
                    fill="#9CA3AF"
                  >
                    {v}M
                  </text>
                </g>
              ))}

              {/* Zone remplie */}
              <path d={areaD} fill="#2E7D32" fillOpacity="0.08" />

              {/* Courbe */}
              <path
                d={pathD}
                fill="none"
                stroke="#2E7D32"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Labels dates (chaque 2) */}
              {soldePoints
                .filter((_, i) => i % 2 === 0)
                .map((p, idx) => {
                  const origIdx = idx * 2;
                  return (
                    <text
                      key={p.jour}
                      x={toX(origIdx)}
                      y={H - padB + 14}
                      textAnchor="middle"
                      fontSize="8"
                      fill="#9CA3AF"
                    >
                      {p.jour}
                    </text>
                  );
                })}

              {/* Point final encaissement BC */}
              <circle cx={lastX} cy={lastY} r="5" fill="#2E7D32" stroke="white" strokeWidth="2" />
              <text
                x={lastX - 4}
                y={lastY - 10}
                textAnchor="middle"
                fontSize="9"
                fill="#1B5E20"
                fontWeight="bold"
              >
                17,3M ✅
              </text>

              {/* Point bas 06/07 */}
              <circle cx={toX(9)} cy={toY(6.2)} r="4" fill="#E65100" stroke="white" strokeWidth="2" />
              <text
                x={toX(9)}
                y={toY(6.2) - 8}
                textAnchor="middle"
                fontSize="8"
                fill="#E65100"
              >
                6,2M
              </text>
            </svg>
          </div>

          {/* Tableau soldes comptes */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium rounded-l-xl">Compte</th>
                  <th className="text-left px-4 py-3 font-medium">Banque</th>
                  <th className="text-right px-4 py-3 font-medium rounded-r-xl">Solde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50 bg-green-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Compte courant 00013001 ✅</td>
                  <td className="px-4 py-3 text-gray-600">SGBCI Soubré</td>
                  <td className="px-4 py-3 text-right font-bold text-[#2E7D32]">17 307 000 XOF</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Compte épargne</td>
                  <td className="px-4 py-3 text-gray-600">SGBCI Soubré</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">24 800 000 XOF</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Caisse espèces</td>
                  <td className="px-4 py-3 text-gray-600">Exploitation</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">842 000 XOF</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Orange Money</td>
                  <td className="px-4 py-3 text-gray-600">Orange CI</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800">380 000 XOF</td>
                </tr>
                <tr className="bg-[#F8FBF8] font-bold">
                  <td className="px-4 py-3 rounded-l-xl text-gray-700" colSpan={2}>Trésorerie totale</td>
                  <td className="px-4 py-3 text-right text-[#2E7D32] text-base rounded-r-xl">43 329 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mouvements adjacents */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Mouvements adjacents du même jour</h2>
          <p className="text-xs text-gray-400 mb-4">08/07/2025 — Compte SGBCI Soubré 00013001</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-xs text-gray-500 uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium rounded-l-xl">Réf.</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-left px-4 py-3 font-medium">Libellé</th>
                  <th className="text-right px-4 py-3 font-medium">Montant</th>
                  <th className="text-left px-4 py-3 font-medium rounded-r-xl">Compte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-[#1B5E20]">MVT-2025-0919</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-lg bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">Débit</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">Paiement AgroChim CI FAC-2025-ACI-089</td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">-192 000</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">SGBCI</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-[#1B5E20]">MVT-2025-0920</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-lg bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">Débit</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">Salaires saisonniers juillet (8×)</td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">-1 000 000</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">SGBCI</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-green-50 font-semibold">
                  <td className="px-4 py-3 font-mono text-xs text-[#1B5E20]">MVT-2025-0921</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-lg bg-green-100 px-2 py-0.5 text-xs font-medium text-[#2E7D32]">Crédit</span>
                  </td>
                  <td className="px-4 py-3 text-gray-800">Règlement BC BL-007</td>
                  <td className="px-4 py-3 text-right font-bold text-[#2E7D32]">+4 460 000</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">SGBCI</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-[#1B5E20]">MVT-2025-0922</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-lg bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">Débit</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">Carburant tracteur DT55</td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">-38 000</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">SGBCI</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 text-xs text-gray-600">
            <span className="font-semibold">Solde SGBCI net du 08/07 :</span> +3 230 000 XOF (solde avant 14,1M → après 17,3M)
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pb-4">
          <a
            href="/tresorerie"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Retour à la trésorerie
          </a>
          <button className="inline-flex items-center gap-2 bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
            Télécharger le relevé du jour
          </button>
          <a
            href="/comptabilite/JNL-2025-0921"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Voir l&apos;écriture comptable →
          </a>
        </div>

      </main>
    </div>
  );
}
