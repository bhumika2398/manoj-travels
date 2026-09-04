"use client";

import { useState } from "react";
import { PricingCard } from "./PricingCard";
import { Button } from "@/components/ui/Button";
import { oneWayPricing, localPricing, roundTripPricing, airportPricing, pricingNotes } from "@/data/pricing";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "one-way", label: "One Way", data: oneWayPricing },
  { value: "round-trip", label: "Round Trip", data: roundTripPricing },
  { value: "local", label: "Local", data: localPricing },
  { value: "airport", label: "Airport", data: null },
];

export function PricingSelector({ className, defaultTab = "one-way" }) {
  const [active, setActive] = useState(defaultTab);
  const tab = TABS.find((t) => t.value === active);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Select service to view pricing"
        className="mx-auto flex w-full max-w-xl flex-wrap justify-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper-2)] p-1.5"
      >
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={active === t.value}
            onClick={() => setActive(t.value)}
            className={cn(
              "rounded-[var(--radius-sm)] px-4 py-2.5 text-[16px] font-medium transition-all duration-200",
              active === t.value
                ? "bg-[var(--color-ink)] text-[var(--color-text-on-dark)] shadow-[var(--shadow-soft)]"
                : "text-[var(--color-text)] hover:bg-white/60"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab.value === "airport" ? (
          <div className="mx-auto max-w-lg rounded-[var(--radius-lg)] border border-dashed border-[var(--color-line)] bg-[var(--color-paper-2)] p-8 text-center">
            <p className="text-h3 font-display text-[var(--color-ink)]">{airportPricing.message}</p>
            <p className="mt-2.5 text-[17px] text-[var(--color-text-muted)]">
              Airport transfers are available 24×7 — call or WhatsApp us and we&rsquo;ll confirm the exact fare for your route.
            </p>
            <div className="mt-5 flex justify-center">
              <Button href="/services/airport-pickup-drop" variant="outline" size="sm">
                Airport Transfer Details
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tab.data.map((tier) => (
              <PricingCard key={tier.id} tier={tier} type={tab.value} />
            ))}
          </div>
        )}
      </div>

      <ul className="mx-auto mt-8 max-w-2xl space-y-1.5 text-center text-[14px] text-[var(--color-text-muted)]">
        {pricingNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
