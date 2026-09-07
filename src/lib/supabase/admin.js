import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Privileged Supabase client using the SERVICE ROLE key — bypasses Row
// Level Security entirely, so it only belongs on the server, and only in
// code paths already gated by our own admin-session check (every
// /api/admin/* route, and only there). Never import this from a Client
// Component, and never let SUPABASE_SERVICE_ROLE_KEY be prefixed with
// NEXT_PUBLIC_ — that's what would leak it into the browser bundle.
//
// Used for: reading/writing `site_content` and `enquiries` from admin
// routes, and all Supabase Storage uploads/deletes. Public-facing reads
// (rendering the website for anonymous visitors) go through the separate
// anon client in src/lib/supabase/public.js instead, which is subject to
// Row Level Security like any other visitor.
// ---------------------------------------------------------------------------

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createSupabaseClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

const globalForSupabase = globalThis;

export const supabaseAdmin = globalForSupabase.__manojSupabaseAdmin ?? createAdminClient();

if (process.env.NODE_ENV !== "production") {
  globalForSupabase.__manojSupabaseAdmin = supabaseAdmin;
}

/** True once Supabase is fully configured (DB + Storage share one project/key set). */
export function hasSupabase() {
  return Boolean(supabaseAdmin);
}
