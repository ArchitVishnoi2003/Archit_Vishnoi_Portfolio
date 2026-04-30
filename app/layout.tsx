import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Serif_Display, Instrument_Sans, Space_Mono } from "next/font/google"
import "./globals.css"
import { Particles } from "@/components/particles"

const serif = DM_Serif_Display({ weight: ["400", "400"], style: ["normal", "italic"], subsets: ["latin"], variable: "--serif" })
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--sans" })
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--mono" })

// <CHANGE> Updated metadata for portfolio
export const metadata: Metadata = {
  title: "Archit Vishnoi | Product Manager & Developer",
  description:
    "CSE undergrad at VIT Chennai. Product manager and developer building products at the intersection of human insight and engineering.",
  generator: "v0.app",
  keywords: ["Product Manager", "Developer", "Full Stack", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Archit Vishnoi" }],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0F1116",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased text-[#e8e4dc] bg-[#080808]">
        <Particles />
        {children}
      </body>
    </html>
  )
}
