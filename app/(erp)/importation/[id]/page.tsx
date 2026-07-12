import Topbar from "../../../components/Topbar";

// ─── Types ─────────────────────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ id: string }>;
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function ImportationDetailPage({ params }: PageProps) {
  const { id } = await params;

  const articles = [
    { article: "Ligne goutte-à-goutte Ø16mm (50m)", ref: "Netafim Uniram 16mm", qte: "48", pu: "45", total: "2 160" },
    { article: "Goutteurs intégrés 2L/h", ref: "Netafim 2LPH", qte: "2 400", pu: "0,35", total: "840" },
    { article: "Tête de réseau filtration 2\"", ref: "Netafim HF 50m³/h", qte: "1", pu: "280", total: "280" },
    { article: "Vanne sectorielle (4 zones)", ref: "Ball valve 1\"", qte: "4", pu: "42", total: "168" },
    { article: "Programmateur solaire 4 voies", ref: "Netafim NMC", qte: "1", pu: "890", total: "890" },
    { article: "Raccords, joints, pièces assemblage", ref: "Divers", qte: "—", pu: "—", total: "1 050 (forfait)" },
    { article: "Frais expédition Haïfa → Abidjan", ref: "Maersk CMA CGM", qte: "—", pu: "—", total: "2 000 (forfait)" },
  ];

  const taxes = [
    { taxe: "Droit de douane (DD)", taux: "10%", base: "4 840 000 XOF", montant: "484 000 XOF" },
    { taxe: "Redevance statistique (RS)", taux: "1%", base: "4 840 000 XOF", montant: "48 400 XOF" },
    { taxe: "Prélèvement communautaire UEMOA", taux: "1%", base: "4 840 000 XOF", montant: "48 400 XOF" },
    { taxe: "Prélèvement CEDEAO", taux: "0,5%", base: "4 840 000 XOF", montant: "24 200 XOF" },
    { taxe: "TVA (CI)", taux: "18%", base: "5 444 600 XOF (base taxable)", montant: "979 200 XOF (récupérable)" },
  ];

  const timeline = [
    { date: "08/06/2025", label: "Commande passée à AGROTECH CI (agent Netafim)", done: true, active: false },
    { date: "15/06/2025", label: "Paiement acompte 30% (1 452 000 XOF) SGBCI → Israel", done: true, active: false },
    { date: "22/06/2025", label: "Expédition usine Haïfa (Israël) — connaissement NET-IL-2025-0567", done: true, active: false },
    { date: "02/07/2025", label: "Arrivée au Port Autonome d'Abidjan (PAB) — manifeste confirmé", done: true, active: false },
    { date: "05/07/2025", label: "Dépôt déclaration douanière DGD (déclarant AGROTECH CI)", done: true, active: false },
    { date: "En cours",   label: "Inspection douanière + acquittement droits (DGD-2025-AB-1892)", done: false, active: true },
    { date: "18/07/2025", label: "Paiement solde 70% (3 388 000 XOF) à réception documents", done: false, active: false },
    { date: "20/07/2025", label: "Enlèvement Port d'Abidjan par camion AGROTECH CI", done: false, active: false },
    { date: "25/07/2025", label: "Livraison EXP-001 Soubré (500 km — 1 journée)", done: false, active: false },
  ];

  const impact = [
    { indicateur: "Rendement anacarde", avant: "0,60 t/ha", apres: "0,85 t/ha (+41,7%)" },
    { indicateur: "Période récolte", avant: "Saison sèche uniquement", apres: "+2 mois (saison prolongée)" },
    { indicateur: "Mortalité plants", avant: "3% en saison sèche", apres: "<1% prévu" },
    { indicateur: "Consommation eau", avant: "Pluie naturelle uniquement", apres: "+2 275 L/j irrigation précise" },
    { indicateur: "CA PAR-C1 prévu", avant: "1,23M XOF", apres: "1,74M XOF (+41%)" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Commerce", "Importation", `Import ${id}`]} />

      <div className="p-6 max-w-6xl mx-auto space-y-5">

        {/* ── En-tête bandeau bleu marine ───────────────────────────────── */}
        <div className="rounded-2xl p-5 text-white" style={{ background: "#0D47A1" }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold bg-white/20 rounded-lg px-2.5 py-1 tracking-wider">
                  {id}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-400/30 border border-blue-300/40 rounded-lg px-2.5 py-1">
                  🔵 En transit
                </span>
              </div>
              <h1 className="text-xl font-bold mt-3">
                Équipements irrigation goutte-à-goutte
              </h1>
              <p className="text-sm opacity-80 mt-1">
                Fournisseur : <strong>Netafim Israel</strong> via agent CI — AGROTECH CI SARL
              </p>
              <p className="text-sm opacity-80 mt-0.5">
                Objet : Kit irrigation goutte-à-goutte PAR-C1 (anacarde 3,2 ha)
              </p>
            </div>
            <div className="text-right text-sm opacity-75 shrink-0">
              <p>Commande : <strong className="text-white opacity-100">08/06/2025</strong></p>
              <p className="mt-1">Livraison prévue : <strong className="text-white opacity-100">25/07/2025</strong></p>
              <p className="mt-1 text-xs">Étape : Dédouanement Abidjan</p>
            </div>
          </div>
        </div>

        {/* ── 4 KPI ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Valeur totale", value: "4 840 000 XOF", sub: "7 388 USD", color: "text-[#0D47A1]" },
            { label: "Droits douane + TVA", value: "1 887 600 XOF", sub: "21% DD + TVA 18%", color: "text-amber-700" },
            { label: "Coût total débarqué", value: "6 727 600 XOF", sub: "hors TVA récupérable", color: "text-gray-800" },
            { label: "Économie d'eau", value: "-65%", sub: "6 500L/j → 2 275L/j", color: "text-green-700" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">{kpi.label}</p>
              <p className={`text-lg font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Articles importés ──────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Détail des articles importés</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Article", "Référence", "Qté", "PU (USD)", "Total USD"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {articles.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2 text-gray-800">{row.article}</td>
                    <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{row.ref}</td>
                    <td className="px-3 py-2 text-gray-600 text-right">{row.qte}</td>
                    <td className="px-3 py-2 text-gray-600 text-right">{row.pu}</td>
                    <td className="px-3 py-2 font-semibold text-gray-800 text-right whitespace-nowrap">{row.total}</td>
                  </tr>
                ))}
                <tr className="bg-[#E3F2FD] font-bold">
                  <td colSpan={4} className="px-3 py-2 text-[#0D47A1]">TOTAL</td>
                  <td className="px-3 py-2 text-[#0D47A1] text-right">7 388 USD</td>
                </tr>
                <tr className="bg-gray-50 text-gray-500">
                  <td colSpan={4} className="px-3 py-2 text-[11px]">
                    Équivalent XOF au cours du 08/06/2025 (1 USD = 655,56 XOF)
                  </td>
                  <td className="px-3 py-2 text-right text-[11px] font-semibold text-gray-700">4 840 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Timeline douanière ─────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-5">Suivi douanier et logistique</h2>
          <div className="space-y-0">
            {timeline.map((step, i) => (
              <div key={i} className="flex gap-4">
                {/* indicateur vertical */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    step.done
                      ? "bg-green-100 text-green-700 border-2 border-green-400"
                      : step.active
                      ? "bg-blue-100 text-blue-700 border-2 border-blue-500 ring-2 ring-blue-200"
                      : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                  }`}>
                    {step.done ? "✓" : step.active ? "●" : i + 1}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className={`w-0.5 h-8 mt-1 ${step.done ? "bg-green-300" : "bg-gray-200"}`} />
                  )}
                </div>
                {/* contenu */}
                <div className={`pb-4 ${i < timeline.length - 1 ? "" : ""}`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-wide mb-0.5 ${
                    step.active ? "text-blue-600" : step.done ? "text-green-600" : "text-gray-400"
                  }`}>{step.date}</p>
                  <p className={`text-xs leading-relaxed ${
                    step.active ? "text-blue-800 font-semibold" : step.done ? "text-gray-700" : "text-gray-400"
                  }`}>{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Droits et taxes ────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Droits et taxes à l'importation (Côte d'Ivoire)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Taxe", "Taux", "Base", "Montant"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {taxes.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2 text-gray-800">{row.taxe}</td>
                    <td className="px-3 py-2 text-gray-600 font-medium">{row.taux}</td>
                    <td className="px-3 py-2 text-gray-500">{row.base}</td>
                    <td className="px-3 py-2 font-semibold text-gray-800 whitespace-nowrap">{row.montant}</td>
                  </tr>
                ))}
                <tr className="bg-amber-50 font-bold">
                  <td colSpan={3} className="px-3 py-2 text-amber-800">TOTAL DROITS &amp; TAXES</td>
                  <td className="px-3 py-2 text-amber-800">1 584 200 XOF</td>
                </tr>
                <tr className="bg-green-50">
                  <td colSpan={3} className="px-3 py-2 text-green-700 text-[11px]">TVA récupérable (assujetti TVA CI)</td>
                  <td className="px-3 py-2 text-green-700 font-semibold">-979 200 XOF</td>
                </tr>
                <tr className="bg-[#E3F2FD] font-bold">
                  <td colSpan={3} className="px-3 py-2 text-[#0D47A1]">COÛT RÉEL TAXES (hors TVA récupérable)</td>
                  <td className="px-3 py-2 text-[#0D47A1]">605 000 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 rounded-xl bg-blue-50 border border-blue-100 px-4 py-2.5">
            <p className="text-xs text-blue-700">
              <strong>Note :</strong> La TVA est récupérable sur la déclaration TVA mensuelle AGRIFRIK
              (assujetti régime réel). Le coût net effectif est donc de 605 000 XOF uniquement.
            </p>
          </div>
        </div>

        {/* ── Impact agronomique ─────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Impact agronomique attendu — Parcelle PAR-C1</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Indicateur", "Avant irrigation", "Après irrigation (prévu)"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {impact.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-3 py-2 font-medium text-gray-800">{row.indicateur}</td>
                    <td className="px-3 py-2 text-gray-600">{row.avant}</td>
                    <td className="px-3 py-2 font-semibold text-green-700">{row.apres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ROI */}
          <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>ROI installation :</strong> 6 727 600 XOF investis / surplus CA annuel +510 000 XOF
              → ROI ~13 ans. Au-delà du ROI financier : amélioration qualité anacarde, zéro stress hydrique
              et résilience face à la variabilité climatique.
            </p>
          </div>
        </div>

        {/* ── Actions ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 pb-4">
          <a href="/importation"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            ← Retour aux importations
          </a>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#0D47A1] text-white px-4 py-2 text-xs font-medium hover:bg-[#1565C0] transition-colors">
            Suivre en douane
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white px-4 py-2 text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            Planifier l'installation
          </button>
        </div>

      </div>
    </div>
  );
}
