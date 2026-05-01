"use client"

import { useEffect, useRef, useState } from "react"
import { Lightbulb, Code } from "lucide-react"
import { LampContainer } from "@/components/ui/lamp"

const productSkills = {
  title: "The Product",
  icon: Lightbulb,
  tags: [
    "Rapid Prototyping",
    "Agile/Scrum",
    "User Research",
    "Go-to-Market Strategy",
    "A/B Testing",
    "OKRs & KPIs",
    "Stakeholder Management",
    "Product Roadmapping",
  ],
}

const developerSkills = {
  title: "The Development",
  icon: Code,
  tags: [
    "SQL",
    "Python",
    "HTML/CSS",
    "JavaScript",
    "Node.js",
    "React.js",
    "Firebase",
    "Rapid Prototyping with AI Tools",
  ],
}

const skillIcons = [
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 0L1.75 6v12L12 24l10.25-6V6L12 0zm-1.775 18l1.775-1.025L13.775 18 12 20.05 10.225 18zM12 9.95L10.225 11l1.775 1.025L13.775 11 12 9.95zM3.75 7.05L12 2.05l8.25 5v9.9L12 21.95l-8.25-5v-9.9z" />
      </svg>
    ),
    label: "Git",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z" />
      </svg>
    ),
    label: "Tableau",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3z" />
      </svg>
    ),
    label: "Excel",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M10.5 22.5L6 14.25 1.5 22.5H0L6 12 0 1.5h1.5L6 9.75 10.5 1.5H12L6 12l6 10.5h-1.5zM13.5 22.5L18 14.25l4.5 8.25H24L18 12l6-10.5h-1.5L18 9.75 13.5 1.5H12L18 12l-6 10.5h1.5z" />
      </svg>
    ),
    label: "Power BI",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M12 0c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2V2c0-1.1-.9-2-2-2zm0 16c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2v-4c0-1.1-.9-2-2-2zM4.93 2.93c-.78-.78-2.05-.78-2.83 0-.78.78-.78 2.05 0 2.83l2.83 2.83c.78.78 2.05.78 2.83 0 .78-.78.78-2.05 0-2.83L4.93 2.93zM16.24 14.24c-.78-.78-2.05-.78-2.83 0-.78.78-.78 2.05 0 2.83l2.83 2.83c.78.78 2.05.78 2.83 0 .78-.78.78-2.05 0-2.83l-2.83-2.83zM2 10c-1.1 0-2 .9-2 2s.9 2 2 2h4c1.1 0 2-.9 2-2s-.9-2-2-2H2zm16 0c-1.1 0-2 .9-2 2s.9 2 2 2h4c1.1 0 2-.9 2-2s-.9-2-2-2h-4zM4.93 21.07l2.83-2.83c.78-.78.78-2.05 0-2.83-.78-.78-2.05-.78-2.83 0l-2.83 2.83c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0zM16.24 9.76l2.83-2.83c.78-.78.78-2.05 0-2.83-.78-.78-2.05-.78-2.83 0l-2.83 2.83c-.78.78-.78 2.05 0 2.83.78.78 2.05.78 2.83 0z" />
      </svg>
    ),
    label: "Agile",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
      </svg>
    ),
    label: "Python",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
    label: "JavaScript",
  },
]

export function Skills() {
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
    <section id="skills" ref={sectionRef} className="py-16 md:py-24 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center relative z-50 flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold font-serif text-white tracking-wider mt-16 -mb-6">
            The <em className="text-primary italic">Vision</em>
          </h2>
        </div>

        <LampContainer className="pt-0 w-full mb-12">
          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto relative z-50 px-2 lg:px-0 mt-20">
            {/* Product Strategy */}
            <div
              className={`border border-white/5 border-t-primary/30 rounded-2xl p-8 transition-all duration-700 bg-[#0f0f0f]/80 backdrop-blur-md relative shadow-[0_-20px_40px_-20px_rgba(200,240,90,0.15)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/20">
                  <productSkills.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-serif text-white">{productSkills.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {productSkills.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-xs border border-white/5 rounded-full text-muted-foreground/80 hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Developer Skills */}
            <div
              className={`border border-white/5 border-t-primary/30 rounded-2xl p-8 transition-all duration-700 bg-[#0f0f0f]/80 backdrop-blur-md relative shadow-[0_-20px_40px_-20px_rgba(200,240,90,0.15)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/20">
                  <developerSkills.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-serif text-white">{developerSkills.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {developerSkills.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-xs border border-white/5 rounded-full text-muted-foreground/80 hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </LampContainer>

        {/* Additional Skills Icons */}
        <div
          className={`flex flex-wrap justify-center gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          style={{ transitionDelay: "0.4s" }}
        >
          {skillIcons.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-xl glass flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <div className="text-muted-foreground group-hover:text-primary transition-colors">
                  <Icon />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
