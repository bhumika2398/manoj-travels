"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Modal({ open, onClose, title, children, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[var(--color-ink)]/60 backdrop-blur-sm"
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          "glass-light relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-[var(--radius-lg)] p-6 shadow-[var(--shadow-lift)] outline-none sm:rounded-[var(--radius-lg)] sm:p-8",
          className
        )}
      >
        {title && (
          <h2 className="mb-4 text-card-title font-display text-[var(--color-ink)]">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
