"use client"

import AuroraFlux from "./aurora-flux"

const STATS = [
  { value: "99.999%", label: "Uptime SLA" },
  { value: "< 2ms", label: "Inference Latency" },
  { value: "48", label: "Global Regions" },
]

const FOOTER_LINKS: { heading: string; items: string[] }[] = [
  { heading: "Platform", items: ["Architecture", "Compute", "Memory", "Networking"] },
  { heading: "Developers", items: ["Documentation", "API Reference", "SDKs", "Status"] },
  { heading: "Company", items: ["About", "Careers", "Press", "Contact"] },
]

export default function FinaleSection() {
  return (
    // relative z-30 + solid background so this scrolls up and covers the
    // fixed canvas stage (which dissolves out as the sequence ends).
    <section className="relative z-30 bg-background">
      {/* -------- Premium feature card (appears above the aurora) -------- */}
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-8 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-14">
          {/* top edge highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          {/* accent glow wash */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          {/* HUD corners */}
          <span className="hud-corner left-4 top-4 border-l-2 border-t-2" aria-hidden="true" />
          <span className="hud-corner bottom-4 right-4 border-b-2 border-r-2" aria-hidden="true" />

          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.4em] text-accent text-glow-accent">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Built for scale
          </p>
          <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Production-grade intelligence, everywhere at once.
          </h2>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted">
            NEXUS-1 runs your most demanding workloads across a planet-scale
            mesh, with deterministic latency and zero-downtime failover baked
            into every layer of the stack.
          </p>

          {/* stats grid */}
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="bg-background/60 p-8 backdrop-blur-sm">
                <p className="text-glow-soft text-4xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------- Aurora flux showcase -------------------- */}
      <div className="relative h-[85vh] w-full overflow-hidden border-y border-white/10">
        <AuroraFlux
          fullScreen={false}
          className="absolute inset-0 h-full w-full"
          ariaLabel="Animated aurora flux visualization"
        />
        {/* darkening + vignette so copy stays legible over the shader */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.7)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.4em] text-accent text-glow-accent">
            The living network
          </p>
          <h2 className="text-glow-strong max-w-3xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl">
            Compute that flows like light.
          </h2>
          <p className="text-glow-soft mx-auto mt-6 max-w-md text-pretty leading-relaxed text-foreground/80">
            Every request routed through an adaptive fabric that reshapes itself
            in real time — energy following intelligence.
          </p>
          <button className="metallic-border metallic-glow mt-10 rounded-full bg-black/40 px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-foreground shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-md transition-transform duration-300 hover:scale-105">
            Explore the fabric
          </button>
        </div>
      </div>

      {/* -------------------------- Footer -------------------------- */}
      <footer className="relative border-t border-white/10 bg-background">
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            {/* brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-accent/40 bg-accent/10">
                  <span className="h-2 w-2 rounded-sm bg-accent" />
                </span>
                <span className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-foreground">
                  Nexus
                </span>
              </div>
              <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted">
                Infrastructure for the age of intelligence. Engineered atom by
                atom.
              </p>
            </div>

            {/* link columns */}
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading}>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="font-mono text-xs tracking-[0.2em] text-muted">
              © {new Date().getFullYear()} NEXUS SYSTEMS // ALL RIGHTS RESERVED
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              <span className="live-dot h-1 w-1 rounded-full bg-accent" />
              <span>Systems Online</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
