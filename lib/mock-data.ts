// AfriStream Mock Data

// User Types based on AfriStream Blueprint
export type UserType = 
  | "listener" 
  | "artist" 
  | "label" 
  | "filmmaker" 
  | "creator" 
  | "cultural_educator" 
  | "comedian" 
  | "event_organizer" 
  | "brand";

export interface UserTypeInfo {
  id: UserType;
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  studioAccess: boolean;
  studioPath?: string;
}

export const userTypes: UserTypeInfo[] = [
  { 
    id: "listener", 
    name: "Listener / Fan", 
    description: "Discover and enjoy African music, movies, and culture",
    icon: "headphones",
    color: "primary",
    features: ["Personalized recommendations", "Playlists & watchlists", "Offline downloads", "Support your favorite artists"],
    studioAccess: false
  },
  { 
    id: "artist", 
    name: "Music Artist", 
    description: "Release music, grow your fanbase, and earn royalties",
    icon: "mic",
    color: "primary",
    features: ["Upload unlimited music", "Real-time analytics", "Fan insights", "Direct royalty payouts", "Promotional tools"],
    studioAccess: true,
    studioPath: "/artist"
  },
  { 
    id: "label", 
    name: "Record Label", 
    description: "Manage artists, releases, and catalogue royalties",
    icon: "disc",
    color: "primary",
    features: ["Multi-artist management", "Catalogue administration", "Split management", "Campaign tools", "Revenue reports"],
    studioAccess: true,
    studioPath: "/label"
  },
  { 
    id: "filmmaker", 
    name: "Filmmaker / Director", 
    description: "Distribute films, manage premieres, and reach audiences",
    icon: "clapperboard",
    color: "primary",
    features: ["Film distribution", "Premiere scheduling", "Rental & purchase options", "Audience analytics", "Licensing tools"],
    studioAccess: true,
    studioPath: "/film"
  },
  { 
    id: "creator", 
    name: "Content Creator", 
    description: "Build your channel with videos, podcasts, and shorts",
    icon: "video",
    color: "primary",
    features: ["Channel customization", "Video & podcast uploads", "Shorts creation", "Monetization", "Community features"],
    studioAccess: true,
    studioPath: "/creator"
  },
  { 
    id: "cultural_educator", 
    name: "Cultural Educator", 
    description: "Preserve and share African heritage, language, and traditions",
    icon: "book-open",
    color: "primary",
    features: ["Heritage archiving", "Language courses", "Cultural documentation", "Community building", "Educational content"],
    studioAccess: true,
    studioPath: "/culture-studio"
  },
  { 
    id: "comedian", 
    name: "Comedian / Skit Creator", 
    description: "Share comedy, skits, and entertainment content",
    icon: "laugh",
    color: "primary",
    features: ["Skit uploads", "Comedy series", "Fan engagement", "Live show promotion", "Tip earnings"],
    studioAccess: true,
    studioPath: "/creator"
  },
  { 
    id: "event_organizer", 
    name: "Event Organizer", 
    description: "Promote concerts, festivals, and cultural events",
    icon: "calendar",
    color: "primary",
    features: ["Event creation", "Ticket sales", "Livestream setup", "Audience reach", "Revenue tracking"],
    studioAccess: true,
    studioPath: "/events"
  },
  { 
    id: "brand", 
    name: "Brand / Sponsor", 
    description: "Reach African audiences through sponsorships and campaigns",
    icon: "megaphone",
    color: "primary",
    features: ["Sponsorship opportunities", "Campaign analytics", "Audience targeting", "Creator partnerships", "Hub sponsorship"],
    studioAccess: false
  },
];

