"use client";

import { useState } from "react";
import { formatINR } from "@/lib/utils";

const GROUP_LABELS = {
  "one-way": "One Way",
  local: "Local",
  "round-trip": "Outstation / Round Trip",
};

const FIELD_LABELS = {
  price: "Price (₹)",
  perKm: "Rate per km (₹)",
  extraKm: "Extra km (₹)",
  extraHour: "Extra hour (₹)",
  minKmPerDay: "Minimum km/day",
  driverBata: "Driver Bata / day (₹)",
};

function fieldsForTier(tier) {
  if (tier.type === "one-way") return ["price"];
  if (tier.type === "local") return ["price", "extraKm", "extraHour"];
  return ["perKm", "minKmPerDay", "driverBata"];
}

export function PricingManager({ tiers, airportMessage: initialAirportMessage, disabled }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(tiers.map((t) => [t.id, Object.fromEntries(fieldsForTier(t).map((f) => [f, t[f] ?? ""]))]))
  );
  const [airportMessage, setAirportMessage] = useState(initialAirportMessage || "");
  const [status, setStatus] = useState("idle"); // idle | saving | saved | error
  const [error, setError] = useState("");

  const groups = ["one-way", "local", "round-trip"].map((type) => ({
    type,
    label: GROUP_LABELS[type],
    tiers: tiers.filter((t) => t.type === type),
  }));

  const setField = (tierId, field, value) => {
    setValues((prev) => ({ ...prev, [tierId]: { ...prev[tierId], [field]: value } }));
  };

  const save = async (e) => {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tiers: values, airportMessage }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setStatus("error");
        setError(body.error || "Could not save pricing.");
        return;
      }
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setError("Something went wrong — please try again.");
    }
  };

  return (
    <form onSubmit={save} className="space-y-8">
      {groups.map((group) => (
        <div key={group.type}>
          <h2 className="mb-3 text-base font-semibold text-[var(--color-ink)]">{group.label}</h2>
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-line)]">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-[var(--color-paper-2)]">
                <tr className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                  <th className="px-4 py-2.5 font-medium">Vehicle</th>
                  {fieldsForTier(group.tiers[0] || { type: group.type }).map((f) => (
                    <th key={f} className="px-4 py-2.5 font-medium">{FIELD_LABELS[f]}</th>
                  ))}
                  <th className="px-4 py-2.5 font-medium">Currently showing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)] bg-[var(--color-paper)]">
                {group.tiers.map((tier) => (
                  <tr key={tier.id}>
                    <td className="whitespace-nowrap px-4 py-2.5 font-medium text-[var(--color-ink)]">
                      {tier.capacity} · {tier.vehicleHint}
                    </td>
                    {fieldsForTier(tier).map((field) => (
                      <td key={field} className="px-4 py-2.5">
                        <input
                          type="number"
                          min="0"
                          disabled={disabled}
                          value={values[tier.id]?.[field] ?? ""}
                          onChange={(e) => setField(tier.id, field, e.target.value)}
                          className="w-28 rounded-[var(--radius-sm)] border border-[var(--color-line)] px-2.5 py-1.5 text-sm focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
                        />
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-4 py-2.5 text-[var(--color-text-muted)]">
                      {tier.type === "round-trip"
                        ? `${formatINR(tier.perKm)}/km`
                        : formatINR(tier.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div>
        <h2 className="mb-3 text-base font-semibold text-[var(--color-ink)]">Airport Transfer</h2>
        <label className="block max-w-lg">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            Message shown instead of a fixed price
          </span>
          <textarea
            rows={2}
            disabled={disabled}
            value={airportMessage}
            onChange={(e) => setAirportMessage(e.target.value)}
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
          />
        </label>
      </div>

      {status === "error" && <p className="animate-fade-in text-sm text-[var(--color-danger)]">{error}</p>}
      {status === "saved" && <p className="animate-fade-in text-sm text-[var(--color-success)]">Pricing updated — live on the website now.</p>}

      <button
        type="submit"
        disabled={disabled || status === "saving"}
        className="rounded-[var(--radius-md)] bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold text-[var(--color-text-on-dark)] transition-colors hover:bg-[var(--color-ink-2)] disabled:opacity-50"
      >
        {status === "saving" ? "Saving…" : "Save Pricing"}
      </button>
    </form>
  );
}
