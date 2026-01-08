"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, Download, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const roles = ["Building Scalable Systems as a Developer", "Defining Strategic Vision as a Product Manager"]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setIsAnimating(false)
      }, 500)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Profile Image */}
        <div className="mb-8 animate-fade-in">
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden glass-strong p-1 animate-glow">
              <Image
                src="/WhatsApp Image 2026-01-08 at 6.07.33 PM.jpeg"
                alt="Archit Vishnoi"
                width={160}
                height={160}
                className="rounded-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">✓</span>
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 animate-slide-up">
          <span className="inline-block">Archit</span> <span className="inline-block text-primary">Vishnoi</span>
        </h1>

        {/* Role Cycling */}
        <div className="h-16 md:h-20 flex items-center justify-center mb-6 overflow-hidden">
          <p
            className={`text-lg md:text-2xl lg:text-3xl text-muted-foreground transition-all duration-500 ${
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {roles[currentRole]}
          </p>
        </div>

        {/* Subtext */}
        <p
          className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          Bridging the gap between technical feasibility and user value.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8">
            <Download className="h-4 w-4" />
            Download CV
          </Button>
          <Link href="#contact">
            <Button
              variant="outline"
              size="lg"
              className="glass border-primary/30 text-primary hover:bg-primary/10 gap-2 px-8 bg-transparent"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </Button>
          </Link>
        </div>

        {/* Scroll Cue */}
        <Link href="#skills" className="inline-flex flex-col items-center text-primary animate-bounce-subtle">
          <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
          <ArrowDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  )
}
