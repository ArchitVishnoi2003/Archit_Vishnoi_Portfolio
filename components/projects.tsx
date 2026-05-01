"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowRight, TrendingUp, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

const caseStudies = [
  {
    title: "WhatsApp Legal Chatbot MVP",
    metric: "MVP",
    description:
      "At Vedant Learning Centre — led the end-to-end product lifecycle, translating user pain points into clear product requirements and shipping a working chatbot prototype.",
    tags: ["Rapid Prototyping", "Discovery", "Vedant"],
  },
  {
    title: "Agile Sprint Execution",
    metric: "AGILE",
    description:
      "Broke features into prioritized sprints, refined the backlog from real user feedback, and iterated continuously on chatbot flows and platform usability.",
    tags: ["Agile", "Backlog Grooming", "Iteration"],
  },
  {
    title: "Founding PM — Project-Z",
    metric: "0→1",
    description:
      "On Olcademy's founding PM team for an early-stage e-commerce platform — driving product development end-to-end from ideation through implementation.",
    tags: ["0→1", "E-commerce", "Olcademy"],
  },
  {
    title: "Cross-Functional Coordination",
    metric: "TEAM",
    description:
      "Working synchronously with design, engineering, and QA — collaborating with developers and stakeholders to ship features without sacrificing user experience.",
    tags: ["Team Management", "Stakeholders", "QA"],
  },
]

const developerProjects = [
  {
    title: "VastraHouse — E-commerce Store",
    description:
      "Prototyped a clothing e-commerce platform solving easy catalogue onboarding for small-scale businesses, with N8n automation for E-way bill generation and product listing via images.",
    image: "/e-commerce-platform-dashboard-dark-theme.jpg",
    tags: ["React.js", "Firebase Auth", "Firestore", "N8n"],
    period: "Sep 2025 - Oct 2025",
    githubUrl: "https://github.com/ArchitVishnoi2003",
    liveUrl: "#",
  },
  {
    title: "HDIMS — Health Data Management",
    description:
      "Conceptualized a Health Data Management mobile app with separate Patient and Hospital dashboards. Used Flutter, Firebase, and Gemini API for AI-personalized diet plans, auth, and real-time data sync.",
    image: "/modern-analytics-dashboard-dark-theme-data-visuali.jpg",
    tags: ["Flutter", "Firebase", "Gemini API", "AI Diet Plans"],
    period: "Oct 2024 - Nov 2024",
    githubUrl: "https://github.com/ArchitVishnoi2003",
    liveUrl: "#",
  },
]

export function Projects() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

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
      { threshold: 0.2 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="py-16 md:py-24 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            My <span className="text-primary">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From driving product metrics to building full-stack applications.
          </p>
        </div>

        {/* Metric Mover Subsection */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Metric Mover</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudies.map((study, index) => (
              <div
                key={study.title}
                data-index={index}
                className={`glass rounded-2xl p-6 transition-all duration-700 hover:shadow-xl hover:shadow-primary/10 group ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl font-bold text-primary mb-3">{study.metric}</div>
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {study.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{study.description}</p>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs glass rounded-full text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Projects Subsection */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Code className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Developer</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {developerProjects.map((project, index) => (
              <div
                key={project.title}
                data-index={index + caseStudies.length}
                className={`group glass rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-xl hover:shadow-primary/10 ${
                  visibleItems.includes(index + caseStudies.length)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-xs text-muted-foreground glass px-2 py-1 rounded-full">
                    {project.period}
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs glass rounded-full text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href={project.liveUrl}>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Button>
                    </Link>
                    <Link href={project.githubUrl}>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary gap-2">
                        <Github className="h-4 w-4" />
                        Code
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link href="https://github.com/ArchitVishnoi2003" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="glass border-primary/30 text-primary hover:bg-primary/10 gap-2 bg-transparent"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
