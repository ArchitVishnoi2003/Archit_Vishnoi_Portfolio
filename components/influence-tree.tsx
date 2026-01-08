"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion"

type Breakpoint = "mobile" | "tablet" | "desktop"

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

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

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop")
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

type Node = {
  id: string
  x: number
  y: number
  depth: 0 | 1 | 2 | 3
}

type Edge = {
  id: string
  from: string
  to: string
  color: "gold" | "teal" | "cyan"
  depth: 1 | 2 | 3
}

const COLORS = {
  teal: { stroke: "rgba(94, 234, 212, 0.65)", glow: "rgba(94, 234, 212, 0.32)" },
  cyan: { stroke: "rgba(125, 245, 255, 0.55)", glow: "rgba(125, 245, 255, 0.22)" },
  gold: { stroke: "rgba(242, 220, 168, 0.70)", glow: "rgba(242, 220, 168, 0.30)" },
} as const

function curvePath(a: Node, b: Node) {
  const midY = (a.y + b.y) / 2
  // Gentle symmetrical bezier curve (architectural, not cartoony)
  return `M ${a.x} ${a.y} C ${a.x} ${midY} ${b.x} ${midY} ${b.x} ${b.y}`
}

function TreeEdge({
  edge,
  nodesById,
  index,
  total,
  open,
  reducedMotion,
}: {
  edge: Edge
  nodesById: Record<string, Node>
  index: number
  total: number
  open: ReturnType<typeof useMotionValue<number>>
  reducedMotion: boolean
}) {
  const seg = 1 / total
  // Reverse build order: deepest edges reveal first, root edges last
  const start = (total - index - 1) * seg
  const end = start + seg

  const local = useTransform(open, (t) => clamp01((t - start) / (end - start)))
  const eased = useTransform(local, (t) => (reducedMotion ? t : easeOutCubic(t)))

  const col = COLORS[edge.color]

  const opacity = useTransform(eased, [0, 0.08, 1], [0, 0.9, 1])
  const glowK = useTransform(eased, (t) => 0.15 + 0.85 * t)

  const from = nodesById[edge.from]
  const to = nodesById[edge.to]
  const d = curvePath(from, to)

  const strokeWidth = edge.depth === 1 ? 1.6 : edge.depth === 2 ? 1.35 : 1.15

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={col.stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      style={{
        opacity,
        pathLength: eased,
        filter: useTransform(glowK, (k) => `drop-shadow(0 0 ${10 * k}px ${col.glow})`),
      }}
    />
  )
}

function TreeNode({
  node,
  open,
  reducedMotion,
  bp,
}: {
  node: Node
  open: ReturnType<typeof useMotionValue<number>>
  reducedMotion: boolean
  bp: Breakpoint
}) {
  // Reverse build order: leaves appear first, root last
  // Depth: 3 (leaves) -> 2 -> 1 -> 0 (root)
  const start =
    node.depth === 3 ? 0.0 : node.depth === 2 ? 0.18 : node.depth === 1 ? 0.4 : 0.68
  const end =
    node.depth === 3 ? 0.32 : node.depth === 2 ? 0.58 : node.depth === 1 ? 0.82 : 1.0

  const local = useTransform(open, (t) => clamp01((t - start) / (end - start)))
  const eased = useTransform(local, (t) => (reducedMotion ? t : easeOutCubic(t)))

  const baseR = node.depth === 0 ? 5.2 : node.depth === 1 ? 4.4 : node.depth === 2 ? 3.7 : 3.2
  const r = useTransform(eased, (t) => (reducedMotion ? baseR : baseR * (0.88 + 0.12 * t)))

  const nodeOpacity = useTransform(eased, [0, 0.15, 1], [0, 0.9, 1])

  const isRoot = node.depth === 0
  const fill = isRoot ? "rgba(242, 220, 168, 0.35)" : "rgba(94, 234, 212, 0.18)"
  const stroke = isRoot ? "rgba(242, 220, 168, 0.85)" : "rgba(94, 234, 212, 0.55)"
  const glow = isRoot ? COLORS.gold.glow : node.depth <= 1 ? COLORS.teal.glow : COLORS.cyan.glow

  const glowK = useTransform(eased, (t) => (isRoot ? 0.55 + 0.45 * t : 0.25 + 0.55 * t))

  // Slight parallax drift for depth (foreground moves a touch more)
  const x = useTransform(eased, (t) => {
    if (reducedMotion || bp === "mobile") return 0
    const drift = node.depth === 0 ? 0 : node.depth === 1 ? 0.6 : node.depth === 2 ? 0.9 : 1.1
    return drift * t
  })

  return (
    <motion.circle
      cx={node.x}
      cy={node.y}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={isRoot ? 1.1 : 0.9}
      style={{
        opacity: nodeOpacity,
        x,
        filter: useTransform(glowK, (k) => `drop-shadow(0 0 ${16 * k}px ${glow})`),
      }}
    />
  )
}

