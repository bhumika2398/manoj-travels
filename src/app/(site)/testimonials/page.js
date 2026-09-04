import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TestimonialBook } from "@/components/testimonials/TestimonialBook";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Testimonials",
  description:
    "Traveller reviews and stories from customers of Manoj Tours and Travels (Manoj Taxi Service), presented as a travel journal.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="From the Road"
        title="Travellers' Notes"
        description="Stories from the road, page by page."
        image="/images/destinations/sakleshpura.png"
        imageAlt="Sakleshpur"
      />
      <Section tone="sand">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Testimonials", href: "/testimonials" }]} />
        <div className="mt-10">
          <TestimonialBook />
        </div>
      </Section>
    </>
  );
}
