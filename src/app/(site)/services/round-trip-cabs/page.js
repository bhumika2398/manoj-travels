import { ServicePageContent } from "@/components/services/ServicePageContent";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const service = getServiceBySlug("round-trip-cabs");

export const metadata = buildMetadata({
  title: "Round Trip Cabs in Bangalore",
  description: service.summary,
  path: "/services/round-trip-cabs",
});

export default function RoundTripCabsPage() {
  return <ServicePageContent service={service} />;
}
