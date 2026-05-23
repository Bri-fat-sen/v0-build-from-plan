"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser, modeInfo, tierInfo, ActiveMode } from "@/lib/user-context"
import { formatNumber } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { 
  Headphones, Mic, Clapperboard, Video, BookOpen, 
  Calendar, ChevronRight, ChevronLeft, Check, Sparkles, Crown, Music
} from "lucide-react"
import { cn } from "@/lib/utils"

const modeIcons: Record<ActiveMode, React.ElementType> = {
  listener: Headphones,
  artist: Mic,
  creator: Video,
  filmmaker: Clapperboard,
  educator: BookOpen,
  organizer: Calendar,
  admin: Headphones,
}

// Consumer and Creator paths - simplified onboarding choices
const onboardingPaths = [
  { 
    id: "listener" as const, 
    name: "I want to enjoy content", 
    description: "Discover African music, movies, and creators",
    icon: Music,
    modes: ["listener"] as ActiveMode[],
    tier: "free" as const,
  },
  { 
    id: "creator" as const, 
    name: "I want to create & earn", 
    description: "Upload music, videos, or films and build your audience",
    icon: Sparkles,
    modes: ["listener", "artist", "creator", "filmmaker", "educator"] as ActiveMode[],
    tier: "creator_pro" as const,
  },
]

