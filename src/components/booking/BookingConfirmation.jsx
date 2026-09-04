import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { cn } from "@/lib/utils";

export function BookingConfirmation({ className }) {
  return (
    <div
      className={cn(
        "glass-light w-full rounded-[var(--radius-lg)] p-8 text-center shadow-[var(--shadow-lift)]",
        className
      )}
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-ink)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="mt-4 text-h3 font-display text-[var(--color-ink)]">Enquiry received</h3>
      <p className="mx-auto mt-2.5 max-w-sm text-[17px] text-[var(--color-text-muted)]">
        Thank you — we&rsquo;ve received your request. For the fastest response, call or WhatsApp us directly.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <CallButton />
        <WhatsAppButton />
      </div>
    </div>
  );
}
