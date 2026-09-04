import { FleetCard } from "./FleetCard";
import { Reveal } from "@/components/ui/Reveal";

export function FleetGrid({ vehicles, onBook }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle, index) => (
        <Reveal key={vehicle.slug} delay={(index % 3) * 90}>
          <FleetCard vehicle={vehicle} onBook={onBook} />
        </Reveal>
      ))}
    </div>
  );
}
