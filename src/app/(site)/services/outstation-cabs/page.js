import { ServicePageContent } from "@/components/services/ServicePageContent";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const service = getServiceBySlug("outstation-cabs");

export const metadata = buildMetadata({
  title: "One Way Cabs in Bangalore",
  description: service.summary,
  path: "/services/outstation-cabs",
});

export default function OutstationCabsPage() {
  return <ServicePageContent service={service} />;
}
