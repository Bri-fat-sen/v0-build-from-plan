export default function LiveLoading() {
  return (
    <div className="min-h-screen animate-fade-in p-4 md:p-6 space-y-10">
      {/* Live now hero */}
      <div className="relative h-80 animate-pulse overflow-hidden rounded-3xl bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute top-4 left-4">
          <div className="h-7 w-20 rounded-full bg-red-500/40 animate-pulse" />
        </div>
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <div className="h-8 w-2/3 rounded-xl bg-white/20" />
          <div className="h-4 w-1/3 rounded-lg bg-white/10" />
        </div>
      </div>
      {/* Category filters */}
      <div className="flex gap-2 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-9 w-24 flex-shrink-0 animate-pulse rounded-full bg-white/10" style={{ animationDelay: `${i * 0.05}s` }} />
        ))}
      </div>
      {/* Live stream grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white/5 overflow-hidden" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="aspect-video bg-white/10" />
            <div className="p-4 space-y-2">
              <div className="flex gap-3 items-center">
                <div className="size-8 rounded-full bg-white/10" />
                <div className="h-4 w-1/3 rounded bg-white/10" />
              </div>
              <div className="h-4 w-2/3 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
