import { SkeletonCard } from "@/components/afristream-loader"

export default function PodcastsLoading() {
  return (
    <div className="min-h-screen animate-fade-in p-4 md:p-6 space-y-10">
      {/* Featured */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex animate-pulse gap-4 rounded-3xl bg-white/5 p-5">
            <div className="size-24 flex-shrink-0 rounded-2xl bg-white/10" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-5 w-3/4 rounded-lg bg-white/10" />
              <div className="h-3 w-full rounded bg-white/5" />
              <div className="h-3 w-2/3 rounded bg-white/5" />
              <div className="h-8 w-24 rounded-full bg-primary/20" />
            </div>
          </div>
        ))}
      </div>
      {/* Categories */}
      <div className="flex gap-2 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-9 w-24 flex-shrink-0 animate-pulse rounded-full bg-white/10" />
        ))}
      </div>
      {/* Episode list */}
      <div className="space-y-3">
        <div className="h-5 w-40 animate-pulse rounded-lg bg-white/10" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex animate-pulse items-start gap-4 rounded-2xl bg-white/5 p-4" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="size-16 flex-shrink-0 rounded-xl bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded-lg bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/5" />
              <div className="h-3 w-1/3 rounded bg-white/5" />
            </div>
            <div className="size-10 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