const interests = [
  { id: "afrobeats", label: "Afrobeats", category: "music" },
  { id: "amapiano", label: "Amapiano", category: "music" },
  { id: "highlife", label: "Highlife", category: "music" },
  { id: "bongo_flava", label: "Bongo Flava", category: "music" },
  { id: "afropop", label: "Afro-Pop", category: "music" },
  { id: "gospel", label: "Gospel", category: "music" },
  { id: "nollywood", label: "Nollywood", category: "movies" },
  { id: "south_african_film", label: "South African Film", category: "movies" },
  { id: "east_african_film", label: "East African Film", category: "movies" },
  { id: "documentaries", label: "Documentaries", category: "movies" },
  { id: "comedy", label: "Comedy & Skits", category: "creators" },
  { id: "podcasts", label: "Podcasts", category: "creators" },
  { id: "fashion", label: "Fashion & Style", category: "culture" },
  { id: "food", label: "Food & Cuisine", category: "culture" },
  { id: "heritage", label: "Heritage & History", category: "culture" },
  { id: "live_concerts", label: "Live Concerts", category: "events" },
  { id: "festivals", label: "Festivals", category: "events" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { updateProfile, completeOnboarding, upgradeTier, setActiveMode } = useUser()
  const [step, setStep] = useState(1)
  const [selectedPath, setSelectedPath] = useState<"listener" | "creator" | null>(null)
  const [selectedPrimaryMode, setSelectedPrimaryMode] = useState<ActiveMode>("listener")
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [name, setName] = useState("")

  const totalSteps = selectedPath === "creator" ? 6 : 5

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Complete onboarding
      updateProfile({
        name: name || "AfriStream User",
        connectedCountries: selectedCountries,
        languages: selectedLanguages,
        interests: selectedInterests,
        activeMode: selectedPrimaryMode,
      })
      
      // Set tier based on path
      if (selectedPath === "creator") {
        upgradeTier("creator_pro")
      }
      
      setActiveMode(selectedPrimaryMode)
      completeOnboarding()
      
      // Route based on mode
      if (selectedPath === "creator" && selectedPrimaryMode !== "listener") {
        const modeRoutes: Record<ActiveMode, string> = {
          listener: "/",
          artist: "/artist",
          creator: "/creator",
          filmmaker: "/film",
          educator: "/culture-studio",
          organizer: "/events",
          admin: "/admin",
        }
        router.push(modeRoutes[selectedPrimaryMode])
      } else {
        router.push("/")
      }
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    )
  }

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    )
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 w-12 rounded-full transition-colors",
                i + 1 <= step ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="glass-card rounded-2xl p-8">
          {/* Step 1: Choose Path */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="font-display text-2xl font-bold">Welcome to AfriStream</h1>
                <p className="mt-2 text-muted-foreground">How would you like to use AfriStream?</p>
              </div>

              <div className="grid gap-4">
                {onboardingPaths.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPath(path.id)}
                    className={cn(
                      "flex items-center gap-4 rounded-xl border p-6 text-left transition-all hover:border-primary/50",
                      selectedPath === path.id
                        ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                        : "border-border bg-card"
                    )}
                  >
                    <div className={cn(
                      "flex size-14 items-center justify-center rounded-xl",
                      selectedPath === path.id ? "bg-primary/20" : "bg-muted"
                    )}>
                      <path.icon className={cn(
                        "size-7",
                        selectedPath === path.id ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{path.name}</p>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    {path.id === "creator" && (
                      <span className="rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-3 py-1 text-xs font-medium text-amber-400">
                        <Crown className="mr-1 inline size-3" />
                        Creator Pro
                      </span>
                    )}
                    {selectedPath === path.id && (
                      <Check className="size-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Primary Mode (Only for Creators) */}
          {step === 2 && selectedPath === "creator" && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="font-display text-2xl font-bold">What will you create?</h1>
                <p className="mt-2 text-muted-foreground">Choose your primary mode (you can switch anytime)</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {(["artist", "creator", "filmmaker", "educator"] as ActiveMode[]).map((mode) => {
                  const Icon = modeIcons[mode]
                  const info = modeInfo[mode]
                  return (
                    <button
                      key={mode}
                      onClick={() => setSelectedPrimaryMode(mode)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-4 text-left transition-all hover:border-primary/50",
                        selectedPrimaryMode === mode
                          ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                          : "border-border bg-card"
                      )}
                    >
                      <div className={cn(
                        "flex size-10 items-center justify-center rounded-lg",
                        selectedPrimaryMode === mode ? "bg-primary/20" : "bg-muted"
                      )}>
                        <Icon className={cn(
                          "size-5",
                          selectedPrimaryMode === mode ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{info.name}</p>
                        <p className="text-xs text-muted-foreground">{info.description}</p>
                      </div>
                      {selectedPrimaryMode === mode && <Check className="size-4 text-primary" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2/3: Name */}
          {((step === 2 && selectedPath === "listener") || (step === 3 && selectedPath === "creator")) && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="font-display text-2xl font-bold">What should we call you?</h1>
                <p className="mt-2 text-muted-foreground">This is how you will appear on AfriStream</p>
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-center text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          )}

          {/* Step 3/4: Countries */}
          {((step === 3 && selectedPath === "listener") || (step === 4 && selectedPath === "creator")) && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="font-display text-2xl font-bold">Connect to your roots</h1>
                <p className="mt-2 text-muted-foreground">Select countries you want content from</p>
              </div>

              <div className="grid max-h-[40vh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                {countryHubs.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => toggleCountry(country.name)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm transition-colors",
                      selectedCountries.includes(country.name)
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border hover:bg-muted"
                    )}
                  >
                    <span className="mr-2">{country.flag}</span>
                    {country.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4/5: Languages */}
          {((step === 4 && selectedPath === "listener") || (step === 5 && selectedPath === "creator")) && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="font-display text-2xl font-bold">Your languages</h1>
                <p className="mt-2 text-muted-foreground">Select languages you speak or understand</p>
              </div>

              <div className="grid max-h-[40vh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                {africanLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-sm transition-colors",
                      selectedLanguages.includes(lang)
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border hover:bg-muted"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5/6: Interests */}
          {((step === 5 && selectedPath === "listener") || (step === 6 && selectedPath === "creator")) && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="font-display text-2xl font-bold">What are you into?</h1>
                <p className="mt-2 text-muted-foreground">Select your interests for personalized content</p>
              </div>

              <div className="flex max-h-[40vh] flex-wrap gap-2 overflow-y-auto">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors",
                      selectedInterests.includes(interest.id)
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border hover:bg-muted"
                    )}
                  >
                    {interest.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className={cn(step === 1 && "invisible")}
            >
              <ChevronLeft className="mr-1 size-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={step === 1 && !selectedPath}
            >
              {step === totalSteps ? (
                <>
                  <Sparkles className="mr-1 size-4" />
                  Start Streaming
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="ml-1 size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
