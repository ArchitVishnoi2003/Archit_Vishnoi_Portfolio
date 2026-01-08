"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion"

type Page = {
  label: string
  tint: "cyan" | "teal" | "warm" | "cool" | "silver"
  layer: "foreground" | "midground" | "background"
}

const pagesFull: Page[] = [
  { label: "Excel", tint: "silver", layer: "background" },
  { label: "JavaScript", tint: "warm", layer: "background" },
  { label: "Python", tint: "cyan", layer: "midground" },
  { label: "C++", tint: "cool", layer: "midground" },
  { label: "Data Structures", tint: "teal", layer: "foreground" },
]

const tintMap = {
  cyan: {
    surface: "rgba(94, 234, 212, 0.10)",
    edge: "rgba(94, 234, 212, 0.28)",
    glow: "rgba(94, 234, 212, 0.22)",
    text: "rgba(226, 255, 250, 0.90)",
  },
  teal: {
    surface: "rgba(45, 212, 191, 0.10)",
    edge: "rgba(45, 212, 191, 0.28)",
    glow: "rgba(45, 212, 191, 0.22)",
    text: "rgba(226, 255, 250, 0.90)",
  },
  warm: {
    surface: "rgba(251, 191, 36, 0.07)",
    edge: "rgba(251, 191, 36, 0.20)",
    glow: "rgba(251, 191, 36, 0.14)",
    text: "rgba(255, 248, 233, 0.88)",
  },
  cool: {
    surface: "rgba(59, 130, 246, 0.07)",
    edge: "rgba(59, 130, 246, 0.20)",
    glow: "rgba(59, 130, 246, 0.14)",
    text: "rgba(236, 245, 255, 0.88)",
  },
  silver: {
    surface: "rgba(255, 255, 255, 0.05)",
    edge: "rgba(255, 255, 255, 0.14)",
    glow: "rgba(255, 255, 255, 0.08)",
    text: "rgba(245, 248, 255, 0.86)",
  },
} as const

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

// Tight, early feedback curve (scroll-locked feel)
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return reduced
}

function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop")
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      if (w < 768) return "mobile"
      if (w < 1024) return "tablet"
      return "desktop"
    }
    const update = () => setBp(compute())
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
  return bp
}

export function KnowledgeBook({ isActive = true }: { isActive?: boolean }) {
  const reducedMotion = usePrefersReducedMotion()
  const bp = useBreakpoint()

  // Scroll-distance driven open amount (not autoplay, not springy)
  // Scroll UP   -> open increases
  // Scroll DOWN -> open decreases
  const open = useMotionValue(0) // 0 = closed stack, 1 = fully opened system stack

  // Global scrollY to detect direction + distance
  const { scrollY } = useScroll()
  const prevY = useRef<number | null>(null)

  // Sensitivity: smaller = more responsive
  const pxForFullOpen = bp === "tablet" ? 520 : 420

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!isActive) return
    if (reducedMotion || bp === "mobile") return

    const prev = prevY.current
    prevY.current = y
    if (prev == null) return

    const delta = y - prev // >0 = scrolling down
    if (delta === 0) return

    const next = open.get() + (-delta / pxForFullOpen) // up (negative delta) opens
    open.set(clamp01(next))
  })

  const pages = useMemo(() => {
    if (bp === "tablet") return pagesFull.slice(0, 4) // fewer layers
    return pagesFull
  }, [bp])

  // Mobile / reduced-motion: show a static, partially opened stack
  useEffect(() => {
    if (bp === "mobile") open.set(0.72)
    if (reducedMotion) open.set(0.55)
  }, [bp, reducedMotion, open])

  const perspective = bp === "tablet" ? 900 : 1100

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center">
      {/* book/pages stack */}
      <div
        className="relative h-full w-full max-w-[420px]"
        style={{
          perspective: `${perspective}px`,
        }}
      >
          {/* base shadow */}
          <motion.div
            className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 h-10 w-[84%] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(0,0,0,0.65), rgba(0,0,0,0.0))",
              filter: "blur(6px)",
              opacity: useTransform(open, [0, 1], [0.45, 0.25]),
            }}
          />

          {pages.map((p, idx) => {
            const total = pages.length
            // Each page gets its own segment of the scroll range
            // Pages open from bottom (idx 0) to top (idx 4)
            const seg = 1 / total
            const start = idx * seg
            const end = start + seg

            // Calculate local progress for this specific page
            // When open is in [start, end], this page is opening
            const local = useTransform(open, (t) => {
              if (t < start) return 0 // Not started yet
              if (t > end) return 1 // Fully opened
              return clamp01((t - start) / (end - start)) // In progress
            })
            
            const eased = useTransform(local, (t) => (reducedMotion || bp === "mobile" ? t : easeOutCubic(t)))

            // System-stack separation: bottom -> top opens progressively
            const y = useTransform(eased, (t) => {
              const stacked = -idx * 3
              const opened = -idx * (bp === "tablet" ? 18 : 22) - 6 * t
              return stacked + (opened - stacked) * t
            })

            const x = useTransform(eased, (t) => {
              const base = idx * 2
              const opened = idx * (bp === "tablet" ? 6 : 7)
              return base + (opened - base) * t
            })

            const rz = useTransform(eased, (t) => {
              // subtle perspective suggestion (architectural, not cartoony)
              const stacked = -6 + idx * 0.6
              const opened = -14 + idx * 0.8
              return stacked + (opened - stacked) * t
            })

            const rx = useTransform(eased, (t) => {
              const stacked = 0
              const opened = 10
              return stacked + (opened - stacked) * t
            })

            const glow = useTransform(eased, (t) => {
              // peak glow around reveal midpoint
              const bump = 4 * t * (1 - t) // 0..1..0
              return bump
            })

            // Page visibility: starts visible but very transparent, becomes fully visible as it opens
            const pageOpacity = useTransform(eased, [0, 0.15, 1], [0.3, 0.6, 1])
            // Text fades in when page is being revealed
            const textOpacity = useTransform(eased, [0.1, 0.5], [0, 1])

            const tint = tintMap[p.tint]

            return (
              <motion.div
                key={p.label}
                className="absolute left-1/2 top-10 w-[86%] -translate-x-1/2 rounded-2xl"
                style={{
                  zIndex: 20 + idx,
                  y,
                  x,
                  rotateZ: rz,
                  rotateX: rx,
                  transformStyle: "preserve-3d",
                  transformOrigin: "90% 92%",
                  height: bp === "tablet" ? 126 : 132,
                  opacity: pageOpacity,
                  background: `linear-gradient(135deg, ${tint.surface}, rgba(255,255,255,0.02))`,
                  border: `1px solid ${tint.edge}`,
                  boxShadow: useTransform(glow, (g) => {
                    const k = 0.35 + 0.9 * g
                    return `0 10px 24px rgba(0,0,0,0.35), 0 0 ${28 * k}px ${tint.glow}`
                  }),
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* edge highlight */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02) 32%, rgba(255,255,255,0.00) 70%)",
                    opacity: 0.55,
                    maskImage: "linear-gradient(180deg, black, transparent 78%)",
                  }}
                />

                {/* spine / hinge hint */}
                <div
                  className="pointer-events-none absolute left-4 top-4 bottom-4 w-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
                    opacity: 0.8,
                  }}
                />

                <motion.div
                  className="relative z-10 flex h-full items-center justify-center text-center"
                  style={{
                    opacity: textOpacity,
                    color: tint.text,
                    textShadow: "0 0 18px rgba(255,255,255,0.10)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    fontSize: bp === "tablet" ? 18 : 20,
                  }}
                >
                  {p.label}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
    </div>
  )
}




