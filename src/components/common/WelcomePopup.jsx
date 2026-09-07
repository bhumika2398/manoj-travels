"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "manoj-welcome-popup-shown";
const SHOW_DELAY_MS = 1800;

/**
 * A one-time welcome/enquiry popup — appears shortly after the page has
 * already loaded and painted (pure client-side state + setTimeout, so it
 * never blocks or delays the site itself), then never again for the rest
 * of the browser session (sessionStorage, not localStorage — a new visit
 * next time the browser is opened sees it again, but it won't nag someone
 * browsing around the site right now).
 */
export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Storage unavailable (privacy mode, etc.) — fall through and show
      // once for this page load rather than crash.
    }
    if (alreadyShown) return undefined;

    const timer = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore — worst case it can show again this session.
      }
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const close = () => setOpen(false);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Manoj Tours and Travels"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="Close welcome popup"
        onClick={close}
        className="animate-fade-in absolute inset-0 bg-[var(--color-ink)]/70 backdrop-blur-sm"
      />

      <div className="animate-fade-up glass-dark relative w-full max-w-md rounded-[var(--radius-xl)] px-7 py-10 text-center shadow-[var(--shadow-lift)] sm:px-10 sm:py-12">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-text-on-dark-muted)] transition-colors hover:bg-white/10 hover:text-[var(--color-text-on-dark)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p className="text-eyebrow text-[var(--color-accent-soft)]">Manoj Tours &amp; Travels</p>
        <h2 className="text-balance mt-4 text-h3 font-display text-[var(--color-text-on-dark)]">
          Your journey, beautifully handled.
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-text-on-dark-muted)]">
          One way, round trip, local and airport cabs across Bangalore, available 24 × 7 — tell
          us where you&rsquo;re headed and we&rsquo;ll confirm the vehicle and fare directly.
        </p>

        <div className="mt-7 flex justify-center">
          <Button href="/fleet" variant="accent" size="lg" onClick={close}>
            Book / Enquire Now
          </Button>
        </div>
      </div>
    </div>
  );
}
