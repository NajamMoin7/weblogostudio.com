import { ChevronDown } from "lucide-react";

export const controlClasses = (error) =>
  `w-full rounded-lg border bg-surface px-4 text-fg placeholder:text-subtle/80 transition-[border-color,box-shadow] duration-150 ` +
  `focus:outline-none focus-visible:outline-none focus:ring-4 ` +
  (error ? "border-danger focus:border-danger focus:ring-danger/15" : "border-line-strong hover:border-fg/35 focus:border-brand focus:ring-brand/15");

export function describedBy(id, { hint, error }) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

export function FieldError({ id, error }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
      <span aria-hidden="true" className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-danger" />
      {error}
    </p>
  );
}

export function Field({ id, label, required, hint, error, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-medium text-fg">
        <span>
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-cyan">
              *
            </span>
          )}
        </span>
        {!required && <span className="text-xs font-normal text-subtle">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-subtle">
          {hint}
        </p>
      )}
      <FieldError id={id} error={error} />
    </div>
  );
}

export function SelectControl({ id, value, onChange, onBlur, options, placeholder, error, required }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, { error })}
        className={`${controlClasses(error)} h-12 appearance-none pr-10 ${value ? "" : "text-subtle"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface text-fg">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

/** Hidden field that only bots fill in. Kept off-screen and out of the tab order. */
export function Honeypot({ name, value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={name}>Leave this field empty</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
    </div>
  );
}

export function ConsentField({ id = "consent", checked, onChange, error }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, { error })}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-[#b4532a]"
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-muted">
          I have read the{" "}
          <a href="/privacy-policy" target="_blank" className="text-fg underline underline-offset-4 hover:text-cyan">
            privacy policy
          </a>{" "}
          and agree to Web Logo Studio using these details to respond to my enquiry.
          <span aria-hidden="true" className="ml-0.5 text-cyan">
            *
          </span>
        </label>
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}
