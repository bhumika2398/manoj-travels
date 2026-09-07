"use client";

import { useState } from "react";
import NextImage from "next/image";

function ImageRow({ image, disabled, onChanged }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputId = `upload-${image.key}`;

  const upload = async (file) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("key", image.key);
      formData.append("file", file);
      const res = await fetch("/api/admin/images", { method: "POST", body: formData });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setError(body.error || "Upload failed.");
        return;
      }
      onChanged(image.key, body.url);
    } catch {
      setError("Upload failed — please try again.");
    } finally {
      setBusy(false);
    }
  };

  const revert = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: image.key }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setError(body.error || "Could not revert.");
        return;
      }
      onChanged(image.key, image.originalUrl, false);
    } catch {
      setError("Could not revert — please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] p-4 sm:flex-row sm:items-center">
      <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-paper-2)]">
        <NextImage src={image.currentUrl} alt={image.label} fill className="object-cover" sizes="128px" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-[var(--color-ink)]">{image.label}</p>
        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
          {image.isOverridden ? "Custom image uploaded" : "Original site image"}
        </p>
        {error && <p className="animate-fade-in mt-1 text-xs text-[var(--color-danger)]">{error}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <label
          htmlFor={inputId}
          className="cursor-pointer rounded-[var(--radius-md)] border border-[var(--color-line)] px-3.5 py-2 text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-paper-2)] aria-disabled:pointer-events-none aria-disabled:opacity-50"
          aria-disabled={disabled || busy}
        >
          {busy ? "Working…" : "Upload new"}
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          disabled={disabled || busy}
          className="hidden"
          onChange={(e) => upload(e.target.files?.[0])}
        />
        {image.isOverridden && (
          <button
            type="button"
            disabled={disabled || busy}
            onClick={revert}
            className="rounded-[var(--radius-md)] px-3.5 py-2 text-xs font-medium text-[var(--color-danger)] hover:bg-[var(--color-paper-2)] disabled:opacity-50"
          >
            Revert
          </button>
        )}
      </div>
    </div>
  );
}

export function ImageManager({ initialImages, disabled }) {
  const [images, setImages] = useState(initialImages);

  const onChanged = (key, url, isOverridden = true) => {
    setImages((prev) => prev.map((img) => (img.key === key ? { ...img, currentUrl: url, isOverridden } : img)));
  };

  const groups = ["Fleet", "Destinations"].map((group) => ({
    group,
    items: images.filter((img) => img.group === group),
  }));

  return (
    <div className="space-y-8">
      {groups.map(({ group, items }) => (
        <div key={group}>
          <h2 className="mb-3 text-base font-semibold text-[var(--color-ink)]">{group}</h2>
          <div className="space-y-3">
            {items.map((image) => (
              <ImageRow key={image.key} image={image} disabled={disabled} onChanged={onChanged} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
