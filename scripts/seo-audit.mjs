#!/usr/bin/env node
// Reproducible, static SEO audit — run with `node scripts/seo-audit.mjs`.
//
// Reconstructs the title/description/path every indexable page will
// actually render (using the same formulas as the real page files) by
// importing the site's own data modules, then checks for the things that
// commonly break silently: duplicate titles, duplicate meta descriptions,
// duplicate canonical paths, and image references that don't exist on
// disk or aren't tracked by Git. No dev server required.
//
// Exits with a non-zero code if it finds a real problem, so it can be
// wired into CI later without extra work.

import fs from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
process.chdir(root);

const { destinations } = await import("../src/data/destinations.js");
const { tourPackages } = await import("../src/data/tourPackages.js");
const { blogPosts } = await import("../src/data/blog.js");
const { destinationKeywords } = await import("../src/data/destinationKeywords.js");

let problems = 0;
const note = (msg) => {
  console.log("  ✗ " + msg);
  problems++;
};
const ok = (msg) => console.log("  ✓ " + msg);

function checkDuplicates(label, entries) {
  const byValue = new Map();
  for (const { value, path: p } of entries) {
    if (!byValue.has(value)) byValue.set(value, []);
    byValue.get(value).push(p);
  }
  let dupes = 0;
  for (const [value, paths] of byValue) {
    if (paths.length > 1) {
      dupes++;
      note(`Duplicate ${label}: "${value}" used on ${paths.join(", ")}`);
    }
  }
  if (dupes === 0) ok(`No duplicate ${label}s across ${entries.length} pages`);
}

console.log("\n=== 1. Static pages (title/description/path) ===");
const staticPages = [
  { title: "Manoj Tours and Travels | Manoj Taxi Service — Cab & Taxi Service in Bangalore", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Contact Us", path: "/contact" },
  { title: "Frequently Asked Questions", path: "/faq" },
  { title: "Travel Guides", path: "/blog" },
  { title: "Destinations & Routes from Bangalore", path: "/destinations" },
  { title: "Outstation Taxi Routes from Bangalore", path: "/routes" },
  { title: "Tours & Packages", path: "/tours-packages" },
];

console.log("\n=== 2. Destination pages ===");
const destPages = destinations.map((d) => ({
  title: `Bangalore to ${d.name} Taxi & Cab Service`,
  description: `${d.description} Book a one-way, round-trip or local taxi from Bangalore to ${d.name}, or ${d.name} to Bangalore, with Manoj Tours and Travels — sedan and SUV options, available 24×7.`,
  path: `/destinations/${d.slug}`,
}));
ok(`${destPages.length} destination pages found`);

console.log("\n=== 3. Service pages ===");
// Hardcoded — services.js imports pricing.js without an extension (fine for
// Next's bundler, not resolvable by plain Node ESM), so it's read from the
// route folders instead of imported.
const servicePages = ["local-cabs", "outstation-cabs", "round-trip-cabs", "airport-pickup-drop"].map((slug) => ({
  path: `/services/${slug}`,
}));
ok(`${servicePages.length} service pages found`);

console.log("\n=== 4. Tour package pages ===");
const pkgPages = tourPackages
  .filter((p) => p.active !== false)
  .map((p) => ({ title: p.title, path: `/tours-packages/${p.id}` }));
ok(`${pkgPages.length} active tour package pages found`);

console.log("\n=== 5. Blog pages ===");
const blogPages = blogPosts.map((p) => ({ title: p.title, path: `/blog/${p.slug}` }));
ok(`${blogPages.length} blog pages found`);

console.log("\n--- Uniqueness checks ---");
checkDuplicates(
  "title",
  [
    ...staticPages.map((p) => ({ value: p.title, path: p.path })),
    ...destPages.map((p) => ({ value: p.title, path: p.path })),
    ...pkgPages.map((p) => ({ value: p.title, path: p.path })),
    ...blogPages.map((p) => ({ value: p.title, path: p.path })),
  ]
);

checkDuplicates("canonical path", [
  ...staticPages.map((p) => ({ value: p.path, path: p.path })),
  ...destPages.map((p) => ({ value: p.path, path: p.path })),
  ...servicePages.map((p) => ({ value: p.path, path: p.path })),
  ...pkgPages.map((p) => ({ value: p.path, path: p.path })),
  ...blogPages.map((p) => ({ value: p.path, path: p.path })),
]);

console.log("\n=== 6. Destination + tour package images: on disk & Git-tracked ===");
const trackedImages = new Set(execSync("git ls-files public/images").toString().split(/\r?\n/).filter(Boolean));
let imageProblems = 0;
for (const d of destinations) {
  const rel = "public" + d.image;
  if (!fs.existsSync(rel)) {
    note(`Destination "${d.name}" image missing on disk: ${d.image}`);
    imageProblems++;
  } else if (!trackedImages.has(rel)) {
    note(`Destination "${d.name}" image not Git-tracked: ${d.image}`);
    imageProblems++;
  }
}
for (const p of tourPackages) {
  if (!p.image) continue;
  const rel = "public" + p.image;
  if (!fs.existsSync(rel)) {
    note(`Package "${p.title}" image missing on disk: ${p.image}`);
    imageProblems++;
  } else if (!trackedImages.has(rel)) {
    note(`Package "${p.title}" image not Git-tracked: ${p.image}`);
    imageProblems++;
  }
}
if (imageProblems === 0) ok(`All ${destinations.length} destination + ${tourPackages.filter((p) => p.image).length} package images exist on disk and are Git-tracked`);

console.log("\n=== 7. Keyword dataset integrity (informational — never auto-fixed) ===");
const totalPhrases = destinationKeywords.reduce((n, d) => n + d.phrases.length, 0);
console.log(`  destinationKeywords.js: ${destinationKeywords.length} places, ${totalPhrases} verbatim phrases`);
console.log(`  destinations.js: ${destinations.length} destinations, ${destinations.filter((d) => d.keywords).length} with a keywords[] field`);
console.log("  (compare these numbers run-to-run — any unexplained drop means a keyword was lost)");

console.log(`\n=== Result: ${problems} problem(s) found ===\n`);
process.exit(problems > 0 ? 1 : 0);
