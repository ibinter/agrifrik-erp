export default function RapportAnnuelLoading() {
  return (
    <div className="flex-1 p-6 space-y-6 animate-pulse">
      {/* Header bandeau */}
      <div className="h-20 bg-gray-200 rounded-2xl" />
      {/* Tabs */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-32 bg-gray-200 rounded-xl" />
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-gray-200 rounded-2xl" />
        <div className="h-80 bg-gray-200 rounded-2xl" />
      </div>
      <div className="h-48 bg-gray-200 rounded-2xl" />
    </div>
  );
}
