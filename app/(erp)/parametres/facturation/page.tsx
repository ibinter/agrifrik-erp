"use client";

import Link from "next/link";
import Topbar from "../../../components/Topbar";
import {
  User,
  Lock,
  Palette,
  Link2,
  Bell,
  CreditCard,
  FileText,
  Download,
  RefreshCw,
  Building2,
  Smartphone,
} from "lucide-react";

// ── Sidebar nav ───────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Mon profil",    href: "/parametres/profil",        icon: User,       active: false },
  { label: "Sécurité",      href: "/parametres/securite",      icon: Lock,       active: false },
  { label: "Préférences",   href: "/parametres/preferences",   icon: Palette,    active: false },
  { label: "Intégrations",  href: "/parametres/integrations",  icon: Link2,      active: false },
  { label: "Notifications", href: "/parametres/notifications", icon: Bell,       active: false },
  { label: "Abonnement",    href: "/parametres/abonnement",    icon: CreditCard, active: false },
  { label: "Facturation",   href: "/parametres/facturation",   icon: FileText,   active: true  },
];

// ── Invoices ──────────────────────────────────────────────────────────────────

const INVOICES = [
  {
    num:       "FAC-AGRIF-2023-001",
    period:    "2023",
    label:     "Abonnement Starter",
    ht:        "508 475",
    tva:       "91 525",
    ttc:       "600 000",
    emitted:   "01/01/2023",
    paid:      "05/01/2023",
    status:    "paid",
  },
  {
    num:       "FAC-AGRIF-2024-001",
    period:    "2024",
    label:     "Abonnement PRO",
    ht:        "2 033 898",
    tva:       "366 102",
    ttc:       "2 400 000",
    emitted:   "01/01/2024",
    paid:      "02/01/2024",
    status:    "paid",
  },
  {
    num:       "FAC-AGRIF-2025-001",
    period:    "2025",
    label:     "Abonnement PRO",
    ht:        "2 033 898",
    tva:       "366 102",
    ttc:       "2 400 000",
    emitted:   "01/01/2025",
    paid:      "03/01/2025",
    status:    "paid",
  },
  {
    num:       "FAC-AGRIF-2026-001 (prévision)",
    period:    "2026",
    label:     "Abonnement PRO (renouvellement)",
    ht:        "2 033 898",
    tva:       "366 102",
    ttc:       "2 400 000",
    emitted:   "01/01/2026",
    paid:      "—",
    status:    "planned",
  },
];

