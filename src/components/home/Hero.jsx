import { HeroVideo } from "./HeroVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

// Full-screen cinematic hero — two clips crossfading in sequence
// (Jog Falls → Munnar), Video 1 → 2 → 1 → ... Both source clips are
// portrait; rather than panel them, they're cover-cropped with a per-clip
// object-position (see HeroVideo) so the subject stays in frame at
// full-bleed 16:9, and a light grade — not a heavy scrim — keeps the
// footage looking sharp instead of murky.
//
// Kept deliberately minimal — headline, one supporting line, one CTA —
// so the video carries the moment instead of competing UI chrome.
export function Hero() {
  return (
    <section className="relative flex h-[92svh] min-h-[560px] items-end overflow-hidden bg-[var(--color-ink)]">
      <HeroVideo />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/35 to-[var(--color-ink)]/10"
      />

      <Container className="relative z-10 pb-16 pt-28 md:pb-20">
        <Reveal>
          <h1 className="text-balance text-display max-w-3xl font-display text-[var(--color-text-on-dark)]">
            Manoj Tours &amp; Travels
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="text-lead mt-5 max-w-lg text-[var(--color-text-on-dark-muted)]">
            Manoj Taxi Service — local, outstation &amp; airport cabs across
            Bangalore, available 24 × 7.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/fleet" variant="accent" size="lg">
              Book Now
            </Button>
            <CallButton variant="inline" />
            <WhatsAppButton variant="inline" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
