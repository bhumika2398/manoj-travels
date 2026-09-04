"use client";

import { useMemo, useState } from "react";
import { StatusBadge } from "./AdminCard";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = ["all", "new", "contacted", "closed"];
const SOURCE_OPTIONS = ["all", "booking", "enquiry", "contact"];

export function EnquiriesTable({ enquiries }) {
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");

  const filtered = useMemo(
    () =>
      enquiries.filter(
        (e) =>
          (status === "all" || (e.status || "new") === status) &&
          (source === "all" || e.source === source)
      ),
    [enquiries, status, source]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">Status</label>
          <div className="flex gap-1.5">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  status === s ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-text-on-dark)]" : "border-[var(--color-line)] text-[var(--color-text-muted)] hover:border-[var(--color-taupe-soft)]"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">Source</label>
          <div className="flex gap-1.5">
            {SOURCE_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSource(s)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  source === s ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-text-on-dark)]" : "border-[var(--color-line)] text-[var(--color-text-muted)] hover:border-[var(--color-taupe-soft)]"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-line)]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[var(--color-paper-2)]">
            <tr className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Trip</th>
              <th className="px-4 py-3 font-medium">Pickup → Drop</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-line)] bg-[var(--color-paper)]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                  No enquiries match this filter.
                </td>
              </tr>
            ) : (
              filtered.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3 font-medium text-[var(--color-ink)]">{e.name || "—"}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{e.phone || "—"}</td>
                  <td className="px-4 py-3 capitalize text-[var(--color-text-muted)]">{e.tripType || "—"}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">
                    {[e.pickup, e.destination || e.drop].filter(Boolean).join(" → ") || "—"}
                  </td>
                  <td className="px-4 py-3 capitalize text-[var(--color-text-muted)]">{e.source}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[var(--color-text-muted)]">
                    {new Date(e.receivedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
