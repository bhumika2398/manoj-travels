import { cn } from "@/lib/utils";

export function Card({ className, glass = false, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border transition-all duration-300 ease-out hover:-translate-y-1",
        glass
          ? "glass-light shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]"
          : "border-[var(--color-line)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
