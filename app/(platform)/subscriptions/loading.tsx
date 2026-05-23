export default function SubscriptionsLoading() {
  return (
    <div className="min-h-screen animate-fade-in p-4 md:p-6 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <div className="h-10 w-72 animate-pulse rounded-2xl bg-white/10 mx-auto" />
        <div className="h-5 w-96 animate-pulse rounded-lg bg-white/5 mx-auto" />
        {/* Toggle */}
        <div className="h-10 w-48 animate-pulse rounded-full bg-white/10 mx-auto" />
      </div>
      {/* Tier cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-3xl bg-white/5 p-6 space-y-4 border border-white/5" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="h-6 w-20 rounded-lg bg-white/10" />
            <div className="h-10 w-28 rounded-xl bg-white/10" />
            <div className="h-4 w-full rounded bg-white/5" />
            <div className="space-y-2 pt-2">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="flex gap-2 items-center">
                  <div className="size-4 rounded-full bg-primary/30" />
                  <div className="h-3 flex-1 rounded bg-white/10" />
                </div>
              ))}
            </div>
            <div className="h-11 w-full animate-pulse rounded-full bg-white/10 mt-2" />
          </div>
        ))}
      </div>
      {/* Payment methods */}
      <div className="rounded-3xl bg-white/5 p-6 space-y-4">
        <div className="h-5 w-44 animate-pulse rounded-lg bg-white/10" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-2xl bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  )
}
