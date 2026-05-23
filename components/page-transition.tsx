"use client"

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react"
import { usePathname } from "next/navigation"
import { AfriStreamLoader } from "./afristream-loader"

interface TransitionContextType {
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType>({ isTransitioning: false })

export function usePageTransition() {
  return useContext(TransitionContext)
}

// Route-to-message map so the loader always says something relevant
const ROUTE_MESSAGES: Record<string, string> = {
  "/":              "Loading your world",
  "/music":         "Tuning in",
  "/movies":        "Setting the scene",
  "/live":          "Going live",
  "/creators":      "Meeting the creators",
  "/search":        "Ready to discover",
  "/library":       "Opening your library",
  "/subscriptions": "Checking your plan",
  "/notifications": "Checking activity",
  "/shorts":        "Loading shorts",
  "/podcasts":      "Cuing up episodes",
  "/impact":        "Loading your impact",
  "/new-releases":  "Fresh drops incoming",
  "/diaspora":      "Connecting the diaspora",
}

function getMessageForPath(path: string): string {
  if (ROUTE_MESSAGES[path]) return ROUTE_MESSAGES[path]
  if (path.startsWith("/music/charts")) return "Loading the charts"
  if (path.startsWith("/music/artist")) return "Loading artist"
  if (path.startsWith("/music"))        return "Tuning in"
  if (path.startsWith("/movies"))       return "Setting the scene"
  if (path.startsWith("/studio"))       return "Opening studio"
  if (path.startsWith("/admin"))        return "Entering control centre"
  return "Loading"
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [showSplash, setShowSplash]         = useState(true)   // initial full-screen load
  const [isTransitioning, setTransitioning] = useState(false)  // between-page flash
  const [navMessage, setNavMessage]         = useState("")
  const prevPath = useRef(pathname)
  const splashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navTimer    = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Show splash once on first mount, dismiss after 1.8 s
  useEffect(() => {
    splashTimer.current = setTimeout(() => setShowSplash(false), 1800)
    return () => { if (splashTimer.current) clearTimeout(splashTimer.current) }
  }, [])

  // Show brief page loader on every route change
  useEffect(() => {
    if (showSplash) return               // don't double-show during splash
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    setNavMessage(getMessageForPath(pathname))
    setTransitioning(true)

    navTimer.current = setTimeout(() => setTransitioning(false), 600)
    return () => { if (navTimer.current) clearTimeout(navTimer.current) }
  }, [pathname, showSplash])

  return (
    <TransitionContext.Provider value={{ isTransitioning }}>
      {/* ── Initial splash ── */}
      {showSplash && <AfriStreamLoader message="Loading your world" />}

      {/* ── Between-page loader ── */}
      {!showSplash && isTransitioning && (
        <AfriStreamLoader message={navMessage} />
      )}

      {/* ── Page content ── */}
      <div className={showSplash || isTransitioning ? "invisible" : "page-enter"}>
        {children}
      </div>
    </TransitionContext.Provider>
  )
}

// ─── Utility wrappers ────────────────────────────────────────────────────────
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "slide",
}: {
  children: ReactNode
  className?: string
  delay?: number
  animation?: "fade" | "slide" | "scale"
}) {
  const cls = { fade: "animate-fade-in", slide: "animate-slide-up", scale: "animate-scale-in" }[animation]
  return (
    <div className={`${cls} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function StaggeredList({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`stagger-children ${className}`}>{children}</div>
}
