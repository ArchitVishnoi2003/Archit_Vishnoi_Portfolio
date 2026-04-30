import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Archit Vishnoi — Product Manager & Developer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(200,240,90,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(240,211,90,0.10), transparent 60%), #080808",
          color: "#e8e4dc",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        {/* top bar — eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 2, background: "#c8f05a" }} />
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              color: "#c8f05a",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Portfolio · Product Manager &amp; Developer
          </div>
        </div>

        {/* center — name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 124,
              lineHeight: 1.0,
              fontWeight: 400,
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: -2,
              color: "#ffffff",
            }}
          >
            Archit Vishnoi
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.3,
              color: "rgba(232, 228, 220, 0.7)",
              maxWidth: 900,
            }}
          >
            Founding-team PM at Olcademy · ex-PM Vedant · TEDxVIT General
            Secretary · Patent published
          </div>
        </div>

        {/* bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "rgba(232, 228, 220, 0.55)",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>VIT Chennai</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>B.Tech CSE</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#c8f05a",
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#c8f05a",
                boxShadow: "0 0 18px #c8f05a",
              }}
            />
            ARCHITVISHNOI.IN
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
