"use client";

import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { useImageOverrides } from "@/components/common/SiteDataProvider";

/**
 * Thin wrapper around next/image with sensible fill+cover defaults. Also the
 * single place that resolves an admin-uploaded replacement image (see
 * /admin/images) — every fleet/destination photo on the site renders
 * through this component, so a replacement uploaded in the admin panel
 * appears everywhere that image is used, with no other code changes.
 */
export function Image({ src, className, wrapperClassName, fill = true, sizes, ...props }) {
  const overrides = useImageOverrides();
  const resolvedSrc = overrides[src] || src;

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", wrapperClassName)}>
        <NextImage
          src={resolvedSrc}
          fill
          sizes={sizes || "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className={cn("object-cover", className)}
          {...props}
        />
      </div>
    );
  }
  return <NextImage src={resolvedSrc} className={className} {...props} />;
}
