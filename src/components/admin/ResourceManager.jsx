"use client";

import { useState } from "react";
import NextImage from "next/image";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

/**
 * Generic list + add/edit/delete UI for the admin CRUD-style pages
 * (Fleet, Destinations, Blog). State lives in the browser only — it resets
 * on refresh. This demonstrates the intended UX/architecture; wire each
 * `onSave`/`onDelete` to a real API + database before relying on it.
 */
export function ResourceManager({ title, fields, initialItems, columns, imageField = "image" }) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState(null); // item being edited, or {} for new
  const [draft, setDraft] = useState({});

  const openNew = () => {
    setDraft(Object.fromEntries(fields.map((f) => [f.name, f.default ?? ""])));
    setEditing({});
  };

  const openEdit = (item) => {
    setDraft(item);
    setEditing(item);
  };

  const save = (e) => {
    e.preventDefault();
    setItems((prev) => {
      const exists = prev.some((i) => i.slug === editing.slug && editing.slug);
      if (exists) return prev.map((i) => (i.slug === editing.slug ? { ...i, ...draft } : i));
      const slug = draft.slug || draft.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `item-${Date.now()}`;
      return [{ ...draft, slug }, ...prev];
    });
    setEditing(null);
  };

  const remove = (item) => {
    setItems((prev) => prev.filter((i) => i !== item));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-muted)]">{items.length} items</p>
        <button
          type="button"
          onClick={openNew}
          className="rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-[var(--color-text-on-dark)] hover:bg-[var(--color-ink-2)]"
        >
          + Add {title}
        </button>
      </div>

      <div className="mt-5 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-line)]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-[var(--color-paper-2)]">
            <tr className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              {imageField && <th className="px-4 py-3 font-medium">Image</th>}
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>
              ))}
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-line)] bg-[var(--color-paper)]">
            {items.map((item, i) => (
              <tr key={item.slug || i}>
                {imageField && (
                  <td className="px-4 py-2.5">
                    {item[imageField] ? (
                      <span className="relative block h-10 w-14 overflow-hidden rounded-md bg-[var(--color-paper-2)]">
                        <NextImage src={item[imageField]} alt="" fill className="object-cover" sizes="56px" />
                      </span>
                    ) : (
                      <span className="block h-10 w-14 rounded-md bg-[var(--color-paper-2)]" />
                    )}
                  </td>
                )}
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2.5 text-[var(--color-text)]">
                    {c.render ? c.render(item) : item[c.key]}
                  </td>
                ))}
                <td className="px-4 py-2.5 text-right">
                  <button type="button" onClick={() => openEdit(item)} className="mr-3 text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">
                    Edit
                  </button>
                  <button type="button" onClick={() => remove(item)} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.slug ? `Edit ${title}` : `Add ${title}`}>
        <form onSubmit={save} className="space-y-4">
          {fields.map((f) => (
            <label key={f.name} className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">{f.label}</span>
              {f.as === "textarea" ? (
                <textarea
                  rows={3}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
                  value={draft[f.name] ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.value }))}
                />
              ) : (
                <input
                  type="text"
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-line)] px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
                  value={draft[f.name] ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.name]: e.target.value }))}
                  placeholder={f.placeholder}
                />
              )}
            </label>
          ))}
          <div className={cn("flex gap-3 pt-2")}>
            <button type="submit" className="flex-1 rounded-[var(--radius-md)] bg-[var(--color-ink)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-on-dark)] hover:bg-[var(--color-ink-2)]">
              Save
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
