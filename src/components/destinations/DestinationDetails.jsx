import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export function DestinationDetails({ destination }) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
      <Reveal>
        <p className="text-body text-[var(--color-text-muted)]">
          {destination.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>{destination.region}</Badge>
          <Badge>{destination.idealTripType}</Badge>
          {destination.approxDistanceKm ? (
            <Badge>~{destination.approxDistanceKm} km from Bangalore</Badge>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={120} variant="scale" className="glass-light rounded-[var(--radius-lg)] p-7">
        <h2 className="text-card-title font-display text-[var(--color-ink)]">Plan This Trip</h2>
        <p className="mt-2.5 text-[17px] text-[var(--color-text-muted)]">
          Tell us your travel dates and group size — we&rsquo;ll suggest the right vehicle and share the fare.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <Button href="/contact" variant="accent" className="w-full">
            Enquire About This Trip
          </Button>
          <WhatsAppButton
            message={`Hello Manoj Tours and Travels, I would like to enquire about a trip to ${destination.name}.`}
            className="w-full"
          />
        </div>
      </Reveal>
    </div>
  );
}
