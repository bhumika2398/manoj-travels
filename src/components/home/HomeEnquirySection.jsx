import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BookingForm } from "@/components/booking/BookingForm";
import { business } from "@/config/business.config";

/**
 * The homepage's primary contact/booking surface — directly below the
 * hero. A dark, glass-panelled enquiry form (segmented trip-type selector,
 * conditional fields, real fleet vehicles) so a visitor can book without
 * leaving the homepage. This is the site's one homepage enquiry form —
 * the Fleet, Contact and Destination pages keep their own, unduplicated.
 */
export function HomeEnquirySection() {
  return (
    <section id="enquiry" className="texture-grain relative overflow-hidden bg-[var(--color-ink)] py-14 md:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(216,180,160,0.14)_0%,transparent_60%)]"
      />
      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-[var(--color-accent-soft)]">{business.availabilityLabel}</p>
          <h2 className="text-h2 mt-4 font-display text-[var(--color-text-on-dark)]">
            Book your cab in minutes
          </h2>
          <p className="text-lead mt-4 text-[var(--color-text-on-dark-muted)]">
            Choose your trip type, tell us where you&rsquo;re headed, and we&rsquo;ll confirm the vehicle and fare directly.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-10 max-w-3xl">
          <BookingForm />
        </Reveal>
      </Container>
    </section>
  );
}
