import { SkeletonHero, SkeletonCard } from "@/components/afristream-loader"

export default function MusicLoading() {
  return (
    <div className="min-h-screen space-y-10 p-4 md:p-6 animate-fade-in">
      <SkeletonHero />
      {/* Featured section */}
      <div className="space-y-3">
        <div className="h-5 w-40 rounded-lg bg-white/10 animate-pulse" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
      {/* Genre pills */}
      <div className="flex gap-2 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-9 w-24 flex-shrink-0 animate-pulse rounded-full bg-white/10" style={{ animationDelay: `${i * 0.05}s` }} />
        ))}
      </div>
      {/* New releases */}
      <div className="space-y-3">
        <div className="h-5 w-32 rounded-lg bg-white/10 animate-pulse" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  )
}
