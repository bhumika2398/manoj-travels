import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminCard({ className, children }) {
  return (
    <div className={cn("glass-light rounded-[var(--radius-lg)] p-5", className)}>
      {children}
    </div>
  );
}

export function AdminStat({ label, value, href, hint }) {
  const content = (
    <AdminCard className={href ? "transition-colors hover:border-[var(--color-taupe-soft)]" : undefined}>
      <p className="text-sm font-medium text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">{value}</p>
      {hint && <p className="mt-1 text-xs text-[var(--color-text-muted)]">{hint}</p>}
    </AdminCard>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export function StatusBadge({ status }) {
  const styles = {
    new: "bg-amber-50 text-amber-700 border-amber-200",
    contacted: "bg-blue-50 text-blue-700 border-blue-200",
    closed: "bg-[var(--color-paper-2)] text-[var(--color-text-muted)] border-[var(--color-line)]",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize", styles[status] || styles.new)}>
      {status || "new"}
    </span>
  );
}
