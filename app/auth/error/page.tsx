import Link from "next/link"

type Props = { searchParams: Promise<{ message?: string }> }

export default async function AuthErrorPage({ searchParams }: Props) {
  const { message } = await searchParams
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-danger">Authentication error</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold">We could not sign you in</h1>
        <p className="mt-4 text-sm leading-6 text-muted">{message ?? "The link may have expired or the provider could not complete authentication."}</p>
        <Link href="/auth/login" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground">Try again</Link>
      </section>
    </main>
  )
}
