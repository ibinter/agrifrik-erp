import Topbar from "../../../components/Topbar";

export default async function TracabiliteLotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <Topbar
        title={`Fiche Traçabilité — ${id}`}
        breadcrumb={["Commerce", "Traçabilité", `Lot ${id}`]}
      />

      <div className="p-6 space-y-6">

        {/* ── Bandeau en-tête vert ─────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 text-white"
          style={{ background: "linear-gradient(135deg,#1B5E20 0%,#2E7D32 100%)" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-green-200 uppercase tracking-widest">Numéro de lot</p>
              <h1 className="text-2xl font-bold">LOT-2025-046 — Cacao sec Grade AA</h1>
              <p className="text-sm text-green-100">
                Exploitation : <span className="font-semibold text-white">EXP-001</span> — Koffi Amani — Soubré, Nawa
              </p>
              <p className="text-sm text-green-100">
                Parcelles d&apos;origine : <span className="font-semibold text-white">PAR-A1 + PAR-A2</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-sm font-semibold">
                ✅ Chaîne complète vérifiée
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-sm font-semibold">
                Certification : Rainforest Alliance ✅
              </span>
            </div>
          </div>
        </div>

        {/* ── 5 KPI ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Poids net", value: "964 kg", color: "#2E7D32", bg: "#E8F5E9" },
            { label: "De la cabosse à l'export", value: "18 jours", color: "#1565C0", bg: "#E3F2FD" },
            { label: "Score traçabilité", value: "100/100 ✅", color: "#00695C", bg: "#E0F2F1" },
            { label: "Acheteur final", value: "Barry Callebaut CI", color: "#6A1B9A", bg: "#F3E5F5" },
            { label: "Destination finale", value: "Usine BC CI + Rotterdam", color: "#E65100", bg: "#FFF3E0" },
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
              <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">{k.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
            </div>
          ))}
        </div>

        {/* ── Chaîne de traçabilité complète — pipeline SVG ───────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 p-5">
          <h2 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
            Chaîne de traçabilité complète
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Flux du lot LOT-2025-046 — De la parcelle à l&apos;export
          </p>
          <div className="overflow-x-auto">
            <svg
              viewBox="0 0 980 155"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ minWidth: 700 }}
            >
              <defs>
                <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                  <path d="M0,0 L0,7 L7,3.5 z" fill="#4CAF50" />
                </marker>
              </defs>

              {/* Connector lines */}
              {[120, 250, 380, 510, 640, 770].map((x) => (
                <line key={x} x1={x + 2} y1={62} x2={x + 56} y2={62} stroke="#4CAF50" strokeWidth="2" markerEnd="url(#arr)" />
              ))}

              {/* Steps */}
              {[
                { cx: 70,  emoji: "🌿", label1: "Parcelle",       label2: "PAR-A1+A2 (Nawa)",         n: "1" },
                { cx: 200, emoji: "🌰", label1: "Récolte",         label2: "28/06 — 4 220 kg cabosses", n: "2" },
                { cx: 330, emoji: "🫙", label1: "Fermentation",    label2: "28/06–04/07 — Bac F3",      n: "3" },
                { cx: 460, emoji: "☀️", label1: "Séchage",         label2: "04–11/07 — 7 jours",        n: "4" },
                { cx: 590, emoji: "✅", label1: "Contrôle CQ",     label2: "Cut test BV 97%",            n: "5" },
                { cx: 720, emoji: "🏭", label1: "Conditionn.",     label2: "14,83 sacs × 65 kg",        n: "6" },
                { cx: 850, emoji: "🚢", label1: "Export",          label2: "BL MAEU-CI-0908",            n: "7" },
              ].map((s) => (
                <g key={s.n}>
                  <circle cx={s.cx} cy={62} r={40} fill="#2E7D32" />
                  <circle cx={s.cx} cy={62} r={36} fill="#1B5E20" />
                  <text x={s.cx} y={55} textAnchor="middle" dominantBaseline="middle" fontSize="20">{s.emoji}</text>
                  <text x={s.cx} y={74} textAnchor="middle" fontSize="9" fill="#A5D6A7" fontWeight="700">{s.n}</text>
                  <text x={s.cx} y={112} textAnchor="middle" fontSize="10" fill="#1B5E20" fontWeight="700">{s.label1}</text>
                  <text x={s.cx} y={127} textAnchor="middle" fontSize="8.5" fill="#6B7280">{s.label2}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* ── Données parcelles d'origine ─────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Données parcelles d&apos;origine</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                  {["Parcelle", "Surface", "N° GPS", "Âge plants", "Zone RA", "Dernier audit"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { parc: "PAR-A1", surface: "2,3 ha", gps: "5.7819°N 6.5921°W", age: "18 ans", zone: "✅ Zone certifiée", audit: "Fév 2025 ✅" },
                  { parc: "PAR-A2", surface: "2,1 ha", gps: "5.7824°N 6.5918°W", age: "16 ans", zone: "✅ Zone certifiée", audit: "Fév 2025 ✅" },
                ].map((r) => (
                  <tr key={r.parc} className="border-t border-gray-50 dark:border-gray-800">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#2E7D32]">{r.parc}</td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{r.surface}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{r.gps}</td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{r.age}</td>
                    <td className="px-4 py-3 text-xs text-green-700 dark:text-green-400 font-medium">{r.zone}</td>
                    <td className="px-4 py-3 text-xs text-green-700 dark:text-green-400 font-medium">{r.audit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Traitements phytosanitaires */}
          <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
              Historique des traitements phytosanitaires (90 jours avant récolte)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                  {["Date", "Produit", "Dose", "DAR respecté", "Opérateur"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "22/04", produit: "Super Cupravit OB 50 WP", dose: "150g/25L", dar: "67 jours ✅ (DAR 14j)", op: "Ibrahim Sawadogo" },
                  { date: "18/05", produit: "Ridomil Gold 48 WP",       dose: "80g/25L",  dar: "41 jours ✅ (DAR 14j)", op: "Ibrahim Sawadogo" },
                  { date: "02/06", produit: "Super Cupravit OB 50 WP", dose: "150g/25L", dar: "26 jours ✅ (DAR 14j)", op: "Ibrahim Sawadogo" },
                ].map((r, i) => (
                  <tr key={i} className="border-t border-gray-50 dark:border-gray-800">
                    <td className="px-4 py-3 text-xs font-mono text-gray-700 dark:text-gray-300">{r.date}</td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{r.produit}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.dose}</td>
                    <td className="px-4 py-3 text-xs text-green-700 dark:text-green-400 font-medium">{r.dar}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.op}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-green-50 dark:bg-green-900/20 border-t border-green-100 dark:border-green-800">
            <p className="text-xs text-green-700 dark:text-green-300">
              <strong>Note :</strong> Aucun traitement dans les 14 jours précédant la récolte du 28/06. Délai avant récolte (DAR) respecté pour tous les intrants.
            </p>
          </div>
        </div>

        {/* ── Fermentation — données IoT ───────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Fermentation — données IoT (bac F3)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                  {["Jour", "Date", "T° matin", "T° soir", "Retournage", "Observation"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { j: "J1", date: "28/06", mat: "32°C", soir: "38°C", ret: "Non",         obs: "Début fermentation" },
                  { j: "J2", date: "29/06", mat: "44°C", soir: "48°C", ret: "✅ Oui (J2)", obs: "Montée en T° normale" },
                  { j: "J3", date: "30/06", mat: "52°C", soir: "52°C", ret: "—",           obs: "Pic fermentation ✅" },
                  { j: "J4", date: "01/07", mat: "51°C", soir: "50°C", ret: "✅ Oui (J4)", obs: "Descente contrôlée" },
                  { j: "J5", date: "02/07", mat: "47°C", soir: "46°C", ret: "—",           obs: "Phase finale" },
                  { j: "J6", date: "03/07", mat: "42°C", soir: "38°C", ret: "—",           obs: "Fermentation complète" },
                ].map((r) => (
                  <tr key={r.j} className="border-t border-gray-50 dark:border-gray-800">
                    <td className="px-4 py-3 text-xs font-bold text-[#2E7D32]">{r.j}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.date}</td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{r.mat}</td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{r.soir}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.ret}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SVG — courbe T° fermentation */}
          <div className="px-5 pb-5 pt-4 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Courbe T° fermentation LOT-2025-046
            </p>
            <svg viewBox="0 0 660 200" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ maxHeight: 200 }}>
              {/* Grid lines */}
              {[0, 20, 40, 60].map((t) => {
                const y = 20 + ((60 - t) / 60) * 150;
                return (
                  <g key={t}>
                    <line x1={42} y1={y} x2={640} y2={y} stroke="#F3F4F6" strokeWidth="1" />
                    <text x={36} y={y + 4} textAnchor="end" fontSize="9" fill="#9CA3AF">{t}°</text>
                  </g>
                );
              })}
              {/* Optimal zone shading 45–52°C */}
              <rect
                x={42}
                y={20 + ((60 - 52) / 60) * 150}
                width={598}
                height={((52 - 45) / 60) * 150}
                fill="#FFF3E0"
                opacity="0.8"
              />
              {/* Dashed boundary lines */}
              <line x1={42} y1={20 + ((60 - 52) / 60) * 150} x2={640} y2={20 + ((60 - 52) / 60) * 150}
                stroke="#E65100" strokeWidth="1.5" strokeDasharray="5,4" />
              <line x1={42} y1={20 + ((60 - 45) / 60) * 150} x2={640} y2={20 + ((60 - 45) / 60) * 150}
                stroke="#E65100" strokeWidth="1.5" strokeDasharray="5,4" />
              <text x={644} y={20 + ((60 - 48.5) / 60) * 150 + 3} fontSize="8" fill="#E65100">opt.</text>

              {/* Temperature polyline: 32,38,44,48,52,52,51,50,47,46,42,38 */}
              {(() => {
                const temps = [32, 38, 44, 48, 52, 52, 51, 50, 47, 46, 42, 38];
                const xStep = 598 / (temps.length - 1);
                const pts = temps.map((t, i) => ({
                  x: 42 + i * xStep,
                  y: 20 + ((60 - t) / 60) * 150,
                  t,
                  i,
                }));
                const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
                const retournages = new Set([2, 6]); // J2 matin and J4 matin
                return (
                  <>
                    <polyline points={polyline} fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinejoin="round" />
                    {pts.map((p) => (
                      <circle
                        key={p.i}
                        cx={p.x} cy={p.y} r={4}
                        fill={retournages.has(p.i) ? "#DC2626" : "#2E7D32"}
                        stroke="white" strokeWidth="1.5"
                      />
                    ))}
                    {/* Labels at first, peak, and last */}
                    {[0, 4, 7, 11].map((idx) => (
                      <text key={idx} x={pts[idx].x} y={pts[idx].y - 8} textAnchor="middle" fontSize="8.5" fill="#374151" fontWeight="700">
                        {pts[idx].t}°
                      </text>
                    ))}
                  </>
                );
              })()}

              {/* X axis labels */}
              {["J1m","J1s","J2m","J2s","J3m","J3s","J4m","J4s","J5m","J5s","J6m","J6s"].map((lbl, i) => {
                const x = 42 + i * (598 / 11);
                return (
                  <text key={lbl} x={x} y={182} textAnchor="middle" fontSize="8" fill="#9CA3AF">{lbl}</text>
                );
              })}

              {/* Legend */}
              <line x1={42} y1={196} x2={62} y2={196} stroke="#2E7D32" strokeWidth="2.5" />
              <text x={67} y={199} fontSize="8.5" fill="#6B7280">T° fermentation</text>
              <circle cx={175} cy={196} r={4} fill="#DC2626" />
              <text x={182} y={199} fontSize="8.5" fill="#6B7280">Retournage (J2, J4)</text>
              <line x1={300} y1={196} x2={320} y2={196} stroke="#E65100" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x={325} y={199} fontSize="8.5" fill="#6B7280">Zone optimale 45–52°C</text>
            </svg>
          </div>
        </div>

        {/* ── Séchage ─────────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Séchage solaire — données journalières</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                  {["Jour séchage", "Date", "Humidité %", "T° ambiante", "Durée soleil"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { j: "J1", date: "04/07", hum: "42%",      temp: "31°C", soleil: "8h ☀️" },
                  { j: "J2", date: "05/07", hum: "34%",      temp: "32°C", soleil: "9h ☀️" },
                  { j: "J3", date: "06/07", hum: "28%",      temp: "30°C", soleil: "7h (nuageux) ☁️" },
                  { j: "J4", date: "07/07", hum: "22%",      temp: "33°C", soleil: "10h ☀️" },
                  { j: "J5", date: "08/07", hum: "16%",      temp: "32°C", soleil: "9h ☀️" },
                  { j: "J6", date: "09/07", hum: "11%",      temp: "31°C", soleil: "8h ☀️" },
                  { j: "J7", date: "10/07", hum: "7,2% ✅",  temp: "33°C", soleil: "10h ☀️" },
                ].map((r, i) => (
                  <tr
                    key={r.j}
                    className={`border-t border-gray-50 dark:border-gray-800 ${i === 6 ? "bg-green-50 dark:bg-green-900/10" : ""}`}
                  >
                    <td className="px-4 py-3 text-xs font-bold text-[#2E7D32]">{r.j}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.date}</td>
                    <td className={`px-4 py-3 text-xs font-medium ${i === 6 ? "text-green-700 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}`}>
                      {r.hum}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">{r.temp}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.soleil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Certifications & Documents ───────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-gray-900 dark:text-white text-sm">Certifications &amp; Documents du lot</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] dark:bg-gray-800 text-left text-xs text-gray-500 dark:text-gray-400">
                  {["Document", "N°", "Émetteur", "Date", "Statut"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { doc: "Certificat RA (exploitation)",      num: "RA-CI-2025-EFA001",   emit: "Bureau Veritas",        date: "28/02/2025", statut: "✅ Valide" },
                  { doc: "Rapport cut test BV",               num: "CQ-BV-2025-0846",      emit: "Bureau Veritas Soubré", date: "01/07/2025", statut: "✅ 97% AA" },
                  { doc: "Certificat phytosanitaire MINADER", num: "PHYTO-2025-0567",      emit: "MINADER CI",            date: "23/06/2025", statut: "✅" },
                  { doc: "Déclaration douanière DGD",         num: "DGD-2025-NW-0234",     emit: "DGD Abidjan",           date: "22/06/2025", statut: "✅" },
                  { doc: "Connaissement Maersk",              num: "MAEU-CI-0908",         emit: "Maersk CI",             date: "23/06/2025", statut: "✅" },
                  { doc: "Certificat d'origine CEPICI",       num: "CO-2025-0456",         emit: "CEPICI CI",             date: "22/06/2025", statut: "✅" },
                ].map((r, i) => (
                  <tr key={i} className="border-t border-gray-50 dark:border-gray-800">
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300 font-medium">{r.doc}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{r.num}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.emit}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{r.date}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-green-700 dark:text-green-400">{r.statut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3">
          <a
            href="/tracabilite"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            ← Retour à la traçabilité
          </a>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-sm font-medium hover:bg-[#1B5E20] transition-colors">
            Exporter fiche traçabilité PDF
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#2E7D32] text-[#2E7D32] dark:text-green-400 dark:border-green-600 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            QR Code lot
          </button>
        </div>

      </div>
    </div>
  );
}
