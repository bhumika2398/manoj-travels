"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Image } from "@/components/ui/Image";
import { useParallax } from "@/hooks/useParallax";

// Verified, no-fluff reasons to book — no GPS/tracking, punctuality
// guarantees or safety-certification claims that aren't actually true.
const benefits = [
  {
    title: "24/7 Service",
    detail: "Available around the clock for early flights and late-night pickups.",
  },
  {
    title: "Comfortable Vehicles",
    detail: "A well-kept fleet, from sedans to Tempo Travellers, for any group size.",
  },
  {
    title: "Professional Drivers",
    detail: "Experienced drivers who know Bangalore's routes and highways well.",
  },
  {
    title: "Local & Outstation Travel",
    detail: "One way, round trip and hourly local packages across Karnataka.",
  },
  {
    title: "Airport Transfers & Tour Packages",
    detail: "Dependable pickup and drop, plus multi-day tour packages on request.",
  },
];

/**
 * A premium editorial "why us" section — heading, one short line and a
 * clean benefit list beside a single photograph, not a grid of icon
 * cards. Sits between Services and Featured Destinations.
 */
export function WhySection() {
  const [parallaxRef, parallaxStyle] = useParallax(18);

  return (
    <Section tone="sand" id="why-us">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="text-eyebrow text-[var(--color-accent-2)]">Why Choose Us</p>
            <h2 className="text-balance text-h2 mt-4 font-display text-[var(--color-ink)]">
              Why Manoj Tours &amp; Travels
            </h2>
            <p className="text-lead mt-5 max-w-lg text-[var(--color-text-muted)]">
              A dependable cab service built on real availability, well-kept
              vehicles and drivers who know the roads — not empty promises.
            </p>
          </Reveal>

          <ul className="mt-10 divide-y divide-[var(--color-line)] border-t border-[var(--color-line)]">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} as="li" delay={index * 70} className="flex items-baseline gap-5 py-5">
                <span className="text-eyebrow shrink-0 text-[var(--color-accent-soft)]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-card-title font-display text-[var(--color-ink)]">{benefit.title}</h3>
                  <p className="mt-1 text-[17px] leading-relaxed text-[var(--color-text-muted)]">{benefit.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <MaskReveal className="aspect-[4/5] w-full rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)] lg:aspect-[3/4]">
          <div ref={parallaxRef} style={parallaxStyle} className="h-full w-full scale-110">
            <Image
              src="/images/destinations/mangalore.png"
              alt="Mangalore coastline — one of the destinations Manoj Tours and Travels covers"
              wrapperClassName="h-full w-full"
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/20 via-transparent to-transparent"
            />
          </div>
        </MaskReveal>
      </div>
    </Section>
  );
}
