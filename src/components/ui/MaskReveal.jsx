"use client";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * A restrained mask/curtain reveal for a handful of large standalone
 * editorial photographs — not a card or grid treatment. A solid curtain
 * panel sweeps away the first time the photo nears the viewport, while the
 * image itself settles from a slight zoom, echoing a classic film-title
 * wipe rather than a plain fade. Fires once (via useReveal), pure
 * transform, and fully inert under prefers-reduced-motion.
 */
export function MaskReveal({ children, curtainTone = "ink", delay = 0, className, imageClassName }) {
  const [ref, visible] = useReveal();
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div style={style} className={cn("h-full w-full", "mask-reveal-image", visible && "is-visible", imageClassName)}>
        {children}
      </div>
      <div
        aria-hidden="true"
        style={style}
        className={cn(
          "mask-reveal-curtain pointer-events-none absolute inset-0 z-10",
          curtainTone === "ink" ? "bg-[var(--color-ink)]" : "bg-[var(--color-paper-2)]",
          visible && "is-visible"
        )}
      />
    </div>
  );
}
