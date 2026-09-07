import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { PricingManager } from "@/components/admin/PricingManager";
import { getEditablePricingList, getPricing } from "@/lib/siteContent";
import { hasSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const supabaseReady = hasSupabase();
  const [tiers, pricing] = await Promise.all([getEditablePricingList(), getPricing()]);

  return (
    <>
      <AdminTopbar title="Manage Pricing" />
      <div className="p-4 md:p-8">
        {!supabaseReady && (
          <div className="mb-6 rounded-[var(--radius-lg)] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Supabase is not configured, so pricing edits can&rsquo;t be saved yet.
          </div>
        )}
        <AdminCard>
          <p className="mb-5 text-sm text-[var(--color-text-muted)]">
            Edit the fares shown on the public site for One Way, Local and Outstation / Round Trip.
            Changes appear on the website immediately after saving.
          </p>
          <PricingManager tiers={tiers} airportMessage={pricing.airportPricing.message} disabled={!supabaseReady} />
        </AdminCard>
      </div>
    </>
  );
}
