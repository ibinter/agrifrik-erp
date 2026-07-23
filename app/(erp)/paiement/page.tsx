"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  CreditCard, Smartphone, Building2, Globe, Send, Store, FileText,
  Bitcoin, Ticket, Truck, MessageCircle, ChevronRight, CheckCircle2,
  Upload, AlertCircle, Info, ArrowLeft, Copy, Check, Loader2,
} from "lucide-react";
import Topbar from "../../components/Topbar";
import { PLANS, formatPrix, prixPour } from "../../../lib/plans";
import {
  DEFAULT_PAYMENT_FAMILIES, MOBILE_MONEY_OPERATORS,
  VIREMENT_NATIONAL, VIREMENT_INTERNATIONAL, CRYPTO_WALLETS,
  AGENCES_COLLECTE,
} from "../../../lib/payment-config";
import type { PaymentMethodCode } from "../../../lib/payment-config";

const METHOD_ICONS: Record<PaymentMethodCode, React.ElementType> = {
  mobile_money: Smartphone,
  electronic: CreditCard,
  virement_national: Building2,
  virement_international: Globe,
  transfert_argent: Send,
  especes_agence: Store,
  cheque: FileText,
  crypto: Bitcoin,
  voucher: Ticket,
  livraison: Truck,
  autre: MessageCircle,
};

function PaiementPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const planCode = (searchParams.get("plan") ?? "pro") as string;
  const periodiciteParam = (searchParams.get("periode") ?? "mensuel") as "mensuel" | "annuel";

  const [periodicite, setPeriodicite] = useState<"mensuel" | "annuel">(periodiciteParam);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodCode | null>(null);
  const [selectedOperateur, setSelectedOperateur] = useState<string>("");
  const [selectedGateway, setSelectedGateway] = useState<string>("cinetpay");
  const [selectedCrypto, setSelectedCrypto] = useState<string>("USDT-TRC20");
  const [voucherCode, setVoucherCode] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [step, setStep] = useState<"choix" | "details" | "confirmation">("choix");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState("");
  const [paiementRef, setPaiementRef] = useState("");

  const plan = PLANS.find((p) => p.code === planCode) ?? PLANS[2];
  const montant = prixPour(plan, periodicite);
  const activeFamilies = DEFAULT_PAYMENT_FAMILIES.filter((f) => f.actif);

  const copy = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    });
  };

  const handleSelectMethod = (code: PaymentMethodCode) => {
    setSelectedMethod(code);
    setError("");
    setStep("details");
    if (code === "mobile_money") setSelectedOperateur(MOBILE_MONEY_OPERATORS.find((o) => o.actif)?.operateur ?? "");
  };

  const handleInitier = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/paiements/initier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planCode, periodicite, methodCode: selectedMethod }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setPaiementRef(data.reference);
      setStep("confirmation");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur lors de l'initialisation");
    } finally {
      setLoading(false);
    }
  };

  const handleVoucher = async () => {
    if (!voucherCode.trim()) { setError("Entrez votre code"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/paiements/voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Code invalide");
      setPaiementRef(data.plan);
      setStep("confirmation");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Code invalide ou déjà utilisé");
    } finally {
      setLoading(false);
    }
  };

  const operateur = MOBILE_MONEY_OPERATORS.find((o) => o.operateur === selectedOperateur);
  const cryptoWallet = CRYPTO_WALLETS.find((c) => `${c.crypto}-${c.reseau}` === selectedCrypto);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Paiement" />
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header plan + montant */}
        <div className="rounded-2xl p-6 mb-6 text-white" style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)" }}>
          <button onClick={() => router.back()} className="flex items-center gap-1 text-green-200 text-sm mb-4 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Retour
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-green-200 text-sm font-medium mb-1">Plan sélectionné</p>
              <h1 className="text-2xl font-bold">{plan.nom}</h1>
              <p className="text-green-200 text-sm mt-1">{plan.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-3 justify-end mb-2">
                {(["mensuel", "annuel"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriodicite(p)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: periodicite === p ? "white" : "rgba(255,255,255,0.15)",
                      color: periodicite === p ? "#1B5E20" : "white",
                    }}
                  >
                    {p === "mensuel" ? "Mensuel" : "Annuel −15%"}
                  </button>
                ))}
              </div>
              <p className="text-3xl font-bold">{formatPrix(montant)}</p>
              <p className="text-green-200 text-sm">{periodicite === "annuel" ? "/ an" : "/ mois"}</p>
            </div>
          </div>
          <p className="text-xs text-green-300 mt-4">
            Nous ne vous demanderons jamais votre code secret ou mot de passe.
          </p>
        </div>

        {/* Étapes */}
        <div className="flex items-center gap-2 mb-6">
          {["choix", "details", "confirmation"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step === s || (i === 0 && step !== "choix") || (i === 1 && step === "confirmation") ? "text-white" : "text-gray-400 bg-gray-200"}`}
                style={{ backgroundColor: step === s ? "#2E7D32" : (i < ["choix","details","confirmation"].indexOf(step) ? "#4CAF50" : undefined) }}>
                {i < ["choix","details","confirmation"].indexOf(step) ? <Check size={12} /> : i + 1}
              </div>
              <span className="text-xs text-gray-500 hidden sm:block">{["Choisir", "Instructions", "Confirmation"][i]}</span>
              {i < 2 && <div className="w-8 h-px bg-gray-300" />}
            </div>
          ))}
        </div>

        {/* Étape 1 : Choix de la méthode */}
        {step === "choix" && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Choisissez votre moyen de paiement</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeFamilies.map((fam) => {
                const Icon = METHOD_ICONS[fam.code];
                return (
                  <button
                    key={fam.code}
                    onClick={() => handleSelectMethod(fam.code)}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 bg-white text-left transition-all hover:border-green-500 hover:shadow-md group"
                    style={{ borderColor: "#E5E7EB" }}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: "#F0FDF4" }}>
                      {fam.icone}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800">{fam.nom}</p>
                      <p className="text-xs text-gray-500 truncate">{fam.description}</p>
                      <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${fam.validation === "auto" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                        {fam.validation === "auto" ? "Activation automatique" : fam.validation === "code" ? "Via code de reçu" : "Validation manuelle"}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-green-600 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Étape 2 : Détails de la méthode */}
        {step === "details" && selectedMethod && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <button onClick={() => setStep("choix")} className="flex items-center gap-1 text-gray-500 text-sm mb-4 hover:text-gray-700">
              <ArrowLeft size={14} /> Choisir une autre méthode
            </button>

            {/* MOBILE MONEY */}
            {selectedMethod === "mobile_money" && (
              <div>
                <h2 className="text-lg font-bold mb-1">Mobile Money</h2>
                <p className="text-sm text-gray-500 mb-4">Sélectionnez votre opérateur</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {MOBILE_MONEY_OPERATORS.filter((o) => o.actif).map((op) => (
                    <button key={op.operateur} onClick={() => setSelectedOperateur(op.operateur)}
                      className="p-3 rounded-xl border-2 text-sm font-medium transition-all"
                      style={{ borderColor: selectedOperateur === op.operateur ? "#2E7D32" : "#E5E7EB", backgroundColor: selectedOperateur === op.operateur ? "#F0FDF4" : "white", color: selectedOperateur === op.operateur ? "#2E7D32" : "#374151" }}>
                      {op.nom}
                    </button>
                  ))}
                </div>
                {operateur && (
                  <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#F0FDF4" }}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Numéro de réception :</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-800">{operateur.numeroReception}</span>
                      <button onClick={() => copy(operateur.numeroReception, "phone")} className="p-1 rounded hover:bg-green-100 text-green-700">
                        {copiedField === "phone" ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Titulaire : <strong>{operateur.titulaire}</strong></p>
                    <div className="mt-2 flex items-center gap-2 rounded-lg p-3 bg-white border border-green-100">
                      <span className="text-xl font-bold" style={{ color: "#2E7D32" }}>{formatPrix(montant)}</span>
                      <span className="text-xs text-gray-500">à envoyer</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3"><Info size={12} className="inline mr-1" />{operateur.instructions}</p>
                  </div>
                )}
              </div>
            )}

            {/* VIREMENT NATIONAL */}
            {selectedMethod === "virement_national" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Virement bancaire national</h2>
                <div className="rounded-xl p-4 mb-4 space-y-3" style={{ backgroundColor: "#F0FDF4" }}>
                  {[
                    ["Banque", VIREMENT_NATIONAL.banque],
                    ["Titulaire", VIREMENT_NATIONAL.titulaire],
                    ["Numéro de compte", VIREMENT_NATIONAL.numeroCompte],
                    ["Code guichet", VIREMENT_NATIONAL.codeGuichet],
                    ["Montant exact", formatPrix(montant)],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">{value}</span>
                        <button onClick={() => copy(value!, label)} className="p-1 rounded hover:bg-green-100 text-green-600">
                          {copiedField === label ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mb-4"><Info size={12} className="inline mr-1" />{VIREMENT_NATIONAL.instructions}</p>
              </div>
            )}

            {/* VIREMENT INTERNATIONAL */}
            {selectedMethod === "virement_international" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Virement international</h2>
                <div className="rounded-xl p-4 mb-4 space-y-3" style={{ backgroundColor: "#F0FDF4" }}>
                  {[
                    ["IBAN", VIREMENT_INTERNATIONAL.iban],
                    ["BIC / SWIFT", VIREMENT_INTERNATIONAL.bic],
                    ["Banque", VIREMENT_INTERNATIONAL.banque],
                    ["Titulaire", VIREMENT_INTERNATIONAL.titulaire],
                    ["Montant", formatPrix(montant)],
                    ["Référence", user?.email ?? "votre@email.com"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800 text-right max-w-[200px] break-all">{value}</span>
                        <button onClick={() => copy(value!, label)} className="p-1 rounded hover:bg-green-100 text-green-600 flex-shrink-0">
                          {copiedField === label ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TRANSFERT D'ARGENT */}
            {selectedMethod === "transfert_argent" && (
              <div>
                <h2 className="text-lg font-bold mb-2">Transfert d'argent</h2>
                <p className="text-sm text-gray-500 mb-4">Western Union, MoneyGram ou Ria</p>
                <div className="rounded-xl p-4 mb-4 space-y-2" style={{ backgroundColor: "#F0FDF4" }}>
                  <p className="text-sm"><strong>Bénéficiaire :</strong> IBIG SARL</p>
                  <p className="text-sm"><strong>Pays :</strong> Côte d'Ivoire</p>
                  <p className="text-sm"><strong>Ville :</strong> Abidjan</p>
                  <p className="text-sm"><strong>Montant :</strong> {formatPrix(montant)}</p>
                </div>
                <p className="text-xs text-gray-500"><Info size={12} className="inline mr-1" />Après l'envoi, uploadez la preuve avec le numéro MTCN.</p>
              </div>
            )}

            {/* ESPÈCES EN AGENCE */}
            {selectedMethod === "especes_agence" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Paiement en espèces en agence</h2>
                {AGENCES_COLLECTE.filter((a) => a.actif).map((a) => (
                  <div key={a.nom} className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#F0FDF4" }}>
                    <p className="font-semibold text-sm text-gray-800">{a.nom}</p>
                    <p className="text-xs text-gray-500 mt-1">{a.adresse}</p>
                    <p className="text-xs text-gray-500">{a.horaires}</p>
                    <p className="text-xs text-gray-500">{a.contact}</p>
                  </div>
                ))}
                <p className="text-sm font-semibold mt-2">Montant à apporter : <span style={{ color: "#2E7D32" }}>{formatPrix(montant)}</span></p>
                <p className="text-xs text-gray-500 mt-2">Un reçu vous sera remis. Entrez le code du reçu ci-dessous pour activer votre licence.</p>
                <input type="text" placeholder="Code du reçu (ex: AGE-XXXXXX)"
                  className="mt-3 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" />
              </div>
            )}

            {/* CHÈQUE */}
            {selectedMethod === "cheque" && (
              <div>
                <h2 className="text-lg font-bold mb-4">Chèque bancaire</h2>
                <div className="rounded-xl p-4 mb-4 space-y-2" style={{ backgroundColor: "#F0FDF4" }}>
                  <p className="text-sm"><strong>Ordre du chèque :</strong> IBIG SARL</p>
                  <p className="text-sm"><strong>Montant :</strong> {formatPrix(montant)}</p>
                  <p className="text-sm"><strong>Adresse d'envoi :</strong> Plateau, Abidjan, Côte d'Ivoire</p>
                </div>
                <p className="text-xs text-gray-500">Inscrivez votre email au dos du chèque. Votre accès sera activé après encaissement (3–5 jours ouvrés).</p>
              </div>
            )}

            {/* CRYPTO */}
            {selectedMethod === "crypto" && (
              <div>
                <h2 className="text-lg font-bold mb-2">Cryptomonnaie</h2>
                <div className="flex gap-2 mb-4">
                  {CRYPTO_WALLETS.filter((w) => w.actif).map((w) => (
                    <button key={`${w.crypto}-${w.reseau}`}
                      onClick={() => setSelectedCrypto(`${w.crypto}-${w.reseau}`)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all"
                      style={{ borderColor: selectedCrypto === `${w.crypto}-${w.reseau}` ? "#2E7D32" : "#E5E7EB", backgroundColor: selectedCrypto === `${w.crypto}-${w.reseau}` ? "#F0FDF4" : "white", color: selectedCrypto === `${w.crypto}-${w.reseau}` ? "#2E7D32" : "#374151" }}>
                      {w.crypto} ({w.reseau})
                    </button>
                  ))}
                </div>
                {cryptoWallet && (
                  <div className="rounded-xl p-4" style={{ backgroundColor: "#F0FDF4" }}>
                    <p className="text-xs text-gray-500 mb-1">Adresse {cryptoWallet.reseau}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-gray-800 break-all">{cryptoWallet.adresse}</span>
                      <button onClick={() => copy(cryptoWallet.adresse, "wallet")} className="p-1 rounded hover:bg-green-100 text-green-600 flex-shrink-0">
                        {copiedField === "wallet" ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Après le transfert, uploadez le hash de transaction.</p>
                  </div>
                )}
              </div>
            )}

            {/* VOUCHER */}
            {selectedMethod === "voucher" && (
              <div>
                <h2 className="text-lg font-bold mb-2">Code voucher / prépayé</h2>
                <p className="text-sm text-gray-500 mb-4">Entrez votre code reçu d'un revendeur IBIG Soft</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                    placeholder="AGRIFRIK-XXXX-XXXX"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-green-500"
                  />
                  <button onClick={handleVoucher} disabled={loading}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-opacity"
                    style={{ backgroundColor: "#2E7D32", opacity: loading ? 0.6 : 1 }}>
                    {loading ? <Loader2 size={16} className="animate-spin" /> : "Activer"}
                  </button>
                </div>
                {error && <p className="text-sm text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={14} />{error}</p>}
                <p className="text-xs text-gray-400 mt-3">Code de démo : AGRIFRIK-DEMO-2025</p>
              </div>
            )}

            {/* UPLOAD PREUVE (pour méthodes manuelles) */}
            {["mobile_money","virement_national","virement_international","transfert_argent","cheque","crypto"].includes(selectedMethod) && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-2">Joindre votre justificatif de paiement</p>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-colors hover:border-green-400 hover:bg-green-50" style={{ borderColor: proofFile ? "#2E7D32" : "#E5E7EB" }}>
                  <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => setProofFile(e.target.files?.[0] ?? null)} />
                  {proofFile ? (
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle2 size={20} />
                      <span className="text-sm font-medium">{proofFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload size={24} className="text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500">Cliquez pour choisir un fichier (image ou PDF)</p>
                    </>
                  )}
                </label>
                {error && <p className="text-sm text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={14} />{error}</p>}
                <button onClick={handleInitier} disabled={loading || !proofFile}
                  className="mt-4 w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-opacity"
                  style={{ backgroundColor: "#2E7D32", opacity: loading || !proofFile ? 0.5 : 1 }}>
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</> : "Envoyer ma preuve de paiement"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Étape 3 : Confirmation */}
        {step === "confirmation" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#F0FDF4" }}>
              <CheckCircle2 size={36} style={{ color: "#2E7D32" }} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {selectedMethod === "voucher" ? "Voucher activé !" : "Demande envoyée !"}
            </h2>
            {selectedMethod === "voucher" ? (
              <p className="text-sm text-gray-500 mb-6">Votre code a été validé. Votre plan est maintenant actif.</p>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-2">Votre justificatif a été reçu.</p>
                <p className="text-sm text-gray-500 mb-6">Notre équipe validera votre paiement sous <strong>24h ouvrées</strong> et activera votre licence.</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6 text-sm font-mono" style={{ backgroundColor: "#F0FDF4", color: "#2E7D32" }}>
                  Référence : <strong>{paiementRef}</strong>
                  <button onClick={() => copy(paiementRef, "ref")} className="p-1 hover:bg-green-100 rounded"><Copy size={12} /></button>
                </div>
                <p className="text-xs text-gray-400 mb-6">Conservez cette référence pour tout suivi. Vous recevrez un email de confirmation.</p>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => router.push("/dashboard")} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "#2E7D32" }}>
                Retour au tableau de bord
              </button>
              <button onClick={() => router.push("/parametres/abonnement")} className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50">
                Voir mon abonnement
              </button>
            </div>
          </div>
        )}

        {/* Mention sécurité */}
        <p className="text-center text-xs text-gray-400 mt-6">
          🔒 Paiement sécurisé — IBIG Soft ne vous demandera jamais votre code secret ou mot de passe.
        </p>
      </div>
    </div>
  );
}

export default function PaiementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#2E7D32] rounded-full animate-spin" /></div>}>
      <PaiementPageContent />
    </Suspense>
  );
}
