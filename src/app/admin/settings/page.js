import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { business } from "@/config/business.config";

const FIELDS = [
  { label: "Primary Phone (routes all booking/WhatsApp CTAs)", value: business.phone.primaryDisplay },
  { label: "Secondary / Alternate Phone", value: business.phone.secondaryDisplay },
  { label: "WhatsApp Number", value: `+${business.whatsapp.number}` },
  { label: "Email", value: business.email },
  { label: "Address", value: business.address.full },
  { label: "Availability", value: business.availabilityLabel },
];

export default function AdminSettingsPage() {
  return (
    <>
      <AdminTopbar title="Site Settings" />
      <div className="p-4 md:p-8">
        <AdminCard className="mb-6">
          <p className="text-sm text-gray-500">
            Single source of truth:{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-[13px]">src/config/business.config.js</code>.
            Editing values from this screen is disabled until it&rsquo;s wired to an authenticated write API —
            change the file directly (and redeploy) for now.
          </p>
        </AdminCard>

        <AdminCard>
          <dl className="divide-y divide-gray-100">
            {FIELDS.map((f) => (
              <div key={f.label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:items-center sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">{f.label}</dt>
                <dd className="sm:col-span-2">
                  <input
                    readOnly
                    value={f.value}
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
                  />
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:items-center sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Social Links</dt>
              <dd className="sm:col-span-2 text-sm text-gray-400">
                None on file — nothing is shown on the public site until real profile links are supplied.
              </dd>
            </div>
          </dl>
        </AdminCard>
      </div>
    </>
  );
}
