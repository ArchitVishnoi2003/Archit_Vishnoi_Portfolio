import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Serif_Display, Instrument_Sans, Space_Mono } from "next/font/google"
import "./globals.css"
import { Particles } from "@/components/particles"

const serif = DM_Serif_Display({ weight: ["400", "400"], style: ["normal", "italic"], subsets: ["latin"], variable: "--serif" })
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--sans" })
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--mono" })

const SITE_URL = "https://architvishnoi.in"
const TITLE = "Archit Vishnoi — Product Manager & Developer"
const DESCRIPTION =
  "Archit Vishnoi — Product Manager and Developer at VIT Chennai. Founding-team PM at Olcademy, ex-PM Vedant Learning Centre, General Secretary at TEDxVIT, patent published. Building products at the intersection of human insight and engineering."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Archit Vishnoi",
  },
  description: DESCRIPTION,
  applicationName: "Archit Vishnoi — Portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Archit Vishnoi",
    "Archit Vishnoi portfolio",
    "Archit Vishnoi product manager",
    "Archit Vishnoi VIT",
    "Archit Vishnoi VIT Chennai",
    "Archit Vishnoi Olcademy",
    "Archit Vishnoi TEDxVIT",
    "Archit Vishnoi developer",
    "Archit Vishnoi resume",
    "Archit Vishnoi CV",
    "ArchitVishnoi2003",
    "Product Manager India",
    "Product Manager Chennai",
    "Product Manager VIT",
    "Product Manager Intern",
    "VIT Chennai Computer Science",
    "VIT CSE student",
    "Olcademy Project-Z",
    "TEDxVIT General Secretary",
    "Vedant Learning Centre Product Manager",
    "Haptic Feedback Footwear patent",
    "React.js developer India",
    "Firebase developer",
    "Full stack developer portfolio",
    "Next.js portfolio",
    "Agile product management",
    "Rapid prototyping AI tools",
  ],
  authors: [{ name: "Archit Vishnoi", url: SITE_URL }],
  creator: "Archit Vishnoi",
  publisher: "Archit Vishnoi",
  category: "Portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Archit Vishnoi — Portfolio",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Archit Vishnoi — Product Manager & Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
    creator: "@architvishnoi",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these once you've claimed the site:
    //   google: "<google-site-verification-token>",
    //   yandex: "<yandex-token>",
    //   other: { "msvalidate.01": "<bing-token>" },
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
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
