export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FBF8] px-4 text-center">
      <div className="mb-6 text-8xl select-none">📡</div>
      <h1 className="text-2xl font-black text-gray-700 mb-2">Vous êtes hors ligne</h1>
      <p className="text-sm text-gray-500 max-w-sm mb-6">
        Vérifiez votre connexion internet. Les données saisies en mode hors-ligne seront synchronisées automatiquement dès le retour de la connexion.
      </p>
      <button onClick={() => window.location.reload()}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#2E7D32" }}>
        Réessayer la connexion
      </button>
      <p className="text-xs text-gray-400 mt-4">
        Les pages récemment visitées restent accessibles en lecture seule.
      </p>
    </div>
  );
}
