import { Button } from "@/components/ui/Button";
import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export function ServiceCTA({ service }) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--color-ink)] p-8 text-center text-[var(--color-text-on-dark)] md:p-12">
      <h2 className="text-h3 font-display">Book {service.name} with Manoj Tours and Travels</h2>
      <p className="mx-auto mt-3 max-w-md text-[var(--color-text-on-dark-muted)]">
        Call, WhatsApp or send an enquiry — we&rsquo;ll confirm your vehicle and fare right away.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button href="/contact" variant="accent" size="lg">
          Enquire Now
        </Button>
        <CallButton variant="inline" />
        <WhatsAppButton
          variant="inline"
          message={`Hello Manoj Tours and Travels, I would like to enquire about ${service.name}.`}
        />
      </div>
    </div>
  );
}
