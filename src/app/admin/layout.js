import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin — Manoj Tours and Travels",
  robots: { index: false, follow: false },
};

// Deliberately styled as a plain, neutral operational dashboard — gray/white,
// not the marketing site's ivory/glass/cinematic language — so it never
// reads as part of the public brand experience. See AdminNotice for the
// current (unauthenticated, non-persistent) state of this panel.
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-gray-200 bg-white md:block">
          <AdminSidebar />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
