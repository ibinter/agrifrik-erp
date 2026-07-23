"use client";

import { useEffect, useState } from "react";
import { Search, Building2, Pause, Play, Eye } from "lucide-react";

interface Org {
  id: string;
  nom: string;
  pays: string;
  plan: string;
  statut: string;
  users: number;
  dateInscription: string;
  email: string;
  dateFin: string;
  mrr: number;
}

const STATUT_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  actif:   { label: "Actif",    color: "#4CAF50", bg: "rgba(76,175,80,0.12)" },
  essai:   { label: "Essai",    color: "#FF9800", bg: "rgba(255,152,0,0.12)" },
  grace:   { label: "Grâce",    color: "#FF5722", bg: "rgba(255,87,34,0.12)" },
  expire:  { label: "Expiré",   color: "#F44336", bg: "rgba(244,67,54,0.12)" },
  suspendu:{ label: "Suspendu", color: "#9E9E9E", bg: "rgba(158,158,158,0.12)" },
};

const PLAN_COLOR: Record<string, string> = {
  starter: "#607D8B", pro: "#2196F3", business: "#9C27B0", enterprise: "#E65100", gratuit: "#4CAF50"
};

export default function OrganisationsPage() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/superadmin/organisations").then(r => r.json()).then(d => {
      setOrgs(d.organisations ?? []);
      setLoading(false);
    });
  }, []);

  const filtered = orgs.filter(o =>
    o.nom.toLowerCase().includes(search.toLowerCase()) ||
    o.pays.toLowerCase().includes(search.toLowerCase()) ||
    o.email.toLowerCase().includes(search.toLowerCase())
  );

  async function action(orgId: string, act: "suspendre" | "reactiver") {
    setActing(orgId + act);
    await fetch("/api/superadmin/organisations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orgId, action: act }),
    });
    setOrgs(prev => prev.map(o =>
      o.id === orgId ? { ...o, statut: act === "suspendre" ? "suspendu" : "actif" } : o
    ));
    setActing(null);
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "#c8e6c9" }}>Organisations</h1>
          <p className="text-xs" style={{ color: "#4a6a4a" }}>{orgs.length} organisations enregistrées</p>
        </div>
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#4a6a4a" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…"
            className="pl-8 pr-3 py-2 rounded-xl text-xs outline-none"
            style={{ backgroundColor: "#0D1A0D", border: "1px solid #1a2f1a", color: "#c8e6c9", width: 200 }} />
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1a2f1a" }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: "#0D1A0D", borderBottom: "1px solid #1a2f1a" }}>
              {["Organisation", "Pays", "Plan", "Statut", "Utilisateurs", "MRR", "Fin licence", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "#4a6a4a" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #0f1f0f" }}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-3 rounded animate-pulse" style={{ backgroundColor: "#1a2f1a", width: "70%" }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.map(org => {
              const s = STATUT_STYLE[org.statut] ?? STATUT_STYLE.actif;
              return (
                <tr key={org.id} style={{ borderBottom: "1px solid #0f1f0f" }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(76,175,80,0.12)" }}>
                        <Building2 size={12} style={{ color: "#4CAF50" }} />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: "#c8e6c9" }}>{org.nom}</p>
                        <p style={{ color: "#4a6a4a" }}>{org.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "#6a8a6a" }}>{org.pays}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full capitalize font-medium"
                      style={{ backgroundColor: `${PLAN_COLOR[org.plan] ?? "#607D8B"}22`, color: PLAN_COLOR[org.plan] ?? "#607D8B" }}>
                      {org.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                  </td>
                  <td className="px-4 py-3" style={{ color: "#6a8a6a" }}>{org.users}</td>
                  <td className="px-4 py-3" style={{ color: "#4CAF50", fontVariantNumeric: "tabular-nums" }}>
                    {org.mrr > 0 ? new Intl.NumberFormat("fr-FR").format(org.mrr) + " XOF" : "—"}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#6a8a6a" }}>{org.dateFin}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg transition-colors"
                        style={{ backgroundColor: "rgba(33,150,243,0.1)", color: "#2196F3" }}>
                        <Eye size={12} />
                      </button>
                      {org.statut !== "suspendu" ? (
                        <button onClick={() => action(org.id, "suspendre")} disabled={!!acting}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{ backgroundColor: "rgba(244,67,54,0.1)", color: "#F44336" }}>
                          <Pause size={12} />
                        </button>
                      ) : (
                        <button onClick={() => action(org.id, "reactiver")} disabled={!!acting}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{ backgroundColor: "rgba(76,175,80,0.1)", color: "#4CAF50" }}>
                          <Play size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
