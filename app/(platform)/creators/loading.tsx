import { SkeletonCard } from "@/components/afristream-loader"

export default function CreatorsLoading() {
  return (
    <div className="min-h-screen animate-fade-in p-4 md:p-6 space-y-10">
      {/* Featured creator hero */}
      <div className="relative h-72 animate-pulse overflow-hidden rounded-3xl bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end gap-4">
          <div className="size-20 rounded-2xl bg-white/20" />
          <div className="flex-1 space-y-2">
            <div className="h-6 w-1/3 rounded-lg bg-white/20" />
            <div className="h-4 w-1/4 rounded bg-white/10" />
          </div>
          <div className="h-10 w-24 rounded-full bg-primary/30" />
        </div>
      </div>
      {/* Categories */}
      <div className="flex gap-2 overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-9 w-24 flex-shrink-0 animate-pulse rounded-full bg-white/10" />
        ))}
      </div>
      {/* Creator grid */}
      {[...Array(2)].map((_, s) => (
        <div key={s} className="space-y-3">
          <div className="h-5 w-40 animate-pulse rounded-lg bg-white/10" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
