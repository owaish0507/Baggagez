export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="h-80 bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
