export default function PolitiqueConfidentialite() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Politique de confidentialité</h1>
      <p className="text-gray-500 text-sm mb-8">Dernière mise à jour : juillet 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">1. Responsable du traitement</h2>
        <p className="text-gray-600">IBIG Soft SARL, dont le siège est à Abidjan, Côte d'Ivoire, est responsable du traitement de vos données personnelles collectées via AGRIFRIK ERP.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">2. Données collectées</h2>
        <p className="text-gray-600">Nous collectons les données suivantes :</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
          <li><strong>Données d'identification :</strong> nom, prénom, email, numéro de téléphone</li>
          <li><strong>Données professionnelles :</strong> nom d'entreprise, secteur, fonction</li>
          <li><strong>Données d'usage :</strong> logs de connexion, actions réalisées dans l'application</li>
          <li><strong>Données techniques :</strong> adresse IP, type de navigateur, système d'exploitation</li>
          <li><strong>Données agricoles :</strong> données saisies par l'utilisateur dans le cadre de son activité</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">3. Finalités du traitement</h2>
        <p className="text-gray-600">Vos données sont traitées pour :</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
          <li>Fournir et améliorer le service AGRIFRIK ERP</li>
          <li>Gérer votre compte et votre abonnement</li>
          <li>Vous envoyer des communications relatives au service (support, mises à jour)</li>
          <li>Analyser l'utilisation du service à des fins d'amélioration</li>
          <li>Respecter nos obligations légales</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">4. Conservation des données</h2>
        <p className="text-gray-600">Vos données sont conservées pendant la durée de votre abonnement et jusqu'à 3 ans après sa résiliation, sauf obligation légale de conservation plus longue. Les données agricoles peuvent être exportées avant résiliation.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">5. Vos droits</h2>
        <p className="text-gray-600">Conformément à la législation applicable, vous disposez des droits suivants :</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement (sous conditions)</li>
          <li>Droit à la portabilité</li>
          <li>Droit d'opposition au traitement</li>
        </ul>
        <p className="text-gray-600 mt-3">Pour exercer ces droits : <a href="mailto:privacy@agrifrik.com" className="text-green-700">privacy@agrifrik.com</a></p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">6. Sécurité</h2>
        <p className="text-gray-600">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement TLS, accès restreints, sauvegardes régulières, journaux d'accès.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-3">7. Contact</h2>
        <p className="text-gray-600">Pour toute question : <a href="mailto:privacy@agrifrik.com" className="text-green-700">privacy@agrifrik.com</a></p>
      </section>
    </article>
  );
}
