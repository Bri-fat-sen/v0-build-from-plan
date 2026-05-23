"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

const FALLBACK_MUSIC = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80"
const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
const FALLBACK_MOVIE = "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80"
const FALLBACK_CREATOR = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80"

export type FallbackType = "music" | "avatar" | "movie" | "creator" | "generic"

function getFallback(type: FallbackType) {
  switch (type) {
    case "music":    return FALLBACK_MUSIC
    case "avatar":   return FALLBACK_AVATAR
    case "movie":    return FALLBACK_MOVIE
    case "creator":  return FALLBACK_CREATOR
    default:         return FALLBACK_MUSIC
  }
}

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string | null | ImageProps["src"]
  fallbackType?: FallbackType
  wrapperClassName?: string
}

export function SafeImage({
  src,
  alt = "",
  fallbackType = "generic",
  className,
  wrapperClassName,
  fill,
  width,
  height,
  ...props
}: SafeImageProps) {
  const fallback = getFallback(fallbackType)
  // Resolve src — handle StaticImport (object), string, null, or undefined
  const resolvedSrc: string =
    typeof src === "object" && src !== null
      ? (src as { src: string }).src ?? fallback
      : typeof src === "string" && src.trim() !== ""
        ? src
        : fallback

  const [imgSrc, setImgSrc] = useState(resolvedSrc)

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 400) : undefined}
      height={!fill ? (height ?? 400) : undefined}
      className={className}
      onError={() => setImgSrc(fallback)}
      unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("https://images.unsplash")}
    />
  )
}
