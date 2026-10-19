/**
 * Shared form definitions and validation.
 * Imported by the client forms (instant feedback) and the API routes
 * (authoritative checks), so the rules can never drift apart.
 */

export const budgetOptions = [
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-3k", label: "$1,000 to $3,000" },
  { value: "3k-7k", label: "$3,000 to $7,500" },
  { value: "7k-15k", label: "$7,500 to $15,000" },
  { value: "15k-plus", label: "$15,000 or more" },
  { value: "unsure", label: "Not sure yet" },
];

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "In 1 to 3 months" },
  { value: "3-plus-months", label: "In 3 months or more" },
  { value: "flexible", label: "Flexible" },
];

/** Name of the hidden honeypot field. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = "company_website";

/** Submissions faster than this are almost certainly automated. */
export const MIN_FILL_MS = 2500;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v) {
  return typeof v === "string" ? v.trim() : "";
}

function isUrl(v) {
  try {
    const u = new URL(v.startsWith("http") ? v : `https://${v}`);
    return Boolean(u.hostname.includes("."));
  } catch {
    return false;
  }
}

function checkText(errors, key, value, { label, min = 0, max = 200, required = true, tooShort }) {
  if (!value) {
    if (required) errors[key] = `Please enter ${label}.`;
    return;
  }
  if (value.length < min) errors[key] = tooShort ?? `Please enter at least ${min} characters.`;
  else if (value.length > max) errors[key] = `Please keep this under ${max} characters.`;
}

export function normalizeContact(raw = {}) {
  return {
    name: str(raw.name),
    email: str(raw.email),
    subject: str(raw.subject),
    message: str(raw.message),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}

export function validateContact(raw) {
  const d = normalizeContact(raw);
  const errors = {};
  checkText(errors, "name", d.name, { label: "your name", min: 2, max: 100, tooShort: "Please enter your full name." });
  if (!d.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(d.email) || d.email.length > 254) errors.email = "Please enter a valid email address, like name@company.com.";
  checkText(errors, "subject", d.subject, { label: "a subject", min: 3, max: 150, tooShort: "Please use a slightly longer subject." });
  checkText(errors, "message", d.message, { label: "a message", min: 20, max: 5000, tooShort: "Please write at least 20 characters so we can help." });
  if (!d.consent) errors.consent = "Please confirm you have read the privacy policy.";
  return { data: d, errors, valid: Object.keys(errors).length === 0 };
}

export function normalizeQuote(raw = {}) {
  const services = Array.isArray(raw.services) ? raw.services.filter((s) => typeof s === "string") : [];
  return {
    name: str(raw.name),
    email: str(raw.email),
    business: str(raw.business),
    services: [...new Set(services)],
    budget: str(raw.budget),
    timeline: str(raw.timeline),
    description: str(raw.description),
    referenceUrl: str(raw.referenceUrl),
    filesUrl: str(raw.filesUrl),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
  };
}

export function validateQuote(raw, validServiceSlugs = []) {
  const d = normalizeQuote(raw);
  const errors = {};
  checkText(errors, "name", d.name, { label: "your name", min: 2, max: 100, tooShort: "Please enter your full name." });
  if (!d.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(d.email) || d.email.length > 254) errors.email = "Please enter a valid email address, like name@company.com.";
  checkText(errors, "business", d.business, { label: "a business name", max: 150, required: false });
  if (d.services.length === 0) errors.services = "Please choose at least one service.";
  else if (validServiceSlugs.length && d.services.some((s) => !validServiceSlugs.includes(s)))
    errors.services = "Please choose services from the list.";
  if (!budgetOptions.some((o) => o.value === d.budget)) errors.budget = "Please choose a budget range.";
  if (!timelineOptions.some((o) => o.value === d.timeline)) errors.timeline = "Please choose a timeline.";
  checkText(errors, "description", d.description, { label: "a short project description", min: 30, max: 5000, tooShort: "Please add a little more detail, at least 30 characters." });
  if (d.referenceUrl && (!isUrl(d.referenceUrl) || d.referenceUrl.length > 500))
    errors.referenceUrl = "Please enter a valid website address, like example.com.";
  if (d.filesUrl && (!isUrl(d.filesUrl) || d.filesUrl.length > 500))
    errors.filesUrl = "Please enter a valid link, such as a Google Drive or Dropbox URL.";
  if (!d.consent) errors.consent = "Please confirm you have read the privacy policy.";
  return { data: d, errors, valid: Object.keys(errors).length === 0 };
}

export function labelFor(options, value) {
  return options.find((o) => o.value === value)?.label ?? value;
}
