"use client"

import { cn } from "@/lib/utils"

// ─── Cinematic Centered Loader ────────────────────────────────────────────────
export function AfriStreamLoader({
  message,
  fullScreen = true,
}: {
  message?: string
  fullScreen?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center overflow-hidden",
        fullScreen
          ? "fixed inset-0 z-[200] bg-[#050505]"
          : "min-h-[400px] w-full bg-background"
      )}
    >
      {/* Cinematic ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main orange glow - centered behind text */}
        <div className="loader-glow absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
        
        {/* Secondary glow - offset */}
        <div className="loader-glow absolute left-1/3 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px]" style={{ animationDelay: "0.8s" }} />
        
        {/* Subtle film grain overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
      </div>

      {/* Outer spinning rings - cinematic orbits */}
      <div className="absolute">
        {/* Outer ring */}
        <div className="loader-ring-outer absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />
        <div className="loader-ring-outer absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/60" />
        </div>
        
        {/* Inner ring */}
        <div className="loader-ring-inner absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
        <div className="loader-ring-inner absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary/40" />
        </div>
      </div>

      {/* Main logo container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo text - BIG and BOLD */}
        <div className="relative flex flex-col items-center leading-[0.85]">
          {/* Glow layer behind text */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex flex-col items-center blur-2xl">
            <span className="font-display text-7xl font-black tracking-tight text-white/30 sm:text-8xl md:text-9xl">
              Afri
            </span>
            <span className="font-display text-7xl font-black tracking-tight text-primary/40 sm:text-8xl md:text-9xl">
              Stream
            </span>
          </div>
          
          {/* Actual text */}
          <span className="loader-afri font-display text-7xl font-black tracking-tight text-white sm:text-8xl md:text-9xl">
            Afri
          </span>
          <span className="loader-stream font-display text-7xl font-black tracking-tight text-primary sm:text-8xl md:text-9xl">
            Stream
          </span>
        </div>

        {/* Shimmer line under logo */}
        <div className="loader-shimmer mt-6 h-[2px] w-48 rounded-full sm:w-64" />

        {/* Lens flare accent */}
        <div className="loader-flare absolute -right-8 top-4 h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-sm sm:-right-12 sm:w-24" />
      </div>

      {/* Message */}
      {message && (
        <p className="loader-message relative z-10 mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
          {message}
        </p>
      )}

      {/* Corner cinematics */}
      {fullScreen && (
        <>
          <div className="absolute left-6 top-6 h-12 w-12 border-l border-t border-white/10" />
          <div className="absolute right-6 top-6 h-12 w-12 border-r border-t border-white/10" />
          <div className="absolute bottom-6 left-6 h-12 w-12 border-b border-l border-white/10" />
          <div className="absolute bottom-6 right-6 h-12 w-12 border-b border-r border-white/10" />
        </>
      )}
    </div>
  )
}

// ─── Inline / section loader (smaller version) ────────────────────────────────
export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <div className="relative flex flex-col items-center">
        {/* Glow */}
        <div className="loader-glow absolute h-32 w-32 rounded-full bg-primary/15 blur-[50px]" />
        
        {/* Rings */}
        <div className="loader-ring-outer absolute h-36 w-36 rounded-full border border-white/[0.05]">
          <div className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary/50" />
        </div>
        
        {/* Text */}
        <div className="relative z-10 flex flex-col items-center leading-[0.85]">
          <span className="loader-afri font-display text-3xl font-black tracking-tight text-white">
            Afri
          </span>
          <span className="loader-stream font-display text-3xl font-black tracking-tight text-primary">
            Stream
          </span>
        </div>
      </div>
      
      {message && (
        <p className="loader-message font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          {message}
        </p>
      )}
    </div>
  )
}

// ─── Skeleton primitives ──────────────────────────────────────────────────────
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse overflow-hidden rounded-xl bg-white/[0.04]", className)}>
      <div className="aspect-square bg-white/[0.06]" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-3/4 rounded bg-white/[0.08]" />
        <div className="h-3 w-1/2 rounded bg-white/[0.05]" />
      </div>
    </div>
  )
}

export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex animate-pulse items-center gap-3 rounded-xl px-3 py-2.5", className)}>
      <div className="size-11 shrink-0 rounded-lg bg-white/[0.08]" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-2/5 rounded bg-white/[0.08]" />
        <div className="h-3 w-1/4 rounded bg-white/[0.05]" />
      </div>
      <div className="h-3 w-10 rounded bg-white/[0.05]" />
    </div>
  )
}

export function SkeletonHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative animate-pulse overflow-hidden rounded-2xl bg-white/[0.03]", className)}>
      <div className="h-[55vh] min-h-[300px]">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full space-y-3 p-6">
          <div className="h-3 w-16 rounded bg-white/[0.08]" />
          <div className="h-7 w-1/2 rounded-lg bg-white/[0.08]" />
          <div className="h-3 w-1/3 rounded bg-white/[0.05]" />
          <div className="flex gap-3 pt-2">
            <div className="h-10 w-28 rounded-full bg-white/[0.08]" />
            <div className="size-10 rounded-full bg-white/[0.05]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonSection({ cards = 5, rows = 0, className }: { cards?: number; rows?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="h-5 w-36 animate-pulse rounded bg-white/[0.08]" />
        <div className="h-4 w-14 animate-pulse rounded bg-white/[0.05]" />
      </div>
      {cards > 0 && (
        <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:px-6">
          {Array.from({ length: cards }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}
      {rows > 0 && (
        <div className="space-y-0.5">
          {Array.from({ length: rows }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      )}
    </div>
  )
}
