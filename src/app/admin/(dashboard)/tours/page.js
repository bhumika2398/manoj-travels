import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { TourPackagesManager } from "@/components/admin/TourPackagesManager";
import { getAllTourPackages } from "@/lib/siteContent";
import { hasSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  const supabaseReady = hasSupabase();
  const packages = await getAllTourPackages();

  return (
    <>
      <AdminTopbar title="Tours & Packages" />
      <div className="p-4 md:p-8">
        {!supabaseReady && (
          <div className="mb-6 rounded-[var(--radius-lg)] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Supabase is not configured, so tour package edits can&rsquo;t be saved yet.
          </div>
        )}
        <AdminCard>
          <p className="mb-5 text-sm text-[var(--color-text-muted)]">
            Add, edit or remove tour packages shown on the public Tours &amp; Packages page.
            Changes appear on the website immediately after saving.
          </p>
          <TourPackagesManager initialPackages={packages} disabled={!supabaseReady} />
        </AdminCard>
      </div>
    </>
  );
}
