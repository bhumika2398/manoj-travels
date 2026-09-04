import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { EnquiriesTable } from "@/components/admin/EnquiriesTable";
import { readEnquiries } from "@/lib/enquiryStore";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const enquiries = await readEnquiries();

  return (
    <>
      <AdminTopbar title="Enquiries" />
      <div className="p-4 md:p-8">
        <AdminCard>
          <p className="mb-5 text-sm text-[var(--color-text-muted)]">
            Real submissions from the hero booking selector, service enquiry forms and the
            contact page — read from the local file-backed log
            (<code className="rounded bg-[var(--color-paper-2)] px-1 py-0.5 text-[13px]">.data/enquiries.json</code>).
            Status changes here are not yet wired to persistence — connect a database write
            once one is available.
          </p>
          <EnquiriesTable enquiries={enquiries} />
        </AdminCard>
      </div>
    </>
  );
}
