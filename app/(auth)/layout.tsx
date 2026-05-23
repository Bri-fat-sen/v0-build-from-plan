export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-2xl font-black tracking-tighter text-foreground">
              Afri<span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">Stream</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Music. Movies. Creators. Culture. One Stream.</p>
        </div>
        {children}
      </div>
    </div>
  )
}
