import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { isAdminAuthenticated } from "@/lib/supabase/server";

// Every route inside this group is a real, authenticated dashboard page.
// `middleware.js` already blocks unauthenticated requests before they get
// this far, but checking again here too (defense in depth) means these
// pages are still safe even if the middleware matcher is ever changed.
export default async function DashboardLayout({ children }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex max-w-[1600px]">
      <aside className="glass-light sticky top-0 hidden h-screen w-64 shrink-0 md:block">
        <AdminSidebar />
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
