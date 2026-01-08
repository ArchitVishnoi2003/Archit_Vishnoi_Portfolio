"use client"

import { useEffect, useRef, useState } from "react"
import { Building2, Calendar, GraduationCap, Code, MapPin, Users, PieChart } from "lucide-react"
import dynamic from "next/dynamic"
import { useScroll, useMotionValueEvent } from "framer-motion"
import { AnimatedCodeEditor } from "./animated-code-editor"
import { KnowledgeBook } from "./knowledge-book"
import { InfluenceTree } from "./influence-tree"

const JourneyScene = dynamic(() => import("./journey-3d-scene").then((mod) => mod.JourneyScene), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-secondary/20 rounded-2xl animate-pulse" />,
})

const experiences = [
  {
    role: "Product Manager",
    company: "Freelance Projects",
    location: "Remote",
    period: "2024 - Present",
    description:
      "Created comprehensive product decks and feature proposals for leading fintech and quick-commerce platforms, focusing on user experience enhancement and feature innovation.",
    achievements: [
      "Made decks on Blinkit and Hubble Money App",
      "Enhanced Blinkit product recommendation feature",
      "Introduced Hubble Wallet feature concept",
    ],
    tags: ["Product Strategy", "Fintech", "Quick Commerce"],
    icon: PieChart,
    animation: "donut", // 3D donut/pie chart animation
  },
  {
    role: "Leadership",
    company: "TEDxVIT Club",
    location: "VIT Chennai",
    period: "2023 - Present",
    description:
      "Board Member & General Secretary. Leading recruitment, coordinating departments, and ensuring smooth execution of events with strategic outcomes.",
    achievements: [
      "Led interviews & shortlisted candidates",
      "Coordinated cross-department operations",
      "Presented structured performance reports",
    ],
    tags: ["Leadership", "Event Management", "Strategy"],
    icon: Users,
    animation: "network", // Network/connections animation
  },
  {
    role: "Developer",
    company: "Vedant Learning Centre",
    location: "Remote",
    period: "Jun 2025 - Jul 2025",
    description:
      "Led the end-to-end development of a WhatsApp-based chatbot MVP, aligning product requirements with rapid prototyping and deployment timelines.",
    achievements: [
      "Built admin portal & user-management web interface",
      "Applied Agile approach with sprints",
      "Integrated continuous feedback loops",
    ],
    tags: ["React.js", "Firebase", "WhatsApp API", "Agile"],
    icon: Code,
    animation: "code", // Code/terminal animation
  },
  {
    role: "Education",
    company: "Vellore Institute of Technology",
    location: "Chennai, India",
    period: "Aug 2023 - Present",
    description:
      "Pursuing Bachelor of Technology in Computer Science and Engineering. Building a strong foundation in software development, algorithms, and product thinking.",
    achievements: [
      "Android App Development - Imarticus Learning",
      "Networking Basics - CISCO",
      "Active in student organizations",
    ],
    tags: ["Computer Science", "B.Tech", "VIT Chennai"],
    icon: GraduationCap,
    animation: "book", // Book/learning animation
  },
]

export function Experience() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgresses, setScrollProgresses] = useState<number[]>([0, 0, 0, 0])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  useMotionValueEvent(scrollYProgress, "change", () => {
    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const rect = cardRef.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const cardProgress = Math.max(0, Math.min(1, 1 - (rect.top - windowHeight * 0.3) / (windowHeight * 0.6)))
        setScrollProgresses((prev) => {
          const newProgresses = [...prev]
          newProgresses[index] = cardProgress
          return newProgresses
        })
      }
    })
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            My <span className="text-primary">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From education to building products - a track record of learning and delivering impact.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary/30 z-20" />

          {/* Timeline Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 transition-all duration-700 ${
                    visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                  } ${isEven ? "md:flex-row" : "md:flex-row-reverse"} ${
                    exp.role === "Education" || exp.role === "Leadership" ? "md:items-center" : ""
                  }`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-30" />

                  {/* Content Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[45%] ${isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}
                  >
                    <div className="glass rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                      {/* Icon & Role */}
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                      </div>

                      {/* Company & Period */}
                      <div className={`mb-4 ${isEven ? "md:flex md:flex-col md:items-end" : ""}`}>
                        <div
                          className={`flex items-center gap-2 text-primary mb-1 ${isEven ? "md:flex-row-reverse" : ""}`}
                        >
                          <Building2 className="h-4 w-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 text-sm text-muted-foreground ${isEven ? "md:flex-row-reverse" : ""}`}
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{exp.location}</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 text-sm text-muted-foreground mt-1 ${isEven ? "md:flex-row-reverse" : ""}`}
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <p
                        className={`text-muted-foreground mb-4 leading-relaxed ${isEven ? "md:text-right" : "md:text-left"}`}
                      >
                        {exp.description}
                      </p>

                      <ul className={`space-y-2 mb-4 ${isEven ? "md:items-end" : ""}`}>
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className={`text-sm text-muted-foreground flex items-start gap-2 ${isEven ? "md:flex-row-reverse md:text-right" : ""}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        {exp.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 text-xs glass rounded-full text-primary font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`hidden md:flex md:w-[45%] items-center justify-center min-h-[320px] relative z-0 ${
                      exp.role === "Developer" && isEven
                        ? "md:ml-auto md:pl-12"
                        : exp.role === "Leadership" && !isEven
                          ? "md:mr-auto md:pr-12"
                          : exp.role === "Education" && !isEven
                            ? "md:mr-auto md:pr-12"
                            : isEven
                              ? "md:pl-10"
                              : "md:pr-10"
                    }`}
                  >
                    <div className="sticky top-24 w-full h-[300px]">
                      {exp.role === "Developer" && isEven && (
                        <AnimatedCodeEditor scrollProgress={scrollProgresses[index] || 0} />
                      )}
                      {exp.role === "Leadership" && !isEven && (
                        <InfluenceTree
                          isActive={(scrollProgresses[index] ?? 0) > 0.02 && (scrollProgresses[index] ?? 0) < 0.98}
                        />
                      )}
                      {exp.role === "Education" && !isEven && (
                        <div className="h-full">
                          <KnowledgeBook isActive={visibleItems.includes(index)} />
                        </div>
                      )}
                      {exp.role !== "Developer" && exp.role !== "Leadership" && exp.role !== "Education" && (
                        <div className="w-full h-full rounded-2xl overflow-hidden">
                          <JourneyScene animationType={exp.animation} scrollProgress={scrollProgresses[index] || 0} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
