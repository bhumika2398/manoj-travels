"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section tone="paper" className="min-h-[70vh] flex items-center">
      <div className="text-center">
        <h1 className="font-display text-4xl text-[var(--color-ink)] md:text-5xl">
          Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[var(--color-text-muted)]">
          Please try again, or call us directly to complete your booking.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset()} variant="primary">Try Again</Button>
          <Button href="/contact" variant="outline">Contact Us</Button>
        </div>
      </div>
    </Section>
  );
}
