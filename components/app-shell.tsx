"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Search, Bell, User, Home, Library, Music, Film, Users, Globe, Radio, Menu,
  X, ChevronDown, Settings, History, Download, Bookmark, Heart, ShoppingBag, Gift, Sparkles, MapPin,
  Upload, BarChart3, DollarSign, Mic, Video, Calendar, BookOpen, Clapperboard, Tag,
  TrendingUp, Crown, Zap, Shield, ChevronRight, Check, Wallet, PieChart, Send,
  Headphones, Play, Tv, Ticket, Languages, Archive, MessageSquare, Star, Eye,
} from "lucide-react"
import { MiniPlayer } from "@/components/player/mini-player"
import { FullScreenPlayer } from "@/components/player/full-screen-player"
import { usePlayer } from "@/lib/player-context"
import { useUser, ActiveMode, modeInfo, tierInfo } from "@/lib/user-context"
import { NotificationsPanel, NotificationBell } from "@/components/notifications-panel"

// Platform Worlds - Main navigation
const worldTabs = [
  { label: "One", href: "/", icon: Home, description: "Your personalized feed" },
  { label: "Music", href: "/music", icon: Music, description: "African sounds" },
  { label: "Movies", href: "/movies", icon: Film, description: "African cinema" },
  { label: "Creators", href: "/creators", icon: Users, description: "Videos & podcasts" },
  { label: "Culture", href: "/culture", icon: Globe, description: "Heritage & language" },
  { label: "Live", href: "/live", icon: Radio, description: "Events & streams" },
]

const modeIcons: Record<ActiveMode, typeof Mic> = {
  listener: Headphones,
  artist: Mic,
  creator: Video,
  filmmaker: Clapperboard,
  educator: BookOpen,
  organizer: Calendar,
  admin: Shield,
}

// Categorized sidebar navigation
interface NavCategory {
  id: string
  label: string
  links: NavLink[]
  collapsed?: boolean
}

interface NavLink {
  label: string
  href: string
  icon: typeof Home
  badge?: string
  badgeColor?: string
}

