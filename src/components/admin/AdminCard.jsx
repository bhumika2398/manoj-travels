import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminCard({ className, children }) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-5 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function AdminStat({ label, value, href, hint }) {
  const content = (
    <AdminCard className={href ? "transition-colors hover:border-gray-300" : undefined}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </AdminCard>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export function StatusBadge({ status }) {
  const styles = {
    new: "bg-amber-50 text-amber-700 border-amber-200",
    contacted: "bg-blue-50 text-blue-700 border-blue-200",
    closed: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize", styles[status] || styles.new)}>
      {status || "new"}
    </span>
  );
}
