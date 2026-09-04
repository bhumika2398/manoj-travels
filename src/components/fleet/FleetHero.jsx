"use client";

import { Container } from "@/components/ui/Container";
import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "@/hooks/useParallax";

export function FleetHero({ title, description }) {
  const [parallaxRef, parallaxStyle] = useParallax(18);

  return (
    <section className="relative flex h-[42vh] min-h-[320px] items-end overflow-hidden bg-[var(--color-ink)]">
      <div className="absolute inset-0 animate-reveal">
        <div ref={parallaxRef} style={parallaxStyle} className="h-full w-full scale-110">
          <Image src="/images/destinations/gokarna.png" alt="Gokarna" wrapperClassName="h-full w-full" priority sizes="100vw" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/55 to-[var(--color-ink)]/15" />
      <Container className="relative z-10 pb-12 pt-32">
        <Reveal>
          <p className="text-eyebrow text-[var(--color-accent-soft)]">Our Fleet</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-balance text-h2 mt-4 max-w-2xl font-display text-[var(--color-text-on-dark)]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={200}>
            <p className="text-lead mt-5 max-w-xl text-[var(--color-text-on-dark-muted)]">{description}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
