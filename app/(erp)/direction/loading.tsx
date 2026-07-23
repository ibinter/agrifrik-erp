export default function DirectionLoading() {
  return (
    <div className="flex-1 p-6 space-y-6 animate-pulse">
      <div className="h-8 w-56 bg-gray-200 rounded-xl" />
      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
        ))}
      </div>
      {/* Alertes + waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-64 bg-gray-200 rounded-2xl lg:col-span-2" />
        <div className="h-64 bg-gray-200 rounded-2xl" />
      </div>
      {/* Table */}
      <div className="h-52 bg-gray-200 rounded-2xl" />
    </div>
  );
}
