import { SkeletonRow } from "@/components/afristream-loader"

export default function ArtistsChartLoading() {
  return (
    <div className="min-h-screen animate-fade-in">
      {/* Podium hero */}
      <div className="h-72 animate-pulse bg-white/5 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-center gap-4">
          <div className="w-24 h-36 rounded-t-2xl bg-white/10" />
          <div className="w-24 h-48 rounded-t-2xl bg-primary/30" />
          <div className="w-24 h-28 rounded-t-2xl bg-white/10" />
        </div>
      </div>
      <div className="p-4 md:p-8 space-y-2">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex animate-pulse items-center gap-4 rounded-xl p-3" style={{ animationDelay: `${i * 0.04}s` }}>
            <div className="w-8 h-5 rounded bg-white/10" />
            <div className="size-14 rounded-full bg-white/10" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-white/10" />
              <div className="h-3 w-1/4 rounded bg-white/5" />
            </div>
            <div className="h-4 w-20 rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  )
}
