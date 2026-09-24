"use client";

import { useMemo, useState } from "react";
import { TourPackageCard } from "./TourPackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const inputClass =
  "w-full rounded-[var(--radius-sm)] border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3 text-[16px] text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-accent)]";

export function ToursPackagesExplorer({ packages }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");

  const states = useMemo(
    () => Array.from(new Set(packages.map((p) => p.state).filter(Boolean))).sort(),
    [packages]
  );
  const categories = useMemo(
    () => Array.from(new Set(packages.map((p) => p.category).filter(Boolean))).sort(),
    [packages]
  );

  const featured = useMemo(() => packages.filter((p) => p.featured), [packages]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = packages.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.state?.toLowerCase().includes(q);
      const matchesState = state === "all" || p.state === state;
      const matchesCategory = category === "all" || p.category === category;
      return matchesQuery && matchesState && matchesCategory;
    });

    if (sort === "popular") {
      list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sort === "az") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [packages, query, state, category, sort]);

  const isFiltering = query.trim() !== "" || state !== "all" || category !== "all";

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a destination — Coorg, Ooty, Munnar, Goa..."
          className={`${inputClass} sm:col-span-2 lg:col-span-2`}
          aria-label="Search tour packages"
        />
        <select value={state} onChange={(e) => setState(e.target.value)} className={inputClass} aria-label="Filter by state">
          <option value="all">All states</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} aria-label="Filter by category">
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={`${inputClass} w-auto`}
          aria-label="Sort packages"
        >
          <option value="popular">Sort: Popular first</option>
          <option value="az">Sort: A–Z</option>
        </select>
      </div>

      {!isFiltering && featured.length > 0 && (
        <div className="mt-12">
          <SectionHeading eyebrow="Featured" title="Featured Packages" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((pkg) => (
              <TourPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <SectionHeading eyebrow={isFiltering ? "Results" : "All Packages"} title={isFiltering ? `${filtered.length} package${filtered.length === 1 ? "" : "s"} found` : "All Tour Packages"} />
        {filtered.length === 0 ? (
          <p className="mt-8 text-[16px] text-[var(--color-text-muted)]">
            No packages match your search. Try a different destination or clear the filters.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <TourPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
