import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Use service role key to bypass RLS for schema creation
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
)

export async function POST() {
  try {
    // Execute schema in chunks
    const schemas = [
      // 1. Profiles
      `CREATE TABLE IF NOT EXISTS public.profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        username TEXT UNIQUE,
        display_name TEXT,
        avatar_url TEXT,
        bio TEXT,
        country TEXT,
        tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'family', 'student')),
        mode TEXT DEFAULT 'listener' CHECK (mode IN ('listener', 'artist', 'creator', 'filmmaker', 'educator')),
        is_verified BOOLEAN DEFAULT FALSE,
        total_listening_minutes INTEGER DEFAULT 0,
        streak_days INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "profiles_select_all" ON public.profiles;
      CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);
      DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
      CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
      DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
      CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
      DROP POLICY IF EXISTS "profiles_delete_own" ON public.profiles;
      CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);`,

      // 2. Artists
      `CREATE TABLE IF NOT EXISTS public.artists (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
        name TEXT NOT NULL,
        slug TEXT UNIQUE,
        image TEXT,
        cover_image TEXT,
        bio TEXT,
        country TEXT,
        genres TEXT[] DEFAULT '{}',
        monthly_listeners INTEGER DEFAULT 0,
        total_streams INTEGER DEFAULT 0,
        is_verified BOOLEAN DEFAULT FALSE,
        social_links JSONB DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "artists_select_all" ON public.artists;
      CREATE POLICY "artists_select_all" ON public.artists FOR SELECT USING (true);
      DROP POLICY IF EXISTS "artists_insert_own" ON public.artists;
      CREATE POLICY "artists_insert_own" ON public.artists FOR INSERT WITH CHECK (auth.uid() = user_id);
      DROP POLICY IF EXISTS "artists_update_own" ON public.artists;
      CREATE POLICY "artists_update_own" ON public.artists FOR UPDATE USING (auth.uid() = user_id);
      DROP POLICY IF EXISTS "artists_delete_own" ON public.artists;
      CREATE POLICY "artists_delete_own" ON public.artists FOR DELETE USING (auth.uid() = user_id);`,

      // 3. Albums
      `CREATE TABLE IF NOT EXISTS public.albums (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        slug TEXT,
        cover TEXT,
        release_date DATE,
        album_type TEXT DEFAULT 'album' CHECK (album_type IN ('album', 'single', 'ep', 'compilation')),
        genres TEXT[] DEFAULT '{}',
        total_tracks INTEGER DEFAULT 0,
        duration_ms INTEGER DEFAULT 0,
        total_streams INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "albums_select_all" ON public.albums;
      CREATE POLICY "albums_select_all" ON public.albums FOR SELECT USING (true);`,

      // 4. Tracks
      `CREATE TABLE IF NOT EXISTS public.tracks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
        album_id UUID REFERENCES public.albums(id) ON DELETE SET NULL,
        title TEXT NOT NULL,
        slug TEXT,
        cover TEXT,
        audio_url TEXT,
        preview_url TEXT,
        duration_ms INTEGER DEFAULT 0,
        track_number INTEGER,
        genres TEXT[] DEFAULT '{}',
        bpm INTEGER,
        key TEXT,
        explicit BOOLEAN DEFAULT FALSE,
        lyrics TEXT,
        total_streams INTEGER DEFAULT 0,
        release_date DATE,
        is_playable BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "tracks_select_all" ON public.tracks;
      CREATE POLICY "tracks_select_all" ON public.tracks FOR SELECT USING (true);`,

      // 5. Movies
      `CREATE TABLE IF NOT EXISTS public.movies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
        title TEXT NOT NULL,
        slug TEXT,
        poster TEXT,
        backdrop TEXT,
        trailer_url TEXT,
        video_url TEXT,
        description TEXT,
        release_year INTEGER,
        duration_minutes INTEGER,
        genres TEXT[] DEFAULT '{}',
        country TEXT,
        language TEXT,
        rating TEXT CHECK (rating IN ('G', 'PG', 'PG-13', 'R', 'NC-17')),
        imdb_rating DECIMAL(3,1),
        total_views INTEGER DEFAULT 0,
        content_type TEXT DEFAULT 'movie' CHECK (content_type IN ('movie', 'series', 'documentary', 'short', 'music_video')),
        is_premium BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "movies_select_all" ON public.movies;
      CREATE POLICY "movies_select_all" ON public.movies FOR SELECT USING (true);
      DROP POLICY IF EXISTS "movies_insert_creator" ON public.movies;
      CREATE POLICY "movies_insert_creator" ON public.movies FOR INSERT WITH CHECK (auth.uid() = creator_id);
      DROP POLICY IF EXISTS "movies_update_creator" ON public.movies;
      CREATE POLICY "movies_update_creator" ON public.movies FOR UPDATE USING (auth.uid() = creator_id);
      DROP POLICY IF EXISTS "movies_delete_creator" ON public.movies;
      CREATE POLICY "movies_delete_creator" ON public.movies FOR DELETE USING (auth.uid() = creator_id);`,

      // 6. Podcasts
      `CREATE TABLE IF NOT EXISTS public.podcasts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        host_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
        title TEXT NOT NULL,
        slug TEXT,
        cover TEXT,
        description TEXT,
        categories TEXT[] DEFAULT '{}',
        language TEXT DEFAULT 'en',
        total_episodes INTEGER DEFAULT 0,
        total_subscribers INTEGER DEFAULT 0,
        is_explicit BOOLEAN DEFAULT FALSE,
        rss_feed TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "podcasts_select_all" ON public.podcasts;
      CREATE POLICY "podcasts_select_all" ON public.podcasts FOR SELECT USING (true);`,

      // 7. Podcast Episodes
      `CREATE TABLE IF NOT EXISTS public.podcast_episodes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        podcast_id UUID REFERENCES public.podcasts(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        audio_url TEXT,
        duration_ms INTEGER DEFAULT 0,
        episode_number INTEGER,
        season_number INTEGER DEFAULT 1,
        published_at TIMESTAMPTZ,
        total_plays INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE public.podcast_episodes ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "podcast_episodes_select_all" ON public.podcast_episodes;
      CREATE POLICY "podcast_episodes_select_all" ON public.podcast_episodes FOR SELECT USING (true);`,

      // 8. Playlists
      `CREATE TABLE IF NOT EXISTS public.playlists (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        cover TEXT,
        is_public BOOLEAN DEFAULT TRUE,
        is_collaborative BOOLEAN DEFAULT FALSE,
        total_tracks INTEGER DEFAULT 0,
        total_duration_ms INTEGER DEFAULT 0,
        total_followers INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "playlists_select_public" ON public.playlists;
      CREATE POLICY "playlists_select_public" ON public.playlists FOR SELECT USING (is_public = true OR auth.uid() = user_id);
      DROP POLICY IF EXISTS "playlists_insert_own" ON public.playlists;
      CREATE POLICY "playlists_insert_own" ON public.playlists FOR INSERT WITH CHECK (auth.uid() = user_id);
      DROP POLICY IF EXISTS "playlists_update_own" ON public.playlists;
      CREATE POLICY "playlists_update_own" ON public.playlists FOR UPDATE USING (auth.uid() = user_id);
      DROP POLICY IF EXISTS "playlists_delete_own" ON public.playlists;
      CREATE POLICY "playlists_delete_own" ON public.playlists FOR DELETE USING (auth.uid() = user_id);`,

      // 9. Playlist Tracks
      `CREATE TABLE IF NOT EXISTS public.playlist_tracks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        playlist_id UUID NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
        track_id UUID NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
        added_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
        position INTEGER NOT NULL,
        added_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(playlist_id, track_id)
      );
      ALTER TABLE public.playlist_tracks ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "playlist_tracks_select" ON public.playlist_tracks;
      CREATE POLICY "playlist_tracks_select" ON public.playlist_tracks FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.playlists WHERE id = playlist_id AND (is_public = true OR user_id = auth.uid()))
      );
      DROP POLICY IF EXISTS "playlist_tracks_insert" ON public.playlist_tracks;
      CREATE POLICY "playlist_tracks_insert" ON public.playlist_tracks FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM public.playlists WHERE id = playlist_id AND user_id = auth.uid())
      );
      DROP POLICY IF EXISTS "playlist_tracks_delete" ON public.playlist_tracks;
      CREATE POLICY "playlist_tracks_delete" ON public.playlist_tracks FOR DELETE USING (
        EXISTS (SELECT 1 FROM public.playlists WHERE id = playlist_id AND user_id = auth.uid())
      );`,

      // 10. Likes
      `CREATE TABLE IF NOT EXISTS public.likes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        content_type TEXT NOT NULL CHECK (content_type IN ('track', 'album', 'artist', 'movie', 'playlist', 'podcast')),
        content_id UUID NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, content_type, content_id)
      );
      ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "likes_select_own" ON public.likes;
      CREATE POLICY "likes_select_own" ON public.likes FOR SELECT USING (auth.uid() = user_id);
      DROP POLICY IF EXISTS "likes_insert_own" ON public.likes;
      CREATE POLICY "likes_insert_own" ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);
      DROP POLICY IF EXISTS "likes_delete_own" ON public.likes;
      CREATE POLICY "likes_delete_own" ON public.likes FOR DELETE USING (auth.uid() = user_id);`,

      // 11. Follows
      `CREATE TABLE IF NOT EXISTS public.follows (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        following_type TEXT NOT NULL CHECK (following_type IN ('artist', 'creator', 'playlist', 'podcast', 'user')),
        following_id UUID NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(follower_id, following_type, following_id)
      );
      ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "follows_select_own" ON public.follows;
      CREATE POLICY "follows_select_own" ON public.follows FOR SELECT USING (auth.uid() = follower_id);
      DROP POLICY IF EXISTS "follows_insert_own" ON public.follows;
      CREATE POLICY "follows_insert_own" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
      DROP POLICY IF EXISTS "follows_delete_own" ON public.follows;
      CREATE POLICY "follows_delete_own" ON public.follows FOR DELETE USING (auth.uid() = follower_id);`,

      // 12. Play History
      `CREATE TABLE IF NOT EXISTS public.play_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        content_type TEXT NOT NULL CHECK (content_type IN ('track', 'episode', 'movie')),
        content_id UUID NOT NULL,
        played_at TIMESTAMPTZ DEFAULT NOW(),
        duration_played_ms INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        context_type TEXT,
        context_id UUID
      );
      CREATE INDEX IF NOT EXISTS idx_play_history_user ON public.play_history(user_id, played_at DESC);
      ALTER TABLE public.play_history ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "play_history_select_own" ON public.play_history;
      CREATE POLICY "play_history_select_own" ON public.play_history FOR SELECT USING (auth.uid() = user_id);
      DROP POLICY IF EXISTS "play_history_insert_own" ON public.play_history;
      CREATE POLICY "play_history_insert_own" ON public.play_history FOR INSERT WITH CHECK (auth.uid() = user_id);`,

      // 13. Watch Progress
      `CREATE TABLE IF NOT EXISTS public.watch_progress (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
        progress_seconds INTEGER DEFAULT 0,
        total_seconds INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, movie_id)
      );
      ALTER TABLE public.watch_progress ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "watch_progress_select_own" ON public.watch_progress;
      CREATE POLICY "watch_progress_select_own" ON public.watch_progress FOR SELECT USING (auth.uid() = user_id);
      DROP POLICY IF EXISTS "watch_progress_insert_own" ON public.watch_progress;
      CREATE POLICY "watch_progress_insert_own" ON public.watch_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
      DROP POLICY IF EXISTS "watch_progress_update_own" ON public.watch_progress;
      CREATE POLICY "watch_progress_update_own" ON public.watch_progress FOR UPDATE USING (auth.uid() = user_id);`,

      // 14. Notifications
      `CREATE TABLE IF NOT EXISTS public.notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        type TEXT NOT NULL CHECK (type IN ('new_release', 'live_event', 'follow', 'like', 'comment', 'achievement', 'system')),
        title TEXT NOT NULL,
        message TEXT,
        image TEXT,
        link TEXT,
        metadata JSONB DEFAULT '{}',
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, created_at DESC);
      ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
      CREATE POLICY "notifications_select_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
      DROP POLICY IF EXISTS "notifications_update_own" ON public.notifications;
      CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
      DROP POLICY IF EXISTS "notifications_delete_own" ON public.notifications;
      CREATE POLICY "notifications_delete_own" ON public.notifications FOR DELETE USING (auth.uid() = user_id);`,

      // 15. Downloads
      `CREATE TABLE IF NOT EXISTS public.downloads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        content_type TEXT NOT NULL CHECK (content_type IN ('track', 'album', 'playlist', 'movie', 'episode')),
        content_id UUID NOT NULL,
        quality TEXT DEFAULT 'high',
        file_size_bytes BIGINT,
        downloaded_at TIMESTAMPTZ DEFAULT NOW(),
        expires_at TIMESTAMPTZ,
        UNIQUE(user_id, content_type, content_id)
      );
      ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
      DROP POLICY IF EXISTS "downloads_select_own" ON public.downloads;
      CREATE POLICY "downloads_select_own" ON public.downloads FOR SELECT USING (auth.uid() = user_id);
      DROP POLICY IF EXISTS "downloads_insert_own" ON public.downloads;
      CREATE POLICY "downloads_insert_own" ON public.downloads FOR INSERT WITH CHECK (auth.uid() = user_id);
      DROP POLICY IF EXISTS "downloads_delete_own" ON public.downloads;
      CREATE POLICY "downloads_delete_own" ON public.downloads FOR DELETE USING (auth.uid() = user_id);`,

      // 16. Analytics Daily
      `CREATE TABLE IF NOT EXISTS public.analytics_daily (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content_type TEXT NOT NULL,
        content_id UUID NOT NULL,
        date DATE NOT NULL,
        plays INTEGER DEFAULT 0,
        unique_listeners INTEGER DEFAULT 0,
        total_duration_ms BIGINT DEFAULT 0,
        likes INTEGER DEFAULT 0,
        shares INTEGER DEFAULT 0,
        saves INTEGER DEFAULT 0,
        UNIQUE(content_type, content_id, date)
      );`,

      // 17. Triggers
      `CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER
      LANGUAGE plpgsql
      SECURITY DEFINER
      SET search_path = public
      AS $$
      BEGIN
        INSERT INTO public.profiles (id, username, display_name, avatar_url)
        VALUES (
          NEW.id,
          COALESCE(NEW.raw_user_meta_data ->> 'username', NULL),
          COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.raw_user_meta_data ->> 'full_name', NULL),
          COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NULL)
        )
        ON CONFLICT (id) DO NOTHING;
        RETURN NEW;
      END;
      $$;
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW
        EXECUTE FUNCTION public.handle_new_user();`,

      // 18. Updated at trigger function
      `CREATE OR REPLACE FUNCTION public.update_updated_at()
      RETURNS TRIGGER
      LANGUAGE plpgsql
      AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$;`,

      // 19. Apply updated_at triggers
      `DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
      CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
      DROP TRIGGER IF EXISTS artists_updated_at ON public.artists;
      CREATE TRIGGER artists_updated_at BEFORE UPDATE ON public.artists FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
      DROP TRIGGER IF EXISTS albums_updated_at ON public.albums;
      CREATE TRIGGER albums_updated_at BEFORE UPDATE ON public.albums FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
      DROP TRIGGER IF EXISTS tracks_updated_at ON public.tracks;
      CREATE TRIGGER tracks_updated_at BEFORE UPDATE ON public.tracks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
      DROP TRIGGER IF EXISTS movies_updated_at ON public.movies;
      CREATE TRIGGER movies_updated_at BEFORE UPDATE ON public.movies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
      DROP TRIGGER IF EXISTS playlists_updated_at ON public.playlists;
      CREATE TRIGGER playlists_updated_at BEFORE UPDATE ON public.playlists FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
      DROP TRIGGER IF EXISTS podcasts_updated_at ON public.podcasts;
      CREATE TRIGGER podcasts_updated_at BEFORE UPDATE ON public.podcasts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();`
    ]

    const results: { step: number; success: boolean; error?: string }[] = []

    for (let i = 0; i < schemas.length; i++) {
      const { error } = await supabaseAdmin.rpc('exec_sql', { sql: schemas[i] }).maybeSingle()
      
      if (error) {
        // Try direct query if rpc fails
        const { error: queryError } = await supabaseAdmin.from('_temp').select().limit(0)
        results.push({ step: i + 1, success: false, error: error.message })
      } else {
        results.push({ step: i + 1, success: true })
      }
    }

    return NextResponse.json({ 
      message: "Database schema setup attempted",
      results,
      totalSteps: schemas.length,
      successful: results.filter(r => r.success).length
    })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Setup failed" },
      { status: 500 }
    )
  }
}
