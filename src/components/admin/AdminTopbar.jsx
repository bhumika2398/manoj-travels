"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";

export function AdminTopbar({ title }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/90 px-4 py-3.5 backdrop-blur md:px-8">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 md:hidden"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden="true">
          <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
            <AdminSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
