export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#F8FBF8" }}>

      {/* Skeleton topbar */}
      <div className="h-16 w-full bg-white border-b border-gray-100 flex items-center px-6 gap-4 animate-pulse shrink-0">
        <div className="h-4 w-36 bg-gray-200 rounded-lg" />
        <div className="h-3 w-1 bg-gray-100 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded-lg" />
        <div className="flex-1" />
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
        <div className="h-8 w-32 bg-gray-200 rounded-xl" />
      </div>

      <div className="flex-1 p-6 space-y-6 animate-pulse">

        {/* Skeleton breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-3 w-3 bg-gray-100 rounded" />
          <div className="h-6 w-28 bg-gray-200 rounded-full" />
        </div>

        {/* Skeleton 4 KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-8 bg-gray-100 rounded-xl" />
              </div>
              <div className="h-7 w-20 bg-gray-200 rounded-lg" />
              <div className="h-2 w-16 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        {/* Skeleton tableau */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
          {/* En-tête tableau */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3" style={{ background: "#F8FBF8" }}>
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="flex-1" />
            <div className="h-8 w-24 bg-gray-200 rounded-xl" />
            <div className="h-8 w-20 bg-gray-200 rounded-xl" />
          </div>
          {/* Lignes tableau */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`px-5 py-3.5 flex items-center gap-4 border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <div className="h-3 w-4 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="flex-1" />
              <div className="h-5 w-16 bg-gray-200 rounded-full" />
              <div className="h-6 w-6 bg-gray-100 rounded-lg" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
