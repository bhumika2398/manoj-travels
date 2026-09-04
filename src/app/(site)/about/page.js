import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Video } from "@/components/ui/Video";
import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { business } from "@/config/business.config";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Manoj Tours and Travels (Manoj Taxi Service) is a 24x7 taxi and cab service based in Bangalore, Karnataka, offering one way, round trip, local and airport cabs.",
  path: "/about",
});

const values = [
  {
    title: "One business, two names",
    detail: "Manoj Tours and Travels and Manoj Taxi Service are the same company — you'll see both names used interchangeably.",
  },
  {
    title: "Bangalore based",
    detail: "We operate out of Kaggalipura, Kanakapura Road, Bangalore, serving local, outstation and airport routes across Karnataka and beyond.",
  },
  {
    title: "Available 24 × 7",
    detail: "Whether it's an early flight or a late-night pickup, we're reachable around the clock.",
  },
  {
    title: "A fleet for every trip",
    detail: "From a compact sedan for a quick city run to a Tempo Traveller for a large family tour, we match the vehicle to your journey.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A straightforward cab service, run from Bangalore"
        description={`${business.legalName}, also known as ${business.tradeName}, offers one way cabs, round trip cabs, local cabs and airport pickup & drop across Bangalore and Karnataka — available ${business.availability}.`}
        image="/images/destinations/pondicherry.png"
        imageAlt="Pondicherry"
      />

      <Section tone="paper">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]} />
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
          <Reveal variant="scale" className="relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)] lg:mx-0">
            <Video src="/videos/sections/ooty-coonoor.mp4" />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-h3 font-display text-[var(--color-ink)]">What we do</h2>
            <p className="text-body mt-5 text-[var(--color-text-muted)]">
              We provide taxi and cab hire across four core services — one-way outstation drops, per-km round
              trips, hourly local packages, and airport pickup &amp; drop — supported by a fleet ranging from
              sedans to a larger Tempo Traveller for group travel.
            </p>
            <p className="text-body mt-4 text-[var(--color-text-muted)]">
              Customers can book by phone, WhatsApp, or through the enquiry form on this website, and we
              confirm the vehicle and fare directly before the trip.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading align="center" eyebrow="What to Expect" title="How we work" className="mx-auto" />
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {values.map((v, index) => (
            <Reveal key={v.title} delay={(index % 2) * 100} className="rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper)] p-7">
              <h3 className="text-card-title font-display text-[var(--color-ink)]">{v.title}</h3>
              <p className="mt-2.5 text-[17px] leading-relaxed text-[var(--color-text-muted)]">{v.detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" className="text-center">
        <Reveal>
          <h2 className="text-h3 font-display text-[var(--color-ink)]">Get in touch</h2>
          <p className="text-lead mx-auto mt-3 max-w-md text-[var(--color-text-muted)]">
            Have a trip in mind? Call, WhatsApp, or send an enquiry and we&rsquo;ll take it from there.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="accent" size="lg">
              Contact Us
            </Button>
            <CallButton variant="inline" />
            <WhatsAppButton variant="inline" />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
