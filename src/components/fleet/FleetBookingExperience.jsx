"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FleetGrid } from "./FleetGrid";
import { EnquiryForm } from "@/components/booking/EnquiryForm";
import { cn } from "@/lib/utils";

const SERVICE_TABS = [
  { value: "one-way", label: "One Way", tripType: "One Way" },
  { value: "local", label: "Local", tripType: "Local" },
  { value: "round-trip", label: "Outstation / Round Trip", tripType: "Round Trip" },
  { value: "airport", label: "Airport", tripType: "Airport Transfer" },
];

/**
 * The main booking flow: choose a service → choose a vehicle → the enquiry
 * form below pre-fills with both and the page scrolls to it. This is where
 * the enquiry form that used to sit on the homepage now lives.
 */
export function FleetBookingExperience({ vehicles }) {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service");
  const initialTab = SERVICE_TABS.some((t) => t.value === requestedService) ? requestedService : "one-way";

  const requestedVehicle = searchParams.get("vehicle");
  const initialVehicle = vehicles.some((v) => v.slug === requestedVehicle) ? requestedVehicle : null;

  const [activeService, setActiveService] = useState(initialTab);
  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState(initialVehicle);
  const formRef = useRef(null);

  useEffect(() => {
    if (initialVehicle) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeTab = SERVICE_TABS.find((t) => t.value === activeService);
  const filteredVehicles = useMemo(
    () => vehicles.filter((v) => v.tripTypes.includes(activeTab.tripType)),
    [vehicles, activeTab]
  );

  const vehicleOptions = useMemo(
    () => vehicles.map((v) => ({ value: v.slug, label: `${v.name} (${v.capacity})` })),
    [vehicles]
  );

  const handleBook = (vehicle) => {
    setSelectedVehicleSlug(vehicle.slug);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Select a service"
        className="glass-light mx-auto flex w-full max-w-2xl flex-wrap justify-center gap-1.5 rounded-[var(--radius-md)] p-1.5"
      >
        {SERVICE_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeService === tab.value}
            onClick={() => setActiveService(tab.value)}
            className={cn(
              "rounded-[var(--radius-sm)] px-4 py-2.5 text-[15px] font-medium transition-all duration-200",
              activeService === tab.value
                ? "bg-[var(--color-ink)] text-[var(--color-text-on-dark)] shadow-[var(--shadow-soft)]"
                : "text-[var(--color-text)] hover:bg-white/50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {filteredVehicles.length === 0 ? (
          <p className="text-center text-[17px] text-[var(--color-text-muted)]">
            No vehicles are currently listed for this service.
          </p>
        ) : (
          <FleetGrid vehicles={filteredVehicles} onBook={handleBook} />
        )}
      </div>

      <div ref={formRef} className="mx-auto mt-16 max-w-2xl scroll-mt-28">
        <EnquiryForm
          key={`${activeService}-${selectedVehicleSlug || "none"}`}
          title="Complete Your Booking"
          defaultTripType={activeService}
          defaultVehicle={selectedVehicleSlug || ""}
          vehicleOptions={vehicleOptions}
        />
      </div>
    </div>
  );
}
