export default function AdminLoading() {
  return (
    <div className="min-h-screen animate-fade-in p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-56 animate-pulse rounded-xl bg-white/10" />
          <div className="h-4 w-40 animate-pulse rounded-lg bg-white/5" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-28 animate-pulse rounded-xl bg-white/10" />
          <div className="h-10 w-28 animate-pulse rounded-xl bg-white/5" />
        </div>
      </div>
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white/5 p-5 space-y-3 border border-white/5" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="flex justify-between items-start">
              <div className="size-10 rounded-xl bg-white/10" />
              <div className="h-5 w-12 rounded-full bg-white/10" />
            </div>
            <div className="h-9 w-24 rounded-lg bg-white/10" />
            <div className="h-3 w-28 rounded bg-white/5" />
          </div>
        ))}
      </div>
      {/* Charts row */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="animate-pulse rounded-3xl bg-white/5 h-72 p-6 space-y-4">
          <div className="h-5 w-36 rounded-lg bg-white/10" />
          <div className="flex items-end gap-2 h-48 px-2">
            {[50, 70, 45, 80, 60, 90, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg bg-primary/20" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="animate-pulse rounded-3xl bg-white/5 h-72 p-6 space-y-4">
          <div className="h-5 w-44 rounded-lg bg-white/10" />
          <div className="space-y-3 pt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="flex-1 h-2 rounded-full bg-white/10" />
                <div className="h-3 w-8 rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Alerts */}
      <div className="space-y-2">
        <div className="h-5 w-36 animate-pulse rounded-lg bg-white/10" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex animate-pulse items-center gap-4 rounded-xl bg-white/5 p-4">
            <div className="size-8 rounded-full bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/5" />
            </div>
            <div className="h-8 w-20 rounded-lg bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
