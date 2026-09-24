import { tourPackageSchema } from "@/lib/structured-data";

export function TourPackageSchema({ pkg }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(tourPackageSchema(pkg)) }}
    />
  );
}
