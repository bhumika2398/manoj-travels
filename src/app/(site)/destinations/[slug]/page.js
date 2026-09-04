import { notFound } from "next/navigation";
import { DestinationHero } from "@/components/destinations/DestinationHero";
import { DestinationDetails } from "@/components/destinations/DestinationDetails";
import { DestinationFAQ } from "@/components/destinations/DestinationFAQ";
import { DestinationGrid } from "@/components/destinations/DestinationGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) return {};
  return buildMetadata({
    title: `${destination.name} Cab Service from Bangalore`,
    description: destination.description,
    path: `/destinations/${destination.slug}`,
  });
}

export default function DestinationPage({ params }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) notFound();

  const related = destinations.filter((d) => d.slug !== destination.slug).slice(0, 3);

  return (
    <>
      <DestinationHero title={destination.name} description={destination.region} image={destination.image} />
      <Section tone="paper">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Destinations", href: "/destinations" },
            { label: destination.name, href: `/destinations/${destination.slug}` },
          ]}
        />
        <div className="mt-8">
          <DestinationDetails destination={destination} />
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="FAQ" title={`Travelling to ${destination.name}`} />
        <div className="mt-8 max-w-3xl">
          <DestinationFAQ destination={destination} />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading eyebrow="Explore More" title="Other popular destinations" />
        <div className="mt-8">
          <DestinationGrid destinations={related} />
        </div>
      </Section>
    </>
  );
}
