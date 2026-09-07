"use client";

import { useState } from "react";

const FIELDS = [
  { name: "phonePrimary", label: "Primary Phone", placeholder: "10-digit number, e.g. 9876543210", hint: "Also used for the WhatsApp button." },
  { name: "phoneSecondary", label: "Secondary / Alternate Phone", placeholder: "10-digit number" },
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

  return (
    <form onSubmit={save} className="max-w-lg space-y-5">
      {FIELDS.map((f) => (
        <label key={f.name} className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            {f.label}
          </span>
          {f.as === "textarea" ? (
            <textarea
              rows={3}
              disabled={disabled}
              value={values[f.name] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
            />
          ) : (
            <input
              type={f.type || "text"}
              disabled={disabled}
              placeholder={f.placeholder}
              value={values[f.name] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
            />
          )}
          {f.hint && <span className="mt-1 block text-xs text-[var(--color-text-muted)]">{f.hint}</span>}
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
