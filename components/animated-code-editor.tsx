"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useTransform, useMotionValue, MotionValue } from "framer-motion"

interface CodeLine {
  minWidth: number // 20-30% base (incomplete state)
  maxWidth: number // 60-75% max (never full-width)
  color: "cyan" | "teal" | "blue" | "purple" | "green"
  fillSpeed: number // 1.0x (foreground), 0.75x (mid), 0.5x (background)
  moveSpeed: number // Movement speed multiplier
  indent: number
  opacity: number
  layer: "foreground" | "midground" | "background"
}

// Well-designed lines with proper rhythm and hierarchy
// Foreground lines fill faster, background lines slower (depth illusion)
const codeLines: CodeLine[] = [
  // Foreground layer (fastest, most prominent)
  { minWidth: 28, maxWidth: 68, color: "cyan", fillSpeed: 1.0, moveSpeed: 1.0, indent: 0, opacity: 0.95, layer: "foreground" },
  { minWidth: 25, maxWidth: 65, color: "teal", fillSpeed: 1.0, moveSpeed: 1.0, indent: 0, opacity: 0.95, layer: "foreground" },
  { minWidth: 30, maxWidth: 70, color: "cyan", fillSpeed: 1.0, moveSpeed: 1.0, indent: 0, opacity: 0.95, layer: "foreground" },

  // Midground layer (medium speed)
  { minWidth: 22, maxWidth: 58, color: "purple", fillSpeed: 0.75, moveSpeed: 0.8, indent: 1, opacity: 0.85, layer: "midground" },
  { minWidth: 24, maxWidth: 62, color: "blue", fillSpeed: 0.75, moveSpeed: 0.8, indent: 1, opacity: 0.85, layer: "midground" },
  { minWidth: 26, maxWidth: 64, color: "teal", fillSpeed: 0.75, moveSpeed: 0.8, indent: 1, opacity: 0.85, layer: "midground" },
  { minWidth: 23, maxWidth: 60, color: "purple", fillSpeed: 0.75, moveSpeed: 0.8, indent: 1, opacity: 0.85, layer: "midground" },

  // Background layer (slowest, subtle)
  { minWidth: 20, maxWidth: 55, color: "blue", fillSpeed: 0.5, moveSpeed: 0.6, indent: 2, opacity: 0.75, layer: "background" },
  { minWidth: 21, maxWidth: 52, color: "green", fillSpeed: 0.5, moveSpeed: 0.6, indent: 2, opacity: 0.75, layer: "background" },
  { minWidth: 22, maxWidth: 56, color: "blue", fillSpeed: 0.5, moveSpeed: 0.6, indent: 2, opacity: 0.75, layer: "background" },
  { minWidth: 20, maxWidth: 54, color: "green", fillSpeed: 0.5, moveSpeed: 0.6, indent: 3, opacity: 0.7, layer: "background" },
]

// Consistent spacing rhythm
const lineSpacing = [0, 0.9, 1.0, 0.95, 1.05, 0.88, 1.02, 0.92, 1.08, 0.85, 0.98, 0.94]

const colorMap = {
  cyan: {
    base: "rgb(94, 234, 212)",
    glow: "rgba(94, 234, 212, 0.6)",
    shadow: "rgba(94, 234, 212, 0.4)",
  },
  teal: {
    base: "rgb(45, 212, 191)",
    glow: "rgba(45, 212, 191, 0.6)",
    shadow: "rgba(45, 212, 191, 0.4)",
  },
  blue: {
    base: "rgb(59, 130, 246)",
    glow: "rgba(59, 130, 246, 0.6)",
    shadow: "rgba(59, 130, 246, 0.4)",
  },
  purple: {
    base: "rgb(168, 85, 247)",
    glow: "rgba(168, 85, 247, 0.6)",
    shadow: "rgba(168, 85, 247, 0.4)",
  },
  green: {
    base: "rgb(34, 197, 94)",
    glow: "rgba(34, 197, 94, 0.6)",
    shadow: "rgba(34, 197, 94, 0.4)",
  },
}

// Easing function for front-loaded, early response curve
// This creates the "tight, scroll-locked" feel
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

interface AnimatedCodeLineProps {
  line: CodeLine
  index: number
  scrollProgress: MotionValue<number>
  prefersReducedMotion: boolean
  mousePosition?: { x: number; y: number } | null
  isHovered?: boolean
}

