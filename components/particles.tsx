"use client"

import { useEffect, useRef } from "react"

export function Particles() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let W: number, H: number
        const particles: Particle[] = []

        function resize() {
            if (!canvas) return
            W = canvas.width = window.innerWidth
            H = canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener("resize", resize)

        class Particle {
            x: number
            y: number
            r: number
            vx: number
            vy: number
            alpha: number

            constructor() {
                this.x = Math.random() * W
                this.y = Math.random() * H
                this.r = Math.random() * 1.5 + 0.3
                this.vx = (Math.random() - 0.5) * 0.25
                this.vy = (Math.random() - 0.5) * 0.25
                this.alpha = Math.random() * 0.4 + 0.05
            }

            update() {
                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > W) this.vx *= -1
                if (this.y < 0 || this.y > H) this.vy *= -1
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(200, 240, 90, ${this.alpha})`
                ctx.fill()
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new Particle())

        let animationId: number
        function animParticles() {
            if (!ctx) return
            ctx.clearRect(0, 0, W, H)

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const d = Math.sqrt(dx * dx + dy * dy)

                    if (d < 120) {
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(200, 240, 90, ${(1 - d / 120) * 0.06})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
                particles[i].update()
                particles[i].draw()
            }
            animationId = requestAnimationFrame(animParticles)
        }
        animParticles()

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return (
        <canvas
            id="particles"
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    )
}
