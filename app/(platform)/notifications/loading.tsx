export default function NotificationsLoading() {
  return (
    <div className="min-h-screen animate-fade-in p-4 md:p-6 space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 animate-pulse rounded-xl bg-white/10" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-white/10" />
      </div>
      {/* Filter tabs */}
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-9 w-20 animate-pulse rounded-full bg-white/10" />
        ))}
      </div>
      {/* Notification items */}
      <div className="space-y-1">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex animate-pulse items-start gap-4 rounded-2xl bg-white/5 p-4" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="size-10 flex-shrink-0 rounded-full bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded-lg bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/5" />
              <div className="h-3 w-1/4 rounded bg-white/5" />
            </div>
            <div className="size-2 rounded-full bg-primary/50 mt-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
