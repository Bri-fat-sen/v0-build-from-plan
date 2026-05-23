export default function SearchLoading() {
  return (
    <div className="min-h-screen animate-fade-in p-4 md:p-6 space-y-8">
      {/* Search bar skeleton */}
      <div className="h-14 w-full animate-pulse rounded-2xl bg-white/10" />
      {/* Genre grid */}
      <div className="space-y-3">
        <div className="h-5 w-32 rounded-lg bg-white/10 animate-pulse" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/10" style={{ animationDelay: `${i * 0.04}s` }} />
          ))}
        </div>
      </div>
      {/* Recent searches */}
      <div className="space-y-3">
        <div className="h-5 w-36 rounded-lg bg-white/10 animate-pulse" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex animate-pulse items-center gap-4 rounded-xl p-3" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="size-12 rounded-lg bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-white/10" />
              <div className="h-3 w-1/4 rounded bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
