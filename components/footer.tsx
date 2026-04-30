import Link from "next/link"
import { Github, Linkedin, Heart } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="py-8 px-6 border-t border-border" itemScope itemType="https://schema.org/Person">
      <meta itemProp="name" content="Archit Vishnoi" />
      <meta itemProp="jobTitle" content="Product Manager & Developer" />
      <meta itemProp="url" content="https://architvishnoi.in" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {year} Archit Vishnoi. Built with</span>
            <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>and Next.js.</span>
          </div>

          <address className="not-italic flex items-center gap-4">
            <Link
              href="https://github.com/ArchitVishnoi2003"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Archit Vishnoi on GitHub"
              itemProp="sameAs"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/archit-vishnoi-276240279"
              target="_blank"
              rel="me noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Archit Vishnoi on LinkedIn"
              itemProp="sameAs"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:avarchit2003@gmail.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              itemProp="email"
            >
              avarchit2003@gmail.com
            </Link>
          </address>
        </div>
      </div>
    </footer>
  )
}
