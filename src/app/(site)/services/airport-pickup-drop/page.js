import { ServicePageContent } from "@/components/services/ServicePageContent";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

const service = getServiceBySlug("airport-pickup-drop");

export const metadata = buildMetadata({
  title: "Airport Pickup & Drop in Bangalore",
  description: service.summary,
  path: "/services/airport-pickup-drop",
  keywords: service.keywords,
});

export default function AirportPickupDropPage() {
  return <ServicePageContent service={service} />;
}
