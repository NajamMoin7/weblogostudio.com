"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, ImagePlus, Upload, X } from "lucide-react";
import { HONEYPOT_FIELD, INTAKE_LIMITS, validateIntake } from "@/lib/forms";
import { fileBytes, prepareFile } from "@/lib/files";
import { Field, FieldError, Honeypot, controlClasses, describedBy } from "./Fields";
import { useFormSubmission } from "./useFormSubmission";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

const EASE_OUT = [0.16, 1, 0.3, 1];

function kb(bytes) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function Thumb({ file, onRemove, label }) {
  const isImage = file.type.startsWith("image/") && file.type !== "image/svg+xml";
  return (
    <li className="relative flex items-center gap-3 rounded-md border border-line-strong bg-surface p-2 pr-10">
      <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded bg-surface-2">
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`data:${file.type};base64,${file.data}`} alt="" className="size-full object-cover" />
        ) : (
          <span className="caption uppercase">{file.type.split("/")[1]?.replace("svg+xml", "svg")}</span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-fg">{file.name}</span>
        <span className="caption">{kb(fileBytes(file))}</span>
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-muted hover:bg-fg/5 hover:text-fg"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </li>
  );
}

export default function IntakeForm({ sessionId, defaults = {} }) {
  const { values, errors, status, serverMessage, setValue, getValues, onBlur, submit, formRef } = useFormSubmission({
    endpoint: "/api/intake",
    initialValues: {
      sessionId,
      businessName: "",
      businessType: "",
      contactName: defaults.name ?? "",
      phone: defaults.phone ?? "",
      email: defaults.email ?? "",
      address: "",
      hours: "",
      notes: "",
      logo: null,
      photos: [],
    },
    validate: validateIntake,
  });
  const [busy, setBusy] = useState(null);
  const [fileError, setFileError] = useState("");
  const logoInput = useRef(null);
  const photoInput = useRef(null);

  const text = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => setValue(name, e.target.value),
    onBlur: () => onBlur(name),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": describedBy(name, { error: errors[name] }),
  });

  async function onLogo(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setFileError("");
    setBusy("logo");
    try {
      setValue("logo", await prepareFile(file, "logo"));
    } catch (err) {
      setFileError(err.message);
    } finally {
      setBusy(null);
    }
  }

  async function onPhotos(e) {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!picked.length) return;
    setFileError("");
    const room = INTAKE_LIMITS.maxPhotos - getValues().photos.length;
    if (picked.length > room) setFileError(`Up to ${INTAKE_LIMITS.maxPhotos} photos. We kept the first ${Math.max(room, 0)}.`);
    setBusy("photos");
    for (const file of picked.slice(0, Math.max(room, 0))) {
      try {
        const prepared = await prepareFile(file, "photo");
        // Append to the latest list, so a logo or another batch finishing meanwhile is kept.
        setValue("photos", [...getValues().photos, prepared].slice(0, INTAKE_LIMITS.maxPhotos));
      } catch (err) {
        setFileError(err.message);
      }
    }
    setBusy(null);
  }

  const totalBytes = fileBytes(values.logo) + values.photos.reduce((n, p) => n + fileBytes(p), 0);

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="rounded-xl border border-line-strong bg-surface p-8 sm:p-10"
      >
        <CheckCircle2 aria-hidden="true" className="size-9 text-success" />
        <h2 className="font-display-wide mt-5 text-[2rem] font-bold leading-tight">Got it. The 2-hour clock is running.</h2>
        <p className="mt-3 max-w-lg leading-relaxed text-muted">
          We have your details for {values.businessName}. Your first concept goes to {values.email} within 2 hours during
          business hours (Mon–Fri, 9am–6pm ET). Sent outside those hours? The clock starts at 9am ET on the next business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={(e) => submit(e)} className="relative grid gap-6" aria-describedby="intake-note">
      <p id="intake-note" className="text-sm text-subtle">
        Fields marked <span className="text-cyan">*</span> are required. Everything else helps us get the first concept right.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="businessName" label="Business name" required error={errors.businessName}>
          <input {...text("businessName")} type="text" autoComplete="organization" className={`${controlClasses(errors.businessName)} h-12`} />
        </Field>
        <Field id="businessType" label="Business type" required error={errors.businessType} hint="e.g. plumber, nail salon, dental clinic">
          <input {...text("businessType")} type="text" className={`${controlClasses(errors.businessType)} h-12`} />
        </Field>
        <Field id="contactName" label="Your name" required error={errors.contactName}>
          <input {...text("contactName")} type="text" autoComplete="name" className={`${controlClasses(errors.contactName)} h-12`} />
        </Field>
        <Field id="phone" label="Phone" required error={errors.phone}>
          <input {...text("phone")} type="tel" inputMode="tel" autoComplete="tel" className={`${controlClasses(errors.phone)} h-12`} />
        </Field>
        <Field id="email" label="Email" required error={errors.email} hint="Your concept is sent here.">
          <input {...text("email")} type="email" inputMode="email" autoComplete="email" className={`${controlClasses(errors.email)} h-12`} />
        </Field>
        <Field id="address" label="Business address" error={errors.address} hint="Shown on the map. Skip if you work from home.">
          <input {...text("address")} type="text" autoComplete="street-address" className={`${controlClasses(errors.address)} h-12`} />
        </Field>
      </div>

      <Field id="hours" label="Business hours" error={errors.hours} hint="e.g. Mon–Fri 8–6, Sat 9–2, closed Sunday">
        <textarea {...text("hours")} rows={3} className={`${controlClasses(errors.hours)} resize-y py-3`} />
      </Field>

      {/* Files */}
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Logo and photos</legend>
        <div>
          <p className="mb-2 flex items-baseline justify-between text-sm font-medium text-fg">
            Logo <span className="text-xs font-normal text-subtle">Optional</span>
          </p>
          {values.logo ? (
            <ul>
              <Thumb file={values.logo} label="logo" onRemove={() => setValue("logo", null)} />
            </ul>
          ) : (
            <button
              type="button"
              onClick={() => logoInput.current?.click()}
              disabled={busy === "logo"}
              className="flex h-[4.5rem] w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed border-line-strong text-sm font-semibold text-fg transition-colors hover:border-fg hover:bg-fg/[0.03]"
            >
              {busy === "logo" ? <Spinner size={16} /> : <Upload aria-hidden="true" className="size-4" />}
              {busy === "logo" ? "Preparing…" : "Upload logo"}
            </button>
          )}
          <input ref={logoInput} type="file" accept="image/*,.svg,.pdf" className="sr-only" tabIndex={-1} onChange={onLogo} aria-label="Upload logo" />
          <p className="caption mt-2">PNG, JPG, SVG or PDF. No logo yet? We will set your name in type.</p>
        </div>

        <div>
          <p className="mb-2 flex items-baseline justify-between text-sm font-medium text-fg">
            Photos <span className="text-xs font-normal text-subtle">Up to {INTAKE_LIMITS.maxPhotos}</span>
          </p>
          {values.photos.length > 0 && (
            <ul className="mb-2 grid gap-2">
              {values.photos.map((p, i) => (
                <Thumb
                  key={`${p.name}-${i}`}
                  file={p}
                  label={`photo ${i + 1}`}
                  onRemove={() => setValue("photos", values.photos.filter((_, j) => j !== i))}
                />
              ))}
            </ul>
          )}
          {values.photos.length < INTAKE_LIMITS.maxPhotos && (
            <button
              type="button"
              onClick={() => photoInput.current?.click()}
              disabled={busy === "photos"}
              className="flex h-[4.5rem] w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed border-line-strong text-sm font-semibold text-fg transition-colors hover:border-fg hover:bg-fg/[0.03]"
            >
              {busy === "photos" ? <Spinner size={16} /> : <ImagePlus aria-hidden="true" className="size-4" />}
              {busy === "photos" ? "Preparing photos…" : values.photos.length ? "Add more photos" : "Add photos"}
            </button>
          )}
          <input ref={photoInput} type="file" accept="image/*" multiple className="sr-only" tabIndex={-1} onChange={onPhotos} aria-label="Add photos" />
          <p className="caption mt-2">Storefront, team, your work. Photos are resized on your phone before upload.</p>
        </div>
        <div className="sm:col-span-2" aria-live="polite">
          {(fileError || errors.photos) && <FieldError id="photos" error={fileError || errors.photos} />}
          {totalBytes > 0 && <p className="caption">Total upload {kb(totalBytes)}</p>}
        </div>
      </fieldset>

      <Field id="notes" label="Notes" error={errors.notes} hint="Services and prices to list, colours you like, sites you admire, anything else.">
        <textarea {...text("notes")} rows={5} className={`${controlClasses(errors.notes)} resize-y py-3`} />
      </Field>

      <Honeypot name={HONEYPOT_FIELD} value={values[HONEYPOT_FIELD]} onChange={(e) => setValue(HONEYPOT_FIELD, e.target.value)} />

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 rounded-md border border-danger/40 bg-danger/10 p-4 text-sm text-fg"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
            <p>{serverMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <Button
          type="submit"
          size="xl"
          fill
          arrow
          loading={status === "submitting"}
          loadingLabel="Sending your details…"
          disabled={Boolean(busy)}
          className="w-full sm:w-auto"
        >
          Send my details
        </Button>
        <p className="caption mt-3">Your details are used only to build your site. See our privacy policy.</p>
        <span className="sr-only" aria-live="polite">
          {status === "submitting" ? "Sending your details" : ""}
        </span>
      </div>
    </form>
  );
}
