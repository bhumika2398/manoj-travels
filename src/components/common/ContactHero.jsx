"use client";

import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "@/hooks/useParallax";

export function ContactHero() {
  const [parallaxRef, parallaxStyle] = useParallax(18);

  return (
    <section className="relative flex h-[38vh] min-h-[280px] items-end overflow-hidden bg-[var(--color-ink)]">
      <div className="absolute inset-0 animate-reveal">
        <div ref={parallaxRef} style={parallaxStyle} className="h-full w-full scale-110">
          <Image src="/images/destinations/munnar.png" alt="Munnar" wrapperClassName="h-full w-full" priority sizes="100vw" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/55 to-[var(--color-ink)]/15" />
      <div className="container-edge relative z-10 mx-auto w-full max-w-7xl pb-10 pt-32">
        <Reveal>
          <p className="text-eyebrow text-[var(--color-accent-soft)]">Contact</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-h3 mt-3 font-display text-[var(--color-text-on-dark)]">Get in touch</h1>
        </Reveal>
      </div>
    </section>
  );
}
