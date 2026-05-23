"use client"

import { cn } from "@/lib/utils"

// ─── Full-Screen Splash Loader ────────────────────────────────────────────────
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
    <div className="fixed inset-0 z-[200] flex flex-col overflow-hidden bg-[#080808]">

      {/* Subtle orange fog — bottom left only */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[45vh] w-[45vw] rounded-full bg-primary/8 blur-[140px]" />

      {/* Top bar */}
      <div className="flex items-center justify-between px-8 pt-8 md:px-12 md:pt-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">afristream.com</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">v2.0</span>
      </div>

      {/* Main content — vertically centered */}
      <div className="flex flex-1 flex-col items-start justify-center px-8 md:px-12 lg:px-16">

        {/* Eyebrow */}
        <div className="loader-badge mb-6 flex items-center gap-2 opacity-0">
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            African Sound &amp; Vision
          </span>
        </div>

        {/* Giant stacked wordmark */}
        <div className="overflow-hidden">
          <div className="loader-afri block font-display text-[18vw] font-black leading-[0.88] tracking-tighter text-white opacity-0 md:text-[16vw] lg:text-[14vw]">
            Afri
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="loader-stream block font-display text-[18vw] font-black leading-[0.88] tracking-tighter text-primary opacity-0 md:text-[16vw] lg:text-[14vw]">
            Stream
          </div>
        </div>

        {/* Tagline */}
        <div className="loader-sub mt-8 opacity-0 md:mt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
            {message ?? "Music · Film · Culture"}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-8 pb-8 md:px-12 md:pb-10">

        {/* Animated dots */}
        <div className="mb-5 flex items-end gap-[3px]">
          {(["loader-dot-1","loader-dot-2","loader-dot-3","loader-dot-4","loader-dot-5"] as const).map((cls, i) => (
            <div
              key={i}
              className={cn("w-[3px] rounded-full bg-primary", cls)}
              style={{ height: 4 + i * 3 }}
            />
          ))}
        </div>

        {/* Progress line */}
        <div className="h-px w-full bg-white/[0.07]">
          <div
            className={cn(
              "h-full bg-primary",
              showProgress ? "transition-[width] duration-500 ease-out" : "loader-line-fill"
            )}
            style={showProgress ? { width: `${progress}%` } : undefined}
          />
        </div>

        {/* Bottom labels */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/20">Loading</span>
          {showProgress && (
            <span className="font-mono text-[10px] text-primary/70">{progress}%</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Inline / section loader ──────────────────────────────────────────────────
export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-8 py-16">
      {/* Compact stacked wordmark */}
      <div className="text-center leading-[0.9]">
        <div className="font-display text-4xl font-black tracking-tighter text-white">Afri</div>
        <div className="font-display text-4xl font-black tracking-tighter text-primary">Stream</div>
      </div>
      {/* Dots */}
      <div className="flex items-end gap-[3px]">
        {(["loader-dot-1","loader-dot-2","loader-dot-3","loader-dot-4","loader-dot-5"] as const).map((cls, i) => (
          <div key={i} className={cn("w-[3px] rounded-full bg-primary", cls)} style={{ height: 4 + i * 3 }} />
        ))}
      </div>
      {message && (
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">{message}</p>
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
