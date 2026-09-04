import { cn } from "@/lib/utils";

const baseInput =
  "w-full rounded-[var(--radius-md)] border border-[rgba(200,183,156,0.4)] bg-white/60 px-4 py-3.5 text-[17px] text-[var(--color-ink)] placeholder:text-[var(--color-text-muted)] backdrop-blur-sm transition-all duration-200 ease-out focus:-translate-y-px focus:border-[var(--color-accent)] focus:bg-white/85 focus:shadow-[0_0_0_4px_rgba(215,122,97,0.12)] focus:outline-none";

export function FormField({
  label,
  name,
  type = "text",
  as = "input",
  options,
  error,
  required,
  className,
  ...props
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-[14px] font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
        {label}
        {required && <span className="text-[var(--color-accent-2)]"> *</span>}
      </span>
      {as === "select" ? (
        <select id={name} name={name} className={cn(baseInput, "appearance-none")} required={required} {...props}>
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea id={name} name={name} rows={3} className={baseInput} required={required} {...props} />
      ) : (
        <input id={name} name={name} type={type} className={baseInput} required={required} {...props} />
      )}
      {error && <span className="animate-fade-in mt-1 block text-[14px] text-[var(--color-danger)]">{error}</span>}
    </label>
  );
}
