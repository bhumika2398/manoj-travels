import { cn } from "@/lib/utils";
import { Container } from "./Container";

const tones = {
  paper: "bg-[var(--color-paper)] text-[var(--color-text)]",
  sand: "bg-[var(--color-paper-2)] text-[var(--color-text)]",
  ink: "bg-[var(--color-ink)] text-[var(--color-text-on-dark)]",
};

export function Section({
  id,
  tone = "paper",
  className,
  containerClassName,
  children,
  ...props
}) {
  return (
    <section id={id} className={cn(tones[tone], "relative py-14 md:py-20", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
