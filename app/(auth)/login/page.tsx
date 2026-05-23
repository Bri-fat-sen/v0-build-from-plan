'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 size-5 text-muted-foreground" />
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 size-5 text-muted-foreground" />
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-lg border border-border bg-card px-4 py-2.5 font-medium text-foreground transition-colors hover:bg-muted"
        >
          Google
        </button>
        <button
          type="button"
          className="rounded-lg border border-border bg-card px-4 py-2.5 font-medium text-foreground transition-colors hover:bg-muted"
        >
          Apple
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>

      <p className="text-center text-xs text-muted-foreground">
        By signing in, you agree to our{' '}
        <Link href="#" className="text-primary hover:underline">
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link href="#" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
    </form>
  )
}
