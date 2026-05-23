"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Subscription tiers and what they unlock
export type SubscriptionTier = "free" | "basic" | "premium" | "platinum" | "family" | "creator_pro"

// Capabilities that can be unlocked
export type Capability = 
  | "music_streaming"      // Listen to music
  | "video_streaming"      // Watch movies/shows
  | "offline_download"     // Download for offline
  | "hd_quality"           // HD audio/video
  | "lossless_audio"       // Lossless/spatial audio
  | "4k_video"             // 4K streaming
  | "ad_free"              // No ads
  | "creator_content"      // Access creator content
  | "live_events"          // Access live events
  | "upload_music"         // Upload music (artist)
  | "upload_video"         // Upload videos (creator)
  | "upload_film"          // Upload films (filmmaker)
  | "go_live"              // Go live streaming
  | "monetization"         // Earn money
  | "analytics"            // View analytics
  | "fan_insights"         // Detailed fan data
  | "distribution"         // Distribute to other platforms
  | "licensing"            // License content
  | "tips_receive"         // Receive tips
  | "tips_send"            // Send tips to creators

// Active mode - what the user is currently doing
export type ActiveMode = "listener" | "artist" | "creator" | "filmmaker" | "educator" | "organizer" | "admin"

// What each subscription tier unlocks
export const tierCapabilities: Record<SubscriptionTier, Capability[]> = {
  free: ["music_streaming", "video_streaming"],
  basic: ["music_streaming", "video_streaming", "ad_free", "offline_download", "creator_content"],
  premium: ["music_streaming", "video_streaming", "ad_free", "offline_download", "hd_quality", "creator_content", "live_events", "tips_send"],
  platinum: ["music_streaming", "video_streaming", "ad_free", "offline_download", "hd_quality", "lossless_audio", "4k_video", "creator_content", "live_events", "tips_send"],
  family: ["music_streaming", "video_streaming", "ad_free", "offline_download", "hd_quality", "creator_content", "live_events", "tips_send"],
  creator_pro: [
    "music_streaming", "video_streaming", "ad_free", "offline_download", "hd_quality", "lossless_audio", "4k_video", 
    "creator_content", "live_events", "tips_send", "tips_receive",
    "upload_music", "upload_video", "upload_film", "go_live", "monetization", "analytics", "fan_insights", "distribution", "licensing"
  ],
}

// Tier pricing
export const tierPricing: Record<SubscriptionTier, { monthly: number; annual: number; currency: string }> = {
  free: { monthly: 0, annual: 0, currency: "USD" },
  basic: { monthly: 1.99, annual: 19.99, currency: "USD" },
  premium: { monthly: 4.99, annual: 49.99, currency: "USD" },
  platinum: { monthly: 9.99, annual: 99.99, currency: "USD" },
  family: { monthly: 7.99, annual: 79.99, currency: "USD" },
  creator_pro: { monthly: 14.99, annual: 149.99, currency: "USD" },
}

// Tier names and descriptions
export const tierInfo: Record<SubscriptionTier, { name: string; description: string; badge?: string }> = {
  free: { name: "Free", description: "Basic streaming with ads" },
  basic: { name: "Basic", description: "Ad-free streaming" },
  premium: { name: "Premium", description: "HD streaming + live events", badge: "Popular" },
  platinum: { name: "Platinum", description: "Ultimate quality + exclusives", badge: "Best Value" },
  family: { name: "Family", description: "Premium for up to 6 members" },
  creator_pro: { name: "Creator Pro", description: "Everything + creator tools", badge: "For Creators" },
}

// Mode info
export const modeInfo: Record<ActiveMode, { name: string; icon: string; description: string; requiredCapability?: Capability }> = {
  listener: { name: "Listener", icon: "headphones", description: "Discover and enjoy content" },
  artist: { name: "Artist", icon: "mic", description: "Release music and grow fans", requiredCapability: "upload_music" },
  creator: { name: "Creator", icon: "video", description: "Build your channel", requiredCapability: "upload_video" },
  filmmaker: { name: "Filmmaker", icon: "clapperboard", description: "Distribute films", requiredCapability: "upload_film" },
  educator: { name: "Educator", icon: "book-open", description: "Share cultural content", requiredCapability: "upload_video" },
  organizer: { name: "Organizer", icon: "calendar", description: "Host events", requiredCapability: "go_live" },
  admin: { name: "Admin", icon: "shield", description: "Platform administration" },
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  subscriptionTier: SubscriptionTier
  activeMode: ActiveMode
  availableModes: ActiveMode[]
  connectedCountries: string[]
  languages: string[]
  interests: string[]
  isOnboarded: boolean
  isAdmin: boolean
  createdAt: string
  // Creator-specific fields (populated when in creator modes)
  artistProfile?: { stageName: string; genre: string; verified: boolean }
  creatorProfile?: { channelName: string; category: string; verified: boolean }
  filmmakerProfile?: { studioName: string; verified: boolean }
}

