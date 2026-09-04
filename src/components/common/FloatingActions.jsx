"use client";

import { useEffect, useState } from "react";
import { WhatsAppButton } from "./WhatsAppButton";
import { CallButton } from "./CallButton";
import { BackToTop } from "./BackToTop";
import { cn } from "@/lib/utils";

/**
 * Persistent floating action dock — Call and WhatsApp are visible the
 * moment the page loads, no scroll required, on both mobile and desktop.
 * Back-to-top keeps its own internal scroll gate and only joins the dock
 * from the sm breakpoint up — on mobile the dock stays a single compact
 * row so it never reaches up into the hero's own inline Call/WhatsApp
 * buttons at the bottom of the first screen.
 */
export function FloatingActions() {
  const [overFooter, setOverFooter] = useState(false);

  // The dock is fixed to the viewport corner, so once the footer scrolls
  // into view its own contact text sits directly underneath — hide the
  // dock while the footer is on screen so nothing overlaps.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return undefined;
    const observer = new IntersectionObserver(([entry]) => setOverFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -10% 0px",
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-3 z-40 flex flex-row items-end gap-2.5 transition-all duration-300 sm:flex-col sm:gap-3 md:bottom-6 md:right-6",
        overFooter ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      )}
      aria-hidden={overFooter}
    >
      <BackToTop className="hidden sm:flex" />
      <CallButton variant="floating" />
      <WhatsAppButton variant="floating" />
    </div>
  );
}
