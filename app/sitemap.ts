import type { MetadataRoute } from "next"

const SITE_URL = "https://architvishnoi.in"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/#skills`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/#journey`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/#work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/#notable`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/#about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/#contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ]
}
