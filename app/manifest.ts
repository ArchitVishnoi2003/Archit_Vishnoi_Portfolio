import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Archit Vishnoi — Portfolio",
    short_name: "Archit Vishnoi",
    description:
      "Archit Vishnoi — Product Manager and Developer at VIT Chennai.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#c8f05a",
    orientation: "portrait-primary",
    categories: ["portfolio", "productivity", "business"],
    icons: [
      { src: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  }
}
