"use client"

import { Suspense } from "react"
import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#080808]"><div className="animate-pulse">Loading...</div></div>}>
      <LoginForm />
    </Suspense>
  )
}
