import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { VehicleDetails } from "@/components/fleet/VehicleDetails";
import { fleet, getFleetBySlug } from "@/data/fleet";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return fleet.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({ params }) {
  const vehicle = getFleetBySlug(params.slug);
  if (!vehicle) return {};
  return buildMetadata({
    title: `${vehicle.name} — ${vehicle.category}`,
    description: vehicle.description,
    path: `/fleet/${vehicle.slug}`,
  });
}

export default function FleetVehiclePage({ params }) {
  const vehicle = getFleetBySlug(params.slug);
  if (!vehicle) notFound();

  return (
    <Section tone="paper" className="pt-36 md:pt-44">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Fleet", href: "/fleet" },
          { label: vehicle.name, href: `/fleet/${vehicle.slug}` },
        ]}
      />
      <div className="mt-8">
        <VehicleDetails vehicle={vehicle} />
      </div>
    </Section>
  );
}
