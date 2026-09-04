"use client";

import { Video } from "@/components/ui/Video";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "@/hooks/useParallax";

/**
 * The homepage's large cinematic closing chapter — full-width Kerala
 * footage with a subtle dark overlay and one short line of text. Sits
 * after the testimonials, right before the final Book Now CTA. This is
 * the only footage on the homepage aside from the hero.
 */
export function CinematicSection() {
  const [parallaxRef, parallaxStyle] = useParallax(24);

  return (
    <section className="relative h-[80vh] min-h-[480px] overflow-hidden bg-[var(--color-ink)]">
      <div ref={parallaxRef} style={parallaxStyle} className="absolute inset-0 scale-110">
        <Video src="/videos/sections/kerala.mp4" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/20 to-[var(--color-ink)]/35"
      />
      <Container className="absolute inset-x-0 bottom-0 z-10 pb-16">
        <Reveal>
          <p className="text-balance max-w-2xl font-display text-3xl italic leading-[1.15] text-[var(--color-text-on-dark)] md:text-4xl lg:text-[2.75rem]">
            Every trip is someone&rsquo;s story worth arriving for.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
