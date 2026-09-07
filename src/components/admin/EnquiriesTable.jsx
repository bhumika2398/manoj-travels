"use client";

import { Fragment, useMemo, useState } from "react";
import { StatusBadge } from "./AdminCard";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = ["all", "new", "contacted", "closed"];
const SOURCE_OPTIONS = ["all", "booking", "enquiry", "contact"];

export function EnquiriesTable({ enquiries: initialEnquiries }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const filtered = useMemo(
    () =>
      enquiries.filter(
        (e) =>
          (status === "all" || (e.status || "new") === status) &&
          (source === "all" || e.source === source)
      ),
    [enquiries, status, source]
  );

  const changeStatus = async (id, nextStatus) => {
    setSavingId(id);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: nextStatus } : e)));
      }
    } finally {
      setSavingId(null);
    }
  };

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
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-[var(--color-paper-2)]">
            <tr className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Trip</th>
              <th className="px-4 py-3 font-medium">Pickup → Drop</th>
              <th className="px-4 py-3 font-medium">Date / Time</th>
              <th className="px-4 py-3 font-medium">Vehicle</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-line)] bg-[var(--color-paper)]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                  No enquiries match this filter.
                </td>
              </tr>
            ) : (
              filtered.map((e) => (
                <Fragment key={e.id}>
                  <tr
                    onClick={() => setExpanded((cur) => (cur === e.id ? null : e.id))}
                    className="cursor-pointer hover:bg-[var(--color-paper-2)]/60"
                  >
                    <td className="px-4 py-3 font-medium text-[var(--color-ink)]">{e.name || "—"}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{e.phone || "—"}</td>
                    <td className="px-4 py-3 capitalize text-[var(--color-text-muted)]">{e.tripType || "—"}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)]">
                      {[e.pickup, e.destination || e.drop].filter(Boolean).join(" → ") || "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-[var(--color-text-muted)]">
                      {[e.date, e.time].filter(Boolean).join(" ") || "—"}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{e.vehicle || "—"}</td>
                    <td className="px-4 py-3 capitalize text-[var(--color-text-muted)]">{e.source}</td>
                    <td className="px-4 py-3" onClick={(evt) => evt.stopPropagation()}>
                      <select
                        value={e.status || "new"}
                        disabled={savingId === e.id}
                        onChange={(evt) => changeStatus(e.id, evt.target.value)}
                        className="rounded-full border border-[var(--color-line)] bg-transparent px-2 py-1 text-xs capitalize focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
                      >
                        {["new", "contacted", "closed"].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-[var(--color-text-muted)]">
                      {new Date(e.receivedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </td>
                  </tr>
                  {expanded === e.id && (
                    <tr className="bg-[var(--color-paper-2)]/50">
                      <td colSpan={9} className="px-4 py-4 text-[var(--color-text)]">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                          {e.email && <p><span className="font-medium">Email:</span> {e.email}</p>}
                          {e.passengers && <p><span className="font-medium">Passengers:</span> {e.passengers}</p>}
                          {e.hours && <p><span className="font-medium">Package:</span> {e.hours}</p>}
                          {e.returnDate && <p><span className="font-medium">Return date:</span> {e.returnDate}</p>}
                          {e.message && (
                            <p className="sm:col-span-2"><span className="font-medium">Message:</span> {e.message}</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