export interface Track {
  id: string; title: string; artist: string; artistId: string; album: string; albumId: string;
  duration: string; coverArt: string; genre: string; plays: number; country: string;
}
export interface Album {
  id: string; title: string; artist: string; artistId: string; coverArt: string;
  year: number; genre: string; tracks: number; country: string; type: "Album" | "EP" | "Single";
}
export interface Artist {
  id: string; name: string; avatar: string; banner: string; genre: string;
  country: string; followers: number; monthlyListeners: number; verified: boolean; bio: string;
}
export interface Movie {
  id: string; title: string; poster: string; banner: string; year: number;
  genre: string; rating: string; duration: string; synopsis: string; director: string;
  country: string; language: string; category: string; type: "movie" | "series";
  seasons?: number; episodes?: number;
}
export interface Creator {
  id: string; name: string; avatar: string; banner: string; category: string;
  country: string; location: string; subscribers: number; videos: number; bio: string;
}
export interface Event {
  id: string; title: string; banner: string; date: string; time: string;
  location: string; type: string; performers: string[]; price: string; status: "upcoming" | "live" | "past";
}
export interface CountryHub {
  id: string; name: string; code: string; flag: string; region: string;
  artists: number; movies: number; creators: number;
}
export interface DiasporaHub {
  id: string; name: string; flag: string; population: string;
  artists: number; events: number; creators: number;
}

const IMG = (seed: string, w = 400, h = 400) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const mockArtists: Artist[] = [
  { id: "a1", name: "Burna Boy", avatar: IMG("burna", 200, 200), banner: IMG("burna-b", 1200, 400), genre: "Afrobeats", country: "Nigeria", followers: 12500000, monthlyListeners: 28000000, verified: true, bio: "Grammy-winning Afrobeats pioneer" },
  { id: "a2", name: "Tyla", avatar: IMG("tyla", 200, 200), banner: IMG("tyla-b", 1200, 400), genre: "Amapiano", country: "South Africa", followers: 8200000, monthlyListeners: 18000000, verified: true, bio: "Amapiano queen taking the world by storm" },
  { id: "a3", name: "Wizkid", avatar: IMG("wizkid", 200, 200), banner: IMG("wizkid-b", 1200, 400), genre: "Afrobeats", country: "Nigeria", followers: 15000000, monthlyListeners: 25000000, verified: true, bio: "Starboy. Global icon of Afrobeats" },
  { id: "a4", name: "Sauti Sol", avatar: IMG("sauti", 200, 200), banner: IMG("sauti-b", 1200, 400), genre: "Afro-Pop", country: "Kenya", followers: 3200000, monthlyListeners: 5000000, verified: true, bio: "East Africa's premier band" },
  { id: "a5", name: "Diamond Platnumz", avatar: IMG("diamond", 200, 200), banner: IMG("diamond-b", 1200, 400), genre: "Bongo Flava", country: "Tanzania", followers: 9000000, monthlyListeners: 12000000, verified: true, bio: "Bongo Flava's biggest star" },
  { id: "a6", name: "Davido", avatar: IMG("davido", 200, 200), banner: IMG("davido-b", 1200, 400), genre: "Afrobeats", country: "Nigeria", followers: 14000000, monthlyListeners: 22000000, verified: true, bio: "OBO. 30 Billion Gang leader" },
  { id: "a7", name: "Shatta Wale", avatar: IMG("shatta", 200, 200), banner: IMG("shatta-b", 1200, 400), genre: "Dancehall", country: "Ghana", followers: 5500000, monthlyListeners: 7000000, verified: true, bio: "King of African Dancehall" },
  { id: "a8", name: "Innoss'B", avatar: IMG("innoss", 200, 200), banner: IMG("innoss-b", 1200, 400), genre: "Afro-Pop", country: "Burundi", followers: 2100000, monthlyListeners: 3500000, verified: true, bio: "Francophone Africa rising star" },
  { id: "a9", name: "Focalistic", avatar: IMG("focal", 200, 200), banner: IMG("focal-b", 1200, 400), genre: "Amapiano", country: "South Africa", followers: 4300000, monthlyListeners: 8000000, verified: true, bio: "President ya Straata" },
  { id: "a10", name: "Aya Nakamura", avatar: IMG("aya", 200, 200), banner: IMG("aya-b", 1200, 400), genre: "Afro-Pop", country: "Mali", followers: 11000000, monthlyListeners: 20000000, verified: true, bio: "Most streamed French-speaking artist in the world" },
];

