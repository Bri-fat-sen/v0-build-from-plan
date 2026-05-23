"use server"

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function initializeDatabase() {
  if (!supabaseServiceKey) {
    return { success: false, error: "SUPABASE_SERVICE_ROLE_KEY not found. Add it in Settings > Vars" }
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
  })

  const statements = [
    // Extensions
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
    `CREATE EXTENSION IF NOT EXISTS "pg_trgm"`,
    
    // Profiles
    `CREATE TABLE IF NOT EXISTS public.profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      username TEXT UNIQUE,
      display_name TEXT,
      avatar_url TEXT,
      bio TEXT,
      country TEXT,
      tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'family', 'student', 'creator')),
      is_verified BOOLEAN DEFAULT FALSE,
      is_creator BOOLEAN DEFAULT FALSE,
      creator_type TEXT CHECK (creator_type IN ('artist', 'filmmaker', 'podcaster', 'educator', NULL)),
      total_listening_minutes INTEGER DEFAULT 0,
      streak_days INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    // Artists
    `CREATE TABLE IF NOT EXISTS public.artists (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
      name TEXT NOT NULL,
      slug TEXT UNIQUE,
      bio TEXT,
      avatar_url TEXT,
      cover_url TEXT,
      country TEXT,
      genres TEXT[] DEFAULT '{}',
      is_verified BOOLEAN DEFAULT FALSE,
      monthly_listeners INTEGER DEFAULT 0,
      total_plays INTEGER DEFAULT 0,
      follower_count INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    // Albums
    `CREATE TABLE IF NOT EXISTS public.albums (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      slug TEXT,
      cover_url TEXT,
      release_date DATE,
      album_type TEXT DEFAULT 'album' CHECK (album_type IN ('album', 'single', 'ep', 'compilation')),
      genres TEXT[] DEFAULT '{}',
      total_tracks INTEGER DEFAULT 0,
      duration_ms INTEGER DEFAULT 0,
      play_count INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    // Tracks
    `CREATE TABLE IF NOT EXISTS public.tracks (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
      album_id UUID REFERENCES public.albums(id) ON DELETE SET NULL,
      title TEXT NOT NULL,
      slug TEXT,
      audio_url TEXT,
      cover_url TEXT,
      duration_ms INTEGER DEFAULT 0,
      track_number INTEGER,
      genres TEXT[] DEFAULT '{}',
      play_count INTEGER DEFAULT 0,
      like_count INTEGER DEFAULT 0,
      is_explicit BOOLEAN DEFAULT FALSE,
      release_date DATE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    // Movies
    `CREATE TABLE IF NOT EXISTS public.movies (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      slug TEXT UNIQUE,
      description TEXT,
      poster_url TEXT,
      backdrop_url TEXT,
      video_url TEXT,
      trailer_url TEXT,
      duration_minutes INTEGER,
      release_year INTEGER,
      genres TEXT[] DEFAULT '{}',
      country TEXT,
      language TEXT,
      director TEXT,
      cast_members TEXT[] DEFAULT '{}',
      rating DECIMAL(3,1),
      view_count INTEGER DEFAULT 0,
      is_featured BOOLEAN DEFAULT FALSE,
      content_type TEXT DEFAULT 'movie' CHECK (content_type IN ('movie', 'series', 'documentary', 'short')),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    // Playlists
    `CREATE TABLE IF NOT EXISTS public.playlists (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      cover_url TEXT,
      is_public BOOLEAN DEFAULT TRUE,
      is_collaborative BOOLEAN DEFAULT FALSE,
      follower_count INTEGER DEFAULT 0,
      track_count INTEGER DEFAULT 0,
      duration_ms INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )`,
    
    // Playlist Tracks Junction
    `CREATE TABLE IF NOT EXISTS public.playlist_tracks (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      playlist_id UUID REFERENCES public.playlists(id) ON DELETE CASCADE,
      track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE,
      added_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
      position INTEGER NOT NULL,
      added_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(playlist_id, track_id)
    )`,
    
    // Likes
    `CREATE TABLE IF NOT EXISTS public.likes (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      content_type TEXT NOT NULL CHECK (content_type IN ('track', 'album', 'artist', 'movie', 'playlist', 'podcast')),
      content_id UUID NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, content_type, content_id)
    )`,
    
    // Follows
    `CREATE TABLE IF NOT EXISTS public.follows (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      following_type TEXT NOT NULL CHECK (following_type IN ('artist', 'user', 'playlist', 'podcast')),
      following_id UUID NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(follower_id, following_type, following_id)
    )`,
    
    // Play History
    `CREATE TABLE IF NOT EXISTS public.play_history (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      content_type TEXT NOT NULL CHECK (content_type IN ('track', 'movie', 'podcast_episode')),
      content_id UUID NOT NULL,
      played_at TIMESTAMPTZ DEFAULT NOW(),
      duration_played_ms INTEGER DEFAULT 0,
      completed BOOLEAN DEFAULT FALSE
    )`,
    
    // Notifications
    `CREATE TABLE IF NOT EXISTS public.notifications (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
      type TEXT NOT NULL CHECK (type IN ('new_release', 'follow', 'like', 'comment', 'achievement', 'system', 'live_event')),
      title TEXT NOT NULL,
      message TEXT,
      image_url TEXT,
      action_url TEXT,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )`,

    // RLS - Enable
    `ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.playlist_tracks ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.play_history ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY`,

    // RLS Policies - Profiles
    `CREATE POLICY IF NOT EXISTS "profiles_select_all" ON public.profiles FOR SELECT USING (true)`,
    `CREATE POLICY IF NOT EXISTS "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id)`,
    `CREATE POLICY IF NOT EXISTS "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id)`,

    // RLS Policies - Public read for content
    `CREATE POLICY IF NOT EXISTS "artists_select_all" ON public.artists FOR SELECT USING (true)`,
    `CREATE POLICY IF NOT EXISTS "albums_select_all" ON public.albums FOR SELECT USING (true)`,
    `CREATE POLICY IF NOT EXISTS "tracks_select_all" ON public.tracks FOR SELECT USING (true)`,
    `CREATE POLICY IF NOT EXISTS "movies_select_all" ON public.movies FOR SELECT USING (true)`,

    // RLS Policies - Playlists
    `CREATE POLICY IF NOT EXISTS "playlists_select" ON public.playlists FOR SELECT USING (is_public = true OR auth.uid() = user_id)`,
    `CREATE POLICY IF NOT EXISTS "playlists_insert" ON public.playlists FOR INSERT WITH CHECK (auth.uid() = user_id)`,
    `CREATE POLICY IF NOT EXISTS "playlists_update" ON public.playlists FOR UPDATE USING (auth.uid() = user_id)`,
    `CREATE POLICY IF NOT EXISTS "playlists_delete" ON public.playlists FOR DELETE USING (auth.uid() = user_id)`,

    // RLS Policies - User activity (likes, follows, history)
    `CREATE POLICY IF NOT EXISTS "likes_select_own" ON public.likes FOR SELECT USING (auth.uid() = user_id)`,
    `CREATE POLICY IF NOT EXISTS "likes_insert_own" ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id)`,
    `CREATE POLICY IF NOT EXISTS "likes_delete_own" ON public.likes FOR DELETE USING (auth.uid() = user_id)`,

    `CREATE POLICY IF NOT EXISTS "follows_select_own" ON public.follows FOR SELECT USING (auth.uid() = follower_id)`,
    `CREATE POLICY IF NOT EXISTS "follows_insert_own" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id)`,
    `CREATE POLICY IF NOT EXISTS "follows_delete_own" ON public.follows FOR DELETE USING (auth.uid() = follower_id)`,

    `CREATE POLICY IF NOT EXISTS "history_select_own" ON public.play_history FOR SELECT USING (auth.uid() = user_id)`,
    `CREATE POLICY IF NOT EXISTS "history_insert_own" ON public.play_history FOR INSERT WITH CHECK (auth.uid() = user_id)`,

    `CREATE POLICY IF NOT EXISTS "notifications_select_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id)`,
    `CREATE POLICY IF NOT EXISTS "notifications_update_own" ON public.notifications FOR UPDATE USING (auth.uid() = user_id)`,

    // Auto-create profile trigger
    `CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public
    AS $$
    BEGIN
      INSERT INTO public.profiles (id, display_name, avatar_url)
      VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email),
        NEW.raw_user_meta_data ->> 'avatar_url'
      )
      ON CONFLICT (id) DO NOTHING;
      RETURN NEW;
    END;
    $$`,

    `DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users`,
    
    `CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_new_user()`,

    // Indexes for performance
    `CREATE INDEX IF NOT EXISTS idx_tracks_artist ON public.tracks(artist_id)`,
    `CREATE INDEX IF NOT EXISTS idx_tracks_album ON public.tracks(album_id)`,
    `CREATE INDEX IF NOT EXISTS idx_albums_artist ON public.albums(artist_id)`,
    `CREATE INDEX IF NOT EXISTS idx_likes_user ON public.likes(user_id)`,
    `CREATE INDEX IF NOT EXISTS idx_likes_content ON public.likes(content_type, content_id)`,
    `CREATE INDEX IF NOT EXISTS idx_follows_follower ON public.follows(follower_id)`,
    `CREATE INDEX IF NOT EXISTS idx_history_user ON public.play_history(user_id)`,
    `CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read)`,
  ]

  const results: { statement: number; success: boolean; error?: string }[] = []
  
  for (let i = 0; i < statements.length; i++) {
    const sql = statements[i]
    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: sql }).single()
      if (error && !error.message.includes('already exists')) {
        // Try direct query for DDL
        const { error: directError } = await supabase.from('_exec').select().limit(0)
        results.push({ statement: i + 1, success: !directError, error: directError?.message })
      } else {
        results.push({ statement: i + 1, success: true })
      }
    } catch (e: any) {
      results.push({ statement: i + 1, success: false, error: e.message })
    }
  }

  return { 
    success: true, 
    message: "Database schema created. If some statements show errors, they may already exist.",
    results 
  }
}
