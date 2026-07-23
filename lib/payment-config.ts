// Configuration des 11 familles de moyens de paiement AGRIFRIK ERP
// Toutes les clés sensibles viennent des variables d'environnement, jamais codées en dur

export type PaymentMethodCode =
  | "mobile_money"
  | "electronic"
  | "virement_national"
  | "virement_international"
  | "transfert_argent"
  | "especes_agence"
  | "cheque"
  | "crypto"
  | "voucher"
  | "livraison"
  | "autre";

export type ValidationMode = "auto" | "manuelle" | "code";

export interface MobileMoneyConfig {
  operateur: "orange_money" | "mtn_momo" | "wave" | "moov_money" | "airtel_money";
  nom: string;
  actif: boolean;
  numeroReception: string;
  titulaire: string;
  pays: string[];
  instructions: string;
}

export interface ElectronicGatewayConfig {
  code: "cinetpay" | "moneroo" | "fedapay" | "paystack" | "flutterwave" | "stripe" | "paypal";
  nom: string;
  actif: boolean;
  mode: "sandbox" | "production";
  devises: string[];
}

export interface PaymentMethodFamily {
  code: PaymentMethodCode;
  nom: string;
  description: string;
  icone: string;
  validation: ValidationMode;
  actif: boolean;
  ordre: number;
}

// Configuration par défaut (modifiable depuis l'admin)
export const DEFAULT_PAYMENT_FAMILIES: PaymentMethodFamily[] = [
  {
    code: "mobile_money",
    nom: "Mobile Money",
    description: "Orange Money, MTN MoMo, Wave, Moov Money, Airtel Money",
    icone: "📱",
    validation: "manuelle",
    actif: true,
    ordre: 1,
  },
  {
    code: "electronic",
    nom: "Paiement électronique",
    description: "CinetPay, Moneroo, FedaPay, Paystack, Flutterwave, Stripe",
    icone: "💳",
    validation: "auto",
    actif: true,
    ordre: 2,
  },
  {
    code: "virement_national",
    nom: "Virement bancaire national",
    description: "Virement vers un compte bancaire local",
    icone: "🏦",
    validation: "manuelle",
    actif: true,
    ordre: 3,
  },
  {
    code: "virement_international",
    nom: "Virement international",
    description: "IBAN / BIC-SWIFT",
    icone: "🌍",
    validation: "manuelle",
    actif: true,
    ordre: 4,
  },
  {
    code: "transfert_argent",
    nom: "Transfert d'argent",
    description: "Western Union, MoneyGram, Ria",
    icone: "💸",
    validation: "manuelle",
    actif: true,
    ordre: 5,
  },
  {
    code: "especes_agence",
    nom: "Espèces en agence",
    description: "Dépôt dans un point de collecte partenaire",
    icone: "🏪",
    validation: "code",
    actif: true,
    ordre: 6,
  },
  {
    code: "cheque",
    nom: "Chèque bancaire",
    description: "Envoi d'un chèque à l'adresse IBIG Soft",
    icone: "📄",
    validation: "manuelle",
    actif: true,
    ordre: 7,
  },
  {
    code: "crypto",
    nom: "Cryptomonnaie",
    description: "USDT, Bitcoin, Ethereum (TRC20, ERC20, BEP20)",
    icone: "₿",
    validation: "manuelle",
    actif: true,
    ordre: 8,
  },
  {
    code: "voucher",
    nom: "Voucher / Code prépayé",
    description: "Activez votre accès avec un code reçu d'un revendeur",
    icone: "🎟️",
    validation: "auto",
    actif: true,
    ordre: 9,
  },
  {
    code: "livraison",
    nom: "Paiement à la livraison",
    description: "Règlement à la réception auprès d'un agent IBIG Soft",
    icone: "🚚",
    validation: "manuelle",
    actif: false,
    ordre: 10,
  },
  {
    code: "autre",
    nom: "Autre moyen",
    description: "Contactez-nous pour un arrangement personnalisé",
    icone: "💬",
    validation: "manuelle",
    actif: false,
    ordre: 11,
  },
];

