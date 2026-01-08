"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin, GraduationCap, Heart, Zap } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About <span className="text-primary">Me</span>
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden glass-strong p-1">
              <Image
                src="/professional-developer-working-dark-setup.jpg"
                alt="Archit Vishnoi"
                width={500}
                height={500}
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-4 -right-4 glass rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-primary">2+</div>
              <div className="text-xs text-muted-foreground">Years Building</div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m Archit Vishnoi, a Computer Science student at VIT Chennai with a passion for building products
                that solve real problems. I bridge the gap between technical execution and product vision.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From developing WhatsApp chatbots to designing health management systems, I love turning ideas into
                impactful digital experiences. My experience as General Secretary at TEDxVIT has shaped my leadership
                and event management skills.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I&apos;m not coding or strategizing product roadmaps, you&apos;ll find me exploring new
                technologies, contributing to open-source, or organizing events that bring communities together.
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm text-foreground">Chennai, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Education</p>
                  <p className="text-sm text-foreground">B.Tech CSE @ VIT</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Passion</p>
                  <p className="text-sm text-foreground">Product & Code</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Focus</p>
                  <p className="text-sm text-foreground">Full-Stack & PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
