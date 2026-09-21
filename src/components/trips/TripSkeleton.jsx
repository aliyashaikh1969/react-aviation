// Placeholder card shown while bookings are loading.
export const TripSkeleton = () => (
  <div className="bg-white rounded-3xl p-6 animate-pulse space-y-5">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-xl bg-gray-200" />
      <div className="space-y-2">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-3 w-28 bg-gray-100 rounded" />
      </div>
    </div>
    <div className="h-20 bg-gray-100 rounded-2xl" />
    <div className="h-12 bg-gray-100 rounded-2xl" />
  </div>
)
