"use client";

import { useState } from "react";
import Topbar from "../../components/Topbar";

const ACTIVITE = [
  { time: "11/07 11:42", user: "Ibrahim Sawadogo", icon: "✏️", action: "Modifié lot LOT-2025-048 (fermentation J5)", module: "Transformation", moduleColor: "bg-amber-100 text-amber-700" },
  { time: "11/07 11:38", user: "Adjoua Messou", icon: "📄", action: "Créé rapport CQ-LOT-047", module: "Qualité", moduleColor: "bg-blue-100 text-blue-700" },
  { time: "11/07 11:15", user: "Admin", icon: "🔐", action: "Connexion réussie — IP: 41.204.65.22 (Soubré)", module: "Auth", moduleColor: "bg-green-100 text-green-700" },
  { time: "11/07 10:52", user: "Konan Yao", icon: "📍", action: "Mise à jour cartographie PAR-A1 (GPS)", module: "Cartographie", moduleColor: "bg-purple-100 text-purple-700" },
  { time: "11/07 10:44", user: "Ibrahim Sawadogo", icon: "➕", action: 'Créé tâche "Traitement Ridomil PAR-B1"', module: "Tâches", moduleColor: "bg-indigo-100 text-indigo-700" },
  { time: "11/07 10:31", user: "Bamba Oumar", icon: "📦", action: "BC ACH-2025-091 émis (335 120 XOF)", module: "Achats", moduleColor: "bg-orange-100 text-orange-700" },
  { time: "11/07 10:18", user: "Admin", icon: "👤", action: 'Utilisateur "Fanta Koné" réactivé', module: "Admin", moduleColor: "bg-gray-100 text-gray-700" },
  { time: "11/07 09:55", user: "Adjoua Messou", icon: "📊", action: 'Rapport "KPI Qualité Juillet" généré', module: "Rapports", moduleColor: "bg-teal-100 text-teal-700" },
  { time: "11/07 09:42", user: "Ibrahim Sawadogo", icon: "🌡️", action: "Température fermentation J4 enregistrée: 52°C", module: "Transformation", moduleColor: "bg-amber-100 text-amber-700" },
  { time: "11/07 09:30", user: "Admin", icon: "⚙️", action: "Paramètres SMTP mis à jour", module: "Paramètres", moduleColor: "bg-gray-100 text-gray-700" },
  { time: "11/07 09:12", user: "Konan Yao", icon: "🌱", action: "Parcelle PAR-C2 : traitement phytosanitaire validé", module: "Cultures", moduleColor: "bg-green-100 text-green-700" },
  { time: "11/07 08:58", user: "Bamba Oumar", icon: "🚚", action: "Réception livraison LIV-2025-034 (NPK 800 kg)", module: "Stocks", moduleColor: "bg-blue-100 text-blue-700" },
  { time: "11/07 08:45", user: "Ibrahim Sawadogo", icon: "✏️", action: "Lot LOT-2025-047 : fermentation J3 — pH 5,2", module: "Transformation", moduleColor: "bg-amber-100 text-amber-700" },
  { time: "11/07 08:30", user: "Admin", icon: "🔐", action: "Connexion réussie — IP: 41.204.65.22 (Soubré)", module: "Auth", moduleColor: "bg-green-100 text-green-700" },
  { time: "11/07 08:15", user: "Adjoua Messou", icon: "✅", action: "Contrôle qualité LOT-2025-045 : Grade AA validé", module: "Qualité", moduleColor: "bg-blue-100 text-blue-700" },
  { time: "10/07 17:48", user: "Konan Yao", icon: "📋", action: "Planning cultural Sem 28 soumis pour validation", module: "Planning", moduleColor: "bg-purple-100 text-purple-700" },
  { time: "10/07 16:30", user: "Bamba Oumar", icon: "💰", action: "Devis DEV-2025-012 envoyé à ECOM Côte d'Ivoire", module: "Commerce", moduleColor: "bg-orange-100 text-orange-700" },
  { time: "10/07 15:22", user: "Ibrahim Sawadogo", icon: "➕", action: "Nouveau lot LOT-2025-049 créé (12 400 kg cacao)", module: "Transformation", moduleColor: "bg-amber-100 text-amber-700" },
  { time: "10/07 14:10", user: "Admin", icon: "👥", action: "Formation RH : 8 agents inscrits (Juillet 2025)", module: "RH", moduleColor: "bg-pink-100 text-pink-700" },
  { time: "10/07 13:05", user: "Adjoua Messou", icon: "🔬", action: "Analyse taux humidité : lot 047 → 7,8% (conforme)", module: "Qualité", moduleColor: "bg-blue-100 text-blue-700" },
  { time: "10/07 11:58", user: "Konan Yao", icon: "🗺️", action: "Boundary PAR-D1 mis à jour (ajout 2,3 ha)", module: "Cartographie", moduleColor: "bg-purple-100 text-purple-700" },
  { time: "10/07 10:44", user: "Bamba Oumar", icon: "📦", action: "Sortie stock INT-GAZ : 80 L (machine irrigation)", module: "Stocks", moduleColor: "bg-blue-100 text-blue-700" },
  { time: "10/07 09:30", user: "Ibrahim Sawadogo", icon: "🌡️", action: "Température fermentation J2 lot 048 : 48°C", module: "Transformation", moduleColor: "bg-amber-100 text-amber-700" },
  { time: "10/07 08:15", user: "Admin", icon: "📧", action: "Notification alerte météo : pluies prévues 12-13/07", module: "Alertes", moduleColor: "bg-red-100 text-red-700" },
  { time: "09/07 17:00", user: "Adjoua Messou", icon: "📄", action: "Rapport mensuel Juin 2025 finalisé et archivé", module: "Rapports", moduleColor: "bg-teal-100 text-teal-700" },
  { time: "09/07 15:30", user: "Konan Yao", icon: "✏️", action: "Fiche parcelle PAR-B3 : densité replantation 1 100 p/ha", module: "Cultures", moduleColor: "bg-green-100 text-green-700" },
  { time: "09/07 14:00", user: "Bamba Oumar", icon: "🧾", action: "Facture FAC-2025-028 émise (SCOPA — 4 800 kg cacao)", module: "Factures", moduleColor: "bg-orange-100 text-orange-700" },
  { time: "09/07 12:30", user: "Ibrahim Sawadogo", icon: "➕", action: "Tâche tri manuel cacao créée — lot 046", module: "Tâches", moduleColor: "bg-indigo-100 text-indigo-700" },
  { time: "09/07 10:00", user: "Admin", icon: "⚙️", action: "Mise à jour système AGRIFRIK v2.4.1 appliquée", module: "Admin", moduleColor: "bg-gray-100 text-gray-700" },
  { time: "09/07 08:30", user: "Adjoua Messou", icon: "🔐", action: "Connexion réussie — IP: 41.204.65.xx (Soubré)", module: "Auth", moduleColor: "bg-green-100 text-green-700" },
];

