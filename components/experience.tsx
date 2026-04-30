"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

type Glyph = "atom" | "star" | "pyramid" | "octa"

interface Journey {
  id: string
  period: string
  role: string
  company: string
  location: string
  description: string
  highlights: string[]
  tags: string[]
  glyph: Glyph
  pos: { left: string; top: string }
}

const journey: Journey[] = [
  {
    id: "vit",
    period: "Aug 2023 - Present",
    role: "B.Tech, Computer Science",
    company: "Vellore Institute of Technology",
    location: "Chennai, India",
    description:
      "Pursuing a Bachelor of Technology in CSE. Building foundations in software, algorithms, and product thinking alongside hands-on work.",
    highlights: [
      "Android Development — Imarticus Learning",
      "Networking Basics — CISCO",
      "Active in student organizations",
    ],
    tags: ["B.Tech", "CSE", "VIT"],
    glyph: "octa",
    pos: { left: "10%", top: "62%" },
  },
  {
    id: "vedant",
    period: "Jun 2025 - Jul 2025",
    role: "Product Manager",
    company: "Vedant Learning Centre",
    location: "Remote",
    description:
      "Led the end-to-end product lifecycle of a WhatsApp-based chatbot connecting lawyers with clients — translating user pain points into clear product requirements.",
    highlights: [
      "Conceptualized an AI-powered legal briefing flow",
      "Designed admin & user-management interface",
      "Applied Agile sprints with continuous iteration",
    ],
    tags: ["Agile", "Rapid Prototyping", "Discovery"],
    glyph: "pyramid",
    pos: { left: "32%", top: "26%" },
  },
  {
    id: "tedx",
    period: "Sep 2024 - Feb 2026",
    role: "General Secretary",
    company: "TEDxVIT Club",
    location: "VIT Chennai",
    description:
      "Board Member leading recruitment, coordinating departments, and ensuring smooth execution of events with strategic outcomes.",
    highlights: [
      "Led interviews & shortlisted candidates",
      "Coordinated cross-department operations",
      "Student rep & host for workshops and seminars",
    ],
    tags: ["Leadership", "Strategy", "Events"],
    glyph: "star",
    pos: { left: "63%", top: "26%" },
  },
  {
    id: "olcademy",
    period: "Jan 2026 - Present",
    role: "Product Manager Intern",
    company: "Olcademy",
    location: "Remote",
    description:
      "Founding PM team for Project-Z — driving end-to-end product development for an early-stage e-commerce platform from ideation to iteration.",
    highlights: [
      "Identifying friction points to optimize the user journey",
      "Conceptualized the new restaurant menu feature",
      "Working synchronously with design, eng, and QA",
    ],
    tags: ["E-commerce", "0→1", "Founding Team"],
    glyph: "atom",
    pos: { left: "88%", top: "58%" },
  },
]

function GlyphIcon({ kind, className }: { kind: Glyph; className?: string }) {
  switch (kind) {
    case "atom":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor">
          <ellipse cx="32" cy="32" rx="28" ry="10" strokeWidth="1.2" />
          <ellipse cx="32" cy="32" rx="28" ry="10" strokeWidth="1.2" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="28" ry="10" strokeWidth="1.2" transform="rotate(-60 32 32)" />
          <circle cx="32" cy="32" r="3.4" fill="currentColor" stroke="none" />
        </svg>
      )
    case "star":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor">
          <path
            d="M32 4 L40 24 L60 28 L46 42 L50 62 L32 52 L14 62 L18 42 L4 28 L24 24 Z"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="32" r="2" fill="currentColor" stroke="none" />
        </svg>
      )
    case "pyramid":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor">
          <path d="M32 6 L58 54 L6 54 Z" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M32 6 L32 54" strokeWidth="0.8" opacity="0.55" />
          <ellipse cx="32" cy="54" rx="26" ry="2.4" strokeWidth="0.8" opacity="0.55" />
        </svg>
      )
    case "octa":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor">
          <path d="M32 4 L60 32 L32 60 L4 32 Z" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M4 32 L60 32" strokeWidth="0.8" opacity="0.55" />
          <path d="M32 4 L32 60" strokeWidth="0.8" opacity="0.55" />
        </svg>
      )
  }
}

