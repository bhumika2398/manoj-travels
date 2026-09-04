"use client";

import { useEffect, useState } from "react";

/**
 * Gates the slow, continuous Ken Burns zoom (see `.kenburns` in globals.css)
 * to devices where it's actually worth the always-on compositor cost —
 * skipped under prefers-reduced-motion and on small/low-power (mobile)
 * viewports, mirroring the same gating useParallax already applies.
 * Returns false during SSR/first paint so no class flashes in before the
 * check runs; true only once confirmed safe to animate.
 */
export function useKenBurns() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia?.("(max-width: 768px)").matches;
    setEnabled(!reduceMotion && !isMobile);
  }, []);

  return enabled;
}