interface UserContextType {
  user: UserProfile | null
  isLoading: boolean
  // Capabilities
  hasCapability: (cap: Capability) => boolean
  getCapabilities: () => Capability[]
  // Mode switching
  activeMode: ActiveMode
  setActiveMode: (mode: ActiveMode) => void
  canAccessMode: (mode: ActiveMode) => boolean
  getAvailableModes: () => ActiveMode[]
  // Profile management
  updateProfile: (updates: Partial<UserProfile>) => void
  upgradeTier: (tier: SubscriptionTier) => void
  completeOnboarding: () => void
  logout: () => void
}

const defaultUser: UserProfile = {
  id: "u1",
  name: "Demo User",
  email: "demo@afristream.com",
  avatar: "https://picsum.photos/seed/user1/200/200",
  subscriptionTier: "premium",
  activeMode: "listener",
  availableModes: ["listener"],
  connectedCountries: ["Nigeria", "Ghana"],
  languages: ["English", "Yoruba"],
  interests: ["Afrobeats", "Amapiano", "Nollywood", "Comedy"],
  isOnboarded: true,
  isAdmin: false,
  createdAt: "2024-01-15",
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("afristream_user") : null
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      setUser(defaultUser)
    }
    setIsLoading(false)
  }, [])

  // Apply theme class based on active mode
  useEffect(() => {
    if (user && typeof document !== "undefined") {
      document.documentElement.classList.forEach(cls => {
        if (cls.startsWith("theme-")) {
          document.documentElement.classList.remove(cls)
        }
      })
      document.documentElement.classList.add(`theme-${user.activeMode}`)
    }
  }, [user?.activeMode])

  const hasCapability = (cap: Capability): boolean => {
    if (!user) return false
    return tierCapabilities[user.subscriptionTier].includes(cap)
  }

  const getCapabilities = (): Capability[] => {
    if (!user) return []
    return tierCapabilities[user.subscriptionTier]
  }

  const canAccessMode = (mode: ActiveMode): boolean => {
    if (!user) return false
    if (mode === "listener") return true // Everyone can be a listener
    if (mode === "admin") return user.isAdmin
    const required = modeInfo[mode].requiredCapability
    return required ? hasCapability(required) : true
  }

  const getAvailableModes = (): ActiveMode[] => {
    if (!user) return ["listener"]
    const modes: ActiveMode[] = ["listener"]
    if (canAccessMode("artist")) modes.push("artist")
    if (canAccessMode("creator")) modes.push("creator")
    if (canAccessMode("filmmaker")) modes.push("filmmaker")
    if (canAccessMode("educator")) modes.push("educator")
    if (canAccessMode("organizer")) modes.push("organizer")
    if (user.isAdmin) modes.push("admin")
    return modes
  }

  const setActiveMode = (mode: ActiveMode) => {
    if (user && canAccessMode(mode)) {
      const updated = { ...user, activeMode: mode, availableModes: getAvailableModes() }
      setUser(updated)
      localStorage.setItem("afristream_user", JSON.stringify(updated))
    }
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...updates }
      setUser(updated)
      localStorage.setItem("afristream_user", JSON.stringify(updated))
    }
  }

  const upgradeTier = (tier: SubscriptionTier) => {
    if (user) {
      const updated = { ...user, subscriptionTier: tier, availableModes: getAvailableModes() }
      setUser(updated)
      localStorage.setItem("afristream_user", JSON.stringify(updated))
    }
  }

  const completeOnboarding = () => {
    if (user) {
      const updated = { ...user, isOnboarded: true }
      setUser(updated)
      localStorage.setItem("afristream_user", JSON.stringify(updated))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("afristream_user")
  }

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      hasCapability,
      getCapabilities,
      activeMode: user?.activeMode || "listener",
      setActiveMode,
      canAccessMode,
      getAvailableModes,
      updateProfile,
      upgradeTier,
      completeOnboarding,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
