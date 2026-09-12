"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { formatINR } from "@/lib/utils";

const EMPTY_DRAFT = { title: "", description: "", price: "", priceUnit: "per head", active: true };

export function TourPackagesManager({ initialPackages, disabled }) {
  const [packages, setPackages] = useState(initialPackages);
  const [editing, setEditing] = useState(null); // package being edited, or {} for new
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const openNew = () => {
    setDraft(EMPTY_DRAFT);
    setError("");
    setEditing({});
  };

  const openEdit = (pkg) => {
    setDraft({ title: pkg.title, description: pkg.description || "", price: pkg.price, priceUnit: pkg.priceUnit || "per head", active: pkg.active !== false });
    setError("");
    setEditing(pkg);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const isNew = !editing?.id;
      const res = await fetch("/api/admin/tours", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? draft : { id: editing.id, ...draft }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setError(body.error || "Could not save the package.");
        return;
      }
      setPackages(body.packages);
      setEditing(null);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (pkg) => {
    if (!window.confirm(`Delete "${pkg.title}"? This can't be undone.`)) return;
    setBusyId(pkg.id);
    try {
      const res = await fetch("/api/admin/tours", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pkg.id }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) setPackages(body.packages);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-muted)]">{packages.length} package{packages.length === 1 ? "" : "s"}</p>
        <button
          type="button"
          onClick={openNew}
          disabled={disabled}
          className="rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-text-on-dark)] hover:bg-[var(--color-ink-2)] disabled:opacity-50"
        >
          + Add Package
        </button>
      </div>

      <div className="mt-5 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-line)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-[var(--color-paper-2)]">
            <tr className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-line)] bg-[var(--color-paper)]">
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td className="px-4 py-2.5">
                  <p className="font-medium text-[var(--color-ink)]">{pkg.title}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-text-muted)]">{pkg.description}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-[var(--color-text)]">
                  {formatINR(pkg.price)} {pkg.priceUnit}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={
                      pkg.active !== false
                        ? "inline-flex items-center rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-success)]"
                        : "inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper-2)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-muted)]"
                    }
                  >
                    {pkg.active !== false ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button type="button" disabled={disabled} onClick={() => openEdit(pkg)} className="mr-3 text-[var(--color-text-muted)] hover:text-[var(--color-ink)] disabled:opacity-50">
                    Edit
                  </button>
                  <button
                    type="button"
                    disabled={disabled || busyId === pkg.id}
                    onClick={() => remove(pkg)}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    {busyId === pkg.id ? "Deleting…" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-[var(--color-text-muted)]">
                  No tour packages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? "Edit Package" : "Add Package"}>
        <form onSubmit={save} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">Title</span>
            <input
              type="text"
              required
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              placeholder="e.g. Bangalore to Mysore One-Way Sightseeing"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">Description</span>
            <textarea
              rows={3}
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
              value={draft.description}
              onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">Price (₹)</span>
              <input
                type="number"
                min="0"
                required
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
                value={draft.price}
                onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">Price Unit</span>
              <input
                type="text"
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
                value={draft.priceUnit}
                onChange={(e) => setDraft((d) => ({ ...d, priceUnit: e.target.value }))}
                placeholder="per head"
              />
            </label>
          </div>
          <label className="flex items-center gap-2.5">
            <input
              type="checkbox"
              checked={draft.active !== false}
              onChange={(e) => setDraft((d) => ({ ...d, active: e.target.checked }))}
              className="h-4 w-4 rounded border-[var(--color-line)]"
            />
            <span className="text-sm text-[var(--color-text)]">Visible on the public website</span>
          </label>

          {error && <p className="animate-fade-in text-sm text-[var(--color-danger)]">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="flex-1 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-on-dark)] hover:bg-[var(--color-ink-2)] disabled:opacity-50">
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-[var(--radius-md)] border border-[var(--color-line)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-paper-2)]"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
