"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/user-context"
import { userTypes, UserType, countryHubs, africanLanguages } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { 
  Headphones, Mic, Disc3, Clapperboard, Video, BookOpen, 
  Laugh, Calendar, Megaphone, ChevronRight, ChevronLeft, Check, Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  headphones: Headphones,
  mic: Mic,
  disc: Disc3,
  clapperboard: Clapperboard,
  video: Video,
  "book-open": BookOpen,
  laugh: Laugh,
  calendar: Calendar,
  megaphone: Megaphone,
}

const interests = [
  { id: "afrobeats", label: "Afrobeats", category: "music" },
  { id: "amapiano", label: "Amapiano", category: "music" },
  { id: "highlife", label: "Highlife", category: "music" },
  { id: "bongo_flava", label: "Bongo Flava", category: "music" },
  { id: "afropop", label: "Afro-Pop", category: "music" },
  { id: "gospel", label: "Gospel", category: "music" },
  { id: "hiplife", label: "Hiplife", category: "music" },
  { id: "kwaito", label: "Kwaito", category: "music" },
  { id: "nollywood", label: "Nollywood", category: "movies" },
  { id: "south_african_film", label: "South African Film", category: "movies" },
  { id: "east_african_film", label: "East African Film", category: "movies" },
  { id: "francophone_cinema", label: "Francophone Cinema", category: "movies" },
  { id: "documentaries", label: "Documentaries", category: "movies" },
  { id: "comedy", label: "Comedy & Skits", category: "creators" },
  { id: "podcasts", label: "Podcasts", category: "creators" },
  { id: "reactions", label: "Reactions", category: "creators" },
  { id: "fashion", label: "Fashion & Style", category: "culture" },
  { id: "food", label: "Food & Cuisine", category: "culture" },
  { id: "heritage", label: "Heritage & History", category: "culture" },
  { id: "language", label: "Language Learning", category: "culture" },
  { id: "live_concerts", label: "Live Concerts", category: "events" },
  { id: "festivals", label: "Festivals", category: "events" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { updateProfile, completeOnboarding } = useUser()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<UserType | null>(null)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [name, setName] = useState("")

  const totalSteps = 5

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Complete onboarding
      updateProfile({
        name: name || "AfriStream User",
        userType: selectedType || "listener",
        connectedCountries: selectedCountries,
        languages: selectedLanguages,
        interests: selectedInterests,
      })
      completeOnboarding()
      
      // Route based on user type
      const userType = userTypes.find(t => t.id === selectedType)
      if (userType?.studioAccess && userType.studioPath) {
        router.push(userType.studioPath)
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
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="font-display text-xl font-bold">
          Afri<span className="text-primary">Stream</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Step {step} of {totalSteps}
        </div>
      </header>

      {/* Progress bar */}
      <div className="mx-6 h-1 rounded-full bg-muted">
        <div 
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl">
          
          {/* Step 1: User Type Selection */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="font-display text-3xl font-bold text-foreground">Welcome to AfriStream</h1>
                <p className="mt-2 text-muted-foreground">How will you use the platform?</p>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {userTypes.map((type) => {
                  const Icon = iconMap[type.icon] || Headphones
                  const isSelected = selectedType === type.id
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "group relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all",
                        isSelected 
                          ? "border-primary bg-primary/10 ring-2 ring-primary" 
                          : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "flex size-10 items-center justify-center rounded-lg",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{type.name}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{type.description}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute right-3 top-3">
                          <Check className="size-5 text-primary" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Name */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="font-display text-3xl font-bold text-foreground">What should we call you?</h1>
                <p className="mt-2 text-muted-foreground">This will be your display name on AfriStream</p>
              </div>
              
              <div className="mx-auto max-w-md">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name or stage name"
                  className="w-full rounded-xl border border-border bg-card px-4 py-4 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          )}

          {/* Step 3: Connected Countries */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="font-display text-3xl font-bold text-foreground">Where are you connected to?</h1>
                <p className="mt-2 text-muted-foreground">Select countries you want content from (home, heritage, or interests)</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                {countryHubs.map((hub) => {
                  const isSelected = selectedCountries.includes(hub.name)
                  return (
                    <button
                      key={hub.id}
                      onClick={() => toggleCountry(hub.name)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all",
                        isSelected 
                          ? "border-primary bg-primary/10" 
                          : "border-border bg-card hover:border-primary/50"
                      )}
                    >
                      <span className="text-2xl">{hub.flag}</span>
                      <span className="text-xs font-medium text-foreground">{hub.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 4: Languages */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="font-display text-3xl font-bold text-foreground">What languages do you speak?</h1>
                <p className="mt-2 text-muted-foreground">We&apos;ll show you content in these languages</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {["English", "French", "Portuguese", "Arabic", ...africanLanguages.slice(0, 15)].map((lang) => {
                  const isSelected = selectedLanguages.includes(lang)
                  return (
                    <button
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                        isSelected 
                          ? "border-primary bg-primary text-primary-foreground" 
                          : "border-border bg-card text-foreground hover:border-primary/50"
                      )}
                    >
                      {lang}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 5: Interests */}
          {step === 5 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="font-display text-3xl font-bold text-foreground">What are you into?</h1>
                <p className="mt-2 text-muted-foreground">Pick at least 3 interests to personalize your experience</p>
              </div>
              
              <div className="space-y-6">
                {["music", "movies", "creators", "culture", "events"].map((category) => (
                  <div key={category}>
                    <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {interests.filter(i => i.category === category).map((interest) => {
                        const isSelected = selectedInterests.includes(interest.id)
                        return (
                          <button
                            key={interest.id}
                            onClick={() => toggleInterest(interest.id)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                              isSelected 
                                ? "border-primary bg-primary text-primary-foreground" 
                                : "border-border bg-card text-foreground hover:border-primary/50"
                            )}
                          >
                            {interest.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="flex items-center justify-between border-t border-border px-6 py-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1}
          className="gap-2"
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={step === 1 && !selectedType}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {step === totalSteps ? (
            <>
              <Sparkles className="size-4" />
              Start Streaming
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="size-4" />
            </>
          )}
        </Button>
      </footer>
    </div>
  )
}
