// ════════════════════════════════════════════════════════════════════════════
// AfriStream Database Types (matches Supabase schema)
// ════════════════════════════════════════════════════════════════════════════

export type UserTier = 'free' | 'premium' | 'family' | 'student'
export type UserMode = 'listener' | 'artist' | 'creator' | 'filmmaker' | 'educator'
export type AlbumType = 'album' | 'single' | 'ep' | 'compilation'
export type ContentType = 'track' | 'album' | 'artist' | 'movie' | 'playlist' | 'podcast' | 'episode'
export type FollowingType = 'artist' | 'creator' | 'playlist' | 'podcast' | 'user'
export type MovieContentType = 'movie' | 'series' | 'documentary' | 'short' | 'music_video'
export type MovieRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17'
export type NotificationType = 'new_release' | 'live_event' | 'follow' | 'like' | 'comment' | 'achievement' | 'system'

export interface Profile {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  country: string | null
  tier: UserTier
  mode: UserMode
  is_verified: boolean
  total_listening_minutes: number
  streak_days: number
  created_at: string
  updated_at: string
}

export interface Artist {
  id: string
  user_id: string | null
  name: string
  slug: string | null
  image: string | null
  cover_image: string | null
  bio: string | null
  country: string | null
  genres: string[]
  monthly_listeners: number
  total_streams: number
  is_verified: boolean
  social_links: Record<string, string>
  created_at: string
  updated_at: string
}

export interface Album {
  id: string
  artist_id: string
  title: string
  slug: string | null
  cover: string | null
  release_date: string | null
  album_type: AlbumType
  genres: string[]
  total_tracks: number
  duration_ms: number
  total_streams: number
  created_at: string
  updated_at: string
  // Joined
  artist?: Artist
}

export interface Track {
  id: string
  artist_id: string
  album_id: string | null
  title: string
  slug: string | null
  cover: string | null
  audio_url: string | null
  preview_url: string | null
  duration_ms: number
  track_number: number | null
  genres: string[]
  bpm: number | null
  key: string | null
  explicit: boolean
  lyrics: string | null
  total_streams: number
  release_date: string | null
  is_playable: boolean
  created_at: string
  updated_at: string
  // Joined
  artist?: Artist
  album?: Album
}

export interface Movie {
  id: string
  creator_id: string | null
  title: string
  slug: string | null
  poster: string | null
  backdrop: string | null
  trailer_url: string | null
  video_url: string | null
  description: string | null
  release_year: number | null
  duration_minutes: number | null
  genres: string[]
  country: string | null
  language: string | null
  rating: MovieRating | null
  imdb_rating: number | null
  total_views: number
  content_type: MovieContentType
  is_premium: boolean
  created_at: string
  updated_at: string
  // Joined
  creator?: Profile
}

export interface Podcast {
  id: string
  host_id: string | null
  title: string
  slug: string | null
  cover: string | null
  description: string | null
  categories: string[]
  language: string
  total_episodes: number
  total_subscribers: number
  is_explicit: boolean
  rss_feed: string | null
  created_at: string
  updated_at: string
  // Joined
  host?: Profile
  episodes?: PodcastEpisode[]
}

export interface PodcastEpisode {
  id: string
  podcast_id: string
  title: string
  description: string | null
  audio_url: string | null
  duration_ms: number
  episode_number: number | null
  season_number: number
  published_at: string | null
  total_plays: number
  created_at: string
  // Joined
  podcast?: Podcast
}

export interface Playlist {
  id: string
  user_id: string
  title: string
  description: string | null
  cover: string | null
  is_public: boolean
  is_collaborative: boolean
  total_tracks: number
  total_duration_ms: number
  total_followers: number
  created_at: string
  updated_at: string
  // Joined
  user?: Profile
  tracks?: Track[]
}

export interface PlaylistTrack {
  id: string
  playlist_id: string
  track_id: string
  added_by: string | null
  position: number
  added_at: string
  // Joined
  track?: Track
}

export interface Like {
  id: string
  user_id: string
  content_type: ContentType
  content_id: string
  created_at: string
}

export interface Follow {
  id: string
  follower_id: string
  following_type: FollowingType
  following_id: string
  created_at: string
}

export interface PlayHistory {
  id: string
  user_id: string
  content_type: 'track' | 'episode' | 'movie'
  content_id: string
  played_at: string
  duration_played_ms: number
  completed: boolean
  context_type: string | null
  context_id: string | null
}

export interface WatchProgress {
  id: string
  user_id: string
  movie_id: string
  progress_seconds: number
  total_seconds: number
  completed: boolean
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  message: string | null
  image: string | null
  link: string | null
  metadata: Record<string, unknown>
  is_read: boolean
  created_at: string
}

export interface Download {
  id: string
  user_id: string
  content_type: ContentType
  content_id: string
  quality: string
  file_size_bytes: number | null
  downloaded_at: string
  expires_at: string | null
}

export interface AnalyticsDaily {
  id: string
  content_type: string
  content_id: string
  date: string
  plays: number
  unique_listeners: number
  total_duration_ms: number
  likes: number
  shares: number
  saves: number
}

// ════════════════════════════════════════════════════════════════════════════
// Database Response Types
// ════════════════════════════════════════════════════════════════════════════

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> }
      artists: { Row: Artist; Insert: Partial<Artist>; Update: Partial<Artist> }
      albums: { Row: Album; Insert: Partial<Album>; Update: Partial<Album> }
      tracks: { Row: Track; Insert: Partial<Track>; Update: Partial<Track> }
      movies: { Row: Movie; Insert: Partial<Movie>; Update: Partial<Movie> }
      podcasts: { Row: Podcast; Insert: Partial<Podcast>; Update: Partial<Podcast> }
      podcast_episodes: { Row: PodcastEpisode; Insert: Partial<PodcastEpisode>; Update: Partial<PodcastEpisode> }
      playlists: { Row: Playlist; Insert: Partial<Playlist>; Update: Partial<Playlist> }
      playlist_tracks: { Row: PlaylistTrack; Insert: Partial<PlaylistTrack>; Update: Partial<PlaylistTrack> }
      likes: { Row: Like; Insert: Partial<Like>; Update: Partial<Like> }
      follows: { Row: Follow; Insert: Partial<Follow>; Update: Partial<Follow> }
      play_history: { Row: PlayHistory; Insert: Partial<PlayHistory>; Update: Partial<PlayHistory> }
      watch_progress: { Row: WatchProgress; Insert: Partial<WatchProgress>; Update: Partial<WatchProgress> }
      notifications: { Row: Notification; Insert: Partial<Notification>; Update: Partial<Notification> }
      downloads: { Row: Download; Insert: Partial<Download>; Update: Partial<Download> }
      analytics_daily: { Row: AnalyticsDaily; Insert: Partial<AnalyticsDaily>; Update: Partial<AnalyticsDaily> }
    }
  }
}
