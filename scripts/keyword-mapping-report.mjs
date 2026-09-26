#!/usr/bin/env node
// Generates the real keyword → intent → target-page mapping from the
// actual data layer (never invented). Run with:
//   node scripts/keyword-mapping-report.mjs
//
// For every phrase in destinationKeywords.js: which place it belongs to,
// whether that place has a dedicated /destinations/[slug] page, and
// therefore whether the phrase's primary target is that destination page
// or the /routes hub. Also flags any phrase that also appears (or a close
// variant of it appears) inside a service page's metadata `keywords[]`
// array, which would be a real cannibalization case.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
process.chdir(root);

const { destinationKeywords } = await import("../src/data/destinationKeywords.js");

const rows = [];
for (const entry of destinationKeywords) {
  for (const phrase of entry.phrases) {
    rows.push({
      place: entry.place,
      phrase,
      category: entry.category,
      targetPage: entry.href || "/routes",
      usage: entry.href
        ? "Destination page — title/H1/description area, plus 'Also searched as' chip"
        : "/routes hub — region-grouped badge (text only, no dedicated page)",
    });
  }
}

console.log(`Total phrases mapped: ${rows.length}`);
console.log(`Places with a dedicated destination page (primary target = that page): ${destinationKeywords.filter((d) => d.href).length}`);
console.log(`Places without a page (primary target = /routes): ${destinationKeywords.filter((d) => !d.href).length}`);

// Check for cannibalization: a service-page keywords[] entry that is the
// same (or near-identical) phrase as a destination's primary phrase.
const servicesSrc = fs.readFileSync("src/data/services.js", "utf-8");
const serviceKeywordBlocks = [...servicesSrc.matchAll(/keywords:\s*\[([\s\S]*?)\]/g)].map((m) => m[1]);
const serviceKeywords = serviceKeywordBlocks
  .join("\n")
  .split("\n")
  .map((l) => l.match(/"([^"]+)"/))
  .filter(Boolean)
  .map((m) => m[1].toLowerCase());

let cannibalized = 0;
for (const entry of destinationKeywords) {
  if (!entry.href) continue;
  for (const phrase of entry.phrases) {
    const norm = phrase.toLowerCase().replace(/\s+/g, " ");
    if (serviceKeywords.some((sk) => norm.includes(sk) || sk.includes(norm))) {
      console.log(`  ✗ Possible cannibalization: "${phrase}" (primary on ${entry.href}) also present in a service page's keywords[]`);
      cannibalized++;
    }
  }
}
console.log(cannibalized === 0 ? "✓ No cannibalization found between destination primary phrases and service-page metadata keywords." : `${cannibalized} possible cannibalization case(s) found.`);

fs.writeFileSync(
  "scripts/keyword-mapping-report.json",
  JSON.stringify(rows, null, 2)
);
console.log(`\nFull ${rows.length}-row mapping written to scripts/keyword-mapping-report.json`);
