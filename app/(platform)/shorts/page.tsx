"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, Heart, MessageCircle, Share2, Music2, Plus, Volume2, VolumeX, ChevronUp, ChevronDown, Bookmark, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const mockShorts = [
  { id: "1", creator: { name: "Kizz Daniel", avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop", verified: true }, video: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=700&fit=crop", caption: "Behind the scenes of my new music video. Big things coming", likes: 245000, comments: 3200, shares: 12000, sound: "Buga - Kizz Daniel" },
  { id: "2", creator: { name: "Mark Angel Comedy", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true }, video: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=700&fit=crop", caption: "When your African mom catches you lying... Episode 234", likes: 890000, comments: 15000, shares: 45000, sound: "Original Sound - Mark Angel" },
  { id: "3", creator: { name: "Elsa Majimbo", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", verified: true }, video: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=700&fit=crop", caption: "POV: You ordered jollof rice and they bring you fried rice", likes: 1200000, comments: 28000, shares: 89000, sound: "Money - Teni" },
  { id: "4", creator: { name: "Poco Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", verified: true }, video: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=700&fit=crop", caption: "New dance challenge! Can you do this? Tag me", likes: 567000, comments: 8900, shares: 34000, sound: "Unavailable - Davido ft Musa Keys" },
  { id: "5", creator: { name: "Taooma", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", verified: true }, video: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=700&fit=crop", caption: "African parents when you score 99% instead of 100%", likes: 2100000, comments: 45000, shares: 120000, sound: "Calm Down - Rema" },
]

function ShortCard({ short, isActive }: { short: typeof mockShorts[0]; isActive: boolean }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(isActive)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    setIsPlaying(isActive)
  }, [isActive])

  return (
    <div className="relative h-full w-full bg-black snap-start snap-always">
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        <Image src={short.video} alt={short.caption} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Play/Pause Overlay */}
      <button 
        className="absolute inset-0 z-10 flex items-center justify-center"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {!isPlaying && (
          <div className="p-4 rounded-full bg-black/30 backdrop-blur-sm">
            <Play className="size-12 text-white fill-white" />
          </div>
        )}
      </button>

      {/* Right Side Actions */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5">
        {/* Creator Avatar */}
        <Link href={`/creators/${short.id}`} className="relative">
          <div className="size-12 rounded-full border-2 border-white overflow-hidden">
            <Image src={short.creator.avatar} alt={short.creator.name} fill className="object-cover" />
          </div>
          <button className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-5 rounded-full bg-primary flex items-center justify-center">
            <Plus className="size-3 text-white" />
          </button>
        </Link>

        {/* Like */}
        <button 
          className="flex flex-col items-center gap-1"
          onClick={() => setIsLiked(!isLiked)}
        >
          <div className={cn("p-2 rounded-full bg-white/10 backdrop-blur-sm transition-colors", isLiked && "bg-red-500/20")}>
            <Heart className={cn("size-7 text-white transition-colors", isLiked && "fill-red-500 text-red-500")} />
          </div>
          <span className="text-xs text-white font-medium">{formatNumber(short.likes + (isLiked ? 1 : 0))}</span>
        </button>

        {/* Comments */}
        <button className="flex flex-col items-center gap-1">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
            <MessageCircle className="size-7 text-white" />
          </div>
          <span className="text-xs text-white font-medium">{formatNumber(short.comments)}</span>
        </button>

        {/* Save */}
        <button 
          className="flex flex-col items-center gap-1"
          onClick={() => setIsSaved(!isSaved)}
        >
          <div className={cn("p-2 rounded-full bg-white/10 backdrop-blur-sm transition-colors", isSaved && "bg-primary/20")}>
            <Bookmark className={cn("size-7 text-white transition-colors", isSaved && "fill-primary text-primary")} />
          </div>
          <span className="text-xs text-white font-medium">Save</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
            <Share2 className="size-7 text-white" />
          </div>
          <span className="text-xs text-white font-medium">{formatNumber(short.shares)}</span>
        </button>

        {/* More */}
        <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
          <MoreHorizontal className="size-6 text-white" />
        </button>

        {/* Sound Disc */}
        <div className={cn("size-10 rounded-full border-2 border-white/50 overflow-hidden", isPlaying && "animate-spin-slow")}>
          <Image src={short.creator.avatar} alt="Sound" fill className="object-cover" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute left-3 right-16 bottom-6 z-20">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-white">{short.creator.name}</span>
          {short.creator.verified && (
            <svg className="size-4 text-primary fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          )}
        </div>
        <p className="text-sm text-white/90 line-clamp-2">{short.caption}</p>
        <div className="flex items-center gap-2 mt-3">
          <Music2 className="size-4 text-white" />
          <marquee className="text-xs text-white/80 flex-1">{short.sound}</marquee>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="size-5 text-white" /> : <Volume2 className="size-5 text-white" />}
        </button>
      </div>
    </div>
  )
}

export default function ShortsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop
      const height = containerRef.current.clientHeight
      const index = Math.round(scrollTop / height)
      setActiveIndex(index)
    }
  }

  const goToNext = () => {
    if (containerRef.current && activeIndex < mockShorts.length - 1) {
      containerRef.current.scrollTo({ top: (activeIndex + 1) * containerRef.current.clientHeight, behavior: "smooth" })
    }
  }

  const goToPrev = () => {
    if (containerRef.current && activeIndex > 0) {
      containerRef.current.scrollTo({ top: (activeIndex - 1) * containerRef.current.clientHeight, behavior: "smooth" })
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/50 to-transparent">
        <Link href="/" className="text-white font-semibold">
          <span className="font-display text-lg">Afri<span className="text-primary">Shorts</span></span>
        </Link>
        <div className="flex gap-3">
          <button className="px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium">For You</button>
          <button className="px-4 py-1.5 rounded-full text-white/70 text-sm font-medium">Following</button>
        </div>
        <Link href="/" className="text-white text-sm">Close</Link>
      </div>

      {/* Navigation Arrows - Desktop */}
      <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-2">
        <button 
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm disabled:opacity-30"
          onClick={goToPrev}
          disabled={activeIndex === 0}
        >
          <ChevronUp className="size-6 text-white" />
        </button>
        <button 
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm disabled:opacity-30"
          onClick={goToNext}
          disabled={activeIndex === mockShorts.length - 1}
        >
          <ChevronDown className="size-6 text-white" />
        </button>
      </div>

      {/* Shorts Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
      >
        {mockShorts.map((short, i) => (
          <div key={short.id} className="h-full w-full">
            <ShortCard short={short} isActive={i === activeIndex} />
          </div>
        ))}
      </div>

      {/* Progress Dots - Desktop */}
      <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-2">
        {mockShorts.map((_, i) => (
          <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all", i === activeIndex ? "bg-white h-4" : "bg-white/40")} />
        ))}
      </div>
    </div>
  )
}
