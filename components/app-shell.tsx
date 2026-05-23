"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Search, Bell, User, Home, Library, Music, Film, Users, Globe, Radio, Menu,
  X, ChevronDown, Settings, History, Download, Bookmark, Heart, ShoppingBag, Gift, Sparkles, MapPin,
  Upload, BarChart3, DollarSign, Mic, Video, Calendar, BookOpen, Clapperboard, Tag, Megaphone,
  TrendingUp, MessageSquare, Crown, Zap,
} from "lucide-react"
import { MiniPlayer } from "@/components/player/mini-player"
import { FullScreenPlayer } from "@/components/player/full-screen-player"
import { usePlayer } from "@/lib/player-context"
import { useUser } from "@/lib/user-context"
import type { UserType } from "@/lib/mock-data"

const worldTabs = [
  { label: "One", href: "/", icon: Home },
  { label: "Music", href: "/music", icon: Music },
  { label: "Movies", href: "/movies", icon: Film },
  { label: "Creators", href: "/creators", icon: Users },
  { label: "Culture", href: "/culture", icon: Globe },
  { label: "Live", href: "/live", icon: Radio },
]

// User-type specific sidebar links
const getSidebarLinks = (userType: UserType) => {
  const commonLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "Library", href: "/library", icon: Library },
  ]

  const listenerLinks = [
    ...commonLinks,
    { label: "For You", href: "/for-you", icon: Sparkles },
    { label: "Playlists", href: "/library?tab=playlists", icon: Heart },
    { label: "Watchlist", href: "/library?tab=watchlist", icon: Bookmark },
    { label: "Downloads", href: "/library?tab=downloads", icon: Download },
    { label: "History", href: "/library?tab=history", icon: History },
    { label: "Diaspora", href: "/diaspora", icon: MapPin },
    { label: "Rewind", href: "/rewind", icon: Sparkles },
    { label: "Tips & Gifts", href: "/tips", icon: Gift },
  ]

  const artistLinks = [
    ...commonLinks,
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "My Studio" },
    { label: "Artist Studio", href: "/artist", icon: Mic },
    { label: "Upload Music", href: "/artist?tab=upload", icon: Upload },
    { label: "Analytics", href: "/artist?tab=analytics", icon: BarChart3 },
    { label: "Fan Insights", href: "/artist/fans", icon: Users },
    { label: "Royalties", href: "/royalties", icon: DollarSign },
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
    { label: "For You", href: "/for-you", icon: Sparkles },
    { label: "Charts", href: "/music/charts", icon: TrendingUp },
    { label: "Rewind", href: "/rewind", icon: Sparkles },
  ]

  const labelLinks = [
    ...commonLinks,
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Label Management" },
    { label: "Label Studio", href: "/label", icon: Tag },
    { label: "Artist Roster", href: "/label?tab=artists", icon: Users },
    { label: "Releases", href: "/label?tab=releases", icon: Music },
    { label: "Royalties", href: "/royalties", icon: DollarSign },
    { label: "Distribution", href: "/distribution", icon: Globe },
    { label: "Licensing", href: "/licensing", icon: BookOpen },
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
    { label: "Charts", href: "/music/charts", icon: TrendingUp },
  ]

  const creatorLinks = [
    ...commonLinks,
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "My Channel" },
    { label: "Creator Studio", href: "/creator", icon: Video },
    { label: "Upload Content", href: "/creator?tab=upload", icon: Upload },
    { label: "Monetization", href: "/creator/monetization", icon: DollarSign },
    { label: "Analytics", href: "/creator?tab=analytics", icon: BarChart3 },
    { label: "Community", href: "/creator?tab=community", icon: MessageSquare },
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
    { label: "Trending", href: "/creators", icon: TrendingUp },
    { label: "Tips Received", href: "/tips", icon: Gift },
  ]

  const filmmakerLinks = [
    ...commonLinks,
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Film Studio" },
    { label: "Film Studio", href: "/film", icon: Clapperboard },
    { label: "Upload Film", href: "/film?tab=upload", icon: Upload },
    { label: "Premieres", href: "/film/premieres", icon: Calendar },
    { label: "Revenue", href: "/film?tab=revenue", icon: DollarSign },
    { label: "Licensing", href: "/licensing", icon: BookOpen },
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
    { label: "Trending Films", href: "/movies", icon: TrendingUp },
  ]

  const culturalEducatorLinks = [
    ...commonLinks,
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Culture Studio" },
    { label: "Culture Studio", href: "/culture-studio", icon: Globe },
    { label: "Heritage Tools", href: "/culture-studio/heritage", icon: BookOpen },
    { label: "Languages", href: "/culture/languages", icon: MessageSquare },
    { label: "Upload Content", href: "/culture-studio?tab=upload", icon: Upload },
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
    { label: "Culture Hub", href: "/culture", icon: Globe },
  ]

  const eventOrganizerLinks = [
    ...commonLinks,
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Event Studio" },
    { label: "Event Studio", href: "/events", icon: Calendar },
    { label: "Create Event", href: "/events?tab=create", icon: Upload },
    { label: "Ticket Sales", href: "/events?tab=tickets", icon: DollarSign },
    { label: "Livestream", href: "/events?tab=live", icon: Radio },
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
    { label: "Live Events", href: "/live", icon: Radio },
  ]

  const brandLinks = [
    ...commonLinks,
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Brand Portal" },
    { label: "Campaigns", href: "/brand/campaigns", icon: Megaphone },
    { label: "Sponsorships", href: "/brand/sponsorships", icon: Crown },
    { label: "Analytics", href: "/brand/analytics", icon: BarChart3 },
    { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
    { label: "Top Artists", href: "/music/charts", icon: TrendingUp },
    { label: "Top Creators", href: "/creators", icon: Users },
  ]

  const linkMap: Record<UserType, typeof listenerLinks> = {
    listener: listenerLinks,
    artist: artistLinks,
    label: labelLinks,
    creator: creatorLinks,
    comedian: creatorLinks,
    filmmaker: filmmakerLinks,
    cultural_educator: culturalEducatorLinks,
    event_organizer: eventOrganizerLinks,
    brand: brandLinks,
  }

  return linkMap[userType] || listenerLinks
}