export const mockTracks: Track[] = [
  { id: "t1", title: "City Boys", artist: "Burna Boy", artistId: "a1", album: "I Told Them", albumId: "al1", duration: "3:42", coverArt: IMG("city", 300, 300), genre: "Afrobeats", plays: 145000000, country: "Nigeria" },
  { id: "t2", title: "Water", artist: "Tyla", artistId: "a2", album: "Tyla", albumId: "al2", duration: "3:18", coverArt: IMG("water", 300, 300), genre: "Amapiano", plays: 320000000, country: "South Africa" },
  { id: "t3", title: "Essence", artist: "Wizkid", artistId: "a3", album: "Made in Lagos", albumId: "al3", duration: "4:08", coverArt: IMG("essence", 300, 300), genre: "Afrobeats", plays: 450000000, country: "Nigeria" },
  { id: "t4", title: "Suzanna", artist: "Sauti Sol", artistId: "a4", album: "Midnight Train", albumId: "al4", duration: "3:55", coverArt: IMG("suzanna", 300, 300), genre: "Afro-Pop", plays: 25000000, country: "Kenya" },
  { id: "t5", title: "Jeje", artist: "Diamond Platnumz", artistId: "a5", album: "First of All", albumId: "al5", duration: "3:30", coverArt: IMG("jeje", 300, 300), genre: "Bongo Flava", plays: 85000000, country: "Tanzania" },
  { id: "t6", title: "Feel", artist: "Davido", artistId: "a6", album: "Timeless", albumId: "al6", duration: "2:58", coverArt: IMG("feel", 300, 300), genre: "Afrobeats", plays: 120000000, country: "Nigeria" },
  { id: "t7", title: "On God", artist: "Davido", artistId: "a6", album: "Timeless", albumId: "al6", duration: "3:15", coverArt: IMG("ongod", 300, 300), genre: "Afrobeats", plays: 95000000, country: "Nigeria" },
  { id: "t8", title: "Ke Star", artist: "Focalistic", artistId: "a9", album: "Sghubu Ses Excellent", albumId: "al9", duration: "3:22", coverArt: IMG("kestar", 300, 300), genre: "Amapiano", plays: 110000000, country: "South Africa" },
  { id: "t9", title: "Djadja", artist: "Aya Nakamura", artistId: "a10", album: "Nakamura", albumId: "al10", duration: "3:00", coverArt: IMG("djadja", 300, 300), genre: "Afro-Pop", plays: 900000000, country: "Mali" },
  { id: "t10", title: "Ye", artist: "Burna Boy", artistId: "a1", album: "Outside", albumId: "al11", duration: "3:36", coverArt: IMG("ye", 300, 300), genre: "Afrobeats", plays: 200000000, country: "Nigeria" },
  { id: "t11", title: "Already", artist: "Shatta Wale", artistId: "a7", album: "Gift of God", albumId: "al7", duration: "3:09", coverArt: IMG("already", 300, 300), genre: "Dancehall", plays: 60000000, country: "Ghana" },
  { id: "t12", title: "Yope", artist: "Innoss'B", artistId: "a8", album: "Africa", albumId: "al8", duration: "3:44", coverArt: IMG("yope", 300, 300), genre: "Afro-Pop", plays: 40000000, country: "Burundi" },
];

export const mockAlbums: Album[] = [
  { id: "al1", title: "I Told Them", artist: "Burna Boy", artistId: "a1", coverArt: IMG("itold", 400, 400), year: 2023, genre: "Afrobeats", tracks: 17, country: "Nigeria", type: "Album" },
  { id: "al2", title: "Tyla", artist: "Tyla", artistId: "a2", coverArt: IMG("tylaalbum", 400, 400), year: 2024, genre: "Amapiano", tracks: 14, country: "South Africa", type: "Album" },
  { id: "al3", title: "Made in Lagos", artist: "Wizkid", artistId: "a3", coverArt: IMG("milalbum", 400, 400), year: 2020, genre: "Afrobeats", tracks: 14, country: "Nigeria", type: "Album" },
  { id: "al4", title: "Midnight Train", artist: "Sauti Sol", artistId: "a4", coverArt: IMG("midnight", 400, 400), year: 2020, genre: "Afro-Pop", tracks: 15, country: "Kenya", type: "Album" },
  { id: "al5", title: "First of All", artist: "Diamond Platnumz", artistId: "a5", coverArt: IMG("firstof", 400, 400), year: 2023, genre: "Bongo Flava", tracks: 12, country: "Tanzania", type: "Album" },
  { id: "al6", title: "Timeless", artist: "Davido", artistId: "a6", coverArt: IMG("timeless", 400, 400), year: 2023, genre: "Afrobeats", tracks: 17, country: "Nigeria", type: "Album" },
  { id: "al7", title: "Gift of God", artist: "Shatta Wale", artistId: "a7", coverArt: IMG("gift", 400, 400), year: 2022, genre: "Dancehall", tracks: 18, country: "Ghana", type: "Album" },
  { id: "al8", title: "Africa", artist: "Innoss'B", artistId: "a8", coverArt: IMG("africa", 400, 400), year: 2023, genre: "Afro-Pop", tracks: 10, country: "Burundi", type: "EP" },
];

