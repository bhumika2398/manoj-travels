import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Image } from "@/components/ui/Image";

// Short editorial introduction directly after the hero — one strong
// heading, two or three lines of copy and a single CTA on the left; a
// large, sophisticated photograph on the right carries the rest.
export function Intro() {
  return (
    <section className="bg-[var(--color-paper)] py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="text-eyebrow text-[var(--color-accent-2)]">Manoj Tours &amp; Travels</p>
            <h2 className="text-balance text-h2 mt-5 font-display text-[var(--color-ink)]">
              A dependable cab service, run from Bangalore
            </h2>
            <p className="text-lead mt-6 max-w-md text-[var(--color-text-muted)]">
              One way, round trip, local and airport travel — with a real
              driver on the other end of the phone whenever you need one.
            </p>
            <div className="mt-9">
              <Button href="/about" variant="outline">
                About Us
              </Button>
            </div>
          </Reveal>

          <Reveal
            variant="scale"
            delay={120}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)]"
          >
            <Image
              src="/images/destinations/rameshwaram.png"
              alt="Rameshwaram — one of the destinations Manoj Tours and Travels covers"
              wrapperClassName="h-full w-full"
              className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/25 via-transparent to-transparent"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
