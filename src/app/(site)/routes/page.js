import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { Accordion } from "@/components/ui/Accordion";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { routeGroups } from "@/data/routeGroups";
import { getKeywordEntryByPlace } from "@/data/destinationKeywords";
import { generalFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/metadata";

const faqs = [generalFaqs[0], generalFaqs[4], generalFaqs[8], generalFaqs[6]];

export const metadata = buildMetadata({
  title: "Outstation Taxi Routes from Bangalore",
  description:
    "One-way and round-trip outstation taxi routes from Bangalore across Karnataka, Tamil Nadu, Andhra Pradesh, Telangana and Kerala. Call or WhatsApp to check your route and fare.",
  path: "/routes",
  keywords: [
    "bangalore outstation taxi routes",
    "bangalore to tamil nadu taxi",
    "bangalore to andhra pradesh taxi",
    "bangalore to kerala taxi",
    "bangalore one way drop taxi",
  ],
});

export default function RoutesPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Routes", href: "/routes" },
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <Section tone="ink" className="pt-32">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-8 max-w-2xl">
          <p className="text-eyebrow mb-4 text-[var(--color-accent-soft)]">Outstation Routes</p>
          <h1 className="text-balance text-h2 font-display text-[var(--color-text-on-dark)]">
            Outstation Taxi Routes from Bangalore
          </h1>
          <p className="text-lead mt-5 max-w-xl text-[var(--color-text-on-dark-muted)]">
            One-way and round-trip cabs from Bangalore to cities and towns across Karnataka, Tamil Nadu,
            Andhra Pradesh, Telangana and Kerala. Don&rsquo;t see your route listed? Call or WhatsApp us
            and we&rsquo;ll confirm availability and fare.
          </p>
        </div>
      </Section>

      {routeGroups.map((group, index) => (
        <Section key={group.region} tone={index % 2 === 0 ? "paper" : "sand"}>
          <SectionHeading eyebrow="Region" title={`Bangalore to ${group.region}`} />

          {group.featured?.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-[14px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                Popular destinations with a dedicated page
              </p>
              <div className="flex flex-wrap gap-3">
                {group.featured.map((item) => (
                  <Button key={item.href} href={item.href} variant="outline" size="sm">
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {group.towns?.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-[14px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                Other towns on this corridor — call or WhatsApp to confirm your route
              </p>
              <div className="flex flex-wrap gap-2">
                {group.towns.map((town) => {
                  const entry = getKeywordEntryByPlace(town);
                  return <Badge key={town}>{entry?.phrases?.[0] || town}</Badge>;
                })}
              </div>
            </div>
          )}
        </Section>
      ))}

      <Section tone="ink">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            tone="dark"
            eyebrow="Book Your Route"
            title="Don't see your exact route?"
            description="Every route is quoted based on distance, trip type (one-way, round trip or local) and vehicle. Share your pickup and drop points with us and we'll confirm the fare directly."
            className="mx-auto"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="accent">
              Enquire About a Route
            </Button>
            <WhatsAppButton message="Hello Manoj Tours and Travels, I would like to check a taxi route and fare from Bangalore." />
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="FAQ" title="Outstation Routes — Frequently Asked Questions" />
        <div className="mt-8 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </Section>
    </>
  );
}