export const mockMovies: Movie[] = [
  { id: "m1", title: "The Black Book", poster: IMG("blackbook", 300, 450), banner: IMG("blackbook-b", 1200, 500), year: 2023, genre: "Thriller", rating: "16+", duration: "2h 4m", synopsis: "A former deacon takes on a criminal underworld to save his son from a wrongful conviction.", director: "Editi Effiong", country: "Nigeria", language: "English", category: "Nollywood", type: "movie" },
  { id: "m2", title: "Mami Wata", poster: IMG("mamiwata", 300, 450), banner: IMG("mamiwata-b", 1200, 500), year: 2023, genre: "Fantasy", rating: "13+", duration: "1h 47m", synopsis: "A mystical tale of two sisters in a coastal village whose way of life is threatened by outsiders.", director: "C.J. Obasi", country: "Nigeria", language: "Pidgin", category: "Independent", type: "movie" },
  { id: "m3", title: "Sew the Winter to My Skin", poster: IMG("sewwinter", 300, 450), banner: IMG("sewwinter-b", 1200, 500), year: 2023, genre: "Drama", rating: "16+", duration: "1h 58m", synopsis: "Based on the true story of John Kepe, a folk hero hunted through the South African mountains.", director: "Jahmil X.T. Qubeka", country: "South Africa", language: "Afrikaans", category: "South African", type: "movie" },
  { id: "m4", title: "Eyimofe (This Is My Desire)", poster: IMG("eyimofe", 300, 450), banner: IMG("eyimofe-b", 1200, 500), year: 2020, genre: "Drama", rating: "16+", duration: "1h 56m", synopsis: "Two Lagosians pursue their dreams of leaving Nigeria for a better life abroad.", director: "Arie & Chuko Esiri", country: "Nigeria", language: "English/Yoruba", category: "Nollywood", type: "movie" },
  { id: "m5", title: "Rafiki", poster: IMG("rafiki", 300, 450), banner: IMG("rafiki-b", 1200, 500), year: 2018, genre: "Romance", rating: "16+", duration: "1h 23m", synopsis: "Two young women in Nairobi navigate love amidst cultural and political pressures.", director: "Wanuri Kahiu", country: "Kenya", language: "Swahili/English", category: "East African", type: "movie" },
  { id: "m6", title: "Oloture", poster: IMG("oloture", 300, 450), banner: IMG("oloture-b", 1200, 500), year: 2020, genre: "Drama", rating: "18+", duration: "2h 10m", synopsis: "A journalist goes undercover in the Lagos sex trade, risking everything for the story.", director: "Kenneth Gyang", country: "Nigeria", language: "English", category: "Nollywood", type: "movie" },
  { id: "m7", title: "Atlantics", poster: IMG("atlantics", 300, 450), banner: IMG("atlantics-b", 1200, 500), year: 2019, genre: "Supernatural", rating: "13+", duration: "1h 46m", synopsis: "A supernatural tale of love and migration set on the Senegalese coast.", director: "Mati Diop", country: "Senegal", language: "French/Wolof", category: "Francophone", type: "movie" },
  { id: "m8", title: "Blood & Water", poster: IMG("blood", 300, 450), banner: IMG("blood-b", 1200, 500), year: 2020, genre: "Teen Drama", rating: "16+", duration: "6 Seasons", synopsis: "A teen investigates whether a swimming star at her school is her sister who was abducted at birth.", director: "Nosipho Dumisa", country: "South Africa", language: "English", category: "South African", type: "series", seasons: 6, episodes: 32 },
  { id: "m9", title: "Gangs of Lagos", poster: IMG("gangs", 300, 450), banner: IMG("gangs-b", 1200, 500), year: 2023, genre: "Action", rating: "18+", duration: "2h 5m", synopsis: "A group of friends raised on the streets of Lagos navigate love, ambition, and danger.", director: "Jade Osiberu", country: "Nigeria", language: "English/Yoruba", category: "Nollywood", type: "movie" },
  { id: "m10", title: "The Wife", poster: IMG("wife", 300, 450), banner: IMG("wife-b", 1200, 500), year: 2022, genre: "Drama", rating: "16+", duration: "3 Seasons", synopsis: "A young bride discovers dark family secrets in a powerful Zulu family.", director: "Various", country: "South Africa", language: "Zulu", category: "South African", type: "series", seasons: 3, episodes: 120 },
];

