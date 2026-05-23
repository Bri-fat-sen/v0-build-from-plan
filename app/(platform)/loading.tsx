import { SkeletonHero, SkeletonCard, SkeletonRow } from "@/components/afristream-loader"

export default function PlatformLoading() {
  return (
    <div className="min-h-screen space-y-10 p-4 md:p-6 animate-fade-in">
      <SkeletonHero />
      <div className="space-y-3">
        <div className="h-5 w-32 rounded-lg bg-white/10 animate-pulse" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-5 w-40 rounded-lg bg-white/10 animate-pulse" />
        <div className="space-y-1">
          {[...Array(6)].map((_, i) => <SkeletonRow key={i} />)}
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-5 w-36 rounded-lg bg-white/10 animate-pulse" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  )
}
