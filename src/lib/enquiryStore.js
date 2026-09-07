import { supabasePublic } from "@/lib/supabase/public";
import { supabaseAdmin, hasSupabase } from "@/lib/supabase/admin";

// ---------------------------------------------------------------------------
// Enquiry log, backed by the Supabase `enquiries` table. Every call site —
// the public /api/booking, /api/enquiry and /api/contact routes, plus the
// admin dashboard and Enquiries page — goes through this module, so it's
// the only place that ever talks to Supabase for enquiries.
//
// Writes (appendEnquiry) use the anon client: Row Level Security on
// `enquiries` grants anon INSERT only, so a public visitor's browser-side
// key can never read the list back. Reads/updates (readEnquiries,
// updateEnquiryStatus) use the service-role client, and are only ever
// called from the already-authenticated /api/admin/enquiries route.
// ---------------------------------------------------------------------------

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** @param {"booking"|"enquiry"|"contact"} source */
export async function appendEnquiry(source, data) {
  const id = makeId();
  const entry = { id, source, status: "new", receivedAt: new Date().toISOString(), ...data };

  if (!supabasePublic) {
    console.warn("[enquiryStore] Supabase not configured — enquiry was not persisted.");
    return entry;
  }

  const { error } = await supabasePublic
    .from("enquiries")
    .insert({ id, source, status: "new", received_at: entry.receivedAt, data });

  if (error) console.error("[enquiryStore] Failed to save enquiry:", error);

  return entry;
}

function rowToEnquiry(row) {
  return {
    id: row.id,
    source: row.source,
    status: row.status,
    receivedAt: row.received_at,
    ...row.data,
  };
}

export async function readEnquiries() {
  if (!hasSupabase()) return [];

  const { data, error } = await supabaseAdmin
    .from("enquiries")
    .select("id, source, status, received_at, data")
    .order("received_at", { ascending: false })
    .limit(500);

  if (error) {
    console.error("[enquiryStore] Failed to read enquiries:", error);
    return [];
  }
  return data.map(rowToEnquiry);
}

const VALID_STATUSES = new Set(["new", "contacted", "closed"]);

export async function updateEnquiryStatus(id, status) {
  if (!VALID_STATUSES.has(status)) {
    throw new Error(`Invalid status: ${status}`);
  }
  if (!hasSupabase()) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabaseAdmin
    .from("enquiries")
    .update({ status })
    .eq("id", id)
    .select("id, source, status, received_at, data")
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return rowToEnquiry(data);
}