export const mockCreators: Creator[] = [
  { id: "c1", name: "Wode Maya", avatar: IMG("wode", 200, 200), banner: IMG("wode-b", 1200, 400), category: "Travel & Culture", country: "Ghana", location: "Ghana", subscribers: 3200000, videos: 850, bio: "Showcasing the beauty of Africa to the world" },
  { id: "c2", name: "Mark Angel", avatar: IMG("markangel", 200, 200), banner: IMG("markangel-b", 1200, 400), category: "Comedy", country: "Nigeria", location: "Nigeria", subscribers: 9500000, videos: 600, bio: "Africa's comedy king" },
  { id: "c3", name: "Kili Paul", avatar: IMG("kili", 200, 200), banner: IMG("kili-b", 1200, 400), category: "Music & Entertainment", country: "Tanzania", location: "Tanzania", subscribers: 5000000, videos: 400, bio: "Lip sync sensation turned entertainer" },
  { id: "c4", name: "Elsa Majimbo", avatar: IMG("elsa", 200, 200), banner: IMG("elsa-b", 1200, 400), category: "Comedy", country: "Kenya", location: "Los Angeles", subscribers: 2000000, videos: 200, bio: "Kenya to the world, one snack at a time" },
  { id: "c5", name: "Auntie Shamsa", avatar: IMG("shamsa", 200, 200), banner: IMG("shamsa-b", 1200, 400), category: "Lifestyle & Diaspora", country: "Sierra Leone", location: "London", subscribers: 450000, videos: 320, bio: "Sierra Leonean lifestyle in the UK diaspora" },
  { id: "c6", name: "Nas Daily Africa", avatar: IMG("nasdaily", 200, 200), banner: IMG("nasdaily-b", 1200, 400), category: "Education", country: "Pan-African", location: "Dubai", subscribers: 7000000, videos: 500, bio: "1-minute videos about amazing people in Africa" },
];

export const mockEvents: Event[] = [
  { id: "e1", title: "AfroNation Ghana 2025", banner: IMG("afronation", 1200, 500), date: "2025-12-28", time: "16:00", location: "Accra, Ghana", type: "Festival", performers: ["Burna Boy", "Wizkid", "Davido", "Tyla"], price: "$150", status: "upcoming" },
  { id: "e2", title: "Amapiano to the World", banner: IMG("amapworld", 1200, 500), date: "2025-08-15", time: "20:00", location: "Online / Virtual", type: "Concert", performers: ["Focalistic", "Tyla", "Uncle Waffles"], price: "$25", status: "upcoming" },
  { id: "e3", title: "Lagos Comedy Festival", banner: IMG("lagoscomedy", 1200, 500), date: "2025-07-10", time: "19:00", location: "Eko Hotel, Lagos", type: "Comedy Show", performers: ["Mark Angel", "Basketmouth", "AY"], price: "$40", status: "upcoming" },
  { id: "e4", title: "Film Africa London", banner: IMG("filmafrica", 1200, 500), date: "2025-11-01", time: "14:00", location: "London, UK", type: "Premiere", performers: ["Various Filmmakers"], price: "$30", status: "upcoming" },
  { id: "e5", title: "Sauti Sol Farewell Tour", banner: IMG("sautilive", 1200, 500), date: "2025-09-20", time: "19:00", location: "Nairobi, Kenya", type: "Concert", performers: ["Sauti Sol"], price: "$60", status: "upcoming" },
  { id: "e6", title: "Gospel Africa Praise Night", banner: IMG("gospellive", 1200, 500), date: "2025-06-15", time: "18:00", location: "Johannesburg, SA", type: "Gospel Event", performers: ["Benjamin Dube", "Mercy Chinwo"], price: "Free", status: "live" },
];

