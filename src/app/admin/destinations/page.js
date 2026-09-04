"use client";

import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { destinations } from "@/data/destinations";

const FIELDS = [
  { name: "name", label: "Destination Name", placeholder: "e.g. Ooty" },
  { name: "region", label: "Region", placeholder: "e.g. Tamil Nadu" },
  { name: "idealTripType", label: "Ideal Trip Type", placeholder: "e.g. Round Trip / Tour Package" },
  { name: "approxDistanceKm", label: "Approx. Distance from Bangalore (km)", placeholder: "e.g. 270" },
  { name: "image", label: "Image Path", placeholder: "/images/destinations/your-file.jpg" },
  { name: "description", label: "Description", as: "textarea" },
];

const COLUMNS = [
  { key: "name", label: "Destination" },
  { key: "region", label: "Region" },
  { key: "approxDistanceKm", label: "Distance", render: (d) => (d.approxDistanceKm ? `~${d.approxDistanceKm} km` : "—") },
];

export default function AdminDestinationsPage() {
  return (
    <>
      <AdminTopbar title="Destinations" />
      <div className="p-4 md:p-8">
        <AdminCard>
          <p className="mb-5 text-sm text-[var(--color-text-muted)]">
            Source of truth for the public site is{" "}
            <code className="rounded bg-[var(--color-paper-2)] px-1 py-0.5 text-[13px]">src/data/destinations.js</code>. Only add
            destinations that have a real image already uploaded to{" "}
            <code className="rounded bg-[var(--color-paper-2)] px-1 py-0.5 text-[13px]">public/images/destinations/</code>.
          </p>
          <ResourceManager title="Destination" fields={FIELDS} initialItems={destinations} columns={COLUMNS} />
        </AdminCard>
      </div>
    </>
  );
}
