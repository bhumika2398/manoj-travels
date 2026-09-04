import { ServiceCard } from "./ServiceCard";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceGrid({ services }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => (
        <Reveal key={service.slug} delay={(index % 4) * 90}>
          <ServiceCard service={service} index={index} />
        </Reveal>
      ))}
    </div>
  );
}
