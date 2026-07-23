"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Topbar from "../../../components/Topbar";
import {
  User, Lock, Palette, Link2, Bell, CreditCard, FileText,
  CheckCircle2, AlertTriangle, ArrowUpCircle, Download, Clock, Zap, RefreshCw,
} from "lucide-react";
import type { Licence } from "../../../../lib/licence";
import type { Plan } from "../../../../lib/plans";
import { formatPrix, prixPour } from "../../../../lib/plans";

const NAV_ITEMS = [
  { label: "Mon profil",    href: "/parametres/profil",        icon: User,       active: false },
  { label: "Sécurité",      href: "/parametres/securite",      icon: Lock,       active: false },
  { label: "Préférences",   href: "/parametres/preferences",   icon: Palette,    active: false },
  { label: "Intégrations",  href: "/parametres/integrations",  icon: Link2,      active: false },
  { label: "Notifications", href: "/parametres/notifications", icon: Bell,       active: false },
  { label: "Abonnement",    href: "/parametres/abonnement",    icon: CreditCard, active: true  },
  { label: "Facturation",   href: "/parametres/facturation",   icon: FileText,   active: false },
];

const STATUT_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  essai:     { bg: "#EFF6FF", text: "#1D4ED8", label: "Essai gratuit" },
  actif:     { bg: "#F0FDF4", text: "#15803D", label: "Actif" },
  grace:     { bg: "#FFF7ED", text: "#C2410C", label: "Période de grâce" },
  expire:    { bg: "#FEF2F2", text: "#B91C1C", label: "Expiré" },
  suspendu:  { bg: "#FEF2F2", text: "#B91C1C", label: "Suspendu" },
  annule:    { bg: "#F3F4F6", text: "#6B7280", label: "Annulé" },
};

