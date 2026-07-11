export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar skeleton */}
      <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 p-4 gap-3 shrink-0">
        {/* Logo */}
        <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mb-4" />
        {/* Nav items */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-9 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
            style={{ width: `${70 + (i % 3) * 10}%` }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar skeleton */}
        <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center px-6 gap-4 shrink-0">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex-1" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* 4 KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
              />
            ))}
          </div>

          {/* 2 grands blocs côte à côte */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          </div>

          {/* 3 petits blocs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
