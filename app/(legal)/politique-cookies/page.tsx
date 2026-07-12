export default function PolitiqueCookies() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Politique de gestion des cookies</h1>
      <p className="text-gray-500 text-sm mb-8">Dernière mise à jour : juillet 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">1. Qu'est-ce qu'un cookie ?</h2>
        <p className="text-gray-600">Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet au site de mémoriser vos préférences et d'améliorer votre expérience.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">2. Les cookies que nous utilisons</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#1B5E20" }}>Nécessaires</span>
              <span className="text-xs text-gray-400">Toujours actifs</span>
            </div>
            <p className="text-sm text-gray-600">Ces cookies sont indispensables au fonctionnement du site. Ils permettent la session utilisateur, la sécurité des connexions et le bon fonctionnement de l'interface. Ils ne peuvent pas être désactivés.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">Préférences</span>
            </div>
            <p className="text-sm text-gray-600">Ces cookies mémorisent vos préférences : langue choisie, thème d'affichage, paramètres de l'interface. Ils améliorent votre confort d'utilisation.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">Statistiques</span>
            </div>
            <p className="text-sm text-gray-600">Ces cookies nous permettent d'analyser l'utilisation du site (pages visitées, durée de session, erreurs rencontrées) afin d'améliorer nos services. Les données sont anonymisées.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">Marketing</span>
            </div>
            <p className="text-sm text-gray-600">Ces cookies peuvent être utilisés pour vous proposer des contenus ou publicités personnalisés sur d'autres sites. Ils ne sont activés qu'avec votre consentement explicite.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">3. Gérer vos préférences</h2>
        <p className="text-gray-600">Vous pouvez modifier vos préférences à tout moment via la bannière cookie présente sur le site. Vous pouvez également configurer votre navigateur pour bloquer les cookies, mais cela peut affecter le fonctionnement de certaines fonctionnalités.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">4. Durée de conservation</h2>
        <p className="text-gray-600">Les cookies nécessaires sont supprimés à la fermeture du navigateur (cookies de session) ou conservés jusqu'à 12 mois (cookies persistants). Les autres cookies ont une durée maximale de 13 mois conformément aux recommandations de la CNIL.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">5. Contact</h2>
        <p className="text-gray-600">Pour toute question : <a href="mailto:privacy@agrifrik.com" className="text-green-700">privacy@agrifrik.com</a></p>
      </section>
    </article>
  );
}
