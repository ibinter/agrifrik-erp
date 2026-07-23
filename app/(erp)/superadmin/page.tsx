"use client";

import { useEffect, useState } from "react";
import {
  Building2, Users, TrendingUp, TrendingDown, CreditCard,
  Key, Ticket, AlertTriangle, Activity, ArrowUpRight,
} from "lucide-react";

interface Stats {
  organisations: number;
  licencesActives: number;
  licencesEssai: number;
  licencesGrace: number;
  licencesExpirees: number;
  mrr: number;
  arr: number;
  users: number;
  paiementsEnAttente: number;
  emailsEnvoyes: number;
  tauxConversion: number;
  churnRate: number;
  croissance: number;
}

function fmt(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + " M";
  if (n >= 1000) return (n / 1000).toFixed(1) + " k";
  return n.toString();
}

function fmtXof(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n) + " XOF";
}

export default function SuperadminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/superadmin/stats").then((r) => r.json()).then((d) => {
      setStats(d);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const KPI = [
    { label: "Organisations", value: stats?.organisations ?? 0, icon: Building2, color: "#4CAF50", suffix: "" },
    { label: "Licences actives", value: stats?.licencesActives ?? 0, icon: Key, color: "#2196F3", suffix: "" },
    { label: "En essai gratuit", value: stats?.licencesEssai ?? 0, icon: Activity, color: "#FF9800", suffix: "" },
    { label: "Utilisateurs", value: stats?.users ?? 0, icon: Users, color: "#9C27B0", suffix: "" },
    { label: "MRR", value: stats?.mrr ?? 0, icon: CreditCard, color: "#E65100", isMoney: true },
    { label: "ARR", value: stats?.arr ?? 0, icon: TrendingUp, color: "#1B5E20", isMoney: true },
    { label: "Paiements en attente", value: stats?.paiementsEnAttente ?? 0, icon: AlertTriangle, color: "#F44336", suffix: "" },
    { label: "Taux conversion", value: stats?.tauxConversion ?? 0, icon: TrendingUp, color: "#00BCD4", suffix: "%" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#c8e6c9" }}>Console Superadmin</h1>
        <p className="text-xs mt-0.5" style={{ color: "#4a6a4a" }}>Vue globale de la plateforme AGRIFRIK — IBIG Soft</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {KPI.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-xl p-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs" style={{ color: "#4a6a4a" }}>{k.label}</p>
                <Icon size={14} style={{ color: k.color }} />
              </div>
              {loading ? (
                <div className="h-6 w-16 rounded animate-pulse" style={{ backgroundColor: "#1a2f1a" }} />
              ) : (
                <p className="text-lg font-bold" style={{ color: k.color }}>
                  {(k as any).isMoney ? fmtXof(k.value) : `${fmt(k.value)}${k.suffix ?? ""}`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Indicateurs secondaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl p-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
          <p className="text-xs mb-3" style={{ color: "#4a6a4a" }}>Répartition licences</p>
          <div className="space-y-2">
            {[
              { label: "Actives", val: stats?.licencesActives ?? 0, color: "#4CAF50" },
              { label: "Essai", val: stats?.licencesEssai ?? 0, color: "#FF9800" },
              { label: "Grâce", val: stats?.licencesGrace ?? 0, color: "#FF5722" },
              { label: "Expirées", val: stats?.licencesExpirees ?? 0, color: "#F44336" },
            ].map((item) => {
              const total = (stats?.licencesActives ?? 0) + (stats?.licencesEssai ?? 0) + (stats?.licencesGrace ?? 0) + (stats?.licencesExpirees ?? 0);
              const pct = total ? Math.round((item.val / total) * 100) : 0;
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span style={{ color: "#6a8a6a" }}>{item.label}</span>
                    <span style={{ color: item.color }}>{item.val} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1a2f1a" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
          <p className="text-xs mb-3" style={{ color: "#4a6a4a" }}>Santé plateforme</p>
          <div className="space-y-3">
            {[
              { label: "Croissance MoM", val: `+${stats?.croissance ?? 0}%`, positive: true },
              { label: "Taux churn", val: `${stats?.churnRate ?? 0}%`, positive: false },
              { label: "Taux conversion", val: `${stats?.tauxConversion ?? 0}%`, positive: true },
              { label: "Emails envoyés", val: fmt(stats?.emailsEnvoyes ?? 0), positive: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#6a8a6a" }}>{item.label}</span>
                <span className="text-xs font-semibold" style={{ color: item.positive ? "#4CAF50" : "#FF5722" }}>
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a" }}>
          <p className="text-xs mb-3" style={{ color: "#4a6a4a" }}>Actions rapides</p>
          <div className="space-y-2">
            {[
              { label: "Créer un voucher", href: "/superadmin/vouchers" },
              { label: "Gérer les licences", href: "/superadmin/licences" },
              { label: "Voir les paiements", href: "/superadmin/paiements" },
              { label: "Toutes les orgs", href: "/superadmin/organisations" },
            ].map((item) => (
              <a key={item.href} href={item.href}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors"
                style={{ backgroundColor: "#111f11", color: "#4CAF50" }}>
                {item.label} <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
