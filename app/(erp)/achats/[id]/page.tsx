import Topbar from "../../../components/Topbar";
import { CheckCircle, Package, Clock, TrendingUp } from "lucide-react";

export default async function AchatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const kpis = [
    { label: "Montant HT", value: "33 600 XOF", icon: Package, color: "#2E7D32", bg: "#E8F5E9" },
    { label: "TVA (18% CI)", value: "6 048 XOF", icon: TrendingUp, color: "#1565C0", bg: "#E3F2FD" },
    { label: "Montant TTC", value: "39 648 XOF", icon: CheckCircle, color: "#1B5E20", bg: "#E8F5E9" },
    { label: "Délai livraison réel", value: "5 jours ✅", icon: Clock, color: "#6A1B9A", bg: "#F3E5F5" },
  ];

  const historiqueScpa = [
    { cmd: "ACH-2025-006", date: "28/03", produit: "Super Cupravit 8 kg", qte: "8 kg", ttc: "79 296 XOF", delai: "4j ✅", current: false },
    { cmd: "ACH-2025-014", date: "15/05", produit: "Ridomil Gold 48 WP 4 kg", qte: "4 kg", ttc: "90 720 XOF", delai: "5j ✅", current: false },
    { cmd: "ACH-2025-017", date: "02/06", produit: "Super Cupravit 4 kg", qte: "4 kg", ttc: "39 648 XOF", delai: "3j ✅", current: false },
    { cmd: "ACH-2025-022", date: "09/06", produit: "Super Cupravit 4 kg", qte: "4 kg", ttc: "39 648 XOF", delai: "5j ✅", current: true },
  ];

  return (
    <div>
      <Topbar
        title={`Commande ${id}`}
        breadcrumb={["Logistique", "Achats", `Commande ${id}`]}
      />

      <div className="p-6 space-y-6">

        {/* ── Bandeau en-tête ── */}
        <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: "#1B5E20" }}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-bold">ACH-2025-022</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
                  ✅ Livrée et réceptionnée
                </span>
              </div>
              <div className="text-sm font-semibold text-green-100">SCPA Afrique CI</div>
              <div className="text-xs text-green-200">Société Commerciale des Produits Agrochimiques</div>
              <div className="text-sm text-green-100 mt-2">Super Cupravit OB 50 WP — 4 kg (fongicide cuivrique)</div>
            </div>
            <div className="text-right space-y-1 text-sm text-green-100">
              <div>Date commande : <span className="font-semibold text-white">09/06/2025</span></div>
              <div>Livraison : <span className="font-semibold text-white">14/06/2025 (J+5)</span></div>
            </div>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(k => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: k.bg }}>
                  <Icon size={18} color={k.color} strokeWidth={1.8} />
                </div>
                <div className="text-lg font-bold text-gray-900 leading-tight">{k.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{k.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Détail de la commande ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Détail de la commande</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["#", "Désignation", "Réf.", "Qté", "PU HT", "Total HT"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-500">1</td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-900 whitespace-nowrap">Super Cupravit OB 50 WP (sachets 1 kg)</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-400 whitespace-nowrap">SCPA-CUP-1KG</td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-900">4 kg</td>
                    <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">8 400 XOF/kg</td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-900 whitespace-nowrap">33 600 XOF</td>
                  </tr>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    <td className="px-4 py-2.5 text-xs text-gray-500 font-semibold" colSpan={5}>Sous-total HT</td>
                    <td className="px-4 py-2.5 text-xs font-bold text-gray-900 whitespace-nowrap">33 600 XOF</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-xs text-gray-500" colSpan={5}>TVA 18%</td>
                    <td className="px-4 py-2.5 text-xs text-gray-700 whitespace-nowrap">6 048 XOF</td>
                  </tr>
                  <tr style={{ backgroundColor: "#E8F5E9" }}>
                    <td className="px-4 py-3 text-xs font-bold" colSpan={5} style={{ color: "#1B5E20" }}>TOTAL TTC</td>
                    <td className="px-4 py-3 text-sm font-bold whitespace-nowrap" style={{ color: "#1B5E20" }}>39 648 XOF</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 text-xs text-gray-500 border-t border-gray-100 bg-gray-50">
              Paiement à 30 jours · Livraison franco domicile EXP-001 Soubré
            </div>
          </div>

          {/* ── Bon de livraison ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Bon de livraison</h2>
            </div>
            <div className="p-5 space-y-2.5">
              {[
                { champ: "N° BL fournisseur", val: "SCPA-BL-2025-0847" },
                { champ: "Date livraison", val: "14/06/2025 à 10h30" },
                { champ: "Livreur", val: "Chauffeur SCPA — Véhicule CI-AB-1234" },
                { champ: "Réceptionnaire", val: "Ibrahim Sawadogo" },
                { champ: "Contrôle à réception", val: "✅ Quantité conforme (4 sachets 1 kg intacts)" },
                { champ: "Condition produit", val: "✅ Sachets non percés, date de péremption 31/12/2027" },
                { champ: "Stockage immédiat", val: "ENT-001 Zone C (phyto) — registre entrée effectué" },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <span className="text-gray-500 w-36 shrink-0">{row.champ}</span>
                  <span className="font-medium text-gray-800">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Impact sur stock ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">Impact sur stock</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F8FBF8" }}>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 w-48">Indicateur</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Avant livraison</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Après livraison</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { ind: "Stock Super Cupravit", avant: "1,0 kg", apres: "5,0 kg ✅" },
                  { ind: "Valeur stock article", avant: "8 400 XOF", apres: "42 000 XOF" },
                  { ind: "Alerte stock", avant: "🔴 Active", apres: "✅ Résolue" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-medium text-gray-700">{row.ind}</td>
                    <td className="px-4 py-3 text-xs text-red-600 font-medium">{row.avant}</td>
                    <td className="px-4 py-3 text-xs font-bold" style={{ color: "#2E7D32" }}>{row.apres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Historique achats SCPA ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-sm font-bold text-gray-900">Historique achats SCPA — 2025</h2>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#2E7D32" }} />
              Score fournisseur SCPA :
              <span className="font-bold text-gray-900 ml-1">94/100 ✅</span>
              <span className="text-gray-400">(délais, qualité, prix)</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#F8FBF8" }}>
                  {["Commande", "Date", "Produit", "Qté", "Montant TTC", "Délai"].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {historiqueScpa.map(row => (
                  <tr key={row.cmd}
                    className="transition-colors"
                    style={row.current ? { backgroundColor: "#E8F5E9" } : {}}>
                    <td className="px-4 py-3 text-xs font-mono whitespace-nowrap"
                      style={{ color: row.current ? "#1B5E20" : "#6B7280", fontWeight: row.current ? 700 : 400 }}>
                      {row.cmd}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{row.date}</td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap"
                      style={{ color: row.current ? "#1B5E20" : "#374151", fontWeight: row.current ? 600 : 400 }}>
                      {row.produit}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">{row.qte}</td>
                    <td className="px-4 py-3 text-xs text-gray-700 whitespace-nowrap">{row.ttc}</td>
                    <td className="px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: "#2E7D32" }}>{row.delai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex gap-3 flex-wrap pb-6">
          <a href="/achats"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50">
            ← Retour aux achats
          </a>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50">
            Réapprovisionnement automatique
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white"
            style={{ backgroundColor: "#2E7D32" }}>
            Contacter SCPA
          </button>
        </div>

      </div>
    </div>
  );
}
