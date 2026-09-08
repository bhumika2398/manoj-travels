"use client";

import { useState } from "react";

const FIELDS = [
  { name: "phonePrimary", label: "Contact Number 1", placeholder: "10-digit number, e.g. 9876543210" },
  { name: "phoneSecondary", label: "Contact Number 2", placeholder: "10-digit number" },
];

const CONTACT_FIELDS = [
  { name: "email", label: "Email", type: "email" },
  { name: "addressFull", label: "Address", as: "textarea" },
];

export function SettingsForm({ initial, disabled }) {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const save = async (e) => {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setStatus("error");
        setError(body.error || "Could not save.");
        return;
      }
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setError("Something went wrong — please try again.");
    }
  };

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  return (
    <form onSubmit={save} className="max-w-lg space-y-5">
      {FIELDS.map((f) => (
        <label key={f.name} className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            {f.label}
          </span>
          <input
            type="text"
            disabled={disabled}
            placeholder={f.placeholder}
            value={values[f.name] ?? ""}
            onChange={(e) => setField(f.name, e.target.value)}
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
          />
        </label>
      ))}

      {/* Active Website Contact Number — which of the two numbers above is
          actually used for the site's single-number call CTAs (navbar,
          Call buttons). Both Contact Number 1 and 2 stay visible/editable
          in the Footer and Contact page regardless of this choice. */}
      <fieldset className="block" disabled={disabled}>
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
          Active Website Contact Number
        </span>
        <div className="flex flex-col gap-2">
          {[
            { value: "primary", label: `Contact Number 1${values.phonePrimary ? ` (${values.phonePrimary})` : ""}` },
            { value: "secondary", label: `Contact Number 2${values.phoneSecondary ? ` (${values.phoneSecondary})` : ""}` },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
              <input
                type="radio"
                name="activeNumber"
                value={opt.value}
                checked={(values.activeNumber || "primary") === opt.value}
                onChange={() => setField("activeNumber", opt.value)}
                disabled={disabled}
                className="h-4 w-4 accent-[var(--color-ink)]"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
          WhatsApp Enquiry Number
        </span>
        <input
          type="text"
          disabled={disabled}
          placeholder="10-digit number, e.g. 7899787478"
          value={values.whatsappNumber ?? ""}
          onChange={(e) => setField("whatsappNumber", e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
        />
        <span className="mt-1 block text-xs text-[var(--color-text-muted)]">
          Used only by the site&rsquo;s WhatsApp button — independent of the phone numbers above.
        </span>
      </label>

      {CONTACT_FIELDS.map((f) => (
        <label key={f.name} className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            {f.label}
          </span>
          {f.as === "textarea" ? (
            <textarea
              rows={3}
              disabled={disabled}
              value={values[f.name] ?? ""}
              onChange={(e) => setField(f.name, e.target.value)}
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
            />
          ) : (
            <input
              type={f.type || "text"}
              disabled={disabled}
              value={values[f.name] ?? ""}
              onChange={(e) => setField(f.name, e.target.value)}
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
            />
          )}
        </label>
      ))}

      {status === "error" && <p className="animate-fade-in text-sm text-[var(--color-danger)]">{error}</p>}
      {status === "saved" && <p className="animate-fade-in text-sm text-[var(--color-success)]">Saved — live on the website now.</p>}

      <button
        type="submit"
        disabled={disabled || status === "saving"}
        className="rounded-[var(--radius-md)] bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold text-[var(--color-text-on-dark)] transition-colors hover:bg-[var(--color-ink-2)] disabled:opacity-50"
      >
        {status === "saving" ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
