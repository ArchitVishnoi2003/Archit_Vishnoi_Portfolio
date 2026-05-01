"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Mail, MapPin, Phone, Send, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function JsonFormInput({
  formState,
  setFormState,
  handleSubmit,
}: {
  formState: { name: string; email: string; message: string }
  setFormState: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string }>>
  handleSubmit: (e: React.FormEvent) => void
}) {
  const lineNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return (
    <div className="glass rounded-2xl overflow-hidden font-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-muted-foreground ml-2">contact_request.json</span>
      </div>

      {/* JSON content */}
      <div className="flex">
        {/* Line numbers */}
        <div className="flex flex-col py-4 px-3 bg-secondary/30 text-muted-foreground/50 select-none border-r border-border">
          {lineNumbers.map((num) => (
            <span key={num} className="leading-7 text-right w-6">
              {num}
            </span>
          ))}
        </div>

        {/* JSON editor */}
        <form suppressHydrationWarning onSubmit={handleSubmit} className="flex-1 p-4 space-y-0">
          <div className="leading-7 text-muted-foreground">{"{"}</div>

          {/* Name field */}
          <div className="leading-7 pl-4 flex items-center gap-1">
            <span className="text-primary">{'"name"'}</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-muted-foreground">{'"'}</span>
            <input
              suppressHydrationWarning
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="Your Name"
              className="bg-transparent border-none outline-none text-green-400 placeholder:text-muted-foreground/40 w-full"
              required
            />
            <span className="text-muted-foreground">{'",'}</span>
          </div>

          {/* Email field */}
          <div className="leading-7 pl-4 flex items-center gap-1">
            <span className="text-primary">{'"email"'}</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-muted-foreground">{'"'}</span>
            <input
              suppressHydrationWarning
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              placeholder="your@email.com"
              className="bg-transparent border-none outline-none text-green-400 placeholder:text-muted-foreground/40 w-full"
              required
            />
            <span className="text-muted-foreground">{'",'}</span>
          </div>

          {/* Subject field (optional decoration) */}
          <div className="leading-7 pl-4 flex items-center gap-1">
            <span className="text-primary">{'"subject"'}</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-yellow-400">{'"Collaboration Request"'}</span>
            <span className="text-muted-foreground">,</span>
          </div>

          {/* Message field */}
          <div className="leading-7 pl-4 flex items-start gap-1">
            <span className="text-primary">{'"message"'}</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-muted-foreground">{'"'}</span>
          </div>
          <div className="pl-8 leading-7">
            <textarea
              suppressHydrationWarning
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              placeholder="Your message here..."
              rows={3}
              className="bg-transparent border-none outline-none text-green-400 placeholder:text-muted-foreground/40 w-full resize-none leading-7"
              required
            />
          </div>
          <div className="leading-7 pl-4">
            <span className="text-muted-foreground">{'",'}</span>
          </div>

          {/* Timestamp (auto-generated decoration) */}
          <div className="leading-7 pl-4 flex items-center gap-1">
            <span className="text-primary">{'"timestamp"'}</span>
            <span className="text-muted-foreground">:</span>
            <span suppressHydrationWarning className="text-orange-400">{new Date().toISOString().split("T")[0]}</span>
          </div>

          <div className="leading-7 text-muted-foreground">{"}"}</div>

          {/* Submit button styled as terminal command */}
          <div className="pt-4 border-t border-border/50 mt-4">
            <Button
              suppressHydrationWarning
              type="submit"
              className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 font-mono gap-2"
            >
              <span className="text-muted-foreground">$</span>
              <span>submit_request</span>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formState)
    alert("This form correctly logs local state. To send real emails, an API route integration is needed (e.g. Resend, EmailJS, Web3Forms).");
  }

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 px-5 sm:px-6 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let&apos;s <span className="text-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you have a project in mind or just want to chat about product and technology, I&apos;d love to hear
            from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info - Updated with real data */}
          <div
            className={`space-y-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <Link
                    href="mailto:avarchit2003@gmail.com"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    avarchit2003@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <Link href="tel:+918318844975" className="text-foreground hover:text-primary transition-colors">
                    +91 8318844975
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground">Chennai, India</p>
                </div>
              </div>
            </div>

            {/* Social Links - Updated with real URLs */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Follow me</p>
              <div className="flex items-center gap-4">
                <Link href="https://www.linkedin.com/in/archit-vishnoi-276240279" target="_blank" rel="noopener noreferrer">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/10 transition-colors group">
                    <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                </Link>
                <Link href="https://github.com/ArchitVishnoi2003" target="_blank" rel="noopener noreferrer">
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/10 transition-colors group">
                    <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
          >
            <JsonFormInput formState={formState} setFormState={setFormState} handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  )
}
