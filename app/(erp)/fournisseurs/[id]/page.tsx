import Topbar from "../../../components/Topbar";
import { CheckCircle, MapPin, Phone, Mail, Star, Package, Clock, TrendingUp, ShoppingCart } from "lucide-react";

/* params: Promise<{ id: string }> — Next.js 15 async params */
export default async function FournisseurDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  /* ─── KPI ─── */
  const kpis = [
    { label: "CA 2025",        value: "1 120 000 XOF", icon: TrendingUp,   color: "#2E7D32", bg: "#E8F5E9" },
    { label: "Commandes 2025", value: "1",              icon: ShoppingCart, color: "#1565C0", bg: "#E3F2FD" },
    { label: "En cours",       value: "0",              icon: Package,      color: "#E65100", bg: "#FFF3E0" },
    { label: "Délai moyen",    value: "14 jours",       icon: Clock,        color: "#6A1B9A", bg: "#F3E5F5" },
    { label: "Note fourniss.", value: "4 / 5",          icon: Star,         color: "#F9A825", bg: "#FFFDE7" },
  ];

  /* ─── COMMANDES ─── */
  const commandes = [
    {
      num: "ACH-2025-088", date: "28/06/2025", produits: "KCl 50% (urgence)",
      qte: "4 t", montant: "1 120 000 XOF", livraison: "08/07/2025",
      statut: "Livré", statutOk: true, note: "",
    },
    {
      num: "ACH-2024-064", date: "15/09/2024", produits: "KCl 50% + NPK 20-10-10",
      qte: "8 t + 5 t", montant: "2 840 000 XOF", livraison: "01/10/2024",
      statut: "Livré", statutOk: true, note: "",
    },
    {
      num: "ACH-2024-028", date: "20/04/2024", produits: "Sulfate de potasse 4 t",
      qte: "4 t", montant: "840 000 XOF", livraison: "10/05/2024",
      statut: "Livré (retard 3j)", statutOk: false, note: "retard 3j",
    },
    {
      num: "ACH-2024-012", date: "15/02/2024", produits: "NPK 20-10-10",
      qte: "10 t", montant: "560 000 XOF", livraison: "28/02/2024",
      statut: "Livré", statutOk: true, note: "",
    },
  ];

  /* ─── PRODUITS ─── */
  const produits = [
    { nom: "Chlorure de potassium (KCl 60%)", formulation: "Poudre",    emballage: "Sacs 50 kg", prix: "168 000 XOF/t",  moq: "1 t",    delai: "14 j DDP" },
    { nom: "NPK 20-10-10",                    formulation: "Granulés",  emballage: "Sacs 50 kg", prix: "224 000 XOF/t",  moq: "2 t",    delai: "14 j DDP" },
    { nom: "Sulfate de potasse (K2SO4)",       formulation: "Poudre",    emballage: "Sacs 25 kg", prix: "285 000 XOF/t",  moq: "0,5 t",  delai: "14 j DDP" },
    { nom: "Urée 46%",                         formulation: "Granulés",  emballage: "Sacs 50 kg", prix: "182 000 XOF/t",  moq: "1 t",    delai: "14 j DDP" },
    { nom: "Soufre micronisé 80%",             formulation: "Poudre",    emballage: "Sacs 25 kg", prix: "124 000 XOF/t",  moq: "0,5 t",  delai: "21 j DDP" },
  ];

  /* ─── ÉVALUATION ─── */
  const evaluation = [
    { critere: "Qualité produits",    note: 19, commentaire: "Conformité analyses labo toujours respectée" },
    { critere: "Délai de livraison",  note: 16, commentaire: "Un retard 3j en 2024, sinon exemplaire" },
    { critere: "Prix compétitif",     note: 15, commentaire: "Légèrement plus cher que Mosaic (concurrence) mais DDP simplifie la logistique" },
    { critere: "Communication",       note: 18, commentaire: "Réactivité excellente, devis en 24h" },
    { critere: "Flexibilité",         note: 17, commentaire: "A accepté livraison urgente 14j en 2025" },
  ];

  /* ─── HISTORIQUE RELATION ─── */
  const historique = [
    { annee: "2025", nb: "1", montant: "1 120 000", produits: "KCl 4t urgence",       delai: "14 j", incidents: "0", ok: true },
    { annee: "2024", nb: "3", montant: "4 240 000", produits: "KCl, NPK, sulfate",    delai: "16 j", incidents: "1 (retard 3j)", ok: false },
    { annee: "2023", nb: "2", montant: "2 180 000", produits: "NPK, soufre",          delai: "18 j", incidents: "0", ok: true },
  ];

  return (
    <div>
      <Topbar
        title={`Fiche ${id}`}
        breadcrumb={["Logistique", "Fournisseurs", `Fiche ${id}`]}
      />

      <div className="p-6 space-y-6">

        {/* ── EN-TÊTE ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  <CheckCircle size={15} />
                  Fournisseur approuvé
                </span>
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                  Catégorie : Engrais &amp; Intrants
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">SCPA Afrique SARL</h2>
              <p className="text-sm text-gray-500 mt-1">Fournisseur stratégique · Relation depuis 2023</p>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} size={18} fill="#F9A825" color="#F9A825" />
              ))}
              <Star size={18} fill="none" color="#D1D5DB" />
              <span className="ml-1 text-sm font-medium text-gray-600">4/5</span>
            </div>
          </div>

          {/* Informations générales */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-sm">
            <InfoRow label="Raison sociale"            value="SCPA Afrique SARL" />
            <InfoRow label="Pays"                      value="France (siège) | Entrepôt Abidjan CI" />
            <InfoRow
              label="Adresse siège"
              value="12 Rue de la Paix, 92100 Boulogne-Billancourt"
              icon={<MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />}
            />
            <InfoRow
              label="Entrepôt CI"
              value="Zone industrielle d'Abidjan"
              icon={<MapPin size={13} className="text-gray-400 shrink-0 mt-0.5" />}
            />
            <InfoRow
              label="Téléphone FR"
              value="+33 1 40 XX XX XX"
              icon={<Phone size={13} className="text-gray-400 shrink-0 mt-0.5" />}
            />
            <InfoRow
              label="Téléphone CI"
              value="+225 27 21 XX XX XX"
              icon={<Phone size={13} className="text-gray-400 shrink-0 mt-0.5" />}
            />
            <InfoRow
              label="Email"
              value="commercial@scpa-afrique.com"
              icon={<Mail size={13} className="text-gray-400 shrink-0 mt-0.5" />}
            />
            <InfoRow label="RCCM"                        value="2018-B-21847" />
            <InfoRow label="TVA intracommunautaire"       value="FR12 345 678 901" />
            <InfoRow label="Contact principal"            value="M. Pierre Dumont (commercial export)" />
            <InfoRow label="Incoterm habituel"            value="DDP Soubré (livraison franco)" />
          </div>
        </div>

        {/* ── KPI ── */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: k.bg }}>
                  <Icon size={18} color={k.color} strokeWidth={1.8} />
                </div>
                <div className="text-xl font-bold text-gray-900">{k.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{k.label}</div>
              </div>
            );
          })}
        </div>

        {/* ── ONGLETS (statique côté serveur : sections empilées avec ancres visuelles) ── */}
        {/* Vue d'ensemble */}
        <Section title="Vue d'ensemble">
          {/* Historique relation */}
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm">Historique de la relation</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["Année", "Nb commandes", "Montant total (XOF)", "Produits", "Délai moy.", "Incidents"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {historique.map((row) => (
                    <tr key={row.annee} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-semibold text-gray-900">{row.annee}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 text-center">{row.nb}</td>
                      <td className="px-4 py-3 text-xs font-medium" style={{ color: "#2E7D32" }}>{row.montant}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{row.produits}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{row.delai}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className={row.ok ? "text-green-700 font-medium" : "text-yellow-700 font-medium"}>
                          {row.incidents} {row.ok ? "✅" : "⚠️"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Conditions commerciales */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h4 className="font-semibold text-gray-900 text-sm mb-4">Conditions commerciales</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ["Minimum de commande",     "1 tonne"],
                ["Délai standard",          "14–21 jours (DDP)"],
                ["Délai express (urgence)", "7–10 jours (+15% surcoût)"],
                ["Paiement",               "Virement SWIFT 30 jours ou PayCom BICICI CI"],
                ["Remise volume",          ">10 t = 5% | >20 t = 8%"],
                ["Devise",                 "EUR (facturé en EUR, converti XOF à la livraison)"],
              ].map(([label, val]) => (
                <div key={label} className="flex gap-2">
                  <span className="text-xs text-gray-400 w-44 shrink-0">{label}</span>
                  <span className="text-xs font-medium text-gray-800">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Commandes */}
        <Section title="Commandes">
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm">Toutes les commandes</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["N° commande", "Date", "Produits", "Qté", "Montant", "Livraison", "Statut"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {commandes.map((c) => (
                    <tr key={c.num} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-900">{c.num}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{c.date}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{c.produits}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{c.qte}</td>
                      <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>{c.montant}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{c.livraison}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.statutOk ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                          {c.statutOk ? "✅" : "⚠️"} {c.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* Produits */}
        <Section title="Produits">
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm">Catalogue SCPA Afrique — Tarifs 2025</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["Produit", "Formulation", "Emballage", "Prix unitaire (2025)", "MOQ", "Délai"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {produits.map((p) => (
                    <tr key={p.nom} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-medium text-gray-900">{p.nom}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{p.formulation}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.emballage}</td>
                      <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#2E7D32" }}>{p.prix}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.moq}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.delai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* Évaluation */}
        <Section title="Évaluation fournisseur">
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-100">
              <h4 className="font-semibold text-gray-900 text-sm">Grille d&apos;évaluation</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8FBF8" }}>
                    {["Critère", "Note /20", "Barre", "Commentaire"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {evaluation.map((e) => (
                    <tr key={e.critere} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-medium text-gray-900">{e.critere}</td>
                      <td className="px-4 py-3 text-xs font-bold" style={{ color: e.note >= 18 ? "#2E7D32" : e.note >= 15 ? "#F9A825" : "#E65100" }}>
                        {e.note}/20
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(e.note / 20) * 100}%`,
                              backgroundColor: e.note >= 18 ? "#4CAF50" : e.note >= 15 ? "#F9A825" : "#E65100",
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{e.commentaire}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Note globale */}
          <div className="flex items-center gap-4 rounded-2xl p-5 bg-green-50 border border-green-200">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#2E7D32" }}>
              <span className="text-white text-lg font-bold">17</span>
            </div>
            <div>
              <p className="font-bold text-green-900 text-base">Note globale : 17/20</p>
              <p className="text-sm text-green-800 mt-0.5">Fournisseur stratégique recommandé</p>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}

/* ─── COMPOSANTS UTILITAIRES ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-100" />
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">{title}</h3>
        <div className="h-px flex-1 bg-gray-100" />
      </div>
      {children}
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon}
      <div>
        <span className="text-xs text-gray-400">{label}</span>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