export const mockCountryHubs: CountryHub[] = [
  { id: "ng", name: "Nigeria", code: "NG", flag: "NG", region: "West Africa", artists: 1200, movies: 850, creators: 450 },
  { id: "gh", name: "Ghana", code: "GH", flag: "GH", region: "West Africa", artists: 380, movies: 120, creators: 200 },
  { id: "za", name: "South Africa", code: "ZA", flag: "ZA", region: "Southern Africa", artists: 650, movies: 400, creators: 320 },
  { id: "ke", name: "Kenya", code: "KE", flag: "KE", region: "East Africa", artists: 280, movies: 150, creators: 180 },
  { id: "tz", name: "Tanzania", code: "TZ", flag: "TZ", region: "East Africa", artists: 320, movies: 80, creators: 150 },
  { id: "sl", name: "Sierra Leone", code: "SL", flag: "SL", region: "West Africa", artists: 90, movies: 25, creators: 60 },
  { id: "sn", name: "Senegal", code: "SN", flag: "SN", region: "West Africa", artists: 180, movies: 95, creators: 80 },
  { id: "et", name: "Ethiopia", code: "ET", flag: "ET", region: "East Africa", artists: 250, movies: 110, creators: 130 },
  { id: "cm", name: "Cameroon", code: "CM", flag: "CM", region: "Central Africa", artists: 220, movies: 65, creators: 90 },
  { id: "cd", name: "DR Congo", code: "CD", flag: "CD", region: "Central Africa", artists: 310, movies: 45, creators: 70 },
  { id: "eg", name: "Egypt", code: "EG", flag: "EG", region: "North Africa", artists: 400, movies: 350, creators: 250 },
  { id: "ma", name: "Morocco", code: "MA", flag: "MA", region: "North Africa", artists: 200, movies: 180, creators: 120 },
  { id: "ug", name: "Uganda", code: "UG", flag: "UG", region: "East Africa", artists: 190, movies: 50, creators: 100 },
  { id: "rw", name: "Rwanda", code: "RW", flag: "RW", region: "East Africa", artists: 80, movies: 30, creators: 55 },
  { id: "ci", name: "Ivory Coast", code: "CI", flag: "CI", region: "West Africa", artists: 170, movies: 55, creators: 75 },
  { id: "bi", name: "Burundi", code: "BI", flag: "BI", region: "East Africa", artists: 45, movies: 15, creators: 30 },
];

export const mockDiasporaHubs: DiasporaHub[] = [
  { id: "d-uk", name: "United Kingdom", flag: "GB", population: "2.5M+", artists: 120, events: 85, creators: 200 },
  { id: "d-us", name: "United States", flag: "US", population: "4.5M+", artists: 200, events: 120, creators: 350 },
  { id: "d-ca", name: "Canada", flag: "CA", population: "1.2M+", artists: 60, events: 40, creators: 90 },
  { id: "d-au", name: "Australia", flag: "AU", population: "600K+", artists: 30, events: 20, creators: 45 },
  { id: "d-eu", name: "Europe", flag: "EU", population: "3M+", artists: 150, events: 95, creators: 180 },
  { id: "d-ae", name: "UAE / Gulf", flag: "AE", population: "800K+", artists: 25, events: 30, creators: 40 },
];

export const genres = [
  "Afrobeats", "Amapiano", "Afro House", "Highlife", "Juju", "Afro-Soul", "Bongo Flava",
  "Gqom", "Kwaito", "Mbalax", "Soukous", "Afro-Gospel", "Afro-RnB", "Afro-Hip Hop",
  "Dancehall", "Afro-Jazz", "Afro-Fusion", "Afro-Classical", "Afro-Electronic", "Traditional",
  "Palm Wine", "Benga", "Taarab", "Gnawa", "Rai", "Hiplife", "Azonto", "Kuduro", "Makossa",
];

export const movieCategories = [
  "Nollywood", "Salone Films", "Ghanaian Films", "South African", "East African",
  "Francophone", "North African", "Diaspora", "Short Films", "Documentaries",
  "Comedy", "Faith/Gospel", "Independent",
];

