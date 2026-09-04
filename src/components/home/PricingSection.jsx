import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingSelector } from "@/components/pricing/PricingSelector";

export function PricingSection() {
  return (
    <Section tone="sand" id="pricing">
      <SectionHeading
        align="center"
        eyebrow="Transparent Pricing"
        title="Compare fares by service & vehicle"
        description="Pick a service to see our current tariff — no long tables, just what applies to your trip."
        className="mx-auto"
      />
      <div className="mt-10">
        <PricingSelector />
      </div>
    </Section>
  );
}
