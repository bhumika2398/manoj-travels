import { DestinationHero } from "@/components/destinations/DestinationHero";
import { DestinationEditorialGrid } from "@/components/destinations/DestinationEditorialGrid";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { destinations } from "@/data/destinations";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Tours & Destinations from Bangalore",
  description:
    "Popular destinations for round trips and tour packages from Bangalore — hill stations, heritage cities and pilgrimage towns across South India.",
  path: "/destinations",
});

export default function DestinationsPage() {
  return (
    <>
      <DestinationHero
        title="Tours & Packages from Bangalore"
        description="Round trips and tour packages to Karnataka's hill stations, coastal towns and beyond, plus popular pilgrimage and heritage routes across South India."
        image="/images/destinations/conoor.png"
      />
      <Section tone="paper">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }]} />
        <div className="mt-10">
          <DestinationEditorialGrid destinations={destinations} />
        </div>
      </Section>
    </>
  );
}
