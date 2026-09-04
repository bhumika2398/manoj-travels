import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section tone="paper" className="min-h-[70vh] flex items-center">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-2)]">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl text-[var(--color-ink)] md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-text-muted)]">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Head back home or get in touch to book your ride.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">Back to Home</Button>
          <Button href="/contact" variant="outline">Contact Us</Button>
        </div>
      </div>
    </Section>
  );
}
