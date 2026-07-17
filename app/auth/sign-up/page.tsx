import type { Metadata } from "next"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = { title: "Create account" }

export default function SignUpPage() {
  return <main className="flex min-h-screen items-center justify-center px-4 py-12"><AuthForm mode="sign-up" /></main>
}