const SECURITE_ALERTES = [
  { date: "10/07 23:14", niveau: "warning", levelLabel: "Attention", event: "Tentative connexion échouée (2×) — admin@agrifrik.com", ip: "185.142.x.x (Paris)", action: "Bloqué après 3e échec" },
  { date: "08/07 14:22", niveau: "info", levelLabel: "Info", event: "Nouvelle session — Mobile (Android)", ip: "41.204.65.xx (Abidjan)", action: "OK" },
  { date: "06/07 08:15", niveau: "info", levelLabel: "Info", event: "Connexion depuis IP inconnue — Konan Y.", ip: "154.72.x.x (Yamoussoukro)", action: "Validé par SMS" },
  { date: "01/07 00:00", niveau: "warning", levelLabel: "Attention", event: "Export base de données (backup automatique)", ip: "Système", action: "OK" },
  { date: "28/06 16:40", niveau: "info", levelLabel: "Info", event: "Activation 2FA — Adjoua Messou", ip: "Système", action: "Activé ✅" },
];

const SESSIONS_ACTIVES = [
  { user: "Ibrahim Sawadogo", device: "Mobile Android", ip: "41.204.x.x", depuis: "09h15", loc: "Soubré" },
  { user: "Adjoua Messou", device: "Chrome — Desktop", ip: "41.204.x.x", depuis: "09h32", loc: "Soubré" },
  { user: "Konan Yao", device: "Chrome — Desktop", ip: "41.206.x.x", depuis: "09h48", loc: "Gagnoa" },
  { user: "Admin (vous)", device: "Chrome — Desktop", ip: "41.204.x.x", depuis: "Actuel", loc: "Soubré" },
];

