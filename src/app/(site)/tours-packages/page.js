import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TourPackageCard } from "@/components/tours/TourPackageCard";
import { getTourPackages } from "@/lib/siteContent";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Tours & Packages",
  description:
    "Affordable tour packages from Bangalore with Manoj Tours and Travels — one-way sightseeing trips, round trips and more.",
  path: "/tours-packages",
});

export const revalidate = 60;

export default async function ToursPackagesPage() {
  const packages = await getTourPackages();

  return (
    <>
      <PageHero
        eyebrow="Tours & Packages"
        title="Affordable tour packages from Bangalore"
        description="Handpicked sightseeing and outstation packages at fixed, affordable prices."
        image="/images/destinations/mysuru.png"
        imageAlt="Mysore Palace"
      />
      <Section tone="paper">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tours & Packages", href: "/tours-packages" }]} />
        <div className="mt-10">
          {packages.length === 0 ? (
            <p className="text-[16px] text-[var(--color-text-muted)]">No packages available right now — please check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <TourPackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
