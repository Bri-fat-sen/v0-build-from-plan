"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { UserType, userTypes, UserTypeInfo } from "./mock-data"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  userType: UserType
  connectedCountries: string[]
  languages: string[]
  interests: string[]
  subscriptionTier: "free" | "basic" | "premium" | "platinum" | "family" | "creator_pro"
  isOnboarded: boolean
  createdAt: string
}

interface UserContextType {
  user: UserProfile | null
  userTypeInfo: UserTypeInfo | null
  isLoading: boolean
  setUserType: (type: UserType) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  completeOnboarding: () => void
  logout: () => void
}

const defaultUser: UserProfile = {
  id: "u1",
  name: "Demo User",
  email: "demo@afristream.com",
  avatar: "https://picsum.photos/seed/user1/200/200",
  userType: "listener",
  connectedCountries: ["Nigeria", "Ghana"],
  languages: ["English", "Yoruba"],
  interests: ["Afrobeats", "Amapiano", "Nollywood", "Comedy"],
  subscriptionTier: "premium",
  isOnboarded: true,
  createdAt: "2024-01-15"
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user from storage/API
    const stored = typeof window !== "undefined" ? localStorage.getItem("afristream_user") : null
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      setUser(defaultUser)
    }
    setIsLoading(false)
  }, [])

  const userTypeInfo = user ? userTypes.find(t => t.id === user.userType) || null : null

  const setUserType = (type: UserType) => {
    if (user) {
      const updated = { ...user, userType: type }
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
    <UserContext.Provider value={{ user, userTypeInfo, isLoading, setUserType, updateProfile, completeOnboarding, logout }}>
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
