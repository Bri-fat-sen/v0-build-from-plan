'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, MapPin, Loader2, ChevronRight } from 'lucide-react'

const COUNTRIES = [
  'Nigeria', 'Kenya', 'South Africa', 'Ghana', 'Tanzania', 'Ethiopia', 'Cameroon', 'Uganda',
  'Senegal', 'Côte d\'Ivoire', 'Morocco', 'Egypt', 'Angola', 'DRC', 'Zambia', 'Rwanda'
]

const LANGUAGES = ['Swahili', 'Yoruba', 'Igbo', 'Hausa', 'Zulu', 'Xhosa', 'Amharic', 'Krio', 'Wolof', 'Lingala']

const INTERESTS = ['Music', 'Movies', 'Culture', 'Creators', 'Comedy', 'Podcasts', 'Events']

export default function SignupPage() {
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    location: '',
    countries: [] as string[],
    languages: [] as string[],
    interests: [] as string[],
  })

  const handleNext = async () => {
    if (step === 5) {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 1000)
    } else {
      setStep(step + 1)
    }
  }

  const toggleSelect = (key: 'countries' | 'languages' | 'interests', value: string) => {
    const current = formData[key]
    setFormData({
      ...formData,
      [key]: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    })
  }

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full transition-colors ${
              i <= step ? 'bg-primary' : 'bg-muted'
            }`}
          ></div>
        ))}
      </div>

      {/* Step 0: Email */}
      {step === 0 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground">Create your account</h2>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Password */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground">Create password</h2>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 size-5 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Location */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground">Where do you live now?</h2>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Current location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 size-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="City, Country"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Countries */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground">Which African countries are you connected to?</h2>
          <div className="grid grid-cols-2 gap-2">
            {COUNTRIES.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => toggleSelect('countries', country)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  formData.countries.includes(country)
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Languages */}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground">Which African languages do you speak?</h2>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => toggleSelect('languages', lang)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  formData.languages.includes(lang)
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Interests */}
      {step === 5 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-foreground">What interests you most?</h2>
          <div className="grid grid-cols-2 gap-2">
            {INTERESTS.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleSelect('interests', interest)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  formData.interests.includes(interest)
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="flex-1 rounded-lg border border-border px-4 py-2.5 font-medium text-foreground transition-colors hover:bg-muted"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          disabled={isLoading}
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              {step === 5 ? 'Sign Up' : 'Next'}
              <ChevronRight className="size-4" />
            </>
          )}
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
