import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = { title: "Member dashboard" }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const name = user.user_metadata.full_name ?? user.user_metadata.name ?? "AMDAANA member"

  return (
    <main className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/home.html" className="font-serif text-xl font-bold text-primary">AMDAANA</Link>
          <SignOutButton />
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Member dashboard</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-balance">Welcome, {name}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">Your account is active and securely connected to AMDAANA member services.</p>
        </section>
        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-semibold text-muted">Signed-in email</p>
            <p className="mt-2 break-all text-lg font-semibold">{user.email}</p>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-semibold text-muted">Membership</p>
            <p className="mt-2 text-lg font-semibold">Account created</p>
            <p className="mt-2 text-sm leading-6 text-muted">Membership status and annual renewal details will appear here when the membership system is connected.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
