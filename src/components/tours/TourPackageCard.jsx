import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { formatINR } from "@/lib/utils";

/**
 * Clean package card — name, description, price and enquiry CTAs. Reuses the
 * site's existing /contact enquiry flow and WhatsApp button rather than a
 * separate booking system, matching how ServiceCTA hands off to enquiries.
 */
export function TourPackageCard({ pkg }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:p-7">
      <h3 className="text-card-title font-display text-[var(--color-ink)]">{pkg.title}</h3>
      <p className="mt-3 flex-1 text-[16px] leading-relaxed text-[var(--color-text-muted)]">{pkg.description}</p>
      <p className="mt-5 text-2xl font-semibold text-[var(--color-ink)]">
        {formatINR(pkg.price)}
        <span className="ml-1.5 text-[15px] font-normal text-[var(--color-text-muted)]">{pkg.priceUnit}</span>
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href="/contact" variant="accent">
          Enquire Now
        </Button>
        <WhatsAppButton message={`Hello Manoj Tours and Travels, I would like to enquire about the "${pkg.title}" package.`} />
      </div>
    </div>
  );
}
