"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Smartphone, CreditCard, Building2, Globe, FileText, Store,
  Clock, Briefcase, CheckCircle2, AlertCircle, Copy, Check,
  ArrowLeft, Loader2, MessageCircle, Lock, Phone,
} from "lucide-react";
import Topbar from "../../components/Topbar";
import { PLANS, formatPrix, prixPour } from "../../../lib/plans";

// ─────────────────────────────────────────────
// 11 familles de paiement IBIG SOFT
// ─────────────────────────────────────────────
type FamilleCode =
  | "orange_money"
  | "moov_money"
  | "mtn_momo"
  | "wave"
  | "carte_bancaire"
  | "virement"
  | "paypal"
  | "cheque"
  | "especes"
  | "paiement_terme"
  | "bon_commande";

interface Famille {
  code: FamilleCode;
  nom: string;
  description: string;
  badge?: string;
  badgeColor?: "orange" | "gray";
  icon: React.ElementType;
  isMobileMoney?: boolean;
  telephone?: string;
  titulaire?: string;
}

const FAMILLES: Famille[] = [
  {
    code: "orange_money",
    nom: "Orange Money",
    description: "+225 07 78 88 25 92",
    badge: "Paiement local",
    badgeColor: "orange",
    icon: Smartphone,
    isMobileMoney: true,
    telephone: "+225 07 78 88 25 92",
    titulaire: "IBIG SARL",
  },
  {
    code: "moov_money",
    nom: "Moov Money",
    description: "+225 01 53 59 55 44",
    badge: "Paiement local",
    badgeColor: "orange",
    icon: Smartphone,
    isMobileMoney: true,
    telephone: "+225 01 53 59 55 44",
    titulaire: "IBIG SARL",
  },
  {
    code: "mtn_momo",
    nom: "MTN MoMo",
    description: "+225 05 55 05 99 01",
    badge: "Paiement local",
    badgeColor: "orange",
    icon: Smartphone,
    isMobileMoney: true,
    telephone: "+225 05 55 05 99 01",
    titulaire: "IBIG SARL",
  },
  {
    code: "wave",
    nom: "Wave",
    description: "+225 07 78 88 25 92",
    badge: "Paiement local",
    badgeColor: "orange",
    icon: Smartphone,
    isMobileMoney: true,
    telephone: "+225 07 78 88 25 92",
    titulaire: "IBIG SARL",
  },
  {
    code: "carte_bancaire",
    nom: "Carte bancaire Visa / Mastercard",
    description: "Paiement en ligne — intégration en cours",
    badge: "En ligne",
    badgeColor: "gray",
    icon: CreditCard,
    isMobileMoney: false,
  },
  {
    code: "virement",
    nom: "Virement bancaire",
    description: "Coordonnées à demander au support",
    icon: Building2,
    isMobileMoney: false,
  },
  {
    code: "paypal",
    nom: "PayPal",
    description: "Paiement en ligne — intégration en cours",
    badge: "En ligne",
    badgeColor: "gray",
    icon: Globe,
    isMobileMoney: false,
  },
  {
    code: "cheque",
    nom: "Chèque",
    description: "À l'ordre d'IBIG SARL",
    icon: FileText,
    isMobileMoney: false,
  },
  {
    code: "especes",
    nom: "Espèces",
    description: "En agence / à un représentant agréé",
    icon: Store,
    isMobileMoney: false,
  },
  {
    code: "paiement_terme",
    nom: "Paiement à terme / échelonné",
    description: "Contacter le support commercial",
    icon: Clock,
    isMobileMoney: false,
  },
  {
    code: "bon_commande",
    nom: "Bon de commande entreprise",
    description: "Contacter le support commercial",
    icon: Briefcase,
    isMobileMoney: false,
  },
];

const WA_LINK = "https://wa.me/2250778882592";

