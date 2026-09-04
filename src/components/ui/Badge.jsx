import { cn } from "@/lib/utils";

export function Badge({ children, tone = "light", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-3.5 py-1.5 text-[13px] font-medium uppercase tracking-wide",
        tone === "light"
          ? "border-[var(--color-line)] bg-[var(--color-paper-2)] text-[var(--color-text)]"
          : "border-[var(--color-line-on-dark)] bg-white/5 text-[var(--color-text-on-dark)]",
        className
      )}
    >
      {children}
    </span>
  );
}
