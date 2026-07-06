import ScrollExperience from "@/components/scroll-experience"

export default function Page() {
  return (
    <main className="relative bg-background">
      {/* Fixed canvas + GSAP-driven overlays */}
      <ScrollExperience />

      {/* Tall scroll track (400vh) that drives the timeline */}
      <div
        id="scroll-container"
        className="pointer-events-none relative z-20 h-[400vh] w-full"
      >
        {/* Scroll hint — sits in the first viewport and scrolls away */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-screen items-end justify-center pb-10">
          <div className="animate-pulse font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
            Scroll to reveal
          </div>
        </div>
      </div>
    </main>
  )
}
