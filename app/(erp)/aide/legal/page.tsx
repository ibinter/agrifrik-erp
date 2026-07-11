import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, CheckCircle2, FileText, Shield, Scale } from "lucide-react";
import Topbar from "../../../components/Topbar";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Informations légales et réglementaires relatives à AGRIFRIK ERP.",
};

const LANDING_BASE = "http://localhost:3000";

const LEGAL_LINKS = [
  {
    label: "Mentions légales",
    href: `${LANDING_BASE}/mentions-legales`,
    description: "Éditeur, hébergement, propriété intellectuelle",
  },
  {
    label: "Politique de confidentialité",
    href: `${LANDING_BASE}/confidentialite`,
    description: "Collecte de données, droits des utilisateurs, DPO",
  },
  {
    label: "Conditions Générales d'Utilisation",
    href: `${LANDING_BASE}/conditions-utilisation`,
    description: "Accès, abonnements, responsabilités, droit applicable",
  },
];

const COMPLIANCE_ITEMS = [
  {
    icon: Scale,
    label: "Conformité SYSCOHADA révisé",
    value: "Oui",
    detail: "Conforme depuis la v1.0.0",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Shield,
    label: "Conformité RGPD / Loi ivoirienne",
    value: "Oui",
    detail: "Loi n° 2013-450 du 19 juin 2013",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: FileText,
    label: "Droit applicable",
    value: "Droit ivoirien & OHADA",
    detail: "Tribunal compétent : Abidjan",
    color: "text-blue-600 bg-blue-50",
  },
];

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Mentions légales" breadcrumb={["Aide", "Mentions légales"]} />

      <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">

        {/* En-tête */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <span className="p-3 bg-green-50 rounded-xl text-green-700 shrink-0">
              <Scale size={22} />
            </span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Informations légales</h1>
              <p className="text-sm text-gray-500 mt-1">
                Retrouvez ici les informations légales et réglementaires relatives à l'utilisation d'AGRIFRIK ERP.
              </p>
            </div>
          </div>
        </section>

        {/* Version et mise à jour */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Informations sur l'application
          </h2>
          <dl className="divide-y divide-gray-50">
            {[
              ["Version de l'application", "AGRIFRIK ERP v2.5.0"],
              ["Dernière mise à jour des CGU", "01/01/2025"],
              ["Éditeur", "AGRIFRIK SAS"],
              ["Siège social", "Cocody, Abidjan, Côte d'Ivoire"],
              ["Contact légal", "legal@agrifrik.com"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-3">
                <dt className="text-sm text-gray-500">{label}</dt>
                <dd className="text-sm font-medium text-gray-900 text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Conformité réglementaire */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Conformité réglementaire
          </h2>
          <div className="space-y-3">
            {COMPLIANCE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50"
                >
                  <span className={`p-2 rounded-lg shrink-0 ${item.color}`}>
                    <Icon size={16} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 size={15} className="text-green-500" />
                    <span className="text-sm font-semibold text-green-700">{item.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Liens vers pages légales landing */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Documents légaux
          </h2>
          <div className="space-y-3">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#2E7D32]/30 hover:bg-green-50/40 transition-all group"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-[#2E7D32] transition-colors">
                    {link.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
                </div>
                <ExternalLink size={15} className="text-gray-300 group-hover:text-[#2E7D32] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
          <p className="text-xs text-gray-400 pt-1">
            Ces documents s'ouvrent sur le site public AGRIFRIK dans un nouvel onglet.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-4">
            Contact
          </h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Pour toute question légale ou relative à la protection des données :</p>
            <p>
              <span className="font-medium text-gray-800">Service juridique :</span>{" "}
              <a href="mailto:legal@agrifrik.com" className="text-[#2E7D32] hover:underline">legal@agrifrik.com</a>
            </p>
            <p>
              <span className="font-medium text-gray-800">DPO :</span>{" "}
              <a href="mailto:privacy@agrifrik.com" className="text-[#2E7D32] hover:underline">privacy@agrifrik.com</a>
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
