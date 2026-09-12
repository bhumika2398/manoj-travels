"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/images", label: "Manage Images", icon: "image" },
  { href: "/admin/pricing", label: "Manage Pricing", icon: "tag" },
  { href: "/admin/tours", label: "Tours & Packages", icon: "map" },
  { href: "/admin/enquiries", label: "Enquiries", icon: "inbox" },
  { href: "/admin/settings", label: "Website Information", icon: "gear" },
];

const ICONS = {
  grid: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
  image: "M4 5h16v14H4V5Zm3 10 3.5-4 2.5 3 2-2.5L19 15M8.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  tag: "M4 4h7l9 9-7 7-9-9V4Zm4 4h.01",
  inbox: "M4 12h4l1.5 3h5L16 12h4M4 12l1.5-6h13L20 12M4 12v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6",
  map: "M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Zm0 0v14m6-14v14",
  gear: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 13.6l1.2 1.9-1.7 1.7-1.9-1.2a6.9 6.9 0 0 1-1.7.7L15 19h-2.4l-.3-2.3a6.9 6.9 0 0 1-1.7-.7l-1.9 1.2-1.7-1.7 1.2-1.9a6.9 6.9 0 0 1-.7-1.7L4.3 12v-2.4l2.3-.3c.15-.6.4-1.17.7-1.7L6.1 5.7l1.7-1.7 1.9 1.2c.53-.3 1.1-.55 1.7-.7L11.7 2.2H14l.3 2.3c.6.15 1.17.4 1.7.7l1.9-1.2 1.7 1.7-1.2 1.9c.3.53.55 1.1.7 1.7l2.3.3V12l-2.3.3c-.15.6-.4 1.17-.7 1.7Z",
};

function Icon({ name, className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[name]} />
    </svg>
  );
}

export function AdminSidebar({ className, onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <nav className={cn("flex h-full flex-col gap-1 p-4", className)}>
      <Link href="/admin" onClick={onNavigate} className="mb-4 flex items-center gap-2 px-2 py-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-ink)] text-sm font-semibold text-[var(--color-text-on-dark)]">
          M
        </span>
        <span>
          <span className="block text-sm font-semibold text-[var(--color-ink)]">Manoj Admin</span>
          <span className="block text-xs text-[var(--color-text-muted)]">Content dashboard</span>
        </span>
      </Link>

      {NAV.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-[var(--color-ink)] text-[var(--color-text-on-dark)]" : "text-[var(--color-text-muted)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"
            )}
          >
            <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}

      <Link
        href="/"
        className="mt-auto flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[18px] w-[18px]" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7M3 12h18" />
        </svg>
        Back to website
      </Link>
      <button
        type="button"
        onClick={logout}
        className="flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left text-sm font-medium text-[var(--color-danger)] hover:bg-[var(--color-paper-2)]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[18px] w-[18px]" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
        Logout
      </button>
    </nav>
  );
}
