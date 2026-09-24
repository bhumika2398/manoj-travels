import { ServicePageContent } from "@/components/services/ServicePageContent";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const service = getServiceBySlug("outstation-cabs");

export const metadata = buildMetadata({
  title: "One Way Cabs in Bangalore",
  description: `${service.summary} Book a one way cab from Bangalore to Mysore, Tirupati, Hyderabad and other cities.`,
  path: "/services/outstation-cabs",
  keywords: service.keywords,
});

export default function OutstationCabsPage() {
  return <ServicePageContent service={service} />;
}
