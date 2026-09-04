"use client";

import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { fleet } from "@/data/fleet";

const FIELDS = [
  { name: "name", label: "Vehicle Name", placeholder: "e.g. Toyota Innova" },
  { name: "category", label: "Category", placeholder: "e.g. SUV" },
  { name: "capacity", label: "Capacity", placeholder: "e.g. 7+1" },
  { name: "seatLabel", label: "Seat Label", placeholder: "e.g. Up to 7 Passengers + Driver" },
  { name: "image", label: "Image Path", placeholder: "/images/fleet/your-file.png" },
  { name: "description", label: "Description", as: "textarea" },
];

const COLUMNS = [
  { key: "name", label: "Vehicle" },
  { key: "category", label: "Category" },
  { key: "capacity", label: "Capacity" },
];

export default function AdminFleetPage() {
  return (
    <>
      <AdminTopbar title="Fleet" />
      <div className="p-4 md:p-8">
        <AdminCard>
          <p className="mb-5 text-sm text-gray-500">
            Source of truth for the public site is{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-[13px]">src/data/fleet.js</code>. Image paths
            must point to a file already uploaded to{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-[13px]">public/images/fleet/</code>.
          </p>
          <ResourceManager title="Vehicle" fields={FIELDS} initialItems={fleet} columns={COLUMNS} />
        </AdminCard>
      </div>
    </>
  );
}
