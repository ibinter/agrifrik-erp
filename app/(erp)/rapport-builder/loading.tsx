export default function RapportBuilderLoading() {
  return (
    <div className="flex-1 p-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded-xl mb-6" />
      {/* 3-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-[600px] bg-gray-200 rounded-2xl" />
        <div className="h-[600px] bg-gray-200 rounded-2xl" />
        <div className="h-[600px] bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );
}
