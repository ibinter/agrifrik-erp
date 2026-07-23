export default function AnalyticsLoading() {
  return (
    <div className="flex-1 p-6 space-y-6 animate-pulse">
      {/* Topbar */}
      <div className="h-8 w-48 bg-gray-200 rounded-xl" />
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-2xl" />
        ))}
      </div>
      {/* Tabs */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-28 bg-gray-200 rounded-xl" />
        ))}
      </div>
      {/* Charts 2-col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-72 bg-gray-200 rounded-2xl" />
        <div className="h-72 bg-gray-200 rounded-2xl" />
      </div>
      {/* Table */}
      <div className="h-48 bg-gray-200 rounded-2xl" />
    </div>
  );
}
