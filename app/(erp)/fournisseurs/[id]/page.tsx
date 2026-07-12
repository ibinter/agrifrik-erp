import Topbar from "../../../components/Topbar";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Mail, CheckCircle2, Clock, Package, Star } from "lucide-react";

export default async function FournisseurDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /* ─── DONNÉES STATIQUES FOUR-002 ─────────────────────────── */

  const CATALOGUE = [
    { produit: "Super Cupravit OB 50 WP", ref: "SCPA-CUP-1KG",  homol: "MINAGRI-PHY-0184", dar: "14j", pu: "8 400 XOF",  unite: "kg" },
    { produit: "Confidor 350 SC",          ref: "SCPA-CONF-1L",   homol: "MINAGRI-PHY-0291", dar: "21j", pu: "30 000 XOF", unite: "L" },
    { produit: "Ridomil Gold 48 WP",        ref: "SCPA-RID-1KG",   homol: "MINAGRI-PHY-0318", dar: "14j", pu: "18 900 XOF", unite: "kg" },
    { produit: "KCl 60% (engrais)",         ref: "SCPA-KCL-50KG",  homol: "MINAGRI-ENG-0052", dar: "—",   pu: "80 000 XOF", unite: "sac 50kg" },
  ];

  const COMMANDES = [
    { num: "ACH-2025-004", date: "05/02", produit: "Confidor 350 SC 4L",     qty: "4 L",  montant: "141 600 XOF", livraison: "09/02", delai: "4j" },
    { num: "ACH-2025-006", date: "28/03", produit: "Super Cupravit OB 8 kg", qty: "8 kg", montant: "79 296 XOF",  livraison: "01/04", delai: "4j" },
    { num: "ACH-2025-017", date: "02/06", produit: "Ridomil Gold 4 kg",       qty: "4 kg", montant: "89 208 XOF",  livraison: "05/06", delai: "3j" },
    { num: "ACH-2025-022", date: "09/06", produit: "Super Cupravit OB 4 kg", qty: "4 kg", montant: "39 648 XOF",  livraison: "14/06", delai: "5j" },
  ];

  const EVALUATION = [
    { critere: "Qualité produits",   note: 20, commentaire: "Zéro retour produit défectueux en 2025" },
    { critere: "Respect des délais", note: 19, commentaire: "1 livraison à J+5 (limite haute)" },
    { critere: "Conformité RA",      note: 20, commentaire: "100% produits homologués RA" },
    { critere: "Documentation",      note: 18, commentaire: "Fiche de données sécurité (FDS) toujours fournie" },
    { critere: "Réactivité service", note: 18, commentaire: "Réponse devis <24h" },
  ];

  /* bar chart — 7 mois */
  const BAR_DATA = [
    { mois: "Jan", val: 0 },
    { mois: "Fév", val: 141600 },
    { mois: "Mar", val: 0 },
    { mois: "Avr", val: 79296 },
    { mois: "Mai", val: 0 },
    { mois: "Jun", val: 128856 },
    { mois: "Jul", val: 0 },
  ];
  const MAX_VAL = 141600;
  const BAR_H = 110;
  const BAR_W = 50;
  const GAP = 38;
  const LEFT = 48;

  return (
    <div className="min-h-screen bg-[#F4F6F4]">
      <Topbar breadcrumb={["Logistique", "Fournisseurs", `Fournisseur ${id}`]} />

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* ── EN-TÊTE BANDEAU VERT ─────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#1B5E20] px-6 py-5 text-white">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-white/20 rounded px-2 py-0.5 font-mono">FOUR-002</span>
                  <span className="text-xs bg-white/20 rounded px-2 py-0.5">Intrants phytosanitaires &amp; engrais</span>
                </div>
                <h1 className="text-2xl font-bold">SCPA Afrique CI</h1>
                <p className="text-green-200 text-sm">Société Commerciale des Produits Agrochimiques</p>
                <p className="text-green-100 text-sm mt-1">Zone Industrielle de Yopougon, Abidjan, Côte d&apos;Ivoire</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="inline-flex items-center gap-1.5 bg-green-400/25 border border-green-300/40 rounded-full px-3 py-1 text-sm font-semibold">
                  <CheckCircle2 size={14} /> Fournisseur agréé RA
                </span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-300 fill-yellow-300" />
                  <span className="text-lg font-bold">94</span>
                  <span className="text-green-200 text-sm">/100</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-green-300 text-xs">Contact principal</p>
                <p className="font-medium">Koné Aboubakar</p>
                <p className="text-green-200 text-xs">Représentant commercial Région Nawa</p>
              </div>
              <div>
                <p className="text-green-300 text-xs">Téléphone</p>
                <p className="font-medium">+225 27 21 44 00 11</p>
              </div>
              <div>
                <p className="text-green-300 text-xs">Email</p>
                <p className="font-medium break-all">aboubakar.kone@scpa-afrique.com</p>
              </div>
            </div>
          </div>

          {/* KPI strip */}
          <div className="bg-white grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
            {[
              { label: "Achats 2025 YTD",  val: "248 976 XOF", sub: "",                   Icon: ShoppingCart },
              { label: "Commandes 2025",    val: "4 commandes",  sub: "",                   Icon: Package },
              { label: "Délai moyen livraison", val: "4,3 jours", sub: "Promesse 3-5j ✅", Icon: Clock },
              { label: "Produits RA-conformes", val: "100%",       sub: "Tous conformes ✅", Icon: CheckCircle2 },
            ].map((k) => (
              <div key={k.label} className="flex items-center gap-3 px-4 py-3">
                <k.Icon size={18} className="text-[#2E7D32] shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">{k.label}</p>
                  <p className="text-base font-bold text-gray-900">{k.val}</p>
                  {k.sub && <p className="text-xs text-green-700">{k.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── INFORMATIONS LÉGALES ─────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Informations légales</h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-50">
              {[
                ["RCCM",               "CI-ABJ-2001-B-12847"],
                ["NIF",                "CI-2001-83421-B"],
                ["Siège",              "Zone Industrielle Yopougon, Lot 142 B"],
                ["Représentant légal", "M. Thierry Akré (DG)"],
                ["Agrément phyto CI",  "MINAGRI-PHY-2024-0042 (valide 31/12/2026)"],
                ["Référencement RA",   "Fournisseur homologué Rainforest Alliance 2020 — Produits homologués"],
                ["FDFP",               "À jour cotisations"],
                ["Caution fournisseur","Sans (relations établies depuis 2018)"],
              ].map(([champ, val]) => (
                <tr key={champ}>
                  <td className="py-2 pr-4 text-gray-500 font-medium whitespace-nowrap w-52">{champ}</td>
                  <td className="py-2 text-gray-800">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── CATALOGUE PRODUITS ───────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Catalogue produits fournis</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-left">
                  {["Produit","Réf. SCPA","Homologation CI","Conformité RA","DAR","PU HT","Unité"].map((h) => (
                    <th key={h} className="px-3 py-2 text-xs text-gray-500 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CATALOGUE.map((p) => (
                  <tr key={p.ref} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{p.produit}</td>
                    <td className="px-3 py-2 font-mono text-xs text-gray-600">{p.ref}</td>
                    <td className="px-3 py-2 text-xs text-gray-600">{p.homol}</td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 rounded-full px-2 py-0.5">
                        <CheckCircle2 size={11} /> Autorisé RA
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600">{p.dar}</td>
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{p.pu}</td>
                    <td className="px-3 py-2 text-xs text-gray-600">{p.unite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-xs text-green-800 flex items-start gap-2">
            <CheckCircle2 size={13} className="mt-0.5 text-green-600 shrink-0" />
            <span>
              Tous les produits SCPA utilisés sur EXP-001 figurent dans la liste des produits autorisés Rainforest Alliance 2020.
              Registre tenu à jour (voir Intrants).
            </span>
          </div>
        </div>

        {/* ── HISTORIQUE COMMANDES ─────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Historique des commandes 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FBF8] text-left">
                  {["N° Commande","Date","Produit","Qté","Montant TTC","Livraison","Délai"].map((h) => (
                    <th key={h} className="px-3 py-2 text-xs text-gray-500 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {COMMANDES.map((c) => (
                  <tr key={c.num} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-mono text-xs text-[#2E7D32] font-medium">{c.num}</td>
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{c.date}</td>
                    <td className="px-3 py-2 text-gray-900">{c.produit}</td>
                    <td className="px-3 py-2 text-gray-600">{c.qty}</td>
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{c.montant}</td>
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{c.livraison}</td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 bg-green-50 text-green-700">
                        <CheckCircle2 size={11} /> {c.delai}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#F8FBF8] font-semibold text-sm">
                  <td className="px-3 py-2 text-gray-700" colSpan={4}>TOTAL 2025</td>
                  <td className="px-3 py-2 text-gray-900 whitespace-nowrap">349 752 XOF</td>
                  <td className="px-3 py-2" />
                  <td className="px-3 py-2 text-gray-700 text-xs">4,0j moy.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── SVG BAR CHART ────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Achats SCPA par mois — 2025</h2>
          <div className="overflow-x-auto">
            <svg width={640} height={180} viewBox="0 0 640 180" className="block">
              {/* gridlines */}
              {[0, 0.25, 0.5, 0.75, 1].map((t) => {
                const y = 20 + (1 - t) * BAR_H;
                return (
                  <g key={t}>
                    <line x1={LEFT} y1={y} x2={630} y2={y} stroke="#E5E7EB" strokeWidth={1} />
                    <text x={LEFT - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9CA3AF">
                      {t === 0 ? "0" : `${Math.round((t * MAX_VAL) / 1000)}k`}
                    </text>
                  </g>
                );
              })}
              {/* bars */}
              {BAR_DATA.map((d, i) => {
                const bh = d.val === 0 ? 2 : (d.val / MAX_VAL) * BAR_H;
                const x = LEFT + 10 + i * (BAR_W + GAP);
                const y = 20 + BAR_H - bh;
                return (
                  <g key={d.mois}>
                    <rect x={x} y={y} width={BAR_W} height={bh} rx={4} fill={d.val > 0 ? "#2E7D32" : "#E5E7EB"} />
                    {d.val > 0 && (
                      <text x={x + BAR_W / 2} y={y - 4} textAnchor="middle" fontSize={8} fill="#1B5E20" fontWeight="600">
                        {(d.val / 1000).toFixed(0)}k
                      </text>
                    )}
                    <text x={x + BAR_W / 2} y={170} textAnchor="middle" fontSize={9} fill="#6B7280">
                      {d.mois}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* ── ÉVALUATION FOURNISSEUR ───────────────────────────── */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Évaluation fournisseur</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FBF8] text-left">
                {["Critère","Note /20","Commentaire"].map((h) => (
                  <th key={h} className="px-3 py-2 text-xs text-gray-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {EVALUATION.map((e) => (
                <tr key={e.critere} className="hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{e.critere}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: `${(e.note / 20) * 100}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-[#1B5E20]">{e.note}/20</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600">{e.commentaire}</td>
                </tr>
              ))}
              <tr className="bg-green-50">
                <td className="px-3 py-2 font-bold text-gray-900">SCORE GLOBAL</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-green-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#2E7D32]" style={{ width: "94%" }} />
                    </div>
                    <span className="text-sm font-bold text-[#1B5E20]">94/100</span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full px-2.5 py-0.5">
                    <CheckCircle2 size={11} /> Fournisseur stratégique
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── ACTIONS ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 pb-4">
          <Link
            href="/fournisseurs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={14} /> Retour aux fournisseurs
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-medium hover:bg-[#1B5E20] transition-colors">
            <ShoppingCart size={14} /> Nouvelle commande
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#2E7D32] text-[#2E7D32] text-xs font-medium hover:bg-green-50 transition-colors">
            <Mail size={14} /> Contacter SCPA
          </button>
        </div>

      </div>
    </div>
  );
}
