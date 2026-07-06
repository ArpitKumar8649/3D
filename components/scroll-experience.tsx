"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/* -------------------------------------------------------------------------- */
/*  CONFIG — swap these out for your own sequence                             */
/* -------------------------------------------------------------------------- */

const FRAME_COUNT = 201
// Dummy path builder. Replace `getFrameUrl` with your own image locations.
// e.g. return `/frames/frame-${index}.jpg` or a remote CDN URL.
const getFrameUrl = (index: number) =>
  `/frames/ezgif-frame-${String(index).padStart(3, "0")}.jpg`

/* -------------------------------------------------------------------------- */

export default function ScrollExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Overlay refs
  const heroRef = useRef<HTMLDivElement>(null)
  const cardLeftRef = useRef<HTMLDivElement>(null)
  const cardRightRef = useRef<HTMLDivElement>(null)
  const cardScrimRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Mutable render state kept outside of React re-renders
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef<number>(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return

    /* ---------------------------------------------------------------------- */
    /*  Canvas sizing — DPR aware for retina / high-refresh displays          */
    /* ---------------------------------------------------------------------- */
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    /* ---------------------------------------------------------------------- */
    /*  Draw a frame with "cover" scaling (fills viewport, keeps aspect)      */
    /* ---------------------------------------------------------------------- */
    const drawFrame = (index: number) => {
      const img = framesRef.current[index]
      if (!img || !img.complete || img.naturalWidth === 0) return

      const vw = window.innerWidth
      const vh = window.innerHeight
      const iw = img.naturalWidth
      const ih = img.naturalHeight

      const scale = Math.max(vw / iw, vh / ih)
      const drawW = iw * scale
      const drawH = ih * scale
      const dx = (vw - drawW) / 2
      const dy = (vh - drawH) / 2

      context.clearRect(0, 0, vw, vh)
      context.drawImage(img, dx, dy, drawW, drawH)
    }

    /* ---------------------------------------------------------------------- */
    /*  Preload the full image sequence                                       */
    /* ---------------------------------------------------------------------- */
    const images: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = getFrameUrl(i + 1)
      img.onload = () => {
        loadedCount++
        // Draw the very first frame as soon as it is available
        if (i === 0) {
          setCanvasSize()
          drawFrame(0)
        }
      }
      images[i] = img
    }
    framesRef.current = images

    /* ---------------------------------------------------------------------- */
    /*  ScrollTrigger — maps scroll progress (0 → 1) to frame index           */
    /* ---------------------------------------------------------------------- */
    const seq = { frame: 0 }

    const scrollTrigger = ScrollTrigger.create({
      trigger: "#scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const target = Math.min(
          FRAME_COUNT - 1,
          Math.round(self.progress * (FRAME_COUNT - 1)),
        )
        if (target !== currentFrameRef.current) {
          currentFrameRef.current = target
          seq.frame = target
          drawFrame(target)
        }
      },
    })

    /* ---------------------------------------------------------------------- */
    /*  Overlay master timeline                                               */
    /*  One scrubbed timeline over the SAME range as the canvas trigger so    */
    /*  overlay timing maps 1:1 to scroll progress (0 → 1). The timeline's    */
    /*  total duration is normalized to 1, so each tween position below is    */
    /*  literally the scroll-progress fraction at which it plays.             */
    /* ---------------------------------------------------------------------- */
    const ctx = gsap.context(() => {
      gsap.set(heroRef.current, { autoAlpha: 0, y: 40, letterSpacing: "0.15em" })
      gsap.set(cardLeftRef.current, { autoAlpha: 0, xPercent: -60 })
      gsap.set(cardRightRef.current, { autoAlpha: 0, xPercent: 60 })
      gsap.set(cardScrimRef.current, { autoAlpha: 0 })
      gsap.set(ctaRef.current, { autoAlpha: 0, scale: 0.92 })

      const master = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: "#scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      })

      // Section 1 — Hero reveal (0% → 25%)
      master
        .to(
          heroRef.current,
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: "0.02em",
            ease: "power2.out",
            duration: 0.1,
          },
          0.02,
        )
        .to(
          heroRef.current,
          {
            autoAlpha: 0,
            y: -40,
            letterSpacing: "0.25em",
            ease: "power2.in",
            duration: 0.07,
          },
          0.2,
        )

      // Section 2 — Spec cards slide in / dissolve out (25% → 55%)
      master
        .to(
          cardScrimRef.current,
          { autoAlpha: 1, ease: "power2.out", duration: 0.1 },
          0.26,
        )
        .to(
          cardLeftRef.current,
          { autoAlpha: 1, xPercent: 0, ease: "power3.out", duration: 0.12 },
          0.28,
        )
        .to(
          cardRightRef.current,
          { autoAlpha: 1, xPercent: 0, ease: "power3.out", duration: 0.12 },
          0.28,
        )
        .to(
          [cardLeftRef.current, cardRightRef.current],
          { autoAlpha: 0, y: -30, ease: "power2.in", duration: 0.08 },
          0.5,
        )
        .to(
          cardScrimRef.current,
          { autoAlpha: 0, ease: "power2.in", duration: 0.08 },
          0.5,
        )

      // Section 3 — CTA fade + scale in (75% → 100%)
      master.to(
        ctaRef.current,
        { autoAlpha: 1, scale: 1, ease: "power2.out", duration: 0.14 },
        0.78,
      )

      // Normalize total timeline duration to 1 so positions == scroll progress
      master.to({}, { duration: 0.001 }, 1)
    })

    /* ---------------------------------------------------------------------- */
    /*  Resize handling — re-size canvas + redraw current frame               */
    /* ---------------------------------------------------------------------- */
    const handleResize = () => {
      setCanvasSize()
      drawFrame(currentFrameRef.current)
      ScrollTrigger.refresh()
    }
    window.addEventListener("resize", handleResize)

    // Initial paint
    setCanvasSize()
    drawFrame(0)

    return () => {
      window.removeEventListener("resize", handleResize)
      scrollTrigger.kill()
      ctx.revert()
    }
  }, [])

  return (
    <>
      {/* Fixed full-screen canvas background */}
      <div className="fixed inset-0 z-0 bg-background">
        <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
        {/* Faint tech grid for cyberpunk texture */}
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-60" />
        {/* Vignette to keep text legible over bright frames */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.82)_100%)]" />
        {/* Top scrim so the glass navbar always reads cleanly */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
        {/* Bottom scrim for the status readout */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Overlays live in a fixed layer; opacity/position driven by GSAP */}
      <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
        {/* Section 1 — Hero */}
        <div ref={heroRef} className="relative px-6 text-center">
          {/* Localized dark scrim so white copy never washes into chrome */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[760px] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/60 blur-3xl" />
          <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4em] text-accent text-glow-accent">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Neural Compute Core
          </p>
          <h1 className="text-glow-strong text-balance text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-8xl md:text-9xl">
            NEXUS&#8209;1
          </h1>
          <p className="text-glow-soft mx-auto mt-6 max-w-md text-pretty text-base text-foreground/80 sm:text-lg">
            Infrastructure for the age of intelligence. Engineered atom by atom.
          </p>
        </div>

        {/* Section 2 — Spec cards */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {/* Localized dark scrim so the glass cards read over bright chrome */}
          <div
            ref={cardScrimRef}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[1000px] max-w-[96vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/60 blur-3xl"
          />
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <SpecCard
              ref={cardLeftRef}
              label="Compute"
              title="1.2 ExaFLOPS"
              lines={[
                "8,192 neural cores",
                "3nm photonic interconnect",
                "Zero-latency mesh fabric",
              ]}
            />
            <SpecCard
              ref={cardRightRef}
              label="Memory"
              title="512 TB HBM4"
              lines={[
                "14.4 TB/s bandwidth",
                "Liquid-immersion cooled",
                "ECC end-to-end integrity",
              ]}
            />
          </div>
        </div>

        {/* Section 3 — CTA */}
        <div ref={ctaRef} className="absolute px-6 text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[620px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/55 blur-3xl" />
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-accent text-glow-accent">
            General Availability // Q3
          </p>
          <h2 className="text-glow-strong text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            Deploy the future.
          </h2>
          <p className="text-glow-soft mx-auto mt-4 max-w-sm text-pretty text-foreground/75">
            Reserve your NEXUS&#8209;1 allocation before general availability.
          </p>
          <button className="metallic-border metallic-glow pointer-events-auto mt-8 rounded-full bg-black/40 px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-transform duration-300 hover:scale-105">
            Request Access
          </button>
        </div>
      </div>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Glassmorphic spec card                                                    */
/* -------------------------------------------------------------------------- */

const SpecCard = ({
  ref,
  label,
  title,
  lines,
}: {
  ref: React.Ref<HTMLDivElement>
  label: string
  title: string
  lines: string[]
}) => {
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 shadow-[0_8px_50px_rgba(0,0,0,0.65)] backdrop-blur-md"
    >
      {/* top edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      {/* subtle accent glow wash */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      {/* HUD corner brackets */}
      <span className="hud-corner left-3 top-3 border-l border-t" aria-hidden="true" />
      <span className="hud-corner bottom-3 right-3 border-b border-r" aria-hidden="true" />
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-accent text-glow-accent">
        <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        {label}
      </p>
      <p className="text-glow-soft mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </p>
      <ul className="mt-6 space-y-3">
        {lines.map((line) => (
          <li
            key={line}
            className="text-glow-soft flex items-center gap-3 text-sm text-foreground/75"
          >
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}
