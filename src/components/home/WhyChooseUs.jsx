import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Video } from "@/components/ui/Video";
import { Reveal } from "@/components/ui/Reveal";

const ICONS = {
  clock: "M12 7v5l3 3M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
  tag: "M4 4h7l9 9-7 7-9-9V4Zm4 4h.01",
  car: "M4 16h16M5 16l1.5-5.5A2 2 0 0 1 8.4 9h7.2a2 2 0 0 1 1.9 1.5L19 16M6 16v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2m8 0v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2",
  map: "M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Zm0 0v14m6-12v14",
};

const points = [
  {
    icon: "clock",
    title: "Available 24 × 7",
    detail: "Call, WhatsApp or book online any time — day or night, including early morning airport runs.",
  },
  {
    icon: "tag",
    title: "Transparent Pricing",
    detail: "Clear per-km, package and one-way rates shown upfront, with extra charges spelled out.",
  },
  {
    icon: "car",
    title: "A Fleet for Every Trip",
    detail: "Sedans, SUVs and a Tempo Traveller — pick the right vehicle for your group size.",
  },
  {
    icon: "map",
    title: "Based in Bangalore",
    detail: "Rooted in Kanakapura Road, Bangalore, serving local, outstation and airport routes across Karnataka.",
  },
];

export function WhyChooseUs() {
  return (
    <Section tone="paper" id="why-choose-us">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Why Manoj Tours & Travels"
            title="Built around reliability, not gimmicks"
            description="A straightforward cab service — clear pricing, the right vehicle for your trip, and someone who picks up the phone."
          />
          <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {points.map((point, index) => (
              <Reveal as="div" key={point.title} delay={index * 90} className="group flex gap-4">
                <span className="glass-light flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[var(--color-accent-2)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--color-accent-soft)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[point.icon]} />
                  </svg>
                </span>
                <div>
                  <dt className="font-display text-2xl text-[var(--color-ink)]">{point.title}</dt>
                  <dd className="mt-1.5 text-[17px] leading-relaxed text-[var(--color-text-muted)]">{point.detail}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal variant="scale" className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)]">
          <Video src="/videos/sections/madikeri-glass-bridge.mp4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/55 via-transparent to-transparent" />
          <div className="glass-dark absolute inset-x-3 bottom-3 rounded-[var(--radius-md)] px-4 py-3">
            <p className="text-[14px] font-medium text-[var(--color-text-on-dark-muted)]">Coorg, Karnataka</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
