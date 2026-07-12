import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Globe,
  Leaf,
  Package,
  ShieldCheck,
  Truck,
  Users,
  Wheat,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── NAVBAR ── */}
      <nav
        className="sticky top-0 z-50 border-b border-white/10"
        style={{ backgroundColor: "#1B5E20" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#4CAF50" }}>
              <Leaf size={20} color="white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-none">AGRIFRIK</span>
              <br />
              <span className="text-xs font-semibold leading-none" style={{ color: "#E65100", letterSpacing: "0.2em" }}>ERP</span>
            </div>
          </div>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {["Modules", "Tarifs", "À propos", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-sm font-medium text-green-100 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors"
            >
              Se connecter
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{ backgroundColor: "#E65100", color: "white" }}
            >
              Démarrer
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #0A1F0A 0%, #1B5E20 45%, #2E7D32 100%)",
        }}
      >
        {/* Décorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #A5D6A7, transparent)" }}
          />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Colonne gauche */}
          <div className="flex-1 flex flex-col items-start text-left max-w-xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{
                background: "rgba(255,255,255,0.14)",
                color: "#E8F5E9",
                border: "1px solid rgba(255,255,255,0.28)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              🌾 IA Agronomique v2.0 disponible
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight mb-5">
              L&apos;ERP Agricole conçu pour l&apos;
              <span style={{ color: "#A5D6A7" }}>Afrique</span>
            </h1>

            <p className="text-base sm:text-lg text-green-100 leading-relaxed mb-8">
              Gérez vos cultures, votre coopérative et vos exportations depuis une seule
              plateforme. De Abidjan à Singapour, AGRIFRIK accompagne les agriculteurs
              africains vers l&apos;excellence.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 w-full">
              {[
                { value: "50+", label: "modules ERP" },
                { value: "142", label: "coopérants actifs" },
                { value: "94%", label: "conformité RA" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: "#A5D6A7" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTA boutons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: "white", color: "#1B5E20" }}
              >
                Démarrer gratuitement
                <ArrowRight size={18} />
              </Link>
              <a
                href="#modules"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base transition-all hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.55)", color: "white" }}
              >
                Voir les modules
              </a>
            </div>

            <p className="text-sm" style={{ color: "#A5D6A7" }}>
              ✓ Sans carte de crédit &nbsp;·&nbsp; ✓ Données hébergées en Afrique
              &nbsp;·&nbsp; ✓ Support en français
            </p>
          </div>

          {/* Dashboard SVG */}
          <div className="flex-1 flex justify-center lg:justify-end relative">
            <svg
              viewBox="0 0 520 380"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-lg rounded-2xl"
              style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.45))" }}
            >
              <rect width="520" height="380" rx="12" fill="#1E1E2E" />
              <rect width="520" height="36" rx="12" fill="#2A2A3C" />
              <rect y="24" width="520" height="12" fill="#2A2A3C" />
              <circle cx="18" cy="18" r="5.5" fill="#FF5F57" />
              <circle cx="34" cy="18" r="5.5" fill="#FFBD2E" />
              <circle cx="50" cy="18" r="5.5" fill="#28C840" />
              <rect x="68" y="10" width="320" height="17" rx="8" fill="#3A3A50" />
              <text x="228" y="22" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace">
                agrifrik.ibigsoft.com/dashboard
              </text>
              <rect y="36" x="0" width="520" height="344" fill="#F8FBF8" />
              <rect y="36" x="0" width="72" height="344" fill="#1A2E1A" />
              <rect x="18" y="52" width="36" height="14" rx="4" fill="#4CAF50" />
              <text x="36" y="63" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">AGRI</text>
              {[80, 104, 128, 152, 176, 200, 224, 248, 272].map((y, i) => (
                <g key={i}>
                  <rect x="18" y={y} width="36" height="18" rx="5" fill={i === 0 ? "#2E7D32" : "rgba(255,255,255,0.07)"} />
                  <rect x="24" y={y + 5} width="10" height="2" rx="1" fill={i === 0 ? "white" : "#4CAF50"} />
                  <rect x="24" y={y + 9} width="7" height="2" rx="1" fill={i === 0 ? "white" : "rgba(76,175,80,0.5)"} />
                </g>
              ))}
              <text x="90" y="60" fill="#1B5E20" fontSize="14" fontWeight="bold">Tableau de Bord</text>
              <text x="90" y="73" fill="#6B7280" fontSize="8">Bienvenue, Jean-Baptiste · Campagne 2025-2026</text>
              <rect x="90" y="80" width="416" height="1" fill="#E5E7EB" />
              {[
                { label: "Cultures actives", val: "143 ha", color: "#2E7D32", bg: "#E8F5E9" },
                { label: "CA ce mois", val: "12,4 M", color: "#1565C0", bg: "#E3F2FD" },
                { label: "Employés", val: "287", color: "#E65100", bg: "#FFF3E0" },
                { label: "Conf. RA", val: "94,2%", color: "#6A1B9A", bg: "#F3E5F5" },
              ].map((kpi, i) => (
                <g key={i}>
                  <rect x={90 + i * 108} y="90" width="100" height="52" rx="8" fill={kpi.bg} opacity="0.8" />
                  <text x={95 + i * 108} y="105" fill="#6B7280" fontSize="7">{kpi.label}</text>
                  <text x={95 + i * 108} y="122" fill={kpi.color} fontSize="13" fontWeight="bold">{kpi.val}</text>
                  <text x={95 + i * 108} y="133" fill="#9CA3AF" fontSize="6">↑ +8% ce mois</text>
                </g>
              ))}
              <rect x="90" y="154" width="264" height="100" rx="8" fill="white" />
              <text x="102" y="170" fill="#374151" fontSize="9" fontWeight="600">Rendement mensuel (t)</text>
              {[40, 55, 38, 62, 48, 70].map((h, i) => (
                <g key={i}>
                  <rect x={108 + i * 38} y={230 - h} width="22" height={h} rx="4" fill={i === 5 ? "#2E7D32" : "#A5D6A7"} />
                  <text x={119 + i * 38} y="242" textAnchor="middle" fill="#9CA3AF" fontSize="6">
                    {["Jan", "Fév", "Mar", "Avr", "Mai", "Jun"][i]}
                  </text>
                </g>
              ))}
              <rect x="364" y="154" width="142" height="100" rx="8" fill="white" />
              <text x="376" y="170" fill="#374151" fontSize="9" fontWeight="600">Lots récents</text>
              {[
                { lot: "LOT-2025-083", st: "Certifié RA", color: "#2E7D32" },
                { lot: "LOT-2025-082", st: "En transit", color: "#1565C0" },
                { lot: "LOT-2025-081", st: "Livré", color: "#6B7280" },
              ].map((row, i) => (
                <g key={i}>
                  <text x="376" y={185 + i * 20} fill="#374151" fontSize="7">{row.lot}</text>
                  <rect x="376" y={189 + i * 20} width="36" height="9" rx="4" fill={row.color} opacity="0.12" />
                  <text x="394" y={196 + i * 20} textAnchor="middle" fill={row.color} fontSize="6">{row.st}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Bande partenaires */}
        <div className="border-t border-white/10 py-5">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-6">
            <p className="text-xs font-semibold text-green-300 whitespace-nowrap uppercase tracking-wider">
              Reconnu par
            </p>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              {["FAO", "ANADER", "CNRA", "Rainforest Alliance", "BCC", "World Bank"].map((p) => (
                <span key={p} className="text-sm font-bold text-green-200 opacity-60">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MODULES ── */}
      <section id="modules" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#1B5E20" }}>
              50+ modules pour toute votre exploitation
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              De la graine à l&apos;export, gérez chaque aspect de votre activité agricole depuis une seule interface.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Wheat,
                title: "Production",
                desc: "Cultures, élevage, pisciculture, semences, planning cultural",
                color: "#2E7D32",
                bg: "#E8F5E9",
              },
              {
                icon: Package,
                title: "Logistique",
                desc: "Stocks, entrepôts, matériels, intrants, fournisseurs",
                color: "#1565C0",
                bg: "#E3F2FD",
              },
              {
                icon: Truck,
                title: "Commerce",
                desc: "Ventes, exportation, importation, traçabilité, audit qualité",
                color: "#E65100",
                bg: "#FFF3E0",
              },
              {
                icon: BarChart3,
                title: "Finance",
                desc: "Comptabilité, trésorerie, budget, prévisions, actifs",
                color: "#6A1B9A",
                bg: "#F3E5F5",
              },
              {
                icon: Users,
                title: "Ressources Humaines",
                desc: "RH, paie, formations, coopérative, gestion des terres",
                color: "#00695C",
                bg: "#E0F2F1",
              },
              {
                icon: Globe,
                title: "Rapports & Analytics",
                desc: "Tableaux de bord, rapports terrain, rapport annuel, bailleurs",
                color: "#AD1457",
                bg: "#FCE4EC",
              },
              {
                icon: ShieldCheck,
                title: "Conformité & IA",
                desc: "IA agronomique, météo, certifications Rainforest Alliance",
                color: "#F57F17",
                bg: "#FFFDE7",
              },
              {
                icon: Leaf,
                title: "Administration",
                desc: "Paramètres, alertes, logs, portail producteur, RSE",
                color: "#37474F",
                bg: "#ECEFF1",
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={22} color={color} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVANTAGES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#1B5E20" }}>
                Conçu pour les réalités africaines
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                AGRIFRIK comprend les défis spécifiques des exploitations africaines : connectivité intermittente,
                conformité multi-certifications, exportation vers l&apos;Europe et l&apos;Asie.
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: "Mode hors-ligne",
                    desc: "Continuez à travailler sans connexion internet. Les données se synchronisent automatiquement.",
                  },
                  {
                    title: "Multilingue",
                    desc: "Interface disponible en français, anglais et bientôt en langues locales africaines.",
                  },
                  {
                    title: "Certifications intégrées",
                    desc: "Rainforest Alliance, GlobalG.A.P., ISO 9001, UTZ — toutes gérées depuis un seul endroit.",
                  },
                  {
                    title: "Paiements locaux",
                    desc: "Intégration Mobile Money (Orange Money, MTN), virement BCEAO, et Moneroo.",
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                      style={{ backgroundColor: "#E8F5E9" }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2E7D32" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm mb-0.5">{title}</div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Illustration */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}>
              <div className="p-8">
                <div className="text-white font-bold text-lg mb-2">Tableau de bord en temps réel</div>
                <div className="text-green-200 text-sm mb-6">Vue d&apos;ensemble de votre exploitation</div>
                {/* Mini dashboard */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Rendement", val: "143 t", change: "+12%" },
                    { label: "Revenus", val: "12,4 M", change: "+8%" },
                    { label: "Employés", val: "287", change: "+3" },
                    { label: "Conformité", val: "94,2%", change: "RA" },
                  ].map(({ label, val, change }) => (
                    <div key={label} className="bg-white/10 rounded-xl p-3">
                      <div className="text-green-200 text-xs">{label}</div>
                      <div className="text-white font-bold text-lg">{val}</div>
                      <div className="text-green-300 text-xs">{change}</div>
                    </div>
                  ))}
                </div>
                {/* Mini barchart */}
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="text-green-200 text-xs mb-2">Production mensuelle (t)</div>
                  <div className="flex items-end gap-1 h-12">
                    {[40, 60, 45, 75, 55, 80, 65].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i === 6 ? "#E65100" : "rgba(255,255,255,0.3)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section id="tarifs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#1B5E20" }}>
              Tarifs simples et transparents
            </h2>
            <p className="text-gray-500">Commencez gratuitement. Évoluez selon vos besoins.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                plan: "Starter",
                price: "11 900 XOF",
                period: "/ mois",
                trial: "30 jours d'essai gratuit",
                target: "Petite exploitation individuelle",
                features: ["10 modules ERP", "2 utilisateurs", "1 exploitation", "Support email", "Rapports de base"],
                cta: "Essayer gratuitement",
                featured: false,
              },
              {
                plan: "Pro",
                price: "24 900 XOF",
                period: "/ mois",
                trial: "30 jours d'essai gratuit",
                target: "Exploitation familiale / PME agricole",
                features: ["25 modules ERP", "10 utilisateurs", "3 exploitations", "Support prioritaire", "Analytics avancés"],
                cta: "Essayer gratuitement",
                featured: false,
              },
              {
                plan: "Business",
                price: "39 900 XOF",
                period: "/ mois",
                trial: "30 jours d'essai gratuit",
                target: "Coopérative / Groupement",
                features: ["40 modules ERP", "30 utilisateurs", "10 exploitations", "Support 24h/7j", "IA agronomique incluse"],
                cta: "Essayer gratuitement",
                featured: true,
              },
              {
                plan: "Entreprise",
                price: "99 900 XOF",
                period: "/ mois",
                trial: "30 jours d'essai gratuit",
                target: "Grande exploitation / Exportateur",
                features: ["50+ modules ERP", "Utilisateurs illimités", "Exploitations illimitées", "Manager dédié", "Déploiement cloud privé"],
                cta: "Essayer gratuitement",
                featured: false,
              },
            ].map(({ plan, price, period, trial, target, features, cta, featured }) => (
              <div
                key={plan}
                className={`rounded-2xl p-6 flex flex-col ${featured ? "text-white shadow-xl scale-105" : "bg-white border border-gray-100"}`}
                style={featured ? { background: "linear-gradient(135deg, #1B5E20, #2E7D32)" } : {}}
              >
                {featured && (
                  <div className="text-xs font-bold px-2 py-1 rounded-full bg-white/20 text-white self-start mb-3">
                    ⭐ Le plus populaire
                  </div>
                )}
                <div className={`text-sm font-bold mb-1 ${featured ? "text-green-200" : "text-gray-500"}`}>{plan}</div>
                <div className={`text-xs mb-2 ${featured ? "text-green-300" : "text-gray-400"}`}>{target}</div>
                <div className={`text-2xl font-bold mb-0.5 ${featured ? "text-white" : "text-gray-900"}`}>{price}</div>
                <div className={`text-xs mb-2 ${featured ? "text-green-300" : "text-gray-400"}`}>{period}</div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded-lg mb-5 self-start ${featured ? "bg-white/15 text-green-200" : "bg-green-50 text-green-700"}`}
                >
                  🎁 {trial}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className={featured ? "text-green-300" : "text-green-600"}>✓</span>
                      <span className={featured ? "text-green-100" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 ${
                    featured
                      ? "bg-white text-green-800"
                      : "border border-gray-200 text-gray-700 hover:border-green-600 hover:text-green-700"
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0A1F0A 0%, #1B5E20 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Prêt à transformer votre exploitation ?
          </h2>
          <p className="text-green-200 mb-8 text-lg">
            Rejoignez 142+ exploitations qui gèrent leur activité avec AGRIFRIK ERP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-105"
              style={{ backgroundColor: "white", color: "#1B5E20" }}
            >
              Démarrer gratuitement
              <ArrowRight size={18} />
            </Link>
            <a
              href="mailto:contact@ibigsoft.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all hover:bg-white/10"
              style={{ border: "2px solid rgba(255,255,255,0.4)" }}
            >
              Contacter l&apos;équipe
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#2E7D32" }}>
                  <Leaf size={16} color="white" />
                </div>
                <div>
                  <div className="text-white font-bold">AGRIFRIK</div>
                  <div className="text-xs" style={{ color: "#E65100" }}>ERP</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                L&apos;ERP agricole conçu pour l&apos;Afrique. Hébergé localement. Support en français.
              </p>
            </div>
            {[
              {
                title: "Produit",
                links: ["Modules", "Tarifs", "Nouveautés", "Feuille de route"],
              },
              {
                title: "Entreprise",
                links: ["À propos", "Carrières", "Blog", "Partenaires"],
              },
              {
                title: "Support",
                links: ["Documentation", "API", "Tutoriels", "Contact"],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="text-white font-semibold text-sm mb-4">{title}</div>
                <ul className="space-y-2">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm hover:text-white transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span>© 2026 IBIG Soft. Tous droits réservés.</span>
            <div className="flex gap-5">
              <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="/cgu" className="hover:text-white transition-colors">CGU</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
