"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Image } from "@/components/ui/Image";
import { testimonials, TESTIMONIAL_PAGE_COUNT } from "@/data/testimonials";

const FLIP_MS = 650;

// Always TESTIMONIAL_PAGE_COUNT pages — real reviews fill the first slots,
// any remainder is a neutral, clearly-unfilled page rather than a
// fabricated placeholder quote.
const pages = Array.from({ length: TESTIMONIAL_PAGE_COUNT }, (_, i) => testimonials[i] ?? null);

function ReviewPage({ t }) {
  if (!t) {
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="font-display text-5xl leading-none text-[var(--color-line)]" aria-hidden="true">
          &ldquo;
        </p>
        <p className="text-lead mt-3 text-[var(--color-text-muted)]">
          This page hasn&rsquo;t been written yet — it&rsquo;s reserved for a genuine
          traveller&rsquo;s review.
        </p>
        <footer className="mt-6 text-eyebrow text-[var(--color-text-muted)]">Awaiting a review</footer>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <p className="font-display text-5xl leading-none text-[var(--color-accent)]" aria-hidden="true">
        &ldquo;
      </p>
      <p className="text-lead mt-3 text-[var(--color-ink)]">{t.quote}</p>
      <footer className="mt-6 text-eyebrow text-[var(--color-text-muted)]">
        {t.name}
        {t.location ? ` — ${t.location}` : ""}
      </footer>
    </div>
  );
}

/**
 * A premium "open book" testimonial journal — a fixed left page (a travel
 * photograph) beside a right page that physically turns to reveal each
 * review. Always shows TESTIMONIAL_PAGE_COUNT pages; any slot with no data
 * at all falls back to a neutral empty state.
 */
export function TestimonialBook() {
  const count = pages.length;
  const [index, setIndex] = useState(0);
  const [flap, setFlap] = useState(null); // { fromIndex, direction } while animating
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const go = (direction) => {
    if (flap) return; // ignore taps mid-flip
    const fromIndex = index;
    const nextIndex = direction === "next" ? (index + 1) % count : (index - 1 + count) % count;
    setIndex(nextIndex);
    setFlap({ fromIndex, direction });

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    timerRef.current = setTimeout(() => setFlap(null), reduceMotion ? 0 : FLIP_MS);
  };

  return (
    <Reveal
      variant="scale"
      className="relative mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-paper)] shadow-[var(--shadow-lift)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left page — a fixed travel photograph, the journal's cover. */}
        <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-[32rem]">
          <Image
            src="/images/destinations/kerala-alleppey.png"
            alt="A Kerala backwaters houseboat at sunset"
            wrapperClassName="h-full w-full"
            className="object-cover"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/70 via-[var(--color-ink)]/10 to-transparent"
          />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-eyebrow text-[var(--color-accent-soft)]">A Travel Journal</p>
            <p className="mt-2 font-display text-3xl text-[var(--color-text-on-dark)]">
              Stories from the road, page by page.
            </p>
          </div>
        </div>

        {/* Right page — the flipping leaf. */}
        <div className="book-stage relative border-t border-[var(--color-line)] p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-16">
          <div className="relative min-h-[16rem]">
            <div className="absolute inset-0">
              <ReviewPage t={pages[index]} />
            </div>
            {flap && (
              <div className={`book-page-flap absolute inset-0 bg-[var(--color-paper)] flip-${flap.direction}`}>
                <ReviewPage t={pages[flap.fromIndex]} />
              </div>
            )}
          </div>

          <div className="glass-light mt-10 flex items-center justify-between rounded-[var(--radius-full)] px-3 py-2">
            <button
              type="button"
              onClick={() => go("prev")}
              aria-label="Previous review"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent-2)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
              </svg>
            </button>

            <p className="text-eyebrow text-[var(--color-text-muted)]">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>

            <button
              type="button"
              onClick={() => go("next")}
              aria-label="Next review"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent-2)]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
