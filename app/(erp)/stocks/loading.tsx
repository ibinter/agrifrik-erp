export default function StocksLoading() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* 3 KPI skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
          />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"
            />
          ))}
        </div>
        {/* 8 lignes */}
        {Array.from({ length: 8 }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-50 dark:border-gray-800 last:border-0"
          >
            {Array.from({ length: 6 }).map((_, col) => (
              <div
                key={col}
                className="h-4 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"
                style={{ width: `${55 + ((row + col) % 5) * 9}%` }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
