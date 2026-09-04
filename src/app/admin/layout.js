import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin — Manoj Tours and Travels",
  robots: { index: false, follow: false },
};

// An internal operational dashboard, kept editorially quieter than the
// public marketing pages — but built from the same warm ivory/espresso
// tokens and glass surfaces, so it reads as one cohesive product rather
// than a bolted-on generic admin theme. See AdminNotice for the current
// (unauthenticated, non-persistent) state of this panel.
export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--color-paper-2)] text-[var(--color-ink)]">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="glass-light sticky top-0 hidden h-screen w-64 shrink-0 md:block">
          <AdminSidebar />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
