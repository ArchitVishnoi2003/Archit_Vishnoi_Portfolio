"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#work", label: "Work" },
  { href: "#notable", label: "Notable" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

const GITHUB_URL = "https://github.com/ArchitVishnoi2003"
const LINKEDIN_URL = "https://www.linkedin.com/in/archit-vishnoi-276240279"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const id = href.replace("#", "")
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      if (history.replaceState) history.replaceState(null, "", href)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 max-w-[calc(100vw-1.5rem)]",
        isScrolled
          ? "glass-strong rounded-full px-4 md:px-6 py-2.5 md:py-3 shadow-lg"
          : "bg-transparent px-4 md:px-6 py-3 md:py-4",
      )}
    >
      <nav className="flex items-center gap-4 md:gap-8">
        <Link
          href="/"
          aria-label="Archit Vishnoi — Home"
          title="Archit Vishnoi — Product Manager & Developer"
          className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          AV
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl p-4 md:hidden animate-slide-up">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors py-2 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-border">
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <Github className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