// Détails des opérateurs Mobile Money actifs
export const MOBILE_MONEY_OPERATORS: MobileMoneyConfig[] = [
  {
    operateur: "orange_money",
    nom: "Orange Money",
    actif: true,
    numeroReception: process.env.ORANGE_MONEY_NUMBER ?? "+225 XX XX XX XX",
    titulaire: "IBIG SARL",
    pays: ["CI", "SN", "ML", "BF", "CM"],
    instructions: "Envoyez le montant exact au numéro indiqué. Entrez votre numéro comme référence.",
  },
  {
    operateur: "mtn_momo",
    nom: "MTN Mobile Money",
    actif: true,
    numeroReception: process.env.MTN_MOMO_NUMBER ?? "+225 XX XX XX XX",
    titulaire: "IBIG SARL",
    pays: ["CI", "GH", "CM", "BJ"],
    instructions: "Transférez le montant exact. Utilisez votre email comme référence.",
  },
  {
    operateur: "wave",
    nom: "Wave",
    actif: true,
    numeroReception: process.env.WAVE_NUMBER ?? "+225 XX XX XX XX",
    titulaire: "IBIG SARL",
    pays: ["CI", "SN"],
    instructions: "Envoyez via Wave. Mentionnez votre nom et email dans le message.",
  },
  {
    operateur: "moov_money",
    nom: "Moov Money",
    actif: true,
    numeroReception: process.env.MOOV_MONEY_NUMBER ?? "+225 XX XX XX XX",
    titulaire: "IBIG SARL",
    pays: ["CI", "BJ", "BF"],
    instructions: "Transférez le montant exact. Notez votre numéro de transaction.",
  },
  {
    operateur: "airtel_money",
    nom: "Airtel Money",
    actif: false,
    numeroReception: "",
    titulaire: "IBIG SARL",
    pays: ["CI"],
    instructions: "",
  },
];

// Config virement national
export const VIREMENT_NATIONAL = {
  banque: process.env.BANK_NAME ?? "SGBCI",
  titulaire: "IBIG SARL",
  numeroCompte: process.env.BANK_ACCOUNT ?? "XX XXXXX XXXXXXXXXX XX",
  codeGuichet: process.env.BANK_CODE ?? "XXXXX",
  instructions: "Effectuez le virement et uploadez le justificatif ci-dessous.",
};

// Config virement international
export const VIREMENT_INTERNATIONAL = {
  iban: process.env.IBAN ?? "XX XX XXXX XXXX XXXX XXXX XXXX XXX",
  bic: process.env.BIC ?? "SGBCICIABXXX",
  banque: process.env.INT_BANK_NAME ?? "SGBCI",
  adresseBanque: "Abidjan, Côte d'Ivoire",
  titulaire: "IBIG SARL",
  instructions: "Précisez votre email et le plan choisi en référence du virement.",
};

// Config crypto
export const CRYPTO_WALLETS = [
  {
    crypto: "USDT",
    reseau: "TRC20",
    adresse: process.env.USDT_TRC20_ADDRESS ?? "TXxxx...xxx",
    actif: true,
  },
  {
    crypto: "USDT",
    reseau: "ERC20",
    adresse: process.env.USDT_ERC20_ADDRESS ?? "0x...",
    actif: true,
  },
  {
    crypto: "Bitcoin",
    reseau: "BTC",
    adresse: process.env.BTC_ADDRESS ?? "bc1...",
    actif: false,
  },
];

// Points de collecte espèces
export const AGENCES_COLLECTE = [
  {
    nom: "Bureau IBIG Soft — Abidjan",
    adresse: "Plateau, Avenue Franchet d'Esperey, Abidjan",
    horaires: "Lun–Ven 08h–17h",
    contact: "+225 27 22 27 60 14",
    actif: true,
  },
];
