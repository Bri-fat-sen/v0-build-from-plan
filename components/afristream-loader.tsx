"use client"

import { cn } from "@/lib/utils"

// ─── Full-Screen Splash Loader ───────────────────────────────────────────────
export function AfriStreamLoader({
  message,
  showProgress = false,
  progress = 0,
}: {
  message?: string
  showProgress?: boolean
  progress?: number
}) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-background">

      {/* Ambient glow layers — pure CSS, no JS */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] loader-pulse" />
        <div className="absolute left-1/4 top-2/3 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[80px] loader-pulse" style={{ animationDelay: "0.8s" }} />
        <div className="absolute right-1/4 top-1/4 h-[200px] w-[200px] rounded-full bg-white/[0.03] blur-[60px] loader-pulse" style={{ animationDelay: "1.6s" }} />
      </div>

      {/* Scan line sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08]">
        <div className="loader-scanline absolute h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Corner accents */}
      <div className="absolute left-6 top-6 h-8 w-8 border-l-2 border-t-2 border-primary/40 loader-fade-in" style={{ animationDelay: "0.3s" }} />
      <div className="absolute right-6 top-6 h-8 w-8 border-r-2 border-t-2 border-primary/40 loader-fade-in" style={{ animationDelay: "0.4s" }} />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-primary/40 loader-fade-in" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-primary/40 loader-fade-in" style={{ animationDelay: "0.6s" }} />

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-10">

        {/* Logo */}
        <div className="loader-logo-enter relative">
          {/* Blur glow behind text */}
          <div className="pointer-events-none absolute inset-0 -z-10 flex scale-110 select-none opacity-40 blur-2xl">
            <span className="font-display text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">Afri</span>
            <span className="font-display text-5xl font-black tracking-tighter text-primary md:text-7xl lg:text-8xl">Stream</span>
          </div>

          <div className="flex items-baseline">
            <span className="afri-text font-display text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
              Afri
            </span>
            <span className="stream-text font-display text-5xl font-black tracking-tighter text-primary md:text-7xl lg:text-8xl">
              Stream
            </span>
          </div>

          {/* Underline sweep */}
          <div className="mt-2 h-[2px] overflow-hidden rounded-full bg-white/10">
            <div className="loader-underline h-full rounded-full bg-gradient-to-r from-white/30 via-primary to-white/30" />
          </div>
        </div>

        {/* Equalizer bars — staggered pure CSS */}
        <div className="flex items-end gap-[5px]">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="eq-bar w-[5px] rounded-full bg-primary"
              style={{
                opacity: 0.5 + i * 0.07,
                animationDelay: `${i * 0.13}s`,
              }}
            />
          ))}
        </div>

        {/* Static message — no JS tick, no hydration mismatch */}
        {message && (
          <p className="loader-fade-in font-mono text-xs uppercase tracking-widest text-muted-foreground" style={{ animationDelay: "0.4s" }}>
            {message}
          </p>
        )}

        {/* Progress bar */}
        {showProgress && (
          <div className="loader-fade-in w-48 space-y-2 md:w-64" style={{ animationDelay: "0.5s" }}>
            <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-primary/70 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Inline variant ───────────────────────────────────────────────────────────
export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-6 py-16">
      <div className="flex items-baseline">
        <span className="afri-text font-display text-3xl font-black tracking-tighter text-white">Afri</span>
        <span className="stream-text font-display text-3xl font-black tracking-tighter text-primary">Stream</span>
      </div>
      <div className="flex items-end gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="eq-bar w-1 rounded-full bg-primary" style={{ animationDelay: `${i * 0.13}s` }} />
        ))}
      </div>
      {message && (
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{message}</p>
      )}
    </div>
  )
}

// ─── Skeleton primitives ──────────────────────────────────────────────────────
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse overflow-hidden rounded-xl bg-white/5", className)}>
      <div className="aspect-square bg-white/[0.07]" />
      <div className="space-y-2 p-3">
        <div className="h-3.5 w-3/4 rounded-md bg-white/10" />
        <div className="h-3 w-1/2 rounded-md bg-white/[0.06]" />
      </div>
    </div>
  )
}

export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex animate-pulse items-center gap-3 rounded-xl px-3 py-2.5", className)}>
      <div className="size-11 shrink-0 rounded-lg bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-2/5 rounded-md bg-white/10" />
        <div className="h-3 w-1/4 rounded-md bg-white/[0.06]" />
      </div>
      <div className="h-3 w-12 rounded-md bg-white/[0.06]" />
    </div>
  )
}

export function SkeletonHero({ className }: { className?: string }) {
  return (
    <div className={cn("relative animate-pulse overflow-hidden rounded-2xl bg-white/[0.04]", className)}>
      <div className="h-[55vh] min-h-[320px]">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full space-y-3 p-6">
          <div className="h-3 w-20 rounded-full bg-white/10" />
          <div className="h-8 w-2/3 rounded-lg bg-white/10" />
          <div className="h-3 w-1/3 rounded-md bg-white/[0.06]" />
          <div className="flex gap-3 pt-2">
            <div className="h-10 w-28 rounded-full bg-white/10" />
            <div className="h-10 w-10 rounded-full bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonSection({ cards = 5, rows = 0, className }: { cards?: number; rows?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 animate-pulse rounded-lg bg-white/10" />
        <div className="h-4 w-16 animate-pulse rounded-md bg-white/[0.06]" />
      </div>
      {cards > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: cards }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {rows > 0 && (
        <div className="space-y-1">
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