export const creatorCategories = [
  "Music", "Movie", "Culture", "Comedy", "Podcast", "Lifestyle & Diaspora",
  "Faith/Gospel", "Education",
];

export const subscriptionTiers = [
  { 
    id: "free",
    name: "Free", 
    price: "$0", 
    priceLocal: "Free", 
    priceAnnual: "$0",
    billing: "forever",
    contentAccess: ["music_limited"],
    royaltySplit: { creators: 0, platform: 100 }, // Ad-supported, platform keeps ad revenue
    features: ["Ad-supported music (shuffle only)", "Standard audio quality", "Limited skips (6/hour)", "Browse all content", "72hr Premium trial"], 
    highlight: false,
    cta: "Current Plan"
  },
  { 
    id: "music",
    name: "Music", 
    price: "$2.99/mo", 
    priceLocal: "KES 300/mo", 
    priceAnnual: "$29.99/yr",
    billing: "monthly",
    contentAccess: ["music"],
    royaltySplit: { creators: 70, platform: 30 }, // User-centric: 70% to artists you stream
    features: ["Ad-free music streaming", "HD audio quality", "Unlimited skips & plays", "Offline downloads (100 songs)", "Lyrics & song credits", "Your money goes to artists YOU listen to"], 
    highlight: false,
    cta: "Start Music"
  },
  { 
    id: "video",
    name: "Video", 
    price: "$3.99/mo", 
    priceLocal: "KES 400/mo", 
    priceAnnual: "$39.99/yr",
    billing: "monthly",
    contentAccess: ["creators", "shorts"],
    royaltySplit: { creators: 70, platform: 30 }, // User-centric: 70% to creators you watch
    features: ["Ad-free creator videos", "1080p streaming", "Podcasts & shorts", "Offline downloads", "Support creators directly", "Your money goes to creators YOU watch"], 
    highlight: false,
    cta: "Start Video"
  },
  { 
    id: "movies",
    name: "Movies", 
    price: "$4.99/mo", 
    priceLocal: "KES 500/mo", 
    priceAnnual: "$49.99/yr",
    billing: "monthly",
    contentAccess: ["movies", "series"],
    royaltySplit: { creators: 65, platform: 35 }, // Slightly more platform cut for licensing
    features: ["Full movie library", "4K streaming", "New releases & premieres", "Download for offline", "Exclusive African cinema", "Your money funds filmmakers YOU watch"], 
    highlight: false,
    cta: "Start Movies"
  },
  { 
    id: "premium",
    name: "Premium", 
    price: "$7.99/mo", 
    priceLocal: "KES 800/mo", 
    priceAnnual: "$79.99/yr",
    billing: "monthly",
    contentAccess: ["music", "creators", "shorts", "movies", "series"],
    royaltySplit: { creators: 70, platform: 30 }, // User-centric across all content
    features: ["Everything: Music + Video + Movies", "Lossless & spatial audio", "4K HDR video", "Unlimited offline downloads", "3 devices", "Early access to releases", "See exactly where your money goes"], 
    highlight: true,
    cta: "Go Premium"
  },
  { 
    id: "platinum",
    name: "Platinum", 
    price: "$12.99/mo", 
    priceLocal: "KES 1300/mo", 
    priceAnnual: "$129.99/yr",
    billing: "monthly",
    contentAccess: ["music", "creators", "shorts", "movies", "series", "live", "exclusive"],
    royaltySplit: { creators: 75, platform: 25 }, // Better split for premium supporters
    features: ["Everything in Premium", "Exclusive Platinum content", "Live event access", "Virtual meet & greets", "$5 tip credits monthly", "6 devices", "Priority support", "Platinum badge on profile", "75% of your sub goes to creators"], 
    highlight: false,
    cta: "Go Platinum"
  },
  { 
    id: "family",
    name: "Family", 
    price: "$14.99/mo", 
    priceLocal: "KES 1500/mo", 
    priceAnnual: "$149.99/yr",
    billing: "monthly",
    contentAccess: ["music", "creators", "shorts", "movies", "series"],
    royaltySplit: { creators: 70, platform: 30 },
    features: ["All Premium features", "Up to 6 family members", "Individual profiles & recommendations", "Parental controls", "Family Mix playlists", "Combined impact dashboard"], 
    highlight: false,
    cta: "Start Family"
  },
  { 
    id: "creator_pro",
    name: "Creator Pro", 
    price: "$19.99/mo", 
    priceLocal: "KES 2000/mo", 
    priceAnnual: "$199.99/yr",
    billing: "monthly",
    contentAccess: ["music", "creators", "shorts", "movies", "series", "live", "exclusive", "studio"],
    royaltySplit: { creators: 75, platform: 25 },
    features: ["All Platinum features", "Full Studio access", "Priority distribution", "Advanced analytics", "Promotional tools", "Verified badge", "Direct fan messaging", "Revenue optimization AI"], 
    highlight: false,
    cta: "Go Creator Pro"
  },
];