// ── KPI card ──────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-lg font-bold text-gray-800 leading-tight">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FacturationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Topbar title="Facturation" breadcrumb={["Paramètres", "Facturation"]} />

      <main className="flex-1 p-6">
        <div className="flex gap-6 items-start">

          {/* ── Left sidebar ──────────────────────────────────── */}
          <div className="w-72 shrink-0">
            <div className="rounded-2xl border border-gray-100 bg-white p-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-[#2E7D32] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Right content ─────────────────────────────────── */}
          <div className="flex-1 space-y-5 min-w-0">

            {/* KPIs */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <KpiCard
                label="Total facturé depuis 2023"
                value="5 400 000 XOF"
              />
              <KpiCard
                label="Factures payées"
                value="3 / 3 ✅"
              />
              <KpiCard
                label="Prochaine échéance"
                value="01/01/2026"
                sub="2 400 000 XOF"
              />
              <KpiCard
                label="Mode de paiement principal"
                value="Virement SGBCI"
                sub="Soubré"
              />
            </div>

            {/* Informations de facturation */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Informations de facturation
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Légales */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={15} className="text-[#2E7D32]" />
                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Informations légales</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      ["Entité",                "AGRIFRIK SAS"],
                      ["N° RCCM",               "CI-SOB-2008-B-1142"],
                      ["N° fiscal (DFE)",        "CI/2008/2847"],
                      ["Adresse de facturation", "Zone Soubré Nord, Région Nawa\n01 BP 142 Soubré"],
                      ["Email facturation",      "comptabilite@agrifrik.com"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <span className="text-xs text-gray-400 font-medium w-36 shrink-0">{k}</span>
                        <span className="text-xs text-gray-700 whitespace-pre-line">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Paiement */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard size={15} className="text-[#2E7D32]" />
                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Mode de paiement</h3>
                  </div>

                  {/* Virement */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 size={13} className="text-gray-500" />
                      <span className="text-xs font-semibold text-gray-700">Virement bancaire <span className="text-[#2E7D32]">(principal)</span></span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        ["Banque",    "SGBCI — Agence de Soubré"],
                        ["IBAN CI",   "CI93 CF010 10101 5200013001"],
                        ["BIC/SWIFT", "SGCICIAB"],
                        ["Titulaire", "AGRIFRIK SAS"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex gap-3">
                          <span className="text-xs text-gray-400 w-20 shrink-0">{k}</span>
                          <span className="text-xs text-gray-700 font-mono">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Money */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone size={13} className="text-gray-500" />
                      <span className="text-xs font-semibold text-gray-700">Mobile Money <span className="text-gray-400 font-normal">(paiements &lt; 500 000 XOF)</span></span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        ["Orange Money", "+225 07 XX XX XX"],
                        ["Wave CI",      "+225 07 XX XX XX"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex gap-3">
                          <span className="text-xs text-gray-400 w-24 shrink-0">{k}</span>
                          <span className="text-xs text-gray-700 font-mono">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Factures */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Factures
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F8FBF8]">
                      {["N° Facture", "Période", "Désignation", "Montant HT", "TVA 18%", "Total TTC", "Date émission", "Date paiement", "Statut", ""].map((h) => (
                        <th key={h} className="text-left px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {INVOICES.map((inv, i) => (
                      <tr key={i} className={`hover:bg-gray-50 ${inv.status === "planned" ? "opacity-70" : ""}`}>
                        <td className="px-3 py-3 font-mono text-gray-700 whitespace-nowrap">{inv.num}</td>
                        <td className="px-3 py-3 text-gray-600">{inv.period}</td>
                        <td className="px-3 py-3 text-gray-700">{inv.label}</td>
                        <td className="px-3 py-3 text-gray-600 text-right">{inv.ht}</td>
                        <td className="px-3 py-3 text-gray-600 text-right">{inv.tva}</td>
                        <td className="px-3 py-3 font-semibold text-gray-800 text-right whitespace-nowrap">{inv.ttc} XOF</td>
                        <td className="px-3 py-3 text-gray-600">{inv.emitted}</td>
                        <td className="px-3 py-3 text-gray-600">{inv.paid}</td>
                        <td className="px-3 py-3">
                          {inv.status === "paid" ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100 whitespace-nowrap">
                              ✅ Payé
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100 whitespace-nowrap">
                              ⏳ Prévue
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          {inv.status === "paid" && (
                            <button
                              className="flex items-center gap-1 text-[#2E7D32] hover:text-[#1B5E20] text-xs font-medium transition-colors"
                              title="Télécharger PDF"
                            >
                              <Download size={13} /> PDF
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Téléchargements */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Besoin d&apos;un justificatif ? Toutes vos factures sont téléchargeables au format PDF conforme{" "}
                <span className="font-semibold text-gray-700">SYSCOHADA</span>. Pour toute question de facturation,
                contactez{" "}
                <a href="mailto:comptabilite@agrifrik.com" className="text-[#2E7D32] hover:underline font-medium">
                  comptabilite@agrifrik.com
                </a>{" "}
                ou appelez le{" "}
                <span className="font-medium text-gray-700">+225 27 XX XX XX</span>.
              </p>
              <button className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-colors">
                <Download size={14} />
                Télécharger toutes les factures (ZIP)
              </button>
            </div>

            {/* Alerte renouvellement */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <span className="text-xl leading-none mt-0.5">📅</span>
                <div className="flex-1 space-y-2">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Votre abonnement PRO se renouvelle le{" "}
                    <strong className="text-gray-900">01/01/2026</strong>{" "}
                    (dans 173 jours). La facture{" "}
                    <strong className="text-gray-900">FAC-AGRIF-2026-001</strong>{" "}
                    de{" "}
                    <strong className="text-gray-900">2 400 000 XOF</strong>{" "}
                    sera émise automatiquement. Pour modifier votre plan ou vos informations de facturation,
                    contactez notre équipe avant le{" "}
                    <strong className="text-gray-900">15/12/2025</strong>.
                  </p>
                  <button className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-colors mt-2">
                    <RefreshCw size={13} />
                    Configurer le renouvellement automatique
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
