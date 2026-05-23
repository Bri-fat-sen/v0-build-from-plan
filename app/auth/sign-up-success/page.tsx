import Link from "next/link"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-4">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center">
        <div className="flex items-baseline leading-none">
          <span className="font-display text-4xl font-black tracking-tighter text-white">Afri</span>
          <span className="font-display text-4xl font-black tracking-tighter text-primary">Stream</span>
        </div>
      </div>

      {/* Success Message */}
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="size-8 text-primary" />
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-foreground">Check your email</h1>
        <p className="mb-8 text-muted-foreground">
          We&apos;ve sent you a confirmation link. Please check your email and click the link to activate your account.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/auth/login">Back to Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-white/10 hover:bg-white/5">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <Link href="/auth/sign-up" className="text-primary hover:underline">
            try again
          </Link>
        </p>
      </div>
    </div>
  )
}
