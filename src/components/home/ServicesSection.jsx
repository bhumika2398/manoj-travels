import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <Section tone="paper" id="services">
      <SectionHeading
        eyebrow="What We Offer"
        title="A cab for every kind of journey"
      />
      <div className="mt-10">
        <ServiceGrid services={services} />
      </div>
    </Section>
  );
}