export const mockPlaylists = [
  { id: "p1", title: "Afrobeats Hits 2025", cover: IMG("afrobeathits", 300, 300), curator: "AfriStream", tracks: 50 },
  { id: "p2", title: "Amapiano Essentials", cover: IMG("amaessentials", 300, 300), curator: "AfriStream", tracks: 40 },
  { id: "p3", title: "Lagos to London", cover: IMG("lagoslondon", 300, 300), curator: "AfriStream", tracks: 35 },
  { id: "p4", title: "Chill Africa", cover: IMG("chillafrica", 300, 300), curator: "AfriStream", tracks: 30 },
  { id: "p5", title: "African Gospel", cover: IMG("afrogospel", 300, 300), curator: "AfriStream", tracks: 45 },
  { id: "p6", title: "Throwback Highlife", cover: IMG("throwback", 300, 300), curator: "AfriStream", tracks: 25 },
  { id: "p7", title: "Workout Naija", cover: IMG("workout", 300, 300), curator: "AfriStream", tracks: 30 },
  { id: "p8", title: "Francophone Fire", cover: IMG("francophone", 300, 300), curator: "AfriStream", tracks: 35 },
];

export const cultureTopics = [
  { id: "cu1", title: "Heritage Archives", description: "Traditional music, oral histories, and cultural preservation", icon: "scroll" },
  { id: "cu2", title: "African Languages", description: "Learn and celebrate African languages", icon: "languages" },
  { id: "cu3", title: "Food & Cuisine", description: "Recipes, food culture, and culinary traditions", icon: "utensils" },
  { id: "cu4", title: "Fashion & Style", description: "African fashion, textiles, and design", icon: "shirt" },
  { id: "cu5", title: "Dance & Movement", description: "Traditional and modern African dance forms", icon: "music" },
  { id: "cu6", title: "Festivals & Ceremonies", description: "Cultural celebrations across the continent", icon: "sparkles" },
  { id: "cu7", title: "Elder Stories", description: "Wisdom and stories from African elders", icon: "book-open" },
  { id: "cu8", title: "Traditional Instruments", description: "Kora, djembe, mbira, talking drums, and more", icon: "drum" },
];

export const africanLanguages = [
  "Krio", "Swahili", "Yoruba", "Igbo", "Hausa", "Amharic", "Zulu", "Xhosa",
  "Wolof", "Lingala", "Twi", "Shona", "Kirundi", "Kinyarwanda", "Somali",
  "Tigrinya", "Oromo", "Fula", "Tswana", "Sotho", "Afrikaans", "Arabic",
];

export const adminMetrics = {
  totalUsers: 2450000, activeSubscribers: 890000, totalStreams: 1200000000,
  totalViews: 450000000, monthlyRevenue: 4200000, payoutBalance: 1800000,
  pendingItems: 342, supportTickets: 128, fraudFlags: 17,
};

export const studioMetrics = {
  artist: { totalStreams: 45000000, followers: 125000, revenue: 82000, topTrack: "City Boys", monthlyListeners: 2800000 },
  label: { roster: 24, releases: 156, totalStreams: 320000000, revenue: 450000, pendingPayouts: 120000 },
  creator: { totalViews: 8500000, subscribers: 450000, watchTime: 125000, revenue: 35000, videos: 280 },
  film: { totalViews: 12000000, movies: 8, series: 3, revenue: 180000, premieres: 2 },
};

export function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}
