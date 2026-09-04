"use client";

import { TRIP_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TripTypeSelector({ value, onChange, className }) {
  return (
    <div
      role="tablist"
      aria-label="Select trip type"
      className={cn(
        "flex w-full flex-wrap gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/40 p-1.5",
        className
      )}
    >
      {TRIP_TYPES.map((type) => {
        const active = value === type.value;
        return (
          <button
            key={type.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(type.value)}
            className={cn(
              "flex-1 whitespace-nowrap rounded-[var(--radius-sm)] px-3.5 py-2.5 text-[14px] font-medium transition-all duration-200 sm:text-[15px]",
              active
                ? "bg-[var(--color-ink)] text-[var(--color-text-on-dark)] shadow-[var(--shadow-soft)]"
                : "text-[var(--color-ink)]/70 hover:bg-white/60"
            )}
          >
            {type.label}
          </button>
        );
      })}
    </div>
  );
}
