"use client";

import { useEffect, useRef, useState } from "react";
import { HONEYPOT_FIELD } from "@/lib/forms";

/**
 * Shared form state: values, validation timing, submission and honest result states.
 *
 * Validation runs on blur for touched fields, then live after the first submit attempt.
 * Statuses: "idle" | "submitting" | "success" | "error".
 */
export function useFormSubmission({ endpoint, initialValues, validate }) {
  const [values, setValues] = useState({ ...initialValues, [HONEYPOT_FIELD]: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [focusTick, setFocusTick] = useState(0);
  const startedAt = useRef(0);
  const formRef = useRef(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Move focus to the first invalid field after a failed submit.
  useEffect(() => {
    if (!focusTick) return;
    formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
  }, [focusTick]);

  function revalidate(next, touchedState = touched) {
    const { errors: all } = validate(next);
    if (attempted) setErrors(all);
    else setErrors(Object.fromEntries(Object.entries(all).filter(([k]) => touchedState[k])));
  }

  function setValue(name, value) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (attempted || touched[name]) revalidate(next);
  }

  function onBlur(name) {
    const t = { ...touched, [name]: true };
    setTouched(t);
    revalidate(values, t);
  }

  async function submit(event, onSuccess) {
    event.preventDefault();
    if (status === "submitting") return;
    setAttempted(true);
    const { errors: all, valid } = validate(values);
    setErrors(all);
    if (!valid) {
      setFocusTick((n) => n + 1);
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        onSuccess?.();
        return;
      }
      if (data.code === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        setFocusTick((n) => n + 1);
        return;
      }
      setServerMessage(data.message || "We could not send your message. Please try again shortly.");
      setStatus("error");
    } catch {
      setServerMessage("We could not reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  function reset() {
    setValues({ ...initialValues, [HONEYPOT_FIELD]: "" });
    setErrors({});
    setTouched({});
    setAttempted(false);
    setStatus("idle");
    startedAt.current = Date.now();
  }

  return { values, errors, status, serverMessage, setValue, onBlur, submit, reset, formRef };
}
