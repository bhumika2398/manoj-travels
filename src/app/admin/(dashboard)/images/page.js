import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";
import { ImageManager } from "@/components/admin/ImageManager";
import { getImageOverrides } from "@/lib/siteContent";
import { hasSupabase } from "@/lib/supabase/admin";
import { fleet } from "@/data/fleet";
import { destinations } from "@/data/destinations";

export const dynamic = "force-dynamic";

function buildCatalog(overrides) {
  const fleetItems = fleet.map((v) => ({
    key: v.image,
    group: "Fleet",
    label: v.name,
    originalUrl: v.image,
    currentUrl: overrides[v.image] || v.image,
    isOverridden: Boolean(overrides[v.image]),
  }));
  const destinationItems = destinations.map((d) => ({
    key: d.image,
    group: "Destinations",
    label: d.name,
    originalUrl: d.image,
    currentUrl: overrides[d.image] || d.image,
    isOverridden: Boolean(overrides[d.image]),
  }));
  return [...fleetItems, ...destinationItems];
}

export default async function AdminImagesPage() {
  const supabaseReady = hasSupabase();
  const overrides = await getImageOverrides();
  const images = buildCatalog(overrides);

  return (
    <>
      <AdminTopbar title="Manage Images" />
      <div className="p-4 md:p-8">
        {!supabaseReady && (
          <div className="mb-6 rounded-[var(--radius-lg)] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Supabase is not configured, so image uploads are disabled.
          </div>
        )}
        <AdminCard>
          <p className="mb-5 text-sm text-[var(--color-text-muted)]">
            Replace the photo used for any fleet vehicle or destination. Uploads apply
            everywhere that image appears on the site, and can be reverted back to the
            original photo at any time.
          </p>
          <ImageManager initialImages={images} disabled={!supabaseReady} />
        </AdminCard>
      </div>
    </>
  );
}
