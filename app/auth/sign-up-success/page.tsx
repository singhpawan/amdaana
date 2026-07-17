import Link from "next/link"

type Props = { searchParams: Promise<{ email?: string }> }

export default async function SignUpSuccessPage({ searchParams }: Props) {
  const { email } = await searchParams
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-xl shadow-foreground/5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">One more step</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold text-balance">Check your email</h1>
        <p className="mt-4 text-sm leading-6 text-muted">We sent a confirmation link{email ? <> to <strong className="text-foreground">{email}</strong></> : null}. Open it to activate your AMDAANA account.</p>
        <Link href="/auth/login" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground">Return to sign in</Link>
      </section>
    </main>
  )
}
