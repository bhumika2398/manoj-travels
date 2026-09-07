// Shared by every /admin route, including the login page — kept deliberately
// tiny (just metadata) since the actual dashboard chrome (sidebar/topbar)
// only wraps the authenticated pages, in the (dashboard) route group below.
export const metadata = {
  title: "Admin — Manoj Tours and Travels",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-screen bg-[var(--color-paper-2)] text-[var(--color-ink)]">{children}</div>;
}
