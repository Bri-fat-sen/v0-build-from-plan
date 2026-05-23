"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { usePathname } from "next/navigation"
import { AfriStreamLoader } from "./afristream-loader"

interface TransitionContextType {
  isTransitioning: boolean
  startTransition: () => void
  endTransition: () => void
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
  endTransition: () => {},
})

export function usePageTransition() {
  return useContext(TransitionContext)
}

interface PageTransitionProviderProps {
  children: ReactNode
  showLoader?: boolean
  loaderDuration?: number
}

export function PageTransitionProvider({ 
  children, 
  showLoader = true,
  loaderDuration = 800 
}: PageTransitionProviderProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [displayChildren, setDisplayChildren] = useState(children)

  const startTransition = useCallback(() => {
    setIsTransitioning(true)
  }, [])

  const endTransition = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  // Initial app load
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
      }, loaderDuration)
      return () => clearTimeout(timer)
    }
  }, [isInitialLoad, loaderDuration])

  // Handle route changes
  useEffect(() => {
    if (!isInitialLoad) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setDisplayChildren(children)
        setIsTransitioning(false)
      }, 200)
      return () => clearTimeout(timer)
    } else {
      setDisplayChildren(children)
    }
  }, [pathname, children, isInitialLoad])

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
      {/* Initial full-screen loader */}
      {showLoader && isInitialLoad && (
        <AfriStreamLoader 
          isLoading={true} 
          variant="fullscreen"
          message="Loading your experience"
        />
      )}
      
      {/* Page content with transition */}
      <div 
        className={
          isInitialLoad 
            ? "opacity-0" 
            : isTransitioning 
              ? "page-exit" 
              : "page-enter"
        }
      >
        {displayChildren}
      </div>
    </TransitionContext.Provider>
  )
}

// Animated wrapper for page sections
interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  animation?: "fade" | "slide" | "scale"
}

export function AnimatedSection({ 
  children, 
  className = "",
  delay = 0,
  animation = "slide"
}: AnimatedSectionProps) {
  const animationClass = {
    fade: "animate-fade-in",
    slide: "animate-slide-up",
    scale: "animate-scale-in",
  }[animation]

  return (
    <div 
      className={`${animationClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Staggered list animation wrapper
interface StaggeredListProps {
  children: ReactNode
  className?: string
}

export function StaggeredList({ children, className = "" }: StaggeredListProps) {
  return (
    <div className={`stagger-children ${className}`}>
      {children}
    </div>
  )
}
