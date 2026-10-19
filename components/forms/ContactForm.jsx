"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { HONEYPOT_FIELD, validateContact } from "@/lib/forms";
import { Field, ConsentField, Honeypot, controlClasses, describedBy } from "./Fields";
import { useFormSubmission } from "./useFormSubmission";
import Button, { buttonClasses } from "@/components/ui/Button";

const EASE_OUT = [0.23, 1, 0.32, 1];

export default function ContactForm() {
  const { values, errors, status, serverMessage, setValue, onBlur, submit, reset, formRef } = useFormSubmission({
    endpoint: "/api/contact",
    initialValues: { name: "", email: "", subject: "", message: "", consent: false },
    validate: validateContact,
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

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="rounded-xl border border-line-strong bg-surface-2 p-8 sm:p-10"
        >
          <CheckCircle2 aria-hidden="true" className="size-8 text-success" />
          <h2 className="font-display-wide mt-5 text-2xl font-semibold">Thanks, your message has been sent.</h2>
          <p className="mt-3 max-w-md leading-relaxed text-muted">
            We have received your message and will reply to {values.email} as soon as we can.
          </p>
          <button type="button" onClick={reset} className={buttonClasses({ variant: "secondary", className: "mt-8" })}>
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={(e) => submit(e)}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          className="relative grid gap-6"
          aria-describedby="contact-required-note"
        >
          <p id="contact-required-note" className="text-sm text-subtle">
            Fields marked <span className="text-cyan">*</span> are required.
          </p>
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
          <Field id="subject" label="Subject" required error={errors.subject}>
            <input {...text("subject")} type="text" className={`${controlClasses(errors.subject)} h-12`} />
          </Field>
          <Field id="message" label="Message" required error={errors.message}>
            <textarea {...text("message")} rows={6} className={`${controlClasses(errors.message)} resize-y py-3`} />
          </Field>
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

          <div>
            <Button
              type="submit"
              size="lg"
              fill
              swap
              loading={status === "submitting"}
              loadingLabel="Sending…"
              className="w-full sm:w-auto"
            >
              Send Message
            </Button>
            <span className="sr-only" aria-live="polite">
              {status === "submitting" ? "Sending your message" : ""}
            </span>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
