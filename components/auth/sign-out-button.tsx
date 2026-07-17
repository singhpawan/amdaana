"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function SignOutButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function signOut() {
    setPending(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return <button type="button" onClick={signOut} disabled={pending} className="min-h-10 rounded-lg border border-border px-4 text-sm font-semibold hover:border-primary disabled:opacity-60">{pending ? "Signing out…" : "Sign out"}</button>
}
