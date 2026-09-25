import { supabasePublic } from "@/lib/supabase/public";
import { supabaseAdmin, hasSupabase } from "@/lib/supabase/admin";
import { oneWayPricing, localPricing, roundTripPricing, airportPricing } from "@/data/pricing";
import { business } from "@/config/business.config";
import { tourPackages as defaultTourPackages } from "@/data/tourPackages";
import { slugify } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Admin-editable overrides for pricing, business info and vehicle/destination
// images, stored as a few JSONB rows in the Supabase `site_content` table.
// Every getter here merges the Supabase override on top of the site's
// existing static defaults (src/data/pricing.js, src/config/business.config.js)
// and always falls back to those defaults if Supabase is unreachable or not
// yet configured — the public site keeps working either way.
//
// Reads use the anon client (Row Level Security grants anon SELECT only on
// this table) since these run on every public page view. Writes use the
// service-role client, and only ever run from already-authenticated
// /api/admin/* routes.
// ---------------------------------------------------------------------------

async function getContent(key) {
  if (!supabasePublic) return null;
  const { data, error } = await supabasePublic.from("site_content").select("value").eq("key", key).maybeSingle();
  if (error) {
    console.error(`[siteContent] Failed to read "${key}":`, error);
    return null;
  }
  return data?.value ?? null;
}

async function setContent(key, value) {
  if (!hasSupabase()) {
    throw new Error("Supabase is not configured.");
  }
  const { error } = await supabaseAdmin
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) throw error;
}

// --- Pricing -----------------------------------------------------------

function applyTierOverrides(tiers, overrides) {
  if (!overrides) return tiers;
  return tiers.map((tier) => (overrides[tier.id] ? { ...tier, ...overrides[tier.id] } : tier));
}

/** Returns the same shape as src/data/pricing.js, with any admin edits applied. */
export async function getPricing() {
  const override = await getContent("pricing");
  const tierOverrides = override?.tiers || {};
  return {
    oneWayPricing: applyTierOverrides(oneWayPricing, tierOverrides),
    localPricing: applyTierOverrides(localPricing, tierOverrides),
    roundTripPricing: applyTierOverrides(roundTripPricing, tierOverrides),
    airportPricing: override?.airportMessage
      ? { ...airportPricing, message: override.airportMessage }
      : airportPricing,
  };
}

/** Flat list of every editable tier, for the admin pricing form. */
export async function getEditablePricingList() {
  const pricing = await getPricing();
  return [
    ...pricing.oneWayPricing.map((t) => ({ ...t, type: "one-way" })),
    ...pricing.localPricing.map((t) => ({ ...t, type: "local" })),
    ...pricing.roundTripPricing.map((t) => ({ ...t, type: "round-trip" })),
  ];
}

/** `tierUpdates` is { [tierId]: { field: value, ... } }. `airportMessage` is optional. */
export async function savePricing(tierUpdates, airportMessage) {
  const existing = (await getContent("pricing")) || { tiers: {} };
  const nextTiers = { ...existing.tiers, ...tierUpdates };
  const next = {
    tiers: nextTiers,
    airportMessage: airportMessage ?? existing.airportMessage,
  };
  await setContent("pricing", next);
  return next;
}

// --- Business info -------------------------------------------------------