function Stars({ count = 70 }: { count?: number }) {
  const [stars, setStars] = useState<
    { left: string; top: string; size: number; opacity: number; twinkle: number }[]
  >([])
  useEffect(() => {
    setStars(
      Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1.6 + 0.4,
        opacity: Math.random() * 0.55 + 0.15,
        twinkle: Math.random() * 4 + 2.5,
      })),
    )
  }, [count])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          initial={{ opacity: s.opacity }}
          animate={{ opacity: [s.opacity, s.opacity * 0.25, s.opacity] }}
          transition={{ duration: s.twinkle, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

function Node({
  j,
  isActive,
  isDimmed,
  onActivate,
  delay,
}: {
  j: Journey
  isActive: boolean
  isDimmed: boolean
  onActivate: () => void
  delay: number
}) {
  return (
    <motion.button
      type="button"
      onClick={onActivate}
      style={{ left: j.pos.left, top: j.pos.top }}
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={{ opacity: isDimmed ? 0.3 : 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, type: "spring", stiffness: 130, damping: 15 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl flex flex-col items-center"
      aria-label={`${j.role} at ${j.company}`}
    >
      {/* floating shiny object — UNCHANGED */}
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {/* outer glow */}
        <span
          className={`absolute -inset-6 rounded-full bg-primary/20 blur-2xl transition-opacity duration-500 ${
            isActive ? "opacity-100" : "opacity-30 group-hover:opacity-80"
          }`}
        />
        {/* gentle floating + slow rotate */}
        <motion.div
          animate={{ rotate: 360, y: [0, -4, 0] }}
          transition={{
            rotate: { duration: 36, ease: "linear", repeat: Infinity },
            y: { duration: 5, ease: "easeInOut", repeat: Infinity },
          }}
          className="relative w-12 h-12 lg:w-14 lg:h-14 text-primary"
        >
          <GlyphIcon
            kind={j.glyph}
            className="w-full h-full drop-shadow-[0_0_10px_rgba(200,240,90,0.55)]"
          />
        </motion.div>
      </div>

      {/* period chip just under the glyph */}
      <span className="mt-3 font-mono text-[9px] tracking-[0.18em] text-muted-foreground whitespace-nowrap uppercase pointer-events-none">
        {j.period}
      </span>

      {/* info card BELOW the floating object — pops on hover */}
      <div className="relative mt-2 w-[170px] lg:w-[185px] rounded-xl bg-[#0e0e0e]/75 backdrop-blur-xl border border-white/10 group-hover:border-primary/40 px-3 py-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:shadow-[0_14px_36px_-10px_rgba(200,240,90,0.18)] group-hover:-translate-y-[1px]">
        {/* subtle top accent line tying card to the glyph above */}
        <span className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-12 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

        <p className="font-serif text-[12px] lg:text-[13px] text-foreground leading-tight text-center truncate">
          {j.role}
        </p>
        <p className="font-mono text-[9px] tracking-[0.1em] text-muted-foreground/80 uppercase text-center truncate mt-0.5">
          {j.company}
        </p>
      </div>
    </motion.button>
  )
}

function Cloud({ j, onClose }: { j: Journey; onClose: () => void }) {
  return (
    <>
      {/* dim backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px]"
      />
      {/* dialog wrapper — clean rounded card with a soft cloud glow halo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 8 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        role="dialog"
        aria-modal="true"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[min(92vw,540px)]"
      >
        {/* soft cloud-like glow behind */}
        <div
          aria-hidden
          className="absolute -inset-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(200,240,90,0.18), transparent 70%)",
            filter: "blur(24px)",
          }}
        />

        <div className="relative rounded-3xl bg-[#0e0e0e]/85 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_60px_-15px_rgba(200,240,90,0.25)] overflow-hidden">
          {/* faint inner accent */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-70 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(200,240,90,0.10), transparent 55%)",
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative">
            <p className="font-mono text-primary text-[10px] tracking-[0.2em] uppercase mb-3">
              {j.period}
            </p>
            <h3 className="font-serif text-2xl md:text-[28px] text-foreground leading-[1.15] mb-1 pr-8">
              {j.role}
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              {j.company} <span className="opacity-50">·</span> {j.location}
            </p>
            <p className="text-[14px] text-foreground/85 leading-relaxed mb-5">{j.description}</p>

            <div className="space-y-2 mb-5">
              <p className="font-mono text-[10px] tracking-widest text-primary/80 uppercase">
                Highlights
              </p>
              <ul className="space-y-2">
                {j.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-[13px] text-muted-foreground/85 flex gap-2 leading-relaxed"
                  >
                    <span className="text-primary mt-[2px] shrink-0">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {j.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-[10px] glass rounded-full font-mono uppercase tracking-wider text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export function Experience() {
  const [active, setActive] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const activeJourney = journey.find((j) => j.id === active)

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-16 md:py-20 px-6 overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-4 md:mb-6 relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-[1px] w-8 bg-primary" />
          <p className="font-mono text-primary text-[10px] tracking-[0.2em] font-bold uppercase">
            Experience ✦
          </p>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.05]">
          My <em className="italic text-primary">Journey</em>.
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md text-sm md:text-base">
          A timeline of roles, projects, and growth — orbit any node to see what happened there.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
            Tap the boxes to view the details
          </p>
        </div>
      </div>

      {/* Desktop: orbit layout */}
      <div className="hidden md:block relative max-w-7xl mx-auto h-[500px] lg:h-[560px]">
        {/* Soft nebula glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[520px] h-[520px] rounded-full bg-primary/[0.04] blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-[#f0d35a]/[0.03] blur-[120px]" />
        </div>

        {/* Stars */}
        <Stars count={90} />

        {/* Orbit line */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            <linearGradient id="orbitGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#c8f05a" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#c8f05a" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#c8f05a" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 10 62 C 22 12, 78 12, 88 58"
            fill="none"
            stroke="url(#orbitGrad)"
            strokeWidth="0.18"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
          />
        </svg>

        {/* Nodes */}
        {journey.map((j, i) => (
          <Node
            key={j.id}
            j={j}
            isActive={active === j.id}
            isDimmed={active !== null && active !== j.id}
            onActivate={() => setActive(active === j.id ? null : j.id)}
            delay={0.5 + i * 0.18}
          />
        ))}
      </div>

      {/* Mobile: vertical timeline with mini-glyphs */}
      <div className="md:hidden max-w-md mx-auto relative">
        <Stars count={28} />
        <div className="absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
        <ol className="space-y-9 relative">
          {journey.map((j) => (
            <li key={j.id} className="relative pl-16">
              <div className="absolute left-0 top-0 w-12 h-12 rounded-full glass flex items-center justify-center text-primary">
                <GlyphIcon
                  kind={j.glyph}
                  className="w-6 h-6 drop-shadow-[0_0_8px_rgba(200,240,90,0.5)]"
                />
              </div>
              <p className="font-mono text-[10px] text-primary tracking-widest uppercase mb-1">
                {j.period}
              </p>
              <h3 className="font-serif text-lg text-foreground mb-1 leading-snug">{j.role}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {j.company} <span className="opacity-50">·</span> {j.location}
              </p>
              <p className="text-[13px] text-muted-foreground/80 leading-relaxed mb-2">
                {j.description}
              </p>
              <ul className="space-y-1">
                {j.highlights.map((h) => (
                  <li key={h} className="text-[12px] text-muted-foreground/70 flex gap-2">
                    <span className="text-primary mt-[2px] shrink-0">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      {/* Detail Cloud */}
      <AnimatePresence>
        {activeJourney && <Cloud j={activeJourney} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
