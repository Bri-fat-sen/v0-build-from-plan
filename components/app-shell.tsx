"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Search, Bell, User, Home, Library, Music, Film, Users, Globe, Radio, Menu,
  X, ChevronDown, Settings, History, Download, Bookmark, Heart, ShoppingBag, Gift, Sparkles, MapPin,
  Upload, BarChart3, DollarSign, Mic, Video, Calendar, BookOpen, Clapperboard, Tag,
  TrendingUp, Crown, Zap, Shield, ChevronRight, Check,
} from "lucide-react"
import { MiniPlayer } from "@/components/player/mini-player"
import { FullScreenPlayer } from "@/components/player/full-screen-player"
import { usePlayer } from "@/lib/player-context"
import { useUser, ActiveMode, modeInfo, tierInfo } from "@/lib/user-context"

const worldTabs = [
  { label: "One", href: "/", icon: Home },
  { label: "Music", href: "/music", icon: Music },
  { label: "Movies", href: "/movies", icon: Film },
  { label: "Creators", href: "/creators", icon: Users },
  { label: "Culture", href: "/culture", icon: Globe },
  { label: "Live", href: "/live", icon: Radio },
]

const modeIcons: Record<ActiveMode, typeof Mic> = {
  listener: Music,
  artist: Mic,
  creator: Video,
  filmmaker: Clapperboard,
  educator: BookOpen,
  organizer: Calendar,
  admin: Shield,
}

// Mode-specific sidebar links
const getSidebarLinks = (mode: ActiveMode, hasCapability: (cap: string) => boolean) => {
  const commonLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/search", icon: Search },
    { label: "Library", href: "/library", icon: Library },
  ]

  const listenerExtras = [
    { label: "For You", href: "/for-you", icon: Sparkles },
    { label: "Playlists", href: "/library?tab=playlists", icon: Heart },
    { label: "Watchlist", href: "/library?tab=watchlist", icon: Bookmark },
    ...(hasCapability("offline_download") ? [{ label: "Downloads", href: "/library?tab=downloads", icon: Download }] : []),
    { label: "History", href: "/library?tab=history", icon: History },
    { label: "Diaspora", href: "/diaspora", icon: MapPin },
    { label: "Rewind", href: "/rewind", icon: Sparkles },
    ...(hasCapability("tips_send") ? [{ label: "Send Tips", href: "/tips", icon: Gift }] : []),
  ]

  switch (mode) {
    case "artist":
      return [
        ...commonLinks,
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Artist Studio" },
        { label: "Dashboard", href: "/artist", icon: BarChart3 },
        { label: "Upload Music", href: "/artist?tab=upload", icon: Upload },
        { label: "My Releases", href: "/artist?tab=releases", icon: Music },
        { label: "Fan Insights", href: "/artist/fans", icon: Users },
        { label: "Royalties", href: "/royalties", icon: DollarSign },
        ...(hasCapability("distribution") ? [{ label: "Distribution", href: "/distribution", icon: Globe }] : []),
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
        { label: "Charts", href: "/music/charts", icon: TrendingUp },
        { label: "Rewind", href: "/rewind", icon: Sparkles },
      ]
    case "creator":
      return [
        ...commonLinks,
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Creator Studio" },
        { label: "Dashboard", href: "/creator", icon: BarChart3 },
        { label: "Upload Video", href: "/creator?tab=upload", icon: Upload },
        { label: "My Content", href: "/creator?tab=content", icon: Video },
        { label: "Go Live", href: "/creator/live", icon: Radio },
        { label: "Monetization", href: "/creator/monetization", icon: DollarSign },
        { label: "Community", href: "/creator?tab=community", icon: Users },
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
        { label: "Trending", href: "/creators", icon: TrendingUp },
      ]
    case "filmmaker":
      return [
        ...commonLinks,
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Film Studio" },
        { label: "Dashboard", href: "/film", icon: BarChart3 },
        { label: "Upload Film", href: "/film?tab=upload", icon: Upload },
        { label: "My Films", href: "/film?tab=films", icon: Clapperboard },
        { label: "Premieres", href: "/film/premieres", icon: Calendar },
        { label: "Revenue", href: "/film?tab=revenue", icon: DollarSign },
        ...(hasCapability("licensing") ? [{ label: "Licensing", href: "/licensing", icon: Tag }] : []),
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
        { label: "African Cinema", href: "/movies", icon: Film },
      ]
    case "educator":
      return [
        ...commonLinks,
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Culture Studio" },
        { label: "Dashboard", href: "/culture-studio", icon: BarChart3 },
        { label: "Heritage Tools", href: "/culture-studio/heritage", icon: BookOpen },
        { label: "Languages", href: "/culture-studio?tab=languages", icon: Globe },
        { label: "Upload", href: "/culture-studio?tab=upload", icon: Upload },
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
        { label: "Culture Hub", href: "/culture", icon: Globe },
      ]
    case "organizer":
      return [
        ...commonLinks,
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Event Studio" },
        { label: "Dashboard", href: "/events", icon: BarChart3 },
        { label: "Create Event", href: "/events?tab=create", icon: Calendar },
        { label: "My Events", href: "/events?tab=events", icon: Calendar },
        { label: "Ticket Sales", href: "/events?tab=tickets", icon: DollarSign },
        { label: "Go Live", href: "/events/live", icon: Radio },
        { label: "divider", href: "", icon: Home, isDivider: true, dividerLabel: "Discover" },
        { label: "Live Events", href: "/live", icon: Radio },
      ]
    case "admin":
      return [
        { label: "Dashboard", href: "/admin", icon: Shield },
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Content", href: "/admin/content", icon: Film },
        { label: "Finance", href: "/admin/finance", icon: DollarSign },
        { label: "Moderation", href: "/admin/moderation", icon: Shield },
        { label: "Audit Logs", href: "/admin/audit", icon: History },
        { label: "Settings", href: "/admin/settings", icon: Settings },
      ]
    default:
      return [...commonLinks, ...listenerExtras]
  }
}

