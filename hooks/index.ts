// Storage & Types
export * from "@/lib/storage"

// Search
export { useSearch, trendingSearches, searchCategories, type SearchResult, type SearchResultType, type SearchFilters } from "@/hooks/use-search"

// Library (Likes, Follows, Saves)
export { useLibrary, useLikes, useFollows, useSaves, LibraryProvider } from "@/hooks/use-library"

// History & Stats
export { usePlayHistory, useListeningStats, useQueue } from "@/hooks/use-history"

// Recommendations
export {
  useTrackRecommendations,
  useAlbumRecommendations,
  useArtistRecommendations,
  useMovieRecommendations,
  useCreatorRecommendations,
  useForYouMix,
  useSimilarTracks,
  useDailyMixes,
  type Recommendation,
} from "@/hooks/use-recommendations"

// Notifications
export { useNotifications, NotificationsProvider, getNotificationIcon, getNotificationColor } from "@/hooks/use-notifications"
