import { Suspense } from "react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdminAuthenticated } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Login — Manoj Tours and Travels",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  // Already signed in? Skip straight to the dashboard instead of showing
  // the form again.
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
