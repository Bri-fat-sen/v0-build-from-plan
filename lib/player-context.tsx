"use client"
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Track } from "./mock-data"

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  queue: Track[]
  progress: number
  volume: number
  shuffle: boolean
  repeat: "off" | "all" | "one"
  isFullScreen: boolean
  showQueue: boolean
  showLyrics: boolean
}

interface PlayerContextType extends PlayerState {
  playTrack: (track: Track) => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  setProgress: (p: number) => void
  setVolume: (v: number) => void
  toggleShuffle: () => void
  cycleRepeat: () => void
  toggleFullScreen: () => void
  toggleQueue: () => void
  toggleLyrics: () => void
  addToQueue: (track: Track) => void
  setQueue: (tracks: Track[]) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null, isPlaying: false, queue: [], progress: 35,
    volume: 80, shuffle: false, repeat: "off",
    isFullScreen: false, showQueue: false, showLyrics: false,
  })

  const playTrack = useCallback((track: Track) => {
    setState(s => ({ ...s, currentTrack: track, isPlaying: true, progress: 0, isFullScreen: false }))
  }, [])

  const togglePlay = useCallback(() => {
    setState(s => ({ ...s, isPlaying: !s.isPlaying }))
  }, [])

  const nextTrack = useCallback(() => {
    setState(s => {
      if (s.queue.length === 0) return s
      const idx = s.queue.findIndex(t => t.id === s.currentTrack?.id)
      const next = s.queue[(idx + 1) % s.queue.length]
      return { ...s, currentTrack: next, progress: 0, isPlaying: true }
    })
  }, [])

  const prevTrack = useCallback(() => {
    setState(s => {
      if (s.queue.length === 0) return s
      const idx = s.queue.findIndex(t => t.id === s.currentTrack?.id)
      const prev = s.queue[(idx - 1 + s.queue.length) % s.queue.length]
      return { ...s, currentTrack: prev, progress: 0, isPlaying: true }
    })
  }, [])

  const setProgress = useCallback((p: number) => setState(s => ({ ...s, progress: p })), [])
  const setVolume = useCallback((v: number) => setState(s => ({ ...s, volume: v })), [])
  const toggleShuffle = useCallback(() => setState(s => ({ ...s, shuffle: !s.shuffle })), [])
  const cycleRepeat = useCallback(() => setState(s => ({
    ...s, repeat: s.repeat === "off" ? "all" : s.repeat === "all" ? "one" : "off"
  })), [])
  const toggleFullScreen = useCallback(() => setState(s => ({ ...s, isFullScreen: !s.isFullScreen })), [])
  const toggleQueue = useCallback(() => setState(s => ({ ...s, showQueue: !s.showQueue, showLyrics: false })), [])
  const toggleLyrics = useCallback(() => setState(s => ({ ...s, showLyrics: !s.showLyrics, showQueue: false })), [])
  const addToQueue = useCallback((track: Track) => setState(s => ({ ...s, queue: [...s.queue, track] })), [])
  const setQueue = useCallback((tracks: Track[]) => setState(s => ({ ...s, queue: tracks })), [])

  return (
    <PlayerContext.Provider value={{
      ...state, playTrack, togglePlay, nextTrack, prevTrack,
      setProgress, setVolume, toggleShuffle, cycleRepeat,
      toggleFullScreen, toggleQueue, toggleLyrics, addToQueue, setQueue,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider")
  return ctx
}
