"use client";

import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "@/hooks/useParallax";

export function DestinationHero({ title, description, image }) {
  const [parallaxRef, parallaxStyle] = useParallax(18);

  return (
    <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-[var(--color-ink)]">
      {image && (
        <div className="absolute inset-0 animate-reveal">
          <div ref={parallaxRef} style={parallaxStyle} className="h-full w-full scale-110">
            <Image src={image} alt="" wrapperClassName="h-full w-full" priority sizes="100vw" />
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/45 to-[var(--color-ink)]/10" />
      <div className="container-edge relative z-10 mx-auto w-full max-w-7xl pb-12 pt-32">
        <Reveal>
          <h1 className="text-balance text-h2 max-w-2xl font-display text-[var(--color-text-on-dark)]">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={120}>
            <p className="text-lead mt-5 max-w-xl text-[var(--color-text-on-dark-muted)]">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
