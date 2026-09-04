"use client";

import { useState, useId } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function Accordion({ items, className, allowMultiple = false }) {
  const [open, setOpen] = useState(() => new Set());
  const baseId = useId();

  const toggle = (index) => {
    setOpen((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set();
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <Reveal as="div" className={cn("divide-y divide-[var(--color-line)]", className)}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={buttonId}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-[var(--color-accent-2)]"
              >
                <span className="text-[18px] font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent-2)]">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] transition-transform duration-500 ease-out",
                    isOpen && "rotate-45 border-[var(--color-accent)] text-[var(--color-accent)]"
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-500 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 text-[17px] leading-relaxed text-[var(--color-text-muted)]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Reveal>
  );
}