// User-type specific quick actions
const getQuickActions = (userType: UserType) => {
  const actions: Record<UserType, { label: string; href: string; icon: typeof Upload; color: string }[]> = {
    listener: [],
    artist: [
      { label: "Upload", href: "/artist?tab=upload", icon: Upload, color: "bg-primary" },
      { label: "Go Live", href: "/live/start", icon: Radio, color: "bg-red-500" },
    ],
    label: [
      { label: "New Release", href: "/label?tab=release", icon: Upload, color: "bg-primary" },
    ],
    creator: [
      { label: "Upload", href: "/creator?tab=upload", icon: Upload, color: "bg-primary" },
      { label: "Go Live", href: "/live/start", icon: Radio, color: "bg-red-500" },
    ],
    comedian: [
      { label: "Upload Skit", href: "/creator?tab=upload", icon: Upload, color: "bg-primary" },
      { label: "Go Live", href: "/live/start", icon: Radio, color: "bg-red-500" },
    ],
    filmmaker: [
      { label: "Upload Film", href: "/film?tab=upload", icon: Upload, color: "bg-primary" },
      { label: "Premiere", href: "/film/premieres", icon: Calendar, color: "bg-purple-500" },
    ],
    cultural_educator: [
      { label: "Archive", href: "/culture-studio?tab=upload", icon: Upload, color: "bg-primary" },
    ],
    event_organizer: [
      { label: "Create Event", href: "/events?tab=create", icon: Calendar, color: "bg-primary" },
      { label: "Go Live", href: "/live/start", icon: Radio, color: "bg-red-500" },
    ],
    brand: [
      { label: "New Campaign", href: "/brand/campaigns?new=true", icon: Megaphone, color: "bg-primary" },
    ],
  }
  return actions[userType] || []
}

const mobileNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Library", href: "/library", icon: Library },
  { label: "Profile", href: "/profile", icon: User },
]