// ─────────────────────────────────────────────
// Composant principal
// ─────────────────────────────────────────────
function PaiementPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planCode = searchParams.get("plan") ?? "pro";
  const periodeParam = (searchParams.get("periode") ?? "mensuel") as "mensuel" | "annuel";

  const [periode, setPeriode] = useState<"mensuel" | "annuel">(periodeParam);
  const [selected, setSelected] = useState<FamilleCode | null>(null);
  const [reference, setReference] = useState("");
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const plan = PLANS.find((p) => p.code === planCode) ?? PLANS[2];
  const montant = prixPour(plan, periode);
  const famille = FAMILLES.find((f) => f.code === selected);

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    });
  };

  const handleSubmit = async () => {
    if (!reference.trim()) {
      setError("Veuillez entrer votre référence de paiement (ID transaction).");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/paiements/mobile-money", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ plan: planCode, periode, methode: selected, reference }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur lors de l'envoi");
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  // ── Succès ──────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Topbar title="Paiement" />
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#F0FDF4" }}>
            <CheckCircle2 size={44} style={{ color: "#2E7D32" }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Paiement enregistré !</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Votre paiement a été enregistré. Notre équipe va vérifier votre transaction et activer
            votre abonnement sous <strong>24h</strong>. Vous recevrez un email de confirmation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ backgroundColor: "#2E7D32" }}
            >
              Retour au tableau de bord
            </button>
            <button
              onClick={() => router.push("/parametres/abonnement")}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Voir mon abonnement
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Paiement" />

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* ── Header plan ── */}
        <div
          className="rounded-2xl p-6 mb-6 text-white"
          style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)" }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-green-200 text-sm mb-4 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> Retour
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-green-200 text-sm font-medium mb-1">Plan sélectionné</p>
              <h1 className="text-2xl font-bold">{plan.nom}</h1>
              <p className="text-green-200 text-sm mt-1">{plan.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                {(["mensuel", "annuel"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriode(p)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: periode === p ? "white" : "rgba(255,255,255,0.15)",
                      color: periode === p ? "#1B5E20" : "white",
                    }}
                  >
                    {p === "mensuel" ? "Mensuel" : "Annuel −15%"}
                  </button>
                ))}
              </div>
              <p className="text-3xl font-bold">{formatPrix(montant)}</p>
              <p className="text-green-200 text-sm">{periode === "annuel" ? "/ an" : "/ mois"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-green-300 text-xs">
            <Lock size={12} />
            <span>Nous ne vous demanderons jamais votre code secret ou mot de passe.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Colonne gauche : 11 familles ── */}
          <div>
            <h2 className="text-base font-bold text-gray-800 mb-3">
              Choisissez votre moyen de paiement
            </h2>
            <div className="flex flex-col gap-2">
              {FAMILLES.map((f) => {
                const Icon = f.icon;
                const isActive = selected === f.code;
                return (
                  <button
                    key={f.code}
                    onClick={() => { setSelected(f.code); setError(""); setReference(""); setSuccess(false); }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border-2 bg-white text-left transition-all hover:shadow-md"
                    style={{
                      borderColor: isActive ? "#2E7D32" : "#E5E7EB",
                      backgroundColor: isActive ? "#F0FDF4" : "white",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: isActive ? "#DCFCE7" : "#F9FAFB" }}
                    >
                      <Icon size={20} style={{ color: isActive ? "#2E7D32" : "#6B7280" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 leading-tight">{f.nom}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{f.description}</p>
                    </div>
                    {f.badge && (
                      <span
                        className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={
                          f.badgeColor === "orange"
                            ? { backgroundColor: "#FFF7ED", color: "#E65100" }
                            : { backgroundColor: "#F3F4F6", color: "#6B7280" }
                        }
                      >
                        {f.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Colonne droite : détails ── */}
          <div>
            {!selected && (
              <div className="rounded-2xl border border-gray-100 bg-white p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <CreditCard size={40} className="text-gray-300 mb-3" />
                <p className="text-gray-400 text-sm">
                  Sélectionnez un moyen de paiement pour voir les instructions.
                </p>
              </div>
            )}

            {/* ── Mobile Money ── */}
            {famille?.isMobileMoney && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone size={18} style={{ color: "#E65100" }} />
                  <h3 className="font-bold text-gray-800">{famille.nom}</h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold ml-auto"
                    style={{ backgroundColor: "#FFF7ED", color: "#E65100" }}
                  >
                    Paiement local
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Envoyez le montant exact, puis entrez votre référence ci-dessous.</p>

                {/* Numéro */}
                <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#F0FDF4" }}>
                  <p className="text-xs text-gray-500 mb-1 font-medium">Numéro de réception</p>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl font-bold text-gray-800 tracking-wide">
                      {famille.telephone}
                    </span>
                    <button
                      onClick={() => copyPhone(famille.telephone!)}
                      className="p-1.5 rounded-lg hover:bg-green-100 transition-colors"
                      style={{ color: "#2E7D32" }}
                      title="Copier le numéro"
                    >
                      {copiedPhone ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">
                    Nom : <strong>{famille.titulaire}</strong>
                  </p>
                  <div
                    className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 border border-green-100"
                    style={{ backgroundColor: "white" }}
                  >
                    <span className="text-lg font-bold" style={{ color: "#2E7D32" }}>
                      {formatPrix(montant)}
                    </span>
                    <span className="text-xs text-gray-400">à envoyer</span>
                  </div>
                </div>

                {/* Référence */}
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Référence de paiement (ID transaction) *
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Ex: CI-20251201-XXXXX"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 mb-4"
                />

                {error && (
                  <p className="text-sm text-red-500 flex items-center gap-1.5 mb-3">
                    <AlertCircle size={14} /> {error}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-opacity"
                  style={{ backgroundColor: "#2E7D32", opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</>
                  ) : (
                    "Confirmer mon paiement"
                  )}
                </button>

                {/* Sécurité */}
                <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                  <Lock size={11} />
                  Votre accès sera activé dès confirmation de votre paiement par notre équipe.
                </p>
              </div>
            )}

            {/* ── Carte / PayPal : intégration future ── */}
            {(selected === "carte_bancaire" || selected === "paypal") && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  {selected === "carte_bancaire" ? <CreditCard size={18} style={{ color: "#2E7D32" }} /> : <Globe size={18} style={{ color: "#2E7D32" }} />}
                  <h3 className="font-bold text-gray-800">
                    {selected === "carte_bancaire" ? "Carte bancaire Visa / Mastercard" : "PayPal"}
                  </h3>
                </div>
                <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFF7ED" }}>
                  <p className="text-sm text-orange-700 font-medium">Intégration en cours</p>
                  <p className="text-xs text-orange-600 mt-1">
                    Le paiement par {selected === "carte_bancaire" ? "carte bancaire" : "PayPal"} sera disponible prochainement.
                    Contactez le support pour payer par ce moyen dès maintenant.
                  </p>
                </div>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle size={16} /> Contacter le support WhatsApp
                </a>
              </div>
            )}

            {/* ── Virement / Chèque / Espèces / Terme / Bon de commande ── */}
            {["virement", "cheque", "especes", "paiement_terme", "bon_commande"].includes(selected ?? "") && famille && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <famille.icon size={18} style={{ color: "#2E7D32" }} />
                  <h3 className="font-bold text-gray-800">{famille.nom}</h3>
                </div>

                {/* Instructions spécifiques */}
                <div className="rounded-xl p-4 mb-5 text-sm text-gray-700 space-y-2" style={{ backgroundColor: "#F0FDF4" }}>
                  {selected === "virement" && (
                    <>
                      <p>Contactez notre support pour obtenir les coordonnées bancaires complètes.</p>
                      <p className="text-xs text-gray-500">Précisez votre plan et période dans l'objet du virement.</p>
                    </>
                  )}
                  {selected === "cheque" && (
                    <>
                      <p>Rédigez votre chèque à l'ordre d'<strong>IBIG SARL</strong>.</p>
                      <p className="text-xs text-gray-500">Inscrivez votre email au dos du chèque. Votre accès sera activé après encaissement (3–5 jours ouvrés).</p>
                    </>
                  )}
                  {selected === "especes" && (
                    <>
                      <p>Remise en agence IBIG Soft ou à un représentant agréé.</p>
                      <p className="text-xs text-gray-500">Contactez-nous pour connaître le point de collecte le plus proche de vous.</p>
                    </>
                  )}
                  {selected === "paiement_terme" && (
                    <>
                      <p>Un paiement échelonné peut être arrangé sur demande.</p>
                      <p className="text-xs text-gray-500">Contactez notre équipe commerciale pour définir un calendrier adapté à votre budget.</p>
                    </>
                  )}
                  {selected === "bon_commande" && (
                    <>
                      <p>Pour les entreprises souhaitant émettre un bon de commande officiel.</p>
                      <p className="text-xs text-gray-500">Notre équipe commerciale vous transmettra un devis et les coordonnées de facturation.</p>
                    </>
                  )}
                </div>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white mb-3"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle size={16} /> Contacter le support WhatsApp
                </a>
                <a
                  href="mailto:support@ibigsoft.com"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <Phone size={14} /> support@ibigsoft.com
                </a>
              </div>
            )}

            {/* ── Notice sécurité globale ── */}
            {selected && (
              <div className="rounded-xl p-4 mt-4 flex items-start gap-2" style={{ backgroundColor: "#F8FBF8" }}>
                <Lock size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  <strong>Votre accès sera activé dès confirmation de votre paiement par notre équipe.</strong>{" "}
                  Ne partagez jamais votre code PIN ou mot de passe avec quiconque.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Bas de page ── */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Besoin d&apos;aide ?{" "}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
            Contactez le support
          </a>
        </p>
      </div>
    </div>
  );
}

export default function PaiementPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#2E7D32] rounded-full animate-spin" />
        </div>
      }
    >
      <PaiementPageContent />
    </Suspense>
  );
}
