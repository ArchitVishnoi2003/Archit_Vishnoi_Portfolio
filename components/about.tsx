"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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
    <section id="about" ref={sectionRef} className="py-16 md:py-20 px-5 sm:px-6 md:px-12 lg:px-24 flex items-center min-h-screen w-full max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-12 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Left Content Side */}
          <div className="space-y-6">

            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <p className="font-mono text-primary text-[10px] tracking-[0.2em] font-bold uppercase">
                About me
              </p>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] text-foreground leading-[1] tracking-tight text-balance">
              I build products at the intersection of <em className="italic text-muted-foreground">human insight</em> and engineering.
            </h2>

            {/* Paragraph */}
            <p className="text-muted-foreground/80 leading-[1.6] text-[15px] font-sans font-light max-w-[95%]">
              CSE undergrad at VIT Chennai with 1+ years of hands-on product experience across edtech, legal-tech and e-commerce. I prototype quickly, talk to users early, and care most about the gap between what people say and what they actually do.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Stat 1 */}
              <div className="border border-white/5 bg-[#0a0a0a] rounded-xl p-4 hover:border-primary/20 transition-colors">
                <div className="text-3xl font-serif text-primary mb-1 leading-none">1<span className="text-xl opacity-80">+</span></div>
                <div className="font-mono text-[9px] text-muted-foreground tracking-[0.1em] uppercase">YEARS EXPERIENCE</div>
              </div>

              {/* Stat 2 */}
              <div className="border border-white/5 bg-[#0a0a0a] rounded-xl p-4 hover:border-primary/20 transition-colors">
                <div className="text-3xl font-serif text-primary mb-1 leading-none">3</div>
                <div className="font-mono text-[9px] text-muted-foreground tracking-[0.1em] uppercase">PM ROLES</div>
              </div>

              {/* Stat 3 */}
              <div className="border border-white/5 bg-[#0a0a0a] rounded-xl p-4 hover:border-primary/20 transition-colors">
                <div className="text-3xl font-serif text-primary mb-1 leading-none">1</div>
                <div className="font-mono text-[9px] text-muted-foreground tracking-[0.1em] uppercase">PATENT PUBLISHED</div>
              </div>

              {/* Stat 4 */}
              <div className="border border-white/5 bg-[#0a0a0a] rounded-xl p-4 hover:border-primary/20 transition-colors">
                <div className="text-3xl font-serif text-primary mb-1 leading-none">5<span className="text-xl opacity-80">+</span></div>
                <div className="font-mono text-[9px] text-muted-foreground tracking-[0.1em] uppercase">PROJECTS BUILT</div>
              </div>
            </div>
          </div>

          {/* Right Image/Card Side */}
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[600px] rounded-3xl bg-[#0c0c0c] border border-white/5 overflow-hidden group">

            {/* Photo */}
            <Image
              src="/About_Me.jpeg"
              alt="Archit Vishnoi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover object-[20%_center] transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Vignette gradient for legibility of bottom card */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none"></div>

            {/* Bottom Info Card */}
            <div className="absolute bottom-6 left-6 right-6 border border-white/5 bg-black/40 backdrop-blur-md rounded-xl p-4 flex flex-col justify-center z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span className="font-mono text-[10px] text-primary font-bold tracking-widest uppercase">Available for opportunities</span>
              </div>
              <div className="font-mono text-[10px] text-muted-foreground/50 leading-relaxed uppercase tracking-widest mt-1">
                Chennai, India<br />
                avarchit2003@gmail.com
              </div>
            </div>

            {/* Subtle glow layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,240,90,0.05),transparent_50%)] pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  )
}
