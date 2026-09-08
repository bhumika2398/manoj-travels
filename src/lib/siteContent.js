import { supabasePublic } from "@/lib/supabase/public";
import { supabaseAdmin, hasSupabase } from "@/lib/supabase/admin";
import { oneWayPricing, localPricing, roundTripPricing, airportPricing } from "@/data/pricing";
import { business } from "@/config/business.config";

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
