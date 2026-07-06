import Navbar from "@/components/navbar"
import ScrollExperience from "@/components/scroll-experience"

export default function Page() {
  return (
    <main className="relative bg-background">
      {/* Fixed glassmorphic navbar */}
      <Navbar />

      {/* Fixed canvas + GSAP-driven overlays */}
      <ScrollExperience />

      {/* Persistent HUD framing (cyberpunk detailing) */}
      <div className="pointer-events-none fixed inset-0 z-40">
        <div className="hud-corner left-4 top-20 border-l-2 border-t-2" />
        <div className="hud-corner right-4 top-20 border-r-2 border-t-2" />
        <div className="hud-corner bottom-10 left-4 border-b-2 border-l-2" />
        <div className="hud-corner bottom-10 right-4 border-b-2 border-r-2" />
      </div>

      {/* Bottom status readout */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-6">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          <span className="live-dot h-1 w-1 rounded-full bg-accent" />
          <span>Nexus-1 // Neural Compute Core</span>
        </div>
      </div>

      {/* Tall scroll track (400vh) that drives the timeline */}
      <div
        id="scroll-container"
        className="pointer-events-none relative z-20 h-[400vh] w-full"
      >
        {/* Scroll hint — sits in the first viewport and scrolls away */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-screen items-end justify-center pb-16">
          <div className="flex flex-col items-center gap-2">
            <span className="animate-pulse font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
              Scroll to reveal
            </span>
            <span className="h-8 w-px animate-pulse bg-gradient-to-b from-accent/60 to-transparent" />
          </div>
        </div>
      </div>
    </main>
  )
}
