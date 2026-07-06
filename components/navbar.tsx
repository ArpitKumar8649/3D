"use client"

const NAV_LINKS = [
  { label: "Architecture", href: "#" },
  { label: "Compute", href: "#" },
  { label: "Memory", href: "#" },
  { label: "Docs", href: "#" },
]

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass-surface pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 sm:px-6">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inset-0 rounded-md border border-accent/60" />
            <span className="absolute inset-1 rounded-[3px] bg-accent/20" />
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.25em] text-foreground">
            NEXUS
          </span>
        </a>

        {/* Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.15em] text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Status + CTA */}
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 sm:flex">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Systems Online
            </span>
          </span>
          <button className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors duration-200 hover:border-accent/60 hover:bg-accent/10">
            Access
          </button>
        </div>
      </nav>
    </header>
  )
}