function AnimatedCodeLine({
  line,
  index,
  scrollProgress,
  prefersReducedMotion,
  mousePosition,
  isHovered,
}: AnimatedCodeLineProps) {
  const colors = colorMap[line.color]
  const lineRef = useRef<HTMLDivElement>(null)
  const [lineY, setLineY] = useState(0)

  // Get line position for hover detection
  useEffect(() => {
    if (lineRef.current) {
      const rect = lineRef.current.getBoundingClientRect()
      const container = lineRef.current.offsetParent as HTMLElement
      if (container) {
        const containerRect = container.getBoundingClientRect()
        setLineY(rect.top - containerRect.top + rect.height / 2)
      }
    }
  }, [])

  // Calculate distance from mouse to line for hover effect
  const hoverIntensity = useMotionValue(0)

  useEffect(() => {
    if (mousePosition && isHovered && lineY > 0) {
      const distance = Math.abs(mousePosition.y - lineY)
      const maxDistance = 60
      const intensity = Math.max(0, 1 - distance / maxDistance)
      hoverIntensity.set(intensity * 0.4)
    } else {
      hoverIntensity.set(0)
    }
  }, [mousePosition, isHovered, lineY, hoverIntensity])

  // Apply fill speed multiplier for depth effect
  const adjustedProgress = useTransform(scrollProgress, (progress) => {
    const adjusted = progress * line.fillSpeed
    return Math.max(0, Math.min(1, adjusted))
  })

  // Apply easing curve for front-loaded, early response
  const easedProgress = useTransform(adjustedProgress, (p) => {
    if (prefersReducedMotion) return 0
    return easeOutCubic(p)
  })

  // FILL/UNFILL BEHAVIOR:
  // Scroll UP (progress increases) → Fill (width increases, move forward)
  // Scroll DOWN (progress decreases) → Unfill (width decreases, move backward)

  // Width: interpolate from minWidth to maxWidth with eased curve
  const lineWidth = useTransform(easedProgress, (p) => {
    if (prefersReducedMotion) return line.minWidth
    return line.minWidth + (line.maxWidth - line.minWidth) * p
  })

  // Horizontal position: forward (right) as filling, backward (left) as unfilling
  // Asymmetric: forward stronger (24px) than backward (18px) for execution vs rollback feel
  const xPosition = useTransform(easedProgress, (p) => {
    if (prefersReducedMotion) return 0
    // Forward movement (scroll up = fill = execute)
    // Apply moveSpeed for depth differentiation
    return p * 24 * line.moveSpeed
  })

  // Glow intensity: increases with fill progress (0.4 → 0.85)
  const baseGlowIntensity = useTransform(easedProgress, (p) => {
    if (prefersReducedMotion) return 0.4
    return 0.4 + p * 0.45 // From 0.4 to 0.85
  })

  const glowIntensity = useTransform(
    [baseGlowIntensity, hoverIntensity],
    ([base, hover]: number[]) => Math.min(1, base + hover)
  )

  return (
    <motion.div
      ref={lineRef}
      className="relative h-0.5 rounded-full"
      style={{
        x: xPosition,
        width: useTransform(lineWidth, (w) => `${w}%`),
        marginLeft: `${line.indent * 1.5}rem`,
        marginTop: index === 0 ? "0" : `${lineSpacing[index] || 0.95}rem`,
        opacity: useTransform(hoverIntensity, (h) => Math.min(1, line.opacity + h)),
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: colors.base,
          boxShadow: useTransform(
            glowIntensity,
            (intensity) => `0 0 ${8 * intensity}px ${colors.glow}, 0 0 ${16 * intensity}px ${colors.shadow}`
          ),
          filter: useTransform(glowIntensity, (intensity) => `blur(${0.5 * intensity}px)`),
        }}
      />
    </motion.div>
  )
}

interface AnimatedCodeEditorProps {
  scrollProgress: number
}

export function AnimatedCodeEditor({ scrollProgress: externalScrollProgress }: AnimatedCodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Convert external scroll progress number to MotionValue
  // NO SPRING - direct updates for immediate response
  const scrollProgressMotion = useMotionValue(externalScrollProgress)

  // Update scroll progress directly when it changes
  useEffect(() => {
    scrollProgressMotion.set(externalScrollProgress)
  }, [externalScrollProgress, scrollProgressMotion])

  // Handle mouse movement for hover effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseLeave = () => {
    setMousePosition(null)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)

    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Container glow intensity - direct transform, no spring
  const containerGlow = useTransform(
    scrollProgressMotion,
    [0, 0.5, 1],
    prefersReducedMotion ? [0.2, 0.2, 0.2] : [0.2, 0.4, 0.6]
  )

  const dynamicBoxShadow = useTransform(
    containerGlow,
    (intensity) =>
      `0 0 ${20 * intensity}px rgba(94, 234, 212, 0.3), 0 0 ${40 * intensity}px rgba(94, 234, 212, 0.1), inset 0 0 ${60 * intensity}px rgba(94, 234, 212, 0.05)`
  )

  // Instead of an early return, we will conditionalize the content in the main return block
  // This ensures that all hooks in AnimatedCodeLine and the parent are called consistently

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full h-[300px] rounded-2xl overflow-hidden ${isMobile ? "mobile-static-view" : ""}`}
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isMobile ? "none" : dynamicBoxShadow,
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-10 bg-black/20 backdrop-blur-sm border-b border-white/10 flex items-center gap-2 px-4 z-10">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
      </div>

      <div
        className={`absolute inset-0 pt-14 px-6 pb-6 overflow-hidden ${isMobile ? "hidden" : "block"}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {codeLines.map((line, index) => (
          <AnimatedCodeLine
            key={index}
            line={line}
            index={index}
            scrollProgress={scrollProgressMotion}
            prefersReducedMotion={prefersReducedMotion}
            mousePosition={mousePosition}
            isHovered={isHovered}
          />
        ))}
      </div>

      {isMobile && (
        <div className="absolute inset-0 pt-14 px-6 pb-6">
          {codeLines.slice(0, 8).map((line, index) => {
            const colors = colorMap[line.color]
            const staticWidth = (line.minWidth + line.maxWidth) / 2
            return (
              <div
                key={index}
                className="h-0.5 rounded-full mb-4"
                style={{
                  width: `${staticWidth}%`,
                  marginLeft: `${line.indent * 1.5}rem`,
                  backgroundColor: colors.base,
                  opacity: line.opacity * 0.6,
                  boxShadow: `0 0 4px ${colors.glow}`,
                }}
              />
            )
          })}
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/10" />
    </motion.div>
  )
}
