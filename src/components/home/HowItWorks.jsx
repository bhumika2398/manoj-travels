import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    step: "01",
    title: "Tell us your trip",
    detail: "Share pickup, drop, dates and passenger count via the booking form, call or WhatsApp.",
  },
  {
    step: "02",
    title: "We confirm the vehicle & fare",
    detail: "We recommend a suitable vehicle and share the applicable fare based on our current tariff.",
  },
  {
    step: "03",
    title: "Your driver arrives on time",
    detail: "We coordinate pickup timing with you directly, day or night.",
  },
  {
    step: "04",
    title: "Travel, worry-free",
    detail: "Sit back for a comfortable local, outstation or airport journey.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="sand" id="how-it-works">
      <SectionHeading
        align="center"
        eyebrow="How It Works"
        title="Booking a cab, simplified"
        className="mx-auto"
      />
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, index) => (
          <Reveal
            key={s.step}
            delay={index * 100}
            className="group relative rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper)] p-7 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="font-display text-4xl text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110">{s.step}</span>
            <h3 className="mt-4 font-display text-xl text-[var(--color-ink)]">{s.title}</h3>
            <p className="mt-2.5 text-[17px] leading-relaxed text-[var(--color-text-muted)]">{s.detail}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <CallButton />
        <WhatsAppButton />
      </div>
    </Section>
  );
}
