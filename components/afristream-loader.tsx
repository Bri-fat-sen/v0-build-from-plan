"use client"

import { cn } from "@/lib/utils"

// ─── Centered Circle Loader ───────────────────────────────────────────────────
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
        "flex flex-col items-center justify-center bg-background",
        fullScreen ? "fixed inset-0 z-[200]" : "min-h-[420px] w-full"
      )}
    >
      {/* Container: big circle ring around the logo text */}
      <div className="relative flex items-center justify-center">

        {/* Outer soft pulse glow */}
        <div className="loader-pulse-ring absolute h-64 w-64 rounded-full bg-primary/[0.07]" />
        <div className="loader-pulse-ring absolute h-52 w-52 rounded-full bg-primary/[0.05]" style={{ animationDelay: "0.6s" }} />

        {/* SVG spinning arc — large ring */}
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          className="absolute"
          style={{ overflow: "visible" }}
        >
          {/* Track */}
          <circle
            cx="110"
            cy="110"
            r="105"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1.5"
          />
          {/* Animated arc */}
          <circle
            cx="110"
            cy="110"
            r="105"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="660"
            strokeDashoffset="660"
            className="loader-arc"
            transform="rotate(-90 110 110)"
          />
        </svg>

        {/* Logo text — big, centered, inside the ring */}
        <div className="relative z-10 flex h-[220px] w-[220px] flex-col items-center justify-center gap-0 leading-none">
          <span className="font-display text-5xl font-black tracking-tighter text-foreground loader-text-in">
            Afri
          </span>
          <span className="font-display text-5xl font-black tracking-tighter text-primary loader-text-in" style={{ animationDelay: "0.1s" }}>
            Stream
          </span>
        </div>
      </div>

      {/* Message */}
      {message && (
        <p className="loader-sub-in mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground opacity-0">
          {message}
        </p>
      )}
    </div>
  )
}

// ─── Inline / section loader ──────────────────────────────────────────────────
export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <div className="relative flex items-center justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ overflow: "visible" }}>
          <circle cx="60" cy="60" r="57" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <circle
            cx="60" cy="60" r="57"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="358"
            strokeDashoffset="358"
            className="loader-arc"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center leading-none">
          <span className="font-display text-2xl font-black tracking-tighter text-foreground">Afri</span>
          <span className="font-display text-2xl font-black tracking-tighter text-primary">Stream</span>
        </div>
      </div>
      {message && (
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{message}</p>
      )}
    </div>
  )
}


// ─── Inline / section loader ──────────────────────────────────────────────────
export function InlineLoader({ message, size = "md" }: { message?: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? 52 : 72
  const r   = size === "sm" ? 22 : 30
  const cx  = dim / 2
  const circumference = Math.round(2 * Math.PI * r)

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-12">
      <div className="relative flex items-center justify-center">
        <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} style={{ overflow: "visible" }}>
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          <circle
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            className="loader-arc"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            transform={`rotate(-90 ${cx} ${cx})`}
          />
          <circle cx={cx} cy={cx} r="3" fill="hsl(var(--primary))" />
        </svg>
        <div className="absolute flex flex-col items-center leading-none">
          <span className="font-display text-[8px] font-black tracking-tighter text-foreground">Afri</span>
          <span className="font-display text-[8px] font-black tracking-tighter text-primary">Stream</span>
        </div>
      </div>
      {message && (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{message}</p>
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