const getNavCategories = (mode: ActiveMode, hasCapability: (cap: string) => boolean): NavCategory[] => {
  // Common browse category for all users
  const browseCategory: NavCategory = {
    id: "browse",
    label: "Browse",
    links: [
      { label: "Home", href: "/", icon: Home },
      { label: "Search", href: "/search", icon: Search },
      { label: "For You", href: "/for-you", icon: Sparkles },
    ]
  }

  // Library category
  const libraryCategory: NavCategory = {
    id: "library",
    label: "Your Library",
    links: [
      { label: "Library", href: "/library", icon: Library },
      { label: "Playlists", href: "/library?tab=playlists", icon: Heart },
      { label: "Watchlist", href: "/library?tab=watchlist", icon: Bookmark },
      ...(hasCapability("offline_download") ? [{ label: "Downloads", href: "/library?tab=downloads", icon: Download }] : []),
      { label: "History", href: "/library?tab=history", icon: History },
    ]
  }

  // Discover category
  const discoverCategory: NavCategory = {
    id: "discover",
    label: "Discover",
    links: [
      { label: "Charts", href: "/music/charts", icon: TrendingUp },
      { label: "Genres", href: "/music/genres", icon: Music },
      { label: "New Releases", href: "/music?filter=new", icon: Sparkles },
      { label: "African Cinema", href: "/movies", icon: Film },
      { label: "Live Events", href: "/live", icon: Ticket },
    ]
  }

  // Connect category
  const connectCategory: NavCategory = {
    id: "connect",
    label: "Connect",
    links: [
      { label: "Your Impact", href: "/impact", icon: Heart, badge: "NEW", badgeColor: "primary" },
      { label: "Diaspora Hub", href: "/diaspora", icon: MapPin },
      { label: "Rewind 2025", href: "/rewind", icon: Sparkles },
      ...(hasCapability("tips_send") ? [{ label: "Send Tips", href: "/tips", icon: Gift }] : []),
      { label: "Merch Store", href: "/merch", icon: ShoppingBag },
    ]
  }

  // Artist Studio categories
  const artistStudioCategory: NavCategory = {
    id: "artist-studio",
    label: "Artist Studio",
    links: [
      { label: "Dashboard", href: "/artist", icon: BarChart3 },
      { label: "Upload Music", href: "/artist?tab=upload", icon: Upload },
      { label: "My Releases", href: "/artist?tab=releases", icon: Music },
      { label: "Analytics", href: "/artist?tab=analytics", icon: PieChart },
      { label: "Fan Insights", href: "/artist/fans", icon: Users },
    ]
  }

  const artistMoneyCategory: NavCategory = {
    id: "artist-money",
    label: "Earnings",
    links: [
      { label: "Royalties", href: "/royalties", icon: DollarSign },
      ...(hasCapability("distribution") ? [{ label: "Distribution", href: "/distribution", icon: Send }] : []),
      ...(hasCapability("licensing") ? [{ label: "Licensing", href: "/licensing", icon: Tag }] : []),
    ]
  }

  // Creator Studio categories
  const creatorStudioCategory: NavCategory = {
    id: "creator-studio",
    label: "Creator Studio",
    links: [
      { label: "Dashboard", href: "/creator", icon: BarChart3 },
      { label: "Upload Video", href: "/creator?tab=upload", icon: Upload },
      { label: "My Content", href: "/creator?tab=content", icon: Video },
      { label: "Go Live", href: "/creator/live", icon: Radio, badge: "LIVE", badgeColor: "destructive" },
      { label: "Shorts", href: "/creator?tab=shorts", icon: Play },
    ]
  }

  const creatorMoneyCategory: NavCategory = {
    id: "creator-money",
    label: "Monetization",
    links: [
      { label: "Revenue", href: "/creator/monetization", icon: DollarSign },
      { label: "Tips Received", href: "/creator/monetization?tab=tips", icon: Gift },
      { label: "Memberships", href: "/creator/monetization?tab=memberships", icon: Crown },
      { label: "Community", href: "/creator?tab=community", icon: MessageSquare },
    ]
  }

  // Filmmaker Studio categories
  const filmStudioCategory: NavCategory = {
    id: "film-studio",
    label: "Film Studio",
    links: [
      { label: "Dashboard", href: "/film", icon: BarChart3 },
      { label: "Upload Film", href: "/film?tab=upload", icon: Upload },
      { label: "My Films", href: "/film?tab=films", icon: Clapperboard },
      { label: "Series", href: "/film?tab=series", icon: Tv },
      { label: "Premieres", href: "/film/premieres", icon: Calendar },
    ]
  }

  const filmMoneyCategory: NavCategory = {
    id: "film-money",
    label: "Revenue",
    links: [
      { label: "Box Office", href: "/film?tab=revenue", icon: DollarSign },
      { label: "Rentals & Sales", href: "/film?tab=sales", icon: Wallet },
      ...(hasCapability("licensing") ? [{ label: "Licensing", href: "/licensing", icon: Tag }] : []),
    ]
  }

  // Educator Studio categories
  const educatorStudioCategory: NavCategory = {
    id: "educator-studio",
    label: "Culture Studio",
    links: [
      { label: "Dashboard", href: "/culture-studio", icon: BarChart3 },
      { label: "Heritage Tools", href: "/culture-studio/heritage", icon: Archive },
      { label: "Languages", href: "/culture-studio?tab=languages", icon: Languages },
      { label: "Upload Content", href: "/culture-studio?tab=upload", icon: Upload },
    ]
  }

  const educatorImpactCategory: NavCategory = {
    id: "educator-impact",
    label: "Impact",
    links: [
      { label: "Learners", href: "/culture-studio?tab=learners", icon: Users },
      { label: "Community", href: "/culture-studio?tab=community", icon: MessageSquare },
      { label: "Analytics", href: "/culture-studio?tab=analytics", icon: PieChart },
    ]
  }

  // Event Organizer categories
  const eventStudioCategory: NavCategory = {
    id: "event-studio",
    label: "Event Studio",
    links: [
      { label: "Dashboard", href: "/events", icon: BarChart3 },
      { label: "Create Event", href: "/events?tab=create", icon: Calendar },
      { label: "My Events", href: "/events?tab=events", icon: Ticket },
      { label: "Go Live", href: "/events/live", icon: Radio, badge: "LIVE", badgeColor: "destructive" },
    ]
  }

  const eventMoneyCategory: NavCategory = {
    id: "event-money",
    label: "Tickets & Revenue",
    links: [
      { label: "Ticket Sales", href: "/events?tab=tickets", icon: DollarSign },
      { label: "Attendees", href: "/events?tab=attendees", icon: Users },
      { label: "Analytics", href: "/events?tab=analytics", icon: PieChart },
    ]
  }

  // Admin categories
  const adminOverviewCategory: NavCategory = {
    id: "admin-overview",
    label: "Overview",
    links: [
      { label: "Dashboard", href: "/admin", icon: Shield },
      { label: "Analytics", href: "/admin?tab=analytics", icon: PieChart },
    ]
  }

  const adminUsersCategory: NavCategory = {
    id: "admin-users",
    label: "Users & Content",
    links: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Content", href: "/admin/content", icon: Film },
      { label: "Moderation", href: "/admin/moderation", icon: Shield, badge: "17", badgeColor: "destructive" },
      { label: "Copyright", href: "/admin/copyright", icon: Eye },
    ]
  }

  const adminFinanceCategory: NavCategory = {
    id: "admin-finance",
    label: "Finance & Ops",
    links: [
      { label: "Finance", href: "/admin/finance", icon: DollarSign },
      { label: "Distribution", href: "/admin/distribution", icon: Send },
      { label: "Licensing", href: "/admin/licensing", icon: Tag },
    ]
  }

  const adminSystemCategory: NavCategory = {
    id: "admin-system",
    label: "System",
    links: [
      { label: "Audit Logs", href: "/admin/audit", icon: History },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ]
  }

  // Return categories based on mode
  switch (mode) {
    case "artist":
      return [browseCategory, artistStudioCategory, artistMoneyCategory, discoverCategory]
    case "creator":
      return [browseCategory, creatorStudioCategory, creatorMoneyCategory, discoverCategory]
    case "filmmaker":
      return [browseCategory, filmStudioCategory, filmMoneyCategory, discoverCategory]
    case "educator":
      return [browseCategory, educatorStudioCategory, educatorImpactCategory, discoverCategory]
    case "organizer":
      return [browseCategory, eventStudioCategory, eventMoneyCategory, discoverCategory]
    case "admin":
      return [adminOverviewCategory, adminUsersCategory, adminFinanceCategory, adminSystemCategory]
    default: // listener
      return [browseCategory, libraryCategory, discoverCategory, connectCategory]
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
    case "educator":
      return [
        { label: "Upload", href: "/culture-studio?tab=upload", icon: Upload },
      ]
    case "organizer":
      return [
        { label: "Create Event", href: "/events?tab=create", icon: Calendar },
        { label: "Go Live", href: "/events/live", icon: Radio },
      ]
    default:
      return []
  }
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { currentTrack, isFullScreen, setIsFullScreen } = usePlayer()
  const { user, activeMode, setActiveMode, getAvailableModes, hasCapability } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modeSwitcherOpen, setModeSwitcherOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())

  const navCategories = getNavCategories(activeMode, hasCapability)
  const quickActions = getQuickActions(activeMode)
  const availableModes = getAvailableModes()
  const ModeIcon = modeIcons[activeMode]

  const toggleCategory = (id: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

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
                <span className="hidden sm:inline">{modeInfo[activeMode].name}</span>
                <ChevronDown className={cn("size-3 transition-transform", modeSwitcherOpen && "rotate-180")} />
              </button>

              {/* Mode Dropdown */}
              {modeSwitcherOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setModeSwitcherOpen(false)} />
                  <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-border/50 bg-card/95 p-2 shadow-xl backdrop-blur-xl">
                    <div className="mb-2 px-2 py-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Switch Mode</p>
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
                            "flex size-9 items-center justify-center rounded-lg",
                            activeMode === mode ? "bg-primary/20" : "bg-muted"
                          )}>
                            <Icon className="size-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{info.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{info.description}</p>
                          </div>
                          {activeMode === mode && <Check className="size-4 shrink-0 text-primary" />}
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
                          <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-amber-500">
                            <Crown className="size-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Unlock All Modes</p>
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
          <nav className="hidden items-center gap-0.5 lg:flex">
            {worldTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "group relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors",
                  (tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href))
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="size-4" />
                {tab.label}
                {/* Active indicator */}
                <span className={cn(
                  "absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all",
                  (tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href))
                    ? "w-8"
                    : "w-0 group-hover:w-4 group-hover:bg-muted-foreground"
                )} />
              </Link>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          {/* Quick Actions for Creator modes */}
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="hidden items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 sm:flex"
            >
              <action.icon className="size-3.5" />
              {action.label}
            </Link>
          ))}

          {/* Subscribe button */}
          {activeMode !== "admin" && (
            <Link href="/subscriptions" className={cn(
              "hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors lg:flex",
              user?.subscriptionTier === "free" 
                ? "bg-gradient-to-r from-primary to-amber-500 text-white hover:opacity-90"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}>
              {user?.subscriptionTier === "free" ? (
                <>
                  <Zap className="size-3.5" />
                  Upgrade
                </>
              ) : (
                <>
                  <Crown className="size-3.5" />
                  {tierInfo[user?.subscriptionTier || "free"].name}
                </>
              )}
            </Link>
          )}

          {/* Search + Notifications + Profile */}
          <Link href="/search" className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden">
            <Search className="size-5" />
          </Link>
          <button 
            onClick={() => setNotificationsOpen(true)}
            className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <NotificationBell />
          </button>
          <Link href="/profile" className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-transparent transition-all hover:ring-primary/50">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name ?? "User"}
                className="size-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
              />
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
        {/* Desktop Sidebar - Categorized Navigation */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border/50 bg-sidebar lg:flex">
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {navCategories.map((category, catIndex) => (
              <div key={category.id} className={cn(catIndex > 0 && "pt-4")}>
                {/* Category Header */}
                <button 
                  onClick={() => toggleCategory(category.id)}
                  className="flex w-full items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                >
                  {category.label}
                  <ChevronDown className={cn(
                    "size-3 transition-transform",
                    collapsedCategories.has(category.id) && "-rotate-90"
                  )} />
                </button>

                {/* Category Links */}
                {!collapsedCategories.has(category.id) && (
                  <div className="mt-1 space-y-0.5">
                    {category.links.map((link) => {
                      const isActive = link.href === "/" 
                        ? pathname === "/" 
                        : pathname.startsWith(link.href.split("?")[0])
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                            isActive
                              ? "bg-primary/15 font-medium text-primary"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                          )}
                        >
                          <link.icon className="size-4 shrink-0" />
                          <span className="flex-1 truncate">{link.label}</span>
                          {link.badge && (
                            <span className={cn(
                              "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                              link.badgeColor === "destructive" 
                                ? "bg-destructive/20 text-destructive"
                                : link.badgeColor === "primary"
                                  ? "bg-primary/20 text-primary"
                                  : "bg-muted text-muted-foreground"
                            )}>
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Subscription Badge */}
          {user && (
            <div className="border-t border-border/50 p-3">
              <Link
                href="/subscriptions"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  user.subscriptionTier === "platinum" || user.subscriptionTier === "creator_pro"
                    ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 hover:from-amber-500/30 hover:to-orange-500/30"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {user.subscriptionTier === "platinum" || user.subscriptionTier === "creator_pro" ? (
                  <Crown className="size-4" />
                ) : (
                  <Zap className="size-4" />
                )}
                <div className="flex-1">
                  <p className="font-medium">{tierInfo[user.subscriptionTier].name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.subscriptionTier === "free" ? "Upgrade for more" : "View benefits"}
                  </p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
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
                  "flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] transition-colors",
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
          <aside className="fixed inset-y-0 right-0 z-50 w-80 bg-sidebar shadow-2xl lg:hidden">
            {/* Mobile sidebar header */}
            <div className="flex items-center justify-between border-b border-border/50 p-4">
              <span className="font-display text-lg font-bold">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="rounded-full p-2 hover:bg-muted">
                <X className="size-5" />
              </button>
            </div>

            {/* Mode switcher in mobile */}
            {availableModes.length > 1 && (
              <div className="border-b border-border/50 p-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current Mode</p>
                <div className="grid grid-cols-2 gap-2">
                  {availableModes.slice(0, 4).map((mode) => {
                    const Icon = modeIcons[mode]
                    return (
                      <button
                        key={mode}
                        onClick={() => {
                          setActiveMode(mode)
                        }}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                          activeMode === mode ? "bg-primary/15 text-primary" : "bg-muted hover:bg-muted/80"
                        )}
                      >
                        <Icon className="size-4" />
                        {modeInfo[mode].name.split(" ")[0]}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Mobile nav categories */}
            <nav className="flex-1 overflow-y-auto p-4">
              {navCategories.map((category, catIndex) => (
                <div key={category.id} className={cn(catIndex > 0 && "pt-4")}>
                  <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {category.label}
                  </p>
                  <div className="space-y-0.5">
                    {category.links.map((link) => {
                      const isActive = link.href === "/" 
                        ? pathname === "/" 
                        : pathname.startsWith(link.href.split("?")[0])
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                            isActive
                              ? "bg-primary/15 font-medium text-primary"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                          )}
                        >
                          <link.icon className="size-4" />
                          <span className="flex-1">{link.label}</span>
                          {link.badge && (
                            <span className={cn(
                              "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                              link.badgeColor === "destructive" 
                                ? "bg-destructive/20 text-destructive"
                                : "bg-primary/20 text-primary"
                            )}>
                              {link.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Mobile subscription */}
            {user && (
              <div className="border-t border-border/50 p-4">
                <Link
                  href="/subscriptions"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-primary/20 to-amber-500/20 px-4 py-3"
                >
                  <Crown className="size-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{tierInfo[user.subscriptionTier].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.subscriptionTier === "free" ? "Upgrade now" : "Manage subscription"}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </aside>
        </>
      )}

      {/* Audio Player */}
      {currentTrack && !isFullScreen && <MiniPlayer />}
      {isFullScreen && <FullScreenPlayer />}

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </div>
  )
}
