// Full-height spinner used as the Suspense fallback while a lazy-loaded route or booking
// step's code is being fetched, and while auth/session state is still resolving.
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin w-8 h-8 border-4 border-[#0A2A6B] border-t-transparent rounded-full" />
  </div>
)
