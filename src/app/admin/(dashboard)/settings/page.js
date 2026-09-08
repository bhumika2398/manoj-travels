import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getBusinessInfo, getBusinessInfoOverride } from "@/lib/siteContent";
import { hasSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const supabaseReady = hasSupabase();
  const [info, override] = await Promise.all([getBusinessInfo(), getBusinessInfoOverride()]);

  return (
    <>
      <AdminTopbar title="Website Information" />
      <div className="p-4 md:p-8">
        {!supabaseReady && (
          <div className="mb-6 rounded-[var(--radius-lg)] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Supabase is not configured, so these changes can&rsquo;t be saved yet.
          </div>
        )}
        <AdminCard>
          <p className="mb-5 text-sm text-[var(--color-text-muted)]">
            These details appear across the website — the navigation bar, footer, contact page
            and call/WhatsApp buttons.
          </p>
          <SettingsForm
            initial={{
              phonePrimary: info.phone.primary,
              phoneSecondary: info.phone.secondary,
              activeNumber: override.activeNumber === "secondary" ? "secondary" : "primary",
              whatsappNumber: info.whatsapp.number.replace(/^91/, ""),
              email: info.email,
              addressFull: info.address.full,
            }}
            disabled={!supabaseReady}
          />
        </AdminCard>
      </div>
    </>
  );
}
