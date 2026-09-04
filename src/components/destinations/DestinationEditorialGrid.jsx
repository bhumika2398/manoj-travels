import { DestinationCard } from "./DestinationCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Destination listing grid — exactly 3 equal square tiles per row on
 * desktop, 2 on tablet, 1 on mobile (Tailwind's `grid-cols-3` compiles to
 * `grid-template-columns: repeat(3, minmax(0, 1fr))`). Every tile is the
 * same 1:1 square so the grid reads clean and perfectly aligned.
 */
export function DestinationEditorialGrid({ destinations }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
      {destinations.map((destination, index) => (
        <Reveal key={destination.slug} delay={(index % 3) * 90}>
          <DestinationCard destination={destination} />
        </Reveal>
      ))}
    </div>
  );
}
