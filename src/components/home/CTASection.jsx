import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/config/business.config";

/**
 * The homepage's final word — a quiet, confident close after the cinematic
 * Kerala footage. One short headline, one Book Now CTA, nothing else.
 */
export function CTASection() {
  return (
    <section className="texture-grain relative overflow-hidden bg-[var(--color-ink)] py-20 md:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(216,180,160,0.18)_0%,transparent_60%)]"
      />
      <Container className="relative z-10 flex justify-center">
        <Reveal variant="scale" className="glass-dark max-w-2xl rounded-[var(--radius-xl)] px-8 py-12 text-center sm:px-14 sm:py-16">
          <p className="text-eyebrow text-[var(--color-accent-soft)]">
            {business.availabilityLabel}
          </p>
          <h2 className="text-balance text-h2 mx-auto mt-5 font-display text-[var(--color-text-on-dark)]">
            Ready to plan your journey?
          </h2>
          <div className="mt-9">
            <Button href="/fleet" variant="accent" size="lg">
              Book Now
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