export default function AbonnementPage() {
  const router = useRouter();
  const [licence, setLicence] = useState<Licence | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [periodicite, setPeriodicite] = useState<"mensuel" | "annuel">("mensuel");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/licences/current", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/licences/plans", { credentials: "include" }).then((r) => r.json()),
    ]).then(([lic, plansData]) => {
      setLicence(lic);
      setPlans(plansData.plans ?? plansData ?? []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statut = licence ? STATUT_COLORS[licence.statut] ?? STATUT_COLORS.actif : null;
  const currentPlan = plans.find((p) => p.code === licence?.planCode);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Abonnement" />
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">

        {/* Sidebar nav */}
        <aside className="w-52 flex-shrink-0">
          <nav className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2"
                  style={{
                    backgroundColor: item.active ? "#F0FDF4" : "transparent",
                    color: item.active ? "#2E7D32" : "#6B7280",
                    borderLeftColor: item.active ? "#2E7D32" : "transparent",
                    fontWeight: item.active ? 600 : 400,
                  }}>
                  <Icon size={15} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 space-y-6">

          {/* Statut abonnement actuel */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800">Mon abonnement</h2>
              {statut && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: statut.bg, color: statut.text }}>
                  {statut.label}
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex items-center gap-3 py-4">
                <RefreshCw size={18} className="animate-spin text-gray-400" />
                <span className="text-sm text-gray-500">Chargement de votre abonnement…</span>
              </div>
            ) : licence ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Plan actuel</p>
                  <p className="text-sm font-bold text-gray-800">{currentPlan?.nom ?? licence.planCode.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Utilisateurs</p>
                  <p className="text-sm font-bold text-gray-800">{currentPlan?.maxUtilisateurs ?? "—"} max</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Expires dans</p>
                  <p className="text-sm font-bold" style={{ color: (licence.joursRestants ?? 0) < 7 ? "#B91C1C" : "#2E7D32" }}>
                    {licence.joursRestants !== undefined ? `${licence.joursRestants} jours` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date de fin</p>
                  <p className="text-sm font-bold text-gray-800">
                    {licence.dateFin ? new Date(licence.dateFin).toLocaleDateString("fr-FR") : "—"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Impossible de charger votre abonnement.</p>
            )}

            {/* Alerte si grace / expire */}
            {licence && ["grace","expire","suspendu"].includes(licence.statut) && (
              <div className="mt-4 flex items-start gap-3 rounded-xl p-3" style={{ backgroundColor: "#FFF7ED" }}>
                <AlertTriangle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-orange-700">
                    {licence.statut === "grace" ? `Période de grâce — ${licence.joursRestants} jours restants` : "Abonnement expiré"}
                  </p>
                  <p className="text-xs text-orange-600 mt-0.5">Renouvelez maintenant pour conserver l'accès à tous vos modules.</p>
                  <button onClick={() => router.push(`/paiement?plan=${licence.planCode}`)}
                    className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-colors"
                    style={{ backgroundColor: "#E65100" }}>
                    Renouveler maintenant
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Choix de période */}
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-gray-700">Voir les prix en :</p>
            {(["mensuel","annuel"] as const).map((p) => (
              <button key={p} onClick={() => setPeriodicite(p)}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all"
                style={{
                  borderColor: periodicite === p ? "#2E7D32" : "#E5E7EB",
                  backgroundColor: periodicite === p ? "#F0FDF4" : "white",
                  color: periodicite === p ? "#2E7D32" : "#6B7280",
                }}>
                {p === "mensuel" ? "Mensuel" : "Annuel (−15%)"}
              </button>
            ))}
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.filter((p) => p.code !== "essai").map((plan) => {
              const isCurrentPlan = plan.code === licence?.planCode;
              const isUpgrade = !isCurrentPlan;
              const prix = prixPour(plan, periodicite);

              return (
                <div key={plan.code} className="rounded-2xl border-2 bg-white p-5 flex flex-col transition-all"
                  style={{ borderColor: isCurrentPlan ? "#2E7D32" : plan.code === "pro" ? "#E65100" : "#E5E7EB" }}>
                  {plan.code === "pro" && !isCurrentPlan && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full self-start mb-2" style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>
                      POPULAIRE
                    </span>
                  )}
                  {isCurrentPlan && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full self-start mb-2" style={{ backgroundColor: "#F0FDF4", color: "#2E7D32" }}>
                      VOTRE PLAN
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-gray-800 mb-1">{plan.nom}</h3>
                  <p className="text-2xl font-black text-gray-900 mb-0.5">{formatPrix(prix)}</p>
                  <p className="text-xs text-gray-500 mb-4">/ {periodicite === "mensuel" ? "mois" : "an"} · {plan.maxUtilisateurs} utilisateurs</p>

                  <ul className="space-y-1.5 mb-5 flex-1">
                    {plan.modulesInclus.slice(0, 5).map((m) => (
                      <li key={m} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle2 size={12} style={{ color: "#2E7D32", flexShrink: 0 }} />
                        {m}
                      </li>
                    ))}
                    {plan.modulesInclus.length > 5 && (
                      <li className="text-xs text-gray-400 pl-5">+{plan.modulesInclus.length - 5} modules…</li>
                    )}
                  </ul>

                  {isCurrentPlan ? (
                    <button className="w-full py-2.5 rounded-xl text-xs font-semibold border border-gray-200 text-gray-500 cursor-not-allowed">
                      Plan actuel
                    </button>
                  ) : (
                    <button onClick={() => router.push(`/paiement?plan=${plan.code}&periode=${periodicite}`)}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                      style={{ backgroundColor: plan.code === "pro" ? "#E65100" : "#2E7D32" }}>
                      <ArrowUpCircle size={13} />
                      {isUpgrade ? "Passer à ce plan" : "Choisir"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Fonctionnalités incluses */}
          {currentPlan && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Modules inclus dans votre plan {currentPlan.nom}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {currentPlan.modulesInclus.map((m) => (
                  <div key={m} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 size={12} style={{ color: "#2E7D32", flexShrink: 0 }} />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions rapides */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/parametres/facturation"
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                <Download size={14} /> Télécharger mes factures
              </Link>
              <button onClick={() => router.push(`/paiement?plan=${licence?.planCode ?? "pro"}`)}
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl text-white transition-colors"
                style={{ backgroundColor: "#2E7D32" }}>
                <Zap size={14} /> Renouveler / Payer
              </button>
              <button className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                <Clock size={14} /> Historique de paiements
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
