import Topbar from "../../../components/Topbar";
import { ArrowLeft, Download, ExternalLink, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default async function ExportDossierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ── Static data for EXP-DOSS-2025-007 ──────────────────────────────────────
  const dossier = {
    ref: "EXP-DOSS-2025-007",
    produit: "Cacao sec Grade AA (fermenté/séché — Filière Nawa CI)",
    acheteur: "Barry Callebaut Manufacturing CI → usine Rotterdam (Pays-Bas)",
    portDepart: "San-Pédro, Côte d'Ivoire",
    portArrivee: "Rotterdam, Pays-Bas",
    incoterm: "DAP Rotterdam",
    dateChargement: "23/06/2025",
    statut: "Livré",
    eta: "15/07/2025",
  };

  const kpis = [
    { label: "Volume", value: "3 400 kg", sub: "52,3 sacs jute 65 kg" },
    { label: "Valeur FOB", value: "3 695 800 XOF", sub: "5 638 USD" },
    { label: "Valeur DAP Rotterdam", value: "4 286 000 XOF", sub: "+15,9% transport+assurance" },
    { label: "Fret maritime", value: "392 000 XOF", sub: "Maersk — 20' FCL partagé" },
    { label: "Assurance cargaison", value: "198 000 XOF", sub: "AXA Maritime CI" },
  ];

  const timeline = [
    { date: "23/06", label: "Chargement San-Pédro", detail: "BL émis | Douane DGD validée", done: true },
    { date: "24/06", label: "Transit Abidjan", detail: "Port trans-shipment | Manifeste confirmé", done: true },
    { date: "04/07", label: "Escale Las Palmas (Canaries)", detail: "Conteneur vérifié", done: true },
    { date: "En mer", label: "Atlantique Nord", detail: "ETA Rotterdam 15/07/2025", done: false, inProgress: true },
    { date: "15/07", label: "Arrivée Rotterdam", detail: "Dépotage | Contrôle qualité BC Rotterdam", done: false },
  ];

  const documents = [
    { doc: "Facture commerciale", num: "FAC-2025-008", emetteur: "AGRIFRIK SAS", date: "22/06/2025", statut: "Original remis banque" },
    { doc: "Connaissement maritime", num: "MAEU-CI-0908", emetteur: "Maersk CI", date: "23/06/2025", statut: "3 originaux émis" },
    { doc: "Certificat Rainforest Alliance", num: "RA-CI-2025-00908", emetteur: "Bureau Veritas", date: "01/03/2025", statut: "Valide" },
    { doc: "Certificat phytosanitaire", num: "PHYTO-MINADER-2025-0567", emetteur: "MINADER CI", date: "23/06/2025", statut: "Conforme" },
    { doc: "Déclaration export DGD", num: "DGD-2025-NW-0234", emetteur: "DGD Abidjan", date: "22/06/2025", statut: "Validée" },
    { doc: "Certificat d'origine UEMOA", num: "CO-CEPICI-2025-0456", emetteur: "CEPICI CI", date: "22/06/2025", statut: "Conforme" },
    { doc: "Certificat analyse SGS", num: "SGS-CI-2025-8472", emetteur: "SGS Abidjan", date: "21/06/2025", statut: "Humidité 7,25%" },
    { doc: "Police d'assurance maritime", num: "AXA-MAR-2025-EFA007", emetteur: "AXA CI", date: "22/06/2025", statut: "Active" },
  ];

  const finances = [
    { poste: "Valeur marchandise (3 400 kg × 1 087 XOF)", xof: "3 695 800", usd: "5 638" },
    { poste: "Fret maritime San-Pédro → Rotterdam", xof: "392 000", usd: "598" },
    { poste: "Assurance maritime (0,5% valeur)", xof: "198 000", usd: "302" },
    { poste: "Frais portuaires San-Pédro", xof: "48 000", usd: "73" },
    { poste: "Honoraires transitaire", xof: "84 000", usd: "128" },
  ];

  const conformite = [
    { regle: "Règlement UE 2019/1793 (résidus pesticides cacao)", detail: "Analyses SGS conformes — 0 résidu détecté" },
    { regle: "Règlement UE 2021/2115 (traçabilité déforestation EUDR)", detail: "GPS parcelles fournis — 0 déforestation depuis 2008" },
    { regle: "Norme ISO 2451:2017 (fèves de cacao — spécifications)", detail: "Grade AA — cut test 97%" },
    { regle: "EFSA — Cadmium (Cd)", detail: "<0,1 mg/kg (analyse SGS) — norme EU 0,3 mg/kg" },
    { regle: "Règlement phytosanitaire UE", detail: "Certificat MINADER CI valide" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
      <Topbar breadcrumb={["Commerce", "Exportation", `Export ${id}`]} />

      <main className="flex-1 p-6 space-y-6">

        {/* ── Header banner ── */}
        <div className="rounded-2xl bg-[#1B5E20] text-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-mono font-medium">
                  {dossier.ref}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-green-400/30 text-green-200 text-xs px-3 py-1 rounded-full font-medium">
                  <CheckCircle size={12} /> {dossier.statut}
                </span>
              </div>
              <h1 className="text-xl font-bold">{dossier.produit}</h1>
              <p className="text-green-200 text-sm">{dossier.acheteur}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-green-100">
              <span className="text-green-300 text-xs">Port départ</span>
              <span className="text-green-300 text-xs">Port arrivée</span>
              <span className="font-medium">{dossier.portDepart}</span>
              <span className="font-medium">{dossier.portArrivee}</span>
              <span className="text-green-300 text-xs mt-1">Incoterm</span>
              <span className="text-green-300 text-xs mt-1">Date chargement</span>
              <span className="font-medium">{dossier.incoterm}</span>
              <span className="font-medium">{dossier.dateChargement}</span>
              <span className="text-green-300 text-xs mt-1 col-span-2">ETA Rotterdam</span>
              <span className="font-semibold text-white col-span-2 flex items-center gap-2">
                {dossier.eta}
                <span className="text-xs bg-yellow-400/30 text-yellow-200 px-2 py-0.5 rounded-full">dans 4 jours</span>
              </span>
            </div>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {kpis.map((k, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className="text-base font-bold text-gray-900 leading-tight">{k.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Route map + timeline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* SVG map */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Itinéraire San-Pédro → Rotterdam</h2>
            <svg viewBox="0 0 700 320" className="w-full" aria-label="Itinéraire maritime San-Pédro → Rotterdam">
              {/* Ocean background */}
              <rect width="700" height="320" fill="#DBEAFE" rx="8" />

              {/* Africa landmass (simplified) */}
              <polygon
                points="260,20 320,20 370,45 390,80 410,120 400,180 380,230 350,280 310,310 260,315 230,300 220,260 230,210 220,170 240,130 230,80 250,50"
                fill="#D1FAE5" stroke="#86EFAC" strokeWidth="1"
              />
              {/* Europe landmass (simplified) */}
              <polygon
                points="340,0 460,0 510,15 540,35 550,60 530,80 510,90 490,80 460,85 430,75 400,60 370,40 350,20"
                fill="#FEF9C3" stroke="#FDE047" strokeWidth="1"
              />
              {/* Canary Islands */}
              <ellipse cx="250" cy="145" rx="12" ry="7" fill="#FEF9C3" stroke="#FDE047" strokeWidth="0.8" />
              <text x="252" y="140" fontSize="7" fill="#92400E" fontWeight="600">Canaries</text>

              {/* Route line */}
              <polyline
                points="300,240 310,230 260,148 430,55"
                fill="none"
                stroke="#E65100"
                strokeWidth="2.5"
                strokeDasharray="8 4"
              />
              {/* Arrow at Rotterdam */}
              <polygon points="430,55 422,66 438,64" fill="#E65100" />

              {/* Stop points */}
              {/* ① San-Pédro */}
              <circle cx="300" cy="240" r="7" fill="#1B5E20" stroke="white" strokeWidth="2" />
              <text x="307" y="237" fontSize="9" fill="#1B5E20" fontWeight="700">① San-Pédro</text>
              <text x="307" y="248" fontSize="8" fill="#6b7280">23/06</text>

              {/* ② Abidjan */}
              <circle cx="310" cy="230" r="5" fill="#2E7D32" stroke="white" strokeWidth="1.5" />
              <text x="316" y="227" fontSize="8" fill="#1B5E20" fontWeight="600">② Abidjan</text>
              <text x="316" y="237" fontSize="7.5" fill="#6b7280">24/06 trans-ship</text>

              {/* ③ Las Palmas */}
              <circle cx="260" cy="148" r="6" fill="#E65100" stroke="white" strokeWidth="1.5" />
              <text x="196" y="145" fontSize="8.5" fill="#E65100" fontWeight="700">③ Las Palmas</text>
              <text x="206" y="156" fontSize="7.5" fill="#6b7280">04/07</text>

              {/* ④ Rotterdam */}
              <circle cx="430" cy="55" r="7" fill="#1D4ED8" stroke="white" strokeWidth="2" />
              <text x="437" y="52" fontSize="9" fill="#1D4ED8" fontWeight="700">④ Rotterdam</text>
              <text x="437" y="63" fontSize="8" fill="#6b7280">15/07 est.</text>

              {/* Ship label */}
              <rect x="170" y="185" width="145" height="28" rx="5" fill="white" fillOpacity="0.9" />
              <text x="178" y="197" fontSize="8.5" fill="#374151" fontWeight="600">MSC Viviana</text>
              <text x="178" y="208" fontSize="7.5" fill="#9ca3af">ex MAEU-CI-0908 · Maersk</text>

              {/* Legend */}
              <circle cx="30" cy="295" r="5" fill="#E65100" />
              <text x="40" y="299" fontSize="8.5" fill="#6b7280">Route maritime</text>
              <circle cx="160" cy="295" r="5" fill="#1B5E20" />
              <text x="170" y="299" fontSize="8.5" fill="#6b7280">Escale confirmée</text>
              <circle cx="310" cy="295" r="5" fill="#1D4ED8" />
              <text x="320" y="299" fontSize="8.5" fill="#6b7280">Destination</text>
            </svg>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h2 className="font-semibold text-gray-800 mb-6">Suivi d&apos;avancement</h2>
            <div className="relative pl-8 space-y-6">
              {/* Vertical bar */}
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />

              {timeline.map((step, i) => (
                <div key={i} className="relative">
                  {/* Dot */}
                  <div className={`absolute -left-5 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    step.done
                      ? "bg-[#2E7D32] border-[#2E7D32]"
                      : step.inProgress
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-gray-300"
                  }`}>
                    {step.done && <CheckCircle size={9} className="text-white" />}
                    {step.inProgress && <Clock size={9} className="text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400 w-14 shrink-0">{step.date}</span>
                      <span className={`text-sm font-semibold ${
                        step.done ? "text-gray-800" : step.inProgress ? "text-blue-700" : "text-gray-400"
                      }`}>
                        {step.done ? "✅" : step.inProgress ? "🔵" : "⏳"} {step.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 pl-16">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Documents ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
          <h2 className="font-semibold text-gray-800 mb-4">Documents export</h2>
          <table className="w-full text-xs min-w-[700px]">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Document", "N°", "Émetteur", "Date", "Statut"].map(h => (
                  <th key={h} className="text-left py-2 px-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documents.map((doc, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-medium text-gray-800">{doc.doc}</td>
                  <td className="py-2.5 px-3 font-mono text-gray-500 text-[10px]">{doc.num}</td>
                  <td className="py-2.5 px-3 text-gray-600">{doc.emetteur}</td>
                  <td className="py-2.5 px-3 text-gray-500">{doc.date}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 text-green-700 text-[10px] font-medium">
                      <CheckCircle size={10} /> {doc.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Finances ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 overflow-x-auto">
          <h2 className="font-semibold text-gray-800 mb-4">Conditions financières</h2>
          <table className="w-full text-xs min-w-[480px]">
            <thead>
              <tr className="bg-[#F8FBF8]">
                {["Poste", "Montant (XOF)", "Montant (USD)"].map(h => (
                  <th key={h} className="text-left py-2 px-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {finances.map((f, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 text-gray-700">{f.poste}</td>
                  <td className="py-2.5 px-3 font-medium text-gray-800">{f.xof} XOF</td>
                  <td className="py-2.5 px-3 text-gray-600">{f.usd} USD</td>
                </tr>
              ))}
              {/* Total */}
              <tr className="bg-[#F8FBF8] font-bold">
                <td className="py-3 px-3 text-gray-900">COÛT TOTAL DAP Rotterdam</td>
                <td className="py-3 px-3 text-[#1B5E20]">4 417 800 XOF</td>
                <td className="py-3 px-3 text-[#1B5E20]">6 739 USD</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2.5 px-3 text-gray-600">Valeur facturée (DAP inclus)</td>
                <td className="py-2.5 px-3 text-gray-700">3 695 800 XOF</td>
                <td className="py-2.5 px-3 text-gray-700">5 638 USD</td>
              </tr>
              <tr className="bg-green-50">
                <td className="py-2.5 px-3 font-bold text-gray-900">Marge commerciale nette</td>
                <td className="py-2.5 px-3 font-bold text-[#1B5E20]">3 277 800 XOF</td>
                <td className="py-2.5 px-3 font-bold text-[#1B5E20]">5 001 USD</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-3 italic">
            Le prix DAP est contractuellement fixé à 1 087 XOF/kg (DAP San-Pédro uniquement).
            Le transport San-Pédro→Rotterdam est à la charge d&apos;AGRIFRIK dans ce dossier (arrangement spécial CTR-2025-001 lot #7).
          </p>
        </div>

        {/* ── EU Conformity ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Conformité douanière UE (Rotterdam)</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs min-w-[520px]">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Réglementation UE", "Statut"].map(h => (
                    <th key={h} className="text-left py-2 px-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {conformite.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-medium text-gray-800">{c.regle}</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 text-green-700 text-[10px]">
                        <CheckCircle size={10} /> {c.detail}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EUDR note */}
          <div className="rounded-xl bg-green-50 border border-green-200 p-4">
            <p className="text-xs font-semibold text-green-800 mb-1">Note EUDR — Règlement UE 2023/1115 (anti-déforestation, applicable 2025)</p>
            <p className="text-xs text-green-700 leading-relaxed">
              Ce lot est conforme au règlement EUDR 2023/1115. Preuve de non-déforestation disponible :
              cartographie GPS parcelles (GFW vérifiée), photos satellitaires, données CNRA.
              Disponible sur demande Bureau Veritas.
            </p>
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="flex flex-wrap gap-3 pb-4">
          <Link
            href="/exportation"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} /> Retour aux exportations
          </Link>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#2E7D32] text-white px-4 py-2.5 text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            <Download size={14} /> Télécharger le dossier complet
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 px-4 py-2.5 text-xs font-medium hover:bg-blue-100 transition-colors">
            <ExternalLink size={14} /> Suivi en temps réel Maersk
          </button>
        </div>

      </main>
    </div>
  );
}
