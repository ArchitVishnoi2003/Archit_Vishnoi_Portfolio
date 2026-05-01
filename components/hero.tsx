"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ExternalLink, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 pt-24 sm:pt-20 md:pt-8 lg:pt-4 pb-16 md:pb-0 overflow-hidden">
      {/* Background glow effect */}
      <div className="hero-bg" />
      <div className="hero-grid" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <div className="text-left animate-fade-in flex flex-col items-start lg:pl-4 min-w-0">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="h-[1px] w-6 sm:w-8 bg-primary"></div>
              <p className="font-mono text-primary text-[10px] sm:text-xs md:text-sm tracking-[0.2em] font-bold uppercase">
                Product Manager &amp; Builder
              </p>
            </div>

            {/* Hero Title */}
            <h1 className="font-serif text-[2.4rem] sm:text-[3.2rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight text-foreground mb-5 sm:mb-6 animate-slide-up text-balance">
              Crafting products <br className="hidden md:block" /> people <em className="italic text-muted-foreground">actually</em> <br className="hidden md:block" /> love to use.
            </h1>

            {/* Subtext */}
            <p
              className="text-sm sm:text-base md:text-lg text-muted-foreground/80 max-w-xl mb-8 sm:mb-10 animate-fade-in font-sans font-light"
              style={{ animationDelay: "0.3s" }}
            >
              Bridging the gap between technical feasibility and user value.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <Link
                href="https://drive.google.com/file/d/1sRPRSuqdQeaIv9kFIQWVsOURdFtjR_qH/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 sm:px-8 rounded-full">
                  <ExternalLink className="h-4 w-4" />
                  View CV
                </Button>
              </Link>
              <Link href="#contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto glass border-primary/30 text-primary hover:bg-primary/10 gap-2 px-6 sm:px-8 bg-transparent rounded-full"
                >
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in mt-6 sm:mt-12 lg:mt-0 lg:pr-12" style={{ animationDelay: "0.4s" }}>
            <div className="relative w-[260px] h-[330px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[450px] lg:w-[380px] lg:h-[480px]">

              {/* Background Plate */}
              <div className="absolute inset-x-4 bottom-10 top-2 bg-gradient-to-b from-[#d5dae0] to-[#8d96a0] rounded-t-[3rem] rounded-b-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/WhatsApp Image 2026-01-08 at 6.07.33 PM.jpeg"
                  alt="Archit Vishnoi — Product Manager & Developer"
                  width={400}
                  height={500}
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 380px"
                  className="absolute bottom-0 w-full h-auto object-cover object-bottom transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>

              {/* Open to Work Badge */}
              <div className="absolute -top-4 -right-1 sm:-top-6 sm:-right-2 md:-top-4 md:-right-6 z-20 rotate-[12deg] hover:rotate-[15deg] transition-transform duration-300">
                <div className="bg-[#e4fc68] text-black font-bold uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs py-1.5 sm:py-2 px-3.5 sm:px-5 rounded-full border border-black/20 shadow-xl flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm">✺</span> Open to Work <span className="text-xs sm:text-sm">✺</span>
                </div>
              </div>

              {/* Floating Tags Container */}
              <div className="absolute -bottom-2 left-0 right-0 h-28 sm:h-32 z-20 pointer-events-none">

                {/* Team Player Tag */}
                <div className="absolute bottom-2 left-1 sm:left-0 rotate-[4deg] transition-transform duration-500 hover:rotate-0">
                  <div className="bg-[#1f1f1f] border border-white/5 text-[#e8e4dc] font-serif text-xs sm:text-sm md:text-lg px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-xl shadow-2xl drop-shadow-2xl opacity-95">
                    Team player
                  </div>
                </div>

                {/* Impact Oriented Tag */}
                <div className="absolute bottom-8 left-[30%] sm:left-[35%] md:left-[40%] rotate-[22deg] transition-transform duration-500 hover:rotate-[15deg]">
                  <div className="bg-[#1f1f1f] border border-white/5 text-[#e8e4dc] font-serif text-xs sm:text-sm md:text-lg px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-xl shadow-2xl drop-shadow-2xl opacity-95">
                    Impact oriented
                  </div>
                </div>

                {/* Creative Tag */}
                <div className="absolute bottom-20 sm:bottom-24 right-1 sm:-right-2 md:-right-6 rotate-[-5deg] transition-transform duration-500 hover:rotate-0">
                  <div className="bg-[#1f1f1f] border border-white/5 text-[#e8e4dc] font-serif text-xs sm:text-sm md:text-lg px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-xl shadow-2xl drop-shadow-2xl opacity-95">
                    Creative
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle z-20 hidden md:block">
          <Link href="#skills" className="inline-flex flex-col items-center text-primary">
            <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
