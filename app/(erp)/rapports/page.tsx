"use client";

import Topbar from "../../components/Topbar";
import ExportButton from "../../components/ui/ExportButton";
import PrintButton from "../../components/ui/PrintButton";
import {
  BarChart3,
  FileText,
  Download,
  RefreshCw,
  Calendar,
  Mail,
  TrendingUp,
  Users,
  Leaf,
  DollarSign,
  Clock,
  Send,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Rapport {
  titre: string;
  frequence: string;
  dernierGen: string;
  formats: string[];
  icon: React.ReactNode;
}

interface CultureStat {
  nom: string;
  realise: number;
  objectif: number;
  unite: string;
}

interface ExportPlanifie {
  rapport: string;
  frequence: string;
  prochainEnvoi: string;
  destinataires: string;
  statut: string;
}

// ─── Données ─────────────────────────────────────────────────────────────────

const rapportsProduction: Rapport[] = [
  {
    titre: "Bilan des récoltes par campagne",
    frequence: "Mensuel",
    dernierGen: "01/07/2025",
    formats: ["PDF", "Excel"],
    icon: <Leaf size={20} className="text-green-700" />,
  },
  {
    titre: "Performances par parcelle",
    frequence: "Hebdo",
    dernierGen: "08/07/2025",
    formats: ["PDF"],
    icon: <BarChart3 size={20} className="text-green-700" />,
  },
  {
    titre: "Suivi des intrants utilisés",
    frequence: "Mensuel",
    dernierGen: "01/07/2025",
    formats: ["Excel"],
    icon: <TrendingUp size={20} className="text-green-700" />,
  },
];

const rapportsFinance: Rapport[] = [
  {
    titre: "Compte de résultat SYSCOHADA",
    frequence: "Mensuel",
    dernierGen: "01/07/2025",
    formats: ["PDF"],
    icon: <DollarSign size={20} className="text-orange-600" />,
  },
  {
    titre: "Bilan comptable",
    frequence: "Trimestriel",
    dernierGen: "01/04/2025",
    formats: ["PDF"],
    icon: <FileText size={20} className="text-orange-600" />,
  },
  {
    titre: "Tableau de flux de trésorerie",
    frequence: "Mensuel",
    dernierGen: "01/07/2025",
    formats: ["Excel"],
    icon: <TrendingUp size={20} className="text-orange-600" />,
  },
];

const rapportsRH: Rapport[] = [
  {
    titre: "Bulletin de paie individuel",
    frequence: "Mensuel",
    dernierGen: "30/06/2025",
    formats: ["PDF"],
    icon: <Users size={20} className="text-blue-600" />,
  },
  {
    titre: "Déclaration CNPS",
    frequence: "Trimestriel",
    dernierGen: "01/04/2025",
    formats: ["PDF"],
    icon: <FileText size={20} className="text-blue-600" />,
  },
];

const cultures: CultureStat[] = [
  { nom: "Cacao", realise: 12400, objectif: 15000, unite: "kg" },
  { nom: "Anacarde", realise: 8200, objectif: 10000, unite: "kg" },
  { nom: "Maïs", realise: 2800, objectif: 8000, unite: "kg" },
  { nom: "Hévéa (latex)", realise: 1840, objectif: 2000, unite: "kg" },
];

const exportsPlanifies: ExportPlanifie[] = [
  {
    rapport: "Bilan récoltes",
    frequence: "Mensuel",
    prochainEnvoi: "01/08/2025",
    destinataires: "direction@agrotek.ci",
    statut: "Actif",
  },
  {
    rapport: "Compte de résultat",
    frequence: "Mensuel",
    prochainEnvoi: "01/08/2025",
    destinataires: "daf@agrotek.ci, direction@agrotek.ci",
    statut: "Actif",
  },
  {
    rapport: "Rapport FAO",
    frequence: "Trimestriel",
    prochainEnvoi: "01/10/2025",
    destinataires: "reporting@fao.org",
    statut: "Actif",
  },
];

// ─── Sous-composants ─────────────────────────────────────────────────────────

function FrequenceBadge({ label }: { label: string }) {
  const colors: Record<string, string> = {
    Mensuel: "bg-green-50 text-green-700",
    Hebdo: "bg-blue-50 text-blue-700",
    Trimestriel: "bg-orange-50 text-orange-700",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded font-medium ${colors[label] ?? "bg-gray-100 text-gray-600"}`}
    >
      {label}
    </span>
  );
}

function FormatBadge({ label }: { label: string }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">
      {label}
    </span>
  );
}

function RapportCard({ rapport }: { rapport: Rapport }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
            {rapport.icon}
          </div>
          <p className="text-sm font-semibold text-gray-800 leading-snug">
            {rapport.titre}
          </p>
        </div>
        <FrequenceBadge label={rapport.frequence} />
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Clock size={12} />
        <span>Dernière génération : {rapport.dernierGen}</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {rapport.formats.map((f) => (
          <FormatBadge key={f} label={f} />
        ))}
      </div>

      <div className="flex gap-2 mt-auto pt-1">
        <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition-colors">
          <RefreshCw size={12} />
          Générer
        </button>
        <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <Download size={12} />
          Télécharger
        </button>
      </div>
    </div>
  );
}

function SectionTitle({
  label,
  color = "bg-[#2E7D32]",
}: {
  label: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
        {label}
      </h3>
      <div className={`h-0.5 flex-1 rounded-full ${color} opacity-20`} />
    </div>
  );
}

function CultureBar({ stat }: { stat: CultureStat }) {
  const pct = Math.round((stat.realise / stat.objectif) * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{stat.nom}</span>
        <span className="text-gray-500 text-xs">
          {stat.realise.toLocaleString("fr-FR")} / {stat.objectif.toLocaleString("fr-FR")} {stat.unite}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#2E7D32] transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span
          className={`text-xs font-bold w-10 text-right ${
            pct >= 80
              ? "text-green-700"
              : pct >= 50
              ? "text-orange-500"
              : "text-red-500"
          }`}
        >
          {pct}%
        </span>
      </div>
      <p className="text-xs text-gray-400">
        Objectif : {stat.objectif.toLocaleString("fr-FR")} {stat.unite}
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  icon,
  sub,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: React.ReactNode;
  sub?: string;
}) {
  const isPositive = delta?.startsWith("+");
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-2 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {label}
        </span>
        <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-2 flex-wrap">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {delta && (
          <span
            className={`text-sm font-semibold pb-0.5 ${
              isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            {delta}
          </span>
        )}
      </div>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

// ─── Données export ──────────────────────────────────────────────────────────

const exportData: Record<string, unknown>[] = [
  ...rapportsProduction.map((r) => ({
    Titre: r.titre,
    Categorie: "Production",
    Frequence: r.frequence,
    DerniereGeneration: r.dernierGen,
    Formats: r.formats.join(", "),
  })),
  ...rapportsFinance.map((r) => ({
    Titre: r.titre,
    Categorie: "Finance",
    Frequence: r.frequence,
    DerniereGeneration: r.dernierGen,
    Formats: r.formats.join(", "),
  })),
  ...rapportsRH.map((r) => ({
    Titre: r.titre,
    Categorie: "Ressources Humaines",
    Frequence: r.frequence,
    DerniereGeneration: r.dernierGen,
    Formats: r.formats.join(", "),
  })),
];

// ─── Page principale ──────────────────────────────────────────────────────────

export default function RapportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar
        title="Rapports & Business Intelligence"
        breadcrumbs={["Rapports & BI"]}
      />

      <main className="p-6 max-w-7xl mx-auto space-y-10">

        {/* ── Section : Rapports disponibles ── */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <FileText size={20} className="text-[#2E7D32]" />
            <h2 className="text-lg font-bold text-gray-900">Rapports disponibles</h2>
            <div className="ml-auto flex items-center gap-2">
              <ExportButton data={exportData} filename="rapports-agrifrik" label="Exporter CSV" />
              <PrintButton />
            </div>
          </div>

          {/* Production */}
          <div className="mb-6">
            <SectionTitle label="Production" color="bg-[#2E7D32]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rapportsProduction.map((r) => (
                <RapportCard key={r.titre} rapport={r} />
              ))}
            </div>
          </div>

          {/* Finance */}
          <div className="mb-6">
            <SectionTitle label="Finance" color="bg-[#E65100]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rapportsFinance.map((r) => (
                <RapportCard key={r.titre} rapport={r} />
              ))}
            </div>
          </div>

          {/* RH */}
          <div>
            <SectionTitle label="Ressources Humaines" color="bg-blue-600" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rapportsRH.map((r) => (
                <RapportCard key={r.titre} rapport={r} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Section : KPI visuels ── */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-[#2E7D32]" />
            <h2 className="text-lg font-bold text-gray-900">
              Production mensuelle par culture
            </h2>
            <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
              <Calendar size={12} />
              Juillet 2025
            </span>
          </div>
          <div className="space-y-5">
            {cultures.map((c) => (
              <CultureBar key={c.nom} stat={c} />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 border-t border-gray-50 pt-3">
            Source : Module Production — données consolidées au 08/07/2025
          </p>
        </section>

        {/* ── Section : Exports planifiés ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Send size={20} className="text-[#2E7D32]" />
            <h2 className="text-lg font-bold text-gray-900">Exports planifiés</h2>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rapport
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Fréquence
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Prochain envoi
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Destinataires
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {exportsPlanifies.map((exp, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-medium text-gray-800">
                      {exp.rapport}
                    </td>
                    <td className="px-5 py-3.5">
                      <FrequenceBadge label={exp.frequence} />
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 flex items-center gap-1.5">
                      <Calendar size={13} className="text-gray-400" />
                      {exp.prochainEnvoi}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Mail size={12} className="text-gray-400 flex-shrink-0" />
                        <span>{exp.destinataires}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        {exp.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Widget : Rapport express ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-[#2E7D32]" />
            <h2 className="text-lg font-bold text-gray-900">Rapport express</h2>
            <span className="text-xs text-gray-400 ml-1">— YTD 2025</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              label="CA YTD 2025"
              value="862 M FCFA"
              delta="+14,2%"
              icon={<DollarSign size={16} className="text-[#2E7D32]" />}
              sub="vs même période 2024"
            />
            <StatCard
              label="Production totale YTD"
              value="48,2 t"
              icon={<Leaf size={16} className="text-[#2E7D32]" />}
              sub="Toutes cultures confondues"
            />
            <StatCard
              label="Taux de réalisation objectif"
              value="78%"
              icon={<BarChart3 size={16} className="text-[#2E7D32]" />}
              sub="Moyenne pondérée toutes cultures"
            />
            <StatCard
              label="Actifs dans l'ERP"
              value="287"
              icon={<Users size={16} className="text-[#2E7D32]" />}
              sub="Employés enregistrés"
            />
          </div>
        </section>

      </main>
    </div>
  );
}
