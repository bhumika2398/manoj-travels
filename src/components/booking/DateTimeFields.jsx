"use client";

import { FormField } from "@/components/forms/FormField";

export function DateTimeFields({ tripType, values, onChange }) {
  const set = (field) => (e) => onChange(field, e.target.value);

  if (tripType === "local") {
    return (
      <>
        <FormField
          label="Package Duration"
          name="hours"
          as="select"
          value={values.hours}
          onChange={set("hours")}
          options={["8 hrs / 80 km", "4 hrs / 40 km", "Custom — mention in message"]}
        />
        <FormField label="Date" name="date" type="date" value={values.date} onChange={set("date")} />
      </>
    );
  }

  return (
    <>
      <FormField label="Travel Date" name="date" type="date" required value={values.date} onChange={set("date")} />
      {tripType === "round-trip" || tripType === "tour-package" ? (
        <FormField
          label="Return Date"
          name="returnDate"
          type="date"
          value={values.returnDate}
          onChange={set("returnDate")}
        />
      ) : (
        <FormField label="Time" name="time" type="time" value={values.time} onChange={set("time")} />
      )}
    </>
  );
}
