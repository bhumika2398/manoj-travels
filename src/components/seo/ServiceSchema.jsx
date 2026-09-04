import { serviceSchema } from "@/lib/structured-data";

export function ServiceSchema({ service }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
    />
  );
}
