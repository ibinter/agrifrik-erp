export default function MentionsLegales() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Mentions légales</h1>
      <p className="text-gray-500 text-sm mb-8">Dernière mise à jour : juillet 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">1. Éditeur du site</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-gray-700 space-y-1">
          <p><strong>Raison sociale :</strong> IBIG Soft SARL</p>
          <p><strong>Siège social :</strong> Abidjan, Côte d'Ivoire</p>
          <p><strong>Email :</strong> <a href="mailto:contact@ibigsoft.com" className="text-green-700">contact@ibigsoft.com</a></p>
          <p><strong>Site :</strong> <a href="https://ibigsoft.com" target="_blank" rel="noopener noreferrer" className="text-green-700">ibigsoft.com</a></p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">2. Directeur de la publication</h2>
        <p className="text-gray-600">Le directeur de la publication est le représentant légal de la société IBIG Soft SARL.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">3. Hébergement</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-gray-700 space-y-1">
          <p>Le site AGRIFRIK ERP est hébergé sur des serveurs dédiés sécurisés.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">4. Propriété intellectuelle</h2>
        <p className="text-gray-600">L'ensemble des éléments constituant le site AGRIFRIK ERP (textes, graphiques, logiciels, images, sons, etc.) est la propriété exclusive d'IBIG Soft SARL. Toute reproduction, représentation ou diffusion, en tout ou partie, sur quelque support ou par tout procédé que ce soit, est interdite sans autorisation écrite préalable.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">5. Limitation de responsabilité</h2>
        <p className="text-gray-600">IBIG Soft SARL ne peut être tenu pour responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder. Les informations présentées sur ce site sont fournies à titre indicatif et peuvent être modifiées à tout moment.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">6. Contact</h2>
        <p className="text-gray-600">Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à <a href="mailto:contact@agrifrik.com" className="text-green-700">contact@agrifrik.com</a>.</p>
      </section>
    </article>
  );
}
