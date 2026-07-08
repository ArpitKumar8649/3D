"use client"

import React from "react"

export type AuroraFluxProps = {
  /** Run full-bleed (fills viewport). If false, the aurora fills its parent. */
  fullScreen?: boolean
  /** Kept for API parity; no longer used. */
  pauseWhenHidden?: boolean
  /** Kept for API parity; no longer used. */
  pauseOnHover?: boolean
  /** Kept for API parity; no longer used. */
  mix?: number
  className?: string
  style?: React.CSSProperties
  /** Optional aria label for accessibility. */
  ariaLabel?: string
}

/**
 * Animated aurora background.
 *
 * This is a pure-CSS implementation (see `.aurora-fallback` in globals.css).
 * We deliberately avoid WebGL here because `getContext("webgl2")` is
 * unreliable across mobile browsers / restricted webviews — when it fails or
 * silently doesn't paint, a `<canvas>` renders as a blank white / broken-image
 * box. The CSS aurora renders identically everywhere and is GPU-composited.
 */
export default function AuroraFlux({
  fullScreen = true,
  className = "",
  style,
  ariaLabel = "Aurora flux animated background",
}: AuroraFluxProps) {
  return (
    <div
      className={`aurora-fallback overflow-hidden ${
        fullScreen ? "fixed inset-0" : "relative h-full w-full"
      } ${className}`}
      style={style}
      role="img"
      aria-label={ariaLabel}
    />
  )
}

export { AuroraFlux }
