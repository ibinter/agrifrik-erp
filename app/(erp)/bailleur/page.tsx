import Topbar from "../../components/Topbar";
import {
  Download,
  Mail,
  Users,
  Leaf,
  TrendingUp,
  Wind,
  UserCheck,
  BookOpen,
  CheckCircle,
  Circle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ImpactCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  bg: string;
  text: string;
}

interface OddRow {
  odd: string;
  indicateur: string;
  baseline: string;
  realise: string;
  objectif: string;
  taux: number;
}

interface Decaissement {
  date: string;
  montant: string;
  usage: string;
  justificatif: string;
}

interface Action {
  action: string;
  responsable: string;
  echeance: string;
  budget: string;
}

// ─── Données ──────────────────────────────────────────────────────────────────

const impactCards: ImpactCard[] = [
  {
    icon: <Users size={22} />,
    label: "Emplois créés / maintenus",
    value: "287 emplois directs",
    sub: "+12 saisonniers",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  {
    icon: <Leaf size={22} />,
    label: "Agriculture durable",
    value: "89 ha certifiés RA",
    sub: "143 ha total — 62%",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  {
    icon: <TrendingUp size={22} />,
    label: "Revenus producteurs",
    value: "+34% vs baseline",
    sub: "Baseline 2022",
    bg: "bg-teal-50",
    text: "text-teal-700",
  },
  {
    icon: <Wind size={22} />,
    label: "Émissions CO2 évitées",
    value: "248 t CO2eq",
    sub: "Estimation S1 2025",
    bg: "bg-sky-50",
    text: "text-sky-700",
  },
  {
    icon: <UserCheck size={22} />,
    label: "Femmes dans la chaîne",
    value: "38% des employés",
    sub: "42% membres coopérative",
    bg: "bg-purple-50",
    text: "text-purple-700",
  },
  {
    icon: <BookOpen size={22} />,
    label: "Bénéficiaires formations",
    value: "145 personnes",
    sub: "Formées en 2025",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
];

const oddRows: OddRow[] = [
  {
    odd: "ODD 1 — Fin de la pauvreté",
    indicateur: "Revenu net moyen producteur",
    baseline: "680 000 XOF/an",
    realise: "912 000 XOF/an",
    objectif: "850 000 XOF/an",
    taux: 107,
  },
  {
    odd: "ODD 2 — Faim zéro",
    indicateur: "Rendement cacao",
    baseline: "12,5 t/ha",
    realise: "14,8 t/ha",
    objectif: "14 t/ha",
    taux: 106,
  },
  {
    odd: "ODD 5 — Égalité des genres",
    indicateur: "% femmes employées",
    baseline: "28%",
    realise: "38%",
    objectif: "35%",
    taux: 109,
  },
  {
    odd: "ODD 8 — Travail décent",
    indicateur: "Emplois formels CDI/CDD",
    baseline: "180",
    realise: "245",
    objectif: "220",
    taux: 111,
  },
  {
    odd: "ODD 12 — Consommation responsable",
    indicateur: "% production certifiée",
    baseline: "45%",
    realise: "62%",
    objectif: "60%",
    taux: 103,
  },
  {
    odd: "ODD 13 — Climat",
    indicateur: "CO2 évité",
    baseline: "120 t",
    realise: "248 t",
    objectif: "200 t",
    taux: 124,
  },
];

const decaissements: Decaissement[] = [
  {
    date: "15/02/2025",
    montant: "1 200 000 XOF",
    usage: "Formation des producteurs",
    justificatif: "Rapport formation FEB-2025",
  },
  {
    date: "10/04/2025",
    montant: "3 800 000 XOF",
    usage: "Matériels d'irrigation — 4 forages",
    justificatif: "BL fournisseur AGRITECH",
  },
  {
    date: "02/06/2025",
    montant: "850 000 XOF",
    usage: "Certification Rainforest Alliance",
    justificatif: "Facture RA-CI / Audit S1",
  },
];

const actions: Action[] = [
  {
    action: "Extension certification RA à 20 ha supplémentaires",
    responsable: "Dir. Production",
    echeance: "31/10/2025",
    budget: "1 200 000 XOF",
  },
  {
    action: "Mise en place système irrigation goutte-à-goutte zone C",
    responsable: "Responsable Technique",
    echeance: "30/09/2025",
    budget: "4 500 000 XOF",
  },
  {
    action: "Formation 80 femmes — agroforesterie & gestion parcelle",
    responsable: "Coord. Formations",
    echeance: "15/11/2025",
    budget: "750 000 XOF",
  },
  {
    action: "Audit interne ISO 22000 — préparation renouvellement",
    responsable: "Responsable Qualité",
    echeance: "01/12/2025",
    budget: "320 000 XOF",
  },
  {
    action: "Rapport final S2 2025 transmis aux bailleurs",
    responsable: "DAF / Direction",
    echeance: "15/01/2026",
    budget: "—",
  },
];

// ─── Sous-composants ──────────────────────────────────────────────────────────

function TauxBadge({ taux }: { taux: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
      <CheckCircle size={11} />
      {taux}%
    </span>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function BailleurPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Espace Bailleur" breadcrumb={["Espace Bailleur"]} />

      <main className="p-6 max-w-6xl mx-auto space-y-8">

        {/* ── Bandeau d'accueil ── */}
        <section
          className="rounded-2xl p-7 text-white"
          style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-green-200 mb-1">
            Rapport de performance
          </p>
          <h2 className="text-2xl font-bold mb-1">AGROTEK CI</h2>
          <p className="text-green-200 text-sm mb-5">
            Période : Janvier — Juin 2025 &nbsp;·&nbsp; Généré le 09/07/2025
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-green-800 text-sm font-semibold hover:bg-green-50 transition-colors">
              <Download size={15} />
              Télécharger PDF
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition-colors border border-green-600">
              <Mail size={15} />
              Envoyer par email
            </button>
          </div>
        </section>

        {/* ── Résumé exécutif ── */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-3">Résumé exécutif</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Au cours du premier semestre 2025, AGROTEK CI a enregistré des performances solides sur
            l'ensemble de ses indicateurs stratégiques. Les rendements en cacao ont atteint 14,8 t/ha,
            dépassant l'objectif annuel de 14 t/ha fixé avec les bailleurs, portés par l'extension du
            programme d'irrigation et l'adoption de pratiques agroforestières certifiées Rainforest
            Alliance. Le taux de certification de la production a progressé à 62%, soutenant l'accès
            aux marchés premium à l'exportation. Sur le volet social, 145 producteurs et employés ont
            bénéficié de formations qualifiantes, et la part des femmes dans la chaîne de valeur
            s'établit à 38%. Les principaux défis identifiés concernent la disponibilité en eau durant
            la saison sèche (mars–avril) et le besoin d'accélération de la mécanisation sur les
            parcelles en pente, qui feront l'objet des investissements planifiés en S2 2025.
          </p>
        </section>

        {/* ── 6 Indicateurs d'impact ── */}
        <section>
          <h3 className="text-base font-bold text-gray-800 mb-4">Indicateurs d'impact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactCards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 flex items-start gap-4 shadow-sm"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${card.bg} ${card.text}`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-0.5">{card.label}</p>
                  <p className="text-base font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tableau ODD ── */}
        <section>
          <h3 className="text-base font-bold text-gray-800 mb-4">Indicateurs de performance FAO / ODD</h3>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["ODD", "Indicateur", "Baseline 2022", "Réalisé S1 2025", "Objectif 2025", "Atteinte"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {oddRows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">
                        {row.odd}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{row.indicateur}</td>
                      <td className="px-5 py-3.5 text-gray-500">{row.baseline}</td>
                      <td className="px-5 py-3.5 font-semibold text-green-700">{row.realise}</td>
                      <td className="px-5 py-3.5 text-gray-500">{row.objectif}</td>
                      <td className="px-5 py-3.5">
                        <TauxBadge taux={row.taux} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Utilisation des fonds ── */}
        <section>
          <h3 className="text-base font-bold text-gray-800 mb-1">Utilisation des fonds</h3>
          <p className="text-xs text-gray-400 mb-4">Projet cofinancé — Décaissements S1 2025</p>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Date", "Montant", "Usage", "Justificatif"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {decaissements.map((d, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{d.date}</td>
                      <td className="px-5 py-3.5 font-semibold text-gray-900 whitespace-nowrap">
                        {d.montant}
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">{d.usage}</td>
                      <td className="px-5 py-3.5 text-gray-400 text-xs">{d.justificatif}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-green-50 border-t border-green-100">
                    <td className="px-5 py-3 text-xs font-bold text-green-800 uppercase tracking-wide">
                      Total décaissé
                    </td>
                    <td className="px-5 py-3 font-bold text-green-800">5 850 000 XOF</td>
                    <td colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* ── Plan d'action S2 ── */}
        <section>
          <h3 className="text-base font-bold text-gray-800 mb-4">Prochaines étapes — Plan d'action S2 2025</h3>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Action", "Responsable", "Échéance", "Budget"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {actions.map((a, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-gray-800">
                        <div className="flex items-start gap-2">
                          <Circle size={7} className="text-green-500 mt-1.5 flex-shrink-0 fill-green-500" />
                          {a.action}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{a.responsable}</td>
                      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{a.echeance}</td>
                      <td className="px-5 py-3.5 font-medium text-gray-700 whitespace-nowrap">{a.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
