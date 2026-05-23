import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-4">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center">
        <div className="flex items-baseline leading-none">
          <span className="font-display text-4xl font-black tracking-tighter text-white">Afri</span>
          <span className="font-display text-4xl font-black tracking-tighter text-primary">Stream</span>
        </div>
      </div>

      {/* Error Message */}
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-red-500/10">
            <AlertCircle className="size-8 text-red-500" />
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-foreground">Authentication Error</h1>
        <p className="mb-8 text-muted-foreground">
          Something went wrong during authentication. This could be due to an expired or invalid link.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/auth/login">Try Again</Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-white/10 hover:bg-white/5">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Need help?{" "}
          <Link href="/support" className="text-primary hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
