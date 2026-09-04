import { business } from "@/config/business.config";

const items = [
  { label: business.availabilityLabel, detail: "Call, WhatsApp or book online anytime" },
  { label: "Local & Outstation", detail: "One way, round trip and local packages" },
  { label: "Airport Transfers", detail: "Pickup & drop, day or night" },
  { label: "Professionally Driven", detail: "Sedans, SUVs and Tempo Traveller" },
];

export function TrustStrip() {
  return (
    <div className="border-y border-[var(--color-line)] bg-[var(--color-paper-2)]">
      <div className="container-edge mx-auto grid max-w-7xl grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-8 md:py-10">
        {items.map((item) => (
          <div key={item.label}>
            <p className="font-display text-2xl text-[var(--color-ink)]">{item.label}</p>
            <p className="mt-1.5 text-[16px] text-[var(--color-text-muted)]">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
