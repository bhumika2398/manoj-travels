import Link from "next/link";
import { Image } from "@/components/ui/Image";
import { Card } from "@/components/ui/Card";

export function ServiceCard({ service, index }) {
  return (
    <Card className="group overflow-hidden">
      <Link href={`/services/${service.slug}`} className="block">
        <div className="relative h-56">
          <Image
            src={service.heroImage}
            alt={`${service.name} — Manoj Tours and Travels`}
            wrapperClassName="h-56"
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/75 via-transparent to-transparent" />
          {typeof index === "number" && (
            <span className="glass-dark absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full font-display text-sm text-[var(--color-text-on-dark)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-card-title font-display text-[var(--color-ink)]">{service.name}</h3>
          <p className="mt-2 text-[17px] leading-relaxed text-[var(--color-text-muted)]">{service.tagline}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[16px] font-medium text-[var(--color-accent-2)]">
            View pricing &amp; details
            <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </Card>
  );
}
