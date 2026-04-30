import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { NotableWorks } from "@/components/notable-works"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

const SITE_URL = "https://architvishnoi.in"

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Archit Vishnoi",
  alternateName: ["Archit", "ArchitVishnoi2003"],
  url: SITE_URL,
  image: `${SITE_URL}/About_Me.jpeg`,
  jobTitle: "Product Manager Intern",
  description:
    "Product Manager and Developer at VIT Chennai. Founding-team PM at Olcademy, former PM at Vedant Learning Centre, General Secretary at TEDxVIT, patent published.",
  email: "mailto:avarchit2003@gmail.com",
  telephone: "+91-8318844975",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  birthPlace: {
    "@type": "Place",
    name: "Kanpur, India",
  },
  sameAs: [
    "https://www.linkedin.com/in/archit-vishnoi-276240279",
    "https://github.com/ArchitVishnoi2003",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Vellore Institute of Technology",
      url: "https://chennai.vit.ac.in",
    },
    {
      "@type": "EducationalOrganization",
      name: "Shree Sanatan Dharm Education Centre",
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "Olcademy",
  },
  knowsAbout: [
    "Product Management",
    "Agile Methodology",
    "Rapid Prototyping",
    "User Research",
    "User Journey Optimization",
    "React.js",
    "Node.js",
    "Firebase",
    "Python",
    "JavaScript",
    "SQL",
    "AI Tools",
    "Figma",
  ],
  knowsLanguage: ["English", "Hindi"],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Android App Development",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "Imarticus Learning" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Networking Basics",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "CISCO" },
    },
  ],
  award: "Patent Published — Haptic Feedback Footwear for Terrain Adapted Navigation",
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Archit Vishnoi — Portfolio",
  description:
    "Portfolio of Archit Vishnoi — Product Manager & Developer based in Chennai, India.",
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#person` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
}

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Archit Vishnoi — Portfolio",
  mainEntity: { "@id": `${SITE_URL}/#person` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Skills", item: `${SITE_URL}/#skills` },
    { "@type": "ListItem", position: 3, name: "Experience", item: `${SITE_URL}/#journey` },
    { "@type": "ListItem", position: 4, name: "Work", item: `${SITE_URL}/#work` },
    { "@type": "ListItem", position: 5, name: "Notable", item: `${SITE_URL}/#notable` },
    { "@type": "ListItem", position: 6, name: "About", item: `${SITE_URL}/#about` },
    { "@type": "ListItem", position: 7, name: "Contact", item: `${SITE_URL}/#contact` },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <NotableWorks />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
