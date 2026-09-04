"use client";

import { FormField } from "@/components/forms/FormField";

/** Renders the right pickup/drop/destination fields for the selected trip type. */
export function LocationFields({ tripType, values, onChange }) {
  const set = (field) => (e) => onChange(field, e.target.value);

  if (tripType === "local") {
    // Local trips are billed as an hourly/km package (see DateTimeFields),
    // but still need a pickup point — also required by validateEnquiry().
    return (
      <FormField
        label="Pickup Location"
        name="pickup"
        placeholder="Bangalore"
        required
        value={values.pickup}
        onChange={set("pickup")}
      />
    );
  }

  if (tripType === "round-trip" || tripType === "tour-package") {
    return (
      <>
        <FormField
          label="Pickup"
          name="pickup"
          placeholder="Bangalore"
          required
          value={values.pickup}
          onChange={set("pickup")}
        />
        <FormField
          label="Destination"
          name="destination"
          placeholder="e.g. Ooty, Coorg, Mysore"
          required
          value={values.destination}
          onChange={set("destination")}
        />
      </>
    );
  }

  // one-way, airport
  return (
    <>
      <FormField
        label={tripType === "airport" ? "Pickup / Drop" : "Pickup"}
        name="pickup"
        placeholder="Bangalore"
        required
        value={values.pickup}
        onChange={set("pickup")}
      />
      <FormField
        label={tripType === "airport" ? "Airport" : "Drop"}
        name="drop"
        placeholder={tripType === "airport" ? "Kempegowda International Airport" : "e.g. Mysore"}
        required
        value={values.drop}
        onChange={set("drop")}
      />
    </>
  );
}
