"use client";

import { WhatsAppButton } from "./WhatsAppButton";
import { CallButton } from "./CallButton";
import { BackToTop } from "./BackToTop";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";

/**
 * Persistent floating action dock — WhatsApp, Call, Back-to-top.
 * Fades in only after the visitor scrolls a little: the hero already has
 * its own inline Call/WhatsApp buttons, and on mobile the hero's tall
 * booking panel runs close to the viewport edge, so keeping the dock
 * hidden until scroll avoids it ever sitting on top of the panel.
 */
export function FloatingActions() {
  const visible = useScroll(560);

  return (
    <div
      className={cn(
        "fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 transition-all duration-300 md:bottom-6 md:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
      aria-hidden={!visible}
    >
      <BackToTop />
      <CallButton variant="floating" />
      <WhatsAppButton variant="floating" />
    </div>
  );
}
