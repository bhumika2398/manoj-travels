"use client";

import { useState, useCallback } from "react";
import { validateEnquiry } from "@/lib/validation";

const baseState = {
  tripType: "one-way",
  pickup: "",
  drop: "",
  destination: "",
  date: "",
  returnDate: "",
  time: "",
  passengers: "",
  vehicle: "",
  hours: "",
  km: "",
  name: "",
  phone: "",
  message: "",
};

/** Shared state + submit handler for the booking/enquiry forms. */
export function useBooking(overrides) {
  const [values, setValues] = useState({ ...baseState, ...overrides });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const update = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  /** Bulk-update several fields at once, e.g. when a vehicle/service is picked. */
  const updateMany = useCallback((patch) => {
    setValues((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setValues({ ...baseState, ...overrides });
    setStatus("idle");
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = useCallback(async () => {
    const { isValid, errors: validationErrors } = validateEnquiry(values);
    setErrors(validationErrors);
    if (!isValid) return { ok: false };

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      return { ok: true };
    } catch (err) {
      setStatus("error");
      return { ok: false, error: err };
    }
  }, [values]);

  return { values, update, updateMany, errors, status, submit, reset };
}
