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
          <p className="text-sm text-gray-500">
            Pricing has one source of truth:{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-[13px]">src/data/pricing.js</code>. Edit rates
            there and every pricing surface on the public site (homepage selector, service pages, fleet pages)
            updates automatically. This page is a read-only summary.
          </p>
        </AdminCard>

        <div className="space-y-6">
          {services.map((service) => (
            <AdminCard key={service.slug}>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">{service.name}</h2>
                <span className="text-xs text-gray-400">/services/{service.slug}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{service.tagline}</p>

              {service.pricing ? (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead>
                      <tr className="text-xs uppercase tracking-wide text-gray-400">
                        <th className="py-2 pr-4 font-medium">Capacity</th>
                        <th className="py-2 pr-4 font-medium">Vehicle</th>
                        <th className="py-2 font-medium">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {service.pricing.map((tier) => (
                        <tr key={tier.id}>
                          <td className="py-2 pr-4 text-gray-700">{tier.capacity}</td>
                          <td className="py-2 pr-4 text-gray-700">{tier.vehicleHint}</td>
                          <td className="py-2 font-medium text-gray-900">
                            {tier.price ? formatINR(tier.price) : `${formatINR(tier.perKm)}/km`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
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
