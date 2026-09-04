"use client";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal wrapper — fades/lifts (or scales) its children in
 * once, the first time they approach the viewport. Pure CSS transform/
 * opacity (see .reveal / .reveal-scale in globals.css), no layout impact,
 * and fully inert under prefers-reduced-motion.
 */
export function Reveal({ as: Tag = "div", variant = "up", delay = 0, className, children, ...props }) {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={cn(variant === "scale" ? "reveal-scale" : "reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
