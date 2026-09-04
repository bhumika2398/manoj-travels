"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Resets scroll position to the top on every route change. */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
