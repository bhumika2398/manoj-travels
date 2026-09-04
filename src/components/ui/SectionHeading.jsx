import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-eyebrow mb-4",
            tone === "dark" ? "text-[var(--color-accent-soft)]" : "text-[var(--color-accent-2)]"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-h2 font-display",
          tone === "dark" ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-ink)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lead mt-5 max-w-xl",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-[var(--color-text-on-dark-muted)]" : "text-[var(--color-text-muted)]"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
