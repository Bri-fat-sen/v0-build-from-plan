"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AfriStreamLoaderProps {
  isLoading?: boolean
  variant?: "fullscreen" | "inline" | "overlay"
  message?: string
  showProgress?: boolean
  progress?: number
}

export function AfriStreamLoader({
  isLoading = true,
  variant = "fullscreen",
  message,
  showProgress = false,
  progress = 0,
}: AfriStreamLoaderProps) {
  const [dots, setDots] = useState("")
  
  useEffect(() => {
    if (!isLoading) return
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? "" : d + ".")
    }, 400)
    return () => clearInterval(interval)
  }, [isLoading])

  if (!isLoading) return null

  const content = (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Logo Animation */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 blur-3xl">
          <div className="flex items-center gap-1">
            <span className="text-4xl font-black text-white/30 md:text-6xl">Afri</span>
            <span className="text-4xl font-black text-primary/50 md:text-6xl">Stream</span>
          </div>
        </div>
        
        {/* Main logo with split color animation */}
        <div className="relative flex items-center">
          <span className="afri-loader-text font-display text-4xl font-black tracking-tighter text-white md:text-6xl lg:text-7xl">
            Afri
          </span>
          <span className="stream-loader-text font-display text-4xl font-black tracking-tighter text-primary md:text-6xl lg:text-7xl">
            Stream
          </span>
        </div>
      </div>

      {/* Equalizer bars */}
      <div className="flex items-end gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="eq-loader-bar w-1.5 rounded-full bg-primary md:w-2"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Message */}
      {message && (
        <p className="text-sm text-muted-foreground md:text-base">
          {message}{dots}
        </p>
      )}

      {/* Progress bar */}
      {showProgress && (
        <div className="w-48 md:w-64">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-center font-mono text-xs text-muted-foreground">{progress}%</p>
        </div>
      )}
    </div>
  )

  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative">{content}</div>
      </div>
    )
  }

  if (variant === "overlay") {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    )
  }

  return (
    <div className="flex min-h-[200px] items-center justify-center py-12">
      {content}
    </div>
  )
}

// Skeleton components for content loading
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-white/5", className)}>
      <div className="aspect-square rounded-t-xl bg-white/10" />
      <div className="p-3">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="mt-2 h-3 w-1/2 rounded bg-white/5" />
      </div>
    </div>
  )
}

export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex animate-pulse items-center gap-4 rounded-xl p-3", className)}>
      <div className="size-12 rounded-lg bg-white/10" />
      <div className="flex-1">
        <div className="h-4 w-1/3 rounded bg-white/10" />
        <div className="mt-2 h-3 w-1/4 rounded bg-white/5" />
      </div>
      <div className="h-8 w-8 rounded-full bg-white/5" />
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="animate-pulse">
      <div className="h-[60vh] rounded-3xl bg-white/5">
        <div className="flex h-full flex-col justify-end p-8">
          <div className="h-8 w-1/4 rounded bg-white/10" />
          <div className="mt-4 h-12 w-1/2 rounded bg-white/10" />
          <div className="mt-4 h-4 w-1/3 rounded bg-white/5" />
          <div className="mt-6 flex gap-3">
            <div className="h-12 w-32 rounded-full bg-white/10" />
            <div className="h-12 w-12 rounded-full bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  )
}
