const ITEMS = [
  "24 × 7 SERVICE",
  "RELIABLE TRAVEL",
  "LOCAL & OUTSTATION",
  "AIRPORT TRANSFERS",
  "COMFORTABLE JOURNEYS",
];

/** Slow, continuous horizontal marquee — a quiet mobility-brand signal strip. */
export function Marquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-[var(--color-line-accent)] bg-[var(--color-ink)] py-4">
      <div className="animate-marquee flex w-max items-center gap-8 motion-reduce:animate-none">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-[15px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-on-dark-muted)]">
            {item}
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
          </span>
        ))}
      </div>
    </div>
  );
}