/** "7899787478" -> "+91 78997 87478" — matches the site's existing display format. */
function formatIndianPhoneDisplay(digits) {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

// Default WhatsApp number, digits only (no "91" prefix) — same number as the
// site's static default primary phone.
const DEFAULT_WHATSAPP_NUMBER = business.whatsapp.number.replace(/^91/, "");

/**
 * Returns the same shape used across the site (business.config.js's
 * `business`), with admin edits applied. Phone overrides are stored as raw
 * 10-digit numbers.
 *
 * `phone.primary`/`phone.secondary` are Contact Number 1 / Contact Number 2
 * — both always shown together where the site lists both numbers (Footer,
 * Contact page). `phone.active` is whichever of the two the admin has
 * selected as the "Active Website Contact Number" — every single-number
 * call CTA (navbar, Call buttons) uses this one.
 *
 * The WhatsApp number is a separate, independently editable field — it no
 * longer tracks the primary phone number.
 */
export async function getBusinessInfo() {
  const override = await getContent("business_info");
  if (!override) return business;

  const primary = override.phonePrimary || business.phone.primary;
  const secondary = override.phoneSecondary || business.phone.secondary;
  const active = override.activeNumber === "secondary" ? secondary : primary;
  const whatsappNumber = override.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;

  return {
    ...business,
    phone: {
      primary,
      primaryDisplay: override.phonePrimary ? formatIndianPhoneDisplay(primary) : business.phone.primaryDisplay,
      primaryIntl: `+91${primary}`,
      secondary,
      secondaryDisplay: override.phoneSecondary ? formatIndianPhoneDisplay(secondary) : business.phone.secondaryDisplay,
      secondaryIntl: `+91${secondary}`,
      active,
      activeDisplay: formatIndianPhoneDisplay(active),
      activeIntl: `+91${active}`,
    },
    email: override.email || business.email,
    address: {
      ...business.address,
      full: override.addressFull || business.address.full,
    },
    whatsapp: {
      ...business.whatsapp,
      number: `91${whatsappNumber}`,
    },
  };
}

/** Raw override fields only (for pre-filling the admin form) — null fields mean "using the default". */
export async function getBusinessInfoOverride() {
  return (
    (await getContent("business_info")) || {
      phonePrimary: null,
      phoneSecondary: null,
      activeNumber: null,
      whatsappNumber: null,
      email: null,
      addressFull: null,
    }
  );
}

export async function saveBusinessInfo(fields) {
  const existing = (await getContent("business_info")) || {};
  const next = { ...existing, ...fields };
  await setContent("business_info", next);
  return next;
}

// --- Image overrides -------------------------------------------------------

/** Map of original static image path -> replacement Supabase Storage public URL. */
export async function getImageOverrides() {
  return (await getContent("image_overrides")) || {};
}

export async function setImageOverride(path, url) {
  const overrides = await getImageOverrides();
  overrides[path] = url;
  await setContent("image_overrides", overrides);
  return overrides;
}

export async function removeImageOverride(path) {
  const overrides = await getImageOverrides();
  delete overrides[path];
  await setContent("image_overrides", overrides);
  return overrides;
}

// --- Tour packages -------------------------------------------------------

// Fields the admin "Add/Edit package" form actually collects (see
// TourPackagesManager.jsx). Anything else on a stored override (notably
// `image`, which the admin UI has no field for and would otherwise save as
// null) must never override the current code's static default for a
// package that still exists in src/data/tourPackages.js — that field-level
// merge is what keeps package photos correct in production even if
// Supabase holds an older/partial snapshot from before this package or its
// image existed.
const ADMIN_EDITABLE_FIELDS = ["title", "description", "price", "priceUnit", "active"];

const normalizeTitle = (title) => (title || "").trim().toLowerCase();

/** Full list, including inactive packages — used by the admin manager. */
export async function getAllTourPackages() {
  const override = await getContent("tour_packages");
  if (!Array.isArray(override)) return defaultTourPackages;

  const overrideById = new Map(override.map((p) => [p.id, p]));

  // Static defaults are the source of truth for id/image/state/category/
  // vehicleTypes/featured — an admin edit only ever touches the fields
  // above, layered on top.
  const merged = defaultTourPackages.map((base) => {
    const edit = overrideById.get(base.id);
    if (!edit) return base;
    const patch = {};
    for (const key of ADMIN_EDITABLE_FIELDS) {
      if (edit[key] !== undefined) patch[key] = edit[key];
    }
    overrideById.delete(base.id);
    return { ...base, ...patch };
  });

  // Any override entries with an id that isn't one of the static defaults
  // are genuinely new packages an admin created from scratch — EXCEPT when
  // their title matches a static package's title. That happens when a
  // package's static id changed over time (e.g. an id scheme update) and
  // an old snapshot with the previous id is still sitting in Supabase —
  // it's the same package under a stale id, not a second real package, so
  // treating it as "admin created" would silently duplicate the card with
  // no image (the admin UI never sets one). Drop those; keep the rest.
  const staticTitles = new Set(defaultTourPackages.map((p) => normalizeTitle(p.title)));
  const seenTitles = new Set();
  const adminCreated = Array.from(overrideById.values()).filter((p) => {
    const key = normalizeTitle(p.title);
    if (staticTitles.has(key) || seenTitles.has(key)) return false;
    seenTitles.add(key);
    return true;
  });
  return [...adminCreated, ...merged];
}

/** Active-only list, in the shape the public Tours & Packages page renders. */
export async function getTourPackages() {
  const all = await getAllTourPackages();
  return all.filter((p) => p.active !== false);
}

export async function addTourPackage(fields) {
  const packages = await getAllTourPackages();
  const baseSlug = slugify(fields.title || "package");
  let id = baseSlug || `package-${Date.now()}`;
  let n = 2;
  while (packages.some((p) => p.id === id)) {
    id = `${baseSlug}-${n++}`;
  }
  const next = [
    { id, title: fields.title, description: fields.description || "", price: fields.price, priceUnit: fields.priceUnit || "per head", image: fields.image || null, active: fields.active !== false },
    ...packages,
  ];
  await setContent("tour_packages", next);
  return next;
}

export async function updateTourPackage(id, fields) {
  const packages = await getAllTourPackages();
  if (!packages.some((p) => p.id === id)) {
    throw new Error("Package not found.");
  }
  const next = packages.map((p) => (p.id === id ? { ...p, ...fields, id } : p));
  await setContent("tour_packages", next);
  return next;
}

export async function deleteTourPackage(id) {
  const packages = await getAllTourPackages();
  const isStaticDefault = defaultTourPackages.some((p) => p.id === id);
  // A package that also exists in src/data/tourPackages.js can't be removed
  // by dropping it from the stored override — getAllTourPackages() would
  // just fall back to the static default and it would reappear. Deactivate
  // it instead, which the merge above already honours.
  const next = isStaticDefault
    ? packages.map((p) => (p.id === id ? { ...p, active: false } : p))
    : packages.filter((p) => p.id !== id);
  await setContent("tour_packages", next);
  return next;
}
