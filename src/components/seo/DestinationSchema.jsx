import { destinationSchema } from "@/lib/structured-data";

export function DestinationSchema({ destination }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationSchema(destination)) }}
    />
  );
}
