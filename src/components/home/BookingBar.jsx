"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { business, callLink } from "@/config/business.config";
import { PASSENGER_OPTIONS } from "@/lib/constants";

function FieldShell({ label, children }) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5 px-6 py-4">
      <span className="text-eyebrow text-[var(--color-text-on-dark-muted)]">{label}</span>
      {children}
    </label>
  );
}

const fieldInput =
  "w-full min-w-0 truncate bg-transparent text-[17px] font-medium text-[var(--color-text-on-dark)] placeholder:text-[var(--color-text-on-dark-muted)] placeholder:font-normal focus:outline-none [color-scheme:dark]";

/**
 * A wide, premium booking/search bar directly below the hero — replaces
 * the old video band. A dark espresso section holding one large glass
 * search bar; submitting carries the details through to the real Fleet
 * booking flow rather than duplicating it here.
 */
export function BookingBar() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set("pickup", pickup);
    if (drop) params.set("drop", drop);
    if (date) params.set("date", date);
    if (passengers) params.set("passengers", passengers);
    const query = params.toString();
    router.push(`/fleet${query ? `?${query}` : ""}`);
  };

  return (
    <section className="texture-grain relative overflow-hidden bg-[var(--color-ink)] py-16 md:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(216,180,160,0.14)_0%,transparent_60%)]"
      />
      <Container className="relative z-10">
        <Reveal className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/fleet" variant="accent" size="lg">
            Book Now
          </Button>
          <Button href={callLink()} variant="outline-dark" size="lg">
            Call {business.phone.primaryDisplay}
          </Button>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={onSearch}
            className="glass-dark mx-auto mt-10 flex max-w-6xl flex-col divide-y divide-[var(--color-line-on-dark)] overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lift)] lg:flex-row lg:flex-wrap lg:items-stretch lg:divide-x lg:divide-y-0"
          >
            <FieldShell label="Pickup Location">
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="e.g. Bangalore"
                className={fieldInput}
              />
            </FieldShell>
            <FieldShell label="Drop / Destination">
              <input
                type="text"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="e.g. Mysuru, Coorg…"
                className={fieldInput}
              />
            </FieldShell>
            <FieldShell label="Pickup Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={fieldInput}
              />
            </FieldShell>
            <FieldShell label="Passengers">
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className={`${fieldInput} appearance-none`}
              >
                <option value="" className="text-[var(--color-ink)]">Select</option>
                {PASSENGER_OPTIONS.map((p) => (
                  <option key={p} value={p} className="text-[var(--color-ink)]">
                    {p}
                  </option>
                ))}
              </select>
            </FieldShell>

            <div className="flex items-center p-3 lg:shrink-0">
              <button
                type="submit"
                className="glass-accent w-full shrink-0 rounded-[var(--radius-full)] px-9 py-4 text-[17px] font-semibold text-[var(--color-text-on-dark)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:translate-y-0 active:scale-[0.98] lg:w-auto"
              >
                Search
              </button>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