// Mobile nav for creators/artists
const getCreatorMobileNav = (userType: UserType) => {
  if (["artist", "creator", "comedian", "filmmaker", "cultural_educator", "event_organizer"].includes(userType)) {
    return [
      { label: "Home", href: "/", icon: Home },
      { label: "Studio", href: userType === "artist" ? "/artist" : userType === "filmmaker" ? "/film" : userType === "cultural_educator" ? "/culture-studio" : userType === "event_organizer" ? "/events" : "/creator", icon: Zap },
      { label: "Upload", href: "/upload", icon: Upload },
      { label: "Profile", href: "/profile", icon: User },
    ]
  }
  return mobileNav
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentTrack, isFullScreen } = usePlayer()
  const { user } = useUser()

  const userType = user?.type || "listener"
  const sidebarLinks = getSidebarLinks(userType)
  const quickActions = getQuickActions(userType)
  const mobileTabs = getCreatorMobileNav(userType)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href.split("?")[0])
  }

  const getUserTypeLabel = () => {
    const labels: Record<UserType, string> = {
      listener: "Listener",
      artist: "Artist",
      label: "Label",
      creator: "Creator",
      comedian: "Comedian",
      filmmaker: "Filmmaker",
      cultural_educator: "Educator",
      event_organizer: "Organizer",
      brand: "Brand",
    }
    return labels[userType]
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      {/* Top Nav */}
      <header className="glass-strong sticky top-0 z-50 flex h-14 items-center gap-3 px-4 lg:px-6">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground lg:hidden">
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-lg font-black tracking-tighter text-foreground sm:text-xl">
              Afri<span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Stream</span>
            </span>
          </div>
        </Link>

        {/* Quick Actions for Creators */}
        {quickActions.length > 0 && (
          <div className="ml-2 hidden items-center gap-2 md:flex">
            {quickActions.map(action => (
              <Link key={action.label} href={action.href}
                className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90", action.color)}>
                <action.icon className="size-3.5" />
                {action.label}
              </Link>
            ))}
          </div>
        )}

        <div className="mx-auto hidden w-full max-w-md lg:block">
          <Link href="/search" className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted">
            <Search className="size-4" />
            <span>Search music, movies, creators...</span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/search" className="text-muted-foreground hover:text-foreground lg:hidden">
            <Search className="size-5" />
          </Link>
          <button className="relative text-muted-foreground hover:text-foreground">
            <Bell className="size-5" />
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">3</span>
          </button>
          <Link href="/profile" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/30">
              <User className="size-4" />
            </div>
            {userType !== "listener" && (
              <span className="hidden text-xs font-medium text-muted-foreground lg:block">{getUserTypeLabel()}</span>
            )}
          </Link>
        </div>
      </header>

      {/* World Tabs */}
      <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-border bg-background px-4 lg:px-6">
        {worldTabs.map(tab => (
          <Link key={tab.href} href={tab.href}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(tab.href)
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}>
            <tab.icon className="size-4" />
            {tab.label}
          </Link>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Link href="/merch" className={cn(
            "hidden whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors lg:flex items-center gap-1.5",
            pathname.startsWith("/merch") ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          )}>
            <ShoppingBag className="size-4" />
            Merch
          </Link>
          <Link href="/hubs" className={cn(
            "hidden whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors lg:block",
            pathname.startsWith("/hubs") ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          )}>
            Hubs
          </Link>
          <Link href="/subscriptions" className={cn(
            "hidden whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors lg:block",
            pathname.startsWith("/subscriptions") ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          )}>
            Subscribe
          </Link>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className={cn(
          "hidden w-56 flex-col border-r border-border bg-sidebar lg:flex",
          "overflow-y-auto py-4"
        )}>
          <nav className="flex flex-col gap-0.5 px-3">
            {sidebarLinks.map((link, idx) => 
              link.isDivider ? (
                <div key={`divider-${idx}`} className="mt-4 mb-2 px-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{link.dividerLabel}</p>
                </div>
              ) : (
                <Link key={link.label} href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive(link.href)
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}>
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Settings always at bottom */}
          <div className="mt-auto border-t border-sidebar-border px-3 pt-4">
            <Link href="/settings" className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive("/settings")
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}>
              <Settings className="size-4" />
              Settings
            </Link>
            {userType !== "listener" && (
              <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground">
                <Settings className="size-4" /> Admin
              </Link>
            )}
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <aside className="absolute left-0 top-14 h-full w-64 overflow-y-auto bg-sidebar p-4" onClick={e => e.stopPropagation()}>
              {/* User type badge */}
              {userType !== "listener" && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
                  <Zap className="size-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{getUserTypeLabel()} Mode</span>
                </div>
              )}

              {/* Quick actions for mobile */}
              {quickActions.length > 0 && (
                <div className="mb-4 flex gap-2">
                  {quickActions.map(action => (
                    <Link key={action.label} href={action.href} onClick={() => setSidebarOpen(false)}
                      className={cn("flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium text-white", action.color)}>
                      <action.icon className="size-4" />
                      {action.label}
                    </Link>
                  ))}
                </div>
              )}

              <nav className="flex flex-col gap-0.5">
                {sidebarLinks.map((link, idx) => 
                  link.isDivider ? (
                    <div key={`divider-${idx}`} className="mt-4 mb-2 px-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{link.dividerLabel}</p>
                    </div>
                  ) : (
                    <Link key={link.label} href={link.href} onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                        isActive(link.href)
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}>
                      <link.icon className="size-4" />
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
              <div className="mt-6 border-t border-sidebar-border pt-4">
                <Link href="/hubs" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                  <Globe className="size-4" /> Country Hubs
                </Link>
                <Link href="/subscriptions" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                  <Crown className="size-4" /> Subscriptions
                </Link>
                <Link href="/settings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
                  <Settings className="size-4" /> Settings
                </Link>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className={cn("pb-36", currentTrack ? "pb-52" : "pb-36")}>
            {children}
          </div>
        </main>
      </div>

      {/* Audio Player */}
      {currentTrack && !isFullScreen && <MiniPlayer />}
      {isFullScreen && <FullScreenPlayer />}

      {/* Mobile Bottom Nav - User type aware */}
      <nav className="glass-strong fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-border py-2 lg:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        {mobileTabs.map(item => (
          <Link key={item.label} href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 text-xs transition-colors",
              isActive(item.href) ? "text-primary" : "text-muted-foreground"
            )}>
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
