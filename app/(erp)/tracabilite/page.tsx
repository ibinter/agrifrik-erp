import Topbar from "../../components/Topbar";
import {
  Search,
  QrCode,
  CheckCircle,
  Clock,
  Leaf,
  Truck,
  FlaskConical,
  Sun,
  ClipboardCheck,
  Warehouse,
  Ship,
  Download,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Timeline data                                                        */
/* ------------------------------------------------------------------ */

const etapes = [
  {
    num: 1,
    label: "Récolte",
    date: "07/06/2025",
    done: true,
    icon: Leaf,
    iconColor: "#2E7D32",
    iconBg: "#E8F5E9",
    details: [
      { key: "Parcelle", value: "PAR-A1 (6,2 ha, Zone Soubré)" },
      { key: "Opérateur", value: "Konan Yao" },
      { key: "Quantité récoltée", value: "3 600 kg cacao brut" },
      { key: "Conditions météo", value: "28°C, ensoleillé" },
    ],
  },
  {
    num: 2,
    label: "Réception au centre de collecte",
    date: "08/06/2025",
    done: true,
    icon: Truck,
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
    details: [
      { key: "Point de collecte", value: "Centre Soubré A" },
      { key: "Contrôle qualité entrée", value: "94% fèves saines, taux humidité 45%" },
      { key: "Pesée", value: "3 580 kg (perte transport : -20 kg)" },
      { key: "Agent réception", value: "Ibrahim Sawadogo" },
    ],
  },
  {
    num: 3,
    label: "Fermentation",
    date: "08/06 → 14/06/2025",
    done: true,
    icon: FlaskConical,
    iconColor: "#6A1B9A",
    iconBg: "#F3E5F5",
    details: [
      { key: "Équipement", value: "Fermenteur A" },
      { key: "Durée", value: "6 jours" },
      { key: "Températures relevées", value: "J1 38°C, J3 48°C, J6 42°C" },
      { key: "Retournements", value: "J2 et J4" },
      { key: "Résultat", value: "96% fèves bien fermentées" },
    ],
  },
  {
    num: 4,
    label: "Séchage",
    date: "14/06 → 21/06/2025",
    done: true,
    icon: Sun,
    iconColor: "#E65100",
    iconBg: "#FFF3E0",
    details: [
      { key: "Équipement", value: "Séchoir solaire A, 7 jours" },
      { key: "Humidité finale", value: "7,5% (norme < 8%)" },
      { key: "Poids après séchage", value: "3 200 kg (perte eau : -380 kg)" },
    ],
  },
  {
    num: 5,
    label: "Contrôle qualité",
    date: "22/06/2025",
    done: true,
    icon: ClipboardCheck,
    iconColor: "#00695C",
    iconBg: "#E0F2F1",
    details: [
      { key: "Laboratoire", value: "CNRA Soubré" },
      { key: "Grade attribué", value: "Grade A" },
      { key: "Humidité", value: "7,5% | Fèves plates : 2% | Défauts : 0,8%" },
      { key: "Certificat N°", value: "QC-2025-082" },
    ],
  },
  {
    num: 6,
    label: "Stockage",
    date: "22/06/2025",
    done: true,
    icon: Warehouse,
    iconColor: "#37474F",
    iconBg: "#ECEFF1",
    details: [
      { key: "Emplacement", value: "Entrepôt A, Zone 2, Palette 14" },
      { key: "Conditions", value: "24°C, HR 65%" },
    ],
  },
  {
    num: 7,
    label: "Export",
    date: "Prévu 20/07/2025",
    done: false,
    icon: Ship,
    iconColor: "#1565C0",
    iconBg: "#E3F2FD",
    details: [
      { key: "Client", value: "BARRY CALLEBAUT France" },
      { key: "Conteneur", value: "HHCU4521387" },
      { key: "Port de départ", value: "Abidjan Port Autonome" },
      { key: "Destination", value: "Rotterdam, Pays-Bas" },
    ],
  },
];

const autresLots = [
  { numero: "LOT-2025-016", produit: "Anacarde décortiqué WW240", date: "06/07" },
  { numero: "LOT-2025-015", produit: "Riz blanchi", date: "04/07" },
  { numero: "LOT-2025-014", produit: "Cacao Grade B séché", date: "01/07" },
  { numero: "LOT-2025-013", produit: "Anacarde brut Grade A", date: "28/06" },
];

/* ------------------------------------------------------------------ */
/* QR code SVG simulé                                                   */
/* ------------------------------------------------------------------ */

function QRCodeSVG() {
  // 21×21 grid — static pattern simulating a QR code
  const size = 21;
  const cell = 8;
  // Seed-based pseudo-random pattern (deterministic)
  function isBlack(r: number, c: number): boolean {
    // Finder patterns (top-left, top-right, bottom-left corners)
    if (r < 7 && c < 7) return !(r === 1 || r === 5) || (c >= 1 && c <= 5 && (r === 1 || r === 5)) || (c === 0 || c === 6);
    if (r < 7 && c > 13) return !(r === 1 || r === 5) || (c >= 15 && c <= 19 && (r === 1 || r === 5)) || (c === 14 || c === 20);
    if (r > 13 && c < 7) return !(r === 15 || r === 19) || (c >= 1 && c <= 5 && (r === 15 || r === 19)) || (c === 0 || c === 6);
    // Timing patterns
    if (r === 6 && c >= 8 && c <= 12) return c % 2 === 0;
    if (c === 6 && r >= 8 && r <= 12) return r % 2 === 0;
    // Data modules — pseudo-random
    const v = (r * 31 + c * 17 + r * c * 7) % 13;
    return v < 6;
  }

  const dim = size * cell;
  const rects: { x: number; y: number }[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isBlack(r, c)) rects.push({ x: c * cell, y: r * cell });
    }
  }

  return (
    <svg
      width={dim}
      height={dim}
      viewBox={`0 0 ${dim} ${dim}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <rect width={dim} height={dim} fill="white" />
      {rects.map(({ x, y }, i) => (
        <rect key={i} x={x} y={y} width={cell} height={cell} fill="#111827" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function TracabilitePage() {
  return (
    <div>
      <Topbar title="Traçabilité" breadcrumb={["Suivi Qualité", "Traçabilité"]} />

      <div className="p-6 space-y-8">
        {/* Barre de recherche */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Rechercher un lot
          </h2>
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-60 flex items-center gap-2 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2.5 bg-gray-50 dark:bg-gray-700">
              <Search size={16} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-400 dark:text-gray-500">
                Rechercher un lot par numéro, produit ou commande...
              </span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <QrCode size={16} />
              Scanner QR Code
            </button>
          </div>
        </div>

        {/* Lot sélectionné + Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-gray-900 dark:text-white bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg">
              LOT-2025-017
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Cacao fermenté séché Grade A — Timeline de traçabilité
            </span>
          </div>

          <div className="p-6">
            <div className="relative">
              {/* Ligne verticale de connexion */}
              <div className="absolute left-5 top-5 bottom-5 w-px bg-gray-200 dark:bg-gray-700" />

              <div className="space-y-0">
                {etapes.map((etape, idx) => {
                  const Icon = etape.icon;
                  const isLast = idx === etapes.length - 1;
                  return (
                    <div key={etape.num} className={`relative flex gap-5 ${isLast ? "" : "pb-6"}`}>
                      {/* Icône */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-white dark:border-gray-800"
                        style={{ backgroundColor: etape.done ? etape.iconBg : "#F3F4F6" }}
                      >
                        <Icon
                          size={18}
                          style={{ color: etape.done ? etape.iconColor : "#9CA3AF" }}
                        />
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                              Étape {etape.num}
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white text-sm">
                              {etape.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {etape.date}
                            </span>
                            {etape.done ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                                <CheckCircle size={11} /> Terminé
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                                <Clock size={11} /> Prévu
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                          {etape.details.map((d) => (
                            <div key={d.key} className="flex gap-1.5 text-xs">
                              <span className="text-gray-500 dark:text-gray-400 shrink-0">{d.key} :</span>
                              <span className="text-gray-800 dark:text-gray-200 font-medium">{d.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Section QR Code + Autres lots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR Code */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 flex flex-col items-center gap-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white self-start">
              QR Code du lot
            </h2>
            <div className="p-4 bg-white rounded-xl border border-gray-200 dark:border-gray-600 inline-block">
              <QRCodeSVG />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono text-center">
              LOT-2025-017 · AGRIFRIK · AGROTEK CI
            </p>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: "#2E7D32" }}
            >
              <Download size={15} />
              Télécharger QR Code
            </button>
          </div>

          {/* Autres lots récents */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Autres lots récents
              </h2>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {autresLots.map((lot) => (
                <button
                  key={lot.numero}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors text-left group"
                >
                  <div>
                    <p className="font-mono text-xs font-semibold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                      {lot.numero}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{lot.produit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{lot.date}</span>
                    <ChevronRight size={15} className="text-gray-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
