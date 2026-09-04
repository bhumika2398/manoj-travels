import { formatINR } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function PricingCard({ tier, type }) {
  return (
    <Card glass className="flex h-full flex-col p-7">
      <div className="flex items-center justify-between">
        <Badge>{tier.capacity} Seater</Badge>
        <span className="text-[17px] text-[var(--color-text-muted)]">{tier.vehicleHint}</span>
      </div>

      <div className="mt-6">
        {type === "one-way" && (
          <>
            <p className="font-display text-3xl font-bold text-[var(--color-ink)]">{formatINR(tier.price)}</p>
            <p className="mt-1.5 text-[17px] text-[var(--color-text-muted)]">
              {tier.label}
              {tier.note ? ` ${tier.note}` : ""}
            </p>
          </>
        )}

        {type === "local" && (
          <>
            <p className="font-display text-3xl font-bold text-[var(--color-ink)]">{formatINR(tier.price)}</p>
            <p className="mt-1.5 text-[17px] text-[var(--color-text-muted)]">{tier.package}</p>
            <dl className="mt-5 space-y-2 border-t border-[var(--color-line)] pt-4 text-[17px]">
              <div className="flex justify-between">
                <dt className="text-[var(--color-text-muted)]">Extra km</dt>
                <dd className="font-medium text-[var(--color-ink)]">{formatINR(tier.extraKm)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--color-text-muted)]">Extra hour</dt>
                <dd className="font-medium text-[var(--color-ink)]">{formatINR(tier.extraHour)}</dd>
              </div>
            </dl>
          </>
        )}

        {type === "round-trip" && (
          <>
            <p className="font-display text-3xl font-bold text-[var(--color-ink)]">
              {formatINR(tier.perKm)}
              <span className="text-lg font-sans font-normal text-[var(--color-text-muted)]">/km</span>
            </p>
            <dl className="mt-5 space-y-2 border-t border-[var(--color-line)] pt-4 text-[17px]">
              <div className="flex justify-between">
                <dt className="text-[var(--color-text-muted)]">Minimum</dt>
                <dd className="font-medium text-[var(--color-ink)]">{tier.minKmPerDay} km/day</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--color-text-muted)]">Driver Bata</dt>
                <dd className="font-medium text-[var(--color-ink)]">{formatINR(tier.driverBata)}/day</dd>
              </div>
            </dl>
          </>
        )}
      </div>
    </Card>
  );
}
