export default function ERPLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Topbar skeleton */}
      <div className="h-16 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center px-6 gap-4 animate-pulse shrink-0">
        <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="flex-1" />
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl flex flex-col items-center gap-6">
          {/* Bloc central */}
          <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />

          {/* Texte chargement */}
          <p className="text-sm text-gray-300 dark:text-gray-600 font-medium tracking-wide">
            Chargement...
          </p>
        </div>
      </div>
    </div>
  );
}
