import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { services } from "@/data/services";
import { airportPricing } from "@/data/pricing";
import { formatINR } from "@/lib/utils";

export default function AdminServicesPage() {
  return (
    <>
      <AdminTopbar title="Services & Pricing" />
      <div className="p-4 md:p-8">
        <AdminCard className="mb-6">
          <p className="text-sm text-[var(--color-text-muted)]">
            Pricing has one source of truth:{" "}
            <code className="rounded bg-[var(--color-paper-2)] px-1 py-0.5 text-[13px]">src/data/pricing.js</code>. Edit rates
            there and every pricing surface on the public site (homepage selector, service pages, fleet pages)
            updates automatically. This page is a read-only summary.
          </p>
        </AdminCard>

        <div className="space-y-6">
          {services.map((service) => (
            <AdminCard key={service.slug}>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[var(--color-ink)]">{service.name}</h2>
                <span className="text-xs text-[var(--color-text-muted)]">/services/{service.slug}</span>
              </div>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{service.tagline}</p>

              {service.pricing ? (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                        <th className="py-2 pr-4 font-medium">Capacity</th>
                        <th className="py-2 pr-4 font-medium">Vehicle</th>
                        <th className="py-2 font-medium">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-line)]">
                      {service.pricing.map((tier) => (
                        <tr key={tier.id}>
                          <td className="py-2 pr-4 text-[var(--color-text)]">{tier.capacity}</td>
                          <td className="py-2 pr-4 text-[var(--color-text)]">{tier.vehicleHint}</td>
                          <td className="py-2 font-medium text-[var(--color-ink)]">
                            {tier.price ? formatINR(tier.price) : `${formatINR(tier.perKm)}/km`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-4 rounded-[var(--radius-md)] bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  {airportPricing.message} — no fixed rate is published until exact figures are supplied.
                </p>
              )}
            </AdminCard>
          ))}
        </div>
      </div>
    </>
  );
}