const ERREURS = [
  {
    date: "11/07 10:04",
    niveau: "error",
    module: "Météo API",
    message: "OpenWeatherMap: Rate limit atteint (1 000/h)",
    stack: "HTTP 429",
    statut: "warning",
    statutLabel: "En cours — Quota reset à 11h00",
  },
  {
    date: "10/07 22:00",
    niveau: "warning",
    module: "Backup",
    message: "Backup nocturne : 4 048 Mo — 98% espace disque Supabase",
    stack: "—",
    statut: "warning",
    statutLabel: "À surveiller",
  },
  {
    date: "09/07 14:22",
    niveau: "error",
    module: "Sync BICICI",
    message: "Timeout connexion API Open Banking (30s)",
    stack: "NET_ERR_TIMEOUT",
    statut: "ok",
    statutLabel: "Résolu auto à 14:24",
  },
];

// SVG sparkline for error chart
function ErrorSparkline() {
  const data = [0, 1, 0, 0, 2, 1, 0, 0, 1, 0, 3, 1, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 1, 0, 2, 0, 1, 1, 0, 0];
  const W = 360, H = 80, PX = 12, PY = 10;
  const max = Math.max(...data);
  const step = (W - PX * 2) / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = PX + i * step;
    const y = PY + (H - PY * 2) * (1 - v / max);
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm">
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke="#EF4444"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {data.map((v, i) => v > 0 && (
        <circle
          key={i}
          cx={PX + i * step}
          cy={PY + (H - PY * 2) * (1 - v / max)}
          r={3}
          fill="#EF4444"
        />
      ))}
      <line x1={PX} y1={H - PY} x2={W - PX} y2={H - PY} stroke="#E5E7EB" strokeWidth={1} />
      <text x={PX} y={H - 2} fontSize={8} fill="#9CA3AF">J-30</text>
      <text x={W - PX} y={H - 2} textAnchor="end" fontSize={8} fill="#9CA3AF">Aujourd&apos;hui</text>
    </svg>
  );
}

