import { AfriStreamLoader } from "@/components/afristream-loader"

export default function ChartsLoading() {
  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero skeleton */}
      <div className="relative h-[60vh] animate-pulse overflow-hidden bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 space-y-4">
          <div className="h-4 w-24 rounded-full bg-white/20" />
          <div className="h-16 w-2/3 rounded-2xl bg-white/10" />
          <div className="h-5 w-48 rounded-lg bg-white/10" />
          <div className="flex gap-3 pt-2">
            <div className="h-12 w-36 rounded-full bg-primary/30" />
            <div className="h-12 w-12 rounded-full bg-white/10" />
            <div className="h-12 w-12 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* Region pills */}
      <div className="flex gap-2 overflow-hidden px-4 py-6 md:px-8">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-8 w-20 flex-shrink-0 animate-pulse rounded-full bg-white/10" style={{ animationDelay: `${i * 0.05}s` }} />
        ))}
      </div>

      <div className="px-4 md:px-8 space-y-8">
        {/* Runner-up cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex animate-pulse gap-4 rounded-2xl bg-white/5 p-4">
              <div className="size-20 flex-shrink-0 rounded-xl bg-white/10" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 w-16 rounded bg-white/10" />
                <div className="h-5 w-3/4 rounded-lg bg-white/10" />
                <div className="h-4 w-1/2 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart rows */}
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex animate-pulse items-center gap-4 rounded-xl p-3" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="w-8 h-5 rounded bg-white/10" />
              <div className="size-12 rounded-lg bg-white/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded bg-white/10" />
                <div className="h-3 w-1/4 rounded bg-white/5" />
              </div>
              <div className="h-4 w-16 rounded bg-white/5" />
              <div className="h-4 w-12 rounded bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
