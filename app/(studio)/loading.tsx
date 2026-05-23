export default function StudioLoading() {
  return (
    <div className="min-h-screen animate-fade-in p-4 md:p-6 space-y-6">
      {/* Welcome banner */}
      <div className="h-40 animate-pulse rounded-3xl bg-gradient-to-r from-primary/20 to-white/5" />
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white/5 p-5 space-y-3" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="size-10 rounded-xl bg-white/10" />
            <div className="h-8 w-20 rounded-lg bg-white/10" />
            <div className="h-3 w-24 rounded bg-white/5" />
          </div>
        ))}
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-white/5 p-4 space-y-3 h-28" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="size-8 rounded-lg bg-white/10" />
            <div className="h-4 w-2/3 rounded bg-white/10" />
          </div>
        ))}
      </div>
      {/* Chart area */}
      <div className="animate-pulse rounded-3xl bg-white/5 h-64 p-6 space-y-4">
        <div className="h-5 w-40 rounded-lg bg-white/10" />
        <div className="flex items-end gap-2 h-40 px-2">
          {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-lg bg-white/10" style={{ height: `${h}%`, animationDelay: `${i * 0.03}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
