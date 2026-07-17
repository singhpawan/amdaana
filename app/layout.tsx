import type { Metadata, Viewport } from "next"
import { Geist, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" })

export const metadata: Metadata = {
  title: { default: "AMDAANA", template: "%s | AMDAANA" },
  description: "Member access for the Amritsar Medical and Dental Alumni Association of North America.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#101815" },
  ],
  colorScheme: "light dark",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-background ${geist.variable} ${lora.variable}`}>
      <body>{children}<Analytics /></body>
    </html>
  )
}
