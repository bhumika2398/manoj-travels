import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { galleryItems } from "@/data/gallery";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "A look at Manoj Tours and Travels on the road — fleet vehicles and glimpses of the destinations we cover from Bangalore.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="On the road with Manoj Tours & Travels"
        description="A few real glimpses of our fleet in service and the destinations we cover."
        image="/images/destinations/chikamangaluru.png"
        imageAlt="Chikmagaluru"
      />
      <Section tone="paper">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gallery", href: "/gallery" }]} />
      <div className="mt-10">
        <GalleryGrid items={galleryItems} />
      </div>
      </Section>
    </>
  );
}