// Quick actions based on mode
const getQuickActions = (mode: ActiveMode) => {
  switch (mode) {
    case "artist":
      return [
        { label: "Upload", href: "/artist?tab=upload", icon: Upload },
        { label: "Go Live", href: "/artist/live", icon: Radio },
      ]
    case "creator":
      return [
        { label: "Upload", href: "/creator?tab=upload", icon: Upload },
        { label: "Go Live", href: "/creator/live", icon: Radio },
      ]
    case "filmmaker":
      return [
        { label: "Upload Film", href: "/film?tab=upload", icon: Upload },
        { label: "Premiere", href: "/film/premieres", icon: Calendar },
      ]
    default:
      return []
  }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { currentTrack, isFullScreen, setIsFullScreen } = usePlayer()
  const { user, activeMode, setActiveMode, getAvailableModes, hasCapability, canAccessMode } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modeSwitcherOpen, setModeSwitcherOpen] = useState(false)

  const sidebarLinks = getSidebarLinks(activeMode, hasCapability)
  const quickActions = getQuickActions(activeMode)
  const availableModes = getAvailableModes()
  const ModeIcon = modeIcons[activeMode]

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Top Header */}
      <header className="glass-subtle sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/50 px-4">
        {/* Logo + Mode Switcher */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-black tracking-tighter text-foreground sm:text-xl">
              Afri<span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Stream</span>
            </span>
          </Link>

          {/* Mode Switcher Button */}
          {availableModes.length > 1 && (
            <div className="relative">
              <button
                onClick={() => setModeSwitcherOpen(!modeSwitcherOpen)}
                className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
              >
                <ModeIcon className="size-3.5" />
                {modeInfo[activeMode].name}
                <ChevronDown className={cn("size-3 transition-transform", modeSwitcherOpen && "rotate-180")} />
              </button>

              {/* Mode Dropdown */}
              {modeSwitcherOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setModeSwitcherOpen(false)} />
                  <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-border/50 bg-card/95 p-2 shadow-xl backdrop-blur-xl">
                    <div className="mb-2 px-2 py-1">
                      <p className="text-xs font-medium text-muted-foreground">Switch Mode</p>
                    </div>
                    {availableModes.map((mode) => {
                      const Icon = modeIcons[mode]
                      const info = modeInfo[mode]
                      return (
                        <button
                          key={mode}
                          onClick={() => {
                            setActiveMode(mode)
                            setModeSwitcherOpen(false)
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                            activeMode === mode ? "bg-primary/15 text-primary" : "hover:bg-muted"
                          )}
                        >
                          <div className={cn(
                            "flex size-8 items-center justify-center rounded-lg",
                            activeMode === mode ? "bg-primary/20" : "bg-muted"
                          )}>
                            <Icon className="size-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{info.name}</p>
                            <p className="text-xs text-muted-foreground">{info.description}</p>
                          </div>
                          {activeMode === mode && <Check className="size-4 text-primary" />}
                        </button>
                      )
                    })}

                    {/* Upgrade prompt if not creator_pro */}
                    {user?.subscriptionTier !== "creator_pro" && (
                      <div className="mt-2 border-t border-border/50 pt-2">
                        <Link
                          href="/subscriptions"
                          onClick={() => setModeSwitcherOpen(false)}
                          className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-primary/20 to-amber-500/20 px-3 py-2.5 transition-colors hover:from-primary/30 hover:to-amber-500/30"
                        >
                          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-amber-500">
                            <Crown className="size-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Unlock Creator Tools</p>
                            <p className="text-xs text-muted-foreground">Upgrade to Creator Pro</p>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* World Tabs - Desktop */}
        {activeMode !== "admin" && (
          <nav className="hidden items-center gap-1 lg:flex">
            {worldTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
                  (tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href))
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="size-4" />
                {tab.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Quick Actions for Creator modes */}
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="hidden items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:flex"
            >
              <action.icon className="size-3.5" />
              {action.label}
            </Link>
          ))}

          {/* Merch + Hubs + Subscribe */}
          <Link href="/merch" className={cn(
            "hidden whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors lg:flex items-center gap-1.5",
            pathname.startsWith("/merch") ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          )}>
            <ShoppingBag className="size-4" />
            Merch
          </Link>
          <Link href="/subscriptions" className={cn(
            "hidden whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors lg:block",
            pathname.startsWith("/subscriptions") ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          )}>
            Subscribe
          </Link>

          {/* Search + Notifications + Profile */}
          <Link href="/search" className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden">
            <Search className="size-5" />
          </Link>
          <button className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Bell className="size-5" />
          </button>
          <Link href="/profile" className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-muted">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="size-full object-cover" />
            ) : (
              <User className="size-5 text-muted-foreground" />
            )}
          </Link>
          <button onClick={() => setSidebarOpen(true)} className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden">
            <Menu className="size-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden w-60 shrink-0 flex-col border-r border-border/50 bg-sidebar lg:flex">
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {sidebarLinks.map((link, i) => {
              if (link.isDivider) {
                return (
                  <div key={i} className="pb-1 pt-4">
                    <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{link.dividerLabel}</p>
                  </div>
                )
              }
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("?")[0])
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-primary/15 font-medium text-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Subscription Badge */}
          {user && (
            <div className="border-t border-border/50 p-3">
              <Link
                href="/subscriptions"
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  user.subscriptionTier === "platinum" || user.subscriptionTier === "creator_pro"
                    ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {user.subscriptionTier === "platinum" || user.subscriptionTier === "creator_pro" ? (
                  <Crown className="size-4" />
                ) : (
                  <Zap className="size-4" />
                )}
                <span className="font-medium">{tierInfo[user.subscriptionTier].name}</span>
                {user.subscriptionTier === "free" && (
                  <span className="ml-auto text-xs text-primary">Upgrade</span>
                )}
              </Link>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      {activeMode !== "admin" && (
        <nav className="glass-strong flex h-16 items-center justify-around border-t border-border/50 lg:hidden">
          {worldTabs.slice(0, 5).map((tab) => {
            const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href)
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2 text-[10px]",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <tab.icon className={cn("size-5", isActive && "fill-primary/20")} />
                {tab.label}
              </Link>
            )
          })}
        </nav>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-72 bg-sidebar p-4 shadow-2xl lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-lg font-bold">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="rounded-full p-1 hover:bg-muted">
                <X className="size-5" />
              </button>
            </div>

            {/* Mode Switcher in Mobile */}
            {availableModes.length > 1 && (
              <div className="mb-4 rounded-lg bg-muted/50 p-2">
                <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">Current Mode</p>
                <div className="flex flex-wrap gap-1">
                  {availableModes.map((mode) => {
                    const Icon = modeIcons[mode]
                    return (
                      <button
                        key={mode}
                        onClick={() => setActiveMode(mode)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                          activeMode === mode ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                        )}
                      >
                        <Icon className="size-3.5" />
                        {modeInfo[mode].name}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <nav className="space-y-1">
              {sidebarLinks.map((link, i) => {
                if (link.isDivider) {
                  return (
                    <div key={i} className="pb-1 pt-4">
                      <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{link.dividerLabel}</p>
                    </div>
                  )
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                  >
                    <link.icon className="size-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Audio Player */}
      {currentTrack && !isFullScreen && <MiniPlayer />}
      {currentTrack && isFullScreen && <FullScreenPlayer />}
    </div>
  )
}
