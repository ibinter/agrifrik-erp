import Topbar from "../../components/Topbar";
import {
  Scan,
  Wheat,
  Package,
  Thermometer,
  CheckCircle2,
  Circle,
  AlertTriangle,
  CloudSun,
  Droplets,
  Wind,
  Phone,
  TriangleAlert,
  ShoppingBasket,
} from "lucide-react";

// ─── Données statiques ────────────────────────────────────────────────────────

const TACHES = [
  {
    id: 1,
    label: "Inspection parcelle A3",
    statut: "fait",
    heure: "09:15",
  },
  {
    id: 2,
    label: "Taille entretien PAR-A1",
    statut: "planifie",
    heure: "14:00",
  },
  {
    id: 3,
    label: "Rapport fin de journée",
    statut: "planifie",
    heure: "18:00",
  },
];

const ALERTES = [
  {
    id: 1,
    niveau: "critique",
    texte: "Stock KCl engrais potassique : 45 kg (seuil 50 kg)",
    badge: "Stock",
  },
  {
    id: 2,
    niveau: "warning",
    texte: "Pluies prévues J+3 (25-30mm) — prévoir couverture séchoir A",
    badge: "Météo",
  },
  {
    id: 3,
    niveau: "warning",
    texte: "Police ASS-2025-004 (Matériels) expirée — contacter SUNU",
    badge: "Assurance",
  },
];

const ACTIONS_RAPIDES = [
  {
    icon: Phone,
    label: "Appeler le superviseur",
    href: "tel:+2250000000000",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: TriangleAlert,
    label: "Signaler un problème",
    href: "/taches",
    color: "bg-red-600 hover:bg-red-700",
  },
  {
    icon: ShoppingBasket,
    label: "Demander des intrants",
    href: "/intrants",
    color: "bg-amber-600 hover:bg-amber-700",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardMobilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Dashboard Terrain" breadcrumb={["Dashboard Mobile"]} />

      <main className="p-4 max-w-lg mx-auto space-y-5 pb-24">

        {/* ── Bandeau Mode Terrain ── */}
        <div className="bg-[#2E7D32] text-white rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse shrink-0" />
            <span className="text-sm font-semibold">Mode Terrain activé</span>
            <span className="text-green-200 text-xs hidden sm:inline">· GPS : Soubré Zone A</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-green-100 shrink-0">
            <span>31°C ☀️</span>
          </div>
        </div>

        {/* ── GPS zone (mobile) ── */}
        <p className="text-xs text-gray-500 text-center -mt-2 sm:hidden">
          GPS : Soubré Zone A
        </p>

        {/* ── 4 grandes tuiles tactiles 2×2 ── */}
        <div className="grid grid-cols-2 gap-3">
          <TileAction
            icon={<Scan size={28} />}
            label="Scanner Lot"
            href="/tracabilite"
            color="bg-violet-600"
          />
          <TileAction
            icon={<Wheat size={28} />}
            label="Saisir récolte"
            href="/cultures"
            color="bg-amber-500"
          />
          <TileAction
            icon={<Package size={28} />}
            label="Mouvement stock"
            href="/stocks"
            color="bg-blue-600"
          />
          <TileAction
            icon={<Thermometer size={28} />}
            label="Relevé météo"
            href="/meteo"
            color="bg-teal-600"
          />
        </div>

        {/* ── Mes tâches du jour ── */}
        <section>
          <h2 className="text-sm font-bold text-gray-700 mb-2.5">Mes tâches du jour</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
            {TACHES.map((t) => (
              <div key={t.id} className="flex items-center gap-3 px-4 py-3.5">
                {t.statut === "fait" ? (
                  <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                ) : (
                  <Circle size={18} className="text-blue-400 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium leading-tight ${t.statut === "fait" ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {t.label}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  t.statut === "fait"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {t.statut === "fait" ? `fait · ${t.heure}` : `planifiée · ${t.heure}`}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Alertes actives ── */}
        <section>
          <h2 className="text-sm font-bold text-gray-700 mb-2.5">Alertes actives</h2>
          <div className="space-y-2">
            {ALERTES.map((a) => (
              <div
                key={a.id}
                className={`flex items-start gap-3 px-4 py-3 rounded-2xl border-l-4 ${
                  a.niveau === "critique"
                    ? "bg-red-50 border-l-red-500"
                    : "bg-yellow-50 border-l-yellow-400"
                }`}
              >
                <AlertTriangle
                  size={16}
                  className={`shrink-0 mt-0.5 ${a.niveau === "critique" ? "text-red-500" : "text-yellow-500"}`}
                />
                <p className="text-xs text-gray-700 flex-1 leading-relaxed">{a.texte}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  a.niveau === "critique"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {a.badge}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Dernier relevé météo ── */}
        <section>
          <h2 className="text-sm font-bold text-gray-700 mb-2.5">Météo · Soubré</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <CloudSun size={28} className="text-amber-400 shrink-0" />
              <div>
                <p className="text-2xl font-extrabold text-gray-900">31°C</p>
                <p className="text-xs text-gray-400">Ensoleillé — Soubré Zone A</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs font-semibold text-blue-600">🌧️ Pluie J+3</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <MeteoItem icon={<Droplets size={14} className="text-blue-400" />} label="Humidité" value="78%" />
              <MeteoItem icon={<Wind size={14} className="text-gray-400" />} label="Vent" value="12 km/h" />
              <MeteoItem icon={<CloudSun size={14} className="text-amber-400" />} label="Prévision" value="J+3 : pluie" />
            </div>
          </div>
        </section>

        {/* ── Actions rapides ── */}
        <section>
          <h2 className="text-sm font-bold text-gray-700 mb-2.5">Actions rapides</h2>
          <div className="space-y-2.5">
            {ACTIONS_RAPIDES.map((a) => {
              const Icon = a.icon;
              return (
                <a
                  key={a.label}
                  href={a.href}
                  className={`flex items-center gap-4 ${a.color} text-white rounded-2xl px-5 py-4 font-semibold text-sm transition-colors active:scale-95 shadow-sm`}
                >
                  <Icon size={20} className="shrink-0" />
                  {a.label}
                </a>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}

// ─── Composants locaux ────────────────────────────────────────────────────────

function TileAction({
  icon,
  label,
  href,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      className={`${color} text-white rounded-2xl h-32 flex flex-col items-center justify-center gap-3 shadow-sm active:scale-95 transition-transform hover:opacity-90`}
    >
      {icon}
      <span className="text-sm font-bold text-center leading-tight px-2">{label}</span>
    </a>
  );
}

function MeteoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl px-3 py-2.5 flex flex-col items-center gap-1">
      {icon}
      <p className="text-[10px] text-gray-400">{label}</p>
      <p className="text-xs font-bold text-gray-700">{value}</p>
    </div>
  );
}
