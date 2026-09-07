import Link from "next/link";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard, AdminStat, StatusBadge } from "@/components/admin/AdminCard";
import { readEnquiries } from "@/lib/enquiryStore";
import { fleet } from "@/data/fleet";
import { destinations } from "@/data/destinations";
import { hasSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const enquiries = await readEnquiries();
  const recent = enquiries.slice(0, 6);
  const newCount = enquiries.filter((e) => (e.status || "new") === "new").length;
  const supabaseReady = hasSupabase();

  return (
    <>
      <AdminTopbar title="Dashboard" />
      <div className="p-4 md:p-8">
        {!supabaseReady && (
          <div className="mb-6 rounded-[var(--radius-lg)] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong className="font-semibold">Setup needed:</strong> Supabase environment
            variables are not configured — enquiries, pricing, website info and image uploads
            won&rsquo;t be saved. See the project README for setup steps.
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <AdminStat label="New Enquiries" value={newCount} href="/admin/enquiries" hint={`${enquiries.length} total`} />
          <AdminStat label="Fleet Vehicles" value={fleet.length} href="/admin/images" />
          <AdminStat label="Destinations" value={destinations.length} href="/admin/images" />
          <AdminStat label="Pricing Tiers" value="Edit" href="/admin/pricing" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <AdminCard className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[var(--color-ink)]">Recent Enquiries</h2>
              <Link href="/admin/enquiries" className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">
                View all →
              </Link>
            </div>

            {recent.length === 0 ? (
              <p className="mt-6 text-sm text-[var(--color-text-muted)]">
                No enquiries yet — submissions from the booking form, hero selector and contact
                page will appear here.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                      <th className="pb-2 pr-4 font-medium">Name</th>
                      <th className="pb-2 pr-4 font-medium">Phone</th>
                      <th className="pb-2 pr-4 font-medium">Source</th>
                      <th className="pb-2 pr-4 font-medium">Status</th>
                      <th className="pb-2 font-medium">Received</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-line)]">
                    {recent.map((e) => (
                      <tr key={e.id}>
                        <td className="py-2.5 pr-4 font-medium text-[var(--color-ink)]">{e.name || "—"}</td>
                        <td className="py-2.5 pr-4 text-[var(--color-text-muted)]">{e.phone || "—"}</td>
                        <td className="py-2.5 pr-4 capitalize text-[var(--color-text-muted)]">{e.source}</td>
                        <td className="py-2.5 pr-4">
                          <StatusBadge status={e.status} />
                        </td>
                        <td className="py-2.5 text-[var(--color-text-muted)]">
                          {new Date(e.receivedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AdminCard>

          <AdminCard>
            <h2 className="text-base font-semibold text-[var(--color-ink)]">Quick Links</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { href: "/admin/images", label: "Manage images" },
                { href: "/admin/pricing", label: "Manage pricing" },
                { href: "/admin/enquiries", label: "View enquiries" },
                { href: "/admin/settings", label: "Edit website information" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center justify-between rounded-[var(--radius-md)] px-3 py-2.5 text-[var(--color-text)] hover:bg-[var(--color-paper-2)]">
                    {l.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </AdminCard>
        </div>
      </div>
    </>
  );
}
