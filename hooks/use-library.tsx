"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { storage, STORAGE_KEYS, type LikedItem, type FollowedItem, type SavedItem, type AnyContent } from "@/lib/storage"

// ─── Library Context ──────────────────────────────────────────────────────────

interface LibraryState {
  likedItems: LikedItem[]
  followedItems: FollowedItem[]
  savedItems: SavedItem[]
  isLoaded: boolean
}

interface LibraryContextValue extends LibraryState {
  // Likes
  isLiked: (contentId: string) => boolean
  toggleLike: (contentId: string, contentType: AnyContent["type"]) => Promise<void>
  getLikedByType: (contentType: AnyContent["type"]) => LikedItem[]
  
  // Follows
  isFollowing: (contentId: string) => boolean
  toggleFollow: (contentId: string, contentType: "artist" | "creator" | "podcast") => Promise<void>
  getFollowedByType: (contentType: "artist" | "creator" | "podcast") => FollowedItem[]
  
  // Saves
  isSaved: (contentId: string) => boolean
  toggleSave: (contentId: string, contentType: AnyContent["type"], collectionId?: string) => Promise<void>
  getSavedByType: (contentType: AnyContent["type"]) => SavedItem[]
  
  // Bulk operations
  clearAllLikes: () => Promise<void>
  clearAllFollows: () => Promise<void>
  clearAllSaves: () => Promise<void>
}

const LibraryContext = createContext<LibraryContextValue | null>(null)

// ─── Library Provider ─────────────────────────────────────────────────────────

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LibraryState>({
    likedItems: [],
    followedItems: [],
    savedItems: [],
    isLoaded: false,
  })

  // Load library from storage on mount
  useEffect(() => {
    async function loadLibrary() {
      const [liked, followed, saved] = await Promise.all([
        storage.get<LikedItem[]>(STORAGE_KEYS.LIKED_ITEMS),
        storage.get<FollowedItem[]>(STORAGE_KEYS.FOLLOWED_ITEMS),
        storage.get<SavedItem[]>(STORAGE_KEYS.SAVED_ITEMS),
      ])

      setState({
        likedItems: liked || [],
        followedItems: followed || [],
        savedItems: saved || [],
        isLoaded: true,
      })
    }

    loadLibrary()
  }, [])

  // ─── Likes ────────────────────────────────────────────────────────────────

  const isLiked = useCallback(
    (contentId: string) => state.likedItems.some((item) => item.contentId === contentId),
    [state.likedItems]
  )

  const toggleLike = useCallback(
    async (contentId: string, contentType: AnyContent["type"]) => {
      const exists = state.likedItems.some((item) => item.contentId === contentId)
      let updated: LikedItem[]

      if (exists) {
        updated = state.likedItems.filter((item) => item.contentId !== contentId)
      } else {
        const newItem: LikedItem = {
          contentId,
          contentType,
          likedAt: new Date().toISOString(),
        }
        updated = [newItem, ...state.likedItems]
      }

      setState((prev) => ({ ...prev, likedItems: updated }))
      await storage.set(STORAGE_KEYS.LIKED_ITEMS, updated)
    },
    [state.likedItems]
  )

  const getLikedByType = useCallback(
    (contentType: AnyContent["type"]) => state.likedItems.filter((item) => item.contentType === contentType),
    [state.likedItems]
  )

  const clearAllLikes = useCallback(async () => {
    setState((prev) => ({ ...prev, likedItems: [] }))
    await storage.remove(STORAGE_KEYS.LIKED_ITEMS)
  }, [])

  // ─── Follows ──────────────────────────────────────────────────────────────

  const isFollowing = useCallback(
    (contentId: string) => state.followedItems.some((item) => item.contentId === contentId),
    [state.followedItems]
  )

  const toggleFollow = useCallback(
    async (contentId: string, contentType: "artist" | "creator" | "podcast") => {
      const exists = state.followedItems.some((item) => item.contentId === contentId)
      let updated: FollowedItem[]

      if (exists) {
        updated = state.followedItems.filter((item) => item.contentId !== contentId)
      } else {
        const newItem: FollowedItem = {
          contentId,
          contentType,
          followedAt: new Date().toISOString(),
        }
        updated = [newItem, ...state.followedItems]
      }

      setState((prev) => ({ ...prev, followedItems: updated }))
      await storage.set(STORAGE_KEYS.FOLLOWED_ITEMS, updated)
    },
    [state.followedItems]
  )

  const getFollowedByType = useCallback(
    (contentType: "artist" | "creator" | "podcast") =>
      state.followedItems.filter((item) => item.contentType === contentType),
    [state.followedItems]
  )

  const clearAllFollows = useCallback(async () => {
    setState((prev) => ({ ...prev, followedItems: [] }))
    await storage.remove(STORAGE_KEYS.FOLLOWED_ITEMS)
  }, [])

  // ─── Saves ────────────────────────────────────────────────────────────────

  const isSaved = useCallback(
    (contentId: string) => state.savedItems.some((item) => item.contentId === contentId),
    [state.savedItems]
  )

  const toggleSave = useCallback(
    async (contentId: string, contentType: AnyContent["type"], collectionId?: string) => {
      const exists = state.savedItems.some((item) => item.contentId === contentId)
      let updated: SavedItem[]

      if (exists) {
        updated = state.savedItems.filter((item) => item.contentId !== contentId)
      } else {
        const newItem: SavedItem = {
          contentId,
          contentType,
          savedAt: new Date().toISOString(),
          collectionId,
        }
        updated = [newItem, ...state.savedItems]
      }

      setState((prev) => ({ ...prev, savedItems: updated }))
      await storage.set(STORAGE_KEYS.SAVED_ITEMS, updated)
    },
    [state.savedItems]
  )

  const getSavedByType = useCallback(
    (contentType: AnyContent["type"]) => state.savedItems.filter((item) => item.contentType === contentType),
    [state.savedItems]
  )

  const clearAllSaves = useCallback(async () => {
    setState((prev) => ({ ...prev, savedItems: [] }))
    await storage.remove(STORAGE_KEYS.SAVED_ITEMS)
  }, [])

  // ─── Context Value ────────────────────────────────────────────────────────

  const value: LibraryContextValue = {
    ...state,
    isLiked,
    toggleLike,
    getLikedByType,
    isFollowing,
    toggleFollow,
    getFollowedByType,
    isSaved,
    toggleSave,
    getSavedByType,
    clearAllLikes,
    clearAllFollows,
    clearAllSaves,
  }

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLibrary() {
  const context = useContext(LibraryContext)
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider")
  }
  return context
}

// ─── Convenience Hooks ────────────────────────────────────────────────────────

export function useLikes() {
  const { likedItems, isLiked, toggleLike, getLikedByType, clearAllLikes, isLoaded } = useLibrary()
  return { likedItems, isLiked, toggleLike, getLikedByType, clearAllLikes, isLoaded }
}

export function useFollows() {
  const { followedItems, isFollowing, toggleFollow, getFollowedByType, clearAllFollows, isLoaded } = useLibrary()
  return { followedItems, isFollowing, toggleFollow, getFollowedByType, clearAllFollows, isLoaded }
}

export function useSaves() {
  const { savedItems, isSaved, toggleSave, getSavedByType, clearAllSaves, isLoaded } = useLibrary()
  return { savedItems, isSaved, toggleSave, getSavedByType, clearAllSaves, isLoaded }
}
