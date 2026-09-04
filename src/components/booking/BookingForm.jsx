"use client";

import { useMemo, useState } from "react";
import { useBooking } from "@/hooks/useBooking";
import { TripTypeSelector } from "./TripTypeSelector";
import { LocationFields } from "./LocationFields";
import { DateTimeFields } from "./DateTimeFields";
import { FormField } from "@/components/forms/FormField";
import { BookingConfirmation } from "./BookingConfirmation";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { PASSENGER_OPTIONS, VEHICLE_OPTIONS, TRIP_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Premium hero booking / enquiry selector — dynamic per trip type. */
export function BookingForm({ className }) {
  const { values, update, errors, status, submit } = useBooking();
  const [attempted, setAttempted] = useState(false);

  const tripLabel = useMemo(
    () => TRIP_TYPES.find((t) => t.value === values.tripType)?.label,
    [values.tripType]
  );

  const whatsappMessage = useMemo(() => {
    const parts = [`Hello Manoj Tours and Travels, I'd like to enquire about a ${tripLabel} booking.`];
    if (values.pickup) parts.push(`Pickup: ${values.pickup}`);
    if (values.drop) parts.push(`Drop: ${values.drop}`);
    if (values.destination) parts.push(`Destination: ${values.destination}`);
    if (values.date) parts.push(`Date: ${values.date}`);
    if (values.returnDate) parts.push(`Return: ${values.returnDate}`);
    if (values.time) parts.push(`Time: ${values.time}`);
    if (values.hours) parts.push(`Package: ${values.hours}`);
    if (values.passengers) parts.push(`Passengers: ${values.passengers}`);
    if (values.vehicle) parts.push(`Vehicle: ${VEHICLE_OPTIONS.find((v) => v.value === values.vehicle)?.label || values.vehicle}`);
    return parts.join("\n");
  }, [values, tripLabel]);

  if (status === "success") {
    return <BookingConfirmation className={className} />;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setAttempted(true);
        await submit();
      }}
      className={cn("glass-light w-full rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-lift)] sm:p-6", className)}
    >
      <TripTypeSelector value={values.tripType} onChange={(v) => update("tripType", v)} />

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LocationFields tripType={values.tripType} values={values} onChange={update} />
        <DateTimeFields tripType={values.tripType} values={values} onChange={update} />

        <FormField
          label="Passengers"
          name="passengers"
          as="select"
          value={values.passengers}
          onChange={(e) => update("passengers", e.target.value)}
          options={["", ...PASSENGER_OPTIONS].map((v) => ({ value: v, label: v || "Select" }))}
        />
        <FormField
          label="Vehicle"
          name="vehicle"
          as="select"
          value={values.vehicle}
          onChange={(e) => update("vehicle", e.target.value)}
          options={[{ value: "", label: "Select" }, ...VEHICLE_OPTIONS]}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <FormField
          label="Your Name"
          name="name"
          required
          error={attempted ? errors.name : undefined}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          required
          error={attempted ? errors.phone : undefined}
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="accent" size="lg" className="flex-1" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Book / Enquire Now"}
        </Button>
        <WhatsAppButton message={whatsappMessage} label="Enquire on WhatsApp" className="flex-1" />
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-[var(--color-danger)]">
          Something went wrong sending your enquiry — please call or WhatsApp us instead.
        </p>
      )}
    </form>
  );
}
