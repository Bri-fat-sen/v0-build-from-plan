export default function ShortsLoading() {
  return (
    <div className="h-dvh w-full bg-black animate-fade-in relative overflow-hidden">
      {/* Background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      {/* Fake video skeleton */}
      <div className="absolute inset-0 animate-pulse bg-white/5" />
      {/* Right side action buttons */}
      <div className="absolute right-3 bottom-32 flex flex-col gap-6 items-center">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="size-11 animate-pulse rounded-full bg-white/20" style={{ animationDelay: `${i * 0.1}s` }} />
            <div className="h-3 w-6 animate-pulse rounded bg-white/10" />
          </div>
        ))}
      </div>
      {/* Bottom creator info */}
      <div className="absolute bottom-8 left-4 right-16 space-y-3">
        <div className="flex items-center gap-3">
          <div className="size-10 animate-pulse rounded-full bg-white/30" />
          <div className="h-4 w-32 animate-pulse rounded-lg bg-white/30" />
          <div className="h-7 w-16 animate-pulse rounded-full bg-white/20" />
        </div>
        <div className="h-4 w-3/4 animate-pulse rounded-lg bg-white/20" />
        <div className="h-4 w-1/2 animate-pulse rounded-lg bg-white/20" />
        {/* Sound disc */}
        <div className="absolute bottom-0 right-0 size-12 animate-pulse rounded-full bg-white/20" />
      </div>
    </div>
  )
}
