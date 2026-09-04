import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DestinationEditorialGrid } from "@/components/destinations/DestinationEditorialGrid";
import { Button } from "@/components/ui/Button";
import { destinations } from "@/data/destinations";

// The original three local favourites, plus Mysore, Coorg, Madikeri,
// Hassan and Chitradurga — every slug already exists in data/destinations.js
// with a real image and its own /destinations/[slug] page.
const FEATURED_SLUGS = [
  "bangalore-palace",
  "lalbagh",
  "nandi-hills",
  "mysore",
  "coorg",
  "madikeri",
  "hassan",
  "chitradurga",
  "tirupati",
  "murudeshwara",
];

export function DestinationsSection() {
  const featured = FEATURED_SLUGS.map((slug) => destinations.find((d) => d.slug === slug)).filter(Boolean);

  return (
    <Section tone="ink" id="destinations">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          tone="dark"
          eyebrow="Tours & Packages"
          title="Featured destinations"
        />
        <Button href="/destinations" variant="outline-dark" size="sm" className="shrink-0">
          View All Destinations
        </Button>
      </div>
      <div className="mt-10">
        <DestinationEditorialGrid destinations={featured} />
      </div>
    </Section>
  );
}
