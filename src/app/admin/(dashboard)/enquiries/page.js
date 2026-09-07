import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { EnquiriesTable } from "@/components/admin/EnquiriesTable";
import { readEnquiries } from "@/lib/enquiryStore";
import { hasSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const enquiries = await readEnquiries();
  const supabaseReady = hasSupabase();

  return (
    <>
      <AdminTopbar title="Enquiries" />
      <div className="p-4 md:p-8">
        <AdminCard>
          {supabaseReady ? (
            <p className="mb-5 text-sm text-[var(--color-text-muted)]">
              Real submissions from the hero booking selector, service enquiry forms and the
              contact page.
            </p>
          ) : (
            <p className="mb-5 text-sm text-[var(--color-danger)]">
              Supabase is not configured, so no enquiries can be shown or saved yet — see the
              project README for setup steps.
            </p>
          )}
          <EnquiriesTable enquiries={enquiries} />
        </AdminCard>
      </div>
    </>
  );
}