export default function LogsPage() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState("Tous");
  const [filterModule, setFilterModule] = useState("Tous");

  const tabs = ["Activité", "Sécurité", "Erreurs"];

  const users = ["Tous", ...Array.from(new Set(ACTIVITE.map((a) => a.user)))];
  const modules = ["Tous", ...Array.from(new Set(ACTIVITE.map((a) => a.module)))];

  const filteredActivite = ACTIVITE.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = a.action.toLowerCase().includes(q) || a.user.toLowerCase().includes(q);
    const matchUser = filterUser === "Tous" || a.user === filterUser;
    const matchModule = filterModule === "Tous" || a.module === filterModule;
    return matchSearch && matchUser && matchModule;
  });

  return (
    <div className="min-h-screen bg-[#F8FBF8]">
      <Topbar breadcrumb={["Admin", "Journaux système"]} />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Journal d&apos;activité et de sécurité</h1>
            <p className="text-sm text-gray-500 mt-0.5">Traçabilité complète des actions système et utilisateurs</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-3 py-1.5 hover:bg-[#1B5E20] transition-colors">
              Télécharger les logs (CSV)
            </button>
            <button className="border border-red-200 text-red-600 rounded-xl text-xs font-medium px-3 py-1.5 hover:bg-red-50 transition-colors">
              Effacer les logs &gt; 90j
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                tab === i ? "bg-[#2E7D32] text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* TAB 0 — Activité */}
        {tab === 0 && (
          <div className="space-y-4">
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Actions aujourd'hui", value: "284", color: "text-[#2E7D32]" },
                { label: "Modules actifs", value: "5", color: "text-blue-700" },
                { label: "Utilisateurs connectés", value: "4", color: "text-purple-700" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-3 items-center">
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#2E7D32] w-48"
              />
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#2E7D32]"
              >
                {users.map((u) => <option key={u}>{u}</option>)}
              </select>
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#2E7D32]"
              >
                {modules.map((m) => <option key={m}>{m}</option>)}
              </select>
              <span className="text-xs text-gray-500">{filteredActivite.length} entrées</span>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 space-y-0">
              {filteredActivite.map((a, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                      {a.icon}
                    </div>
                    {i < filteredActivite.length - 1 && (
                      <div className="w-px flex-1 bg-gray-100 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex flex-wrap items-start gap-2">
                      <span className="text-xs text-gray-400 whitespace-nowrap mt-0.5">{a.time}</span>
                      <span className="text-xs font-semibold text-gray-800">{a.user}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.moduleColor}`}>{a.module}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{a.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1 — Sécurité */}
        {tab === 1 && (
          <div className="space-y-5">
            {/* Résumé */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Sessions actives", value: "4", color: "text-[#2E7D32]" },
                { label: "Dernière activité suspecte", value: "10/07 (bloquée)", color: "text-amber-600" },
                { label: "2FA activé", value: "12/15 utilisateurs (80%)", color: "text-blue-700" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-gray-100 bg-white p-4">
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className={`text-sm font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Alertes sécurité */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Alertes de sécurité récentes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Date", "Niveau", "Événement", "IP", "Action"].map((h) => (
                        <th key={h} className="py-2.5 px-3 text-left text-gray-500 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SECURITE_ALERTES.map((a, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap">{a.date}</td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            a.niveau === "warning" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                          }`}>
                            {a.niveau === "warning" ? "🟡" : "🟢"} {a.levelLabel}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-800">{a.event}</td>
                        <td className="py-2.5 px-3 text-gray-500 font-mono">{a.ip}</td>
                        <td className="py-2.5 px-3 text-gray-600">{a.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sessions actives */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">Sessions actives</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Utilisateur", "Appareil", "IP", "Connecté depuis", "Localisation"].map((h) => (
                        <th key={h} className="py-2.5 px-3 text-left text-gray-500 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SESSIONS_ACTIVES.map((s, i) => (
                      <tr key={i} className={`border-t border-gray-50 hover:bg-gray-50 ${s.user.includes("(vous)") ? "bg-green-50" : ""}`}>
                        <td className="py-2.5 px-3 font-semibold text-gray-800">{s.user}</td>
                        <td className="py-2.5 px-3 text-gray-600">{s.device}</td>
                        <td className="py-2.5 px-3 text-gray-500 font-mono">{s.ip}</td>
                        <td className="py-2.5 px-3 text-gray-600">{s.depuis}</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                            {s.loc}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 — Erreurs */}
        {tab === 2 && (
          <div className="space-y-5">
            {/* Erreurs actives */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">
                Erreurs actives
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">{ERREURS.length}</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["Date", "Niveau", "Module", "Message", "Stack / Code", "Statut"].map((h) => (
                        <th key={h} className="py-2.5 px-3 text-left text-gray-500 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ERREURS.map((e, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="py-2.5 px-3 text-gray-600 whitespace-nowrap">{e.date}</td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            e.niveau === "error" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {e.niveau === "error" ? "🔴" : "🟡"} {e.niveau === "error" ? "Erreur" : "Warning"}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-gray-800">{e.module}</td>
                        <td className="py-2.5 px-3 text-gray-700 max-w-xs">{e.message}</td>
                        <td className="py-2.5 px-3 font-mono text-gray-500">{e.stack}</td>
                        <td className="py-2.5 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            e.statut === "ok" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {e.statut === "ok" ? "✅" : "⚠️"} {e.statutLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sparkline erreurs */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">Métriques d&apos;erreurs — 30 derniers jours</h2>
              <p className="text-xs text-gray-500 mb-4">Max 3/jour — Moyenne 0,4 erreurs/jour</p>
              <ErrorSparkline />
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3">
              <button className="bg-[#2E7D32] text-white rounded-xl text-xs font-medium px-4 py-2 hover:bg-[#1B5E20] transition-colors">
                Télécharger les logs (CSV)
              </button>
              <button className="border border-red-200 text-red-600 rounded-xl text-xs font-medium px-4 py-2 hover:bg-red-50 transition-colors">
                Effacer les logs &gt; 90j
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
