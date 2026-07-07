import Navbar from "@/components/navbar"
import ScrollExperience from "@/components/scroll-experience"
import FinaleSection from "@/components/finale-section"

export default function Page() {
  return (
    <main className="relative bg-background">
      {/* Fixed glassmorphic navbar */}
      <Navbar />

      {/* Fixed canvas + GSAP-driven overlays (dissolves out at sequence end) */}
      <ScrollExperience />

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

      {/* Finale — revealed once the frame sequence dissolves out */}
      <FinaleSection />
    </main>
  )
}
