"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type AuthFormProps = { mode: "login" | "sign-up" }

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const isSignUp = mode === "sign-up"
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  async function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError("")

    const form = new FormData(event.currentTarget)
    const email = String(form.get("email") ?? "").trim()
    const password = String(form.get("password") ?? "")
    const fullName = String(form.get("fullName") ?? "").trim()

    try {
      const supabase = createClient()
      if (isSignUp) {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback?next=/dashboard`,
            data: { full_name: fullName },
          },
        })
        if (authError) throw authError
        if (data.session) {
          router.push("/dashboard")
          router.refresh()
        } else {
          router.push(`/auth/sign-up-success?email=${encodeURIComponent(email)}`)
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
        if (authError) throw authError
        router.push("/dashboard")
        router.refresh()
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed. Please try again.")
      setPending(false)
    }
  }

  async function handleGoogle() {
    setPending(true)
    setError("")
    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      })
      if (authError) throw authError
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Google sign-in could not start.")
      setPending(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <Link href="/home.html" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        <span aria-hidden="true">←</span> AMDAANA home
      </Link>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-foreground/5 sm:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">Member access</p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-balance">
          {isSignUp ? "Create your alumni account" : "Welcome back"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          {isSignUp ? "Join the AMDAANA member community with your email or Google account." : "Sign in to access your member dashboard and account."}
        </p>

        <button type="button" onClick={handleGoogle} disabled={pending} className="mt-7 flex min-h-11 w-full items-center justify-center gap-3 rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-60">
          <span aria-hidden="true" className="grid size-6 place-items-center rounded-full border border-border font-bold">G</span>
          Continue with Google
        </button>
        <div className="my-6 flex items-center gap-3" aria-hidden="true"><span className="h-px flex-1 bg-border" /><span className="text-xs uppercase tracking-wider text-muted">or email</span><span className="h-px flex-1 bg-border" /></div>

        <form onSubmit={handleEmail} className="flex flex-col gap-5">
          {isSignUp && <label className="flex flex-col gap-2 text-sm font-semibold">Full name<input name="fullName" autoComplete="name" required minLength={2} className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>}
          <label className="flex flex-col gap-2 text-sm font-semibold">Email address<input name="email" type="email" autoComplete="email" required className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="flex flex-col gap-2 text-sm font-semibold">Password<input name="password" type="password" autoComplete={isSignUp ? "new-password" : "current-password"} required minLength={8} aria-describedby={isSignUp ? "password-help" : undefined} className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />{isSignUp && <span id="password-help" className="font-normal text-muted">Use at least 8 characters.</span>}</label>
          {error && <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>}
          <button disabled={pending} className="min-h-11 rounded-lg bg-primary px-4 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{pending ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          {isSignUp ? "Already have an account?" : "New to AMDAANA?"}{" "}
          <Link href={isSignUp ? "/auth/login" : "/auth/sign-up"} className="font-semibold text-primary hover:underline">{isSignUp ? "Sign in" : "Create account"}</Link>
        </p>
      </div>
    </div>
  )
}
