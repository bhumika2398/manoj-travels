import { Reveal } from "@/components/ui/Reveal";

export function ServiceFeatures({ features, idealFor }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <Reveal>
        <h2 className="text-card-title font-display text-[var(--color-ink)]">Key Features</h2>
        <ul className="mt-5 space-y-3.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-[17px] leading-relaxed text-[var(--color-text-muted)]">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
              {feature}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="text-card-title font-display text-[var(--color-ink)]">Ideal For</h2>
        <ul className="mt-5 space-y-3.5">
          {idealFor.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[17px] leading-relaxed text-[var(--color-text-muted)]">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
