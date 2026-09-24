import { ServicePageContent } from "@/components/services/ServicePageContent";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const service = getServiceBySlug("local-cabs");

export const metadata = buildMetadata({
  title: "Local Cabs in Bangalore",
  description: service.summary,
  path: "/services/local-cabs",
  keywords: service.keywords,
});

export default function LocalCabsPage() {
  return <ServicePageContent service={service} />;
}
