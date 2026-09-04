import { Image } from "@/components/ui/Image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { oneWayPricing, localPricing, roundTripPricing } from "@/data/pricing";
import { formatINR } from "@/lib/utils";

const ALL_PRICING = [...oneWayPricing, ...localPricing, ...roundTripPricing];

export function VehicleDetails({ vehicle }) {
  const tiers = vehicle.pricingIds
    .map((id) => ALL_PRICING.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal variant="scale" className="relative flex h-80 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper-2)] p-8 lg:h-[26rem]">
        <Image
          src={vehicle.image}
          alt={`${vehicle.name} — ${vehicle.category}`}
          wrapperClassName="h-full w-full"
          className="object-contain"
          sizes="(min-width: 1024px) 40vw, 90vw"
        />
      </Reveal>

      <Reveal delay={120}>
        <Badge>{vehicle.category}</Badge>
        <h1 className="mt-4 text-h3 font-display text-[var(--color-ink)]">{vehicle.name}</h1>
        <p className="mt-2 text-[17px] text-[var(--color-text-muted)]">{vehicle.seatLabel}</p>
        <p className="text-body mt-5 text-[var(--color-text-muted)]">{vehicle.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {vehicle.tripTypes.map((type) => (
            <Badge key={type}>{type}</Badge>
          ))}
        </div>

        {tiers.length > 0 && (
          <div className="mt-8 space-y-3 border-t border-[var(--color-line)] pt-6">
            <h2 className="text-[14px] font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Applicable Pricing
            </h2>
            {tiers.map((tier) => (
              <div key={tier.id} className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-line)] px-4 py-3.5 text-[16px]">
                <span className="text-[var(--color-text-muted)]">
                  {tier.label || tier.package || "Round Trip"}
                </span>
                <span className="font-medium text-[var(--color-ink)]">
                  {tier.price
                    ? formatINR(tier.price)
                    : `${formatINR(tier.perKm)}/km`}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/fleet?vehicle=${vehicle.slug}`} variant="accent" size="lg">
            Book This Vehicle
          </Button>
          <WhatsAppButton
            message={`Hello Manoj Tours and Travels, I would like to enquire about booking the ${vehicle.name}.`}
          />
        </div>
      </Reveal>
    </div>
  );
}
