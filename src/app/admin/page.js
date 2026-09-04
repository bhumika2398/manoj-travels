import Link from "next/link";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminCard, AdminStat, StatusBadge } from "@/components/admin/AdminCard";
import { readEnquiries } from "@/lib/enquiryStore";
import { fleet } from "@/data/fleet";
import { destinations } from "@/data/destinations";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const enquiries = await readEnquiries();
  const recent = enquiries.slice(0, 6);
  const newCount = enquiries.filter((e) => (e.status || "new") === "new").length;

  return (
    <>
      <AdminTopbar title="Dashboard" />
      <div className="p-4 md:p-8">
        <AdminNotice />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <AdminStat label="New Enquiries" value={newCount} href="/admin/enquiries" hint={`${enquiries.length} total`} />
          <AdminStat label="Fleet Vehicles" value={fleet.length} href="/admin/fleet" />
          <AdminStat label="Destinations" value={destinations.length} href="/admin/destinations" />
          <AdminStat label="Services" value={services.length} href="/admin/services" />
          <AdminStat label="Blog Articles" value={blogPosts.length} href="/admin/blog" />
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
                { href: "/admin/fleet", label: "Manage fleet vehicles" },
                { href: "/admin/destinations", label: "Manage destinations" },
                { href: "/admin/videos", label: "Manage hero & section videos" },
                { href: "/admin/services", label: "Review services & pricing" },
                { href: "/admin/blog", label: "Manage blog articles" },
                { href: "/admin/settings", label: "Edit site settings" },
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
