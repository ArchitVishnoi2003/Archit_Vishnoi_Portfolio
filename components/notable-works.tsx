"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion"
import { Award, Users, Mic, Lightbulb, Code } from "lucide-react"

// Achievement data array with all notable works
const notableWorks = [
  {
    icon: Award,
    title: "Patent Published",
    subtitle: "Haptic Feedback Footwear for Terrain Adapted Navigation",
    description:
      "Developed a wearable navigation system for visually-impaired people - more than just a patent idea. A comprehensive solution combining hardware and software for accessible navigation.",
    role: "Lead Inventor & Developer",
    year: "2025",
    tag: "Patent",
  },
  {
    icon: Mic,
    title: "General Secretary",
    subtitle: "TEDxVIT Student Chapter",
    description:
      "Board Member leading recruitment processes, coordinating departments, delegating responsibilities, and presenting structured reports on club performance and strategic outcomes.",
    role: "Strategic Leadership",
    year: "2023 - Present",
    tag: "TEDx",
  },
  {
    icon: Users,
    title: "Events Hosted",
    subtitle: "Successfully Organized Large-Scale Events",
    description:
      "Student Representative and Host for several workshop and seminar events with 100s of attendees. Managed logistics, speaker coordination, and audience engagement.",
    role: "Event Coordinator",
    year: "2023 - Present",
    tag: "Leadership",
  },
  {
    icon: Lightbulb,
    title: "Research Publication",
    subtitle: "AI-Powered Accessibility Solutions",
    description:
      "Published research on leveraging artificial intelligence for creating more inclusive digital experiences and assistive technologies for differently-abled individuals.",
    role: "Primary Researcher",
    year: "2024",
    tag: "Research",
  },
  {
    icon: Code,
    title: "Open Source Contributor",
    subtitle: "Community-Driven Development",
    description:
      "Active contributor to open source projects focused on accessibility tools and developer utilities. Building tools that empower developers and end-users alike.",
    role: "Core Contributor",
    year: "2022 - Present",
    tag: "Open Source",
  },
]

// Individual stack card component with scroll-driven animations
function StackCard({
  work,
  index,
  totalCards,
  progress,
}: {
  work: (typeof notableWorks)[0]
  index: number
  totalCards: number
  progress: MotionValue<number>
}) {
  const IconComponent = work.icon

  // Calculate the range for this specific card
  // Each card has a segment of the scroll progress
  const cardStart = index / totalCards
  const cardEnd = (index + 1) / totalCards

  // Transform values for stacking effect
  // Scale: 1 -> 0.92 as card moves back in the stack
  const scale = useTransform(progress, [cardStart, cardEnd, cardEnd + 0.1], [1, 1, 0.92])

  // Opacity: 1 -> 0.6 as newer cards stack on top
  const opacity = useTransform(progress, [cardStart, cardEnd, cardEnd + 0.15], [1, 1, 0.6])

  // Y offset: creates depth by moving previous cards up slightly
  const y = useTransform(progress, [cardStart, cardEnd, cardEnd + 0.1], [0, 0, -10])

  // Spring-based smooth animations for premium feel
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 })

  return (
    <div
      className="sticky top-24 md:top-32"
      style={{
        // Each card needs increasing z-index for proper stacking
        zIndex: index + 1,
        // Offset each sticky position slightly for the stack effect
        paddingTop: `${index * 20}px`,
      }}
    >
      <motion.div
        style={{
          scale: smoothScale,
          opacity: smoothOpacity,
          y: smoothY,
        }}
        className="relative"
      >
        {/* Glassmorphism card with gradient border */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Subtle gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 p-[1px]">
            <div className="absolute inset-[1px] rounded-3xl bg-card/80 backdrop-blur-xl" />
          </div>

          {/* Card content */}
          <div className="relative glass-strong rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-6">
              {/* Header row: Icon, Title, Tag */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Icon container */}
                  <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-lg shadow-primary/10">
                    <IconComponent className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                  </div>

                  {/* Title and subtitle */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">{work.title}</h3>
                    <p className="text-sm md:text-base text-primary font-medium">{work.subtitle}</p>
                  </div>
                </div>

                {/* Tag badge */}
                <span className="self-start px-4 py-1.5 text-xs md:text-sm font-semibold bg-primary/20 text-primary rounded-full border border-primary/30 whitespace-nowrap">
                  {work.tag}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{work.description}</p>

              {/* Footer row: Role and Year */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Role:</span>
                  <span className="text-sm font-medium text-foreground">{work.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Period:</span>
                  <span className="text-sm font-medium text-primary">{work.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Mobile horizontal swipeable card component
function MobileCard({ work }: { work: (typeof notableWorks)[0] }) {
  const IconComponent = work.icon

  return (
    <motion.div className="min-w-[85vw] sm:min-w-[320px] snap-center" whileTap={{ scale: 0.98 }}>
      <div className="relative rounded-3xl overflow-hidden h-full">
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 p-[1px]">
          <div className="absolute inset-[1px] rounded-3xl bg-card/80 backdrop-blur-xl" />
        </div>

        {/* Card content */}
        <div className="relative glass-strong rounded-3xl p-6 shadow-2xl shadow-black/20 h-full">
          <div className="flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
              <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30">
                {work.tag}
              </span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">{work.title}</h3>
              <p className="text-xs text-primary font-medium">{work.subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed flex-1">{work.description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs">
              <span className="text-muted-foreground">{work.role}</span>
              <span className="text-primary font-medium">{work.year}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function NotableWorks() {
  const containerRef = useRef<HTMLElement>(null)

  // Track scroll progress through the entire section
  // This creates the timeline-controlled animation effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offset: start of container at bottom of viewport -> end of container at top of viewport
    offset: ["start start", "end end"],
  })

  return (
    <section id="notable" ref={containerRef} className="relative">
      {/* Desktop: Scroll Stack Animation */}
      {/* Height provides scroll runway for the stacking animation */}
      <div className="hidden md:block min-h-[300vh] py-24 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          {/* Section Header - sticky at top */}
          <div className="sticky top-8 z-0 text-center mb-8 pb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Notable <span className="text-primary">Works</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Beyond code and products - achievements that create lasting impact. Scroll to explore the journey.
            </motion.p>
          </div>

          {/* Stacking cards container */}
          <div className="relative">
            {notableWorks.map((work, index) => (
              <StackCard
                key={work.title}
                work={work}
                index={index}
                totalCards={notableWorks.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Horizontal Swipeable Cards */}
      <div className="md:hidden py-16 px-4 bg-secondary/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Notable <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">Swipe to explore achievements beyond code.</p>
        </div>

        {/* Horizontal scroll container */}
        <div className="overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
          <div className="flex gap-4 snap-x snap-mandatory">
            {notableWorks.map((work) => (
              <MobileCard key={work.title} work={work} />
            ))}
            {/* Spacer for last card visibility */}
            <div className="min-w-[20px] shrink-0" />
          </div>
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-2 mt-4">
          {notableWorks.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-primary/30" />
          ))}
        </div>
      </div>
    </section>
  )
}
