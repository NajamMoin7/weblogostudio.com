"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Check } from "lucide-react";
import { HONEYPOT_FIELD, budgetOptions, timelineOptions, validateQuote } from "@/lib/forms";
import { Field, FieldError, ConsentField, Honeypot, SelectControl, controlClasses, describedBy } from "./Fields";
import { useFormSubmission } from "./useFormSubmission";
import Button from "@/components/ui/Button";

/**
 * @param {{ serviceOptions: { group: string, items: { value: string, label: string }[] }[] }} props
 * Service options come from data/services.js via the page (server component).
 */
export default function QuoteForm({ serviceOptions }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allSlugs = serviceOptions.flatMap((g) => g.items.map((i) => i.value));
  const preselected = searchParams.get("service");

  const { values, errors, status, serverMessage, setValue, onBlur, submit, formRef } = useFormSubmission({
    endpoint: "/api/quote",
    initialValues: {
      name: "",
      email: "",
      business: "",
      services: allSlugs.includes(preselected) ? [preselected] : [],
      budget: "",
      timeline: "",
      description: "",
      referenceUrl: "",
      filesUrl: "",
      consent: false,
    },
    validate: (v) => validateQuote(v, allSlugs),
  });

  const text = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => setValue(name, e.target.value),
    onBlur: () => onBlur(name),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": describedBy(name, { error: errors[name] }),
  });

  function toggleService(slug) {
    const next = values.services.includes(slug)
      ? values.services.filter((s) => s !== slug)
      : [...values.services, slug];
    setValue("services", next);
  }

  const sectionTitle = "font-display-wide text-xl font-semibold";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => submit(e, () => router.push("/thank-you"))}
      className="relative grid gap-12"
    >
      <p className="text-sm text-subtle">
        Fields marked <span className="text-cyan">*</span> are required. It takes about three minutes.
      </p>

      <fieldset className="grid gap-6">
        <legend className={`${sectionTitle} mb-6`}>
          <span className="mr-3 font-mono text-xs text-cyan">01</span>About you
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="name" label="Full name" required error={errors.name}>
            <input {...text("name")} type="text" autoComplete="name" className={`${controlClasses(errors.name)} h-12`} />
          </Field>
          <Field id="email" label="Email address" required error={errors.email}>
            <input
              {...text("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              className={`${controlClasses(errors.email)} h-12`}
            />
          </Field>
        </div>
        <Field id="business" label="Business name" error={errors.business}>
          <input
            {...text("business")}
            type="text"
            autoComplete="organization"
            className={`${controlClasses(errors.business)} h-12`}
          />
        </Field>
      </fieldset>

      <fieldset
        className="grid gap-4"
        aria-invalid={Boolean(errors.services)}
        aria-describedby={describedBy("services", { hint: true, error: errors.services })}
      >
        <legend className={`${sectionTitle} mb-2`}>
          <span className="mr-3 font-mono text-xs text-cyan">02</span>Services required
          <span aria-hidden="true" className="ml-0.5 text-cyan">
            *
          </span>
        </legend>
        <p id="services-hint" className="text-sm text-subtle">
          Choose everything that applies.
        </p>
        <div className="grid gap-6">
          {serviceOptions.map((group) => (
            <div key={group.group}>
              <p className="eyebrow mb-3 text-subtle">{group.group}</p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((opt) => {
                  const checked = values.services.includes(opt.value);
                  return (
                    <li key={opt.value}>
                      <label
                        className={`flex h-full cursor-pointer select-none items-center gap-3 rounded-md border px-4 py-3 text-sm transition-[border-color,background-color] duration-150 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan ${
                          checked ? "border-cyan/60 bg-cyan/[0.07] text-fg" : "border-line-strong text-muted hover:border-fg/30 hover:text-fg"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={opt.value}
                          checked={checked}
                          onChange={() => toggleService(opt.value)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`grid size-4 shrink-0 place-items-center rounded-[4px] border transition-colors duration-150 ${
                            checked ? "border-orange-strong bg-orange-strong text-white" : "border-fg/30"
                          }`}
                        >
                          {checked && <Check className="size-3" strokeWidth={3} />}
                        </span>
                        {opt.label}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <FieldError id="services" error={errors.services} />
      </fieldset>

      <fieldset className="grid gap-6">
        <legend className={`${sectionTitle} mb-6`}>
          <span className="mr-3 font-mono text-xs text-cyan">03</span>Project details
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="budget" label="Project budget" required error={errors.budget}>
            <SelectControl
              id="budget"
              value={values.budget}
              onChange={(e) => setValue("budget", e.target.value)}
              onBlur={() => onBlur("budget")}
              options={budgetOptions}
              placeholder="Select a range"
              error={errors.budget}
            />
          </Field>
          <Field id="timeline" label="Expected timeline" required error={errors.timeline}>
            <SelectControl
              id="timeline"
              value={values.timeline}
              onChange={(e) => setValue("timeline", e.target.value)}
              onBlur={() => onBlur("timeline")}
              options={timelineOptions}
              placeholder="Select a timeline"
              error={errors.timeline}
            />
          </Field>
        </div>
        <Field
          id="description"
          label="Project description"
          required
          error={errors.description}
          hint="What do you need, who is it for, and what would success look like?"
        >
          <textarea
            {...text("description")}
            aria-describedby={describedBy("description", { hint: !errors.description, error: errors.description })}
            rows={7}
            className={`${controlClasses(errors.description)} resize-y py-3`}
          />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id="referenceUrl"
            label="Reference website"
            error={errors.referenceUrl}
            hint="Your current site, or one you admire."
          >
            <input
              {...text("referenceUrl")}
              aria-describedby={describedBy("referenceUrl", { hint: !errors.referenceUrl, error: errors.referenceUrl })}
              type="url"
              inputMode="url"
              placeholder="example.com"
              className={`${controlClasses(errors.referenceUrl)} h-12`}
            />
          </Field>
          <Field
            id="filesUrl"
            label="Link to files"
            error={errors.filesUrl}
            hint="Share briefs or brand files via Google Drive, Dropbox or similar."
          >
            <input
              {...text("filesUrl")}
              aria-describedby={describedBy("filesUrl", { hint: !errors.filesUrl, error: errors.filesUrl })}
              type="url"
              inputMode="url"
              placeholder="https://"
              className={`${controlClasses(errors.filesUrl)} h-12`}
            />
          </Field>
        </div>
      </fieldset>

      <div className="grid gap-6 border-t border-line pt-8">
        <ConsentField
          checked={values.consent}
          onChange={(e) => setValue("consent", e.target.checked)}
          error={errors.consent}
        />
        <Honeypot
          name={HONEYPOT_FIELD}
          value={values[HONEYPOT_FIELD]}
          onChange={(e) => setValue(HONEYPOT_FIELD, e.target.value)}
        />

        {status === "error" && (
          <div role="alert" className="flex gap-3 rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm text-fg">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
            <p>{serverMessage}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            fill
            swap
            loading={status === "submitting" || status === "success"}
            loadingLabel="Sending Request…"
            className="w-full sm:w-auto"
          >
            Request My Quote
          </Button>
          <p className="text-sm text-subtle">We reply with questions or a proposal. No obligation.</p>
          <span className="sr-only" aria-live="polite">
            {status === "submitting" ? "Sending your quote request" : ""}
          </span>
        </div>
      </div>
    </form>
  );
}
