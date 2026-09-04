import { DestinationCard } from "./DestinationCard";
import { Reveal } from "@/components/ui/Reveal";

export function DestinationGrid({ destinations }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {destinations.map((destination, index) => (
        <Reveal key={destination.slug} delay={(index % 4) * 90}>
          <DestinationCard destination={destination} />
        </Reveal>
      ))}
    </div>
  );
}
