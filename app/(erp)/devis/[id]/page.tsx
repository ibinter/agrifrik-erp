import Topbar from "../../../components/Topbar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DevisDetailPage({ params }: Props) {
  const { id } = await params;

  const lignes = [
    { num: 1, designation: "Cacao sec Grade AA (≥95% fèves brunes, ≤8% humidité)", qte: "5 000", pu: "1 100 XOF/kg", montant: "5 500 000 XOF", opt: false },
    { num: 2, designation: "Cacao sec Grade A (90-95% fèves brunes, ≤8% humidité)", qte: "3 000", pu: "1 053 XOF/kg", montant: "3 160 000 XOF", opt: false },
    { num: 3, designation: "Prime Rainforest Alliance (incluse dans prix unitaires)", qte: "—", pu: "—", montant: "Incluse ✅", opt: false },
    { num: 4, designation: "Transport plantation → entrepôt San-Pédro (optionnel)", qte: "forfait", pu: "100 XOF/kg", montant: "800 000 XOF", opt: true },
  ];

  const conditions = [
    ["Incoterm proposé", "DAP San-Pédro (Delivered At Place)"],
    ["Qualité", "Grade AA ≥95% brunes / Grade A 90-94% — cut test certifié BV ou SGS"],
    ["Certification", "Rainforest Alliance RA-CI-2025-EFA001 (valide jusqu'au 28/02/2026)"],
    ["Traçabilité", "Chaîne de contrôle masse (COC) AGRIFRIK → lot par lot"],
    ["Humidité maximale", "≤8% à la livraison (certifié humidimètre + contre-expertise acheteur)"],
    ["Délai de production", "45 jours après signature (campagne intermédiaire août)"],
    ["Paiement", "LC irrévocable SGBCI — 30% à la commande, 70% à la livraison"],
    ["Validité devis", "30 jours à compter du 10/07/2025"],
  ];

  const prixMarche = [
    { ref: "BCC Abidjan 10/07/2025", prix: "1 087 XOF/kg", ecart: "-8 XOF/kg (notre prix +0,7%)", pos: "neutre" },
    { ref: "ICE Futures London (équivalent)", prix: "1 112 XOF/kg", ecart: "+17 XOF/kg", pos: "pos" },
    { ref: "Prix contractuel Barry Callebaut", prix: "1 087 XOF/kg", ecart: "-8 XOF/kg", pos: "neutre" },
    { ref: "Notre proposition OLAM", prix: "1 095 XOF/kg", ecart: "Base", pos: "base" },
  ];

  const timeline = [
    { date: "08/07/2025", texte: "OLAM Cocoa CI prend contact (email commercial)", done: true },
    { date: "09/07/2025", texte: "Réunion téléphonique : volumes, qualité, délais discutés", done: true },
    { date: "10/07/2025", texte: "DEV-2025-003 émis et envoyé par email à contact OLAM", done: true, highlight: true },
    { date: "⏳ En attente", texte: "Validation OLAM (délai estimé : 5-10 jours ouvrés)", done: false },
    { date: "(prévu) Août 2025", texte: "Signature contrat → lancement production", done: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Commerce", "Devis", `Devis ${id}`]} />

      <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* ── EN-TÊTE BLEU ── */}
        <div className="rounded-2xl text-white p-6" style={{ backgroundColor: "#1565C0" }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-2xl font-bold">DEV-2025-003</span>
                <span className="inline-flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#1976D2" }}>
                  🔵 En attente validation client
                </span>
              </div>
              <p className="text-blue-200 text-sm font-semibold">OLAM Cocoa CI — acheteur international</p>
              <p className="text-blue-100 text-xs">Fourniture cacao Grade AA/A — Campagne intermédiaire août-novembre 2025</p>
              <p className="text-blue-200 text-xs">Commercial : <span className="text-white font-medium">Koffi Amani</span></p>
            </div>
            <div className="text-sm text-blue-200 space-y-1 text-right">
              <p><span className="text-blue-300">Date émission :</span> <span className="text-white font-medium">10/07/2025</span></p>
              <p><span className="text-blue-300">Validité :</span> <span className="text-white font-medium">30 jours</span></p>
              <p><span className="text-blue-300">Expire le :</span> <span className="text-white font-medium">09/08/2025</span></p>
            </div>
          </div>
        </div>

        {/* ── 4 KPI ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Volume proposé", value: "8 000 kg", sub: "8 tonnes" },
            { label: "Prix proposé", value: "1 095 XOF/kg", sub: "dont prime RA +25 XOF" },
            { label: "Montant total", value: "8 760 000 XOF", sub: "" },
            { label: "Délai livraison", value: "45 jours", sub: "après signature" },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl border border-gray-100 bg-white p-5">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className="text-sm font-bold text-[#1565C0] leading-tight">{k.value}</p>
              {k.sub && <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>}
            </div>
          ))}
        </div>

        {/* ── DÉTAIL DU DEVIS ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1565C0] mb-4">Détail du devis</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["#", "Désignation", "Qté (kg)", "Prix unitaire", "Montant"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lignes.map((r) => (
                  <tr key={r.num} className={`border-t border-gray-50 hover:bg-[#F8FBF8] transition-colors ${r.opt ? "opacity-70" : ""}`}>
                    <td className="px-3 py-2.5 text-gray-500 font-medium">{r.num}</td>
                    <td className="px-3 py-2.5 text-gray-800">
                      {r.designation}
                      {r.opt && <span className="ml-2 text-[10px] bg-[#FFF3E0] text-[#E65100] px-1.5 py-0.5 rounded-full font-medium">option</span>}
                    </td>
                    <td className="px-3 py-2.5 text-gray-700">{r.qte}</td>
                    <td className="px-3 py-2.5 text-gray-700">{r.pu}</td>
                    <td className="px-3 py-2.5 text-gray-700">{r.montant}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-[#1565C0] bg-[#E3F2FD]">
                  <td colSpan={2} className="px-3 py-2.5 font-bold text-[#1565C0]">TOTAL HT (sans transport)</td>
                  <td className="px-3 py-2.5 font-bold text-[#1565C0]">8 000 kg</td>
                  <td className="px-3 py-2.5 font-bold text-[#1565C0]">1 095 XOF/kg moy.</td>
                  <td className="px-3 py-2.5 font-bold text-[#1565C0]">8 660 000 XOF</td>
                </tr>
                <tr className="border-t border-blue-100 bg-[#F8FBFF]">
                  <td colSpan={4} className="px-3 py-2 text-gray-600">TOTAL HT (avec transport)</td>
                  <td className="px-3 py-2 font-semibold text-gray-700">9 460 000 XOF</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td colSpan={4} className="px-3 py-2 text-gray-500 text-[10px]">TVA : Exonéré (exportation produit agricole brut — art. 344 CGI-CI)</td>
                  <td className="px-3 py-2 text-gray-500 text-[10px]">0 XOF</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── CONDITIONS GÉNÉRALES ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1565C0] mb-4">Conditions générales du devis</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  <th className="text-left px-3 py-2 font-semibold text-gray-600 w-1/3">Condition</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600">Détail</th>
                </tr>
              </thead>
              <tbody>
                {conditions.map(([cond, detail], i) => (
                  <tr key={i} className="border-t border-gray-50">
                    <td className="px-3 py-2.5 font-medium text-gray-700">{cond}</td>
                    <td className="px-3 py-2.5 text-gray-600">{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── COMPARAISON PRIX MARCHÉ ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1565C0] mb-4">Comparaison prix marché</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#F8FBF8]">
                  {["Référence", "Prix / kg", "Écart vs DEV-2025-003"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {prixMarche.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-t border-gray-50 ${r.pos === "base" ? "bg-[#E3F2FD]" : "hover:bg-[#F8FBF8]"} transition-colors`}
                  >
                    <td className={`px-3 py-2.5 ${r.pos === "base" ? "font-bold text-[#1565C0]" : "text-gray-700"}`}>{r.ref}</td>
                    <td className={`px-3 py-2.5 font-medium ${r.pos === "base" ? "text-[#1565C0]" : "text-gray-700"}`}>{r.prix}</td>
                    <td className={`px-3 py-2.5 ${r.pos === "pos" ? "text-[#2E7D32]" : r.pos === "base" ? "text-[#1565C0] font-bold" : "text-gray-500"}`}>{r.ecart}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* note verte */}
          <div className="rounded-xl px-4 py-3 text-xs bg-[#E8F5E9] border-l-4 border-[#4CAF50] text-[#1B5E20]">
            Notre prix intègre la prime RA (+25 XOF/kg) et reste inférieur de 1,5% au cours ICE, ce qui offre une marge commerciale intéressante à OLAM.
          </div>
        </div>

        {/* ── HISTORIQUE ET SUIVI — Timeline ── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5">
          <h2 className="text-sm font-semibold text-[#1565C0] mb-5">Historique et suivi</h2>
          <div className="relative pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
            {timeline.map((evt, i) => (
              <div key={i} className="relative mb-5 last:mb-0">
                <div className={`absolute -left-5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  evt.done ? "bg-[#1565C0] border-[#1565C0]" : "bg-white border-gray-300"
                }`}>
                  {evt.done && (
                    <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <span className={`text-xs font-semibold ${evt.done ? "text-[#1565C0]" : "text-gray-400"}`}>{evt.date}</span>
                  <p className={`text-xs mt-0.5 ${evt.highlight ? "font-semibold text-[#1565C0]" : evt.done ? "text-gray-700" : "text-gray-400"}`}>
                    {evt.highlight ? <span>★ </span> : null}{evt.texte}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOUTONS ── */}
        <div className="flex flex-wrap gap-3 pb-6">
          <a
            href="/devis"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux devis
          </a>
          <button className="inline-flex items-center gap-2 bg-[#1565C0] text-white rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-[#1976D2] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Convertir en contrat
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Envoyer rappel client
          </button>
          <button className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-medium px-4 py-2.5 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 17H7a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2zm-5-9V4" />
            </svg>
            Imprimer
          </button>
        </div>

      </main>
    </div>
  );
}
