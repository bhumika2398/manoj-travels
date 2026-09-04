import { Suspense } from "react";
import { FleetHero } from "@/components/fleet/FleetHero";
import { FleetBookingExperience } from "@/components/fleet/FleetBookingExperience";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { fleet } from "@/data/fleet";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Fleet & Booking",
  description:
    "Choose a service — one way, local, outstation or airport — then pick a vehicle from our fleet and book directly. Sedans, SUVs and Tempo Travellers in Bangalore.",
  path: "/fleet",
});

export default function FleetPage() {
  return (
    <>
      <FleetHero
        title="Choose a service, choose a vehicle, book"
        description="Every vehicle below is available to book directly — pick the service you need and the vehicle that fits your group."
      />
      <Section tone="paper">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Fleet", href: "/fleet" }]} />
        <div className="mt-10">
          <Suspense fallback={null}>
            <FleetBookingExperience vehicles={fleet} />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
