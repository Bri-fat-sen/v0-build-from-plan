"use client"

import { cn } from "@/lib/utils"

// ─── Full-screen cinematic loader ─────────────────────────────────────────────
// "Afri" appears first, then "Stream" slides in orange. No shapes, no rings.
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
        "flex flex-col items-center justify-center bg-[#080808]",
        fullScreen ? "fixed inset-0 z-[200]" : "min-h-[420px] w-full"
      )}
    >
      {/* Logo — stacked, massive */}
      <div className="flex flex-col items-center leading-[0.9] select-none">
        <span className="loader-afri font-display font-black tracking-tighter text-white"
          style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}>
          Afri
        </span>
        <span className="loader-stream font-display font-black tracking-tighter text-primary"
          style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}>
          Stream
        </span>
      </div>

      {/* Thin orange line that grows left-to-right under the text */}
      <div className="mt-6 h-[2px] overflow-hidden" style={{ width: "clamp(8rem, 28vw, 22rem)" }}>
        <div className="loader-line h-full w-full bg-primary" />
      </div>

      {/* Optional message */}
      {message && (
        <p className="loader-message mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-white/30">
          {message}
        </p>
      )}
    </div>
  )
}

// ─── Inline / section loader ──────────────────────────────────────────────────
export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 bg-[#080808]">
      <div className="flex flex-col items-center leading-[0.9] select-none">
        <span className="loader-afri font-display text-4xl font-black tracking-tighter text-white sm:text-5xl">
          Afri
        </span>
        <span className="loader-stream font-display text-4xl font-black tracking-tighter text-primary sm:text-5xl">
          Stream
        </span>
      </div>
      <div className="h-[2px] w-32 overflow-hidden">
        <div className="loader-line h-full w-full bg-primary" />
      </div>
      {message && (
        <p className="loader-message font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
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

export function SkeletonSection({
  cards = 5,
  rows = 0,
  className,
}: {
  cards?: number
  rows?: number
  className?: string
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="h-5 w-36 animate-pulse rounded bg-white/[0.08]" />
        <div className="h-4 w-14 animate-pulse rounded bg-white/[0.05]" />
      </div>
      {cards > 0 && (
        <div className="grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:px-6">
          {Array.from({ length: cards }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {rows > 0 && (
        <div className="space-y-0.5">
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
