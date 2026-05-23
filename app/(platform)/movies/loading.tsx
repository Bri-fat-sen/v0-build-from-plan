import { SkeletonCard } from "@/components/afristream-loader"

export default function MoviesLoading() {
  return (
    <div className="min-h-screen animate-fade-in">
      {/* Cinematic hero skeleton */}
      <div className="relative h-[70vh] animate-pulse bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 space-y-4">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => <div key={i} className="h-6 w-16 rounded-full bg-white/20" />)}
          </div>
          <div className="h-16 w-3/4 rounded-2xl bg-white/10" />
          <div className="h-5 w-96 rounded-lg bg-white/10" />
          <div className="flex gap-3 pt-2">
            <div className="h-14 w-40 rounded-full bg-primary/30" />
            <div className="h-14 w-14 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
      <div className="space-y-10 p-4 md:p-6">
        {[...Array(3)].map((_, s) => (
          <div key={s} className="space-y-3">
            <div className="h-5 w-40 rounded-lg bg-white/10 animate-pulse" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