export function InfluenceTree({ isActive = true }: { isActive?: boolean }) {
  const reducedMotion = usePrefersReducedMotion()
  const bp = useBreakpoint()

  const open = useMotionValue(0) // 0 collapsed, 1 grown

  // Reset when not active (keeps state semantic to the Leadership card range)
  useEffect(() => {
    if (!isActive && bp !== "mobile" && !reducedMotion) open.set(0)
  }, [isActive, bp, reducedMotion, open])

  // On mobile / reduced motion: show a calm, readable static tree
  useEffect(() => {
    if (bp === "mobile") open.set(0.82)
    if (reducedMotion) open.set(0.62)
  }, [bp, reducedMotion, open])

  // Scroll-distance-driven growth (UP grows, DOWN collapses)
  const { scrollY } = useScroll()
  const prevY = useRef<number | null>(null)
  const pxForFullGrow = bp === "tablet" ? 520 : 420

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!isActive) return
    if (bp === "mobile" || reducedMotion) return
    const prev = prevY.current
    prevY.current = y
    if (prev == null) return
    const delta = y - prev // >0 scroll down, <0 scroll up
    if (delta === 0) return
    // Direction semantics (as requested):
    // Scroll DOWN -> grow (open increases)
    // Scroll UP   -> collapse (open decreases)
    open.set(clamp01(open.get() + delta / pxForFullGrow))
  })

  const { nodes, edges } = useMemo(() => {
    // 4 levels desktop (root + 3), 3 levels tablet (root + 2)
    const includeLeaves = bp === "desktop"

    const n: Node[] = [
      { id: "r", x: 50, y: 14, depth: 0 },
      { id: "a", x: 28, y: 36, depth: 1 },
      { id: "b", x: 72, y: 36, depth: 1 },
      { id: "a1", x: 18, y: 58, depth: 2 },
      { id: "a2", x: 38, y: 58, depth: 2 },
      { id: "b1", x: 62, y: 58, depth: 2 },
      { id: "b2", x: 82, y: 58, depth: 2 },
      ...(includeLeaves
        ? ([
            { id: "a1l", x: 12, y: 82, depth: 3 },
            { id: "a1r", x: 24, y: 82, depth: 3 },
            { id: "a2l", x: 32, y: 82, depth: 3 },
            { id: "a2r", x: 44, y: 82, depth: 3 },
            { id: "b1l", x: 56, y: 82, depth: 3 },
            { id: "b1r", x: 68, y: 82, depth: 3 },
            { id: "b2l", x: 76, y: 82, depth: 3 },
            { id: "b2r", x: 88, y: 82, depth: 3 },
          ] as Node[])
        : []),
    ]

    const e: Edge[] = [
      { id: "r-a", from: "r", to: "a", color: "gold", depth: 1 },
      { id: "r-b", from: "r", to: "b", color: "gold", depth: 1 },

      { id: "a-a1", from: "a", to: "a1", color: "teal", depth: 2 },
      { id: "a-a2", from: "a", to: "a2", color: "teal", depth: 2 },
      { id: "b-b1", from: "b", to: "b1", color: "teal", depth: 2 },
      { id: "b-b2", from: "b", to: "b2", color: "teal", depth: 2 },

      ...(includeLeaves
        ? ([
            { id: "a1-a1l", from: "a1", to: "a1l", color: "cyan", depth: 3 },
            { id: "a1-a1r", from: "a1", to: "a1r", color: "cyan", depth: 3 },
            { id: "a2-a2l", from: "a2", to: "a2l", color: "cyan", depth: 3 },
            { id: "a2-a2r", from: "a2", to: "a2r", color: "cyan", depth: 3 },
            { id: "b1-b1l", from: "b1", to: "b1l", color: "cyan", depth: 3 },
            { id: "b1-b1r", from: "b1", to: "b1r", color: "cyan", depth: 3 },
            { id: "b2-b2l", from: "b2", to: "b2l", color: "cyan", depth: 3 },
            { id: "b2-b2r", from: "b2", to: "b2r", color: "cyan", depth: 3 },
          ] as Edge[])
        : []),
    ]

    return { nodes: n, edges: e }
  }, [bp])

  const nodesById = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>, [nodes])

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full max-w-[420px]" style={{ overflow: "visible" }}>
        <g>
          {edges.map((edge, i) => (
            <TreeEdge
              key={edge.id}
              edge={edge}
              nodesById={nodesById}
              index={i}
              total={edges.length}
              open={open}
              reducedMotion={reducedMotion}
            />
          ))}
          {nodes.map((node) => (
            <TreeNode key={node.id} node={node} open={open} reducedMotion={reducedMotion} bp={bp} />
          ))}
        </g>
      </svg>
    </div>
  )
}


